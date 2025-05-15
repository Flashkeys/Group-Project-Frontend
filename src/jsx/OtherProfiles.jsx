import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Header from "./Header";
import FilterAllPosts from "./FilterAllPosts";

const OtherProfiles = () => {
  const { username } = useParams();
  const [refresh, setRefresh] = useState(false);

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Always read users and currentUser from localStorage on each render (like ShowAllPosts)
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //const user = users.find(user => user.username === username);


  const user = existingUsers.find(user => user.username === username);
  const userPosts = user
    ? user.posts.map((post, postIndex) => ({
        ...post,
        username: user.username,
        postIndex,
        userIndex: existingUsers.findIndex(u => u.username === user.username),
        profilePicture: user.profilePicture || "default-profile.png",
      }))
    : [];


  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!currentUser || !user) return;
    const loggedInUser = users.find(u => u.username === currentUser.username);
    setIsFollowing(loggedInUser?.following?.includes(user.username));
  }, [currentUser, user, users, refresh]);

  const handleFollow = () => {
    if (!currentUser || !user) return;
    const usersCopy = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = usersCopy.find(u => u.username === currentUser.username);
    const profileUser = usersCopy.find(u => u.username === user.username);

    if (!loggedInUser.following) loggedInUser.following = [];
    if (!profileUser.followers) profileUser.followers = [];

    if (isFollowing) {
      // Unfollow
      loggedInUser.following = loggedInUser.following.filter(u => u !== user.username);
      profileUser.followers = profileUser.followers.filter(u => u !== loggedInUser.username);
    } else {
      // Follow (prevent duplicates)
      if (!loggedInUser.following.includes(user.username)) {
        loggedInUser.following.push(user.username);
      }
      if (!profileUser.followers.includes(loggedInUser.username)) {
        profileUser.followers.push(loggedInUser.username);
      }
    }

    localStorage.setItem("users", JSON.stringify(usersCopy));
    setIsFollowing(!isFollowing);
    setRefresh(r => !r); // Trigger re-read of users
  };

  if (!user) {
    return <p>User not found.</p>;
  }

 return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="profile-inner">
          <h1>Profile of {user.username}</h1>
          {user.profilePicture && (
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              className="profile-picture" 
            />
          )}
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Date of Birth: {user.dateOfBirth}</p>
          <p>Followers: {user.followers ? user.followers.length : 0}</p>
          <p>Following: {user.following ? user.following.length : 0}</p>
          {currentUser && currentUser.username !== user.username && (
            <button onClick={handleFollow} className="follow-btn">
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
      <FilterAllPosts posts={userPosts} currentUser={currentUser} showEditDelete={false} />
    </div>
  );
};

export default OtherProfiles;