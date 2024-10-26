import React, { useState, useEffect } from 'react';
import Sidebar from '../views/sidebar';
import PerfilDefecto from "../images/perfilDefecto.jpg";
import "../css/UserFriendProfile.css";

const UserFriendProfile = ({ friendId }) => {
  const [friendData, setFriendData] = useState(null);
  const [error, setError] = useState('');
  const [isFriend, setIsFriend] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Usuario no autenticado. Por favor, inicie sesión.');
      return;
    }

    const fetchFriendProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/profile/${friendId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil del amigo');
        }

        const data = await response.json();
        setFriendData(data.user);
        setFriendsCount(data.user.friends.length);
        setIsFriend(data.user.friends.includes(localStorage.getItem('_id')));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFriendProfile();
  }, [friendId]);

  const addFriend = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Usuario no autenticado. Por favor, inicie sesión.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/user/add-friend/${friendId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al añadir amigo');
      }

      setIsFriend(true);
      setFriendsCount(prevCount => prevCount + 1);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!friendData) {
    return <p>Cargando perfil del amigo...</p>;
  }

  return (
    <div>
      <Sidebar />
      <h1>Perfil de Amigo</h1>
      <img 
        src={friendData.profilePicture || PerfilDefecto} 
        alt="Imagen de perfil del amigo" 
        className="profile-image" 
      />
      <p>ID del amigo: {friendId}</p>
      <p>Nombre: {friendData.username}</p>
      <p>Descripción: {friendData.description || 'No hay descripción aún.'}</p>
      <p>Amigos: {friendsCount}</p>
      <button onClick={addFriend} style={{ backgroundColor: isFriend ? 'blue' : 'gray' }}>
        {isFriend ? 'Amigos' : 'Añadir Amigo'}
      </button>
    </div>
  );
};

export default UserFriendProfile;
