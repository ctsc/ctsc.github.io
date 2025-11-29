import React, { useState, useRef, useEffect } from 'react';
import { achievements } from '../data/achievements';
import MinecraftItemIcon from './MinecraftItemIcon';
import '../styles/minecraft.css';

const Education = ({ onBack }) => {
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [hoveredAchievement, setHoveredAchievement] = useState(null);
    const canvasRef = useRef(null);

    // Get achievement by ID
    const getAchievement = (id) => achievements.find(a => a.id === id);

    // Calculate connections between achievements - only horizontal/vertical
    const getConnections = () => {
        const connections = [];
        achievements.forEach(achievement => {
            achievement.dependencies.forEach(depId => {
                const parent = getAchievement(depId);
                if (parent) {
                    connections.push({
                        from: { x: parent.x, y: parent.y },
                        to: { x: achievement.x, y: achievement.y },
                        unlocked: achievement.unlocked && parent.unlocked
                    });
                }
            });
        });
        return connections;
    };
    
    // Render horizontal/vertical connection paths (no diagonal)
    const renderConnectionPath = (from, to) => {
        // Create a path that goes horizontal then vertical
        const midX = to.x;
        const midY = from.y;
        
        // Path: Move to start -> Line horizontally -> Line vertically
        return `M ${from.x} ${from.y} L ${midX} ${midY} L ${to.x} ${to.y}`;
    };

    // Mouse handlers for dragging
    const handleMouseDown = (e) => {
        if (e.button === 0 && !e.target.closest('.achievement-node')) {
            setIsDragging(true);
            setDragStart({ 
                x: e.clientX - pan.x, 
                y: e.clientY - pan.y 
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPan({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Zoom handler
    const handleWheel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.max(0.5, Math.min(2, zoom * delta));
        setZoom(newZoom);
        return false;
    };

    // Attach wheel event listener with passive: false to ensure preventDefault works
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const wheelHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            setZoom(prevZoom => {
                const newZoom = Math.max(0.5, Math.min(2, prevZoom * delta));
                return newZoom;
            });
        };

        canvas.addEventListener('wheel', wheelHandler, { passive: false });

        return () => {
            canvas.removeEventListener('wheel', wheelHandler);
        };
    }, []);

    const connections = getConnections();

    // Calculate canvas bounds
    const minX = Math.min(...achievements.map(a => a.x)) - 100;
    const maxX = Math.max(...achievements.map(a => a.x)) + 100;
    const minY = Math.min(...achievements.map(a => a.y)) - 100;
    const maxY = Math.max(...achievements.map(a => a.y)) + 100;
    const canvasWidth = maxX - minX;
    const canvasHeight = maxY - minY;

    return (
        <div className="app-container mc-bg">
            <div className="menu-container" style={{ width: '1200px', height: '87vh' }}>
                <h1 style={{ color: 'white', marginBottom: '15px', textShadow: '2px 2px 0 #3f3f3f', fontSize: '40px' }}>
                    Achievements
                </h1>

                {/* Achievement Canvas Container */}
                <div
                    ref={canvasRef}
                    style={{
                        flex: 1,
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: isDragging ? 'grabbing' : 'grab',
                        backgroundImage: 'url(/achieve.png)',
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        border: '2px solid #a0a0a0',
                        borderTopColor: '#505050',
                        borderLeftColor: '#505050',
                        borderBottomColor: '#fff',
                        borderRightColor: '#fff',
                        marginBottom: '10px'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* Shared Container for Lines and Nodes */}
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                            transformOrigin: '0 0',
                            width: `${canvasWidth}px`,
                            height: `${canvasHeight}px`,
                            left: `${-minX}px`,
                            top: `${-minY}px`,
                            zIndex: 1
                        }}
                    >
                        {/* Connection Lines SVG */}
                        <svg
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: `${canvasWidth}px`,
                                height: `${canvasHeight}px`,
                                pointerEvents: 'none',
                                zIndex: 1
                            }}
                        >
                            {connections.map((conn, index) => {
                                const path = renderConnectionPath(conn.from, conn.to);
                                const isUnlocked = conn.unlocked;
                                
                                return (
                                    <g key={index}>
                                        {/* Black outline for unlocked connections */}
                                        {isUnlocked && (
                                            <path
                                                d={path}
                                                stroke="#000000"
                                                strokeWidth="6"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        )}
                                        {/* Main line */}
                                        <path
                                            d={path}
                                            stroke={isUnlocked ? '#FFFF00' : '#9A9A00'} // Bright neon yellow or dark yellow
                                            strokeWidth={isUnlocked ? '4' : '3'}
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeDasharray={isUnlocked ? '0' : '8,4'}
                                            opacity={isUnlocked ? 1 : 0.6}
                                        />
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Achievement Nodes Container */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: `${canvasWidth}px`,
                                height: `${canvasHeight}px`,
                                zIndex: 2
                            }}
                        >
                        {achievements.map((achievement) => {
                            const isUnlocked = achievement.unlocked;
                            const isHovered = hoveredAchievement === achievement.id;

                            return (
                                <div
                                    key={achievement.id}
                                    className="achievement-node"
                                    style={{
                                        position: 'absolute',
                                        left: `${achievement.x}px`,
                                        top: `${achievement.y}px`,
                                        transform: 'translate(-50%, -50%)',
                                        cursor: 'pointer',
                                        zIndex: isHovered ? 10 : 1,
                                        pointerEvents: 'auto'
                                    }}
                                    onMouseEnter={() => setHoveredAchievement(achievement.id)}
                                    onMouseLeave={() => setHoveredAchievement(null)}
                                >
                                    {/* Achievement Icon */}
                                    <div
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            background: isUnlocked
                                                ? '#B0B0B0' // Bright grey block
                                                : '#555555',
                                            border: '3px solid',
                                            borderTopColor: isUnlocked ? '#D0D0D0' : '#666',
                                            borderLeftColor: isUnlocked ? '#D0D0D0' : '#666',
                                            borderBottomColor: isUnlocked ? '#808080' : '#222',
                                            borderRightColor: isUnlocked ? '#808080' : '#222',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: isUnlocked
                                                ? '0 0 0 2px #000, inset 0 0 8px rgba(0,0,0,0.2)'
                                                : '0 0 0 2px #000, inset 0 0 10px rgba(0,0,0,0.5)',
                                            imageRendering: 'pixelated',
                                            opacity: isUnlocked ? 1 : 0.5,
                                            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                                            transition: 'transform 0.2s ease',
                                            filter: isUnlocked ? 'none' : 'grayscale(100%)'
                                        }}
                                    >
                                        <MinecraftItemIcon 
                                            itemType={achievement.itemType || 'sword'} 
                                            size={32}
                                        />
                                    </div>

                                    {/* Achievement Tooltip */}
                                    {(isHovered || isUnlocked) && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '40px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                whiteSpace: 'nowrap',
                                                background: 'rgba(0, 0, 0, 0.9)',
                                                border: '2px solid #a0a0a0',
                                                borderTopColor: '#505050',
                                                borderLeftColor: '#505050',
                                                borderBottomColor: '#fff',
                                                borderRightColor: '#fff',
                                                padding: '8px 12px',
                                                fontSize: '14px',
                                                color: isUnlocked ? '#ffff55' : '#888888',
                                                textShadow: '2px 2px 0 #3f3f3f',
                                                fontFamily: 'var(--font-mojangles), monospace',
                                                pointerEvents: 'none',
                                                zIndex: 20,
                                                minWidth: '150px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                                                {achievement.title}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#aaa', lineHeight: '1.3' }}>
                                                {achievement.description}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        </div>
                    </div>

                    {/* Zoom Controls */}
                    <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        zIndex: 100
                    }}>
                        <button
                            className="mc-button"
                            style={{ width: '40px', height: '30px', fontSize: '18px' }}
                            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                        >
                            +
                        </button>
                        <button
                            className="mc-button"
                            style={{ width: '40px', height: '30px', fontSize: '18px' }}
                            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                        >
                            −
                        </button>
                    </div>

                    {/* Instructions */}
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        color: '#aaa',
                        fontSize: '12px',
                        fontFamily: 'var(--font-mojangles), monospace',
                        zIndex: 100
                    }}>
                        Drag to pan • Scroll to zoom • Hover for details
                    </div>
                </div>

                {/* Done Button */}
                <div className="button-row">
                    <button className="mc-button" style={{ width: '260px' }} onClick={onBack}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Education;
