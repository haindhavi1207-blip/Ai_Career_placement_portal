import React, { useState } from "react";
import { StatCard, NotificationCard } from "./Components";
import { notifications as initialNotifications } from "./data";

// Reusable progress row so the three progress items aren't copy-pasted.
function ProgressItem({ label, percent, color }) {
  return (
    <div className="progress-item">
      <p>
        <strong>{label}</strong>
      </p>

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${percent}%`,
            ...(color ? { background: color } : {}),
          }}
        ></div>
      </div>

      <p>{percent}%</p>
    </div>
  );
}

const PROGRESS_ITEMS = [
  { label: "Profile Completion", percent: 80 },
  { label: "Resume Score", percent: 89, color: "#22c55e" },
  { label: "Placement Readiness", percent: 72, color: "#f59e0b" },
];

const UPCOMING_EVENTS = [
  { icon: "🏢", text: "TCS Internship Drive", date: "24 Sept" },
  { icon: "💻", text: "Infosys Coding Test", date: "28 Sept" },
  { icon: "🚀", text: "Startup Hiring Challenge", date: "30 Sept" },
  { icon: "🤖", text: "AI Resume Workshop", date: "2 Oct" },
];

function Dashboard() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [statusMsg, setStatusMsg] = useState("");

  const showStatus = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handleApply = () => showStatus("💼 Opening Internship Opportunities...");
  const handleResume = () => showStatus("📄 Resume Updated Successfully!");
  const handleAI = () => showStatus("🤖 AI Resume Review feature coming soon!");

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1 className="page-title">🎓 Student Dashboard</h1>

      <p className="dashboard-subtitle">
        Welcome back! Here's an overview of your placement journey.
      </p>

      {statusMsg && <div className="status-toast">{statusMsg}</div>}

      {/* Statistics */}

      <div className="card-grid">
        <StatCard title="Internships" value="24" icon="💼" />
        <StatCard title="Placements" value="12" icon="🎯" />
        <StatCard title="Applications" value="8" icon="📝" />
        <StatCard title="Resume Score" value="89%" icon="📄" trend="+4%" />
      </div>

      {/* Quick Actions */}

      <h2 className="section-title">⚡ Quick Actions</h2>

      <div className="action-grid">
        <button className="primary-btn" onClick={handleApply}>
          💼 Apply Internship
        </button>

        <button className="success-btn" onClick={handleResume}>
          📄 Update Resume
        </button>

        <button className="warning-btn" onClick={handleAI}>
          🤖 AI Resume Review
        </button>
      </div>

      {/* Notifications */}

      <h2 className="section-title">🔔 Notifications</h2>

      <div className="notification-area">
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationCard
              key={item.id}
              text={item.text}
              onDismiss={() => dismissNotification(item.id)}
            />
          ))
        ) : (
          <p className="empty-state">You're all caught up 🎉</p>
        )}
      </div>

      {/* Placement Progress */}

      <h2 className="section-title">📈 Placement Progress</h2>

      <div className="progress-card">
        {PROGRESS_ITEMS.map((item) => (
          <ProgressItem
            key={item.label}
            label={item.label}
            percent={item.percent}
            color={item.color}
          />
        ))}
      </div>

      {/* Upcoming */}

      <h2 className="section-title">📅 Upcoming Events</h2>

      <div className="job-card">
        {UPCOMING_EVENTS.map((event) => (
          <p key={event.text}>
            {event.icon} {event.text} - {event.date}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
