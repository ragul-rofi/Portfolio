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
    problem: 'Contract lifecycle management tools were locked inside expensive enterprise suites. Teams needed a lightweight, embeddable plugin that could parse, version, and flag contract clauses without a six-figure SaaS subscription.',
    bullets: [
      'Decision: Build as a standalone Python package with a clean API so it could drop into any existing workflow without forcing a platform migration.',
      'Tech: Python, spaCy NLP pipeline, PostgreSQL for clause versioning, packaged and published to PyPI.',
      'Outcome: Published open-source on PyPI; adopted by early users within the first month of release.',
    ],
    link: 'https://pypi.org/project/clm-plugin/',
  },
  {
    index: '02',
    title: 'Voz Voice Agent',
    problem: 'Existing voice AI demos had 1–2 second latency that made real conversations feel broken. The goal was a production-grade voice pipeline that felt instantaneous — under 600ms end-to-end.',
    bullets: [
      'Decision: Architect around streaming STT and TTS with a stateless FastAPI middleware layer to eliminate buffering bottlenecks.',
      'Tech: Python, FastAPI, WebSockets, Deepgram STT, ElevenLabs TTS, deployed on AWS EC2 behind a load balancer.',
      'Outcome: Achieved sub-600ms round-trip latency in production; white-labeled for a client\'s customer support workflow.',
    ],
    link: null,
  },
  {
    index: '03',
    title: 'Forge / SRINI',
    problem: 'Internal tooling at small teams is either non-existent or held together with spreadsheets. SRINI is an AI-assisted operations layer — a system that routes tasks, surfaces context, and reduces the cognitive overhead of running a small engineering team.',
    bullets: [
      'Decision: Design as a modular agent framework so individual capabilities (task routing, context retrieval, alerting) could be swapped without rebuilding the core.',
      'Tech: Python, LangChain agent orchestration, PostgreSQL, REST API, React dashboard for operator visibility.',
      'Outcome: Running internally; reduced context-switching overhead for a two-person team managing three concurrent projects.',
    ],
    link: 'https://www.tryforge.site/',
  },
  {
    index: '04',
    title: 'Aglen',
    problem: 'Freelancers and micro-agencies needed a white-labeled client portal — a place to share deliverables, collect feedback, and manage project milestones — without paying for Notion or ClickUp seats for every client.',
    bullets: [
      'Decision: Build a multi-tenant SaaS with subdomain-based white-labeling so each agency could brand the portal as their own product.',
      'Tech: Node.js, PostgreSQL, AWS S3 for file storage, Stripe for billing, deployed on AWS with subdomain routing via Route 53.',
      'Outcome: Deployed and in active use; handles file delivery, milestone tracking, and client sign-off in a single interface.',
    ],
    link: null,
  },
  {
    index: '05',
    title: 'RaiseHub',
    problem: 'Early-stage founders in Tier-2 cities had no structured way to find and approach angel investors. Cold emails went nowhere; warm introductions required networks most founders didn\'t have.',
    bullets: [
      'Decision: Build a curated matching layer — not another directory — that surfaces relevant investors based on sector, stage, and geography, then facilitates a warm intro workflow.',
      'Tech: Python backend, PostgreSQL, React frontend, email automation via AWS SES, deployed on AWS.',
      'Outcome: Prototype validated with 12 founders; investor matching accuracy rated above cold outreach by all test users.',
    ],
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
    const bulletsHtml = proj.bullets
      .map(b => `<li>${b}</li>`)
      .join('\n        ');

    return `<article class="accordion-item" data-index="${proj.index}">
  <button class="accordion-trigger" aria-expanded="false" aria-controls="${panelId}">
    <span class="accordion-index">${proj.index}</span>
    <span class="accordion-title">${proj.title}</span>
    <span class="accordion-arrow">↓</span>
  </button>
  <div class="accordion-panel" id="${panelId}" role="region">
    <div class="accordion-panel-inner">
      <p class="accordion-problem">${proj.problem}</p>
      <ul class="accordion-bullets">
        ${bulletsHtml}
      </ul>
      ${linkHtml}
    </div>
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

  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (!panel) return;

      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all
      triggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.style.maxHeight = '0';
      });

      // If it wasn't open, open it
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
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


