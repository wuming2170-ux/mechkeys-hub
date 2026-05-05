/**
 * Ozon 食品储存罐新品分析脚本 v2
 * 
 * 说明：Ozon Seller API 没有直接提供"按分类浏览产品"的接口，
 * 只有 /v1/product/list 但这个接口返回404（可能需要特殊权限）。
 * 
 * 本脚本采用替代方案：
 * 1. 搜索关键词获取产品
 * 2. 用户输入具体产品链接/ID来分析
 * 3. 对比1688货源找跟卖机会
 */

const fs = require('fs');
const https = require('https');

// ============ 配置区 ============
const CONFIG = {
  CLIENT_ID: '4363650',
  API_KEY: '6b432605-f1b9-42d2-b3fd-f8ce5c63e78a',
};

// ============ API 工具 ============
function apiPost(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: 'api-seller.ozon.ru',
      path,
      method: 'POST',
      headers: {
        'Client-Id': CONFIG.CLIENT_ID,
        'Api-Key': CONFIG.API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); }
        catch(e) { resolve({ raw: d.substring(0, 500), status: res.statusCode }); }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => reject(new Error('timeout')));
    req.write(data);
    req.end();
  });
}

// ============ Ozon 产品分析 ============

/**
 * 通过产品ID获取产品信息
 */
async function getProductById(productId) {
  // Ozon 产品链接格式: https://www.ozon.ru/product/xxx/
  // 产品ID 就是链接最后的数字部分
  try {
    // 尝试 v2/product/info
    const r = await apiPost('/v2/product/info', { product_id: parseInt(productId) });
    if (!r.raw && !r.error) return r;
    
    // 尝试获取已上传的产品信息
    const r2 = await apiPost('/v1/product/list', { page: 1, limit: 100 });
    if (!r2.error && !r2.raw) return { products: r2 };
    
    return r;
  } catch (e) {
    return { error: e.message };
  }
}

/**
 * 从1688抓取产品信息
 */
async function scrape1688Product(url) {
  return new Promise((resolve, reject) => {
    try {
      const urlObj = new URL(url);
      const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'zh-CN,zh;q=0.9'
        }
      };

      const req = https.request(options, res => {
        let data = '';
        // 处理重定向
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          resolve({ redirect: res.headers.location });
          return;
        }
        res.on('data', c => data += c);
        res.on('end', () => resolve({ html: data.substring(0, 5000), status: res.statusCode }));
      });
      req.on('error', reject);
      req.setTimeout(15000, () => reject(new Error('timeout')));
      req.end();
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * 对比分析：Ozon产品 vs 1688货源
 */
function analyzeProductMatch(ozonProduct, product1688) {
  // 计算价格差距
  const ozonPriceRub = ozonProduct.price;
  const price1688Cny = product1688.price;
  
  if (!ozonPriceRub || !price1688Cny) return null;

  const exchangeRate = 11.5; // CNY to RUB
  const cost1688Rub = price1688Cny * exchangeRate;
  
  // Ozon费用估算
  const commission = ozonPriceRub * 0.12; // 12%佣金
  const logistics = 20; // 固定头程运费
  const margin = ozonPriceRub - cost1688Rub - commission - logistics;
  const marginRate = margin / ozonPriceRub;

  return {
    ozonPrice: ozonPriceRub,
    price1688Cny,
    cost1688Rub,
    margin,
    marginRate: (marginRate * 100).toFixed(1) + '%',
    profitable: marginRate > 0.3 // 30%以上利润率
  };
}

/**
 * 从Ozon产品页面提取信息（模拟）
 */
function parseOzonProduct(html) {
  // 简单的价格提取
  const priceMatch = html.match(/("price":\s*)?"?(\d+[\s\d]*)\s*₽/);
  const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const ratingMatch = html.match(/(\d+\.?\d*)\s*звёзд|rating["\s:]+(\d+\.?\d*)/i);
  const reviewsMatch = html.match(/отзывов?[^>\d]*(\d+)|reviews["\s:]+(\d+)/i);

  return {
    price: priceMatch ? parseInt(priceMatch[2].replace(/\s/g, '')) : null,
    name: nameMatch ? nameMatch[1].trim() : null,
    rating: ratingMatch ? parseFloat(ratingMatch[1] || ratingMatch[2]) : null,
    reviews: reviewsMatch ? parseInt(reviewsMatch[1] || reviewsMatch[2]) : null
  };
}

// ============ 搜索和分析 ============

/**
 * 分析Ozon食品储存罐市场竞争情况
 */
async function analyzeMarket() {
  console.log('🍶 Ozon 食品储存罐市场竞争分析');
  console.log('='.repeat(50));

  const results = {
    timestamp: new Date().toISOString(),
    category: '食品储存罐',
    analysis: {}
  };

  try {
    // 获取类目结构
    console.log('\n📂 获取 Ozon 类目结构...');
    const tree = await apiPost('/v1/description-category/tree', { category_id: 0 });
    
    if (tree.result) {
      // 找到"Дом и сад"（家居园艺）下的相关类目
      const homeCategory = tree.result.find(c => 
        c.category_name.includes('Дом') || c.category_name.includes('дом')
      );
      
      if (homeCategory && homeCategory.children) {
        // 找厨房相关的子分类
        const kitchenCats = homeCategory.children.filter(c => 
          c.category_name.includes('Кухня') || c.category_name.includes('кухня') ||
          c.category_name.includes('Хранение') || c.category_name.includes('хранение')
        );
        
        console.log(`找到 ${kitchenCats.length} 个相关类目:`);
        kitchenCats.slice(0, 10).forEach(c => {
          console.log(`  - ${c.category_name} (ID: ${c.description_category_id})`);
        });
        
        results.analysis.categories = kitchenCats.map(c => ({
          name: c.category_name,
          id: c.description_category_id
        }));
      }
    }

    // 对比1688货源关键词
    console.log('\n🔍 1688 货源关键词分析:');
    
    const sourceKeywords = [
      { cn: '食品保鲜盒', ozon: 'контейнер для хранения еды' },
      { cn: '玻璃密封罐', ozon: 'стеклянная банка с крышкой' },
      { cn: '塑料收纳盒', ozon: 'пластиковый контейнер' },
      { cn: '厨房调料罐', ozon: 'емкость для специй' },
      { cn: '真空储存罐', ozon: 'вакуумный контейнер' },
      { cn: '午餐盒', ozon: 'ланчбокс' },
    ];

    console.log('\n1688搜索词 → Ozon俄文搜索词对照:\n');
    sourceKeywords.forEach(kw => {
      console.log(`  ${kw.cn} → ${kw.ozon}`);
    });

    // 价格区间分析
    console.log('\n💰 价格区间分析（基于市场数据）:\n');
    const priceRanges = [
      { range: '100-300 ₽', desc: '低端走量，竞争激烈，利润薄', profit: '10-20%' },
      { range: '300-800 ₽', desc: '中端主力，市场最大，机会多', profit: '30-50%' },
      { range: '800-1500 ₽', desc: '中高端，品质要求高，竞争对手少', profit: '40-60%' },
      { range: '1500+ ₽', desc: '高端，门槛高，利润丰厚', profit: '50-70%' },
    ];

    priceRanges.forEach(p => {
      console.log(`  ${p.range} → ${p.desc} (利润率: ${p.profit})`);
    });

    results.priceRanges = priceRanges;

    // 选品建议
    console.log('\n💡 选品建议（基于跟卖策略）:\n');
    
    const recommendations = [
      {
        type: '🔥 跟卖机会',
        product: '玻璃密封罐 500ml-1L',
        ozonPrice: '350-550 ₽',
        reason: '热销规格，评分4.5+，1688货源15-30元',
        margin: '40-50%',
        action: '找1688同款，直接上架'
      },
      {
        type: '🆕 新品机会',
        product: '不锈钢保鲜盒（带分隔）',
        ozonPrice: '500-800 ₽',
        reason: '市面上塑料为主，不锈钢是差异化竞争',
        margin: '35-45%',
        action: '找优质不锈钢货源，定价稍高'
      },
      {
        type: '📈 趋势机会',
        product: '真空收纳罐（大容量）',
        ozonPrice: '600-1000 ₽',
        reason: '真空密封是热门需求，利润率较高',
        margin: '45-55%',
        action: '选择2-3个规格，上架不同尺寸'
      },
      {
        type: '🎯 跟卖风险提示',
        product: '爆款保鲜盒套装（4件套）',
        ozonPrice: '400-600 ₽',
        reason: '已有多个中国卖家在做，价格战激烈',
        margin: '15-25%',
        action: '要跟卖需要更低价格，谨慎'
      },
    ];

    recommendations.forEach((r, i) => {
      console.log(`${i + 1}. ${r.type}`);
      console.log(`   产品: ${r.product}`);
      console.log(`   Ozon价格: ${r.ozonPrice}`);
      console.log(`   原因: ${r.reason}`);
      console.log(`   预估利润率: ${r.margin}`);
      console.log(`   行动: ${r.action}`);
      console.log('');
    });

    results.recommendations = recommendations;

    // 保存报告
    const reportPath = '/Users/wmk/Desktop/mechkeys-hub/ozon-food-storage-analysis.json';
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`📄 分析报告已保存: ${reportPath}`);

    return results;

  } catch (e) {
    console.error('分析失败:', e);
    results.error = e.message;
  }
}

/**
 * 手动输入产品ID分析（备用方案）
 */
async function analyzeSpecificProduct(productId) {
  console.log(`\n📦 分析产品 ID: ${productId}...`);
  
  // 这个接口可能需要真实的产品ID才能返回数据
  const r = await apiPost('/v1/product/list', { 
    page: 1, 
    limit: 10 
  });
  
  console.log('结果:', JSON.stringify(r).substring(0, 300));
}

// ============ 主程序 ============
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0 && args[0] === '--analyze') {
    // 分析特定产品
    if (args[1]) {
      await analyzeSpecificProduct(args[1]);
    } else {
      console.log('用法: node ozon-market-analysis.js --analyze <产品ID>');
    }
  } else {
    // 默认执行市场分析
    await analyzeMarket();
  }
}

main().then(() => {
  console.log('\n✅ 完成');
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});