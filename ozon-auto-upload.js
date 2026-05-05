/**
 * Ozon 全自动上架脚本 v2.0 - 食品储存罐品类专用
 * 1688链接 → 抓取 → 翻译 → 图片中转 → 价格计算 → Ozon上架
 * 
 * 使用方法: node ozon-auto-upload.js <1688链接>
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ============== 配置 ==============
const CONFIG = {
  // Ozon API
  CLIENT_ID: '4363650',
  API_KEY: '6b432605-f1b9-42d2-b3fd-f8ce5c63e78a',
  BASE_URL: 'api-seller.ozon.ru',
  
  // 图片中转服务
  IMAGE_PROXY_URL: 'http://localhost:8787',
  
  // ===== 食品储存罐专用定价参数 =====
  CATEGORY: '食品储存罐',
  OzonCategoryId: 17027687,  // 玻璃密封罐类目(需验证)
  
  // 定价参数
  EXCHANGE_RATE: 11.5,      // CNY → RUB 汇率
  TARGET_MARGIN: 0.50,      // 目标净利润率 50%
  
  // 成本项
  OZON_COMMISSION: 0.12,     // Ozon佣金 12%
  LOGISTICS_COST_PER_KG: 20, // 头程运费 CNY/kg (经济渠道)
  AVG_WEIGHT_KG: 0.5,        // 食品储存罐平均重量
  
  // 退货风险
  RETURN_RATE: 0.02,        // 退货率 2%
  RETURN_LOSS_RATE: 0.50,   // 退货损失率 50%（退款不退货情况）
  
  // 类目映射（中文 → Ozon ID）
  CATEGORY_MAP: {
    '保鲜盒': 17027687,
    '密封罐': 17027687,
    '玻璃罐': 17027687,
    '储物罐': 17027687,
    '食品储存': 17027687,
    '储物盒': 17027689,
    '塑料盒': 17027689,
    '水杯': 17029050,
    '保温杯': 17029050,
  },
};

// ============== 翻译词典 ==============
const TRANSLATIONS = {
  // 材质
  '304不锈钢': 'Нержавеющая сталь 304',
  '316不锈钢': 'Нержавеющая сталь 316',
  '201不锈钢': 'Нержавеющая сталь 201',
  '不锈钢': 'Нержавеющая сталь',
  '食品级': 'Пищевой',
  '塑料': 'Пластик',
  'PP塑料': 'Пластик PP',
  '硅胶': 'Силикон',
  '玻璃': 'Стекло',
  '硼硅玻璃': 'Боросиликатное стекло',
  '钢化玻璃': 'Закалённое стекло',
  '陶瓷': 'Керамика',
  '木质': 'Дерево',
  '竹制': 'Бамбук',
  
  // 规格
  '容量': 'Объём',
  '毫升': 'мл',
  '升': 'л',
  '直径': 'Диаметр',
  '高度': 'Высота',
  '宽度': 'Ширина',
  '重量': 'Вес',
  '克': 'г',
  '千克': 'кг',
  
  // 颜色
  '黑色': 'Чёрный',
  '白色': 'Белый', 
  '红色': 'Красный',
  '蓝色': 'Синий',
  '绿色': 'Зелёный',
  '黄色': 'Жёлтый',
  '粉色': 'Розовый',
  '紫色': 'Фиолетовый',
  '灰色': 'Серый',
  '银色': 'Серебристый',
  '金色': 'Золотой',
  '咖啡色': 'Коричневый',
  '橙色': 'Оранжевый',
  '透明': 'Прозрачный',
  
  // 产品词
  '保鲜盒': 'Контейнер для хранения',
  '密封罐': 'Герметичная банка',
  '储物罐': 'Ёмкость для хранения',
  '储物盒': 'Коробка для хранения',
  '玻璃罐': 'Стеклянная банка',
  '密封盒': 'Герметичный контейнер',
  '饭盒': 'Ланч-бокс',
  '微波炉可用': 'Для микроволновки',
  '冰箱可用': 'Для холодильника',
  '可叠加': 'Стакable',
  '防潮': 'Влагозащитный',
  '密封': 'Герметичный',
  '便携': 'Портативный',
  
  // 包装
  '盒装': 'В коробке',
  '散装': 'Без упаковки',
  '套装': 'Набор',
  '一套': 'Комплект',
  
  // 跨境
  '跨境': 'Кросс-бордер',
  '出口': 'Экспорт',
  '货源': 'Источник',
  '批发': 'Опт',
  '定制': 'На заказ',
  '加印LOGO': 'С логотипом',
  '代发': 'Дропшиппинг',
  
  // 通用
  '新品': 'Новинка',
  '爆款': 'Хит продаж',
  '热卖': 'Бестселлер',
  '促销': 'Акция',
  '优选': 'Выбор покупателей',
  '旗舰': 'Флагман',
  '品质': 'Качество',
  '环保': 'Эко',
};

// ============== 核心函数 ==============

/**
 * 翻译中文到俄语
 */
function translateToRussian(text) {
  if (!text) return '';
  let result = text;
  for (const [cn, ru] of Object.entries(TRANSLATIONS)) {
    result = result.replace(new RegExp(cn, 'gi'), ru);
  }
  return result;
}

/**
 * 计算Ozon销售价格
 * 
 * 公式推导:
 * 售价 = 成本 + 头程 + 佣金 + 退货预留 + 利润
 * 售价 = C + F + 售价×M + 售价×R×r + 售价×margin
 * 售价 × (1 - M - R×r - margin) = C + F
 * 售价 = (C + F) / (1 - M - R×r - margin)
 * 
 * @param {number} costCny - 1688采购成本(CNY)
 * @param {number} weightKg - 产品重量(kg)
 * @returns {object} - 包含价格和各成本项
 */
function calculatePrice(costCny, weightKg = CONFIG.AVG_WEIGHT_KG) {
  const C = costCny;                    // 成本
  const F = weightKg * CONFIG.LOGISTICS_COST_PER_KG;  // 头程运费
  const M = CONFIG.OZON_COMMISSION;     // 佣金率
  const R = CONFIG.RETURN_RATE;         // 退货率
  const r = CONFIG.RETURN_LOSS_RATE;   // 退货损失率
  const margin = CONFIG.TARGET_MARGIN;  // 目标利润率
  
  // 实际佣金计算基数（扣除退款后的GMV）
  const effectiveCommissionRate = M * (1 + R * (1 - r));
  
  // 售价计算
  const denominator = 1 - effectiveCommissionRate - margin;
  const sellingPriceRub = Math.round((C + F) / denominator / 10) * 10;
  
  // 各成本项明细
  const commission = Math.round(sellingPriceRub * M);
  const logisticsCost = Math.round(F * CONFIG.EXCHANGE_RATE);
  const costRub = Math.round(C * CONFIG.EXCHANGE_RATE);
  const profit = sellingPriceRub - costRub - logisticsCost - commission;
  
  return {
    sellingPriceRub,
    costCny: C,
    costRub,
    logisticsCostCny: F,
    logisticsCostRub: logisticsCost,
    commissionRub: commission,
    profitRub: profit,
    margin: profit / sellingPriceRub,
    weightKg,
  };
}

/**
 * 猜测Ozon类目ID
 */
function guessOzonCategory(cnText) {
  for (const [cn, ozonId] of Object.entries(CONFIG.CATEGORY_MAP)) {
    if (cnText.includes(cn)) {
      return ozonId;
    }
  }
  return CONFIG.OzonCategoryId; // 默认密封罐类目
}

/**
 * 下载图片
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const options = { 
      headers: { 
        'Referer': 'https://www.1688.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    };
    protocol.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadImage(res.headers.location).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * 处理图片（中转）
 */
async function processImage(imageUrl, index) {
  try {
    const imageData = await downloadImage(imageUrl);
    const tempPath = `/tmp/ozon-img-${Date.now()}-${index}.jpg`;
    fs.writeFileSync(tempPath, imageData);
    // TODO: 上传到云存储返回公网URL
    return `file://${tempPath}`;
  } catch (e) {
    return null;
  }
}

/**
 * Ozon API 请求
 */
function ozonApiPost(endpoint, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname: CONFIG.BASE_URL,
      path: endpoint,
      method: 'POST',
      headers: {
        'Client-Id': CONFIG.CLIENT_ID,
        'Api-Key': CONFIG.API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          resolve(responseData);
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => reject(new Error('API超时')));
    req.write(body);
    req.end();
  });
}

/**
 * 抓取1688商品页面
 */
async function scrape1688(url) {
  console.log(`\n🔍 正在抓取1688商品...`);
  
  try {
    const puppeteer = require('puppeteer-core');
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'zh-CN,zh;q=0.9' });
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));
    
    const product = await page.evaluate(() => {
      const getText = (sel) => document.querySelector(sel)?.textContent?.trim() || '';
      const title = getText('.offer-title__text') || getText('h1') || '';
      
      // 价格提取
      let price = 0;
      const priceEl = document.querySelector('.price-wrapper, .price, #price');
      if (priceEl) {
        const priceText = priceEl.textContent;
        const match = priceText.match(/[\d.]+/);
        if (match) price = parseFloat(match[0]);
      }
      
      // 图片提取
      const images = Array.from(document.querySelectorAll('img'))
        .map(img => img.src || img.dataset.src)
        .filter(src => src && src.includes('1688') && src.match(/\.(jpg|png|jpeg|webp)/i))
        .slice(0, 10);
      
      // 规格提取
      const specs = {};
      document.querySelectorAll('.procity .attr, .info-attrs li, .attribute-list li').forEach(el => {
        const text = el.textContent.trim();
        const parts = text.split(/：|:|—|-/);
        if (parts.length >= 2) {
          specs[parts[0].trim()] = parts.slice(1).join(':').trim();
        }
      });
      
      // 重量提取（用于计算运费）
      let weight = 0.5; // 默认500g
      const weightText = document.body.textContent;
      const weightMatch = weightText.match(/(\d+(?:\.\d+)?)\s*(?:kg|千克|g|克)/i);
      if (weightMatch) {
        const val = parseFloat(weightMatch[1]);
        weight = weightText.match(/kg|千克/i) ? val : val / 1000;
      }
      
      return { title, price, images, specs, weight };
    });
    
    await browser.close();
    
    console.log(`✅ 抓取成功!`);
    console.log(`   标题: ${product.title.substring(0, 50)}`);
    console.log(`   价格: ¥${product.price}`);
    console.log(`   图片: ${product.images.length}张`);
    console.log(`   重量: ${(product.weight * 1000).toFixed(0)}g`);
    
    return product;
  } catch (e) {
    console.log(`❌ 抓取失败: ${e.message}`);
    throw e;
  }
}

/**
 * 生成俄语文本
 */
function generateRussianContent(product) {
  const ruTitle = translateToRussian(product.title).substring(0, 200);
  
  const specLines = Object.entries(product.specs)
    .map(([k, v]) => `- ${translateToRussian(k)}: ${translateToRussian(v)}`)
    .join('\n');
  
  const ruDesc = `
🍶 ${translateToRussian(product.title.split(' ')[0] || 'Контейнер для хранения продуктов')}

✅ ОПИСАНИЕ:
${translateToRussian(product.title)}

${specLines ? `✅ ХАРАКТЕРИСТИКИ:\n${specLines}\n` : ''}
✅ ПРЕИМУЩЕСТВА:
- Пищевой материал, безопасно для здоровья
- Герметичная крышка, защита от влаги
- Для микроволновки и холодильника
- Легко моется
- Компактное хранение

✅ КРОСС-БОРДЕР ДОСТАВКА:
- Доставка из Китая в Россию
- Срок: 15-30 дней
- Отслеживание посылки
- Поддержка логотипа

📦 Упаковка: безопасная упаковка

🚚 Доставка из Китая
💬 Обратите внимание на срок доставки
  `.trim();
  
  return { ruTitle, ruDesc };
}

/**
 * 提交到Ozon
 */
async function uploadToOzon(product, ruContent) {
  console.log(`\n⬆️ 正在提交到 Ozon...`);
  
  const categoryId = guessOzonCategory(product.title);
  const priceCalc = calculatePrice(product.price, product.weight || CONFIG.AVG_WEIGHT_KG);
  
  // 处理图片
  console.log(`\n📸 处理图片...`);
  const imageUrls = [];
  for (let i = 0; i < Math.min(product.images.length, 10); i++) {
    process.stdout.write(`   图片 ${i + 1}/${Math.min(product.images.length, 10)}... `);
    const url = await processImage(product.images[i], i);
    if (url) {
      imageUrls.push(url);
      console.log(`✅`);
    } else {
      console.log(`⚠️`);
    }
  }
  
  const uploadData = {
    items: [{
      attributes: [
        { id: 4181, values: [{ value: ruContent.ruTitle }] },
        { id: 4191, values: [{ value: ruContent.ruDesc }] },
        { id: 4207, values: [{ value: String(priceCalc.sellingPriceRub) }] },
        { id: 4397, values: [{ value: String(product.weight || CONFIG.AVG_WEIGHT_KG) }] },
      ],
      category_id: categoryId,
      name: ruContent.ruTitle,
      offer_id: `FOOD-STORAGE-${Date.now()}`,
      price: String(priceCalc.sellingPriceRub),
      vat: '0',
    }]
  };
  
  try {
    const result = await ozonApiPost('/v3/product/import', uploadData);
    
    if (result.result?.items?.[0]) {
      const item = result.result.items[0];
      if (item.product_id || item.id) {
        return { 
          success: true, 
          productId: item.product_id || item.id, 
          offerId: uploadData.items[0].offer_id,
          priceRub: priceCalc.sellingPriceRub,
          commission: priceCalc.commissionRub,
        };
      } else if (item.errors) {
        return { success: false, errors: item.errors };
      }
    }
    
    return { success: false, result };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ============== 主流程 ==============

async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║        Ozon 全自动上架脚本 v2.0 - 食品储存罐                    ║
║        1688链接 → 自动抓取 → 翻译 → 上架                       ║
╠════════════════════════════════════════════════════════════╣
║  定价参数:                                                   ║
║    • 目标净利润率: 50%                                        ║
║    • Ozon佣金: 12%                                           ║
║    • 头程运费: ¥20/kg (经济渠道)                              ║
║    • 退货率: 2% (退款不退货损失50%)                           ║
╠════════════════════════════════════════════════════════════╣
║  使用方法: node ozon-auto-upload.js <1688链接>                ║
╚════════════════════════════════════════════════════════════╝

示例价格试算:
${(() => {
  const examples = [10, 20, 30, 50, 100].map(c => {
    const p = calculatePrice(c);
    return `  ¥${c} CNY → ${p.sellingPriceRub} ₽ (利润: ${p.profitRub} ₽, 利润率: ${(p.margin*100).toFixed(1)}%)`;
  }).join('\n');
  return examples;
})()}
    `);
    process.exit(1);
  }
  
  console.log(`\n🍶 Ozon 食品储存罐自动上架流程`);
  console.log(`═══════════════════════════════════════`);
  
  // 1. 抓取1688
  const product = await scrape1688(url);
  
  // 2. 计算价格
  const priceCalc = calculatePrice(product.price, product.weight || CONFIG.AVG_WEIGHT_KG);
  console.log(`\n💰 价格计算结果 (目标利润率50%):`);
  console.log(`   1688采购价: ¥${priceCalc.costCny}`);
  console.log(`   头程运费: ¥${priceCalc.logisticsCostCny.toFixed(1)}`);
  console.log(`   ───────────────────────`);
  console.log(`   成本合计: ¥${(priceCalc.costCny + priceCalc.logisticsCostCny).toFixed(1)}`);
  console.log(`   ───────────────────────`);
  console.log(`   建议售价: ${priceCalc.sellingPriceRub} ₽`);
  console.log(`   Ozon佣金: -${priceCalc.commissionRub} ₽`);
  console.log(`   物流成本: -${priceCalc.logisticsCostRub} ₽`);
  console.log(`   实际利润: ${priceCalc.profitRub} ₽`);
  console.log(`   实际利润率: ${(priceCalc.margin * 100).toFixed(1)}%`);
  
  // 3. 生成俄语内容
  const ruContent = generateRussianContent(product);
  console.log(`\n📝 俄语标题: ${ruContent.ruTitle.substring(0, 60)}...`);
  
  // 4. 上架Ozon
  const result = await uploadToOzon(product, ruContent);
  
  if (result.success) {
    console.log(`\n✅ Ozon上架成功!`);
    console.log(`   Product ID: ${result.productId}`);
    console.log(`   售价: ${result.priceRub} ₽`);
  } else {
    console.log(`\n⚠️ 上架遇到问题: ${JSON.stringify(result.errors || result.error || result.result).substring(0, 200)}`);
  }
  
  // 5. 保存日志
  const logEntry = {
    time: new Date().toISOString(),
    category: CONFIG.CATEGORY,
    url,
    product: { title: product.title, price: product.price, weight: product.weight },
    pricing: priceCalc,
    result,
  };
  fs.appendFileSync('/Users/wmk/Desktop/mechkeys-hub/ozon-food-storage-log.jsonl', 
    JSON.stringify(logEntry) + '\n');
  console.log(`\n📋 日志已保存`);
  
  return result;
}

main().catch(console.error);
