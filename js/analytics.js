// analytics.js - Analytics Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Chart functionality
    const timeSelect = document.querySelector('.time-select');
    if (timeSelect) {
        timeSelect.addEventListener('change', function() {
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                const randomHeight = Math.floor(Math.random() * 60) + 40;
                bar.style.height = `${randomHeight}%`;
                bar.setAttribute('data-value', `${randomHeight}%`);
            });
            
            console.log(`Time period changed to: ${this.value}`);
        });
    }
    
    // Update metrics periodically
    setInterval(() => {
        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach(metric => {
            const currentValue = parseFloat(metric.textContent);
            if (metric.textContent.includes('%')) {
                const change = (Math.random() * 0.5) - 0.25;
                const newValue = Math.max(0, Math.min(100, currentValue + change));
                metric.textContent = `${newValue.toFixed(1)}%`;
            } else {
                const change = (Math.random() * 0.2) - 0.1;
                const newValue = Math.max(0, currentValue + change);
                metric.textContent = newValue.toFixed(1);
            }
        });
    }, 15000);
    
    console.log('Analytics page loaded - Data visualization active');
});