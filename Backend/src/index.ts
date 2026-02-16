import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRoute from "./routes/chatRoute";
import path from "path";

dotenv.config();

// Debug: Check if environment variables are loaded
console.log("🔧 Environment Variables Check:");
console.log("🔑 OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY ? "✅ Present" : "❌ Missing");
console.log("🔑 TAVILY_API_KEY:", process.env.TAVILY_API_KEY ? "✅ Present" : "❌ Missing");
console.log("🔑 PORT:", process.env.PORT || "5000 (default)");

const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../../public")));
app.use(cors());
app.use(express.json());

// Endpoint
app.use("/api", chatRoute);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` RoyaltyAI Backend running on port ${PORT}`),
);
