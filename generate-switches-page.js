/**
 * Generate switches.html with product filtering
 */
const fs = require('fs');

// 读取产品数据
const data = fs.readFileSync('inline-products-detailed.js', 'utf-8');

// 生成 switches.html
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mechanical Keyboard Switches Guide 2025 | MechKeys Hub</title>
    <meta name="description" content="Complete guide to mechanical keyboard switches. Learn the difference between linear, tactile, and clicky switches.">
    <link rel="canonical" href="https://mechkeys-hub.vercel.app/switches.html">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: 'Inter', system-ui, sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); }
    </style>
</head>
<body class="gradient-bg text-white min-h-screen">
    <header class="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <a href="/" class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl">⌨️</div>
                <div>
                    <h1 class="font-bold text-xl">MechKeys Hub</h1>
                    <p class="text-xs text-gray-400">Mechanical Keyboards Guide</p>
                </div>
            </a>
        </div>
    </header>

    <section class="py-12 px-4">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-8">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">🔴 Mechanical Keyboard Switches Guide</h1>
                <p class="text-xl text-gray-400">
                    The heart of your keyboard experience. Learn the difference between switch types.
                </p>
            </div>

            <!-- Switch Type Filter Buttons -->
            <div class="flex flex-wrap justify-center gap-4 mb-10">
                <a href="switches.html" class="filter-btn px-6 py-3 rounded-xl font-semibold transition bg-indigo-600" data-filter="">
                    All Switches
                </a>
                <a href="switches.html#linear" class="filter-btn px-6 py-3 rounded-xl font-semibold transition bg-slate-700 hover:bg-slate-600" data-filter="linear">
                    🔴 Linear (Red)
                </a>
                <a href="switches.html#tactile" class="filter-btn px-6 py-3 rounded-xl font-semibold transition bg-slate-700 hover:bg-slate-600" data-filter="tactile">
                    🟤 Tactile (Brown)
                </a>
                <a href="switches.html#clicky" class="filter-btn px-6 py-3 rounded-xl font-semibold transition bg-slate-700 hover:bg-slate-600" data-filter="clicky">
                    🔵 Clicky (Blue)
                </a>
            </div>

            <!-- Products Grid -->
            <div id="keyboard-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            </div>
            
            <div id="no-products" class="hidden text-center py-12 text-gray-400">
                <p class="text-xl">No keyboards found with this switch type.</p>
                <a href="switches.html" class="text-indigo-400 hover:underline mt-4 inline-block">View all keyboards →</a>
            </div>
        </div>
    </section>

    <section class="py-12 px-4">
        <div class="max-w-5xl mx-auto">
            <!-- Linear -->
            <div class="bg-gradient-to-r from-red-500/10 to-transparent rounded-2xl p-8 border border-red-500/30 mb-8">
                <div class="flex items-center gap-4 mb-6">
                    <span class="text-5xl">🔴</span>
                    <div>
                        <h2 class="text-2xl font-bold">Linear Switches</h2>
                        <p class="text-gray-400">Red, Black, Yellow - Smooth all the way down</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p class="text-gray-300 mb-4">
                            Linear switches provide a <strong>smooth, consistent keystroke</strong> from top to bottom 
                            with no tactile bump or audible click.
                        </p>
                        <h3 class="font-bold mb-2">Best For:</h3>
                        <ul class="text-gray-300 space-y-1">
                            <li>✓ <strong>Gaming</strong> - Fast, unimpeded actuation</li>
                            <li>✓ <strong>Fast typists</strong> - No bump to slow you down</li>
                            <li>✓ <strong>Quiet environments</strong> - Quieter than clicky</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-3">Popular Linear Switches</h3>
                        <div class="space-y-3">
                            <div class="bg-black/30 rounded-lg p-3">
                                <div class="flex justify-between items-center">
                                    <span class="font-semibold">Cherry MX Red</span>
                                    <span class="text-gray-400 text-sm">45g actuation</span>
                                </div>
                            </div>
                            <div class="bg-black/30 rounded-lg p-3">
                                <div class="flex justify-between items-center">
                                    <span class="font-semibold">Gateron Yellow</span>
                                    <span class="text-gray-400 text-sm">50g actuation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tactile -->
            <div class="bg-gradient-to-r from-amber-500/10 to-transparent rounded-2xl p-8 border border-amber-500/30 mb-8">
                <div class="flex items-center gap-4 mb-6">
                    <span class="text-5xl">🟤</span>
                    <div>
                        <h2 class="text-2xl font-bold">Tactile Switches</h2>
                        <p class="text-gray-400">Brown - Subtle bump feedback</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p class="text-gray-300 mb-4">
                            Tactile switches provide a <strong>subtle bump</strong> at the actuation point 
                            without the loud click of clicky switches.
                        </p>
                        <h3 class="font-bold mb-2">Best For:</h3>
                        <ul class="text-gray-300 space-y-1">
                            <li>✓ <strong>Typing</strong> - Satisfying feedback</li>
                            <li>✓ <strong>Office use</strong> - Quieter than clicky</li>
                            <li>✓ <strong>Programmers</strong> - Clear actuation feedback</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-3">Popular Tactile Switches</h3>
                        <div class="space-y-3">
                            <div class="bg-black/30 rounded-lg p-3">
                                <div class="flex justify-between items-center">
                                    <span class="font-semibold">Cherry MX Brown</span>
                                    <span class="text-gray-400 text-sm">45g actuation</span>
                                </div>
                            </div>
                            <div class="bg-black/30 rounded-lg p-3">
                                <div class="flex justify-between items-center">
                                    <span class="font-semibold">Gateron Brown</span>
                                    <span class="text-gray-400 text-sm">55g actuation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Clicky -->
            <div class="bg-gradient-to-r from-blue-500/10 to-transparent rounded-2xl p-8 border border-blue-500/30">
                <div class="flex items-center gap-4 mb-6">
                    <span class="text-5xl">🔵</span>
                    <div>
                        <h2 class="text-2xl font-bold">Clicky Switches</h2>
                        <p class="text-gray-400">Blue - Audible click + tactile bump</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p class="text-gray-300 mb-4">
                            Clicky switches provide both a <strong>tactile bump</strong> and a 
                            <strong>loud audible click</strong> at actuation.
                        </p>
                        <h3 class="font-bold mb-2">Best For:</h3>
                        <ul class="text-gray-300 space-y-1">
                            <li>✓ <strong>Typing enthusiasts</strong> - Classic feel</li>
                            <li>✓ <strong>Learning</strong> - Clear feedback when actuated</li>
                            <li>✓ <strong>Satisfying experience</strong> - Retro feel</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-3">Popular Clicky Switches</h3>
                        <div class="space-y-3">
                            <div class="bg-black/30 rounded-lg p-3">
                                <div class="flex justify-between items-center">
                                    <span class="font-semibold">Cherry MX Blue</span>
                                    <span class="text-gray-400 text-sm">50g actuation</span>
                                </div>
                            </div>
                            <div class="bg-black/30 rounded-lg p-3">
                                <div class="flex justify-between items-center">
                                    <span class="font-semibold">Kailh Box White</span>
                                    <span class="text-gray-400 text-sm">45g actuation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="py-8 px-4 border-t border-white/10 mt-12">
        <div class="max-w-7xl mx-auto text-center text-gray-500 text-sm">
            <p>© 2025 MechKeys Hub. As an Amazon Associate we earn from qualifying purchases.</p>
        </div>
    </footer>

    <script>
    const topProducts = ${data.replace('const topProducts = ', '')};

    function getSwitchCategory(switchType) {
        if (!switchType) return '';
        const s = switchType.toLowerCase();
        if (s.includes('linear') || s.includes('red') || s.includes('yellow') || s.includes('black')) return 'linear';
        if (s.includes('tactile') || s.includes('brown')) return 'tactile';
        if (s.includes('clicky') || s.includes('blue')) return 'clicky';
        return '';
    }

    function updateFilterButtons() {
        const hash = window.location.hash || '';
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            if ((!hash || hash === '#') && filter === '') {
                btn.classList.add('bg-indigo-600');
                btn.classList.remove('bg-slate-700', 'hover:bg-slate-600');
            } else if (hash === '#' + filter) {
                btn.classList.add('bg-indigo-600');
                btn.classList.remove('bg-slate-700', 'hover:bg-slate-600');
            } else {
                btn.classList.remove('bg-indigo-600');
                btn.classList.add('bg-slate-700', 'hover:bg-slate-600');
            }
        });
    }

    function filterProducts() {
        const hash = window.location.hash || '';
        let filtered = topProducts;
        
        if (hash === '#linear') {
            filtered = topProducts.filter(p => getSwitchCategory(p.switch_type) === 'linear');
        } else if (hash === '#tactile') {
            filtered = topProducts.filter(p => getSwitchCategory(p.switch_type) === 'tactile');
        } else if (hash === '#clicky') {
            filtered = topProducts.filter(p => getSwitchCategory(p.switch_type) === 'clicky');
        }
        
        const grid = document.getElementById('keyboard-grid');
        const noProducts = document.getElementById('no-products');
        
        if (filtered.length === 0) {
            grid.classList.add('hidden');
            noProducts.classList.remove('hidden');
        } else {
            grid.classList.remove('hidden');
            noProducts.classList.add('hidden');
            grid.innerHTML = filtered.map(p => \`
                <article class="rounded-2xl p-6 border border-white/10 bg-slate-800/50">
                    <div class="flex items-start justify-between mb-4">
                        <span class="text-xs font-semibold px-3 py-1 rounded-full \${p.price_tier === 'budget' ? 'bg-green-500/20 text-green-400' : p.price_tier === 'mid' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-purple-500/20 text-purple-400'}">
                            \${p.price_tier === 'budget' ? '💰 Budget' : p.price_tier === 'mid' ? '⭐ Best Value' : '💎 Premium'}
                        </span>
                        <span class="text-xs px-2 py-1 rounded bg-slate-700">\${p.switch_type}</span>
                    </div>
                    <div class="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                        <img src="\${p.image}" alt="\${p.name}" class="w-full h-full object-cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                        <span class="text-6xl hidden items-center justify-center">⌨️</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2 line-clamp-2">\${p.name}</h3>
                    \${p.description && p.description[0] ? \`<p class="text-gray-400 text-sm mb-3 line-clamp-3">\${p.description[0]}</p>\` : ''}
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-1">
                            <i class="fas fa-star text-amber-400 text-sm"></i>
                            <span class="font-bold text-sm">\${p.rating}</span>
                        </div>
                        <span class="text-indigo-400 font-bold">\${p.price}</span>
                    </div>
                    <a href="\${p.url}" class="block w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-center text-sm font-semibold transition">
                        Check Price →
                    </a>
                </article>
            \`).join('');
        }
        
        updateFilterButtons();
    }

    window.addEventListener('hashchange', filterProducts);
    filterProducts();
    </script>
</body>
</html>`;

fs.writeFileSync('switches.html', html);
console.log('Generated switches.html with product filtering');
