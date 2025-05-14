import React from "react";
import FilterAllPosts from "./FilterAllPosts";
import SideBar from "./SideBar";
import Header from "./Header";

const LikedPosts = () => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const likedPosts = existingUsers.flatMap((user, userIndex) =>
    (user.posts || [])
      .filter(post => post.likedBy?.includes(currentUser.username))
      .map((post, postIndex) => ({
        ...post,
        username: user.username,
        userIndex,
        postIndex,
        profilePicture: user.profilePicture || "default-profile.png",
      }))
  );

  return (
    <>
      <Header />
      <div className="main-content">
        <SideBar />
        <div className="post-content">
          <FilterAllPosts posts={likedPosts} currentUser={currentUser} showEditDelete={false} />
        </div>
      </div>
    </>
  );
};

export default LikedPosts;