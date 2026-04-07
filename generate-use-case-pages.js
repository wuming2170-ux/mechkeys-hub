const fs = require('fs');

// Read homepage to get the product rendering structure
const homeContent = fs.readFileSync('index.html', 'utf8');

// Extract just the product display section from homepage
const productRenderMatch = homeContent.match(/function renderProducts\(products\)[\s\S]*?<script>/);
const renderFunction = `function renderProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = products.slice(0, 50).map((p, i) => {
        const price = parseFloat((p.price || '$0').replace(/[^0-9.]/g, '')) || 0;
        const priceClass = price < 50 ? 'text-emerald-400' : price < 100 ? 'text-amber-400' : 'text-amber-500';
        
        return \`<article class="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition card-hover cursor-pointer" onclick="window.open('\${p.url}', '_blank')">
            <div class="aspect-[16/10] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <img src="\${p.image}" alt="\${p.name}" class="w-full h-full object-cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';this.parentElement.style.background='linear-gradient(135deg,#1e1b4b,#0f172a)';">
                <span class="text-5xl hidden items-center justify-center">⌨️</span>
            </div>
            <h3 class="text-lg font-bold mb-2 line-clamp-2">\${p.name}</h3>
            <p class="text-gray-400 text-sm mb-3 line-clamp-2">\${p.tagline || ''}</p>
            <div class="flex items-center justify-between">
                <span class="\${priceClass} text-2xl font-bold">\${p.price}</span>
                <span class="text-amber-400 font-semibold">★ \${p.rating || '4.5'}/5</span>
            </div>
        </article>\`;
    }).join('');
}

// Mobile Navigation Toggle
function toggleMobileMenu() {
    const nav = document.getElementById('mobile-nav');
    const icon = document.getElementById('menu-icon');
    if (!nav || !icon) return;
    nav.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}
document.addEventListener('click', function(e) {
    const nav = document.getElementById('mobile-nav');
    const btn = document.querySelector('.mobile-menu-btn');
    if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.getElementById('menu-icon')?.classList.remove('fa-times');
        document.getElementById('menu-icon')?.classList.add('fa-bars');
    }
});`;

const useCases = [
    {
        file: 'gaming.html',
        title: 'Best Gaming Mechanical Keyboards 2026 - Low Latency & RGB | MechKeys Hub',
        desc: 'Top gaming mechanical keyboards with low input lag, fast response, and customizable RGB. Perfect for competitive gamers and esports.',
        heading: '🎮 Best Gaming Keyboards',
        subheading: 'Low Latency & High Performance for Competitive Gaming',
        intro: 'Looking for the best gaming keyboard? Our curated list features mechanical keyboards optimized for gaming with fast response times, durable switches, and stunning RGB lighting. Whether you\'re a casual gamer or esports pro, find your perfect match here.',
        filter: "const filteredProducts = topProducts.filter(p => (p.name || '').toLowerCase().includes('gaming') || (p.name || '').toLowerCase().includes('rgb') || (p.name || '').toLowerCase().includes('2.4ghz') || (p.name || '').toLowerCase().includes('bluetooth') || (p.name || '').toLowerCase().includes('wireless'));"
    },
    {
        file: 'silent.html',
        title: 'Best Silent Mechanical Keyboards 2026 - Quiet Typing | MechKeys Hub',
        desc: 'Silent mechanical keyboards with quiet switches. Perfect for office, library, or late-night use without disturbing others.',
        heading: '🔇 Best Silent Keyboards',
        subheading: 'Whisper-Quiet Typing for Office & Night Owls',
        intro: 'Need a keyboard that won\'t disturb others? Our selection of silent mechanical keyboards features quiet switches perfect for open offices, libraries, or late-night sessions. Enjoy the tactile feel of mechanical keys without the noise.',
        filter: "const filteredProducts = topProducts.filter(p => (p.name || '').toLowerCase().includes('silent') || (p.name || '').toLowerCase().includes('quiet'));"
    },
    {
        file: 'portable.html',
        title: 'Best Compact & Portable Mechanical Keyboards 2026 | MechKeys Hub',
        desc: 'Compact 60%, 65%, and TKL mechanical keyboards for on-the-go use. Lightweight and wireless options for travel.',
        heading: '📱 Best Portable Keyboards',
        subheading: 'Compact & Lightweight for On-the-Go',
        intro: 'Save desk space and take your keyboard anywhere. Our portable mechanical keyboards feature compact 60%, 65%, and TKL layouts with wireless connectivity options. Perfect for travel, small desks, or minimalist setups.',
        filter: "const filteredProducts = topProducts.filter(p => (p.name || '').toLowerCase().includes('60%') || (p.name || '').toLowerCase().includes('65%') || (p.name || '').toLowerCase().includes('compact') || (p.name || '').toLowerCase().includes('mini') || (p.name || '').toLowerCase().includes('tkl') || (p.name || '').toLowerCase().includes('tenkeyless'));"
    },
    {
        file: 'hot-swap.html',
        title: 'Best Hot-Swap Mechanical Keyboards 2026 - Easy Customization | MechKeys Hub',
        desc: 'Hot-swap mechanical keyboards allowing easy switch changes without soldering. Perfect for keyboard enthusiasts.',
        heading: '🔧 Best Hot-Swap Keyboards',
        subheading: 'Easy Switch Customization Without Soldering',
        intro: 'Want to customize your keyboard switches easily? Hot-swap mechanical keyboards let you change switches without any soldering. Perfect for enthusiasts who like to experiment with different switch types or upgrade their typing experience.',
        filter: "const filteredProducts = topProducts.filter(p => (p.name || '').toLowerCase().includes('hot-swap') || (p.name || '').toLowerCase().includes('hot swap') || (p.name || '').toLowerCase().includes('swappable') || (p.name || '').toLowerCase().includes('热插拔'));"
    }
];

// Create base template from best-value.html structure
const baseContent = fs.readFileSync('best-value.html', 'utf8');

// Extract head section (styles, meta, etc)
const headMatch = baseContent.match(/<head>[\s\S]*?<\/head>/);
const headerMatch = baseContent.match(/<header[\s\S]*?<\/header>/);
const footerMatch = baseContent.match(/<footer[\s\S]*?<\/footer>/);

useCases.forEach(({ file, title, desc, heading, subheading, intro, filter }) => {
    let content = baseContent
        .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${desc}"`)
        .replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="https://mechkeyshub.com/${file}"`)
        .replace(/<h1 class="text-4xl[\s\S]*?<\/h1>/, `<h1 class="text-4xl font-bold mb-4 text-center">${heading}</h1>`)
        .replace(/Find Your Perfect.*?Mechanical Keyboard/, subheading)
        .replace(/<p class="text-gray-400 text-center mb-12 max-w-2xl mx-auto">[\s\S]*?<\/p>/, `<p class="text-gray-400 text-center mb-8 max-w-3xl mx-auto">${intro}</p>`)
        .replace(/renderProducts\(topProducts\);/, `${filter}\n        renderProducts(filteredProducts.length > 0 ? filteredProducts : topProducts.slice(0, 30));`);
    
    // Remove comparison table section from these pages
    content = content.replace(/<div id="comparison-table"[\s\S]*?<\/div>/, '');
    content = content.replace(/<div id="budget-products"[\s\S]*?<\/div>/, '<div id="products-container"></div>');
    
    // If no products-container, add it after the intro
    if (!content.includes('id="products-container"')) {
        content = content.replace(/<\/p>[\s\n]*<\/section>/, `</p></section><section class="py-12 px-4"><div id="products-container" class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 product-grid"></div></section>`);
    }
    
    fs.writeFileSync(file, content);
    console.log(`Created ${file}`);
});

console.log('\nDone! Run "node generate-use-case-pages.js" if needed.');
