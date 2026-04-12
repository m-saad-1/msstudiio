// =========================================
// PORTFOLIO JAVASCRIPT
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    initPageLoadExperience();

    // Initialize all components
    initNavigation();
    initNavDateTime();
    initRotatingTitles();
    initSkeletonLoaders();
    initProjectModal();
    initScrollReveal();
    initContactForm();
    initScrollIndicator();
    initScrollToTop();
});

function initPageLoadExperience() {
    const body = document.body;
    const heroImage = document.querySelector('.hero-avatar');
    const loader = document.getElementById('pipeLoader');

    const finishLoading = () => {
        // Wait for two paint frames to ensure the hero image is rendered on screen.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                body.classList.remove('app-loading');
                if (loader) {
                    loader.classList.add('hidden');
                    setTimeout(() => loader.remove(), 220);
                }
            });
        });
    };

    if (!heroImage) {
        finishLoading();
        return;
    }

    if (heroImage.complete && heroImage.naturalWidth > 0) {
        finishLoading();
    } else {
        heroImage.addEventListener('load', finishLoading, { once: true });
        heroImage.addEventListener('error', finishLoading, { once: true });
    }
}

// =========================================
// NAVIGATION
// =========================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    const logoLinks = document.querySelectorAll('.nav-logo, .footer-logo-link');
    logoLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const hero = document.getElementById('hero');
            if (!hero) return;
            hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link && scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

function initNavDateTime() {
    const timeEl = document.getElementById('navTime');
    const ampmEl = document.getElementById('navAmPm');
    const dateEl = document.getElementById('navDate');

    if (!timeEl || !ampmEl || !dateEl) return;

    const updateClock = () => {
        const now = new Date();

        const timeFormatter = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        const parts = timeFormatter.formatToParts(now);
        const hour = parts.find(p => p.type === 'hour')?.value || '12';
        const minute = parts.find(p => p.type === 'minute')?.value || '00';
        const dayPeriod = (parts.find(p => p.type === 'dayPeriod')?.value || 'AM').toUpperCase();

        timeEl.textContent = `${hour}:${minute}`;
        ampmEl.textContent = dayPeriod;
        dateEl.textContent = dateFormatter.format(now).toUpperCase();
    };

    updateClock();
    setInterval(updateClock, 1000);
}

// =========================================
// ROTATING TITLES
// =========================================
function initRotatingTitles() {
    const titles = document.querySelectorAll('.rotating-title');
    let currentIndex = 0;
    const interval = 3000;

    if (titles.length === 0) return;

    function showNextTitle() {
        titles[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % titles.length;
        titles[currentIndex].classList.add('active');
    }

    setInterval(showNextTitle, interval);
}

function initSkeletonLoaders() {
    const mediaPairs = [
        { img: '.hero-avatar', container: '.hero-image' },
        { img: '.project-thumb-img', container: '.project-thumbnail' }
    ];

    mediaPairs.forEach(pair => {
        document.querySelectorAll(pair.img).forEach(img => {
            const container = img.closest(pair.container);
            if (!container) return;

            const markLoaded = () => container.classList.add('loaded');
            if (img.complete && img.naturalWidth > 0) {
                markLoaded();
            } else {
                img.addEventListener('load', markLoaded, { once: true });
                img.addEventListener('error', markLoaded, { once: true });
            }
        });
    });
}

// =========================================
// PROJECT MODAL
// =========================================
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = lightbox ? lightbox.querySelector('.lightbox-image') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    // Project data powered by local image assets
    const projects = {
        1: {
            title: 'DevBug',
            tagline: 'Developer Community Platform',
            icon: '🐞',
            description: 'A developer-centric collaboration platform with discussion, project sharing, and engagement workflows designed for modern product teams.',
            tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'highlight.js'],
            thumbnail: 'images/DevBug/Thumbnail.webp',
            images: [
                'images/DevBug/devbug1.webp',
                'images/DevBug/devbug2.webp',
                'images/DevBug/devbug3.webp',
                'images/DevBug/devbug4.webp',
                'images/DevBug/devbug5.webp',
                'images/DevBug/devbug6.webp',
                'images/DevBug/devbug7.webp',
                'images/DevBug/devbug8.webp',
                'images/DevBug/devbug9.webp'
            ],
            link: 'https://devbug.ct.ws',
            github: 'https://github.com/m-saad-1/DevBug'
        },
        2: {
            title: 'FashionHub',
            tagline: 'E-commerce Platform',
            icon: '🛍️',
            iconImage: 'images/Fashionhub.png',
            description: 'A fashion storefront with product discovery, promotional storytelling, and a conversion-focused shopping interface.',
            tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Node.js + Express', 'Stripe SDK'],
            thumbnail: 'images/FashionHub/Thumbnail.webp',
            images: [
                'images/FashionHub/fashionhub1.webp',
                'images/FashionHub/fashionhub2.webp',
                'images/FashionHub/fashionhub3.webp',
                'images/FashionHub/fashionhub4.webp',
                'images/FashionHub/fashionhub5.webp',
                'images/FashionHub/fashionhub7.webp',
                'images/FashionHub/fashionhub8.webp',
                'images/FashionHub/fashionhub9.webp'
            ],
            link: 'https://fashionhub.ct.ws',
            github: 'https://github.com/m-saad-1/Men-Fashion-Hub'
        },
        3: {
            title: 'Personal Operating System (Personal OS)',
            tagline: 'Productivity Dashboard',
            icon: '📋',
            iconImage: 'images/personalOS.jpg',
            description: 'A personal operating system for workflow management with focused modules for planning, tracking, and execution.',
            tech: ['Electron', 'Node.js', 'SQLite', 'React 18', 'TypeScript', 'Vite', 'Tailwind CSS'],
            thumbnail: 'images/PersonalOS/thumbnail.png',
            images: [
                'images/PersonalOS/PersonalOS 1.png',
                'images/PersonalOS/PersonalOS 2.png',
                'images/PersonalOS/PersonalOS 3.png',
                'images/PersonalOS/PersonalOS 4.png',
                'images/PersonalOS/PersonalOS 5.png',
                'images/PersonalOS/PersonalOS 6.png',
                'images/PersonalOS/PersonalOS 7.png',
                'images/PersonalOS/PersonalOS 8.png',
                'images/PersonalOS/PersonalOS 9.png',
                'images/PersonalOS/PersonalOS 10.png'
            ],
            link: '',
            github: 'https://github.com/m-saad-1/Progress-Operating-System'
        },
        4: {
            title: 'VisualShare',
            tagline: 'Social Image Sharing App',
            icon: '🖼️',
            iconImage: 'images/visualshare.png',
            description: 'A visual-first social experience focused on streamlined sharing, feed clarity, and strong content presentation.',
            tech: ['React', 'Firebase', 'Storage', 'Realtime DB'],
            thumbnail: 'images/VisualShare/thumbnail.webp',
            images: [
                'images/VisualShare/visual.webp',
                'images/VisualShare/visual1.webp',
                'images/VisualShare/visual2.webp',
                'images/VisualShare/visual3.webp',
                'images/VisualShare/visual4.webp'
            ],
            link: 'https://visualshare.ct.ws/',
            github: 'https://github.com/m-saad-1/VisualShare'
        },
        5: {
            title: 'Apple Leaf Disease Detection System',
            tagline: 'Agritech Computer Vision',
            icon: '🌿',
            description: 'A machine-learning concept focused on identifying crop health issues from image samples to support faster field-level diagnostics.',
            tech: ['Python', 'TensorFlow / Keras', 'Flask', 'OpenCV', 'EfficientNet', 'Grad-CAM', 'NumPy'],
            thumbnail: 'images/leaf_disease_detection/thumbnail.webp',
            images: [
                'images/leaf_disease_detection/thumbnail.webp',
                'images/leaf_disease_detection/leaf_detection1.webp',
                'images/leaf_disease_detection/leaf_detection2.webp',
                'images/leaf_disease_detection/leaf_detection4.webp',
                'images/leaf_disease_detection/3.webp'
            ],
            link: '',
            github: 'https://github.com/m-saad-1/Apple_leaf_disease_detection'
        }
    };

    let currentCarouselIndex = 0;
    let currentProject = null;
    let touchStartX = 0;
    let touchEndX = 0;
    let lightboxZoomed = false;

    projectCards.forEach(card => {
        const project = projects[card.dataset.project];
        const img = card.querySelector('.project-thumb-img');
        if (project && img && project.thumbnail) {
            img.src = project.thumbnail;
        }
    });

    // Open modal
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            const project = projects[projectId];

            if (project) {
                currentProject = project;
                currentCarouselIndex = 0;
                populateModal(project);
                openModal();
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
            return;
        }
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function populateModal(project) {
        const modalPlatformIcon = modal.querySelector('.modal-platform-icon');

        // Title and Icon
        modal.querySelector('.modal-title').textContent = project.title;
        modal.querySelector('.modal-tagline').textContent = project.tagline || '';
        if (project.iconImage) {
            modalPlatformIcon.innerHTML = `<img src="${project.iconImage}" alt="${project.title} logo" class="project-logo-icon modal-logo-icon">`;
        } else {
            modalPlatformIcon.textContent = project.icon;
        }

        // Description
        modal.querySelector('.modal-description').textContent = project.description;

        // Tech stack
        const techContainer = modal.querySelector('.modal-tech');
        techContainer.innerHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');

        // Update links
        const liveLink = modal.querySelector('.modal-live');
        const githubLink = modal.querySelector('.modal-github');
        if (project.link) {
            liveLink.href = project.link;
            liveLink.style.display = 'inline-flex';
        } else {
            liveLink.removeAttribute('href');
            liveLink.style.display = 'none';
        }

        if (project.github) {
            githubLink.href = project.github;
            githubLink.style.display = 'inline-flex';
        } else {
            githubLink.removeAttribute('href');
            githubLink.style.display = 'none';
        }

        // Carousel
        populateCarousel(project);
    }

    function populateCarousel(project) {
        const slidesContainer = modal.querySelector('.carousel-slides');

        slidesContainer.innerHTML = project.images.map((image, index) =>
            `<button class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Open image ${index + 1}"><img src="${image}" alt="${project.title} preview ${index + 1}" loading="lazy" decoding="async"></button>`
        ).join('');

        const prevBtn = modal.querySelector('.carousel-prev');
        const nextBtn = modal.querySelector('.carousel-next');
        prevBtn.onclick = previousSlide;
        nextBtn.onclick = nextSlide;

        slidesContainer.querySelectorAll('.carousel-slide').forEach(slide => {
            const slideImage = slide.querySelector('img');
            if (slideImage) {
                const markLoaded = () => slide.classList.add('loaded');
                if (slideImage.complete && slideImage.naturalWidth > 0) {
                    markLoaded();
                } else {
                    slideImage.addEventListener('load', markLoaded, { once: true });
                    slideImage.addEventListener('error', markLoaded, { once: true });
                }
            }

            slide.addEventListener('click', () => {
                const index = Number(slide.dataset.index);
                goToSlide(index);
                openLightbox(project.images[index]);
            });
        });

        goToSlide(0);
    }

    function getVisibleSlides() {
        if (window.innerWidth <= 480) return 2;
        if (window.innerWidth <= 992) return 3;
        return 4;
    }

    function goToSlide(index) {
        const slides = modal.querySelectorAll('.carousel-slide');
        if (!slides.length) return;

        const totalSlides = slides.length;
        const visibleSlides = Math.min(getVisibleSlides(), totalSlides);
        const maxStartIndex = Math.max(0, totalSlides - visibleSlides);

        currentCarouselIndex = (index + totalSlides) % totalSlides;
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentCarouselIndex].classList.add('active');

        const startIndex = Math.min(currentCarouselIndex, maxStartIndex);
        const offset = (startIndex * 100) / visibleSlides;
        const slidesContainer = modal.querySelector('.carousel-slides');
        slidesContainer.style.transform = `translateX(-${offset}%)`;
    }

    function openLightbox(src) {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = src;
        lightboxZoomed = false;
        lightboxImage.classList.remove('zoomed');
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        if (!lightbox || !lightboxImage) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxZoomed = false;
        lightboxImage.classList.remove('zoomed');
        lightboxImage.src = '';
    }

    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') previousSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    window.addEventListener('resize', () => {
        if (modal.classList.contains('active')) {
            goToSlide(currentCarouselIndex);
        }
    });

    const carouselContainer = modal.querySelector('.carousel-container');
    carouselContainer.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    carouselContainer.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].clientX;
        const delta = touchEndX - touchStartX;
        if (Math.abs(delta) < 40) return;
        if (delta > 0) {
            previousSlide();
        } else {
            nextSlide();
        }
    }, { passive: true });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    if (lightboxImage) {
        lightboxImage.addEventListener('click', (event) => {
            event.stopPropagation();
            lightboxZoomed = !lightboxZoomed;
            lightboxImage.classList.toggle('zoomed', lightboxZoomed);
        });

        lightboxImage.addEventListener('wheel', (event) => {
            if (!lightbox || !lightbox.classList.contains('active')) return;
            event.preventDefault();
            lightboxZoomed = event.deltaY < 0;
            lightboxImage.classList.toggle('zoomed', lightboxZoomed);
        }, { passive: false });
    }

    function previousSlide() {
        goToSlide(currentCarouselIndex - 1);
    }

    function nextSlide() {
        goToSlide(currentCarouselIndex + 1);
    }

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        closeLightbox();
        document.body.style.overflow = '';
    }
}

// =========================================
// SCROLL REVEAL ANIMATIONS
// =========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.about-card, .skill-card, .contact-card');

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // Stagger animation for grid items
    const grids = document.querySelectorAll('.skills-grid');
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.skill-card');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.05}s`;
        });
    });
}

// =========================================
// CONTACT FORM
// =========================================
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    const EMAILJS_CONFIG = {
        publicKey: 'jwAK1lWQGhjwf2PL8',
        serviceId: 'service_jsn6z3m',
        templateId: 'template_pyqy19b'
    };

    const config = window.EMAILJS_CONFIG || EMAILJS_CONFIG;
    const isEmailJsConfigured = !!(
        window.emailjs &&
        config.publicKey && !config.publicKey.startsWith('YOUR_') &&
        config.serviceId && !config.serviceId.startsWith('YOUR_') &&
        config.templateId && !config.templateId.startsWith('YOUR_')
    );

    if (isEmailJsConfigured) {
        window.emailjs.init({ publicKey: config.publicKey });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            message: form.querySelector('#message').value
        };

        // Simulate form submission
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const handleSuccess = () => {
            submitBtn.textContent = 'Message Sent!';
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1800);
        };

        const handleFailure = () => {
            submitBtn.textContent = 'Send Failed';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1800);
        };

        if (isEmailJsConfigured) {
            window.emailjs
                .send(config.serviceId, config.templateId, {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: 'Muhammad Saad',
                    reply_to: formData.email,
                    sent_at: new Date().toLocaleString()
                })
                .then(handleSuccess)
                .catch(handleFailure);
        } else {
            // Fallback mode if credentials are not configured yet.
            setTimeout(handleSuccess, 900);
            console.log('EmailJS not configured yet. Add credentials in window.EMAILJS_CONFIG.');
            console.log('Form submitted (fallback):', formData);
        }
    });

    // Input animations
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// =========================================
// SCROLL INDICATOR
// =========================================
function initScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');

    if (!indicator) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            indicator.style.opacity = '0';
            indicator.style.visibility = 'hidden';
        } else {
            indicator.style.opacity = '1';
            indicator.style.visibility = 'visible';
        }
    });

    indicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    const toggleButton = () => {
        if (window.pageYOffset > 320) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleButton);
    toggleButton();

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =========================================
// UTILITY FUNCTIONS
// =========================================

// Smooth scroll for anchor links
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

// Prevent right-click on images (optional)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => e.preventDefault());
});

// Removed parallax and delayed body-load animation to prevent scroll jank and section paint artifacts.

// =========================================
// THEME TOGGLE (Optional future feature)
// =========================================
function initThemeToggle() {
    // Placeholder for dark mode toggle
    // Can be implemented if requested
}

// =========================================
// CURSOR EFFECTS (Optional luxury feature)
// =========================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Uncomment to enable custom cursor
// initCustomCursor();
