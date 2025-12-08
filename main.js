// Custom Cursor
const cursor = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const words = ["Creative Developer", "UI/UX Designer", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500); // Pause before typing next word
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

if (typingText) {
    type();
}

// 3D Tilt Effect for Glass Cards
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 5; // Subtle tilt
        const rotateY = ((x - centerX) / centerX) * -5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Scroll Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .hero-content').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Add CSS class for fade-in via JS
const style = document.createElement('style');
style.innerHTML = `
  .fade-in-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  .fade-in-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(5, 5, 5, 0.95)';
            navLinks.style.width = '100%';
            navLinks.style.padding = '2rem';
            navLinks.style.textAlign = 'center';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        }
    });
}

// Interactive Background Effect - Parallax on Mouse Move
const bgCanvas = document.getElementById('bg-canvas');
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
});

function animateBackground() {
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    if (bgCanvas) {
        bgCanvas.style.transform = `translate(${targetX}px, ${targetY}px)`;
    }

    requestAnimationFrame(animateBackground);
}

animateBackground();

// Enhanced Cursor Glow on Interactive Elements
const interactiveElements = document.querySelectorAll('a, button, .glass-card, .skill-tag');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '400px';
        cursor.style.height = '400px';
        cursor.style.background = 'radial-gradient(circle, rgba(0, 242, 255, 0.25), transparent 60%)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.width = '300px';
        cursor.style.height = '300px';
        cursor.style.background = 'radial-gradient(circle, rgba(0, 242, 255, 0.15), transparent 60%)';
    });
});

// Floating Particles Animation
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'floating-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 242, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 ${size * 5}px rgba(0, 242, 255, 0.5);
            animation: float-particle ${duration}s linear ${delay}s infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add floating particles animation to style
const particleStyle = document.createElement('style');
particleStyle.innerHTML = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '100' : '-100'}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);
createFloatingParticles();

// Smooth Scroll Behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Text Glow Effect on Scroll
window.addEventListener('scroll', () => {
    const scrollProgress = (window.scrollY / (document.body.scrollHeight - window.innerHeight));
    const headings = document.querySelectorAll('h1, h2, .section-title');
    
    headings.forEach((heading, index) => {
        const headingPosition = heading.getBoundingClientRect();
        const distance = Math.abs(headingPosition.top - window.innerHeight / 2);
        const maxDistance = window.innerHeight;
        const intensity = Math.max(0, 1 - distance / maxDistance);
        
        heading.style.textShadow = `0 0 ${intensity * 30}px rgba(0, 242, 255, ${intensity * 0.6})`;
    });
});

// Magnetic Button Effect
document.querySelectorAll('.cta-btn, .contact-btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distX = (e.clientX - centerX) * 0.2;
        const distY = (e.clientY - centerY) * 0.2;
        
        button.style.transform = `translate(${distX}px, ${distY}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});
