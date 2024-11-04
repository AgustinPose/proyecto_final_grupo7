import React from 'react';
import "../css/Modal.css";

const Modal = ({ isOpen, onClose, post, onLike }) => {
    if (!isOpen) return null; // No renderiza el modal si no está abierto

    // Usa un valor por defecto si post o post.imageUrl no están definidos
    const fullImageUrl = post && post.imageUrl
        ? `http://localhost:3001/uploads/${post.imageUrl}`
        : 'http://localhost:3001/uploads/default.png'; // Cambia a la URL de una imagen por defecto si es necesario

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>Cerrar</button>
                {post?.imageUrl && ( // Solo muestra la imagen si imageUrl está definido
                    <img src={fullImageUrl} alt={post.caption || 'Sin descripción'} className="modal-image" />
                )}
                <h3>{post?.caption || 'Sin descripción'}</h3>
                <span className="like-text-modal">Like</span>
                <button className="like-button-modal" onClick={onLike}></button> 
                <p>{post?.likes?.length || 0} Likes</p>
                <div>
                    <h4>Comentarios:</h4>
                    {post?.comments?.length ? (
                        post.comments.map(comment => (
                            <p key={comment._id}>{comment.content}</p>
                        ))
                    ) : (
                        <p>No hay comentarios</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
