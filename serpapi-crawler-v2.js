/**
 * SerpAPI Amazon Product Crawler - 增强版
 * 批量获取 Amazon US 机械键盘产品数据
 */

const https = require('https');
const fs = require('fs');

const API_KEY = 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';

// 按分类搜索获取更多产品
const SEARCH_QUERIES = [
    'mechanical keyboard',
    'mechanical gaming keyboard',
    'best mechanical keyboard 2025'
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
        
        console.log(`搜索: "${query}" (page ${page})...`);
        
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

function extractProducts(result) {
    // SerpAPI Amazon 搜索结果在 organic_results 中
    const items = result.organic_results || [];
    
    return items
        .filter(p => p.asin) // 过滤掉没有 ASIN 的结果
        .map((p, index) => {
            // 处理价格
            let price = '$0';
            if (p.price) {
                price = p.price;
            } else if (p.prices && p.prices.length > 0) {
                price = p.prices[0];
            }
            
            return {
                asin: p.asin,
                name: p.title || '',
                url: p.link || `https://www.amazon.com/dp/${p.asin}`,
                image: p.thumbnail || `https://images-na.ssl-images-amazon.com/images/I/${p.asin}._SL500_.jpg`,
                price: price,
                rating: parseFloat(p.rating || '0'),
                reviews: parseInt((p.reviews || '0').toString().replace(/,/g, '')),
                brand: p.brand || extractBrand(p.title || ''),
            };
        });
}

function extractBrand(title) {
    // 从标题中提取品牌
    const brands = [
        'Keychron', 'Logitech', 'Razer', 'Corsair', 'SteelSeries', 
        'Redragon', 'AULA', 'Cherry', 'ASUS', 'Leopold', 'Filco',
        'Ducky', 'NuPhy', 'Akko', 'Anne Pro', 'Glorious',
        'HyperX', 'Roccat', 'Msi', 'GigaByte', 'Thermaltake'
    ];
    
    for (const brand of brands) {
        if (title.toLowerCase().includes(brand.toLowerCase())) {
            return brand;
        }
    }
    return 'Other';
}

function generateProductsJs(products) {
    // 去重（根据 ASIN）
    const unique = [];
    const seen = new Set();
    for (const p of products) {
        if (!seen.has(p.asin)) {
            seen.add(p.asin);
            unique.push(p);
        }
    }
    
    // 取前 30 个
    const top30 = unique.slice(0, 30);
    
    // 生成 JavaScript 代码
    let js = `// MechKeys Hub - Products Data
// Auto-generated from SerpAPI Amazon Search
// Generated: ${new Date().toISOString()}

const topProducts = [
`;

    top30.forEach((p, i) => {
        const layout = detectLayout(p.name);
        const switchType = detectSwitch(p.name);
        
        js += `    {
        id: "${p.asin.toLowerCase()}",
        name: "${escapeJs(p.name)}",
        tagline: "${escapeJs(p.name.substring(0, 80))}",
        price: "${p.price}",
        price_tier: getPriceTier(p.price),
        rating: ${p.rating},
        switch_type: "${switchType}",
        layout: "${layout}",
        connectivity: "${getConnectivity(p.name)}",
        hot_swap: p.name.toLowerCase().includes('hot swappable') || p.name.toLowerCase().includes('hot-swap'),
        rgb: p.name.toLowerCase().includes('rgb') || p.name.toLowerCase().includes('backlit'),
        image: "${p.image}",
        url: "${p.url}?tag=mechkeyshub-20",
        pros: ["Great value", "Popular choice"],
        cons: ["Quality varies"],
        best_for: "Gaming & Typing",
        amazon_asin: "${p.asin}",
        updated: "${new Date().toISOString().split('T')[0]}"
    }`;
        
        if (i < top30.length - 1) js += ',';
        js += '\n';
    });

    js += `];

// Helper functions
function getPriceTier(price) {
    const p = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    if (p < 50) return 'budget';
    if (p < 100) return 'mid';
    return 'premium';
}

function getConnectivity(name) {
    const n = name.toLowerCase();
    if (n.includes('wireless') || n.includes('bluetooth')) return 'Bluetooth / USB-C';
    return 'USB-C';
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { topProducts };
}
`;

    return { js, products: top30 };
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

function getConnectivity(name) {
    const n = name.toLowerCase();
    if (n.includes('wireless') || n.includes('bluetooth') || n.includes('2.4ghz')) return 'Bluetooth / 2.4GHz / USB-C';
    return 'USB-C';
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

async function main() {
    console.log('='.repeat(60));
    console.log('SerpAPI Amazon 机械键盘数据抓取');
    console.log('='.repeat(60));
    console.log('');

    const allProducts = [];
    
    for (const query of SEARCH_QUERIES) {
        try {
            for (let page = 1; page <= 2; page++) {
                const result = await searchAmazon(query, page);
                const products = extractProducts(result);
                allProducts.push(...products);
                console.log(`  获取 ${products.length} 个产品`);
                
                // 延迟避免 API 限制
                await new Promise(r => setTimeout(r, 2000));
            }
        } catch (error) {
            console.error(`搜索 "${query}" 出错:`, error.message);
        }
    }

    console.log(`\n共获取 ${allProducts.length} 个原始产品`);
    
    // 去重
    const { js, products } = generateProductsJs(allProducts);
    
    console.log(`去重后 ${products.length} 个产品`);
    
    // 保存 products.js
    fs.writeFileSync('data/products.js', js);
    console.log('已更新 data/products.js');
    
    // 保存 JSON 备份
    fs.writeFileSync('amazon-products-backup.json', JSON.stringify(products, null, 2));
    console.log('已备份到 amazon-products-backup.json');
    
    // 显示前 5 个产品
    console.log('\n前 5 个产品：');
    products.slice(0, 5).forEach((p, i) => {
        console.log(`${i+1}. ${p.name.substring(0, 60)}...`);
        console.log(`   ASIN: ${p.asin} | 价格: ${p.price} | 评分: ${p.rating}`);
    });
}

main();
