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
      console.error("Streaming error:", err);
    } finally {
      dispatch(setStreaming(false));
    }
  };
