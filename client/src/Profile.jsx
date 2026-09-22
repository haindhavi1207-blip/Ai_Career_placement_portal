import React, { useState } from "react";
import { student } from "./data";

function Profile() {
  const [profile, setProfile] = useState(student);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
    alert("Profile Saved Successfully!");
  };

  return (
    <div>

      <h1 className="page-title">Student Profile</h1>

      <div className="profile-container">

        <div className="profile-image">

          <img
            src={profile.profileImage}
            alt="profile"
          />

        </div>

        <div className="profile-form">

          <label>Name</label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />

          <label>College</label>

          <input
            type="text"
            name="college"
            value={profile.college}
            onChange={handleChange}
          />

          <label>Branch</label>

          <input
            type="text"
            name="branch"
            value={profile.branch}
            onChange={handleChange}
          />

          <label>Year</label>

          <input
            type="text"
            name="year"
            value={profile.year}
            onChange={handleChange}
          />

          <label>CGPA</label>

          <input
            type="text"
            name="cgpa"
            value={profile.cgpa}
            onChange={handleChange}
          />

          <label>Skills</label>

          <textarea
            rows="4"
            value={profile.skills.join(", ")}
            readOnly
          ></textarea>

          <button
            className="save-btn"
            onClick={saveProfile}
          >
            Save Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;