import React, { useState, useEffect } from 'react';
import { resumeData } from '../data/resume';
import '../styles/minecraft.css';

const Education = ({ onBack }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            <div className="menu-container options-container" style={{ 
                width: isMobile ? '100%' : '1200px', 
                maxWidth: isMobile ? '100%' : 'calc(100vw - 40px)', 
                height: isMobile ? 'auto' : '87vh', 
                minHeight: isMobile ? 'auto' : 'auto', 
                padding: isMobile ? '20px 16px' : '30px 20px', 
                paddingTop: isMobile ? '20px' : '100px',
                paddingBottom: isMobile ? 'calc(20px + env(safe-area-inset-bottom, 0px))' : '30px',
                boxSizing: 'border-box'
            }}>
                <h1 style={{ 
                    color: 'white', 
                    marginBottom: isMobile ? '16px' : '15px', 
                    marginTop: '0', 
                    textShadow: '2px 2px 0 #3f3f3f', 
                    fontSize: isMobile ? '28px' : '40px' 
                }}>Game Options</h1>

                    {/* Content Area */}
                    <div className="options-content" style={{
                    flex: 1,
                    width: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    border: '2px solid #a0a0a0',
                    borderTopColor: '#505050',
                    borderLeftColor: '#505050',
                    borderBottomColor: '#fff',
                    borderRightColor: '#fff',
                    padding: isMobile ? '16px' : '20px',
                    marginBottom: isMobile ? '16px' : '10px',
                    overflow: 'auto',
                    color: 'white',
                    fontFamily: 'var(--font-mojangles)',
                    fontSize: isMobile ? '18px' : '22px',
                    minHeight: isMobile ? '300px' : '400px',
                    maxHeight: isMobile ? '60vh' : 'none',
                    boxSizing: 'border-box'
                }}>
                    <div className="skills-container">
                        <h2 className="skills-title">Character Stats</h2>
                        <div className="skills-grid">
                            {Object.entries(resumeData.skills).map(([category, items]) => {
                                const categoryNames = {
                                    languages: 'Languages',
                                    frameworks: 'Frameworks',
                                    toolsCloud: 'Tools/Cloud',
                                    dataScienceML: 'Data Science/ML',
                                    dataEngineering: 'Data Engineering'
                                };
                                const displayName = categoryNames[category] || category.replace(/([A-Z])/g, ' $1').trim();
                                const skillList = items.split(', ').map(skill => skill.trim());
                                
                                const getCategoryIcon = (cat) => {
                                    const icons = {
                                        languages: '💻',
                                        frameworks: '⚙️',
                                        toolsCloud: '☁️',
                                        dataScienceML: '🧠',
                                        dataEngineering: '📊'
                                    };
                                    return icons[cat] || '🔧';
                                };
                                
                                return (
                                    <div key={category} className="skill-category-card">
                                        <div className="skill-category-header">
                                            <span className="skill-category-icon">{getCategoryIcon(category)}</span>
                                            <h3 className="skill-category-title">{displayName}</h3>
                                        </div>
                                        <div className="skill-badges-container">
                                            {skillList.map((skill, index) => (
                                                <span key={index} className="skill-badge">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="button-row">
                    <button className="mc-button" style={{ width: isMobile ? '100%' : '260px', maxWidth: isMobile ? 'none' : '260px' }} onClick={handleDownloadPDF}>Download Resume</button>
                    <button className="mc-button" style={{ width: isMobile ? '100%' : '260px', maxWidth: isMobile ? 'none' : '260px' }} onClick={onBack}>Done</button>
                </div>
            </div>
        </div>
    );
};

export default Education;
