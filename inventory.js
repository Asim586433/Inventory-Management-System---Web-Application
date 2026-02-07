// inventory.js - Inventory Management Module

document.addEventListener('DOMContentLoaded', function() {
    // Initialize inventory page
    initInventoryPage();
});

function initInventoryPage() {
    // Load inventory data
    loadInventoryData();
    
    // Set up event listeners
    setupInventoryEventListeners();
    
    // Initialize filters
    initInventoryFilters();
}

function loadInventoryData() {
    const tableBody = document.getElementById('inventoryTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Sample inventory data
    const inventoryData = [
        {
            id: 'INV-1001',
            name: 'Smartphone Model X',
            category: 'electronics',
            quantity: 45,
            status: 'available',
            vendor: 'Tech Liquidators',
            location: 'Warehouse A, Shelf B3',
            value: 299.99
        },
        {
            id: 'INV-1002',
            name: 'Office Chair - Ergonomic',
            category: 'furniture',
            quantity: 12,
            status: 'available',
            vendor: 'Office Supplies Inc',
            location: 'Warehouse B, Section 4',
            value: 189.50
        },
        // Add more sample data as needed
    ];
    
    inventoryData.forEach(item => {
        const row = createInventoryRow(item);
        tableBody.appendChild(row);
    });
    
    updateInventoryStats(inventoryData);
}

function createInventoryRow(item) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="checkbox" class="item-checkbox" data-id="${item.id}"></td>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td><span class="status-badge ${item.status}">${item.status}</span></td>
        <td>${item.vendor}</td>
        <td>${item.location}</td>
        <td>$${item.value.toFixed(2)}</td>
        <td>
            <button class="table-action view" data-id="${item.id}"><i class="fas fa-eye"></i></button>
            <button class="table-action edit" data-id="${item.id}"><i class="fas fa-edit"></i></button>
            <button class="table-action delete" data-id="${item.id}"><i class="fas fa-trash"></i></button>
        </td>
    `;
    
    return row;
}

function setupInventoryEventListeners() {
    // Add inventory button
    const addBtn = document.getElementById('addInventoryBtn');
    if (addBtn) {
        addBtn.addEventListener('click', showAddInventoryModal);
    }
    
    // Save inventory button
    const saveBtn = document.getElementById('saveInventoryBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveInventoryItem);
    }
    
    // Export button
    const exportBtn = document.getElementById('exportInventory');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportInventoryData);
    }
    
    // Select all checkbox
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', toggleSelectAllItems);
    }
}

// Similar files would be created for:
// - vendor.js
// - buyer.js
// - orders.js
// - scheduling.js
// - admin.js
// - reports.js
