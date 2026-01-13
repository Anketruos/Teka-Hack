// reports.js - Reports Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Report download functionality
    const downloadButtons = document.querySelectorAll('.icon-btn');
    downloadButtons.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon && icon.classList.contains('fa-download')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                downloadReport(this);
            });
        } else if (icon && icon.classList.contains('fa-share')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                shareReport(this);
            });
        }
    });
    
    // Report preview functionality
    const previewButtons = document.querySelectorAll('.btn-sm');
    previewButtons.forEach(btn => {
        const icon = btn.querySelector('.fa-eye');
        if (icon) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                previewReport(this);
            });
        }
    });
    
    // Generate report form
    const generateReportBtn = document.querySelector('.report-generator .btn-primary');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get all form values
            const reportTypeSelect = document.querySelector('.report-generator .form-group:nth-child(1) select');
            const timePeriodSelect = document.querySelector('.report-generator .form-group:nth-child(2) select');
            const studentsSelect = document.querySelector('.report-generator .form-group:nth-child(3) select');
            
            const reportType = reportTypeSelect ? reportTypeSelect.value : '';
            const timePeriod = timePeriodSelect ? timePeriodSelect.value : '';
            const students = studentsSelect ? studentsSelect.value : '';
            
            // Validate required fields
            if (!reportType || reportType === 'Select Report Type') {
                alert('Please select a report type.');
                reportTypeSelect.focus();
                return;
            }
            
            if (!timePeriod || timePeriod === 'Select Period') {
                alert('Please select a time period.');
                timePeriodSelect.focus();
                return;
            }
            
            // Get selected format
            const formatRadios = document.querySelectorAll('.format-options input[type="radio"]');
            let selectedFormat = 'PDF';
            formatRadios.forEach(radio => {
                if (radio.checked) {
                    const formatLabel = radio.parentElement.querySelector('.format-label');
                    selectedFormat = formatLabel.textContent.trim();
                }
            });
            
            // Get selected options
            const checkboxes = document.querySelectorAll('.checkboxes input[type="checkbox"]');
            const selectedOptions = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedOptions.push(checkbox.parentElement.textContent.trim());
                }
            });
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            this.disabled = true;
            
            // Simulate report generation with realistic timing
            setTimeout(() => {
                // Create new report card
                const reportsGrid = document.querySelector('.reports-grid');
                const newReport = document.createElement('div');
                newReport.className = 'report-card';
                
                // Determine icon based on report type
                let iconClass = 'fas fa-file-alt';
                if (reportType.includes('Student')) iconClass = 'fas fa-user-graduate';
                else if (reportType.includes('Class')) iconClass = 'fas fa-chart-bar';
                else if (reportType.includes('Feedback')) iconClass = 'fas fa-comments';
                else if (reportType.includes('AI')) iconClass = 'fas fa-robot';
                
                // Generate file size
                const fileSize = (Math.random() * 3 + 0.5).toFixed(1);
                
                newReport.innerHTML = `
                    <div class="report-header">
                        <div class="report-icon">
                            <i class="${iconClass}"></i>
                        </div>
                        <div class="report-actions">
                            <button class="icon-btn" onclick="downloadReport(this)">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="icon-btn" onclick="shareReport(this)">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                    <div class="report-content">
                        <h4>${reportType} Report</h4>
                        <p>AI-generated report for ${timePeriod.toLowerCase()} covering ${students.toLowerCase()}. Includes ${selectedOptions.length} additional features.</p>
                        <div class="report-meta">
                            <span><i class="fas fa-calendar"></i> ${new Date().toLocaleDateString()}</span>
                            <span><i class="fas fa-file-${selectedFormat.toLowerCase()}"></i> ${selectedFormat}, ${fileSize} MB</span>
                        </div>
                    </div>
                    <div class="report-footer">
                        <span class="status completed">Completed</span>
                        <button class="btn-sm" onclick="previewReport(this)">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                    </div>
                `;
                
                // Add animation for new report
                newReport.style.opacity = '0';
                newReport.style.transform = 'translateY(-20px)';
                
                // Add to beginning of grid
                reportsGrid.insertBefore(newReport, reportsGrid.firstChild);
                
                // Animate in
                setTimeout(() => {
                    newReport.style.transition = 'all 0.3s ease';
                    newReport.style.opacity = '1';
                    newReport.style.transform = 'translateY(0)';
                }, 100);
                
                // Restore button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success message with details
                alert(`✅ Report Generated Successfully!\n\nType: ${reportType}\nPeriod: ${timePeriod}\nFormat: ${selectedFormat}\nSize: ${fileSize} MB\n\nThe report has been added to your list and is ready for download.`);
                
                // Scroll to the new report
                newReport.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Reset form
                reportTypeSelect.selectedIndex = 0;
                timePeriodSelect.selectedIndex = 0;
                studentsSelect.selectedIndex = 0;
                
            }, Math.random() * 2000 + 1500); // 1.5-3.5 seconds
        });
    }
    
    // Filter functionality
    const filterSelect = document.querySelector('.reports-controls .filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const selectedType = this.value;
            const reportCards = document.querySelectorAll('.report-card');
            
            reportCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                
                if (selectedType === 'All Report Types' || 
                    (selectedType === 'Student Performance' && title.includes('student')) ||
                    (selectedType === 'Class Progress' && title.includes('class')) ||
                    (selectedType === 'Feedback Analysis' && title.includes('feedback'))) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    console.log('Reports page loaded - Report management system active');
});

// Global functions for report actions
function downloadReport(button) {
    const card = button.closest('.report-card');
    const title = card.querySelector('h4').textContent;
    const format = card.querySelector('.report-meta span:last-child').textContent.split(',')[0].split(' ').pop();
    
    // Show loading state
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Simulate download
    setTimeout(() => {
        // Create a temporary download link
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${title.replace(/\s+/g, '_')}.${format.toLowerCase()}`;
        
        alert(`📥 Downloading: ${title}\n\nFile: ${link.download}\nThis would start a real download in a production app.`);
        
        button.innerHTML = originalHTML;
        button.disabled = false;
    }, 1000);
}

function shareReport(button) {
    const card = button.closest('.report-card');
    const title = card.querySelector('h4').textContent;
    
    // Show loading state
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        const shareUrl = `${window.location.origin}/reports/${title.replace(/\s+/g, '-').toLowerCase()}`;
        
        // Try to use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `Check out this ${title} from Evalytics`,
                url: shareUrl
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert(`🔗 Share Link Copied!\n\n${shareUrl}\n\nThe link has been copied to your clipboard.`);
            }).catch(() => {
                alert(`🔗 Share Link:\n\n${shareUrl}\n\nCopy this link to share the report.`);
            });
        }
        
        button.innerHTML = originalHTML;
    }, 500);
}

function previewReport(button) {
    const card = button.closest('.report-card');
    const title = card.querySelector('h4').textContent;
    const description = card.querySelector('p').textContent;
    const meta = card.querySelector('.report-meta').textContent;
    
    // Create a simple preview modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: var(--card-bg);
            border-radius: 20px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            color: var(--text-color);
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="margin: 0; color: var(--color-primary);">${title} - Preview</h2>
                <button onclick="this.closest('.modal').remove()" style="
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                ">×</button>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <strong>Description:</strong><br>
                ${description}
            </div>
            
            <div style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                ${meta}
            </div>
            
            <div style="background: var(--sidebar-bg); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
                <h4 style="margin-top: 0; color: var(--color-primary);">📊 Report Contents Preview</h4>
                <ul style="margin: 0; padding-left: 1.5rem;">
                    <li>Executive Summary</li>
                    <li>Key Performance Indicators</li>
                    <li>Detailed Analytics & Insights</li>
                    <li>AI-Generated Recommendations</li>
                    <li>Data Visualizations & Charts</li>
                    <li>Appendix with Raw Data</li>
                </ul>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button onclick="this.closest('.modal').remove()" style="
                    padding: 0.75rem 1.5rem;
                    background: var(--sidebar-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    cursor: pointer;
                    color: var(--text-color);
                ">Close</button>
                <button onclick="downloadReport(this.closest('.modal').querySelector('h2'))" style="
                    padding: 0.75rem 1.5rem;
                    background: var(--color-primary);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                ">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        </div>
    `;
    
    modal.className = 'modal';
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
    // Cancel button functionality
    const cancelBtn = document.querySelector('.report-generator .btn-outline');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Reset all form fields
            const selects = document.querySelectorAll('.report-generator select');
            selects.forEach(select => select.selectedIndex = 0);
            
            const checkboxes = document.querySelectorAll('.report-generator input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                // Reset to default state (first two checked)
                const isDefaultChecked = checkbox.parentElement.textContent.includes('AI Insights') || 
                                        checkbox.parentElement.textContent.includes('Recommendations') ||
                                        checkbox.parentElement.textContent.includes('Charts');
                checkbox.checked = isDefaultChecked;
            });
            
            const radios = document.querySelectorAll('.report-generator input[type="radio"]');
            radios.forEach((radio, index) => {
                radio.checked = index === 0; // Check first radio (PDF)
            });
            
            alert('Form has been reset to default values.');
        });
    }