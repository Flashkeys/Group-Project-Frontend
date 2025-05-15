import React, { useState, useEffect } from "react";
import '../css/Components.css';
import Header from '../jsx/Header.jsx';
import FilterAllPosts from "./FilterAllPosts";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [existingUsers, setExistingUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Function to get and format user's posts
  const getUserPosts = () => {
    const user = existingUsers.find(u => u.username === currentUser?.username);
    if (!user || !user.posts) return [];
    
    return user.posts
      .map((post, postIndex) => ({
        ...post,
        username: user.username,
        postIndex,
        userIndex: existingUsers.findIndex(u => u.username === user.username),
        profilePicture: user.profilePicture || "default-profile.png",
      }))
      .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted)); // Sort by newest first
  };

  // Initial load and auth check
  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    const user = existingUsers.find(u => u.username === currentUser.username);
    setUserProfile(user);
    setUserPosts(getUserPosts());
  }, [currentUser?.username, existingUsers]);

  // Handle post updates
  const handlePostUpdate = () => {
    const updatedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setExistingUsers(updatedUsers);
    const user = updatedUsers.find(u => u.username === currentUser?.username);
    if (user) {
      setUserPosts(
        user.posts
          .map((post, postIndex) => ({
            ...post,
            username: user.username,
            postIndex,
            userIndex: updatedUsers.findIndex(u => u.username === user.username),
            profilePicture: user.profilePicture || "default-profile.png",
          }))
          .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted)) // Sort by newest first
      );
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h1>Profile</h1>
        
        {userProfile.profilePicture && (
          <img src={userProfile.profilePicture} alt="Profile" className="profile-picture" />
        )}

        <p>Username: {userProfile.username}</p>
        <p>Email: {userProfile.email}</p>
        <p>First Name: {userProfile.firstName}</p>
        <p>Last Name: {userProfile.lastName}</p>
        <p>Date of Birth: {userProfile.dateOfBirth}</p>
        <p>Followers: {userProfile.followers ? userProfile.followers.length : 0}</p>
        <p>Following: {userProfile.following ? userProfile.following.length : 0}</p>
        <a href="/edit" className="edit-profile-link">Edit Profile</a>
      </div>

      <FilterAllPosts 
        posts={userPosts} 
        currentUser={currentUser} 
        showEditDelete={true}
        onPostUpdate={handlePostUpdate}
        isUserProfile={true}
      />
    </div>
  );
}

export default Profile;