// Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/Feed.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h1 className="logo">fakestagram</h1>
            <nav>
                <ul>
                    <li onClick={() => console.log('Home clicked')}>
                        <FontAwesomeIcon icon={faHome} /> Home
                    </li>
                    <li onClick={() => console.log('Notifications clicked')}>
                        <FontAwesomeIcon icon={faHeart} /> Notifications
                    </li>
                    <li onClick={() => console.log('Create clicked')}>
                        <FontAwesomeIcon icon={faPlusCircle} /> Create
                    </li>
                    <li onClick={() => console.log('Profile clicked')}>
                        <FontAwesomeIcon icon={faUserCircle} /> Profile
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
