import React, { useState, useEffect } from "react";
import '../css/Components.css';
import Users from '../json/users.json'; // Import the users data
import Header from "./Header";

const LikedPosts = () => {
    // Get the current user from local storage
    const currentUser = localStorage.getItem("currentUser");
    const loggedInUser = currentUser ? JSON.parse(currentUser) : null;

    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        if (loggedInUser) {
            // Find the liked posts for the logged-in user
            const liked = Users.flatMap(user =>
                user.posts.filter(post => post.likedBy.includes(loggedInUser.username))
                    .map(post => ({ ...post, username: user.username }))
            ).sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
            setLikedPosts(liked);
        }
    }, [loggedInUser]);

    // If no user is logged in, return a message
    if (!loggedInUser) {
        return (
            <div>
                <h1>Liked Posts</h1>
                <p>Please log in to see your liked posts.</p>
            </div>
        );
    }

    return (
        <div>
            <Header /> {/* Include the Header component */}
            <h1>Liked Posts</h1>
            <div className="posts-container">
                {likedPosts.map((post, index) => (
                    <div key={index} className="post-card">
                        <h2>{post.text}</h2>
                        <p>Posted by: {post.username}</p>
                        <p>{post.datePosted}</p>
                        <p>{post.picture}</p>
                        <p>Likes {post.likes}</p>
                        <p>Liked by {post.likedBy.join(", ")}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LikedPosts;