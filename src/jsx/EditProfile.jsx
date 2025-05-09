import React, { useState, useEffect } from "react";
import Header from './Header.jsx';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    profilePicture: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === currentUser.username);
    if (user) {
      setFormData({
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        profilePicture: user.profilePicture || ""
      });
    }
  }, []); // <-- Only run once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex(u => u.username === formData.username);
    if (idx === -1) {
      setError("User not found.");
      setSuccess("");
      return;
    }
    users[idx] = { ...users[idx], ...formData };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ ...users[idx], isLoggedIn: true }));
    setSuccess("Profile updated!");
    setError("");
    setTimeout(() => { window.location.href = "/profile"; }, 1000);
  };

  return (
    <div>
      <Header />
      <div>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <img
              src={formData.profilePicture || "default-profile.png"}
              alt="Profile"
            />
          </div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required  />
          <br />
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <br />
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <br />
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          <br />
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          <br />
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          <br />
          <label>Profile Picture URL:</label>
          <input type="url" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />
          <br />
          <button type="submit">Save Changes</button>
        </form>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </div>
    </div>
  );
};

export default EditProfile;