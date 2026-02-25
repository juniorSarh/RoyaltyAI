import { type AppDispatch, type RootState } from "../app/store";
import {
  addMessage,
  updateLastAssistantMessage,
  setStreaming,
} from "../features/chatSlice";

const API_URL = "https://royaltyai.onrender.com/api/chat";

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
        stream: true, // Use streaming for natural buildup
      }, null, 2));
      
      // Log conversation context for follow-up questions
      console.log("💬 Conversation context:");
      console.log("   Message count:", messages.length);
      console.log("   Recent messages:", messages.slice(-3).map(m => `${m.role}: ${m.content.substring(0, 50)}...`));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message,
          model,
          history: messages,
          stream: true, // Use streaming for natural buildup
        }),
      });

      // Set a timeout of 30 seconds
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 30000);

      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        clearTimeout(timeoutId);
        const errorText = await response.text();
        console.error("❌ Response error:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        clearTimeout(timeoutId);
        throw new Error("Streaming not supported");
      }

      console.log("🔄 Starting to read stream...");
      let fullResponse = "";

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            console.log("✅ Stream completed");
            console.log("📝 Final accumulated response:", fullResponse);
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          console.log("📦 Received chunk:", chunk);

          // Process each line in the chunk
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const token = line.replace("data: ", "").trim();
              if (token && token !== "[DONE]") {
                console.log("🔤 Token:", JSON.stringify(token));
                console.log("🔤 Token length:", token.length);
                console.log("🔤 Token content:", token);
                fullResponse += token;
                console.log("📝 Accumulated response so far:", fullResponse);
                // Accumulate tokens naturally
                dispatch(updateLastAssistantMessage(token));
              } else if (token === "[DONE]") {
                console.log("🏁 Stream finished - Final response:", fullResponse);
              }
            }
          }
        }
      } finally {
        clearTimeout(timeoutId);
      }
      
    } catch (err) {
      console.error("🔥 Streaming error:", err);
      
      // More specific error handling
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          console.log("🛑 Request was aborted");
        } else if (err.message.includes('Failed to fetch') || err.message.includes('timeout')) {
          console.error("🚫 Network error - Backend not responding");
          console.error("💡 Please check:");
          console.error("   1. Backend server is running");
          console.error("   2. API URL is correct:", API_URL);
          console.error("   3. No CORS issues");
          console.error("   4. Environment variables are set");
          
          dispatch(updateLastAssistantMessage("⚠️ **Backend Connection Error**\n\nThe AI server is not responding. This could be because:\n\n• Backend server is not running\n• Server is starting up (cold start)\n• Network connectivity issues\n\n**To fix this:**\n1. Start the backend server: `npm run dev` in the Backend folder\n2. Wait a few seconds and try again\n3. Check if the server is running on the correct port\n\nPlease try again in a moment or contact support if this persists."));
        } else {
          console.error("❌ Other error:", err.message);
          dispatch(updateLastAssistantMessage(`❌ **Error:** ${err.message}`));
        }
      }
      
      if (!(err instanceof Error && err.name === 'AbortError')) {
        dispatch(updateLastAssistantMessage("Sorry, I can't connect to the server. Please check if the backend is running."));
      }
    } finally {
      dispatch(setStreaming(false));
    }
  };
