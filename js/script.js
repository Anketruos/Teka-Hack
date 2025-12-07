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
    if (linkHref === currentPage) {
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

console.log('Shared scripts loaded - EduFeedback AI System');