
function handleResize() {
    const constCanvas = document.getElementById('constellationCanvas');
    const wavesCanvas = document.getElementById('wavesCanvas');
    const expCanvas = document.getElementById('explosionCanvas');
    
    constCanvas.width = window.innerWidth;
    constCanvas.height = window.innerHeight;
    wavesCanvas.width = window.innerWidth;
    wavesCanvas.height = window.innerHeight;
    expCanvas.width = window.innerWidth;
    expCanvas.height = window.innerHeight;
}

window.addEventListener('resize', handleResize);

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1800);
});

// Start all animations
window.startConstellation();
window.startWaves();
window.startExplosions();

// Console Branding
console.log(
    '%c🏥 EUROPEAN CLINIC ', 
    'color: #0d7ab8; font-size: 28px; font-weight: bold; text-shadow: 0 0 10px #0d7ab8;'
);
console.log(
    '%c💪 Excellence in Physical Therapy & Sports Rehabilitation', 
    'color: #7cb342; font-size: 16px; font-weight: bold;'
);
console.log(
    '%c🚀 Powered by Advanced Canvas & JavaScript', 
    'color: #fff; font-size: 12px;'
);