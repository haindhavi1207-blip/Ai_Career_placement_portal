import React, { useState } from "react";
import Hero from "./Hero";

const ROLES = [
  {
    key: "Student",
    icon: "🎓",
    title: "Student",
    description:
      "Apply for internships, placements, AI Resume Review, career guidance and track applications.",
    btnClass: "student-btn",
  },
  {
    key: "Company",
    icon: "🏢",
    title: "Recruiter",
    description:
      "Post jobs, shortlist candidates, manage recruitment drives and interviews.",
    btnClass: "company-btn",
  },
  {
    key: "Startup",
    icon: "🚀",
    title: "Startup",
    description:
      "Discover student talent, recruit interns and build your startup team.",
    btnClass: "startup-btn",
  },
  {
    key: "Admin",
    icon: "⚙️",
    title: "Admin",
    description:
      "Manage students, recruiters, startups, jobs, portal analytics and system settings.",
    btnClass: "admin-btn",
  },
];

function Home({ setPage }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function validate() {
    const nextErrors = {};

    if (!username.trim()) nextErrors.username = "Username is required.";

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleLogin() {
    if (!validate()) return;

    setIsLoggingIn(true);

    // Simulated auth delay — replace with a real API call later.
    setTimeout(() => {
      setIsLoggingIn(false);
      setPage(selectedRole);
    }, 600);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleLogin();
  }

  function resetLoginForm() {
    setSelectedRole(null);
    setUsername("");
    setEmail("");
    setPassword("");
    setErrors({});
  }

  function scrollToRoles() {
    document
      .getElementById("role-cards")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  // ================= LOGIN PAGE =================

  if (selectedRole) {
    const roleInfo = ROLES.find((r) => r.key === selectedRole);

    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-left">
            <Hero onExplore={scrollToRoles} />
          </div>

          <div className="login-right">
            <h1>
              {roleInfo?.icon} {selectedRole} Login
            </h1>

            <p>Login to continue to the {selectedRole} Dashboard</p>

            <div className="input-group">
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-invalid={!!errors.username}
              />
              {errors.username && (
                <span className="field-error">{errors.username}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((s) => !s)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>

            <button className="back-btn" onClick={resetLoginForm}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= LANDING PAGE =================

  return (
    <div className="home-container">
      <div className="hero-section">
        <Hero onExplore={scrollToRoles} />

        <h1 className="portal-title">CareerAI Portal</h1>

        <p className="portal-subtitle">
          AI Powered Internship, Placement, Recruitment & Startup Management
          Portal
        </p>

        <div id="role-cards" className="role-cards">
          {ROLES.map((role) => (
            <div className="role-card" key={role.key}>
              <div className="icon">{role.icon}</div>

              <h2>{role.title}</h2>

              <p>{role.description}</p>

              <button
                className={role.btnClass}
                onClick={() => setSelectedRole(role.key)}
              >
                {role.title} Login
              </button>
            </div>
          ))}
        </div>

        <footer className="footer">
          <p>Developed using React + Vite</p>
          <p>
            AI Powered Internship, Placement & Startup Management Portal ©
            2026
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
