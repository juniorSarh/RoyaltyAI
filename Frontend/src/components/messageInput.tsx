import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { streamChat } from "../services/chatAPI";
import { type RootState } from "../app/store";

export default function MessageInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const streaming = useSelector((state: RootState) => state.chat.streaming);

  const send = () => {
    if (!text.trim() || streaming) return;
    dispatch<any>(streamChat(text));
    setText("");
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1 }}
        placeholder="Type your message..."
      />
      <button onClick={send} disabled={streaming}>
        Send
      </button>
    </div>
  );
}
