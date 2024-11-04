import React from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/sidebarHorizontal.css';

const SidebarHorizontal = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/user-profile');
    };

    const handleHomeClick = () => {
        navigate('/feed');
    };


    return (
        <div className="sidebar-horizontal">
            <ul className="sidebar-menu-horizontal">
                <li onClick={handleHomeClick}>
                    <FontAwesomeIcon icon={faHome} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faHeart} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faPlusCircle} />
                </li>
                <li onClick={handleProfileClick}>
                    <FontAwesomeIcon icon={faUserCircle} />
                </li>
            </ul>
        </div>
    );
};

export default SidebarHorizontal;
