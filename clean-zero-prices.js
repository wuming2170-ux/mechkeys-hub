const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Find all products with price: "$0" and remove them
// Products are separated by commas in the array

// Pattern to match a product object with price: "$0"
const zeroPriceProductRegex = /\{[^}]*price: "\$0"[^}]*\}[,.]/g;

const before = content.length;
content = content.replace(zeroPriceProductRegex, '');
const after = content.length;

console.log(`Removed ${(before - after) / 100} characters worth of $0 products`);

// Count remaining $0 prices
const remaining = (content.match(/price: "\$0"/g) || []).length;
console.log(`Remaining $0 prices: ${remaining}`);

fs.writeFileSync('index.html', content);
