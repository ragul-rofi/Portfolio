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

// Terminal Loading Animation
class TerminalLoader {
  constructor() {
    this.commandElement = document.getElementById('typed-command');
    this.outputElement = document.getElementById('terminal-output');
    this.command = 'rag install ragul-portfolio';
    this.currentIndex = 0;
    
    this.startTyping();
  }
  
  startTyping() {
    const typeInterval = setInterval(() => {
      if (this.currentIndex < this.command.length) {
        this.commandElement.textContent += this.command[this.currentIndex];
        this.currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => this.showOutput(), 500);
      }
    }, 80);
  }
  
  showOutput() {
    const outputs = [
      { text: 'Resolving package...', delay: 300, class: 'output-info' },
      { text: 'Fetching ragul-portfolio@latest', delay: 600, class: 'output-muted' },
      { text: '✓ Package found', delay: 900, class: 'output-success' },
      { text: 'Installing dependencies...', delay: 1200, class: 'output-info' },
      { progress: true, delay: 1500 },
      { text: '✓ Installation complete', delay: 3800, class: 'output-success' },
      { text: 'Launching portfolio...', delay: 4200, class: 'output-info' }
    ];
    
    outputs.forEach((output, index) => {
      setTimeout(() => {
        if (output.progress) {
          this.showProgressBar();
        } else {
          const line = document.createElement('div');
          line.className = `output-line ${output.class}`;
          line.textContent = output.text;
          this.outputElement.appendChild(line);
        }
        
        // Hide loading screen after last output
        if (index === outputs.length - 1) {
          setTimeout(() => this.hideLoadingScreen(), 800);
        }
      }, output.delay);
    });
  }
  
  showProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'output-line terminal-progress';
    this.outputElement.appendChild(progressContainer);
    
    let progress = 0;
    const totalBars = 30;
    
    const progressInterval = setInterval(() => {
      progress += 2;
      if (progress > 100) progress = 100;
      
      const filledBars = Math.floor((progress / 100) * totalBars);
      const emptyBars = totalBars - filledBars;
      
      const progressBar = '[' + '█'.repeat(filledBars) + '░'.repeat(emptyBars) + ']';
      progressContainer.innerHTML = `<span class="output-info">${progressBar} ${progress}%</span>`;
      
      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 60);
  }
  
  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  // Start terminal loading animation
  new TerminalLoader();
  
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
