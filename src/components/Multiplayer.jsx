import React from 'react';
import '../styles/minecraft.css';

const Multiplayer = ({ onBack }) => {
    const servers = [
        {
            id: 1,
            name: "LinkedIn Server",
            motd: "Connect with me professionally!",
            players: "500/500",
            ping: 5,
            link: "https://www.linkedin.com/in/carter-tierney-6b6001261/"
        },
        {
            id: 2,
            name: "GitHub Repository",
            motd: "Check out my latest commits.",
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
        <div className="app-container mc-bg">
            <div className="menu-container" style={{ width: '1100px' }}>
                <h1 style={{ color: 'white', marginBottom: '25px', textShadow: '2px 2px 0 #3f3f3f', fontSize: '40px' }}>Play Multiplayer</h1>

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
                            <div className="server-status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', marginRight: '10px' }}>
                                <div style={{ color: '#aaa', fontSize: '14px' }}>{server.players}</div>
                                <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                                    {/* Ping Bars */}
                                    <div style={{ width: '4px', height: '6px', background: '#0f0' }}></div>
                                    <div style={{ width: '4px', height: '8px', background: '#0f0' }}></div>
                                    <div style={{ width: '4px', height: '10px', background: '#0f0' }}></div>
                                    <div style={{ width: '4px', height: '12px', background: server.ping < 10 ? '#0f0' : '#aaa' }}></div>
                                    <div style={{ width: '4px', height: '14px', background: server.ping < 5 ? '#0f0' : '#aaa' }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="button-row">
                    <button className="mc-button" style={{ width: '260px' }} onClick={() => alert('Please select a server first (click on one!)')}>Join Server</button>
                    <button className="mc-button" style={{ width: '260px' }} onClick={() => alert('Direct Connect...')}>Direct Connect</button>
                    <button className="mc-button" style={{ width: '260px' }} onClick={() => alert('Add Server...')}>Add Server</button>
                </div>

                <div className="button-row" style={{ marginTop: '10px' }}>
                    <button className="mc-button" style={{ width: '260px' }} onClick={() => alert('Refreshing...')}>Refresh</button>
                    <button className="mc-button" style={{ width: '260px' }} onClick={onBack}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Multiplayer;
