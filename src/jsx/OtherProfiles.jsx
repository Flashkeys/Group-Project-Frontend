import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Header from "./Header";
import { Link } from "react-router";

const OtherProfiles = () => {
  const { username } = useParams();
  const [refresh, setRefresh] = useState(false);

  // Always read users and currentUser from localStorage on each render (like ShowAllPosts)
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const user = users.find(user => user.username === username);

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
      <h1>Profile of {user.username}</h1>
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
      <h2>Posts</h2>
      <div className="posts-container">
        {user.posts && user.posts.length > 0 ? (
          user.posts.map((post, index) => (
            <div key={index} className="post-card">
              <h2>{post.text}</h2>
              <p>Date: {new Date(post.datePosted).toLocaleString()}</p>
              {post.picture && <img src={post.picture} alt="Post" className="post-picture" />}
              <p>Likes: {post.likes}</p>
              <p>
                Liked by:{" "}
                {post.likedBy && post.likedBy.length > 0 ? (
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
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default OtherProfiles;