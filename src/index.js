import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './jsx/Home.jsx';
import ShowAllPosts from './jsx/ShowAllPosts.jsx';
import Profile from './jsx/Profile.jsx';
import LikedPosts from './jsx/LikedPosts.jsx';
import EditProfile from './jsx/EditProfile.jsx';
import Login from './jsx/Login.jsx';
import Register from './jsx/Register.jsx';
import NotFound from './jsx/NotFound.jsx';
import OtherProfiles from './jsx/OtherProfiles.jsx';
import Messages from './jsx/Messages.jsx';

// Save the users data to local storage

const Index = () => {
  const currentUser = localStorage.getItem("currentUser");
  console.log("Logged in as:", currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showAllPosts" element={<ShowAllPosts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/liked" element={<LikedPosts />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<OtherProfiles />} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);