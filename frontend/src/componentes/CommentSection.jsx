import React, { useState, useEffect } from 'react';
import '../css/CommentSection.css';

const CommentSection = ({ postId, comments: initialComments, onCommentAdded, handleFetchFeed }) => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    // Este useEffect se ejecuta cada vez que cambia el array de comentarios
    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`http://localhost:3001/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newComment })
            });

            if (!response.ok) throw new Error('Error al publicar el comentario');

            const savedComment = await response.json();

            handleFetchFeed();
            console.log("funcioné");
            // Actualiza el estado de comentarios al agregar el nuevo comentario
            setComments(prevComments => [...prevComments, savedComment]);

            // Notificar al componente padre si se pasa la función onCommentAdded
            if (onCommentAdded) {
                onCommentAdded(savedComment);
            }

            setNewComment('');
        } catch (error) {
            setError('No se pudo publicar el comentario');
            console.error(error);
        }
    };

    return (
        <div className="comment-section">
            <div className="comments-list">
                {comments.map(comment => (
                    <div key={comment._id} className="comment">
                        <span className="comment-username">
                            {comment.user?.username || 'Usuario desconocido'}
                        </span>
                        <span className="comment-content">{comment.content}</span>
                    </div>
                ))}
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <form onSubmit={handleSubmitComment} className="comment-form">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Añade un comentario..."
                    className="comment-input"
                />
                <button 
                    type="submit" 
                    className="comment-submit"
                    disabled={!newComment.trim()}
                >
                    Publicar
                </button>
            </form>
        </div>
    );
};

export default CommentSection;
