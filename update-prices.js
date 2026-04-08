/**
 * Amazon Price Updater for MechKeys Hub
 * 用途：使用 SerpAPI 批量更新 Amazon 产品价格
 * 
 * 运行方式：
 *   node update-prices.js
 * 
 * 需要配置：
 *   SERPAPI_KEY - SerpAPI API Key
 */

const fs = require('fs');
const path = require('path');

// ============ 配置区 ============
const SERPAPI_KEY = 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';
const DATA_FILE = path.join(__dirname, 'inline-products-detailed.js');
const OUTPUT_FILE = path.join(__dirname, 'inline-products-detailed.js');
const LOG_FILE = path.join(__dirname, 'price-update-log.txt');
// 每次请求间隔（毫秒），避免请求过快
const REQUEST_DELAY = 2000;
// ================================

/**
 * 从 SerpAPI 获取 Amazon 产品价格
 */
async function getAmazonPriceViaSerp(asin) {
    const query = `Amazon ${asin} keyboard price`;
    const url = `https://serpapi.com/search.json?engine=amazon&q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            console.error(`  ❌ ${asin}: SerpAPI 错误 - ${data.error}`);
            return null;
        }
        
        // 尝试从搜索结果中提取价格
        const results = data.amazon_results || data.organic_results || [];
        
        // 找到匹配 ASIN 的结果
        for (const result of results) {
            if (result.asin === asin || (result.link && result.link.includes(asin))) {
                const price = result.price || result.extended_amazon_price || result.amazon_price;
                if (price) {
                    console.log(`  ✅ ${asin}: ${price}`);
                    return price;
                }
            }
        }
        
        // 如果没找到精确匹配，尝试第一个结果
        if (results.length > 0) {
            const first = results[0];
            const price = first.price || first.extended_amazon_price || first.amazon_price;
            if (price) {
                console.log(`  ⚠️ ${asin}: 使用第一个结果 ${price}`);
                return price;
            }
        }
        
        console.log(`  ⚠️ ${asin}: 未找到价格`);
        return null;
    } catch (error) {
        console.error(`  ❌ ${asin}: 请求失败 - ${error.message}`);
        return null;
    }
}

/**
 * 从文件加载产品数据
 */
function loadProducts() {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    
    // 提取 JavaScript 对象
    const match = content.match(/const topProducts = (\[[\s\S]*?\]);/);
    if (!match) {
        throw new Error('无法解析产品数据文件');
    }
    
    // 使用 Function 构造函数安全地解析 JSON（产品数据是 JS 对象数组）
    const products = eval('(' + match[1] + ')');
    return products;
}

/**
 * 保存产品数据
 */
function saveProducts(products) {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const productsStr = JSON.stringify(products, null, 4);
    
    // 替换产品数据
    const newContent = content.replace(
        /const topProducts = \[[\s\S]*?\];/,
        `const topProducts = ${productsStr};`
    );
    
    fs.writeFileSync(OUTPUT_FILE, newContent, 'utf8');
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
    console.log('MechKeys Hub - Amazon 价格更新');
    console.log('='.repeat(60));
    console.log('');
    
    const timestamp = new Date().toISOString();
    log(`========== 价格更新开始: ${timestamp} ==========`);
    
    // 加载产品
    let products;
    try {
        products = loadProducts();
        console.log(`已加载 ${products.length} 个产品\n`);
    } catch (error) {
        console.error('加载产品数据失败:', error.message);
        return;
    }
    
    // 筛选有 ASIN 的产品
    const productsWithAsin = products.filter(p => p.amazon_asin);
    console.log(`其中 ${productsWithAsin.length} 个产品有 Amazon ASIN\n`);
    
    // 统计
    let updated = 0;
    let failed = 0;
    let skipped = 0;
    const priceChanges = [];
    
    // 更新价格
    for (const product of productsWithAsin) {
        console.log(`正在更新: ${product.name.substring(0, 50)}...`);
        console.log(`  ASIN: ${product.amazon_asin}, 当前价格: ${product.price}`);
        
        const newPrice = await getAmazonPriceViaSerp(product.amazon_asin);
        
        if (newPrice) {
            if (product.price !== newPrice) {
                const oldPrice = product.price;
                product.price = newPrice;
                product.updated = new Date().toISOString().split('T')[0];
                priceChanges.push({
                    name: product.name,
                    asin: product.amazon_asin,
                    oldPrice,
                    newPrice
                });
                updated++;
                log(`价格更新: ${product.amazon_asin} ${oldPrice} → ${newPrice}`);
            } else {
                console.log(`  ℹ️ 价格未变: ${newPrice}`);
                skipped++;
            }
        } else {
            failed++;
            log(`价格更新失败: ${product.amazon_asin}`);
        }
        
        // 延迟
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
    }
    
    // 保存更新后的数据
    if (updated > 0) {
        try {
            saveProducts(products);
            console.log(`\n✅ 已保存更新后的产品数据 (${updated} 个价格已更新)`);
            log(`已保存更新: ${updated} 个价格`);
        } catch (error) {
            console.error('保存失败:', error.message);
            log(`保存失败: ${error.message}`);
        }
    }
    
    // 输出变化摘要
    console.log('\n' + '='.repeat(60));
    console.log('价格变化汇总');
    console.log('='.repeat(60));
    
    if (priceChanges.length === 0) {
        console.log('没有价格变化');
    } else {
        priceChanges.forEach(change => {
            console.log(`  ${change.asin}: ${change.oldPrice} → ${change.newPrice}`);
        });
    }
    
    // 统计摘要
    console.log('\n' + '='.repeat(60));
    console.log('更新统计');
    console.log('='.repeat(60));
    console.log(`  总产品数: ${productsWithAsin.length}`);
    console.log(`  价格更新: ${updated}`);
    console.log(`  价格未变: ${skipped}`);
    console.log(`  更新失败: ${failed}`);
    
    log(`========== 价格更新完成: 更新=${updated}, 未变=${skipped}, 失败=${failed} ==========`);
    console.log('\n完成！');
}

main().catch(console.error);
