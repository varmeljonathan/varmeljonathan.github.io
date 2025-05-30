document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const contactForm = document.getElementById('contactForm');
    
    console.log('Modal triggers found:', modalTriggers.length);
    console.log('Close buttons found:', closeModalButtons.length);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle Theme
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Project Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            console.log('Filter selected:', filter);
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Modal Functions - using direct event listeners
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            console.log('Opening modal:', modalId);
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                console.error('Modal not found:', modalId);
            }
        });
    });
    
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            console.log('Closing modal:', modal.id);
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            console.log('Closing modal by outside click');
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            alert('Thanks for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .project-card, .about-text p, .skill-item, .contact-item, .github-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.section-title, .project-card, .about-text p, .skill-item, .contact-item, .github-section');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Call on initial load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const skillBars = this.querySelectorAll('.skill-level');
            skillBars.forEach(bar => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = bar.style.width; // Trigger reflow
            });
        });
    });
    
    // Enhance GitHub buttons with animation
    const githubButtons = document.querySelectorAll('.github-btn');
    githubButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.innerHTML = '<i class="fab fa-github"></i>';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-code-branch"></i>';
            }, 500);
            setTimeout(() => {
                this.innerHTML = '<i class="fab fa-github"></i>';
            }, 1000);
        });
    });
    
    console.log('All initialization complete');
});