import React, { useState, useEffect, useRef } from "react";
import Header from "./Header.jsx";
import "../css/Messages.css";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatText, setChatText] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const chatEndRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = allUsers.find(u => u.username === currentUser.username);
    const messages = user && user.messages ? user.messages : [];

    // Only users you have messages with
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
      const latest = convoMessages.length > 0
        ? convoMessages.sort((a, b) => new Date(b.date) - new Date(a.date))[0]
        : null;
      return {
        username,
        profilePicture: userObj?.profilePicture || "default-profile.png",
        latestMessage: latest,
      };
    }).sort((a, b) => {
      if (a.latestMessage && b.latestMessage) {
        return new Date(b.latestMessage.date) - new Date(a.latestMessage.date);
      }
      return a.username.localeCompare(b.username);
    });

    setConversations(convos);
  }, [refresh]);

  // Find the selected user's conversation object (for chat header)
  const selectedUserObj = selectedUser
    ? (() => {
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        return allUsers.find(u => u.username === selectedUser) || {};
      })()
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

  // --- New chat logic ---
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = allUsers.find(u => u.username === currentUser.username);
  const following = user?.following || [];
  const chattedUsernames = conversations.map(c => c.username);
  const newChatUsers = following.filter(username => !chattedUsernames.includes(username));
  // ---

  return (
    <div>
      <Header />
      <div className="messages-container">
        {/* Conversation list */}
        <div className="conversation-list">
          <div className="conversation-list-header">
            <h2>Chats</h2>
            <button
              className="new-chat-btn"
              title="Start new chat"
              onClick={() => setShowNewChat(v => !v)}
            >+</button>
          </div>
          {showNewChat && (
            <div className="new-chat-dropdown">
              <strong>Start chat with:</strong>
              {newChatUsers.length === 0 && <div className="no-new-chat">No one to start a new chat with.</div>}
              {newChatUsers.map(username => {
                const userObj = allUsers.find(u => u.username === username);
                return (
                  <div
                    key={username}
                    className="conversation-item"
                    onClick={() => {
                      setSelectedUser(username);
                      setShowNewChat(false);
                    }}
                  >
                    <img src={userObj?.profilePicture || "default-profile.png"} alt={username} />
                    <div>
                      <div className="username">{username}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
                  {convo.latestMessage?.text || <span>No messages yet.</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Chat window */}
        <div className="chat-window">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <img
                  src={selectedUserObj?.profilePicture || "default-profile.png"}
                  alt={selectedUserObj?.username || selectedUser}
                />
                <h2>{selectedUserObj?.username || selectedUser}</h2>
              </div>
              <div className="chat-messages">
                {chatMessages.length === 0 && <p>No messages yet.</p>}
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