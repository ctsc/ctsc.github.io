import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/theme.css';
import { resumeData } from '../data/resume';
import { projects } from '../data/projects';
import ProjectBlockIcon from './ProjectBlockIcon';
import ProjectDetailsModal from './ProjectDetailsModal';

const ALL_PHOTOS = [
    '1741323783582618267.JPG',
    'IMG_0989.jpg',
    'IMG_0148.PNG',
    'IMG_3788.JPG',
    'IMG_1896.jpg',
    'IMG_2854.jpg',
];

const MainMenu = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
    const [isTablet, setIsTablet] = useState(window.innerWidth > 640 && window.innerWidth <= 1024);
    const [expandedQuests, setExpandedQuests] = useState({});
    const [hoveredQuest, setHoveredQuest] = useState(null);
    const [isHoveringLogo, setIsHoveringLogo] = useState(false);
    
    // Projects state
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [isBookOpen, setIsBookOpen] = useState(false);

    // Audio state
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const sectionReveal = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
            setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1024);
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
        if (role === "Software Engineering Intern") {
            return 50;
        }

        // Special case for Graduate Teaching Assistant
        if (role === "Graduate Teaching Assistant") {
            return 50;
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

    const copyEmailToClipboard = () => {
        const email = "cartertierney0@gmail.com";
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(() => {
                alert("Email copied to clipboard: " + email);
            }).catch(() => {
                window.prompt("Copy this email address:", email);
            });
        } else {
            window.prompt("Copy this email address:", email);
        }
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
            motd: "cartertierney0@gmail.com (click to copy)",
            players: "1/1",
            ping: 1,
            link: "mailto:cartertierney0@gmail.com"
        }
    ];

    const handleJoin = (server) => {
        if (server.name === "Email Relay") {
            copyEmailToClipboard();
        } else {
            window.open(server.link, '_blank');
        }
    };

    // Project handlers
    const handlePlay = () => {
        if (selectedProjectId) {
            const project = projects.find(p => p.id === selectedProjectId);
            if (project) {
                window.open(project.link, '_blank');
            }
        }
    };

    const handleDownloadPDF = () => {
        const link = document.createElement('a');
        link.href = '/_CarterTierney.pdf';
        link.download = '_CarterTierney.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleAudio = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/naruto-battle.mp3');
            audioRef.current.loop = true;
            audioRef.current.volume = 1.0;
        }

        const audio = audioRef.current;

        if (!audio.paused) {
            audio.pause();
            setIsPlaying(false);
            return;
        }

        audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
    };

    return (
        <div className="app-container mc-bg-scrolling main-menu-scrollable">
            <div className="logo-page-header">
                <div 
                    className={`mc-logo ${isHoveringLogo ? 'mc-logo-rainbow' : ''}`}
                    style={{ marginBottom: isMobile ? '24px' : '32px', cursor: 'pointer' }}
                    onClick={toggleAudio}
                    onMouseEnter={() => setIsHoveringLogo(true)}
                    onMouseLeave={() => setIsHoveringLogo(false)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAudio(); } }}
                    aria-label={isPlaying ? 'Stop music' : 'Play music'}
                >
                    Carter Tierney
                    <div className={`mc-splash ${isPlaying ? 'mc-splash-playing' : ''}`}>
                        {isPlaying ? 'Stop' : <>Click me <span aria-hidden="true">🔊</span></>}
                    </div>
                </div>
            </div>
            <div className={`menu-container ${!isMobile && !isTablet ? 'menu-container-assembly-center' : ''}`} style={{
                width: isMobile ? '100%' : isTablet ? '92%' : '1000px',
                maxWidth: '1000px',
                padding: isMobile ? '20px 16px' : isTablet ? '24px 20px' : '30px 20px',
                paddingTop: isMobile ? '8px' : isTablet ? '12px' : '16px',
                paddingBottom: '0',
                paddingRight: isMobile ? '24px' : '20px',
                boxSizing: 'border-box',
                margin: isMobile || isTablet ? '0 auto' : undefined,
                overflow: 'visible'
            }}>
                {/* Scrollable Content Container */}
                <div className="menu-scroll-content" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '24px' : '32px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {/* About Section + external gallery */}
                    <div className="about-gallery-wrap">
                    <motion.div
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        style={{
                        background: 'rgba(0,0,0,0.85)',
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
                                    color: '#ffff55',
                                    marginBottom: isMobile ? '12px' : '16px',
                                    marginTop: '0',
                                    textShadow: '2px 2px 0 #3f3f3f',
                                    fontSize: isMobile ? '24px' : '32px',
                                    textAlign: 'center',
                                    fontFamily: 'var(--font-mojangles), monospace',
                                    fontStyle: 'italic',
                                }}>Hello, World!</h2>

                                <div className="about-body-content" style={{
                                    padding: isMobile ? '12px' : isTablet ? '14px' : '16px',
                                    color: '#fff',
                                    lineHeight: '1.8',
                                    fontFamily: 'var(--font-mojangles), monospace',
                                }}>
                            {/* Journey Section */}
                            <div className="about-section-block" style={{ marginBottom: '20px' }}>
                                <div className="about-section-heading">
                                    Journey
                                </div>
                                <p>
                                    I was led to Computer Science through passion for math, software, video games, and curiosity for what drives the world around me.
        
                                    On campus, I'm the head of outreach for the Programming club ({' '}
                                    <a href="https://progsu.com" target="_blank" rel="noopener noreferrer" className="about-section-link">progsu.com</a>
                                    ) where I've bridged tech industry relationships and brought hackathons back to GSU ({' '}
                                    <a href="https://hacklanta.dev" target="_blank" rel="noopener noreferrer" className="about-section-link">hacklanta.dev</a>
                                    ). I'm also a competitive powerlifter and President of the Barbell Club.
                                </p>
                                <p>
                                    Outside of school, I've always kept myself busy. Throughout highschool and college, I've worked across the restaraunt industry.
                                    After coming to GSU in Atlanta, I did an internship with a local property management company, and through my Junior year I worked on a freelance contract, helped build a startup, and was able to secure an Internship at FanDuel.
                                    I am now completing my senior year, while earning my Masters Degree and working on SWE contracts.
                                </p>
                            </div>

                            {/* Personal Section */}
                            <div className="about-section-block" style={{ marginBottom: '20px' }}>
                                <div className="about-section-heading">
                                    Personal
                                </div>
                                <ul>
                                    <li>
                                        <span className="about-bullet">•</span>
                                        Hobbies: Powerlifting, video games, eating good food, anime and movies, chess
                                    </li>
                                    <li>
                                        <span className="about-bullet">•</span>
                                        Favorite foods: BBQ, sushi, cookies, chocolate milk, coffee, pizza
                                    </li>
                                    <li>
                                        <span className="about-bullet">•</span>
                                        6'4 + 2024 USAPL Georgia State Champion Ages 18-19: S 565 B 365 D 6:55
                                    </li>
                                    <li>
                                        <span className="about-bullet">•</span>
                                        Brother to 5 siblings
                                    </li>
                                </ul>
                            </div>

                            {/* Education Section */}
                            <div className="about-section-block" style={{ marginBottom: '20px' }}>
                                <div className="about-section-heading">
                                    Education
                                </div>
                                <ul>
                                    <li>
                                        <span className="about-bullet">•</span>
                                        M.S. Computer Science | B.S. Computer Science | Georgia State University Spring 2027
                                    </li>                                  
                                    <li>
                                        <span className="about-bullet">•</span>
                                        Hackathon Winner | 1st Emory Hacks | 2nd UGAHacks XI
                                    </li>
                                    <li>
                                        <span className="about-bullet">•</span>
                                        Dual Enrolled KSU at ages 16/17 (3.9 GPA)
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Links */}
                            <div className="about-contact-row">
                                <a href="https://www.linkedin.com/in/carter-tierney-6b6001261/" target="_blank" rel="noopener noreferrer" className="about-contact-link" onMouseEnter={(e) => e.currentTarget.style.color = '#ffffa0'} onMouseLeave={(e) => e.currentTarget.style.color = '#87CEEB'}>
                                    <svg className="about-contact-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                </a>
                                <a href="https://github.com/ctsc" target="_blank" rel="noopener noreferrer" className="about-contact-link" onMouseEnter={(e) => e.currentTarget.style.color = '#ffffa0'} onMouseLeave={(e) => e.currentTarget.style.color = '#87CEEB'}>
                                    <svg className="about-contact-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </a>
                                <a href="mailto:cartertierney0@gmail.com" className="about-contact-link" onClick={(e) => { e.preventDefault(); copyEmailToClipboard(); }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffa0'} onMouseLeave={(e) => e.currentTarget.style.color = '#87CEEB'}>
                                    <svg className="about-contact-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                </a>
                                <a
                                    href="https://calendly.com/cartertierney0/coffee-chat-with-carter"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="about-contact-calendly"
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffffa0'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#87CEEB'}
                                >
                                    Book a Chat
                                </a>
                                <span className="about-contact-tagline">
                                    Always looking to network and connect!
                                </span>
                            </div>
                                </div>
                    </motion.div>

                    <div className="about-section-gallery about-section-gallery-external">
                        <div className="photo-gallery-container">
                            <div className="photo-gallery-stack">
                                {ALL_PHOTOS.map((photoName, i) => {
                                    const isTwinFrPhoto = photoName === 'IMG_7931.jpg';
                                    return (
                                        <div
                                            key={photoName}
                                            className={`photo-gallery-item ${isTwinFrPhoto ? 'photo-gallery-twin-fr' : ''}`}
                                        >
                                            <img
                                                src={`/photogallery/${photoName}`}
                                                alt={`Photo ${i + 1}`}
                                                className="photo-gallery-image"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    display: 'block'
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.style.display = 'flex';
                                                    e.target.parentElement.style.alignItems = 'center';
                                                    e.target.parentElement.style.justifyContent = 'center';
                                                    e.target.parentElement.innerHTML = `<span style="color: rgba(255,255,255,0.5); font-size: ${isMobile ? '14px' : '16px'}; font-family: var(--font-mojangles), monospace;">Photo ${i + 1}</span>`;
                                                }}
                                            />
                                            {isTwinFrPhoto && (
                                                <div className="photo-gallery-twin-fr-text">
                                                    twin fr
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <div className="sidebar-links" id="links">
                                    <h2 className="sidebar-links-title">Links</h2>
                                    <div className="world-list links-world-list">
                                        {servers.map((server) => (
                                            <div
                                                key={server.id}
                                                className="world-item sidebar-link-item"
                                                onClick={() => handleJoin(server)}
                                                style={{
                                                    cursor: 'pointer',
                                                    touchAction: 'manipulation'
                                                }}
                                            >
                                                <div className="world-icon sidebar-link-icon">
                                                    <div className="sidebar-link-icon-inner">
                                                        {server.name[0]}
                                                    </div>
                                                </div>
                                                <div className="world-info" style={{ flex: 1, minWidth: 0 }}>
                                                    <div className="world-name sidebar-link-name">{server.name}</div>
                                                    <div className="world-details sidebar-link-motd">
                                                        {server.motd}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Experiences Section */}
                    <motion.div
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        style={{
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
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
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
                                                        {job.companyUrl ? (
                                                            <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="quest-location quest-company-link">{job.company}</a>
                                                        ) : (
                                                            <span className="quest-location">{job.company}</span>
                                                        )}
                                                        <span className="quest-date">⏰ {job.date}</span>
                                                    </div>
                                                </div>
                                                <div className={`quest-chevron ${isExpanded ? 'quest-chevron-expanded' : ''}`}>
                                                    ▼
                                                </div>
                                            </div>
                                            <div className={`quest-content ${isExpanded ? 'quest-content-expanded' : ''}`}>
                                                <div className="quest-objectives-row">
                                                    <div className="quest-objectives-header">Objectives</div>
                                                    {job.companyUrl && (
                                                        <a
                                                            href={job.companyUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="quest-website-link"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {job.companyUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="quest-details">
                                                    {job.points.map((point, i) => (
                                                        <div key={i} className="quest-point">
                                                            <span className="quest-point-icon" style={{ color: '#4682B4' }}>*</span>
                                                            <span className="quest-point-text">{point}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                {/* Skills Learned Section */}
                                                {job.skills && job.skills.length > 0 && (
                                                    <div className="quest-skills-section">
                                                        <div className="quest-skills-header">Skills Learned</div>
                                                        <div className="quest-skills-container">
                                                            {job.skills.map((skill, i) => (
                                                                <span key={i} className="quest-skill-badge">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Projects Section */}
                    <motion.div
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: '2px solid #a0a0a0',
                        borderTopColor: '#505050',
                        borderLeftColor: '#505050',
                        borderBottomColor: '#fff',
                        borderRightColor: '#fff',
                        padding: isMobile ? '16px' : '19.2px',
                        margin: '0',
                        boxSizing: 'border-box',
                        width: '100%'
                    }}>
                        <h2 style={{ 
                            color: 'white', 
                            marginBottom: isMobile ? '12.8px' : '16px', 
                            marginTop: '0', 
                            textShadow: '2px 2px 0 #3f3f3f', 
                            fontSize: isMobile ? '19.2px' : '25.6px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-mojangles), monospace'
                        }}>Select World</h2>

                        <div className="world-list" style={{
                            maxHeight: isMobile ? '60vh' : isTablet ? '55vh' : 'none',
                            overflowY: (isMobile || isTablet) ? 'auto' : 'visible',
                            overflowX: 'hidden'
                        }}>
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className={`world-item ${selectedProjectId === project.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedProjectId(project.id)}
                                    style={{
                                        cursor: 'pointer',
                                        touchAction: 'manipulation'
                                    }}
                                >
                            <div className="world-icon">
                                <ProjectBlockIcon 
                                    isSelected={selectedProjectId === project.id}
                                    blockType={project.blockType || 'grass'}
                                    size={isMobile ? 38.4 : 51.2}
                                />
                            </div>
                                    <div className="world-info">
                                        <div className="world-name" style={{ color: '#87CEEB', fontSize: isMobile ? '20px' : '24px' }}>{project.name}</div>
                                        <div className="world-desc" style={{ 
                                            color: 'white', 
                                            fontSize: isMobile ? '16px' : '18px', 
                                            marginTop: '6.4px',
                                            lineHeight: '1.7',
                                            letterSpacing: '0.3px'
                                        }}>
                                            {Array.isArray(project.description) ? (
                                                <ul style={{ listStyle: 'none', paddingLeft: '0', margin: '3.2px 0' }}>
                                                    {project.description.map((point, index) => (
                                                        <li key={index} style={{ marginBottom: '6.4px', paddingLeft: '12.8px', position: 'relative' }}>
                                                            <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>*</span>
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                project.description
                                            )}
                                        </div>
                                        <div className="world-desc" style={{ 
                                            color: '#aaa', 
                                            fontSize: isMobile ? '14.56px' : '16.64px',
                                            marginTop: '9.6px',
                                            fontWeight: '500'
                                        }}>
                                            {project.tech}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="button-row" style={{
                            display: 'flex',
                            flexDirection: (isMobile || isTablet) ? 'column' : 'row',
                            gap: isMobile ? '9.6px' : '8px',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            marginTop: isMobile ? '12.8px' : '16px'
                        }}>
                            <button
                                className="mc-button"
                                disabled={!selectedProjectId}
                                onClick={handlePlay}
                                style={{
                                    width: (isMobile || isTablet) ? '100%' : 'auto',
                                    flex: (isMobile || isTablet) ? 'none' : '1',
                                    minWidth: (isMobile || isTablet) ? 'none' : '200px',
                                    maxWidth: (isMobile || isTablet) ? 'none' : '250px',
                                    opacity: selectedProjectId ? 1 : 0.5
                                }}
                            >
                                Play Selected World
                            </button>
                            <button
                                className="mc-button"
                                style={{
                                    width: (isMobile || isTablet) ? '100%' : 'auto',
                                    flex: (isMobile || isTablet) ? 'none' : '1',
                                    minWidth: (isMobile || isTablet) ? 'none' : '200px',
                                    maxWidth: (isMobile || isTablet) ? 'none' : '250px'
                                }}
                                onClick={() => setIsBookOpen(true)}
                            >
                                Edit
                            </button>
                            <button
                                className="mc-button"
                                style={{
                                    width: (isMobile || isTablet) ? '100%' : 'auto',
                                    flex: (isMobile || isTablet) ? 'none' : '1',
                                    minWidth: (isMobile || isTablet) ? 'none' : '200px',
                                    maxWidth: (isMobile || isTablet) ? 'none' : '250px'
                                }}
                                onClick={handleDownloadPDF}
                            >
                                Download Resume
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div className="page-bottom-spacer" aria-hidden="true" />

            <ProjectDetailsModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
        </div>
    );
};

export default MainMenu;
