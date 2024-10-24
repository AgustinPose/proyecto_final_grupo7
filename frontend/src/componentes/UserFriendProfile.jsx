import React, { useState, useEffect } from 'react';
import Sidebar from '../views/sidebar';
import { useParams } from 'react-router';
import PerfilDefecto from "../images/perfilDefecto.jpg";
import "../css/UserFriendProfile.css";

const UserFriendProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');
    const [feedPosts, setFeedPosts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');

        console.log(id);
        console.log(token);

        if (!id || !token) {
            setError('No se pudo obtener la información del usuario. ');
            return;
        }
    
        const fetchProfile = async () => {
          try {
            const response = await fetch(`http://localhost:3001/api/user/profile/${id}`, {
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
          } catch (error) {
            setError(error.message);
          }
        };
        fetchProfile();
      }, [id]);

      if (error) {
        return <p>{error}</p>;
      }
    
      if (!profileData) {
        return <p>Cargando perfil...</p>;
      }

      return (
        <div className='profile-friend-layout'>
        <Sidebar />

        <div className="profile-friend-container">
            <div className="profile-friend-header">
              {profileData.profilePicture ? (
                <img 
                    src={profileData.profilePicture} 
                    alt="Imagen de perfil" 
                    className="profile-friend-image"
                />
              ) : (
                <img
                  src={PerfilDefecto}
                  alt="Imagen de perfil"
                  className="profile-image"
                />
              )}

                <div className="profile-friend-info">
                    <h1 className='username'>{profileData.username}</h1>

                    <div className="profile-friend-stats">
                        <span>{feedPosts.length} posts</span>
                        <span>{profileData.friends.length} friends</span>
                    </div>

                    <p className="profile-friend-description">
                        {profileData.description ? profileData.description : 'No hay descripción aún.'}
                    </p>
                </div>
                <button className='follow-friend-button'>Add friend</button>
            </div>

            <div className="feed-friend-container">
                {feedPosts.length > 0 ? (
                    <div>
                        <h2>Feed de Publicaciones</h2>
                        <div className="feed-friend-grid">
                            {feedPosts.map(post => (
                                <div key={post._id} className="feed-friend-item">
                                    <img src={post.imageUrl} alt={post.description} className="feed-friend-image" />
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
    </div>
    );
};

export default UserFriendProfile;