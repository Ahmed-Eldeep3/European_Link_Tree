// Fluid Waves Background
const wavesCanvas = document.getElementById('wavesCanvas');
const wavesCtx = wavesCanvas.getContext('2d');
wavesCanvas.width = window.innerWidth;
wavesCanvas.height = window.innerHeight;

class Wave {
    constructor(y, amplitude, frequency, phase, color) {
        this.y = y;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.phase = phase;
        this.color = color;
    }

    draw(time) {
        wavesCtx.beginPath();
        wavesCtx.moveTo(0, wavesCanvas.height);

        for (let x = 0; x < wavesCanvas.width; x++) {
            const y = this.y + Math.sin((x * this.frequency + time * 2 + this.phase) * 0.01) * this.amplitude;
            wavesCtx.lineTo(x, y);
        }

        wavesCtx.lineTo(wavesCanvas.width, wavesCanvas.height);
        wavesCtx.closePath();

        const gradient = wavesCtx.createLinearGradient(0, this.y - this.amplitude, 0, wavesCanvas.height);
        gradient.addColorStop(0, this.color.replace('ALPHA', '0.15'));
        gradient.addColorStop(1, this.color.replace('ALPHA', '0'));
        wavesCtx.fillStyle = gradient;
        wavesCtx.fill();
    }
}

// Create waves
const waves = [
    new Wave(wavesCanvas.height * 0.3, 60, 0.8, 0, 'rgba(13, 122, 184, ALPHA)'),
    new Wave(wavesCanvas.height * 0.5, 80, 0.6, Math.PI, 'rgba(124, 179, 66, ALPHA)'),
    new Wave(wavesCanvas.height * 0.7, 50, 1.2, Math.PI / 2, 'rgba(13, 122, 184, ALPHA)')
];

let waveTime = 0;

function animateWaves() {
    wavesCtx.clearRect(0, 0, wavesCanvas.width, wavesCanvas.height);
    
    waves.forEach(wave => wave.draw(waveTime));
    
    waveTime += 1;
    requestAnimationFrame(animateWaves);
}

// Export for main.js
window.startWaves = animateWaves;