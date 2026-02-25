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
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          model,
          history: messages,
          stream: true,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("Streaming not supported");
      }

      console.log("🔄 Starting stream...");
      let fullResponse = "";

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            console.log("✅ Stream completed");
            console.log("📝 Final response:", fullResponse);
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          console.log("📦 Raw chunk from backend:", chunk);
          
          // Handle multi-line chunks properly
          const lines = chunk.split("\n");
          console.log("🔍 Split lines:", lines.map(l => JSON.stringify(l)));
          
          let currentData = "";
          
          for (const line of lines) {
            console.log("🔍 Processing line:", JSON.stringify(line));
            
            if (line.startsWith("data: ")) {
              // If we have accumulated data, process it first
              if (currentData.trim()) {
                console.log("🔤 Raw data from backend (accumulated):", JSON.stringify(currentData.trim()));
                console.log("🔤 Token length:", currentData.trim().length);
                fullResponse += currentData.trim();
                console.log("📤 About to dispatch token to Redux:", JSON.stringify(currentData.trim()));
                dispatch(updateLastAssistantMessage(currentData.trim()));
                console.log("✅ Token dispatched to Redux");
                
                const currentState = getState().chat.messages;
                const lastMessage = currentState[currentState.length - 1];
                console.log("🔍 Redux state after dispatch:", lastMessage?.content);
              }
              
              // Start new data collection
              currentData = line.replace("data: ", "").trim();
              console.log("🔍 Started new data collection:", JSON.stringify(currentData));
              
            } else if (line.trim() !== "") {
              // Continue accumulating data
              currentData += line;
              console.log("🔍 Accumulating data:", JSON.stringify(currentData));
            }
          }
          
          // Process any remaining data
          if (currentData.trim() && currentData.trim() !== "[DONE]") {
            console.log("🔤 Raw data from backend (final):", JSON.stringify(currentData.trim()));
            console.log("� Token length:", currentData.trim().length);
            fullResponse += currentData.trim();
            console.log("📤 About to dispatch final token to Redux:", JSON.stringify(currentData.trim()));
            dispatch(updateLastAssistantMessage(currentData.trim()));
            console.log("✅ Final token dispatched to Redux");
            
            const currentState = getState().chat.messages;
            const lastMessage = currentState[currentState.length - 1];
            console.log("🔍 Redux state after final dispatch:", lastMessage?.content);
          }
        }
      } finally {
        controller.abort();
      }
      
    } catch (err) {
      console.error("🔥 Error:", err);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          console.log("🛑 Request aborted");
        } else {
          const lastMessage = messages[messages.length - 1];
          if (!lastMessage?.content || lastMessage.content.trim() === "") {
            dispatch(updateLastAssistantMessage("Connection error. Please try again."));
          }
        }
      }
    } finally {
      dispatch(setStreaming(false));
    }
  };
