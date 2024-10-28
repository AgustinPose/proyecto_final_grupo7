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

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <ul className="sidebar-menu">
                {isOpen && <h2>fakestagram</h2>}
                <li onClick={handleHomeClick}>
                    <FontAwesomeIcon icon={faHome} /> {isOpen && <span>Home</span>}
                </li>
                <li>
                    <FontAwesomeIcon icon={faHeart} /> {isOpen && <span>Notifications</span>}
                </li>
                <li>
                    <FontAwesomeIcon icon={faPlusCircle} /> {isOpen && <span>Create</span>}
                </li>
                <li onClick={handleProfileClick}>
                    <FontAwesomeIcon icon={faUserCircle} /> {isOpen && <span>Profile</span>}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
