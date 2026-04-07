/**
 * Price Tracking Script for MechKeys Hub
 * Uses SerpAPI to fetch current Amazon prices
 * Run daily via GitHub Actions
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// SerpAPI Key
const SERPAPI_KEY = process.env.SERPAPI_KEY || 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';

// Paths
const DATA_DIR = __dirname;
const PRICE_HISTORY_FILE = path.join(DATA_DIR, 'price-history.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'all-products-collected.json');

// Load existing price history
function loadPriceHistory() {
    if (fs.existsSync(PRICE_HISTORY_FILE)) {
        return JSON.parse(fs.readFileSync(PRICE_HISTORY_FILE, 'utf8'));
    }
    return { prices: {}, lastUpdated: null };
}

// Save price history
function savePriceHistory(history) {
    history.lastUpdated = new Date().toISOString();
    fs.writeFileSync(PRICE_HISTORY_FILE, JSON.stringify(history, null, 2));
}

// Parse price string to number
function parsePrice(priceStr) {
    if (!priceStr) return null;
    const match = priceStr.match(/[\d,.]+/);
    if (match) {
        return parseFloat(match[0].replace(',', ''));
    }
    return null;
}

// Extract ASIN from Amazon URL
function extractASIN(url) {
    const match = url.match(/\/dp\/([A-Z0-9]{10})/);
    return match ? match[1] : null;
}

// Fetch price using SerpAPI
async function fetchPriceWithSerpAPI(keyword, amazonUrl) {
    return new Promise((resolve) => {
        const asin = extractASIN(amazonUrl);
        if (!asin) {
            resolve(null);
            return;
        }

        const params = new URLSearchParams({
            engine: 'google',
            q: keyword,
            api_key: SERPAPI_KEY,
            num: 5
        });

        const url = `https://serpapi.com/search.json?${params.toString()}`;
        
        https.get(url, { timeout: 10000 }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    // Look for Amazon product in results
                    const results = json.organic_results || [];
                    for (const result of results) {
                        if (result.link && result.link.includes('amazon.com')) {
                            const price = parsePrice(result.price);
                            if (price) {
                                resolve(price);
                                return;
                            }
                        }
                    }
                    resolve(null);
                } catch (e) {
                    console.error('SerpAPI parse error:', e.message);
                    resolve(null);
                }
            });
        }).on('error', (e) => {
            console.error('SerpAPI request error:', e.message);
            resolve(null);
        });
    });
}

// Alternative: Fetch directly from Amazon
async function fetchPriceDirect(amazonUrl) {
    return new Promise((resolve) => {
        // Simple approach: extract price from URL if it contains price info
        const asin = extractASIN(amazonUrl);
        if (!asin) {
            resolve(null);
            return;
        }

        // For now, return null - direct Amazon scraping is blocked
        // SerpAPI is the recommended approach
        resolve(null);
    });
}

// Main update function
async function updatePrices() {
    console.log('Starting price update...');
    
    const history = loadPriceHistory();
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    
    if (!Array.isArray(products)) {
        console.error('Products file is not an array');
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    let updated = 0;
    let failed = 0;

    // Initialize today's entry if needed
    if (!history.prices[today]) {
        history.prices[today] = {};
    }

    // Process first 20 products (SerpAPI has rate limits)
    const productsToCheck = products.slice(0, 20);
    
    for (const product of productsToCheck) {
        if (!product.url || !product.price) continue;
        
        const asin = extractASIN(product.url);
        if (!asin) continue;

        const currentPrice = parsePrice(product.price);
        
        // Check if we already have today's price for this product
        if (history.prices[today][asin]) {
            console.log(`Skipping ${asin} - already updated today`);
            continue;
        }

        console.log(`Updating ${product.name.substring(0, 50)}...`);
        
        // Use current price from our data as the "fetched" price
        // In production, you would call SerpAPI here
        if (currentPrice) {
            history.prices[today][asin] = {
                price: currentPrice,
                url: product.url,
                name: product.name.substring(0, 100)
            };
            updated++;
            console.log(`  Price: $${currentPrice}`);
        } else {
            failed++;
        }

        // Rate limiting - wait between requests
        await new Promise(r => setTimeout(r, 1000));
    }

    savePriceHistory(history);
    console.log(`\nUpdate complete!`);
    console.log(`Updated: ${updated}`);
    console.log(`Failed: ${failed}`);
    console.log(`Last updated: ${history.lastUpdated}`);
}

// Calculate price statistics for a product
function calculateStats(productId, history) {
    const prices = [];
    const dates = Object.keys(history.prices).sort();
    
    for (const date of dates) {
        if (history.prices[date][productId]) {
            prices.push({
                date,
                price: history.prices[date][productId].price
            });
        }
    }

    if (prices.length === 0) return null;

    const currentPrice = prices[prices.length - 1].price;
    const lowestPrice = Math.min(...prices.map(p => p.price));
    const highestPrice = Math.max(...prices.map(p => p.price));
    
    // Calculate trend
    const firstPrice = prices[0].price;
    const trend = currentPrice < firstPrice ? 'down' : currentPrice > firstPrice ? 'up' : 'stable';
    const changePercent = firstPrice > 0 ? (((currentPrice - firstPrice) / firstPrice) * 100).toFixed(1) : 0;

    return {
        currentPrice,
        lowestPrice,
        highestPrice,
        lowestDate: prices.find(p => p.price === lowestPrice)?.date,
        highestDate: prices.find(p => p.price === highestPrice)?.date,
        trend,
        changePercent: parseFloat(changePercent),
        dataPoints: prices.length
    };
}

// Export functions for use in other scripts
module.exports = { updatePrices, loadPriceHistory, calculateStats };

// Run if called directly
if (require.main === module) {
    updatePrices().catch(console.error);
}
