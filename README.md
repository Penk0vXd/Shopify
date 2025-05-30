# Shopify Auto Parts Store - Bulgarian Market

Professional Shopify store setup for automotive parts with white/red theme and Bulgarian localization.

## 🚗 Features

- **Multi-brand support**: Audi, BMW, Mercedes, VW, Ford, Toyota, Honda, Nissan, etc.
- **Year/Make/Model search**: Advanced filtering system for finding exact parts
- **Bulgarian localization**: Full translation and currency support
- **White & Red theme**: Clean, professional design (#FFFFFF base, #D32F2F accents)
- **Mobile optimized**: Responsive design for all devices
- **Trust badges**: Fast delivery, warranty, original parts indicators

## 📁 Project Structure

```
/
├── auto-parts-store-setup.md    # Setup guide and configuration
├── download-car-logos.py        # Script to download brand logos
├── shopify-theme-custom.css     # Custom CSS for white/red theme
├── homepage-sections.liquid     # Homepage template sections
├── bg.json                      # Bulgarian translations
├── settings_schema.json         # Theme customization settings
└── car_logos/                   # Downloaded brand logos (after running script)
```

## 🛠 Setup Instructions

### 1. Theme Installation

**Recommended Theme**: Turbo by Out of the Sandbox ($350)
- Best performance for large catalogs
- Advanced filtering capabilities
- Collection-focused design

**Alternative**: Dawn (Free) with customizations

### 2. Download Brand Logos

```bash
# Install dependencies
pip install requests pillow

# Run the logo downloader
python download-car-logos.py
```

This will download and optimize logos for 15+ car brands in multiple sizes.

### 3. Shopify Apps

Install these essential apps:

1. **Year Make Model Search by Sparx** ($29.99/month)
   - Essential for auto parts filtering
   
2. **Boost Product Filter & Search** ($14/month)
   - Advanced filtering by specifications
   
3. **Langify** ($17.50/month)
   - Bulgarian translation management

### 4. Collection Structure

Create collections following this hierarchy:

```
/collections/
├── audi/
│   ├── a3/
│   ├── a4/
│   └── ...
├── bmw/
│   ├── series-3/
│   ├── series-5/
│   └── ...
└── [other brands]
```

### 5. Apply Custom Styles

1. Upload `shopify-theme-custom.css` to theme assets
2. Include in theme.liquid: `{{ 'shopify-theme-custom.css' | asset_url | stylesheet_tag }}`
3. Upload logo images to theme assets

### 6. Implement Homepage

Use the code from `homepage-sections.liquid` to create:
- Hero section with YMM search
- Brand grid with logos
- Trust badges
- Category showcase

### 7. Bulgarian Localization

1. Upload `bg.json` to `/locales/bg.json`
2. Set Bulgarian as default language in Shopify admin
3. Configure currency to BGN (лв.)

## 🎨 Design System

### Colors
- **Primary**: #D32F2F (vibrant red)
- **Primary Dark**: #B71C1C (hover states)
- **Background**: #FFFFFF (pure white)
- **Surface**: #F5F5F5 (light gray)
- **Text**: #212121 (dark gray)
- **Text Light**: #757575 (medium gray)

### Typography
- **Headings**: Montserrat (600 weight)
- **Body**: Inter (400 weight)
- Both support Cyrillic characters

### Spacing
- Base unit: 8px
- Consistent spacing using CSS variables

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly buttons (min 44px)
- Optimized images (lazy loading)
- Sticky header for easy navigation

## 🔍 SEO Optimization

- Structured data for products
- Meta tags in Bulgarian
- Clean URL structure: `/collections/bmw/series-3`
- Image alt texts

## 💳 Payment & Shipping

Configure for Bulgarian market:
- Econt & Speedy shipping integration
- Free shipping over 100 лв.
- Cash on delivery option
- Bank transfer support

## 🚀 Launch Checklist

- [ ] Install and configure theme
- [ ] Upload all brand logos
- [ ] Create collection structure
- [ ] Import product catalog
- [ ] Configure shipping zones
- [ ] Set up payment methods
- [ ] Test checkout in Bulgarian
- [ ] Configure email templates
- [ ] Set up Google Analytics
- [ ] Submit sitemap

## 📞 Support Features

Add to theme:
- Live chat integration
- Phone number in header
- WhatsApp/Viber buttons
- FAQ section

## 🔧 Maintenance

Regular tasks:
- Update product availability
- Add new car models
- Optimize images
- Monitor site speed
- Update translations

---

Built with ❤️ for the Bulgarian automotive market 