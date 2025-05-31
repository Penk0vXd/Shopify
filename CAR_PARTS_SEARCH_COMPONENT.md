# 🚗 Car Parts Search Component

A professional, responsive search component for Bulgarian automotive e-commerce built for Shopify stores. Features both manual search (Year → Brand → Model) and VIN-based search with smooth animations and full accessibility support.

## ✨ Features

### 🎯 Core Functionality
- **Dual Search Modes**: Manual vehicle selection and VIN number lookup
- **Dynamic Dropdowns**: Year selection populates brands, brand selection populates models
- **Real-time VIN Validation**: 17-character validation with visual feedback
- **Smart Form Switching**: Smooth animated transitions between search modes
- **Search Integration**: Ready for Shopify search API integration

### 🎨 Design & UX
- **Mobile-First Responsive**: Optimized for all device sizes
- **Card-Style Layout**: Modern design with shadows and rounded corners
- **Bulgarian Language**: Complete localization for Bulgarian market
- **Red & White Theme**: Matches automotive e-commerce aesthetic
- **Loading States**: Visual feedback during search operations
- **Status Messages**: Clear error, warning, and success notifications

### ♿ Accessibility
- **Screen Reader Support**: Full ARIA labels and live regions
- **Keyboard Navigation**: Complete keyboard accessibility with shortcuts
- **Focus Management**: Proper focus handling and visual indicators
- **High Contrast Support**: Adapts to system accessibility preferences
- **Reduced Motion**: Respects user motion preferences

## 📁 Files Created

```
sections/car-parts-search.liquid    # Main Shopify section
assets/car-parts-search.css         # Comprehensive styling
assets/car-parts-search.js          # Interactive functionality
```

## 🚀 Quick Implementation

### 1. Add to Your Theme
The component is ready to use! Simply add it to any page:

**In the Shopify admin:**
1. Go to Online Store → Themes → Customize
2. Add a new section
3. Select "Търсачка за части" (Car Parts Search)

**Or in code:**
```liquid
{% section 'car-parts-search' %}
```

### 2. Customize Settings
Available section settings:
- **Title**: Main heading text
- **Subtitle**: Descriptive text below title
- **Padding**: Top/bottom spacing control

## 🛠️ Technical Details

### Form Modes

#### Manual Search Mode (Default)
```liquid
<!-- Year → Brand → Model cascade -->
<select id="car-year" name="year" required>
<select id="car-brand" name="brand" required disabled>
<select id="car-model" name="model" required disabled>
```

#### VIN Search Mode
```liquid
<!-- Single VIN input with validation -->
<input type="text" id="vin-input" name="vin" maxlength="17">
```

### Dynamic Data Population

The component includes sample car data for 2023-2024. **For production use**, replace the `getCarData()` method in `car-parts-search.js` with your actual vehicle database:

```javascript
// Replace this method with your backend API call
getCarData() {
  // Current: Static sample data
  // Production: Fetch from your vehicle database
  return fetch('/api/vehicles')
    .then(response => response.json());
}
```

### Search Integration

#### Manual Search
Submits to Shopify search with structured query:
```javascript
const searchQuery = `year:${year} brand:${brand} model:${model}`;
const searchUrl = `/search?q=${encodeURIComponent(searchQuery)}&type=product`;
```

#### VIN Search
Includes VIN parameter for specialized handling:
```javascript
const searchUrl = `/search?q=${encodeURIComponent(searchQuery)}&type=product&vin=${vin}`;
```

## 🎨 Customization Guide

### Color Scheme
The component uses CSS custom properties from your existing theme:
- `--color-primary` (#D32F2F) - Main red color
- `--color-primary-dark` (#B71C1C) - Darker red for hover states  
- `--color-primary-light` (#EF5350) - Lighter red for accents
- `--color-background` (#FFFFFF) - White background
- `--color-text` (#212121) - Main text color

### Typography
Inherits from existing theme:
- `--font-heading` (Montserrat) - Headers and buttons
- `--font-body` (Inter) - Form fields and body text

### Responsive Breakpoints
```css
/* Mobile First (default) */
@media (min-width: 576px) { /* Tablet adjustments */ }
@media (min-width: 768px) { /* Desktop layout */ }
@media (min-width: 992px) { /* Large desktop */ }
```

### Animation Control
Disable animations for users who prefer reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  /* All transitions disabled */
}
```

## 🔧 API Integration

### VIN Decoding Service
For production VIN lookup, integrate with a VIN decoding API:

```javascript
async performVinLookup(vin) {
  try {
    const response = await fetch(`/api/vin-decode/${vin}`);
    const vehicleData = await response.json();
    
    if (vehicleData.success) {
      // Use decoded vehicle information
      this.showStatus(`Found: ${vehicleData.year} ${vehicleData.make} ${vehicleData.model}`, 'success');
      // Redirect to search results or auto-populate form
    } else {
      this.showStatus('VIN не може да бъде декодиран', 'error');
    }
  } catch (error) {
    this.showStatus('Грешка при проверка на VIN', 'error');
  }
}
```

### Vehicle Database Integration
Connect to your parts catalog:

```javascript
async getCarData() {
  try {
    const response = await fetch('/api/vehicles/hierarchy');
    return await response.json();
  } catch (error) {
    console.error('Failed to load vehicle data:', error);
    return this.getFallbackData(); // Use static fallback
  }
}
```

## ⌨️ Keyboard Shortcuts

- **Alt + V**: Switch to VIN search mode
- **Alt + M**: Switch to manual search mode  
- **Escape**: Clear status messages or return to manual mode
- **Tab/Shift+Tab**: Navigate through form fields
- **Enter**: Submit active form

## 🧪 Testing Checklist

### ✅ Functionality
- [ ] Year selection enables brand dropdown
- [ ] Brand selection enables model dropdown  
- [ ] VIN validation works (17 characters, no I/O/Q)
- [ ] Form switching animates smoothly
- [ ] Search redirects to correct URL
- [ ] Loading states display properly

### ✅ Responsive Design
- [ ] Mobile: Fields stack vertically
- [ ] Tablet: Improved spacing and layout
- [ ] Desktop: Horizontal form layout
- [ ] Touch targets are 44px minimum

### ✅ Accessibility  
- [ ] Screen reader announces all changes
- [ ] Keyboard navigation works completely
- [ ] Focus indicators are visible
- [ ] Error messages are announced
- [ ] Form validation is accessible

### ✅ Browser Support
- [ ] Chrome/Edge (modern)
- [ ] Firefox (modern)  
- [ ] Safari (modern)
- [ ] Mobile browsers

## 🔄 Future Enhancements

### Phase 2 Features
1. **Auto-complete Search**: Type-ahead for vehicle models
2. **Recent Searches**: Save user's recent vehicle selections
3. **Part Category Filter**: Pre-filter by part type (brakes, engine, etc.)
4. **Barcode Scanner**: Mobile camera integration for part scanning

### Performance Optimizations
1. **Lazy Loading**: Load vehicle data on demand
2. **Caching**: Browser cache for vehicle hierarchy
3. **Progressive Enhancement**: Works without JavaScript
4. **Service Worker**: Offline functionality

## 📞 Support & Maintenance

### Common Issues
1. **VIN not validating**: Check for proper 17-character format (no I, O, Q)
2. **Brands not loading**: Verify vehicle data structure matches expected format
3. **Styling conflicts**: Check CSS specificity and custom property inheritance

### Updates Required
- **Vehicle Data**: Update annually with new model years
- **Brands/Models**: Add new manufacturers and models as needed
- **Translations**: Update Bulgarian text if needed

---

## 💡 Implementation Example

```html
<!-- Example of using the component in a template -->
<main class="main-content">
  <section class="hero-banner">...</section>
  
  <!-- Car Parts Search Component -->
  {% section 'car-parts-search' %}
  
  <section class="featured-products">...</section>
</main>
```

Ready to revolutionize your Bulgarian car parts e-commerce experience! 🚀🇧🇬 