const fs = require('fs');
const path = require('path');

// =====================
// 1. Create 404 Page
// =====================
function create404Page() {
    const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found | MechKeys Hub</title>
    <meta name="description" content="Page not found - The mechanical keyboard resource you're looking for doesn't exist.">
    <link rel="canonical" href="https://mechkeys-hub.com/404.html">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); }
        .gradient-text { background: linear-gradient(135deg, #818cf8, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    </style>
</head>
<body class="text-white min-h-screen flex items-center justify-center">
    <div class="text-center px-4">
        <div class="text-9xl font-bold gradient-text mb-4">404</div>
        <h1 class="text-3xl font-bold mb-4">Page Not Found</h1>
        <p class="text-gray-400 mb-8 max-w-md mx-auto">Oops! The page you're looking for has wandered off like a keyboard without a USB receiver.</p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition">
                <i class="fas fa-home mr-2"></i>Back to Home
            </a>
            <a href="/brands.html" class="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition">
                <i class="fas fa-keyboard mr-2"></i>Browse Keyboards
            </a>
        </div>
        
        <div class="text-gray-500 text-sm">
            <p>Popular Pages:</p>
            <div class="flex gap-4 justify-center mt-2">
                <a href="/60_percent.html" class="hover:text-white transition">60% Keyboards</a>
                <a href="/best-value.html" class="hover:text-white transition">Best Value</a>
                <a href="/guides.html" class="hover:text-white transition">Buying Guides</a>
            </div>
        </div>
    </div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(__dirname, '404.html'), content);
    console.log('✅ Created 404.html');
}

// =====================
// 2. Add Product Structured Data to category pages
// =====================
function getProductSchema(fileName) {
    // Extract product data from inline JS and create Product schema
    return '';
}

function addStructuredData(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    // Skip if already has Product schema
    if (content.includes('"@type": "Product"')) {
        console.log(`⏭️  Skipped (has Product schema): ${fileName}`);
        return;
    }
    
    // Determine page type and add appropriate schema
    let pageType = 'category';
    if (fileName.includes('guide-')) pageType = 'article';
    if (fileName === 'brands.html') pageType = 'brands';
    if (fileName === 'compare.html') pageType = 'compare';
    
    // Product schema template for category pages
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Best Mechanical Keyboards - ${fileName.replace('.html', '').replace(/-/g, ' ').toUpperCase()}`,
        "description": `Expert reviews of the best mechanical keyboards. Updated 2026.`,
        "url": `https://mechkeys-hub.com/${fileName}`,
        "numberOfItems": 280,
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "url": "https://mechkeys-hub.com/60_percent.html"
            }
        ]
    };
    
    // Add BreadcrumbList schema if missing
    if (!content.includes('"@type": "BreadcrumbList"') && content.includes('breadcrumb')) {
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mechkeys-hub.com/" },
                { "@type": "ListItem", "position": 2, "name": fileName.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), "item": `https://mechkeys-hub.com/${fileName}` }
            ]
        };
        
        const schemaScript = `\n    <script type="application/ld+json">\n    ${JSON.stringify(breadcrumbSchema, null, 4)}\n    </script>`;
        content = content.replace('</head>', schemaScript + '\n</head>');
    }
    
    // Add WebSite schema with search box
    if (!content.includes('"@type": "WebSite"')) {
        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MechKeys Hub",
            "url": "https://mechkeys-hub.com/",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mechkeys-hub.com/search.html?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };
        
        const schemaScript = `\n    <script type="application/ld+json">\n    ${JSON.stringify(websiteSchema, null, 4)}\n    </script>`;
        content = content.replace('</head>', schemaScript + '\n</head>');
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Added structured data: ${fileName}`);
}

// =====================
// 3. Improve internal linking
// =====================
function improveInternalLinks(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    // Add related links section before footer if not exists
    if (!content.includes('related-links') && !fileName.includes('guide-') && !fileName.includes('brand/')) {
        const relatedLinksHTML = `
    <!-- Related Links -->
    <section class="py-12 px-4 bg-slate-900/50">
        <div class="max-w-7xl mx-auto">
            <h3 class="text-xl font-bold mb-6">Explore More</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="/60_percent.html" class="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/10">
                    <div class="text-2xl mb-2">⌨️</div>
                    <div class="font-semibold">60% Keyboards</div>
                </a>
                <a href="/best-value.html" class="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/10">
                    <div class="text-2xl mb-2">💰</div>
                    <div class="font-semibold">Best Value</div>
                </a>
                <a href="/switches.html" class="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/10">
                    <div class="text-2xl mb-2">🎛️</div>
                    <div class="font-semibold">Switches Guide</div>
                </a>
                <a href="/guides.html" class="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/10">
                    <div class="text-2xl mb-2">📖</div>
                    <div class="font-semibold">Buying Guides</div>
                </a>
            </div>
        </div>
    </section>
`;
        
        // Insert before closing </body>
        content = content.replace('</body>', relatedLinksHTML + '\n</body>');
        fs.writeFileSync(filePath, content);
        console.log(`✅ Added related links: ${fileName}`);
    }
}

// =====================
// Main
// =====================
console.log('🚀 Advanced SEO & Performance Optimization...\n');

// 1. Create 404 page
create404Page();

// Get all HTML files
const allFiles = fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.html') && f !== '404.html')
    .map(f => path.join(__dirname, f));

const brandDir = path.join(__dirname, 'brand');
if (fs.existsSync(brandDir)) {
    fs.readdirSync(brandDir)
        .filter(f => f.endsWith('.html'))
        .forEach(f => allFiles.push(path.join(brandDir, f)));
}

console.log(`\n📝 Processing ${allFiles.length} files...\n`);

allFiles.forEach(f => {
    addStructuredData(f);
    improveInternalLinks(f);
});

console.log('\n✨ Done!');
