import React, { useState, useEffect } from 'react';
import '../styles/theme.css';

const CursorTrail = () => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHoveringButton, setIsHoveringButton] = useState(false);
    const [isInContentArea, setIsInContentArea] = useState(true);

    useEffect(() => {
        const handleMouseMove = (e) => {
            try {
                const newPos = { 
                    x: typeof e.clientX === 'number' ? e.clientX : 0, 
                    y: typeof e.clientY === 'number' ? e.clientY : 0 
                };
                setCursorPos(newPos);

                // Check if hovering over a button or clickable element
                const element = document.elementFromPoint(e.clientX, e.clientY);
                const isButton = element && (
                    element.tagName === 'BUTTON' ||
                    element.closest('button') ||
                    element.closest('.mc-button') ||
                    element.closest('.world-item') ||
                    element.closest('a') ||
                    element.style.cursor === 'pointer'
                );
                setIsHoveringButton(!!isButton);

                // Check if we're on experience/projects pages (have specific containers)
                const hasRestrictedContainers = document.querySelectorAll(
                    '.options-container, .world-select-container'
                ).length > 0;
                
                let inContentArea = true; // Default: show everywhere
                
                // Only restrict visibility on experience/projects pages
                if (hasRestrictedContainers) {
                    inContentArea = false;
                    const restrictedContainers = document.querySelectorAll(
                        '.options-container, .world-select-container'
                    );
                    restrictedContainers.forEach(container => {
                        const rect = container.getBoundingClientRect();
                        if (e.clientX >= rect.left && e.clientX <= rect.right &&
                            e.clientY >= rect.top && e.clientY <= rect.bottom) {
                            inContentArea = true;
                        }
                    });
                }
                
                setIsInContentArea(inContentArea);
            } catch (err) {
                console.error('Error in mouse move handler:', err);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            zIndex: 9999
        }}>
            {/* Main cursor ink blot - only visible in content areas */}
            {isInContentArea && (
                <div
                    className={`cursor-ink-blot-main ${isHoveringButton ? 'cursor-ink-blot-hover' : ''}`}
                    style={{
                        position: 'absolute',
                        left: `${cursorPos.x}px`,
                        top: `${cursorPos.y}px`,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            )}
        </div>
    );
};

export default CursorTrail;

