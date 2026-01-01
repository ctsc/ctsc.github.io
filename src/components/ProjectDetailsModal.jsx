import React, { useState, useEffect } from 'react';
import '../styles/theme.css';

const ProjectDetailsModal = ({ isOpen, onClose }) => {
    const [feedback, setFeedback] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleSubmit = () => {
        if (feedback.trim()) {
            const subject = encodeURIComponent('Portfolio Feedback');
            const body = encodeURIComponent(feedback);
            window.location.href = `mailto:cartertierney0@gmail.com?subject=${subject}&body=${body}`;
            // Reset feedback and close after a brief delay
            setTimeout(() => {
                setFeedback('');
                onClose();
            }, 100);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="mc-book-overlay" onClick={handleOverlayClick}>
            <div className="mc-book-container" onClick={(e) => e.stopPropagation()} style={{ 
                width: isMobile ? 'calc(100vw - 32px)' : '700px', 
                maxWidth: isMobile ? 'calc(100vw - 32px)' : '700px',
                padding: isMobile ? '16px' : '40px 50px',
                paddingTop: isMobile ? 'calc(16px + 44px)' : '40px',
                paddingBottom: isMobile ? 'calc(16px + env(safe-area-inset-bottom, 0px))' : '40px',
                boxSizing: 'border-box'
            }}>
                <button className="mc-book-close" onClick={onClose} style={{ width: isMobile ? '44px' : '35px', height: isMobile ? '44px' : '35px', fontSize: isMobile ? '24px' : '28px' }}>×</button>
                
                <h2 className="mc-book-title" style={{ 
                    fontSize: isMobile ? '20px' : '32px', 
                    marginBottom: isMobile ? '16px' : '30px' 
                }}>Let Me Know What You Think</h2>
                
                <textarea
                    className="mc-book-textarea"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Type your feedback here..."
                    rows={isMobile ? '8' : '12'}
                    style={{ 
                        fontSize: isMobile ? '16px' : '20px', 
                        padding: isMobile ? '12px' : '20px', 
                        minHeight: isMobile ? '200px' : '300px',
                        marginBottom: isMobile ? '16px' : '20px'
                    }}
                />
                
                <div className="mc-book-actions">
                    <button className="mc-book-submit" onClick={handleSubmit} style={{ width: isMobile ? '100%' : '200px', fontSize: isMobile ? '18px' : '22px' }}>
                        Send Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;

