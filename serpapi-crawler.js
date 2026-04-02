/**
 * SerpAPI Amazon Product Crawler
 * 获取 Amazon US 机械键盘产品数据
 * 
 * 运行方式：
 *   node serpapi-crawler.js
 * 
 * 注意：SerpAPI 免费账户每月 100 次，建议先测试几个产品
 */

const https = require('https');

// 你的 SerpAPI Key
const API_KEY = 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';

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
        
        console.log(`正在请求: ${query} (page ${page})...`);
        
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function formatProducts(result) {
    // SerpAPI Amazon 可能有不同的字段名
    const items = result.products || result.organic_results || result.amazon_products || [];
    
    if (items.length === 0) {
        console.log('\n警告: 未找到产品，可能数据在以下字段：');
        console.log(Object.keys(result).filter(k => result[k] && typeof result[k] === 'object'));
    }
    
    return items.map((p, index) => {
        // 尝试从不同字段提取 ASIN
        const asin = p.asin || p.product_id || p.id || '';
        
        // 尝试从不同字段提取图片
        const thumbnail = p.thumbnail || p.image || p.imag || '';
        
        // 生成图片 URL
        const imageUrl = asin && !thumbnail
            ? `https://images-na.ssl-images-amazon.com/images/I/${asin}._SL500_.jpg`
            : thumbnail;
        
        return {
            id: `product-${index + 1}`,
            name: p.title || 'Unknown Product',
            tagline: (p.title || '').substring(0, 100),
            price: p.price || '$0',
            rating: parseFloat(p.rating || p.stars || '0'),
            reviews: parseInt((p.reviews || p.num_reviews || '0').toString().replace(/,/g, '')),
            asin: asin,
            url: p.link || p.url || `https://www.amazon.com/dp/${asin}`,
            image: imageUrl,
            brand: p.brand || '',
        };
    });
}

async function main() {
    console.log('='.repeat(60));
    console.log('SerpAPI Amazon 机械键盘数据抓取');
    console.log('='.repeat(60));
    console.log('');

    try {
        // 搜索机械键盘（按销量排序）
        console.log('正在搜索 Amazon US 机械键盘...');
        const result = await searchAmazon('mechanical keyboard');
        
        if (result.error) {
            console.log(`API 错误: ${result.error}`);
            return;
        }

        console.log(`\n找到 ${result.search_information?.total_results || 0} 个结果`);
        console.log(`返回 ${result.products?.length || 0} 个产品\n`);

        const products = formatProducts(result);
        
        console.log('产品列表：');
        console.log('-'.repeat(60));
        
        products.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name}`);
            console.log(`   ASIN: ${p.asin}`);
            console.log(`   价格: ${p.price}`);
            console.log(`   评分: ${p.rating} (${p.reviews} 条评论)`);
            console.log(`   图片: ${p.image}`);
            console.log('');
        });

        // 保存完整 JSON 供后续使用
        const fs = require('fs');
        
        // 保存完整响应供调试
        fs.writeFileSync('amazon-full-response.json', JSON.stringify(result, null, 2));
        console.log('完整响应已保存到 amazon-full-response.json');
        
        // 检查数据结构
        console.log('\n响应包含的字段：');
        console.log(Object.keys(result));
        
        fs.writeFileSync('amazon-products.json', JSON.stringify(products, null, 2));
        console.log('数据已保存到 amazon-products.json');

    } catch (error) {
        console.error('抓取出错:', error.message);
    }
}

main();
