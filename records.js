const fs = require('fs');
const path = require('path');

let records = {}; // Asegúrate de que records está definido aquí

// Load records from a JSON file
function loadData() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'records.json'), 'utf8');
        records = JSON.parse(data);
    } catch (err) {
        records = {};
    }
}

// Save records to a JSON file
function saveData() {
    const filePath = path.join(__dirname, 'records.json');
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2));
}

// Register check-in
function registerCheckin(user, time) {
    if (!records[user]) {
        records[user] = [];
    }
    // Check if there is already a check-in without a check-out
    if (records[user].length > 0 && records[user][records[user].length - 1].type === 'checkin') {
        console.log('Error: There is already a check-in without a check-out.');
    } else {
        records[user].push({ type: 'checkin', time: time });
        saveData();
    }
}

// Register check-out
function registerCheckout(user, time) {
    if (!records[user] || records[user].length === 0 || records[user][records[user].length - 1].type !== 'checkin') {
        console.log('Error: No check-in to check-out from.');
    } else {
        records[user].push({ type: 'checkout', time: time });
        saveData();
    }
}

module.exports = {
    loadData,
    registerCheckin,
    registerCheckout
};