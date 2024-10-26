import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from './sidebar'; 
import '../css/Feed.css';
import PerfilDefecto from "../images/perfilDefecto.jpg";    
import Img from "../images/playa.jpeg";
import Matecito from "../images/playita.png";

const Feed = ({ onLogout }) => {
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]); 
    const currentUserId = localStorage.getItem('userId'); 

    useEffect(() => {
        const fetchFriends = async () => {
            const token = localStorage.getItem('token'); 
            try {
                const response = await fetch('http://localhost:3001/api/user/all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener amigos');
                }
                const data = await response.json();
                
                // Filtrar los amigos para excluir al usuario actual
                const filteredFriends = data.filter(friend => friend._id !== currentUserId);
                setFriends(filteredFriends); // Actualizar el estado con los amigos filtrados
            } catch (error) {
                console.error(error);
            }
        };

        fetchFriends();
    }, [currentUserId]);

    const handleFriendProfileClick = (friendId) => {
        navigate(`/user-profile/${friendId}`); // Navegar al perfil del amigo usando su ID
    }

    return (
        <div className="feed-layout">
            <Sidebar />

            <div className="feed-content">
                {/* Contenedor para el botón de Logout */}
                <div className="header">
                    <div className="logout-container">
                        <button onClick={onLogout} className="logout-button">Cerrar sesión</button>
                    </div>
                </div>

                {/* Friends Suggestions */}
                <aside className="friends-suggestions-container">
                    <h2 className="suggestions-title">Check out your friends</h2>
                    <div className="friends-suggestions">
                        <div className="friends-scroll">
                            {friends.map(friend => (
                                <div key={friend._id} className="friend-card">
                                    <img src={friend.profilePicture || PerfilDefecto} alt={friend.username} className="friend-img" />
                                    <div className="friend-info">
                                        <p className="friend-name">{friend.username}</p>
                                        <button className="view-btn" onClick={() => handleFriendProfileClick(friend._id)}>View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content (Posts) */}
                <main className="main-feed">
                    {/* Aquí puedes seguir agregando tus publicaciones */}
                    <div className="post-card">
                        <img src={Matecito} alt="Mateando" className="post-img"/>
                        <h3>UsuariazOwO</h3>
                        <p>En casita, resfriado</p>
                    </div>
                    <div className="post-card">
                        <img src={Img} alt="playa" className="post-img"/>
                        <h3>superUsuarito2004</h3>
                        <p>Vacacionando en la playa re tranquiiii B</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Feed;
