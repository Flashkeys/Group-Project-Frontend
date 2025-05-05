import React from "react";
import '../css/Components.css';

const Header = () => {
  const isLoggedIn = true; // Replace with actual logic
  const userProfileImage = "https://via.placeholder.com/40"; // Replace with user's actual profile image URL

  return (
    <div>
      <ul>
        <li><a href="/">Home</a></li>
        {isLoggedIn ? (
          <>
            <li>
              <a href="/profile">
                <img src={userProfileImage} alt="Profile" />
              </a>
            </li>
            <li><link href="/liked">Liked Posts</link></li>
            <li><link href="/messages">Messages</link></li>
            <li><link href="/edit">Edit Profile</link></li>
            <li><link href="/logout">Logout</link></li>
          </>
        ) : (
          <>
            <li><link href="/login">Login</link></li>
            <li><link href="/register">Register</link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
