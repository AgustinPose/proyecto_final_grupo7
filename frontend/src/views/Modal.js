import React from 'react';
import "../css/Modal.css";

const Modal = ({ isOpen, onClose, post, onLike }) => {
    if (!isOpen || !post) return null; // No renderiza el modal si no está abierto o si no hay post

    const fullImageUrl = `http://localhost:3001/${post.imageUrl.replace(/\\/g, '/')}`;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>Cerrar</button>
                <img src={fullImageUrl} alt={post.caption} className="modal-image" />
                <h3>{post.caption}</h3>
                <span className="like-text-modal">Like</span>
                <button className="like-button-modal" onClick={onLike}></button> 
                <p>{post.likes.length} Likes</p>
                <div>
                    <h4>Comentarios:</h4>
                    {post.comments.map(comment => (
                        <p key={comment._id}>{comment.content}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Modal;
