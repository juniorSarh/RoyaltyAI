import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { streamChat } from "../services/chatAPI";
import { setModel } from "../features/chatSlice";
import { type RootState } from "../app/store";
import "../styles/home.css";

export default function Home() {
  const [text, setText] = useState("");
  const [showChat, setShowChat] = useState(false);
  const dispatch = useDispatch();
  const { model, streaming, messages } = useSelector((state: RootState) => state.chat);

  const send = () => {
    if (!text.trim() || streaming) return;
    dispatch<any>(streamChat(text));
    setText("");
    setShowChat(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1 className="home-title">Royalty AI</h1>
        
        {!showChat && messages.length === 0 && (
          <p className="home-greeting">Hi there, what you want to know?</p>
        )}
      </header>

      {/* Chat Messages */}
      {showChat && (
        <div className="chat-messages-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-wrapper ${message.role}`}
              >
                <div className="message-bubble">
                  {message.content || <span className="streaming-cursor">▋</span>}
                </div>
              </div>
            ))}
            {streaming && (
              <div className="message-wrapper assistant">
                <div className="message-bubble">
                  <span className="streaming-cursor">▋</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="input-container">
        <div className="input-wrapper">
          <div className="input-box">
            <div className="input-controls">
              {/* Model Selector Button */}
              <button
                onClick={() => {
                  const models = ['trinity', 'stepfun', 'glm', 'nemotron'];
                  const currentIndex = models.indexOf(model);
                  const nextIndex = (currentIndex + 1) % models.length;
                  dispatch(setModel(models[nextIndex] as any));
                }}
                className="model-button"
              >
                {model.charAt(0).toUpperCase() + model.slice(1)}^
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything here......."
                className="chat-input-field"
                disabled={streaming}
              />

              {/* Send Button */}
              <button
                onClick={send}
                disabled={!text.trim() || streaming}
                className="send-button"
              >
                {streaming ? '...' : 'chat'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
