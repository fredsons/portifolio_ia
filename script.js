// ========== CONTROLE DE TEMA ========== //
const themeToggle = document.getElementById('theme-toggle');

// Alterna entre temas dark/light e salva preferência
function toggleTheme() {
    document.documentElement.classList.toggle('dark'); // Alterna classe no HTML
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Salva no localStorage
    updateThemeIcon(); // Atualiza ícone
    updateParticlesTheme(); // Atualiza partículas
}

// Atualiza o ícone do tema conforme o modo atual
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if(document.documentElement.classList.contains('dark')) {
        icon.classList.replace('fa-sun', 'fa-moon'); // Troca sol por lua
    } else {
        icon.classList.replace('fa-moon', 'fa-sun'); // Troca lua por sol
    }
}

// ========== MENU MOBILE ========== //
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Alterna visibilidade do menu mobile e ícone
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden'); // Mostra/esconde menu
    menuBtn.querySelector('i').classList.toggle('fa-bars'); // Alterna ícone
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// ========== SCROLL SUAVE ========== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Previne comportamento padrão
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ 
            behavior: 'smooth', // Animação suave
            block: 'start' // Alinha ao topo do viewport
        });
    });
});

// ========== ANIMAÇÃO AO SCROLL ========== //
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // Quando elemento entra na viewport
            entry.target.classList.add('animate-fadeInUp'); // Aciona animação
        }
    });
}, { threshold: 0.1 }); // Dispara quando 10% do elemento está visível

// Observa todos os cards de skills e projetos
document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    observer.observe(el);
});

// ========== PARTICLES.JS ========== //
function initParticles() {
    particlesJS('particles-js', { // Container ID
        particles: {
            number: { value: 80 }, // Quantidade de partículas
            color: { value: document.documentElement.classList.contains('dark') ? '#818cf8' : '#4f46e5' }, // Cor dinâmica
            shape: { type: "circle" }, // Forma das partículas
            opacity: { value: 0.5 }, // Transparência
            size: { value: 3 }, // Tamanho
            move: { // Movimento
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: { // Interações
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" }, // Repulsão ao passar mouse
                onclick: { enable: true, mode: "push" }, // Empurra ao clicar
                resize: true // Redimensiona com a tela
            }
        },
        retina_detect: true // Detecção de retina
    });
}

// ========== INICIALIZAÇÃO ========== //
window.onload = function() {
    initParticles(); // Inicia partículas
    
    // Ajustes para mobile
    if(window.innerWidth < 768) {
        document.querySelector('video').playbackRate = 0.5; // Reduz velocidade do vídeo
    }

    // Verifica tema salvo
    if(localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.remove('dark');
    }
    updateThemeIcon(); // Atualiza ícone inicial

    // Tooltips dinâmicos para tecnologias
    document.querySelectorAll('.tech-icon').forEach(icon => {
        // Extrai nome da tecnologia da classe do ícone
        const techName = icon.querySelector('i').className.match(/fa-(react|js|node|python|aws|docker)/)[1];
        // Cria tooltip com nome capitalizado
        icon.setAttribute('data-tooltip', techName.charAt(0).toUpperCase() + techName.slice(1));
    });
}

// ========== FORMULÁRIO ========== //
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); // Previne envio padrão
    
    // Simulação de envio com feedback visual
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500 text-white rounded-full animate-fadeInUp';
    toast.textContent = 'Mensagem enviada com sucesso! 🚀';
    
    document.body.appendChild(toast); // Exibe toast
    
    setTimeout(() => {
        toast.remove(); // Remove toast após 3s
    }, 3000);
});