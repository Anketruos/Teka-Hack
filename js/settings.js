// settings.js - Settings Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    loadSavedSettings();
    
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
            const settingName = parent.querySelector('h4').textContent;
            
            if (this.checked) {
                parent.classList.add('active');
                console.log(`${settingName} enabled`);
            } else {
                parent.classList.remove('active');
                console.log(`${settingName} disabled`);
            }
            
            // Save setting
            saveSettingValue(settingName, this.checked);
        });
    });
    
    // Form inputs change handlers
    const formInputs = document.querySelectorAll('.form-input, .setting-input');
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            const label = this.closest('.form-group, .setting-item')?.querySelector('label, h4')?.textContent;
            if (label) {
                saveSettingValue(label, this.value);
                console.log(`${label} changed to: ${this.value}`);
            }
        });
    });
    
    // Sliders
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const settingName = this.className.replace('-slider', '');
            saveSettingValue(settingName, this.value);
            
            // Update visual feedback for sliders
            if (this.classList.contains('font-slider')) {
                document.documentElement.style.fontSize = `${this.value}px`;
            }
        });
    });
    
    // Theme options
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active from all theme options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const themeName = this.querySelector('span').textContent.toLowerCase();
            saveSettingValue('theme', themeName);
            
            // Apply theme immediately
            if (themeName === 'dark') {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
            } else if (themeName === 'light') {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
            }
        });
    });
    
    // Profile form save
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        const saveProfileBtn = profileForm.querySelector('.btn-primary');
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const formData = {
                    firstName: profileForm.querySelector('input[value="John"]').value,
                    lastName: profileForm.querySelector('input[value="Doe"]').value,
                    email: profileForm.querySelector('input[type="email"]').value,
                    institution: profileForm.querySelector('input[value="University of Technology"]').value,
                    role: profileForm.querySelector('select').value
                };
                
                // Validate required fields
                if (!formData.firstName || !formData.lastName || !formData.email) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // Show loading state
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
                this.disabled = true;
                
                setTimeout(() => {
                    // Save to localStorage
                    localStorage.setItem('userProfile', JSON.stringify(formData));
                    localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
                    localStorage.setItem('userEmail', formData.email);
                    localStorage.setItem('userRole', formData.role);
                    localStorage.setItem('userInstitution', formData.institution);
                    
                    // Update user profile in header
                    if (window.updateUserProfile) {
                        window.updateUserProfile();
                    }
                    
                    this.innerHTML = originalText;
                    this.disabled = false;
                    
                    alert('Profile updated successfully!');
                }, 1500);
            });
        }
    }
    
    // Security buttons
    const changePasswordBtn = document.querySelector('.security-settings .btn-outline');
    if (changePasswordBtn && changePasswordBtn.textContent.includes('Change Password')) {
        changePasswordBtn.addEventListener('click', function() {
            showChangePasswordModal();
        });
    }
    
    const manageSessionsBtn = document.querySelector('.security-settings .btn-outline:last-child');
    if (manageSessionsBtn && manageSessionsBtn.textContent.includes('Manage Sessions')) {
        manageSessionsBtn.addEventListener('click', function() {
            showSessionsModal();
        });
    }
    
    // Integration toggles
    const integrationToggles = document.querySelectorAll('.integration-item .toggle-switch input');
    integrationToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const integrationName = this.closest('.integration-item').querySelector('h4').textContent;
            const isEnabled = this.checked;
            
            saveSettingValue(`integration_${integrationName}`, isEnabled);
            
            if (isEnabled) {
                alert(`${integrationName} integration enabled! You can now sync data with ${integrationName}.`);
            } else {
                alert(`${integrationName} integration disabled.`);
            }
        });
    });
    
    // Add webhook button
    const addWebhookBtn = document.querySelector('.api-settings .btn-outline');
    if (addWebhookBtn && addWebhookBtn.textContent.includes('Add Webhook')) {
        addWebhookBtn.addEventListener('click', function() {
            showAddWebhookModal();
        });
    }
    
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
                
                alert('API key copied to clipboard!');
            }).catch(() => {
                // Fallback for browsers that don't support clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = apiKey;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('API key copied to clipboard!');
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
            
            // Collect all settings
            const allSettings = collectAllSettings();
            
            setTimeout(() => {
                // Save all settings
                localStorage.setItem('appSettings', JSON.stringify(allSettings));
                
                this.innerHTML = originalText;
                this.disabled = false;
                
                alert('All settings have been saved successfully!');
            }, 1500);
        });
    }
    
    // Cancel button
    const cancelBtn = document.querySelector('.settings-actions .btn-outline');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to discard all changes?')) {
                location.reload();
            }
        });
    }
    
    // Helper functions
    function saveSettingValue(key, value) {
        const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
        settings[key] = value;
        localStorage.setItem('appSettings', JSON.stringify(settings));
    }
    
    function loadSavedSettings() {
        const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        
        // Load profile data
        if (userProfile.firstName) {
            const firstNameInput = document.querySelector('input[value="John"]');
            if (firstNameInput) firstNameInput.value = userProfile.firstName;
        }
        
        if (userProfile.lastName) {
            const lastNameInput = document.querySelector('input[value="Doe"]');
            if (lastNameInput) lastNameInput.value = userProfile.lastName;
        }
        
        if (userProfile.email) {
            const emailInput = document.querySelector('input[type="email"]');
            if (emailInput) emailInput.value = userProfile.email;
        }
        
        // Load other settings
        Object.keys(settings).forEach(key => {
            const element = document.querySelector(`[data-setting="${key}"]`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = settings[key];
                } else {
                    element.value = settings[key];
                }
            }
        });
    }
    
    function collectAllSettings() {
        const settings = {};
        
        // Collect form inputs
        document.querySelectorAll('.form-input, .setting-input').forEach(input => {
            const key = input.name || input.id || input.placeholder;
            if (key) {
                settings[key] = input.value;
            }
        });
        
        // Collect toggles
        document.querySelectorAll('.toggle-switch input').forEach(toggle => {
            const key = toggle.closest('.setting-item')?.querySelector('h4')?.textContent;
            if (key) {
                settings[key] = toggle.checked;
            }
        });
        
        // Collect sliders
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            const key = slider.className;
            settings[key] = slider.value;
        });
        
        return settings;
    }
    
    function showChangePasswordModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-lock"></i> Change Password</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" class="form-input" id="currentPassword" placeholder="Enter current password">
                    </div>
                    <div class="form-group">
                        <label>New Password</label>
                        <input type="password" class="form-input" id="newPassword" placeholder="Enter new password" minlength="8">
                    </div>
                    <div class="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" class="form-input" id="confirmPassword" placeholder="Confirm new password">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline modal-close">Cancel</button>
                    <button class="btn btn-primary" id="changePasswordBtn">Change Password</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        modal.querySelector('#changePasswordBtn').addEventListener('click', function() {
            const currentPassword = modal.querySelector('#currentPassword').value;
            const newPassword = modal.querySelector('#newPassword').value;
            const confirmPassword = modal.querySelector('#confirmPassword').value;
            
            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match.');
                return;
            }
            
            if (newPassword.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }
            
            // Simulate password change
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Changing...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('Password changed successfully!');
                modal.remove();
            }, 1500);
        });
    }
    
    function showSessionsModal() {
        const sessions = [
            { device: 'Chrome on Windows', location: 'New York, US', lastActive: '2 minutes ago', current: true },
            { device: 'Safari on iPhone', location: 'New York, US', lastActive: '1 hour ago', current: false },
            { device: 'Firefox on Mac', location: 'San Francisco, US', lastActive: '2 days ago', current: false }
        ];
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h3><i class="fas fa-devices"></i> Active Sessions</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="sessions-list">
                        ${sessions.map(session => `
                            <div class="session-item">
                                <div class="session-info">
                                    <h4>${session.device} ${session.current ? '(Current)' : ''}</h4>
                                    <p><i class="fas fa-map-marker-alt"></i> ${session.location}</p>
                                    <p><i class="fas fa-clock"></i> Last active: ${session.lastActive}</p>
                                </div>
                                <div class="session-actions">
                                    ${!session.current ? '<button class="btn btn-outline btn-sm">Revoke</button>' : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline">Revoke All Other Sessions</button>
                    <button class="btn btn-primary modal-close">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    function showAddWebhookModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus"></i> Add Webhook</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Webhook URL</label>
                        <input type="url" class="form-input" placeholder="https://your-app.com/webhook">
                    </div>
                    <div class="form-group">
                        <label>Events</label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" checked> Feedback Generated</label>
                            <label><input type="checkbox"> Report Created</label>
                            <label><input type="checkbox"> Student Performance Update</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Secret Key (Optional)</label>
                        <input type="text" class="form-input" placeholder="Enter secret key for verification">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline modal-close">Cancel</button>
                    <button class="btn btn-primary">Add Webhook</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        modal.querySelector('.btn-primary').addEventListener('click', function() {
            alert('Webhook added successfully!');
            modal.remove();
        });
    }
    
    console.log('Settings page loaded - Settings management active');
});