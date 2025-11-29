import React, { useState } from 'react';
import { projects } from '../data/projects';
import FeedbackBook from './FeedbackBook';
import WorldBlockIcon from './WorldBlockIcon';
import '../styles/minecraft.css';

const WorldSelect = ({ onBack }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [isBookOpen, setIsBookOpen] = useState(false);

    const handlePlay = () => {
        if (selectedId) {
            const project = projects.find(p => p.id === selectedId);
            window.open(project.link, '_blank');
        }
    };

    return (
        <div className="app-container mc-bg">
            <div className="menu-container" style={{ width: '1100px' }}>
                <h1 style={{ color: 'white', marginBottom: '25px', textShadow: '2px 2px 0 #3f3f3f', fontSize: '40px' }}>Select World</h1>

                <div className="world-list">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={`world-item ${selectedId === project.id ? 'selected' : ''}`}
                            onClick={() => setSelectedId(project.id)}
                        >
                            <div className="world-icon">
                                <WorldBlockIcon 
                                    isSelected={selectedId === project.id}
                                    blockType={project.blockType || 'grass'}
                                    size={64}
                                />
                            </div>
                            <div className="world-info">
                                <div className="world-name">{project.name}</div>
                                <div className="world-details">
                                    {project.name} ({project.date})
                                    <br />
                                    <span style={{ color: '#aaa' }}>{project.mode}</span>
                                </div>
                                <div className="world-desc" style={{ color: '#888', fontSize: '18px', marginTop: '4px' }}>
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
                        style={{ width: '260px', opacity: selectedId ? 1 : 0.5 }}
                    >
                        Play Selected World
                    </button>
                    <button className="mc-button" style={{ width: '260px' }} onClick={() => setIsBookOpen(true)}>Edit</button>
                    <button className="mc-button" style={{ width: '260px' }} onClick={() => alert('Cannot delete portfolio projects!')}>Delete</button>
                </div>

                <div className="button-row" style={{ marginTop: '10px' }}>
                    <button className="mc-button" style={{ width: '260px' }} onClick={() => alert('Re-creating world...')}>Re-Create</button>
                    <button className="mc-button" style={{ width: '260px' }} onClick={onBack}>Cancel</button>
                </div>
            </div>
            
            <FeedbackBook isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
        </div>
    );
};

export default WorldSelect;
