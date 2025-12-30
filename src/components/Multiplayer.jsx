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
        link.href = '/CarterTierney.pdf';
        link.download = 'CarterTierney.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="app-container mc-bg">
            <div className="menu-container multiplayer-container" style={{ 
                width: isMobile ? '100%' : '1400px', 
                maxWidth: isMobile ? '100%' : 'calc(100vw - 40px)', 
                padding: isMobile ? '20px 16px' : '30px 20px', 
                paddingTop: isMobile ? '20px' : '40px',
                paddingBottom: isMobile ? 'calc(20px + env(safe-area-inset-bottom, 0px))' : '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <h1 style={{ 
                    color: 'white', 
                    marginBottom: isMobile ? '16px' : '30px', 
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
                    gap: isMobile ? '16px' : '20px',
                    width: '100%',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    marginBottom: isMobile ? '16px' : '20px'
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
                            marginBottom: isMobile ? '12px' : '15px', 
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
                            marginBottom: isMobile ? '12px' : '15px', 
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
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            6'4, 235lbs
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            I have 4 sisters and 1 brother
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            New York Jets #1 Fan
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Favorite movie: Rocky
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Current Anime: Kingdom
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Hobbies//Interests: Powerlifting, coffee, touching grass, eating food, anime, cleaning my apartment
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
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Master's CS student at GSU in Atlanta (Current GPA: 3.76)
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Bachelor's at GSU, Dec 2025
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Dual enrolled at KSU at ages 16/17 with 3.8 GPA
                                        </li>
                                    </ul>
                                </div>

                                {/* Professional Section */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ 
                                        color: '#87CEEB', 
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
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Eager to solve problems, master frameworks, and learn new skills. Thrive when making a measurable difference
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Redesigned legacy clinic website system, boosted patient engagement 25% and cut load times by 60%
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Migrated property records for thousands of homeowners in Atlanta with zero data loss, improved accuracy to 99.8%
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            1300+ Atlanta homeowners use a dashboard I built//deployed
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Teaching assistant mentoring students through complex systems - love helping others level up their skills
                                        </li>
                                        <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                            Won Emory Hacks 2025, was the first hackathon I competed in. Planning to attend more in 2026
                                        </li>
                                    </ul>
                                </div>

                                {/* Experiences Section */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ 
                                        color: '#87CEEB', 
                                        fontSize: isMobile ? '16px' : '18px',
                                        marginBottom: '10px',
                                        fontWeight: 'bold',
                                        textShadow: '1px 1px 0 #3f3f3f'
                                    }}>
                                        Experiences
                                    </div>
                                    
                                    {/* Graduate Teaching Assistant Experience */}
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ 
                                            color: '#B0E0E6', 
                                            fontSize: isMobile ? '13px' : '15px',
                                            marginBottom: '6px',
                                            fontWeight: 'bold',
                                            textShadow: '1px 1px 0 #3f3f3f'
                                        }}>
                                            Graduate Teaching Assistant - GSU in Atlanta, GA (Jan 2026 - Present)
                                        </div>
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            paddingLeft: '0',
                                            margin: '0'
                                        }}>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                                Teaching Assistant for Computer Organization and Architecture, mentoring students through complex systems design concepts
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Paulk Clinic Experience */}
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ 
                                            color: '#B0E0E6', 
                                            fontSize: isMobile ? '13px' : '15px',
                                            marginBottom: '6px',
                                            fontWeight: 'bold',
                                            textShadow: '1px 1px 0 #3f3f3f'
                                        }}>
                                            Software Developer - Paulk Clinic (Freelance) (Aug 2025 - Dec 2025)
                                        </div>
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            paddingLeft: '0',
                                            margin: '0'
                                        }}>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                                Solo developer who redesigned clinic website, improving patient engagement and driving data-driven business decisions
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Alpha Web Advisors Experience */}
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ 
                                            color: '#B0E0E6', 
                                            fontSize: isMobile ? '13px' : '15px',
                                            marginBottom: '6px',
                                            fontWeight: 'bold',
                                            textShadow: '1px 1px 0 #3f3f3f'
                                        }}>
                                            Software//Data Engineer Intern - Alpha Web Advisors (Oct 2024 - Aug 2025)
                                        </div>
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            paddingLeft: '0',
                                            margin: '0'
                                        }}>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                                Migrated 500+ property records to PostgreSQL using AWS S3//Glue, achieving zero data loss and optimized SQL queries, boosting data accuracy from 92% to 99.8%
                                            </li>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                                Architected web apps using React//Typescript, providing homeowner residential portals//HOA dashboard boards and deployed AWS Amplify//RDS deployment pipelines, increasing system uptime to 99.9% for 1300+ users
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Ardent Residential Experience */}
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ 
                                            color: '#B0E0E6', 
                                            fontSize: isMobile ? '13px' : '15px',
                                            marginBottom: '6px',
                                            fontWeight: 'bold',
                                            textShadow: '1px 1px 0 #3f3f3f'
                                        }}>
                                            Technical Operations Intern - Ardent Residential (May 2022 - Aug 2022)
                                        </div>
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            paddingLeft: '0',
                                            margin: '0'
                                        }}>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                                Migrated 300+ HOA communities between management platforms, ensuring data accuracy and operational continuity
                                            </li>
                                            <li style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '0', color: '#000000' }}>•</span>
                                                Standardized records and verified data integrity across systems, preventing reporting issues and ensuring reliable access
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
                    marginTop: isMobile ? '16px' : '30px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '12px' : '10px',
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
