import React, { useState, useEffect } from 'react';
import '../css/CommentSection.css';

const CommentSection = ({ postId, comments: initialCommentIds = [], onCommentAdded }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    // Function to fetch each comment's data using its ID
    const fetchComments = async () => {
        try {
            const fetchedComments = await Promise.all(
                initialCommentIds.map(async (commentId) => {
                    const response = await fetch(`http://localhost:3001/api/posts/comments/${commentId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) throw new Error(`Error fetching comment ${commentId}`);
                    return await response.json();
                })
            );
            setComments(fetchedComments);
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError('Error al cargar los comentarios');
        }
    };

    // Load comments on component mount
    useEffect(() => {
        fetchComments();
    }, [initialCommentIds, token]);

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

            // Update local state with the new comment
            setComments([...comments, savedComment]);

            // Notify parent component
            if (onCommentAdded) {
                onCommentAdded(savedComment);
            }

            setNewComment('');

            // Re-fetch all comments to ensure username is updated
            await fetchComments();
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
