import React, { useState } from 'react';
import '../css/PostDetails.css'; // Archivo CSS para manejar la responsividad y estilos

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
            setLikesCount(data.likes.length); // Actualiza el contador de likes basado en la respuesta del servidor
        } catch (error) {
            console.error("Error al dar like", error);
        }
    };

    if (!post) return <p>Cargando...</p>;

    console.log(post.imageUrl);
    console.log("hola");
    return (
        <div className="post-details">
            <button onClick={closeDetails} className="close-btn">Cerrar</button>
            <div className="image-container">
                {/* URL completa de la imagen */}
                <img src={`http://localhost:3001/${post.imageUrl}`} alt={post.caption} />
            </div>
            <div className="post-content">
                <h3>{post.caption}</h3>
                <p>{likesCount} Likes</p>
                <button onClick={handleLike} className="like-btn">Like</button>
                <div className="comments-section">
                    <h4>Comentarios:</h4>
                    {post.comments.map(comment => (
                        <p key={comment._id}>{comment.content}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
