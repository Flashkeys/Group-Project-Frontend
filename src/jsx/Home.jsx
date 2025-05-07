import React from "react";
import '../css/Home.css';
import '../css/Global.css';
import Header from '../jsx/Header.jsx';
import Footer from "../jsx/Footer.jsx";
import ShowAllPosts from "./ShowAllPosts.jsx";
import Users from '../json/users.json';
import CreatePost from "./CreatePost.jsx";

const Home = () => {

  //localStorage.removeItem("users");
  //localStorage.removeItem("currentUser");

  // Check if users.json is already in localStorage otherwise set it
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(Users));
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="home-container">
      <Header />
      {currentUser && currentUser.isLoggedIn ? (
        <div>
          <p>Logged in as: {currentUser.username}</p>
          <CreatePost />
        </div>
      ) : (
        <div>
          
        </div>
      )}
      <ShowAllPosts />
      <Footer />
    </div>
  );

}

export default Home;