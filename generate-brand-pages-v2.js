/**
 * 自动生成所有品牌页
 * 从 inline-products-detailed.js 读取数据，生成 brand/*.html
 */
const fs = require('fs');

// 加载产品数据
const content = fs.readFileSync('./inline-products-detailed.js', 'utf8');
const match = content.match(/const topProducts = (\[[\s\S]*?\]);?\s*$/m);
const products = eval(match[1]);

// 按品牌分组
const byBrand = {};
products.forEach(p => {
    const b = p.brand || 'Other';
    if (!byBrand[b]) byBrand[b] = [];
    byBrand[b].push(p);
});

// 品牌信息
const BRAND_INFO = {
    'Keychron': { name: 'Keychron', color: 'text-orange-400', bg: 'bg-orange-900/30', border: 'border-orange-500/30', emoji: '⌨️', tagline: 'The Most Popular Mechanical Keyboard Brand', desc: 'Keychron has become the go-to brand for mechanical keyboard enthusiasts worldwide. Known for their premium build quality, hot-swappable PCBs, and excellent value. From compact 60% to full-size with numpad, Keychron offers something for everyone.' },
    'AULA': { name: 'AULA', color: 'text-indigo-400', bg: 'bg-indigo-900/30', border: 'border-indigo-500/30', emoji: '⌨️', tagline: 'Best Value Mechanical Keyboards', desc: 'AULA has become one of the most popular budget-to-midrange mechanical keyboard brands. Known for excellent gasket mounting, tri-mode wireless connectivity, and premium PBT keycaps at competitive prices. The F99 and F75 series are fan favorites.' },
    'Redragon': { name: 'Redragon', color: 'text-red-400', bg: 'bg-red-900/30', border: 'border-red-500/30', emoji: '🎮', tagline: 'Gaming Keyboards Under $60', desc: 'Redragon specializes in affordable gaming peripherals with impressive features. Hot-swap switches, RGB lighting, macro keys, and solid build quality at budget prices. Great entry point for gaming enthusiasts.' },
    'Leopold': { name: 'Leopold', color: 'text-amber-400', bg: 'bg-amber-900/30', border: 'border-amber-500/30', emoji: '🏆', tagline: 'Premium Korean Mechanical Keyboards', desc: 'Leopold is a premium South Korean keyboard brand known for exceptional build quality and Typist-approved feel. Their keyboards are favorites among professionals and enthusiasts who demand the best typing experience.' },
    'Ducky': { name: 'Ducky', color: 'text-blue-400', bg: 'bg-blue-900/30', border: 'border-blue-500/30', emoji: '🦆', tagline: 'Taiwan Excellence in Mechanical Keyboards', desc: 'Ducky (DuckyChannel) is a prestigious Taiwanese brand known for superb build quality and innovative designs. The ONE 3 series offers excellent value with high-quality materials and reliable performance.' },
    'Logitech': { name: 'Logitech', color: 'text-blue-400', bg: 'bg-blue-900/30', border: 'border-blue-500/30', emoji: '🖥️', tagline: 'Premium Reliability & Swiss Engineering', desc: 'Logitech is a household name in computer peripherals. Their mechanical keyboards combine Swiss engineering with premium materials, smart features like adaptive lighting, and multi-device connectivity.' },
    'Razer': { name: 'Razer', color: 'text-green-400', bg: 'bg-green-900/30', border: 'border-green-500/30', emoji: '🐍', tagline: 'Pro Gaming Peripherals', desc: 'Razer is a global leader in gaming peripherals, known for the BlackWidow and Huntsman series. Their optical switches offer ultra-fast actuation, and Chroma RGB integration is unmatched.' },
    'Glorious': { name: 'Glorious', color: 'text-cyan-400', bg: 'bg-cyan-900/30', border: 'border-cyan-500/30', emoji: '🔴', tagline: 'Modular Gaming Keyboards', desc: 'Glorious is known for their innovative GMMK (Glorious Model O Keyboard) with hot-swappable modules. Premium components, excellent build quality, and a passionate community of enthusiasts.' },
    'Cherry': { name: 'Cherry', color: 'text-red-500', bg: 'bg-red-900/30', border: 'border-red-500/30', emoji: '🔴', tagline: 'German Engineering & The Original MX Switch', desc: 'Cherry invented the MX mechanical switch in the 1980s and remains a benchmark for quality. Their MX2A switches offer improved smoothness and durability. German engineering excellence.' },
    'Akko': { name: 'Akko', color: 'text-yellow-400', bg: 'bg-yellow-900/30', border: 'border-yellow-500/30', emoji: '⚡', tagline: 'High Value with Custom Switches', desc: 'Akko is a rising star in mechanical keyboards, offering excellent value with their proprietary switches. Known for colorful designs, great typing feel, and competitive pricing.' },
    'Anne Pro': { name: 'Anne Pro', color: 'text-purple-400', bg: 'bg-purple-900/30', border: 'border-purple-500/30', emoji: '🍎', tagline: 'Wireless Compact Keyboards', desc: 'Anne Pro specializes in compact wireless mechanical keyboards with dual connectivity. The Anne Pro 3 is a fan favorite for its excellent wireless performance and compact 60% layout.' },
    'HyperX': { name: 'HyperX', color: 'text-red-400', bg: 'bg-red-900/30', border: 'border-red-500/30', emoji: '💪', tagline: 'Gaming Heritage from Kingston', desc: 'HyperX (a division of Kingston Technology) delivers gaming peripherals with proven reliability. The Alloy Origins series features durable aluminum frames and quick-triggering switches.' },
    'NuPhy': { name: 'NuPhy', color: 'text-slate-400', bg: 'bg-slate-900/30', border: 'border-slate-500/30', emoji: '✨', tagline: 'Ultra-Slim Wireless Keyboards', desc: 'NuPhy makes sleek, ultra-thin wireless mechanical keyboards that stand out from the crowd. The Field75 and Air75 offer premium wireless performance in a slim, elegant package.' },
    'RK Royal Kludge': { name: 'RK Royal Kludge', color: 'text-cyan-400', bg: 'bg-cyan-900/30', border: 'border-cyan-500/30', emoji: '⌨️', tagline: 'Value with Smart Features', desc: 'RK Royal Kludge offers feature-packed keyboards at competitive prices. Known for tri-mode connectivity, hot-swappable options, and unique designs with displays and knobs.' },
    'TMKB': { name: 'TMKB', color: 'text-orange-400', bg: 'bg-orange-900/30', border: 'border-orange-500/30', emoji: '🎯', tagline: 'Hall Effect & Rapid Trigger Specialists', desc: 'TMKB specializes in Hall Effect magnetic switches with rapid trigger technology. Popular among competitive gamers who need the fastest response times and customizable actuation.' },
    'SOLAKAKA': { name: 'SOLAKAKA', color: 'text-pink-400', bg: 'bg-pink-900/30', border: 'border-pink-500/30', emoji: '🎀', tagline: 'Gasket Mount Value Kings', desc: 'SOLAKAKA has gained popularity with their excellent value gasket-mounted keyboards. The A75 is particularly praised for its premium typing feel at a mid-range price.' },
    'Newmen': { name: 'Newmen', color: 'text-blue-400', bg: 'bg-blue-900/30', border: 'border-blue-500/30', emoji: '🆕', tagline: 'Budget Performance', desc: 'Newmen offers budget-friendly mechanical keyboards with solid features. Great entry point for those new to mechanical keyboards without breaking the bank.' },
    'Corsair': { name: 'Corsair', color: 'text-yellow-400', bg: 'bg-yellow-900/30', border: 'border-yellow-500/30', emoji: '⚡', tagline: 'Elite Gaming Peripherals', desc: 'Corsair is a premium gaming peripheral brand known for high-end components. Their Vanguard AIR and K70 series represent the pinnacle of gaming keyboard design.' },
    'ASUS': { name: 'ASUS ROG', color: 'text-red-500', bg: 'bg-red-900/30', border: 'border-red-500/30', emoji: '🐉', tagline: 'Republic of Gamers Premium', desc: 'ASUS Republic of Gamers delivers cutting-edge gaming hardware. ROG keyboards feature proprietary switches, tri-mode connectivity, and multimedia controls in premium packages.' },
    'SteelSeries': { name: 'SteelSeries', color: 'text-green-400', bg: 'bg-green-900/30', border: 'border-green-500/30', emoji: '🎯', tagline: 'Esports-Proven Quality', desc: 'SteelSeries is trusted by professional esports players worldwide. The Apex series features innovative OLED displays, hybrid switches, and aircraft-grade aluminum construction.' },
    'Other': { name: 'Other Brands', color: 'text-slate-400', bg: 'bg-slate-900/30', border: 'border-slate-500/30', emoji: '🔍', tagline: 'More Quality Keyboards', desc: 'Other excellent brands including MageGee, DIERYA, RisoPhy, HUO JI, Keymatic and more. Quality keyboards from emerging brands worth exploring.' },
};

function generateProductCard(p, color) {
    const tierBadge = { budget: '💰 Budget', mid: '⚖️ Mid-Range', premium: '💎 Premium' }[p.price_tier] || p.price_tier;
    const tierColor = { budget: 'bg-emerald-900/50 text-emerald-300', mid: 'bg-blue-900/50 text-blue-300', premium: 'bg-purple-900/50 text-purple-300' }[p.price_tier] || 'bg-slate-700 text-slate-300';
    
    const hotSwapIcon = p.hot_swap ? '✅' : '❌';
    const rgbIcon = p.rgb ? '🎨' : '⬜';
    
    const prosHtml = (p.pros || []).slice(0, 3).map(pr => `<span class="bg-slate-700/50 px-2 py-1 rounded text-xs">${pr}</span>`).join('');
    
    return `
        <article class="bg-slate-800/50 rounded-2xl overflow-hidden border border-white/10 hover:border-${color.split('-')[1]}-500/50 transition card-hover">
            <div class="p-5">
                <div class="flex items-start gap-3 mb-3">
                    <img src="${p.image || ''}" alt="${(p.name||'').replace(/"/g, '')}" class="w-20 h-20 object-contain rounded-lg bg-white/5" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23333%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2212%22>No Image</text></svg>'">
                    <div class="flex-1 min-w-0">
                        <div class="flex flex-wrap gap-1 mb-1">
                            <span class="text-xs px-2 py-1 rounded-full font-semibold ${tierColor}">${tierBadge}</span>
                            <span class="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">${p.switch_type || 'Linear Red'}</span>
                            <span class="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">${p.layout || 'TKL'}</span>
                        </div>
                        <h3 class="font-bold text-sm leading-tight mb-1 truncate">${(p.name||'').replace(/"/g, '')}</h3>
                    </div>
                </div>
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2 text-xs text-slate-300">
                        <span class="text-yellow-400">★</span> ${p.rating || 4.0}/10
                        <span class="text-slate-600">|</span>
                        <span>${hotSwapIcon} Swap</span>
                        <span>${rgbIcon} RGB</span>
                    </div>
                    <span class="text-xl font-bold ${color}">${p.price || '$0'}</span>
                </div>
                <div class="flex flex-wrap gap-1 mb-3">${prosHtml}</div>
                <a href="${(p.url||'').split('?')[0]}?tag=mechkeyshub-20" target="_blank" class="block w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-center text-sm font-semibold transition">
                    Check Price on Amazon →
                </a>
            </div>
        </article>`;
}

function generateBrandPage(brand, prods) {
    const info = BRAND_INFO[brand] || BRAND_INFO['Other'];
    
    // Sort by rating
    const sorted = [...prods].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    // Grid: 3 columns for brands with many products, 2 for few
    const cols = sorted.length > 10 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
    
    const productsHtml = sorted.map(p => generateProductCard(p, info.color)).join('');
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${info.name} Mechanical Keyboards - MechKeys Hub</title>
    <meta name="description" content="Browse ${info.name} mechanical keyboards. ${info.desc}">
    <link rel="canonical" href="https://mechkeyshub.com/brand/${brand.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: 'Inter', system-ui, sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(99,102,241,0.15); }
    </style>
</head>
<body class="gradient-bg min-h-screen text-white">
    <header class="border-b border-white/10 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="../index.html" class="text-2xl font-bold text-indigo-400">
                <i class="fas fa-keyboard mr-2"></i>MechKeys Hub
            </a>
            <nav class="flex gap-2 flex-wrap">
                <a href="../index.html" class="px-4 py-2 rounded-lg hover:bg-white/10 transition">All Keyboards</a>
                <a href="index.html" class="px-4 py-2 rounded-lg hover:bg-white/10 transition">Brands</a>
                <a href="../best-value.html" class="px-4 py-2 rounded-lg hover:bg-white/10 transition">Best Value</a>
                <a href="../compare.html" class="px-4 py-2 rounded-lg hover:bg-white/10 transition">Compare</a>
                <a href="../guides.html" class="px-4 py-2 rounded-lg hover:bg-white/10 transition">Guides</a>
            </nav>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-10">
        <div class="mb-6">
            <a href="index.html" class="text-indigo-400 hover:underline text-sm">← All Brands</a>
        </div>

        <!-- Brand Header -->
        <div class="${info.bg} rounded-2xl p-8 mb-8 border ${info.border}">
            <div class="flex items-center gap-6">
                <div class="w-20 h-20 ${info.bg} rounded-2xl flex items-center justify-center text-4xl border ${info.border}">${info.emoji}</div>
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h1 class="text-3xl font-bold ${info.color}">${info.name}</h1>
                        <span class="${info.bg} ${info.color} px-3 py-1 rounded-full text-sm font-semibold border ${info.border}">${prods.length} Products</span>
                    </div>
                    <p class="${info.color} text-lg mb-2 opacity-80">${info.tagline}</p>
                    <p class="text-slate-300 max-w-2xl">${info.desc}</p>
                </div>
            </div>
        </div>

        <!-- Products Grid -->
        <div class="grid md:grid-cols-2 ${cols} gap-6">
            ${productsHtml}
        </div>

        <!-- CTA -->
        <div class="mt-10 ${info.bg} rounded-xl p-6 border ${info.border} text-center">
            <p class="text-slate-300 mb-4">Compare all ${info.name} keyboards side by side to find your perfect match.</p>
            <a href="../compare.html" class="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition">
                <i class="fas fa-balance-scale mr-2"></i> Compare ${info.name} Keyboards
            </a>
        </div>
    </main>

    <footer class="border-t border-white/10 mt-16 py-8 bg-slate-900/50">
        <div class="max-w-7xl mx-auto px-4 text-center text-slate-400">
            <p>&copy; 2026 MechKeys Hub. As an Amazon Associate, we earn from qualifying purchases.</p>
        </div>
    </footer>
</body>
</html>`;
}

function generateBrandIndex() {
    const sorted = Object.entries(byBrand).sort((a, b) => b[1].length - a[1].length);
    
    const brandCards = sorted.map(([brand, prods]) => {
        const info = BRAND_INFO[brand] || BRAND_INFO['Other'];
        const filename = brand.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const colorMap = {
            'text-orange-400': 'hover:border-orange-500/50',
            'text-indigo-400': 'hover:border-indigo-500/50',
            'text-red-400': 'hover:border-red-500/50',
            'text-amber-400': 'hover:border-amber-500/50',
            'text-blue-400': 'hover:border-blue-500/50',
            'text-green-400': 'hover:border-green-500/50',
            'text-cyan-400': 'hover:border-cyan-500/50',
            'text-pink-400': 'hover:border-pink-500/50',
            'text-purple-400': 'hover:border-purple-500/50',
            'text-red-500': 'hover:border-red-500/50',
            'text-slate-400': 'hover:border-slate-500/50',
            'text-yellow-400': 'hover:border-yellow-500/50',
            'text-orange-400': 'hover:border-orange-500/50',
        };
        const hoverClass = colorMap[info.color] || 'hover:border-indigo-500/50';
        
        return `
            <a href="${filename}.html" class="brand-card bg-slate-800/50 rounded-2xl p-6 border border-white/10 ${hoverClass} transition">
                <div class="flex items-center gap-4 mb-3">
                    <div class="w-14 h-14 ${info.bg} rounded-xl flex items-center justify-center text-2xl border ${info.border}">${info.emoji}</div>
                    <div>
                        <h2 class="text-xl font-bold ${info.color}">${info.name}</h2>
                        <span class="text-slate-400 text-sm">${prods.length} products</span>
                    </div>
                </div>
                <p class="text-slate-400 text-sm">${info.tagline}</p>
            </a>`;
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mechanical Keyboard Brands - MechKeys Hub</title>
    <meta name="description" content="Browse mechanical keyboards by brand. Compare top brands like Keychron, Logitech, Redragon, AULA, Razer, and more. ${sorted.length} brands and ${products.length} products.">
    <link rel="canonical" href="https://mechkeyshub.com/brand/">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: 'Inter', system-ui, sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); }
        .brand-card { transition: all 0.3s ease; }
        .brand-card:hover { transform: translateY(-4px); }
    </style>
</head>
<body class="gradient-bg min-h-screen text-white">
    <header class="border-b border-white/10 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="../index.html" class="text-2xl font-bold text-indigo-400">
                <i class="fas fa-keyboard mr-2"></i>MechKeys Hub
            </a>
            <nav class="flex gap-2 flex-wrap">
                <a href="../index.html" class="px-4 py-2 rounded-lg hover:bg-white/10 transition">All Keyboards</a>
                <a href="../brands.html" class="px-4 py-2 rounded-lg bg-indigo-600 text-white">Brands</a>
                <a href="../best-value.html" class="px-4 py-2 rounded-lg hover:bg-white/10 transition">Best Value</a>
                <a href="../compare.html" class="px-4 py-2 rounded-lg hover:bg-white/10 transition">Compare</a>
                <a href="../guides.html" class="px-4 py-2 rounded-lg hover:bg-white/10 transition">Guides</a>
            </nav>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-10">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-3">Browse by Brand</h1>
            <p class="text-slate-300 text-lg">${sorted.length} brands with ${products.length} mechanical keyboards. Find your favorite manufacturer.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${brandCards}
        </div>

        <div class="mt-12 bg-slate-800/30 rounded-xl p-6 border border-white/10">
            <h2 class="font-bold mb-4">Why Buy by Brand?</h2>
            <div class="grid md:grid-cols-3 gap-6 text-sm text-slate-300">
                <div>
                    <h3 class="font-semibold text-white mb-2">🎯 Consistency</h3>
                    <p>Same quality standards and familiar software across the brand's product line.</p>
                </div>
                <div>
                    <h3 class="font-semibold text-white mb-2">🔧 Compatibility</h3>
                    <p>Keycaps, switches, and accessories often work across models from the same brand.</p>
                </div>
                <div>
                    <h3 class="font-semibold text-white mb-2">💡 Easier Research</h3>
                    <p>Read multiple reviews to understand the brand's quality reputation.</p>
                </div>
            </div>
        </div>
    </main>

    <footer class="border-t border-white/10 mt-16 py-8 bg-slate-900/50">
        <div class="max-w-7xl mx-auto px-4 text-center text-slate-400">
            <p>&copy; 2026 MechKeys Hub. As an Amazon Associate, we earn from qualifying purchases.</p>
        </div>
    </footer>
</body>
</html>`;
}

// 生成 brand/index.html
fs.writeFileSync('./brand/index.html', generateBrandIndex());
console.log('Generated brand/index.html');

// 生成各品牌页
for (const [brand, prods] of Object.entries(byBrand)) {
    const filename = brand.toLowerCase().replace(/[^a-z0-9]/g, '-');
    fs.writeFileSync(`./brand/${filename}.html`, generateBrandPage(brand, prods));
    console.log(`Generated brand/${filename}.html (${prods.length} products)`);
}

console.log('\nAll brand pages generated!');
