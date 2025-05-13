import React, { useState, useEffect } from "react";
import "../css/Components.css";

const Activity = () => {
  const [notifications, setNotifications] = useState([]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      const loggedInUser = JSON.parse(currentUser);
      console.log("Loaded user:", loggedInUser);
      const userNotifications = loggedInUser.notifications || [];
      setNotifications(userNotifications);
    } else {
      console.warn("No currentUser found in localStorage");
    }
  }, []);

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const displayedNotifications = showUnreadOnly
    ? sortedNotifications.filter((note) => !note.read)
    : sortedNotifications;

  return (
    <div className="activity">
      <h3>Activity</h3>

      <button onClick={() => setShowUnreadOnly(!showUnreadOnly)}>
        {showUnreadOnly ? "Show All" : "Show Unread Only"}
      </button>

      {displayedNotifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul>
          {displayedNotifications.map((note, index) => (
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
