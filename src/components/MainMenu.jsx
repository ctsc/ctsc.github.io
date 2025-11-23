import React from 'react';
import '../styles/minecraft.css';

const MainMenu = ({ onNavigate }) => {
    return (
        <div className="app-container mc-bg">
            <div className="menu-container">
                <div className="mc-logo">
                    MINECRAFT
                    <div className="mc-splash">Hire Me!</div>
                </div>

                <button className="mc-button" onClick={() => onNavigate('projects')}>
                    Singleplayer
                </button>
                <button className="mc-button" onClick={() => onNavigate('contact')}>
                    Multiplayer
                </button>
                <button className="mc-button" onClick={() => window.open('https://github.com/ctsc', '_blank')}>
                    Minecraft Realms
                </button>
                <div style={{ display: 'flex', gap: '10px', width: '400px' }}>
                    <button className="mc-button" style={{ flex: 1 }} onClick={() => onNavigate('options')}>
                        Options...
                    </button>
                    <button className="mc-button" style={{ flex: 1 }} onClick={() => alert("You can't quit! I need a job!")}>
                        Quit Game
                    </button>
                </div>
            </div>

            <div className="version-text">Minecraft 1.20.4 (Personal Website)</div>
            <div className="copyright-text">Copyright Mojang AB. Do not distribute!</div>
        </div>
    );
};

export default MainMenu;
