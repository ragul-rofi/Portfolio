// Theme Management
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme, animated = false) {
  if (animated) {
    applyThemeWithPaintEffect(theme);
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

function applyThemeWithPaintEffect(theme) {
  // Use custom SVG files for paint drip effect
  const svgPath = theme === 'light' ? '../assests/White-paint-drop.svg' : '../assests/Black-paint-drop.svg';
  
  // Create main paint overlay with custom wavy dripping edge
  const overlay = document.createElement('div');
  overlay.className = `theme-paint-overlay ${theme === 'light' ? 'light-paint' : 'dark-paint'}`;
  
  // Load and use the custom SVG
  const img = document.createElement('img');
  img.src = svgPath;
  img.style.width = '100%';
  img.style.height = 'auto';
  img.style.position = 'absolute';
  img.style.top = '0';
  img.style.left = '0';
  img.style.objectFit = 'cover';
  img.style.objectPosition = 'top';
  
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  
  // Start paint pour animation
  setTimeout(() => {
    overlay.classList.add('pouring');
  }, 10);
  
  // Switch theme as paint slows down near the end
  setTimeout(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, 1200);
  
  // Clean up after animation
  setTimeout(() => {
    overlay.remove();
  }, 2000);
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

// Meteor Cursor Effect
class MeteorCursor {
  constructor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'meteor-cursor';
    document.body.appendChild(this.cursor);
    
    // Create pointer cursor for links
    this.pointerCursor = document.createElement('div');
    this.pointerCursor.className = 'pointer-cursor';
    const pointerImg = document.createElement('img');
    pointerImg.src = '../assests/white-curosr-pointer.svg';
    pointerImg.id = 'pointer-img';
    this.pointerCursor.appendChild(pointerImg);
    document.body.appendChild(this.pointerCursor);
    
    this.mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.prevPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    this.trails = [];
    this.maxTrails = 10;
    this.velocity = 0;
    this.isMoving = false;
    this.moveTimeout = null;
    this.isHovering = false;
    
    this.init();
  }
  
  init() {
    // Create trail elements
    for (let i = 0; i < this.maxTrails; i++) {
      const trail = document.createElement('div');
      trail.className = 'meteor-trail';
      document.body.appendChild(trail);
      this.trails.push({
        element: trail,
        x: this.mousePos.x,
        y: this.mousePos.y,
        life: 0
      });
    }
    
    // Mouse move
    document.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
      
      // Calculate velocity
      const dx = this.mousePos.x - this.prevPos.x;
      const dy = this.mousePos.y - this.prevPos.y;
      this.velocity = Math.sqrt(dx * dx + dy * dy);
      
      this.prevPos.x = this.mousePos.x;
      this.prevPos.y = this.mousePos.y;
      
      this.isMoving = true;
      
      // Reset timeout
      clearTimeout(this.moveTimeout);
      this.moveTimeout = setTimeout(() => {
        this.isMoving = false;
        this.velocity = 0;
      }, 100);
    });
    
    // Hover effects - switch to pointer cursor
    const interactiveElements = 'a, button, input, textarea, [role="button"]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.matches(interactiveElements)) {
        this.cursor.classList.add('hover');
        this.pointerCursor.classList.add('active');
        this.isHovering = true;
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      if (e.target.matches(interactiveElements)) {
        this.cursor.classList.remove('hover');
        this.pointerCursor.classList.remove('active');
        this.isHovering = false;
      }
    });
    
    // Update pointer cursor image on theme change
    const updatePointerTheme = () => {
      const pointerImg = document.getElementById('pointer-img');
      if (pointerImg) {
        const isLight = document.documentElement.classList.contains('light');
        pointerImg.src = isLight ? '../assests/black-cursor-pointer.svg' : '../assests/white-curosr-pointer.svg';
      }
    };
    
    // Listen for theme changes
    const observer = new MutationObserver(updatePointerTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    // Click effect
    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('click');
    });
    
    // Hide on mouse leave
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.trails.forEach(trail => trail.element.style.opacity = '0');
    });
    
    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
    });
    
    this.animate();
  }
  
  animate() {
    // Main cursor follows mouse instantly (leads the trail)
    this.cursorPos.x = this.mousePos.x;
    this.cursorPos.y = this.mousePos.y;
    
    // Update cursor position - cursor is always at the front (hide when hovering)
    if (!this.isHovering) {
      this.cursor.style.transform = `translate(${this.cursorPos.x - 7}px, ${this.cursorPos.y - 7}px)`;
      this.cursor.style.display = 'block';
    } else {
      this.cursor.style.display = 'none';
    }
    
    // Update pointer cursor position (centered on the pointer tip, adjusted for smaller size)
    this.pointerCursor.style.transform = `translate(${this.cursorPos.x - 10}px, ${this.cursorPos.y - 4}px)`;
    
    // Update trails based on velocity (hide trails when hovering)
    if (this.isMoving && this.velocity > 1 && !this.isHovering) {
      // Shift trails backward (away from cursor)
      for (let i = this.trails.length - 1; i > 0; i--) {
        this.trails[i].x = this.trails[i - 1].x;
        this.trails[i].y = this.trails[i - 1].y;
        this.trails[i].life = this.trails[i - 1].life * 0.98;
      }
      
      // First trail follows behind the cursor with delay
      this.trails[0].x += (this.cursorPos.x - this.trails[0].x) * 0.3;
      this.trails[0].y += (this.cursorPos.y - this.trails[0].y) * 0.3;
      this.trails[0].life = 1;
      
      // Update trail elements
      this.trails.forEach((trail, index) => {
        const progress = index / this.maxTrails;
        const opacity = (1 - progress) * Math.min(this.velocity / 15, 1) * 0.8;
        const scale = 1 - progress * 0.6;
        
        trail.element.style.transform = `translate(${trail.x - 5}px, ${trail.y - 5}px) scale(${scale})`;
        trail.element.style.opacity = opacity;
      });
    } else {
      // Fade out trails when not moving
      this.trails.forEach((trail) => {
        trail.life *= 0.85;
        trail.element.style.opacity = trail.life;
      });
    }
    
    requestAnimationFrame(() => this.animate());
  }
}

// Encrypted Text Loading Animation with Glitch Background
class EncryptedTextLoader {
  constructor() {
    this.textElement = document.getElementById('encrypted-text');
    this.originalText = "Hello, It's Ragul here!";
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    this.initGlitchBackground();
    setTimeout(() => this.startEncryption(), 500);
  }
  
  initGlitchBackground() {
    const canvas = document.getElementById('glitch-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    // Initialize drops at random starting positions above the screen
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }
    
    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(13, 255, 0, 0.63)';
      ctx.font = `${fontSize}px "Cascadia Code", monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(text, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };
    
    this.glitchInterval = setInterval(draw, 50);
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
  
  startEncryption() {
    let iteration = 0;
    
    const interval = setInterval(() => {
      this.textElement.textContent = this.originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          
          if (index < iteration) {
            return this.originalText[index];
          }
          
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join('');
      
      if (iteration >= this.originalText.length) {
        clearInterval(interval);
        setTimeout(() => this.hideLoadingScreen(), 800);
      }
      
      iteration += 1 / 4;
    }, 50);
  }
  
  hideLoadingScreen() {
    clearInterval(this.glitchInterval);
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  // Start encrypted text loading animation
  new EncryptedTextLoader();
  
  // Set theme
  applyTheme(getPreferredTheme());

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Initialize meteor cursor
  new MeteorCursor();

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
});
