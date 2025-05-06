import React from "react";
import '../css/Header.css';
import messageIcon from '../img/message-icon.png'; // Import the message icon

const Header = () => {
  const currentUser = localStorage.getItem("currentUser"); // Check if user is logged in
  const isLoggedIn = !!currentUser; // Determine login status based on currentUser
  const user = isLoggedIn ? JSON.parse(currentUser) : null;
  const userProfileImage = "https://via.placeholder.com/40"; // Replace with user's actual profile image URL
  return (
    <div className="header">
      <ul>
        <li><a href="/">Home</a></li>
        {isLoggedIn ? (
          <>
            <li>
              <a href="/profile">
                <img src={userProfileImage} alt="Profile" className="profile-pic"/>
              </a>
            </li>
            <li><a href="/liked">Liked Posts</a></li>
            <li>
              <a href="/messages"> {/* Messages link with image */}
                <img src={messageIcon} alt="Messages" className="message-icon" />
              </a>
            </li>
            <li><a href="/logout">Logout</a></li>
            {user && <li>Logged in as: {user.username}</li>}
          </>
        ) : (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;