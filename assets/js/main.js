document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const mainNav = document.getElementById('mainNav');
    
    if (mainNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
                mainNav.classList.remove('text-white');
            } else {
                mainNav.classList.remove('scrolled');
                // Only add text-white back if we are at the top and on a dark hero page
                if(document.querySelector('header.bg-dark-deep')) {
                    mainNav.classList.add('text-white');
                }
            }
        });
    }

    // 2. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Scroll To Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check local storage for preference
    const savedTheme = localStorage.getItem('nami-theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
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

    function updateThemeIcon(theme) {
        if(themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // 5. RTL Toggle
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    
    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentDir = htmlElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            
            htmlElement.setAttribute('dir', newDir);
            // Optionally save to local storage if desired
        });
    }

    // 6. Bowl Builder Interactive Logic (Simple version)
    const builderBtns = document.querySelectorAll('.builder-btn');
    const builderTitle = document.getElementById('builder-title');
    const builderDesc = document.getElementById('builder-desc');

    const builderData = {
        'broth': { title: 'Rich Tonkotsu Broth', desc: 'Pork bone broth, simmered 12 hours.', img: 'assets/images/choose1.jpg' },
        'noodles': { title: 'Hand-Cut Thin Noodles', desc: 'Perfectly hydrated for maximum broth cling.', img: 'assets/images/choose2.jpg' },
        'protein': { title: 'Slow-Braised Chashu', desc: 'Melt-in-your-mouth pork belly slices.', img: 'assets/images/choose3.jpg' },
        'toppings': { title: 'Ajitama & Nori', desc: 'Soft boiled seasoned egg and crisp seaweed.', img: 'assets/images/choose4.jpg' }
    };

    if (builderBtns.length > 0) {
        builderBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active from all
                builderBtns.forEach(b => {
                    b.classList.remove('active');
                    b.querySelector('span:last-child').textContent = '+';
                });
                
                // Add active to clicked
                btn.classList.add('active');
                btn.querySelector('span:last-child').textContent = '-';

                // Update text and image
                const highlight = btn.getAttribute('data-highlight');
                const builderImage = document.getElementById('builder-image');
                
                if(builderData[highlight]) {
                    if (builderTitle) builderTitle.textContent = builderData[highlight].title;
                    if (builderDesc) builderDesc.textContent = builderData[highlight].desc;
                    if (builderImage) builderImage.src = builderData[highlight].img;
                }
            });
        });
    }

    // 7. Menu Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (filterBtns.length > 0 && menuItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                menuItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // 8. Gallery Lightbox Logic
    const masonryItems = document.querySelectorAll('.masonry-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (masonryItems.length > 0 && lightbox) {
        masonryItems.forEach(item => {
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
            // short delay to let transition finish before clearing src
            setTimeout(() => { lightboxImg.src = ''; }, 300);
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                closeLightbox();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navC = document.getElementById('navC');
    if (navC) {
        navC.addEventListener('show.bs.collapse', () => document.body.style.overflow = 'hidden');
        navC.addEventListener('hide.bs.collapse', () => document.body.style.overflow = '');
    }
});
