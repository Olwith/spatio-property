// Animation Controller
class AnimationController {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        // Initialize IntersectionObserver for scroll animations
        this.initScrollAnimations();
        this.initNavbarScroll();
        this.initStaggerAnimations();
    }

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animate-on-scroll elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    initStaggerAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.stagger-animate').forEach(el => {
            observer.observe(el);
        });
    }

    initNavbarScroll() {
        let ticking = false;
        
        const updateNavbar = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateNavbar();
                });
                ticking = true;
            }
        });
    }

    // Smooth scroll to element
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    // Fade in element
    fadeIn(element, duration = 600) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            element.style.opacity = opacity;
            
            if (progress < duration) {
                window.requestAnimationFrame(animate);
            }
        };
        window.requestAnimationFrame(animate);
    }
}

// Form Validator
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        const re = /^[\+]?[0-9\s\-\(\)]+$/;
        return re.test(phone);
    }

    static validateRequired(fields) {
        return fields.every(field => field.trim() !== '');
    }
}

// Data Formatter
class DataFormatter {
    static formatPrice(price) {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    }

    static formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    static formatArea(area) {
        return `${parseFloat(area).toLocaleString()} sq ft`;
    }
}

// Local Storage Manager
class StorageManager {
    static set(key, value) {
        try {
            localStorage.setItem(`spatio_${key}`, JSON.stringify(value));
        } catch (e) {
            console.error('LocalStorage error:', e);
        }
    }

    static get(key) {
        try {
            const item = localStorage.getItem(`spatio_${key}`);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('LocalStorage error:', e);
            return null;
        }
    }

    static remove(key) {
        localStorage.removeItem(`spatio_${key}`);
    }
}

// Export utilities
export { 
    AnimationController, 
    FormValidator, 
    DataFormatter, 
    StorageManager 
};
