/*========== SALES HISTORY SYSTEM ==========*/
let salesData = [];



function loadSalesHistory() {
    const stored = localStorage.getItem('sales_history');
    if (stored) {
        salesData = JSON.parse(stored);
    } else {
        salesData = [];
    }
    updateStats();
    renderHistoryTable();
}



function updateStats() {
    const totalSales = salesData.length;
    const totalRevenue = salesData.reduce((sum, sale) => sum + sale.total, 0);
    const totalItems = salesData.reduce((sum, sale) => {
        return sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);
    const uniquePatients = new Set(salesData.map(sale => sale.patientName)).size;
    
    const totalSalesEl = document.getElementById('totalSales');
    const totalRevenueEl = document.getElementById('totalRevenue');
    const totalItemsEl = document.getElementById('totalItems');
    const uniquePatientsEl = document.getElementById('uniquePatients');
    
    if (totalSalesEl) totalSalesEl.textContent = totalSales;
    if (totalRevenueEl) totalRevenueEl.textContent = `RS ${totalRevenue.toFixed(2)}`;
    if (totalItemsEl) totalItemsEl.textContent = totalItems;
    if (uniquePatientsEl) uniquePatientsEl.textContent = uniquePatients;
}



function renderHistoryTable() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const dateFrom = document.getElementById('dateFrom')?.value;
    const dateTo = document.getElementById('dateTo')?.value;
    const sortBy = document.getElementById('sortBy')?.value || 'newest';
    
    let filtered = [...salesData];
    
    /*========== FILTER BY SEARCH TERM ==========*/
    if (searchTerm) {
        filtered = filtered.filter(sale => 
            sale.patientName.toLowerCase().includes(searchTerm) ||
            sale.doctor.toLowerCase().includes(searchTerm) ||
            sale.items.some(item => item.name.toLowerCase().includes(searchTerm))
        );
    }
    
    /*========== FILTER BY DATE RANGE ==========*/
    if (dateFrom) {
        filtered = filtered.filter(sale => new Date(sale.date) >= new Date(dateFrom));
    }
    if (dateTo) {
        filtered = filtered.filter(sale => new Date(sale.date) <= new Date(dateTo));
    }
    
    /*========== SORT ==========*/
    switch(sortBy) {
        case 'oldest':
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'highest':
            filtered.sort((a, b) => b.total - a.total);
            break;
        case 'lowest':
            filtered.sort((a, b) => a.total - b.total);
            break;
        default: // newest
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    const tbody = document.getElementById('historyBody');
    if (!tbody) return;
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 50px;">No sales records found</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    filtered.forEach(sale => {
        const row = tbody.insertRow();
        const dateStr = new Date(sale.date).toLocaleString();
        const itemCount = sale.items.reduce((sum, item) => sum + item.quantity, 0);
        
        row.innerHTML = `
            <td>${sale.billNo}</td>
            <td>${dateStr}</td>
            <td><strong>${escapeHtml(sale.patientName)}</strong></td>
            <td>${escapeHtml(sale.doctor)}</td>
            <td><span class="item-count" onclick="showBillDetails(${sale.id})">${itemCount} items</span></td>
            <td>RS ${sale.total.toFixed(2)}</td>
            <td>${sale.email ? 'Sent' : 'Not Sent'}</td>
            <td>
                <button class="view-details" onclick="showBillDetails(${sale.id})" title="View Bill">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="delete-btn" onclick="deleteSale(${sale.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="print-btn" onclick="printSaleBill(${sale.id})" title="Print">
                    <i class="fas fa-print"></i>
                </button>
            </td>
        `;
    });
}



function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}



function filterHistory() {
    renderHistoryTable();
}



function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');
    const sortBy = document.getElementById('sortBy');
    
    if (searchInput) searchInput.value = '';
    if (dateFrom) dateFrom.value = '';
    if (dateTo) dateTo.value = '';
    if (sortBy) sortBy.value = 'newest';
    
    renderHistoryTable();
}



function showBillDetails(saleId) {
    const sale = salesData.find(s => s.id === saleId);
    if (!sale) return;
    
    const billHTML = generateBillHTMLFromSale(sale);
    const modalContent = document.getElementById('modalBillContent');
    const modal = document.getElementById('billModal');
    
    if (modalContent) modalContent.innerHTML = billHTML;
    if (modal) modal.style.display = 'block';
}



function printSaleBill(saleId) {
    const sale = salesData.find(s => s.id === saleId);
    if (!sale) return;
    
    const billHTML = generateBillHTMLFromSale(sale);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Pharmacy Bill - ${sale.billNo}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .bill-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    .bill-table th, .bill-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    .bill-table th { background: #2e8b57; color: white; }
                    @media print { button { display: none; } }
                </style>
            </head>
            <body>${billHTML}<script>window.print();<\/script></body>
        </html>
    `);
    printWindow.document.close();
}



function generateBillHTMLFromSale(sale) {
    const date = new Date(sale.date).toLocaleString();
    
    let html = `
        <div style="padding: 20px; font-family: monospace;">
            <h3 style="text-align: center; color: #2e8b57;">PREMIUM PHARMACY</h3>
            <p style="text-align: center;">123 Main Street, Karachi, Pakistan</p>
            <p style="text-align: center;">Tel: +92 123 4567890</p>
            <hr>
            <p><strong>Bill No:</strong> ${sale.billNo}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Patient Name:</strong> ${escapeHtml(sale.patientName)}</p>
            <p><strong>Doctor:</strong> ${escapeHtml(sale.doctor)}</p>
            <hr>
            <table class="bill-table" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #2e8b57; color: white;">
                        <th style="padding: 8px;">Medicine</th>
                        <th style="padding: 8px;">Price</th>
                        <th style="padding: 8px;">Qty</th>
                        <th style="padding: 8px;">Total</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    sale.items.forEach(item => {
        html += `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(item.name)}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">RS ${item.price}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">RS ${item.total.toFixed(2)}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
            <hr>
            <p><strong>Subtotal:</strong> RS ${sale.subtotal.toFixed(2)}</p>
            <p><strong>Discount:</strong> RS ${sale.discount.toFixed(2)}</p>
            <p><strong>Tax:</strong> RS ${sale.tax.toFixed(2)}</p>
            <h3><strong>GRAND TOTAL:</strong> RS ${sale.total.toFixed(2)}</h3>
            <hr>
            <p style="text-align: center;">Thank you for your purchase!</p>
            <p style="text-align: center;">*This is a computer generated bill*</p>
        </div>
    `;
    
    return html;
}



function deleteSale(saleId) {
    if (confirm('Are you sure you want to delete this sale record?')) {
        salesData = salesData.filter(s => s.id !== saleId);
        localStorage.setItem('sales_history', JSON.stringify(salesData));
        updateStats();
        renderHistoryTable();
        showToast('Sale record deleted successfully!');
    }
}



function clearAllHistory() {
    if (confirm('⚠️ WARNING: This will delete ALL sales history. This action cannot be undone! Are you sure?')) {
        salesData = [];
        localStorage.setItem('sales_history', JSON.stringify(salesData));
        updateStats();
        renderHistoryTable();
        showToast('All sales history cleared!');
    }
}



function exportToExcel() {
    if (salesData.length === 0) {
        alert('No data to export');
        return;
    }
    
    /*========== PREPARE DATA FOR EXPORT ==========*/
    const exportData = salesData.map(sale => ({
        'Bill No': sale.billNo,
        'Date': new Date(sale.date).toLocaleString(),
        'Patient Name': sale.patientName,
        'Doctor': sale.doctor,
        'Items': sale.items.map(i => `${i.name}(${i.quantity})`).join(', '),
        'Subtotal': sale.subtotal,
        'Discount': sale.discount,
        'Tax': sale.tax,
        'Total': sale.total
    }));
    
    /*========== CONVERT TO CSV ==========*/
    const headers = Object.keys(exportData[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    for (const row of exportData) {
        const values = headers.map(header => {
            const value = row[header];
            const escaped = String(value).replace(/"/g, '""');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }
    
    /*========== DOWNLOAD ==========*/
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_history_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Exported to CSV successfully!');
}



function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}



function closeModal() {
    const modal = document.getElementById('billModal');
    if (modal) modal.style.display = 'none';
}



/*========== CLOSE MODAL WHEN CLICKING OUTSIDE ==========*/
window.onclick = function(event) {
    const modal = document.getElementById('billModal');
    if (event.target === modal) closeModal();
}



/*========== LOAD DATA ON PAGE LOAD ==========*/
document.addEventListener('DOMContentLoaded', () => {
    loadSalesHistory();
});