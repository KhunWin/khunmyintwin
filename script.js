
// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling with enhanced physics
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Using better easing function
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Enhanced scroll animations with sequential delays
const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
const timelineItems = document.querySelectorAll('.timeline-item');
const haecoCars = document.querySelectorAll('.haeco-card');

const applyAnimationWithDelay = (elements, baseDelay = 0) => {
    elements.forEach((element, index) => {
        const delay = baseDelay + (index * 0.15); // 150ms staggered delay
        element.style.transitionDelay = `${delay}s`;
    });
};

// Apply staggered delays to timeline items and HAECO cards
applyAnimationWithDelay(timelineItems);
applyAnimationWithDelay(haecoCars);

// Observer configuration
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

// Create observer for all animated elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that need animations
fadeElements.forEach(element => {
    observer.observe(element);
});

timelineItems.forEach(item => {
    observer.observe(item);
});

haecoCars.forEach(card => {
    observer.observe(card);
});

// Active navigation link based on scroll position with better detection
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    let minDistance = Number.MAX_VALUE;
    
    const scrollPosition = window.scrollY + 200; // Adjust offset for better accuracy
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Calculate distance to section
        const distance = Math.abs(scrollPosition - sectionTop);
        
        // Check if we're within this section or if this is the closest section
        if ((scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) || 
            distance < minDistance) {
            minDistance = distance;
            currentSectionId = sectionId;
        }
    });
    
    // Update active class
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Add debounce to scroll events for better performance
function debounce(func, wait = 15, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Use debounced scroll handler
window.addEventListener('scroll', debounce(function() {
    updateActiveLink();
}, 10));

// Initial active link on page load
updateActiveLink();

// Parallax effect on hero section
function parallax() {
    const hero = document.querySelector('#hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
}

window.addEventListener('scroll', debounce(parallax, 10));
