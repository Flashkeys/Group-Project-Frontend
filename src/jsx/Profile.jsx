import React, { useState, useEffect } from "react";
import '../css/Components.css';
import Users from '../json/users.json'; // Import the users data
import Header from '../jsx/Header.jsx'; // Import the Header component

const Profile = () => {
  // Get the current user from local storage
  const currentUser = localStorage.getItem("currentUser");
  const loggedInUser = currentUser ? JSON.parse(currentUser) : null;

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      // Find the user in the users data
      const user = Users.find(u => u.username === loggedInUser.username);
      setUserProfile(user);
    }
  }, [loggedInUser]);

  // If no user is logged in, return a message
  if (!loggedInUser) {
    return (
      <div>
        <h1>Profile</h1>
        <p>Please log in to see your profile.</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div>
        <h1>Profile</h1>
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Header /> {/* Include the Header component */}
      <h1>Profile</h1>
      <p>Username: {userProfile.username}</p>
      <p>Email: {userProfile.email}</p>
      <p>First Name: {userProfile.firstName}</p>
      <p>Last Name: {userProfile.lastName}</p>
      <p>Date of Birth: {userProfile.dateOfBirth}</p>

      <h2>My Posts</h2>
      <div className="posts-container">
        {userProfile.posts && userProfile.posts.length > 0 ? (
          userProfile.posts.map((post, index) => (
            <div key={index} className="post-card">
              <h3>{post.text}</h3>
              <p>Date Posted: {post.datePosted}</p>
              {post.picture && <img src={post.picture} alt="Post"/>}
              <p>Likes: {post.likes}</p>
              <p>Liked By: {post.likedBy ? post.likedBy.join(", ") : "None"}</p>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;