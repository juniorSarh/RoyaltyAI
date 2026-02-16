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
      { role: "system", content: `You are Royalty AI, a factual and reliable assistant.

Answer questions clearly, concisely, and in plain language.
Provide only accurate, up-to-date information that you are confident about.

If you are not certain about the answer or cannot verify its accuracy, respond with:
"I am failing to get you the accurate answer."

Do not guess, assume, or hallucinate information.

Keep responses short and focused. Do not include unnecessary details or long explanations.

Format responses using clear paragraphs and natural spacing.
Do not use markdown symbols, bullet points, or special formatting.`
 },
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
