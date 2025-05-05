import React from "react";
<<<<<<< HEAD
import '../css/ShowAllPosts.css';
import Posts from '../json/container.json';
=======
import '../css/Components.css';
>>>>>>> cb11898701007edd42a840a1e5bed88632ef66a4

const ShowAllPosts = () => {

  console.log(Posts);

  // Flatten all posts into a single array and sort by date
  const allPosts = Posts.flatMap(user => 
    user.posts.map(post => ({ ...post, username: user.username }))
  ).sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  return (
    <div>
      <h1>Here is all posts</h1>
      {/* Show all posts */}
      <div className="posts-container">
        {allPosts.map((post, index) => (
          <div key={index} className="post-card">
            <h2>{post.text}</h2>
            <p>Posted by: {post.username}</p>
            <p>{post.datePosted}</p>
            <p>{post.picture}</p>
            <p>Likes {post.likes}</p>
            <p>Liked by {post.likedBy.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );

}

export default ShowAllPosts;