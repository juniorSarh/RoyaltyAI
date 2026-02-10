import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StepFunModels, GLMModels, NemoModels, TrinityModels } from "../AI-Models/models";


type ModelKey =  "stepfun" | "glm"| "nemotron"|"trinity";

export const getModelInstance = (modelName: ModelKey) => {
  switch (modelName) {
    case "trinity":
      return TrinityModels.trinity;
    case "stepfun":
      return StepFunModels.stepfun;
    case "glm":
      return GLMModels.glm;
    case "nemotron":
      return NemoModels.nemotron;
    default:
      throw new Error(
        `Invalid model selected: ${modelName}. Choose "trinity", "stepfun", "glm", or "nemotron"`
      );
  }
};

export const chat = async (message: string, modelName: ModelKey = "stepfun") => {
  const model = getModelInstance(modelName);

  const response = await model.invoke([
    new SystemMessage("You are Royalty AI and assisting users with their queries."),
    new HumanMessage(message),
  ]);

  return response.content;
};
