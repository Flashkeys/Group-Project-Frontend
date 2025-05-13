import React, { useState, useEffect } from "react";
import "../css/Components.css";

const Activity = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Get current user from localStorage
    const currentUser = localStorage.getItem("currentUser");

    // If the user exists in localStorage, get their notifications
    if (currentUser) {
      const loggedInUser = JSON.parse(currentUser);
      const userNotifications = loggedInUser.notifications || [];
      setNotifications(userNotifications);
    }
  }, []);

  // Sort notifications by date
  const sortedNotifications = notifications.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="activity">
      <h3>Activity</h3>
      {sortedNotifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul>
          {sortedNotifications.map((note, index) => (
            <li key={index} className={!note.read ? "unread" : ""}>
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
                  <strong>{note.from}</strong> commented: "{note.text}" on "
                  {note.onPost}"
                </span>
              )}
              <br />
              <small>{new Date(note.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activity;