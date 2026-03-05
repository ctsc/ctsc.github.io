import React, { useMemo } from 'react';

const FloatingParticles = () => {
    const particles = useMemo(() => {
        const colors = [
            'rgba(255, 255, 255, 0.4)',
            'rgba(255, 215, 0, 0.35)',
            'rgba(0, 255, 255, 0.3)',
            'rgba(255, 255, 255, 0.25)',
            'rgba(255, 215, 0, 0.25)',
        ];
        return Array.from({ length: 25 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: 2 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            duration: 12 + Math.random() * 18,
            delay: -(Math.random() * 20),
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
