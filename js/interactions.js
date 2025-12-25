const buttons = document.querySelectorAll('.link-button');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const rect = this.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Determine color based on button class
        let color = 'rgba(13, 122, 184, 1)';
        if (this.classList.contains('btn-facebook')) color = 'rgba(24, 119, 242, 1)';
        if (this.classList.contains('btn-instagram')) color = 'rgba(240, 148, 51, 1)';
        if (this.classList.contains('btn-whatsapp')) color = 'rgba(37, 211, 102, 1)';
        if (this.classList.contains('btn-app')) color = 'rgba(102, 126, 234, 1)';

        // Create explosion
        window.createExplosion(x, y, color, 120);

        // Button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);

        // Add your link redirection here
        // window.location.href = 'YOUR_LINK_HERE';
    });
});

// Logo Interaction
const mainLogo = document.getElementById('mainLogo');

mainLogo.addEventListener('click', function() {
    const rect = this.getBoundingClientRect();
    window.createExplosion(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        'rgba(124, 179, 66, 1)',
        150
    );
});

// 3D Parallax Effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
    
    document.querySelector('.container').style.transform = 
        `translate(${moveX}px, ${moveY}px)`;
});

