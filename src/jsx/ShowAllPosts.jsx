import React from "react";
import '../css/Components.css';
import { Link } from "react-router";
import likeIcon from '../img/like-icon.png';
import likeIconFull from '../img/like-icon-full.png';

const ShowAllPosts = () => {
  // Check if users exist in localStorage, otherwise initialize it
  if (!localStorage.getItem("users")) {
    return <p>No users found in localStorage.</p>;
  }

  const existingUsers = JSON.parse(localStorage.getItem("users"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Flatten all posts into a single array and sort by date
  const allPosts = existingUsers.flatMap((user, userIndex) =>
    user.posts.map((post, postIndex) => ({
      ...post,
      username: user.username,
      userIndex,
      postIndex,
    }))
  ).sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  const handleLike = (userIndex, postIndex) => {
    if (!currentUser || !currentUser.isLoggedIn) {
      alert("You must be logged in to like a post.");
      return;
    }

    // Update the post in the users array
    const updatedUsers = [...existingUsers];
    const post = updatedUsers[userIndex].posts[postIndex];

    // Toggle like: Add or remove the current user's like
    if (!post.likedBy.includes(currentUser.username)) {
      post.likes += 1;
      post.likedBy.push(currentUser.username);
    } else {
      post.likes -= 1;
      post.likedBy = post.likedBy.filter(username => username !== currentUser.username);
    }

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.location.reload(); // Reload to reflect the changes
  };

  return (
    <div>
      <h1>All Posts</h1>
      <div className="posts-container">
        {allPosts.length > 0 ? (
          allPosts.map((post, index) => (
            <div key={index} className="post-card">

              <div className="post-header">
                <img src={post.profilePicture} alt="Profile" className="profile-picture" />
                <div>
                  <p>
                    <Link to={`/profile/${post.username}`} className="username-link">
                      {post.username}
                    </Link>
                  </p>
                  <p className="post-date">Date: {new Date(post.datePosted).toLocaleString()}</p>
                </div>
              </div>

              <div className="post-content">
                <span>{post.text}</span>
                {post.picture && <img src={post.picture} alt="Post" className="post-picture" />}
              </div>
              <div className="post-likes">
                <img src={post.likedBy.includes(currentUser?.username) ? likeIconFull : likeIcon} className="post-like-button" onClick={() => handleLike(post.userIndex, post.postIndex)} alt="Like Button" />
                <p>{post.likes}</p>
              </div>
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
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default ShowAllPosts;