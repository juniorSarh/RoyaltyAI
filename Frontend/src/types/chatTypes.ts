export type Role = "user" | "assistant";

export interface ChatMessage {
  role: Role;
  content: string;
}

export type ModelType = "trinity" | "stepfun" | "glm" | "nemotron";


