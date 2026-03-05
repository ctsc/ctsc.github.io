import React, { useState, useEffect } from 'react';

const SLOTS = [
    { id: 'about', label: 'About', icon: '📖', number: 1 },
    { id: 'experiences', label: 'Quests', icon: '⚔️', number: 2 },
    { id: 'projects', label: 'Worlds', icon: '🌍', number: 3 },
    { id: 'links', label: 'Links', icon: '🔗', number: 4 },
];

const HotbarNav = ({ sectionRefs }) => {
    const [activeSection, setActiveSection] = useState('about');

    useEffect(() => {
        const observers = [];
        const handleIntersection = (id) => (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(id);
                }
            });
        };

        SLOTS.forEach((slot) => {
            const ref = sectionRefs[slot.id];
            if (ref?.current) {
                const observer = new IntersectionObserver(handleIntersection(slot.id), {
                    threshold: 0.3,
                    rootMargin: '-10% 0px -50% 0px',
                });
                observer.observe(ref.current);
                observers.push(observer);
            }
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, [sectionRefs]);

    const handleClick = (id) => {
        const ref = sectionRefs[id];
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav className="hotbar-nav">
            {SLOTS.map((slot) => (
                <button
                    key={slot.id}
                    className={`hotbar-slot ${activeSection === slot.id ? 'hotbar-slot-active' : ''}`}
                    onClick={() => handleClick(slot.id)}
                    aria-label={`Navigate to ${slot.label}`}
                >
                    <span className="hotbar-number">{slot.number}</span>
                    <span className="hotbar-icon">{slot.icon}</span>
                    <span className="hotbar-label">{slot.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default HotbarNav;
