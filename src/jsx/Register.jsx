import React, { useState } from "react";
import '../css/Global.css';
import Users from '../json/users.json';
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || Users;
    const userExists = existingUsers.some(user => user.username === formData.username);
    if (userExists) {
      setError("Username already exists.");
      setSuccess("");
      return;
    }
  
    // Validate email format
    if (!validateEmail(formData.email)) {
      setError("Invalid email format. Please enter a valid email.");
      setSuccess("");
      return;
    }
  
    // Add new user to localStorage
    const newUser = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      posts: []
    };
  
    // Check if users.json is already in localStorage otherwise set it
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  
    // Save the current user to local storage with isLoggedIn: true
    setSuccess("User registered successfully!");
    setError("");
    setFormData({
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      dateOfBirth: ""
    });
    navigate("/login");
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <br />
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        <br />
        <label>Password:</label>
        <br />
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <br />
        <label>Email:</label>
        <br />
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <br />
        <label>First Name:</label>
        <br />
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        <br />
        <label>Last Name:</label>
        <br />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        <br />
        <label>Date of Birth:</label>
        <br />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        <br />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Register;