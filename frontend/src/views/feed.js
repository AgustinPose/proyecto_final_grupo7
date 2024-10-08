import React from 'react';

const Feed = ({ onLogout }) => {
    return (
        <div>
            <h1>Bienvenido al Feed</h1>
            <button onClick={onLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Feed;
