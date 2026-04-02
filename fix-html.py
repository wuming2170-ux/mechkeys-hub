#!/usr/bin/env python3
import re
import os

# Read the new product data
with open('inline-products.js', 'r') as f:
    new_data = f.read()

# For each HTML file
for html_file in ['index.html', '60_percent.html', '65_percent.html', 'tkl.html', 'full-size.html', 'best-value.html']:
    if not os.path.exists(html_file):
        continue
    
    with open(html_file, 'r') as f:
        content = f.read()
    
    # Find and replace the entire <script> block containing topProducts
    pattern = r'<script>\s*const topProducts = \[[\s\S]*?\];\s*</script>'
    replacement = f'<script>\n{new_data}\n</script>'
    
    new_content = re.sub(pattern, replacement, content)
    
    with open(html_file, 'w') as f:
        f.write(new_content)
    
    print(f'Updated {html_file}')

print('Done!')
