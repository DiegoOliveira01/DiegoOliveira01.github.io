/* =========================================================
   1. FADE-IN AO ROLAR
   Observa todos os elementos com .fade-in e aplica
   .visible quando entram na viewport
   ========================================================= */

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target); // anima só uma vez
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


/* =========================================================
   2. EFEITO DE DIGITAÇÃO NO TÍTULO DO PERFIL
   Digita o texto do h2 da seção #perfil letra por letra
   ========================================================= */

const tituloEl = document.querySelector('.perfil-info h2');

if (tituloEl) {
    const textoOriginal = tituloEl.textContent.trim();
    tituloEl.textContent = '';
    tituloEl.classList.add('typing-cursor');

    let i = 0;
    const velocidade = 40; // ms por letra (menor = mais rápido)

    function digitar() {
        if (i < textoOriginal.length) {
            tituloEl.textContent += textoOriginal.charAt(i);
            i++;
            setTimeout(digitar, velocidade);
        } else {
            // Remove o cursor piscante após terminar
            setTimeout(() => tituloEl.classList.remove('typing-cursor'), 1200);
        }
    }

    // Pequeno delay antes de começar a digitar
    setTimeout(digitar, 400);
}


/* =========================================================
   3. ANIMAÇÃO DOS ITENS DE HABILIDADES
   Cada card de habilidade entra com fade-in (já gerenciado
   pelo fadeObserver acima via .fade-in), e quando o card
   se torna visível, os itens da lista entram um a um
   ========================================================= */

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animado');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.habilidade-card').forEach(card => skillObserver.observe(card));