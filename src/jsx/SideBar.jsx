import React, { useState, useEffect } from "react";
import '../css/Components.css';
import Users from '../json/users.json';

const SideBar = () => {
  const currentUser = localStorage.getItem("currentUser");
  const loggedInUser = currentUser ? JSON.parse(currentUser) : null;

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
        <p>Username: {userProfile.username}</p>
        <p>Email: {userProfile.email}</p>
        <p>First Name: {userProfile.firstName}</p>
        <p>Last Name: {userProfile.lastName}</p>
        <p>Date of Birth: {userProfile.dateOfBirth}</p>
      </div>
    </div>
  );
};

export default SideBar;
