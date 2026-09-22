import React from "react";
import heroImage from "./assets/hero.png";

function Hero() {
  return (
    <section className="hero-banner">

      <div className="hero-left">

        <span className="tag">🚀 AI Powered Career Platform</span>

        <h1>
          Build Your Career with <span>CareerAI</span>
        </h1>

        <p>
          A one-stop platform connecting Students, Companies and Startups
          through AI-powered internship recommendations, placement management,
          resume analysis and smart recruitment.
        </p>

        <div className="hero-features">

          <div>✅ AI Resume Analysis</div>

          <div>✅ Smart Internship Matching</div>

          <div>✅ Placement Analytics</div>

          <div>✅ Startup Collaboration</div>

        </div>

        <div className="hero-buttons">

          <button className="primary">
            🚀 Explore Platform
          </button>

          <button className="secondary">
            📊 1200+ Students
          </button>

        </div>

      </div>

      <div className="hero-right">

        <img src={heroImage} alt="CareerAI Hero" />

      </div>

    </section>
  );
}

export default Hero;