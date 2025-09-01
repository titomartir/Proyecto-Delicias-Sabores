// script.js - JavaScript para navegación y funcionalidades del sitio

// Función para mostrar páginas específicas
function showPage(pageId) {
    // Ocultar todas las páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });
    
    // Mostrar la página seleccionada
    document.getElementById(pageId).classList.add('active-page');
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Marcar el enlace activo
    const activeLink = document.querySelector(`[href="#${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Event listeners para navegación
document.addEventListener('DOMContentLoaded', function() {
    // Navegación del menú
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });

    // Animación suave al cargar la página
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Funcionalidad del formulario de contacto
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Validación básica
            if (!name || !email || !message) {
                alert('Por favor, complete todos los campos obligatorios.');
                return;
            }
            
            // Simulación de envío exitoso
            alert('¡Gracias por contactarnos! Te responderemos pronto.');
            contactForm.reset();
        });
    }

    // Efecto parallax suave en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.product-card, .contact-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Función para smooth scroll hacia secciones específicas
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Funcionalidad adicional para mejorar la experiencia de usuario
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de escritura para el título principal
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                mainTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar el efecto después de un breve retraso
        setTimeout(typeWriter, 1000);
    }

    // Contador animado para precios (opcional)
    function animateNumbers() {
        const priceElements = document.querySelectorAll('.product-price');
        priceElements.forEach(priceEl => {
            const finalPrice = parseFloat(priceEl.textContent.replace('Q', ''));
            let currentPrice = 0;
            const increment = finalPrice / 50;
            
            const counter = setInterval(() => {
                currentPrice += increment;
                if (currentPrice >= finalPrice) {
                    currentPrice = finalPrice;
                    clearInterval(counter);
                }
                priceEl.textContent = `Q${currentPrice.toFixed(2)}`;
            }, 30);
        });
    }

    // Ejecutar animación de precios cuando sea visible
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                priceObserver.unobserve(entry.target);
            }
        });
    });

    const productsSection = document.getElementById('productos');
    if (productsSection) {
        priceObserver.observe(productsSection);
    }
});

// Funciones de utilidad
const Utils = {
    // Validar email
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Formatear teléfono
    formatPhone: function(phone) {
        return phone.replace(/\D/g, '').replace(/(\d{4})(\d{4})/, '$1-$2');
    },

    // Mostrar notificación
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// Exportar funciones si se usa como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showPage, smoothScrollTo, Utils };
}