import React from "react";
import { internships, placements, startups } from "./data";

function Opportunities({ search }) {
  const filterData = (list) =>
    list.filter((item) =>
      item.company.toLowerCase().includes(search.toLowerCase())
    );

  const applyJob = (company) => {
    alert(`Applied successfully to ${company}!`);
  };

  const JobCard = ({ job, extra }) => (
    <div className="job-card">
      <h2>{job.company}</h2>

      <p><strong>Role:</strong> {job.role}</p>

      <p><strong>Location:</strong> {job.location}</p>

      <p className="highlight">{extra}</p>

      <button
        className="apply-btn"
        onClick={() => applyJob(job.company)}
      >
        Apply Now
      </button>
    </div>
  );

  return (
    <div>

      <h1 className="page-title">Career Opportunities</h1>

      <h2 className="section-title">Internships</h2>

      <div className="job-grid">
        {filterData(internships).map((job) => (
          <JobCard
            key={job.id}
            job={job}
            extra={job.stipend}
          />
        ))}
      </div>

      <h2 className="section-title">Placements</h2>

      <div className="job-grid">
        {filterData(placements).map((job) => (
          <JobCard
            key={job.id}
            job={job}
            extra={job.package}
          />
        ))}
      </div>

      <h2 className="section-title">Startup Opportunities</h2>

      <div className="job-grid">
        {filterData(startups).map((job) => (
          <JobCard
            key={job.id}
            job={{
              ...job,
              location: job.funding,
            }}
            extra="Startup Hiring"
          />
        ))}
      </div>

    </div>
  );
}

export default Opportunities;