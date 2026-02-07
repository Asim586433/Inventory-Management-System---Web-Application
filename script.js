// script.js - Core Application Functionality

// Global Data Store
const AppData = {
    notifications: [
        {
            id: 1,
            type: 'warning',
            title: 'Low Inventory Alert',
            message: 'Smartphones - Model X is below minimum stock level.',
            time: '2 hours ago',
            read: false
        },
        {
            id: 2,
            type: 'info',
            title: 'Pickup Scheduled',
            message: 'Order #ORD-7839 is scheduled for pickup tomorrow.',
            time: '5 hours ago',
            read: false
        },
        {
            id: 3,
            type: 'info',
            title: 'New Inventory Received',
            message: 'Tech Liquidators added 45 new items.',
            time: 'Yesterday',
            read: true
        }
    ],
    
    inventoryItems: [
        {
            id: 'INV-1001',
            name: 'Smartphone Model X',
            category: 'electronics',
            quantity: 45,
            status: 'available',
            vendor: 'Tech Liquidators',
            location: 'Warehouse A, Shelf B3',
            value: 299.99,
            sku: 'SPX-2023'
        },
        {
            id: 'INV-1002',
            name: 'Office Chair - Ergonomic',
            category: 'furniture',
            quantity: 12,
            status: 'available',
            vendor: 'Office Supplies Inc',
            location: 'Warehouse B, Section 4',
            value: 189.50,
            sku: 'OCE-2023'
        },
        // ... more inventory items
    ],
    
    vendors: [
        {
            id: 'VEND-001',
            company: 'Tech Liquidators',
            contact: 'John Smith',
            email: 'john@techliquidators.com',
            phone: '(555) 123-4567',
            itemsSupplied: 245,
            totalSpend: 45280,
            rating: 4.5,
            status: 'active'
        },
        // ... more vendors
    ],
    
    buyers: [
        {
            id: 'BUY-001',
            company: 'Global Retail Inc',
            contact: 'Sarah Johnson',
            email: 'sarah@globalretail.com',
            phone: '(555) 987-6543',
            type: 'wholesale',
            totalOrders: 12,
            totalSpent: 28450,
            lastPurchase: '2023-10-15',
            status: 'active'
        },
        // ... more buyers
    ],
    
    orders: [
        {
            id: 'ORD-7842',
            buyer: 'Global Retail Inc',
            items: 5,
            total: 2850,
            status: 'completed',
            payment: 'paid',
            date: '2023-10-15'
        },
        // ... more orders
    ],
    
    schedules: [
        {
            id: 'SCH-001',
            orderId: 'ORD-7842',
            buyer: 'Global Retail Inc',
            date: '2023-10-16',
            time: '2:00 PM',
            items: 5,
            status: 'confirmed',
            driver: 'John Smith'
        },
        // ... more schedules
    ],
    
    users: [
        {
            id: 'USR-001',
            name: 'Admin User',
            email: 'admin@ims.com',
            role: 'Administrator',
            lastLogin: '2023-10-16 14:30',
            status: 'active'
        },
        // ... more users
    ]
};

// DOM Elements
let currentDateElement, notificationPanel, closeNotificationsBtn, notificationToggle;
let reportModal, closeModalButtons, generateReportBtnModal;

// Initialize the application
function initApp() {
    // Set current date
    setCurrentDate();
    
    // Initialize DOM elements
    initDOMElements();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadInitialData();
    
    // Set active navigation
    setActiveNavigation();
    
    // Update notification count
    updateNotificationCount();
}

// Initialize DOM elements
function initDOMElements() {
    currentDateElement = document.getElementById('current-date');
    notificationPanel = document.getElementById('notificationPanel');
    closeNotificationsBtn = document.getElementById('closeNotifications');
    notificationToggle = document.getElementById('notificationToggle');
    
    reportModal = document.getElementById('reportModal');
    closeModalButtons = document.querySelectorAll('.close-modal');
    generateReportBtnModal = document.getElementById('generateReportBtn');
}

// Set current date
function setCurrentDate() {
    if (currentDateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Notification panel
    if (notificationToggle) {
        notificationToggle.addEventListener('click', toggleNotificationPanel);
    }
    
    if (closeNotificationsBtn) {
        closeNotificationsBtn.addEventListener('click', closeNotificationPanel);
    }
    
    // Report modal
    if (reportModal) {
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                closeModal(reportModal);
            });
        });
        
        reportModal.addEventListener('click', (e) => {
            if (e.target === reportModal) {
                closeModal(reportModal);
            }
        });
    }
    
    if (generateReportBtnModal) {
        generateReportBtnModal.addEventListener('click', generateReport);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Global search
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('keyup', handleGlobalSearch);
    }
    
    // Date range change for reports
    const dateRangeSelect = document.getElementById('dateRange');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', handleDateRangeChange);
    }
    
    // Initialize all tooltips
    initTooltips();
    
    // Initialize all data tables
    initDataTables();
}

// Load initial data
function loadInitialData() {
    // Load notifications
    loadNotifications();
    
    // Load recent activity
    loadRecentActivity();
    
    // Load recent orders
    loadRecentOrders();
    
    // Update all badge counts
    updateAllBadgeCounts();
}

// Set active navigation
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
}

// Toggle notification panel
function toggleNotificationPanel() {
    if (notificationPanel) {
        notificationPanel.classList.toggle('active');
    }
}

// Close notification panel
function closeNotificationPanel() {
    if (notificationPanel) {
        notificationPanel.classList.remove('active');
    }
}

// Load notifications
function loadNotifications() {
    const notificationList = document.getElementById('notificationList');
    const recentActivity = document.getElementById('recentActivity');
    
    if (notificationList) {
        notificationList.innerHTML = '';
        AppData.notifications.forEach(notification => {
            const notificationItem = createNotificationElement(notification);
            notificationList.appendChild(notificationItem);
        });
    }
    
    if (recentActivity) {
        recentActivity.innerHTML = '';
        // Load recent activity items
        const activities = [
            {
                icon: 'fa-box-open',
                title: 'New inventory added by Tech Liquidators',
                time: '2 hours ago'
            },
            {
                icon: 'fa-check-circle',
                title: 'Order #ORD-7842 marked as completed',
                time: '5 hours ago'
            },
            // ... more activities
        ];
        
        activities.forEach(activity => {
            const activityItem = createActivityElement(activity);
            recentActivity.appendChild(activityItem);
        });
    }
}

// Create notification element
function createNotificationElement(notification) {
    const div = document.createElement('div');
    div.className = `notification-item ${notification.read ? '' : 'unread'}`;
    div.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${notification.type === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
        </div>
        <div class="notification-content">
            <p><strong>${notification.title}:</strong> ${notification.message}</p>
            <p class="notification-time">${notification.time}</p>
        </div>
    `;
    
    div.addEventListener('click', () => {
        notification.read = true;
        div.classList.remove('unread');
        updateNotificationCount();
    });
    
    return div;
}

// Create activity element
function createActivityElement(activity) {
    const div = document.createElement('div');
    div.className = 'activity-item';
    div.innerHTML = `
        <div class="activity-icon">
            <i class="fas ${activity.icon}"></i>
        </div>
        <div class="activity-details">
            <p><strong>${activity.title}</strong></p>
            <p class="activity-time">${activity.time}</p>
        </div>
    `;
    return div;
}

// Load recent orders
function loadRecentOrders() {
    const tableBody = document.querySelector('#recentOrdersTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    AppData.orders.forEach(order => {
        const row = createOrderRow(order);
        tableBody.appendChild(row);
    });
}

// Create order row
function createOrderRow(order) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.buyer}</td>
        <td>${order.items}</td>
        <td>$${order.total.toLocaleString()}</td>
        <td><span class="status-badge ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
        <td>${order.date}</td>
        <td>
            <button class="table-action view" data-order="${order.id}"><i class="fas fa-eye"></i></button>
            <button class="table-action edit" data-order="${order.id}"><i class="fas fa-edit"></i></button>
        </td>
    `;
    
    // Add event listeners to action buttons
    const viewBtn = row.querySelector('.view');
    const editBtn = row.querySelector('.edit');
    
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showOrderDetails(order.id);
        });
    }
    
    if (editBtn) {
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editOrder(order.id);
        });
    }
    
    // Make entire row clickable
    row.addEventListener('click', () => {
        showOrderDetails(order.id);
    });
    
    return row;
}

// Show order details
function showOrderDetails(orderId) {
    const order = AppData.orders.find(o => o.id === orderId);
    if (!order) return;
    
    // Create modal for order details
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Order Details: ${order.id}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="order-details">
                    <div class="detail-row">
                        <span class="detail-label">Order ID:</span>
                        <span class="detail-value">${order.id}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Buyer:</span>
                        <span class="detail-value">${order.buyer}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="status-badge ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Items:</span>
                        <span class="detail-value">${order.items} items</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Total Amount:</span>
                        <span class="detail-value">$${order.total.toLocaleString()}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Order Date:</span>
                        <span class="detail-value">${order.date}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Payment Status:</span>
                        <span class="detail-value">${order.payment}</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary close-modal">Close</button>
                <button class="btn-primary" id="editOrderDetailsBtn">Edit Order</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    });
    
    modal.querySelector('#editOrderDetailsBtn').addEventListener('click', () => {
        editOrder(order.id);
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Edit order
function editOrder(orderId) {
    showToast(`Editing order: ${orderId}`, 'info');
    // In a real app, this would open an edit form
}

// Update notification count
function updateNotificationCount() {
    const unreadCount = AppData.notifications.filter(n => !n.read).length;
    const badgeElements = document.querySelectorAll('.notification-count');
    
    badgeElements.forEach(badge => {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Update all badge counts
function updateAllBadgeCounts() {
    // Update inventory count
    const inventoryBadges = document.querySelectorAll('.inventory-count');
    inventoryBadges.forEach(badge => {
        badge.textContent = AppData.inventoryItems.length;
    });
    
    // Update vendor count
    const vendorBadges = document.querySelectorAll('.vendor-count');
    vendorBadges.forEach(badge => {
        badge.textContent = AppData.vendors.length;
    });
    
    // Update buyer count
    const buyerBadges = document.querySelectorAll('.buyer-count');
    buyerBadges.forEach(badge => {
        badge.textContent = AppData.buyers.length;
    });
    
    // Update order count
    const orderBadges = document.querySelectorAll('.order-count');
    orderBadges.forEach(badge => {
        badge.textContent = AppData.orders.length;
    });
    
    // Update schedule count
    const scheduleBadges = document.querySelectorAll('.schedule-count');
    scheduleBadges.forEach(badge => {
        badge.textContent = AppData.schedules.length;
    });
}

// Handle global search
function handleGlobalSearch(e) {
    if (e.key === 'Enter') {
        const searchTerm = e.target.value.trim();
        if (searchTerm) {
            showToast(`Searching for: "${searchTerm}"`, 'info');
            // In a real app, this would perform a search across all data
        }
    }
}

// Handle date range change
function handleDateRangeChange(e) {
    const customDateRange = document.getElementById('customDateRange');
    if (e.target.value === 'custom') {
        customDateRange.style.display = 'block';
    } else {
        customDateRange.style.display = 'none';
    }
}

// Generate report
function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const dateRange = document.getElementById('dateRange').value;
    const format = document.getElementById('format').value;
    
    showToast(`Generating ${reportType} report for ${dateRange} in ${format.toUpperCase()} format...`, 'info');
    
    // Simulate report generation
    setTimeout(() => {
        showToast('Report generated successfully!', 'success');
        closeModal(reportModal);
    }, 2000);
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        showToast('Logging out...', 'info');
        // In a real app, this would redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Show modal
function showModal(modal) {
    if (modal) {
        modal.classList.add('active');
    }
}

// Close modal
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    toast.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Close button
    toast.querySelector('.notification-close').addEventListener('click', () => {
        hideToast(toast);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        hideToast(toast);
    }, 5000);
}

// Hide toast
function hideToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 300);
}

// Get toast icon based on type
function getToastIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

// Show tooltip
function showTooltip(e) {
    const tooltipText = e.target.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Initialize data tables
function initDataTables() {
    // Add sorting functionality to tables
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            if (header.textContent !== 'Actions') {
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => {
                    sortTable(table, index);
                });
            }
        });
    });
}

// Sort table
function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAscending = table.getAttribute('data-sort-direction') !== 'asc';
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent;
        const bValue = b.cells[columnIndex].textContent;
        
        // Check if values are numeric
        const aNum = parseFloat(aValue.replace(/[^0-9.-]+/g, ''));
        const bNum = parseFloat(bValue.replace(/[^0-9.-]+/g, ''));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAscending ? aNum - bNum : bNum - aNum;
        } else {
            return isAscending ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        }
    });
    
    // Remove existing rows
    rows.forEach(row => tbody.removeChild(row));
    
    // Add sorted rows
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort direction
    table.setAttribute('data-sort-direction', isAscending ? 'asc' : 'desc');
    
    // Update header sort indicators
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
        header.classList.remove('sort-asc', 'sort-desc');
        if (index === columnIndex) {
            header.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
        }
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Export for use in other modules
window.IMS = {
    showToast,
    showModal,
    closeModal,
    AppData
};
