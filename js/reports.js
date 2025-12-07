// reports.js - Reports Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Report download functionality
    const downloadButtons = document.querySelectorAll('.icon-btn .fa-download');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.report-card');
            const title = card.querySelector('h4').textContent;
            
            // Show loading state
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            // Simulate download
            setTimeout(() => {
                alert(`Downloading: ${title}`);
                this.innerHTML = originalHTML;
            }, 1000);
        });
    });
    
    // Report preview functionality
    const previewButtons = document.querySelectorAll('.btn-sm .fa-eye');
    previewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.report-card');
            const title = card.querySelector('h4').textContent;
            alert(`Previewing: ${title}\n\nThis would open a preview modal in a real application.`);
        });
    });
    
    // Generate report form
    const generateReportBtn = document.querySelector('.report-generator .btn-primary');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function() {
            const reportType = document.querySelector('.report-generator select').value;
            
            // Show loading state
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            this.disabled = true;
            
            // Simulate report generation
            setTimeout(() => {
                // Add new report card to the grid
                const reportsGrid = document.querySelector('.reports-grid');
                const newReport = document.createElement('div');
                newReport.className = 'report-card';
                newReport.innerHTML = `
                    <div class="report-header">
                        <div class="report-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="report-actions">
                            <button class="icon-btn">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="icon-btn">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                    <div class="report-content">
                        <h4>New ${reportType} Report</h4>
                        <p>AI-generated report created just now with the latest data and insights.</p>
                        <div class="report-meta">
                            <span><i class="fas fa-calendar"></i> ${new Date().toLocaleDateString()}</span>
                            <span><i class="fas fa-file-pdf"></i> PDF, 1.2 MB</span>
                        </div>
                    </div>
                    <div class="report-footer">
                        <span class="status completed">Completed</span>
                        <button class="btn-sm">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                    </div>
                `;
                
                // Add to beginning of grid
                reportsGrid.insertBefore(newReport, reportsGrid.firstChild);
                
                // Restore button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success message
                alert(`Successfully generated: ${reportType} Report\n\nThe new report has been added to your list.`);
            }, 2000);
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