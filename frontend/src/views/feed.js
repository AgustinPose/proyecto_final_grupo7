// Feed.js
import React from 'react';
import Sidebar from './sidebar'; 
import '../css/Feed.css';
import Img from "../images/playa.jpeg";
import Matecito from "../images/playita.png";

const Feed = () => {
    return (
        <div className="feed-layout">
            <Sidebar />

            <div className="feed-content">
                {/* Friends Suggestions */}
                <aside className="friends-suggestions">
                    <p>View your friends profile</p>
                    <div className="friend-card">
                        <img src={Img} alt="Friend 1" />
                        <p>Usuario 1</p>
                        <button>View</button>
                    </div>
                    <div className="friend-card">
                        <img src={Img} alt="Friend 2" />
                        <p>Usuario 2</p>
                        <button>View</button>
                    </div>
                </aside>

                {/* Main Content (Posts) */}
                <main className="main-feed">
                    <div className="post-card">
                        <img src={Matecito} alt="Mateando" />
                        <h3>UsuariazOwO</h3>
                        <p>En casita, resfriado</p>
                    </div>
                    <div className="post-card">
                        <img src={Img} alt="playa" />
                        <h3>superUsuarito2004</h3>
                        <p>Vacacionando en la playa re tranquiiii B</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Feed;
