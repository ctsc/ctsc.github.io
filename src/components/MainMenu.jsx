import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/theme.css';
import { resumeData } from '../data/resume';
import { projects } from '../data/projects';
import ProjectBlockIcon from './ProjectBlockIcon';
import ProjectDetailsModal from './ProjectDetailsModal';
import HotbarNav from './HotbarNav';

const MainMenu = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
    const [isTablet, setIsTablet] = useState(window.innerWidth > 640 && window.innerWidth <= 1024);
    const [expandedQuests, setExpandedQuests] = useState({});
    const [hoveredQuest, setHoveredQuest] = useState(null);
    const [isPhotoGalleryOpen, setIsPhotoGalleryOpen] = useState(false);
    const [isHoveringLogo, setIsHoveringLogo] = useState(false);
    const [currentPhotoPairIndex, setCurrentPhotoPairIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDirection, setSlideDirection] = useState('enter');
    const intervalRef = useRef(null);
    
    // Projects state
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [isBookOpen, setIsBookOpen] = useState(false);

    // Audio state
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    
    // Section refs for scrolling
    const aboutSectionRef = useRef(null);
    const projectsSectionRef = useRef(null);
    const experiencesSectionRef = useRef(null);
    const linksSectionRef = useRef(null);
    const contactSectionRef = useRef(null);

    const sectionRefs = {
        about: aboutSectionRef,
        experiences: experiencesSectionRef,
        projects: projectsSectionRef,
        links: linksSectionRef,
        contact: contactSectionRef,
    };

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

    // Helper function to start auto-advance timer
    const startAutoAdvance = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            navigateToIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 10000);
    };

    // Helper function to handle navigation with transition
    const navigateToIndex = (indexOrFunction) => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setSlideDirection('exit');
        
        setTimeout(() => {
            setCurrentPhotoPairIndex(indexOrFunction);
            setSlideDirection('enter');
            
            setTimeout(() => {
                setIsTransitioning(false);
            }, 400);
        }, 400);
    };

    // Auto-advance effect
    useEffect(() => {
        if (!isPhotoGalleryOpen) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }
        
        startAutoAdvance();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isPhotoGalleryOpen]);

    // Manual navigation handler for dots
    const handleDotClick = (index) => {
        if (isTransitioning || index === currentPhotoPairIndex) return;
        
        navigateToIndex(index);
        startAutoAdvance(); // Reset timer
    };

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

    // Scroll to section handlers
    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            audioRef.current.addEventListener('ended', () => setIsPlaying(false));
        }
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
    };

    return (
        <div className="app-container mc-bg-scrolling main-menu-scrollable">
            <div className="menu-container" style={{
                width: isMobile ? '100%' : isTablet ? '92%' : '1000px',
                maxWidth: '1000px',
                padding: isMobile ? '20px 16px' : isTablet ? '24px 20px' : '30px 20px',
                paddingTop: isMobile ? '72px' : isTablet ? '76px' : '88px',
                paddingBottom: isMobile ? 'calc(120px + env(safe-area-inset-bottom, 0px))' : '140px',
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
                    <motion.div
                        ref={aboutSectionRef}
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
                            color: 'white',
                            marginBottom: isMobile ? '12px' : '16px',
                            marginTop: '0',
                            textShadow: '2px 2px 0 #3f3f3f',
                            fontSize: isMobile ? '24px' : '32px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-mojangles), monospace'
                        }}>About Me</h2>
                        <p style={{
                            color: '#B8E3F5',
                            fontSize: isMobile ? '16.8px' : '19.2px',
                            textAlign: 'center',
                            marginTop: '0',
                            marginBottom: isMobile ? '16px' : '20px',
                            fontFamily: 'var(--font-mojangles), monospace',
                            textShadow: '1px 1px 0 #3f3f3f',
                            fontStyle: 'italic',
                            padding: '0 10px'
                        }}>
                            Passionate about innovative ML/AI-solutions through data driven technical strategies and scalable web applications
                        </p>

                        <div style={{
                            padding: isMobile ? '12px' : isTablet ? '14px' : '16px',
                            color: '#fff',
                            fontSize: isMobile ? '14px' : isTablet ? '15px' : '16px',
                            lineHeight: '1.8',
                            fontFamily: 'var(--font-mojangles), monospace',
                            textAlign: 'left',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
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
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Problem Solver
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Brother to 5 siblings
                                        <button
                                            onClick={toggleAudio}
                                            className="mc-button"
                                            style={{
                                                width: 'auto',
                                                padding: '0 14px',
                                                fontSize: isMobile ? '11px' : '13px',
                                                height: isMobile ? '24px' : '28px',
                                                lineHeight: isMobile ? '24px' : '28px',
                                                flexShrink: 0,
                                            }}
                                        >
                                            {isPlaying ? 'Stop' : <>Click Here <span style={{ marginLeft: '4px', fontSize: isMobile ? '13px' : '15px' }}>🔊</span></>}
                                        </button>
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Favorite movie: Rocky // Current Anime: Kingdom // New York Jets #1 Fan
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
                                        M.S. Computer Science (Current GPA: 3.76) | B.S. Computer Science — Georgia State University, Expected Spring 2027
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Completed undergrad in 3 years, dual enrolled at KSU at ages 16/17 (3.8 GPA)
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Hackathon Winner -- 1st Emory Hacks, 2nd UGAHacks XI
                                    </li>
                                </ul>
                            </div>

                            {/* Journey Section */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ 
                                    color: '#87CEEB', 
                                    fontSize: isMobile ? '16px' : '18px',
                                    marginBottom: '10px',
                                    fontWeight: 'bold',
                                    textShadow: '1px 1px 0 #3f3f3f'
                                }}>
                                    Journey
                                </div>
                                <p style={{
                                   
                                    margin: '0',
                                    paddingLeft: '0',
                                    lineHeight: '1.6'
                                }}>
                                    I was led to Computer Science through a passion for math, software, video games, and inherent curiosity for what drives the world around me. The values that drive me are curiosity, passion, service, and community.
                                    I completed my undergrad in 3 years and pursuing my Master's as I serve as a Teaching/Research Assistant for Georgia State University.
                                    <br></br>   
                                    
                                    
                                </p>
                            </div>

                            {/* Photo Gallery Section */}
                            <div style={{ marginBottom: '20px' }}>
                                <button
                                    className="mc-button"
                                    onClick={() => setIsPhotoGalleryOpen(!isPhotoGalleryOpen)}
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    Photo Gallery
                                </button>
                                <div className={`photo-gallery-container ${isPhotoGalleryOpen ? 'photo-gallery-open' : 'photo-gallery-closed'}`}>
                                    <div style={{
                                        paddingTop: isMobile ? '16px' : '20px',
                                        paddingLeft: isMobile ? '16px' : '20px',
                                        paddingRight: isMobile ? '16px' : '20px',
                                        paddingBottom: isMobile ? '24px' : '28px',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        marginTop: '12px',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gap: isMobile ? '12px' : '16px'
                                    }}>
                                        {(() => {
                                            const allPhotos = [
                                                '1741323783582618267.JPG',
                                                'IMG_3788.JPG',
                                                'IMG_0148.PNG',
                                                'IMG_2854.jpg',
                                                'IMG_7931.jpg',
                                                'IMG_7976.jpg',
                                                'IMG_1896.jpg',
                                                'IMG_0180.PNG',
                                                'IMG_0595.jpg',
                                                'IMG_0989.jpg'
                                            ];
                                            const startIndex = currentPhotoPairIndex * 2;
                                            const currentPhotos = allPhotos.slice(startIndex, startIndex + 2);
                                            
                                            return currentPhotos.map((photoName, i) => {
                                                const actualIndex = startIndex + i;
                                                const isTwinFrPhoto = photoName === 'IMG_7931.jpg';
                                                const animationClass = slideDirection === 'exit' ? 'slide-exit' : 'slide-enter';
                                                return (
                                                    <div
                                                        key={`${currentPhotoPairIndex}-${i}`}
                                                        className={`photo-gallery-item ${isTwinFrPhoto ? 'photo-gallery-twin-fr' : ''} ${animationClass}`}
                                                        style={{
                                                            aspectRatio: '1',
                                                            background: 'rgba(255,255,255,0.1)',
                                                            border: '2px solid rgba(255,255,255,0.3)',
                                                            overflow: 'hidden',
                                                            position: 'relative'
                                                        }}
                                                    >
                                                        <img
                                                            src={`/photogallery/${photoName}`}
                                                            alt={`Photo ${actualIndex + 1}`}
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
                                                                e.target.parentElement.innerHTML = `<span style="color: rgba(255,255,255,0.5); font-size: ${isMobile ? '14px' : '16px'}; font-family: var(--font-mojangles), monospace;">Photo ${actualIndex + 1}</span>`;
                                                            }}
                                                        />
                                                        {isTwinFrPhoto && (
                                                            <div className="photo-gallery-twin-fr-text">
                                                                twin fr
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            });
                                        })()}
                                    </div>
                                    {/* Navigation Dots */}
                                    <div className="gallery-dots-container">
                                        {[0, 1, 2, 3, 4].map((dotIndex) => (
                                            <button
                                                key={dotIndex}
                                                className={`gallery-dot ${dotIndex === currentPhotoPairIndex ? 'active' : ''}`}
                                                onClick={() => handleDotClick(dotIndex)}
                                                aria-label={`Go to photo pair ${dotIndex + 1}`}
                                                disabled={isTransitioning}
                                                style={{
                                                    opacity: isTransitioning ? 0.5 : 1
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Audio Button */}
                            {/* Closing Statement */}
                            <div style={{
                                color: '#ffff55',
                                fontStyle: 'italic',
                                textAlign: 'center'
                            }}>
                                Always looking to network and connect!
                            </div>

                        </div>
                    </motion.div>

                    {/* Experiences Section */}
                    <motion.div
                        ref={experiencesSectionRef}
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
                                                        <span className="quest-location">{job.company}</span>
                                                        <span className="quest-date">⏰ {job.date}</span>
                                                    </div>
                                                </div>
                                                <div className={`quest-chevron ${isExpanded ? 'quest-chevron-expanded' : ''}`}>
                                                    ▼
                                                </div>
                                            </div>
                                            <div className={`quest-content ${isExpanded ? 'quest-content-expanded' : ''}`}>
                                                {/* Objectives Section */}
                                                <div className="quest-objectives-header">Objectives</div>
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
                        ref={projectsSectionRef}
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
                                        <div className="world-name" style={{ color: '#87CEEB', fontSize: isMobile ? '18px' : '22px' }}>{project.name}</div>
                                        <div className="world-desc" style={{ 
                                            color: 'white', 
                                            fontSize: isMobile ? '14.72px' : '16.56px', 
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

                    {/* Links Section */}
                    <motion.div
                        ref={linksSectionRef}
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
                        }}>Links</h2>

                        <div className="world-list" style={{ 
                            minHeight: 'auto'
                        }}>
                            {servers.map((server) => (
                                <div
                                    key={server.id}
                                    className="world-item"
                                    onClick={() => handleJoin(server)}
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
                    </motion.div>

                </div>
            </div>

            {/* Static Header Bar */}
            <header ref={contactSectionRef} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 90,
                background: 'rgba(0,0,0,0.92)',
                borderBottom: '3px solid #505050',
                padding: isMobile ? '8px 12px' : isTablet ? '8px 16px' : '10px 24px',
                boxSizing: 'border-box',
                fontFamily: 'var(--font-mojangles), monospace',
                backdropFilter: 'blur(6px)',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: isMobile ? '10px' : isTablet ? '12px' : '20px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                }}>
                    {/* Nav Links */}
                    {[
                        { label: 'About', ref: aboutSectionRef },
                        { label: 'Quests', ref: experiencesSectionRef },
                        { label: 'Projects', ref: projectsSectionRef },
                        { label: 'Links', ref: linksSectionRef }
                    ].map((link, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSection(link.ref)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#87CEEB',
                                fontSize: isMobile ? '12px' : '14px',
                                fontFamily: 'var(--font-mojangles), monospace',
                                cursor: 'pointer',
                                textShadow: '1px 1px 0 #000',
                                padding: '8px 4px',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                minHeight: '36px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#ffffa0'}
                            onMouseLeave={(e) => e.target.style.color = '#87CEEB'}
                        >
                            {link.label}
                        </button>
                    ))}

                    {/* Separator */}
                    <div style={{ width: '1px', height: '18px', background: '#505050', flexShrink: 0 }} />

                    {/* Social Icons */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexShrink: 0 }}>
                        <a href="https://www.linkedin.com/in/carter-tierney-6b6001261/" target="_blank" rel="noopener noreferrer" style={{ color: '#87CEEB', display: 'flex', alignItems: 'center', padding: '8px 4px', minHeight: '36px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffa0'} onMouseLeave={(e) => e.currentTarget.style.color = '#87CEEB'}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a href="https://github.com/ctsc" target="_blank" rel="noopener noreferrer" style={{ color: '#87CEEB', display: 'flex', alignItems: 'center', padding: '8px 4px', minHeight: '36px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffa0'} onMouseLeave={(e) => e.currentTarget.style.color = '#87CEEB'}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                        <a href="mailto:cartertierney0@gmail.com" style={{ color: '#87CEEB', display: 'flex', alignItems: 'center', padding: '8px 4px', minHeight: '36px', cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); copyEmailToClipboard(); }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffa0'} onMouseLeave={(e) => e.currentTarget.style.color = '#87CEEB'}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                        </a>
                    </div>

                    {/* Spacer */}
                    <div style={{ flex: 1 }} />

                    {/* Calendly */}
                    <a
                        href="https://calendly.com/cartertierney0/coffee-chat-with-carter"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#87CEEB',
                            fontSize: isMobile ? '12px' : '14px',
                            fontFamily: 'var(--font-mojangles), monospace',
                            textDecoration: 'none',
                            textShadow: '1px 1px 0 #000',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            padding: '8px 4px',
                            minHeight: '36px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffa0'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#87CEEB'}
                    >
                        ☕ Book a Chat
                    </a>
                </div>
            </header>

            <HotbarNav sectionRefs={sectionRefs} />
            <ProjectDetailsModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
        </div>
    );
};

export default MainMenu;
