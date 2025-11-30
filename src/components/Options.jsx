import React, { useState, useEffect } from 'react';
import { resumeData } from '../data/resume';
import '../styles/minecraft.css';

const Options = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('skills'); // skills, experience
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
        link.href = '/SWEcartertierney.pdf';
        link.download = 'SWEcartertierney.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="app-container mc-bg">
            <div className="menu-container options-container" style={{ width: isMobile ? '100%' : '1200px', maxWidth: '95vw', height: isMobile ? 'auto' : '87vh', minHeight: isMobile ? '100vh' : 'auto', padding: isMobile ? '10px' : '0' }}>
                <h1 style={{ color: 'white', marginBottom: '15px', textShadow: '2px 2px 0 #3f3f3f', fontSize: isMobile ? '28px' : '40px' }}>Game Options</h1>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                    <button
                        className="mc-button"
                        style={{ width: isMobile ? '100%' : '200px', backgroundColor: activeTab === 'skills' ? '#a8a8a8' : undefined }}
                        onClick={() => setActiveTab('skills')}
                    >
                        Skills
                    </button>
                    <button
                        className="mc-button"
                        style={{ width: isMobile ? '100%' : '200px', backgroundColor: activeTab === 'experience' ? '#a8a8a8' : undefined }}
                        onClick={() => setActiveTab('experience')}
                    >
                        Experience
                    </button>
                </div>

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
                    padding: isMobile ? '15px' : '20px',
                    marginBottom: '10px',
                    overflow: 'auto',
                    color: 'white',
                    fontFamily: 'var(--font-mojangles)',
                    fontSize: isMobile ? '18px' : '22px',
                    minHeight: isMobile ? '300px' : '400px',
                    maxHeight: isMobile ? '60vh' : 'none'
                }}>

                    {activeTab === 'skills' && (
                        <div className="settings-list">
                            <h2 style={{ color: '#ffff55', marginBottom: '15px', textShadow: '2px 2px 0 #3f3f3f', fontSize: isMobile ? '20px' : '24px' }}>Character Stats</h2>
                            {Object.entries(resumeData.skills).map(([category, items]) => {
                                const categoryNames = {
                                    cloudContainerization: 'Cloud/Containerization',
                                    dataScienceMachineLearning: 'Data Science/Machine Learning',
                                    dataEngineering: 'Data Engineering'
                                };
                                const displayName = categoryNames[category] || category.replace(/([A-Z])/g, ' $1').trim();
                                return (
                                    <div key={category} style={{ marginBottom: '15px' }}>
                                        <div style={{ color: '#aaa', marginBottom: '5px', textTransform: 'capitalize' }}>{displayName}:</div>
                                        <div style={{ color: '#fff' }}>{items}</div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <div className="settings-list">
                            <h2 style={{ color: '#ffff55', marginBottom: '15px', textShadow: '2px 2px 0 #3f3f3f', fontSize: isMobile ? '20px' : '24px' }}>Adventure Log</h2>
                            {resumeData.experience.map((job, index) => (
                                <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #555', paddingBottom: '10px' }}>
                                    <div style={{ fontSize: isMobile ? '18px' : '22px', color: '#fff' }}>{job.role}</div>
                                    <div style={{ color: '#aaa', marginBottom: '10px', fontSize: isMobile ? '14px' : '16px' }}>{job.company} | {job.date}</div>
                                    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                                        {job.points.map((point, i) => (
                                            <li key={i} style={{ marginBottom: '5px', display: 'flex' }}>
                                                <span style={{ color: '#ffff55', marginRight: '10px' }}>&gt;</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}


                </div>

                <div className="button-row">
                    <button className="mc-button" style={{ width: isMobile ? '100%' : '260px', maxWidth: isMobile ? 'none' : '260px' }} onClick={handleDownloadPDF}>Download PDF</button>
                    <button className="mc-button" style={{ width: isMobile ? '100%' : '260px', maxWidth: isMobile ? 'none' : '260px' }} onClick={onBack}>Done</button>
                </div>
            </div>
        </div>
    );
};

export default Options;
