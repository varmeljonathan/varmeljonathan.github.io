// modal-fix.js - Robust modal implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modal fix script loaded');
    
    // Add click event listeners directly to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const modalTrigger = this.querySelector('.modal-trigger');
            if (modalTrigger) {
                const modalId = modalTrigger.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    console.log('Modal opened via card click:', modalId);
                }
            }
        });
    });
    
    // Modal trigger buttons
    document.querySelectorAll('.modal-trigger').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the card click
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                console.log('Modal opened via button click:', modalId);
            }
        });
    });
    
    // Close buttons
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                console.log('Modal closed via close button:', modal.id);
            }
        });
    });
    
    // Close on outside click
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('Modal closed via outside click');
        }
    });
    
    // Define global functions for direct access
    window.openModal = function(modalId) {
        console.log('Manual open modal called for:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeModal = function(modalId) {
        console.log('Manual close modal called for:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
});