import React, { useState, useEffect } from 'react';
import '../styles/minecraft.css';

const Multiplayer = ({ onBack }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
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

    const handleDownloadPDF = () => {
        const link = document.createElement('a');
        link.href = '/sweai_carter_tierney.pdf';
        link.download = 'sweai_carter_tierney.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="app-container mc-bg">
            <div className="menu-container multiplayer-container" style={{ 
                width: isMobile ? '100%' : '1400px', 
                maxWidth: isMobile ? '95vw' : 'calc(100vw - 40px)', 
                padding: isMobile ? '20px 15px' : '30px 20px', 
                paddingTop: isMobile ? '20px' : '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h1 style={{ 
                    color: 'white', 
                    marginBottom: '30px', 
                    marginTop: '0', 
                    textShadow: '2px 2px 0 #3f3f3f', 
                    fontSize: isMobile ? '28px' : '40px',
                    textAlign: 'center',
                    width: '100%'
                }}>About//Links</h1>

                {/* Two Column Layout */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '20px' : '20px',
                    width: '100%',
                    alignItems: 'stretch',
                    justifyContent: 'center'
                }}>
                    {/* Left Side - Social Links */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        maxWidth: isMobile ? '100%' : 'calc(50% - 10px)'
                    }}>
                        <h2 style={{ 
                            color: 'white', 
                            marginBottom: '15px', 
                            marginTop: '0', 
                            textShadow: '2px 2px 0 #3f3f3f', 
                            fontSize: isMobile ? '22px' : '28px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-mojangles), monospace'
                        }}>Social Links</h2>

                        <div className="world-list" style={{ 
                            flex: 1,
                            minHeight: isMobile ? '300px' : '500px',
                            height: isMobile ? 'auto' : '500px'
                        }}>
                    {servers.map((server) => (
                        <div
                            key={server.id}
                            className="world-item"
                            onClick={() => handleJoin(server.link)}
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

                    {/* Right Side - About */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        maxWidth: isMobile ? '100%' : 'calc(50% - 10px)'
                    }}>
                        <h2 style={{ 
                            color: 'white', 
                            marginBottom: '15px', 
                            marginTop: '0', 
                            textShadow: '2px 2px 0 #3f3f3f', 
                            fontSize: isMobile ? '22px' : '28px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-mojangles), monospace'
                        }}>About</h2>

                        <div className="world-list" style={{ 
                            flex: 1,
                            minHeight: isMobile ? '300px' : '500px',
                            height: isMobile ? 'auto' : '500px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start'
                        }}>
                            <div style={{
                                padding: '20px',
                                color: '#fff',
                                fontSize: isMobile ? '14px' : '16px',
                                lineHeight: '1.8',
                                fontFamily: 'var(--font-mojangles), monospace',
                                textAlign: 'left'
                            }}>
                                {/* Personal Section */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ 
                                        color: '#ffff55', 
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
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            6'4, 235lbs, stronger than most pro athletes (650 deadlift, 365 bench)
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Competitive weightlifting (will be the strongest Python user)
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            I have 5 siblings
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            New York Jets #1 Fan
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Crunchyroll Background Binge Enthusiast
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Favorite movie: Rocky
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Current Anime: Kingdom
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Math nerd drawn to CS originally to become a teacher so I can help students learn to code earlier//efficiently
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            School, internships, freelance work, and personal projects build my path to ML//AI Software Engineering, and future CS professor
                                        </li>
                                    </ul>
                                </div>

                                {/* Education Section */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ 
                                        color: '#ffff55', 
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
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Master's CS student at GSU in Atlanta (Current GPA: 3.76)
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Bachelor's at GSU, Dec 2025
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Dual enrolled at KSU at ages 16/17 with 3.8 GPA
                                        </li>
                                    </ul>
                                </div>

                                {/* Professional Section */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ 
                                        color: '#ffff55', 
                                        fontSize: isMobile ? '16px' : '18px',
                                        marginBottom: '10px',
                                        fontWeight: 'bold',
                                        textShadow: '1px 1px 0 #3f3f3f'
                                    }}>
                                        Professional
                                    </div>
                                    <ul style={{ 
                                        listStyle: 'none', 
                                        paddingLeft: '0',
                                        margin: '0 0 12px 0'
                                    }}>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Results-driven and passionate software engineer
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Eager to solve problems, master frameworks, and learn new skills
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Get excited about impactful products that require technical depth and creative problem-solving
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Thrive when making a measurable difference
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                            Won my first hackathon I competed in; planning to attend multiple hackathons in 2026
                                        </li>
                                    </ul>
                                    
                                    {/* Graduate Teaching Assistant Experience */}
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ 
                                            color: '#ffff55', 
                                            fontSize: isMobile ? '15px' : '17px',
                                            marginBottom: '6px',
                                            fontWeight: 'bold',
                                            textShadow: '1px 1px 0 #3f3f3f'
                                        }}>
                                            Graduate Teaching Assistant - GSU in Atlanta, GA (1/25-present)
                                        </div>
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            paddingLeft: '0',
                                            margin: '0'
                                        }}>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                                Teaching Assistant for Computer Organization and Architecture, facilitating student comprehension of low-level systems design and hardware-software interactions
                                            </li>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                                Mentoring students through complex concepts including processor architecture, memory hierarchies, and assembly language programming
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Paulk Clinic Experience */}
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ 
                                            color: '#ffff55', 
                                            fontSize: isMobile ? '15px' : '17px',
                                            marginBottom: '6px',
                                            fontWeight: 'bold',
                                            textShadow: '1px 1px 0 #3f3f3f'
                                        }}>
                                            Full Stack Developer - Paulk Clinic (Freelance) (8/25 - present)
                                        </div>
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            paddingLeft: '0',
                                            margin: '0'
                                        }}>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                                Solo developer who completely redesigned frontend and backend for chiropractic clinic
                                            </li>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                                Visualizing valuable insights from website data to drive business decisions
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Alpha Web Advisors Experience */}
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ 
                                            color: '#ffff55', 
                                            fontSize: isMobile ? '15px' : '17px',
                                            marginBottom: '6px',
                                            fontWeight: 'bold',
                                            textShadow: '1px 1px 0 #3f3f3f'
                                        }}>
                                            Software Engineer Intern - Alpha Web Advisors (10/24-8/25)
                                        </div>
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            paddingLeft: '0',
                                            margin: '0'
                                        }}>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                                Built software and data systems for HOAs and communities in Atlanta
                                            </li>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                                Engineered and maintained deployment of homeowner portals and HOA dashboards for 1,300+ residents/users
                                            </li>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#ffff55' }}>•</span>
                                                Business consultant and web services developer for property management solutions
                                            </li>
                                        </ul>
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
                </div>
                </div>

                {/* Buttons Row - Centered at Bottom */}
                <div className="button-row" style={{ 
                    width: '100%', 
                    marginTop: '30px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <button className="mc-button" style={{ 
                        width: isMobile ? '100%' : '260px', 
                        maxWidth: isMobile ? 'none' : '260px' 
                    }} onClick={handleDownloadPDF}>
                        Download Resume
                    </button>
                    <button className="mc-button" style={{ 
                        width: isMobile ? '100%' : '260px', 
                        maxWidth: isMobile ? 'none' : '260px' 
                    }} onClick={onBack}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Multiplayer;
