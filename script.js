document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initSkillBars();
    initMobileMenu();
    initFormHandling();
    initSmoothScrolling();
});
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const backBtns = document.querySelectorAll('.back-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            updateActiveNavLink(this);
        });
    });
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            updateActiveNavLink(document.querySelector(`[data-section="${targetSection}"]`));
                window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
                setTimeout(() => {
                triggerAnimations(targetSection);
            }, 100);
        }
    }
    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
}
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                    if (entry.target.closest('.skills-card')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
}
function triggerAnimations(section) {
    const fadeElements = section.querySelectorAll('.fade-in-section');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
                if (el.closest('.skills-card')) {
                animateSkillBars(el);
            }
        }, index * 200);
    });
}
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
    });
}
function animateSkillBars(section) {
    const skillBars = section.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
}
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}
function initFormHandling() {
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            setTimeout(() => {
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.padding = '15px';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.marginBottom = '20px';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '500';
    if (type === 'success') {
        messageDiv.style.background = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else {
        messageDiv.style.background = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }
    const form = document.querySelector('.form');
    form.insertBefore(messageDiv, form.firstChild);
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}
function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !href.includes('data-section')) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
});
function addParallaxEffect() {
    const homeSection = document.querySelector('.home-section');
    const profileImage = document.querySelector('.profile-image');
    window.addEventListener('scroll', function() {
        if (homeSection.classList.contains('active')) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (profileImage) {
                profileImage.style.transform = `translateY(${rate}px)`;
            }
        }
    });
}
function initScrollingTagline() {
    const tagline = document.querySelector('.home-tagline');
    if (!tagline) return;
    const taglines = [
        'CSE Student & Aspiring Developer',
        'Problem Solving Enthusiast',
        'Web Development Learner',
        'Future Software Engineer'
    ];
    let currentIndex = 0;
    let isTyping = false;
    function typeText(text, callback) {
        if (isTyping) return;
        isTyping = true;
        tagline.textContent = '';
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 80); 
            } else {
                isTyping = false;
                setTimeout(() => {
                    eraseText(callback);
                }, 1500);
            }
        }
        typeChar();
    }
    function eraseText(callback) {
        if (isTyping) return;
        isTyping = true;
        const currentText = tagline.textContent;
        let i = currentText.length; 
        function eraseChar() {
            if (i > 0) {
                tagline.textContent = currentText.substring(0, i - 1);
                i--;
                setTimeout(eraseChar, 50); 
            } else {
                isTyping = false;
                setTimeout(callback, 200);
            }
        }
        
        eraseChar();
    }
    function cycleTaglines() {
        typeText(taglines[currentIndex], () => {
            currentIndex = (currentIndex + 1) % taglines.length;
            cycleTaglines(); 
        });
    }
    setTimeout(() => {
        cycleTaglines();
    }, 1000);
}
document.addEventListener('DOMContentLoaded', function() {
    const homeSection = document.querySelector('#home');
    if (homeSection && homeSection.classList.contains('active')) {
        setTimeout(() => {
            initScrollingTagline();
            addParallaxEffect();
        }, 500);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');   
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
function addRippleEffect() {
    const buttons = document.querySelectorAll('.back-btn, .submit-btn, .project-link, .profile-link'); 
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
document.addEventListener('DOMContentLoaded', addRippleEffect);
