/**
 * Ozon 上架脚本 - 跨境保温杯
 * 1688货源 → 翻译 → Ozon API 上架
 */

const https = require('https');

// Ozon API 配置
const CLIENT_ID = '4363650';
const API_KEY = '6b432605-f1b9-42d2-b3fd-f8ce5c63e78a';
const BASE_URL = 'api-seller.ozon.ru';

// 产品数据（来自1688/淘宝）
const product = {
  name: '跨境Owala oz双饮北美网红FreeSip保温杯保冷运动水杯吸管直饮水果杯',
  priceCny: 35.00,  // 1688采购价
  currency: 'CNY',
  category: 'Термосы и термокружки',  // 俄语类目
  material: '304不锈钢/201不锈钢',
  volume: '32oz (≈950ml) / 24oz (≈710ml)',
  colors: [
    'Снупи зелёный', 'Снупи белый', 'Снупи розовый', 'Снупи чёрный',
    'Винный красный', 'Голубой', 'Розовый', 'Фиолетовый', 'Зелёный闪',
    'Серебро', 'Цветочный узор', 'Маленькие ромашки', 'Морской синий'
  ],
  // 图片（需要中转）
  images: [],
  description: `跨境爆款保温杯 | Owala FreeSip 双饮设计

【产品特点】
- 双饮设计：吸管+直饮两用
- 304不锈钢内胆，保温6-12小时
- 201不锈钢外壳，耐用防摔
- 大容量32oz/24oz可选
- 一键开合，带锁扣防漏水

【规格参数】
- 材质：304不锈钢内胆 + 201不锈钢外壳
- 容量：32oz (≈950ml) / 24oz (≈710ml)
- 保温性能：6-12小时
- 杯盖：塑料弹盖

【适用场景】
运动、办公、户外、家居、送礼

【跨境专供】
本产品为跨境出口专供货源，支持加印LOGO，可定制激光雕刻、丝印等工艺。`,
  offerId: 'OWALA-FREESIP-32OZ-001',
  vendor: '千川',
  isCrossBorder: true
};

// 翻译函数（简单的中俄对照）
const translations = {
  '保温杯': 'Термокружка',
  '不锈钢': 'Нержавеющая сталь',
  '运动': 'Спорт',
  '水杯': 'Бутылка для воды',
  '大容量': 'Большой объём',
  '吸管': 'Трубочка',
  '直饮': 'Прямое питьё',
  '儿童': 'Детский',
  '女士': 'Женский',
  '男士': 'Мужской',
  '情侣': 'Пара',
  '304不锈钢': 'Нержавеющая сталь 304',
  '201不锈钢': 'Нержавеющая сталь 201',
  '304不锈钢内胆': 'Внутренняя колба из нержавеющей стали 304',
  '304': '304',
  '201': '201',
  '塑料': 'Пластик',
  '保温': 'Термоизоляция',
  '弹盖': 'Откидная крышка',
  '带锁扣': 'С замком',
  '保冷': 'Сохранение холода',
  '网红': 'Популярный в соцсетях',
  '跨境': 'Кросс-бордер',
  '32oz': '32 унций (~950мл)',
  '24oz': '24 унции (~710мл)',
  '毫升': 'мл',
  '升': 'л',
};

// 简单翻译函数
function translateToRussian(chineseText) {
  let result = chineseText;
  for (const [cn, ru] of Object.entries(translations)) {
    result = result.replace(new RegExp(cn, 'g'), ru);
  }
  return result;
}

// 价格计算：CNY → RUB
// 35 CNY → ~800-1000 RUB (约3倍 markup，包含跨境物流+Ozon佣金)
function calculatePrice(cnyPrice) {
  const exchangeRate = 11.5; // 1 CNY ≈ 11.5 RUB
  const markup = 3.0; // 跨境商品 markup
  const rubPrice = Math.round(cnyPrice * exchangeRate * markup);
  return rubPrice;
}

// 生成俄语标题
function generateRussianTitle(cnTitle) {
  // Owala FreeSip 已经是英文品牌，保留
  const translated = translateToRussian(cnTitle);
  // 俄语化调整
  const ruTitle = `Термокружка Owala FreeSip ${translated}`;
  return ruTitle.substring(0, 200); // Ozon 标题限制
}

// 生成俄语描述
function generateRussianDescription(product) {
  const price = calculatePrice(product.priceCny);
  const desc = `
跨境爆款 термокружка Owala FreeSip | сертифицированный товар

✅ ХАРАКТЕРИСТИКИ:
- Двойной способ питья: трубочка + прямой
- Внутренняя колба из нержавеющей стали 304
- Термоизоляция 6-12 часов
- Внешний корпус из нержавеющей стали 201
- Большой объём: 32oz (950мл) / 24oz (710мл)
- Кнопка открывания, с замком от протекания

✅ МАТЕРИАЛЫ:
- Внутренняя колба: Нержавеющая сталь 304
- Внешний корпус: Нержавеющая сталь 201
- Крышка: Пластик

✅ РАЗМЕРЫ:
- 32 унций (~950мл): высота ~25см
- 24 унции (~710мл): высота ~20см

✅ ПРИМЕНЕНИЕ:
Спорт, офис, улица, дом, путешествия, подарки

✅ КРОСС-БОРДЕР ЭКСПОРТ:
- Поддержка нанесения логотипа
- Лазерная гравировка, шелкография, 3D печать
- Оптовая упаковка: 25 шт/коробка

Цена: ${price} ₽

Доставка из Китая в Россию.
  `.trim();
  return desc;
}

// API 请求函数
function ozonApiPost(endpoint, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname: BASE_URL,
      path: endpoint,
      method: 'POST',
      headers: {
        'Client-Id': CLIENT_ID,
        'Api-Key': API_KEY,
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
    req.on('timeout', () => reject(new Error('timeout')));
    req.write(body);
    req.end();
  });
}

// 主流程
async function main() {
  console.log('🚀 开始 Ozon 上架流程...\n');

  // 1. 获取类目信息
  console.log('📦 1. 获取 Ozon 类目信息...');
  try {
    const categoryResult = await ozonApiPost('/v1/description-category/tree', {
      language: 'RU'
    });
    console.log('✅ 类目树获取成功');
    // 找保温杯类目
    if (categoryResult.result) {
      const thermosCategory = categoryResult.result.find(c =>
        c.category_name.toLowerCase().includes('термос') ||
        c.category_name.toLowerCase().includes('термокружка')
      );
      if (thermosCategory) {
        console.log(`   找到类目: ${thermosCategory.category_name} (ID: ${thermosCategory.category_id})`);
      }
    }
  } catch (e) {
    console.log('⚠️ 获取类目失败，继续...', e.message);
  }

  // 2. 生成产品数据
  const ruTitle = generateRussianTitle(product.name);
  const ruDescription = generateRussianDescription(product);
  const price = calculatePrice(product.priceCny);

  console.log(`\n📝 2. 产品信息:`);
  console.log(`   俄语标题: ${ruTitle.substring(0, 80)}...`);
  console.log(`   价格: ${product.priceCny} CNY → ${price} ₽`);

  // 3. 上架到 Ozon (使用 v3/product/import)
  console.log(`\n⬆️ 3. 提交到 Ozon...`);
  const uploadData = {
    items: [{
      attributes: [
        {
          id: 4181, // 名称 (name)
          values: [{ value: ruTitle }]
        },
        {
          id: 4191, // 描述 (description)
          values: [{ value: ruDescription }]
        },
        {
          id: 4207, // 价格 (price)
          values: [{ value: String(price) }]
        },
        {
          id: 4397, // 商品重量
          values: [{ value: '0.35' }] // kg
        }
      ],
      category_id: 17029050, // 保温杯类目 (需要验证)
      name: ruTitle,
      offer_id: product.offerId,
      price: price.toString(),
      vat: '0'
    }]
  };

  console.log('   上传数据结构:', JSON.stringify(uploadData.items[0].attributes, null, 2).substring(0, 500));

  // 注意：实际图片上传需要先上传到云存储，这里先用占位符
  console.log('   ⚠️ 图片暂缺（需要1688图片中转服务）');
  console.log('   ⚠️ 类目ID需要验证');

  console.log('\n========================================');
  console.log('📊 上架准备完成');
  console.log('========================================');
  console.log(`产品名称: ${ruTitle}`);
  console.log(`价格: ${price} ₽`);
  console.log(`SKU: ${product.offerId}`);
  console.log(`来源: 1688/淘宝`);
  console.log(`采购价: ${product.priceCny} CNY`);
  console.log(`预计利润率: ${((price - product.priceCny * 11.5) / price * 100).toFixed(0)}%`);
  console.log('========================================');

  // 保存产品数据供后续使用
  const fs = require('fs');
  const productData = {
    original: product,
    russian: {
      title: ruTitle,
      description: ruDescription,
      price: price
    },
    uploadData: uploadData,
    status: 'ready_to_upload'
  };
  fs.writeFileSync('/Users/wmk/Desktop/mechkeys-hub/ozon-product-thermos.json', JSON.stringify(productData, null, 2));
  console.log('\n💾 产品数据已保存: ozon-product-thermos.json');
}

main().catch(console.error);
