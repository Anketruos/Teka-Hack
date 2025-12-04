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
lightModeBtn.addEventListener('click', enableLightMode);
darkModeBtn.addEventListener('click', enableDarkMode);

function enableLightMode() {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    lightModeBtn.classList.add('active');
    darkModeBtn.classList.remove('active');
    localStorage.setItem('theme', 'light');
}

function enableDarkMode() {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    darkModeBtn.classList.add('active');
    lightModeBtn.classList.remove('active');
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

// Simulate feedback generation
const generateBtn = document.getElementById('generate-feedback');
if (generateBtn) {
    generateBtn.addEventListener('click', function() {
        // Show loading state
        const originalText = generateBtn.textContent;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        generateBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Update feedback content
            const feedbackText = document.querySelector('.feedback-text');
            const names = ['Alex Morgan', 'Taylor Smith', 'Jordan Lee', 'Casey Kim'];
            const subjects = ['Calculus', 'Biology', 'Literature', 'Physics'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
            
            feedbackText.innerHTML = `
                <p>${randomName} has demonstrated a solid understanding of ${randomSubject} concepts in the recent assignment. Their analytical skills are commendable, particularly in applying theoretical knowledge to practical problems.</p>
                <p>Areas for improvement include paying closer attention to detail in calculations and expanding on explanatory sections to provide more comprehensive answers.</p>
                <p><strong>AI Suggestions:</strong> I recommend completing the supplementary exercises on our learning platform to strengthen problem-solving techniques in this area.</p>
            `;
            
            // Update date
            const now = new Date();
            const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
            document.querySelector('.feedback-date').textContent = `Generated: ${now.toLocaleDateString('en-US', options)}`;
            
            // Restore button
            generateBtn.innerHTML = originalText;
            generateBtn.disabled = false;
            
            // Scroll to feedback result
            const feedbackResult = document.querySelector('.feedback-result');
            feedbackResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1500);
    });
}