import React, { useState } from "react";

/* =========================
   SIDEBAR
========================= */

// Menu items per role, pulled out of the component so it's data, not logic.
const SIDEBAR_MENUS = {
  Student: [
    { name: "Dashboard", icon: "🏠" },
    { name: "Profile", icon: "👤" },
    { name: "Internships", icon: "💼" },
    { name: "Placements", icon: "🎯" },
    { name: "Startups", icon: "🚀" },
    { name: "AI Tools", icon: "🤖" },
  ],
  Company: [
    { name: "Dashboard", icon: "🏢" },
    { name: "Jobs", icon: "💼" },
    { name: "Applicants", icon: "👨‍🎓" },
    { name: "Interviews", icon: "📅" },
    { name: "Analytics", icon: "📊" },
  ],
  Startup: [
    { name: "Dashboard", icon: "🚀" },
    { name: "Interns", icon: "👨‍💻" },
    { name: "Projects", icon: "📂" },
    { name: "Hiring", icon: "💼" },
    { name: "Analytics", icon: "📈" },
  ],
  Admin: [
    { name: "Dashboard", icon: "⚙️" },
    { name: "Students", icon: "🎓" },
    { name: "Recruiters", icon: "🏢" },
    { name: "Startups", icon: "🚀" },
    { name: "Reports", icon: "📊" },
    { name: "Settings", icon: "🔧" },
  ],
};

export function Sidebar({ currentPage, setCurrentPage, role = "Student" }) {
  const [collapsed, setCollapsed] = useState(false);
  const menu = SIDEBAR_MENUS[role] || [];

  return (
    <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <div className="sidebar-header">
        <h2 className="logo">{collapsed ? "CA" : "CareerAI"}</h2>
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {menu.map((item) => (
        <button
          key={item.name}
          className={currentPage === item.name ? "active" : ""}
          onClick={() => setCurrentPage(item.name)}
          title={item.name}
        >
          <span style={{ marginRight: collapsed ? 0 : "10px" }}>
            {item.icon}
          </span>
          {!collapsed && item.name}
        </button>
      ))}
    </aside>
  );
}

/* =========================
   NAVBAR
========================= */

export function Navbar({ title, search = "", setSearch = () => {} }) {
  return (
    <div className="navbar">
      <h1>{title}</h1>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="search-clear-btn"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

/* =========================
   STAT CARD
========================= */

export function StatCard({ title, value, icon, trend }) {
  return (
    <div className="card">
      {icon && <div className="card-icon">{icon}</div>}
      <h3>{title}</h3>
      <h2>{value}</h2>
      {trend && (
        <span className={trend.startsWith("-") ? "trend down" : "trend up"}>
          {trend.startsWith("-") ? "▼" : "▲"} {trend}
        </span>
      )}
    </div>
  );
}

/* =========================
   OPPORTUNITY CARD
========================= */

export function OpportunityCard({
  company,
  role,
  location,
  extra,
  deadline,
  onApply,
}) {
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleApply = () => {
    setApplied(true);
    onApply?.();
  };

  return (
    <div className="job-card">
      <button
        className={saved ? "save-btn saved" : "save-btn"}
        onClick={() => setSaved((s) => !s)}
        aria-label={saved ? "Remove from saved" : "Save opportunity"}
        title={saved ? "Saved" : "Save for later"}
      >
        {saved ? "★" : "☆"}
      </button>

      <h2>{company}</h2>

      <p>
        <strong>Role:</strong> {role}
      </p>

      <p>
        <strong>Location:</strong> {location}
      </p>

      {deadline && (
        <p className="deadline">
          <strong>Apply by:</strong> {deadline}
        </p>
      )}

      {extra && <p className="highlight">{extra}</p>}

      <button
        className={applied ? "apply-btn applied" : "apply-btn"}
        onClick={handleApply}
        disabled={applied}
      >
        {applied ? "✔ Applied" : "Apply Now"}
      </button>
    </div>
  );
}

/* =========================
   NOTIFICATION
========================= */

export function NotificationCard({ text, type = "info", onDismiss }) {
  const icons = {
    info: "🔔",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  };

  return (
    <div className={`notification ${type}`}>
      <span>
        {icons[type] || "🔔"} {text}
      </span>
      {onDismiss && (
        <button
          className="notification-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      )}
    </div>
  );
}

/* =========================
   PROFILE CARD
========================= */

const FALLBACK_AVATAR =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23555'/><text x='50%' y='55%' font-size='40' fill='white' text-anchor='middle' dominant-baseline='middle'>?</text></svg>";

export function ProfileCard({ student }) {
  if (!student) {
    return <div className="profile-card">No profile data available.</div>;
  }

  const {
    profileImage,
    name = "Unnamed",
    branch = "—",
    cgpa = "—",
    skills = [],
  } = student;

  return (
    <div className="profile-card">
      <img
        src={profileImage || FALLBACK_AVATAR}
        alt={name}
        onError={(e) => {
          e.currentTarget.src = FALLBACK_AVATAR;
        }}
      />

      <h2>{name}</h2>

      <p>
        <strong>Branch:</strong> {branch}
      </p>

      <p>
        <strong>CGPA:</strong> {cgpa}
      </p>

      <h3>Skills</h3>

      <div className="skills">
        {skills.length > 0 ? (
          skills.map((skill, index) => <span key={index}>{skill}</span>)
        ) : (
          <span className="skills-empty">No skills added yet</span>
        )}
      </div>
    </div>
  );
}
