// Modal.js
import React from 'react';
import "../css/Modal.css";
import CommentSection from "../componentes/CommentSection";

const ModalPostDetails = ({ isOpen, onClose, post, onLike, handleFetchFeed }) => {
    console.log("hola");
    if (!isOpen) return null;
    const fullImageUrl = post && post.imageUrl
        ? `http://localhost:3001/${post.imageUrl}`
        : 'http://localhost:3001/uploads/default.png';

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-username">{post?.user?.username}</h3>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                <div className="modal-body">
                    <div className="modal-image-container">
                        {post?.imageUrl && (
                            <img src={fullImageUrl} alt={post.caption || 'Sin descripción'} className="modal-image" />
                        )}
                    </div>
                    
                    <div className="modal-interaction-section">
                        <div className="modal-actions">
                            <button 
                                className={`like-button ${post?.likes?.includes(localStorage.getItem('userId')) ? 'liked' : ''}`} 
                                onClick={onLike}
                            >
                                ♥
                            </button>
                            <span className="likes-count">{post?.likes?.length || 0} likes</span>
                        </div>
                        
                        {post?.caption && (
                            <div className="modal-caption">
                                <strong>{post?.user?.username}</strong> {post.caption}
                            </div>
                        )}
                        
                        <CommentSection handleFetchFeed={handleFetchFeed} postId={post?._id} comments={post?.comments} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPostDetails;