const fs = require('fs');
const path = require('path');

const brandDir = path.join(__dirname, 'brand');
const files = fs.readdirSync(brandDir).filter(f => f.endsWith('.html'));

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

let updated = 0;
files.forEach(file => {
    const filePath = path.join(brandDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('id="mobile-nav"')) {
        console.log(`SKIP: ${file} (already has mobile nav)`);
        return;
    }
    
    // Add desktop-nav class if not present
    if (!content.includes('desktop-nav')) {
        content = content.replace(
            '<nav class="flex items-center gap-1">',
            '<nav class="desktop-nav flex items-center gap-1">'
        );
    }
    
    // Add mobile menu button if not present
    if (!content.includes('mobile-menu-btn')) {
        content = content.replace(
            '<nav class="desktop-nav flex items-center gap-1">',
            `<button class="mobile-menu-btn md:hidden p-2 rounded-lg hover:bg-white/10 transition" onclick="toggleMobileMenu()" aria-label="Toggle menu">
                <i class="fas fa-bars text-xl" id="menu-icon"></i>
            </button>
                <nav class="desktop-nav flex items-center gap-1">`
        );
    }
    
    // Add mobile nav HTML before </header>
    if (!content.includes('id="mobile-nav"')) {
        content = content.replace(
            '</header>',
            mobileNavHTML
        );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`UPDATED: ${file}`);
    updated++;
});

console.log(`\nUpdated ${updated} files in brand/`);
