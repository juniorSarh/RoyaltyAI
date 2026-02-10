import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ChatMessage, type ModelType } from "../types/chatTypes";

interface ChatState {
  messages: ChatMessage[];
  model: ModelType;
  streaming: boolean;
}

const initialState: ChatState = {
  messages: [],
  model: "trinity",
  streaming: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    updateLastAssistantMessage: (state, action: PayloadAction<string>) => {
      const last = state.messages[state.messages.length - 1];
      if (last?.role === "assistant") {
        last.content += action.payload;
      }
    },
    setModel: (state, action: PayloadAction<ModelType>) => {
      state.model = action.payload;
    },
    setStreaming: (state, action: PayloadAction<boolean>) => {
      state.streaming = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const {
  addMessage,
  updateLastAssistantMessage,
  setModel,
  setStreaming,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
