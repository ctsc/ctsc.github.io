import React, { useState, useEffect } from 'react';
import '../styles/theme.css';

/**
 * Loading screen component that displays the dirt_background image
 * Used during page transitions in the Minecraft-themed portfolio
 */
const LoadingScreen = ({ isVisible }) => {
    const [opacity, setOpacity] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isVisible) {
            // Fade in smoothly
            requestAnimationFrame(() => {
                setOpacity(1);
            });
        } else {
            // Fade out smoothly
            setOpacity(0);
        }
    }, [isVisible]);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundImage: 'url(/Dirt_background.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mojangles), monospace',
                opacity: opacity,
                transition: 'opacity 0.25s ease-in-out',
                pointerEvents: opacity > 0 ? 'auto' : 'none'
            }}
        >
            {/* Optional: Add loading text in Minecraft style */}
            <div
                style={{
                    color: '#fff',
                    fontSize: isMobile ? '24px' : '32px',
                    textShadow: '2px 2px 0px #3f3f3f',
                    textAlign: 'center',
                    opacity: opacity
                }}
            >
                Loading...
            </div>
        </div>
    );
};

export default LoadingScreen;

