/**
 * Better Amazon Product Generator
 * 使用正确的 ASIN 生成有效的 Amazon URL 和图片
 */

const fs = require('fs');

// 读取原始 SerpAPI 数据
const rawData = fs.readFileSync('amazon-products-backup.json', 'utf-8');
const products = JSON.parse(rawData);

// 去重
const unique = [];
const seen = new Set();
for (const p of products) {
    if (!seen.has(p.asin)) {
        seen.add(p.asin);
        unique.push(p);
    }
}

// 生成正确的产品数据
const topProducts = unique.slice(0, 15).map((p, i) => {
    // 生成正确的 Amazon URL - 直接使用 ASIN
    const amazonUrl = `https://www.amazon.com/dp/${p.asin}?tag=mechkeyshub-20`;
    
    // 生成正确的图片 URL - 使用 m.media-amazon.com 格式（这个格式更可靠）
    // 如果 SerpAPI 返回的图片 URL 有效就用，否则用 ASIN 格式
    let imageUrl = p.image;
    if (!imageUrl || !imageUrl.includes('amazon.com')) {
        // 如果没有图片，使用 ASIN 生成标准图片 URL
        imageUrl = `https://m.media-amazon.com/images/I/${p.asin}._AC_UY218_.jpg`;
    }
    
    // 从名称中推断布局
    const name = p.name.toLowerCase();
    let layout = 'TKL';
    if (name.includes('60%')) layout = '60%';
    else if (name.includes('65%')) layout = '65%';
    else if (name.includes('75%')) layout = '75%';
    else if (name.includes('tenkeyless') || name.includes('tkl')) layout = 'TKL';
    else if (name.includes('full') || name.includes('104')) layout = 'Full Size';
    else if (name.includes('98') || name.includes('96')) layout = '98-key';
    
    // 从名称推断开关类型
    let switchType = 'Gateron';
    if (name.includes('red switch') || name.includes('linear')) switchType = 'Linear Red';
    else if (name.includes('brown switch') || name.includes('tactile')) switchType = 'Tactile Brown';
    else if (name.includes('blue switch') || name.includes('clicky')) switchType = 'Clicky Blue';
    else if (name.includes('optical') || name.includes('magnetic')) switchType = 'Optical/Magnetic';
    else if (name.includes('topre')) switchType = 'Topre';
    else if (name.includes('cherry mx')) switchType = 'Cherry MX';
    
    // 判断是否热插拔
    const hotSwap = name.includes('hot-swappable') || name.includes('hot swap') || name.includes('hotswap');
    
    // 判断是否 RGB
    const rgb = name.includes('rgb') || name.includes('backlit') || name.includes('backlight');
    
    // 判断连接方式
    let connectivity = 'USB-C';
    if (name.includes('wireless') || name.includes('bluetooth') || name.includes('2.4ghz') || name.includes('2.4 GHz')) {
        connectivity = 'Bluetooth / 2.4GHz / USB-C';
    }
    
    // 价格层级
    const price = parseFloat(p.price.replace(/[^0-9.]/g, '')) || 0;
    const priceTier = price < 50 ? 'budget' : price < 100 ? 'mid' : 'premium';
    
    // 简化品牌名
    let brand = 'Other';
    const brands = ['Keychron', 'Logitech', 'Razer', 'Corsair', 'SteelSeries', 'Leopold', 'Filco', 'Ducky', 'NuPhy', 'Akko', 'AULA', 'Redragon', 'Anne Pro', 'HHKB', 'Happy Hacking'];
    for (const b of brands) {
        if (name.includes(b.toLowerCase())) {
            brand = b;
            break;
        }
    }
    
    return {
        id: p.asin.toLowerCase(),
        name: p.name.substring(0, 100),
        tagline: p.name.substring(0, 80),
        price: p.price,
        price_tier: priceTier,
        rating: p.rating || 4.5,
        switch_type: switchType,
        layout: layout,
        connectivity: connectivity,
        hot_swap: hotSwap,
        rgb: rgb,
        image: imageUrl,
        url: amazonUrl,
        brand: brand,
        pros: [`${brand} quality`, p.reviews > 1000 ? 'Popular choice' : 'Good value'],
        cons: ['Quality varies'],
        best_for: hotSwap ? 'Customization Enthusiasts' : 'Gaming & Typing',
        amazon_asin: p.asin,
        updated: '2026-04-02'
    };
});

// 生成 JavaScript
let js = `// MechKeys Hub - Products Data
// Generated: ${new Date().toISOString()}

const topProducts = [
`;

topProducts.forEach((p, i) => {
    js += `    {
        id: "${p.id}",
        name: "${p.name.replace(/"/g, '\\"')}",
        tagline: "${p.tagline.replace(/"/g, '\\"')}",
        price: "${p.price}",
        price_tier: "${p.price_tier}",
        rating: ${p.rating},
        switch_type: "${p.switch_type}",
        layout: "${p.layout}",
        connectivity: "${p.connectivity}",
        hot_swap: ${p.hot_swap},
        rgb: ${p.rgb},
        image: "${p.image}",
        url: "${p.url}",
        pros: ${JSON.stringify(p.pros)},
        cons: ${JSON.stringify(p.cons)},
        best_for: "${p.best_for}",
        amazon_asin: "${p.amazon_asin}",
        updated: "${p.updated}"
    }`;
    if (i < topProducts.length - 1) js += ',';
    js += '\n';
});

js += `];

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { topProducts };
}
`;

fs.writeFileSync('data/products.js', js);
console.log(`Generated ${topProducts.length} products`);
console.log('');

// 显示产品列表
topProducts.forEach((p, i) => {
    console.log(`${i+1}. ${p.name.substring(0, 50)}...`);
    console.log(`   ASIN: ${p.amazon_asin}`);
    console.log(`   URL: ${p.url}`);
    console.log(`   Image: ${p.image.substring(0, 60)}...`);
    console.log('');
});
