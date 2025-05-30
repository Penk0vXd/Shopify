// Predictive Search functionality
class PredictiveSearch {
  constructor() {
    this.cachedResults = {};
    this.predictiveSearchResults = document.querySelector('#predictive-search');
    this.searchInput = document.querySelector('input[type="search"]');
    
    if (this.searchInput) {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    this.searchInput.addEventListener('input', this.debounce((event) => {
      const value = event.target.value.trim();
      
      if (value.length > 2) {
        this.getSearchResults(value);
      } else {
        this.close();
      }
    }, 300));

    this.searchInput.addEventListener('focus', (event) => {
      const value = event.target.value.trim();
      if (value.length > 2) {
        this.getSearchResults(value);
      }
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('[data-predictive-search]')) {
        this.close();
      }
    });
  }

  getSearchResults(searchTerm) {
    if (this.cachedResults[searchTerm]) {
      this.renderSearchResults(this.cachedResults[searchTerm]);
      return;
    }

    fetch(`${window.routes.predictive_search_url}?q=${encodeURIComponent(searchTerm)}&resources[type]=product&resources[limit]=6&section_id=predictive-search`)
      .then((response) => response.text())
      .then((searchResults) => {
        this.cachedResults[searchTerm] = searchResults;
        this.renderSearchResults(searchResults);
      })
      .catch((error) => {
        console.error('Predictive search error:', error);
      });
  }

  renderSearchResults(resultsMarkup) {
    if (this.predictiveSearchResults) {
      this.predictiveSearchResults.innerHTML = resultsMarkup;
      this.open();
    }
  }

  open() {
    if (this.predictiveSearchResults) {
      this.predictiveSearchResults.style.display = 'block';
    }
  }

  close() {
    if (this.predictiveSearchResults) {
      this.predictiveSearchResults.style.display = 'none';
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PredictiveSearch();
}); 