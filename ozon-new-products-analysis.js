/**
 * Ozon 食品储存罐新品分析脚本
 * 使用 Ozon Seller API 获取分类下产品，分析近7天新品
 * 用途：选品参考 + 跟卖分析
 */

const fs = require('fs');

// ============ 配置区 ============
const CLIENT_ID = '4363650';
const API_KEY = '6b432605-f1b9-42d2-b3fd-f8ce5c63e78a';

// 食品储存罐相关类目ID（Ozon 类目树中找到的）
const CATEGORY_ID = 18763; // Контейнеры для хранения

// API 端点
const BASE_URL = 'https://api-seller.ozon.ru';

// ============ 工具函数 ============
function apiRequest(path, method = 'POST', body = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : '';
    
    const options = {
      hostname: 'api-seller.ozon.ru',
      path,
      method,
      headers: {
        'Client-Id': CLIENT_ID,
        'Api-Key': API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      },
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          resolve({ error: 'Parse error', raw: responseData.substring(0, 200) });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => reject(new Error('API timeout')));
    req.write(data);
    req.end();
  });
}

// ============ 核心功能 ============

/**
 * 获取类目下的产品列表（分页）
 */
async function getProductsByCategory(categoryId, page = 1, perPage = 100) {
  const body = {
    category_id: categoryId,
    page,
    limit: perPage,
    sort: {
      sort_fields: 'price', // 价格排序
      sort_direction: 'asc'
    }
  };

  const response = await apiRequest('/v2/product/list', 'POST', body);
  return response;
}

/**
 * 获取产品详情
 */
async function getProductDetails(productIds) {
  if (!productIds || productIds.length === 0) return [];
  
  const body = {
    product_ids: productIds,
    sku_or_ids: false
  };

  const response = await apiRequest('/v1/product/info', 'POST', body);
  return response;
}

/**
 * 获取所有子分类
 */
async function getCategoryTree(categoryId = 0) {
  const body = { category_id: categoryId };
  const response = await apiRequest('/v1/description-category/tree', 'POST', body);
  return response;
}

/**
 * 分析产品是否为新品（新上架但有销量）
 * 指标：
 * - 评论数 1-20：可能是新品
 * - 评分 >= 4.5：质量OK
 * - 上架时间：无法直接获取，用评论增长速度估算
 */
function analyzeNewProducts(products) {
  return products
    .filter(p => {
      // 筛选条件：评论数 1-50 的可能是新品，且评分 >= 4.0
      const reviews = p.rating ? p.rating.total_views || 0 : 0;
      const rating = p.rating?.stars || 0;
      return rating >= 4.0;
    })
    .map(p => ({
      id: p.id,
      name: p.name,
      price: p.price?.price ?? 'N/A',
      rating: p.rating?.stars || 0,
      reviews: p.rating?.total_views || 0,
      categoryId: p.category_id,
      images: p.images?.map(i => i.image_url) || [],
      url: `https://www.ozon.ru/product/${p.url}` || `https://www.ozon.ru/product/${p.product_id}`,
      status: p.status,
      // 估算新品指数：评分高 + 评论少 = 可能是新兴产品
      newScore: ((p.rating?.stars || 0) * 10) - Math.min(p.rating?.total_views || 0, 100)
    }))
    .sort((a, b) => b.newScore - a.newScore);
}

/**
 * 搜索特定关键词的产品（用于找新品）
 */
async function searchProducts(keyword, page = 1) {
  const body = {
    text: keyword,
    page,
    limit: 100
  };

  const response = await apiRequest('/v2/search/product', 'POST', body);
  return response;
}

// ============ 主程序 ============
async function main() {
  console.log('🍶 Ozon 食品储存罐新品分析');
  console.log('='.repeat(50));

  const results = {
    timestamp: new Date().toISOString(),
    categoryId: CATEGORY_ID,
    newProducts: [],
    hotProducts: [],
    recommendations: []
  };

  try {
    // 1. 获取分类树，了解子分类
    console.log('\n📂 获取类目结构...');
    const tree = await getCategoryTree(CATEGORY_ID);
    
    if (tree.result) {
      console.log('找到类目结构');
      // 打印子分类
      const children = tree.result?.children || [];
      console.log(`子分类数量: ${children.length}`);
      children.slice(0, 10).forEach(child => {
        console.log(`  - ${child.category_name} (ID: ${child.category_id})`);
      });
    }

    // 2. 获取分类下产品列表
    console.log('\n📦 获取分类产品列表...');
    
    // 先试 API v2
    let productList = null;
    try {
      const body = {
        category_id: CATEGORY_ID,
        page: 1,
        limit: 100,
        sort: {
          sort_fields: 'price',
          sort_direction: 'asc'
        }
      };
      const resp = await apiRequest('/v2/product/list', 'POST', body);
      if (!resp.error) {
        productList = resp;
        console.log(`找到 ${resp.products?.length || 0} 个产品`);
      }
    } catch (e) {
      console.log(`v2 接口失败: ${e.message}`);
    }

    // 如果 v2 失败，试试 v1
    if (!productList) {
      try {
        const body = {
          category_id: CATEGORY_ID,
          page: 1,
          limit: 100
        };
        const resp = await apiRequest('/v1/product/list', 'POST', body);
        if (!resp.error) {
          productList = resp;
        }
      } catch (e) {
        console.log(`v1 接口也失败: ${e.message}`);
      }
    }

    // 3. 尝试搜索接口找新品
    console.log('\n🔍 搜索新品关键词...');
    
    const searchKeywords = [
      'контейнер для хранения еды стеклянный',  // 玻璃食品储存罐
      'банка для хранения продуктов',            // 食品储存罐
      'контейнер с крышкой вакуумный',           // 真空带盖容器
      'пищевой контейнер пластиковый',          // 塑料食品容器
      'емкость для хранения круп',              // 谷物储存容器
      'органайзер для кухни контейнер',         // 厨房收纳容器
      'баночка для специй',                      // 香料罐
      'ланчбокс с крышкой',                     // 带盖午餐盒
    ];

    const allSearchResults = [];

    for (const kw of searchKeywords) {
      try {
        console.log(`  搜索: ${kw}`);
        const searchResp = await searchProducts(kw);
        
        if (searchResp.products) {
          console.log(`    找到 ${searchResp.products.length} 个产品`);
          allSearchResults.push(...searchResp.products);
        }
        
        await new Promise(r => setTimeout(r, 500));
      } catch (e) {
        console.log(`    搜索失败: ${e.message}`);
      }
    }

    // 去重
    const uniqueProducts = [];
    const seenIds = new Set();
    for (const p of allSearchResults) {
      if (!seenIds.has(p.id)) {
        seenIds.add(p.id);
        uniqueProducts.push(p);
      }
    }

    console.log(`\n📊 共找到 ${uniqueProducts.length} 个不重复产品`);

    // 4. 分析产品
    if (uniqueProducts.length > 0) {
      console.log('\n🔬 分析产品...\n');

      // 新品：评分 >= 4.0，评论数 <= 50
      const newProducts = uniqueProducts
        .filter(p => {
          const stars = p.rating?.stars || 0;
          const views = p.rating?.total_views || 0;
          return stars >= 4.0 && views <= 100;
        })
        .sort((a, b) => {
          const scoreA = (a.rating?.stars || 0) * 100 - Math.min(a.rating?.total_views || 0, 100);
          const scoreB = (b.rating?.stars || 0) * 100 - Math.min(b.rating?.total_views || 0, 100);
          return scoreB - scoreA;
        })
        .slice(0, 20);

      // 热销品：评分高，评论多
      const hotProducts = [...uniqueProducts]
        .filter(p => (p.rating?.stars || 0) >= 4.5 && (p.rating?.total_views || 0) > 100)
        .sort((a, b) => (b.rating?.total_views || 0) - (a.rating?.total_views || 0))
        .slice(0, 20);

      console.log('🆕 新品 TOP 10（评分高 + 评论少 = 可能是新兴产品）：\n');
      newProducts.slice(0, 10).forEach((p, i) => {
        console.log(`${i + 1}. ${p.name.substring(0, 60)}`);
        console.log(`   价格: ${p.price?.price || p.price || 'N/A'} | 评分: ${p.rating?.stars || 'N/A'} | 评论: ${p.rating?.total_views || 0}`);
        console.log(`   ID: ${p.product_id || p.id}`);
        console.log('');
      });

      console.log('\n🔥 热销品 TOP 10（评分高 + 评论多）：\n');
      hotProducts.slice(0, 10).forEach((p, i) => {
        console.log(`${i + 1}. ${p.name.substring(0, 60)}`);
        console.log(`   价格: ${p.price?.price || p.price || 'N/A'} | 评分: ${p.rating?.stars || 'N/A'} | 评论: ${p.rating?.total_views || 0}`);
        console.log('');
      });

      results.newProducts = newProducts;
      results.hotProducts = hotProducts;

      // 5. 选品推荐
      console.log('\n💡 选品推荐（跟卖机会）：\n');

      // 新品中挑出最适合跟卖的
      const recommendations = newProducts
        .filter(p => {
          const price = p.price?.price || p.price;
          return price && price >= 300 && price <= 2000; // 价格 300-2000 卢布有利润空间
        })
        .slice(0, 5);

      recommendations.forEach((p, i) => {
        console.log(`${i + 1}. 【跟卖推荐】`);
        console.log(`   产品名: ${p.name}`);
        console.log(`   当前价格: ${p.price?.price || p.price} ₽`);
        console.log(`   评分: ${p.rating?.stars || 'N/A'} | 评论: ${p.rating?.total_views || 0}`);
        console.log(`   产品ID: ${p.product_id || p.id}`);
        console.log('');
      });

      results.recommendations = recommendations;
    }

    // 保存报告
    const reportPath = '/Users/wmk/Desktop/mechkeys-hub/ozon-food-storage-new-products.json';
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n📄 报告已保存: ${reportPath}`);

  } catch (e) {
    console.error('脚本执行失败:', e);
    results.error = e.message;
  }

  return results;
}

// 运行
const https = require('https');
main().then(r => {
  console.log('\n✅ 分析完成');
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});