'''
Add language switching functionality to HTML files
'''
import re

def add_language_support(html_content):
    # Add language.js script before closing </head>
    if 'language.js' not in html_content:
        html_content = html_content.replace(
            '</head>',
            '    <script src="language.js"></script>\n</head>'
        )
    
    # Add language switcher to header (after the nav)
    lang_switcher = '''
                <!-- Language Switcher -->
                <div class="flex items-center gap-2 ml-4">
                    <button class="lang-btn px-3 py-1 rounded text-sm bg-slate-700 hover:bg-slate-600" data-lang="en" onclick="setLanguage('en')">EN</button>
                    <button class="lang-btn px-3 py-1 rounded text-sm bg-indigo-600" data-lang="zh" onclick="setLanguage('zh')">中文</button>
                </div>
'''
    
    # Find the nav closing and add language switcher after nav
    html_content = re.sub(
        r'(<nav class="hidden md:flex items-center gap-2">.*?</nav>)',
        r'\1' + lang_switcher,
        html_content,
        flags=re.DOTALL
    )
    
    # Add data-i18n attributes to key elements
    # Header
    html_content = re.sub(
        r'<h1 class="font-bold text-xl">(.*?)</h1>',
        r'<h1 class="font-bold text-xl" data-i18n="title">\1</h1>',
        html_content
    )
    html_content = re.sub(
        r'<p class="text-xs text-gray-400">(.*?)</p>',
        r'<p class="text-xs text-gray-400" data-i18n="subtitle">\1</p>',
        html_content
    )
    
    # Navigation
    replacements = [
        ('<a href="/" class="nav-link">Home</a>', '<a href="/" class="nav-link" data-i18n="home">Home</a>'),
        ('<a href="/60-percent.html" class="nav-link">60% Keyboards</a>', '<a href="/60-percent.html" class="nav-link" data-i18n="keyboards_60">60% Keyboards</a>'),
        ('<a href="/65_percent.html" class="nav-link">65% Keyboards</a>', '<a href="/65_percent.html" class="nav-link" data-i18n="keyboards_65">65% Keyboards</a>'),
        ('<a href="/tkl.html" class="nav-link">TKL</a>', '<a href="/tkl.html" class="nav-link" data-i18n="keyboards_tkl">TKL</a>'),
        ('<a href="/full-size.html" class="nav-link">Full Size</a>', '<a href="/full-size.html" class="nav-link" data-i18n="keyboards_full">Full Size</a>'),
        ('<a href="/switches.html" class="nav-link">Switches</a>', '<a href="/switches.html" class="nav-link" data-i18n="switches">Switches</a>'),
        ('<a href="/best-value.html" class="nav-link">Best Value</a>', '<a href="/best-value.html" class="nav-link" data-i18n="best_value">Best Value</a>'),
    ]
    
    for old, new in replacements:
        html_content = html_content.replace(old, new)
    
    # Hero section
    html_content = re.sub(
        r'Find Your Perfect <span class="text-indigo-400">Mechanical Keyboard</span>',
        '<span data-i18n="hero_title">Find Your Perfect <span class="text-indigo-400">Mechanical Keyboard</span></span>',
        html_content
    )
    
    return html_content

# Process all HTML files
import os

html_files = ['index.html', '60_percent.html', '65_percent.html', 'tkl.html', 'full-size.html', 'switches.html', 'best-value.html']

for f in html_files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Add language.js to files that don't have it
        if 'language.js' not in content:
            content = content.replace('</head>', '    <script src="language.js"></script>\n</head>')
        
        # Add language switcher after nav
        lang_switcher = '''
                <!-- Language Switcher -->
                <div class="flex items-center gap-2 ml-4">
                    <button class="lang-btn px-3 py-1 rounded text-sm bg-slate-700 hover:bg-slate-600" data-lang="en" onclick="setLanguage('en')">EN</button>
                    <button class="lang-btn px-3 py-1 rounded text-sm bg-indigo-600" data-lang="zh" onclick="setLanguage('zh')">中文</button>
                </div>
'''
        
        # Find where to insert (after </nav> in header)
        pattern = r'(<nav class="hidden md:flex items-center gap-2">.*?</nav>)'
        match = re.search(pattern, content, re.DOTALL)
        if match:
            insert_pos = match.end()
            content = content[:insert_pos] + lang_switcher + content[insert_pos:]
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f'Updated {f}')

print('Done!')
