import React, { useEffect, useState } from "react";
import Post from "./Post";
import "../css/PostFeed.css";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:3000/api/posts/feed", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [token]);

  const handleLike = (postId) => {
    fetch(`http://localhost:3000/api/posts/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }
        return response.json();
      })
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, likes: [...post.likes, "currentUser"] }
              : post
          )
        );
      })
      .catch((error) => console.error("Error liking post:", error));
  };

  const handleComment = (postId, content) => {
    fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((newComment) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  comments: [...post.comments, newComment],
                }
              : post
          )
        );
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
        />
      ))}
    </div>
  );
};

export default PostFeed;
