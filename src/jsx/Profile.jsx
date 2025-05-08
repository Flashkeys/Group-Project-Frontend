import React, { useState, useEffect } from "react";
import '../css/Components.css';
import Users from '../json/users.json'; // Import the users data
import Header from '../jsx/Header.jsx'; // Import the Header component
import { Link } from "react-router"; // Import Link for navigation

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
    <div>
      <Header /> {/* Include the Header component */}
      <div className="profile-container">
      <div className="profile-inner">
      <h1>Profile</h1>
      <p>Username: {userProfile.username}</p>
      <p>Email: {userProfile.email}</p>
      <p>First Name: {userProfile.firstName}</p>
      <p>Last Name: {userProfile.lastName}</p>
      <p>Date of Birth: {userProfile.dateOfBirth}</p>
      </div>
      </div>

      <div className="posts-container">
      <h2>My Posts</h2>
        {userProfile.posts && userProfile.posts.length > 0 ? (
          userProfile.posts.map((post, index) => (
            <div key={index} className="post-card">
              <h3>{post.text}</h3>
              <p>Date Posted: {post.datePosted}</p>
              {post.picture && <img src={post.picture} alt="Post"/>}
              <p>Likes: {post.likes}</p>
              <p>
                Liked by:{" "}
                {post.likedBy.length > 0 ? (
                  post.likedBy.map((liker, likerIndex) => (
                    <span key={likerIndex}>
                      <Link to={`/profile/${liker}`} className="username-link">
                        {liker}
                      </Link>
                      {likerIndex < post.likedBy.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  "No likes yet"
                )}
              </p>
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