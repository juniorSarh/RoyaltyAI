import { useSelector } from "react-redux";
import { type RootState } from "../app/store";
import "../styles/chat.css";
//import MessageBubble from "./messageBubble";

export default function ChatWindow() {
  const messages = useSelector((state: RootState) => state.chat.messages);

   return (
    <div className="chat-window">
      {messages.map((m, i) => (
        <div key={i} className={`message ${m.role}`}>
          {m.content}
        </div>
      ))}
    </div>
  );
}
