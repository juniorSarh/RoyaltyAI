import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { GroqModels, StepFunModels, GLMModels, NemoModels } from "../AI-Models/models";
// Google Gemini temporarily disabled due to API issues
// import { GoogleGeminiModel } from "../AI-Models/models";

type ModelKey = "llama" | "stepfun" | "glm"| "nemotron"; // "gemini" temporarily disabled

export const getModelInstance = (modelName: ModelKey) => {
  switch (modelName) {
    case "llama":
      return GroqModels.llama;
    case "stepfun":
      return StepFunModels.stepfun;
    case "glm":
      return GLMModels.glm;
    case "nemotron":
      return NemoModels.nemotron;
    default:
      throw new Error(
        `Invalid model selected: ${modelName}. Choose "llama", "stepfun", "glm", or "nemotron"`
      );
  }
};

export const chat = async (message: string, modelName: ModelKey = "llama") => {
  const model = getModelInstance(modelName);

  const response = await model.invoke([
    new SystemMessage("You are a helpful assistant."),
    new HumanMessage(message),
  ]);

  return response.content;
};
