// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #0955A3');
console.log('%c   CARTER TIERNEY | DATA ENGINEER', 'color: #0955A3; font-size: 16px; font-weight: bold');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #0955A3');
console.log('%c📊 Processing 12.5K tx/min with 99.7% uptime', 'color: #575757; font-size: 12px');
console.log('%c⚡ Apache Kafka • Spark • PostgreSQL • AWS', 'color: #575757; font-size: 12px');
console.log('%c\n👀 Thanks for checking the console!', 'color: #0955A3; font-size: 12px');
