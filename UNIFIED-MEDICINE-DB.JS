const UNIFIED_MEDICINES = [
    { id: 1, name: "PANADOL", company: "GSK", category: "Tablet", price: 30, stock: 2000, discount: 5, boxMRP: 360, mfgDate: "2024-01-15", expDate: "2026-12-31", qrCode: "MED001" },
    { id: 2, name: "PANADOL EXTRA", company: "GSK", category: "Tablet", price: 35, stock: 1500, discount: 5, boxMRP: 420, mfgDate: "2024-02-10", expDate: "2026-12-31", qrCode: "MED002" },
    { id: 3, name: "PANADOL COLD & FLU", company: "GSK", category: "Tablet", price: 40, stock: 1200, discount: 5, boxMRP: 480, mfgDate: "2024-01-20", expDate: "2026-11-30", qrCode: "MED003" },
    { id: 4, name: "CALPOL", company: "GSK", category: "Syrup", price: 25, stock: 870, discount: 4, boxMRP: 300, mfgDate: "2024-03-01", expDate: "2026-02-28", qrCode: "MED004" },
    { id: 5, name: "BRUFEN", company: "ABBOTT", category: "Syrup", price: 300, stock: 1670, discount: 10, boxMRP: 300, mfgDate: "2024-01-05", expDate: "2026-12-31", qrCode: "MED005" },
    { id: 6, name: "BRUFEN 400mg", company: "ABBOTT", category: "Tablet", price: 35, stock: 1200, discount: 5, boxMRP: 420, mfgDate: "2024-02-15", expDate: "2026-11-30", qrCode: "MED006" },
    { id: 7, name: "BRUFEN 600mg", company: "ABBOTT", category: "Tablet", price: 45, stock: 1000, discount: 5, boxMRP: 540, mfgDate: "2024-01-25", expDate: "2026-12-31", qrCode: "MED007" },
    { id: 8, name: "DISPRIN", company: "RECKITT", category: "Tablet", price: 20, stock: 1900, discount: 3, boxMRP: 240, mfgDate: "2024-02-01", expDate: "2026-10-31", qrCode: "MED008" },
    { id: 9, name: "PONSTAN", company: "PFIZER", category: "Tablet", price: 45, stock: 860, discount: 5, boxMRP: 540, mfgDate: "2024-01-10", expDate: "2026-12-31", qrCode: "MED009" },
    { id: 10, name: "PONSTAN FORTE", company: "PFIZER", category: "Capsule", price: 55, stock: 720, discount: 5, boxMRP: 660, mfgDate: "2024-03-15", expDate: "2026-09-30", qrCode: "MED010" },
    { id: 11, name: "VOLTAREN", company: "NOVARTIS", category: "Tablet", price: 50, stock: 1500, discount: 5, boxMRP: 600, mfgDate: "2024-01-18", expDate: "2026-12-31", qrCode: "MED011" },
    { id: 12, name: "VOLTAREN SR 75mg", company: "NOVARTIS", category: "Tablet", price: 65, stock: 800, discount: 5, boxMRP: 780, mfgDate: "2024-02-20", expDate: "2026-11-30", qrCode: "MED012" },
    { id: 13, name: "NUROFEN", company: "RECKITT", category: "Tablet", price: 45, stock: 1100, discount: 5, boxMRP: 540, mfgDate: "2024-01-30", expDate: "2026-12-31", qrCode: "MED013" },
    { id: 14, name: "ASPIRIN", company: "BAYER", category: "Tablet", price: 15, stock: 2500, discount: 2, boxMRP: 180, mfgDate: "2024-02-05", expDate: "2026-10-31", qrCode: "MED014" },
    { id: 15, name: "FLEXON", company: "ABBOTT", category: "Tablet", price: 42, stock: 950, discount: 5, boxMRP: 504, mfgDate: "2024-03-10", expDate: "2026-08-31", qrCode: "MED015" },
    { id: 16, name: "DOLONEX", company: "GETZ", category: "Tablet", price: 38, stock: 880, discount: 5, boxMRP: 456, mfgDate: "2024-01-22", expDate: "2026-12-31", qrCode: "MED016" },
    { id: 17, name: "AUGMENTIN", company: "GSK", category: "Tablet", price: 100, stock: 980, discount: 10, boxMRP: 1200, mfgDate: "2024-02-12", expDate: "2026-11-30", qrCode: "MED017" },
    { id: 18, name: "AUGMENTIN 625mg", company: "GSK", category: "Tablet", price: 110, stock: 850, discount: 10, boxMRP: 1320, mfgDate: "2024-01-08", expDate: "2026-12-31", qrCode: "MED018" },
    { id: 19, name: "AUGMENTIN SYRUP", company: "GSK", category: "Syrup", price: 350, stock: 450, discount: 10, boxMRP: 350, mfgDate: "2024-03-05", expDate: "2025-12-31", qrCode: "MED019" },
    { id: 20, name: "AMOXIL", company: "GSK", category: "Capsule", price: 75, stock: 700, discount: 8, boxMRP: 900, mfgDate: "2024-02-18", expDate: "2026-10-31", qrCode: "MED020" },
    { id: 21, name: "AMOXIL 500mg", company: "GSK", category: "Capsule", price: 80, stock: 580, discount: 8, boxMRP: 960, mfgDate: "2024-01-28", expDate: "2026-12-31", qrCode: "MED021" },
    { id: 22, name: "ZITHROMAX", company: "PFIZER", category: "Tablet", price: 125, stock: 540, discount: 10, boxMRP: 1500, mfgDate: "2024-02-25", expDate: "2026-09-30", qrCode: "MED022" },
    { id: 23, name: "AZOMAX", company: "GETZ", category: "Tablet", price: 100, stock: 520, discount: 10, boxMRP: 1200, mfgDate: "2024-01-12", expDate: "2026-12-31", qrCode: "MED023" },
    { id: 24, name: "FLAGYL", company: "SANOFI", category: "Tablet", price: 50, stock: 1500, discount: 5, boxMRP: 600, mfgDate: "2024-03-20", expDate: "2026-06-30", qrCode: "MED024" },
    { id: 25, name: "FLAGYL 400mg", company: "SANOFI", category: "Tablet", price: 55, stock: 1300, discount: 5, boxMRP: 660, mfgDate: "2024-02-08", expDate: "2026-11-30", qrCode: "MED025" },
    { id: 26, name: "METROZINE", company: "SAMI", category: "Tablet", price: 40, stock: 780, discount: 5, boxMRP: 480, mfgDate: "2024-01-16", expDate: "2026-12-31", qrCode: "MED026" },
    { id: 27, name: "AMPICLOX", company: "GETZ", category: "Capsule", price: 65, stock: 620, discount: 6, boxMRP: 780, mfgDate: "2024-02-28", expDate: "2026-10-31", qrCode: "MED027" },
    { id: 28, name: "OMEZOL", company: "HIGHNOON", category: "Capsule", price: 55, stock: 620, discount: 5, boxMRP: 660, mfgDate: "2024-03-12", expDate: "2026-07-31", qrCode: "MED028" },
    { id: 29, name: "OMEZOL 40mg", company: "HIGHNOON", category: "Capsule", price: 65, stock: 690, discount: 5, boxMRP: 780, mfgDate: "2024-01-24", expDate: "2026-12-31", qrCode: "MED029" },
    { id: 30, name: "LOSEC", company: "ASTRAZENECA", category: "Capsule", price: 90, stock: 500, discount: 10, boxMRP: 1080, mfgDate: "2024-02-14", expDate: "2026-11-30", qrCode: "MED030" },
    { id: 31, name: "NEXUM", company: "ASTRAZENECA", category: "Capsule", price: 85, stock: 450, discount: 10, boxMRP: 1020, mfgDate: "2024-01-04", expDate: "2026-12-31", qrCode: "MED031" },
    { id: 32, name: "GAVISCON", company: "RECKITT", category: "Syrup", price: 50, stock: 600, discount: 5, boxMRP: 600, mfgDate: "2024-03-08", expDate: "2026-09-30", qrCode: "MED032" },
    { id: 33, name: "MOTILIUM", company: "JANSSEN", category: "Tablet", price: 40, stock: 850, discount: 5, boxMRP: 480, mfgDate: "2024-02-22", expDate: "2026-10-31", qrCode: "MED033" },
    { id: 34, name: "IMODIUM", company: "JANSSEN", category: "Capsule", price: 35, stock: 700, discount: 5, boxMRP: 420, mfgDate: "2024-01-26", expDate: "2026-12-31", qrCode: "MED034" },
    { id: 35, name: "BUSCOPAN", company: "SANOFI", category: "Tablet", price: 38, stock: 880, discount: 5, boxMRP: 456, mfgDate: "2024-03-18", expDate: "2026-08-31", qrCode: "MED035" },
    { id: 36, name: "COZAAR", company: "MSD", category: "Tablet", price: 85, stock: 300, discount: 10, boxMRP: 1020, mfgDate: "2024-01-14", expDate: "2026-12-31", qrCode: "MED036" },
    { id: 37, name: "NORVASC", company: "PFIZER", category: "Tablet", price: 80, stock: 310, discount: 8, boxMRP: 960, mfgDate: "2024-02-02", expDate: "2026-11-30", qrCode: "MED037" },
    { id: 38, name: "PLAVIX", company: "SANOFI", category: "Tablet", price: 120, stock: 240, discount: 15, boxMRP: 1440, mfgDate: "2024-03-14", expDate: "2026-07-31", qrCode: "MED038" },
    { id: 39, name: "CRESTOR", company: "ASTRAZENECA", category: "Tablet", price: 130, stock: 210, discount: 15, boxMRP: 1560, mfgDate: "2024-01-06", expDate: "2026-12-31", qrCode: "MED039" },
    { id: 40, name: "LIPITOR", company: "PFIZER", category: "Tablet", price: 120, stock: 260, discount: 15, boxMRP: 1440, mfgDate: "2024-02-16", expDate: "2026-10-31", qrCode: "MED040" },
    { id: 41, name: "VENTOLIN", company: "GSK", category: "Inhaler", price: 80, stock: 430, discount: 10, boxMRP: 960, mfgDate: "2024-01-20", expDate: "2026-12-31", qrCode: "MED041" },
    { id: 42, name: "SERETIDE", company: "GSK", category: "Inhaler", price: 450, stock: 220, discount: 10, boxMRP: 450, mfgDate: "2024-03-22", expDate: "2026-06-30", qrCode: "MED042" },
    { id: 43, name: "SINGULAIR", company: "MSD", category: "Tablet", price: 100, stock: 340, discount: 10, boxMRP: 1200, mfgDate: "2024-02-10", expDate: "2026-11-30", qrCode: "MED043" },
    { id: 44, name: "ZYRTEC", company: "UCB", category: "Tablet", price: 40, stock: 520, discount: 5, boxMRP: 480, mfgDate: "2024-01-30", expDate: "2026-12-31", qrCode: "MED044" },
    { id: 45, name: "CLARITIN", company: "BAYER", category: "Tablet", price: 45, stock: 480, discount: 5, boxMRP: 540, mfgDate: "2024-02-25", expDate: "2026-10-31", qrCode: "MED045" },
    { id: 46, name: "SURBEX Z", company: "ABBOTT", category: "Tablet", price: 60, stock: 750, discount: 5, boxMRP: 720, mfgDate: "2024-03-01", expDate: "2026-09-30", qrCode: "MED046" },
    { id: 47, name: "NEUROBION", company: "MERCK", category: "Tablet", price: 40, stock: 1100, discount: 5, boxMRP: 480, mfgDate: "2024-01-10", expDate: "2026-12-31", qrCode: "MED047" },
    { id: 48, name: "NEUROBION FORTE", company: "MERCK", category: "Tablet", price: 55, stock: 880, discount: 5, boxMRP: 660, mfgDate: "2024-02-18", expDate: "2026-11-30", qrCode: "MED048" },
    { id: 49, name: "EVION", company: "MARTIN DOW", category: "Capsule", price: 55, stock: 900, discount: 5, boxMRP: 660, mfgDate: "2024-03-25", expDate: "2026-08-31", qrCode: "MED049" },
    { id: 50, name: "CALCIUM SANDOZ", company: "NOVARTIS", category: "Tablet", price: 45, stock: 680, discount: 3, boxMRP: 540, mfgDate: "2024-01-28", expDate: "2026-12-31", qrCode: "MED050" },
];





/*========== STORAGE KEY FOR UNIFIED DATABASE ==========*/
const STORAGE_KEY = 'unified_pharmacy_medicines';

function initUnifiedDatabase() {
    let stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(UNIFIED_MEDICINES));
        console.log("✅ Unified database initialized with " + UNIFIED_MEDICINES.length + " medicines");
        return UNIFIED_MEDICINES;
    }
    
    let medicines = JSON.parse(stored);
    
    // Check if migration is needed (add dates to existing medicines)
    let needsMigration = medicines.some(m => !m.mfgDate || !m.expDate);
    
    if (needsMigration) {
        console.log("🔄 Migration needed - Adding dates to existing medicines...");
        const defaultDates = {
            1: { mfgDate: "2024-01-15", expDate: "2026-12-31", qrCode: "MED001" },
            2: { mfgDate: "2024-02-10", expDate: "2026-12-31", qrCode: "MED002" },
            3: { mfgDate: "2024-01-20", expDate: "2026-11-30", qrCode: "MED003" },
            4: { mfgDate: "2024-03-01", expDate: "2026-02-28", qrCode: "MED004" },
            5: { mfgDate: "2024-01-05", expDate: "2026-12-31", qrCode: "MED005" },
            6: { mfgDate: "2024-02-15", expDate: "2026-11-30", qrCode: "MED006" },
            7: { mfgDate: "2024-01-25", expDate: "2026-12-31", qrCode: "MED007" },
            8: { mfgDate: "2024-02-01", expDate: "2026-10-31", qrCode: "MED008" },
            9: { mfgDate: "2024-01-10", expDate: "2026-12-31", qrCode: "MED009" },
            10: { mfgDate: "2024-03-15", expDate: "2026-09-30", qrCode: "MED010" },
            11: { mfgDate: "2024-01-18", expDate: "2026-12-31", qrCode: "MED011" },
            12: { mfgDate: "2024-02-20", expDate: "2026-11-30", qrCode: "MED012" },
            13: { mfgDate: "2024-01-30", expDate: "2026-12-31", qrCode: "MED013" },
            14: { mfgDate: "2024-02-05", expDate: "2026-10-31", qrCode: "MED014" },
            15: { mfgDate: "2024-03-10", expDate: "2026-08-31", qrCode: "MED015" },
            16: { mfgDate: "2024-01-22", expDate: "2026-12-31", qrCode: "MED016" },
            17: { mfgDate: "2024-02-12", expDate: "2026-11-30", qrCode: "MED017" },
            18: { mfgDate: "2024-01-08", expDate: "2026-12-31", qrCode: "MED018" },
            19: { mfgDate: "2024-03-05", expDate: "2025-12-31", qrCode: "MED019" },
            20: { mfgDate: "2024-02-18", expDate: "2026-10-31", qrCode: "MED020" },
            21: { mfgDate: "2024-01-28", expDate: "2026-12-31", qrCode: "MED021" },
            22: { mfgDate: "2024-02-25", expDate: "2026-09-30", qrCode: "MED022" },
            23: { mfgDate: "2024-01-12", expDate: "2026-12-31", qrCode: "MED023" },
            24: { mfgDate: "2024-03-20", expDate: "2026-06-30", qrCode: "MED024" },
            25: { mfgDate: "2024-02-08", expDate: "2026-11-30", qrCode: "MED025" },
            26: { mfgDate: "2024-01-16", expDate: "2026-12-31", qrCode: "MED026" },
            27: { mfgDate: "2024-02-28", expDate: "2026-10-31", qrCode: "MED027" },
            28: { mfgDate: "2024-03-12", expDate: "2026-07-31", qrCode: "MED028" },
            29: { mfgDate: "2024-01-24", expDate: "2026-12-31", qrCode: "MED029" },
            30: { mfgDate: "2024-02-14", expDate: "2026-11-30", qrCode: "MED030" },
            31: { mfgDate: "2024-01-04", expDate: "2026-12-31", qrCode: "MED031" },
            32: { mfgDate: "2024-03-08", expDate: "2026-09-30", qrCode: "MED032" },
            33: { mfgDate: "2024-02-22", expDate: "2026-10-31", qrCode: "MED033" },
            34: { mfgDate: "2024-01-26", expDate: "2026-12-31", qrCode: "MED034" },
            35: { mfgDate: "2024-03-18", expDate: "2026-08-31", qrCode: "MED035" },
            36: { mfgDate: "2024-01-14", expDate: "2026-12-31", qrCode: "MED036" },
            37: { mfgDate: "2024-02-02", expDate: "2026-11-30", qrCode: "MED037" },
            38: { mfgDate: "2024-03-14", expDate: "2026-07-31", qrCode: "MED038" },
            39: { mfgDate: "2024-01-06", expDate: "2026-12-31", qrCode: "MED039" },
            40: { mfgDate: "2024-02-16", expDate: "2026-10-31", qrCode: "MED040" },
            41: { mfgDate: "2024-01-20", expDate: "2026-12-31", qrCode: "MED041" },
            42: { mfgDate: "2024-03-22", expDate: "2026-06-30", qrCode: "MED042" },
            43: { mfgDate: "2024-02-10", expDate: "2026-11-30", qrCode: "MED043" },
            44: { mfgDate: "2024-01-30", expDate: "2026-12-31", qrCode: "MED044" },
            45: { mfgDate: "2024-02-25", expDate: "2026-10-31", qrCode: "MED045" },
            46: { mfgDate: "2024-03-01", expDate: "2026-09-30", qrCode: "MED046" },
            47: { mfgDate: "2024-01-10", expDate: "2026-12-31", qrCode: "MED047" },
            48: { mfgDate: "2024-02-18", expDate: "2026-11-30", qrCode: "MED048" },
            49: { mfgDate: "2024-03-25", expDate: "2026-08-31", qrCode: "MED049" },
            50: { mfgDate: "2024-01-28", expDate: "2026-12-31", qrCode: "MED050" }
        };
        
        medicines = medicines.map(med => {
            const defaultData = defaultDates[med.id];
            if (defaultData && (!med.mfgDate || !med.expDate)) {
                return { ...med, ...defaultData };
            }
            return med;
        });
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
        console.log("✅ Migration completed!");
    }
    
    console.log("📦 Loaded " + medicines.length + " medicines from unified database");
    return medicines;
}





/*========== GET ALL MEDICINES ==========*/
function getAllMedicinesUnified() {
    let stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initUnifiedDatabase();
    return JSON.parse(stored);
}





/*========== GET MEDICINE BY ID ==========*/
function getMedicineByIdUnified(id) {
    const medicines = getAllMedicinesUnified();
    return medicines.find(m => m.id === id);
}





/*========== GET MEDICINE BY NAME ==========*/
function getMedicineByNameUnified(name) {
    const medicines = getAllMedicinesUnified();
    return medicines.find(m => m.name === name);
}





/*========== GET MEDICINE BY QR CODE ==========*/
function getMedicineByQRCodeUnified(qrCode) {
    const medicines = getAllMedicinesUnified();
    return medicines.find(m => m.qrCode === qrCode);
}





/*========== UPDATE MEDICINE STOCK ==========*/
function updateMedicineStockUnified(medicineId, newStock) {
    let medicines = getAllMedicinesUnified();
    const index = medicines.findIndex(m => m.id === medicineId);
    
    if (index !== -1) {
        medicines[index].stock = newStock;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: STORAGE_KEY,
            newValue: JSON.stringify(medicines)
        }));
        
        console.log(`✅ Stock updated for ${medicines[index].name}: ${newStock}`);
        return true;
    }
    return false;
}





/*========== UPDATE FULL MEDICINE DETAILS ==========*/
function updateMedicineUnified(medicineId, updatedData) {
    let medicines = getAllMedicinesUnified();
    const index = medicines.findIndex(m => m.id === medicineId);
    
    if (index !== -1) {
        medicines[index] = { ...medicines[index], ...updatedData };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: STORAGE_KEY,
            newValue: JSON.stringify(medicines)
        }));
        
        console.log(`✅ Medicine updated: ${medicines[index].name}`);
        return true;
    }
    return false;
}





/*========== ADD NEW MEDICINE ==========*/
function addMedicineUnified(medicineData) {
    let medicines = getAllMedicinesUnified();
    const newId = Math.max(...medicines.map(m => m.id), 0) + 1;
    const newQR = "MED" + String(newId).padStart(3, '0');
    
    const newMedicine = {
        id: newId,
        name: medicineData.name,
        company: medicineData.company || 'Unknown',
        category: medicineData.category || 'General',
        price: medicineData.price || 0,
        stock: medicineData.stock || 0,
        discount: medicineData.discount || 5,
        boxMRP: (medicineData.price || 0) * 12,
        mfgDate: medicineData.mfgDate || new Date().toISOString().split('T')[0],
        expDate: medicineData.expDate || '',
        qrCode: medicineData.qrCode || newQR
    };
    
    medicines.push(newMedicine);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
    
    window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(medicines)
    }));
    
    console.log(`✅ New medicine added: ${newMedicine.name}`);
    return newMedicine;
}





/*========== DELETE MEDICINE ==========*/
function deleteMedicineUnified(medicineId) {
    let medicines = getAllMedicinesUnified();
    const filtered = medicines.filter(m => m.id !== medicineId);
    
    if (filtered.length === medicines.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    
    window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(filtered)
    }));
    
    console.log(`✅ Medicine deleted`);
    return true;
}





/*========== UPDATE STOCK AFTER SALE ==========*/
function updateStockAfterSaleUnified(items) {
    let medicines = getAllMedicinesUnified();
    let insufficientStock = [];
    
    items.forEach(soldItem => {
        const med = medicines.find(m => m.name === soldItem.medicine);
        if (!med) {
            insufficientStock.push(`${soldItem.medicine} not found`);
        } else if (med.stock < soldItem.quantity) {
            insufficientStock.push(`${soldItem.medicine}: Available ${med.stock}, Requested ${soldItem.quantity}`);
        }
    });
    
    if (insufficientStock.length > 0) {
        alert("❌ INSUFFICIENT STOCK:\n" + insufficientStock.join("\n"));
        return false;
    }
    
    items.forEach(soldItem => {
        const med = medicines.find(m => m.name === soldItem.medicine);
        if (med) {
            med.stock -= soldItem.quantity;
        }
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
    
    window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(medicines)
    }));
    
    console.log("✅ Stock updated after sale");
    return true;
}





/*========== GET LOW STOCK MEDICINES (LESS THAN 50) ==========*/
function getLowStockMedicinesUnified() {
    const medicines = getAllMedicinesUnified();
    return medicines.filter(m => m.stock <= 50);
}





/*========== GET CRITICAL STOCK MEDICINES (LESS THAN 10) ==========*/
function getCriticalStockMedicinesUnified() {
    const medicines = getAllMedicinesUnified();
    return medicines.filter(m => m.stock <= 10);
}





/*========== GET EXPIRING MEDICINES (WITHIN 6 MONTHS) ==========*/
function getExpiringMedicinesUnified() {
    const medicines = getAllMedicinesUnified();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    
    return medicines.filter(m => {
        if (!m.expDate) return false;
        const expDate = new Date(m.expDate);
        return expDate <= sixMonthsFromNow && expDate >= new Date();
    });
}





/*========== GET EXPIRED MEDICINES ==========*/
function getExpiredMedicinesUnified() {
    const medicines = getAllMedicinesUnified();
    const today = new Date();
    
    return medicines.filter(m => {
        if (!m.expDate) return false;
        const expDate = new Date(m.expDate);
        return expDate < today;
    });
}





/*========== GET STOCK STATUS CLASS ==========*/
function getStockStatusClassUnified(stock) {
    if (stock <= 10) return 'critical-stock';
    if (stock <= 50) return 'low-stock';
    if (stock <= 200) return 'medium-stock';
    return 'high-stock';
}





/*========== GET STOCK STATUS TEXT ==========*/
function getStockStatusTextUnified(stock) {
    if (stock <= 10) return '⚠️ CRITICAL';
    if (stock <= 50) return '📦 LOW';
    if (stock <= 200) return '🟡 MEDIUM';
    return '✅ GOOD';
}





/*========== GET EXPIRY STATUS CLASS ==========*/
function getExpiryStatusClassUnified(expDate) {
    if (!expDate) return 'expiry-unknown';
    const today = new Date();
    const expiry = new Date(expDate);
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    
    if (expiry < today) return 'expiry-expired';
    if (expiry <= sixMonthsLater) return 'expiry-warning';
    return 'expiry-good';
}





/*========== GET EXPIRY STATUS TEXT ==========*/
function getExpiryStatusTextUnified(expDate) {
    if (!expDate) return '❓ Unknown';
    const today = new Date();
    const expiry = new Date(expDate);
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    
    if (expiry < today) return '💀 EXPIRED';
    if (expiry <= sixMonthsLater) return '⚠️ Expiring Soon';
    return '✅ Valid';
}





/*========== EXPORT FOR GLOBAL USE ==========*/
window.initUnifiedDatabase = initUnifiedDatabase;
window.getAllMedicinesUnified = getAllMedicinesUnified;
window.getMedicineByIdUnified = getMedicineByIdUnified;
window.getMedicineByNameUnified = getMedicineByNameUnified;
window.getMedicineByQRCodeUnified = getMedicineByQRCodeUnified;
window.updateMedicineStockUnified = updateMedicineStockUnified;
window.updateMedicineUnified = updateMedicineUnified;
window.addMedicineUnified = addMedicineUnified;
window.deleteMedicineUnified = deleteMedicineUnified;
window.updateStockAfterSaleUnified = updateStockAfterSaleUnified;
window.getLowStockMedicinesUnified = getLowStockMedicinesUnified;
window.getCriticalStockMedicinesUnified = getCriticalStockMedicinesUnified;
window.getExpiringMedicinesUnified = getExpiringMedicinesUnified;
window.getExpiredMedicinesUnified = getExpiredMedicinesUnified;
window.getStockStatusClassUnified = getStockStatusClassUnified;
window.getStockStatusTextUnified = getStockStatusTextUnified;
window.getExpiryStatusClassUnified = getExpiryStatusClassUnified;
window.getExpiryStatusTextUnified = getExpiryStatusTextUnified;





/*========== MIGRATION FUNCTION TO ADD DATES TO EXISTING MEDICINES ==========*/
function migrateAddDatesToMedicines() {
    let medicines = getAllMedicinesUnified();
    let needsUpdate = false;
    
    const defaultDates = {
        1: { mfgDate: "2024-01-15", expDate: "2026-12-31", qrCode: "MED001" },
        2: { mfgDate: "2024-02-10", expDate: "2026-12-31", qrCode: "MED002" },
        3: { mfgDate: "2024-01-20", expDate: "2026-11-30", qrCode: "MED003" },
        4: { mfgDate: "2024-03-01", expDate: "2026-02-28", qrCode: "MED004" },
        5: { mfgDate: "2024-01-05", expDate: "2026-12-31", qrCode: "MED005" },
        6: { mfgDate: "2024-02-15", expDate: "2026-11-30", qrCode: "MED006" },
        7: { mfgDate: "2024-01-25", expDate: "2026-12-31", qrCode: "MED007" },
        8: { mfgDate: "2024-02-01", expDate: "2026-10-31", qrCode: "MED008" },
        9: { mfgDate: "2024-01-10", expDate: "2026-12-31", qrCode: "MED009" },
        10: { mfgDate: "2024-03-15", expDate: "2026-09-30", qrCode: "MED010" },
        11: { mfgDate: "2024-01-18", expDate: "2026-12-31", qrCode: "MED011" },
        12: { mfgDate: "2024-02-20", expDate: "2026-11-30", qrCode: "MED012" },
        13: { mfgDate: "2024-01-30", expDate: "2026-12-31", qrCode: "MED013" },
        14: { mfgDate: "2024-02-05", expDate: "2026-10-31", qrCode: "MED014" },
        15: { mfgDate: "2024-03-10", expDate: "2026-08-31", qrCode: "MED015" },
        16: { mfgDate: "2024-01-22", expDate: "2026-12-31", qrCode: "MED016" },
        17: { mfgDate: "2024-02-12", expDate: "2026-11-30", qrCode: "MED017" },
        18: { mfgDate: "2024-01-08", expDate: "2026-12-31", qrCode: "MED018" },
        19: { mfgDate: "2024-03-05", expDate: "2025-12-31", qrCode: "MED019" },
        20: { mfgDate: "2024-02-18", expDate: "2026-10-31", qrCode: "MED020" },
        21: { mfgDate: "2024-01-28", expDate: "2026-12-31", qrCode: "MED021" },
        22: { mfgDate: "2024-02-25", expDate: "2026-09-30", qrCode: "MED022" },
        23: { mfgDate: "2024-01-12", expDate: "2026-12-31", qrCode: "MED023" },
        24: { mfgDate: "2024-03-20", expDate: "2026-06-30", qrCode: "MED024" },
        25: { mfgDate: "2024-02-08", expDate: "2026-11-30", qrCode: "MED025" },
        26: { mfgDate: "2024-01-16", expDate: "2026-12-31", qrCode: "MED026" },
        27: { mfgDate: "2024-02-28", expDate: "2026-10-31", qrCode: "MED027" },
        28: { mfgDate: "2024-03-12", expDate: "2026-07-31", qrCode: "MED028" },
        29: { mfgDate: "2024-01-24", expDate: "2026-12-31", qrCode: "MED029" },
        30: { mfgDate: "2024-02-14", expDate: "2026-11-30", qrCode: "MED030" },
        31: { mfgDate: "2024-01-04", expDate: "2026-12-31", qrCode: "MED031" },
        32: { mfgDate: "2024-03-08", expDate: "2026-09-30", qrCode: "MED032" },
        33: { mfgDate: "2024-02-22", expDate: "2026-10-31", qrCode: "MED033" },
        34: { mfgDate: "2024-01-26", expDate: "2026-12-31", qrCode: "MED034" },
        35: { mfgDate: "2024-03-18", expDate: "2026-08-31", qrCode: "MED035" },
        36: { mfgDate: "2024-01-14", expDate: "2026-12-31", qrCode: "MED036" },
        37: { mfgDate: "2024-02-02", expDate: "2026-11-30", qrCode: "MED037" },
        38: { mfgDate: "2024-03-14", expDate: "2026-07-31", qrCode: "MED038" },
        39: { mfgDate: "2024-01-06", expDate: "2026-12-31", qrCode: "MED039" },
        40: { mfgDate: "2024-02-16", expDate: "2026-10-31", qrCode: "MED040" },
        41: { mfgDate: "2024-01-20", expDate: "2026-12-31", qrCode: "MED041" },
        42: { mfgDate: "2024-03-22", expDate: "2026-06-30", qrCode: "MED042" },
        43: { mfgDate: "2024-02-10", expDate: "2026-11-30", qrCode: "MED043" },
        44: { mfgDate: "2024-01-30", expDate: "2026-12-31", qrCode: "MED044" },
        45: { mfgDate: "2024-02-25", expDate: "2026-10-31", qrCode: "MED045" },
        46: { mfgDate: "2024-03-01", expDate: "2026-09-30", qrCode: "MED046" },
        47: { mfgDate: "2024-01-10", expDate: "2026-12-31", qrCode: "MED047" },
        48: { mfgDate: "2024-02-18", expDate: "2026-11-30", qrCode: "MED048" },
        49: { mfgDate: "2024-03-25", expDate: "2026-08-31", qrCode: "MED049" },
        50: { mfgDate: "2024-01-28", expDate: "2026-12-31", qrCode: "MED050" }
    };
    
    medicines.forEach(medicine => {
        if (!medicine.mfgDate || !medicine.expDate) {
            needsUpdate = true;
            const defaultData = defaultDates[medicine.id];
            if (defaultData) {
                medicine.mfgDate = defaultData.mfgDate;
                medicine.expDate = defaultData.expDate;
                medicine.qrCode = defaultData.qrCode;
                console.log(`✅ Added dates to: ${medicine.name}`);
            }
        }
    });
    
    if (needsUpdate) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
        console.log("✅ Migration completed - Dates added to all medicines!");
        return true;
    }
    
    console.log("✅ All medicines already have dates!");
    return false;
}





// Run migration automatically
setTimeout(() => {
    migrateAddDatesToMedicines();
}, 500);

initUnifiedDatabase();
console.log("✅ Unified Medicine Database loaded");