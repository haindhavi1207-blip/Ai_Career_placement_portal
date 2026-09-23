import React, { useState, useEffect } from "react";
import { StatCard } from "./Components";
import {
  startupProjects as defaultProjects,
  startupApplicants as defaultApplicants,
  startupAnalytics,
} from "./data";

const PROJECTS_KEY = "startupProjects";
const APPLICANTS_KEY = "startupApplicants";

const STAGES = ["Applied", "Interviewing", "Hired", "Rejected"];
const STAGE_COLORS = {
  Applied: "#2563eb",
  Interviewing: "#f59e0b",
  Hired: "#16a34a",
  Rejected: "#dc2626",
};

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

/* ================= DASHBOARD OVERVIEW ================= */

function DashboardTab({ projects, applicants }) {
  const hiredCount = applicants.filter((a) => a.status === "Hired").length;
  const activeProjects = projects.filter(
    (p) => p.status !== "Completed"
  ).length;

  return (
    <>
      <div className="card-grid">
        <StatCard title="Active Projects" value={activeProjects} icon="📂" />
        <StatCard title="Interns Hired" value={hiredCount} icon="👨‍💻" />
        <StatCard title="Applications" value={applicants.length} icon="📝" />
        <StatCard title="Funding Stage" value="Seed" icon="💰" />
      </div>

      <h2 className="section-title">📈 Applications This Year</h2>
      <div className="chart-card">
        <div className="bar-chart">
          {startupAnalytics.months.map((month, i) => {
            const value = startupAnalytics.monthlyApplications[i];
            const max = Math.max(...startupAnalytics.monthlyApplications);
            return (
              <div className="bar-col" key={month}>
                <div
                  className="bar"
                  style={{ height: `${(value / max) * 100}%` }}
                  title={`${value} applications`}
                ></div>
                <span>{month}</span>
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="section-title">🚀 Active Projects</h2>
      <div className="job-grid">
        {projects.slice(0, 3).map((p) => (
          <div className="job-card" key={p.id}>
            <h2>{p.title}</h2>
            <p>{p.description}</p>
            <div className="tech-tags">
              {p.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <p className={`status-pill ${p.status.toLowerCase().replace(" ", "-")}`}>
              {p.status}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ================= PROJECTS TAB ================= */

function ProjectsTab({ projects, setProjects, search }) {
  const [form, setForm] = useState({ title: "", description: "", stack: "" });
  const [error, setError] = useState("");

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const addProject = () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setProjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: form.title,
        description: form.description,
        stack: form.stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        status: "Planning",
      },
    ]);
    setForm({ title: "", description: "", stack: "" });
    setError("");
  };

  const cycleStatus = (id) => {
    const order = ["Planning", "In Progress", "Completed"];
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: order[(order.indexOf(p.status) + 1) % order.length] }
          : p
      )
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <h2 className="section-title">Add a Project</h2>
      <div className="admin-form">
        <input
          type="text"
          placeholder="Project title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Short description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tech stack (comma-separated)"
          value={form.stack}
          onChange={(e) => setForm({ ...form, stack: e.target.value })}
        />
        <button onClick={addProject}>Add Project</button>
      </div>
      {error && <p className="field-error">{error}</p>}

      <h2 className="section-title">All Projects</h2>
      {filtered.length > 0 ? (
        <div className="job-grid">
          {filtered.map((p) => (
            <div className="job-card" key={p.id}>
              <h2>{p.title}</h2>
              <p>{p.description}</p>
              <div className="tech-tags">
                {p.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <button
                className={`status-pill clickable ${p.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
                onClick={() => cycleStatus(p.id)}
                title="Click to advance status"
              >
                {p.status} →
              </button>
              <button className="delete-btn" onClick={() => deleteProject(p.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">No projects match your search.</p>
      )}
    </>
  );
}

/* ================= HIRING PIPELINE (INTERNS) TAB ================= */

function PipelineTab({ applicants, setApplicants, search }) {
  const filtered = applicants.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const advanceStage = (id) => {
    setApplicants((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        if (a.status === "Rejected" || a.status === "Hired") return a;
        const nextIndex = STAGES.indexOf(a.status) + 1;
        return { ...a, status: STAGES[Math.min(nextIndex, 2)] };
      })
    );
  };

  const rejectApplicant = (id) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a))
    );
  };

  return (
    <div className="pipeline-board">
      {STAGES.map((stage) => (
        <div className="pipeline-column" key={stage}>
          <h3 style={{ color: STAGE_COLORS[stage] }}>
            {stage} ({filtered.filter((a) => a.status === stage).length})
          </h3>

          {filtered
            .filter((a) => a.status === stage)
            .map((a) => (
              <div className="pipeline-card" key={a.id}>
                <strong>{a.name}</strong>
                <p>{a.role}</p>
                {stage !== "Hired" && stage !== "Rejected" && (
                  <div className="pipeline-actions">
                    <button onClick={() => advanceStage(a.id)}>Advance →</button>
                    <button
                      className="reject-btn"
                      onClick={() => rejectApplicant(a.id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}

          {filtered.filter((a) => a.status === stage).length === 0 && (
            <p className="empty-state">None</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ================= ANALYTICS TAB ================= */

function AnalyticsTab({ applicants }) {
  const counts = STAGES.map(
    (stage) => applicants.filter((a) => a.status === stage).length
  );
  const max = Math.max(...counts, 1);

  return (
    <>
      <h2 className="section-title">📊 Hiring Funnel</h2>
      <div className="chart-card">
        <div className="bar-chart">
          {STAGES.map((stage, i) => (
            <div className="bar-col" key={stage}>
              <div
                className="bar"
                style={{
                  height: `${(counts[i] / max) * 100}%`,
                  background: STAGE_COLORS[stage],
                }}
                title={`${counts[i]} ${stage}`}
              ></div>
              <span>{stage}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="section-title">📈 Applications This Year</h2>
      <div className="chart-card">
        <div className="bar-chart">
          {startupAnalytics.months.map((month, i) => {
            const value = startupAnalytics.monthlyApplications[i];
            const maxApps = Math.max(...startupAnalytics.monthlyApplications);
            return (
              <div className="bar-col" key={month}>
                <div
                  className="bar"
                  style={{ height: `${(value / maxApps) * 100}%` }}
                  title={`${value} applications`}
                ></div>
                <span>{month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ================= MAIN COMPONENT ================= */

function StartupDashboard({ activeTab = "Dashboard", search = "" }) {
  const [projects, setProjects] = useState(() =>
    loadFromStorage(PROJECTS_KEY, defaultProjects)
  );
  const [applicants, setApplicants] = useState(() =>
    loadFromStorage(APPLICANTS_KEY, defaultApplicants)
  );

  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(APPLICANTS_KEY, JSON.stringify(applicants));
  }, [applicants]);

  return (
    <div>
      <h1 className="page-title">🚀 Startup Dashboard</h1>

      {activeTab === "Dashboard" && (
        <DashboardTab projects={projects} applicants={applicants} />
      )}

      {activeTab === "Projects" && (
        <ProjectsTab
          projects={projects}
          setProjects={setProjects}
          search={search}
        />
      )}

      {(activeTab === "Interns" || activeTab === "Hiring") && (
        <>
          <h2 className="section-title">
            {activeTab === "Interns" ? "👨‍💻 Intern Pipeline" : "💼 Hiring Pipeline"}
          </h2>
          <PipelineTab
            applicants={applicants}
            setApplicants={setApplicants}
            search={search}
          />
        </>
      )}

      {activeTab === "Analytics" && <AnalyticsTab applicants={applicants} />}
    </div>
  );
}

export default StartupDashboard;
