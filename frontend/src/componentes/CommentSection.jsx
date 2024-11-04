// CommentSection.jsx
import React, { useState, useEffect } from 'react';
import '../css/CommentSection.css';

const CommentSection = ({ postId, comments: initialComments }) => {
    const [comments, setComments] = useState(initialComments || []);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

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
            setComments([...comments, savedComment]);
            setNewComment('');
        } catch (error) {
            setError('No se pudo publicar el comentario');
            console.error(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${postId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error al eliminar el comentario');

            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            setError('No se pudo eliminar el comentario');
            console.error(error);
        }
    };

    return (
        <div className="comment-section">
            <h4>Comentarios</h4>
            
            <form onSubmit={handleSubmitComment} className="comment-form">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Añade un comentario..."
                    className="comment-input"
                />
                <button type="submit" className="comment-submit">
                    Publicar
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <div className="comments-list">
                {comments.map(comment => (
                    <Comment 
                        key={comment._id} 
                        comment={comment} 
                        onDelete={() => handleDeleteComment(comment._id)}
                        currentUserId={localStorage.getItem('_id')}
                    />
                ))}
            </div>
        </div>
    );
};

// Comment Component
const Comment = ({ comment, onDelete, currentUserId }) => {
    const isAuthor = currentUserId === comment.user._id;

    return (
        <div className="comment">
            <div className="comment-content">
                <strong>{comment.user.username}</strong>
                <p>{comment.content}</p>
            </div>
            {isAuthor && (
                <button onClick={onDelete} className="delete-comment">
                    Eliminar
                </button>
            )}
        </div>
    );
};

export default CommentSection;