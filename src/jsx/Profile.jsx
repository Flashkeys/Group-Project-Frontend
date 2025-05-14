import React, { useState, useEffect } from "react";
import '../css/Components.css';
import Header from '../jsx/Header.jsx'; // Import the Header component
import FilterAllPosts from "./FilterAllPosts";

const Profile = () => {
  // Get the current user from local storage
  // const currentUser = localStorage.getItem("currentUser");
  // const loggedInUser = currentUser ? JSON.parse(currentUser) : null;

  const [userProfile, setUserProfile] = useState(null);

  // Get the current user from local storage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const user = existingUsers.find(user => user.username === currentUser.username);
  const userPosts = user
    ? user.posts.map((post, postIndex) => ({
        ...post,
        username: user.username,
        postIndex,
        profilePicture: user.profilePicture || "default-profile.png",
      }))
    : [];
  // Check if user is logged in
  // If not, redirect to login page
useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === currentUser.username);
    setUserProfile(user);
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
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
    <div>
      <Header /> {/* Include the Header component */}
      <div className="profile-container">
      <div className="profile-inner">
      <h1>Profile</h1>
      
      {userProfile.profilePicture && (
        <img src={userProfile.profilePicture} alt="Profile" className="profile-picture" />
      )}
      <a href="/edit" className="edit-profile-link">Edit Profile</a>
      <p>Username: {userProfile.username}</p>
      <p>Email: {userProfile.email}</p>
      <p>First Name: {userProfile.firstName}</p>
      <p>Last Name: {userProfile.lastName}</p>
      <p>Date of Birth: {userProfile.dateOfBirth}</p>
      <p>Followers: {userProfile.followers ? userProfile.followers.length : 0}</p>
      <p>Following: {userProfile.following ? userProfile.following.length : 0}</p>
      </div>
      </div>

      <FilterAllPosts posts={userPosts} currentUser={currentUser} showEditDelete={true} />

    </div>
  );
}

export default Profile;