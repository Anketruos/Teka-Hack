// script.js - Shared JavaScript (Theme, Navigation)
// Theme toggle functionality
const lightModeBtn = document.getElementById('light-mode-btn');
const darkModeBtn = document.getElementById('dark-mode-btn');
const body = document.body;

// Check for saved theme or prefer-color-scheme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

// Set initial theme
if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    enableDarkMode();
} else {
    enableLightMode();
}

// Theme button event listeners
if (lightModeBtn) lightModeBtn.addEventListener('click', enableLightMode);
if (darkModeBtn) darkModeBtn.addEventListener('click', enableDarkMode);

function enableLightMode() {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    if (lightModeBtn) lightModeBtn.classList.add('active');
    if (darkModeBtn) darkModeBtn.classList.remove('active');
    localStorage.setItem('theme', 'light');
}

function enableDarkMode() {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    if (darkModeBtn) darkModeBtn.classList.add('active');
    if (lightModeBtn) lightModeBtn.classList.remove('active');
    localStorage.setItem('theme', 'dark');
}

// Nav item active state
const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active');
    }
    
    link.addEventListener('click', function(e) {
        navLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    }
});

console.log('Shared scripts loaded - Evalytics System');

// Authentication and User Management
// Check authentication status
function checkAuth() {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages that don't require authentication
    const publicPages = ['login.html', 'register.html', 'landing.html', ''];
    
    if (!isLoggedIn && !publicPages.includes(currentPage)) {
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Update user profile display
function updateUserProfile() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userName) {
        const userNameElement = document.getElementById('userName');
        const userAvatarElement = document.getElementById('userAvatar');
        
        if (userNameElement) {
            userNameElement.textContent = userName;
        }
        
        if (userAvatarElement) {
            // Create initials from name
            const initials = userName.split(' ').map(name => name[0]).join('').toUpperCase();
            userAvatarElement.textContent = initials;
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userInstitution');
    window.location.href = 'login.html';
}

// Initialize authentication and user profile
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!checkAuth()) return;
    
    // Update user profile
    updateUserProfile();
    
    // Add click handler to user profile for logout menu
    const userProfile = document.getElementById('userProfile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            const confirmLogout = confirm('Do you want to logout?');
            if (confirmLogout) {
                logout();
            }
        });
    }
});
// Global Download Functionality
window.downloadFile = function(filename, content, type = 'text/plain') {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// Global Export Functions
window.exportData = function(data, filename, format = 'json') {
    let content, mimeType, extension;
    
    switch(format.toLowerCase()) {
        case 'json':
            content = JSON.stringify(data, null, 2);
            mimeType = 'application/json';
            extension = 'json';
            break;
        case 'csv':
            content = convertToCSV(data);
            mimeType = 'text/csv';
            extension = 'csv';
            break;
        case 'txt':
            content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
            mimeType = 'text/plain';
            extension = 'txt';
            break;
        default:
            content = JSON.stringify(data, null, 2);
            mimeType = 'application/json';
            extension = 'json';
    }
    
    const finalFilename = filename.includes('.') ? filename : `${filename}.${extension}`;
    downloadFile(finalFilename, content, mimeType);
};

function convertToCSV(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return '';
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => 
            headers.map(header => {
                const value = row[header];
                // Escape commas and quotes in CSV
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
        )
    ].join('\n');
    
    return csvContent;
}

// Global notification system
window.showNotification = function(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 1rem;
                box-shadow: var(--shadow);
                z-index: 1001;
                display: flex;
                align-items: center;
                gap: 1rem;
                min-width: 300px;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                border-left: 4px solid #28a745;
            }
            
            .notification-error {
                border-left: 4px solid #dc3545;
            }
            
            .notification-warning {
                border-left: 4px solid #ffc107;
            }
            
            .notification-info {
                border-left: 4px solid var(--color-primary);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex: 1;
                color: var(--text-color);
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: var(--text-secondary);
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                background: var(--sidebar-bg);
                color: var(--text-color);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }
};

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        case 'info': 
        default: return 'info-circle';
    }
}

// Enhanced button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for all download buttons
    document.querySelectorAll('[class*="download"], [onclick*="download"]').forEach(btn => {
        if (!btn.onclick && !btn.dataset.downloadHandled) {
            btn.dataset.downloadHandled = 'true';
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleGenericDownload(this);
            });
        }
    });
    
    // Add click handlers for all export buttons
    document.querySelectorAll('[class*="export"], [onclick*="export"]').forEach(btn => {
        if (!btn.onclick && !btn.dataset.exportHandled) {
            btn.dataset.exportHandled = 'true';
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleGenericExport(this);
            });
        }
    });
});

function handleGenericDownload(button) {
    const buttonText = button.textContent.toLowerCase();
    const page = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Show loading state
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    button.disabled = true;
    
    setTimeout(() => {
        let filename, content, type;
        
        if (buttonText.includes('report')) {
            // Generate sample report
            const reportData = generateSampleReport();
            filename = `report-${new Date().toISOString().split('T')[0]}.pdf`;
            content = `Sample Report Generated on ${new Date().toLocaleString()}\n\n${reportData}`;
            type = 'application/pdf';
        } else if (buttonText.includes('feedback')) {
            // Generate feedback export
            const feedbackData = generateSampleFeedback();
            filename = `feedback-export-${new Date().toISOString().split('T')[0]}.json`;
            content = JSON.stringify(feedbackData, null, 2);
            type = 'application/json';
        } else if (buttonText.includes('analytics')) {
            // Generate analytics export
            const analyticsData = generateSampleAnalytics();
            filename = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
            content = convertToCSV(analyticsData);
            type = 'text/csv';
        } else {
            // Generic download
            filename = `${page}-data-${new Date().toISOString().split('T')[0]}.txt`;
            content = `Data export from ${page} page\nGenerated: ${new Date().toLocaleString()}`;
            type = 'text/plain';
        }
        
        downloadFile(filename, content, type);
        
        // Restore button
        button.innerHTML = originalHTML;
        button.disabled = false;
        
        showNotification(`File "${filename}" downloaded successfully!`, 'success');
    }, 1500);
}

function handleGenericExport(button) {
    const page = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Show loading state
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
    button.disabled = true;
    
    setTimeout(() => {
        let data, filename;
        
        switch(page) {
            case 'analytics':
                data = generateSampleAnalytics();
                filename = 'analytics-export';
                break;
            case 'feedback':
                data = generateSampleFeedback();
                filename = 'feedback-export';
                break;
            case 'reports':
                data = generateSampleReports();
                filename = 'reports-export';
                break;
            default:
                data = { page, exportDate: new Date().toISOString() };
                filename = `${page}-export`;
        }
        
        exportData(data, filename, 'json');
        
        // Restore button
        button.innerHTML = originalHTML;
        button.disabled = false;
        
        showNotification('Data exported successfully!', 'success');
    }, 1000);
}

// Sample data generators
function generateSampleReport() {
    return `EVALYTICS - PERFORMANCE REPORT

Generated: ${new Date().toLocaleString()}

EXECUTIVE SUMMARY
================
This report provides a comprehensive analysis of student performance and AI feedback effectiveness.

KEY METRICS
===========
- Total Students: 25
- Average Performance: 84.2%
- Feedback Generated: 156
- Improvement Rate: 78%

DETAILED ANALYSIS
================
The AI feedback system has shown significant positive impact on student learning outcomes.
Students receiving AI-generated feedback showed 23% better improvement rates compared to traditional methods.

RECOMMENDATIONS
===============
1. Continue current AI feedback implementation
2. Expand to additional subjects
3. Increase feedback frequency for struggling students

For more detailed analysis, please refer to the full dashboard.`;
}

function generateSampleFeedback() {
    return [
        {
            id: 1,
            studentName: "Sarah Johnson",
            subject: "Mathematics",
            assignment: "Calculus Midterm",
            feedback: "Excellent problem-solving approach with strong conceptual understanding.",
            grade: 92,
            date: new Date().toISOString(),
            status: "sent"
        },
        {
            id: 2,
            studentName: "Michael Chen",
            subject: "Science",
            assignment: "Biology Lab Report",
            feedback: "Good experimental design, needs improvement in data analysis section.",
            grade: 85,
            date: new Date().toISOString(),
            status: "pending"
        }
    ];
}

function generateSampleAnalytics() {
    return [
        { metric: "Average Score", value: 84.2, change: "+5.3%" },
        { metric: "Student Engagement", value: 92, change: "+8%" },
        { metric: "Response Time", value: 3.8, change: "-12%" },
        { metric: "Improvement Rate", value: 78, change: "+15%" }
    ];
}

function generateSampleReports() {
    return [
        {
            title: "Student Performance Report",
            type: "Performance Analysis",
            date: new Date().toISOString(),
            size: "2.4 MB",
            format: "PDF"
        },
        {
            title: "Class Progress Analysis",
            type: "Progress Report",
            date: new Date().toISOString(),
            size: "1.8 MB",
            format: "Excel"
        }
    ];
}