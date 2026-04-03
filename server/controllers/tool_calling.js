import dotenv from "dotenv";
import { tavily } from "@tavily/core";
import NodeCache from "node-cache";

dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Create cache at module level so it persists across all API calls
const messageCache = new NodeCache({ stdTTL: 3600 * 24 }); // Cache messages for 24 hours

// Function to get AI response based on user question. thread ID is used to cache the conversation history for each thread.
//  thread id updated in frontend and sent in each request to backend, so that we can maintain the conversation history for each thread separately.

export async function getAiResponse(userQuestion, thread_id) {
  console.log("thread_id in getAiResponse:", thread_id);

  const initial_messagesArray = [
    {
      role: "system",
      // here we instruct the LLM to use the tool if it has no latest information
      // and if it has latest information it will not use the tool
      content: `You are smart personal Assitant who answers the asked question
                If you know the answer to the question based on your training data, then answer the question in plan English
                without using the tool.
                If user requires real time information or latest information that is not available in your training data, 
                then use the tool to get the latest information from the internet and then answer the question in plain English.  
                You have access the following tools:
                1. tool_calling(query): {query: string} // Search the latest information and realtime data on internet. 
                2.  decide when to use your own knowledge and when to use the tool based on the question asked by user and the information you have in your training data.
                3. Dont use the tool unless it is necessary, 
                
                Example:
                Question: what is the capital of United States?
                LLM Response: the capital of United States is Washington D.C. 
                question: what is the latest news on Apple Inc?
                LLM Response: I am not sure about the latest news on Apple Inc. Let me check that for you using the tool.
                tool_calling({query: "latest news on Apple Inc"})
                tool response: Apple Inc. announces new iPhone model with groundbreaking features.
                LLM response: The latest news on Apple Inc is that they have announced a new iPhone model with groundbreaking features. 
                current date is ${new Date().toISOString().split("T")[0]} 
                `,
    },
  ];

  // get the messages array from cache if present, otherwise use the initial_messagesArray
  const messagesArray = messageCache.get(thread_id) || initial_messagesArray;
  // push the user input into messagesArray for further processing
  messagesArray.push({ role: "user", content: userQuestion });

  const MAX_TOOL_CALLS = 10;
  let toolCallCount = 0;

  // run the code in loop until the tool calls are not present a
  while (true) {

    // if tool call count is greater than max tool calls, return the response
    if (toolCallCount > MAX_TOOL_CALLS) {
      return "Unable to fetch the information. Please try again later.";
    }
    const groq_response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,

      messages: messagesArray,
      // used this object for tool calling , if LLM has no latest information it will call this tool
      // to get the latest information from the internet
      tools: [
        {
          type: "function",
          function: {
            name: "tool_calling",
            description:
              "Search the latest information and realtime data on internet",
            parameters: {
              // JSON Schema object
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query to perform search on",
                },
              },
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    // push the groq response into messagesArray for further processing
    messagesArray.push(groq_response.choices[0].message);

    // check if tool calls are present
    const toolCalls = groq_response.choices[0].message.tool_calls;

    // if tool calls are not present, return the AI assitant response and exit
    if (!toolCalls) {
      messageCache.set(thread_id, messagesArray); // Cache the messages array for the thread_id
      return groq_response.choices[0].message.content;
    }

    // if tool calls are present, get the function name and arguments from tool calls
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      // get the arguments from tool calls in json format
      const functionArgs = JSON.parse(toolCall.function.arguments);

      // call the tool and print the result
      if (functionName === "tool_calling") {
        const toolCallResult = await tool_calling(functionArgs);

        // push the tool call result as a object  into messagesArray for further processing
        messagesArray.push({
          role: "tool",
          name: functionName,
          content: toolCallResult,
          tool_call_id: toolCall.id,
        });
      }
    }
  }
}

// This is the implementation of the tool that will be called by the LLM when it needs to get the latest information from the internet.

const tool_calling = async ({ query }) => {
  console.log("Searching on Web...");
  const tvly = tavily({ apiKey: process.env.TVLY_API_KEY });

  // receive multiple results from the tool call
  const response = await tvly.search(query);
  // combining all the results from the tool call in a single string
  const finalResponse = response.results
    .map((result) => result.content)
    .join("\n\n");
  return finalResponse;
};
