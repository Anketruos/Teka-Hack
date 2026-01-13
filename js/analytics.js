// analytics.js - Analytics Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize analytics data
    let analyticsData = JSON.parse(localStorage.getItem('analyticsData')) || generateInitialData();
    
    function generateInitialData() {
        const data = {
            performanceData: [
                { day: 'Mon', value: 85 },
                { day: 'Tue', value: 72 },
                { day: 'Wed', value: 90 },
                { day: 'Thu', value: 78 },
                { day: 'Fri', value: 88 },
                { day: 'Sat', value: 75 },
                { day: 'Sun', value: 92 }
            ],
            feedbackDistribution: {
                positive: 40,
                constructive: 25,
                needsWork: 20,
                excellent: 15
            },
            metrics: {
                avgScore: 4.2,
                engagement: 92,
                responseTime: 3.8,
                improvementRate: 78
            },
            students: [
                { name: 'Sarah Johnson', subject: 'Mathematics', avgScore: 92, feedbackCount: 8, improvement: 15, status: 'excellent' },
                { name: 'Michael Chen', subject: 'Science', avgScore: 85, feedbackCount: 6, improvement: 8, status: 'good' },
                { name: 'Emma Wilson', subject: 'English', avgScore: 78, feedbackCount: 10, improvement: 22, status: 'improving' },
                { name: 'James Brown', subject: 'History', avgScore: 65, feedbackCount: 5, improvement: 5, status: 'needs-work' },
                { name: 'Olivia Davis', subject: 'Mathematics', avgScore: 95, feedbackCount: 7, improvement: 10, status: 'excellent' }
            ]
        };
        localStorage.setItem('analyticsData', JSON.stringify(data));
        return data;
    }
    
    // Update charts and data
    function updateCharts() {
        updatePerformanceChart();
        updatePieChart();
        updateMetrics();
        updateStudentTable();
    }
    
    function updatePerformanceChart() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (analyticsData.performanceData[index]) {
                const value = analyticsData.performanceData[index].value;
                bar.style.height = `${value}%`;
                bar.setAttribute('data-value', `${value}%`);
            }
        });
    }
    
    function updatePieChart() {
        const distribution = analyticsData.feedbackDistribution;
        const total = Object.values(distribution).reduce((sum, val) => sum + val, 0);
        
        // Update legend values
        const legendItems = document.querySelectorAll('.legend-item');
        const keys = ['positive', 'constructive', 'needsWork', 'excellent'];
        
        legendItems.forEach((item, index) => {
            const key = keys[index];
            if (distribution[key]) {
                const percentage = Math.round((distribution[key] / total) * 100);
                item.querySelector('.legend-value').textContent = `${percentage}%`;
            }
        });
    }
    
    function updateMetrics() {
        const metrics = analyticsData.metrics;
        const metricElements = document.querySelectorAll('.metric-value');
        
        if (metricElements[0]) metricElements[0].textContent = metrics.avgScore.toFixed(1);
        if (metricElements[1]) metricElements[1].textContent = `${metrics.engagement}%`;
        if (metricElements[2]) metricElements[2].textContent = metrics.responseTime.toFixed(1);
        if (metricElements[3]) metricElements[3].textContent = `${metrics.improvementRate}%`;
    }
    
    function updateStudentTable() {
        const tbody = document.querySelector('.analytics-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        analyticsData.students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.subject}</td>
                <td>${student.avgScore}%</td>
                <td>${student.feedbackCount}</td>
                <td>+${student.improvement}%</td>
                <td><span class="status ${student.status}">${student.status.replace('-', ' ')}</span></td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Chart functionality
    const timeSelect = document.querySelector('.time-select');
    if (timeSelect) {
        timeSelect.addEventListener('change', function() {
            const period = this.value;
            
            // Simulate different data for different time periods
            if (period === 'Last 7 days') {
                analyticsData.performanceData = [
                    { day: 'Mon', value: 85 },
                    { day: 'Tue', value: 72 },
                    { day: 'Wed', value: 90 },
                    { day: 'Thu', value: 78 },
                    { day: 'Fri', value: 88 },
                    { day: 'Sat', value: 75 },
                    { day: 'Sun', value: 92 }
                ];
            } else if (period === 'Last 30 days') {
                // Generate random data for 30 days (simplified to 7 points)
                analyticsData.performanceData = Array.from({length: 7}, (_, i) => ({
                    day: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'][i],
                    value: Math.floor(Math.random() * 40) + 60
                }));
            } else if (period === 'Last 3 months') {
                analyticsData.performanceData = [
                    { day: 'Month 1', value: 78 },
                    { day: 'Month 2', value: 82 },
                    { day: 'Month 3', value: 88 }
                ];
            }
            
            updatePerformanceChart();
            console.log(`Time period changed to: ${this.value}`);
        });
    }
    
    // Add interactive features to insights
    const insightItems = document.querySelectorAll('.insight-item');
    insightItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showInsightDetails(title);
        });
        
        // Add hover effect
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    function showInsightDetails(title) {
        let content = '';
        
        switch(title) {
            case 'Performance Spike Detected':
                content = `
                    <h4>Performance Analysis</h4>
                    <p>Mathematics scores have improved significantly after implementing AI feedback:</p>
                    <ul>
                        <li>Average score increased from 78% to 89%</li>
                        <li>Student engagement up by 23%</li>
                        <li>Feedback response time reduced by 65%</li>
                        <li>Most improvement seen in problem-solving areas</li>
                    </ul>
                    <p><strong>Recommendation:</strong> Continue current AI feedback approach and consider expanding to other subjects.</p>
                `;
                break;
            case 'Engagement Pattern':
                content = `
                    <h4>Student Engagement Analysis</h4>
                    <p>Analysis of student activity patterns reveals:</p>
                    <ul>
                        <li>Peak activity: Tuesday 10-11 AM (87% engagement)</li>
                        <li>Secondary peak: Thursday 2-3 PM (82% engagement)</li>
                        <li>Lowest activity: Friday afternoons (45% engagement)</li>
                        <li>Weekend activity: Moderate but consistent (60% engagement)</li>
                    </ul>
                    <p><strong>Recommendation:</strong> Schedule important assignments and feedback sessions during peak engagement times.</p>
                `;
                break;
            case 'Attention Needed':
                content = `
                    <h4>Students Requiring Additional Support</h4>
                    <p>The following students show declining performance trends:</p>
                    <ul>
                        <li><strong>James Brown:</strong> History - 15% decline over 3 weeks</li>
                        <li><strong>Lisa Wang:</strong> Science - 8% decline in lab reports</li>
                        <li><strong>Alex Rodriguez:</strong> Mathematics - Struggling with calculus concepts</li>
                    </ul>
                    <p><strong>Recommended Actions:</strong></p>
                    <ul>
                        <li>Schedule one-on-one sessions</li>
                        <li>Provide additional practice materials</li>
                        <li>Increase feedback frequency</li>
                    </ul>
                `;
                break;
        }
        
        showModal('AI Insight Details', content);
    }
    
    function showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-lightbulb"></i> ${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary modal-close">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => modal.remove());
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    // Add export functionality
    const exportBtn = document.querySelector('.btn[onclick*="export"]');
    if (exportBtn) {
        exportBtn.onclick = function() {
            exportAnalyticsData();
        };
    }
    
    function exportAnalyticsData() {
        const data = {
            exportDate: new Date().toISOString(),
            performanceData: analyticsData.performanceData,
            metrics: analyticsData.metrics,
            students: analyticsData.students,
            feedbackDistribution: analyticsData.feedbackDistribution
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        alert('Analytics data exported successfully!');
    }
    
    // Update metrics periodically with realistic changes
    setInterval(() => {
        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach((metric, index) => {
            const currentValue = parseFloat(metric.textContent);
            let change = 0;
            
            // Different change patterns for different metrics
            switch(index) {
                case 0: // Average score
                    change = (Math.random() * 0.2) - 0.1; // ±0.1
                    analyticsData.metrics.avgScore = Math.max(1, Math.min(5, currentValue + change));
                    metric.textContent = analyticsData.metrics.avgScore.toFixed(1);
                    break;
                case 1: // Engagement
                    change = Math.floor((Math.random() * 6) - 3); // ±3%
                    analyticsData.metrics.engagement = Math.max(0, Math.min(100, currentValue + change));
                    metric.textContent = `${analyticsData.metrics.engagement}%`;
                    break;
                case 2: // Response time
                    change = (Math.random() * 0.4) - 0.2; // ±0.2 hours
                    analyticsData.metrics.responseTime = Math.max(0.1, currentValue + change);
                    metric.textContent = analyticsData.metrics.responseTime.toFixed(1);
                    break;
                case 3: // Improvement rate
                    change = Math.floor((Math.random() * 4) - 2); // ±2%
                    analyticsData.metrics.improvementRate = Math.max(0, Math.min(100, currentValue + change));
                    metric.textContent = `${analyticsData.metrics.improvementRate}%`;
                    break;
            }
        });
        
        // Save updated data
        localStorage.setItem('analyticsData', JSON.stringify(analyticsData));
    }, 15000); // Update every 15 seconds
    
    // Initialize the page
    updateCharts();
    
    console.log('Analytics page loaded - Data visualization active');
});