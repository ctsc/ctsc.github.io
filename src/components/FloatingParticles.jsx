import React, { useMemo } from 'react';

const FloatingParticles = () => {
    const particles = useMemo(() => {
        const colors = [
            'rgba(255, 255, 255, 0.65)',
            'rgba(255, 215, 0, 0.55)',
            'rgba(0, 255, 255, 0.5)',
            'rgba(255, 255, 255, 0.5)',
            'rgba(255, 215, 0, 0.45)',
        ];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: 2 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            duration: 7 + Math.random() * 10,
            delay: -(Math.random() * 17),
            drift: -20 + Math.random() * 40,
        }));
    }, []);

    return (
        <div className="floating-particles-container">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="floating-particle"
                    style={{
                        left: p.left,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        '--drift': `${p.drift}px`,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
