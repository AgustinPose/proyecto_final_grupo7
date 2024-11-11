import React, { useState, useEffect } from 'react';
import "../css/Modal.css";
import CommentSection from "../componentes/CommentSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faHeart } from '@fortawesome/free-solid-svg-icons';

const ModalPostDetails = ({ isOpen, onClose, post, handleFetchFeed }) => {
    const userId = localStorage.getItem('_id');
    const token = localStorage.getItem('token');
    const [isLikedLocal, setIsLikedLocal] = useState(post.likes.includes(userId)); // Estado para saber si el usuario ha dado like

    // Estado para manejar el color del corazón y el contador localmente
    const [likesCount, setLikesCount] = useState(post.likes.length || 0); // Contador de likes


    useEffect(() => {
        const checkLikeStatus = () => {
            setLikesCount(post?.likes?.length || 0); // Inicializar correctamente el contador de likes
    
            // Verificamos si el usuario ya ha dado like
            if (post.likes.includes(userId)) {

                setIsLikedLocal(true);  // Usuario ya dio like
            } else {
                setIsLikedLocal(false);  // Usuario no ha dado like
            }
        };
    
        if (post?._id) {
            checkLikeStatus();  // Solo verificamos el estado del like
        }
    
        return () => {
            // Limpiar el estado cuando se desmonte o cambie el post
            setIsLikedLocal(false);
            setLikesCount(0);
        };
    }, [post?._id, userId, post.likes]); 

    const handleLikeToggle = async () => {
        // Function for adding a like
        const addLike = async () => {

            const response = await fetch(`http://localhost:3001/api/posts/${post._id}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setIsLikedLocal(true);
                // Usamos la función de actualización basada en el estado anterior
                setLikesCount((prevCount) => prevCount + 1);
            }
        };
    
        // Function for removing a like
        const removeLike = async () => {
            const response = await fetch(`http://localhost:3001/api/posts/${post._id}/like`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setIsLikedLocal(false);
                // Usamos la función de actualización basada en el estado anterior
                setLikesCount((prevCount) => prevCount - 1);
            }
        };
    
        if (isLikedLocal) {
            await removeLike();
        } else {
            await addLike();
        }
    };
    
    const fullImageUrl = post && post.imageUrl
        ? `http://localhost:3001/${post.imageUrl}`
        : 'http://localhost:3001/uploads/default.png';

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-username">{post?.user?.username}</h3>
                    <button className="close-button">
                        <FontAwesomeIcon icon={faClose} onClick={onClose} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="modal-image-container">
                        {post?.imageUrl && (
                            <img
                                src={fullImageUrl}
                                alt={post.caption || 'Sin descripción'}
                                className="modal-image"
                            />
                        )}
                    </div>

                    <div className="modal-interaction-section">
                        <div className="modal-actions">
                            <button
                                className="like-button"
                                onClick={handleLikeToggle}
                                style={{ color: isLikedLocal ? '#ff69b4' : '#808080' }}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <span className="likes-count">{likesCount} likes</span>
                        </div>

                        {post?.caption && (
                            <div className="modal-caption">
                                <strong>{post?.user?.username}</strong> {post.caption}
                            </div>
                        )}

                        <CommentSection
                            handleFetchFeed={handleFetchFeed}
                            postId={post?._id}
                            comments={post?.comments}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPostDetails;
