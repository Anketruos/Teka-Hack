// dashboard.js - Dashboard Specific JavaScript

// Initialize AI Engine
const aiEngine = new AIFeedbackEngine();

// Generate Feedback Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-feedback');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', async function() {
            // Get form values
            const studentInput = document.querySelector('.input-group input').value;
            const assignmentSelect = document.querySelector('.input-group select').value;
            
            if (!studentInput || !assignmentSelect) {
                alert('Please enter student name and select an assignment.');
                return;
            }
            
            // Show loading state
            const originalText = generateBtn.textContent;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI Processing...';
            generateBtn.disabled = true;
            
            try {
                // Use AI engine to generate feedback
                const subject = assignmentSelect.split('-')[0].trim(); // Extract subject
                const result = await aiEngine.analyzeSubmission(studentInput, subject, assignmentSelect);
                
                // Update feedback content with AI-generated content
                const feedbackText = document.querySelector('.feedback-text');
                feedbackText.innerHTML = `
                    <div class="ai-feedback-header">
                        <span class="ai-badge"><i class="fas fa-robot"></i> AI Generated</span>
                        <span class="confidence-score">Confidence: ${(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <p><strong>Performance Analysis:</strong> ${result.feedback}</p>
                    <p><strong>Key Insights:</strong> ${result.insights}</p>
                    <div class="ai-recommendations">
                        <p><strong>AI Recommendations:</strong></p>
                        <ul>
                            ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                `;
                
                // Update date
                const now = new Date();
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit', 
                    minute: '2-digit' 
                };
                document.querySelector('.feedback-date').textContent = `Generated: ${now.toLocaleDateString('en-US', options)}`;
                
                // Add AI styling
                const feedbackResult = document.querySelector('.feedback-result');
                feedbackResult.classList.add('ai-generated');
                
                // Scroll to feedback result
                feedbackResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
            } catch (error) {
                console.error('AI Generation Error:', error);
                alert('Error generating AI feedback. Please try again.');
            } finally {
                // Restore button
                generateBtn.innerHTML = originalText;
                generateBtn.disabled = false;
            }
        });
    }
    
    // Dashboard specific analytics
    console.log('Dashboard loaded - AI Feedback System Active');
    
    // Simulate real-time AI insights
    setInterval(() => {
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length > 0) {
            // Randomly update one stat with AI-driven changes
            const randomIndex = Math.floor(Math.random() * statValues.length);
            const currentValue = parseInt(statValues[randomIndex].textContent.replace(',', ''));
            
            // AI-driven incremental improvements
            const aiImprovement = Math.floor(Math.random() * 5) + 1;
            const newValue = currentValue + aiImprovement;
            statValues[randomIndex].textContent = newValue.toLocaleString();
            
            // Add visual feedback for AI updates
            statValues[randomIndex].parentElement.classList.add('ai-updated');
            setTimeout(() => {
                statValues[randomIndex].parentElement.classList.remove('ai-updated');
            }, 2000);
        }
    }, 15000); // Update every 15 seconds
});
    // Edit Feedback Button
    const editFeedbackBtn = document.querySelector('.feedback-actions .btn-outline');
    if (editFeedbackBtn) {
        editFeedbackBtn.addEventListener('click', function() {
            const feedbackText = document.querySelector('.feedback-text');
            const currentText = feedbackText.innerHTML;
            
            // Create editable textarea
            const textarea = document.createElement('textarea');
            textarea.style.cssText = `
                width: 100%;
                min-height: 200px;
                padding: 1rem;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: var(--input-bg);
                color: var(--text-color);
                font-family: inherit;
                font-size: 1rem;
                line-height: 1.6;
                resize: vertical;
            `;
            textarea.value = feedbackText.textContent.trim();
            
            // Replace content with textarea
            feedbackText.innerHTML = '';
            feedbackText.appendChild(textarea);
            
            // Change button to Save
            this.innerHTML = '<i class="fas fa-save"></i> Save Changes';
            this.onclick = function() {
                // Save the edited content
                const editedText = textarea.value;
                feedbackText.innerHTML = `<p>${editedText.replace(/\n/g, '</p><p>')}</p>`;
                
                // Restore button
                this.innerHTML = '<i class="fas fa-edit"></i> Edit Feedback';
                this.onclick = null;
                
                alert('Feedback has been updated successfully!');
            };
            
            textarea.focus();
        });
    }
    
    // Send to Student Button
    const sendFeedbackBtn = document.querySelector('.feedback-actions .btn-primary');
    if (sendFeedbackBtn) {
        sendFeedbackBtn.addEventListener('click', function() {
            const studentInput = document.querySelector('.input-group input').value;
            const assignmentSelect = document.querySelector('.input-group select').value;
            
            if (!studentInput || !assignmentSelect) {
                alert('Please generate feedback first by entering student name and selecting assignment.');
                return;
            }
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.disabled = true;
            
            // Simulate sending email
            setTimeout(() => {
                // Restore button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success message
                alert(`✅ Feedback Sent Successfully!\n\nTo: ${studentInput}\nAssignment: ${assignmentSelect}\nSent: ${new Date().toLocaleString()}\n\nThe student will receive an email notification with their personalized feedback.`);
                
                // Add to recent activity (simulate)
                const activityList = document.querySelector('.activity-list');
                if (activityList) {
                    const newActivity = document.createElement('div');
                    newActivity.className = 'activity-item';
                    newActivity.innerHTML = `
                        <div class="activity-icon">
                            <i class="fas fa-paper-plane"></i>
                        </div>
                        <div class="activity-details">
                            <h4>Feedback Delivered</h4>
                            <p>Personalized feedback sent to ${studentInput} for ${assignmentSelect}.</p>
                        </div>
                    `;
                    activityList.insertBefore(newActivity, activityList.firstChild);
                }
            }, 1500);
        });
    }
});