document.addEventListener('DOMContentLoaded', function() {
    // === Helper: Format Rupiah Currency ===
    function formatPrice(price) {
        return 'Rp ' + Number(price || 0).toLocaleString('id-ID');
    }

    // === Dynamic Toast Notification System ===
    let toastTimeout;

    function ensureToastContainer() {
        let toastElement = document.getElementById('custom-toast');
        let toastTextElement = document.getElementById('toast-text');

        if (!toastElement) {
            toastElement = document.createElement('div');
            toastElement.id = 'custom-toast';
            toastElement.className = 'toast-message';

            toastTextElement = document.createElement('span');
            toastTextElement.id = 'toast-text';
            toastElement.appendChild(toastTextElement);

            document.body.appendChild(toastElement);
        } else if (!toastTextElement) {
            toastTextElement = toastElement.querySelector('#toast-text');
            if (!toastTextElement) {
                toastTextElement = document.createElement('span');
                toastTextElement.id = 'toast-text';
                toastElement.appendChild(toastTextElement);
            }
        }

        return { toastElement, toastTextElement };
    }

    function showToast(message, type = 'info', duration = 3000) {
        const { toastElement, toastTextElement } = ensureToastContainer();

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

    // === Dynamic Modal Confirmation System ===
    let currentConfirmCallback = null;

    function ensureModalContainer() {
        let modalOverlay = document.getElementById('custom-modal-overlay');
        let modalTitleElement = document.getElementById('modal-title');
        let modalMessageElement = document.getElementById('modal-message');
        let modalConfirmBtn = document.getElementById('modal-confirm-btn');
        let modalCancelBtn = document.getElementById('modal-cancel-btn');
        let modalCloseBtnX = document.getElementById('modal-close-btn-x');

        if (!modalOverlay) {
            modalOverlay = document.createElement('div');
            modalOverlay.id = 'custom-modal-overlay';
            modalOverlay.className = 'modal-overlay';
            modalOverlay.innerHTML = `
                <div id="custom-modal" class="modal-content">
                    <button id="modal-close-btn-x" class="modal-close-x" aria-label="Tutup">&times;</button>
                    <h3 id="modal-title">Konfirmasi Tindakan</h3>
                    <p id="modal-message">Apakah Anda yakin ingin melanjutkan?</p>
                    <div class="modal-actions">
                        <button id="modal-cancel-btn" class="btn-modal btn-modal-cancel">Batal</button>
                        <button id="modal-confirm-btn" class="btn-modal btn-modal-confirm">Konfirmasi</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modalOverlay);

            modalTitleElement = modalOverlay.querySelector('#modal-title');
            modalMessageElement = modalOverlay.querySelector('#modal-message');
            modalConfirmBtn = modalOverlay.querySelector('#modal-confirm-btn');
            modalCancelBtn = modalOverlay.querySelector('#modal-cancel-btn');
            modalCloseBtnX = modalOverlay.querySelector('#modal-close-btn-x');

            modalConfirmBtn.addEventListener('click', () => {
                if (typeof currentConfirmCallback === 'function') {
                    currentConfirmCallback();
                }
                closeConfirmationModal();
            });
            modalCancelBtn.addEventListener('click', closeConfirmationModal);
            modalCloseBtnX.addEventListener('click', closeConfirmationModal);
            modalOverlay.addEventListener('click', (event) => {
                if (event.target === modalOverlay) closeConfirmationModal();
            });
        }

        return { modalOverlay, modalTitleElement, modalMessageElement, modalConfirmBtn };
    }

    function openConfirmationModal(title, message, onConfirm, confirmText = 'Konfirmasi') {
        const { modalOverlay, modalTitleElement, modalMessageElement, modalConfirmBtn } = ensureModalContainer();

        modalTitleElement.textContent = title;
        modalMessageElement.textContent = message;
        if (modalConfirmBtn) modalConfirmBtn.textContent = confirmText;
        currentConfirmCallback = onConfirm;
        modalOverlay.classList.add('show');
    }

    function closeConfirmationModal() {
        const modalOverlay = document.getElementById('custom-modal-overlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('show');
        }
        currentConfirmCallback = null;
    }

    // Modal listeners if already present in DOM
    const staticConfirmBtn = document.getElementById('modal-confirm-btn');
    const staticCancelBtn = document.getElementById('modal-cancel-btn');
    const staticCloseBtnX = document.getElementById('modal-close-btn-x');
    const staticOverlay = document.getElementById('custom-modal-overlay');

    if (staticConfirmBtn) {
        staticConfirmBtn.addEventListener('click', () => {
            if (typeof currentConfirmCallback === 'function') {
                currentConfirmCallback();
            }
            closeConfirmationModal();
        });
    }
    if (staticCancelBtn) staticCancelBtn.addEventListener('click', closeConfirmationModal);
    if (staticCloseBtnX) staticCloseBtnX.addEventListener('click', closeConfirmationModal);
    if (staticOverlay) {
        staticOverlay.addEventListener('click', (e) => {
            if (e.target === staticOverlay) closeConfirmationModal();
        });
    }

    // === Navigation Active Link Highlighter ===
    try {
        let currentLocation = window.location.pathname.split('/').pop().split('?')[0] || 'index.html';
        if (!currentLocation || currentLocation === '') currentLocation = 'index.html';

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

        if (!activeFound && (currentLocation === 'index.html' || currentLocation === '')) {
            const homeLink = document.querySelector('.main-nav-links .nav-links-left a[href="index.html"]');
            if (homeLink) homeLink.classList.add('active');
        }
    } catch (e) {
        console.error("Error in active nav link highlighting:", e);
    }

    // === Scroll to Top Button ===
    try {
        const scrollToTopButton = document.querySelector('.scroll-to-top');
        if (scrollToTopButton) {
            scrollToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    } catch (e) {
        console.error("Error in scroll-to-top:", e);
    }

    // === Mobile Hamburger Navigation ===
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
    } catch(e) {
        console.error("Error in hamburger menu JS:", e);
    }

    // === LocalStorage Cart Management ===
    const CART_STORAGE_KEY = 'parteaCart';
    // Backwards compatibility with previous storage key
    const LEGACY_CART_KEY = 'dimsumMammaCart';

    function getCart() {
        try {
            const cart = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem(LEGACY_CART_KEY);
            return cart ? JSON.parse(cart) : [];
        } catch (e) {
            console.error("Failed to read cart from localStorage:", e);
            return [];
        }
    }

    function saveCart(cart) {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            localStorage.removeItem(LEGACY_CART_KEY); // Clean legacy key
        } catch (e) {
            console.error("Failed to save cart to localStorage:", e);
        }
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
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

        const cartCountElements = document.querySelectorAll('.cart-item-count');
        cartCountElements.forEach(el => {
            if (el) {
                el.textContent = totalItems > 0 ? totalItems : '';
            }
        });
    }
    updateCartIcon();

    // === Page Specific: Products Page ===
    if (window.location.pathname.includes('products.html')) {
        const variantsShowcase = document.querySelector('.variants-showcase');
        const filterLinks = document.querySelectorAll('.product-categories .category-link');
        let allProductsData = [];

        // Fallback product dataset in case fetch fails (e.g. direct file:// protocol)
        const fallbackProducts = [
            {
                "id": "fruity-passion",
                "name": "Fruity Passion Tea",
                "price": 12000,
                "category": "fruity",
                "imageSrc": "images/product-fruity-series.png",
                "altText": "Fruity Passion Tea"
            },
            {
                "id": "classic-milk-tea",
                "name": "Classic Milk Tea",
                "price": 8000,
                "category": "milk-tea",
                "imageSrc": "images/product-milk-tea.png",
                "altText": "Classic Milk Tea"
            },
            {
                "id": "pure-jasmine-tea",
                "name": "Pure Jasmine Tea",
                "price": 7000,
                "category": "jasmine-tea",
                "imageSrc": "images/product-jasmine-tea.png",
                "altText": "Pure Jasmine Tea"
            },
            {
                "id": "signature-coffee",
                "name": "Signature Coffee Blend",
                "price": 11000,
                "category": "coffee",
                "imageSrc": "images/product-coffee-cup.png",
                "altText": "Signature Coffee Blend"
            },
            {
                "id": "matcha-latte",
                "name": "Matcha Latte",
                "price": 10000,
                "category": "milk-tea",
                "imageSrc": "images/product-matcha-latte.png",
                "altText": "Matcha Latte"
            },
            {
                "id": "dimsum-ayam",
                "name": "Dimsum Ayam Original",
                "price": 15000,
                "category": "dimsum",
                "imageSrc": "images/dimsum-ayam.png",
                "altText": "Dimsum Ayam Original"
            },
            {
                "id": "dimsum-udang",
                "name": "Dimsum Udang Kristal",
                "price": 18000,
                "category": "dimsum",
                "imageSrc": "images/dimsum-udang.png",
                "altText": "Dimsum Udang Kristal"
            },
            {
                "id": "dimsum-mix",
                "name": "Dimsum Mix Platter",
                "price": 25000,
                "category": "dimsum",
                "imageSrc": "images/dimsum-mix.png",
                "altText": "Dimsum Mix Platter"
            }
        ];

        function renderProducts(productsToRender) {
            if (!variantsShowcase) return;
            variantsShowcase.innerHTML = '';

            if (productsToRender.length === 0) {
                variantsShowcase.innerHTML = "<p style='text-align:center; width:100%; color: #888; padding: 30px;'>Tidak ada produk dalam kategori ini.</p>";
                return;
            }

            productsToRender.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('variant-card-product');
                card.dataset.productId = product.id;
                card.dataset.productName = product.name;
                card.dataset.productPrice = product.price;
                card.dataset.category = product.category;
                card.innerHTML = `
                    <img src="${product.imageSrc}" alt="${product.altText || product.name}" loading="lazy" onerror="this.src='images/partea-logo.png'">
                    <h3>${product.name}</h3>
                    <p class="variant-price">${formatPrice(product.price)}</p>
                    <button class="add-to-cart-btn"><i class="bi bi-cart-plus"></i> Add to Cart</button>
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
                    const imgEl = card.querySelector('img');
                    const productImageSrc = imgEl ? (imgEl.getAttribute('src') || 'images/partea-logo.png') : 'images/partea-logo.png';

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
                console.warn("Could not fetch products.json (likely file:// protocol or offline). Using built-in fallback catalog:", error);
                allProductsData = fallbackProducts;
                renderProducts(allProductsData);
                setupFilters();
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

        // Listeners for "Our Best Menu" list
        try {
            const addToCartButtonsList = document.querySelectorAll('.menu-list-products .add-to-cart-btn-list');
            addToCartButtonsList.forEach(button => {
                button.addEventListener('click', function(event) {
                    const listItem = event.target.closest('li');
                    const productId = listItem.dataset.productId;
                    const productName = listItem.dataset.productName;
                    const productPrice = parseFloat(listItem.dataset.productPrice);
                    const productImageSrc = listItem.dataset.productImage || 'images/partea-logo.png';

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

    // === Page Specific: Cart Page ===
    if (window.location.pathname.includes('cart.html')) {
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartEmptyMessage = document.getElementById('cart-empty-message');
        const totalCartItemsEl = document.getElementById('total-cart-items');
        const totalCartPriceEl = document.getElementById('total-cart-price');
        const checkoutBtn = document.getElementById('checkout-btn');
        const clearCartBtn = document.getElementById('clear-cart-btn');
        const cartSummaryEl = document.getElementById('cart-summary');

        function renderCartItems() {
            const cart = getCart();
            if (!cartItemsContainer) return;
            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
                if (cartSummaryEl) cartSummaryEl.style.display = 'none';
                if (cartItemsContainer) cartItemsContainer.style.display = 'none';
            } else {
                if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
                if (cartSummaryEl) cartSummaryEl.style.display = 'flex';
                if (cartItemsContainer) cartItemsContainer.style.display = 'block';

                cart.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('cart-item');
                    itemElement.innerHTML = `
                        <img src="${item.image || 'images/partea-logo.png'}" alt="${item.name}" class="cart-item-image" onerror="this.src='images/partea-logo.png'">
                        <div class="cart-item-details">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <p class="cart-item-price">${formatPrice(item.price)}</p>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-change" data-id="${item.id}" data-change="-1" aria-label="Kurangi kuantitas">-</button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="quantity-change" data-id="${item.id}" data-change="1" aria-label="Tambah kuantitas">+</button>
                        </div>
                        <p class="cart-item-subtotal">${formatPrice(item.price * item.quantity)}</p>
                        <button class="remove-item-btn" data-item-id="${item.id}" data-item-name="${item.name}" aria-label="Hapus item"><i class="bi bi-trash"></i></button>
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
            const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            const totalPrice = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

            if (totalCartItemsEl) totalCartItemsEl.textContent = totalItems;
            if (totalCartPriceEl) totalCartPriceEl.textContent = formatPrice(totalPrice);

            if (totalItems === 0) {
                if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
                if (cartSummaryEl) cartSummaryEl.style.display = 'none';
            } else {
                if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
                if (cartSummaryEl) cartSummaryEl.style.display = 'flex';
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
            }, 'Hapus');
        }

        // Clear entire cart button
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function() {
                const cart = getCart();
                if (cart.length === 0) return;

                openConfirmationModal(
                    "Kosongkan Keranjang",
                    "Apakah Anda yakin ingin mengosongkan semua pesanan dari keranjang?",
                    () => {
                        saveCart([]);
                        renderCartItems();
                        showToast('Keranjang belanja berhasil dikosongkan.', 'info');
                    },
                    'Kosongkan'
                );
            });
        }

        // WhatsApp Checkout
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                const cart = getCart();
                if (cart.length === 0) {
                    showToast('Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.', 'info');
                    return;
                }

                const whatsAppNumber = "6289523352302";

                let orderDetails = "*PESANAN BARU - PARTEA MALANG*\n";
                orderDetails += "--------------------------------------\n";
                let totalPrice = 0;

                cart.forEach((item, index) => {
                    const subtotal = item.quantity * item.price;
                    orderDetails += `${index + 1}. *${item.name}*\n`;
                    orderDetails += `   ${item.quantity} x ${formatPrice(item.price)} = *${formatPrice(subtotal)}*\n`;
                    totalPrice += subtotal;
                });

                orderDetails += "--------------------------------------\n";
                orderDetails += `*Total Pembayaran: ${formatPrice(totalPrice)}*\n\n`;
                orderDetails += "Halo Admin Partea, saya ingin memesan menu di atas. Mohon info nomor rekening dan konfirmasi pesanan saya. Terima kasih!";

                const encodedMessage = encodeURIComponent(orderDetails);
                const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

                openConfirmationModal(
                    "Kirim Pesanan via WhatsApp",
                    `Total pesanan Anda ${formatPrice(totalPrice)}. Lanjutkan pengiriman pesanan ke WhatsApp Partea?`,
                    () => {
                        window.open(whatsappUrl, '_blank');
                        saveCart([]);
                        renderCartItems();
                        showToast('Pesanan berhasil diteruskan ke WhatsApp!', 'success', 5000);
                    },
                    'Buka WhatsApp'
                );
            });
        }

        renderCartItems();
    }

    // === Page Specific: Contact Page ===
    if (window.location.pathname.includes('contact.html')) {
        try {
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const name = document.getElementById('name')?.value || '';
                    showToast(`Terima kasih ${name ? name : ''}, pesan Anda telah kami terima!`, 'success', 4000);
                    contactForm.reset();
                });
            }
        } catch(e) {
            console.error("Error in contact form JS:", e);
        }
    }
});
