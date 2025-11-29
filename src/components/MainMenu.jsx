import React, { useState, useEffect } from 'react';
import '../styles/minecraft.css';
import PanoramaBackground from './PanoramaBackground';
import BlockParticles from './BlockParticles';

const MainMenu = ({ onNavigate }) => {
    const [particlesEnabled, setParticlesEnabled] = useState(true);
    const [particleCount, setParticleCount] = useState(25);

    // Load particles preference from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('particlesEnabled');
        const savedCount = localStorage.getItem('particleCount');
        if (saved !== null) {
            setParticlesEnabled(saved === 'true');
        }
        if (savedCount !== null) {
            setParticleCount(parseInt(savedCount, 10));
        }

        // Listen for changes from Options menu
        const handleParticlesToggle = (e) => {
            setParticlesEnabled(e.detail);
        };
        const handleParticleCountChange = (e) => {
            setParticleCount(e.detail);
        };

        window.addEventListener('particlesToggle', handleParticlesToggle);
        window.addEventListener('particleCountChange', handleParticleCountChange);

        return () => {
            window.removeEventListener('particlesToggle', handleParticlesToggle);
            window.removeEventListener('particleCountChange', handleParticleCountChange);
        };
    }, []);

    const toggleParticles = () => {
        const newState = !particlesEnabled;
        setParticlesEnabled(newState);
        localStorage.setItem('particlesEnabled', newState.toString());
    };

    return (
        <div className="app-container mc-bg">
            <PanoramaBackground />
            <BlockParticles enabled={particlesEnabled} count={particleCount} />
            <div className="menu-container">
                <div className="mc-logo">
                    Carter Tierney
                    <div className="mc-splash">Hire Me!</div>
                </div>

                <button className="mc-button" onClick={() => onNavigate('projects')}>
                    Singleplayer
                </button>
                <button className="mc-button" onClick={() => onNavigate('contact')}>
                    Multiplayer
                </button>
                <button className="mc-button" onClick={() => onNavigate('education')}>
                    Achievements
                </button>
                <div style={{ display: 'flex', gap: '10px', width: '550px' }}>
                    <button className="mc-button" style={{ flex: 1 }} onClick={() => onNavigate('options')}>
                        Options...
                    </button>
                    <button className="mc-button" style={{ flex: 1 }} onClick={() => alert("You can't quit! I need a job!")}>
                        Quit Game
                    </button>
                </div>
            </div>

            <div className="version-text">cartercraft 1.7.10 (Personal Website)</div>
            <div className="copyright-text">Copyright Mojang AB. Do not distribute!</div>
            
            {/* Floating Blocks Toggle Button */}
            <button
                className="mc-button"
                onClick={toggleParticles}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    width: '200px',
                    height: '45px',
                    fontSize: '20px',
                    zIndex: 100
                }}
            >
                {particlesEnabled ? 'Disable Blocks' : 'Enable Blocks'}
            </button>
        </div>
    );
};

export default MainMenu;
