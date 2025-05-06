import React from "react";
import '../css/Components.css';

const ShowAllPosts = () => {
  // Check if users exist in localStorage, otherwise initialize it
  if (!localStorage.getItem("users")) {
    return <p>No users found in localStorage.</p>;
  }

  const existingUsers = JSON.parse(localStorage.getItem("users"));

  // Flatten all posts into a single array and sort by date
  const allPosts = existingUsers.flatMap(user =>
    user.posts.map(post => ({ ...post, username: user.username }))
  ).sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  return (
    <div>
      <h1>All Posts</h1>
      <div className="posts-container">
        {allPosts.length > 0 ? (
          allPosts.map((post, index) => (
            <div key={index} className="post-card">
              <h2>{post.text}</h2>
              <p>Posted by: {post.username}</p>
              <p>Date: {new Date(post.datePosted).toLocaleString()}</p>
              {post.picture && <img src={post.picture} alt="Post" className="post-picture" />}
              <p>Likes: {post.likes}</p>
              <p>Liked by: {post.likedBy.join(", ") || "No likes yet"}</p>
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