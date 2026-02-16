import React from "react";

import { useNavigate } from "react-router-dom";



const LandingPage: React.FC = () => {

  const navigate = useNavigate();



  return (

    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] to-[#0f1426] text-[#eaeaff] font-sans">

      {/* Header */}

      <header className="flex items-center justify-between px-8 py-6">

        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-teal-300 bg-clip-text text-transparent">

          Royalty AI

        </h1>

        <nav className="space-x-6 text-sm">

          <a href="#features" className="hover:text-white">Features</a>

          <a href="#" className="hover:text-white">Docs</a>

          <a href="#" className="hover:text-white">Launch App</a>

        </nav>

      </header>



      {/* Hero */}

      <section className="grid md:grid-cols-2 gap-12 px-8 py-20 items-center">

        <div>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">

            One Interface.<br />

            <span className="bg-gradient-to-r from-indigo-400 to-teal-300 bg-clip-text text-transparent">

              Multiple AI Models.

            </span>

          </h2>

          <p className="text-indigo-200 max-w-xl mb-10">

            Royalty AI unifies the world’s most powerful open models — StepFun, GLM,

            Nemotron, and Trinity — into one seamless, streaming chat experience.

          </p>

          <button className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-400 to-teal-300 text-black shadow-lg hover:scale-105 transition" onClick={() => navigate("/home")}>

             Start Chatting →

          </button>

        </div>



        {/* Chat Preview */}

        <div className="relative rounded-2xl bg-[#12172a] p-6 shadow-2xl">

          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-400 to-teal-300 opacity-20" />

          <div className="relative space-y-3 text-sm">

            <div className="rounded-xl bg-[#0b0f1a] p-3 text-teal-300">

              User: Explain transformers simply

            </div>

            <div className="rounded-xl bg-[#0b0f1a] p-3 text-indigo-400">

              Royalty AI: Think of transformers as attention‑based readers…

            </div>

            <div className="rounded-xl bg-[#0b0f1a] p-3 text-indigo-400">

              Switching model → GLM ⚡

            </div>

            <div className="rounded-xl bg-[#0b0f1a] p-3 text-indigo-400">

              GLM: Here’s a concise breakdown with examples…

            </div>

          </div>

        </div>

      </section>



      {/* Features */}

      <section id="features" className="px-8 py-24">

        <h3 className="text-center text-3xl font-bold mb-16">

          Why Choose Royalty AI?

        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

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

            <div

              key={f.title}

              className="rounded-2xl bg-[#12172a] p-6 hover:-translate-y-2 transition shadow-xl"

            >

              <div className="text-3xl mb-4">{f.icon}</div>

              <h4 className="font-semibold mb-2">{f.title}</h4>

              <p className="text-indigo-200 text-sm">{f.desc}</p>

            </div>

          ))}

        </div>

      </section>



      {/* Footer */}

      <footer className="border-t border-white/10 px-8 py-6 text-center text-indigo-300 text-sm">

        © 2026 Royalty AI • Built for developers • Powered by OpenRouter

      </footer>

    </div>

  );

};



export default LandingPage;

