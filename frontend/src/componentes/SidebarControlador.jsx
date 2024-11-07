import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import SidebarHorizontal from './SidebarHorizontal';

const SidebarContainer = ( {handleNewPost, handleFetchFeed} ) => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isMobileView ? <SidebarHorizontal /> : <Sidebar handleNewPost={handleNewPost} handleFetchFeed={handleFetchFeed} />}
        </>
    );
};

export default SidebarContainer;
