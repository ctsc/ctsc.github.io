import React, { useState, useRef, useEffect } from 'react';
import { achievements } from '../data/achievements';
import MinecraftItemIcon from './MinecraftItemIcon';
import '../styles/minecraft.css';

const Education = ({ onBack }) => {
    const [pan, setPan] = useState({ x: 0, y: 0 });
    // Start more zoomed out so more of the achievement tree is visible by default
    const [zoom, setZoom] = useState(0.6);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [hoveredAchievement, setHoveredAchievement] = useState(null);
    const canvasRef = useRef(null);
    
    // Touch handling for mobile
    const [touchStart, setTouchStart] = useState(null);
    const [pinchStart, setPinchStart] = useState(null);
    const [lastPinchDistance, setLastPinchDistance] = useState(null);
    
    // Border panning state
    const [borderPan, setBorderPan] = useState({ x: 0, y: 0 });
    const panIntervalRef = useRef(null);

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
            setBorderPan({ x: 0, y: 0 }); // Stop border panning when dragging
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPan({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        } else {
            // Check if mouse is near borders for auto-panning
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const horizontalThreshold = 350; // pixels from edge for left/right
                const verticalThreshold = 200; // pixels from edge for top/bottom
                const panSpeed = 16; // pixels per frame
                
                let panX = 0;
                let panY = 0;
                
                // Check left border
                if (mouseX < horizontalThreshold) {
                    panX = panSpeed * (1 - mouseX / horizontalThreshold);
                }
                // Check right border
                else if (mouseX > rect.width - horizontalThreshold) {
                    panX = -panSpeed * (1 - (rect.width - mouseX) / horizontalThreshold);
                }
                
                // Check top border
                if (mouseY < verticalThreshold) {
                    panY = panSpeed * (1 - mouseY / verticalThreshold);
                }
                // Check bottom border
                else if (mouseY > rect.height - verticalThreshold) {
                    panY = -panSpeed * (1 - (rect.height - mouseY) / verticalThreshold);
                }
                
                setBorderPan({ x: panX, y: panY });
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setBorderPan({ x: 0, y: 0 }); // Stop border panning when drag ends
    };
    
    const handleMouseLeave = () => {
        setIsDragging(false);
        setBorderPan({ x: 0, y: 0 }); // Stop panning when mouse leaves
    };

    // Touch handlers for mobile pan/zoom
    const handleTouchStart = (e) => {
        if (e.touches.length === 1) {
            // Single touch - start pan
            const touch = e.touches[0];
            setTouchStart({
                x: touch.clientX - pan.x,
                y: touch.clientY - pan.y
            });
            setIsDragging(true);
        } else if (e.touches.length === 2) {
            // Two touches - start pinch zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            setPinchStart({ distance, zoom });
            setLastPinchDistance(distance);
            setIsDragging(false);
        }
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        if (e.touches.length === 1 && touchStart) {
            // Single touch - pan
            const touch = e.touches[0];
            setPan({
                x: touch.clientX - touchStart.x,
                y: touch.clientY - touchStart.y
            });
        } else if (e.touches.length === 2 && pinchStart) {
            // Two touches - pinch zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            
            if (lastPinchDistance) {
                const scale = distance / lastPinchDistance;
                const newZoom = Math.max(0.4, Math.min(2, pinchStart.zoom * scale));
                setZoom(newZoom);
            }
            setLastPinchDistance(distance);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setTouchStart(null);
        setPinchStart(null);
        setLastPinchDistance(null);
    };

    // Zoom handler
    const handleWheel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.max(0.4, Math.min(2, zoom * delta));
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
                const newZoom = Math.max(0.4, Math.min(2, prevZoom * delta));
                return newZoom;
            });
        };

        canvas.addEventListener('wheel', wheelHandler, { passive: false });

        return () => {
            canvas.removeEventListener('wheel', wheelHandler);
        };
    }, []);
    
    // Auto-pan when mouse is near borders
    useEffect(() => {
        if (borderPan.x !== 0 || borderPan.y !== 0) {
            // Start panning
            if (!panIntervalRef.current) {
                panIntervalRef.current = setInterval(() => {
                    setPan(prevPan => ({
                        x: prevPan.x + borderPan.x,
                        y: prevPan.y + borderPan.y
                    }));
                }, 16); // ~60fps
            }
        } else {
            // Stop panning
            if (panIntervalRef.current) {
                clearInterval(panIntervalRef.current);
                panIntervalRef.current = null;
            }
        }
        
        return () => {
            if (panIntervalRef.current) {
                clearInterval(panIntervalRef.current);
                panIntervalRef.current = null;
            }
        };
    }, [borderPan]);

    const connections = getConnections();

    // Calculate canvas bounds
    const minX = Math.min(...achievements.map(a => a.x)) - 100;
    const maxX = Math.max(...achievements.map(a => a.x)) + 100;
    const minY = Math.min(...achievements.map(a => a.y)) - 100;
    const maxY = Math.max(...achievements.map(a => a.y)) + 100;
    const canvasWidth = maxX - minX;
    const canvasHeight = maxY - minY;

    // Check if mobile device
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
    const iconSize = isMobile ? 48 : 64;
    const nodeSize = isMobile ? 48 : 64;

    // Update mobile state on resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="app-container mc-bg">
            <div
                className="menu-container achievement-container"
                style={{
                    width: isMobile ? '100%' : '1600px',
                    maxWidth: '99vw',
                    height: isMobile ? 'auto' : '87vh',
                    padding: isMobile ? '10px' : '0'
                }}
            >
                <h1 style={{ color: 'white', marginBottom: '15px', textShadow: '2px 2px 0 #3f3f3f', fontSize: isMobile ? '28px' : '40px' }}>
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
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    touch-action="none"
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
                                                strokeWidth="8"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        )}
                                        {/* Main line */}
                                        <path
                                            d={path}
                                            stroke={isUnlocked ? '#FFD700' : '#9A9A00'} // Golden yellow or dark yellow
                                            strokeWidth={isUnlocked ? '7' : '4'}
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeDasharray={isUnlocked ? '0' : '8,4'}
                                            opacity={isUnlocked ? 1 : 0.6}
                                            filter={isUnlocked ? 'drop-shadow(0 0 2px #FFD700)' : 'none'}
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
                                            width: `${nodeSize}px`,
                                            height: `${nodeSize}px`,
                                            background: isUnlocked
                                                ? '#B0B0B0' // Bright grey block
                                                : '#555555',
                                            border: '4px solid',
                                            borderTopColor: isUnlocked ? '#D0D0D0' : '#666',
                                            borderLeftColor: isUnlocked ? '#D0D0D0' : '#666',
                                            borderBottomColor: isUnlocked ? '#808080' : '#222',
                                            borderRightColor: isUnlocked ? '#808080' : '#222',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: isUnlocked
                                                ? '0 0 0 3px #000, inset 0 0 8px rgba(0,0,0,0.2)'
                                                : '0 0 0 3px #000, inset 0 0 10px rgba(0,0,0,0.5)',
                                            imageRendering: 'pixelated',
                                            opacity: isUnlocked ? 1 : 0.5,
                                            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                                            transition: 'transform 0.2s ease',
                                            filter: isUnlocked ? 'none' : 'grayscale(100%)'
                                        }}
                                    >
                                        <MinecraftItemIcon 
                                            itemType={achievement.itemType || 'sword'} 
                                            size={iconSize}
                                        />
                                    </div>

                                    {/* Achievement Tooltip - Always visible */}
                                    <div
                                            style={{
                                                position: 'absolute',
                                                top: isMobile ? '40px' : '50px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                whiteSpace: 'nowrap',
                                                background: 'rgba(0, 0, 0, 0.9)',
                                                border: '2px solid #a0a0a0',
                                                borderTopColor: '#505050',
                                                borderLeftColor: '#505050',
                                                borderBottomColor: '#fff',
                                                borderRightColor: '#fff',
                                                padding: isMobile ? '8px 12px' : '10px 16px',
                                                fontSize: isMobile ? '14px' : '16px',
                                                fontFamily: 'var(--font-mojangles), monospace',
                                                pointerEvents: 'none',
                                                zIndex: 20,
                                                minWidth: isMobile ? '150px' : '200px',
                                                maxWidth: isMobile ? '200px' : 'none',
                                                textAlign: 'center',
                                                wordWrap: 'break-word',
                                                whiteSpace: isMobile ? 'normal' : 'nowrap'
                                            }}
                                        >
                                            <div style={{ 
                                                fontWeight: 'bold', 
                                                color: isUnlocked ? '#FFD700' : '#888888',
                                                fontSize: isMobile ? '16px' : '18px',
                                                textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 4px #000'
                                            }}>
                                                {achievement.title}
                                            </div>
                                        </div>
                                </div>
                            );
                        })}
                        </div>
                    </div>

                    {/* Zoom Controls */}
                    <div style={{
                        position: 'absolute',
                        bottom: isMobile ? '10px' : '20px',
                        right: isMobile ? '10px' : '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        zIndex: 100
                    }}>
                        <button
                            className="mc-button zoom-btn"
                            style={{ 
                                width: isMobile ? '44px' : '40px', 
                                height: isMobile ? '44px' : '30px', 
                                fontSize: isMobile ? '20px' : '18px',
                                minWidth: '44px',
                                minHeight: '44px'
                            }}
                            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                        >
                            +
                        </button>
                        <button
                            className="mc-button zoom-btn"
                            style={{ 
                                width: isMobile ? '44px' : '40px', 
                                height: isMobile ? '44px' : '30px', 
                                fontSize: isMobile ? '20px' : '18px',
                                minWidth: '44px',
                                minHeight: '44px'
                            }}
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
                        fontSize: isMobile ? '10px' : '12px',
                        fontFamily: 'var(--font-mojangles), monospace',
                        zIndex: 100,
                        display: isMobile ? 'none' : 'block'
                    }}>
                        Drag to pan • Scroll to zoom • Hover for details
                    </div>
                    {isMobile && (
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            color: '#aaa',
                            fontSize: '10px',
                            fontFamily: 'var(--font-mojangles), monospace',
                            zIndex: 100
                        }}>
                            Drag to pan • Pinch to zoom
                        </div>
                    )}
                </div>

                {/* Done Button */}
                <div className="button-row" style={{ marginTop: isMobile ? '10px' : '0' }}>
                    <button className="mc-button" style={{ width: isMobile ? '100%' : '260px', maxWidth: isMobile ? 'none' : '260px' }} onClick={onBack}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Education;
