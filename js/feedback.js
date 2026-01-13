// feedback.js - Feedback Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize feedback data
    let feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const feedbackItems = document.querySelectorAll('.feedback-item');
            
            feedbackItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            filterFeedback();
        });
    });
    
    function filterFeedback() {
        const subjectFilter = document.querySelector('.filter-select:nth-child(1)').value;
        const statusFilter = document.querySelector('.filter-select:nth-child(2)').value;
        const sortFilter = document.querySelector('.filter-select:nth-child(3)').value;
        
        const feedbackItems = document.querySelectorAll('.feedback-item');
        
        feedbackItems.forEach(item => {
            let showItem = true;
            
            // Subject filter
            if (subjectFilter !== 'All Subjects') {
                const subject = item.querySelector('.student-info p').textContent;
                if (!subject.includes(subjectFilter)) {
                    showItem = false;
                }
            }
            
            // Status filter
            if (statusFilter !== 'All Status') {
                const status = item.querySelector('.status').textContent;
                if (status !== statusFilter) {
                    showItem = false;
                }
            }
            
            item.style.display = showItem ? 'block' : 'none';
        });
        
        // Sort functionality
        if (sortFilter !== 'Sort by Date') {
            sortFeedbackItems(sortFilter);
        }
    }
    
    function sortFeedbackItems(sortBy) {
        const container = document.querySelector('.feedback-items');
        const items = Array.from(container.querySelectorAll('.feedback-item'));
        
        items.sort((a, b) => {
            if (sortBy === 'Sort by Student') {
                const nameA = a.querySelector('.student-info h4').textContent;
                const nameB = b.querySelector('.student-info h4').textContent;
                return nameA.localeCompare(nameB);
            }
            // Add more sorting options as needed
            return 0;
        });
        
        // Re-append sorted items
        items.forEach(item => container.appendChild(item));
    }
    
    // New Feedback button
    const newFeedbackBtn = document.querySelector('.header-actions .btn-primary');
    if (newFeedbackBtn) {
        newFeedbackBtn.addEventListener('click', function() {
            showNewFeedbackModal();
        });
    }
    
    function showNewFeedbackModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus"></i> Create New Feedback</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Student Name</label>
                        <input type="text" class="form-input" id="studentName" placeholder="Enter student name">
                    </div>
                    <div class="form-group">
                        <label>Subject</label>
                        <select class="form-input" id="subject">
                            <option>Mathematics</option>
                            <option>Science</option>
                            <option>English</option>
                            <option>History</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Assignment</label>
                        <input type="text" class="form-input" id="assignment" placeholder="Assignment name">
                    </div>
                    <div class="form-group">
                        <label>Feedback Message</label>
                        <textarea class="form-input" id="feedbackMessage" rows="4" placeholder="Enter your feedback message..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline modal-cancel">Cancel</button>
                    <button class="btn btn-primary" id="sendFeedbackBtn">
                        <i class="fas fa-paper-plane"></i> Send
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Modal event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.querySelector('.modal-cancel').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Send feedback button
        modal.querySelector('#sendFeedbackBtn').addEventListener('click', async function() {
            const studentName = modal.querySelector('#studentName').value;
            const subject = modal.querySelector('#subject').value;
            const assignment = modal.querySelector('#assignment').value;
            const feedbackMessage = modal.querySelector('#feedbackMessage').value;
            
            if (!studentName || !assignment) {
                alert('Please fill in student name and assignment.');
                return;
            }
            
            if (!feedbackMessage.trim()) {
                alert('Please enter a feedback message.');
                return;
            }
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.disabled = true;
            
            try {
                // Create new feedback item directly (no AI generation needed)
                const newFeedback = {
                    id: Date.now(),
                    studentName,
                    subject,
                    assignment,
                    feedback: feedbackMessage,
                    status: 'sent',
                    date: new Date().toISOString()
                };
                
                // Add to feedback data
                feedbackData.push(newFeedback);
                localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
                
                // Add to UI
                addFeedbackToUI(newFeedback);
                
                modal.remove();
                alert(`Feedback sent to ${studentName} successfully!`);
                
            } catch (error) {
                console.error('Error sending feedback:', error);
                alert('Error sending feedback. Please try again.');
                this.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
                this.disabled = false;
            }
        });
    }
    
    function addFeedbackToUI(feedback) {
        const container = document.querySelector('.feedback-items');
        const initials = feedback.studentName.split(' ').map(n => n[0]).join('').toUpperCase();
        
        const feedbackElement = document.createElement('div');
        feedbackElement.className = 'feedback-item';
        feedbackElement.innerHTML = `
            <div class="feedback-header">
                <div class="student-info">
                    <div class="student-avatar">${initials}</div>
                    <div>
                        <h4>${feedback.studentName}</h4>
                        <p>${feedback.subject} • ${feedback.assignment}</p>
                    </div>
                </div>
                <div class="feedback-meta">
                    <span class="date">${new Date(feedback.date).toLocaleDateString()}</span>
                    <span class="status ${feedback.status}">${feedback.status}</span>
                </div>
            </div>
            <div class="feedback-content">
                <p>${feedback.feedback}</p>
                ${feedback.confidence ? `<p><strong>AI Confidence:</strong> ${(feedback.confidence * 100).toFixed(1)}%</p>` : ''}
            </div>
            <div class="feedback-actions">
                <button class="btn-icon" onclick="viewFeedback(${feedback.id})">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn-icon" onclick="editFeedback(${feedback.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-icon" onclick="sendFeedback(${feedback.id})">
                    <i class="fas fa-paper-plane"></i> Send
                </button>
            </div>
        `;
        
        container.insertBefore(feedbackElement, container.firstChild);
    }
    
    // Send feedback from form
    const sendBtn = document.querySelector('.form-actions .btn-primary');
    if (sendBtn) {
        sendBtn.addEventListener('click', async function() {
            const studentSelect = document.querySelector('.generator-form .form-group:nth-child(1) select');
            const assignmentSelect = document.querySelector('.generator-form .form-group:nth-child(2) select');
            const instructions = document.querySelector('.generator-form textarea');
            
            if (!studentSelect.value || studentSelect.value === 'Select Student') {
                alert('Please select a student.');
                return;
            }
            
            if (!assignmentSelect.value || assignmentSelect.value === 'Select Assignment') {
                alert('Please select an assignment.');
                return;
            }
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.disabled = true;
            
            try {
                // Get feedback message from textarea
                const feedbackMessage = instructions.value.trim();
                
                if (!feedbackMessage) {
                    alert('Please enter a feedback message.');
                    return;
                }
                
                // Create and send feedback directly
                const newFeedback = {
                    id: Date.now(),
                    studentName: studentSelect.value,
                    subject: assignmentSelect.value.split(' ')[0],
                    assignment: assignmentSelect.value,
                    feedback: feedbackMessage,
                    status: 'sent',
                    date: new Date().toISOString()
                };
                
                // Add to feedback data
                let feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
                feedbackData.push(newFeedback);
                localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
                
                // Add to UI
                addFeedbackToUI(newFeedback);
                
                // Clear form
                studentSelect.selectedIndex = 0;
                assignmentSelect.selectedIndex = 0;
                instructions.value = '';
                
                alert(`Feedback sent to ${studentSelect.value} successfully!`);
                
            } catch (error) {
                console.error('Error:', error);
                alert('Error sending feedback. Please try again.');
            } finally {
                this.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
                this.disabled = false;
            }
        });
    }
    
    function showFeedbackResult(result, student, assignment) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h3><i class="fas fa-robot"></i> AI Generated Feedback</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="ai-result">
                        <div class="result-header">
                            <h4>${student} - ${assignment}</h4>
                            <span class="confidence">Confidence: ${(result.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div class="result-content">
                            <h5>Feedback:</h5>
                            <p>${result.feedback}</p>
                            
                            <h5>Key Insights:</h5>
                            <p>${result.insights}</p>
                            
                            <h5>Recommendations:</h5>
                            <ul>
                                ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline modal-close">Close</button>
                    <button class="btn btn-primary" onclick="saveFeedbackResult('${student}', '${assignment}', ${JSON.stringify(result).replace(/"/g, '&quot;')})">
                        <i class="fas fa-save"></i> Save Feedback
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    // Action button handlers
    window.viewFeedback = function(id) {
        const feedback = feedbackData.find(f => f.id === id);
        if (feedback) {
            showFeedbackResult(feedback, feedback.studentName, feedback.assignment);
        }
    };
    
    window.editFeedback = function(id) {
        alert('Edit functionality would open an edit modal in a full implementation.');
    };
    
    window.sendFeedback = function(id) {
        const feedback = feedbackData.find(f => f.id === id);
        if (feedback) {
            feedback.status = 'sent';
            localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
            
            // Update UI
            const statusElement = document.querySelector(`[onclick="sendFeedback(${id})"]`)
                .closest('.feedback-item').querySelector('.status');
            statusElement.textContent = 'sent';
            statusElement.className = 'status sent';
            
            alert(`Feedback sent to ${feedback.studentName}!`);
        }
    };
    
    window.saveFeedbackResult = function(student, assignment, result) {
        const newFeedback = {
            id: Date.now(),
            studentName: student,
            subject: assignment.split(' ')[0],
            assignment: assignment,
            feedback: result.feedback,
            insights: result.insights,
            recommendations: result.recommendations,
            confidence: result.confidence,
            status: 'pending',
            date: new Date().toISOString()
        };
        
        feedbackData.push(newFeedback);
        localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
        addFeedbackToUI(newFeedback);
        
        document.querySelector('.modal-overlay').remove();
        alert('Feedback saved successfully!');
    };
    
    console.log('Feedback page loaded - Feedback management system active');
});