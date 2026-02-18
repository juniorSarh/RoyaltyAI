import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      {/* Header */}
      <header className="landing-header">
        <h1 className="logo">Royalty AI</h1>
        <nav>
          <a href="#features">Features</a>
          {/* <a href="#">Docs</a>
          <a href="#" onClick={() => navigate("/home")}>Launch App</a> */}
        </nav>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h2>
            Hi! Welcome 😊.<br />
            <span>where curiosity meets intelligence.</span>
          </h2>
          <p>
            Royalty AI unifies the world's most powerful models — Allow users to switch between different AI models seamlessly and great conversational flow. Join the users community today and start chatting!
          </p>
          <button className="cta" onClick={() => navigate("/home")}>
            Start Chatting →
          </button>
        </div>

        {/* Chat Preview */}
        <div className="hero-card">
          <div className="chat user">User: Explain transformers simply</div>
          <div className="chat ai">Royalty AI: Think of transformers as attention‑based readers…</div>
          <div className="chat ai">Switching model → GLM ⚡</div>
          <div className="chat ai">GLM: Here's a concise breakdown with examples…</div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <h3>Why Choose Royalty AI?</h3>
        <div className="feature-grid">
          {[
            {
              title: "Multi‑Model Switching",
              desc: "Instantly swap between AI models without losing context.",
              icon: "🔁",
            },
            {
              title: "Live Streaming",
              desc: "Token‑by‑token responses with ultra‑low latency.",
              icon: "⚡",
            },
            {
              title: "Smart Memory",
              desc: "Conversations feel natural with contextual awareness.",
              icon: "🧠",
            },
            {
              title: "OpenRouter Powered",
              desc: "One API. Unlimited access to top open models.",
              icon: "🛡️",
            },
          ].map((f) => (
            <div key={f.title} className="feature">
              <span>{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        © 2026 Royalty AI • Built for developers • Powered by Roaylty Technologies 
      </footer>
    </div>
  );
};

export default LandingPage;

