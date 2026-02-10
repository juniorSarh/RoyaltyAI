import dotenv from "dotenv";

dotenv.config();

/**
 * Ensure OpenRouter API key exists
 * (OpenRouter routes to all models)
 */
if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is missing in .env");
}

/**
 * Supported model keys
 */
export type ModelKey = "trinity" | "stepfun" | "glm" | "nemotron";

/**
 * OpenRouter model IDs
 * These are consumed by chat.service.ts
 */
export const MODELS: Record<ModelKey, string> = {
  trinity: "arcee-ai/trinity-mini:free",
  stepfun: "stepfun/step-3.5-flash:free",
  glm: "z-ai/glm-4.5-air:free",
  nemotron: "nvidia/nemotron-3-nano-30b-a3b:free",
};
