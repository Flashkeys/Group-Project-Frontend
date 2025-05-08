import React, { useState, useEffect } from "react";
import '../css/Components.css';
import Users from '../json/users.json';
import messageIcon from '../img/message-icon.png'; // Import the message icon

const SideBar = () => {
  const currentUser = localStorage.getItem("currentUser");
  const loggedInUser = currentUser ? JSON.parse(currentUser) : null;
  const userProfileImage = "/fav2.svg"; // Replace with user's actual profile image URL
  const isLoggedIn = !!currentUser; // Determine login status based on currentUser
  const user = isLoggedIn ? JSON.parse(currentUser) : null;

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      const user = Users.find(u => u.username === loggedInUser.username);
      setUserProfile(user);
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
    return (
      <div className="sidebar">
        <h1>Profile</h1>
        <p>Please log in to see your profile.</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="sidebar">
        <h1>Profile</h1>
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="profile-inner">
        <h1>Profile</h1>
        <a href="/profile">
                <img src={userProfileImage} alt="profile" className="profile-pic" />
              </a>
        <h2>{userProfile.username}</h2>
        <p>Email: {userProfile.email}</p>
        <p>First Name: {userProfile.firstName}</p>
        <p>Last Name: {userProfile.lastName}</p>
        <p>Date of Birth: {userProfile.dateOfBirth}</p>
        <p>Logged in as: {user.username}</p>
        <a href="/messages">
                <img src={messageIcon} alt="Messages" className="message-icon" />
              </a>
      </div>
    </div>
    
  );
};

export default SideBar;
