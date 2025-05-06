import React, { useState } from "react";
import '../css/Global.css';
import Users from '../json/users.json';
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Check if the users array exists in localStorage, otherwise initialize it with the default Users
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(Users));
    }
  
    // Parse the users array from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users"));
  
    // Check if the username and password match any user in the array
    const user = existingUsers.find(user => user.username === username && user.password === password);
  
    if (user) {
      // Save the current user to local storage with isLoggedIn: true
      localStorage.setItem("currentUser", JSON.stringify({ username: user.username, isLoggedIn: true }));
      setError("");
      alert(`You are now logged in as ${username}`);
      navigate("/");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };
  // Check if the user is already logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="login-container">
      {currentUser && currentUser.isLoggedIn ? (
        <div>
          <p>Logged in as: {currentUser.username}</p>
          <button onClick={() => { localStorage.removeItem("currentUser"); alert("Logged out successfully"); window.location.reload(); }}> Logout </button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label><br />
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <br />
            <label htmlFor="password">Password:</label><br />
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br /><br />
            <input type="submit" value="Login" />
          </form>
          {error && <p className="error">{error}</p>}
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      )}
    </div>
  );
};

export default Login;