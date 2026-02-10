import { ChatGroq } from "@langchain/groq";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

// -------- GROQ --------
if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing in .env");
}

export const GroqModels = {
  llama: new ChatGroq({
    apiKey: process.env.GROQ_API_KEY!,
    model: "llama-3.1-70b-versatile",
    temperature: 0.7,
  }),
};

// -------- STEPFUN --------
if (!process.env.STEPFUN_API_KEY) {
  throw new Error("STEPFUN_API_KEY is missing in .env");
}

export const StepFunModels = {
  stepfun: new ChatOpenAI({
    modelName: "stepfun/step-3.5-flash:free",
    temperature: 0.7,
    apiKey: process.env.STEPFUN_API_KEY!,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  }),
};

// -------- GLM --------
if (!process.env.GLM_API_KEY) {
  throw new Error("GLM_API_KEY is missing in .env");
}

export const GLMModels = {
  glm: new ChatOpenAI({
    modelName: "zhipuai/glm-4",
    temperature: 0.7,
    apiKey: process.env.GLM_API_KEY!,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  }),
}

// -------- NEMOTRON --------
if (!process.env.NEMOTRON_API_KEY) {
  throw new Error("NEMOTRON_API_KEY is missing in .env");
}

  export const NemoModels = {
  nemotron: new ChatOpenAI({
    modelName: "nvidia/nemotron-3-nano-30b-a3b:free",
    temperature: 0.7,
    apiKey: process.env.NEMOTRON_API_KEY!,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  }),
};

  /*
  if(!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is missing in .env");
  }

  console.log("Google API Key found:", process.env.GOOGLE_GENERATIVE_AI_API_KEY?.substring(0, 10) + "...");

  //----google gemini----
  export const GoogleGeminiModel = {
  googleGemini: new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",  
    temperature: 0.7,
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
  })
  };
  */

