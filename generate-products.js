/**
 * SerpAPI Amazon Product Generator - Fixed Version
 * 生成正确的 products.js 文件
 */

const fs = require('fs');

// 读取已保存的产品数据
const rawData = fs.readFileSync('amazon-products-backup.json', 'utf-8');
const products = JSON.parse(rawData);

function getPriceTier(price) {
    const p = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    if (p < 50) return 'budget';
    if (p < 100) return 'mid';
    return 'premium';
}

function getConnectivity(name) {
    const n = name.toLowerCase();
    if (n.includes('wireless') || n.includes('bluetooth') || n.includes('2.4ghz')) return 'Bluetooth / 2.4GHz / USB-C';
    return 'USB-C';
}

function detectLayout(name) {
    const n = name.toLowerCase();
    if (n.includes('60%')) return '60%';
    if (n.includes('65%')) return '65%';
    if (n.includes('75%')) return '75%';
    if (n.includes('tkl') || n.includes('tenkeyless')) return 'TKL (87-key)';
    if (n.includes('full') || n.includes('104')) return 'Full Size';
    return 'TKL (87-key)';
}

function detectSwitch(name) {
    const n = name.toLowerCase();
    if (n.includes('linear') || n.includes('red switch')) return 'Linear Red';
    if (n.includes('tactile') || n.includes('brown switch')) return 'Tactile Brown';
    if (n.includes('clicky') || n.includes('blue switch')) return 'Clicky Blue';
    if (n.includes('optical') || n.includes('magnetic')) return 'Optical/Magnetic';
    return 'Gateron';
}

function escapeJs(str) {
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ').substring(0, 200);
}

// 生成 products.js
let js = `// MechKeys Hub - Products Data
// Auto-generated from SerpAPI Amazon Search
// Generated: ${new Date().toISOString()}

const topProducts = [
`;

products.forEach((p, i) => {
    const priceTier = getPriceTier(p.price);
    const connectivity = getConnectivity(p.name);
    const layout = detectLayout(p.name);
    const switchType = detectSwitch(p.name);
    const hotSwap = p.name.toLowerCase().includes('hot swappable') || p.name.toLowerCase().includes('hot-swap');
    const rgb = p.name.toLowerCase().includes('rgb') || p.name.toLowerCase().includes('backlit');
    
    js += `    {
        id: "${p.asin.toLowerCase()}",
        name: "${escapeJs(p.name)}",
        tagline: "${escapeJs(p.name.substring(0, 80))}",
        price: "${p.price}",
        price_tier: "${priceTier}",
        rating: ${p.rating},
        switch_type: "${switchType}",
        layout: "${layout}",
        connectivity: "${connectivity}",
        hot_swap: ${hotSwap},
        rgb: ${rgb},
        image: "${p.image}",
        url: "${p.url}",
        pros: ["Great value", "Popular choice"],
        cons: ["Quality varies"],
        best_for: "Gaming & Typing",
        amazon_asin: "${p.asin}",
        updated: "${new Date().toISOString().split('T')[0]}"
    }`;
    
    if (i < products.length - 1) js += ',';
    js += '\n';
});

js += `];

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { topProducts };
}
`;

fs.writeFileSync('data/products.js', js);
console.log('已生成正确的 data/products.js');
console.log(`共 ${products.length} 个产品`);

// 显示前 3 个产品验证
products.slice(0, 3).forEach((p, i) => {
    console.log(`${i+1}. ${p.name.substring(0, 50)}...`);
    console.log(`   ASIN: ${p.asin} | 价格: ${p.price} | 评分: ${p.rating}`);
});
