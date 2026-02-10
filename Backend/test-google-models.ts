import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);
    
    // This will show us what models are available
    console.log("Testing API key with a simple request...");
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("Success with gemini-1.5-flash:", result.response.text());
    
  } catch (error: any) {
    console.error("Error:", error.message);
    
    // Try with gemini-pro
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent("Hello");
      console.log("Success with gemini-pro:", result.response.text());
    } catch (error2: any) {
      console.error("gemini-pro also failed:", error2.message);
    }
  }
}

listModels();
