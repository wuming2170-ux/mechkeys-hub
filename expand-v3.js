/**
 * 增量保存版爬虫 - 每次搜索后立即保存，不怕中断
 */
const https = require('https');
const fs = require('fs');

const API_KEY = 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';
const OUTPUT_FILE = 'all-products-collected.json';

const QUERIES = [
    { q: 'AULA F99 F75 F2088 mechanical keyboard', b: 'AULA' },
    { q: 'Redragon K671 K668 K689 K580 keyboard', b: 'Redragon' },
    { q: 'Logitech MX Mechanical G413 keyboard', b: 'Logitech' },
    { q: 'Keychron K2 K6 K8 Q1 mechanical keyboard wireless', b: 'Keychron' },
    { q: 'Keychron K3 K3 Pro low profile keyboard', b: 'Keychron' },
    { q: 'Akko 3098B 3084B mechanical keyboard', b: 'Akko' },
    { q: 'Ducky ONE 3 Neo mechanical keyboard', b: 'Ducky' },
    { q: 'Leopold FC750R FC980M mechanical keyboard', b: 'Leopold' },
    { q: 'NuPhy Field75 Air75 keyboard wireless', b: 'NuPhy' },
    { q: 'Razer BlackWidow Huntsman mechanical keyboard', b: 'Razer' },
    { q: 'HyperX Alloy Origins keyboard mechanical', b: 'HyperX' },
    { q: 'Glorious GMMK mechanical keyboard', b: 'Glorious' },
    { q: '60 percent mechanical keyboard hot swappable', b: '60%' },
    { q: '65 percent mechanical keyboard compact', b: '65%' },
    { q: 'best mechanical keyboard gaming 2024', b: 'Popular' },
    { q: 'Anne Pro 3 keyboard wireless', b: 'Anne Pro' },
    { q: 'Cherry MX mechanical keyboard', b: 'Cherry' },
    { q: 'RK Royal Kludge RK98 RK84 mechanical keyboard', b: 'RK Royal Kludge' },
    { q: 'SOLAKAKA A75 mechanical keyboard', b: 'SOLAKAKA' },
    { q: 'TMKB mechanical keyboard gaming', b: 'TMKB' },
];

function load() {
    if (fs.existsSync(OUTPUT_FILE)) {
        const data = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
        return new Set(data.map(p => p.asin));
    }
    return new Set();
}

function save(products) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
}

function search(query) {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams({
            engine: 'amazon', amazon_domain: 'amazon.com', api_key: API_KEY, k: query, page: '1'
        });
        https.get(`https://serpapi.com/search?${params}`, res => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { reject(e); } });
        }).on('error', reject);
    });
}

const BRAND_LIST = ['Keychron','Logitech','Razer','Corsair','SteelSeries','Redragon','AULA','Cherry','ASUS','Leopold','Filco','Ducky','NuPhy','Akko','Anne Pro','Glorious','HyperX','RK Royal Kludge','SOLAKAKA','MageGee','DIERYA','Newmen','TMKB','Keymatic','RisoPhy','HUO JI'];

function getBrand(title) {
    for (const b of BRAND_LIST) {
        if (title.toLowerCase().includes(b.toLowerCase())) return b;
    }
    return 'Other';
}

async function main() {
    let products = [];
    const seen = load();
    console.log('已有', seen.size, '个产品\n');

    for (let i = 0; i < QUERIES.length; i++) {
        const { q, b } = QUERIES[i];
        try {
            process.stdout.write(`${i+1}/${QUERIES.length}: "${q}"... `);
            const result = await search(q);
            const items = result.organic_results || [];
            let newCount = 0;
            for (const p of items) {
                if (!p.asin) continue;
                if (!seen.has(p.asin)) {
                    seen.add(p.asin);
                    const price = p.price || (p.prices && p.prices[0]) || '$0';
                    const brand = (b !== '60%' && b !== '65%' && b !== 'Popular') ? b : getBrand(p.title || '');
                    products.push({
                        asin: p.asin, name: (p.title||'').substring(0,200), url: p.link || `https://www.amazon.com/dp/${p.asin}`,
                        image: p.thumbnail || `https://images-na.ssl-images-amazon.com/images/I/${p.asin}._SL500_.jpg`,
                        price, rating: parseFloat(p.rating||'0'),
                        reviews: parseInt((p.reviews||'0').toString().replace(/,/g,'')),
                        brand
                    });
                    newCount++;
                }
            }
            console.log(`+${newCount} (共${seen.size})`);
            save(products);
            await new Promise(r => setTimeout(r, 1500));
        } catch (error) {
            console.log(`失败: ${error.message}`);
            await new Promise(r => setTimeout(r, 3000));
        }
    }

    console.log('\n完成! 共', seen.size, '个产品');
    
    // 品牌统计
    const brands = {};
    products.forEach(p => { brands[p.brand] = (brands[p.brand]||0)+1; });
    Object.entries(brands).sort((a,b)=>b[1]-a[1]).forEach(([brand,c]) => console.log(c, brand));
}

main();
