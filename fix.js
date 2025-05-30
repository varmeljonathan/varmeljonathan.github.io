// Direct modal function implementation that doesn't rely on window.openModal
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners directly to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            // Get the associated modal ID from the View Details button
            const detailsBtn = this.querySelector('.btn[onclick]');
            if (detailsBtn) {
                const onclickAttr = detailsBtn.getAttribute('onclick');
                // Extract the modalId from openModal('modalId')
                const modalId = onclickAttr.match(/openModal\(['"](.+?)['"]\)/)[1];
                
                // Show the modal directly
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
    
    // Close buttons
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            // Find the parent modal
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close on outside click
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Also implement standalone open/close functions for direct calls
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Add direct click handlers to "View Details" buttons
    document.querySelectorAll('.btn[onclick*="openModal"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the card click
            const onclickAttr = this.getAttribute('onclick');
            const modalId = onclickAttr.match(/openModal\(['"](.+?)['"]\)/)[1];
            
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
});