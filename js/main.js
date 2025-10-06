// Pesquisa Porto Santos - JavaScript Principal

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initSurveyForm();
    initAnimations();
});

// Navegação Mobile
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll suave para âncoras
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = 80; // Altura fixa do header
                const targetPosition = target.offsetTop - headerHeight - 20; // 20px de margem extra
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Formulário de contato
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter dados do formulário
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validação básica
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simular envio (aqui você integraria com um backend real)
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            this.reset();
        });
    }
}

// Formulário de pesquisa
function initSurveyForm() {
    const surveyForm = document.getElementById('survey-form');
    
    if (surveyForm) {
        // Limitar escolhas em perguntas específicas
        initLimitedChoices();
        
        // Habilitar/desabilitar campos "outro"
        initOtherFields();
        
        // Submissão do formulário
        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateSurvey()) {
                submitSurvey();
            }
        });
    }
}

// Limitar número de escolhas
function initLimitedChoices() {
    const limitedGroups = document.querySelectorAll('.limited-choices');
    
    limitedGroups.forEach(group => {
        const maxChoices = parseInt(group.dataset.max);
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
                
                if (checkedBoxes.length > maxChoices) {
                    this.checked = false;
                    showNotification(`Você pode escolher no máximo ${maxChoices} opções.`, 'error');
                }
            });
        });
    });
}

// Gerenciar campos "outro"
function initOtherFields() {
    const otherCheckboxes = document.querySelectorAll('input[type="checkbox"][id$="-outro"], input[type="radio"][id$="-outro"]');
    
    otherCheckboxes.forEach(checkbox => {
        const otherInput = checkbox.closest('.other-option').querySelector('.other-input');
        
        checkbox.addEventListener('change', function() {
            otherInput.disabled = !this.checked;
            if (!this.checked) {
                otherInput.value = '';
            }
        });
    });
}

// Navegação entre seções do formulário
function showNextSection(sectionId) {
    const currentSection = document.querySelector('.form-section:not([style*="display: none"])');
    const nextSection = document.getElementById(sectionId);
    const currentNav = document.querySelector('.form-navigation:not([style*="display: none"])');
    const nextNav = document.getElementById('nav-' + sectionId);
    
    if (currentSection && nextSection) {
        // Validar seção atual antes de avançar
        if (validateCurrentSection(currentSection)) {
            currentSection.style.display = 'none';
            nextSection.style.display = 'block';
            
            if (currentNav) currentNav.style.display = 'none';
            if (nextNav) nextNav.style.display = 'flex';
            
            // Scroll suave para a nova seção
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function showPreviousSection(sectionId) {
    const currentSection = document.querySelector('.form-section:not([style*="display: none"])');
    const prevSection = document.getElementById(sectionId);
    const currentNav = document.querySelector('.form-navigation:not([style*="display: none"])');
    const prevNav = document.querySelector('.form-navigation:not([style*="display: none"])').previousElementSibling;
    
    if (currentSection && prevSection) {
        currentSection.style.display = 'none';
        prevSection.style.display = 'block';
        
        if (currentNav) currentNav.style.display = 'none';
        if (prevNav) prevNav.style.display = 'flex';
        
        // Scroll suave para a seção anterior
        prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Validar seção atual
function validateCurrentSection(section) {
    const requiredFields = section.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });
    
    // Validar campos específicos
    const checkboxes = section.querySelectorAll('input[type="checkbox"]:not([name*="nao_consegue"]):not([name*="nao_interessa"]):not([name*="nenhuma"])');
    const hasCheckedBoxes = Array.from(checkboxes).some(cb => cb.checked);
    
    if (checkboxes.length > 0 && !hasCheckedBoxes) {
        showNotification('Por favor, selecione pelo menos uma opção.', 'error');
        isValid = false;
    }
    
    if (!isValid) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
    }
    
    return isValid;
}

// Validar formulário completo
function validateSurvey() {
    const sections = document.querySelectorAll('.form-section');
    let isValid = true;
    
    sections.forEach(section => {
        if (!validateCurrentSection(section)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Submeter pesquisa
function submitSurvey() {
    const form = document.getElementById('survey-form');
    const formData = new FormData(form);
    const surveyData = {};
    
    // Coletar dados do formulário
    for (let [key, value] of formData.entries()) {
        if (surveyData[key]) {
            if (Array.isArray(surveyData[key])) {
                surveyData[key].push(value);
            } else {
                surveyData[key] = [surveyData[key], value];
            }
        } else {
            surveyData[key] = value;
        }
    }
    
    // Simular envio (aqui você integraria com um backend real)
    showNotification('Pesquisa enviada com sucesso! Obrigado por sua participação! 🎉', 'success');
    
    // Aqui você enviaria os dados para o servidor
    console.log('Dados da pesquisa:', surveyData);
    
    // Redirecionar para página de agradecimento ou mostrar resultados
    setTimeout(() => {
        showThankYouPage();
    }, 2000);
}

// Mostrar página de agradecimento
function showThankYouPage() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="hero" style="min-height: 100vh; display: flex; align-items: center;">
            <div class="container" style="text-align: center;">
                <div class="hero-content">
                    <h1 class="hero-title" style="color: #667eea; margin-bottom: 2rem;">🎉 Obrigado pela sua participação!</h1>
                    <p class="hero-subtitle" style="color: #333; font-size: 1.3rem; margin-bottom: 2rem;">
                        Suas respostas são muito importantes para nós!<br>
                        Elas nos ajudarão a criar programas educacionais ainda melhores.
                    </p>
                    <div class="hero-buttons">
                        <button class="btn btn-primary" onclick="location.reload()">Fazer Nova Pesquisa</button>
                        <a href="#about" class="btn btn-secondary">Saber Mais</a>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funções globais para navegação
window.showNextSection = showNextSection;
window.showPreviousSection = showPreviousSection;

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Fechar notificação
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto-remover após 5 segundos
    setTimeout(function() {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(function() {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Animações e efeitos
function initAnimations() {
    // Animação de entrada dos cards de features
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
    
    // Observar elementos
    document.querySelectorAll('.feature-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Efeito parallax simples no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Contador animado nas estatísticas
    animateCounters();
}

// Animação dos contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/\d/g, '');
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 16);
                
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Utilitários globais
window.IBISocial = {
    showNotification: showNotification,
    isValidEmail: isValidEmail
};

// CSS para animações (adicionado dinamicamente)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);
