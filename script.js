document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active');

            // Mobile menu styling when active
            if (nav.classList.contains('active')) {
                nav.style.display = 'block';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
                nav.style.padding = '2rem';
                nav.style.textAlign = 'center';

                const list = nav.querySelector('.nav__list');
                list.style.flexDirection = 'column';
                list.style.gap = '2rem';
            } else {
                nav.style.display = '';
                nav.style.position = '';
                nav.style.top = '';
                nav.style.left = '';
                nav.style.width = '';
                nav.style.backgroundColor = '';
                nav.style.padding = '';

                const list = nav.querySelector('.nav__list');
                list.style.flexDirection = '';
                list.style.gap = '';
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.click();
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
        observer.observe(el);
    });
});

