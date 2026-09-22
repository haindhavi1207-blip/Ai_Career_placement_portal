import React, { useState } from "react";

function RecruiterAdmin({ role }) {

  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Google",
      role: "Frontend Intern",
      location: "Bangalore",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Software Engineer",
      location: "Hyderabad",
    },
  ]);

  const [job, setJob] = useState({
    company: "",
    role: "",
    location: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const addJob = () => {

    if (!job.company || !job.role || !job.location) {
      alert("Please fill all fields");
      return;
    }

    setJobs([
      ...jobs,
      {
        id: Date.now(),
        ...job,
      },
    ]);

    setJob({
      company: "",
      role: "",
      location: "",
    });

    alert("Job Posted Successfully!");
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((item) => item.id !== id));
  };

  // ================= ADMIN =================

  if (role === "Admin") {
    return (
      <div>

        <h1 className="page-title">
          ⚙️ Admin Dashboard
        </h1>

        <div className="card-grid">

          <div className="card">
            <h3>Total Students</h3>
            <h2>1245</h2>
          </div>

          <div className="card">
            <h3>Recruiters</h3>
            <h2>87</h2>
          </div>

          <div className="card">
            <h3>Startups</h3>
            <h2>42</h2>
          </div>

          <div className="card">
            <h3>Jobs Posted</h3>
            <h2>{jobs.length}</h2>
          </div>

        </div>

        <h2 className="section-title">
          Portal Management
        </h2>

        <div className="action-grid">

          <button className="primary-btn">
            Manage Students
          </button>

          <button className="success-btn">
            Approve Recruiters
          </button>

          <button className="warning-btn">
            View Reports
          </button>

        </div>

        <h2 className="section-title">
          Recent Job Posts
        </h2>

        <div className="job-grid">

          {jobs.map((item) => (

            <div className="job-card" key={item.id}>

              <h2>{item.company}</h2>

              <p><strong>Role:</strong> {item.role}</p>

              <p><strong>Location:</strong> {item.location}</p>

            </div>

          ))}

        </div>

      </div>
    );
  }

  // ================= RECRUITER =================

  return (
    <div>

      <h1 className="page-title">
        🏢 Recruiter Dashboard
      </h1>

      <div className="card-grid">

        <div className="card">
          <h3>Jobs Posted</h3>
          <h2>{jobs.length}</h2>
        </div>

        <div className="card">
          <h3>Applications</h3>
          <h2>214</h2>
        </div>

        <div className="card">
          <h3>Shortlisted</h3>
          <h2>38</h2>
        </div>

        <div className="card">
          <h3>Interviews</h3>
          <h2>12</h2>
        </div>

      </div>

      <h2 className="section-title">
        Post New Job
      </h2>

      <div className="admin-form">

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={job.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Job Role"
          value={job.role}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
        />

        <button onClick={addJob}>
          Post Job
        </button>

      </div>

      <h2 className="section-title">
        Posted Jobs
      </h2>

      <div className="job-grid">

        {jobs.map((item) => (

          <div className="job-card" key={item.id}>

            <h2>{item.company}</h2>

            <p><strong>Role:</strong> {item.role}</p>

            <p><strong>Location:</strong> {item.location}</p>

            <button
              className="delete-btn"
              onClick={() => deleteJob(item.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecruiterAdmin;