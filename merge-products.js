/**
 * 产品数据合并与增强脚本
 * 1. 保留现有详细产品数据
 * 2. 合并新增产品
 * 3. 智能填充缺失字段
 */
const fs = require('fs');

// 加载现有详细数据
const existingFile = fs.readFileSync('./inline-products-detailed.js', 'utf8');
const existingMatch = existingFile.match(/const topProducts = (\[[\s\S]*?\]);?\s*$/m);
let existingProducts = [];
if (existingMatch) {
    try {
        existingProducts = eval('(' + existingMatch[1] + ')');
    } catch(e) {
        console.log('解析现有产品失败:', e.message);
    }
}
console.log('现有详细产品:', existingProducts.length);

// 加载新采集数据
const newProducts = JSON.parse(fs.readFileSync('./all-products-collected.json', 'utf8'));
console.log('新采集产品:', newProducts.length);

// 创建现有 ASIN 映射
const existingMap = new Map();
existingProducts.forEach(p => existingMap.set(p.asin?.toUpperCase() || p.id?.toUpperCase(), p));

// 辅助函数
function detectLayout(name) {
    const n = name.toLowerCase();
    if (n.includes('60%') || n.includes('60 percent') || n.includes('68 key') || n.includes('61 key')) return '60%';
    if (n.includes('65%') || n.includes('65 percent') || n.includes('68 key')) return '65%';
    if (n.includes('75%') || n.includes('75 percent')) return '75%';
    if (n.includes('tkl') || n.includes('tenkeyless') || n.includes('80%') || n.includes('87 key')) return 'TKL';
    if (n.includes('full') || n.includes('104 key') || n.includes('full-size') || n.includes('108 key')) return 'Full Size';
    if (n.includes('98 key') || n.includes('96%')) return '98-key';
    if (n.includes('87 key')) return 'TKL';
    return 'TKL';
}

function detectSwitch(name) {
    const n = name.toLowerCase();
    if (n.includes('linear red') || n.includes('red switch')) return 'Linear Red';
    if (n.includes('linear') && !n.includes('tactile')) return 'Linear Red';
    if (n.includes('tactile brown') || n.includes('brown switch')) return 'Tactile Brown';
    if (n.includes('tactile')) return 'Tactile Brown';
    if (n.includes('clicky blue') || n.includes('blue switch')) return 'Clicky Blue';
    if (n.includes('clicky')) return 'Clicky Blue';
    if (n.includes('optical')) return 'Optical';
    if (n.includes('magnetic') || n.includes('hall effect')) return 'Magnetic/Hall Effect';
    if (n.includes('silent') || n.includes('quiet')) return 'Silent Red';
    if (n.includes('yellow')) return 'Linear Yellow';
    if (n.includes('gateron')) return 'Gateron';
    return 'Linear Red';
}

function getConnectivity(name) {
    const n = name.toLowerCase();
    if (n.includes('wireless') || n.includes('bluetooth') || n.includes('2.4ghz') || n.includes('2.4 g')) {
        if (n.includes('usb-c') || n.includes('usb c')) return 'Bluetooth / 2.4GHz / USB-C';
        return 'Bluetooth / 2.4GHz';
    }
    if (n.includes('tri-mode') || n.includes('tri mode')) return 'Bluetooth / 2.4GHz / USB-C';
    return 'USB-C';
}

function getPriceTier(price) {
    const p = parseFloat((price || '$0').replace(/[^0-9.]/g, '')) || 0;
    if (p < 50) return 'budget';
    if (p < 100) return 'mid';
    return 'premium';
}

function hasFeature(name, features) {
    const n = name.toLowerCase();
    return features.some(f => n.includes(f.toLowerCase()));
}

function generatePros(name, brand) {
    const n = name.toLowerCase();
    const pros = [];
    
    if (hasFeature(n, ['rgb', 'backlit', 'backlight'])) pros.push('RGB Backlight');
    if (hasFeature(n, ['hot swap', 'hotswap', 'hot-swappable'])) pros.push('Hot-Swappable');
    if (hasFeature(n, ['wireless', 'bluetooth', '2.4ghz'])) pros.push('Wireless');
    if (hasFeature(n, ['gasket'])) pros.push('Gasket Mount');
    if (hasFeature(n, ['pbt', 'pbt keycap'])) pros.push('PBT Keycaps');
    if (hasFeature(n, ['tkl', 'tenkeyless'])) pros.push('Compact TKL Layout');
    if (hasFeature(n, ['60%', '65%', '75%'])) pros.push('Compact Layout');
    if (hasFeature(n, ['full size', '104 key'])) pros.push('Full Size with Numpad');
    if (hasFeature(n, ['optical'])) pros.push('Optical Switches');
    if (hasFeature(n, ['rapid trigger', 'hall effect', 'magnetic'])) pros.push('Rapid Trigger');
    if (hasFeature(n, ['low profile', 'low-profile'])) pros.push('Low Profile');
    if (hasFeature(n, ['multi-device', 'multi device'])) pros.push('Multi-Device');
    if (hasFeature(n, ['macro'])) pros.push('Macro Keys');
    if (hasFeature(n, ['multimedia', 'media control'])) pros.push('Media Controls');
    if (hasFeature(n, ['knob', 'dial'])) pros.push('Control Knob');
    if (hasFeature(n, ['sound dampening', 'foam', 'dampen'])) pros.push('Sound Dampening');
    
    if (pros.length === 0) {
        if (brand === 'Keychron') pros.push('Popular Brand', 'Good Build Quality');
        else if (brand === 'Leopold') pros.push('Premium Build', 'German Engineering');
        else if (brand === 'Ducky') pros.push('Taiwan Quality', 'Durable');
        else if (brand === 'NuPhy') pros.push('Wireless Premium', 'Slim Design');
        else pros.push('Great Value', 'Popular Choice');
    }
    
    return pros.slice(0, 4);
}

function generateDescription(name) {
    // 从名称提取关键词生成简短描述
    const n = name.toLowerCase();
    const desc = [];
    
    if (n.includes('gaming')) desc.push('Designed for competitive gaming with responsive switches and anti-ghosting.');
    else if (n.includes('office') || n.includes('work')) desc.push('Perfect for office and productivity work with quiet operation.');
    else desc.push('Versatile mechanical keyboard suitable for both gaming and everyday typing.');
    
    if (n.includes('wireless') || n.includes('bluetooth')) {
        desc.push('Wireless connectivity for a clean desk setup without cable clutter.');
    }
    
    if (n.includes('hot swap') || n.includes('hotswap')) {
        desc.push('Hot-swappable switches allow easy customization without soldering.');
    }
    
    return desc;
}

function slugify(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 50);
}

// 合并产品
const mergedProducts = [];
const seen = new Set();

for (const p of existingProducts) {
    const key = (p.amazon_asin || p.id || '').toUpperCase();
    if (key && !seen.has(key)) {
        seen.add(key);
        mergedProducts.push(p);
    }
}

console.log('保留现有产品:', mergedProducts.length);

let newAdded = 0;
for (const p of newProducts) {
    const key = p.asin.toUpperCase();
    if (seen.has(key)) continue;
    seen.add(key);
    
    // 检测字段
    const layout = detectLayout(p.name);
    const switchType = detectSwitch(p.name);
    const connectivity = getConnectivity(p.name);
    const priceTier = getPriceTier(p.price);
    const hotSwap = hasFeature(p.name, ['hot swap', 'hotswap', 'hot-swappable', 'hot swap pcb']);
    const rgb = hasFeature(p.name, ['rgb', 'backlit', 'backlight', 'led']);
    const pros = generatePros(p.name, p.brand);
    const description = generateDescription(p.name);
    
    mergedProducts.push({
        id: p.asin.toLowerCase(),
        name: p.name.substring(0, 150),
        tagline: p.name.substring(0, 80),
        price: p.price || '$0',
        price_tier: priceTier,
        rating: p.rating || 4.0,
        switch_type: switchType,
        layout: layout,
        connectivity: connectivity,
        hot_swap: hotSwap,
        rgb: rgb,
        image: p.image,
        url: (p.url.includes('?') ? p.url.substring(0, p.url.indexOf('?')) : p.url) + '?tag=mechkeyshub-20',
        brand: p.brand,
        pros: pros,
        description: description,
        amazon_asin: p.asin,
        updated: new Date().toISOString().split('T')[0]
    });
    newAdded++;
}

console.log('新增产品:', newAdded);
console.log('合并后总计:', mergedProducts.length);

// 按品牌统计
const brandCount = {};
mergedProducts.forEach(p => {
    const b = p.brand || 'Other';
    brandCount[b] = (brandCount[b] || 0) + 1;
});
console.log('\n品牌分布:');
Object.entries(brandCount).sort((a,b)=>b[1]-a[1]).forEach(([b,c]) => console.log(`  ${c} ${b}`));

// 生成 JS 文件
const jsLines = [];
jsLines.push(`// MechKeys Hub - Products Data`);
jsLines.push(`// Auto-generated: ${new Date().toISOString()}`);
jsLines.push(`// Total products: ${mergedProducts.length}`);
jsLines.push(``);
jsLines.push(`const topProducts = [`);

mergedProducts.forEach((p, i) => {
    const pros = p.pros ? `[${p.pros.map(pr => `"${pr}"`).join(',')}]` : '[]';
    const desc = p.description ? `[${p.description.map(d => `"${d.replace(/"/g, '\\"')}"`).join(',')}]` : '[]';
    
    jsLines.push(`    {`);
    jsLines.push(`        id: "${p.id || p.amazon_asin}",`);
    jsLines.push(`        name: "${(p.name || '').replace(/"/g, '\\"').substring(0, 150)}",`);
    jsLines.push(`        tagline: "${(p.tagline || p.name || '').replace(/"/g, '\\"').substring(0, 80)}",`);
    jsLines.push(`        price: "${p.price || '$0'}",`);
    jsLines.push(`        price_tier: "${p.price_tier || 'mid'}",`);
    jsLines.push(`        rating: ${p.rating || 4.0},`);
    jsLines.push(`        switch_type: "${p.switch_type || 'Linear Red'}",`);
    jsLines.push(`        layout: "${p.layout || 'TKL'}",`);
    jsLines.push(`        connectivity: "${p.connectivity || 'USB-C'}",`);
    jsLines.push(`        hot_swap: ${p.hot_swap ? 'true' : 'false'},`);
    jsLines.push(`        rgb: ${p.rgb ? 'true' : 'false'},`);
    jsLines.push(`        image: "${p.image || ''}",`);
    jsLines.push(`        url: "${p.url || ''}",`);
    jsLines.push(`        brand: "${p.brand || 'Other'}",`);
    jsLines.push(`        pros: ${pros},`);
    jsLines.push(`        description: ${desc},`);
    jsLines.push(`        amazon_asin: "${p.amazon_asin || p.id || ''}",`);
    jsLines.push(`        updated: "${p.updated || new Date().toISOString().split('T')[0]}"`);
    jsLines.push(`    }${i < mergedProducts.length - 1 ? ',' : ''}`);
});

jsLines.push(`];`);

// 保存
fs.writeFileSync('./inline-products-detailed.js', jsLines.join('\n'));
fs.writeFileSync('./inline-products.js', jsLines.join('\n'));
console.log('\n已更新 inline-products-detailed.js');
console.log('已更新 inline-products.js');
