/**
 * Fetch detailed product info from SerpAPI for all products
 */
const https = require('https');
const fs = require('fs');

const apiKey = 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';

// 从 amazon-products-backup.json 读取 ASIN 列表
const products = JSON.parse(fs.readFileSync('amazon-products-backup.json', 'utf-8'));

function fetchProductDetails(asin) {
    return new Promise((resolve, reject) => {
        const url = `https://serpapi.com/search.json?engine=amazon_product&amazon_domain=amazon.com&asin=${asin}&api_key=${apiKey}`;
        
        console.log(`Fetching ${asin}...`);
        
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    if (result.error) {
                        console.log(`Error for ${asin}: ${result.error}`);
                        resolve({ asin, error: result.error });
                    } else {
                        const aboutItem = result.about_item || [];
                        const specs = result.item_specifications || {};
                        console.log(`  Got ${aboutItem.length} description items`);
                        resolve({
                            asin,
                            description: aboutItem.join('\n\n'),
                            specifications: specs
                        });
                    }
                } catch(e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function main() {
    const detailedProducts = [];
    
    for (const p of products.slice(0, 15)) {
        try {
            const details = await fetchProductDetails(p.asin);
            detailedProducts.push({
                asin: p.asin,
                name: p.name,
                ...details
            });
            // 间隔 2 秒避免 API 限制
            await new Promise(r => setTimeout(r, 2000));
        } catch(e) {
            console.log(`Failed ${p.asin}: ${e.message}`);
        }
    }
    
    fs.writeFileSync('product-details.json', JSON.stringify(detailedProducts, null, 2));
    console.log('\nSaved to product-details.json');
    console.log(`Fetched ${detailedProducts.length} products`);
}

main();
