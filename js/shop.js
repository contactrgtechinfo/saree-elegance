// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateCartCount();
        this.calculateTotal();
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.calculateTotal();
        return true;
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.calculateTotal();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId);
            }
        }
        this.saveCart();
        this.calculateTotal();
    }

    // Calculate total price
    calculateTotal() {
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        this.updateTotalDisplay();
    }

    // Update cart count in UI
    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // Update total price display
    updateTotalDisplay() {
        const totalElement = document.querySelector('.cart-total');
        if (totalElement) {
            totalElement.textContent = `₹${this.total.toLocaleString()}`;
        }
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
        this.calculateTotal();
    }
}

// Product Filtering and Sorting
class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilters = {
            category: 'all',
            priceRange: 'all',
            sortBy: 'featured'
        };
    }

    // Initialize products
    async initializeProducts() {
        try {
            // In a real application, this would be an API call
            this.products = await this.fetchProducts();
            this.filteredProducts = [...this.products];
            this.renderProducts();
        } catch (error) {
            console.error('Error initializing products:', error);
        }
    }

    // Mock fetch products (replace with actual API call)
    async fetchProducts() {
        return [
            {
                id: 1,
                name: 'Royal Silk Saree',
                price: 12999,
                category: 'silk',
                image: 'images/products/featured-1.jpg',
                description: 'Elegant silk saree with intricate zari work'
            },
            {
                id: 2,
                name: 'Banarasi Wonder',
                price: 15999,
                category: 'banarasi',
                image: 'images/products/featured-2.jpg',
                description: 'Traditional Banarasi silk saree with golden border'
            },
            {
                id: 3,
                name: 'Designer Collection',
                price: 18999,
                category: 'party',
                image: 'images/products/featured-3.jpg',
                description: 'Contemporary designer saree for special occasions'
            }
            // Add more products as needed
        ];
    }

    // Apply filters and sorting
    applyFilters() {
        let filtered = [...this.products];

        // Category filter
        if (this.currentFilters.category !== 'all') {
            filtered = filtered.filter(product => 
                product.category === this.currentFilters.category
            );
        }

        // Price range filter
        if (this.currentFilters.priceRange !== 'all') {
            const [min, max] = this.currentFilters.priceRange.split('-').map(Number);
            filtered = filtered.filter(product => 
                product.price >= min && (max ? product.price <= max : true)
            );
        }

        // Sorting
        switch (this.currentFilters.sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // 'featured' - maintain default order
                break;
        }

        this.filteredProducts = filtered;
        this.renderProducts();
    }

    // Render products to DOM
    renderProducts() {
        const productsContainer = document.querySelector('.products-grid');
        if (!productsContainer) return;

        productsContainer.innerHTML = '';

        this.filteredProducts.forEach(product => {
            const productElement = this.createProductElement(product);
            productsContainer.appendChild(productElement);
        });

        // Initialize AOS for new elements
        AOS.refresh();
    }

    // Create product element
    createProductElement(product) {
        const div = document.createElement('div');
        div.className = 'col-md-4 mb-4';
        div.setAttribute('data-aos', 'fade-up');
        
        div.innerHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    <div class="product-overlay">
                        <button class="btn btn-outline-light add-to-cart" data-product-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price.toLocaleString()}</p>
                    <p class="description">${product.description}</p>
                </div>
            </div>
        `;

        return div;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const cart = new ShoppingCart();
    const productManager = new ProductManager();

    // Initialize products
    productManager.initializeProducts();

    // Filter handlers
    const filterForms = document.querySelectorAll('.filter-form');
    filterForms.forEach(form => {
        form.addEventListener('change', function(e) {
            const { name, value } = e.target;
            productManager.currentFilters[name] = value;
            productManager.applyFilters();
        });
    });

    // Add to cart handler
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.productId);
            const product = productManager.products.find(p => p.id === productId);
            
            if (product) {
                cart.addItem(product);
                showNotification('Product added to cart!', 'success');
            }
        }
    });

    // Quantity update handler
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const productId = parseInt(this.dataset.productId);
            cart.updateQuantity(productId, this.value);
        });
    });

    // Remove item handler
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            cart.removeItem(productId);
            showNotification('Item removed from cart', 'info');
        });
    });
});

// Utility function for notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
