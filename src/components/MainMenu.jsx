import React, { useState, useEffect } from 'react';
import '../styles/theme.css';
import { resumeData } from '../data/resume';

const MainMenu = ({ onNavigate }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
    const [expandedQuests, setExpandedQuests] = useState({});
    const [hoveredQuest, setHoveredQuest] = useState(null);
    const [isPhotoGalleryOpen, setIsPhotoGalleryOpen] = useState(false);
    const [isHoveringLogo, setIsHoveringLogo] = useState(false);

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

    const calculateProgress = (date, role) => {
        // Special case for Graduate Teaching Assistant
        if (role === "Graduate Teaching Assistant") {
            return 5;
        }
        
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

    const servers = [
        {
            id: 1,
            name: "LinkedIn Server",
            motd: "Connect with me//see more about me",
            players: "500/500",
            ping: 5,
            link: "https://www.linkedin.com/in/carter-tierney-6b6001261/"
        },
        {
            id: 2,
            name: "GitHub Repository",
            motd: "Check out my latest projects//more about me",
            players: "12/20",
            ping: 12,
            link: "https://github.com/ctsc"
        },
        {
            id: 3,
            name: "Email Relay",
            motd: "cartertierney0@gmail.com",
            players: "1/1",
            ping: 1,
            link: "mailto:cartertierney0@gmail.com"
        }
    ];

    const handleJoin = (link) => {
        window.open(link, '_blank');
    };

    return (
        <div className="app-container mc-bg-scrolling main-menu-scrollable">
            <div className="menu-container" style={{
                width: isMobile ? '100%' : '1000px',
                maxWidth: isMobile ? '100%' : '1000px',
                padding: isMobile ? '20px 16px' : '30px 20px',
                paddingTop: isMobile ? '68px' : '88px',
                paddingBottom: isMobile ? 'calc(20px + env(safe-area-inset-bottom, 0px))' : '30px',
                paddingRight: isMobile ? '24px' : '20px',
                boxSizing: 'border-box',
                margin: '0 auto',
                minHeight: '100%',
                overflow: 'visible'
            }}>
                {/* Logo */}
                <div 
                    className={`mc-logo ${isHoveringLogo ? 'mc-logo-rainbow' : ''}`}
                    style={{ marginBottom: isMobile ? '24px' : '32px' }}
                    onMouseEnter={() => setIsHoveringLogo(true)}
                    onMouseLeave={() => setIsHoveringLogo(false)}
                >
                    Carter Tierney
                    <div className="mc-splash">Hire Me!</div>
                </div>

                {/* Scrollable Content Container */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '24px' : '32px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {/* About Section */}
                    <div style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: '2px solid #a0a0a0',
                        borderTopColor: '#505050',
                        borderLeftColor: '#505050',
                        borderBottomColor: '#fff',
                        borderRightColor: '#fff',
                        padding: isMobile ? '20px' : '24px',
                        margin: '0',
                        boxSizing: 'border-box',
                        width: '100%'
                    }}>
                        <h2 style={{ 
                            color: 'white', 
                            marginBottom: isMobile ? '16px' : '20px', 
                            marginTop: '0', 
                            textShadow: '2px 2px 0 #3f3f3f', 
                            fontSize: isMobile ? '24px' : '32px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-mojangles), monospace'
                        }}>About Me</h2>

                        <div style={{
                            padding: isMobile ? '12px' : '16px',
                            color: '#fff',
                            fontSize: isMobile ? '14px' : '16px',
                            lineHeight: '1.8',
                            fontFamily: 'var(--font-mojangles), monospace',
                            textAlign: 'left'
                        }}>
                            {/* Personal Section */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ 
                                    color: '#87CEEB', 
                                    fontSize: isMobile ? '16px' : '18px',
                                    marginBottom: '10px',
                                    fontWeight: 'bold',
                                    textShadow: '1px 1px 0 #3f3f3f'
                                }}>
                                    Personal
                                </div>
                                <ul style={{ 
                                    listStyle: 'none', 
                                    paddingLeft: '0',
                                    margin: '0'
                                }}>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Student Graduating Spring 2027 M.S. B.S Georgia State University
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Exploring Software Engineering using Data and Machine Learning/AI driven solutions.
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Brother of 4 sisters and 1 brother
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        New York Jets #1 Fan
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Favorite movie: Rocky
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Current Anime: Kingdom
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Hobbies//Interests: Powerlifting, coffee, touching grass, eating food, anime, cleaning my apartment
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        6'4 + 2024 USAPL Georgia State Champion Ages 18-19
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Favorite foods: korean BBQ, sushi, ground beef, fresh cookies, chocolate milk
                                    </li>
                                </ul>
                            </div>

                            {/* Education Section */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ 
                                    color: '#87CEEB', 
                                    fontSize: isMobile ? '16px' : '18px',
                                    marginBottom: '10px',
                                    fontWeight: 'bold',
                                    textShadow: '1px 1px 0 #3f3f3f'
                                }}>
                                    Education
                                </div>
                                <ul style={{ 
                                    listStyle: 'none', 
                                    paddingLeft: '0',
                                    margin: '0'
                                }}>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Master's CS student at GSU in Atlanta (Current GPA: 3.76)
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Bachelor's at GSU, Dec 2025
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Dual enrolled at KSU at ages 16/17 with 3.8 GPA
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Barbell Club president -- weightlifting club on campus
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Progsu member, building startups, prepping for interviews, and reaching out to companies like microsoft, google, fanduel, and more for on campus events
                                    </li>
                                </ul>
                            </div>

                            {/* Photo Gallery Section */}
                            <div style={{ marginBottom: '20px' }}>
                                <button
                                    className="mc-button"
                                    onClick={() => setIsPhotoGalleryOpen(!isPhotoGalleryOpen)}
                                    style={{
                                        width: '100%',
                                        marginBottom: isPhotoGalleryOpen ? '12px' : '0'
                                    }}
                                >
                                    Photo Gallery
                                </button>
                                {isPhotoGalleryOpen && (
                                    <div style={{
                                        padding: isMobile ? '16px' : '20px',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        marginTop: '12px',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gap: isMobile ? '12px' : '16px'
                                    }}>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    aspectRatio: '1',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    border: '2px solid rgba(255,255,255,0.3)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'rgba(255,255,255,0.5)',
                                                    fontSize: isMobile ? '14px' : '16px',
                                                    fontFamily: 'var(--font-mojangles), monospace'
                                                }}
                                            >
                                                Photo {i + 1}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Closing Statement */}
                            <div style={{ 
                                marginTop: '20px',
                                paddingTop: '15px',
                                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                                color: '#ffff55',
                                fontStyle: 'italic',
                                textAlign: 'center'
                            }}>
                                Always looking to network and connect!
                            </div>
                        </div>
                    </div>

                    {/* Experiences Section */}
                    <div style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: '2px solid #a0a0a0',
                        borderTopColor: '#505050',
                        borderLeftColor: '#505050',
                        borderBottomColor: '#fff',
                        borderRightColor: '#fff',
                        padding: isMobile ? '20px' : '24px',
                        margin: '0',
                        boxSizing: 'border-box',
                        width: '100%'
                    }}>
                        <h2 style={{ 
                            color: 'white', 
                            marginBottom: isMobile ? '16px' : '20px', 
                            marginTop: '0', 
                            textShadow: '2px 2px 0 #3f3f3f', 
                            fontSize: isMobile ? '24px' : '32px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-mojangles), monospace'
                        }}>Experiences</h2>

                        <div className="quest-log-container">
                            <div className="quest-grid">
                                {resumeData.experience.map((job, index) => {
                                    const isExpanded = expandedQuests[index];
                                    const progress = calculateProgress(job.date, job.role);
                                    const isHovered = hoveredQuest === index;
                                    
                                    return (
                                        <div
                                            key={index}
                                            className={`quest-card ${isExpanded ? 'quest-card-expanded' : ''} ${isHovered ? 'quest-card-hovered' : ''}`}
                                            onMouseEnter={() => !isMobile && setHoveredQuest(index)}
                                            onMouseLeave={() => !isMobile && setHoveredQuest(null)}
                                            onClick={() => toggleQuest(index)}
                                            style={{
                                                cursor: 'pointer',
                                                touchAction: 'manipulation'
                                            }}
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
                                                        <span className="quest-location">{job.company}</span>
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
                                                            <span className="quest-point-icon" style={{ color: '#4682B4' }}>*</span>
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

                    {/* Skills Section */}
                    <div style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: '2px solid #a0a0a0',
                        borderTopColor: '#505050',
                        borderLeftColor: '#505050',
                        borderBottomColor: '#fff',
                        borderRightColor: '#fff',
                        padding: isMobile ? '20px' : '24px',
                        margin: '0',
                        boxSizing: 'border-box',
                        width: '100%'
                    }}>
                        <h2 style={{ 
                            color: 'white', 
                            marginBottom: isMobile ? '16px' : '20px', 
                            marginTop: '0', 
                            textShadow: '2px 2px 0 #3f3f3f', 
                            fontSize: isMobile ? '24px' : '32px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-mojangles), monospace'
                        }}>Skills</h2>

                        <div className="skills-container" style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '16px' }}>
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
                                    <div 
                                        key={category} 
                                        className="skill-category-card"
                                        style={{ 
                                            marginBottom: '0'
                                        }}
                                    >
                                        <div className="skill-category-header">
                                            <span className="skill-category-icon">{getCategoryIcon(category)}</span>
                                            <h3 className="skill-category-title">{displayName}</h3>
                                        </div>
                                        <div className="skill-badges-container" style={{ 
                                            marginTop: isMobile ? '12px' : '16px'
                                        }}>
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

                    {/* Links Section */}
                    <div style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: '2px solid #a0a0a0',
                        borderTopColor: '#505050',
                        borderLeftColor: '#505050',
                        borderBottomColor: '#fff',
                        borderRightColor: '#fff',
                        padding: isMobile ? '20px' : '24px',
                        margin: '0',
                        boxSizing: 'border-box',
                        width: '100%'
                    }}>
                        <h2 style={{ 
                            color: 'white', 
                            marginBottom: isMobile ? '16px' : '20px', 
                            marginTop: '0', 
                            textShadow: '2px 2px 0 #3f3f3f', 
                            fontSize: isMobile ? '24px' : '32px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-mojangles), monospace'
                        }}>Links</h2>

                        <div className="world-list" style={{ 
                            minHeight: 'auto'
                        }}>
                            {servers.map((server) => (
                                <div
                                    key={server.id}
                                    className="world-item"
                                    onClick={() => handleJoin(server.link)}
                                    style={{
                                        cursor: 'pointer',
                                        touchAction: 'manipulation'
                                    }}
                                >
                                    <div className="world-icon">
                                        <div style={{ width: '100%', height: '100%', background: '#333', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }}>
                                            {server.name[0]}
                                        </div>
                                    </div>
                                    <div className="world-info" style={{ flex: 1 }}>
                                        <div className="world-name">{server.name}</div>
                                        <div className="world-details" style={{ color: '#aaa' }}>
                                            {server.motd}
                                        </div>
                                    </div>
                                    <div className="server-status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', marginRight: isMobile ? '5px' : '10px', flexShrink: 0 }}>
                                        <div style={{ color: '#aaa', fontSize: isMobile ? '12px' : '14px' }}>{server.players}</div>
                                        <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                                            <div style={{ width: '4px', height: '6px', background: '#0f0' }}></div>
                                            <div style={{ width: '4px', height: '8px', background: '#0f0' }}></div>
                                            <div style={{ width: '4px', height: '10px', background: '#0f0' }}></div>
                                            <div style={{ width: '4px', height: '12px', background: (server.id === 1 || server.id === 2) ? '#0f0' : (server.ping < 10 ? '#0f0' : '#aaa') }}></div>
                                            <div style={{ width: '4px', height: '14px', background: (server.id === 1 || server.id === 2) ? '#0f0' : (server.ping < 5 ? '#0f0' : '#aaa') }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: '2px solid #a0a0a0',
                        borderTopColor: '#505050',
                        borderLeftColor: '#505050',
                        borderBottomColor: '#fff',
                        borderRightColor: '#fff',
                        padding: isMobile ? '20px' : '24px',
                        margin: '0',
                        boxSizing: 'border-box',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: isMobile ? '16px' : '20px'
                    }}>
                        <p style={{
                            color: '#fff',
                            fontSize: isMobile ? '16px' : '18px',
                            fontFamily: 'var(--font-mojangles), monospace',
                            textAlign: 'center',
                            margin: '0'
                        }}>
                            Check out some of my projects
                        </p>
                        <button className="mc-button" onClick={() => onNavigate('projects')}>
                            Projects
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
                        Made With Love by CTSC
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
