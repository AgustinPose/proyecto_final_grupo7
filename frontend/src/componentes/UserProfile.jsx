import React, { useState, useEffect } from 'react';
import Sidebar from '../views/sidebar';
import PerfilDefecto from "../images/perfilDefecto.jpg";
import "../css/UserProfile.css";

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
        setProfileData(data.user);
        setFeedPosts(data.posts);
        setNewUsername(data.user.username); 
        setNewDescription(data.user.description);
        setProfileImagePreview(data.user.profilePicture || null); 
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      setError('Usuario no autenticado. Por favor, inicie sesión.');
      return;
    }
  
    const formData = new FormData();
    formData.append('username', newUsername);
  
    if (profileImage) {
      formData.append('profilePicture', profileImage);
    }
  
    try {
      const response = await fetch(`http://localhost:3001/api/user/profile/edit`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }
  
      const data = await response.json();
      setProfileData({ 
        ...profileData, 
        username: data.user.username, 
        profilePicture: data.user.profilePicture 
      });
      setProfileImagePreview(data.user.profilePicture);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
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

  // Función para agregar un amigo
  const handleAddFriend = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/user/add-friend/${friendId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Actualiza el estado de friends en profileData
        setProfileData((prevData) => ({
          ...prevData,
          friends: [...prevData.friends, friendId]
        }));
      } else {
        throw new Error("No se pudo agregar el amigo");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className='profile-layout'>
      <Sidebar />

      <div className="profile-container">
        <div className="profile-header">
          {profileImagePreview ? (
            <img 
              src={profileImagePreview} 
              alt="Imagen de perfil" 
              className="profile-image"
            />
          ) : (
            <img
              src={PerfilDefecto}
              alt="Imagen de perfil"
              className="profile-image"
            />
          )}
          <div className="profile-info">
            <h1>
              {isEditing ? (
                <>
                <label htmlFor='username'>Username: </label>
                <input 
                  id="username"
                  value={newUsername} 
                  onChange={handleUsernameChange} 
                />
                </>
              ) : profileData.username}
            </h1>
            {!isEditing && (
              <div className="profile-stats">
                <span>{feedPosts.length} posts</span>
                <span>{profileData.friends.length} friends</span>
              </div>
            )}

            <p className="profile-description">
            {isEditing ? (
              <>
                <label htmlFor='description'>Description: </label>
                  <textarea 
                  id='description'
                    value={newDescription} 
                    onChange={(e) => setNewDescription(e.target.value)} 
                  />
              </>
            ) : profileData.description || 'No hay descripción aún.'}
          </p>
          </div>
          {isEditing ? (
            <button className="save-button" onClick={handleSaveChanges}>Guardar cambios</button>
          ) : (
            <button className="edit-button" onClick={handleEditToggle}>Editar perfil</button>
          )}
        </div>

        {isEditing && (
          <div className='change-picture-container'>
            <label htmlFor='image-upload'>Profile image:</label>
            <input id="image-upload" className="image-input" type="file" onChange={handleImageChange} accept="image/*" />
          </div>
        )}

        {!isEditing && (  
          <div className="feed-container">
            {feedPosts.length > 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default UserProfile;
