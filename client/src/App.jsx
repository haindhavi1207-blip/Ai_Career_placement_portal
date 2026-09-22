import { useState } from "react";
import "./index.css";

import Home from "./Home";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Opportunities from "./Opportunities";
import AISection from "./AISection";
import RecruiterAdmin from "./RecruiterAdmin";

import { Sidebar, Navbar } from "./Components";

function App() {

  const [role, setRole] = useState("Home");
  const [page, setPage] = useState("Dashboard");
  const [search, setSearch] = useState("");

  // ================= HOME =================

  if (role === "Home") {
    return <Home setPage={setRole} />;
  }

  // ================= STUDENT =================

  if (role === "Student") {

    return (

      <div className="app">

        <Sidebar
          currentPage={page}
          setCurrentPage={setPage}
        />

        <div className="main">

          <Navbar
            title="🎓 Student Dashboard"
            search={search}
            setSearch={setSearch}
          />

          {page === "Dashboard" && <Dashboard />}

          {page === "Profile" && <Profile />}

          {(page === "Internships" ||
            page === "Placements" ||
            page === "Startups") && (
            <Opportunities search={search} />
          )}

          {page === "AI Tools" && <AISection />}

          <button
            className="logout-btn"
            onClick={()=>{
              setRole("Home");
              setPage("Dashboard");
            }}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    );

  }

  // ================= RECRUITER =================

  if (role === "Company") {

    return (

      <div className="app">

        <div className="main">

          <Navbar
            title="🏢 Recruiter Dashboard"
            search={search}
            setSearch={setSearch}
          />

          <RecruiterAdmin role="Company" />

          <button
            className="logout-btn"
            onClick={()=>{
              setRole("Home");
            }}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    );

  }

  // ================= STARTUP =================

  if (role === "Startup") {

    return (

      <div className="app">

        <div className="main">

          <Navbar
            title="🚀 Startup Dashboard"
            search={search}
            setSearch={setSearch}
          />

          <Opportunities search={search} />

          <button
            className="logout-btn"
            onClick={()=>{
              setRole("Home");
            }}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    );

  }

  // ================= ADMIN =================

  if (role === "Admin") {

    return (

      <div className="app">

        <div className="main">

          <Navbar
            title="⚙️ Admin Dashboard"
            search={search}
            setSearch={setSearch}
          />

          <RecruiterAdmin />

          <button
            className="logout-btn"
            onClick={()=>{
              setRole("Home");
            }}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    );

  }

  return null;

}

export default App;