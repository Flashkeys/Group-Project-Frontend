import React from "react";
import { useParams } from "react-router";
import Header from "./Header";
import { Link } from "react-router";
const OtherProfiles = () => {
  // Get the username from the URL parameters
  const { username } = useParams();

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(user => user.username === username);

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
      <h2>Posts</h2>
      <div className="posts-container">
        {user.posts.length > 0 ? (
          user.posts.map((post, index) => (
            <div key={index} className="post-card">
              <h2>{post.text}</h2>
              <p>Date: {new Date(post.datePosted).toLocaleString()}</p>
              {post.picture && <img src={post.picture} alt="Post" className="post-picture" />}
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
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default OtherProfiles;