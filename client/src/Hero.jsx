import React from "react";
import heroImage from "./assets/hero.png";

const FEATURES = [
  "AI Resume Analysis",
  "Smart Internship Matching",
  "Placement Analytics",
  "Startup Collaboration",
];

const STATS = [
  { label: "Students", value: "1,200+" },
  { label: "Companies", value: "80+" },
  { label: "Placements", value: "450+" },
];

function Hero({ onExplore = () => {} }) {
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
          {FEATURES.map((feature) => (
            <div key={feature}>✅ {feature}</div>
          ))}
        </div>

        <div className="hero-buttons">
          <button className="primary" onClick={onExplore}>
            🚀 Explore Platform
          </button>

          <button
            className="secondary"
            onClick={() =>
              document
                .getElementById("hero-stats")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            📊 1,200+ Students
          </button>
        </div>

        <div id="hero-stats" className="hero-stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <img
          src={heroImage}
          alt="Students and recruiters collaborating on the CareerAI platform"
          loading="eager"
          width="520"
          height="480"
        />
      </div>
    </section>
  );
}

export default Hero;
