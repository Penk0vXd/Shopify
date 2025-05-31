/**
 * Car Parts Search Component
 * Interactive JavaScript for Bulgarian automotive e-commerce
 */

class CarPartsSearch {
  constructor() {
    this.init();
    this.bindEvents();
    this.setupAccessibility();
  }

  // Initialize the component
  init() {
    this.manualForm = document.getElementById('manual-search-form');
    this.vinForm = document.getElementById('vin-search-form');
    this.toggleToVin = document.getElementById('toggle-to-vin');
    this.toggleToManual = document.getElementById('toggle-to-manual');
    this.statusArea = document.getElementById('search-status');
    
    this.yearSelect = document.getElementById('car-year');
    this.brandSelect = document.getElementById('car-brand');
    this.modelSelect = document.getElementById('car-model');
    this.vinInput = document.getElementById('vin-input');
    
    this.searchForm = document.getElementById('car-search-form');
    this.vinSearchForm = document.getElementById('vin-search-form-element');
    
    this.currentMode = 'manual'; // 'manual' or 'vin'
    
    // Car data - In a real implementation, this would come from your backend
    this.carData = this.getCarData();
  }

  // Bind all event listeners
  bindEvents() {
    // Toggle buttons
    this.toggleToVin?.addEventListener('click', () => this.switchToVinMode());
    this.toggleToManual?.addEventListener('click', () => this.switchToManualMode());
    
    // Year selection
    this.yearSelect?.addEventListener('change', (e) => this.handleYearChange(e.target.value));
    
    // Brand selection
    this.brandSelect?.addEventListener('change', (e) => this.handleBrandChange(e.target.value));
    
    // VIN input validation
    this.vinInput?.addEventListener('input', (e) => this.validateVinInput(e.target.value));
    this.vinInput?.addEventListener('paste', (e) => {
      setTimeout(() => this.validateVinInput(e.target.value), 0);
    });
    
    // Form submissions
    this.searchForm?.addEventListener('submit', (e) => this.handleManualSearch(e));
    this.vinSearchForm?.addEventListener('submit', (e) => this.handleVinSearch(e));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
  }

  // Setup accessibility features
  setupAccessibility() {
    // Add ARIA labels
    this.yearSelect?.setAttribute('aria-describedby', 'year-help');
    this.brandSelect?.setAttribute('aria-describedby', 'brand-help');
    this.modelSelect?.setAttribute('aria-describedby', 'model-help');
    this.vinInput?.setAttribute('aria-describedby', 'vin-help');
    
    // Add live region for status updates
    if (this.statusArea) {
      this.statusArea.setAttribute('aria-live', 'polite');
      this.statusArea.setAttribute('aria-atomic', 'true');
    }
  }

  // Switch to VIN search mode
  switchToVinMode() {
    if (this.currentMode === 'vin') return;
    
    this.currentMode = 'vin';
    this.animateFormSwitch(this.manualForm, this.vinForm);
    this.clearStatus();
    
    // Focus VIN input after animation
    setTimeout(() => {
      this.vinInput?.focus();
    }, 400);
    
    this.announceToScreenReader('Превключено към VIN търсене');
  }

  // Switch to manual search mode
  switchToManualMode() {
    if (this.currentMode === 'manual') return;
    
    this.currentMode = 'manual';
    this.animateFormSwitch(this.vinForm, this.manualForm);
    this.clearStatus();
    this.clearVinInput();
    
    // Focus year select after animation
    setTimeout(() => {
      this.yearSelect?.focus();
    }, 400);
    
    this.announceToScreenReader('Превключено към ръчно търсене');
  }

  // Animate form switching
  animateFormSwitch(hideForm, showForm) {
    // Hide current form
    hideForm?.classList.add('car-parts-search__form-container--hidden');
    hideForm?.classList.remove('car-parts-search__form-container--visible');
    
    // Show new form after a short delay
    setTimeout(() => {
      showForm?.classList.remove('car-parts-search__form-container--hidden');
      showForm?.classList.add('car-parts-search__form-container--visible');
    }, 200);
  }

  // Handle year selection change
  handleYearChange(year) {
    this.clearStatus();
    
    if (!year) {
      this.resetBrandSelect();
      this.resetModelSelect();
      return;
    }
    
    this.populateBrands(year);
    this.resetModelSelect();
    this.announceToScreenReader(`Избрана година ${year}`);
  }

  // Handle brand selection change
  handleBrandChange(brand) {
    this.clearStatus();
    
    if (!brand) {
      this.resetModelSelect();
      return;
    }
    
    const year = this.yearSelect?.value;
    this.populateModels(year, brand);
    this.announceToScreenReader(`Избрана марка ${brand}`);
  }

  // Populate brands based on selected year
  populateBrands(year) {
    const brands = this.carData[year] || {};
    const brandSelect = this.brandSelect;
    
    if (!brandSelect) return;
    
    // Clear existing options
    brandSelect.innerHTML = '<option value="">Избери марка</option>';
    
    // Add brands
    Object.keys(brands).sort().forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      brandSelect.appendChild(option);
    });
    
    // Enable brand select
    brandSelect.disabled = false;
    brandSelect.setAttribute('aria-label', `Избери марка за ${year} година`);
  }

  // Populate models based on selected year and brand
  populateModels(year, brand) {
    const models = this.carData[year]?.[brand] || [];
    const modelSelect = this.modelSelect;
    
    if (!modelSelect) return;
    
    // Clear existing options
    modelSelect.innerHTML = '<option value="">Избери модел</option>';
    
    // Add models
    models.sort().forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
    
    // Enable model select
    modelSelect.disabled = false;
    modelSelect.setAttribute('aria-label', `Избери модел за ${brand} ${year}`);
  }

  // Reset brand select
  resetBrandSelect() {
    if (this.brandSelect) {
      this.brandSelect.innerHTML = '<option value="">Първо избери година</option>';
      this.brandSelect.disabled = true;
    }
  }

  // Reset model select
  resetModelSelect() {
    if (this.modelSelect) {
      this.modelSelect.innerHTML = '<option value="">Първо избери марка</option>';
      this.modelSelect.disabled = true;
    }
  }

  // Validate VIN input
  validateVinInput(vin) {
    const vinInput = this.vinInput;
    if (!vinInput) return;
    
    // Remove any non-alphanumeric characters and convert to uppercase
    const cleanVin = vin.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    // Update input value
    if (vinInput.value !== cleanVin) {
      vinInput.value = cleanVin;
    }
    
    // Validate length and characters
    const isValidLength = cleanVin.length === 17;
    const hasValidChars = /^[A-HJ-NPR-Z0-9]{17}$/.test(cleanVin); // Excludes I, O, Q
    
    // Update visual state
    vinInput.classList.remove('error', 'valid');
    
    if (cleanVin.length === 0) {
      // Empty state
      this.clearStatus();
    } else if (cleanVin.length < 17) {
      // Incomplete
      vinInput.classList.add('error');
      this.showStatus(`VIN номерът трябва да е 17 символа (въведени: ${cleanVin.length})`, 'warning');
    } else if (!hasValidChars) {
      // Invalid characters
      vinInput.classList.add('error');
      this.showStatus('VIN номерът съдържа невалидни символи', 'error');
    } else {
      // Valid
      vinInput.classList.add('valid');
      this.showStatus('VIN номерът е валиден', 'success');
    }
    
    return isValidLength && hasValidChars;
  }

  // Handle manual search form submission
  handleManualSearch(e) {
    e.preventDefault();
    
    const year = this.yearSelect?.value;
    const brand = this.brandSelect?.value;
    const model = this.modelSelect?.value;
    
    // Validate form
    if (!year || !brand || !model) {
      this.showStatus('Моля, попълнете всички полета', 'error');
      this.focusFirstEmptyField();
      return;
    }
    
    // Show loading state
    this.setLoadingState(true);
    this.showStatus('Търсене на части...', 'info');
    
    // Build search query
    const searchQuery = `year:${year} brand:${brand} model:${model}`;
    
    // Simulate search (in real implementation, this would be an actual search)
    setTimeout(() => {
      this.performSearch(searchQuery);
    }, 1000);
  }

  // Handle VIN search form submission
  handleVinSearch(e) {
    e.preventDefault();
    
    const vin = this.vinInput?.value;
    
    if (!this.validateVinInput(vin)) {
      this.showStatus('Моля, въведете валиден VIN номер', 'error');
      this.vinInput?.focus();
      return;
    }
    
    // Show loading state
    this.setLoadingState(true);
    this.showStatus('Проверка на VIN номера...', 'info');
    
    // Simulate VIN lookup (in real implementation, this would call a VIN decoding API)
    setTimeout(() => {
      this.performVinLookup(vin);
    }, 1500);
  }

  // Focus first empty field in manual search
  focusFirstEmptyField() {
    if (!this.yearSelect?.value) {
      this.yearSelect?.focus();
    } else if (!this.brandSelect?.value) {
      this.brandSelect?.focus();
    } else if (!this.modelSelect?.value) {
      this.modelSelect?.focus();
    }
  }

  // Perform search (placeholder for actual implementation)
  performSearch(query) {
    this.setLoadingState(false);
    
    // In a real implementation, you would redirect to search results or update the page
    const searchUrl = `/search?q=${encodeURIComponent(query)}&type=product`;
    
    this.showStatus('Пренасочване към резултатите...', 'success');
    
    setTimeout(() => {
      window.location.href = searchUrl;
    }, 1000);
  }

  // Perform VIN lookup (placeholder for actual implementation)
  performVinLookup(vin) {
    this.setLoadingState(false);
    
    // Simulate VIN decoding result
    const mockResult = {
      year: '2018',
      brand: 'BMW',
      model: '320d',
      engine: '2.0 Diesel'
    };
    
    this.showStatus(`Открит автомобил: ${mockResult.year} ${mockResult.brand} ${mockResult.model}`, 'success');
    
    // In a real implementation, you would either:
    // 1. Redirect to search results for this specific vehicle
    // 2. Auto-populate the manual form and switch to it
    // 3. Show a confirmation dialog
    
    setTimeout(() => {
      const searchQuery = `year:${mockResult.year} brand:${mockResult.brand} model:${mockResult.model}`;
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery)}&type=product&vin=${vin}`;
      window.location.href = searchUrl;
    }, 2000);
  }

  // Set loading state for buttons
  setLoadingState(isLoading) {
    const buttons = document.querySelectorAll('.car-parts-search__submit-btn');
    buttons.forEach(btn => {
      if (isLoading) {
        btn.classList.add('loading');
        btn.disabled = true;
      } else {
        btn.classList.remove('loading');
        btn.disabled = false;
      }
    });
  }

  // Show status message
  showStatus(message, type = 'info') {
    if (!this.statusArea) return;
    
    this.statusArea.textContent = message;
    this.statusArea.className = `car-parts-search__status ${type}`;
    this.statusArea.style.display = 'block';
    
    // Announce to screen readers
    this.announceToScreenReader(message);
  }

  // Clear status message
  clearStatus() {
    if (this.statusArea) {
      this.statusArea.textContent = '';
      this.statusArea.className = 'car-parts-search__status';
      this.statusArea.style.display = 'none';
    }
  }

  // Clear VIN input
  clearVinInput() {
    if (this.vinInput) {
      this.vinInput.value = '';
      this.vinInput.classList.remove('error', 'valid');
    }
  }

  // Handle keyboard navigation
  handleKeyboardNavigation(e) {
    // ESC key to clear status or switch back to manual mode
    if (e.key === 'Escape') {
      if (this.statusArea?.textContent) {
        this.clearStatus();
      } else if (this.currentMode === 'vin') {
        this.switchToManualMode();
      }
    }
    
    // Alt + V to switch to VIN mode
    if (e.altKey && e.key.toLowerCase() === 'v' && this.currentMode === 'manual') {
      e.preventDefault();
      this.switchToVinMode();
    }
    
    // Alt + M to switch to manual mode
    if (e.altKey && e.key.toLowerCase() === 'm' && this.currentMode === 'vin') {
      e.preventDefault();
      this.switchToManualMode();
    }
  }

  // Announce message to screen readers
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Get car data (placeholder - in real implementation, this would come from your backend)
  getCarData() {
    return {
      '2024': {
        'BMW': ['320d', '330i', 'X3', 'X5', 'Series 1', 'Series 3', 'Series 5'],
        'Mercedes': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class'],
        'Audi': ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7', 'e-tron'],
        'Volkswagen': ['Golf', 'Passat', 'Tiguan', 'Touran', 'Polo'],
        'Toyota': ['Corolla', 'Camry', 'RAV4', 'Prius', 'Yaris'],
        'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V'],
        'Ford': ['Focus', 'Fiesta', 'Kuga', 'Mondeo'],
        'Opel': ['Astra', 'Corsa', 'Insignia', 'Crossland']
      },
      '2023': {
        'BMW': ['320d', '330i', 'X3', 'X5', 'Series 1', 'Series 3', 'Series 5'],
        'Mercedes': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class'],
        'Audi': ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
        'Volkswagen': ['Golf', 'Passat', 'Tiguan', 'Touran', 'Polo'],
        'Toyota': ['Corolla', 'Camry', 'RAV4', 'Prius', 'Yaris'],
        'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V'],
        'Ford': ['Focus', 'Fiesta', 'Kuga', 'Mondeo'],
        'Opel': ['Astra', 'Corsa', 'Insignia', 'Crossland']
      }
      // More years would be added here...
    };
  }
}

// Initialize the component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CarPartsSearch();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CarPartsSearch;
} 