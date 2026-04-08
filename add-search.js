const fs = require('fs');

const pages = [
    '60_percent.html', '65_percent.html', '75_percent.html', 'tkl.html', 
    'full-size.html', 'best-value.html', 'brands.html', 'switches.html',
    'compare.html', 'guides.html', 'gaming.html', 'silent.html', 
    'portable.html', 'hot-swap.html',
    'guide-beginners.html', 'guide-budget.html', 'guide-gaming-vs-office.html',
    'guide-hot-swap.html', 'guide-layouts.html', 'guide-switches.html', 'guide-wireless.html'
];

// Search HTML to add after logo
const searchHTML = `
                
                <!-- Search Box -->
                <div class="hidden md:flex items-center relative mx-4">
                    <input type="text" id="search-input" placeholder="Search keyboards..." 
                           class="bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-sm w-48 lg:w-64 focus:outline-none focus:border-indigo-500 focus:bg-white/15 transition">
                    <i class="fas fa-search absolute left-3 text-gray-400"></i>
                    <div id="search-results" class="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/20 rounded-xl shadow-2xl max-h-96 overflow-y-auto hidden z-50"></div>
                </div>
                
                <!-- Mobile Menu Button -->
                <button class="mobile-menu-btn md:hidden p-2 rounded-lg hover:bg-white/10 transition" onclick="toggleMobileMenu()" aria-label="Toggle menu">
                    <i class="fas fa-bars text-xl" id="menu-icon"></i>
                </button>`;

// Search CSS
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
        .search-result-item:last-child { border-bottom: none; }`;

// Search JavaScript - using regular strings instead of template literals
const searchJS = "\n" +
    "    // Search functionality\n" +
    "    let searchIndex = [];\n" +
    "    \n" +
    "    fetch('/search-index.json')\n" +
    "        .then(r => r.json())\n" +
    "        .then(data => { searchIndex = data; });\n" +
    "    \n" +
    "    function performSearch(query) {\n" +
    "        if (!query || query.length < 2) return [];\n" +
    "        const q = query.toLowerCase();\n" +
    "        return searchIndex.filter(p => \n" +
    "            p.name.toLowerCase().includes(q) ||\n" +
    "            (p.brand && p.brand.toLowerCase().includes(q)) ||\n" +
    "            (p.switch_type && p.switch_type.toLowerCase().includes(q)) ||\n" +
    "            (p.layout && p.layout.toLowerCase().includes(q))\n" +
    "        ).slice(0, 8);\n" +
    "    }\n" +
    "    \n" +
    "    function renderSearchResults(results) {\n" +
    "        const container = document.getElementById('search-results');\n" +
    "        if (!container) return;\n" +
    "        \n" +
    "        if (results.length === 0) {\n" +
    "            container.innerHTML = '<div class=\"p-4 text-gray-400 text-center\">No results found</div>';\n" +
    "            container.classList.remove('hidden');\n" +
    "            return;\n" +
    "        }\n" +
    "        \n" +
    "        container.innerHTML = results.map(p => \n" +
    "            '<a href=\"' + p.url + '\" target=\"_blank\" class=\"search-result-item block\">' +\n" +
    "            '<div class=\"flex items-center gap-3\">' +\n" +
    "            '<img src=\"' + p.image + '\" alt=\"' + p.name + '\" class=\"w-12 h-12 object-cover rounded-lg\" onerror=\"this.src=\\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%231e293b%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%236474b4%22 font-size=%2240%22>⌨️</text></svg>\\'\" >' +\n" +
    "            '<div class=\"flex-1 min-w-0\">' +\n" +
    "            '<div class=\"font-semibold text-sm truncate\">' + p.name + '</div>' +\n" +
    "            '<div class=\"text-xs text-gray-400\">' + (p.brand || '') + ' · ' + p.price + ' · ★ ' + p.rating + '</div>' +\n" +
    "            '</div></div></a>'\n" +
    "        ).join('');\n" +
    "        container.classList.remove('hidden');\n" +
    "    }\n" +
    "    \n" +
    "    const searchInput = document.getElementById('search-input');\n" +
    "    const searchResults = document.getElementById('search-results');\n" +
    "    \n" +
    "    if (searchInput) {\n" +
    "        searchInput.addEventListener('input', function(e) {\n" +
    "            const query = e.target.value.trim();\n" +
    "            if (query.length < 2) {\n" +
    "                searchResults && searchResults.classList.add('hidden');\n" +
    "                return;\n" +
    "            }\n" +
    "            const results = performSearch(query);\n" +
    "            renderSearchResults(results);\n" +
    "        });\n" +
    "        \n" +
    "        searchInput.addEventListener('focus', function() {\n" +
    "            if (this.value.trim().length >= 2) {\n" +
    "                const results = performSearch(this.value.trim());\n" +
    "                renderSearchResults(results);\n" +
    "            }\n" +
    "        });\n" +
    "    }\n" +
    "    \n" +
    "    document.addEventListener('click', function(e) {\n" +
    "        if (!e.target.closest('#search-input') && !e.target.closest('#search-results')) {\n" +
    "            searchResults && searchResults.classList.add('hidden');\n" +
    "        }\n" +
    "    });";

pages.forEach(page => {
    const filePath = './' + page;
    if (!fs.existsSync(filePath)) {
        console.log('Skip: ' + page + ' not found');
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has search
    if (content.includes('id="search-input"')) {
        console.log('Skip: ' + page + ' already has search');
        return;
    }
    
    // Add search HTML after logo
    const logoRegex = /(<a href="\/" class="flex items-center gap-2[^"]*">[\s\S]*?<\/a>)(\s+<\/div>\s+<!-- Mobile Menu Button -->)/;
    if (logoRegex.test(content)) {
        content = content.replace(logoRegex, '$1' + searchHTML + '$2');
    } else {
        console.log('Skip: ' + page + ' - logo pattern not found');
        return;
    }
    
    // Add search CSS after .nav-link
    content = content.replace(/(\.nav-link \{[^}]+\})/, '$1' + searchCSS);
    
    // Add search JS before </script>
    content = content.replace(/(<\/script>)/, searchJS + '$1');
    
    fs.writeFileSync(filePath, content);
    console.log('Updated: ' + page);
});

console.log('\nDone!');
