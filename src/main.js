// Theme Management
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme, animated = false) {
  if (animated) {
    applyThemeWithRipple(theme);
  } else {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem(THEME_KEY, theme);
  }
}

function applyThemeWithRipple(theme) {
  const rippleOverlay = document.getElementById('ripple-overlay');
  if (!rippleOverlay) return;
  
  // Set the background color to the incoming theme's background
  const newBgColor = theme === 'light' ? '#f8f8f8' : '#0a0a0a';
  rippleOverlay.style.backgroundColor = newBgColor;
  
  // Trigger the ripple animation
  rippleOverlay.classList.add('animating');
  
  // Switch the actual theme at 750ms (middle of animation when screen is blurred)
  setTimeout(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, 750);
  
  // Clean up animation class after completion
  setTimeout(() => {
    rippleOverlay.classList.remove('animating');
    rippleOverlay.style.backgroundColor = '';
  }, 1500);
}

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
}

function toggleTheme() {
  const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  const newTheme = current === 'light' ? 'dark' : 'light';
  applyTheme(newTheme, true);
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  // Check if splash screen exists
  const splashScreen = document.getElementById('splash');
  
  if (splashScreen) {
    // Trigger splash screen zoom-through effect after 2.5 seconds (only on index page)
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 2500);
  } else {
    // No splash screen (blog pages), enable scrolling immediately
    document.body.classList.add('loaded');
  }
  
  // Set theme
  applyTheme(getPreferredTheme());

  // Theme toggle - handle both desktop and mobile buttons
  const themeBtnDesktop = document.getElementById('theme-toggle-desktop');
  const themeBtnMobile = document.getElementById('theme-toggle');
  
  if (themeBtnDesktop) themeBtnDesktop.addEventListener('click', toggleTheme);
  if (themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

  // Hamburger menu toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Show loading state
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Show success notification
          const notification = document.getElementById('form-notification');
          notification.classList.add('show');
          
          // Reset form
          contactForm.reset();
          
          // Hide notification after 5 seconds
          setTimeout(() => {
            notification.classList.remove('show');
          }, 5000);
        } else {
          alert('Oops! There was a problem submitting your form. Please try again.');
        }
      } catch (error) {
        alert('Oops! There was a problem submitting your form. Please try again.');
      } finally {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }

  // Handle share buttons (Copy link only)
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.dataset.platform;
      
      if (platform === 'copy') {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2000);
        });
      }
    });
  });
});
