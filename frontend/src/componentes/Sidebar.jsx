import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UploadImage from '../componentes/UploadImage'; 
import { faHome, faHeart, faPlusCircle, faUserCircle, faBars} from '@fortawesome/free-solid-svg-icons';
import '../css/sidebar.css';

const Sidebar = ( {handleNewPost} ) => {
    const navigate = useNavigate();
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);

    const handleProfileClick = () => {
        navigate('/user-profile');
    };

    const handleHomeClick = () => {
        navigate('/feed');
    };

    const handleUploadClick = () => {
        setUploadModalOpen(true);
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
                <li onClick={handleUploadClick}>
                    <FontAwesomeIcon icon={faPlusCircle} /> 
                </li>
                <li onClick={handleProfileClick}>
                    <FontAwesomeIcon icon={faUserCircle} /> 
                </li>
            </ul>

            {/* Modal de subida */}
            {isUploadModalOpen && (
                <div className="upload-modal">
                    <UploadImage 
                        onUploadSuccess={handleNewPost} 
                        onClose={() => setUploadModalOpen(false)} 
                    />
                </div>
            )}

        </div>
    );
};

export default Sidebar;
