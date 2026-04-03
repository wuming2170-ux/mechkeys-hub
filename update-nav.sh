#!/bin/bash
# Update navigation header for all category pages

cat > /tmp/new_header.txt << 'HEADER'
    <header class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 py-3">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <a href="/" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">⌨️</div>
                    <div>
                        <span class="font-bold text-lg">MechKeys Hub</span>
                    </div>
                </a>

                <!-- Desktop Navigation -->
                <nav class="hidden lg:flex items-center gap-1">
                    <!-- Layout Dropdown -->
                    <div class="relative group">
                        <button class="nav-dropdown-trigger" onclick="toggleDropdown(this)">
                            <i class="fas fa-th-large mr-1 text-indigo-400"></i>Layouts
                            <i class="fas fa-chevron-down text-xs ml-1"></i>
                        </button>
                        <div class="nav-dropdown hidden">
                            <a href="/60-percent.html" class="nav-dropdown-item">60% Keyboards</a>
                            <a href="/65_percent.html" class="nav-dropdown-item">65% Keyboards</a>
                            <a href="/tkl.html" class="nav-dropdown-item">TKL (Tenkeyless)</a>
                            <a href="/full-size.html" class="nav-dropdown-item">Full Size</a>
                        </div>
                    </div>

                    <a href="/brands.html" class="nav-item">
                        <i class="fas fa-tags mr-1 text-indigo-400"></i>Brands
                    </a>

                    <a href="/best-value.html" class="nav-item">
                        <i class="fas fa-fire mr-1 text-orange-400"></i>Best Value
                    </a>

                    <a href="/switches.html" class="nav-item">
                        <i class="fas fa-toggle-on mr-1 text-amber-400"></i>Switches
                    </a>

                    <a href="/compare.html" class="nav-item">
                        <i class="fas fa-balance-scale mr-1 text-blue-400"></i>Compare
                    </a>

                    <a href="/guides.html" class="nav-item">
                        <i class="fas fa-book mr-1 text-green-400"></i>Guides
                    </a>
                </nav>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="lg:hidden px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" onclick="toggleMobileMenu()">
                    <i class="fas fa-bars text-xl"></i>
                </button>
            </div>

            <!-- Mobile Navigation -->
            <div id="mobile-menu" class="hidden lg:hidden mt-4 pb-4 border-t border-white/10 pt-4">
                <div class="grid grid-cols-2 gap-2">
                    <a href="/brands.html" class="mobile-nav-item">
                        <i class="fas fa-tags mr-2 text-indigo-400"></i>Brands
                    </a>
                    <a href="/best-value.html" class="mobile-nav-item">
                        <i class="fas fa-fire mr-2 text-orange-400"></i>Best Value
                    </a>
                    <a href="/60-percent.html" class="mobile-nav-item">60% Keyboards</a>
                    <a href="/65_percent.html" class="mobile-nav-item">65% Keyboards</a>
                    <a href="/tkl.html" class="mobile-nav-item">TKL Keyboards</a>
                    <a href="/full-size.html" class="mobile-nav-item">Full Size</a>
                    <a href="/switches.html" class="mobile-nav-item">
                        <i class="fas fa-toggle-on mr-2 text-amber-400"></i>Switches
                    </a>
                    <a href="/compare.html" class="mobile-nav-item">
                        <i class="fas fa-balance-scale mr-2 text-blue-400"></i>Compare
                    </a>
                    <a href="/guides.html" class="mobile-nav-item col-span-2">
                        <i class="fas fa-book mr-2 text-green-400"></i>All Buying Guides
                    </a>
                </div>
            </div>
        </div>
    </header>

    <style>
        .nav-item {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            color: #d1d5db;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            font-size: 0.875rem;
            font-weight: 500;
        }
        .nav-item:hover {
            color: white;
            background: rgba(255,255,255,0.1);
        }
        .nav-dropdown-trigger {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            color: #d1d5db;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
        }
        .nav-dropdown-trigger:hover {
            color: white;
            background: rgba(255,255,255,0.1);
        }
        .nav-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 0.5rem;
            width: 12rem;
            background: #1e293b;
            border-radius: 0.75rem;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            padding: 0.5rem 0;
            z-index: 50;
        }
        .nav-dropdown-item {
            display: block;
            padding: 0.5rem 1rem;
            color: #d1d5db;
            font-size: 0.875rem;
            transition: all 0.2s;
        }
        .nav-dropdown-item:hover {
            color: white;
            background: rgba(255,255,255,0.1);
        }
        .mobile-nav-item {
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            color: #d1d5db;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            font-size: 0.875rem;
            font-weight: 500;
        }
        .mobile-nav-item:hover {
            color: white;
            background: rgba(255,255,255,0.1);
        }
    </style>

    <script>
        function toggleDropdown(btn) {
            const dropdown = btn.nextElementSibling;
            document.querySelectorAll('.nav-dropdown').forEach(d => {
                if (d !== dropdown) d.classList.add('hidden');
            });
            dropdown.classList.toggle('hidden');
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const btn = document.getElementById('mobile-menu-btn');
            const icon = btn.querySelector('i');
            menu.classList.toggle('hidden');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.relative')) {
                document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.add('hidden'));
            }
        });
    </script>
HEADER

# Update each category page
for file in 60_percent.html 65_percent.html tkl.html full-size.html best-value.html switches.html compare.html guides.html brands.html; do
    if [ -f "$file" ]; then
        echo "Updating $file"
    fi
done
