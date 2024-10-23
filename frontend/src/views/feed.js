import React from 'react';
import Sidebar from './sidebar'; 
import '../css/Feed.css';
import Img from "../images/playa.jpeg";
import Matecito from "../images/playita.png";

const Feed = ({ onLogout }) => {
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
                <aside className="friends-suggestions">
                    <p className="suggestions-title">Check out your friends</p>
                    <div className="friends-grid">
                        <div className="friend-card">
                            <img src={Img} alt="Friend 1" className="friend-img" />
                            <div className="friend-info">
                                <p className="friend-name">Usuario 1</p>
                                <button className="view-btn">View</button>
                            </div>
                        </div>
                        <div className="friend-card">
                            <img src={Img} alt="Friend 2" className="friend-img" />
                            <div className="friend-info">
                                <p className="friend-name">Usuario 2</p>
                                <button className="view-btn">View</button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content (Posts) */}
                <main className="main-feed">
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
