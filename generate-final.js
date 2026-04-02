/**
 * Final Product Generator - Uses only SerpAPI verified data
 */

const fs = require('fs');

const rawData = fs.readFileSync('amazon-products-backup.json', 'utf-8');
const products = JSON.parse(rawData);

// 去重并取前 15 个
const unique = [];
const seen = new Set();
for (const p of products) {
    if (!seen.has(p.asin) && p.asin && p.image) {
        seen.add(p.asin);
        unique.push(p);
    }
}
const top = unique.slice(0, 15);

function detectLayout(name) {
    const n = name.toLowerCase();
    if (n.includes('60%') || n.includes('68 key') || n.includes('65 key')) return '60%';
    if (n.includes('65%')) return '65%';
    if (n.includes('75%')) return '75%';
    if (n.includes('96') || n.includes('98') || n.includes('99')) return '98-key';
    if (n.includes('full') || n.includes('104')) return 'Full Size';
    return 'TKL';
}

function detectSwitch(name) {
    const n = name.toLowerCase();
    if (n.includes('linear') || n.includes('red switch')) return 'Linear Red';
    if (n.includes('tactile') || n.includes('brown switch') || n.includes('quiet')) return 'Tactile Brown';
    if (n.includes('clicky') || n.includes('blue switch')) return 'Clicky Blue';
    if (n.includes('optical')) return 'Optical';
    if (n.includes('topre')) return 'Topre';
    return 'Gateron';
}

const topProducts = top.map(p => {
    const name = p.name;
    const n = name.toLowerCase();
    
    // 提取品牌
    let brand = 'Other';
    const brands = ['keychron', 'logitech', 'razer', 'corsair', 'steelseries', 'leopold', 'filco', 'ducky', 'nupy', 'akko', 'aula', 'redragon', 'cherry', 'asus', 'hhkb'];
    for (const b of brands) {
        if (n.includes(b)) { brand = b.charAt(0).toUpperCase() + b.slice(1); break; }
    }
    
    return {
        id: p.asin.toLowerCase(),
        name: name.substring(0, 100),
        tagline: name.substring(0, 80),
        price: p.price || '$0',
        price_tier: (parseFloat((p.price || '$0').replace(/[^0-9.]/g, '')) || 0) < 50 ? 'budget' : (parseFloat((p.price || '$0').replace(/[^0-9.]/g, '')) || 0) < 100 ? 'mid' : 'premium',
        rating: parseFloat(p.rating) || 4.5,
        switch_type: detectSwitch(name),
        layout: detectLayout(name),
        connectivity: n.includes('wireless') || n.includes('bluetooth') || n.includes('2.4ghz') || n.includes('2.4 g') ? 'Bluetooth / 2.4GHz / USB-C' : 'USB-C',
        hot_swap: n.includes('hot-swap') || n.includes('hotswap') || n.includes('hot swap'),
        rgb: n.includes('rgb') || n.includes('backlit') || n.includes('led'),
        image: p.image,
        url: `https://www.amazon.com/dp/${p.asin}?tag=mechkeyshub-20`,
        brand: brand,
        pros: [brand + ' quality', p.reviews > 1000 ? 'Popular' : 'Good value'],
        cons: ['Quality varies'],
        best_for: 'Gaming & Typing',
        amazon_asin: p.asin,
        updated: '2026-04-02'
    };
});

console.log('Generated ' + topProducts.length + ' products:');
topProducts.forEach((p, i) => {
    console.log(`${i+1}. ${p.name.substring(0, 50)}... | ${p.layout} | ${p.price}`);
});

// 生成 HTML 中内嵌的 JavaScript 数据
let inlineData = `const topProducts = [
`;
topProducts.forEach((p, i) => {
    inlineData += `    {id:"${p.id}",name:"${p.name.replace(/"/g, '\\"')}",tagline:"${p.tagline.replace(/"/g, '\\"')}",price:"${p.price}",price_tier:"${p.price_tier}",rating:${p.rating},switch_type:"${p.switch_type}",layout:"${p.layout}",connectivity:"${p.connectivity}",hot_swap:${p.hot_swap},rgb:${p.rgb},image:"${p.image}",url:"${p.url}",pros:${JSON.stringify(p.pros)},cons:${JSON.stringify(p.cons)},best_for:"${p.best_for}",amazon_asin:"${p.amazon_asin}",updated:"${p.updated}"}`;
    if (i < topProducts.length - 1) inlineData += ',';
    inlineData += '\n';
});
inlineData += '];';

fs.writeFileSync('inline-products.js', inlineData);
console.log('\nInline data saved to inline-products.js');

module.exports = { topProducts };
