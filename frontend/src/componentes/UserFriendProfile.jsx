import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from '../componentes/Sidebar';
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

  // Definir la función fetchProfile dentro del componente
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const currentUserResponse = await fetch(`http://localhost:3001/api/user/profile/${currentUserId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!currentUserResponse.ok) {
        const responseText = await currentUserResponse.text();
        throw new Error(`Error al obtener los datos del usuario actual: ${responseText}`);
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
        const responseText = await response.text();
        throw new Error(`Error al obtener los datos del perfil: ${responseText}`);
      }

      const data = await response.json();
      setFriendData({
        ...data.user,
        friendsCount: data.user.friends.length
      });
      setFeedPosts(data.posts || []);

      const friendsList = currentUserData.user.friends || [];
      setIsFriend(friendsList.some(friend => friend._id === friendId));

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!friendId || !token) {
      setError('No se pudo obtener la información del usuario.');
      return;
    }

    fetchProfile();
  }, [friendId, currentUserId, isFriend]);

  const handleFriendAction = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const endpoint = isFriend ? 'remove-friend' : 'add-friend';
      const response = await fetch(`http://localhost:3001/api/user/${endpoint}/${friendId}`, {
        method: 'PUT', // Cambiado de POST a PUT
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Error al actualizar el estado de la amistad: ${responseText}`);
      }
  
      const data = await response.json();
      setIsFriend(!isFriend);
      
      // Actualizar datos del amigo con la nueva respuesta del servidor
      if (data.updatedFriend) {
        setFriendData(prevData => ({
          ...prevData,
          ...data.updatedFriend,
          friends: data.updatedFriend.friends
        }));
      }
  
      // Recargar datos del amigo para asegurarse de tener el estado más reciente
      await fetchProfile();
  
    } catch (error) {
      setError(error.message);
      console.error("Error updating friend status:", error);
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
            onClick={handleFriendAction}
          >
            {isFriend ? "Amigos" : "Añadir amigo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileFriend;
