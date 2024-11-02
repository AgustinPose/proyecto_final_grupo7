import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faPlusCircle, faUserCircle, faBars} from '@fortawesome/free-solid-svg-icons';
import '../css/sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const handleProfileClick = () => {
        navigate('/user-profile');
    };

    const handleHomeClick = () => {
        navigate('/feed');
    };


    return (
        <div className="sidebar closed">

            <ul className="sidebar-menu">
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

export default Sidebar;
