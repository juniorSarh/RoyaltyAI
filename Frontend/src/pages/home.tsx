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
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, onNewChat, isOpen = false, onClose }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <button className="new-chat-button" onClick={onNewChat}>
            + New chat
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#">Search chats</a></li>
            {/* <li><a href="#">Images</a></li> */}
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
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
    </>
  );
};

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, streaming, model } = useSelector((state: any) => state.chat);
  const [input, setInput] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(window.innerWidth > 768);
  //const [testResponse, setTestResponse] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Debug: Log messages state changes
  React.useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant") {
      console.log("🎨 Assistant message:", lastMessage.content);
    }
  }, [messages, streaming]);

  // Handle window resize for sidebar visibility
  React.useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.custom-dropdown')) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [dropdownOpen]);

  const dummyChats = [
   ""
  ];

  const models: { key: ModelType; name: string }[] = [
    { key: "trinity", name: "Trinity" },
    { key: "stepfun", name: "StepFun" },
    { key: "glm", name: "GLM" },
    { key: "nemotron", name: "Nemotron" },
    { key: "gpt_oss", name: "GPT-OSS" },
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
      {/* Sidebar logic remains same */}
      <Sidebar 
        chats={dummyChats} 
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <header className="chat-header">
           <button className="mobile-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
           <h2 className="model-badge">{models.find(m => m.key === model)?.name}</h2>
        </header>

        <div className="chat-messages-container">
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <div className="logo-placeholder">R</div>
              <h1>How can I help you today?</h1>
            </div>
          ) : (
            <div className="chat-messages">
              {messages.map((message: any, index: number) => (
                <div key={index} className={`message-row ${message.role}`}>
                  <div className="avatar">
                    {message.role === "assistant" ? "AI" : "U"}
                  </div>
                  <div className="message-content">
                    <div className="sender-name">
                      {message.role === "assistant" ? "Royalty AI" : "You"}
                    </div>
                    <div className="message-bubble">
                      {message.role === "assistant" ? (
                        <MarkdownRenderer content={message.content} />
                      ) : (
                        <p>{message.content}</p>
                      )}
                      {streaming && index === messages.length - 1 && (
                        <span className="cursor-blink" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="input-area">
          <div className="input-card">
            <div className="input-actions">
              <div className="custom-dropdown">
                {/* Your existing dropdown code */}
              </div>
            </div>
            <textarea
              className="chat-textarea"
              placeholder="Message Royalty AI..."
              value={input}
              rows={1}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress} // Renamed for clarity
            />
            <button
              className={`send-action-btn ${input.trim() ? 'active' : ''}`}
              onClick={handleSendMessage}
              disabled={streaming || !input.trim()}
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
          <p className="input-footer-text">Royalty AI can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

