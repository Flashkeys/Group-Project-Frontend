import React from "react";
import '../css/Home.css';
import '../css/Global.css';
import Header from '../jsx/Header.jsx';
import Footer from "../jsx/Footer.jsx";
import ShowAllPosts from "./ShowAllPosts.jsx";
import Users from '../json/users.json';

const Home = () => {

  //localStorage.removeItem("users");

  // Check if users.json is already in localStorage otherwise set it
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(Users));    
  }

  return (
    <div>
      <Header />
      <ShowAllPosts />
      <Footer />
    </div>
  );

}

export default Home;