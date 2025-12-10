// Создание эффекта звездного неба
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 150;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Случайные размеры и позиции
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 3;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// Создание hover-эффекта для карточек
function setupCardEffects() {
    const cards = document.querySelectorAll('.link-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Добавляем эффект "Stand" при наведении
            if (!this.classList.contains('placeholder')) {
                const icon = this.querySelector('.link-icon i, i.fa-question-circle');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
                
                // Эффект звука Stand (имитация)
                const standName = this.getAttribute('data-stand');
                if (standName) {
                    console.log(`Stand activated: ${standName}`);
                }
            }
            
            // Эффект вспышки для карточки
            const flash = document.createElement('div');
            flash.style.position = 'absolute';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.background = 'radial-gradient(circle at center, rgba(240, 219, 79, 0.2), transparent)';
            flash.style.borderRadius = '10px';
            flash.style.pointerEvents = 'none';
            flash.style.animation = 'flashEffect 0.5s ease-out forwards';
            this.appendChild(flash);
            
            // Удаляем элемент после анимации
            setTimeout(() => {
                if (flash.parentNode === this) {
                    this.removeChild(flash);
                }
            }, 500);
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('placeholder')) {
                const icon = this.querySelector('.link-icon i, i.fa-question-circle');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        });
        
        // Добавляем эффект клика
        card.addEventListener('click', function(e) {
            if (this.classList.contains('placeholder')) {
                e.preventDefault();
                // Анимация для плейсхолдеров
                this.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
                
                // Показываем сообщение
                showMessage('Этот раздел еще в разработке!', 'warning');
            } else {
                // Имитация перехода на другую страницу с эффектом
                this.style.transition = 'all 0.3s ease';
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
                
                // В реальном проекте здесь был бы переход по ссылке
                console.log(`Navigating to: ${this.getAttribute('href') || '#'}`);
            }
        });
    });
}

// Анимация счетчиков статистики
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 секунды
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Запускаем анимацию при появлении элемента в viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Переключение темы (темная/светлая)
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('jojo-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('jojo-theme', 'light');
            showMessage('Светлая тема активирована!', 'info');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('jojo-theme', 'dark');
            showMessage('Темная тема активирована!', 'info');
        }
    });
}

// Показ сообщений
function showMessage(text, type = 'info') {
    // Удаляем предыдущие сообщения
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Создаем новое сообщение
    const message = document.createElement('div');
    message.classList.add('message-popup');
    message.textContent = text;
    
    // Стили для сообщения
    message.style.position = 'fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.padding = '15px 25px';
    message.style.borderRadius = '5px';
    message.style.fontFamily = "'Bebas Neue', cursive";
    message.style.fontSize = '1.2rem';
    message.style.letterSpacing = '1px';
    message.style.zIndex = '1000';
    message.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    message.style.animation = 'slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards';
    
    // Цвета в зависимости от типа
    if (type === 'warning') {
        message.style.backgroundColor = '#f0db4f';
        message.style.color = '#0a0a1a';
        message.style.borderLeft = '5px solid #d62828';
    } else {
        message.style.backgroundColor = '#d62828';
        message.style.color = '#f0f0f0';
        message.style.borderLeft = '5px solid #f0db4f';
    }
    
    document.body.appendChild(message);
    
    // Удаляем сообщение через 3 секунды
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

// Добавление CSS анимаций для сообщений
function addMessageStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        @keyframes flashEffect {
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: scale(1.5);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Эффект для заголовка при скролле
function setupScrollEffects() {
    const title = document.querySelector('.jojo-title');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Параллакс эффект для заголовка
        if (title && scrolled < 300) {
            title.style.transform = `translateY(${rate}px)`;
        }
        
        // Эффект появления элементов при скролле
        const cards = document.querySelectorAll('.link-card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
            }
        });
    });
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    setupCardEffects();
    animateCounters();
    setupThemeToggle();
    addMessageStyles();
    setupScrollEffects();
    
    // Добавляем эффект для заголовка
    const title = document.querySelector('.jojo-title');
    setInterval(() => {
        title.style.animation = 'none';
        setTimeout(() => {
            title.style.animation = 'titleGlow 3s infinite';
        }, 10);
    }, 10000);
});