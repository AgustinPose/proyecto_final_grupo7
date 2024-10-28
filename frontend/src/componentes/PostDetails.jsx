import React from 'react';

const PostDetails = ({ post, closeDetails }) => {
    const token = localStorage.getItem('token');

    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${post._id}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Error al dar like");
            const data = await response.json();
            // Aquí puedes manejar cómo actualizar la lista de likes en el componente padre
            // Por ejemplo, podrías llamar a una función pasada como prop para actualizar el estado
        } catch (error) {
            console.error("Error al dar like", error);
        }
    };

    if (!post) return <p>Cargando...</p>;

    return (
        <div className="post-details">
            <button onClick={closeDetails}>Cerrar</button>
            <img src={post.imageUrl} alt={post.caption} />
            <h3>{post.caption}</h3>
            <p>{post.likes.length} Likes</p>
            <button onClick={handleLike}>Like</button>
            <div>
                <h4>Comentarios:</h4>
                {post.comments.map(comment => (
                    <p key={comment._id}>{comment.content}</p>
                ))}
            </div>
        </div>
    );
};

export default PostDetails;
