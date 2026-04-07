const fs = require('fs');

const useCases = [
    {
        file: 'gaming.html',
        title: 'Best Gaming Mechanical Keyboards 2026 - Low Latency & RGB | MechKeys Hub',
        desc: 'Top gaming mechanical keyboards with low input lag, fast response, and customizable RGB. Perfect for competitive gamers and esports.',
        keyword: 'gaming',
        filter: (p) => {
            const name = (p.name || '').toLowerCase();
            return name.includes('gaming') || name.includes('gamer') || name.includes('rgb') || name.includes('2.4ghz') || name.includes('bluetooth');
        }
    },
    {
        file: 'silent.html',
        title: 'Best Silent Mechanical Keyboards 2026 - Quiet Typing | MechKeys Hub',
        desc: 'Silent mechanical keyboards with quiet switches. Perfect for office, library, or late-night use without disturbing others.',
        keyword: 'silent',
        filter: (p) => {
            const name = (p.name || '').toLowerCase();
            return name.includes('silent') || name.includes('quiet') || name.includes('低噪音');
        }
    },
    {
        file: 'portable.html',
        title: 'Best Compact & Portable Mechanical Keyboards 2026 | MechKeys Hub',
        desc: 'Compact 60%, 65%, and TKL mechanical keyboards for on-the-go use. Lightweight and wireless options for travel.',
        keyword: 'portable',
        filter: (p) => {
            const name = (p.name || '').toLowerCase();
            return name.includes('60%') || name.includes('65%') || name.includes('compact') || name.includes('mini') || name.includes('tkl') || name.includes('tenkeyless');
        }
    },
    {
        file: 'hot-swap.html',
        title: 'Best Hot-Swap Mechanical Keyboards 2026 - Easy Customization | MechKeys Hub',
        desc: 'Hot-swap mechanical keyboards allowing easy switch changes without soldering. Perfect for keyboard enthusiasts.',
        keyword: 'hot-swap',
        filter: (p) => {
            const name = (p.name || '').toLowerCase();
            return name.includes('hot-swap') || name.includes('hot swap') || name.includes('swappable') || name.includes('热插拔');
        }
    }
];

// Read all products from the main data file
const products = JSON.parse(fs.readFileSync('all-products-collected.json', 'utf8'));

useCases.forEach(({ file, title, desc, keyword, filter }) => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Update title
    content = content.replace(
        /<title>.*?<\/title>/,
        `<title>${title}</title>`
    );
    
    // Update meta description
    content = content.replace(
        /<meta name="description" content=".*?"/,
        `<meta name="description" content="${desc}"`
    );
    
    // Update canonical URL
    content = content.replace(
        /<link rel="canonical" href=".*?"/,
        `<link rel="canonical" href="https://mechkeyshub.com/${file}"`
    );
    
    // Update H1
    content = content.replace(
        /<h1 class="text-4xl.*?>/,
        `<h1 class="text-4xl font-bold mb-8 text-center">`
    );
    
    // Replace H1 text
    const h1Texts = {
        'gaming.html': '🎮 Best Gaming Keyboards',
        'silent.html': '🔇 Best Silent Keyboards',
        'portable.html': '📱 Best Portable Keyboards',
        'hot-swap.html': '🔧 Best Hot-Swap Keyboards'
    };
    content = content.replace(
        /Find Your Perfect .*?Mechanical Keyboard/,
        h1Texts[file]
    );
    
    // Update product filter - replace budgetProducts filter with use case filter
    content = content.replace(
        /const budgetProducts = topProducts\.filter\(p => \{[\s\S]*?\}\);[\s\S]*?renderProducts\(topProducts\);/,
        `const filteredProducts = topProducts.filter(p => {
            const name = (p.name || '').toLowerCase();
            return name.includes('${keyword.includes('-') ? keyword.split('-')[0] : keyword}');
        });
        renderProducts(filteredProducts.length > 0 ? filteredProducts : topProducts.slice(0, 30));`
    );
    
    fs.writeFileSync(file, content);
    console.log(`Created ${file}`);
    
    // Count products for this category
    const count = products.filter(filter).length;
    console.log(`  - Found ${count} products`);
});

console.log('\nDone!');
