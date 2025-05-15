import React from "react";
import FilterAllPosts from "./FilterAllPosts";
import SideBar from "./SideBar";
import Header from "./Header";

const LikedPosts = () => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Filter posts to only show ones liked by the current user
  const likedPosts = existingUsers.flatMap((user, userIndex) =>
    (user.posts || [])
      .filter(post => post.likedBy && post.likedBy.includes(currentUser?.username))
      .map((post, postIndex) => ({
        ...post,
        username: user.username,
        userIndex,
        postIndex,
        profilePicture: user.profilePicture || "default-profile.png",
      }))
  ).sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  return (
    <>
      <Header />
      <div className="main-content">
        <SideBar />
        <div className="post-content">
          <h2>Posts You've Liked</h2>
          {likedPosts.length > 0 ? (
            <FilterAllPosts posts={likedPosts} currentUser={currentUser} showEditDelete={false} />
          ) : (
            <p>You haven't liked any posts yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LikedPosts;