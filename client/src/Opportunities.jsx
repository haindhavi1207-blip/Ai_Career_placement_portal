import React from "react";
import { OpportunityCard } from "./Components";
import { internships, placements, startups } from "./data";

// Each section describes: its heading, its data source, what to show as the
// "extra" highlight, and how to map a raw data item to what OpportunityCard needs.
const SECTIONS = [
  {
    title: "Internships",
    data: internships,
    getProps: (job) => ({
      company: job.company,
      role: job.role,
      location: job.location,
      extra: job.stipend,
      deadline: job.deadline,
    }),
  },
  {
    title: "Placements",
    data: placements,
    getProps: (job) => ({
      company: job.company,
      role: job.role,
      location: job.location,
      extra: job.package,
      deadline: job.deadline,
    }),
  },
  {
    title: "Startup Opportunities",
    data: startups,
    getProps: (job) => ({
      company: job.company,
      role: job.role,
      location: job.funding,
      extra: "Startup Hiring",
      deadline: job.deadline,
    }),
  },
];

function Opportunities({ search = "" }) {
  const query = search.trim().toLowerCase();

  const filterData = (list) =>
    query
      ? list.filter((item) => item.company.toLowerCase().includes(query))
      : list;

  const applyJob = (company) => {
    // Later: hook this up to a real applications API/backend.
    console.log(`Applied to ${company}`);
  };

  const totalResults = SECTIONS.reduce(
    (sum, section) => sum + filterData(section.data).length,
    0
  );

  return (
    <div>
      <h1 className="page-title">Career Opportunities</h1>

      {query && (
        <p className="dashboard-subtitle">
          {totalResults > 0
            ? `Showing ${totalResults} result${totalResults === 1 ? "" : "s"} for "${search}"`
            : `No opportunities found for "${search}"`}
        </p>
      )}

      {SECTIONS.map((section) => {
        const filtered = filterData(section.data);

        return (
          <React.Fragment key={section.title}>
            <h2 className="section-title">{section.title}</h2>

            {filtered.length > 0 ? (
              <div className="job-grid">
                {filtered.map((job) => (
                  <OpportunityCard
                    key={job.id}
                    {...section.getProps(job)}
                    onApply={() => applyJob(job.company)}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-state">
                No {section.title.toLowerCase()} match your search.
              </p>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Opportunities;
