document.addEventListener('DOMContentLoaded', function() {
    try {
        const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
        const navLinksDesktop = document.querySelectorAll('.navbar .nav-links-left a'); // Untuk desktop
        const navLinksMobile = document.querySelectorAll('.mobile-nav-menu .mobile-nav-links a'); // Jika ada menu mobile terpisah
        const contactBtnNav = document.querySelector('.navbar .nav-actions-right a.contact-btn');
        const cartBtnNav = document.querySelector('.navbar .nav-actions-right a.cart-btn');

        function setActiveLink(links, currentPath) {
            links.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
                if (linkPage === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
        
        const allNavLinks = document.querySelectorAll('.main-nav-links .nav-links-left a');
        setActiveLink(allNavLinks, currentLocation);


        if (contactBtnNav) {
            const contactPage = contactBtnNav.getAttribute('href').split('/').pop();
            if (contactPage === currentLocation) {
                contactBtnNav.classList.add('active');
                 allNavLinks.forEach(link => link.classList.remove('active'));
            } else {
                 contactBtnNav.classList.remove('active');
            }
        }
        if (cartBtnNav) {
            const cartPage = cartBtnNav.getAttribute('href').split('/').pop();
            if (cartPage === currentLocation) {
                cartBtnNav.classList.add('active');
                allNavLinks.forEach(link => link.classList.remove('active'));
                if(contactBtnNav && contactBtnNav.classList.contains('active')) {
                    contactBtnNav.classList.remove('active');
                }
            } else {
                cartBtnNav.classList.remove('active');
            }
        }
         if (currentLocation === 'index.html') {
            let homeLinkIsActive = false;
            allNavLinks.forEach(link => {
                if ((link.getAttribute('href').split('/').pop() || 'index.html') === 'index.html' && link.classList.contains('active')) {
                    homeLinkIsActive = true;
                }
            });
            if (!homeLinkIsActive) {
                allNavLinks.forEach(link => link.classList.remove('active'));
                const homeLink = Array.from(allNavLinks).find(link => (link.getAttribute('href').split('/').pop() || 'index.html') === 'index.html');
                if (homeLink) homeLink.classList.add('active');
            }
        }


    } catch (e) {
        console.error("Error in active nav link highlighting:", e);
    }

    try {
        const scrollToTopButton = document.querySelector('.scroll-to-top');
        if (scrollToTopButton) {
            scrollToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    } catch (e) {
        console.error("Error in scroll-to-top:", e);
    }


    try {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const mainNavLinks = document.getElementById('mainNavLinks');

        if (hamburgerMenu && mainNavLinks) {
            hamburgerMenu.addEventListener('click', function() {
                mainNavLinks.classList.toggle('active');
                hamburgerMenu.classList.toggle('active');
                const isExpanded = mainNavLinks.classList.contains('active');
                hamburgerMenu.setAttribute('aria-expanded', isExpanded);
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

   if (window.location.pathname.includes('products.html')) {
        try {
            const prevBtn = document.querySelector('.product-variants-section .prev-btn');
            const nextBtn = document.querySelector('.product-variants-section .next-btn');
            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Navigasi varian sebelumnya segera hadir!');
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Navigasi varian berikutnya segera hadir!');
                });
            }

            const categoryLinks = document.querySelectorAll('.product-categories .category-link');
            categoryLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert(`Fitur filter untuk "${link.textContent.trim().replace(" fonctionnalité à venir","")}" segera hadir!`);
                });
            });
        } catch (e) {
            console.error("Error in product page specific JS:", e);
        }
    }
    
    if (window.location.pathname.includes('contact.html')) {
        try {
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Terima kasih atas pesan Anda! (Fungsionalitas pengiriman form belum diaktifkan.)');
                    contactForm.reset();
                });
            }
        } catch(e) {
            console.error("Error in contact form JS:", e);
        }
    }
});