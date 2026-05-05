/**
 * Ozon 手动上传脚本 - 食品储存罐
 * 
 * 当1688链接无法自动抓取时，使用此脚本手动提交数据
 */

const https = require('https');
const http = require('http');
const fs = require('fs');

// ============== 配置 ==============
const CONFIG = {
  CLIENT_ID: '4363650',
  API_KEY: '6b432605-f1b9-42d2-b3fd-f8ce5c63e78a',
  BASE_URL: 'api-seller.ozon.ru',
  CATEGORY: '食品储存罐',
  OzonCategoryId: 17027687,
  
  EXCHANGE_RATE: 11.5,
  TARGET_MARGIN: 0.50,
  OZON_COMMISSION: 0.12,
  LOGISTICS_COST_PER_KG: 20,
  AVG_WEIGHT_KG: 0.05,  // 小瓶子50g
  
  CATEGORY_MAP: {
    '保鲜盒': 17027687,
    '密封罐': 17027687,
    '玻璃罐': 17027687,
    '塑料瓶': 17027689,
    'PET': 17027689,
    '储物罐': 17027687,
    '样品罐': 17027687,
  },
};

// ============== 翻译 ==============
const TRANSLATIONS = {
  '304不锈钢': 'Нержавеющая сталь 304',
  '不锈钢': 'Нержавеющая сталь',
  '塑料': 'Пластик',
  'PP塑料': 'Пластик PP',
  'PET': 'ПЭТ',
  '食品级': 'Пищевой',
  '透明': 'Прозрачный',
  '密封罐': 'Герметичная банка',
  '密封': 'Герметичный',
  '广口瓶': 'Широкий горл',
  '样品罐': 'Банка для образцов',
  '塑料瓶': 'Пластиковая бутылка',
  '坚果': 'Орехи',
  '批发': 'Опт',
  '现货': 'В наличии',
  '食品': 'Пищевой',
  '保鲜盒': 'Контейнер для хранения',
  '储物罐': 'Ёмкость для хранения',
  '防潮': 'Влагозащитный',
  '便携': 'Портативный',
};

function translateToRussian(text) {
  if (!text) return '';
  let result = text;
  for (const [cn, ru] of Object.entries(TRANSLATIONS)) {
    result = result.replace(new RegExp(cn, 'gi'), ru);
  }
  return result;
}

// ============== 价格计算 ==============
function calculatePrice(costCny, weightKg = CONFIG.AVG_WEIGHT_KG) {
  const C = costCny;
  const F = weightKg * CONFIG.LOGISTICS_COST_PER_KG;
  const M = CONFIG.OZON_COMMISSION;
  const margin = CONFIG.TARGET_MARGIN;
  
  // 简化公式（不考虑退货）
  const denominator = 1 - M - margin;
  const sellingPriceRub = Math.round((C + F) / denominator / 10) * 10;
  
  const commission = Math.round(sellingPriceRub * M);
  const costRub = Math.round(C * CONFIG.EXCHANGE_RATE);
  const logisticsCostRub = Math.round(F * CONFIG.EXCHANGE_RATE);
  const profit = sellingPriceRub - costRub - logisticsCostRub - commission;
  
  return {
    sellingPriceRub,
    costCny: C,
    costRub,
    logisticsCostCny: F,
    logisticsCostRub,
    commissionRub: commission,
    profitRub: profit,
    margin: profit / sellingPriceRub,
    weightKg,
  };
}

function guessOzonCategory(cnText) {
  for (const [cn, ozonId] of Object.entries(CONFIG.CATEGORY_MAP)) {
    if (cnText.includes(cn)) return ozonId;
  }
  return CONFIG.OzonCategoryId;
}

// ============== API ==============
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
        try { resolve(JSON.parse(responseData)); }
        catch (e) { resolve(responseData); }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => reject(new Error('API超时')));
    req.write(body);
    req.end();
  });
}

// ============== 1688抓取(curl方式) ==============
async function scrape1688Curl(url) {
  console.log(`\n🔍 抓取1688商品...`);
  
  return new Promise((resolve, reject) => {
    const chunks = [];
    const req = http.get({
      hostname: 'detail.1688.com',
      path: '/offer/' + url.match(/(\d+)\.html/)?.[1] + '.html',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept-Language': 'zh-CN,zh;q=0.9',
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        console.log('   重定向到:', res.headers.location);
        scrape1688Curl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const html = Buffer.concat(chunks).toString('utf8');
        
        // 提取标题
        const titleMatch = html.match(/"title":"([^"]{10,200})"/);
        const title = titleMatch ? titleMatch[1] : '';
        
        // 提取价格（取最小值）
        const prices = [];
        const priceRegex = /"price":(\d+\.?\d*)/g;
        let m;
        while ((m = priceRegex.exec(html)) !== null) {
          const p = parseFloat(m[1]);
          if (p > 0.1 && p < 1000) prices.push(p);
        }
        const price = prices.length > 0 ? Math.min(...prices) : 0;
        
        // 提取图片
        const images = [];
        const imgRegex = /(https?:\/\/cbu01\.alicdn\.com\/img\/ibank\/[^"']+\.(jpg|jpeg|png|webp))/g;
        while ((m = imgRegex.exec(html)) !== null) {
          if (!images.includes(m[1])) images.push(m[1]);
        }
        
        // 提取规格
        const specs = {};
        const specRegex = /("attrName"|attr):"([^"]+)","attrValue":"([^"]+)"/g;
        while ((m = specRegex.exec(html)) !== null) {
          specs[m[2]] = m[3];
        }
        
        console.log(`   ✅ 抓取成功`);
        console.log(`   标题: ${title.substring(0, 60)}`);
        console.log(`   价格: ¥${price}`);
        console.log(`   图片: ${images.length}张`);
        
        resolve({ title, price, images, specs, url });
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => reject(new Error('超时')));
  });
}

// ============== 生成俄语内容 ==============
function generateRussianContent(product) {
  const ruTitle = translateToRussian(product.title).substring(0, 200);
  
  const specLines = Object.entries(product.specs)
    .slice(0, 10)
    .map(([k, v]) => `- ${translateToRussian(k)}: ${translateToRussian(v)}`)
    .join('\n');
  
  const ruDesc = `
🍶 ${translateToRussian(product.title.split(' ')[0] || 'Контейнер для хранения')}

✅ ОПИСАНИЕ ТОВАРА:
${translateToRussian(product.title)}

${specLines ? `✅ ХАРАКТЕРИСТИКИ:\n${specLines}\n` : ''}
✅ ПРЕИМУЩЕСТВА:
- Пищевой материал, безопасно для здоровья
- Герметичная крышка
- Компактный размер
- Идеально для хранения орехов, специй, образцов

✅ КРОСС-БОРДЕР ДОСТАВКА:
- Доставка из Китая в Россию
- Срок: 15-30 дней
- Отслеживание посылки

📦 Упаковка: безопасная упаковка

🚚 Доставка из Китая
💬 Обратите внимание на срок доставки
  `.trim();
  
  return { ruTitle, ruDesc };
}

// ============== 主流程 ==============
async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║  Ozon 手动上传脚本 - 食品储存罐                              ║
╠════════════════════════════════════════════════════════════╣
║  使用方法: node ozon-manual-upload.js <1688链接>             ║
╚════════════════════════════════════════════════════════════╝
    `);
    
    // 价格试算
    console.log('\n📊 价格试算 (目标利润率50%):\n');
    [0.5, 1, 2, 5, 10, 20].forEach(c => {
      const p = calculatePrice(c);
      console.log(`  ¥${c.toFixed(1)} → ${p.sellingPriceRub} ₽ (利润: ${p.profitRub} ₽)`);
    });
    process.exit(1);
  }
  
  console.log(`\n🍶 Ozon 食品储存罐自动上架`);
  console.log(`═══════════════════════════════════════`);
  
  // 1. 抓取1688
  const product = await scrape1688Curl(url);
  
  if (!product.title) {
    console.log(`❌ 无法获取商品信息`);
    process.exit(1);
  }
  
  // 2. 计算价格
  const priceCalc = calculatePrice(product.price);
  console.log(`\n💰 价格计算 (目标利润率50%):`);
  console.log(`   采购价: ¥${priceCalc.costCny}`);
  console.log(`   建议售价: ${priceCalc.sellingPriceRub} ₽`);
  console.log(`   利润: ${priceCalc.profitRub} ₽ (${(priceCalc.margin*100).toFixed(1)}%)`);
  
  // 3. 生成俄语
  const ruContent = generateRussianContent(product);
  console.log(`\n📝 俄语标题: ${ruContent.ruTitle.substring(0, 60)}...`);
  
  // 4. 上传Ozon
  const categoryId = guessOzonCategory(product.title);
  const uploadData = {
    items: [{
      attributes: [
        { id: 4181, values: [{ value: ruContent.ruTitle }] },
        { id: 4191, values: [{ value: ruContent.ruDesc }] },
        { id: 4207, values: [{ value: String(priceCalc.sellingPriceRub) }] },
        { id: 4397, values: [{ value: String(priceCalc.weightKg) }] },
      ],
      category_id: categoryId,
      name: ruContent.ruTitle,
      offer_id: `PET-BOTTLE-${Date.now()}`,
      price: String(priceCalc.sellingPriceRub),
      vat: '0',
    }]
  };
  
  console.log(`\n⬆️ 提交到 Ozon (类目ID: ${categoryId})...`);
  const result = await ozonApiPost('/v3/product/import', uploadData);
  
  console.log(`\n📦 Ozon API 响应:`);
  console.log(JSON.stringify(result, null, 2).substring(0, 500));
  
  if (result.result?.items?.[0]?.product_id) {
    const item = result.result.items[0];
    console.log(`\n✅ 上架成功!`);
    console.log(`   Product ID: ${item.product_id}`);
    console.log(`   Offer ID: ${uploadData.items[0].offer_id}`);
  } else if (result.result?.items?.[0]?.errors) {
    console.log(`\n❌ 上架失败: ${JSON.stringify(result.result.items[0].errors)}`);
  }
  
  // 保存日志
  fs.appendFileSync('/Users/wmk/Desktop/mechkeys-hub/ozon-upload-log.jsonl', 
    JSON.stringify({ time: new Date().toISOString(), url, product, priceCalc, result }) + '\n');
}

main().catch(console.error);
