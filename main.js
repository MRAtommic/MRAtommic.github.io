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
const words = ["Software & Web Developer", "Data Analyst", "AI & Automation Builder"];
let wordIndex = 0;
let charIndex = words[0].length;
let isDeleting = true;

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
    typingText.textContent = words[0];
    setTimeout(type, 2000);
}

// 3D Tilt Effect for Glass Cards (desktop hover only)
if (window.matchMedia('(hover: hover)').matches) {
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
}

// Scroll Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.02,
    rootMargin: '0px 0px -20px 0px'
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

// Mobile Menu Toggle (class-based, accessible)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('open');
        document.body.classList.toggle('nav-open');
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('open');
            document.body.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                document.body.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
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

/* --- Theme Toggle (Dark / Light) --- */
const themeToggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
    const isLight = theme === 'light';
    if (isLight) {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    if (themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
        }
        themeToggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });
}

/* --- Click-to-Switch Profile Photo --- */
const avatarWrap = document.getElementById('hero-avatar-wrap');
const avatarImg = document.getElementById('hero-avatar');
const photoCounter = document.getElementById('photo-counter');
const photoDots = document.querySelectorAll('.photo-dot');
const profilePhotos = ['profile.png', 'profile-2.png', 'profile-3.png'];
let currentPhotoIndex = 0;

if (avatarWrap && avatarImg) {
    profilePhotos.slice(1).forEach(src => {
        const pre = new Image();
        pre.src = src;
    });

    const setPhoto = (nextIndex) => {
        if (nextIndex === currentPhotoIndex) return;
        currentPhotoIndex = nextIndex;
        avatarImg.classList.add('switching');
        photoDots.forEach((dot, i) => dot.classList.toggle('active', i === currentPhotoIndex));
        if (photoCounter) {
            photoCounter.textContent = `${currentPhotoIndex + 1} / ${profilePhotos.length}`;
        }
        setTimeout(() => {
            avatarImg.src = profilePhotos[currentPhotoIndex];
            avatarImg.classList.remove('switching');
        }, 160);
    };

    const nextPhoto = () => setPhoto((currentPhotoIndex + 1) % profilePhotos.length);

    avatarWrap.addEventListener('click', nextPhoto);
    avatarWrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextPhoto();
        }
    });

    photoDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = Number(dot.dataset.index);
            if (!Number.isNaN(idx)) setPhoto(idx);
        });
    });
}

/* --- Active Nav Link on Scroll --- */
const navSections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
    const scrollPos = window.scrollY + 140;
    let currentId = '';

    navSections.forEach(sec => {
        if (scrollPos >= sec.offsetTop) {
            currentId = sec.getAttribute('id');
        }
    });

    navAnchors.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
const copyEmailBtn = document.getElementById('copy-email-btn');

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
        const email = copyEmailBtn.dataset.email;
        const label = copyEmailBtn.querySelector('span');
        const icon = copyEmailBtn.querySelector('i');

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(email);
            } else {
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }

            copyEmailBtn.classList.add('copied');
            if (label) label.textContent = 'Copied!';
            if (icon) icon.className = 'fas fa-check';

            setTimeout(() => {
                copyEmailBtn.classList.remove('copied');
                if (label) label.textContent = 'Copy';
                if (icon) icon.className = 'far fa-copy';
            }, 2000);
        } catch (err) {
            if (label) label.textContent = 'Failed';
        }
    });
}
