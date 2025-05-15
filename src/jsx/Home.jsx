import React, { useState } from "react";
import '../css/Global.css';
import '../css/Sidebar.css';
import Header from '../jsx/Header.jsx';
import Footer from "../jsx/Footer.jsx";
import ShowAllPosts from "./ShowAllPosts.jsx";
import Users from '../json/users.json';
import CreatePost from "./CreatePost.jsx";
import SideBar from "./SideBar.jsx";
import FollowedPosts from "./FollowedPosts.jsx";
const Home = () => {

  //localStorage.removeItem("users");
  //localStorage.removeItem("currentUser");

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(Users));
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [showFollowed, setShowFollowed] = useState(false);

  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="main-content">
          <SideBar className="sidebar" />
          <div className="post-content">
            {currentUser && currentUser.isLoggedIn && (
              <div>
                <CreatePost className="create-post" />
              </div>
            )}
            <br />
            <button
              onClick={() => setShowFollowed(f => !f)}
            >
              {showFollowed ? "Show All Posts" : "Show Followed Posts"}
            </button>
            {showFollowed ? <FollowedPosts /> : <ShowAllPosts />}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;