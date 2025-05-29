// Star Trek Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navigation a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.navigation');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(44, 62, 80, 0.95)';
        } else {
            nav.style.background = 'rgba(44, 62, 80, 0.9)';
        }
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.info-card, .req-card, .policy-card, .week-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--card-glow)';
        });
    });

    // Add typing effect to course title
    const courseTitle = document.querySelector('.course-title');
    if (courseTitle) {
        const text = courseTitle.textContent;
        courseTitle.textContent = '';
        courseTitle.style.borderRight = '2px solid var(--starfleet-cyan)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                courseTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    courseTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1500);
    }

    // Add Star Trek sound effect on button hover (optional - would need audio files)
    const buttons = document.querySelectorAll('.navigation a');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Could add Star Trek beep sound here
            this.style.textShadow = '0 0 10px var(--starfleet-cyan)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });

    // Add section reveal animation on scroll
    const sections = document.querySelectorAll('.section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.15
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // Add random twinkling effect to stars
    function addTwinkle() {
        const stars = document.querySelectorAll('.stars, .stars2, .stars3');
        stars.forEach(starField => {
            const randomDelay = Math.random() * 5;
            starField.style.animationDelay = randomDelay + 's';
        });
    }
    
    addTwinkle();

    // Add console message for Star Trek fans
    console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                    STARFLEET ACADEMY                         ║
    ║              Division of Philosophical Sciences              ║
    ║                                                              ║
    ║  "Logic is the beginning of wisdom, not the end." - Spock    ║
    ║                                                              ║
    ║  Welcome to PHIL 1120: Logic, Reasoning, and Critical       ║
    ║  Thinking. Live long and prosper! 🖖                        ║
    ╚══════════════════════════════════════════════════════════════╝
    `);

    // Add Easter egg - Konami code for extra Star Trek effect
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateRedAlert();
            konamiCode = [];
        }
    });

    function activateRedAlert() {
        const body = document.body;
        const originalBg = body.style.background;
        
        // Flash red alert
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            if (flashCount % 2 === 0) {
                body.style.background = 'linear-gradient(45deg, #CC2936, #FF0000)';
            } else {
                body.style.background = originalBg;
            }
            flashCount++;
            
            if (flashCount >= 6) {
                clearInterval(flashInterval);
                body.style.background = originalBg;
                
                // Show message
                const alertDiv = document.createElement('div');
                alertDiv.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: rgba(204, 41, 54, 0.95);
                        color: white;
                        padding: 2rem;
                        border-radius: 15px;
                        border: 2px solid #FF0000;
                        z-index: 10000;
                        text-align: center;
                        font-family: 'Orbitron', monospace;
                        box-shadow: 0 0 30px rgba(255, 0, 0, 0.8);
                    ">
                        <h2>🚨 RED ALERT 🚨</h2>
                        <p>Konami Code Detected!</p>
                        <p>"Infinite diversity in infinite combinations" - Vulcan philosophy</p>
                        <button onclick="this.parentElement.parentElement.remove()" 
                                style="margin-top: 1rem; padding: 0.5rem 1rem; 
                                       background: #FFD700; color: #000; border: none; 
                                       border-radius: 5px; cursor: pointer;">
                            Acknowledged
                        </button>
                    </div>
                `;
                document.body.appendChild(alertDiv);
            }
        }, 200);
    }

    // Add dynamic date update
    const currentDate = new Date();
    const stardate = 2400 + (currentDate.getFullYear() - 2024) + (currentDate.getMonth() / 12);
    
    // Add stardate to footer if desired
    const footer = document.querySelector('.footer-content');
    if (footer) {
        const stardateP = document.createElement('p');
        stardateP.textContent = `Stardate: ${stardate.toFixed(2)}`;
        stardateP.style.color = 'var(--starfleet-cyan)';
        stardateP.style.fontSize = '0.9rem';
        footer.insertBefore(stardateP, footer.firstChild);
    }
});
