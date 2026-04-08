const fs = require('fs');
const path = require('path');

// Page configurations - customize per page type
const pageConfigs = {
    'index.html': {
        title: 'Best Mechanical Keyboards 2026 - Reviews & Buying Guide | MechKeys Hub',
        description: 'Discover the best mechanical keyboards of 2026 with expert reviews. Compare 60%, 65%, TKL & full-size keyboards. Find perfect switch types, RGB, wireless options. Up to $200 budget covered.',
        keywords: 'best mechanical keyboard 2026, mechanical keyboard review, gaming keyboard, mechanical keyboard switch, cherry mx, gateron, keychron, Leopold, best budget mechanical keyboard'
    },
    '60_percent.html': {
        title: 'Best 60% Mechanical Keyboards 2026 - Compact & Portable | MechKeys Hub',
        description: 'Discover the best 60% mechanical keyboards of 2026. Expert reviews of compact keyboards perfect for travel, minimalist setups, and portable gaming. Top picks under $150.',
        keywords: '60% mechanical keyboard, compact mechanical keyboard, portable keyboard, 60% keyboard review, best 60% keyboard'
    },
    '65_percent.html': {
        title: 'Best 65% Mechanical Keyboards 2026 - Arrow Keys Included | MechKeys Hub',
        description: 'Explore the best 65% mechanical keyboards of 2026. Compact size with arrow keys for perfect balance between space-saving and functionality. Expert reviews.',
        keywords: '65% mechanical keyboard, compact keyboard with arrow keys, 65% keyboard review'
    },
    '75_percent.html': {
        title: 'Best 75% Mechanical Keyboards 2026 - Function Row & Compact | MechKeys Hub',
        description: 'Find the best 75% mechanical keyboards of 2026. Compact layout with function row for gaming and productivity. Expert reviews and buying guide.',
        keywords: '75% mechanical keyboard, compact keyboard with function keys, 75% keyboard review'
    },
    'tkl.html': {
        title: 'Best TKL Mechanical Keyboards 2026 - Tenkeyless | MechKeys Hub',
        description: 'Discover the best TKL (tenkeyless) mechanical keyboards of 2026. No numpad, full-size feel. Perfect for gaming and office. Expert reviews.',
        keywords: 'TKL mechanical keyboard, tenkeyless keyboard, 80% keyboard, TKL keyboard review'
    },
    'full-size.html': {
        title: 'Best Full Size Mechanical Keyboards 2026 - With Numpad | MechKeys Hub',
        description: 'Find the best full-size mechanical keyboards of 2026. Complete layout with numpad for professionals. Expert reviews of gaming and productivity keyboards.',
        keywords: 'full size mechanical keyboard, keyboard with numpad, 100% keyboard, full keyboard review'
    },
    'best-value.html': {
        title: 'Best Value Mechanical Keyboards 2026 - Budget Picks Under $150 | MechKeys Hub',
        description: 'Best budget mechanical keyboards under $150 in 2026. Expert reviews of affordable keyboards with premium features. Top value picks for gaming and typing.',
        keywords: 'best value mechanical keyboard, budget mechanical keyboard, cheap mechanical keyboard, affordable keyboard'
    },
    'brands.html': {
        title: 'Best Mechanical Keyboard Brands 2026 - Top Manufacturers | MechKeys Hub',
        description: 'Compare the best mechanical keyboard brands of 2026. Keychron, Leopold, Ducky, Glorious, and more. Expert brand reviews and recommendations.',
        keywords: 'mechanical keyboard brands, keychron, leopold, ducky, glorious, best keyboard brand'
    },
    'switches.html': {
        title: 'Mechanical Keyboard Switches Guide 2026 - Cherry MX, Gateron & More | MechKeys Hub',
        description: 'Complete guide to mechanical keyboard switches in 2026. Learn about Cherry MX, Gateron, and other switches. Linear, tactile, and clicky switch comparisons.',
        keywords: 'mechanical keyboard switches, cherry mx, gateron switch, linear switch, tactile switch, clicky switch'
    },
    'compare.html': {
        title: 'Compare Mechanical Keyboards 2026 - Side-by-Side | MechKeys Hub',
        description: 'Compare the best mechanical keyboards of 2026 side-by-side. View specs, prices, and features. Find your perfect keyboard with our comparison tool.',
        keywords: 'compare mechanical keyboards, keyboard comparison, keyboard specs'
    },
    'guides.html': {
        title: 'Mechanical Keyboard Buying Guide 2026 | MechKeys Hub',
        description: 'Expert buying guides for mechanical keyboards. Learn about switches, layouts, and features. Find the perfect keyboard for your needs.',
        keywords: 'mechanical keyboard guide, keyboard buying guide, how to choose mechanical keyboard'
    }
};

// Breadcrumb HTML template
const breadcrumbHTML = `
            <!-- Breadcrumb -->
            <nav aria-label="breadcrumb" class="max-w-7xl mx-auto px-4 py-3">
                <ol class="flex items-center gap-2 text-sm text-gray-400">
                    <li><a href="/" class="hover:text-white transition">Home</a></li>
                    <li><i class="fas fa-chevron-right text-xs"></i></li>
                    <li class="text-white" id="breadcrumb-current">Current Page</li>
                </ol>
            </nav>
`;

// SEO meta template
const seoMetaTemplate = (config, pageUrl, pageName) => `
    <!-- SEO Meta Tags -->
    <meta name="description" content="${config.description}">
    <meta name="keywords" content="${config.keywords}">
    <link rel="canonical" href="https://mechkeys-hub.com${pageUrl}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://mechkeys-hub.com${pageUrl}">
    <meta property="og:title" content="${config.title}">
    <meta property="og:description" content="${config.description}">
    <meta property="og:image" content="https://mechkeys-hub.com/og-image.jpg">
    <meta property="og:site_name" content="MechKeys Hub">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://mechkeys-hub.com${pageUrl}">
    <meta name="twitter:title" content="${config.title}">
    <meta name="twitter:description" content="${config.description}">
    <meta name="twitter:image" content="https://mechkeys-hub.com/og-image.jpg">
`;

// Add lazy loading to images
function addLazyLoad(content) {
    // Add loading="lazy" to img tags that don't have it
    return content.replace(/<img([^>]*)src=/gi, '<img$1loading="lazy" src=');
}

// Process a single file
function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    const pageUrl = '/' + fileName;
    
    // Skip if not an HTML file
    if (!fileName.endsWith('.html')) return;
    
    // Get config for this page
    let config = pageConfigs[fileName];
    let pageName = fileName.replace('.html', '').replace(/-/g, ' ').replace(/_/g, ' ');
    pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    
    // For brand and guide pages, use a generic config
    if (!config) {
        if (fileName.startsWith('brand/')) {
            const brandName = fileName.replace('brand/', '').replace('.html', '').replace(/-/g, ' ');
            pageName = brandName + ' Keyboards';
        } else if (fileName.startsWith('guide-')) {
            pageName = fileName.replace('.html', '').replace(/-/g, ' ').replace('guide ', 'Guide: ');
            pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        }
        
        config = {
            title: `${pageName} - MechKeys Hub`,
            description: `Discover the best ${pageName.toLowerCase()}. Expert reviews and recommendations at MechKeys Hub.`,
            keywords: pageName.toLowerCase() + ', mechanical keyboard, review'
        };
    }
    
    let modified = false;
    
    // 1. Add/Update SEO meta tags
    const hasOGTags = content.includes('property="og:title"');
    const hasTwitterTags = content.includes('name="twitter:card"');
    const hasCanonical = content.includes('rel="canonical"');
    
    if (!hasOGTags || !hasTwitterTags || !hasCanonical) {
        // Find where to insert SEO meta (after description or before </head>)
        const descriptionMatch = content.match(/<meta name="description"[^>]*>/);
        if (descriptionMatch) {
            const seoMeta = seoMetaTemplate(config, pageUrl, pageName);
            content = content.replace(descriptionMatch[0], descriptionMatch[0] + '\n' + seoMeta);
            modified = true;
        }
    }
    
    // 2. Add breadcrumb navigation (after header, before main content)
    // For pages that don't have breadcrumb yet
    if (!content.includes('breadcrumb') && !content.includes('aria-label="breadcrumb"')) {
        // Add after </header>
        content = content.replace('</header>', '</header>\n' + breadcrumbHTML);
        modified = true;
        
        // Update breadcrumb current page text
        content = content.replace('id="breadcrumb-current">Current Page</li>', `id="breadcrumb-current">${pageName}</li>`);
    }
    
    // 3. Add lazy loading to images
    if (!content.includes('loading="lazy"')) {
        const newContent = addLazyLoad(content);
        if (newContent !== content) {
            content = newContent;
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Optimized: ${fileName}`);
    } else {
        console.log(`⏭️  Skipped (already optimized): ${fileName}`);
    }
}

// Get all HTML files
function getAllHtmlFiles(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === 'brand' || entry.name === 'pages') {
                files = files.concat(getAllHtmlFiles(fullPath));
            }
        } else if (entry.name.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    return files;
}

console.log('🚀 Starting SEO & UX Optimization...\n');
console.log('Tasks:');
console.log('  1. Add OG & Twitter meta tags');
console.log('  2. Add Canonical URLs');
console.log('  3. Add breadcrumb navigation');
console.log('  4. Add lazy loading to images\n');

const baseDir = __dirname;
const allFiles = getAllHtmlFiles(baseDir);

console.log(`Found ${allFiles.length} HTML files\n`);

allFiles.forEach(f => processFile(f));

console.log('\n✨ Done! Remember to create og-image.jpg for social sharing.');
