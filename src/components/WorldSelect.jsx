import React, { useState } from 'react';
import { projects } from '../data/projects';
import '../styles/minecraft.css';

const WorldSelect = ({ onBack }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handlePlay = () => {
        if (selectedId) {
            const project = projects.find(p => p.id === selectedId);
            window.open(project.link, '_blank');
        }
    };

    return (
        <div className="app-container mc-bg">
            <div className="menu-container" style={{ width: '800px' }}>
                <h1 style={{ color: 'white', marginBottom: '20px', textShadow: '2px 2px 0 #3f3f3f' }}>Select World</h1>

                <div className="world-list">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={`world-item ${selectedId === project.id ? 'selected' : ''}`}
                            onClick={() => setSelectedId(project.id)}
                        >
                            <div className="world-icon">
                                {/* Simple CSS icon representing a world */}
                                <div style={{ width: '100%', height: '100%', background: '#5a5a5a', border: '2px solid #000' }}></div>
                            </div>
                            <div className="world-info">
                                <div className="world-name">{project.name}</div>
                                <div className="world-details">
                                    {project.name} ({project.date})
                                    <br />
                                    <span style={{ color: '#aaa' }}>{project.mode}</span>
                                    <span style={{ color: '#555', marginLeft: '10px' }}>Cheats: Off</span>
                                </div>
                                <div className="world-desc" style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>
                                    {project.tech}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="button-row">
                    <button
                        className="mc-button"
                        disabled={!selectedId}
                        onClick={handlePlay}
                        style={{ width: '200px', opacity: selectedId ? 1 : 0.5 }}
                    >
                        Play Selected World
                    </button>
                    <button className="mc-button" style={{ width: '200px' }} onClick={() => alert('Edit feature coming soon!')}>Edit</button>
                    <button className="mc-button" style={{ width: '200px' }} onClick={() => alert('Cannot delete portfolio projects!')}>Delete</button>
                </div>

                <div className="button-row" style={{ marginTop: '10px' }}>
                    <button className="mc-button" style={{ width: '200px' }} onClick={() => alert('Re-creating world...')}>Re-Create</button>
                    <button className="mc-button" style={{ width: '200px' }} onClick={onBack}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default WorldSelect;
