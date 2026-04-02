import { getAiResponse } from "./tool_calling.js";

// AI Controller
// Handle AI-related API requests

const getAIResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get AI response using the getAiResponse function from tool_calling.js
    const aiResponseData = await getAiResponse(message);
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
    // Chat history retrieval (currently in-memory, can be extended with external storage)
    const chatHistory = [];
    res.json(chatHistory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getAIResponse, getChatHistory };
