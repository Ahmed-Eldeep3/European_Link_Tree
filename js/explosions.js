     const expCanvas = document.getElementById('explosionCanvas');
        const expCtx = expCanvas.getContext('2d');
        expCanvas.width = window.innerWidth;
        expCanvas.height = window.innerHeight;

        class ExplosionParticle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 8 + 4;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.size = Math.random() * 6 + 3;
                this.color = color;
                this.life = 1;
                this.decay = Math.random() * 0.015 + 0.01;
                this.gravity = 0.2;
            }

            update() {
                this.vx *= 0.98;
                this.vy += this.gravity;
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                this.size *= 0.96;
            }

            draw() {
                expCtx.save();
                expCtx.globalAlpha = this.life;
                expCtx.beginPath();
                expCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                
                const gradient = expCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'transparent');
                expCtx.fillStyle = gradient;
                expCtx.fill();
                
                expCtx.shadowBlur = 20;
                expCtx.shadowColor = this.color;
                expCtx.restore();
            }
        }

        const explosionParticles = [];

        function createExplosion(x, y, color, count = 80) {
            for (let i = 0; i < count; i++) {
                explosionParticles.push(new ExplosionParticle(x, y, color));
            }
        }

        function animateExplosions() {
            expCtx.clearRect(0, 0, expCanvas.width, expCanvas.height);

            for (let i = explosionParticles.length - 1; i >= 0; i--) {
                explosionParticles[i].update();
                explosionParticles[i].draw();

                if (explosionParticles[i].life <= 0) {
                    explosionParticles.splice(i, 1);
                }
            }

            requestAnimationFrame(animateExplosions);
        }