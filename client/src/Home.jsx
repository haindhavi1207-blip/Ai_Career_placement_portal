import React, { useState } from "react";
import Hero from "./Hero";

function Home({ setPage }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!username || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email.");
      return;
    }

    alert(`Welcome ${username}!`);

    setPage(selectedRole);
  }

  // ================= LOGIN PAGE =================

  if (selectedRole) {
    return (
      <div className="home-container">

        <div className="login-card">

          <Hero />

          <h1>{selectedRole} Login</h1>

          <p>
            Login to continue to the {selectedRole} Dashboard
          </p>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            Login
          </button>

          <button
            className="back-btn"
            onClick={() => {
              setSelectedRole(null);
              setUsername("");
              setEmail("");
              setPassword("");
            }}
          >
            ← Back
          </button>

        </div>

      </div>
    );
  }

  // ================= LANDING PAGE =================

  return (
    <div className="home-container">

      <div className="hero-section">

        <Hero />

        <h1 className="portal-title">
          CareerAI Portal
        </h1>

        <p className="portal-subtitle">
          AI Powered Internship, Placement, Recruitment & Startup Management Portal
        </p>

        <div className="role-cards">

          {/* STUDENT */}

          <div className="role-card">

            <div className="icon">🎓</div>

            <h2>Student</h2>

            <p>
              Apply for internships, placements, AI Resume Review,
              career guidance and track applications.
            </p>

            <button
              className="student-btn"
              onClick={() => setSelectedRole("Student")}
            >
              Student Login
            </button>

          </div>

          {/* RECRUITER */}

          <div className="role-card">

            <div className="icon">🏢</div>

            <h2>Recruiter</h2>

            <p>
              Post jobs, shortlist candidates,
              manage recruitment drives and interviews.
            </p>

            <button
              className="company-btn"
              onClick={() => setSelectedRole("Company")}
            >
              Recruiter Login
            </button>

          </div>

          {/* STARTUP */}

          <div className="role-card">

            <div className="icon">🚀</div>

            <h2>Startup</h2>

            <p>
              Discover student talent,
              recruit interns and build your startup team.
            </p>

            <button
              className="startup-btn"
              onClick={() => setSelectedRole("Startup")}
            >
              Startup Login
            </button>

          </div>

          {/* ADMIN */}

          <div className="role-card">

            <div className="icon">⚙️</div>

            <h2>Admin</h2>

            <p>
              Manage students,
              recruiters,
              startups,
              jobs,
              portal analytics and system settings.
            </p>

            <button
              className="admin-btn"
              onClick={() => setSelectedRole("Admin")}
            >
              Admin Login
            </button>

          </div>

        </div>

        <footer className="footer">

          <p>
            Developed using React + Vite
          </p>

          <p>
            AI Powered Internship, Placement & Startup Management Portal © 2026
          </p>

        </footer>

      </div>

    </div>
  );
}

export default Home;