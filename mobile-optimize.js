const fs = require('fs');
const path = require('path');

const allFiles = fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(__dirname, f));

// Also get brand pages
const brandDir = path.join(__dirname, 'brand');
if (fs.existsSync(brandDir)) {
    fs.readdirSync(brandDir)
        .filter(f => f.endsWith('.html'))
        .forEach(f => allFiles.push(path.join(brandDir, f)));
}

function optimizeMobile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 1. Ensure mobile nav links have minimum 44px touch target
    // Current: padding: 0.75rem 1rem; (about 48px height)
    // Increase to ensure at least 44px
    content = content.replace(
        /\.mobile-nav \.nav-link \{\s*\n?\s*padding: 0\.75rem 1rem;/g,
        '.mobile-nav .nav-link {\n            padding: 0.75rem 1rem;\n            min-height: 44px;\n            min-width: 44px;'
    );
    
    // 2. Make sure buttons in mobile nav have adequate touch targets
    if (!content.includes('.mobile-nav button')) {
        content = content.replace(
            /\.mobile-nav \.nav-link \{\s*\n?\s*padding:/g,
            '.mobile-nav button,\n            .mobile-nav .nav-link {\n                padding:'
        );
    }
    
    // 3. Improve h1 responsive font size - slightly smaller on mobile
    content = content.replace(
        /<h1 class="text-4xl md:text-5xl/g,
        '<h1 class="text-3xl md:text-5xl'
    );
    
    // 4. Improve h2 responsive font size
    content = content.replace(
        /<h2 class="text-2xl/g,
        '<h2 class="text-xl md:text-2xl'
    );
    
    // 5. Add mobile-friendly touch styles for product cards
    if (content.includes('.product-card') && !content.includes('.product-card {')) {
        // Find where to insert mobile product card styles
        const touchStyles = `
        
        /* Mobile Touch Optimization */
        @media (max-width: 640px) {
            .product-card { 
                padding: 1rem;
                min-height: 44px;
            }
            .product-card a,
            .product-card button {
                min-height: 44px;
                min-width: 44px;
            }
            .btn-primary,
            .btn-secondary {
                min-height: 44px;
                padding: 0.75rem 1.5rem;
            }
        }
        `;
        content = content.replace('</style>', touchStyles + '\n    </style>');
    }
    
    // 6. Ensure search input has adequate touch target on mobile
    content = content.replace(
        /class="flex-1 bg-white\/10 border border-white\/20 rounded-lg px-4 py-2 text-sm/g,
        'class="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-base"'
    );
    
    if (content !== fs.readFileSync(filePath, 'utf8')) {
        fs.writeFileSync(filePath, content);
        return true;
    }
    return false;
}

console.log('🚀 Mobile Optimization...\n');

let count = 0;
allFiles.forEach(f => {
    if (optimizeMobile(f)) {
        console.log(`✅ Optimized: ${path.basename(f)}`);
        count++;
    }
});

console.log(`\n✨ Done! ${count} files updated.`);
