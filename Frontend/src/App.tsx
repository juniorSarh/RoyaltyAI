import ChatWindow from "./components/chatWindow";
import MessageInput from "./components/messageInput";
import ModelSelector from "./components/modelSelector";

export default function App() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h2>RoyaltyAI Chat</h2>
      <ModelSelector />
      <ChatWindow />
      <MessageInput />
    </div>
  );
}
