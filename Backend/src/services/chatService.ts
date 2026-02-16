import OpenAI from "openai";
import { MODELS, ModelKey } from "../AI-Models/models";
import { isTimeSensitive } from "../utils/isTimeSensitive";
import { searchWeb } from "./webSearch.service";
import { SYSTEM_PROMPT } from "../prompts/systemPrompt";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

export const chat = async (
  question: string,
  modelName: ModelKey = "stepfun"
) => {
  console.log("🔍 Chat function called with question:", question);
  console.log("🔍 Checking time sensitivity for:", question);
  
  let context = "";

  // 🔍 Fetch live data if needed
  if (isTimeSensitive(question)) {
    console.log("✅ Question is time-sensitive, searching web...");
    try {
      context = await searchWeb(question);
      console.log("🌐 Web search context:", context);
    } catch (error) {
      console.error("❌ Web search failed:", error);
      return "I am failing to get you accurate answer.";
    }
  } else {
    console.log("❌ Question is not time-sensitive, using knowledge only");
  }

  console.log("🤖 Calling AI with model:", modelName);
  const completion = await client.chat.completions.create({
    model: MODELS[modelName],
    messages: [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...(context
        ? [{ role: "system" as const, content: `Latest verified information:\n${context}` }]
        : []),
      { role: "user" as const, content: question },
    ],
  });

  const response = completion.choices[0].message.content;
  console.log("📝 AI Response:", response);
  return response;
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
  console.log("🌊 StreamChat function called with message:", message);
  console.log("🔍 Checking time sensitivity for:", message);
  
  const model = MODELS[modelName];
  let context = "";

  // 🔍 Fetch live data if needed
  if (isTimeSensitive(message)) {
    console.log("✅ Message is time-sensitive, searching web...");
    try {
      context = await searchWeb(message);
      console.log("🌐 Web search context:", context);
    } catch (error) {
      console.error("❌ Web search failed:", error);
      // Continue without context if web search fails
    }
  } else {
    console.log("❌ Message is not time-sensitive, using knowledge only");
  }

  console.log("🤖 Calling AI with model:", modelName);
  
  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...(context
        ? [{ role: "system" as const, content: `Latest verified information:\n${context}` }]
        : []),
    ...history,
    { role: "user" as const, content: message },
  ];
  
  console.log("📨 Full messages array being sent to AI:", JSON.stringify(messages, null, 2));
  
  const stream = await client.chat.completions.create({
    model,
    stream: true,
    messages,
  });

  for await (const chunk of stream) {
    const token = chunk.choices[0]?.delta?.content;
    if (token) {
      onToken(token);
    }
  }
};
