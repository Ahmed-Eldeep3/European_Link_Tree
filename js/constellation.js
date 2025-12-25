// Constellation Network Effect
const constCanvas = document.getElementById('constellationCanvas');
const constCtx = constCanvas.getContext('2d');
constCanvas.width = window.innerWidth;
constCanvas.height = window.innerHeight;

class Star {
    constructor() {
        this.x = Math.random() * constCanvas.width;
        this.y = Math.random() * constCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '13, 122, 184' : '124, 179, 66';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > constCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > constCanvas.height) this.vy *= -1;
    }

    draw() {
        constCtx.beginPath();
        constCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        constCtx.fillStyle = `rgba(${this.color}, 0.8)`;
        constCtx.shadowBlur = 15;
        constCtx.shadowColor = `rgba(${this.color}, 1)`;
        constCtx.fill();
        constCtx.shadowBlur = 0;
    }
}

// Create stars
const stars = [];
const starCount = Math.min(120, Math.floor(window.innerWidth * window.innerHeight / 10000));

for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// Mouse position
let mouse = { 
    x: constCanvas.width / 2, 
    y: constCanvas.height / 2 
};

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Draw connections between stars
function drawConnections() {
    const maxDistance = 150;
    
    // Star to star connections
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                constCtx.beginPath();
                constCtx.moveTo(stars[i].x, stars[i].y);
                constCtx.lineTo(stars[j].x, stars[j].y);
                const opacity = (1 - distance / maxDistance) * 0.5;
                constCtx.strokeStyle = `rgba(13, 122, 184, ${opacity})`;
                constCtx.lineWidth = 1;
                constCtx.stroke();
            }
        }

        // Mouse to star connections (Magnetic Effect)
        const dx = stars[i].x - mouse.x;
        const dy = stars[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
            constCtx.beginPath();
            constCtx.moveTo(stars[i].x, stars[i].y);
            constCtx.lineTo(mouse.x, mouse.y);
            const opacity = (1 - distance / 200) * 0.8;
            constCtx.strokeStyle = `rgba(124, 179, 66, ${opacity})`;
            constCtx.lineWidth = 2;
            constCtx.stroke();

            // Magnetic force
            const force = (200 - distance) / 200;
            stars[i].vx += (mouse.x - stars[i].x) * force * 0.001;
            stars[i].vy += (mouse.y - stars[i].y) * force * 0.001;
        }
    }
}

// Animation loop
function animateConstellation() {
    constCtx.fillStyle = 'rgba(0, 8, 20, 0.1)';
    constCtx.fillRect(0, 0, constCanvas.width, constCanvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    drawConnections();
    requestAnimationFrame(animateConstellation);
}

// Export for main.js
window.startConstellation = animateConstellation;