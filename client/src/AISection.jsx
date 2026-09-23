import React, { useState, useRef, useEffect } from "react";

// Simple keyword -> response knowledge base.
// Add more entries here anytime without touching component logic.
const KNOWLEDGE_BASE = [
  {
    keywords: ["resume", "cv"],
    answer:
      "Your resume should include strong projects, technical skills, certifications, and quantifiable achievements. Keep it to 1 page, use action verbs, and tailor it to each job description.",
  },
  {
    keywords: ["interview"],
    answer:
      "Practice DSA, DBMS, Operating Systems, Computer Networks, and common HR questions. Do 2–3 mock interviews before the real one, and always prepare questions to ask the interviewer.",
  },
  {
    keywords: ["skill", "learn", "technology", "stack"],
    answer:
      "Focus on React, Node.js, MongoDB, Java or Python, DSA, Git, and SQL. Pick one backend and one frontend stack and go deep rather than spreading thin.",
  },
  {
    keywords: ["placement", "job", "hiring"],
    answer:
      "Maintain a good CGPA, build 3–4 solid projects, solve DSA problems consistently on LeetCode/GFG, and apply to internships early and often.",
  },
  {
    keywords: ["project"],
    answer:
      "Build projects that solve a real problem, use a full stack (frontend + backend + DB), and are deployed live with a GitHub repo and README.",
  },
  {
    keywords: ["salary", "package", "ctc"],
    answer:
      "Salary depends on role, company tier, and location. Research on Glassdoor/AmbitionBox, and always negotiate — most companies expect it.",
  },
  {
    keywords: ["linkedin", "network"],
    answer:
      "Keep your LinkedIn updated with projects and skills, post about what you build, and connect with recruiters and alumni in your target companies.",
  },
];

const DEFAULT_ANSWER =
  "I don't have a specific answer for that yet — try asking about resume, interview prep, skills, projects, or placements. (This is a frontend demo; connect it to a real AI API for open-ended answers.)";

function getAIAnswer(question) {
  const q = question.toLowerCase();
  const match = KNOWLEDGE_BASE.find((entry) =>
    entry.keywords.some((kw) => q.includes(kw))
  );
  return match ? match.answer : DEFAULT_ANSWER;
}

function AISection() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // {role: 'user'|'ai', text: string}
  const [isThinking, setIsThinking] = useState(false);
  const [resumeScore] = useState(89);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const askAI = () => {
    const trimmed = question.trim();
    if (trimmed === "") return;

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setIsThinking(true);

    // Simulate a short "thinking" delay for a more natural feel
    setTimeout(() => {
      const aiAnswer = getAIAnswer(trimmed);
      setMessages((prev) => [...prev, { role: "ai", text: aiAnswer }]);
      setIsThinking(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      askAI();
    }
  };

  const clearChat = () => setMessages([]);

  const roadmapSteps = [
    { label: "Learn React", done: true },
    { label: "Learn Node.js", done: true },
    { label: "Practice DSA", done: true },
    { label: "Build Projects", done: true },
    { label: "Apply for Internships", done: false },
  ];
  const completedCount = roadmapSteps.filter((s) => s.done).length;
  const progressPercent = Math.round(
    (completedCount / roadmapSteps.length) * 100
  );

  return (
    <div>
      <h1 className="page-title">AI Career Assistant</h1>

      <div className="ai-container">
        <div className="ai-card">
          <h2>Resume Score</h2>

          <div
            className="score-circle"
            style={{
              background: `conic-gradient(#4ade80 ${resumeScore * 3.6}deg, #2a2a2a 0deg)`,
            }}
          >
            <h1>{resumeScore}%</h1>
          </div>

          <p>
            {resumeScore >= 85
              ? "Great resume! Minor tweaks can push it even higher."
              : resumeScore >= 60
              ? "Your resume is good but can be improved."
              : "Your resume needs significant improvement."}
          </p>
        </div>

        <div className="ai-card">
          <h2>Career Roadmap</h2>

          <ul className="roadmap">
            {roadmapSteps.map((step) => (
              <li key={step.label} className={step.done ? "done" : "pending"}>
                {step.done ? "✔" : "○"} {step.label}
              </li>
            ))}
          </ul>

          <div className="roadmap-progress">
            <div className="roadmap-progress-track">
              <div
                className="roadmap-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>{progressPercent}% complete</span>
          </div>
        </div>
      </div>

      <div className="chat-box">
        <div className="chat-box-header">
          <h2>Ask AI</h2>
          {messages.length > 0 && (
            <button className="chat-clear-btn" onClick={clearChat}>
              Clear
            </button>
          )}
        </div>

        <div className="chat-history">
          {messages.length === 0 && !isThinking && (
            <div className="answer-box">
              Ask about resume, interviews, skills, projects, or placements —
              AI answer will appear here.
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.role === "user" ? "chat-msg user" : "chat-msg ai"}
            >
              <span className="chat-msg-label">
                {msg.role === "user" ? "You" : "AI"}
              </span>
              <p>{msg.text}</p>
            </div>
          ))}

          {isThinking && (
            <div className="chat-msg ai thinking">
              <span className="chat-msg-label">AI</span>
              <p>Thinking...</p>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-row">
          <input
            type="text"
            placeholder="Ask something... (e.g. How do I improve my resume?)"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Ask the AI a question"
          />

          <button onClick={askAI} disabled={question.trim() === ""}>
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default AISection;
