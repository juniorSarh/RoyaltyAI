import React from "react";
import "../styles/landing.css";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="landing-root">
      <header className="landing-header">
        <h1 className="logo">Royalty AI</h1>
        <nav>
          <a href="#features">Features</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>
            Hi Welcome.<br />
            <span>where curiosity meets AI.</span>
          </h2>
          <p>
            Royalty AI unifies the world’s most powerful open models for experiancing the world’s of Artificial Intellience  — into one seamless, streaming chat experience.
          </p>
          <button className="cta" onClick={() => navigate("/home")}>Start Chatting →</button>
        </div>

        <div className="hero-card">
          <div className="chat user">User: Explain transformers simply</div>
          <div className="chat ai">Royalty AI: Think of transformers as attention-based readers…</div>
          <div className="chat ai">Switching model → GLM ⚡</div>
          <div className="chat ai">GLM: Here’s a concise breakdown with examples…</div>
        </div>
      </section>

      <section id="features" className="features">
        <h3>Why Choose Royalty AI?</h3>
        <div className="feature-grid">
          <div className="feature">
            <span>🔁</span>
            <h4>Multi-Model Switching</h4>
            <p>Instantly swap between AI models without losing context.</p>
          </div>
          <div className="feature">
            <span>⚡</span>
            <h4>Live Streaming</h4>
            <p>Token-by-token responses with ultra-low latency.</p>
          </div>
          <div className="feature">
            <span>🧠</span>
            <h4>Smart Memory</h4>
            <p>Conversations feel natural with contextual awareness.</p>
          </div>
          <div className="feature">
            <span>🛡️</span>
            <h4>OpenRouter Powered</h4>
            <p>One API. Unlimited access to top open models.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        © 2026 Royalty AI • Built for developers • Powered by Royalty Technologies
      </footer>
    </div>
  );
};

export default LandingPage;
