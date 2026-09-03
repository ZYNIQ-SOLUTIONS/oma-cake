/**
 * OMA CAKE — HAUTE PÂTISSERIE & BESPOKE ATELIER
 * Production JavaScript Engine
 * GSAP ScrollTrigger • Frame Sequence Canvas • Interactive Transformation Slider
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Assets Preloading & Luxury Preloader
    // -------------------------------------------------------------------------
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderCounter = document.getElementById('loader-counter');

    const frameCount = 151;
    const currentFrame = index => (
        `./assets/exploded_cake/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
    );

    const images = [];
    const cake = { frame: 0 };
    let loadedImagesCount = 0;

    // Canvas Setup with Mobile Viewport Stability
    const canvas = document.getElementById('hero-canvas');
    const context = canvas ? canvas.getContext('2d') : null;
    let cachedClientWidth = document.documentElement.clientWidth;
    let cachedClientHeight = window.innerHeight;

    function resizeCanvas() {
        if (!canvas) return;
        const currentWidth = document.documentElement.clientWidth;
        const currentHeight = window.innerHeight;

        // On mobile, avoid re-rendering canvas on minor address bar height shifts
        const isMobile = currentWidth < 768;
        if (isMobile && currentWidth === cachedClientWidth && Math.abs(currentHeight - cachedClientHeight) < 140) {
            return;
        }

        cachedClientWidth = currentWidth;
        cachedClientHeight = currentHeight;
        canvas.width = currentWidth;
        canvas.height = currentHeight;
        renderFrame();
    }

    function renderFrame() {
        if (!context || !images[cake.frame]) return;
        const img = images[cake.frame];
        if (!img.complete) return;

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const coverRatio = Math.max(hRatio, vRatio);
        const containRatio = Math.min(hRatio, vRatio);

        // Zoom-out logic tailored for both Desktop Widescreen and Mobile Portrait
        let ratio;
        if (canvas.width > 992) {
            // Desktop: zoom out to 0.76 of cover or 0.98 of contain
            ratio = Math.min(coverRatio * 0.76, containRatio * 1.05);
        } else if (canvas.width <= 768) {
            // Mobile Portrait: Ensure the cake core is grand, centered, and fully visible
            ratio = Math.min(hRatio * 1.35, vRatio * 0.75);
        } else {
            // Tablet: fit comfortably with balanced cushion
            ratio = Math.min(coverRatio * 0.78, containRatio * 1.08);
        }

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        // Render matching warm studio ambient backdrop to seamlessly surround zoomed-out video
        const maxDim = Math.max(canvas.width, canvas.height);
        const bgGrad = context.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 50,
            canvas.width / 2, canvas.height / 2, maxDim / 1.25
        );
        bgGrad.addColorStop(0, '#EAE1D7');
        bgGrad.addColorStop(0.45, '#DECFC0');
        bgGrad.addColorStop(0.85, '#D1BDA9');
        bgGrad.addColorStop(1, '#C1AB95');
        context.fillStyle = bgGrad;
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }

    // Preload loop
    function preloadHeroFrames() {
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedImagesCount++;
                const percent = Math.min(100, Math.round((loadedImagesCount / frameCount) * 100));
                if (loaderBar) loaderBar.style.width = `${percent}%`;
                if (loaderCounter) loaderCounter.textContent = `${percent}%`;

                // If first frame loaded, render canvas
                if (i === 0) renderFrame();

                // When at least 40 frames or all are loaded, transition into page
                if (loadedImagesCount === frameCount || loadedImagesCount >= 40) {
                    dismissPreloader();
                }
            };
            img.onerror = () => {
                loadedImagesCount++;
                if (loadedImagesCount >= 40) dismissPreloader();
            };
            images.push(img);
        }
    }

    let preloaderDismissed = false;
    function dismissPreloader() {
        if (preloaderDismissed) return;
        preloaderDismissed = true;

        setTimeout(() => {
            if (loaderBar) loaderBar.style.width = '100%';
            if (loaderCounter) loaderCounter.textContent = '100%';

            setTimeout(() => {
                if (preloader) preloader.classList.add('hidden');
                initScrollAnimations();
                initHeroTextAnimations();
            }, 500);
        }, 300);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    preloadHeroFrames();

    // Fallback: dismiss preloader after 3.5s maximum to avoid infinite wait on slow networks
    setTimeout(() => {
        dismissPreloader();
    }, 3500);

    // -------------------------------------------------------------------------
    // 2. Header Scroll & Mobile Drawer Navigation
    // -------------------------------------------------------------------------
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    function closeMobileMenu() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.remove('open');
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
        if (mobileBackdrop) {
            mobileBackdrop.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    function openMobileMenu() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.add('open');
        if (mobileToggle) {
            mobileToggle.classList.add('active');
            mobileToggle.setAttribute('aria-expanded', 'true');
        }
        if (mobileBackdrop) {
            mobileBackdrop.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileDrawer.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        if (mobileBackdrop) {
            mobileBackdrop.addEventListener('click', closeMobileMenu);
        }

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
                closeMobileMenu();
            }
        });

        // Close if window expands to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && mobileDrawer.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    }

    // -------------------------------------------------------------------------
    // 3. Hero Sequence Animations (GSAP & ScrollTrigger)
    // -------------------------------------------------------------------------
    function initHeroTextAnimations() {
        if (typeof gsap === 'undefined') return;

        gsap.fromTo('.hero-badge', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', delay: 0.1 }
        );

        gsap.fromTo('.hero-title', 
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', delay: 0.3 }
        );

        gsap.fromTo('.hero-subtitle', 
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.5 }
        );

        gsap.fromTo('.hero-description', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.7 }
        );

        gsap.fromTo('.hero-cta-group', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.9 }
        );

        gsap.fromTo('.scroll-indicator', 
            { opacity: 0 },
            { opacity: 1, duration: 1.5, ease: 'power2.out', delay: 1.2 }
        );
    }

    function initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        // Canvas frame animation tied directly to scroll scrub
        gsap.to(cake, {
            frame: frameCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.4,
                onUpdate: () => {
                    renderFrame();
                    updateMilestones(cake.frame);
                }
            }
        });

        // Fade out initial hero content as scroll begins
        gsap.to('#hero-content', {
            opacity: 0,
            y: -40,
            scrollTrigger: {
                trigger: '.hero',
                start: '5% top',
                end: '22% top',
                scrub: true
            }
        });

        // Fade out scroll indicator
        gsap.to('#scroll-indicator', {
            opacity: 0,
            scrollTrigger: {
                trigger: '.hero',
                start: '3% top',
                end: '12% top',
                scrub: true
            }
        });
    }

    // Manage floating story milestone cards during scroll
    const milestone1 = document.querySelector('.milestone-1');
    const milestone2 = document.querySelector('.milestone-2');
    const milestone3 = document.querySelector('.milestone-3');

    function updateMilestones(currentFrameIndex) {
        // Milestone 1 (frame 20 to 60)
        if (milestone1) {
            if (currentFrameIndex >= 18 && currentFrameIndex <= 58) {
                milestone1.classList.add('active');
            } else {
                milestone1.classList.remove('active');
            }
        }

        // Milestone 2 (frame 62 to 105)
        if (milestone2) {
            if (currentFrameIndex >= 62 && currentFrameIndex <= 105) {
                milestone2.classList.add('active');
            } else {
                milestone2.classList.remove('active');
            }
        }

        // Milestone 3 (frame 110 to 150)
        if (milestone3) {
            if (currentFrameIndex >= 110 && currentFrameIndex <= 150) {
                milestone3.classList.add('active');
            } else {
                milestone3.classList.remove('active');
            }
        }
    }

    // -------------------------------------------------------------------------
    // 4. Interactive Transformation Slider (Before / After)
    // -------------------------------------------------------------------------
    const sliderContainer = document.getElementById('slider-container');
    const afterImage = document.getElementById('after-image');
    const sliderHandle = document.getElementById('slider-handle');

    if (sliderContainer && afterImage && sliderHandle) {
        let isSliding = false;

        function updateSlider(clientX) {
            const rect = sliderContainer.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percent = (x / rect.width) * 100;

            afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            sliderHandle.style.left = `${percent}%`;
        }

        function onPointerDown(e) {
            isSliding = true;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            updateSlider(clientX);
        }

        function onPointerMove(e) {
            if (!isSliding) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            updateSlider(clientX);
        }

        function onPointerUp() {
            isSliding = false;
        }

        // Mouse Events
        sliderContainer.addEventListener('mousedown', onPointerDown);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);

        // Touch Events
        sliderContainer.addEventListener('touchstart', onPointerDown, { passive: true });
        window.addEventListener('touchmove', onPointerMove, { passive: true });
        window.addEventListener('touchend', onPointerUp);

        // Click to move directly
        sliderContainer.addEventListener('click', (e) => {
            updateSlider(e.clientX);
        });

        // Keyboard Accessibility (Left/Right Arrows)
        sliderContainer.setAttribute('tabindex', '0');
        sliderContainer.addEventListener('keydown', (e) => {
            const currentLeft = parseFloat(sliderHandle.style.left) || 50;
            if (e.key === 'ArrowLeft') {
                const newPercent = Math.max(0, currentLeft - 5);
                afterImage.style.clipPath = `inset(0 ${100 - newPercent}% 0 0)`;
                sliderHandle.style.left = `${newPercent}%`;
            } else if (e.key === 'ArrowRight') {
                const newPercent = Math.min(100, currentLeft + 5);
                afterImage.style.clipPath = `inset(0 ${100 - newPercent}% 0 0)`;
                sliderHandle.style.left = `${newPercent}%`;
            }
        });
    }

    // -------------------------------------------------------------------------
    // 5. Gallery Category Filter (Bento Grid Support)
    // -------------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.bento-card, .gallery-card');

    if (filterButtons.length > 0 && galleryCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                const filter = btn.getAttribute('data-filter');

                galleryCards.forEach(card => {
                    const categories = card.getAttribute('data-category') || '';
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = '';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------------------
    // 6. Smooth Scrolling for Internal Links
    // -------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
