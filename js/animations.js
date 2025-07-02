// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });
});

// Add smooth reveal animations for elements
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function reveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 150) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
});

// Product image zoom effect
document.addEventListener('DOMContentLoaded', function() {
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(container => {
        const img = container.querySelector('img');
        
        if (img) {
            container.addEventListener('mousemove', function(e) {
                const bounds = container.getBoundingClientRect();
                const x = (e.clientX - bounds.left) / bounds.width;
                const y = (e.clientY - bounds.top) / bounds.height;
                
                img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            });
            
            container.addEventListener('mouseenter', function() {
                img.style.transform = 'scale(1.5)';
            });
            
            container.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1)';
                img.style.transformOrigin = 'center center';
            });
        }
    });
});

// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form validation animations
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    });
});

// Password visibility toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
});

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial check
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
});
