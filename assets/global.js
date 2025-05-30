// Global JavaScript for Auto Parts Store Theme

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
    });
  }

  // Initialize cart drawer
  const cartButtons = document.querySelectorAll('[data-cart-toggle]');
  const cartDrawer = document.querySelector('#cart-drawer');
  
  cartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      if (cartDrawer) {
        cartDrawer.classList.toggle('open');
      }
    });
  });

  // Close cart drawer when clicking outside
  document.addEventListener('click', function(e) {
    if (cartDrawer && !cartDrawer.contains(e.target) && !e.target.closest('[data-cart-toggle]')) {
      cartDrawer.classList.remove('open');
    }
  });

  // Initialize search functionality
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      const searchInput = this.querySelector('input[name="q"]');
      if (searchInput && !searchInput.value.trim()) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  console.log('Auto Parts Store theme initialized');
}); 