import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/theme.css';
import { resumeData } from '../data/resume';
import { projects } from '../data/projects';
import ProjectBlockIcon from './ProjectBlockIcon';
import ProjectDetailsModal from './ProjectDetailsModal';

const MainMenu = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
    const [expandedQuests, setExpandedQuests] = useState({});
    const [hoveredQuest, setHoveredQuest] = useState(null);
    const [isPhotoGalleryOpen, setIsPhotoGalleryOpen] = useState(false);
    const [isHoveringLogo, setIsHoveringLogo] = useState(false);
    const [currentPhotoPairIndex, setCurrentPhotoPairIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDirection, setSlideDirection] = useState('enter');
    const intervalRef = useRef(null);
    
    // Contact form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ text: '', type: '' });
    
    // Projects state
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [isBookOpen, setIsBookOpen] = useState(false);
    
    // Section refs for scrolling
    const aboutSectionRef = useRef(null);
    const projectsSectionRef = useRef(null);
    const experiencesSectionRef = useRef(null);
    const contactSectionRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
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
        }, 4000);
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

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            setSubmitStatus({ text: 'Please fill in all fields', type: 'error' });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setSubmitStatus({ text: 'Please enter a valid email address', type: 'error' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ text: '', type: '' });

        try {
            // EmailJS configuration
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio';
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact';
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

            // Template parameters
            const templateParams = {
                from_name: `${firstName} ${lastName}`,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'cartertierney0@gmail.com'
            };

            // Send email using EmailJS
            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            setSubmitStatus({ text: 'Message sent successfully! I\'ll get back to you soon.', type: 'success' });
            
            // Clear form
            setFirstName('');
            setLastName('');
            setEmail('');
            setSubject('');
            setMessage('');
            
            // Clear status message after 5 seconds
            setTimeout(() => {
                setSubmitStatus({ text: '', type: '' });
            }, 5000);

        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus({ 
                text: 'Failed to send message. Please try again or email directly at cartertierney0@gmail.com', 
                type: 'error' 
            });
        } finally {
            setIsSubmitting(false);
        }
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
                    <div ref={aboutSectionRef} style={{
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
                                        Problem Solver
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Brother to 5 siblings
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
                                    Education/Leadership
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
                                        Bachelor's at GSU, Dec 2025 3.3 GPA, Dual enrolled at KSU at ages 16/17 3.8 GPA
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Progsu VP Outreach -- programming club building a new community for CS students @ GSU
                                    </li>
                                    <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0', color: '#4682B4' }}>•</span>
                                        Barbell Club president -- weightlifting club on campus
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
                                    I was led to Computer Science through a passion for math, software, and inherent curiosity for what drives the world around me. The values that drive me are curiosity, passion, service, and community.
                                    I completed my undergrad in 3 years and pursuing my Master's as I serve as a Teaching/Research Assistant for Georgia State University.
                                    <br></br>   
                                    
                                    
                                    Outside of school/professional experiences, for the last 6 years I've been competing as a weightlifter//powerlifter while also working full-time jobs to support myself through high school/college. Currently I am preparing for 2026 PA Georgia State Championships as a 100kg Junior Lifter
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
                    <div ref={experiencesSectionRef} style={{
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
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div ref={projectsSectionRef} style={{
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
                            maxHeight: isMobile ? '60vh' : 'none',
                            overflowY: isMobile ? 'auto' : 'visible',
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
                            flexDirection: isMobile ? 'column' : 'row',
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
                                    width: isMobile ? '100%' : 'auto', 
                                    flex: isMobile ? 'none' : '1',
                                    minWidth: isMobile ? 'none' : '200px',
                                    maxWidth: isMobile ? 'none' : '250px',
                                    opacity: selectedProjectId ? 1 : 0.5 
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

                    {/* Enterprise Footer */}
                    <div ref={contactSectionRef} style={{
                        background: 'rgba(0,0,0,0.7)',
                        border: '2px solid #a0a0a0',
                        borderTopColor: '#505050',
                        borderLeftColor: '#505050',
                        borderBottomColor: '#fff',
                        borderRightColor: '#fff',
                        padding: isMobile ? '20px 16px' : '28px 24px',
                        margin: '0',
                        marginTop: isMobile ? '24px' : '32px',
                        boxSizing: 'border-box',
                        width: '100%'
                    }}>
                        {/* Top Section: Header */}
                        <div style={{
                            textAlign: 'center',
                            marginBottom: isMobile ? '16px' : '20px',
                            paddingBottom: isMobile ? '12px' : '16px',
                            borderBottom: '2px solid rgba(135, 206, 235, 0.3)'
                        }}>
                            <h3 style={{
                                color: '#B8E3F5',
                                fontSize: isMobile ? '16.8px' : '19.2px',
                                margin: '0',
                                fontFamily: 'var(--font-mojangles), monospace',
                                fontStyle: 'italic',
                                textShadow: '1px 1px 0 #3f3f3f',
                                padding: '0 10px'
                            }}>
                                Customer//Client Service Oriented and Passionate Problem Solver
                            </h3>
                        </div>

                        {/* Middle Section: 3 Columns */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: isMobile ? '20px' : '24px',
                            marginBottom: isMobile ? '16px' : '20px'
                        }}>
                            {/* Quick Links Column */}
                            <div>
                                <h4 style={{
                                    color: '#87CEEB',
                                    fontSize: isMobile ? '16px' : '18px',
                                    marginBottom: isMobile ? '10px' : '12px',
                                    fontFamily: 'var(--font-mojangles), monospace',
                                    textShadow: '1px 1px 0 #3f3f3f'
                                }}>
                                    Quick Links
                                </h4>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: '0',
                                    margin: '0 0 16px 0'
                                }}>
                                    {[
                                        { label: 'About Me', ref: aboutSectionRef },
                                        { label: 'Projects', ref: projectsSectionRef },
                                        { label: 'Experience', ref: experiencesSectionRef },
                                        { label: 'Contact', ref: contactSectionRef }
                                    ].map((link, index) => (
                                        <li key={index} style={{ marginBottom: '6px' }}>
                                            <button
                                                onClick={() => scrollToSection(link.ref)}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: '#87CEEB',
                                                    fontSize: isMobile ? '13px' : '15px',
                                                    fontFamily: 'var(--font-mojangles), monospace',
                                                    cursor: 'pointer',
                                                    textShadow: '1px 1px 0 #000',
                                                    padding: '4px 0',
                                                    textAlign: 'left',
                                                    width: '100%'
                                                }}
                                                onMouseEnter={(e) => e.target.style.color = '#B8E3F5'}
                                                onMouseLeave={(e) => e.target.style.color = '#87CEEB'}
                                            >
                                                • {link.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                
                                {/* Social Icons */}
                                <div style={{
                                    display: 'flex',
                                    gap: isMobile ? '16px' : '20px',
                                    justifyContent: 'flex-start',
                                    marginTop: '12px'
                                }}>
                                    <a
                                        href="https://www.linkedin.com/in/carter-tierney-6b6001261/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#87CEEB',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: isMobile ? '28px' : '32px',
                                            height: isMobile ? '28px' : '32px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#B8E3F5'}
                                        onMouseLeave={(e) => e.target.style.color = '#87CEEB'}
                                    >
                                        <svg width={isMobile ? '24' : '28'} height={isMobile ? '24' : '28'} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://github.com/ctsc"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#87CEEB',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: isMobile ? '28px' : '32px',
                                            height: isMobile ? '28px' : '32px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#B8E3F5'}
                                        onMouseLeave={(e) => e.target.style.color = '#87CEEB'}
                                    >
                                        <svg width={isMobile ? '24' : '28'} height={isMobile ? '24' : '28'} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href="mailto:cartertierney0@gmail.com"
                                        style={{
                                            color: '#87CEEB',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: isMobile ? '28px' : '32px',
                                            height: isMobile ? '28px' : '32px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#B8E3F5'}
                                        onMouseLeave={(e) => e.target.style.color = '#87CEEB'}
                                    >
                                        <svg width={isMobile ? '24' : '28'} height={isMobile ? '24' : '28'} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Technologies Column */}
                            <div>
                                <h4 style={{
                                    color: '#87CEEB',
                                    fontSize: isMobile ? '16px' : '18px',
                                    marginBottom: isMobile ? '10px' : '12px',
                                    fontFamily: 'var(--font-mojangles), monospace',
                                    textShadow: '1px 1px 0 #3f3f3f'
                                }}>
                                    Technologies
                                </h4>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '6px'
                                }}>
                                    {['React', 'NodeJS', 'Python', 'Java', 'AI/ML', 'TypeScript', 'JavaScript', 'C# & .NET', 'SQL', 'PostgreSQL', 'Firebase/Supabase', 'Cloud Services (GCS/AWS/Azure)', 'Docker', 'Flutter/Dart', 'Git/Github', 'APIs'].map((tech, index) => (
                                        <span key={index} style={{
                                            display: 'inline-block',
                                            background: 'rgba(135, 206, 235, 0.15)',
                                            border: '2px solid',
                                            borderTopColor: '#87CEEB',
                                            borderLeftColor: '#87CEEB',
                                            borderBottomColor: '#4682B4',
                                            borderRightColor: '#4682B4',
                                            color: '#E0F4FF',
                                            padding: '4px 10px',
                                            fontSize: isMobile ? '11px' : '12px',
                                            fontFamily: 'var(--font-mojangles), monospace',
                                            textShadow: '1px 1px 0 #000',
                                            boxShadow: '0 0 0 1px #000, inset 0 1px 2px rgba(255, 255, 255, 0.1)'
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Form Column */}
                            <div>
                                <h4 style={{
                                    color: '#87CEEB',
                                    fontSize: isMobile ? '16px' : '18px',
                                    marginBottom: isMobile ? '10px' : '12px',
                                    fontFamily: 'var(--font-mojangles), monospace',
                                    textShadow: '1px 1px 0 #3f3f3f'
                                }}>
                                    Let's Connect
                                </h4>
                                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                        className="contact-form-input"
                                        style={{
                                            opacity: isSubmitting ? 0.6 : 1,
                                            fontSize: isMobile ? '12px' : '14px',
                                            padding: isMobile ? '8px' : '10px'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                        className="contact-form-input"
                                        style={{
                                            opacity: isSubmitting ? 0.6 : 1,
                                            fontSize: isMobile ? '12px' : '14px',
                                            padding: isMobile ? '8px' : '10px'
                                        }}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                        className="contact-form-input"
                                        style={{
                                            opacity: isSubmitting ? 0.6 : 1,
                                            fontSize: isMobile ? '12px' : '14px',
                                            padding: isMobile ? '8px' : '10px'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                        className="contact-form-input"
                                        style={{
                                            opacity: isSubmitting ? 0.6 : 1,
                                            fontSize: isMobile ? '12px' : '14px',
                                            padding: isMobile ? '8px' : '10px'
                                        }}
                                    />
                                    <textarea
                                        placeholder="Message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                        rows={isMobile ? 4 : 5}
                                        className="contact-form-textarea"
                                        style={{
                                            opacity: isSubmitting ? 0.6 : 1,
                                            fontSize: isMobile ? '12px' : '14px',
                                            padding: isMobile ? '8px' : '10px',
                                            minHeight: isMobile ? '80px' : '100px',
                                            resize: 'vertical'
                                        }}
                                    />
                                    {submitStatus.text && (
                                        <div style={{
                                            padding: '8px',
                                            borderRadius: '4px',
                                            backgroundColor: submitStatus.type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                                            border: `2px solid ${submitStatus.type === 'success' ? '#00ff00' : '#ff0000'}`,
                                            color: submitStatus.type === 'success' ? '#00ff00' : '#ff0000',
                                            fontSize: isMobile ? '11px' : '13px',
                                            fontFamily: 'var(--font-mojangles), monospace',
                                            textAlign: 'center',
                                            textShadow: '1px 1px 0 #000'
                                        }}>
                                            {submitStatus.text}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className="mc-button"
                                        disabled={isSubmitting}
                                        style={{
                                            width: '100%',
                                            opacity: isSubmitting ? 0.6 : 1,
                                            cursor: isSubmitting ? 'wait' : 'pointer',
                                            fontSize: isMobile ? '14px' : '16px',
                                            padding: isMobile ? '10px' : '12px',
                                            marginTop: '4px'
                                        }}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Bottom Section: Copyright & Tech Stack */}
                        <div style={{
                            textAlign: 'center',
                            color: '#aaa',
                            fontSize: isMobile ? '11px' : '12px',
                            fontFamily: 'var(--font-mojangles), monospace',
                            lineHeight: '1.6',
                            marginTop: isMobile ? '12px' : '16px',
                            paddingTop: isMobile ? '12px' : '16px',
                            borderTop: '2px solid rgba(135, 206, 235, 0.3)'
                        }}>
                            <div style={{ marginBottom: '4px' }}>
                                © 2025 | Built with Love by CTSC | Built with NodeJS//TypeScript
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <ProjectDetailsModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
        </div>
    );
};

export default MainMenu;
