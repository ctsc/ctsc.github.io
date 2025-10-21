// ==================== PROJECT CARD INTERACTIONS ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// ==================== GLITCH EFFECT TRIGGER ====================
const glitchElement = document.querySelector('.glitch');

if (glitchElement) {
    glitchElement.addEventListener('click', () => {
        // Trigger glitch animation on click
        glitchElement.style.animation = 'none';
        setTimeout(() => {
            glitchElement.style.animation = '';
        }, 10);
    });
}

// ==================== EASTER EGG: KONAMI CODE ====================
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear infinite';
            console.log('🎮 KONAMI CODE ACTIVATED! 🎮');
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ==================== SMOOTH PROJECT CARD ANIMATIONS ====================
// Add staggered fade-in effect on load
window.addEventListener('load', () => {
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 100);
    });
});

// ==================== CONSOLE MESSAGES ====================
console.log('%c⚡ Developer • Powerlifter • Gamer ⚡', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%cHey there! Nice to see you in the console! 👀', 'color: #00d9ff; font-size: 14px;');
console.log('%cTry the Konami code: ↑↑↓↓←→←→BA 🎮', 'color: #ff006e; font-size: 12px;');

// ==================== PREVENT SCROLL (Desktop only) ====================
// Prevent scrolling on desktop but allow on mobile
if (window.innerWidth > 768) {
    document.body.style.overflow = 'hidden';
}

// Update on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});
