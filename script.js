/* ============================================================
   script.js — ragul.tech
   Vanilla JS, no dependencies, no build step.
   ============================================================ */

// ── Loading Screen ───────────────────────────────────────────
function initLoader(onComplete) {
  const loader = document.getElementById('loader');
  const svg = document.getElementById('loader-svg');
  const pct = document.getElementById('loader-pct');
  if (!loader || !svg) { onComplete(); return; }

  const W = 400, H = 400;
  const nodes = [
    { x: 50, y: 50 }, { x: 30, y: 30 }, { x: 70, y: 30 },
    { x: 30, y: 70 }, { x: 70, y: 70 }, { x: 20, y: 50 },
    { x: 80, y: 50 }, { x: 50, y: 20 }, { x: 50, y: 80 },
  ];
  const connections = [
    [0,1],[0,2],[0,3],[0,4],[1,5],[2,6],[1,7],[4,8],[5,3],[6,4],[7,2],[8,3],
  ];

  // Create SVG elements
  const lines = connections.map(([a, b]) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    el.setAttribute('x1', nodes[a].x / 100 * W);
    el.setAttribute('y1', nodes[a].y / 100 * H);
    el.setAttribute('x2', nodes[b].x / 100 * W);
    el.setAttribute('y2', nodes[b].y / 100 * H);
    svg.appendChild(el);
    return el;
  });

  const circles = nodes.map(n => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    el.setAttribute('cx', n.x / 100 * W);
    el.setAttribute('cy', n.y / 100 * H);
    el.setAttribute('r', 4);
    svg.appendChild(el);
    return el;
  });

  // Stagger-reveal nodes and lines
  lines.forEach((el, i) => setTimeout(() => { el.style.opacity = '0.35'; }, i * 80));
  circles.forEach((el, i) => setTimeout(() => { el.style.opacity = '1'; }, i * 100));

  // Progress counter
  let progress = 0;
  const interval = setInterval(() => {
    progress = Math.min(progress + 2, 100);
    if (pct) pct.textContent = progress;
    if (progress >= 100) {
      clearInterval(interval);
      // Fade out nodes then loader
      lines.forEach(el => { el.style.opacity = '0'; });
      circles.forEach(el => { el.style.opacity = '0'; });
      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
          loader.style.display = 'none';
          onComplete();
        }, 500);
      }, 400);
    }
  }, 30);
}

// ── Smooth Scroll Inertia ────────────────────────────────────
function initSmoothScroll() {
  // Skip on touch/mobile — native scroll feels better there
  if (!window.matchMedia || window.matchMedia('(pointer: coarse)').matches) return;

  let currentY = window.scrollY;
  let targetY = window.scrollY;
  let rafId = null;
  const ease = 0.20; // lower = more inertia, higher = snappier

  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetY = Math.max(0, Math.min(
      targetY + e.deltaY,
      document.documentElement.scrollHeight - window.innerHeight
    ));
    if (!rafId) loop();
  }, { passive: false });

  function loop() {
    const diff = targetY - currentY;
    if (Math.abs(diff) < 0.5) {
      currentY = targetY;
      window.scrollTo(0, currentY);
      rafId = null;
      return;
    }
    currentY += diff * ease;
    window.scrollTo(0, currentY);
    rafId = requestAnimationFrame(loop);
  }
}

// ── Entry point ──────────────────────────────────────────────
function init() {
  initSmoothScroll();
  initTypewriter();
  renderCredentials();
  initCursor();
  initScrollReveal();
  initScrollspy();
  initAccordion();
  initNav();
  initClipboard();
}

// ── Module stubs ─────────────────────────────────────────────

const PHRASES = [
  'Open-source Python middleware.',
  'Sub-600ms voice AI pipelines.',
  'White-labeled SaaS in production.',
];

const CREDENTIALS = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    verifyUrl: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/d5dcb59dbf0d498c8309ba1efd4dc687',
  },
  {
    name: 'AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services',
    verifyUrl: 'https://www.credly.com/badges/92d6572b-5678-46f4-94cd-d2e19960c0db/print',
  },
  {
    name: 'UI/UX Design Specialization',
    issuer: 'California Institute of the Arts (CalArts)',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/90QS5TGCKKR8',
  },
  {
    name: 'ABB Hackathon 2025 — Finalist Top 30 of 500+',
    issuer: 'ABB',
    verifyUrl: null,
  },
];

const PROJECTS = [
  {
    index: '01',
    title: 'CLM Plugin',
    problem: 'LLM agents run blindly — no way to monitor cognitive state inside an agent loop without rebuilding the framework.',
    decision: 'Drop-in Python middleware tracking four signals — branching factor, repetition rate, uncertainty density, goal distance — without requiring framework changes.',
    tech: 'Python · LangChain · OpenAI SDK · Sentence Transformers · SQLite · PyPI',
    outcome: 'Published on PyPI. 79 automated tests. Engaged by a Salesforce principal engineer within weeks of release.',
    role: null,
    link: 'https://pypi.org/project/clm-plugin/',
  },
  {
    index: '02',
    title: 'Forge / SRINI',
    problem: 'Career assessments are static and ignored. Students needed a real conversation, not a form.',
    decision: 'Voice-first career profiling platform with a multilingual AI agent under 800ms latency end to end.',
    tech: 'VAPI · Deepgram Nova-2 · Claude Haiku · ElevenLabs Turbo · Node.js · PostgreSQL · admin + client dashboards',
    outcome: 'Sub-800ms end-to-end in production. Full SaaS architecture with white-label potential.',
    role: null,
    link: 'https://www.tryforge.site/',
  },
  {
    index: '03',
    title: 'LMS Voice Agent',
    problem: "An internal MOOC platform needed a voice layer — but the architecture underneath wasn't built to scale or be reused.",
    decision: 'Redesigned into a white-labeled modular SaaS any institution can deploy under their own brand.',
    tech: 'Voice AI pipeline · Node.js · PostgreSQL · modular SaaS architecture',
    outcome: 'Active build. Platform architecture complete, voice layer in development.',
    role: null,
    link: null,
  },
  {
    index: '04',
    title: 'Aglen',
    problem: 'Field workers need plant disease diagnosis offline, fast, and explainable. Most tools require connectivity and give no reasoning.',
    decision: 'Custom CNN + Grad-CAM XAI for explainability, PWA for offline-first field use.',
    tech: 'Python · OpenCV · CNN · Grad-CAM · Flask · PWA · admin dashboard',
    outcome: 'Active build. Full-stack ownership — model, API, frontend, admin panel.',
    role: null,
    link: null,
  },
  {
    index: '05',
    title: 'RaiseCRM',
    problem: 'Placement teams managed company pipelines across spreadsheets — no single view, no access control.',
    decision: 'Internal CRM for placement ops — company pipeline, drive tracking, hierarchical role-based dashboards.',
    tech: 'Next.js · PostgreSQL',
    outcome: 'Internally deployed and in active use by the placement team.',
    role: 'Initial planning, frontend, and testing.',
    link: null,
  },
  {
    index: '06',
    title: 'RaiseHub',
    problem: 'Student data — assessments, resumes, certifications, placement outcomes, alumni — lived in silos with no unified access.',
    decision: 'Single end-to-end platform for the full student lifecycle with hierarchical access control per authority level.',
    tech: 'Full-stack web app · PostgreSQL · role-based access architecture',
    outcome: 'Development complete. Active testing phase.',
    role: 'Involved from initial planning stage.',
    link: null,
  },
];

/**
 * Typewriter effect cycling through PHRASES in the hero section.
 * States: typing → pausing → deleting → waiting → (repeat)
 */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let state = 'typing'; // 'typing' | 'pausing' | 'deleting' | 'waiting'

  function tick() {
    const phrase = PHRASES[phraseIndex];

    if (state === 'typing') {
      charIndex++;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        state = 'pausing';
        setTimeout(tick, 2000);
      } else {
        setTimeout(tick, 60);
      }
    } else if (state === 'pausing') {
      state = 'deleting';
      setTimeout(tick, 30);
    } else if (state === 'deleting') {
      charIndex--;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0) {
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        state = 'waiting';
        setTimeout(tick, 400);
      } else {
        setTimeout(tick, 30);
      }
    } else if (state === 'waiting') {
      state = 'typing';
      setTimeout(tick, 60);
    }
  }

  tick();
}

/**
 * Custom two-part cursor (dot + ring) for pointer-fine devices.
 * Dot follows mousemove directly; ring lerps via rAF.
 */
function initCursor() {
  // Custom cursor is handled entirely via CSS SVG cursor
}

/**
 * IntersectionObserver-based entrance animations.
 * Targets [data-reveal] elements; applies 80ms stagger per batch.
 */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

/**
 * Highlights the active nav link based on the current scroll position.
 * Observes each <section> at threshold 0.4.
 */
function initScrollspy() {
  if (!('IntersectionObserver' in window)) return;

  const sectionMap = new Map(); // sectionId → navAnchor

  document.querySelectorAll('.nav-links a').forEach(anchor => {
    const id = anchor.getAttribute('href').replace('#', '');
    sectionMap.set(id, anchor);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all nav links
        sectionMap.forEach(anchor => anchor.classList.remove('nav-link--active'));
        // Add active to the matching anchor
        const anchor = sectionMap.get(entry.target.id);
        if (anchor) anchor.classList.add('nav-link--active');
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('section').forEach(section => {
    if (sectionMap.has(section.id)) {
      observer.observe(section);
    }
  });
}

/**
 * Renders PROJECTS into #accordion-container as accordion HTML.
 */
function renderProjects() {
  const container = document.getElementById('accordion-container');
  if (!container) return;

  container.innerHTML = PROJECTS.map((proj, i) => {
    const panelId = `proj-${i + 1}-panel`;
    const linkHtml = proj.link
      ? `<a href="${proj.link}" class="accordion-link" target="_blank" rel="noopener">View live ↗</a>`
      : '';
    const roleHtml = proj.role
      ? `<div class="panel-row"><span class="panel-label">Role:</span> <span class="panel-value">${proj.role}</span></div>`
      : '';

    return `<article class="accordion-panel-item" data-index="${proj.index}">
  <button class="panel-trigger" aria-expanded="${i === 0 ? 'true' : 'false'}" aria-controls="${panelId}">
    <span class="panel-title-rotated">${proj.title}</span>
  </button>
  <div class="panel-content" id="${panelId}" role="region">
    <h3 class="panel-heading">${proj.title}</h3>
    <p class="panel-problem">${proj.problem}</p>
    <div class="panel-row"><span class="panel-label">Decision:</span> <span class="panel-value">${proj.decision}</span></div>
    <div class="panel-row"><span class="panel-label">Tech:</span> <span class="panel-value">${proj.tech}</span></div>
    <div class="panel-row"><span class="panel-label">Outcome:</span> <span class="panel-value">${proj.outcome}</span></div>
    ${roleHtml}
    ${linkHtml}
  </div>
</article>`;
  }).join('\n');
}

/**
 * Renders CREDENTIALS into #credentials-container.
 * If verifyUrl is non-null, wraps the name in an <a> link opening in a new tab.
 */
function renderCredentials() {
  const container = document.getElementById('credentials-container');
  if (!container) return;

  container.innerHTML = CREDENTIALS.map(cred => `<div class="credential-item">
  <div>
    <div class="credential-name">${cred.name}</div>
    <div class="credential-issuer">${cred.issuer}</div>
  </div>
  ${cred.verifyUrl ? `<a class="credential-verify" href="${cred.verifyUrl}" target="_blank" rel="noopener">Verify ↗</a>` : ''}
</div>`).join('\n');
}

/**
 * Accordion expand/collapse for the Systems Built section.
 * Exclusive open: clicking one item closes all others.
 */
function initAccordion() {
  renderProjects();

  // Wait for DOM to update after render
  setTimeout(() => {
    const triggers = document.querySelectorAll('.panel-trigger');

    triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', () => {
        // Close all panels
        triggers.forEach(t => {
          t.setAttribute('aria-expanded', 'false');
          t.parentElement.classList.remove('active');
        });

        // Open clicked panel
        trigger.setAttribute('aria-expanded', 'true');
        trigger.parentElement.classList.add('active');
      });

      // Keyboard navigation
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % triggers.length;
          triggers[nextIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (index - 1 + triggers.length) % triggers.length;
          triggers[prevIndex].focus();
        }
      });
    });

    // Activate first panel by default
    if (triggers.length > 0) {
      triggers[0].parentElement.classList.add('active');
      triggers[0].setAttribute('aria-expanded', 'true');
    }
  }, 0);
}

/**
 * Navigation scroll behaviour and mobile hamburger/overlay.
 * Adds nav--scrolled class when scrollY > 80.
 */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Scroll threshold: toggle nav--scrolled when scrollY > 80
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 80);
  }, { passive: true });

  // Hamburger / overlay
  const hamburger = nav.querySelector('.nav-hamburger');
  const overlay = document.getElementById('nav-overlay');
  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = overlay.classList.toggle('nav-overlay--open');
      overlay.setAttribute('aria-hidden', String(!isOpen));
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.remove('nav-overlay--open');
        overlay.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * Clipboard copy for the email address in the Talk section.
 * Success: shows "Copied ✓" for 2000ms then reverts.
 * Failure: shows fallback message.
 */
function initClipboard() {
  const copyBtn = document.getElementById('copy-btn');
  const emailEl = document.getElementById('email-address');
  if (!copyBtn || !emailEl) return;

  const EMAIL = emailEl.textContent.trim();
  const DEFAULT_TEXT = 'Copy';

  function showCopied() {
    copyBtn.textContent = 'Copied ✓';
    setTimeout(() => {
      copyBtn.textContent = DEFAULT_TEXT;
    }, 2000);
  }

  function showFallback() {
    copyBtn.textContent = 'Select & copy manually';
  }

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showCopied();
    } catch {
      showFallback();
    }
  });
}

// ── Bootstrap ────────────────────────────────────────────────
if (typeof document !== 'undefined') {
  const start = () => initLoader(init);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}

// ── CommonJS export guard (for testability with vitest/jsdom) ─
if (typeof module !== 'undefined') {
  module.exports = {
    init,
    initTypewriter,
    PHRASES,
    PROJECTS,
    renderProjects,
    CREDENTIALS,
    renderCredentials,
    initCursor,
    initScrollReveal,
    initScrollspy,
    initAccordion,
    initNav,
    initClipboard,
  };
}


