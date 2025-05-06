import React, { useState } from "react";
import '../css/Global.css';
import Users from '../json/users.json';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the username and password exist in the users.json
    const user = Users.find(user => user.username === username && user.password === password);

    if (user) {
      // Save the current user to local storage with isLoggedIn: true
      localStorage.setItem("currentUser", JSON.stringify({ username: user.username, isLoggedIn: true }));
      setError("");
      alert(`You are now logged in as ${username}`);
      window.location.reload();
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };
  // Check if the user is already logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="login-container">
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
      {currentUser && currentUser.isLoggedIn ? (
        <div>
          <p>Logged in as: {currentUser.username}</p>
          <button onClick={() => { localStorage.removeItem("currentUser"); alert("Logged out successfully"); window.location.reload(); }}> Logout </button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Login;