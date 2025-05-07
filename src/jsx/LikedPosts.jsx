import React, { useState, useEffect } from "react";
import '../css/Components.css';
import Users from '../json/users.json';
import Header from "./Header";

const LikedPosts = () => {
  const currentUser = localStorage.getItem("currentUser");
  const loggedInUser = currentUser ? JSON.parse(currentUser) : null;

  const [likedPosts, setLikedPosts] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      // Find the user in the users data
      const user = Users.find(u => u.username === loggedInUser.username);
      setLikedPosts(user);
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
    return (
      <div>
        <h1>Liked Posts</h1>
        <p>Please log in to see your liked posts.</p>
      </div>
    );
  }

  if (!likedPosts) {
    return (
      <div>
        <h1>Liked Posts</h1>
        <p>Loading liked posts...</p>
      </div>
    );
  }

  const liked = Users.flatMap(user =>
    user.posts.filter(post => post.likedBy.includes(loggedInUser.username))
      .map(post => ({ ...post, username: user.username }))
  );

  return (
    <div>
      <Header />
      <h1>Liked Posts</h1>
      <div className="posts-container">
        {liked.length > 0 ? (
          liked.map((post, index) => (
            <div key={index} className="post-card">
              <h2>{post.text}</h2>
              <p>Posted by: {post.username}</p>
              <p>{post.datePosted}</p>
              {post.picture && <img src={post.picture} alt="Post" />}
              <p>Likes: {post.likes}</p>
              <p>Liked by: {post.likedBy ? post.likedBy.join(", ") : "None"}</p>
            </div>
          ))
        ) : (
          <p>No liked posts found.</p>
        )}
      </div>
    </div>
  );
};

export default LikedPosts;