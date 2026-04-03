/**
 * 快速产品扩展脚本 v2
 * 修复了 per-brand 数量限制的 bug
 */

const https = require('https');
const fs = require('fs');

const API_KEY = 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';

const BRAND_QUERIES = [
    { query: 'AULA F99 F75 mechanical keyboard', brand: 'AULA' },
    { query: 'Redragon K671 K668 K689 keyboard', brand: 'Redragon' },
    { query: 'Logitech MX Mechanical G413 keyboard', brand: 'Logitech' },
    { query: 'Keychron K2 K6 K8 Q1 mechanical keyboard wireless', brand: 'Keychron' },
    { query: 'Keychron K3 K3 Pro low profile keyboard', brand: 'Keychron' },
    { query: 'Akko 3098B 3084B mechanical keyboard', brand: 'Akko' },
    { query: 'Ducky ONE 3 Neo mechanical keyboard', brand: 'Ducky' },
    { query: 'Leopold FC750R FC980M mechanical keyboard', brand: 'Leopold' },
    { query: 'NuPhy Field75 Air75 keyboard wireless', brand: 'NuPhy' },
    { query: 'Razer BlackWidow Huntsman mechanical keyboard', brand: 'Razer' },
    { query: 'HyperX Alloy Origins keyboard mechanical', brand: 'HyperX' },
    { query: 'Glorious GMMK mechanical keyboard hot swap', brand: 'Glorious' },
    { query: '60 percent mechanical keyboard hot swappable', brand: '60%' },
    { query: '65 percent mechanical keyboard compact', brand: '65%' },
    { query: 'mechanical keyboard best seller gaming 2024', brand: 'Popular' },
    { query: 'Anne Pro 3 keyboard wireless', brand: 'Anne Pro' },
    { query: 'Cherry MX mechanical keyboard', brand: 'Cherry' },
    { query: 'RK Royal Kludge RK98 RK84 mechanical keyboard', brand: 'RK Royal Kludge' },
    { query: 'SOLAKAKA A75 mechanical keyboard', brand: 'SOLAKAKA' },
    { query: 'TMKB mechanical keyboard gaming', brand: 'TMKB' },
];

function searchAmazon(query) {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams({
            'engine': 'amazon',
            'amazon_domain': 'amazon.com',
            'api_key': API_KEY,
            'k': query,
            'page': '1'
        });

        https.get(`https://serpapi.com/search?${params.toString()}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function extractBrand(title) {
    const brands = ['Keychron','Logitech','Razer','Corsair','SteelSeries','Redragon','AULA','Cherry','ASUS','Leopold','Filco','Ducky','NuPhy','Akko','Anne Pro','Glorious','HyperX','RK Royal Kludge','SOLAKAKA','MageGee','DIERYA','Newmen','TMKB','Keymatic'];
    for (const b of brands) {
        if (title.toLowerCase().includes(b.toLowerCase())) return b;
    }
    return 'Other';
}

function extractProducts(result, targetBrand) {
    const items = result.organic_results || [];
    return items.filter(p => p.asin).map(p => {
        let price = p.price || (p.prices && p.prices[0]) || '$0';
        return {
            asin: p.asin,
            name: (p.title || '').substring(0, 200),
            url: p.link || `https://www.amazon.com/dp/${p.asin}`,
            image: p.thumbnail || `https://images-na.ssl-images-amazon.com/images/I/${p.asin}._SL500_.jpg`,
            price,
            rating: parseFloat(p.rating || '0'),
            reviews: parseInt((p.reviews || '0').toString().replace(/,/g, '')),
            brand: targetBrand !== '60%' && targetBrand !== '65%' && targetBrand !== 'Popular' ? targetBrand : extractBrand(p.title || ''),
        };
    });
}

async function main() {
    console.log('='.repeat(50));
    console.log('MechKeys Hub - 快速产品扩展 v2');
    console.log('='.repeat(50));
    
    const allProducts = [];
    const seen = new Set();
    
    for (const { query, brand } of BRAND_QUERIES) {
        try {
            process.stdout.write(`搜索: "${query}"... `);
            const result = await searchAmazon(query);
            const products = extractProducts(result, brand);
            
            let newCount = 0;
            for (const p of products) {
                if (!seen.has(p.asin)) {
                    seen.add(p.asin);
                    allProducts.push(p);
                    newCount++;
                }
            }
            console.log(`+${newCount} (累计${allProducts.length})`);
            await new Promise(r => setTimeout(r, 1500));
        } catch (error) {
            console.log(`失败: ${error.message}`);
        }
    }

    console.log(`\n共 ${allProducts.length} 个产品`);
    
    // 保存
    fs.writeFileSync('new-products-raw.json', JSON.stringify(allProducts, null, 2));
    
    // 显示品牌分布
    const brands = {};
    allProducts.forEach(p => { brands[p.brand] = (brands[p.brand]||0) + 1; });
    Object.entries(brands).sort((a,b)=>b[1]-a[1]).forEach(([b,c]) => console.log(`  ${c} ${b}`));
    
    // 显示前10
    console.log('\n前10个产品:');
    allProducts.slice(0, 10).forEach((p,i) => console.log(`${i+1}. [${p.brand}] ${p.name.substring(0,60)}`));
}

main();
