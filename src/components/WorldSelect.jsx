import React, { useState, useEffect } from 'react';
import { projects } from '../data/projects';
import FeedbackBook from './FeedbackBook';
import WorldBlockIcon from './WorldBlockIcon';
import '../styles/minecraft.css';

const WorldSelect = ({ onBack }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePlay = () => {
        if (selectedId) {
            const project = projects.find(p => p.id === selectedId);
            window.open(project.link, '_blank');
        }
    };

    const handleDownloadPDF = () => {
        const link = document.createElement('a');
        link.href = '/CarterTierney.pdf';
        link.download = 'CarterTierney.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="app-container mc-bg">
            <div className="menu-container world-select-container" style={{ 
                width: isMobile ? '100%' : '1100px', 
                maxWidth: isMobile ? '100%' : 'calc(100vw - 40px)', 
                padding: isMobile ? '20px 16px' : '30px 20px', 
                paddingTop: isMobile ? '20px' : '100px',
                paddingBottom: isMobile ? 'calc(20px + env(safe-area-inset-bottom, 0px))' : '30px',
                boxSizing: 'border-box'
            }}>
                <h1 style={{ 
                    color: 'white', 
                    marginBottom: isMobile ? '16px' : '25px', 
                    marginTop: '0', 
                    textShadow: '2px 2px 0 #3f3f3f', 
                    fontSize: isMobile ? '28px' : '40px' 
                }}>Select World</h1>

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
                                    size={isMobile ? 48 : 64}
                                />
                            </div>
                            <div className="world-info">
                                <div className="world-name" style={{ color: '#ffff55' }}>{project.name} ({project.date})</div>
                                <div className="world-desc" style={{ color: 'white', fontSize: '18px', marginTop: '4px' }}>
                                    {Array.isArray(project.description) ? (
                                        <ul style={{ listStyle: 'none', paddingLeft: '0', margin: '4px 0' }}>
                                            {project.description.map((point, index) => (
                                                <li key={index} style={{ marginBottom: '4px', paddingLeft: '16px', position: 'relative' }}>
                                                    <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        project.description
                                    )}
                                </div>
                                <div className="world-desc" style={{ color: '#aaa', fontSize: '16px', marginTop: '4px' }}>
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
                        style={{ width: isMobile ? '100%' : '260px', maxWidth: isMobile ? 'none' : '260px', opacity: selectedId ? 1 : 0.5 }}
                    >
                        Play Selected World
                    </button>
                    <button className="mc-button" style={{ width: isMobile ? '100%' : '260px', maxWidth: isMobile ? 'none' : '260px' }} onClick={() => setIsBookOpen(true)}>Edit</button>
                </div>

                <div className="button-row" style={{ marginTop: isMobile ? '12px' : '10px' }}>
                    <button className="mc-button" style={{ width: isMobile ? '100%' : '260px', maxWidth: isMobile ? 'none' : '260px' }} onClick={handleDownloadPDF}>Download Resume</button>
                    <button className="mc-button" style={{ width: isMobile ? '100%' : '260px', maxWidth: isMobile ? 'none' : '260px' }} onClick={onBack}>Cancel</button>
                </div>
            </div>
            
            <FeedbackBook isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
        </div>
    );
};

export default WorldSelect;
