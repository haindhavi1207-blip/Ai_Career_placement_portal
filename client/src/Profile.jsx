import React, { useState, useEffect } from "react";
import { student } from "./data";

const STORAGE_KEY = "studentProfile";

function loadInitialProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : student;
  } catch {
    // Corrupted localStorage data shouldn't crash the page.
    return student;
  }
}

function Profile() {
  const [profile, setProfile] = useState(loadInitialProfile);
  const [skillsInput, setSkillsInput] = useState(
    () => loadInitialProfile().skills?.join(", ") || ""
  );
  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState(""); // "" | "saved" | "error"
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!saveStatus) return;
    const timer = setTimeout(() => setSaveStatus(""), 2500);
    return () => clearTimeout(timer);
  }, [saveStatus]);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsDirty(true);
  };

  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
    setIsDirty(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfile((prev) => ({ ...prev, profileImage: reader.result }));
      setIsDirty(true);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const nextErrors = {};

    if (!profile.name?.trim()) nextErrors.name = "Name is required.";

    if (!profile.email?.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (profile.cgpa !== "" && profile.cgpa !== undefined) {
      const cgpaNum = Number(profile.cgpa);
      if (Number.isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
        nextErrors.cgpa = "CGPA must be a number between 0 and 10.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const saveProfile = () => {
    if (!validate()) {
      setSaveStatus("error");
      return;
    }

    const skillsArray = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedProfile = { ...profile, skills: skillsArray };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      setSaveStatus("saved");
      setIsDirty(false);
    } catch {
      setSaveStatus("error");
    }
  };

  return (
    <div>
      <h1 className="page-title">Student Profile</h1>

      {saveStatus === "saved" && (
        <div className="status-toast success">✅ Profile saved successfully!</div>
      )}
      {saveStatus === "error" && (
        <div className="status-toast error">
          ⚠ Please fix the highlighted fields before saving.
        </div>
      )}

      <div className="profile-container">
        <div className="profile-image">
          <img src={profile.profileImage} alt="profile" />

          <label className="image-upload-label">
            📷 Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>

        <div className="profile-form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={handleChange}
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}

          <label>College</label>
          <input
            type="text"
            name="college"
            value={profile.college || ""}
            onChange={handleChange}
          />

          <label>Branch</label>
          <input
            type="text"
            name="branch"
            value={profile.branch || ""}
            onChange={handleChange}
          />

          <label>Year</label>
          <input
            type="text"
            name="year"
            value={profile.year || ""}
            onChange={handleChange}
          />

          <label>CGPA</label>
          <input
            type="text"
            name="cgpa"
            value={profile.cgpa || ""}
            onChange={handleChange}
            aria-invalid={!!errors.cgpa}
          />
          {errors.cgpa && <span className="field-error">{errors.cgpa}</span>}

          <label>Skills (comma-separated)</label>
          <textarea
            rows="4"
            value={skillsInput}
            onChange={handleSkillsChange}
            placeholder="e.g. React, Node.js, SQL"
          ></textarea>

          <button className="save-btn" onClick={saveProfile}>
            {isDirty ? "Save Profile*" : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
