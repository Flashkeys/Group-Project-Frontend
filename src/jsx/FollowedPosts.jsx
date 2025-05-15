import React from "react";
import FilterAllPosts from "./FilterAllPosts";

const FollowedPosts = () => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Find the full user object for the logged-in user
  const fullUser = existingUsers.find(u => u.username === currentUser?.username);

  // Only show posts from users the current user follows
  const followedPosts = fullUser?.following
    ? existingUsers
        .filter(user => fullUser.following.includes(user.username))
        .flatMap((user, userIndex) =>
          (user.posts || []).map((post, postIndex) => ({
            ...post,
            username: user.username,
            userIndex,
            postIndex,
            profilePicture: user.profilePicture || "default-profile.png",
          }))
        )
        .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
    : [];

  return (
    <FilterAllPosts posts={followedPosts} currentUser={currentUser} showEditDelete={false} />
  );
};

export default FollowedPosts;