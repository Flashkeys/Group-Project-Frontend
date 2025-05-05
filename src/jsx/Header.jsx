import React from "react";
import '../css/Components.css';

const Header = () => {
  const isLoggedIn = true; // Replace with actual logic
  const userProfileImage = "https://via.placeholder.com/40"; // Replace with user's actual profile image URL

  return (
    <div className="header">
      <ul>
        <li><a href="/">Home</a></li>
        {isLoggedIn ? (
          <>
            <li>
              <a href="/profile">
                <img src={userProfileImage} alt="Profile" />
              </a>
            </li>
            <li><a href="/liked">Liked Posts</a></li>
            <li><a href="/messages">Messages</a></li>
            <li><a href="/edit">Edit Profile</a></li>
            <li><a href="/logout">Logout</a></li>
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
