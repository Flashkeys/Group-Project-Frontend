import React, { useState, useEffect } from "react";
import Header from './Header.jsx';
import '../css/Components.css';

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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === formData.username);
    if (!user) {
      setError("User not found.");
      setSuccess("");
      return;
    }
    user.password = formData.password;
    user.email = formData.email;
    user.firstName = formData.firstName;
    user.lastName = formData.lastName;
    user.dateOfBirth = formData.dateOfBirth;
    user.profilePicture = formData.profilePicture;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ ...user, isLoggedIn: true }));
    setSuccess("Profile updated!");
    setError("");
    setTimeout(() => { window.location.href = "/profile"; }, 1000);
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div style={{ textAlign: "center" }}>
              <img
                src={formData.profilePicture || "default-profile.png"}
                alt="Profile"
                className="profile-picture"
              />
            </div>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} readOnly className="edit-profile-input" />
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="edit-profile-input" />
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="edit-profile-input" />
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="edit-profile-input" />
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="edit-profile-input" />
            <label>Date of Birth:</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="edit-profile-input" />
            <label>Profile Picture URL:</label>
            <input type="url" name="profilePicture" value={formData.profilePicture} onChange={handleChange} className="edit-profile-input" />
            <button type="submit" className="edit-profile-button">Save Changes</button>
          </form>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      </div>
  );
};

export default EditProfile;