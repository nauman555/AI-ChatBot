import express from "express";
import { getAIResponse, getChatHistory } from "../controllers/aiController.js";

const router = express.Router();

// POST /api/ai/chat - Send message and get AI response
router.post("/chat", getAIResponse);

// GET /api/ai/history?thread_id=xxx - Get chat history for a specific thread
router.get("/history", getChatHistory);

export default router;
