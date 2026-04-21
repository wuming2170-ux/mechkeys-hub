/**
 * Fix zero-price products - fetch prices from Amazon via SerpAPI
 */
const fs = require('fs');
const path = require('path');

const SERPAPI_KEY = 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';
const DATA_FILE = path.join(__dirname, 'inline-products-detailed.js');

const zeroPriceAsins = [
    "B09RYHRD5S","B09966HJT6","B07ZT7W5FP","B0CD31TDHZ","B0F8RCNXDJ",
    "B0BW4QFGYW","B0BW4TR6KM","B0BW4Q8QC1","B07XDXFSBP","B07KXS9N69",
    "B07CVDLPJG","B0DP42TFQL","B07NZX84HB","B0C8QTMK43","B0D437TXFM",
    "B0CXY7ZKSG","B0CYCNP4GZ","B089YFHYYS","B0BW25LPV6","B0CXY9B7Y5",
    "B0BSP1Y7L4","B08PB61J5F","B0GMLLY8FK","B0BSNZPB6V","B004VKUSG6",
    "B07SVJJCP3","B09LK63PKB"
];

function fetch(url) {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? require('https') : require('http');
        lib.get(url, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

async function getPrice(asin) {
    const url = `https://serpapi.com/search.json?engine=amazon&k=${encodeURIComponent(asin)}&api_key=${SERPAPI_KEY}`;
    try {
        const data = await fetch(url);
        if (data.error) return null;
        const results = data.organic_results || [];
        const match = results.find(r => r.asin === asin);
        if (match && match.extracted_price !== undefined) return match.extracted_price;
        if (match && match.price) return parseFloat(match.price.replace('$', '').replace(',', ''));
        // fallback: first result
        if (results[0] && results[0].extracted_price !== undefined) return results[0].extracted_price;
        return null;
    } catch (e) {
        return null;
    }
}

function loadProducts() {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const match = content.match(/const topProducts = (\[[\s\S]*?\]);/);
    return eval('(' + match[1] + ')');
}

function saveProducts(products) {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const productsStr = JSON.stringify(products, null, 4);
    const newContent = content.replace(
        /const topProducts = \[[\s\S]*?\];/,
        `const topProducts = ${productsStr};`
    );
    fs.writeFileSync(DATA_FILE, newContent, 'utf8');
}

async function main() {
    const products = loadProducts();
    let updated = 0;
    let failed = 0;

    for (const asin of zeroPriceAsins) {
        const product = products.find(p => p.amazon_asin === asin);
        if (!product) continue;

        process.stdout.write(`Fetching ${asin}...`);
        const price = await getPrice(asin);

        if (price && price > 0) {
            product.price = '$' + price.toFixed(2);
            product.updated = new Date().toISOString().split('T')[0];
            console.log(` => ${product.price}`);
            updated++;
        } else {
            console.log(` => FAILED (price: ${price})`);
            failed++;
        }

        await new Promise(r => setTimeout(r, 2000));
    }

    if (updated > 0) {
        saveProducts(products);
        console.log(`\n✅ Updated ${updated} products, ${failed} failed`);
    } else {
        console.log(`\n⚠️ No prices updated (${failed} failed)`);
    }
}

main().catch(console.error);
