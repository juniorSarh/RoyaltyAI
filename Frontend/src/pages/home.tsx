import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "../app/store";
import { streamChat } from "../services/chatAPI";
import { setModel, clearChat } from "../features/chatSlice";
import { type ModelType } from "../types/chatTypes";
import MarkdownRenderer from "../components/MarkdownRenderer";
import "../styles/home.css";

interface SidebarProps {
  chats: string[];
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, onNewChat }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-button" onClick={onNewChat}>
          + New chat
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li><a href="#">Search chats</a></li>
          <li><a href="#">Images</a></li>
          <li><a href="#">Apps</a></li>
          <li><a href="#">Setting</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      </nav>
      <div className="your-chats">
        <h3>Your chats</h3>
        <ul>
          {chats.map((chat, index) => (
            <li key={index}><a href="#">{chat}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, streaming, model } = useSelector((state: any) => state.chat);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const dummyChats = [
    "React Router Navigation Fix",
    "Enable Firebase Storage", 
    "Caricature Request for Job",
    "Firebase Expo Connection Issue",
    "CV Update Full Stack Dev",
    "Motivational Letter IT Graduate",
    "React Native Restaurant App",
    "Code Review and Fixes",
    "User Emails by Age",
    "Audio Recording App CRUD",
  ];

  const models: { key: ModelType; name: string }[] = [
    { key: "trinity", name: "Trinity" },
    { key: "stepfun", name: "StepFun" },
    { key: "glm", name: "GLM" },
    { key: "nemotron", name: "Nemotron" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "" || streaming) return;

    dispatch(streamChat(input));
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    dispatch(clearChat());
    setInput("");
  };

  const handleModelChange = (newModel: ModelType) => {
    dispatch(setModel(newModel));
  };

  return (
    <div className="home-layout">
      <Sidebar 
        chats={dummyChats} 
        onNewChat={handleNewChat}
      />
      <div className="main-content">
        <div className="chat-messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h1>Where should we begin?</h1>
            </div>
          ) : (
            <div className="chat-messages">
              {messages.map((message: any, index: number) => (
                <div
                  key={index}
                  className={`message-wrapper ${message.role}`}
                >
                  <div className={`message-bubble ${message.role}`}>
                    {message.role === "assistant" ? (
                      <MarkdownRenderer content={message.content} />
                    ) : (
                      message.content
                    )}
                    {streaming && index === messages.length - 1 && (
                      <span className="streaming-cursor">|</span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        <div className="input-container">
          <div className="input-wrapper">
            <div className="input-box">
              <div className="input-controls">
                <select 
                  className="model-select-input"
                  value={model}
                  onChange={(e) => handleModelChange(e.target.value as ModelType)}
                >
                  {models.map((model) => (
                    <option key={model.key} value={model.key}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="chat-input-field"
                  placeholder="Message Royalty AI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={streaming}
                />
                <button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={streaming || input.trim() === ""}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

