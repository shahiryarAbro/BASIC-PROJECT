let currentStockData = [];

function loadStockData() {
    currentStockData = getAllMedicinesUnified();
    renderStockTable();
    updateStockStats();
}





function updateStockStats() {
    const totalMedicines = currentStockData.length;
    const lowStockCount = currentStockData.filter(m => m.stock <= 50).length;
    const criticalCount = currentStockData.filter(m => m.stock <= 10).length;
    const expiredCount = currentStockData.filter(m => getExpiryStatusTextUnified(m.expDate) === '💀 EXPIRED').length;
    const expiringCount = currentStockData.filter(m => getExpiryStatusTextUnified(m.expDate) === '⚠️ Expiring Soon').length;
    const totalValue = currentStockData.reduce((sum, m) => sum + (m.price * m.stock), 0);
    
    const statsDiv = document.getElementById('stockStats');
    if (statsDiv) {
        statsDiv.innerHTML = `
            <div class="stat-card">
                <i class="fas fa-pills"></i>
                <div class="stat-number">${totalMedicines}</div>
                <div>Total Medicines</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-exclamation-triangle"></i>
                <div class="stat-number" style="color: #ffd966;">${lowStockCount}</div>
                <div>Low Stock (≤50)</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-skull-crosswalk"></i>
                <div class="stat-number" style="color: #ff6b6b;">${criticalCount}</div>
                <div>Critical (≤10)</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-calendar-times"></i>
                <div class="stat-number" style="color: #dc3545;">${expiredCount}</div>
                <div>Expired</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-hourglass-half"></i>
                <div class="stat-number" style="color: #ffc107;">${expiringCount}</div>
                <div>Expiring Soon</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-rupee-sign"></i>
                <div class="stat-number">RS ${totalValue.toLocaleString()}</div>
                <div>Inventory Value</div>
            </div>
        `;
    }
}





function renderStockTable() {
    const searchTerm = document.getElementById('searchStock')?.value.toLowerCase() || '';
    let filtered = currentStockData.filter(med => med.name.toLowerCase().includes(searchTerm));
    const tbody = document.getElementById('stockTableBody');
    
    if (!tbody) return;
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center;">No medicines found</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    filtered.forEach(med => {
        const row = tbody.insertRow();
        const statusClass = getStockStatusClassUnified(med.stock);
        const statusText = getStockStatusTextUnified(med.stock);
        const expiryClass = getExpiryStatusClassUnified(med.expDate);
        const expiryText = getExpiryStatusTextUnified(med.expDate);
        
        row.innerHTML = `
            <td>${med.id}</td>
            <td><strong>${escapeHtml(med.name)}</strong></td>
            <td>${escapeHtml(med.company)}</td>
            <td>${escapeHtml(med.category)}</td>
            <td>RS ${med.price}</td>
            <td class="${statusClass}"><strong>${med.stock}</strong> units</td>
            <td class="${statusClass}">${statusText}</td>
            <td class="${expiryClass}">${formatDate(med.expDate)}</td>
            <td class="${expiryClass}">${expiryText}</td>
            <td class="action-icons">
                <i class="fas fa-qrcode" onclick="scanQRCodeForMedicine(${med.id})" title="QR Code"></i>
                <i class="fas fa-edit" onclick="openEditMedicine(${med.id})" title="Edit Medicine"></i>
                <i class="fas fa-boxes" onclick="openUpdateStock(${med.id})" title="Update Stock"></i>
                <i class="fas fa-trash-alt" onclick="deleteMedicine(${med.id})" title="Delete Medicine"></i>
            </td>
        `;
    });
}





function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PK');
}



function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}





function searchStock() {
    renderStockTable();
}





function openEditMedicine(id) {
    const medicine = getMedicineByIdUnified(id);
    if (!medicine) return;
    
    const modal = document.getElementById('editModal');
    if (!modal) return;
    
    document.getElementById('editId').value = medicine.id;
    document.getElementById('editName').value = medicine.name;
    document.getElementById('editCompany').value = medicine.company;
    document.getElementById('editCategory').value = medicine.category;
    document.getElementById('editPrice').value = medicine.price;
    document.getElementById('editDiscount').value = medicine.discount || 0;
    document.getElementById('editMfgDate').value = medicine.mfgDate || '';
    document.getElementById('editExpDate').value = medicine.expDate || '';
    document.getElementById('editQRCode').value = medicine.qrCode || '';
    
    modal.style.display = 'block';
}





function saveEditMedicine() {
    const id = parseInt(document.getElementById('editId').value);
    const updatedData = {
        name: document.getElementById('editName').value,
        company: document.getElementById('editCompany').value,
        category: document.getElementById('editCategory').value,
        price: parseFloat(document.getElementById('editPrice').value),
        discount: parseFloat(document.getElementById('editDiscount').value),
        boxMRP: parseFloat(document.getElementById('editPrice').value) * 12,
        mfgDate: document.getElementById('editMfgDate').value,
        expDate: document.getElementById('editExpDate').value,
        qrCode: document.getElementById('editQRCode').value
    };
    
    const success = updateMedicineUnified(id, updatedData);
    if (success) {
        loadStockData();
        closeEditModal();
        showToast('Medicine updated successfully!');
    } else {
        showToast('Failed to update medicine!', 'error');
    }
}





function openUpdateStock(id) {
    const medicine = getMedicineByIdUnified(id);
    if (!medicine) return;
    
    const modal = document.getElementById('stockModal');
    if (!modal) return;
    
    document.getElementById('stockId').value = medicine.id;
    document.getElementById('stockName').textContent = medicine.name;
    document.getElementById('currentStock').textContent = medicine.stock;
    document.getElementById('newStock').value = medicine.stock;
    
    modal.style.display = 'block';
}





function saveStockUpdate() {
    const id = parseInt(document.getElementById('stockId').value);
    const newStock = parseInt(document.getElementById('newStock').value);
    
    if (isNaN(newStock) || newStock < 0) {
        showToast('Please enter a valid stock quantity!', 'error');
        return;
    }
    
    const success = updateMedicineStockUnified(id, newStock);
    if (success) {
        loadStockData();
        closeStockModal();
        showToast('Stock updated successfully!');
    } else {
        showToast('Failed to update stock!', 'error');
    }
}





function deleteMedicine(id) {
    const medicine = getMedicineByIdUnified(id);
    if (!medicine) return;
    
    if (confirm(`⚠️ Are you sure you want to delete "${medicine.name}" permanently?`)) {
        const success = deleteMedicineUnified(id);
        if (success) {
            loadStockData();
            showToast(`"${medicine.name}" deleted successfully!`);
        } else {
            showToast('Failed to delete medicine!', 'error');
        }
    }
}





function openAddMedicine() {
    const modal = document.getElementById('addModal');
    if (modal) {
        document.getElementById('addName').value = '';
        document.getElementById('addCompany').value = '';
        document.getElementById('addCategory').value = '';
        document.getElementById('addPrice').value = '';
        document.getElementById('addStock').value = '';
        document.getElementById('addDiscount').value = '5';
        document.getElementById('addMfgDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('addExpDate').value = '';
        modal.style.display = 'block';
    }
}





function saveAddMedicine() {
    const medicineData = {
        name: document.getElementById('addName').value,
        company: document.getElementById('addCompany').value,
        category: document.getElementById('addCategory').value,
        price: parseFloat(document.getElementById('addPrice').value),
        stock: parseInt(document.getElementById('addStock').value),
        discount: parseFloat(document.getElementById('addDiscount').value) || 5,
        boxMRP: parseFloat(document.getElementById('addPrice').value) * 12,
        mfgDate: document.getElementById('addMfgDate').value,
        expDate: document.getElementById('addExpDate').value
    };
    
    if (!medicineData.name || !medicineData.price) {
        showToast('Please fill all required fields!', 'error');
        return;
    }
    
    const newMedicine = addMedicineUnified(medicineData);
    if (newMedicine) {
        loadStockData();
        closeAddModal();
        showToast(`"${medicineData.name}" added successfully!`);
    } else {
        showToast('Failed to add medicine!', 'error');
    }
}





function scanQRCodeForMedicine(medicineId) {
    const medicine = getMedicineByIdUnified(medicineId);
    if (!medicine) return;
    
    const qrModal = document.getElementById('qrModal');
    const qrDisplay = document.getElementById('qrCodeDisplay');
    
    if (qrModal && qrDisplay) {
        qrDisplay.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-qrcode" style="font-size: 100px; color: #2e8b57;"></i>
                <h3>${escapeHtml(medicine.name)}</h3>
                <p><strong>QR Code:</strong> ${medicine.qrCode}</p>
                <p><strong>Batch/Lot:</strong> ${medicine.qrCode}</p>
                <p><strong>Mfg Date:</strong> ${formatDate(medicine.mfgDate)}</p>
                <p><strong>Exp Date:</strong> ${formatDate(medicine.expDate)}</p>
                <button onclick="printQRCode('${medicine.qrCode}', '${escapeHtml(medicine.name)}')" style="margin-top: 15px; padding: 10px 20px; background: #2e8b57; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-print"></i> Print QR Code
                </button>
            </div>
        `;
        qrModal.style.display = 'block';
    }
}





function printQRCode(qrCode, medicineName) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>QR Code - ${medicineName}</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .qr-container { border: 2px solid #2e8b57; padding: 30px; display: inline-block; border-radius: 10px; }
                .qr-icon { font-size: 150px; color: #2e8b57; }
                h2 { color: #2e8b57; }
                .code { font-size: 20px; font-weight: bold; letter-spacing: 2px; margin-top: 20px; }
                .dates { margin-top: 20px; color: #666; }
            </style>
        </head>
        <body>
            <div class="qr-container">
                <div class="qr-icon"><i class="fas fa-qrcode"></i></div>
                <h2>${medicineName}</h2>
                <div class="code">${qrCode}</div>
                <div class="dates">
                    <p>Pharmacy Management System</p>
                    <p>Scan for product verification</p>
                </div>
            </div>
            <script>
                setTimeout(() => { window.print(); window.close(); }, 500);
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}





function searchMedicineByQR() {
    const qrInput = document.getElementById('qrSearchInput').value.trim();
    if (!qrInput) {
        showToast('Please enter or scan QR code!', 'error');
        return;
    }
    
    const medicine = getMedicineByQRCodeUnified(qrInput);
    if (medicine) {
        showToast(`✅ Found: ${medicine.name}`, 'success');
        openEditMedicine(medicine.id);
        document.getElementById('qrSearchInput').value = '';
        closeQRSearchModal();
    } else {
        showToast('❌ No medicine found with this QR code!', 'error');
    }
}





function openQRSearch() {
    const modal = document.getElementById('qrSearchModal');
    if (modal) {
        document.getElementById('qrSearchInput').value = '';
        modal.style.display = 'block';
    }
}





function closeQRSearchModal() {
    const modal = document.getElementById('qrSearchModal');
    if (modal) modal.style.display = 'none';
}





function closeQRModal() {
    const modal = document.getElementById('qrModal');
    if (modal) modal.style.display = 'none';
}





/*========== MODAL FUNCTIONS ==========*/  
function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.style.display = 'none';
}





function closeStockModal() {
    const modal = document.getElementById('stockModal');
    if (modal) modal.style.display = 'none';
}





function closeAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) modal.style.display = 'none';
}





function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2e8b57' : type === 'error' ? '#dc3545' : '#3498db'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        animation: fadeInOut 3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}





/*========== LISTEN FOR STORAGE CHANGES FROM OTHER PAGES ==========*/
window.addEventListener('storage', function(e) {
    if (e.key === 'unified_pharmacy_medicines') {
        try {
            const newData = JSON.parse(e.newValue);
            if (Array.isArray(newData)) {
                currentStockData = newData;
                renderStockTable();
                updateStockStats();
                showToast('Data synced from another page!', 'info');
            }
        } catch(err) {}
    }
});





/*========== PERIODIC REFRESH ==========*/
let refreshInterval = setInterval(() => {
    if (document.visibilityState === 'visible') {
        loadStockData();
    }
}, 5000);

window.addEventListener('beforeunload', () => {
    if (refreshInterval) clearInterval(refreshInterval);
});





/*========== CLOSE MODALS WHEN CLICKING OUTSIDE ==========*/
window.onclick = function(event) {
    const editModal = document.getElementById('editModal');
    const stockModal = document.getElementById('stockModal');
    const addModal = document.getElementById('addModal');
    const qrModal = document.getElementById('qrModal');
    const qrSearchModal = document.getElementById('qrSearchModal');
    
    if (event.target === editModal) closeEditModal();
    if (event.target === stockModal) closeStockModal();
    if (event.target === addModal) closeAddModal();
    if (event.target === qrModal) closeQRModal();
    if (event.target === qrSearchModal) closeQRSearchModal();
}

document.addEventListener('DOMContentLoaded', () => {
    loadStockData();
});