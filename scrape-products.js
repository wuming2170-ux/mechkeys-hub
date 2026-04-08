/**
 * MechKeys Hub - Amazon Product Scraper
 * 用途：自动抓取 Amazon 机械键盘产品并更新到网站
 * 
 * SerpAPI: Developer Plan ($75/月, 5000次/月)
 * 每天抓取: 30款产品
 * 
 * 运行方式：
 *   node scrape-products.js
 * 
 * 环境变量：
 *   SERPAPI_KEY - SerpAPI API Key
 */

const fs = require('fs');
const path = require('path');

// ============ 配置区 ============
const SERPAPI_KEY = process.env.SERPAPI_KEY || 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';
const DATA_FILE = path.join(__dirname, 'inline-products-detailed.js');
const LOG_FILE = path.join(__dirname, 'scrape-log.txt');
const BACKUP_FILE = path.join(__dirname, 'all-products-collected.json');

// 每天抓取数量
const DAILY_LIMIT = 30;

// 请求间隔（毫秒）- 避免请求过快
const REQUEST_DELAY = 1500;
// ================================

// ============ 品牌列表 ============
const BRANDS = [
    'Keychron', 'Leopold', 'Ducky', 'Logitech', 'Glorious',
    'Razer', 'Cherry', 'Akko', 'Anne Pro', 'HyperX',
    'TMKB', 'RK Royal Kludge', 'NuPhy', 'AULA', 'Redragon',
    'Corsair', 'ASUS', 'SteelSeries', 'Filco', 'Magegee',
    'SOLAKAKA', 'Newmen', 'Darmoshark', 'Feker', 'KBDfans'
];

// ============ 布局类型 ============
const LAYOUT_PATTERNS = {
    '60%': /\b60%?\b/i,
    '65%': /\b65%?\b/i,
    '75%': /\b75%?\b/i,
    'TKL': /\b(tkl|tenkeyless|80%|TKL)\b/i,
    'Full Size': /\b(full.size|100%|full.size.keyboard)\b/i
};

// ============ 轴类型 ============
const SWITCH_PATTERNS = {
    'Linear': /\b(linear|gateron red|cherry red|akko pink|red switch)\b/i,
    'Tactile': /\b(tactile|gateron brown|cherry brown|akko purple|brown switch)\b/i,
    'Clicky': /\b(clicky|cherry blue|akko blue|blue switch)\b/i
};

// ============ 分类特征 ============
const CATEGORY_PATTERNS = {
    'Gaming': /\b(gaming|gamer|game|rgb|backlit|esports)\b/i,
    'Silent': /\b(silent|quiet|noise.free|low.noise)\b/i,
    'Portable': /\b(portable|compact|mini|travel|60%|65%|75%)\b/i,
    'Hot-swap': /\b(hot.swap|hotswap|hot-swap)\b/i,
    'Wireless': /\b(wireless|bluetooth|bt\s|2.4g|radio)\b/i
};

/**
 * 发送 HTTP 请求
 */
function fetch(url) {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? require('https') : require('http');
        lib.get(url, res => {
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

/**
 * 使用 SerpAPI 搜索 Amazon 产品
 */
async function searchProducts(query, numResults = 10) {
    const url = `https://serpapi.com/search.json?engine=amazon&k=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`;
    
    try {
        const data = await fetch(url);
        
        if (data.error) {
            console.log(`  ⚠️ SerpAPI 错误: ${data.error}`);
            return [];
        }
        
        const results = data.amazon_results || data.organic_results || [];
        console.log(`  搜索 "${query}" 返回 ${results.length} 个结果`);
        
        return results.map(r => ({
            asin: r.asin || '',
            title: r.title || '',
            price: r.price || r.extracted_price || '',
            rating: r.rating || '',
            reviews: r.reviews || '',
            link: r.link || '',
            image: r.thumbnail || r.image || '',
            position: r.position || 0
        })).filter(p => p.asin && p.title);
        
    } catch (error) {
        console.error(`  ❌ 请求失败: ${error.message}`);
        return [];
    }
}

/**
 * 识别品牌
 */
function detectBrand(title) {
    const titleLower = title.toLowerCase();
    
    for (const brand of BRANDS) {
        if (titleLower.includes(brand.toLowerCase())) {
            return brand;
        }
    }
    
    return 'Other';
}

/**
 * 识别布局
 */
function detectLayout(title) {
    for (const [layout, pattern] of Object.entries(LAYOUT_PATTERNS)) {
        if (pattern.test(title)) {
            return layout;
        }
    }
    return 'Other';
}

/**
 * 识别轴类型
 */
function detectSwitch(title) {
    for (const [switchType, pattern] of Object.entries(SWITCH_PATTERNS)) {
        if (pattern.test(title)) {
            return switchType;
        }
    }
    return 'Other';
}

/**
 * 识别分类
 */
function detectCategories(title) {
    const categories = [];
    
    for (const [category, pattern] of Object.entries(CATEGORY_PATTERNS)) {
        if (pattern.test(title)) {
            categories.push(category);
        }
    }
    
    return categories.length > 0 ? categories : ['General'];
}

/**
 * 转换 Amazon 图片 URL 为高清版本
 */
function getHighResImage(asin, thumbnail) {
    if (!thumbnail) return '';
    
    // 如果是 Amazon CDN 图片，转换为高清版本
    if (thumbnail.includes('m.media-amazon.com')) {
        return thumbnail.replace(/\/_SL\d+_\//, '/_SL1500_/');
    }
    
    return thumbnail;
}

/**
 * 生成唯一 ID
 */
function generateId(existingProducts) {
    const maxId = existingProducts.reduce((max, p) => {
        const idNum = parseInt(p.id) || 0;
        return idNum > max ? idNum : max;
    }, 0);
    return String(maxId + 1);
}

/**
 * 加载现有产品
 */
function loadProducts() {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const match = content.match(/const topProducts = (\[[\s\S]*?\]);/);
    if (!match) {
        return [];
    }
    
    try {
        return eval('(' + match[1] + ')');
    } catch (e) {
        console.error('解析产品数据失败:', e.message);
        return [];
    }
}

/**
 * 保存产品数据
 */
function saveProducts(products) {
    const productsStr = JSON.stringify(products, null, 4);
    let content = '';
    
    if (fs.existsSync(DATA_FILE)) {
        content = fs.readFileSync(DATA_FILE, 'utf8');
    } else {
        content = '// MechKeys Hub - Product Data\n';
    }
    
    const newContent = content.replace(
        /const topProducts = \[[\s\S]*?\];/,
        `const topProducts = ${productsStr};`
    );
    
    fs.writeFileSync(DATA_FILE, newContent, 'utf8');
}

/**
 * 写入日志
 */
function log(message) {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, logLine, 'utf8');
    console.log(message);
}

/**
 * 主函数
 */
async function main() {
    console.log('='.repeat(60));
    console.log('MechKeys Hub - Amazon 产品抓取');
    console.log(`时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);
    console.log(`目标: 抓取 ${DAILY_LIMIT} 款产品`);
    console.log('='.repeat(60));
    console.log('');
    
    log(`========== 开始抓取: ${new Date().toISOString()} ==========`);
    
    // 搜索关键词列表（按销量优先级）
    const searchQueries = [
        'best seller mechanical keyboard amazon',
        'top rated gaming mechanical keyboard',
        'best mechanical keyboard 2026 amazon',
        'keychron mechanical keyboard amazon best seller',
        'leopold mechanical keyboard amazon',
        'ducky mechanical keyboard amazon'
    ];
    
    const allProducts = [];
    
    // 抓取产品
    for (const query of searchQueries) {
        if (allProducts.length >= DAILY_LIMIT) break;
        
        console.log(`\n🔍 搜索: ${query}`);
        log(`搜索: ${query}`);
        
        const results = await searchProducts(query, 15);
        
        for (const product of results) {
            if (allProducts.length >= DAILY_LIMIT) break;
            
            // 跳过已存在的产品（根据 ASIN 判断）
            const existingProducts = loadProducts();
            const exists = existingProducts.some(p => p.amazon_asin === product.asin);
            
            if (exists) {
                console.log(`  ⏭️  跳过已存在: ${product.asin}`);
                continue;
            }
            
            // 处理产品数据
            const brand = detectBrand(product.title);
            const layout = detectLayout(product.title);
            const switchType = detectSwitch(product.title);
            const categories = detectCategories(product.title);
            const image = getHighResImage(product.asin, product.image);
            
            // 生成 Amazon 联盟链接
            const affiliateLink = `https://www.amazon.com/dp/${product.asin}?tag=mechkeyshub-20`;
            
            const newProduct = {
                id: generateId(existingProducts),
                name: product.title.substring(0, 200),
                amazon_asin: product.asin,
                price: product.price || '$0',
                rating: product.rating || '0',
                reviews: product.reviews || '0',
                brand: brand,
                layout: layout,
                switch: switchType,
                image: image,
                link: affiliateLink,
                categories: categories,
                source: 'serpapi',
                scraped_at: new Date().toISOString().split('T')[0]
            };
            
            allProducts.push(newProduct);
            existingProducts.push(newProduct);
            
            console.log(`  ✅ 新增: [${brand}] ${product.title.substring(0, 50)}...`);
            log(`新增产品: ${product.asin} - ${brand} - ${product.title.substring(0, 50)}`);
            
            // 延迟避免请求过快
            await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
        }
        
        // 搜索间隔
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY * 2));
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`抓取完成: 共 ${allProducts.length} 款新产品`);
    console.log('='.repeat(60));
    
    if (allProducts.length === 0) {
        console.log('\n⚠️ 没有抓到新产品（可能都已存在）');
        log('没有抓到新产品');
        return;
    }
    
    // 保存产品数据
    try {
        const existingProducts = loadProducts();
        const updatedProducts = [...existingProducts, ...allProducts];
        saveProducts(updatedProducts);
        
        console.log(`\n✅ 已保存到 ${DATA_FILE}`);
        console.log(`   现有产品总数: ${updatedProducts.length}`);
        console.log(`   新增产品数: ${allProducts.length}`);
        log(`保存成功: ${allProducts.length} 款新产品, 总计 ${updatedProducts.length}`);
        
        // 输出新增产品摘要
        console.log('\n📋 新增产品摘要:');
        const brandCount = {};
        allProducts.forEach(p => {
            brandCount[p.brand] = (brandCount[p.brand] || 0) + 1;
        });
        
        for (const [brand, count] of Object.entries(brandCount)) {
            console.log(`   ${brand}: ${count} 款`);
            log(`   ${brand}: ${count} 款`);
        }
        
    } catch (error) {
        console.error('\n❌ 保存失败:', error.message);
        log(`保存失败: ${error.message}`);
    }
    
    log(`========== 抓取完成: ${allProducts.length} 款新产品 ==========`);
    console.log('\n完成！');
}

// 运行
main().catch(console.error);
