/**
 * NAMI Noodle - Master Interactive JavaScript
 * Premium ThemeForest & Modern Web App Features
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Navbar Scroll Effect
    // ----------------------------------------------------
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        const updateNavbarScroll = () => {
            if (window.scrollY > 40) {
                mainNav.classList.add('scrolled');
                mainNav.classList.remove('text-white');
            } else {
                mainNav.classList.remove('scrolled');
                if (document.querySelector('header.bg-dark-deep') || document.querySelector('header.vh-100')) {
                    mainNav.classList.add('text-white');
                }
            }
        };
        window.addEventListener('scroll', updateNavbarScroll);
        updateNavbarScroll();
    }

    // ----------------------------------------------------
    // 2. Scroll Reveal Animations (Intersection Observer)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-up');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        };
        const revealObserver = new IntersectionObserver(revealCallback, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback
        revealElements.forEach(el => el.classList.add('active'));
    }

    // ----------------------------------------------------
    // 3. Scroll To Top Button
    // ----------------------------------------------------
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------
    // 4. Dark / Light Mode Toggle
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const updateThemeIcon = (theme) => {
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        }
    };

    const savedTheme = localStorage.getItem('nami-theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Default to what the HTML declares
        const initialTheme = htmlElement.getAttribute('data-theme') || 'light';
        updateThemeIcon(initialTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('nami-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // ----------------------------------------------------
    // 5. RTL Toggle
    // ----------------------------------------------------
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    const savedDir = localStorage.getItem('nami-dir');
    if (savedDir) {
        htmlElement.setAttribute('dir', savedDir);
    }

    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentDir = htmlElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('nami-dir', newDir);
        });
    }

    // ----------------------------------------------------
    // 6. Interactive Bowl Builder (index.html)
    // ----------------------------------------------------
    const builderBtns = document.querySelectorAll('#bowl-builder-controls .builder-btn');
    const builderTitle = document.getElementById('builder-title');
    const builderDesc = document.getElementById('builder-desc');
    const builderImage = document.getElementById('builder-image');

    const builderData = {
        'broth': {
            title: 'Rich Tonkotsu Broth (18-Hour Simmer)',
            desc: 'Velvety emulsion extracted from Berkshire pork bones, charred ginger, and pure mountain spring water.',
            img: 'assets/images/choose1.jpg'
        },
        'noodles': {
            title: 'Daily Cut Thin Alkaline Noodles (32% Hydration)',
            desc: 'Spun from certified Hokkaido organic wheat flour to achieve optimal springiness and firm tooth (Katame).',
            img: 'assets/images/choose2.jpg'
        },
        'protein': {
            title: 'Torch-Seared Chashu Pork Belly & Kakuni',
            desc: 'Braised for six hours in sweet mirin and aged tare, caramelized with an open flame right before plating.',
            img: 'assets/images/choose3.jpg'
        },
        'toppings': {
            title: 'Seasoned Ajitama Lava Egg, Nori & Mayu Garlic',
            desc: 'Soft-boiled egg marinated 24 hours in sweetened soy, accompanied by crisp Ariake nori and roasted black garlic oil.',
            img: 'assets/images/choose4.jpg'
        }
    };

    if (builderBtns.length > 0) {
        builderBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                builderBtns.forEach(b => {
                    b.classList.remove('active');
                    const spanIcon = b.querySelector('span:last-child');
                    if (spanIcon) spanIcon.textContent = '+';
                });

                btn.classList.add('active');
                const activeSpan = btn.querySelector('span:last-child');
                if (activeSpan) activeSpan.textContent = '-';

                const highlight = btn.getAttribute('data-highlight');
                if (builderData[highlight]) {
                    if (builderTitle) builderTitle.textContent = builderData[highlight].title;
                    if (builderDesc) builderDesc.textContent = builderData[highlight].desc;
                    if (builderImage) {
                        builderImage.style.opacity = '0.3';
                        setTimeout(() => {
                            builderImage.src = builderData[highlight].img;
                            builderImage.style.opacity = '1';
                        }, 180);
                    }
                }
            });
        });
    }

    // ----------------------------------------------------
    // 7. Menu Filtering (menu.html)
    // ----------------------------------------------------
    const menuFilterBtns = document.querySelectorAll('#menu-filters .filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    const filterMenu = (category) => {
        menuFilterBtns.forEach(b => {
            if (b.getAttribute('data-filter') === category) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        menuItems.forEach(item => {
            const itemCat = item.getAttribute('data-category');
            if (category === 'all' || itemCat === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    };

    if (menuFilterBtns.length > 0 && menuItems.length > 0) {
        menuFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-filter');
                filterMenu(category);
            });
        });

        // Check URL query param e.g. menu.html?filter=tonkotsu
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        if (filterParam) {
            filterMenu(filterParam);
        }
    }

    // ----------------------------------------------------
    // 8. Gallery Filtering & Lightbox (gallery.html)
    // ----------------------------------------------------
    const galleryFilterBtns = document.querySelectorAll('#gallery-filters .gallery-filter-btn');
    const galleryItems = document.querySelectorAll('#gallery-grid .masonry-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryFilterBtns.length > 0 && galleryItems.length > 0) {
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                galleryFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCat = item.getAttribute('data-category');
                    if (category === 'all' || itemCat === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
            setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 250);
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
        });
    }

    // ----------------------------------------------------
    // 9. Interactive Online Order Application (order.html)
    // ----------------------------------------------------
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCartNotice = document.getElementById('emptyCartNotice');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');
    const cartDeliveryFee = document.getElementById('cartDeliveryFee');
    const cartTotal = document.getElementById('cartTotal');
    const cartItemCountBadge = document.getElementById('cartItemCountBadge');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const resetCartBtn = document.getElementById('resetCartBtn');
    const typePickup = document.getElementById('typePickup');
    const typeDelivery = document.getElementById('typeDelivery');

    let cart = [];

    const renderCart = () => {
        if (!cartItemsList) return;

        if (cart.length === 0) {
            if (emptyCartNotice) emptyCartNotice.style.display = 'block';
            cartItemsList.innerHTML = '';
            if (emptyCartNotice) cartItemsList.appendChild(emptyCartNotice);
            if (cartSubtotal) cartSubtotal.textContent = '$0.00';
            if (cartTax) cartTax.textContent = '$0.00';
            if (cartDeliveryFee) cartDeliveryFee.textContent = '$0.00';
            if (cartTotal) cartTotal.textContent = '$0.00';
            if (cartItemCountBadge) cartItemCountBadge.textContent = '0 items';
            if (checkoutBtn) checkoutBtn.classList.add('disabled');
            return;
        }

        if (emptyCartNotice) emptyCartNotice.style.display = 'none';
        cartItemsList.innerHTML = '';

        let subtotal = 0;
        let totalCount = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;
            totalCount += item.qty;

            const row = document.createElement('div');
            row.className = 'cart-item-row d-flex justify-content-between align-items-center';
            row.innerHTML = `
                <div>
                    <h6 class="mb-0" style="font-size: 0.9rem;">${item.name}</h6>
                    <small class="text-muted">$${item.price.toFixed(2)} each</small>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="qty-btn btn-cart-dec" data-index="${index}">-</button>
                    <span class="fw-bold px-1" style="font-size: 0.9rem;">${item.qty}</span>
                    <button class="qty-btn btn-cart-inc" data-index="${index}">+</button>
                    <span class="fw-bold text-primary ms-2" style="font-size: 0.95rem;">$${itemTotal.toFixed(2)}</span>
                </div>
            `;
            cartItemsList.appendChild(row);
        });

        const isDelivery = typeDelivery && typeDelivery.checked;
        const deliveryCost = isDelivery ? 3.99 : 0.00;
        const taxRate = 0.08875;
        const tax = subtotal * taxRate;
        const finalTotal = subtotal + tax + deliveryCost;

        if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (cartTax) cartTax.textContent = `$${tax.toFixed(2)}`;
        if (cartDeliveryFee) cartDeliveryFee.textContent = isDelivery ? `$${deliveryCost.toFixed(2)}` : '$0.00';
        if (cartTotal) cartTotal.textContent = `$${finalTotal.toFixed(2)}`;
        if (cartItemCountBadge) cartItemCountBadge.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
        if (checkoutBtn) checkoutBtn.classList.remove('disabled');

        // Quantity Listeners
        cartItemsList.querySelectorAll('.btn-cart-dec').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                if (cart[idx].qty > 1) {
                    cart[idx].qty -= 1;
                } else {
                    cart.splice(idx, 1);
                }
                renderCart();
            });
        });

        cartItemsList.querySelectorAll('.btn-cart-inc').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                cart[idx].qty += 1;
                renderCart();
            });
        });
    };

    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.getAttribute('data-name');
                const price = parseFloat(btn.getAttribute('data-price'));

                const existingItem = cart.find(i => i.name === name);
                if (existingItem) {
                    existingItem.qty += 1;
                } else {
                    cart.push({ name, price, qty: 1 });
                }

                // Visual button feedback
                const origText = btn.textContent;
                btn.textContent = '✓ Added!';
                btn.classList.add('btn-premium');
                btn.classList.remove('btn-outline-premium');
                setTimeout(() => {
                    btn.textContent = origText;
                    btn.classList.remove('btn-premium');
                    btn.classList.add('btn-outline-premium');
                }, 800);

                renderCart();
            });
        });

        if (typePickup && typeDelivery) {
            typePickup.addEventListener('change', renderCart);
            typeDelivery.addEventListener('change', renderCart);
        }

        if (resetCartBtn) {
            resetCartBtn.addEventListener('click', () => {
                cart = [];
                renderCart();
            });
        }
    }

    // ----------------------------------------------------
    // 10. Form Submissions (Reservation & Feedback)
    // ----------------------------------------------------
    const heroResForm = document.getElementById('heroReservationForm');
    const resFeedback = document.getElementById('resFeedback');
    if (heroResForm && resFeedback) {
        heroResForm.addEventListener('submit', (e) => {
            e.preventDefault();
            resFeedback.classList.remove('d-none');
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 1000);
        });
    }

    const nightResForm = document.getElementById('nightReservationForm');
    const nightFeedback = document.getElementById('nightFeedback');
    if (nightResForm && nightFeedback) {
        nightResForm.addEventListener('submit', (e) => {
            e.preventDefault();
            nightFeedback.classList.remove('d-none');
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 1000);
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');
    if (newsletterForm && newsletterSuccess) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterSuccess.classList.remove('d-none');
            newsletterForm.reset();
        });
    }

    const contactForm = document.getElementById('contactForm');
    const contactSuccessMsg = document.getElementById('contactSuccessMsg');
    if (contactForm && contactSuccessMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactSuccessMsg.classList.remove('d-none');
            contactForm.reset();
        });
    }
});
