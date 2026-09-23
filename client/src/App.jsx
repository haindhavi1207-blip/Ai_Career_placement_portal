import { useState, useEffect } from "react";
import "./index.css";

import Home from "./Home";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Opportunities from "./Opportunities";
import AISection from "./AISection";
import RecruiterAdmin from "./RecruiterAdmin";
import StartupDashboard from "./StartupDashboard";

import { Sidebar, Navbar } from "./Components";

// Central config for each role: title shown in navbar, whether the
// sidebar is shown, and which student-style "page" nav it uses (if any).
const ROLE_CONFIG = {
  Student: { title: "🎓 Student Dashboard", showSidebar: true },
  Company: { title: "🏢 Recruiter Dashboard", showSidebar: false },
  Startup: { title: "🚀 Startup Dashboard", showSidebar: true },
  Admin: { title: "⚙️ Admin Dashboard", showSidebar: false },
};

function App() {
  const [role, setRole] = useState(
    () => localStorage.getItem("app_role") || "Home"
  );
  const [page, setPage] = useState(
    () => localStorage.getItem("app_page") || "Dashboard"
  );
  const [search, setSearch] = useState("");

  // Persist session across refreshes so users aren't logged out
  // every time they reload the page.
  useEffect(() => {
    localStorage.setItem("app_role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("app_page", page);
  }, [page]);

  // Different roles have different sidebar menus (Student vs Startup),
  // so switching roles should land on that role's Dashboard, not
  // whatever page was last open for the previous role.
  useEffect(() => {
    setPage("Dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const handleLogout = () => {
    setRole("Home");
    setPage("Dashboard");
    setSearch("");
    localStorage.removeItem("app_role");
    localStorage.removeItem("app_page");
  };

  // ================= HOME =================
  if (role === "Home") {
    return <Home setPage={setRole} />;
  }

  const config = ROLE_CONFIG[role];

  // Unknown role fallback — prevents a blank screen if state gets corrupted.
  if (!config) {
    return (
      <div className="app">
        <div className="main">
          <p>Something went wrong. Please log in again.</p>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Renders the correct main content for the current role + page.
  const renderContent = () => {
    if (role === "Student") {
      if (page === "Dashboard") return <Dashboard />;
      if (page === "Profile") return <Profile />;
      if (["Internships", "Placements", "Startups"].includes(page)) {
        return <Opportunities search={search} />;
      }
      if (page === "AI Tools") return <AISection />;
      return <Dashboard />;
    }

    if (role === "Company") return <RecruiterAdmin role="Company" />;
    if (role === "Startup")
      return <StartupDashboard activeTab={page} search={search} />;
    if (role === "Admin") return <RecruiterAdmin />;

    return null;
  };

  return (
    <div className="app">
      {config.showSidebar && (
        <Sidebar currentPage={page} setCurrentPage={setPage} role={role} />
      )}

      <div className="main">
        <Navbar title={config.title} search={search} setSearch={setSearch} />

        {renderContent()}

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default App;
