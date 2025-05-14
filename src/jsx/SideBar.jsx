import React, { useState, useEffect } from "react";
import Activity from "./Activity"; 

const SideBar = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const loggedInUser = currentUser ? JSON.parse(currentUser) : null;
    if (loggedInUser) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.username === loggedInUser.username);
      setUserProfile(user);
    }
  }, []); 

  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
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
        <a href="/profile">
          <img
            src={userProfile.profilePicture || "/fav2.svg"}
            alt="profile"
            className="profile-pic"
          />
        </a>
        <h2>{userProfile.username}</h2>
        <p>Email: {userProfile.email}</p>
        <p>First Name: {userProfile.firstName}</p>
        <p>Last Name: {userProfile.lastName}</p>
        <p>Date of Birth: {userProfile.dateOfBirth}</p>
        <p>Logged in as: {userProfile.username}</p>
        <a href="/edit" >Edit Profile</a>
      </div>
      {/* Add Activity */}
      <Activity notifications={userProfile.notifications || []} />
    </div>
  );
};

export default SideBar;
