import React from "react";
import '../css/Home.css';
import Header from '../jsx/Header.jsx';
import Footer from "../jsx/Footer.jsx";
import ShowAllPosts from "./ShowAllPosts.jsx";

const Home = () => {


  return (
    <div>
      <Header />
      <ShowAllPosts />
      <Footer />
    </div>
  );

}

export default Home;