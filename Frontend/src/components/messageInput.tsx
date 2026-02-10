import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { streamChat } from "../services/chatAPI";
import { type RootState } from "../app/store";
import "../styles/chat.css";

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
    <div className="input-area">
      <input 
      className="chat-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1 }}
        placeholder="Type your message..."
      />
      <button className="btn" onClick={send} disabled={streaming}>
        Send
      </button>
    </div>
  );
}
