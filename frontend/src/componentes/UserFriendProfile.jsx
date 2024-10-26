import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserFriendProfile = () => {
  const { friendId } = useParams(); // Obtiene el ID del amigo desde la URL
  const token = localStorage.getItem('token'); // Obtiene el token de localStorage

  const addFriend = async () => {
    if (!token) {
      console.error("No autorizado, no hay token");
      return; // No continuar si no hay token
    }

    if (!friendId) {
      console.error("ID de amigo no válido: undefined");
      return; // No continuar si friendId es undefined
    }

    console.log(`Adding friend with ID: ${friendId}`);

    try {
      const response = await fetch(`http://localhost:3001/api/user/add-friend/${friendId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Asegúrate de que el token se envíe aquí
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al añadir amigo:", errorData.message);
      } else {
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    // Puedes decidir si quieres llamar a addFriend aquí o dejarlo solo en el botón
  }, [friendId]); // Dependiendo de friendId

  return (
    <div>
      <h1>Perfil de Amigo</h1>
      <p>ID del amigo: {friendId}</p>
      <button onClick={addFriend}>Añadir Amigo</button> {/* Botón para añadir amigo */}
    </div>
  );
};

export default UserFriendProfile;
