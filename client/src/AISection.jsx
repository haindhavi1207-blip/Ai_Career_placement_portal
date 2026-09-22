import React, { useState } from "react";

function AISection() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = () => {
    if (question.trim() === "") {
      alert("Please enter a question.");
      return;
    }

    const q = question.toLowerCase();

    if (q.includes("resume")) {
      setAnswer(
        "Your resume should include strong projects, technical skills, certifications, and achievements."
      );
    } else if (q.includes("interview")) {
      setAnswer(
        "Practice DSA, DBMS, Operating Systems, Computer Networks, and HR questions."
      );
    } else if (q.includes("skill")) {
      setAnswer(
        "Learn React, Node.js, MongoDB, Java, Python, DSA, Git, and SQL."
      );
    } else if (q.includes("placement")) {
      setAnswer(
        "Maintain a good CGPA, build projects, solve LeetCode problems, and apply regularly."
      );
    } else {
      setAnswer(
        "This is a frontend AI demo. Later you can connect it to OpenAI API."
      );
    }
  };

  return (
    <div>
      <h1 className="page-title">AI Career Assistant</h1>

      <div className="ai-container">

        <div className="ai-card">
          <h2>Resume Score</h2>

          <div className="score-circle">
            <h1>89%</h1>
          </div>

          <p>Your resume is good but can be improved.</p>
        </div>

        <div className="ai-card">
          <h2>Career Roadmap</h2>

          <ul className="roadmap">
            <li>✔ Learn React</li>
            <li>✔ Learn Node.js</li>
            <li>✔ Practice DSA</li>
            <li>✔ Build Projects</li>
            <li>✔ Apply for Internships</li>
          </ul>
        </div>

      </div>

      <div className="chat-box">

        <h2>Ask AI</h2>

        <input
          type="text"
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={askAI}>
          Ask
        </button>

        <div className="answer-box">
          {answer || "AI answer will appear here."}
        </div>

      </div>
    </div>
  );
}

export default AISection;