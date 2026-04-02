/**
 * Update HTML files with new product data
 */
const fs = require('fs');

const inlineData = fs.readFileSync('inline-products.js', 'utf-8');
const htmlFiles = ['index.html', '60_percent.html', '65_percent.html', 'tkl.html', 'full-size.html', 'best-value.html'];

for (const file of htmlFiles) {
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf-8');
    
    // 替换 <script>const topProducts = [...]</script> 部分
    const oldPattern = /<script>const topProducts = \[[\s\S]*?\];<\/script>/;
    const newScript = `<script>\n${inlineData}\n</script>`;
    
    content = content.replace(oldPattern, newScript);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
}

console.log('Done!');
