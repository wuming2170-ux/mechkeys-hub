const fs = require('fs');
const path = require('path');

const searchHTML = `
                <!-- Search in Mobile Menu -->
                <div class="mobile-search-wrapper px-3 py-2 border-b border-white/10">
                    <form action="/search.html" method="get" class="flex items-center">
                        <input type="text" name="q" placeholder="Search keyboards..." 
                               class="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500">
                        <button type="submit" class="ml-2 px-3 py-2 bg-indigo-600 rounded-lg">
                            <i class="fas fa-search text-sm"></i>
                        </button>
                    </form>
                </div>
`;

const allFiles = [
    '60_percent.html', '65_percent.html', '75_percent.html', 'best-value.html',
    'brands.html', 'full-size.html', 'switches.html', 'tkl.html',
    'guide-beginners.html', 'guide-budget.html', 'guide-gaming-vs-office.html',
    'guide-hot-swap.html', 'guide-layouts.html', 'guide-switches.html', 'guide-wireless.html',
    'index.html',
    'compare.html', 'guides.html', 'switches.html', 'search.html'
];

// Add brand pages
const brandDir = path.join(__dirname, 'brand');
if (fs.existsSync(brandDir)) {
    fs.readdirSync(brandDir)
        .filter(f => f.endsWith('.html'))
        .forEach(f => allFiles.push(path.join('brand', f)));
}

function fixSearchInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove search box from header (between logo and mobile button)
    // Pattern: after </a> closing logo, before mobile-menu-btn
    const headerSearchPattern = /(\<\/a>\s*)\n\s*<!-- Search Box -->\s*<div class="hidden md:flex items-center relative mx-4">.*?<\/div>\s*\n(\s*<button class="mobile-menu-btn)/s;
    if (headerSearchPattern.test(content)) {
        content = content.replace(headerSearchPattern, '$1\n$2');
        console.log(`Removed header search from: ${filePath}`);
    }
    
    // Remove standalone header search div if exists
    const searchDivPattern = /(\<\/a>\s*)\n\s*<div class="hidden md:flex items-center relative mx-4">.*?<\/div>\s*\n(\s*<button class="mobile-menu-btn)/s;
    if (searchDivPattern.test(content)) {
        content = content.replace(searchDivPattern, '$1\n$2');
    }
    
    // Add search as first item in mobile-nav
    const mobileNavPattern = /(<nav class="mobile-nav" id="mobile-nav">)/;
    if (mobileNavPattern.test(content)) {
        content = content.replace(mobileNavPattern, '$1' + searchHTML);
        console.log(`Added search to mobile nav in: ${filePath}`);
    }
    
    fs.writeFileSync(filePath, content);
}

console.log('Fixing search position - moving to mobile nav...\n');
allFiles.forEach(f => {
    const fullPath = path.join(__dirname, f);
    if (fs.existsSync(fullPath)) {
        fixSearchInFile(fullPath);
    }
});
console.log('\nDone!');
