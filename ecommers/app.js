 // Products data
        const products = [
            {
                id: 1,
                title: "Wireless Bluetooth Headphones",
                price: 399,
                category: "electronics",
                rating: 4,
                image: "https://placehold.co/300x300",
                alt: "Black wireless over-ear headphones with metal accents on a white background",
                featured: true
            },
            {
                id: 2,
                title: "Smartphone 128GB",
                price: 699.99,
                category: "electronics",
                rating: 5,
                image: "https://placehold.co/300x300",
                alt: "Latest model smartphone with edge-to-edge display in midnight blue color",
                featured: true
            },
            {
                id: 3,
                title: "Men's Casual T-Shirt",
                price: 24.99,
                category: "clothing",
                rating: 4,
                image: "https://placehold.co/300x300",
                alt: "Plain white cotton t-shirt on a hanger against a gray background",
                featured: false
            },
            {
                id: 4,
                title: "Women's Running Shoes",
                price: 79.95,
                category: "clothing",
                rating: 5,
                image: "https://placehold.co/300x300",
                alt: "Pink and white women's running shoes with breathable mesh and rubber sole",
                featured: true
            },
            {
                id: 5,
                title: "Coffee Maker",
                price: 49.99,
                category: "home",
                rating: 4,
                image: "https://placehold.co/300x300",
                alt: "Stainless steel drip coffee maker with glass carafe and warming plate",
                featured: false
            },
            {
                id: 6,
                title: "Organic Shampoo",
                price: 14.99,
                category: "beauty",
                rating: 4,
                image: "https://placehold.co/300x300",
                alt: "Clear glass bottle of organic shampoo with natural ingredients shown on label",
                featured: false
            },
            {
                id: 7,
                title: "Fitness Tracker",
                price: 59.99,
                category: "electronics",
                rating: 4,
                image: "https://placehold.co/300x300",
                alt: "Black fitness tracker with OLED screen and silicone band on wrist",
                featured: false
            },
            {
                id: 8,
                title: "Throw Blanket",
                price: 34.99,
                category: "home",
                rating: 5,
                image: "https://placehold.co/300x300",
                alt: "Soft knitted gray throw blanket folded neatly on a wooden chair",
                featured: true
            }
        ];

        // DOM elements
        const cartBtn = document.getElementById('cart-btn');
        const closeCart = document.getElementById('close-cart');
        const cartModal = document.getElementById('cart-modal');
        const productsGrid = document.getElementById('products-grid');
        const featuredGrid = document.getElementById('featured-products');
        const cartItemsEl = document.getElementById('cart-items');
        const cartTotalEl = document.getElementById('cart-total-price');
        const cartCount = document.querySelector('.cart-count');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const checkoutBtn = document.getElementById('checkout-btn');
        const checkoutModal = document.getElementById('checkout-modal');
        const closeCheckout = document.getElementById('close-checkout');
        const checkoutForm = document.getElementById('checkout-form');
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const loginModal = document.getElementById('login-modal');
        const signupModal = document.getElementById('signup-modal');
        const closeLogin = document.getElementById('close-login');
        const closeSignup = document.getElementById('close-signup');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const showLogin = document.getElementById('show-login');
        const showSignup = document.getElementById('show-signup');
        const confirmationModal = document.getElementById('confirmation-modal');
        const closeConfirmation = document.getElementById('close-confirmation');
        const continueShopping = document.getElementById('continue-shopping');

        // Initialize cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let isLoggedIn = false;

        // Load products
        function loadProducts() {
            productsGrid.innerHTML = '';
            featuredGrid.innerHTML = '';
            
            products.forEach(product => {
                const productEl = document.createElement('div');
                productEl.classList.add('product-card');
                productEl.dataset.category = product.category;
                
                productEl.innerHTML = `
                    <img src="${product.image}" class="product-image" alt="${product.alt}">
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-rating">
                            <span class="stars">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</span>
                        </div>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                
                productsGrid.appendChild(productEl);
                
                if (product.featured) {
                    const featuredEl = productEl.cloneNode(true);
                    featuredGrid.appendChild(featuredEl);
                }
            });
            
            // Add event listeners to the new buttons
            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', addToCart);
            });
        }

        // Filter products
        function filterProducts(category) {
            const allProducts = document.querySelectorAll('.product-card');
            
            allProducts.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }

        // Add to cart
        function addToCart(e) {
            const id = parseInt(e.target.dataset.id);
            const product = products.find(item => item.id === id);
            
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    alt: product.alt,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Show brief confirmation
            const confirmation = document.createElement('div');
            confirmation.textContent = `${product.title} added to cart!`;
            confirmation.style.position = 'fixed';
            confirmation.style.bottom = '20px';
            confirmation.style.right = '20px';
            confirmation.style.backgroundColor = 'var(--primary-color)';
            confirmation.style.color = 'white';
            confirmation.style.padding = '10px 20px';
            confirmation.style.borderRadius = '4px';
            confirmation.style.zIndex = '1000';
            document.body.appendChild(confirmation);
            
            setTimeout(() => {
                confirmation.remove();
            }, 2000);
        }

        // Update cart
        function updateCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }

        // Update cart UI
        function updateCartUI() {
            cartItemsEl.innerHTML = '';
            
            let total = 0;
            
            cart.forEach(item => {
                const cartItemEl = document.createElement('div');
                cartItemEl.classList.add('cart-item');
                
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.alt}">
                    <div class="cart-item-info">
                        <p class="cart-item-title">${item.title}</p>
                        <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div>
                        <button class="cart-item-quantity" data-id="${item.id}" data-action="decrease">-</button>
                        <span style="margin: 0 10px;">${item.quantity}</span>
                        <button class="cart-item-quantity" data-id="${item.id}" data-action="increase">+</button>
                        <span class="cart-item-remove" data-id="${item.id}">✕</span>
                    </div>
                `;
                
                cartItemsEl.appendChild(cartItemEl);
                total += item.price * item.quantity;
            });
            
            cartTotalEl.textContent = `$${total.toFixed(2)}`;
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            // Add event listeners to the new quantity buttons
            document.querySelectorAll('.cart-item-quantity').forEach(btn => {
                btn.addEventListener('click', updateCartItem);
            });
            
            document.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', removeCartItem);
            });
        }

        // Update cart item quantity
        function updateCartItem(e) {
            const id = parseInt(e.target.dataset.id);
            const action = e.target.dataset.action;
            
            const item = cart.find(item => item.id === id);
            
            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity -= 1;
            }
            
            updateCart();
        }

        // Remove cart item
        function removeCartItem(e) {
            const id = parseInt(e.target.dataset.id);
            
            cart = cart.filter(item => item.id !== id);
            
            updateCart();
        }

        // Login user
        function loginUser(email, password) {
            // In a real app, this would be an API call
            isLoggedIn = true;
            loginModal.classList.remove('active');
            
            // Update UI for logged in state
            document.querySelector('.auth-buttons').innerHTML = `
                <button id="logout-btn" class="btn">Logout</button>
            `;
            document.getElementById('logout-btn').addEventListener('click', logoutUser);
        }

        // Logout user
        function logoutUser() {
            isLoggedIn = false;
            
            // Update UI for logged out state
            document.querySelector('.auth-buttons').innerHTML = `
                <button id="login-btn" class="btn">Login</button>
                <button id="signup-btn" class="btn">Sign Up</button>
            `;
            
            // Re-add event listeners
            document.getElementById('login-btn').addEventListener('click', () => {
                loginModal.classList.add('active');
            });
            
            document.getElementById('signup-btn').addEventListener('click', () => {
                signupModal.classList.add('active');
            });
        }

        // Event listeners
        cartBtn.addEventListener('click', () => {
            cartModal.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterProducts(btn.dataset.category);
            });
        });

        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            if (!isLoggedIn) {
                alert('Please login to proceed to checkout');
                loginModal.classList.add('active');
                return;
            }
            
            cartModal.classList.remove('active');
            checkoutModal.classList.add('active');
        });

        closeCheckout.addEventListener('click', () => {
            checkoutModal.classList.remove('active');
        });

        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real app, this would process the payment
            checkoutModal.classList.remove('active');
            confirmationModal.classList.add('active');
            
            // Clear cart
            cart = [];
            updateCart();
        });

        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });

        signupBtn.addEventListener('click', () => {
            signupModal.classList.add('active');
        });

        closeLogin.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });

        closeSignup.addEventListener('click', () => {
            signupModal.classList.remove('active');
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simple validation
            if (email && password) {
                loginUser(email, password);
            } else {
                alert('Please enter both email and password');
            }
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            
            // Simple validation
            if (!name || !email || !password || !confirm) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirm) {
                alert('Passwords do not match');
                return;
            }
            
            // In a real app, this would create the account
            signupModal.classList.remove('active');
            loginUser(email, password);
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.classList.remove('active');
            loginModal.classList.add('active');
        });

        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('active');
            signupModal.classList.add('active');
        });

        closeConfirmation.addEventListener('click', () => {
            confirmationModal.classList.remove('active');
        });

        continueShopping.addEventListener('click', () => {
            confirmationModal.classList.remove('active');
        });

        // Close modals when clicking outside
        [cartModal, loginModal, signupModal, checkoutModal, confirmationModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Initialize the app
        loadProducts();
        filterProducts('all');
        updateCartUI();