/**
 * Amazon Product Image Crawler
 * 用途：从 Amazon 获取真实产品图片 URL
 * 
 * 运行方式：
 *   1. 安装依赖：npm install puppeteer
 *   2. 修改 ASIN_LIST 中的 ASIN
 *   3. 运行：node amazon-crawler.js
 * 
 * 注意：Amazon 有反爬虫机制，脚本可能需要配合代理使用
 */

const puppeteer = require('puppeteer');

const ASIN_LIST = [
    'B0BB7KXZV1', // Keychron K2 Pro
    'B0BKKYK1H5', // Keychron K6 Pro / Anne Pro 3
    'B0CLXZ4K8N', // Keychron C3 Pro
    'B0BSHXRP8K', // Ducky ONE 3 Neo
    'B0C1DVWZ9H', // DuckyMagic 2 Air / Keychron Q1 Pro
    'B071WL4Z4J', // Leopold FC750R
    'B07YNM3SSK', // Leopold FC980M
    'B00514ILUO', // Filco Majestouch 2
    'B08T5Q7W5V', // HHKB / ASUS ROG Flare
    'B0C8X8KHMY', // NuPhy Field75 / Veltune Pop70 / Zoom65
    'B0BN8HGN3H', // Akko 3098B
    'B0C4HYQJZP', // Ajazz AK735
];

async function crawlAmazonImage(asin) {
    const url = `https://www.amazon.com/dp/${asin}`;
    
    try {
        console.log(`正在抓取 ASIN: ${asin}...`);
        
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920x1080',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process'
            ],
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });

        const page = await browser.newPage();
        
        // 设置视口
        await page.setViewport({ width: 1920, height: 1080 });
        
        // 设置额外请求头
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        });

        await page.goto(url, { 
            waitUntil: 'networkidle2',
            timeout: 30000 
        });

        // 等待图片加载
        await page.waitForSelector('#landingImage', { timeout: 10000 }).catch(() => {});
        
        // 获取产品标题
        const title = await page.$eval('#productTitle', el => el.textContent.trim()).catch(() => 'Unknown');
        
        // 获取主图 URL
        const imageUrl = await page.$eval('#landingImage', el => el.src).catch(() => null);
        
        // 获取其他图片
        const altImages = await page.$$eval('.a-button-text img', images => 
            images.map(img => img.src).slice(0, 5)
        ).catch(() => []);

        await browser.close();

        console.log(`✅ ${asin}: ${title}`);
        console.log(`   主图: ${imageUrl}`);
        if (altImages.length > 0) {
            console.log(`   附加图: ${altImages.join(', ')}`);
        }
        console.log('');

        return {
            asin,
            title,
            mainImage: imageUrl,
            altImages
        };

    } catch (error) {
        console.log(`❌ ${asin}: 抓取失败 - ${error.message}`);
        return null;
    }
}

async function main() {
    console.log('='.repeat(60));
    console.log('Amazon 产品图片爬虫');
    console.log('='.repeat(60));
    console.log('');

    const results = [];

    for (const asin of ASIN_LIST) {
        const result = await crawlAmazonImage(asin);
        if (result) {
            results.push(result);
        }
        // 每个请求间隔 3 秒，避免被封
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // 输出结果 JSON
    console.log('\n' + '='.repeat(60));
    console.log('抓取结果 (JSON 格式)');
    console.log('='.repeat(60));
    console.log(JSON.stringify(results, null, 2));

    // 输出可用的图片 URL
    console.log('\n' + '='.repeat(60));
    console.log('图片 URL 列表（可直接复制到 products.js 使用）');
    console.log('='.repeat(60));
    
    results.forEach(r => {
        if (r.mainImage) {
            // 转换大图 URL 为中等尺寸
            const mediumUrl = r.mainImage.replace(/\._.*\./, '._SL500_.');
            console.log(`"${r.asin}": "${mediumUrl}",`);
        }
    });
}

main();
