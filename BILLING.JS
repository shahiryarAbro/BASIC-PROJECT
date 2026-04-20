let medicinesList = [];
let currentBillItems = [];
let nextMedicineId = 1;





// INITIALIZE EMAILJS  /*========== ==========*/
(function(){
    if (typeof emailjs !== 'undefined') {
    emailjs.init("pIfKxgJHXy6DrdGXb");
}
})();





// LOAD MEDICINES FROM UNIFIED DATABASE
function loadMedicinesFromStorage() {
    medicinesList = getAllMedicinesUnified();
    nextMedicineId = medicinesList.length + 1;
    console.log("📦 Loaded " + medicinesList.length + " medicines from unified database");
}





function initBilling() {
    // SET DEFAULT DATE
    let today = new Date().toISOString().split('T')[0];
    let billDate = document.getElementById('billDate');
    if (billDate) billDate.value = today;
    
    // GENERATE SR NUMBER
    let srNo = localStorage.getItem('lastBillNo') || 1;
    let srNoInput = document.getElementById('srNo');
    if (srNoInput) srNoInput.value = srNo;
    
    // LOAD MEDICINES AND ADD FIRST ROW
    loadMedicinesFromStorage();
    addMedicine();
    filterMedicines();
}





function filterMedicines() {
    let searchTerm = document.getElementById('medicineSearch')?.value.toLowerCase() || '';
    let filtered = medicinesList.filter(m => m.name.toLowerCase().includes(searchTerm));
    
    // UPDATE ALL MEDICINE SELECTS
    for (let i = 0; i < currentBillItems.length; i++) {
        let select = document.getElementById('medicineSelect_' + i);
        if (select) {
            let currentValue = select.value;
            select.innerHTML = '<option value="">Select Medicine</option>';
            filtered.forEach(med => {
                let option = document.createElement('option');
                option.value = med.id;
                let stockStatus = med.stock <= 10 ? '⚠️ LOW STOCK!' : (med.stock <= 50 ? '📦 Low Stock' : '✅ In Stock');
                option.textContent = `${med.name} - RS ${med.price} (Stock: ${med.stock}) ${med.stock <= 10 ? '⚠️' : ''}`;
                if (med.stock <= 0) {
                    option.disabled = true;
                    option.textContent = `${med.name} - OUT OF STOCK`;
                }
                select.appendChild(option);
            });
            if (currentValue) select.value = currentValue;
        }
    }
}





function addMedicine() {
    let container = document.getElementById('medicinesContainer');
    if (!container) return;
    
    let index = currentBillItems.length;
    
    let div = document.createElement('div');
    div.className = 'medicine-item';
    div.id = 'medicineItem_' + index;
    div.innerHTML = `
        <select class="medicine-select" id="medicineSelect_${index}" onchange="updatePrice(${index})">
            <option value="">Select Medicine</option>
        </select>
        <input type="number" class="quantity-input" id="quantity_${index}" placeholder="Qty" value="1" min="1" onchange="updatePrice(${index})">
        <span class="price-display" id="priceDisplay_${index}">RS 0</span>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;
    container.appendChild(div);
    
    currentBillItems.push({ id: null, name: '', price: 0, quantity: 1, total: 0 });
    
    // POPULATE SELECT WITH MEDICINES
    let select = document.getElementById('medicineSelect_' + index);
    if (select) {
        medicinesList.forEach(med => {
            let option = document.createElement('option');
            option.value = med.id;
            let stockStatus = med.stock <= 10 ? '⚠️ LOW STOCK!' : (med.stock <= 50 ? '📦 Low Stock' : '✅ In Stock');
            option.textContent = `${med.name} - RS ${med.price} (Stock: ${med.stock})`;
            if (med.stock <= 0) {
                option.disabled = true;
                option.textContent = `${med.name} - OUT OF STOCK`;
            }
            select.appendChild(option);
        });
    }
    
    filterMedicines();
}





function updatePrice(index) {
    let select = document.getElementById('medicineSelect_' + index);
    let quantityInput = document.getElementById('quantity_' + index);
    
    if (!select || !quantityInput) return;
    
    let quantity = parseInt(quantityInput.value) || 0;
    let medId = parseInt(select.value);
    
    if (medId && !isNaN(medId)) {
        let medicine = medicinesList.find(m => m.id === medId);
        if (medicine) {
            if (quantity > medicine.stock) {
                alert('⚠️ Insufficient stock! Available: ' + medicine.stock);
                quantityInput.value = medicine.stock;
                quantity = medicine.stock;
            }
            let total = medicine.price * quantity;
            let priceDisplay = document.getElementById('priceDisplay_' + index);
            if (priceDisplay) priceDisplay.innerHTML = 'RS ' + total;
            
            currentBillItems[index] = {
                id: medicine.id,
                name: medicine.name,
                price: medicine.price,
                quantity: quantity,
                total: total
            };
        }
    } else {
        let priceDisplay = document.getElementById('priceDisplay_' + index);
        if (priceDisplay) priceDisplay.innerHTML = 'RS 0';
        currentBillItems[index] = { id: null, name: '', price: 0, quantity: 0, total: 0 };
    }
    calculateTotal();
}





function removeItem(index) {
    let item = document.getElementById('medicineItem_' + index);
    if (item) item.remove();
    currentBillItems[index] = { id: null, name: '', price: 0, quantity: 0, total: 0 };
    calculateTotal();
}





function calculateTotal() {
    let subtotal = 0;
    for (let i = 0; i < currentBillItems.length; i++) {
        if (currentBillItems[i] && currentBillItems[i].total) {
            subtotal += currentBillItems[i].total;
        }
    }
    
    let discountPercent = parseFloat(document.getElementById('discountPercent')?.value) || 0;
    let taxPercent = parseFloat(document.getElementById('taxPercent')?.value) || 0;
    
    let discountAmount = (subtotal * discountPercent) / 100;
    let afterDiscount = subtotal - discountAmount;
    let taxAmount = (afterDiscount * taxPercent) / 100;
    let grandTotal = afterDiscount + taxAmount;
    
    let subtotalSpan = document.getElementById('subtotal');
    let discountSpan = document.getElementById('discountAmount');
    let taxSpan = document.getElementById('taxAmount');
    let grandTotalSpan = document.getElementById('grandTotal');
    
    if (subtotalSpan) subtotalSpan.innerHTML = 'RS ' + subtotal.toFixed(2);
    if (discountSpan) discountSpan.innerHTML = 'RS ' + discountAmount.toFixed(2);
    if (taxSpan) taxSpan.innerHTML = 'RS ' + taxAmount.toFixed(2);
    if (grandTotalSpan) grandTotalSpan.innerHTML = grandTotal.toFixed(2);
    
    return { subtotal, discountAmount, taxAmount, grandTotal };
}





function showBill() {
    let patientName = document.getElementById('patientName')?.value;
    if (!patientName) {
        alert('⚠️ Please enter patient name');
        return;
    }
    
    let validItems = currentBillItems.filter(item => item && item.id !== null && item.quantity > 0);
    if (validItems.length === 0) {
        alert('⚠️ Please add at least one medicine');
        return;
    }
    
    let totals = calculateTotal();
    let billContent = generateBillHTML(patientName, validItems, totals);
    let billContentDiv = document.getElementById('billContent');
    let billPreview = document.getElementById('billPreview');
    
    if (billContentDiv) billContentDiv.innerHTML = billContent;
    if (billPreview) billPreview.style.display = 'block';
}





function generateBillHTML(patientName, items, totals) {
    let date = new Date().toLocaleString();
    let doctor = document.getElementById('doctorName')?.value || 'Not Specified';
    let srNo = document.getElementById('srNo')?.value || '1';
    
    let html = `
        <div style="padding: 20px;">
            
            <hr>
            <p><strong>Bill No:</strong> ${srNo}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Patient Name:</strong> ${escapeHtml(patientName)}</p>
            <p><strong>Doctor:</strong> ${escapeHtml(doctor)}</p>
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
    
    items.forEach(item => {
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
            <p><strong>Subtotal:</strong> RS ${totals.subtotal.toFixed(2)}</p>
            <p><strong>Discount:</strong> RS ${totals.discountAmount.toFixed(2)}</p>
            <p><strong>Tax:</strong> RS ${totals.taxAmount.toFixed(2)}</p>
            <h3><strong>GRAND TOTAL:</strong> RS ${totals.grandTotal.toFixed(2)}</h3>
            <hr>
            <p style="text-align: center;">Thank you for your purchase!</p>
            <p style="text-align: center;">*This is a computer generated bill*</p>
        </div>
    `;
    
    return html;
}





function saveToHistory() {
    let patientName = document.getElementById('patientName')?.value;
    if (!patientName) {
        alert('⚠️ Please enter patient name');
        return;
    }
    
    let validItems = currentBillItems.filter(item => item && item.id !== null && item.quantity > 0);
    if (validItems.length === 0) {
        alert('⚠️ Please add at least one medicine');
        return;
    }
    
    // CHECK STOCK BEFORE SAVING
    let insufficientStock = [];
    validItems.forEach(item => {
        let medicine = medicinesList.find(m => m.id === item.id);
        if (medicine && medicine.stock < item.quantity) {
            insufficientStock.push(`${item.name}: Available ${medicine.stock}, Requested ${item.quantity}`);
        }
    });
    
    if (insufficientStock.length > 0) {
        alert('❌ INSUFFICIENT STOCK:\n' + insufficientStock.join('\n'));
        return;
    }
    
    let totals = calculateTotal();
    let srNo = document.getElementById('srNo')?.value || '1';
    let doctor = document.getElementById('doctorName')?.value || 'Not Specified';
    let patientEmail = document.getElementById('patientEmail')?.value || '';
    let patientPhone = document.getElementById('patientPhone')?.value || '';
    let date = new Date().toISOString();
    
    let saleRecord = {
        id: Date.now(),
        billNo: srNo,
        date: date,
        patientName: patientName,
        doctor: doctor,
        email: patientEmail,
        phone: patientPhone,
        items: validItems,
        subtotal: totals.subtotal,
        discount: totals.discountAmount,
        tax: totals.taxAmount,
        total: totals.grandTotal
    };
    
    // UPDATE STOCK USING UNIFIED DATABASE
    let stockUpdateItems = validItems.map(item => ({
        medicine: item.name,
        quantity: item.quantity
    }));
    
    let stockUpdated = updateStockAfterSaleUnified(stockUpdateItems);
    if (!stockUpdated) {
        alert('❌ Failed to update stock!');
        return;
    }
    
    // RELOAD MEDICINES LIST TO REFLECT UPDATED STOCK
    loadMedicinesFromStorage();
    
    // GET EXISTING HISTORY
    let history = localStorage.getItem('sales_history');
    let salesHistory = history ? JSON.parse(history) : [];
    salesHistory.unshift(saleRecord);
    localStorage.setItem('sales_history', JSON.stringify(salesHistory));
    
    // UPDATE BILL NUMBER
    let newSrNo = parseInt(srNo) + 1;
    localStorage.setItem('lastBillNo', newSrNo);
    let srNoInput = document.getElementById('srNo');
    if (srNoInput) srNoInput.value = newSrNo;
    
    alert('✅ Bill saved to history successfully! Stock updated.');
    
    // CLEAR FORM FOR NEXT BILL
    let patientNameInput = document.getElementById('patientName');
    let doctorNameSelect = document.getElementById('doctorName');
    let patientEmailInput = document.getElementById('patientEmail');
    let patientPhoneInput = document.getElementById('patientPhone');
    let discountPercentInput = document.getElementById('discountPercent');
    let taxPercentInput = document.getElementById('taxPercent');
    
    if (patientNameInput) patientNameInput.value = '';
    if (doctorNameSelect) doctorNameSelect.value = '';
    if (patientEmailInput) patientEmailInput.value = '';
    if (patientPhoneInput) patientPhoneInput.value = '';
    if (discountPercentInput) discountPercentInput.value = '0';
    if (taxPercentInput) taxPercentInput.value = '0';
    
    let container = document.getElementById('medicinesContainer');
    if (container) container.innerHTML = '';
    currentBillItems = [];
    addMedicine();
    calculateTotal();
    
    let billPreview = document.getElementById('billPreview');
    if (billPreview) billPreview.style.display = 'none';
    
        // REFRESH THE MEDICINE LIST DISPLAY
    filterMedicines();
}





function sendBillByEmail() {
    let patientEmail = document.getElementById('patientEmail')?.value;
    if (!patientEmail) {
        alert('⚠️ Please enter an email address');
        return;
    }
    
    let patientName = document.getElementById('patientName')?.value;
    if (!patientName) {
        alert('⚠️ Please enter patient name');
        return;
    }
    
    let validItems = currentBillItems.filter(item => item && item.id !== null && item.quantity > 0);
    if (validItems.length === 0) {
        alert('⚠️ Please add at least one medicine');
        return;
    }
    
    let totals = calculateTotal();
    let billHTML = generateBillHTML(patientName, validItems, totals);
    
    if (typeof emailjs !== 'undefined') {
        let templateParams = {
            to_email: patientEmail,
            to_name: patientName,
            message: billHTML
        };
        
        emailjs.send('service_pharmacy', 'template_bill', templateParams)
            .then(function(response) {
                alert('✅ Bill sent successfully to ' + patientEmail);
            }, function(error) {
                alert('❌ Failed to send email. Please check your email address.');
                console.error('Email error:', error);
            });
    } else {
        alert('⚠️ Email service not initialized. Please check your internet connection.');
    }
}





function printBill() {
    let billContent = document.getElementById('billContent')?.innerHTML;
    if (!billContent) {
        alert('⚠️ Please preview the bill first');
        return;
    }
    
    let printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Pharmacy Bill</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .bill-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    .bill-table th, .bill-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    .bill-table th { background: #2e8b57; color: white; }
                    @media print { button { display: none; } }
                </style>
            </head>
            <body>
                ${billContent}
                <script>window.print();window.onafterprint = function(){ window.close(); };<\/script>
            </body>
        </html>
    `);
    printWindow.document.close();
}





function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}





// LISTEN FOR STOCK UPDATES FROM OTHER PAGES
window.addEventListener('storage', function(e) {
    if (e.key === 'unified_pharmacy_medicines') {
        try {
            const newData = JSON.parse(e.newValue);
            if (Array.isArray(newData)) {
                medicinesList = newData;
                filterMedicines();
                showToast('Stock updated from another page!', 'info');
            }
        } catch(err) {
            console.error('Storage parse error:', err);
        }
    }
});





function showToast(message, type = 'success'){
    const toast = document.createElement('div');
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


// INITIALIZE WHEN DOM IS READY
document.addEventListener('DOMContentLoaded', () =>{
    initBilling();
});


// MAKE FUNCTIONS GLOBAL
window.addMedicine = addMedicine;
window.updatePrice = updatePrice;
window.removeItem = removeItem;
window.calculateTotal = calculateTotal;
window.showBill = showBill;
window.saveToHistory = saveToHistory;
window.sendBillByEmail = sendBillByEmail;
window.printBill = printBill;
window.filterMedicines = filterMedicines;

