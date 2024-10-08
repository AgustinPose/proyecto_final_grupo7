import React from 'react';
import '../Feed.css';
import Img from "../images/playa.jpeg"
import Matecito from "../images/mate.png"
const Feed = () => {
    return (
        <div className="feed-view">
            <header className="feed-header">
                <h1>R</h1>
                <p>Donde las conexiones florecen...</p> {/* Nuestro eslogan */}
            </header>
            
            <div className="feed-posts">
                <div className="post-card">
                    <h3>UsuariazOwO</h3>
                    <p>En casita, resfriado</p>
                    <img src={Matecito} alt="Mateando" />
                </div>
                <div className="post-card">
                    <h3>superUsuarito2004</h3>
                    <p>Vacacionando en la playa re tranquiiii B)</p>
                    <img src={Img} alt="playa" />
                </div>
                {/* Etcétera */}
            </div>
        </div>
    );
};

export default Feed;
