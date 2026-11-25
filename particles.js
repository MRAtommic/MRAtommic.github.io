const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let starsArray;
let shootingStarsArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const darkColors = ['#ffffff', '#ffffff', '#ffffff', '#00f2ff', '#7000ff'];
const lightColors = ['#78716c', '#0f766e', '#4338ca'];

function isLightTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light';
}

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() * 0.2) - 0.1; // Slower, more natural drift
        this.speedY = (Math.random() * 0.2) - 0.1;
        this.colorIndex = Math.floor(Math.random() * darkColors.length);
        this.alpha = Math.random();
        this.twinkleSpeed = Math.random() * 0.01 + 0.002;
        this.isFading = Math.random() > 0.5;
    }

    draw() {
        const light = isLightTheme();
        const palette = light ? lightColors : darkColors;
        const color = palette[this.colorIndex % palette.length];
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, light ? this.size * 1.15 : this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = light ? this.alpha * 0.35 : this.alpha;
        if (!light) {
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = color;
        }
        ctx.fill();
        ctx.restore();
    }

    update() {
        // Movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen for infinite space feel
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Twinkle effect
        if (this.isFading) {
            this.alpha -= this.twinkleSpeed;
            if (this.alpha <= 0.1) {
                this.isFading = false;
                this.alpha = 0.1;
            }
        } else {
            this.alpha += this.twinkleSpeed;
            if (this.alpha >= 1) {
                this.isFading = true;
                this.alpha = 1;
            }
        }

        this.draw();
    }
}

class ShootingStar {
    constructor() {
        this.reset();
        this.active = false;
        this.wait = Math.random() * 5000 + 2000; // Random wait time
        this.timer = 0;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5; // Start in top half
        this.length = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.angle = Math.PI / 4; // 45 degrees
        this.opacity = 0;
    }

    draw() {
        if (!this.active) return;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
        ctx.stroke();
        ctx.restore();
    }

    update() {
        this.timer += 16; // Approx 60fps frame time
        if (!this.active) {
            if (this.timer > this.wait) {
                this.active = true;
                this.reset();
                this.opacity = 1;
                this.timer = 0;
                this.wait = Math.random() * 5000 + 2000;
            }
        } else {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);
            this.opacity -= 0.02;

            if (this.opacity <= 0) {
                this.active = false;
            }
        }
        this.draw();
    }
}

function init() {
    starsArray = [];
    shootingStarsArray = [];
    let numberOfStars = (canvas.width * canvas.height) / 4000; // Density of stars
    for (let i = 0; i < numberOfStars; i++) {
        starsArray.push(new Star());
    }
    // Add a few shooting stars
    for (let i = 0; i < 3; i++) {
        shootingStarsArray.push(new ShootingStar());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].update();
    }
    if (!isLightTheme()) {
        for (let i = 0; i < shootingStarsArray.length; i++) {
            shootingStarsArray[i].update();
        }
    }
}

// Resize event
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
