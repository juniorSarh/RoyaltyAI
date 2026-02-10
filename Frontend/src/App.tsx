import ChatWindow from "./components/chatWindow";
import MessageInput from "./components/messageInput";
import ModelSelector from "./components/modelSelector";
import "./styles/chat.css";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <span className="app-title">Royalty AI</span>
      </header>
      <ModelSelector />
      <ChatWindow />
      <MessageInput />
    </div>
  );
}
