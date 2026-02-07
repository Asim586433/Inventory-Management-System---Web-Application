// script.js

// DOM Elements
const currentDateElement = document.getElementById('current-date');
const generateReportBtn = document.getElementById('generate-report');
const reportModal = document.getElementById('reportModal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const generateReportBtnModal = document.getElementById('generateReportBtn');
const notificationPanel = document.getElementById('notificationPanel');
const closeNotificationsBtn = document.getElementById('closeNotifications');
const navLinks = document.querySelectorAll('.nav-menu a');

// Set current date
function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Initialize the application
function initApp() {
    setCurrentDate();
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
    
    // Event Listeners
    // Generate Report button
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', () => {
            reportModal.classList.add('active');
        });
    }
    
    // Close modal buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            reportModal.classList.remove('active');
        });
    });
    
    // Generate report button in modal
    if (generateReportBtnModal) {
        generateReportBtnModal.addEventListener('click', () => {
            const reportType = document.getElementById('reportType').value;
            const dateRange = document.getElementById('dateRange').value;
            const format = document.getElementById('format').value;
            
            // In a real application, this would make an API call to generate the report
            alert(`Report generated!\nType: ${reportType}\nDate Range: ${dateRange}\nFormat: ${format}`);
            
            // Close the modal
            reportModal.classList.remove('active');
            
            // Show success message
            showNotification('Report generated successfully and sent to your email.', 'success');
        });
    }
    
    // Close modal when clicking outside
    reportModal.addEventListener('click', (e) => {
        if (e.target === reportModal) {
            reportModal.classList.remove('active');
        }
    });
    
    // Show notification panel when clicking on notification icon
    const notificationIcon = document.querySelector('.notification');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', () => {
            notificationPanel.classList.add('active');
        });
    }
    
    // Close notification panel
    if (closeNotificationsBtn) {
        closeNotificationsBtn.addEventListener('click', () => {
            notificationPanel.classList.remove('active');
        });
    }
    
    // Table row click handlers
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        const viewBtn = row.querySelector('.table-action.view');
        const editBtn = row.querySelector('.table-action.edit');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const orderId = row.cells[0].textContent;
                showNotification(`Viewing details for ${orderId}`, 'info');
            });
        }
        
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const orderId = row.cells[0].textContent;
                showNotification(`Editing ${orderId}`, 'info');
            });
        }
        
        // Make entire row clickable
        row.addEventListener('click', () => {
            const orderId = row.cells[0].textContent;
            const buyer = row.cells[1].textContent;
            const status = row.cells[4].querySelector('.status-badge').textContent;
            
            // Show order details in a modal (simulated)
            showOrderDetailsModal(orderId, buyer, status);
        });
    });
    
    // Quick action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Don't prevent default for links
            if (button.getAttribute('href')) return;
            
            e.preventDefault();
            const actionText = button.querySelector('span').textContent;
            showNotification(`Action triggered: ${actionText}`, 'info');
        });
    });
    
    // Mark notifications as read when clicked
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.remove('unread');
            
            // Update notification count
            updateNotificationCount();
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    showNotification(`Searching for: ${searchTerm}`, 'info');
                    // In a real app, this would trigger an API call or filter results
                }
            }
        });
    }
}

// Show notification message
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close button event
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Add styles for notification toast
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: white;
                border-radius: 8px;
                padding: 15px 20px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 3000;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                max-width: 400px;
            }
            .notification-toast.show {
                transform: translateX(0);
            }
            .notification-toast.success {
                border-left: 4px solid #4CAF50;
            }
            .notification-toast.info {
                border-left: 4px solid #2196F3;
            }
            .notification-toast.error {
                border-left: 4px solid #F44336;
            }
            .notification-content {
                display: flex;
                align-items: center;
            }
            .notification-content i {
                margin-right: 10px;
                font-size: 18px;
            }
            .notification-toast.success .notification-content i {
                color: #4CAF50;
            }
            .notification-toast.info .notification-content i {
                color: #2196F3;
            }
            .notification-toast.error .notification-content i {
                color: #F44336;
            }
            .notification-close {
                background: none;
                border: none;
                color: #6c757d;
                cursor: pointer;
                font-size: 16px;
                margin-left: 15px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Update notification count
function updateNotificationCount() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread').length;
    const badgeElements = document.querySelectorAll('.notification .badge');
    
    badgeElements.forEach(badge => {
        if (unreadNotifications > 0) {
            badge.textContent = unreadNotifications;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Show order details modal
function showOrderDetailsModal(orderId, buyer, status) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Order Details: ${orderId}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="order-details">
                    <div class="detail-row">
                        <span class="detail-label">Order ID:</span>
                        <span class="detail-value">${orderId}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Buyer:</span>
                        <span class="detail-value">${buyer}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="status-badge ${status.toLowerCase()}">${status}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Order Date:</span>
                        <span class="detail-value">2023-10-15</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Total Amount:</span>
                        <span class="detail-value">$2,850.00</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Items:</span>
                        <span class="detail-value">5 items</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Payment Status:</span>
                        <span class="detail-value">Paid</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Shipping Method:</span>
                        <span class="detail-value">Pickup</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary close-modal">Close</button>
                <button class="btn-primary" id="editOrderBtn">Edit Order</button>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close button events
    modal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    });
    
    // Edit button event
    modal.querySelector('#editOrderBtn').addEventListener('click', () => {
        showNotification(`Editing order: ${orderId}`, 'info');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
