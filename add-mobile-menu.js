const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'index.html',
    '60_percent.html',
    '65_percent.html',
    '75_percent.html',
    'tkl.html',
    'full-size.html',
    'best-value.html',
    'switches.html',
    'brands.html',
    'compare.html',
    'guides.html',
    'guide-beginners.html',
    'guide-budget.html',
    'guide-gaming-vs-office.html',
    'guide-hot-swap.html',
    'guide-layouts.html',
    'guide-switches.html',
    'guide-wireless.html'
];

// CSS to add
const mobileCSS = `
        /* Mobile Navigation */
        .mobile-menu-btn { display: none; }
        .mobile-nav { display: none; }
        
        @media (max-width: 1023px) {
            .mobile-menu-btn { display: flex; }
            .desktop-nav { display: none !important; }
            .mobile-nav {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgb(15 23 42 / 0.98);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid rgba(255,255,255,0.1);
                padding: 1rem;
                flex-direction: column;
                gap: 0.25rem;
                z-index: 100;
            }
            .mobile-nav.active { display: flex; }
            .mobile-nav .nav-link { 
                padding: 0.75rem 1rem; 
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .mobile-nav .nav-link i { width: 20px; text-align: center; }
        }
        
        /* Touch-friendly product cards on mobile */
        @media (max-width: 640px) {
            .product-grid { grid-template-columns: 1fr !important; }
            .product-card { padding: 1rem; }
            h1, h2 { font-size: 1.75rem !important; }
            .hero-section { padding: 2rem 0.5rem !important; }
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }`;

// Mobile menu HTML
const mobileMenuHTML = `
    <!-- Mobile Menu Button -->
    <button class="mobile-menu-btn md:hidden p-2 rounded-lg hover:bg-white/10 transition" onclick="toggleMobileMenu()" aria-label="Toggle menu">
        <i class="fas fa-bars text-xl" id="menu-icon"></i>
    </button>`;

// Desktop nav class to add
const desktopNavClass = 'class="desktop-nav"';

// Mobile nav HTML to insert after desktop nav
const mobileNavHTML = `
            <!-- Mobile Navigation -->
            <nav class="mobile-nav" id="mobile-nav">
                <a href="/" class="nav-link"><i class="fas fa-home text-indigo-400"></i><span>Home</span></a>
                <a href="/60_percent.html" class="nav-link"><i class="fas fa-th-large text-indigo-400"></i><span>60%</span></a>
                <a href="/65_percent.html" class="nav-link"><i class="fas fa-th-large text-indigo-400"></i><span>65%</span></a>
                <a href="/75_percent.html" class="nav-link"><i class="fas fa-th text-indigo-400"></i><span>75%</span></a>
                <a href="/tkl.html" class="nav-link"><i class="fas fa-th text-indigo-400"></i><span>TKL</span></a>
                <a href="/full-size.html" class="nav-link"><i class="fas fa-keyboard text-indigo-400"></i><span>Full Size</span></a>
                <a href="/brands.html" class="nav-link"><i class="fas fa-tags text-purple-400"></i><span>Brands</span></a>
                <a href="/best-value.html" class="nav-link"><i class="fas fa-fire text-orange-400"></i><span>Best Value</span></a>
                <a href="/switches.html" class="nav-link"><i class="fas fa-toggle-on text-amber-400"></i><span>Switches</span></a>
                <a href="/compare.html" class="nav-link"><i class="fas fa-balance-scale text-blue-400"></i><span>Compare</span></a>
                <a href="/guides.html" class="nav-link"><i class="fas fa-book text-green-400"></i><span>Guides</span></a>
            </nav>
        </div>
    </header>
    
    <script>
        function toggleMobileMenu() {
            const nav = document.getElementById('mobile-nav');
            const icon = document.getElementById('menu-icon');
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        document.addEventListener('click', function(e) {
            const nav = document.getElementById('mobile-nav');
            const btn = document.querySelector('.mobile-menu-btn');
            if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = document.getElementById('menu-icon');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    </script>`;

// JS to add before </body>
const mobileJS = `
    <script>
        function toggleMobileMenu() {
            const nav = document.getElementById('mobile-nav');
            const icon = document.getElementById('menu-icon');
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        document.addEventListener('click', function(e) {
            const nav = document.getElementById('mobile-nav');
            const btn = document.querySelector('.mobile-menu-btn');
            if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = document.getElementById('menu-icon');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    </script>`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if already has mobile menu
    if (content.includes('mobile-menu-btn')) {
        console.log(`  SKIP - already has mobile menu: ${filePath}`);
        return;
    }
    
    // 1. Add mobile CSS before </style>
    if (!content.includes('.mobile-menu-btn')) {
        content = content.replace('</style>', mobileCSS + '\n    </style>');
        modified = true;
    }
    
    // 2. Update header navigation
    // Add mobile menu button after logo
    if (!content.includes('mobile-menu-btn')) {
        // Add mobile menu button and classes
        content = content.replace(
            '<nav class="flex items-center gap-1">',
            mobileMenuHTML + '\n                <nav class="desktop-nav flex items-center gap-1">'
        );
        modified = true;
    }
    
    // 3. Add mobile nav HTML before </header>
    if (!content.includes('id="mobile-nav"')) {
        // Find the end of header section and insert mobile nav
        const headerEndMatch = content.match(/<\/header>/);
        if (headerEndMatch) {
            content = content.replace(
                '</header>',
                mobileNavHTML
            );
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`  UPDATED: ${filePath}`);
    } else {
        console.log(`  SKIP: ${filePath}`);
    }
}

console.log('Adding mobile menu to HTML files...\n');

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        processFile(filePath);
    } else {
        console.log(`  NOT FOUND: ${filePath}`);
    }
});

console.log('\nDone!');
