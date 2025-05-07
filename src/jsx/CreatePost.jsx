import React, { useState } from "react";
import '../css/Global.css';
import Users from '../json/users.json';


// Check if users.json is already in localStorage otherwise set it
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(Users));
}

const CreatePost = () => {
  const [formData, setFormData] = useState({
    text: "",
    datePosted: "",
    picture: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if a user is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.isLoggedIn) {
      setError("You must be logged in to create a post.");
      setSuccess("");
      return;
    }

    // Get the users array from localStorage
    const users = JSON.parse(localStorage.getItem("users"));

    // Find the logged-in user
    const userIndex = users.findIndex(user => user.username === currentUser.username);
    if (userIndex === -1) {
      setError("User not found. Please log in again.");
      setSuccess("");
      return;
    }

    // Create the new post
    const newPost = {
      text: formData.text,
      datePosted: new Date().toISOString(),
      picture: formData.picture || null,
      likes: 0,
      likedBy: []
    };

    // Add the new post to the user's posts array
    users[userIndex].posts.push(newPost);

    // Update the users array in localStorage
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Post created successfully!");
    setError("");
    setFormData({
      text: "",
      datePosted: "",
      picture: "",
    });
    // Reload the page to show the new posts
    window.location.reload();
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit}>
        <label>Text:</label><br />
        <textarea name="text" value={formData.text} onChange={handleChange} required />
        <br />
        <label>Picture (optional):</label><br />
        <input type="text" name="picture" value={formData.picture} onChange={handleChange} placeholder="Enter picture URL" />
        <br />
        <button type="submit">Create Post</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default CreatePost;