import React, { useState, useEffect } from "react";
import "../css/Components.css";

// Activity component displays user notifications
const Activity = () => {
  // State to store notifications and current logged-in user
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to add a test notification
  const addTestNotification = () => {
    const testNotification = {
      type: "message",
      from: "TestUser", 
      text: "This is a test notification", 
      date: new Date().toISOString(),   
      read: false, 
    };

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Update the current user's notifications
    const updatedUsers = users.map(user => {
      if (user.username === currentUser.username) {
        const updatedNotifications = [...(user.notifications || []), testNotification];
        user.notifications = updatedNotifications;
        return user;
      }
      return user;
    });

    // Save updated users and currentUser to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    const updatedUser = updatedUsers.find(u => u.username === currentUser.username);
    localStorage.setItem("currentUser", JSON.stringify({ ...updatedUser, isLoggedIn: true }));

    // Update state
    setNotifications(updatedUser.notifications || []);
  };

  // useEffect runs once on component mount to load user and notifications
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser")); // Get logged-in user
    const users = JSON.parse(localStorage.getItem("users")) || [];      // Get all users

    // If user is not logged in, redirect to login
    if (!storedUser) {
      console.warn("No currentUser found. Redirecting to login.");
      window.location.href = "/login";
      return;
    }

    // Find the user object by username
    const user = users.find((u) => u.username === storedUser.username);
    if (!user) {
      console.warn("Current user not found in users list.");
      return;
    }

    // Set current user and their notifications in state
    setCurrentUser(user);
    setNotifications(user.notifications || []);
  }, []);

  // Sort notifications by date (newest first)
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="activity">
      <h3>Activity</h3>

      {/* Button to manually add a test notification */}
      <button onClick={addTestNotification} className="test-button">
        Test Notification
      </button>

      {/* Show message if no notifications, else display list */}
      {sortedNotifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul>
          {sortedNotifications.map((note, index) => (
            <li key={index} className={!note.read ? "unread" : ""}>
              {/* Render based on notification type */}
              {note.type === "message" && (
                <span>
                  <strong>{note.from}</strong> sent you a message: "{note.text}"
                </span>
              )}
              {note.type === "like" && (
                <span>
                  <strong>{note.from}</strong> liked your post: "{note.postText}"
                </span>
              )}
              {note.type === "comment" && (
                <span>
                  <strong>{note.from}</strong> commented: "{note.text}" on "{note.onPost}"
                </span>
              )}
              <br />
              {/* Show timestamp */}
              <small>{new Date(note.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activity;
