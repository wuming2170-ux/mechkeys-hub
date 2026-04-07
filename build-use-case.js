const fs = require('fs');

// Read best-value.html as base template
let base = fs.readFileSync('best-value.html', 'utf8');

// Extract topProducts from best-value.html
const productsMatch = base.match(/const topProducts = (\[[\s\S]*?\]);/);
if (!productsMatch) {
    console.log('Could not find topProducts');
    process.exit(1);
}
const topProductsStr = productsMatch[1];

const useCases = [
    {
        file: 'gaming.html',
        title: 'Best Gaming Mechanical Keyboards 2026 - Low Latency & RGB | MechKeys Hub',
        desc: 'Top gaming mechanical keyboards with low input lag, fast response, and customizable RGB. Perfect for competitive gamers and esports.',
        badge: '🎮 GAMING',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
        heading: 'Best Gaming Keyboards',
        subheading: 'Low Latency & High Performance for Competitive Gaming',
        intro: 'Looking for the best gaming keyboard? Our curated list features mechanical keyboards optimized for gaming with fast response times, durable switches, and stunning RGB lighting. Whether you\'re a casual gamer or esports pro, find your perfect match here.',
        filter: "(p.name || '').toLowerCase().includes('gaming') || (p.name || '').toLowerCase().includes('gamer') || (p.name || '').toLowerCase().includes('rgb') || (p.name || '').toLowerCase().includes('2.4ghz') || (p.name || '').toLowerCase().includes('bluetooth') || (p.name || '').toLowerCase().includes('wireless')"
    },
    {
        file: 'silent.html',
        title: 'Best Silent Mechanical Keyboards 2026 - Quiet Typing | MechKeys Hub',
        desc: 'Silent mechanical keyboards with quiet switches. Perfect for office, library, or late-night use without disturbing others.',
        badge: '🔇 SILENT',
        badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        heading: 'Best Silent Keyboards',
        subheading: 'Whisper-Quiet Typing for Office & Night Owls',
        intro: 'Need a keyboard that won\'t disturb others? Our selection of silent mechanical keyboards features quiet switches perfect for open offices, libraries, or late-night sessions. Enjoy the tactile feel of mechanical keys without the noise.',
        filter: "(p.name || '').toLowerCase().includes('silent') || (p.name || '').toLowerCase().includes('quiet')"
    },
    {
        file: 'portable.html',
        title: 'Best Compact & Portable Mechanical Keyboards 2026 | MechKeys Hub',
        desc: 'Compact 60%, 65%, and TKL mechanical keyboards for on-the-go use. Lightweight and wireless options for travel.',
        badge: '📱 PORTABLE',
        badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
        heading: 'Best Portable Keyboards',
        subheading: 'Compact & Lightweight for On-the-Go',
        intro: 'Save desk space and take your keyboard anywhere. Our portable mechanical keyboards feature compact 60%, 65%, and TKL layouts with wireless connectivity options. Perfect for travel, small desks, or minimalist setups.',
        filter: "(p.name || '').toLowerCase().includes('60%') || (p.name || '').toLowerCase().includes('65%') || (p.name || '').toLowerCase().includes('compact') || (p.name || '').toLowerCase().includes('mini') || (p.name || '').toLowerCase().includes('tkl') || (p.name || '').toLowerCase().includes('tenkeyless')"
    },
    {
        file: 'hot-swap.html',
        title: 'Best Hot-Swap Mechanical Keyboards 2026 - Easy Customization | MechKeys Hub',
        desc: 'Hot-swap mechanical keyboards allowing easy switch changes without soldering. Perfect for keyboard enthusiasts.',
        badge: '🔧 HOT-SWAP',
        badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        heading: 'Best Hot-Swap Keyboards',
        subheading: 'Easy Switch Customization Without Soldering',
        intro: 'Want to customize your keyboard switches easily? Hot-swap mechanical keyboards let you change switches without any soldering. Perfect for enthusiasts who like to experiment with different switch types or upgrade their typing experience.',
        filter: "(p.name || '').toLowerCase().includes('hot-swap') || (p.name || '').toLowerCase().includes('hot swap') || (p.name || '').toLowerCase().includes('swappable') || (p.name || '').toLowerCase().includes('热插拔')"
    }
];

useCases.forEach(({ file, title, desc, badge, badgeColor, heading, subheading, intro, filter }) => {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <link rel="canonical" href="https://mechkeyshub.com/${file}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: 'Inter', system-ui, sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2); }
        .product-card { background: linear-gradient(180deg, rgba(99,102,241,0.1) 0%, transparent 100%); }
        .badge { padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .switch-badge { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; }
        .mobile-menu-btn { display: none; }
        .mobile-nav { display: none; }
        @media (max-width: 1023px) {
            .mobile-menu-btn { display: flex; }
            .desktop-nav { display: none !important; }
            .mobile-nav { display: none; position: absolute; top: 100%; left: 0; right: 0; background: rgb(15 23 42 / 0.98); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 1rem; flex-direction: column; gap: 0.25rem; z-index: 100; }
            .mobile-nav.active { display: flex; }
            .mobile-nav .nav-link { padding: 0.75rem 1rem; font-size: 1rem; display: flex; align-items: center; gap: 0.75rem; }
        }
        @media (max-width: 640px) {
            .product-grid { grid-template-columns: 1fr !important; }
        }
    </style>
</head>
<body class="gradient-bg text-white min-h-screen">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 py-3 md:py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center gap-2 md:gap-3">
                    <div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg md:text-xl">⌨️</div>
                    <span class="font-bold text-lg md:text-xl">MechKeys Hub</span>
                </a>
                <button class="mobile-menu-btn md:hidden p-2 rounded-lg hover:bg-white/10 transition" onclick="toggleMobileMenu()" aria-label="Toggle menu">
                    <i class="fas fa-bars text-xl" id="menu-icon"></i>
                </button>
                <nav class="desktop-nav flex items-center gap-1">
                    <a href="/" class="nav-link"><i class="fas fa-home text-indigo-400"></i><span>Home</span></a>
                    <a href="/gaming.html" class="nav-link"><i class="fas fa-gamepad text-red-400"></i><span>Gaming</span></a>
                    <a href="/silent.html" class="nav-link"><i class="fas fa-volume-off text-blue-400"></i><span>Silent</span></a>
                    <a href="/portable.html" class="nav-link"><i class="fas fa-laptop text-green-400"></i><span>Portable</span></a>
                    <a href="/hot-swap.html" class="nav-link"><i class="fas fa-tools text-purple-400"></i><span>Hot-Swap</span></a>
                    <a href="/best-value.html" class="nav-link"><i class="fas fa-fire text-orange-400"></i><span>Best Value</span></a>
                    <a href="/brands.html" class="nav-link"><i class="fas fa-tags text-purple-400"></i><span>Brands</span></a>
                    <a href="/switches.html" class="nav-link"><i class="fas fa-toggle-on text-amber-400"></i><span>Switches</span></a>
                    <a href="/compare.html" class="nav-link"><i class="fas fa-balance-scale text-blue-400"></i><span>Compare</span></a>
                </nav>
            </div>
            <nav class="mobile-nav" id="mobile-nav">
                <a href="/" class="nav-link"><i class="fas fa-home text-indigo-400"></i><span>Home</span></a>
                <a href="/gaming.html" class="nav-link"><i class="fas fa-gamepad text-red-400"></i><span>Gaming</span></a>
                <a href="/silent.html" class="nav-link"><i class="fas fa-volume-off text-blue-400"></i><span>Silent</span></a>
                <a href="/portable.html" class="nav-link"><i class="fas fa-laptop text-green-400"></i><span>Portable</span></a>
                <a href="/hot-swap.html" class="nav-link"><i class="fas fa-tools text-purple-400"></i><span>Hot-Swap</span></a>
                <a href="/best-value.html" class="nav-link"><i class="fas fa-fire text-orange-400"></i><span>Best Value</span></a>
                <a href="/brands.html" class="nav-link"><i class="fas fa-tags text-purple-400"></i><span>Brands</span></a>
                <a href="/switches.html" class="nav-link"><i class="fas fa-toggle-on text-amber-400"></i><span>Switches</span></a>
                <a href="/compare.html" class="nav-link"><i class="fas fa-balance-scale text-blue-400"></i><span>Compare</span></a>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="py-16 px-4 text-center">
        <div class="max-w-4xl mx-auto">
            <span class="inline-block ${badgeColor} border px-4 py-2 rounded-full text-sm font-semibold mb-6">${badge}</span>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">${heading}</h1>
            <p class="text-xl text-gray-400 mb-6">${subheading}</p>
            <p class="text-gray-400 max-w-2xl mx-auto">${intro}</p>
        </div>
    </section>

    <!-- Products Grid -->
    <section class="py-12 px-4">
        <div class="max-w-7xl mx-auto">
            <div id="keyboard-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 product-grid"></div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-4 border-t border-white/10 mt-12">
        <div class="max-w-7xl mx-auto text-center text-gray-400">
            <p class="mb-4">MechKeys Hub is a participant in the Amazon Services LLC Associates Program.</p>
            <p>© 2026 MechKeys Hub. All rights reserved.</p>
        </div>
    </footer>

    <script>
    function toggleMobileMenu() {
        const nav = document.getElementById('mobile-nav');
        const icon = document.getElementById('menu-icon');
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
    });

    ${topProductsStr}

    function renderProducts(products) {
        const grid = document.getElementById('keyboard-grid');
        if (!grid) return;
        
        grid.innerHTML = products.map(p => \`
            <article class="product-card rounded-2xl p-6 card-hover border border-white/10">
                <div class="flex items-start justify-between mb-4">
                    <span class="badge \${p.price_tier === 'budget' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : p.price_tier === 'mid' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'}">
                        \${p.price_tier === 'budget' ? '💰 Budget' : p.price_tier === 'mid' ? '⭐ Best Value' : '💎 Premium'}
                    </span>
                    <span class="switch-badge">\${p.switch_type || 'Linear'}</span>
                </div>
                <div class="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <img src="\${p.image}" alt="\${p.name}" class="w-full h-full object-cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';this.parentElement.style.background='linear-gradient(135deg,#1e1b4b,#0f172a)';">
                    <span class="text-6xl hidden items-center justify-center">⌨️</span>
                </div>
                <h3 class="text-lg font-bold mb-2 line-clamp-2">\${p.name}</h3>
                <p class="text-gray-400 text-sm mb-4">\${p.tagline || ''}</p>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-yellow-400">★ \${p.rating || '4.5'}/5</span>
                    <span class="text-2xl font-bold text-indigo-400">\${p.price || 'N/A'}</span>
                </div>
                <a href="\${p.url}" target="_blank" class="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-center font-semibold transition">
                    Check Price →
                </a>
            </article>
        \`).join('');
    }

    document.addEventListener('DOMContentLoaded', function() {
        const filteredProducts = topProducts.filter(p => ${filter});
        const productsToShow = filteredProducts.length > 0 ? filteredProducts : topProducts.slice(0, 30);
        renderProducts(productsToShow);
    });
    </script>
</body>
</html>`;

    fs.writeFileSync(file, html);
    console.log(`Created ${file}`);
});

console.log('\nDone!');
