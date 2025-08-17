/**
 * ZEBRIUS TECHNOLOGIES - MODERN IT SERVICES WEBSITE
 * Enhanced with vibrant animations and professional styling
 */

// Configuration
const CONFIG = {
    // Rotating taglines for hero section
    taglines: [
        'Transforming businesses through innovative technology solutions',
        'Your trusted partner in digital transformation journey', 
        'Building tomorrow\'s technology solutions today',
        'Empowering growth with cutting-edge IT services'
    ],
    
    // Animation settings
    taglineInterval: 4000, // milliseconds between tagline changes
    heroAnimationDelay: 800, // delay before starting hero animations
    
    // Contact form endpoint
    formEndpoint: 'mailto:zebriustechnologies@gmail.com'
};

// DOM elements
let currentTaglineIndex = 0;
let taglineElement;
let scrollProgressBar;
let navbar;
let titleZebrius;
let titleTechnologies;
let navToggle;
let navMenu;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeAnimations();
    initializeScrollEffects();
    initializeFormHandling();
    initializeMobileMenu();
    initializeServiceAnimations();
    
    // Show page with fade-in effect
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 200);
});

/**
 * Initialize DOM element references
 */
function initializeElements() {
    taglineElement = document.getElementById('rotatingTagline');
    scrollProgressBar = document.getElementById('scrollProgress');
    navbar = document.getElementById('navbar');
    titleZebrius = document.getElementById('titleZebrius');
    titleTechnologies = document.getElementById('titleTechnologies');
    navToggle = document.getElementById('navToggle');
    navMenu = document.getElementById('navMenu');
}

/**
 * Initialize all animations - UPDATED FOR REPEAT ANIMATIONS
 */
function initializeAnimations() {
    // Initialize AOS with REPEAT ANIMATIONS enabled
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: false, // ✅ FIXED: Allow animations to repeat
        mirror: true, // ✅ FIXED: Animate when scrolling both ways  
        offset: 100,
        delay: 0,
        disable: false, // Enable on all devices including mobile
        startEvent: 'DOMContentLoaded',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99
    });
    
    // Enhanced scroll-based animation refresh
    let scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);        
        }
        scrollTimer = setTimeout(function() {
            AOS.refresh();
        }, 150);
    });
    
    // Refresh animations when clicking nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        });
    });
    
    // Start company name animation
    setTimeout(() => {
        startCompanyNameAnimation();
    }, CONFIG.heroAnimationDelay);
    
    // Start rotating taglines after company name animation
    setTimeout(() => {
        startTaglineRotation();
    }, CONFIG.heroAnimationDelay + 2500);
    
    // Create floating particles
    createFloatingParticles();
    
    // Initialize scroll-triggered animations
    initializeScrollAnimations();
}

/**
 * Animate company name reveal - Zebrius first, then Technologies
 */
function startCompanyNameAnimation() {
    if (!titleZebrius || !titleTechnologies) return;
    
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        // Animate "Zebrius" first
        gsap.to(titleZebrius, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.5
        });
        
        // Animate "Technologies" second
        gsap.to(titleTechnologies, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 1.3
        });
    } else {
        // Fallback animation without GSAP
        setTimeout(() => {
            titleZebrius.style.opacity = '1';
            titleZebrius.style.transform = 'translateY(0)';
            titleZebrius.style.transition = 'all 1.2s ease-out';
        }, 500);
        
        setTimeout(() => {
            titleTechnologies.style.opacity = '1';
            titleTechnologies.style.transform = 'translateY(0)';
            titleTechnologies.style.transition = 'all 1.2s ease-out';
        }, 1300);
    }
}

/**
 * Create floating particles effect
 */
function createFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 1;
        `;
        
        particlesContainer.appendChild(particle);
        
        // Animate particle with GSAP if available, otherwise use CSS
        if (typeof gsap !== 'undefined') {
            gsap.to(particle, {
                y: -150,
                x: Math.random() * 300 - 150,
                opacity: 0,
                duration: Math.random() * 4 + 3,
                repeat: -1,
                delay: Math.random() * 3,
                ease: "none"
            });
        } else {
            // CSS fallback animation
            particle.style.animation = `float ${Math.random() * 4 + 3}s infinite linear`;
        }
    }
}

/**
 * Initialize scroll-triggered animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for service cards
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.service-card, .about-text, .contact-item');
    animatableElements.forEach(el => observer.observe(el));
}

/**
 * Animate service cards with stagger effect
 */
function animateServiceCard(card) {
    const cards = document.querySelectorAll('.service-card');
    const cardIndex = Array.from(cards).indexOf(card);
    
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, cardIndex * 100);
}

/**
 * Initialize service-specific animations
 */
function initializeServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            if (card.querySelector('.service-icon')) {
                card.querySelector('.service-icon').style.transform = 'rotateY(180deg) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.querySelector('.service-icon')) {
                card.querySelector('.service-icon').style.transform = 'rotateY(0) scale(1)';
            }
        });
    });
}

/**
 * Rotating tagline animation in hero section
 */
function startTaglineRotation() {
    if (!taglineElement || CONFIG.taglines.length === 0) return;
    
    // Show first tagline immediately
    showTagline(0);
    
    // Set up rotation interval
    const rotationInterval = setInterval(() => {
        hideCurrentTagline(() => {
            currentTaglineIndex = (currentTaglineIndex + 1) % CONFIG.taglines.length;
            showTagline(currentTaglineIndex);
        });
    }, CONFIG.taglineInterval);
    
    // Store interval ID for cleanup
    window.taglineInterval = rotationInterval;
}

/**
 * Show tagline with animation
 */
function showTagline(index) {
    if (!taglineElement) return;
    
    taglineElement.textContent = CONFIG.taglines[index];
    taglineElement.classList.add('active');
    
    // Add typewriter effect for better visual appeal
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(taglineElement, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
    }
}

/**
 * Hide current tagline with animation
 */
function hideCurrentTagline(callback) {
    if (!taglineElement) return;
    
    taglineElement.classList.remove('active');
    
    if (typeof gsap !== 'undefined') {
        gsap.to(taglineElement, {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power2.in",
            onComplete: callback
        });
    } else {
        setTimeout(callback, 400);
    }
}

/**
 * Initialize scroll-based effects
 */
function initializeScrollEffects() {
    // Scroll progress bar
    window.addEventListener('scroll', throttle(updateScrollProgress, 10));
    
    // Navbar show/hide on scroll with improved logic
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', throttle(() => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 150) {
                if (scrollTop > lastScrollTop + 10) {
                    // Scrolling down - hide navbar
                    navbar.classList.remove('visible');
                } else if (scrollTop < lastScrollTop - 10) {
                    // Scrolling up - show navbar
                    navbar.classList.add('visible');
                }
            } else {
                // At top - hide navbar
                navbar.classList.remove('visible');
            }
            
            lastScrollTop = scrollTop;
        }, 10);
    }, 10));
    
    // Parallax effect for hero background
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg');
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 16)); // ~60fps
    
    // Add scroll-based fade effects for sections
    initializeSectionFadeEffects();
}

/**
 * Initialize section fade effects on scroll
 */
function initializeSectionFadeEffects() {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, options);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Update scroll progress bar
 */
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min((scrollTop / documentHeight) * 100, 100);
    
    if (scrollProgressBar) {
        scrollProgressBar.style.width = progress + '%';
    }
}

/**
 * Initialize mobile menu with enhanced functionality
 */
function initializeMobileMenu() {
    if (!navToggle || !navMenu) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMobileMenu();
    });
    
    // Close menu when clicking on links
    navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
    navMenu.classList.add('active');
    navToggle.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

/**
 * Initialize form handling with enhanced validation
 */
function initializeFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', debounce(clearFieldError, 300));
        input.addEventListener('focus', clearFieldError);
    });
    
    // Add real-time validation for email
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', debounce((e) => {
            if (e.target.value && !isValidEmail(e.target.value)) {
                showFieldError(e.target, 'Please enter a valid email address');
            }
        }, 500));
    }
    
    // Add real-time validation for phone
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', debounce((e) => {
            if (e.target.value && !isValidPhone(e.target.value)) {
                showFieldError(e.target, 'Please enter a valid phone number');
            }
        }, 500));
    }
}

/**
 * Enhanced field validation
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Basic validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    if (field.tagName === 'SELECT' && field.hasAttribute('required') && !value) {
        showFieldError(field, 'Please select an option');
        return false;
    }
    
    if (field.name === 'subject' && value.length < 3) {
        showFieldError(field, 'Subject must be at least 3 characters long');
        return false;
    }
    
    if (field.name === 'message' && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters long');
        return false;
    }
    
    return true;
}

/**
 * Clear field error styling
 */
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
}

/**
 * Show field error with improved styling
 */
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Don't show notification for every field error to avoid spam
    if (!field.hasAttribute('data-error-shown')) {
        field.setAttribute('data-error-shown', 'true');
        setTimeout(() => {
            field.removeAttribute('data-error-shown');
        }, 3000);
        
        showNotification(message, 'error');
    }
}

/**
 * Enhanced email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone validation for Indian numbers
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

/**
 * Enhanced form submission handler
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    let firstError = null;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
            if (!firstError) {
                firstError = input;
            }
        }
    });
    
    if (!isValid) {
        showNotification('Please fix the errors in the form', 'error');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission delay
    setTimeout(() => {
        try {
            console.log('Form data:', data);
            
            // Create enhanced mailto link
            const serviceText = data.service ? 
                data.service.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ') : 'General Inquiry';
            
            const subject = encodeURIComponent(`[${serviceText}] ${data.subject}`);
            const body = encodeURIComponent(`
Dear Zebrius Technologies Team,

I am reaching out regarding your ${serviceText.toLowerCase()} services.

Contact Details:
────────────────
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Service Interest: ${serviceText}

Subject: ${data.subject}

Message:
────────
${data.message}

────────────────
This message was sent from the Zebrius Technologies website contact form on ${new Date().toLocaleDateString()}.

Best regards,
${data.name}
            `);
            
            // Open mailto link with updated email
            window.location.href = `mailto:zebriustechnologies@gmail.com?subject=${subject}&body=${body}`;
            
            // Reset form
            form.reset();
            showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
            
            // Track form submission (if analytics is implemented)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': serviceText
                });
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('There was an error sending your message. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
        
    }, 2000);
}

/**
 * Enhanced notification system
 */
function showNotification(message, type = 'info', duration = 6000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="${iconMap[type] || iconMap.info}"></i>
        </div>
        <div class="notification-content">
            <span>${message}</span>
        </div>
        <button onclick="closeNotification(this)" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after specified duration
    setTimeout(() => {
        closeNotification(notification.querySelector('button'));
    }, duration);
}

/**
 * Close notification function
 */
function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification && notification.parentElement) {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }
}

/**
 * Utility function: Smooth scroll to contact section
 */
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = contactSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Utility function: Smooth scroll to any section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = section.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Refresh AOS after navigation for immediate animation trigger
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
}

/**
 * Handle apply button clicks for job applications
 */
function handleJobApplication(event, jobTitle) {
    event.preventDefault();
    
    const subject = encodeURIComponent(`Job Application - ${jobTitle}`);
    const body = encodeURIComponent(`
Dear Zebrius Technologies Hiring Team,

I am interested in applying for the ${jobTitle} position advertised on your website.

Please find my details below:
────────────────────────
Name: [Your Full Name]
Email: [Your Email Address]
Phone: [Your Phone Number]
Current Location: [Your City, State]
Experience: [Years of relevant experience]
Current Role: [Your current position]

Key Skills:
• [Skill 1]
• [Skill 2]
• [Skill 3]

Why I'm interested:
[Brief explanation of your interest in the role and company]

I have attached my resume and would be happy to discuss my qualifications further at your convenience.

Thank you for considering my application.

Best regards,
[Your Name]

────────────────────────
This application was sent from the Zebrius Technologies careers page on ${new Date().toLocaleDateString()}.
    `);
    
    window.location.href = `mailto:zebriustechnologies@gmail.com?subject=${subject}&body=${body}`;
    
    // Show confirmation
    showNotification(`Application email opened for ${jobTitle}. Please complete and send the email.`, 'info');
    
    // Track job application (if analytics is implemented)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'job_application_click', {
            'event_category': 'Careers',
            'event_label': jobTitle
        });
    }
}

// Event Listeners and Handlers

// Handle navbar link clicks for smooth scrolling
document.addEventListener('click', function(event) {
    const link = event.target.closest('.nav-link');
    if (link) {
        event.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const sectionId = href.substring(1);
            scrollToSection(sectionId);
        }
    }
});

// Handle apply button clicks
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('apply-btn')) {
        const jobTitle = event.target.closest('.job-item').querySelector('h4').textContent;
        handleJobApplication(event, jobTitle);
    }
});

// Handle service card clicks for mobile
document.addEventListener('click', function(event) {
    const serviceCard = event.target.closest('.service-card');
    if (serviceCard && window.innerWidth <= 768) {
        serviceCard.classList.toggle('mobile-expanded');
    }
});

// Handle resize events for responsive animations
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Refresh AOS on resize to recalculate positions
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Recreate particles for new screen size
        createFloatingParticles();
        
        // Close mobile menu if screen becomes large
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 150);
});

// Handle visibility change (when user switches tabs)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        if (window.taglineInterval) {
            clearInterval(window.taglineInterval);
        }
    } else {
        // Resume animations when tab becomes visible
        setTimeout(() => {
            startTaglineRotation();
        }, 1000);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key closes mobile menu and notifications
    if (event.key === 'Escape') {
        closeMobileMenu();
        
        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            const closeButton = notification.querySelector('button');
            if (closeButton) {
                closeNotification(closeButton);
            }
        });
    }
    
    // Space or Enter on service cards
    if ((event.key === ' ' || event.key === 'Enter') && event.target.classList.contains('service-card')) {
        event.preventDefault();
        event.target.click();
    }
});

// Lazy loading for better performance
const observeImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
};

// Utility Functions

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Add smooth scrolling CSS for browsers that don't support it
 */
if (!CSS.supports('scroll-behavior', 'smooth')) {
    // Polyfill for smooth scrolling
    const scrollToElement = (element, duration = 1000) => {
        const targetPosition = element.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Override scrollToSection for browsers without smooth scroll support
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            scrollToElement(section);
            closeMobileMenu();
        }
    };
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', observeImages);

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }
        }, 0);
    });
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered: ', registration))
        //     .catch(registrationError => console.log('SW registration failed: ', registrationError));
    });
}

// CSS animation fallback for older browsers
if (!window.CSS || !CSS.supports('animation', 'none')) {
    // Add fallback styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .title-zebrius, .title-technologies {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .hero-tagline {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Export functions for potential external use
window.ZebriusTech = {
    scrollToSection,
    scrollToContact,
    showNotification,
    closeNotification,
    handleJobApplication
};

// Scroll-based wheel rotation
document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('rotatingWheel');
    if (!wheel) return;

    let lastScrollTop = 0;
    let currentRotation = 0;
    let ticking = false;

    function updateWheelRotation() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = scrollTop - lastScrollTop;
        
        // Adjust rotation speed (lower number = faster rotation)
        const rotationSpeed = 0.5;
        currentRotation += scrollDelta * rotationSpeed;
        
        // Apply rotation
        wheel.style.transform = `rotate(${currentRotation}deg)`;
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    function requestWheelRotation() {
        if (!ticking) {
            requestAnimationFrame(updateWheelRotation);
            ticking = true;
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', requestWheelRotation, { passive: true });
});

document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.querySelector('.wheel-background');
    const servicesSection = document.querySelector('.services');
    
    if (!wheel || !servicesSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    wheel.classList.add('scroll-fade-in');
                }, 200);
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before section fully visible
    });

    observer.observe(servicesSection);
});

console.log('🚀 Zebrius Technologies website loaded successfully!');
