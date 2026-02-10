import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.TRINITY_API_KEY) {
  throw new Error("TRINITY_API_KEY is missing in .env");
}

export const TrinityModels = {
  trinity: new ChatOpenAI({
    modelName: "arcee-ai/trinity-mini:free",
    temperature: 0.7,
    apiKey: process.env.TRINITY_API_KEY!,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
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
    modelName: "z-ai/glm-4.5-air:free",
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

 
