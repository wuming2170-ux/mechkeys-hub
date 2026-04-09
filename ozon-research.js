/**
 * Ozon 小商品品类调研脚本
 * 使用 SerpAPI 批量搜索各类目关键词，分析竞争热度
 */

const https = require('https');

const SERPAPI_KEY = 'cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2';

// 小商品子类目关键词
const CATEGORIES = [
  // 家居收纳
  { name: '厨房收纳盒', keywords: ['кухонные контейнеры для хранения', 'органайзер для кухни'] },
  { name: '浴室收纳', keywords: ['органайзер для ванной', 'полка для ванной комнаты'] },
  { name: '衣橱收纳', keywords: ['органайзер для одежды', 'вешалка для шкафа'] },
  
  // 厨房用品
  { name: '厨房小工具', keywords: ['кухонные инструменты', 'принадлежности для готовки'] },
  { name: '保温杯/水壶', keywords: ['термос', 'бутылка для воды'] },
  { name: '餐具套装', keywords: ['столовые приборы набор', 'посуда для кухни'] },
  
  // 3C配件
  { name: '手机数据线', keywords: ['кабель для телефона', 'USB кабель'] },
  { name: '手机支架', keywords: ['держатель для телефона', 'подставка для телефона'] },
  { name: '充电宝', keywords: ['внешний аккумулятор', 'портативная зарядка'] },
  { name: '蓝牙耳机', keywords: ['Bluetooth наушники', 'беспроводные наушники'] },
  
  // 宠物用品
  { name: '宠物喂食器', keywords: ['кормушка для животных', 'автокормушка'] },
  { name: '宠物玩具', keywords: ['игрушки для кошек', 'игрушки для собак'] },
  { name: '宠物床/窝', keywords: ['лежанка для собаки', 'кошачий домик'] },
  
  // 户外运动
  { name: '瑜伽垫', keywords: ['коврик для йоги', 'фитнес коврик'] },
  { name: '运动水壶', keywords: ['спортивная бутылка', 'бутылка для фитнеса'] },
  { name: '健身小器材', keywords: ['гантели', 'эспандер'] },
  
  // 办公文具
  { name: '桌面收纳', keywords: ['органайзер для стола', 'подставка для канцелярии'] },
  { name: '笔记本/便签', keywords: ['блокнот', 'стикеры'] },
  { name: '文件夹/档案盒', keywords: ['папка для документов', 'файловый бокс'] },
  
  // 节日/礼品
  { name: '装饰灯', keywords: ['гирлянда', 'новогодние огни'] },
  { name: '香薰蜡烛', keywords: ['ароматическая свеча', 'соевые свечи'] },
];

function searchOzon(keyword) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      engine: 'ozon',
      'search_domain': 'ozon.com',
      kwd: keyword,
      api_key: SERPAPI_KEY
    });

    const options = {
      hostname: 'serpapi.com',
      path: `/search?${params.toString()}`,
      method: 'GET',
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ error: e.message });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => reject(new Error('timeout')));
    req.end();
  });
}

function extractResults(json) {
  if (!json || !json.organic_results) return [];
  return json.organic_results.map(item => ({
    title: item.title || '',
    price: item.primary_price || item.price || '',
    rating: item.rating || 0,
    reviews: item.reviews || 0,
    url: item.link || ''
  }));
}

async function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('🔍 开始 Ozon 小商品品类调研...\n');
  
  const results = [];
  
  for (const cat of CATEGORIES) {
    console.log(`📦 调研: ${cat.name}`);
    
    let bestResult = null;
    let totalResults = 0;
    
    for (const kw of cat.keywords) {
      try {
        console.log(`   搜索: "${kw}"`);
        const json = await searchOzon(kw);
        await delay(1200); // 避免请求过快
        
        if (json.search_metadata?.error || json.error) {
          console.log(`   ⚠️  API错误`);
          continue;
        }
        
        const organic = json.organic_results || [];
        totalResults += organic.length;
        
        if (!bestResult && organic.length > 0) {
          // 找评分最高且有销量的
          const sorted = organic
            .filter(r => r.rating >= 4.0)
            .sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
          
          if (sorted.length > 0) {
            bestResult = {
              keyword: kw,
              title: sorted[0].title,
              price: sorted[0].primary_price || sorted[0].price || 'N/A',
              rating: sorted[0].rating,
              reviews: sorted[0].reviews
            };
          }
        }
      } catch (e) {
        console.log(`   ⚠️  失败: ${e.message}`);
        await delay(2000);
      }
    }
    
    results.push({
      category: cat.name,
      keywords: cat.keywords,
      totalOrganic: totalResults,
      bestResult
    });
    
    console.log(`   ✅ 找到 ${totalResults} 个结果\n`);
    await delay(500);
  }
  
  // 生成报告
  console.log('\n========================================');
  console.log('📊 Ozon 小商品品类调研报告');
  console.log('========================================\n');
  
  // 按竞争热度排序（结果数越多 = 竞争越激烈）
  const sorted = [...results].sort((a, b) => b.totalOrganic - a.totalOrganic);
  
  console.log('🏆 品类竞争热度排名（从高到低）：\n');
  sorted.forEach((r, i) => {
    const heat = r.totalOrganic > 30 ? '🔥🔥🔥 极高' : r.totalOrganic > 15 ? '🔥🔥 中等' : '🔥 较低';
    console.log(`${i + 1}. 【${r.category}】 ${heat} (${r.totalOrganic} 个搜索结果)`);
    if (r.bestResult) {
      console.log(`   热销品: ${r.bestResult.title.substring(0, 50)}...`);
      console.log(`   价格: ${r.bestResult.price} | 评分: ${r.bestResult.rating} | 评论: ${r.bestResult.reviews}`);
    }
    console.log('');
  });
  
  // 计算推荐指数（低竞争 + 高评分 = 机会大）
  const recommendations = results
    .filter(r => r.bestResult && r.bestResult.rating >= 4.0)
    .map(r => ({
      ...r,
      score: (r.bestResult.reviews || 0) / Math.max(r.totalOrganic, 1) * (r.bestResult.rating || 0)
    }))
    .sort((a, b) => b.score - a.score);
  
  console.log('========================================');
  console.log('💡 商机推荐（竞争适中 + 高需求）：\n');
  recommendations.slice(0, 5).forEach((r, i) => {
    console.log(`${i + 1}. ${r.category}`);
    console.log(`   关键词: ${r.keywords.join(' / ')}`);
    console.log(`   竞争度: ${r.totalOrganic} 个结果 | 评分: ${r.bestResult.rating} | 评论数: ${r.bestResult.reviews}`);
    console.log('');
  });
  
  // 保存详细结果
  const fs = require('fs');
  fs.writeFileSync('/Users/wmk/Desktop/mechkeys-hub/ozon-research-report.json', JSON.stringify(results, null, 2));
  console.log('📄 详细报告已保存: ozon-research-report.json');
  
  return results;
}

run().catch(console.error);
