// feedback.js - Feedback Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const feedbackItems = document.querySelectorAll('.feedback-item');
            
            feedbackItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log(`Filter changed: ${this.value}`);
            // In a real app, this would filter the feedback items
        });
    });
    
    // New Feedback button
    const newFeedbackBtn = document.querySelector('.header-actions .btn-primary');
    if (newFeedbackBtn) {
        newFeedbackBtn.addEventListener('click', function() {
            alert('This would open a new feedback creation modal in a real application.');
        });
    }
    
    // Generate AI feedback
    const generateAIBtn = document.querySelector('.form-actions .btn-outline');
    if (generateAIBtn) {
        generateAIBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('AI feedback generated successfully! The feedback would appear here in a real application.');
                this.innerHTML = '<i class="fas fa-magic"></i> Generate with AI';
                this.disabled = false;
            }, 2000);
        });
    }
    
    console.log('Feedback page loaded - Feedback management system active');
});