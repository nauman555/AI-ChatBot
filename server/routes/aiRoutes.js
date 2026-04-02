import express from "express";
import { getAIResponse, getChatHistory } from "../controllers/aiController.js";

const router = express.Router();

// POST /api/ai/chat - Send message and get AI response
router.post("/chat", getAIResponse);

// GET /api/ai/history - Get chat history
router.get("/history", getChatHistory);

export default router;
