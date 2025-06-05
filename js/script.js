document.addEventListener('DOMContentLoaded', function() {
    let toastTimeout; 

    function showToast(message, type = 'info', duration = 3000) {
        const toastElement = document.getElementById('custom-toast');
        const toastTextElement = document.getElementById('toast-text');

        if (!toastElement || !toastTextElement) {
            console.warn("Toast elements not found. Falling back to alert.");
            alert(message); 
            return;
        }

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toastTextElement.textContent = message;
        toastElement.className = 'toast-message'; 
        toastElement.classList.add(type);    
        toastElement.classList.add('show');  

        toastTimeout = setTimeout(() => {
            toastElement.classList.remove('show');
        }, duration);
    }

    const modalOverlay = document.getElementById('custom-modal-overlay');
    const modalTitleElement = document.getElementById('modal-title'); 
    const modalMessageElement = document.getElementById('modal-message');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const modalCloseBtnX = document.getElementById('modal-close-btn-x'); 
    let currentConfirmCallback = null; 

    function openConfirmationModal(title, message, onConfirm) {
        if (!modalOverlay || !modalMessageElement || !modalTitleElement) {
            console.warn("Modal elements not found. Falling back to confirm().");
            if (confirm(message)) { 
                if (typeof onConfirm === 'function') onConfirm();
            }
            return;
        }
        modalTitleElement.textContent = title;
        modalMessageElement.textContent = message;
        currentConfirmCallback = onConfirm;
        modalOverlay.classList.add('show');
    }

    function closeConfirmationModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('show');
        }
        currentConfirmCallback = null; 
    }

    if (modalConfirmBtn) {
        modalConfirmBtn.addEventListener('click', () => {
            if (typeof currentConfirmCallback === 'function') {
                currentConfirmCallback();
            }
            closeConfirmationModal();
        });
    }

    if (modalCancelBtn) {
        modalCancelBtn.addEventListener('click', closeConfirmationModal);
    }
    
    if (modalCloseBtnX) {
        modalCloseBtnX.addEventListener('click', closeConfirmationModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) { 
                closeConfirmationModal();
            }
        });
    }

    try {
        const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.main-nav-links .nav-links-left a');
        const cartButtonNav = document.querySelector('.main-nav-links .nav-actions-right a.cart-btn');
        const contactButtonNav = document.querySelector('.main-nav-links .nav-actions-right a.contact-btn');

        navLinks.forEach(link => link.classList.remove('active'));
        if (cartButtonNav) cartButtonNav.classList.remove('active');
        if (contactButtonNav) contactButtonNav.classList.remove('active');
        let activeFound = false;
        if (cartButtonNav && (cartButtonNav.getAttribute('href').split('/').pop() || 'index.html') === currentLocation) {
            cartButtonNav.classList.add('active');
            activeFound = true;
        } else if (contactButtonNav && (contactButtonNav.getAttribute('href').split('/').pop() || 'index.html') === currentLocation) {
            contactButtonNav.classList.add('active');
            activeFound = true;
        }
        if (!activeFound) {
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
                if (linkPage === currentLocation) {
                    link.classList.add('active');
                    activeFound = true;
                }
            });
        }
        if (!activeFound && currentLocation === 'index.html') {
            const homeLink = document.querySelector('.main-nav-links .nav-links-left a[href="index.html"]');
            if (homeLink) homeLink.classList.add('active');
        }
    } catch (e) { console.error("Error in active nav link highlighting:", e); }

    try {
        const scrollToTopButton = document.querySelector('.scroll-to-top');
        if (scrollToTopButton) {
            scrollToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    } catch (e) { console.error("Error in scroll-to-top:", e); }

    try {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const mainNavLinks = document.getElementById('mainNavLinks');
        if (hamburgerMenu && mainNavLinks) {
            hamburgerMenu.addEventListener('click', function() {
                const isExpanded = mainNavLinks.classList.toggle('active');
                hamburgerMenu.classList.toggle('active');
                hamburgerMenu.setAttribute('aria-expanded', isExpanded.toString());
            });
            mainNavLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (mainNavLinks.classList.contains('active')) {
                        mainNavLinks.classList.remove('active');
                        hamburgerMenu.classList.remove('active');
                        hamburgerMenu.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        }
    } catch(e) { console.error("Error in hamburger menu JS:", e); }

    const CART_STORAGE_KEY = 'dimsumMammaCart';

    function getCart() {
        return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    }

    function saveCart(cart) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartIcon();
    }

    function addItemToCart(item) {
        let cart = getCart();
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        saveCart(cart);
        
        const productNameForToast = item.name || "Item";
        showToast(`${productNameForToast} ditambahkan ke keranjang!`, 'success');
    }
    
    function updateCartIcon() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartCountElements = document.querySelectorAll('.cart-item-count');
        cartCountElements.forEach(el => {
            if (el) {
                el.textContent = totalItems > 0 ? totalItems : '';
            }
        });
    }
    updateCartIcon();


   if (window.location.pathname.includes('products.html')) {
        const variantsShowcase = document.querySelector('.variants-showcase');
        const filterLinks = document.querySelectorAll('.product-categories .category-link');
        let allProductsData = []; 

        function renderProducts(productsToRender) {
            if (!variantsShowcase) return;
            variantsShowcase.innerHTML = ''; 
            productsToRender.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('variant-card-product');
                card.dataset.productId = product.id;
                card.dataset.productName = product.name;
                card.dataset.productPrice = product.price;
                card.dataset.category = product.category;

                card.innerHTML = `
                    <img src="${product.imageSrc}" alt="${product.altText || product.name}">
                    <h3>${product.name}</h3>
                    <button class="add-to-cart-btn">Add to Cart</button>
                `;
                variantsShowcase.appendChild(card);
            });
            attachAddToCartListenersToCards();
        }
        
        function attachAddToCartListenersToCards() {
            const addToCartButtons = variantsShowcase.querySelectorAll('.variant-card-product .add-to-cart-btn');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function(event) {
                    const card = event.target.closest('.variant-card-product');
                    const productId = card.dataset.productId;
                    const productName = card.dataset.productName;
                    const productPrice = parseFloat(card.dataset.productPrice);
                    const productImageSrc = card.querySelector('img') ? card.querySelector('img').src : 'images/default-product.png'; 
                    
                    addItemToCart({ 
                        id: productId, 
                        name: productName, 
                        price: productPrice,
                        image: productImageSrc 
                    });
                });
            });
        }

        async function fetchAndRenderProducts() {
            try {
                const response = await fetch('products.json'); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                allProductsData = await response.json();
                renderProducts(allProductsData); 
                setupFilters(); 
            } catch (error) {
                console.error("Could not fetch or parse products.json:", error);
                if (variantsShowcase) {
                    variantsShowcase.innerHTML = "<p style='text-align:center; width:100%; color: #888;'>Gagal memuat produk. Silakan coba lagi nanti.</p>";
                    showToast('Gagal memuat produk.', 'error');
                }
            }
        }

        function setupFilters() {
            if (filterLinks.length > 0 && allProductsData.length > 0) {
                filterLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();

                        filterLinks.forEach(fl => fl.classList.remove('active-filter'));
                        this.classList.add('active-filter');

                        const filterValue = this.dataset.filter;
                        let filteredProducts;

                        if (filterValue === 'all') {
                            filteredProducts = allProductsData;
                        } else {
                            filteredProducts = allProductsData.filter(product => product.category === filterValue);
                        }
                        renderProducts(filteredProducts);
                    });
                });
            }
        }
        
        fetchAndRenderProducts(); 


        try { 
            const addToCartButtonsList = document.querySelectorAll('.menu-list-products .add-to-cart-btn-list');
            addToCartButtonsList.forEach(button => {
                button.addEventListener('click', function(event) {
                    const listItem = event.target.closest('li');
                    const productId = listItem.dataset.productId;
                    const productName = listItem.dataset.productName;
                    const productPrice = parseFloat(listItem.dataset.productPrice);
                    const productImageSrc = 'images/default-menu-item.png';

                    addItemToCart({ 
                        id: productId, 
                        name: productName, 
                        price: productPrice,
                        image: productImageSrc
                    });
                });
            });

        } catch (e) {
            console.error("Error in product page specific JS (menu list):", e);
        }
    }
    
    if (window.location.pathname.includes('cart.html')) {
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartEmptyMessage = document.getElementById('cart-empty-message');
        const totalCartItemsEl = document.getElementById('total-cart-items');
        const totalCartPriceEl = document.getElementById('total-cart-price');
        const checkoutBtn = document.getElementById('checkout-btn');
        const cartSummaryEl = document.getElementById('cart-summary');


        function formatPrice(price) {
            return 'Rp ' + price.toLocaleString('id-ID');
        }

        function renderCartItems() {
            const cart = getCart();
            if (!cartItemsContainer) return; 
            cartItemsContainer.innerHTML = ''; 

            if (cart.length === 0) {
                if(cartEmptyMessage) cartEmptyMessage.style.display = 'block';
                if(cartSummaryEl) cartSummaryEl.style.display = 'none';
                if(checkoutBtn) checkoutBtn.style.display = 'none';
                if(cartItemsContainer) cartItemsContainer.style.display = 'none';
            } else {
                if(cartEmptyMessage) cartEmptyMessage.style.display = 'none';
                if(cartSummaryEl) cartSummaryEl.style.display = 'block';
                if(checkoutBtn) checkoutBtn.style.display = 'inline-block';
                if(cartItemsContainer) cartItemsContainer.style.display = 'block';

                cart.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('cart-item');
                    itemElement.innerHTML = `
                        <img src="${item.image || 'images/default-product.png'}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <p class="cart-item-price">${formatPrice(item.price)}</p>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-change" data-id="${item.id}" data-change="-1">-</button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="quantity-change" data-id="${item.id}" data-change="1">+</button>
                        </div>
                        <p class="cart-item-subtotal">${formatPrice(item.price * item.quantity)}</p>
                        <button class="remove-item-btn" data-item-id="${item.id}" data-item-name="${item.name}"><i class="bi bi-trash"></i></button> 
                    `;
                    cartItemsContainer.appendChild(itemElement);
                });

                document.querySelectorAll('.quantity-change').forEach(button => {
                    button.addEventListener('click', handleChangeQuantity);
                });
                document.querySelectorAll('.remove-item-btn').forEach(button => {
                    button.addEventListener('click', function() { 
                        const itemId = this.dataset.itemId; 
                        const itemName = this.dataset.itemName;
                        handleRemoveItem(itemId, itemName); 
                    });
                });
            }
            updateCartSummary();
            updateCartIcon(); 
        }

        function updateCartSummary() {
            const cart = getCart();
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            if (totalCartItemsEl) totalCartItemsEl.textContent = totalItems;
            if (totalCartPriceEl) totalCartPriceEl.textContent = formatPrice(totalPrice);
            
            if (totalItems === 0) {
                if(checkoutBtn) checkoutBtn.style.display = 'none';
                if(cartEmptyMessage) cartEmptyMessage.style.display = 'block';
                if(cartSummaryEl) cartSummaryEl.style.display = 'none';

            } else {
                if(checkoutBtn) checkoutBtn.style.display = 'inline-block';
                if(cartEmptyMessage) cartEmptyMessage.style.display = 'none';
                if(cartSummaryEl) cartSummaryEl.style.display = 'block';
            }
        }

        function handleChangeQuantity(event) {
            const itemId = event.target.dataset.id;
            const change = parseInt(event.target.dataset.change);
            let cart = getCart();
            const itemIndex = cart.findIndex(item => item.id === itemId);
            let itemRemovedDueToQuantity = false;
            let removedItemName = "";

            if (itemIndex > -1) {
                removedItemName = cart[itemIndex].name; 
                cart[itemIndex].quantity += change;
                if (cart[itemIndex].quantity <= 0) {
                    cart.splice(itemIndex, 1); 
                    itemRemovedDueToQuantity = true;
                }
            }
            saveCart(cart);
            renderCartItems(); 
            if (itemRemovedDueToQuantity) {
                showToast(`${removedItemName || 'Item'} dihapus dari keranjang.`, 'info');
            } else {
                showToast('Kuantitas item diperbarui.', 'success');
            }
        }
        
        function handleRemoveItem(itemId, itemName) {
            const message = `Apakah Anda yakin ingin menghapus "${itemName || 'item ini'}" dari keranjang?`;
            const title = "Konfirmasi Hapus";

            openConfirmationModal(title, message, () => {
                let cart = getCart();
                cart = cart.filter(item => item.id !== itemId);
                saveCart(cart);
                renderCartItems(); 
                showToast(`${itemName || 'Item'} telah dihapus dari keranjang.`, 'info');
            });
        }
        
        if(checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                const cart = getCart();
                if (cart.length === 0) {
                    showToast('Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.', 'info');
                    return;
                }

                const whatsAppNumber = "6289523352302";

                let orderDetails = "Halo Partea/Dimsum Mamma, saya ingin memesan:\n\n";
                let totalPrice = 0;

                cart.forEach(item => {
                    orderDetails += `- ${item.name} (${item.quantity} x ${formatPrice(item.price)}) = ${formatPrice(item.quantity * item.price)}\n`;
                    totalPrice += item.quantity * item.price;
                });

                orderDetails += `\nTotal Pesanan: ${formatPrice(totalPrice)}\n\n`;
                orderDetails += "Mohon info untuk langkah selanjutnya. Terima kasih!";

                const encodedMessage = encodeURIComponent(orderDetails);
                const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

                window.open(whatsappUrl, '_blank');
                
                saveCart([]);
                renderCartItems();
                showToast('Pesanan Anda sedang diproses melalui WhatsApp!', 'success', 5000);
            });
        }
        renderCartItems();
    }

    if (window.location.pathname.includes('contact.html')) {
        try {
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    showToast('Terima kasih atas pesan Anda!', 'success');
                    contactForm.reset();
                });
            }
        } catch(e) {
            console.error("Error in contact form JS:", e);
        }
    }
});