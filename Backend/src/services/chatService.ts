import OpenAI from "openai";
import { MODELS, ModelKey } from "../AI-Models/models";

/**
 * Single OpenAI client pointing to OpenRouter
 */
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

/**
 * Non-streaming chat (simple request/response)
 */
export const chat = async (
  message: string,
  modelName: ModelKey = "stepfun",
  history: { role: "system" | "user" | "assistant"; content: string }[] = []
) => {
  const model = MODELS[modelName];

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: "You are Royalty AI, a helpful assistant." },
      ...history,
      { role: "user", content: message },
    ],
  });

  return completion.choices[0].message.content;
};

/**
 * Streaming chat (SSE compatible)
 */
export const streamChat = async (
  message: string,
  modelName: ModelKey,
  history: { role: "system" | "user" | "assistant"; content: string }[],
  onToken: (token: string) => void
) => {
  const model = MODELS[modelName];

  const stream = await client.chat.completions.create({
    model,
    stream: true,
    messages: [
      { role: "system", content: "You are Royalty AI, a helpful assistant. answer questions clearly and concisely." },
      ...history,
      { role: "user", content: message },
    ],
  });

  for await (const chunk of stream) {
    const token = chunk.choices[0]?.delta?.content;
    if (token) {
      onToken(token);
    }
  }
};
