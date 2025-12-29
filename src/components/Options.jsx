import React, { useState, useEffect } from 'react';
import { resumeData } from '../data/resume';
import '../styles/minecraft.css';

const Options = ({ onBack }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
    const [expandedQuests, setExpandedQuests] = useState({});
    const [hoveredQuest, setHoveredQuest] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleQuest = (index) => {
        setExpandedQuests(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const calculateProgress = (date) => {
        if (date.includes('Present')) {
            // For ongoing quests, calculate based on start date
            const dateMatch = date.match(/(\w{3})\s(\d{4})/);
            if (dateMatch) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const startMonth = months.indexOf(dateMatch[1]);
                const startYear = parseInt(dateMatch[2]);
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();
                
                const totalMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);
                // Estimate 12 months for typical project duration, cap at 85% for ongoing
                const progress = Math.min(85, (totalMonths / 12) * 100);
                return Math.max(50, progress); // Minimum 50% for ongoing
            }
            return 75; // Default for ongoing
        }
        return 100; // Completed quests
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
            <div className="menu-container options-container" style={{ 
                width: isMobile ? '100%' : '1400px', 
                maxWidth: isMobile ? '100%' : 'calc(100vw - 40px)', 
                height: isMobile ? 'auto' : '90vh', 
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
                }}>Adventure Log</h1>


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
                    minHeight: isMobile ? '300px' : '500px',
                    maxHeight: isMobile ? '60vh' : '75vh',
                    boxSizing: 'border-box'
                }}>
                    <div className="quest-log-container">
                            <div className="quest-grid">
                                {resumeData.experience.map((job, index) => {
                                    const isExpanded = expandedQuests[index];
                                    const progress = calculateProgress(job.date);
                                    const isHovered = hoveredQuest === index;
                                    
                                    return (
                                        <div
                                            key={index}
                                            className={`quest-card ${isExpanded ? 'quest-card-expanded' : ''} ${isHovered ? 'quest-card-hovered' : ''}`}
                                            onMouseEnter={() => setHoveredQuest(index)}
                                            onMouseLeave={() => setHoveredQuest(null)}
                                            onClick={() => toggleQuest(index)}
                                        >
                                            <div className="quest-card-header">
                                                <div className="quest-header-content">
                                                    <div className="quest-title-row">
                                                        <h3 className="quest-title">{job.role}</h3>
                                                        <div className="quest-progress-container">
                                                            <div className="quest-progress-bar">
                                                                <div 
                                                                    className="quest-progress-fill"
                                                                    style={{ width: `${progress}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="quest-progress-text">{Math.round(progress)}%</span>
                                                        </div>
                                                    </div>
                                                    <div className="quest-meta">
                                                        <span className="quest-location">📍 {job.company}</span>
                                                        <span className="quest-date">⏰ {job.date}</span>
                                                    </div>
                                                </div>
                                                <div className={`quest-chevron ${isExpanded ? 'quest-chevron-expanded' : ''}`}>
                                                    ▼
                                                </div>
                                            </div>
                                            <div className={`quest-content ${isExpanded ? 'quest-content-expanded' : ''}`}>
                                                <div className="quest-details">
                                                    {job.points.map((point, i) => (
                                                        <div key={i} className="quest-point">
                                                            <span className="quest-point-icon">⚡</span>
                                                            <span className="quest-point-text">{point}</span>
                                                        </div>
                                                    ))}
                                                </div>
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

export default Options;
