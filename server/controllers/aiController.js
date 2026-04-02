import { getAiResponse } from "./tool_calling.js";

// AI Controller
// Handle AI-related API requests

const getAIResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const thread_id = req.body.thread_id; // Get thread_id from request body

    if (!message || !thread_id) {
      return res
        .status(400)
        .json({ error: "Message and thread_id are required" });
    }

    // Get AI response using the getAiResponse function from tool_calling.js
    const aiResponseData = await getAiResponse(message, thread_id);
    if (!aiResponseData) {
      return res.status(500).json({ error: "Failed to get AI response" });
    }

    const response = {
      userMessage: message,
      aiResponse: aiResponseData,
      timestamp: new Date(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const thread_id = req.query.thread_id; // Get thread_id from query params

    if (!thread_id) {
      return res.status(400).json({ error: "thread_id is required" });
    }

    // Get chat history from cache for this thread
    const chatHistory = messageCache.get(thread_id) || [];
    res.json({ thread_id, messages: chatHistory });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getAIResponse, getChatHistory };
