/**
 * 品牌定向产品扩展脚本
 * 针对热门品牌定向抓取，扩充产品线
 * 
 * 运行: node expand-products.js
 * 
 * 目标品牌:
 * 1. Keychron - 超级热门 (K2, K3, K6, Q1, Q3系列)
 * 2. Akko - 高性价比 (3098, 3084系列)
 * 3. Ducky - 台产精品 (ONE 3系列)
 * 4. Leopold - 高端办公 (FC750R, FC980M)
 * 5. NuPhy - 热门无线 (Field75, Air75)
 * 6. Razer - 游戏大厂 (BlackWidow, Huntsman)
 * 7. HyperX - 金士顿旗下 (Alloy Origins)
 * 8. Keychron Q Pro系列
 */

const https = require('https');
const fs = require('fs');

const API_KEY = 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';

// 按品牌定向搜索
const BRAND_QUERIES = [
    // 现有品牌扩充
    { query: 'AULA mechanical keyboard', brand: 'AULA', max: 5 },
    { query: 'Redragon keyboard gaming', brand: 'Redragon', max: 3 },
    { query: 'Logitech mechanical keyboard', brand: 'Logitech', max: 3 },
    
    // 新品牌
    { query: 'Keychron K2 keyboard', brand: 'Keychron', max: 8 },
    { query: 'Keychron Q1 Q3 mechanical keyboard', brand: 'Keychron', max: 5 },
    { query: 'Akko 3098B mechanical keyboard', brand: 'Akko', max: 5 },
    { query: 'Akko 3084 keyboard', brand: 'Akko', max: 3 },
    { query: 'Ducky ONE 3 mechanical keyboard', brand: 'Ducky', max: 5 },
    { query: 'Leopold FC750R mechanical keyboard', brand: 'Leopold', max: 3 },
    { query: 'Leopold FC980M keyboard', brand: 'Leopold', max: 2 },
    { query: 'NuPhy Field75 keyboard', brand: 'NuPhy', max: 3 },
    { query: 'NuPhy Air75 keyboard', brand: 'NuPhy', max: 3 },
    { query: 'Razer BlackWidow mechanical keyboard', brand: 'Razer', max: 4 },
    { query: 'Razer Huntsman keyboard', brand: 'Razer', max: 3 },
    { query: 'HyperX Alloy Origins mechanical keyboard', brand: 'HyperX', max: 4 },
    { query: 'Glorious GMMK mechanical keyboard', brand: 'Glorious', max: 4 },
    { query: 'best 60 percent mechanical keyboard', brand: '60%', max: 8 },
    { query: 'best hot swap mechanical keyboard', brand: 'HotSwap', max: 8 },
    { query: 'best wireless mechanical keyboard 2024', brand: 'Wireless', max: 8 },
    { query: 'best budget mechanical keyboard under 50', brand: 'Budget', max: 8 },
    { query: 'mechanical keyboard gasket mount', brand: 'Gasket', max: 5 },
    { query: 'LEOPOLD FC750R mechanical keyboard', brand: 'Leopold', max: 3 },
    { query: 'Cherry MX mechanical keyboard', brand: 'Cherry', max: 3 },
    { query: 'Anne Pro 3 keyboard', brand: 'Anne Pro', max: 3 },
    { query: 'KEYCHRON K8 Pro mechanical keyboard', brand: 'Keychron', max: 4 },
];

function searchAmazon(query, page = 1) {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams({
            'engine': 'amazon',
            'amazon_domain': 'amazon.com',
            'api_key': API_KEY,
            'k': query,
            'page': page.toString()
        });

        const url = `https://serpapi.com/search?${params.toString()}`;
        
        console.log(`  搜索: "${query}" (page ${page})`);
        
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function extractBrand(title) {
    const brands = [
        'Keychron', 'Logitech', 'Razer', 'Corsair', 'SteelSeries', 
        'Redragon', 'AULA', 'Cherry', 'ASUS', 'Leopold', 'Filco',
        'Ducky', 'NuPhy', 'Akko', 'Anne Pro', 'Glorious',
        'HyperX', 'Roccat', 'Msi', 'GigaByte', 'Thermaltake',
        'Keymatic', 'RK ROYAL KLUDGE', 'SOLAKAKA', 'MageGee',
        'DIERYA', 'RisoPhy', 'HUO JI', 'Newmen', 'TMKB'
    ];
    
    for (const brand of brands) {
        if (title.toLowerCase().includes(brand.toLowerCase())) {
            return brand;
        }
    }
    return 'Other';
}

function extractProducts(result, targetBrand) {
    const items = result.organic_results || [];
    
    return items
        .filter(p => p.asin)
        .map((p) => {
            let price = '$0';
            if (p.price) price = p.price;
            else if (p.prices && p.prices.length > 0) price = p.prices[0];
            
            // 使用targetBrand或从标题提取
            const brand = targetBrand && targetBrand !== '60%' && targetBrand !== 'HotSwap' && targetBrand !== 'Wireless' && targetBrand !== 'Budget' && targetBrand !== 'Gasket' && targetBrand !== 'Anne Pro' && targetBrand !== 'Cherry'
                ? targetBrand 
                : extractBrand(p.title || '');
            
            return {
                asin: p.asin,
                name: p.title || '',
                url: p.link || `https://www.amazon.com/dp/${p.asin}`,
                image: p.thumbnail || `https://images-na.ssl-images-amazon.com/images/I/${p.asin}._SL500_.jpg`,
                price: price,
                rating: parseFloat(p.rating || '0'),
                reviews: parseInt((p.reviews || '0').toString().replace(/,/g, '')),
                brand: brand,
            };
        });
}

function detectLayout(name) {
    const n = name.toLowerCase();
    if (n.includes('60%') || n.includes('60 percent')) return '60%';
    if (n.includes('65%') || n.includes('65 percent')) return '65%';
    if (n.includes('75%') || n.includes('75 percent')) return '75%';
    if (n.includes('tkl') || n.includes('tenkeyless') || n.includes('80%')) return 'TKL';
    if (n.includes('full') || n.includes('104 key') || n.includes('full-size')) return 'Full Size';
    if (n.includes('98 key') || n.includes('96%')) return '98-key';
    if (n.includes('87 key')) return 'TKL';
    return 'TKL';
}

function detectSwitch(name) {
    const n = name.toLowerCase();
    if (n.includes('linear') || n.includes('red switch')) return 'Linear Red';
    if (n.includes('tactile') || n.includes('brown switch')) return 'Tactile Brown';
    if (n.includes('clicky') || n.includes('blue switch')) return 'Clicky Blue';
    if (n.includes('optical') || n.includes('magnetic')) return 'Optical/Magnetic';
    if (n.includes('silent') || n.includes('quiet')) return 'Silent Red';
    return 'Linear Red';
}

function getConnectivity(name) {
    const n = name.toLowerCase();
    if (n.includes('wireless') || n.includes('bluetooth') || n.includes('2.4ghz')) {
        if (n.includes('usb-c') || n.includes('usb c')) {
            return 'Bluetooth / 2.4GHz / USB-C';
        }
        return 'Bluetooth / 2.4GHz';
    }
    return 'USB-C';
}

function getPriceTier(price) {
    const p = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    if (p < 50) return 'budget';
    if (p < 100) return 'mid';
    return 'premium';
}

function escapeJs(str) {
    if (!str) return '';
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ').substring(0, 200);
}

async function main() {
    console.log('='.repeat(60));
    console.log('MechKeys Hub - 品牌定向产品扩展');
    console.log('='.repeat(60));
    console.log('');

    const allProducts = [];
    let searchCount = 0;
    
    for (const { query, brand, max } of BRAND_QUERIES) {
        try {
            const result = await searchAmazon(query, 1);
            const products = extractProducts(result, brand);
            
            // 去重并限制数量
            for (const p of products) {
                if (!allProducts.find(existing => existing.asin === p.asin)) {
                    allProducts.push(p);
                    if (allProducts.length >= max) break;
                }
            }
            
            console.log(`    -> 获取 ${products.length} 个产品 (累计 ${allProducts.length})`);
            searchCount++;
            
            // 每次搜索间隔2秒
            await new Promise(r => setTimeout(r, 2000));
            
        } catch (error) {
            console.error(`  搜索 "${query}" 出错: ${error.message}`);
        }
    }

    console.log(`\n共搜索 ${searchCount} 次，获取 ${allProducts.length} 个产品`);
    
    // 去重
    const unique = [];
    const seen = new Set();
    for (const p of allProducts) {
        if (!seen.has(p.asin)) {
            seen.add(p.asin);
            unique.push(p);
        }
    }
    
    console.log(`去重后 ${unique.length} 个产品`);
    
    // 保存原始数据
    fs.writeFileSync('new-products-raw.json', JSON.stringify(unique, null, 2));
    console.log('已保存到 new-products-raw.json');
    
    // 生成待审核的产品列表
    console.log('\n前 20 个产品预览:');
    unique.slice(0, 20).forEach((p, i) => {
        console.log(`${i+1}. [${p.brand}] ${p.name.substring(0, 50)}...`);
        console.log(`   ASIN: ${p.asin} | 价格: ${p.price} | 评分: ${p.rating}`);
    });
}

main();
