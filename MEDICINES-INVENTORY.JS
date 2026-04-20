let inventoryMedicines = [];





function loadInventoryData(){
    inventoryMedicines = getAllMedicinesUnified();
    renderInventoryTable();
}





function renderInventoryTable(){
    const searchTerm = document.getElementById('searchMedicine')?.value.toLowerCase() || '';
    const filtered = inventoryMedicines.filter(med => med.name.toLowerCase().includes(searchTerm));
    const tbody = document.getElementById('inventoryBody');
    
    if (!tbody) return;
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" style="text-align: center;">No medicines found</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    filtered.forEach((med) =>{
        const discountAmount = med.discount || 0;
        const finalPrice = med.price - discountAmount;
        const boxMrp = med.boxMRP || (med.price * 12);
        const expiryClass = getExpiryStatusClassUnified(med.expDate);
        const expiryText = getExpiryStatusTextUnified(med.expDate);
        
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${med.id}</td>
            <td><strong>${escapeHtml(med.name)}</strong></td>
            <td>${escapeHtml(med.company)}</td>
            <td>${escapeHtml(med.category)}</td>
            <td>RS ${boxMrp}</td>
            <td>RS ${med.price}</td>
            <td>RS ${discountAmount}</td>
            <td>RS ${finalPrice}</td>
            <td><strong class="${getStockStatusClassUnified(med.stock)}">${med.stock}</strong></td>
            <td class="${expiryClass}">${formatInventoryDate(med.expDate)}</td>
            <td class="${expiryClass}">${expiryText}</td>
        `;
    });
}





function formatInventoryDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PK');
}





function escapeHtml(str){
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}





function searchInventory() {
    renderInventoryTable();
}





/*========== LISTEN FOR STORAGE CHANGES FROM OTHER TABS/PAGES ==========*/
window.addEventListener('storage', function(e) {
    if (e.key === 'unified_pharmacy_medicines') {
        try {
            const newData = JSON.parse(e.newValue);
            if (Array.isArray(newData)) {
                inventoryMedicines = newData;
                renderInventoryTable();
                showToast('Stock updated from another page!', 'info');
            }
        } catch(err) {
            console.error('Storage parse error:', err);
        }
    }
});





/*========== PERIODIC REFRESH (EVERY 5 SECONDS) ==========*/
let refreshInterval = setInterval(() => {
    if (document.visibilityState === 'visible') {
        loadInventoryData();
    }
}, 5000);





/*========== CLEANUP INTERVAL ON PAGE UNLOAD ==========*/
window.addEventListener('beforeunload', () => {
    if (refreshInterval) clearInterval(refreshInterval);
});

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





document.addEventListener('DOMContentLoaded', () => {
    loadInventoryData();
});