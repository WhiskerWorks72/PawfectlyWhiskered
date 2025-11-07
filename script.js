// WhiskerWorks - Vanilla JavaScript for interactive elements

// Constants
const NAV_HEIGHT = 64; // Height of fixed navigation in pixels

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - NAV_HEIGHT;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top button
const scrollTopButton = document.getElementById('scroll-top');

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

// Combined scroll handler for better performance
const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    
    // Show/hide scroll to top button
    if (scrollPosition > 300) {
        scrollTopButton.classList.remove('opacity-0', 'pointer-events-none');
        scrollTopButton.classList.add('opacity-100');
    } else {
        scrollTopButton.classList.add('opacity-0', 'pointer-events-none');
        scrollTopButton.classList.remove('opacity-100');
    }
    
    // Update active navigation link
    let current = '';
    const scrollOffset = scrollPosition + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollOffset >= sectionTop && scrollOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-whisker-orange', 'font-semibold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-whisker-orange', 'font-semibold');
        }
    });
};

window.addEventListener('scroll', handleScroll);

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate stats counter when scrolling into view
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50; // Complete in 50 steps
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

// Observe all stat counters
document.querySelectorAll('[data-count]').forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add simple fade-in animation for hero text
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.animate-fade-in');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
});

console.log('🐾 WhiskerWorks initialized successfully!');
