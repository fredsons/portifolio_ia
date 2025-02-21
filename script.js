// Controle de Tema
const themeToggle = document.getElementById('theme-toggle');

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
    updateParticlesTheme();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if(document.documentElement.classList.contains('dark')) {
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Menu Mobile
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Animação ao Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Particles.js
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: document.documentElement.classList.contains('dark') ? '#818cf8' : '#4f46e5' },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Inicialização
window.onload = function() {
    initParticles();
    
    // Ajustes para mobile
    if(window.innerWidth < 768) {
        document.querySelector('video').playbackRate = 0.5;
    }

    // Verificar tema salvo
    if(localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.remove('dark');
    }
    updateThemeIcon();

    // Tooltips dinâmicos
    document.querySelectorAll('.tech-icon').forEach(icon => {
        const techName = icon.querySelector('i').className.match(/fa-(react|js|node|python|aws|docker)/)[1];
        icon.setAttribute('data-tooltip', techName.charAt(0).toUpperCase() + techName.slice(1));
    });
}

// Submit do Formulário
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simular envio
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500 text-white rounded-full animate-fadeInUp';
    toast.textContent = 'Mensagem enviada com sucesso! 🚀';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
});