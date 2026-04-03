/**
 * 品牌名称规范化 + 重新生成最终产品数据
 */
const fs = require('fs');

// 品牌名称映射（规范化为标准大小写）
const BRAND_MAP = {
    'keychron': 'Keychron',
    'logitech': 'Logitech', 
    'razer': 'Razer',
    'corsair': 'Corsair',
    'steelseries': 'SteelSeries',
    'redragon': 'Redragon',
    'aula': 'AULA',
    'cherry': 'Cherry',
    'asus': 'ASUS',
    'roku': 'ASUS', // some misdetections
    'leopold': 'Leopold',
    'filco': 'Filco',
    'ducker': 'Ducky',
    'ducky': 'Ducky',
    'nuphy': 'NuPhy',
    'akko': 'Akko',
    'anne pro': 'Anne Pro',
    'anne': 'Anne Pro',
    'glorious': 'Glorious',
    'hyperx': 'HyperX',
    'roccat': 'Roccat',
    'msi': 'MSI',
    'gigabyte': 'Gigabyte',
    'thermaltake': 'Thermaltake',
    'rk royal kludge': 'RK Royal Kludge',
    'royal kludge': 'RK Royal Kludge',
    'rk': 'RK Royal Kludge',
    'solakaka': 'SOLAKAKA',
    'sola': 'SOLAKAKA',
    'magegee': 'MageGee',
    'dierya': 'DIERYA',
    'huo ji': 'HUO JI',
    'huoji': 'HUO JI',
    'e-yooso': 'HUO JI',
    'eyooso': 'HUO JI',
    'newmen': 'Newmen',
    'tmkb': 'TMKB',
    'keymatic': 'Keymatic',
    'keymek': 'Keymatic',
    'keychronq': 'Keychron',
    'drop': 'Drop',
    'varmilo': 'Varmilo',
    'iqunix': 'Iqunix',
    'motorspeed': 'Motorspeed',
    'turtle': 'Turtle',
    'rampage': 'Rampage',
    '特科': 'Other',
    'keycoming': 'Keycoming',
    'havit': 'Havit',
    'tesoro': 'Tesoro',
    'cooler': 'Cooler Master',
    'cooler master': 'Cooler Master',
    'cm': 'Cooler Master',
};

const MAIN_BRANDS = ['Keychron', 'AULA', 'Redragon', 'Logitech', 'Leopold', 'Ducky', 'Razer', 'Glorious', 'Cherry', 'Akko', 'HyperX', 'Anne Pro', 'NuPhy', 'RK Royal Kludge', 'SOLAKAKA', 'SteelSeries', 'Corsair', 'ASUS', 'TMKB', 'Glorious'];

function normalizeBrand(brand) {
    if (!brand) return 'Other';
    const lower = brand.toLowerCase().trim();
    if (BRAND_MAP[lower]) return BRAND_MAP[lower];
    
    // Check if any main brand is in the name
    for (const main of MAIN_BRANDS) {
        if (lower.includes(main.toLowerCase())) return main;
    }
    return 'Other';
}

function detectLayout(name) {
    const n = name.toLowerCase();
    if (n.includes('60%') || n.includes('60 percent') || n.includes('68 key') || n.includes('61 key') || n.includes('60 key')) return '60%';
    if (n.includes('65%') || n.includes('65 percent') || (n.includes('68 key') && !n.includes('60%'))) return '65%';
    if (n.includes('75%') || n.includes('75 percent')) return '75%';
    if (n.includes('tkl') || n.includes('tenkeyless') || n.includes('80%') || n.includes('87 key')) return 'TKL';
    if (n.includes('full size') || n.includes('full-size') || n.includes('104 key') || n.includes('108 key')) return 'Full Size';
    if (n.includes('98 key') || n.includes('96%')) return '98-key';
    if (n.includes('40%') || n.includes('40 key')) return '40%';
    return 'TKL';
}

function detectSwitch(name) {
    const n = name.toLowerCase();
    if (n.includes('linear red') || n.includes('red switch')) return 'Linear Red';
    if (n.includes('linear yellow') || n.includes('yellow switch')) return 'Linear Yellow';
    if (n.includes('linear') && !n.includes('tactile')) return 'Linear Red';
    if (n.includes('tactile brown') || n.includes('brown switch')) return 'Tactile Brown';
    if (n.includes('tactile')) return 'Tactile Brown';
    if (n.includes('clicky blue') || n.includes('blue switch')) return 'Clicky Blue';
    if (n.includes('clicky')) return 'Clicky Blue';
    if (n.includes('optical red') || n.includes('optical linear')) return 'Optical Red';
    if (n.includes('optical')) return 'Optical';
    if (n.includes('magnetic') || n.includes('hall effect')) return 'Magnetic/Hall Effect';
    if (n.includes('silent') || (n.includes('quiet') && n.includes('red'))) return 'Silent Red';
    if (n.includes('gateron')) return 'Gateron';
    if (n.includes('cherry mx') || n.includes('mx2a') || n.includes('mx ')) return 'Cherry MX';
    return 'Linear Red';
}

function getConnectivity(name) {
    const n = name.toLowerCase();
    if (n.includes('wireless') || n.includes('bluetooth') || n.includes('2.4ghz') || n.includes('2.4 g') || n.includes('2.4g')) {
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
    
    if (hasFeature(n, ['rgb', 'backlit', 'backlight', 'led'])) pros.push('RGB Backlight');
    if (hasFeature(n, ['hot swap', 'hotswap', 'hot-swappable', 'hot swap pcb'])) pros.push('Hot-Swappable');
    if (hasFeature(n, ['wireless', 'bluetooth', '2.4ghz', '2.4g', 'wire'])) pros.push('Wireless');
    if (hasFeature(n, ['gasket'])) pros.push('Gasket Mount');
    if (hasFeature(n, ['pbt keycap', 'pbt keycaps'])) pros.push('PBT Keycaps');
    if (hasFeature(n, ['tkl', 'tenkeyless', '80%', '87 key'])) pros.push('TKL Layout');
    if (hasFeature(n, ['60%', '65%', '75%', 'compact'])) pros.push('Compact Layout');
    if (hasFeature(n, ['full size', '104 key', '108 key'])) pros.push('Full Size');
    if (hasFeature(n, ['optical'])) pros.push('Optical Switches');
    if (hasFeature(n, ['rapid trigger', 'hall effect', 'magnetic'])) pros.push('Rapid Trigger');
    if (hasFeature(n, ['low profile', 'low-profile', 'slim'])) pros.push('Low Profile');
    if (hasFeature(n, ['multi-device', 'multi device'])) pros.push('Multi-Device');
    if (hasFeature(n, ['macro key'])) pros.push('Macro Keys');
    if (hasFeature(n, ['multimedia', 'media control'])) pros.push('Media Controls');
    if (hasFeature(n, ['knob', 'dial'])) pros.push('Control Knob');
    if (hasFeature(n, ['sound dampen', 'foam', 'dampen', 'silence'])) pros.push('Sound Dampening');
    if (hasFeature(n, ['programmable', 'customize'])) pros.push('Fully Programmable');
    
    if (pros.length === 0) {
        if (brand === 'Keychron') pros.push('Popular Brand', 'Good Build');
        else if (brand === 'Leopold') pros.push('Premium Build', 'German Quality');
        else if (brand === 'Ducky') pros.push('Taiwan Quality', 'Durable Build');
        else if (brand === 'NuPhy') pros.push('Wireless Premium', 'Slim Design');
        else if (brand === 'Glorious') pros.push('Modular Design', 'Hot-Swap Ready');
        else pros.push('Great Value', 'Popular Choice');
    }
    
    return pros.slice(0, 4);
}

function generateDescription(name) {
    const n = name.toLowerCase();
    const desc = [];
    
    if (n.includes('gaming')) desc.push('Designed for competitive gaming with responsive switches and anti-ghosting for precise inputs.');
    else if (n.includes('office') || n.includes('work')) desc.push('Perfect for office and productivity work with comfortable typing feel.');
    else desc.push('Versatile mechanical keyboard suitable for both gaming and everyday typing.');
    
    if (n.includes('wireless') || n.includes('bluetooth')) {
        desc.push('Wireless connectivity for a clean desk setup without cable clutter.');
    }
    if (n.includes('hot swap') || n.includes('hotswap')) {
        desc.push('Hot-swappable switches allow easy customization without soldering.');
    }
    if (n.includes('gasket')) {
        desc.push('Gasket mounting provides a softer, more cushioned typing feel.');
    }
    
    return desc;
}

// 加载数据
const existingFile = fs.readFileSync('./inline-products-detailed.js', 'utf8');
const existingMatch = existingFile.match(/const topProducts = (\[[\s\S]*?\]);?\s*$/m);
let existingProducts = [];
if (existingMatch) {
    try {
        existingProducts = eval('(' + existingMatch[1] + ')');
    } catch(e) {}
}
console.log('现有详细产品:', existingProducts.length);

const newProducts = JSON.parse(fs.readFileSync('./all-products-collected.json', 'utf8'));
console.log('新采集产品:', newProducts.length);

// 创建产品映射，保留最好的数据
const productMap = new Map();

// 首先添加现有详细产品（它们有最好的数据）
for (const p of existingProducts) {
    const key = (p.amazon_asin || p.id || '').toUpperCase();
    if (key) {
        productMap.set(key, {
            ...p,
            brand: normalizeBrand(p.brand),
            updated: new Date().toISOString().split('T')[0]
        });
    }
}

console.log('现有产品加入后:', productMap.size);

// 添加新采集产品
let newAdded = 0;
for (const p of newProducts) {
    const key = p.asin.toUpperCase();
    if (productMap.has(key)) continue;
    
    const brand = normalizeBrand(p.brand);
    const layout = detectLayout(p.name);
    const switchType = detectSwitch(p.name);
    const connectivity = getConnectivity(p.name);
    const priceTier = getPriceTier(p.price);
    const hotSwap = hasFeature(p.name, ['hot swap', 'hotswap', 'hot-swappable', 'hot swap pcb']);
    const rgb = hasFeature(p.name, ['rgb', 'backlit', 'backlight', 'led']);
    const pros = generatePros(p.name, brand);
    const description = generateDescription(p.name);
    
    // 清理 URL
    let url = p.url || `https://www.amazon.com/dp/${p.asin}`;
    if (!url.includes('?')) url += '?tag=mechkeyshub-20';
    else if (!url.includes('tag=')) url += '&tag=mechkeyshub-20';
    
    productMap.set(key, {
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
        image: p.image || '',
        url: url,
        brand: brand,
        pros: pros,
        description: description,
        amazon_asin: p.asin.toUpperCase(),
        updated: new Date().toISOString().split('T')[0]
    });
    newAdded++;
}

console.log('新增产品:', newAdded);
console.log('合并后总计:', productMap.size);

// 转换为数组并排序
const allProducts = Array.from(productMap.values())
    .sort((a, b) => {
        // 按品牌排序，然后在品牌内按评分排序
        if (a.brand !== b.brand) return a.brand.localeCompare(b.brand);
        return (b.rating || 0) - (a.rating || 0);
    });

// 品牌统计
const brandCount = {};
allProducts.forEach(p => { brandCount[p.brand] = (brandCount[p.brand] || 0) + 1; });
console.log('\n品牌分布:');
Object.entries(brandCount).sort((a,b)=>b[1]-a[1]).forEach(([b,c]) => console.log(`  ${c} ${b}`));

// 生成 JS 文件
const jsLines = [];
jsLines.push(`// MechKeys Hub - Products Data`);
jsLines.push(`// Auto-generated: ${new Date().toISOString()}`);
jsLines.push(`// Total products: ${allProducts.length}`);
jsLines.push(``);
jsLines.push(`const topProducts = [`);

allProducts.forEach((p, i) => {
    const pros = p.pros && p.pros.length ? `[${p.pros.map(pr => `"${pr.replace(/"/g, '\\"')}"`).join(',')}]` : '["Great value", "Popular choice"]';
    const desc = p.description && p.description.length 
        ? `[${p.description.map(d => `"${d.replace(/"/g, '\\"')}"`).join(',')}]` 
        : '[]';
    
    jsLines.push(`    {`);
    jsLines.push(`        id: "${p.id || p.amazon_asin || ''}",`);
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
    jsLines.push(`    }${i < allProducts.length - 1 ? ',' : ''}`);
});

jsLines.push(`];`);

fs.writeFileSync('./inline-products-detailed.js', jsLines.join('\n'));
fs.writeFileSync('./inline-products.js', jsLines.join('\n'));
console.log('\n已更新 inline-products-detailed.js 和 inline-products.js');
