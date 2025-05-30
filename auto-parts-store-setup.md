# Shopify Auto Parts Store Setup Guide

## 1. Theme Recommendation

**Primary Choice: Turbo Theme by Out of the Sandbox**
- Price: $350
- Why: Best performance, advanced filtering, collection-focused design
- Alternative: Dawn (free) with heavy customization

## 2. Collection Structure

```
/collections/
├── audi/
│   ├── a3/
│   ├── a4/
│   ├── a6/
│   └── q5/
├── bmw/
│   ├── series-3/
│   ├── series-5/
│   └── x5/
├── vw/
│   ├── golf/
│   ├── passat/
│   └── tiguan/
└── mercedes/
    ├── c-class/
    ├── e-class/
    └── glc/
```

## 3. Essential Shopify Apps

1. **Year Make Model Search by Sparx**
   - Price: $29.99/month
   - Perfect for auto parts filtering

2. **Boost Product Filter & Search**
   - Price: $14/month
   - Advanced filtering by specifications

3. **Langify** 
   - Price: $17.50/month
   - Bulgarian translation management

## 4. Color Scheme & Typography

```css
:root {
  --color-primary: #D32F2F;      /* Main red */
  --color-primary-dark: #B71C1C; /* Hover red */
  --color-background: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-text: #212121;
  --color-text-light: #757575;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

## 5. Trust Badges HTML

```html
<div class="trust-badges">
  <div class="badge">
    <svg><!-- truck icon --></svg>
    <span>Доставка до 24ч</span>
  </div>
  <div class="badge">
    <svg><!-- shield icon --></svg>
    <span>2 години гаранция</span>
  </div>
  <div class="badge">
    <svg><!-- certificate icon --></svg>
    <span>100% оригинални части</span>
  </div>
</div>
``` 