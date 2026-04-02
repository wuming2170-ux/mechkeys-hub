#!/usr/bin/env python3
"""
SEO Optimization Script for MechKeys Hub
- Adds/updates Schema.org structured data
- Optimizes meta tags for each page
- Adds alt text to product images
"""

import re
import os

# Schema.org structured data templates
WEBSITE_SCHEMA = '''    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "MechKeys Hub",
        "url": "https://mechkeys-hub.com/",
        "description": "Expert reviews and buying guides for the best mechanical keyboards of 2025. Compare switches, layouts, and find your perfect keyboard.",
        "publisher": {
            "@type": "Organization",
            "name": "MechKeys Hub",
            "logo": {
                "@type": "ImageObject",
                "url": "https://mechkeys-hub.com/logo.png"
            }
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://mechkeys-hub.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>
    
    <!-- BreadcrumbList Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://mechkeys-hub.com/"
            }
        ]
    }
    </script>
    
    <!-- Product List Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Mechanical Keyboards Reviews",
        "description": "Expert reviews of the best mechanical keyboards of 2025, including 60%, 65%, TKL, and full-size layouts.",
        "numberOfItems": "30",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "TMKB 60% Hall Effect Gaming Keyboard",
                "url": "https://www.amazon.com/dp/B0FJRGTFF3?tag=mechkeyshub-20"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "AULA F99 Wireless Mechanical Keyboard",
                "url": "https://www.amazon.com/dp/B0CLLHSWRL?tag=mechkeyshub-20"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Logitech G413 SE Full-Size Mechanical Keyboard",
                "url": "https://www.amazon.com/dp/B08Z6X4NK3?tag=mechkeyshub-20"
            }
        ]
    }
    </script>'''

# Page-specific meta configurations
PAGE_META = {
    'index.html': {
        'title': 'Best Mechanical Keyboards 2025 - Reviews & Buying Guide | MechKeys Hub',
        'description': 'Discover the best mechanical keyboards of 2025 with expert reviews. Compare 60%, 65%, TKL & full-size keyboards. Find perfect switch types, RGB, wireless options. Up to $200 budget covered.',
        'keywords': 'best mechanical keyboard 2025, mechanical keyboard review, gaming keyboard, mechanical keyboard switch, cherry mx, gateron, keychron, Leopold, best budget mechanical keyboard'
    },
    '60_percent.html': {
        'title': 'Best 60% Mechanical Keyboards 2025 - Compact Gaming Keyboards | MechKeys Hub',
        'description': 'Find the best 60% mechanical keyboards of 2025. Compact size, portable design, perfect for gaming and travel. Expert reviews with RGB, wireless, and hot-swap options.',
        'keywords': '60% mechanical keyboard, compact mechanical keyboard, best 60% keyboard, small gaming keyboard, portable mechanical keyboard'
    },
    '65_percent.html': {
        'title': 'Best 65% Mechanical Keyboards 2025 - Compact with Arrows | MechKeys Hub',
        'description': 'Top 65% mechanical keyboards with arrow keys. Compact yet functional, perfect balance of size and usability. Wireless, RGB, and hot-swap options reviewed.',
        'keywords': '65% mechanical keyboard, compact keyboard with arrows, best 65% keyboard, mechanical keyboard with arrow keys'
    },
    'tkl.html': {
        'title': 'Best TKL Mechanical Keyboards 2025 - Tenkeyless Reviews | MechKeys Hub',
        'description': 'Best TKL (tenkeyless) mechanical keyboards of 2025. No numpad, more desk space. Professional reviews of gaming and typing TKL keyboards with Cherry MX, Gateron switches.',
        'keywords': 'TKL mechanical keyboard, tenkeyless keyboard, best TKL keyboard, gaming keyboard without numpad, 87 key mechanical keyboard'
    },
    'full-size.html': {
        'title': 'Best Full Size Mechanical Keyboards 2025 - With Numpad | MechKeys Hub',
        'description': 'Top full-size mechanical keyboards with numpad. Perfect for office work, data entry, and professionals who need number keys. Gaming and productivity options reviewed.',
        'keywords': 'full size mechanical keyboard, mechanical keyboard with numpad, 104 key mechanical keyboard, best keyboard for office'
    },
    'switches.html': {
        'title': 'Mechanical Keyboard Switches Guide 2025 - Linear vs Tactile vs Clicky | MechKeys Hub',
        'description': 'Complete guide to mechanical keyboard switches. Learn the difference between linear (red), tactile (brown), and clicky (blue) switches. Find the best switch for your needs.',
        'keywords': 'mechanical keyboard switch, linear switch, tactile switch, clicky switch, cherry mx red, cherry mx brown, cherry mx blue, switch comparison'
    },
    'best-value.html': {
        'title': 'Best Value Mechanical Keyboards Under $100 - Budget Picks 2025 | MechKeys Hub',
        'description': 'Best budget mechanical keyboards under $100. Expert reviews of affordable keyboards with great features. Hot-swap, RGB, wireless options that wont break the bank.',
        'keywords': 'best budget mechanical keyboard, cheap mechanical keyboard, mechanical keyboard under 100, affordable mechanical keyboard, best value mechanical keyboard'
    }
}

def add_alt_text_to_image(img_tag, product_name):
    """Add SEO-friendly alt text to image tags"""
    # Extract the alt text from existing attributes
    alt_text = f"{product_name} - MechKeys Hub"
    if 'alt=' in img_tag:
        # Replace existing alt
        return re.sub(r'alt="[^"]*"', f'alt="{alt_text}"', img_tag)
    else:
        # Add alt before src
        return img_tag.replace('src=', f'alt="{alt_text}" src=')

def process_html_file(filepath, page_key):
    """Process a single HTML file with SEO optimizations"""
    if not os.path.exists(filepath):
        print(f"  Skipping {filepath} - not found")
        return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already optimized
    if 'WEBSITE_SCHEMA_PLACEHOLDER' in content:
        print(f"  Already optimized: {filepath}")
        return
    
    # 1. Update Meta Tags
    if page_key in PAGE_META:
        meta = PAGE_META[page_key]
        
        # Update title
        content = re.sub(
            r'<title>.*?</title>',
            f'<title>{meta["title"]}</title>',
            content
        )
        
        # Update description
        content = re.sub(
            r'<meta name="description" content="[^"]*">',
            f'<meta name="description" content="{meta["description"]}">',
            content
        )
        
        # Update keywords
        content = re.sub(
            r'<meta name="keywords" content="[^"]*">',
            f'<meta name="keywords" content="{meta["keywords"]}">',
            content
        )
        
        # Update Open Graph
        content = re.sub(
            r'<meta property="og:title" content="[^"]*">',
            f'<meta property="og:title" content="{meta["title"]}">',
            content
        )
        content = re.sub(
            r'<meta property="og:description" content="[^"]*">',
            f'<meta property="og:description" content="{meta["description"]}">',
            content
        )
        
        print(f"  Updated meta for: {filepath}")
    
    # 2. Add Schema.org (replace existing or add after <head>)
    # Remove existing schema blocks
    content = re.sub(r'<!-- Schema\.org.*?</script>\s*</script>', '', content, flags=re.DOTALL)
    
    # Add new schema after <head>
    content = content.replace('</head>', f'{WEBSITE_SCHEMA}\n    </head>')
    
    # 3. Add alt text to product images
    # Find product cards and extract names for alt text
    product_pattern = r'<h3[^>]*>([^<]+)</h3>.*?<img[^>]*src="([^"]*)"'
    matches = re.findall(product_pattern, content, re.DOTALL)
    
    for product_name, img_src in matches:
        product_name = product_name.strip()
        # Replace img src with alt added
        old_img = f'src="{img_src}"'
        alt_text = f'{product_name} - MechKeys Hub'
        new_img = f'alt="{alt_text}" src="{img_src}"'
        content = content.replace(old_img, new_img)
    
    print(f"  Added alt text to images: {filepath}")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  Completed: {filepath}")

def main():
    print("MechKeys Hub SEO Optimization")
    print("=" * 40)
    
    html_files = {
        'index.html': 'index.html',
        '60_percent.html': '60_percent.html',
        '65_percent.html': '65_percent.html',
        'tkl.html': 'tkl.html',
        'full-size.html': 'full-size.html',
        'switches.html': 'switches.html',
        'best-value.html': 'best-value.html'
    }
    
    for page_key, filepath in html_files.items():
        print(f"\nProcessing {filepath}...")
        process_html_file(filepath, page_key)
    
    print("\n" + "=" * 40)
    print("SEO Optimization Complete!")
    print("\nOptimizations applied:")
    print("  1. Meta title & description for all pages")
    print("  2. Schema.org structured data (WebSite, Organization, ItemList)")
    print("  3. Alt text for all product images")
    print("  4. Open Graph tags updated")
    print("  5. Keywords meta tag updated")

if __name__ == '__main__':
    main()
