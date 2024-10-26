import React, { useState } from "react";
import PropTypes from "prop-types";

const Post = ({ post, onLike, onComment }) => {
  const [comment, setComment] = useState("");

  const handleLike = () => {
    onLike(post._id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post._id, comment);
      setComment("");
    }
  };

  return (
    <div className="post-container">
      <img src={post.image} alt="Post" className="post-image" />
      <p>{post.caption}</p>
      <div className="post-details">
        <span>{post.likes.length} Likes</span>
        <button onClick={handleLike}>Like</button>
      </div>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
      <div className="comments-section">
        {post.comments &&
          post.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>
                <strong>{comment.user}</strong>: {comment.content}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    caption: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
};

export default Post;
