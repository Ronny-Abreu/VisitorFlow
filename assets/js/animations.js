/**
   Animaciones y efectos
   Ronny Abreu
 */

class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    // Efecto typewriter para el mensaje de despedida
    typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Animación de entrada para las cards
    animateCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Efecto de partículas en el fondo
    createParticles(container) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(65, 155, 252, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            container.appendChild(particle);
        }
    }

    // Configurar animaciones de scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    setupHoverEffects() {
        // Efecto ripple en botones
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn')) {
                this.createRipple(e);
            }
        });
    }

    createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Mostrar mensaje de despedida con efecto typewriter
    showGoodbyeMessage(callback) {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50';
        overlay.innerHTML = `
            <div class="text-center">
                <h1 id="goodbyeText" class="text-4xl md:text-6xl font-bold text-white mb-8 typewriter"></h1>
                <button id="restartBtn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 opacity-0">
                    <i class="fas fa-home mr-2"></i>Iniciar
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Efecto typewriter
        const textElement = document.getElementById('goodbyeText');
        this.typeWriter(textElement, '¡HASTA LUEGO, VUELVE PRONTO!', 150);

        setTimeout(() => {
            const btn = document.getElementById('restartBtn');
            btn.style.transition = 'opacity 0.5s ease';
            btn.style.opacity = '1';
            
            btn.addEventListener('click', () => {
                overlay.remove();
                if (callback) callback();
            });
        }, 4000);
    }
}

// CSS adicional para animaciones
const animationStyles = `
    <style>
        .animate-fade-in {
            animation: fadeIn 0.8s ease forwards;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .particle {
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
                opacity: 0.7;
            }
            50% {
                transform: translateY(-20px);
                opacity: 1;
            }
        }

        .floating-element {
            animation: gentle-float 6s ease-in-out infinite;
        }

        @keyframes gentle-float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            33% {
                transform: translateY(-10px) rotate(1deg);
            }
            66% {
                transform: translateY(5px) rotate(-1deg);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', animationStyles);

const animationManager = new AnimationManager();