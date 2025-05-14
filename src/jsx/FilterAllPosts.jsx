import React, { useState } from "react";
import { Link } from "react-router";
import likeIcon from '../img/like-icon.png';
import likeIconFull from '../img/like-icon-full.png';
import deleteIcon from '../img/delete-icon.png';
import editIcon from '../img/edit-icon.png';

const FilterAllPosts = ({ posts, currentUser, showEditDelete }) => {
  const [editingPost, setEditingPost] = useState(null);
  const [editText, setEditText] = useState("");
  const [visibleComments, setVisibleComments] = useState({});
  const [hoveredComment, setHoveredComment] = useState(null);


  const existingUsers = JSON.parse(localStorage.getItem("users"));


  const handleLike = (userIndex, postIndex) => {
    if (!currentUser || !currentUser.isLoggedIn) {
      alert("You must be logged in to like a post.");
      return;
    }

    // Update the post in the users array
    const updatedUsers = [...existingUsers];
    const post = updatedUsers[userIndex].posts[postIndex];

    // Toggle like: Add or remove the current user's like
    if (!post.likedBy.includes(currentUser.username)) {
      post.likes += 1;
      post.likedBy.push(currentUser.username);
    } else {
      post.likes -= 1;
      post.likedBy = post.likedBy.filter(username => username !== currentUser.username);
    }

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.location.reload(); // Reload to reflect the changes
  };

  const handleEdit = (userIndex, postIndex, text) => {
    setEditingPost({ userIndex, postIndex });
    setEditText(text);
  };

  const saveEdit = () => {
    if (!editingPost) return;

    const { userIndex, postIndex } = editingPost;
    const updatedUsers = [...existingUsers];
    updatedUsers[userIndex].posts[postIndex].text = editText;

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    // Clear the editing state
    setEditingPost(null);
    window.location.reload();
  };

  const handleDelete = (userIndex, postIndex) => {
    const updatedUsers = [...existingUsers];
    // Remove the post from the user's posts array
    updatedUsers[userIndex].posts.splice(postIndex, 1);

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.location.reload();
  };

  // Toggle comments visibility
  const toggleComments = (postIndex) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postIndex]: !prev[postIndex], // Toggle visibility for the specific post
    }));
  };

  const handleCommentLike = (userIndex, postIndex, commentIndex) => {
    if (!currentUser || !currentUser.isLoggedIn) {
      alert("You must be logged in to like a comment.");
      return;
    }

    const updatedUsers = [...existingUsers];
    const comment = updatedUsers[userIndex].posts[postIndex].comments[commentIndex];

    if (!comment.likedBy) {
      comment.likedBy = [];
    }

    if (!comment.likedBy.includes(currentUser.username)) {
      comment.likes = (comment.likes || 0) + 1;
      comment.likedBy.push(currentUser.username);
    } else {
      comment.likes -= 1;
      comment.likedBy = comment.likedBy.filter(username => username !== currentUser.username);
    }

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    //window.location.reload();
  };

  // add a comment to a post
  const handleAddComment = (userIndex, postIndex) => {
    if (!currentUser || !currentUser.isLoggedIn) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!editText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const updatedUsers = [...existingUsers];
    const post = updatedUsers[userIndex].posts[postIndex];

    const newComment = {
      username: currentUser.username,
      text: editText.trim(),
      datePosted: new Date().toISOString(),
      likes: 0,
      likedBy: [],
    };

    if (!post.comments) {
      post.comments = [];
    }

    post.comments.push(newComment);

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditText(""); // Clear the textarea
    window.location.reload(); // Reload to reflect the changes
  };

  // edit a comment
  const handleEditComment = (userIndex, postIndex, commentIndex, text) => {
    setEditingPost({ userIndex, postIndex, commentIndex });
    setEditText(text);
  };

  const saveEditComment = (userIndex, postIndex, commentIndex) => {
    if (!editingPost) return;

    const updatedUsers = [...existingUsers];
    updatedUsers[userIndex].posts[postIndex].comments[commentIndex].text = editText;

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingPost(null); // Exit edit mode
    window.location.reload(); // Reload to reflect the changes
  };

  const handleDeleteComment = (userIndex, postIndex, commentIndex) => {
    const updatedUsers = [...existingUsers];
    updatedUsers[userIndex].posts[postIndex].comments.splice(commentIndex, 1);

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.location.reload(); // Reload to reflect the changes
  };

  return (
    <div className="posts-container">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="post-card">
              <div className="post-header">
                <img src={post.profilePicture} alt="Profile" className="profile-picture" />
                <div>
                  <p>
                    <Link to={`/profile/${post.username}`} className="username-link">
                      {post.username}
                    </Link>
                  </p>
                  <p className="post-date">Date: {new Date(post.datePosted).toLocaleString()}</p>
                </div>
                <div className="post-header-buttons">
                  {currentUser?.username === post.username && (
                    <>
                      {editingPost && editingPost.userIndex === post.userIndex && editingPost.postIndex === post.postIndex ? (
                        <img src={editIcon} alt="edit" onClick={saveEdit} className="post-header-button-save" />
                      ) : (
                        <img src={editIcon} alt="edit" onClick={() => handleEdit(post.userIndex, post.postIndex, post.text)} className="post-header-button" />
                      )}
                      <img src={deleteIcon} alt="delete" onClick={() => handleDelete(post.userIndex, post.postIndex)} className="post-header-button-delete" />
                    </>
                  )}
                </div>
              </div>

              <div className="post-content-container">
                {editingPost && editingPost.userIndex === post.userIndex && editingPost.postIndex === post.postIndex ? (
                  <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="edit-textarea" />
                ) : (
                  <span>{post.text}</span>
                )}
                {post.picture && <img src={post.picture} alt="Post" className="post-picture" />}
              </div>

              <div className="post-actions">
                <div className="post-likes">
                  <img src={post.likedBy.includes(currentUser?.username) ? likeIconFull : likeIcon} className="post-like-button" onClick={() => handleLike(post.userIndex, post.postIndex)} alt="Like Button" />
                  <p>{post.likes}</p>
                </div>
              </div>

              <p className="liked-by-text">
                Liked by:{" "}
                {post.likedBy.length > 0 ? (
                  post.likedBy.map((liker, likerIndex) => (
                    <span key={likerIndex}>
                      <Link to={`/profile/${liker}`} className="username-link">
                        {liker}
                      </Link>
                      {likerIndex < post.likedBy.length - 1 && " "}
                    </span>
                  ))
                ) : (
                  "No likes yet"
                )}
              </p>

              <button onClick={() => toggleComments(index)} className="toggle-comments-button">
                {visibleComments[index] ? "Hide Comments" : "Show Comments"}
              </button>

              {/* Comments for posts */}
              {visibleComments[index] && (
                <div className="posts-container">

                  <textarea className="edit-textarea" placeholder="Write a comment..." value={editText} onChange={(e) => setEditText(e.target.value)} />
                  <button onClick={() => handleAddComment(post.userIndex, post.postIndex)} className="add-comment-button">Add Comment</button>

                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, commentIndex) => {

                      // Find the user who made the comment
                      const commentUser = existingUsers.find(user => user.username === comment.username);

                      return (
                        <div key={commentIndex} className="post-card">
                          <div className="post-header">
                            <img src={commentUser?.profilePicture || "default-profile.png"} alt="Profile" className="profile-picture" />
                            <p>
                              <Link to={`/profile/${comment.username}`} className="username-link">
                                {comment.username}
                              </Link>
                            </p>
                            <p className="post-date">Date: {new Date(comment.datePosted).toLocaleString()}</p>
                            <div className="post-header-buttons">
                              {currentUser?.username === comment.username && (
                                <>
                                  {editingPost && editingPost.userIndex === post.userIndex && editingPost.postIndex === post.postIndex ? (
                                    <img src={editIcon} alt="edit" onClick={() => saveEditComment(post.userIndex, post.postIndex, commentIndex)} className="post-header-button-save" />
                                  ) : (
                                    <img src={editIcon} alt="edit" onClick={() => handleEditComment(post.userIndex, post.postIndex, commentIndex, comment.text)} className="post-header-button" />
                                  )}
                                  <img src={deleteIcon} alt="delete" onClick={() => handleDeleteComment(post.userIndex, post.postIndex, commentIndex)} className="post-header-button-delete" />
                                </>
                              )}
                            </div>
                          </div>

                          <p>{comment.text}</p>

                          <div className="comment-likes">
                            <img src={comment.likedBy?.includes(currentUser?.username) ? likeIconFull : likeIcon} className="post-like-button" onClick={() => handleCommentLike(post.userIndex, post.postIndex, commentIndex)} alt="Like Comment" onMouseEnter={() => setHoveredComment(commentIndex)} onMouseLeave={() => setHoveredComment(null)} />
                            <p>{comment.likes || 0}</p>
                            {hoveredComment === commentIndex && comment.likedBy && comment.likedBy.length > 0 && (
                              <div className="like-popup">
                                <p>Liked by:</p>
                                {comment.likedBy.map((liker, likerIndex) => (
                                  <p key={likerIndex}>{liker}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No comments yet.</p>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default FilterAllPosts;