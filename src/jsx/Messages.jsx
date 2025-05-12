import React, { useState, useEffect, useRef } from "react";
import Header from "./Header.jsx";
import "../css/Messages.css";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatText, setChatText] = useState("");
  const [refresh, setRefresh] = useState(false);
  const chatEndRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = allUsers.find(u => u.username === currentUser.username);
    const messages = user && user.messages ? user.messages : [];

    const chatUsernames = [
      ...new Set(
        messages.map(msg => (msg.from === currentUser.username ? msg.to : msg.from))
      ),
    ];

    const convos = chatUsernames.map(username => {
      const userObj = allUsers.find(u => u.username === username);
      const convoMessages = messages.filter(
        msg =>
          (msg.from === currentUser.username && msg.to === username) ||
          (msg.from === username && msg.to === currentUser.username)
      );
      const latest = convoMessages.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
      return {
        username,
        profilePicture: userObj?.profilePicture || "default-profile.png",
        latestMessage: latest,
      };
    }).sort((a, b) => new Date(b.latestMessage.date) - new Date(a.latestMessage.date)).reverse();

    setConversations(convos);
  }, [refresh]); // Only depend on refresh

  // ...rest of your code (unchanged)...

  // Find the selected user's conversation object
  const selectedUserObj = selectedUser
    ? conversations.find(c => c.username === selectedUser)
    : null;

  // Get chat messages with selected user
  const chatMessages = (() => {
    if (!selectedUser) return [];
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = allUsers.find(u => u.username === currentUser.username);
    const messages = user && user.messages ? user.messages : [];
    return messages
      .filter(
        msg =>
          (msg.from === currentUser.username && msg.to === selectedUser) ||
          (msg.from === selectedUser && msg.to === currentUser.username)
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  })();

  useEffect(() => {
    setTimeout(() => {
      if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [chatMessages, selectedUser]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!selectedUser || !chatText) return;

    const usersCopy = JSON.parse(localStorage.getItem("users")) || [];
    const sender = usersCopy.find(u => u.username === currentUser.username);
    const receiver = usersCopy.find(u => u.username === selectedUser);

    const message = {
      from: currentUser.username,
      to: selectedUser,
      text: chatText,
      date: new Date().toISOString(),
      read: false
    };

    sender.messages = sender.messages || [];
    receiver.messages = receiver.messages || [];
    sender.messages.push({ ...message });
    receiver.messages.push({ ...message });

    localStorage.setItem("users", JSON.stringify(usersCopy));
    setChatText("");
    setRefresh(r => !r);
  };

  if (!currentUser) return null;

  return (
    <div>
      <Header />
      <div className="messages-container">
        {/* Conversation list */}
        <div className="conversation-list">
          <h2>Chats</h2>
          {conversations.length === 0 && <p>No conversations yet.</p>}
          {conversations.map(convo => (
            <div
              key={convo.username}
              className={
                "conversation-item" +
                (selectedUser === convo.username ? " selected" : "")
              }
              onClick={() => setSelectedUser(convo.username)}
            >
              <img
                src={convo.profilePicture}
                alt={convo.username}
              />
              <div>
                <div className="username">{convo.username}</div>
                <div className="latest-message">
                  {convo.latestMessage?.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Chat window */}
        <div className="chat-window">
          {selectedUserObj ? (
            <>
              <div className="chat-header">
                <img
                  src={selectedUserObj.profilePicture}
                  alt={selectedUserObj.username}
                />
                <h2>{selectedUserObj.username}</h2>
              </div>
              <div className="chat-messages">
                {chatMessages.length === 0 && <p style={{ color: "#aaa" }}>No messages yet.</p>}
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={
                      "chat-message-row" +
                      (msg.from === currentUser.username ? " me" : "")
                    }
                  >
                    <span className="chat-bubble">
                      {msg.text}
                    </span>
                    <div className="chat-time">
                      {new Date(msg.date).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <form className="chat-input-form" onSubmit={handleSend}>
                <input
                  type="text"
                  value={chatText}
                  onChange={e => setChatText(e.target.value)}
                  placeholder="Type a message..."
                  required
                />
                <button type="submit" className="send-button">Send</button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <h2>Select a chat to start messaging</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;