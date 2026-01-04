import React, { useState, useEffect } from 'react';
import { projects } from '../data/projects';
import ProjectDetailsModal from './ProjectDetailsModal';
import ProjectBlockIcon from './ProjectBlockIcon';
import '../styles/theme.css';

const ProjectsPage = ({ onBack }) => {
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
                paddingTop: isMobile ? '40px' : '120px',
                paddingBottom: isMobile ? 'calc(20px + env(safe-area-inset-bottom, 0px))' : '30px',
                boxSizing: 'border-box'
            }}>
                <h1 style={{ 
                    color: 'white', 
                    marginBottom: isMobile ? '24px' : '32px', 
                    marginTop: '0', 
                    marginLeft: '0',
                    marginRight: '0',
                    padding: isMobile ? '0 8px' : '0 12px',
                    textShadow: '2px 2px 0 #3f3f3f', 
                    fontSize: isMobile ? '28px' : '40px' 
                }}>Select World</h1>

                <div className="world-list">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={`world-item ${selectedId === project.id ? 'selected' : ''}`}
                            onClick={() => setSelectedId(project.id)}
                            style={{
                                cursor: 'pointer',
                                touchAction: 'manipulation'
                            }}
                        >
                            <div className="world-icon">
                                <ProjectBlockIcon 
                                    isSelected={selectedId === project.id}
                                    blockType={project.blockType || 'grass'}
                                    size={isMobile ? 48 : 64}
                                />
                            </div>
                            <div className="world-info">
                                <div className="world-name" style={{ color: '#87CEEB' }}>{project.name}</div>
                                <div className="world-desc" style={{ color: 'white', fontSize: isMobile ? '16px' : '18px', marginTop: '4px' }}>
                                    {Array.isArray(project.description) ? (
                                        <ul style={{ listStyle: 'none', paddingLeft: '0', margin: '4px 0' }}>
                                            {project.description.map((point, index) => (
                                                <li key={index} style={{ marginBottom: '4px', paddingLeft: '16px', position: 'relative' }}>
                                                    <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>*</span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        project.description
                                    )}
                                </div>
                                <div className="world-desc" style={{ color: '#aaa', fontSize: isMobile ? '14px' : '16px', marginTop: '4px' }}>
                                    {project.tech}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="button-row" style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '12px' : '10px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button
                        className="mc-button"
                        disabled={!selectedId}
                        onClick={handlePlay}
                        style={{ 
                            width: isMobile ? '100%' : 'auto', 
                            flex: isMobile ? 'none' : '1',
                            minWidth: isMobile ? 'none' : '200px',
                            maxWidth: isMobile ? 'none' : '250px',
                            opacity: selectedId ? 1 : 0.5 
                        }}
                    >
                        Play Selected World
                    </button>
                    <button 
                        className="mc-button" 
                        style={{ 
                            width: isMobile ? '100%' : 'auto',
                            flex: isMobile ? 'none' : '1',
                            minWidth: isMobile ? 'none' : '200px',
                            maxWidth: isMobile ? 'none' : '250px'
                        }} 
                        onClick={() => setIsBookOpen(true)}
                    >
                        Edit
                    </button>
                    <button 
                        className="mc-button" 
                        style={{ 
                            width: isMobile ? '100%' : 'auto',
                            flex: isMobile ? 'none' : '1',
                            minWidth: isMobile ? 'none' : '200px',
                            maxWidth: isMobile ? 'none' : '250px'
                        }} 
                        onClick={handleDownloadPDF}
                    >
                        Download Resume
                    </button>
                    <button 
                        className="mc-button" 
                        style={{ 
                            width: isMobile ? '100%' : 'auto',
                            flex: isMobile ? 'none' : '1',
                            minWidth: isMobile ? 'none' : '200px',
                            maxWidth: isMobile ? 'none' : '250px'
                        }} 
                        onClick={onBack}
                    >
                        Cancel
                    </button>
                </div>

                {/* Footer */}
                <div style={{
                    padding: isMobile ? '20px' : '30px',
                    textAlign: 'center',
                    color: '#aaa',
                    fontSize: isMobile ? '14px' : '16px',
                    fontFamily: 'var(--font-mojangles), monospace',
                    marginTop: isMobile ? '20px' : '30px'
                }}>
                </div>
            </div>
            
            <ProjectDetailsModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
        </div>
    );
};

export default ProjectsPage;

