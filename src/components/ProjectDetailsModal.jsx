import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/theme.css';

const ProjectDetailsModal = ({ isOpen, onClose }) => {
    const [feedback, setFeedback] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' }); // type: 'success' or 'error'

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

    const handleSubmit = async () => {
        if (!feedback.trim()) {
            setStatusMessage({ text: 'Please enter your feedback', type: 'error' });
            return;
        }

        setIsLoading(true);
        setStatusMessage({ text: '', type: '' });

        try {
            // EmailJS configuration
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio';
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_feedback';
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

            // Template parameters
            const templateParams = {
                from_name: 'Portfolio Visitor',
                message: feedback,
                to_email: 'cartertierney0@gmail.com',
                reply_to: 'noreply@portfolio.com'
            };

            // Send email using EmailJS
            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            setStatusMessage({ text: 'Feedback sent successfully! Thank you!', type: 'success' });
            setFeedback('');
            
            // Close modal after 2 seconds
            setTimeout(() => {
                onClose();
                setStatusMessage({ text: '', type: '' });
            }, 2000);

        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatusMessage({ 
                text: 'Failed to send feedback. Please try again or email directly at cartertierney0@gmail.com', 
                type: 'error' 
            });
        } finally {
            setIsLoading(false);
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
                    disabled={isLoading}
                    style={{ 
                        fontSize: isMobile ? '16px' : '20px', 
                        padding: isMobile ? '12px' : '20px', 
                        minHeight: isMobile ? '200px' : '300px',
                        marginBottom: isMobile ? '16px' : '20px',
                        opacity: isLoading ? 0.6 : 1
                    }}
                />
                
                {/* Status Message */}
                {statusMessage.text && (
                    <div style={{
                        padding: '12px',
                        marginBottom: '16px',
                        borderRadius: '4px',
                        backgroundColor: statusMessage.type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                        border: `2px solid ${statusMessage.type === 'success' ? '#00ff00' : '#ff0000'}`,
                        color: statusMessage.type === 'success' ? '#00ff00' : '#ff0000',
                        fontSize: isMobile ? '14px' : '16px',
                        fontFamily: 'var(--font-mojangles), monospace',
                        textAlign: 'center',
                        textShadow: '1px 1px 0 #000'
                    }}>
                        {statusMessage.text}
                    </div>
                )}
                
                <div className="mc-book-actions">
                    <button 
                        className="mc-book-submit" 
                        onClick={handleSubmit}
                        disabled={isLoading}
                        style={{ 
                            width: isMobile ? '100%' : '200px', 
                            fontSize: isMobile ? '18px' : '22px',
                            opacity: isLoading ? 0.6 : 1,
                            cursor: isLoading ? 'wait' : 'pointer'
                        }}
                    >
                        {isLoading ? 'Sending...' : 'Send Feedback'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;
