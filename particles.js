/* =========================================================
   PARTÍCULAS FLUTUANTES — particles.js
   ========================================================= */

(function () {

    /* Cria o canvas e insere como primeiro filho da seção #perfil */
    const section = document.getElementById('perfil');
    const canvas  = document.createElement('canvas');

    canvas.id = 'particles-bg';
    canvas.style.cssText = `
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;

    /* A seção precisa de position relative para o canvas se posicionar dentro dela */
    section.style.position = 'relative';

    /* Garante que o conteúdo do perfil fique acima do canvas */
    const container = section.querySelector('.perfil-container');
    if (container) container.style.position = 'relative', container.style.zIndex = '1';

    section.prepend(canvas);

    /* ── Configurações ── */
    const CONFIG = {
        qty      : 40,    // número de partículas
        speed    : 0.28,  // velocidade base (0.4 * 0.7)
        maxDist  : 80,    // distância máxima para desenhar linha entre partículas
        color    : '30, 136, 229',  // RGB do azul #1e88e5
    };

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    /* ── Redimensionamento ── */
    function resize() {
        canvas.width  = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    /* ── Cria uma partícula com posição e velocidade aleatórias ── */
    function makeParticle() {
        return {
            x     : Math.random() * canvas.width,
            y     : Math.random() * canvas.height,
            r     : Math.random() * 3 + 1,
            vx    : (Math.random() - 0.5) * CONFIG.speed,
            vy    : (Math.random() - 0.5) * CONFIG.speed,
            alpha : Math.random() * 0.4 + 0.1,
        };
    }

    function initParticles() {
        particles = Array.from({ length: CONFIG.qty }, makeParticle);
    }

    /* ── Loop de animação ── */
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* Partículas */
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${CONFIG.color}, ${p.alpha})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height)  p.vy *= -1;
        });

        /* Linhas entre partículas próximas */
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONFIG.maxDist) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${CONFIG.color}, ${0.15 * (1 - dist / CONFIG.maxDist)})`;
                    ctx.lineWidth   = 0.7;
                    ctx.stroke();
                }
            }
        }

        animId = requestAnimationFrame(draw);
    }

    /* ── Inicia tudo ── */
    function start() {
        resize();
        initParticles();
        cancelAnimationFrame(animId);
        draw();
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    start();

})();