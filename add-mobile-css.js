const fs = require('fs');
const path = require('path');

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
            .container { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
            .grid { grid-template-columns: 1fr !important; }
            .filters { flex-direction: column !important; gap: 0.5rem !important; }
            .filter-btn { width: 100% !important; text-align: center !important; }
        }`;

// Get all HTML files
const allFiles = [
    ...fs.readdirSync(__dirname).filter(f => f.endsWith('.html')),
    ...fs.readdirSync(path.join(__dirname, 'brand')).filter(f => f.endsWith('.html')).map(f => 'brand/' + f)
].filter(f => f !== 'googlefd96328f7265b5e9.html');

let updated = 0;

allFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has @media queries - if so, skip
    if (content.includes('@media (max-width')) {
        console.log(`SKIP: ${file} (has @media)`);
        return;
    }
    
    // Add mobile CSS before </style>
    if (content.includes('</style>')) {
        content = content.replace('</style>', mobileCSS + '\n    </style>');
        updated++;
        fs.writeFileSync(filePath, content);
        console.log(`ADDED: ${file}`);
    } else {
        console.log(`NO STYLE: ${file}`);
    }
});

console.log(`\nUpdated ${updated} files with mobile CSS`);
