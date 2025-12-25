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
            <div className="menu-container" style={{ width: isMobile ? 'calc(100% - 30px)' : '800px', maxWidth: isMobile ? 'calc(100% - 30px)' : 'calc(100vw - 40px)', padding: isMobile ? '20px 15px' : '30px 20px', paddingTop: isMobile ? '60px' : '100px' }}>
                <h1 style={{ color: 'white', marginBottom: '20px', marginTop: '0', textShadow: '2px 2px 0 #3f3f3f', fontSize: isMobile ? '28px' : '40px' }}>About//Links</h1>

                <div className="world-list">
                    {servers.map((server) => (
                        <div
                            key={server.id}
                            className="world-item"
                            onClick={() => handleJoin(server.link)}
                        >
                            <div className="world-icon">
                                {/* Server Icon */}
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
                                    {/* Ping Bars */}
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

                <div className="button-row">
                    <button className="mc-button" style={{ width: isMobile ? '100%' : '200px', maxWidth: isMobile ? 'none' : '200px' }} onClick={handleDownloadPDF}>Download Resume</button>
                    <button className="mc-button" style={{ width: isMobile ? '100%' : '200px', maxWidth: isMobile ? 'none' : '200px' }} onClick={onBack}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Multiplayer;
