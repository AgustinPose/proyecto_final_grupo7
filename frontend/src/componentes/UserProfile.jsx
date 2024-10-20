import React, { useState, useEffect } from 'react';
import "../styles/userProfile.css"

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('_id');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      setError('Usuario no autenticado. Por favor, inicie sesión.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
        
        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil');
        }

        const data = await response.json();
        setProfileData(data);
        setNewUsername(data.username); 
        setNewDescription(data.description);
        setProfileImagePreview(data.profileImage || null); 
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchFeed = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/posts/feed`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (!response.ok) {
            throw new Error('Error al obtener el feed de publicaciones');
          }
  
          const posts = await response.json();
          setFeedPosts(posts); // Guardar las publicaciones en el estado
        } catch (error) {
          setError(error.message);
        }
      };

    fetchProfile();
    fetchFeed();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSaveChanges = async () => {
    // Enviar los cambios del perfil (falta un endpoint PUT o PATCH para guardar los cambios en el back)
    const formData = new FormData();
    formData.append('username', newUsername);
    formData.append('description', newDescription);
    if (profileImage) {
      formData.append('profileImage', profileImage); 
    }

    // Aquí se envia el `formData` al backend si hubiera el endpoint adecuado
    setProfileData({ ...profileData, username: newUsername, description: newDescription });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        {profileImagePreview ? (
          <img 
            src={profileImagePreview} 
            alt="Imagen de perfil" 
            className="profile-image"
          />
        ) : (
          <p>No hay imagen de perfil.</p>
        )}
        <div className="profile-info">
          <h1>
            {isEditing ? (
              <input 
                value={newUsername} 
                onChange={handleUsernameChange} 
              />
            ) : profileData.username}
          </h1>
          <div className="profile-stats">
            <span>{profileData.posts} posts</span>
            <span>{profileData.friends} friends</span>
          </div>
        </div>
        {isEditing ? (
          <button className="save-button" onClick={handleSaveChanges}>Guardar cambios</button>
        ) : (
          <button className="edit-button" onClick={handleEditToggle}>Editar perfil</button>
        )}
      </div>

      <p className="profile-description">
        {isEditing ? (
          <textarea 
            value={newDescription} 
            onChange={(e) => setNewDescription(e.target.value)} 
          />
        ) : profileData.description || 'No hay descripción aún.'}
      </p>

      {isEditing && (
        <div>
          <label>Cambiar imagen de perfil:</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
      )}

        <div className="feed-container">
            { feedPosts.length > 0 ? (
                <div className="feed-container">
                <h2>Feed de Publicaciones</h2>
                <div className="feed-grid">
                {feedPosts.map(post => (
                    <div key={post._id} className="feed-item">
                    <img src={post.imageUrl} alt={post.description} className="feed-image" />
                    <p>{post.description}</p>
                    </div>
                ))}
                </div>
                </div>
            ) : (
                <p>No hay publicaciones en el feed.</p>
            )}
      </div>

    </div>
  );
};

export default UserProfile;
