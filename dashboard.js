// dashboard.js - Dashboard Specific JavaScript

// Generate Feedback Button Functionality
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Dashboard specific analytics
    console.log('Dashboard loaded - AI Feedback System');
    
    // Simulate real-time updates
    setInterval(() => {
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length > 0) {
            // Randomly update one stat
            const randomIndex = Math.floor(Math.random() * statValues.length);
            const currentValue = parseInt(statValues[randomIndex].textContent.replace(',', ''));
            const newValue = currentValue + Math.floor(Math.random() * 10);
            statValues[randomIndex].textContent = newValue.toLocaleString();
        }
    }, 10000); // Update every 10 seconds
});