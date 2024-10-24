// Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/Feed.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/user-profile');
    };

    const handleHomeClick = () => {
        navigate('/feed');
    }

    return (
        <aside className="sidebar">
            <h1 className="logo">fakestagram</h1>
            <nav>
                <ul>
                    <li onClick={handleHomeClick}>
                        <FontAwesomeIcon icon={faHome} /> Home
                    </li>
                    <li onClick={() => console.log('Notifications clicked')}>
                        <FontAwesomeIcon icon={faHeart} /> Notifications
                    </li>
                    <li onClick={() => console.log('Create clicked')}>
                        <FontAwesomeIcon icon={faPlusCircle} /> Create
                    </li>
                    <li onClick={handleProfileClick}>
                        <FontAwesomeIcon icon={faUserCircle} /> Profile
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
