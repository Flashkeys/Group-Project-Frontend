import React, { useState, useEffect } from "react";
import '../css/Header.css';
import messageIcon from '../img/message-icon.png'; // Import the message icon
import { useNavigate } from 'react-router';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if menu is open
  const currentUser = localStorage.getItem("currentUser"); // Check if user is logged in
  const isLoggedIn = !!currentUser; // Determine login status based on currentUser
  const navigate = useNavigate();

  useEffect(() => {
    // Load users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Filter users based on search term
    const results = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchResultClick = (username) => {
    navigate(`/profile/${username}`);
    setSearchTerm(""); // Clear the search term after navigation
  };

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Toggle the menu open/close
  };

  return (
    <div className="header">
      <button className="hamburger-menu" onClick={toggleMenu} aria-label="Open menu">
        &#9776; {/* Hamburger icon */}
      </button>
      <ul className={isMenuOpen ? "open" : ""}> {/* Toggle menu visibility */}
        <li><a href="/">Home</a></li>
        {isLoggedIn ? (
          <>
            <li>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search users"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm && (
                  <div className="search-results">
                    {searchResults.length > 0 ? (
                      searchResults.map(user => (
                        <div
                          key={user.username}
                          onClick={() => handleSearchResultClick(user.username)}
                        >
                          {user.username}
                        </div>
                      ))
                    ) : (
                      <p>No users found.</p>
                    )}
                  </div>
                )}
              </div>
            </li>
            <li><a href="/liked">Liked Posts</a></li>
            <li>
              <a href="/messages">
                <img src={messageIcon} alt="Messages" className="message-icon" />
              </a>
            </li>
            <li>
              <button onClick={() => { 
                localStorage.removeItem("currentUser"); 
                navigate("/login"); // Redirect to login page after logout
              }}>Logout</button>
            </li>
          </>

        ) : (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
