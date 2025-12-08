// settings.js - Settings Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => {
                p.classList.remove('active');
                p.style.display = 'none';
            });
            
            // Add active class to current tab and pane
            this.classList.add('active');
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
                activePane.style.display = 'block';
            }
        });
    });
    
    // Toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const parent = this.closest('.toggle-item');
            if (this.checked) {
                parent.classList.add('active');
            } else {
                parent.classList.remove('active');
            }
        });
    });
    
    // Copy API key
    const copyBtn = document.querySelector('.api-key .btn-icon');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const apiKey = this.parentElement.querySelector('code').textContent;
            navigator.clipboard.writeText(apiKey).then(() => {
                const originalIcon = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                }, 2000);
            });
        });
    }
    
    // Save all changes button
    const saveAllBtn = document.querySelector('.settings-actions .btn-primary');
    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('All settings have been saved successfully!');
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        });
    }
    
    console.log('Settings page loaded - Settings management active');
});