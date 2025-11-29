import React, { useState, useEffect } from 'react';
import '../styles/minecraft.css';

const FeedbackBook = ({ isOpen, onClose }) => {
    const [feedback, setFeedback] = useState('');

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
            <div className="mc-book-container" onClick={(e) => e.stopPropagation()}>
                <button className="mc-book-close" onClick={onClose}>×</button>
                
                <h2 className="mc-book-title">Let Me Know What You Think</h2>
                
                <textarea
                    className="mc-book-textarea"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Type your feedback here..."
                    rows="12"
                />
                
                <div className="mc-book-actions">
                    <button className="mc-book-submit" onClick={handleSubmit}>
                        Send Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackBook;

