import { type AppDispatch, type RootState } from "../app/store";
import {
  addMessage,
  updateLastAssistantMessage,
  setStreaming,
} from "../features/chatSlice";

const API_URL = "http://localhost:5000/api/chat";

export const streamChat =
  (message: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { model, messages } = getState().chat;

    dispatch(addMessage({ role: "user", content: message }));
    dispatch(addMessage({ role: "assistant", content: "" }));
    dispatch(setStreaming(true));

    const controller = new AbortController();

    try {
      console.log("🌐 Sending request to:", API_URL);
      console.log("📤 Request body:", JSON.stringify({
        message,
        model,
        history: messages,
        stream: true,
      }, null, 2));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message,
          model,
          history: messages,
          stream: true,
        }),
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Response error:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("Streaming not supported");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        chunk
          .split("\n")
          .filter((line) => line.startsWith("data: "))
          .forEach((line) => {
            const token = line.replace("data: ", "");
            if (token !== "[DONE]") {
              dispatch(updateLastAssistantMessage(token));
            }
          });
      }
    } catch (err) {
      console.error("🔥 Streaming error:", err);
      
      // More specific error handling
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          console.log("🛑 Request was aborted");
        } else if (err.message.includes('Failed to fetch')) {
          console.error("🚫 Network error - Backend may not be running");
          console.error("💡 Please check:");
          console.error("   1. Backend server is running on port 5000");
          console.error("   2. No CORS issues");
          console.error("   3. API URL is correct:", API_URL);
        } else {
          console.error("❌ Other error:", err.message);
        }
      }
      
      dispatch(updateLastAssistantMessage("Sorry, I can't connect to the server. Please check if the backend is running."));
    } finally {
      dispatch(setStreaming(false));
    }
  };
