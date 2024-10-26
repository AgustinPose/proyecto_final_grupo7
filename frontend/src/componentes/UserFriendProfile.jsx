import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from '../views/sidebar';
import "../css/UserFriendProfile.css";
import PerfilDefecto from '../images/perfilDefecto.jpg';

const UserProfileFriend = () => {
  const { friendId } = useParams();
  const [friendData, setFriendData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [feedPosts, setFeedPosts] = useState([]);
  const currentUserId = localStorage.getItem("_id");

  const loadFriendData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/user/profile/${friendId}`, {
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
      setFriendData(data.user);
      setFeedPosts(data.user.posts || []);

    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!friendId || !token) {
      setError('No se pudo obtener la información del usuario.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const currentUserResponse = await fetch(`http://localhost:3001/api/user/profile/${currentUserId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!currentUserResponse.ok) {
          throw new Error('Error al obtener los datos del usuario actual');
        }

        const currentUserData = await currentUserResponse.json();
        const response = await fetch(`http://localhost:3001/api/user/profile/${friendId}`, {
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
        setFriendData({
          ...data.user,
          friendsCount: data.user.friends.length
        });
        setFeedPosts(data.user.posts || []);

        const friendsList = currentUserData.user.friends || [];
        setIsFriend(friendsList.some(friend => friend._id === friendId));

      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [friendId, currentUserId]);

  const handleAddFriend = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3001/api/user/add-friend/${friendId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setIsFriend(true);
      await loadFriendData();

    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='profile-friend-layout'>
      <Sidebar />
      <div className="profile-friend-container">
        <div className="profile-friend-header">
          <img
            src={friendData?.profilePicture || PerfilDefecto}
            alt="Imagen de perfil"
            className="profile-friend-image"
          />
          <div className="profile-friend-info">
            <h1 className='username'>{friendData?.username}</h1>
            <div className="profile-friend-stats">
              <span>{feedPosts.length} posts</span>
              <span>{friendData?.friends?.length || 0} friends</span>
            </div>
            <p className="profile-friend-description">
              {friendData?.description || 'No hay descripción aún.'}
            </p>
          </div>
          <button
            className={`follow-friend-button ${isFriend ? 'friend-button' : ''}`}
            onClick={handleAddFriend}
            disabled={isFriend}
          >
            {isFriend ? "Amigos" : "Añadir amigo"}
          </button>
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

export default UserProfileFriend;
