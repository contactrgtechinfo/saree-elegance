// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            }
        });
    }

    // Cart Counter Update
    function updateCartCount(count) {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
        }
    }

    // Notification System
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Smooth Scroll for Anchor Links
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

    // Image Lazy Loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Product Image Zoom Effect
    const productImages = document.querySelectorAll('.product-image img');
    productImages.forEach(img => {
        img.addEventListener('mousemove', function(e) {
            const bounds = this.getBoundingClientRect();
            const x = (e.clientX - bounds.left) / bounds.width;
            const y = (e.clientY - bounds.top) / bounds.height;
            
            this.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        });

        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (mobileMenuToggle && navbarCollapse) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarCollapse.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }

    // Add to Cart Animation
    function addToCartAnimation(button) {
        button.classList.add('adding');
        setTimeout(() => {
            button.classList.remove('adding');
            button.classList.add('added');
            setTimeout(() => {
                button.classList.remove('added');
            }, 2000);
        }, 1000);
    }

    // Initialize Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCartAnimation(this);
            // Update cart count (example)
            const currentCount = parseInt(document.querySelector('.cart-count').textContent);
            updateCartCount(currentCount + 1);
            showNotification('Product added to cart!');
        });
    });

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Dropdown Hover Effect (Desktop only)
    const dropdowns = document.querySelectorAll('.dropdown');
    if (window.innerWidth > 992) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                this.querySelector('.dropdown-menu').classList.add('show');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.querySelector('.dropdown-menu').classList.remove('show');
            });
        });
    }
});

// Page Load Animation
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
});

// Handle Browser Back/Forward Cache
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
