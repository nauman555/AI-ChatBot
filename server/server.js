import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes i.e., allow requests from any origin - you can configure this for specific origins in production if needed
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes - AI-related endpoints
app.use("/api/ai", aiRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
