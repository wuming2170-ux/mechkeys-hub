/**
 * Generate all 30 products - use details when available, basic info otherwise
 */
const fs = require('fs');

// 读取产品基础数据和详细描述
const details = JSON.parse(fs.readFileSync('product-details.json', 'utf-8'));
const products = JSON.parse(fs.readFileSync('amazon-products-backup.json', 'utf-8'));

// 从描述中提取简短的 pros
function extractPros(descItems, name) {
    const pros = [];
    const n = name.toLowerCase();
    
    if (n.includes('hot-swap') || n.includes('hotswap')) pros.push('Hot-swappable');
    if (n.includes('rgb') || n.includes('backlit')) pros.push('RGB Backlight');
    if (n.includes('wireless') || n.includes('bluetooth')) pros.push('Wireless');
    if (n.includes('gasket')) pros.push('Gasket Mount');
    if (n.includes('pbt')) pros.push('PBT Keycaps');
    if (n.includes('tkl') || n.includes('tenkeyless')) pros.push('TKL Layout');
    if (n.includes('60%') || n.includes('65%') || n.includes('75%')) pros.push('Compact Layout');
    
    if (descItems && descItems.length > 0) {
        descItems.forEach(d => {
            const firstPart = d.split(':')[0].trim();
            if (firstPart.length > 5 && firstPart.length < 50 && pros.length < 4) {
                pros.push(firstPart);
            }
        });
    }
    
    if (pros.length < 2) {
        pros.push('Quality Build');
        pros.push('Great Value');
    }
    
    return pros.slice(0, 4);
}

// 合并数据 - 使用所有30个产品
const mergedProducts = products.slice(0, 30).map(p => {
    const d = details.find(x => x.asin === p.asin);
    
    const descItems = d && d.description ? d.description.split('\n\n').slice(0, 3) : [];
    const pros = descItems.length > 0 ? extractPros(descItems, p.name) : ['Quality Build', 'Great Value'];
    
    return {
        id: p.asin.toLowerCase(),
        name: p.name.substring(0, 100),
        tagline: p.name.substring(0, 80),
        price: p.price || '$0',
        price_tier: (parseFloat((p.price || '$0').replace(/[^0-9.]/g, '')) || 0) < 50 ? 'budget' : (parseFloat((p.price || '$0').replace(/[^0-9.]/g, '')) || 0) < 100 ? 'mid' : 'premium',
        rating: parseFloat(p.rating) || 4.5,
        switch_type: detectSwitch(p.name),
        layout: detectLayout(p.name),
        connectivity: p.name.toLowerCase().includes('wireless') || p.name.toLowerCase().includes('bluetooth') || p.name.toLowerCase().includes('2.4ghz') ? 'Bluetooth / 2.4GHz / USB-C' : 'USB-C',
        hot_swap: p.name.toLowerCase().includes('hot-swap') || p.name.toLowerCase().includes('hotswap'),
        rgb: p.name.toLowerCase().includes('rgb') || p.name.toLowerCase().includes('backlit') || p.name.toLowerCase().includes('led'),
        image: p.image,
        url: `https://www.amazon.com/dp/${p.asin}?tag=mechkeyshub-20`,
        brand: detectBrand(p.name),
        pros: pros,
        description: descItems,
        specifications: d && d.specifications ? d.specifications : {},
        amazon_asin: p.asin,
        updated: '2026-04-02'
    };
});

function detectLayout(name) {
    const n = name.toLowerCase();
    if (n.includes('60%') || n.includes('68 key')) return '60%';
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

function detectBrand(name) {
    const n = name.toLowerCase();
    const brands = ['keychron', 'logitech', 'razer', 'corsair', 'steelseries', 'leopold', 'filco', 'ducky', 'nupy', 'akko', 'aula', 'redragon', 'cherry', 'asus', 'hhkb', 'solakaka', 'newmen'];
    for (const b of brands) {
        if (n.includes(b)) return b.charAt(0).toUpperCase() + b.slice(1);
    }
    return 'Other';
}

// 生成内嵌 JavaScript
let jsData = `const topProducts = [
`;
mergedProducts.forEach((p, i) => {
    jsData += `    {id:"${p.id}",name:"${p.name.replace(/"/g, '\\"')}",tagline:"${p.tagline.replace(/"/g, '\\"')}",price:"${p.price}",price_tier:"${p.price_tier}",rating:${p.rating},switch_type:"${p.switch_type}",layout:"${p.layout}",connectivity:"${p.connectivity}",hot_swap:${p.hot_swap},rgb:${p.rgb},image:"${p.image}",url:"${p.url}",brand:"${p.brand}",pros:${JSON.stringify(p.pros)},description:${JSON.stringify(p.description)},amazon_asin:"${p.amazon_asin}",updated:"${p.updated}"}`;
    if (i < mergedProducts.length - 1) jsData += ',';
    jsData += '\n';
});
jsData += '];';

fs.writeFileSync('inline-products-detailed.js', jsData);
console.log('Generated ' + mergedProducts.length + ' products');

// 显示统计
const bySwitch = {};
const byLayout = {};
mergedProducts.forEach(p => {
    bySwitch[p.switch_type] = (bySwitch[p.switch_type] || 0) + 1;
    byLayout[p.layout] = (byLayout[p.layout] || 0) + 1;
});

console.log('\nBy Switch Type:');
Object.entries(bySwitch).forEach(([k, v]) => console.log('  ' + k + ': ' + v));
console.log('\nBy Layout:');
Object.entries(byLayout).forEach(([k, v]) => console.log('  ' + k + ': ' + v));
