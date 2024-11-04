import React, { useState } from 'react';
import CommentSection from './CommentSection';
import '../css/PostDetails.css';

const PostDetails = ({ post, closeDetails }) => {
    const [likesCount, setLikesCount] = useState(post?.likes.length || 0);
    const token = localStorage.getItem('token');

    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${post._id}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error("Error al dar like");
            const data = await response.json();
            setLikesCount(data.likes.length);
        } catch (error) {
            console.error("Error al dar like", error);
        }
    };

    if (!post) return <p>Cargando...</p>;

    return (
        <div className="post-details">
            <button onClick={closeDetails} className="close-btn">Cerrar</button>
            <div className="post-details-container">
                <div className="image-container">
                    <img src={`http://localhost:3001/${post.imageUrl}`} alt={post.caption} />
                </div>
                <div className="post-content">
                    <div className="post-header">
                        <h3>{post.user.username}</h3>
                        <p>{post.caption}</p>
                    </div>
                    
                    <div className="post-interactions">
                        <button onClick={handleLike} className="like-btn">
                            {likesCount} Likes
                        </button>
                    </div>

                    <CommentSection 
                        postId={post._id}
                        comments={post.comments}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostDetails;