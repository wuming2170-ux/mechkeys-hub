/**
 * Language switching functionality
 */

const translations = {
    en: {
        // Header
        title: "MechKeys Hub",
        subtitle: "Mechanical Keyboards Guide",
        
        // Navigation
        home: "Home",
        keyboards_60: "60% Keyboards",
        keyboards_65: "65% Keyboards",
        keyboards_tkl: "TKL",
        keyboards_full: "Full Size",
        switches: "Switches",
        best_value: "Best Value",
        
        // Hero
        hero_title: "Find Your Perfect Mechanical Keyboard",
        hero_subtitle: "Expert reviews, in-depth comparisons, and comprehensive buying guides for the best mechanical keyboards of 2025.",
        best_keyboards: "Best Keyboards 2025",
        switch_guide: "Switch Guide",
        
        // Stats
        keyboards_reviewed: "Keyboards Reviewed",
        switch_types: "Switch Types Tested",
        brands_covered: "Brands Covered",
        starting_price: "Starting Price",
        
        // Categories
        category_60_title: "60% Keyboards",
        category_60_desc: "Compact & Portable",
        category_65_title: "65% Keyboards",
        category_65_desc: "Arrow Keys Included",
        category_tkl_title: "TKL Keyboards",
        category_tkl_desc: "Tenkeyless",
        category_full_title: "Full Size",
        category_full_desc: "With Numpad",
        category_value_title: "Best Value",
        category_value_desc: "Top Picks Under $150",
        
        // Section titles
        best_mechanical_2025: "Best Mechanical Keyboards 2025",
        best_mechanical_desc: "Our top-rated mechanical keyboards based on extensive testing, performance, and value",
        
        // Product labels
        budget_pick: "Budget Pick",
        best_value: "Best Value",
        premium: "Premium",
        
        // Switch guide
        switch_guide_title: "Blue vs Brown vs Red: Find Your Switch",
        switch_guide_desc: "The feel of your keyboard matters. Learn the difference between switch types.",
        learn_more: "Learn more →",
        
        // Trust section
        trust_title: "Why Trust MechKeys Hub?",
        trust_testing: "Hands-On Testing",
        trust_testing_desc: "Every keyboard is tested for at least 2 weeks with daily use before review.",
        trust_unbiased: "Unbiased Reviews",
        trust_unbiased_desc: "No paid reviews. We purchase all products independently and give honest opinions.",
        trust_updated: "Updated Monthly",
        trust_updated_desc: "Prices and availability checked daily. Rankings updated when better options launch.",
        
        // Footer
        footer_categories: "Categories",
        footer_brands: "Popular Brands",
        footer_resources: "Resources",
        footer_disclosure: "Affiliate Disclosure",
        footer_copyright: "MechKeys Hub is a participant in the Amazon Services LLC Associates Program. We earn commissions from qualifying purchases at no extra cost to you.",
        footer_rights: "© 2025 MechKeys Hub. All rights reserved.",
        
        // Product card
        check_price: "Check Price →",
        affiliate_notice: "*Affiliate link - we may earn a commission",
        show_more: "Show more ▼",
        show_less: "Show less ▲",
        
        // Filters
        all_switches: "All Switches",
        linear_red: "Linear (Red)",
        tactile_brown: "Tactile (Brown)",
        clicky_blue: "Clicky (Blue)",
        
        // Best value page
        budget_picks: "BUDGET PICKS",
        budget_title: "Best Value Keyboards Under $100",
        budget_desc: "Great mechanical keyboards don't have to break the bank. These budget picks deliver excellent quality without the premium price.",
        price_comparison: "Price Comparison",
        budget_guide: "Budget Buying Guide",
        what_look_for: "What to Look For",
        what_avoid: "What to Avoid",
        
        // No products
        no_products: "No keyboards found with this filter.",
        view_all: "View all keyboards →"
    },
    zh: {
        // Header
        title: "机械键盘之家",
        subtitle: "机械键盘选购指南",
        
        // Navigation
        home: "首页",
        keyboards_60: "60%键盘",
        keyboards_65: "65%键盘",
        keyboards_tkl: "TKL键盘",
        keyboards_full: "全尺寸键盘",
        switches: "轴体",
        best_value: "超值精选",
        
        // Hero
        hero_title: "找到最适合你的机械键盘",
        hero_subtitle: "专业评测、深度对比、2025年最全面的机械键盘购买指南",
        best_keyboards: "2025最佳键盘",
        switch_guide: "轴体指南",
        
        // Stats
        keyboards_reviewed: "款键盘评测",
        switch_types: "种轴体测试",
        brands_covered: "个品牌覆盖",
        starting_price: "起售价",
        
        // Categories
        category_60_title: "60% 键盘",
        category_60_desc: "紧凑便携",
        category_65_title: "65% 键盘",
        category_65_desc: "带方向键",
        category_tkl_title: "TKL 键盘",
        category_tkl_desc: "无数字键盘",
        category_full_title: "全尺寸键盘",
        category_full_desc: "带数字键盘",
        category_value_title: "超值精选",
        category_value_desc: "100美元以下最佳选择",
        
        // Section titles
        best_mechanical_2025: "2025年最佳机械键盘",
        best_mechanical_desc: "基于深度测试、性能和性价比的顶级机械键盘评分",
        
        // Product labels
        budget_pick: "超值之选",
        best_value: "性价比最高",
        premium: "高端旗舰",
        
        // Switch guide
        switch_guide_title: "蓝轴 vs 棕轴 vs 红轴：找到适合你的轴",
        switch_guide_desc: "键盘手感很重要。了解不同轴类型的区别。",
        learn_more: "了解更多 →",
        
        // Trust section
        trust_title: "为什么选择 MechKeys Hub?",
        trust_testing: "真机实测",
        trust_testing_desc: "每款键盘都经过至少2周的日常使用测试后才进行评测。",
        trust_unbiased: "客观评测",
        trust_unbiased_desc: "不接受付费评测。我们独立购买所有产品，给出真实评价。",
        trust_updated: "每月更新",
        trust_updated_desc: "每日更新价格和库存。当有更好的产品推出时及时更新排名。",
        
        // Footer
        footer_categories: "分类",
        footer_brands: "热门品牌",
        footer_resources: "资源",
        footer_disclosure: " affiliate disclosure",
        footer_copyright: "MechKeys Hub 是 Amazon Services LLC Associates Program 的参与者。我们通过合格购买获得佣金，对您无需额外费用。",
        footer_rights: "© 2025 MechKeys Hub. 保留所有权利。",
        
        // Product card
        check_price: "查看价格 →",
        affiliate_notice: "* affiliate 链接 - 我们可能获得佣金",
        show_more: "展开更多 ▼",
        show_less: "收起 ▲",
        
        // Filters
        all_switches: "所有轴体",
        linear_red: "线性轴（红轴）",
        tactile_brown: "段落轴（棕轴）",
        clicky_blue: "点击轴（蓝轴）",
        
        // Best value page
        budget_picks: "超值之选",
        budget_title: "100美元以下最佳键盘",
        budget_desc: "好的机械键盘不一定要花大价钱。这些超值选择以实惠的价格提供出色的品质。",
        price_comparison: "价格对比",
        budget_guide: "购买指南",
        what_look_for: "选购要点",
        what_avoid: "避免踩坑",
        
        // No products
        no_products: "未找到符合条件的键盘",
        view_all: "查看全部键盘 →"
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
    updateLangButtons();
}

function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

function applyTranslations() {
    // Apply to elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = t(key);
        } else {
            el.textContent = t(key);
        }
    });
    
    // Apply to elements with data-i18n-html attribute (for HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        el.innerHTML = t(key);
    });
    
    // Apply to elements with data-i18n-title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.title = t(key);
    });
    
    // Update document title
    document.title = t('title') + ' - ' + t('subtitle');
    
    // Update html lang attribute
    document.documentElement.lang = currentLang;
}

function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        if (lang === currentLang) {
            btn.classList.add('bg-indigo-600');
            btn.classList.remove('bg-slate-700', 'hover:bg-slate-600');
        } else {
            btn.classList.remove('bg-indigo-600');
            btn.classList.add('bg-slate-700', 'hover:bg-slate-600');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    updateLangButtons();
});
