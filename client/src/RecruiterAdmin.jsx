import React, { useState, useEffect } from "react";
import { StatCard } from "./Components";

const STORAGE_KEY = "postedJobs";

const DEFAULT_JOBS = [
  { id: 1, company: "Google", role: "Frontend Intern", location: "Bangalore" },
  { id: 2, company: "Microsoft", role: "Software Engineer", location: "Hyderabad" },
];

function loadInitialJobs() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_JOBS;
  } catch {
    return DEFAULT_JOBS;
  }
}

const EMPTY_JOB = { company: "", role: "", location: "" };

function RecruiterAdmin({ role }) {
  const [jobs, setJobs] = useState(loadInitialJobs);
  const [job, setJob] = useState(EMPTY_JOB);
  const [errors, setErrors] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [jobSearch, setJobSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    if (!statusMsg) return;
    const timer = setTimeout(() => setStatusMsg(""), 2500);
    return () => clearTimeout(timer);
  }, [statusMsg]);

  const handleChange = (e) => {
    setJob((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateJob = () => {
    const nextErrors = {};
    if (!job.company.trim()) nextErrors.company = "Company is required.";
    if (!job.role.trim()) nextErrors.role = "Role is required.";
    if (!job.location.trim()) nextErrors.location = "Location is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const addJob = () => {
    if (!validateJob()) return;

    setJobs((prev) => [...prev, { id: Date.now(), ...job }]);
    setJob(EMPTY_JOB);
    setErrors({});
    setStatusMsg("✅ Job posted successfully!");
  };

  const handleJobKeyDown = (e) => {
    if (e.key === "Enter") addJob();
  };

  // Two-step delete: first click asks for confirmation, second click deletes.
  const requestDelete = (id) => {
    if (confirmDeleteId === id) {
      setJobs((prev) => prev.filter((item) => item.id !== id));
      setConfirmDeleteId(null);
      setStatusMsg("🗑 Job removed.");
    } else {
      setConfirmDeleteId(id);
    }
  };

  const filteredJobs = jobs.filter((item) =>
    item.company.toLowerCase().includes(jobSearch.toLowerCase())
  );

  // ================= ADMIN =================

  if (role === "Admin") {
    return (
      <div>
        <h1 className="page-title">⚙️ Admin Dashboard</h1>

        {statusMsg && <div className="status-toast">{statusMsg}</div>}

        <div className="card-grid">
          <StatCard title="Total Students" value="1245" icon="🎓" />
          <StatCard title="Recruiters" value="87" icon="🏢" />
          <StatCard title="Startups" value="42" icon="🚀" />
          <StatCard title="Jobs Posted" value={jobs.length} icon="💼" />
        </div>

        <h2 className="section-title">Portal Management</h2>

        <div className="action-grid">
          <button
            className="primary-btn"
            onClick={() => setStatusMsg("📋 Student management coming soon.")}
          >
            Manage Students
          </button>

          <button
            className="success-btn"
            onClick={() => setStatusMsg("✅ Recruiter approvals coming soon.")}
          >
            Approve Recruiters
          </button>

          <button
            className="warning-btn"
            onClick={() => setStatusMsg("📊 Reports coming soon.")}
          >
            View Reports
          </button>
        </div>

        <h2 className="section-title">Recent Job Posts</h2>

        {jobs.length > 0 ? (
          <div className="job-grid">
            {jobs.map((item) => (
              <div className="job-card" key={item.id}>
                <h2>{item.company}</h2>
                <p>
                  <strong>Role:</strong> {item.role}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No jobs posted yet.</p>
        )}
      </div>
    );
  }

  // ================= RECRUITER =================

  return (
    <div>
      <h1 className="page-title">🏢 Recruiter Dashboard</h1>

      {statusMsg && <div className="status-toast">{statusMsg}</div>}

      <div className="card-grid">
        <StatCard title="Jobs Posted" value={jobs.length} icon="💼" />
        <StatCard title="Applications" value="214" icon="📝" />
        <StatCard title="Shortlisted" value="38" icon="✅" />
        <StatCard title="Interviews" value="12" icon="📅" />
      </div>

      <h2 className="section-title">Post New Job</h2>

      <div className="admin-form">
        <div className="input-group">
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={job.company}
            onChange={handleChange}
            onKeyDown={handleJobKeyDown}
            aria-invalid={!!errors.company}
          />
          {errors.company && (
            <span className="field-error">{errors.company}</span>
          )}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="role"
            placeholder="Job Role"
            value={job.role}
            onChange={handleChange}
            onKeyDown={handleJobKeyDown}
            aria-invalid={!!errors.role}
          />
          {errors.role && <span className="field-error">{errors.role}</span>}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            onKeyDown={handleJobKeyDown}
            aria-invalid={!!errors.location}
          />
          {errors.location && (
            <span className="field-error">{errors.location}</span>
          )}
        </div>

        <button onClick={addJob}>Post Job</button>
      </div>

      <div className="job-list-header">
        <h2 className="section-title">Posted Jobs</h2>
        <input
          type="text"
          className="job-search-input"
          placeholder="🔍 Filter by company..."
          value={jobSearch}
          onChange={(e) => setJobSearch(e.target.value)}
        />
      </div>

      {filteredJobs.length > 0 ? (
        <div className="job-grid">
          {filteredJobs.map((item) => (
            <div className="job-card" key={item.id}>
              <h2>{item.company}</h2>
              <p>
                <strong>Role:</strong> {item.role}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <button
                className={
                  confirmDeleteId === item.id
                    ? "delete-btn confirm"
                    : "delete-btn"
                }
                onClick={() => requestDelete(item.id)}
                onBlur={() => setConfirmDeleteId(null)}
              >
                {confirmDeleteId === item.id ? "Confirm Delete?" : "Delete"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">
          {jobSearch
            ? `No jobs match "${jobSearch}".`
            : "No jobs posted yet — add one above."}
        </p>
      )}
    </div>
  );
}

export default RecruiterAdmin;
