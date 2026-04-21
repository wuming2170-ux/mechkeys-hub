/**
 * Sync inline-products-detailed.js data to all HTML pages
 * Run this after scrape-products.js adds new products
 */
const fs = require('fs');
const path = require('path');

// Read the canonical product data
const content = fs.readFileSync('./inline-products-detailed.js', 'utf8');
const match = content.match(/const topProducts = (\[[\s\S]*?\]);/);
const products = eval('(' + match[1] + ')');

console.log(`Loaded ${products.length} products from inline-products-detailed.js`);

// HTML files to update
const htmlFiles = [
    'index.html',
    '60_percent.html',
    '65_percent.html',
    '75_percent.html',
    'tkl.html',
    'full-size.html',
    'best-value.html',
    'switches.html',
    'compare.html'
];

let updated = 0;

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️  Not found: ${file}`);
        return;
    }

    let html = fs.readFileSync(file, 'utf8');
    
    // Replace the topProducts array
    const newData = `const topProducts = ${JSON.stringify(products, null, 4)};`;
    const updatedHtml = html.replace(
        /const topProducts = \[[\s\S]*?\];/,
        newData
    );
    
    if (updatedHtml === html) {
        console.log(`⚠️  No change: ${file} (no topProducts found)`);
        return;
    }
    
    fs.writeFileSync(file, updatedHtml, 'utf8');
    console.log(`✅ Updated: ${file} (${products.length} products)`);
    updated++;
});

console.log(`\n✅ Sync complete: ${updated} files updated`);
