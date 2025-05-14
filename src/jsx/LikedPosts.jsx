import React from "react";
import FilterAllPosts from "./FilterAllPosts";

const LikedPosts = () => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const likedPosts = existingUsers.flatMap((user, userIndex) =>
    user.posts
      .filter(post => post.likedBy.includes(currentUser.username))
      .map((post, postIndex) => ({
        ...post,
        username: user.username,
        userIndex,
        postIndex,
        profilePicture: user.profilePicture || "default-profile.png",
      }))
  );

  return (
    <div>
      <br>
      </br>
      <FilterAllPosts posts={likedPosts} currentUser={currentUser} showEditDelete={false} />
    </div>
  );
};

export default LikedPosts;