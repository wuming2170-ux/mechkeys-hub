const fs = require('fs');
const path = require('path');

const searchCSS = `
        /* Search Box */
        #search-input::placeholder { color: #9ca3af; }
        #search-input:focus { width: 200px; }
        #search-results { scrollbar-width: thin; scrollbar-color: #4f46e5 #1e293b; }
        #search-results::-webkit-scrollbar { width: 6px; }
        #search-results::-webkit-scrollbar-track { background: #1e293b; }
        #search-results::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 3px; }
        .search-result-item { padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: background 0.2s; }
        .search-result-item:hover { background: rgba(99, 102, 241, 0.2); }
        .search-result-item:last-child { border-bottom: none; }
`;

const searchHTML = `
                <!-- Search Box -->
                <div class="hidden md:flex items-center relative mx-4">
                    <form action="/search.html" method="get" id="search-form" class="flex items-center w-48 lg:w-64">
                        <input type="text" name="q" id="search-input" placeholder="Search keyboards..." 
                               class="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/15 transition"
                               autocomplete="off">
                        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </form>
                    <button type="submit" form="search-form" class="ml-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <div id="search-results" class="absolute top-full left-0 right-12 mt-2 bg-slate-800 border border-white/20 rounded-xl shadow-2xl max-h-96 overflow-y-auto hidden z-50"></div>
                </div>
`;

const allFiles = [
    '60_percent.html', '65_percent.html', '75_percent.html', 'best-value.html',
    'brands.html', 'full-size.html', 'switches.html', 'tkl.html',
    'guide-beginners.html', 'guide-budget.html', 'guide-gaming-vs-office.html',
    'guide-hot-swap.html', 'guide-layouts.html', 'guide-switches.html', 'guide-wireless.html'
];

// Add brand pages
const brandFiles = fs.readdirSync(path.join(__dirname, 'brand'))
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .map(f => path.join('brand', f));
allFiles.push(...brandFiles);

function addSearchToFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has search
    if (content.includes('id="search-input"')) {
        console.log(`SKIP (already has search): ${filePath}`);
        return;
    }
    
    // Add search CSS before </style>
    if (!content.includes('#search-input::placeholder')) {
        content = content.replace('</style>', searchCSS + '\n    </style>');
    }
    
    // Add search HTML after logo link </a> and before mobile menu button
    // Pattern: after </span> and </a> that contains "MechKeys Hub"
    const logoEndPattern = /(<span class="font-bold text-xl">MechKeys Hub<\/span>\s*<\/a>)/;
    const mobileBtnPattern = /(<button class="mobile-menu-btn)/;
    
    if (mobileBtnPattern.test(content)) {
        content = content.replace(mobileBtnPattern, searchHTML + '\n                $1');
    } else {
        console.log(`WARNING: No mobile button found in ${filePath}`);
        return;
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`ADDED search to: ${filePath}`);
}

console.log('Adding search box to pages...\n');
allFiles.forEach(f => {
    const fullPath = path.join(__dirname, f);
    if (fs.existsSync(fullPath)) {
        addSearchToFile(fullPath);
    } else {
        console.log(`NOT FOUND: ${f}`);
    }
});
console.log('\nDone!');
