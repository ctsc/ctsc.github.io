import React from 'react';
import '../styles/minecraft.css';
// BlockParticles import kept but not used - code preserved in BlockParticles.jsx
// import BlockParticles from './BlockParticles';

const MainMenu = ({ onNavigate }) => {
    // Particle-related state and effects removed - code preserved in BlockParticles.jsx

    return (
        <div className="app-container mc-bg-scrolling">
            {/* BlockParticles component removed from rendering - code preserved in BlockParticles.jsx */}
            <div className="menu-container">
                <div className="mc-logo">
                    Carter Tierney
                    <div className="mc-splash">Hire Me!</div>
                </div>

                <button className="mc-button" onClick={() => onNavigate('projects')}>
                    Projects
                </button>
                <button className="mc-button" onClick={() => onNavigate('contact')}>
                    About//Links
                </button>
                <button className="mc-button" onClick={() => onNavigate('options')}>
                    Experience
                </button>
                <div className="button-row" style={{ maxWidth: '550px', width: '100%' }}>
                    <button className="mc-button" style={{ flex: 1 }} onClick={() => onNavigate('education')}>
                        Skills
                    </button>
                    <button className="mc-button" style={{ flex: 1 }} onClick={() => alert("You can't quit! I need a job!")}>
                        Quit Game
                    </button>
                </div>
            </div>

            <div className="bottom-mobile-container">
                {/* Floating Blocks Toggle Button removed - code preserved in BlockParticles.jsx */}
            </div>
        </div>
    );
};

export default MainMenu;
