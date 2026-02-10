import { useSelector } from "react-redux";
import { type RootState } from "../app/store";
import MessageBubble from "./messageBubble";

export default function ChatWindow() {
  const messages = useSelector((state: RootState) => state.chat.messages);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} content={m.content} />
      ))}
    </div>
  );
}
