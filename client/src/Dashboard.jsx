import React from "react";
import { StatCard, NotificationCard } from "./Components";
import { notifications } from "./data";

function Dashboard() {

  const handleApply = () => {
    alert("Opening Internship Opportunities...");
  };

  const handleResume = () => {
    alert("Resume Updated Successfully!");
  };

  const handleAI = () => {
    alert("AI Resume Review feature coming soon!");
  };

  return (
    <div>

      <h1 className="page-title">
        🎓 Student Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Welcome back! Here's an overview of your placement journey.
      </p>

      {/* Statistics */}

      <div className="card-grid">

        <StatCard
          title="Internships"
          value="24"
        />

        <StatCard
          title="Placements"
          value="12"
        />

        <StatCard
          title="Applications"
          value="8"
        />

        <StatCard
          title="Resume Score"
          value="89%"
        />

      </div>

      {/* Quick Actions */}

      <h2 className="section-title">
        ⚡ Quick Actions
      </h2>

      <div className="action-grid">

        <button
          className="primary-btn"
          onClick={handleApply}
        >
          💼 Apply Internship
        </button>

        <button
          className="success-btn"
          onClick={handleResume}
        >
          📄 Update Resume
        </button>

        <button
          className="warning-btn"
          onClick={handleAI}
        >
          🤖 AI Resume Review
        </button>

      </div>

      {/* Notifications */}

      <h2 className="section-title">
        🔔 Notifications
      </h2>

      <div className="notification-area">

        {notifications.map((item) => (
          <NotificationCard
            key={item.id}
            text={item.text}
          />
        ))}

      </div>

      {/* Placement Progress */}

      <h2 className="section-title">
        📈 Placement Progress
      </h2>

      <div className="progress-card">

        <div className="progress-item">

          <p>
            <strong>Profile Completion</strong>
          </p>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: "80%" }}
            ></div>
          </div>

          <p>80%</p>

        </div>

        <br />

        <div className="progress-item">

          <p>
            <strong>Resume Score</strong>
          </p>

          <div className="progress">
            <div
              className="progress-fill green"
              style={{ width: "89%" }}
            ></div>
          </div>

          <p>89%</p>

        </div>

        <br />

        <div className="progress-item">

          <p>
            <strong>Placement Readiness</strong>
          </p>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: "72%",
                background: "#f59e0b",
              }}
            ></div>
          </div>

          <p>72%</p>

        </div>

      </div>

      {/* Upcoming */}

      <h2 className="section-title">
        📅 Upcoming Events
      </h2>

      <div className="job-card">

        <p>🏢 TCS Internship Drive - 24 Sept</p>

        <p>💻 Infosys Coding Test - 28 Sept</p>

        <p>🚀 Startup Hiring Challenge - 30 Sept</p>

        <p>🤖 AI Resume Workshop - 2 Oct</p>

      </div>

    </div>
  );
}

export default Dashboard;