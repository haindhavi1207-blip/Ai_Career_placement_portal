// ============================================================
// Student Data
// ============================================================

export const student = {
  id: 1,
  name: "Haindhavi",
  email: "haindhavi@gmail.com",
  college: "Vemu Institute of Technology",
  branch: "CSE (AI & ML)",
  year: "3rd Year",
  cgpa: 9.5,
  skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
  profileImage:
    "https://ui-avatars.com/api/?name=Haindhavi&background=4f46e5&color=fff",
};

// ============================================================
// Internships
// ============================================================

export const internships = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Intern",
    location: "Bangalore",
    stipend: "₹50,000/month",
    mode: "Hybrid",
    deadline: "30 Sept",
    saved: false,
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Software Engineer Intern",
    location: "Hyderabad",
    stipend: "₹80,000/month",
    mode: "Onsite",
    deadline: "5 Oct",
    saved: false,
  },
  {
    id: 3,
    company: "Amazon",
    role: "Full Stack Intern",
    location: "Chennai",
    stipend: "₹60,000/month",
    mode: "Remote",
    deadline: "12 Oct",
    saved: false,
  },
];

// ============================================================
// Placements
// ============================================================

export const placements = [
  {
    id: 1,
    company: "Infosys",
    role: "System Engineer",
    package: "₹6 LPA",
    location: "Bangalore",
    deadline: "1 Oct",
  },
  {
    id: 2,
    company: "TCS",
    role: "Software Developer",
    package: "₹7 LPA",
    location: "Hyderabad",
    deadline: "3 Oct",
  },
  {
    id: 3,
    company: "Deloitte",
    role: "Associate Analyst",
    package: "₹8 LPA",
    location: "Hyderabad",
    deadline: "10 Oct",
  },
];

// ============================================================
// Startup Opportunities
// ============================================================

export const startups = [
  {
    id: 1,
    company: "OpenAI Startup",
    role: "AI Developer",
    funding: "Series A",
    deadline: "15 Oct",
  },
  {
    id: 2,
    company: "FinTech Labs",
    role: "Backend Developer",
    funding: "Seed",
    deadline: "20 Oct",
  },
];

// ============================================================
// Notifications
// `type` maps to NotificationCard's styling: info | success | warning | error
// ============================================================

export const notifications = [
  {
    id: 1,
    text: "Google Internship applications are now open!",
    type: "info",
  },
  {
    id: 2,
    text: "TCS Placement Drive starts tomorrow.",
    type: "warning",
  },
  {
    id: 3,
    text: "Your resume score improved to 89%.",
    type: "success",
  },
];

// ============================================================
// Startup Dashboard: Projects
// ============================================================

export const startupProjects = [
  {
    id: 1,
    title: "AI Resume Parser",
    description: "Extracts skills and experience from uploaded resumes using NLP.",
    stack: ["React", "Node.js", "OpenAI API"],
    status: "In Progress",
  },
  {
    id: 2,
    title: "Intern Onboarding Portal",
    description: "Self-serve onboarding flow for new interns and their mentors.",
    stack: ["Next.js", "MongoDB"],
    status: "Planning",
  },
  {
    id: 3,
    title: "Team Chat Bot",
    description: "Internal Slack bot for standups and task reminders.",
    stack: ["Python", "FastAPI"],
    status: "Completed",
  },
];

// ============================================================
// Startup Dashboard: Applicant / Hiring Pipeline
// status: Applied | Interviewing | Hired | Rejected
// ============================================================

export const startupApplicants = [
  { id: 1, name: "Ravi Kumar", role: "AI Developer Intern", status: "Applied" },
  { id: 2, name: "Sneha Reddy", role: "Backend Developer Intern", status: "Interviewing" },
  { id: 3, name: "Arjun Mehta", role: "Frontend Intern", status: "Hired" },
  { id: 4, name: "Priya Singh", role: "AI Developer Intern", status: "Rejected" },
  { id: 5, name: "Karthik Rao", role: "Backend Developer Intern", status: "Applied" },
  { id: 6, name: "Divya Nair", role: "Frontend Intern", status: "Interviewing" },
];

// ============================================================
// Startup Dashboard: Analytics
// ============================================================

export const startupAnalytics = {
  months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  monthlyApplications: [12, 18, 9, 25, 30, 22],
};

// ============================================================
// AI Features
// ============================================================

export const aiFeatures = [
  "Resume Analyzer",
  "AI Career Chatbot",
  "Mock Interview",
  "Skill Recommendation",
  "Career Roadmap",
];

// ============================================================
// Sidebar Menu (reference list — Components.jsx defines the
// authoritative per-role menus in SIDEBAR_MENUS; kept here in case
// other parts of the app want the full flat list)
// ============================================================

export const menu = [
  "Dashboard",
  "Profile",
  "Internships",
  "Placements",
  "Startups",
  "AI Tools",
  "Recruiter",
  "Admin",
];