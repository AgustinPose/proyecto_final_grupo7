import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ModalPostDetails from './ModalPostDetails';
import SidebarContainer from '../componentes/SidebarControlador';
import '../css/Feed.css';
import '../css/sidebar.css';
import PerfilDefecto from "../images/perfilDefecto.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono de búsqueda

const Feed = ({ onLogout }) => {
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const currentUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const handleFetchFeed = async () =>{
        try {
            const response = await fetch('http://localhost:3001/api/posts/feed', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Error al obtener el feed');
            const data = await response.json();
            const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(sortedPosts);
        } catch (error) {
            console.error("Fetch feed error:", error);
        }
    }
    useEffect(() => {
        handleFetchFeed();
    }, [token]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/user/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Error al obtener amigos');
                const data = await response.json();
                const filteredFriends = data.filter(friend => friend._id !== currentUserId);
                setFriends(filteredFriends);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFriends();
    }, [currentUserId, token]);

    const handleFriendProfileClick = (friendId) => {
        navigate(`/user-profile/${friendId}`);
    };

    const openPostDetails = (postId) => {
        setSelectedPostId(postId);
    };

    const closePostDetails = () => {
        setSelectedPostId(null);
    };

    const handleLike = async (postId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${postId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const updatedPost = await response.json();
                handleLikeUpdate(postId, updatedPost.likes);
            }
        } catch (error) {
            console.error("Error al dar like", error);
        }
    };

    const handleLikeUpdate = (postId, newLikes) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === postId ? { ...post, likes: newLikes } : post
            )
        );
    };

    const selectedPost = posts.find(post => post._id === selectedPostId);

    // Filtra amigos según el término de búsqueda
    const filteredFriends = friends.filter(friend =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="feed-layout">
            <SidebarContainer />

            <div className="feed-content">
                <div className="header">
                    <span className="app-title">FAKESTAGRAM</span>
                    <div className="logout-container">
                        <FontAwesomeIcon onClick={onLogout} icon={faSignOutAlt} className="logout-icon" />
                    </div>
                </div>

                <aside className="friends-suggestions-container">
                    <h2 className="suggestions-title">Check out your friends</h2>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Buscar amigo por nombre de usuario"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                            className="search-input"
                        />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" /> {/* Icono de búsqueda */}
                    </div>
                    <div className="friends-suggestions">
                        <div className="friends-scroll">
                            {filteredFriends.map(friend => (
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

                <main className="main-feed">
                    {posts.map(post => {
                        const fullImageUrl = `http://localhost:3001/${post.imageUrl.replace(/\\/g, '/')}`;
                        return (
                            <div
                                key={post._id}
                                className="post-card"
                                onClick={() => openPostDetails(post._id)}
                            >
                                <img src={fullImageUrl} alt={post.caption} className="post-img" />
                                <h3>{post.user.username}</h3>
                                <p>{post.caption}</p>
                            </div>
                        );
                    })}
                </main>

                {selectedPost && (
                    <ModalPostDetails isOpen={selectedPostId !== null} onClose={closePostDetails} post={selectedPost} handleFetchFeed={handleFetchFeed}/>
                )}
            </div>
        </div>
    );
};

export default Feed;
