import React from "react";
import FilterAllPosts from "./FilterAllPosts";

const ShowAllPosts = () => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const allPosts = existingUsers.flatMap((user, userIndex) =>
    user.posts.map((post, postIndex) => ({
      ...post,
      username: user.username,
      userIndex,
      postIndex,
      profilePicture: user.profilePicture || "default-profile.png",
    }))
  ).sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  return <FilterAllPosts posts={allPosts} currentUser={currentUser} showEditDelete={false} />;
};

export default ShowAllPosts;