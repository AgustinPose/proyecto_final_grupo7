import React, { useState, useEffect } from "react";
import "../css/CommentSection.css";

const CommentSection = ({
  postId,
  comments: initialComments,
  handleFetchFeed,
}) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("_id");

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment }),
        }
      );

      if (!response.ok) throw new Error("Error al publicar el comentario");

      const savedComment = await response.json();
      handleFetchFeed();
      setComments((prevComments) => [...prevComments, savedComment]);
      setNewComment("");
    } catch (error) {
      setError("No se pudo publicar el comentario");
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Si la eliminación fue exitosa, actualiza el estado para eliminar el comentario de la lista
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      } else if (response.status === 403) {
        setError("No puedes eliminar este comentario");
      } else if (response.status === 404) {
        setError("Comentario no encontrado");
      } else {
        setError("Error al intentar eliminar el comentario");
      }
    } catch (error) {
      setError("Error del servidor");
      console.error(error);
    }
  };

  return (
    <div className="comment-section">
      <div className="comments-list">
        {comments?.map((comment) => {
          // Determinar si el comentario es del usuario actual
          const isCurrentUser = comment.user?._id === currentUserId;

          return (
            <div key={comment._id} className="comment">
              <span className="comment-username">
                {comment.user?.username || "Usuario desconocido"}
              </span>
              <span className="comment-content">{comment.content}</span>
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className={`comment ${
                  isCurrentUser ? "delete-button" : "hidden-button"
                }`}
              >
                🗑
              </button>
            </div>
          );
        })}
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmitComment} className="comment-form">
        <div id="divDelInputDelComentario">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Añade un comentario..."
            className="comment-input"
          />
        </div>
        <div id="divDelSubmitDelComentario">
          <button
            type="submit"
            className="comment-submit"
            disabled={!newComment.trim()}
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
