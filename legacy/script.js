/**
 * JNTUH Education Foundation – Skillsoft Partner Page
 * Interactive Behaviour Script
 */

// ─── DOM References ────────────────────────────────────────────────
const header        = document.getElementById('header');
const menuToggle    = document.getElementById('menu-toggle');
const siteNav       = document.getElementById('site-nav');
const mobileNav     = document.getElementById('mobile-nav');

// Header Modals
const openSearchBtn   = document.getElementById('open-search-btn');
const openLoginBtn    = document.getElementById('open-login-btn');
const openRegisterBtn = document.getElementById('open-register-btn');

const searchDialog   = document.getElementById('search-dialog');
const loginDialog    = document.getElementById('login-dialog');
const registerDialog = document.getElementById('register-dialog');

const closeSearchBtn   = document.getElementById('close-search-btn');
const closeLoginBtn    = document.getElementById('close-login-btn');
const closeRegisterBtn = document.getElementById('close-register-btn');

// Search
const searchForm    = document.getElementById('search-form');
const searchInput   = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Auth Forms
const loginForm    = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Newsletter
const newsletterForm     = document.getElementById('newsletter-form');
const newsletterFeedback = document.getElementById('newsletter-feedback');

// Testimonials
const testimonialText    = document.querySelector('[data-testimonial-text]');
const testimonialAuthor  = document.querySelector('[data-testimonial-author]');
const testimonialDots    = document.querySelectorAll('.dot[data-testimonial]');

// Toast
const toastContainer = document.getElementById('toast-container');

// ─── Data ──────────────────────────────────────────────────────────
const testimonials = [
  {
    text: '"Skillsoft\'s content has helped me gain practical skills and confidence to apply my knowledge in real-world situations."',
    author: '- JNTUH Learner',
  },
  {
    text: '"The learning paths made it much easier to connect certification preparation with the exact skills needed for my next role."',
    author: '- Certification Learner',
  },
  {
    text: '"Flexible formats let our learners continue professional development alongside demanding academic schedules."',
    author: '- Institution Partner',
  },
  {
    text: '"I earned two cloud certifications in four months. The structured labs and assessments made all the difference."',
    author: '- Working Professional',
  },
];

const mockCourses = {
  python:             [{ title: 'Python Fundamentals',      level: 'Beginner' }, { title: 'Python for Data Science', level: 'Intermediate' }],
  'cloud computing':  [{ title: 'AWS Cloud Practitioner',   level: 'Beginner' }, { title: 'Azure Administrator',     level: 'Intermediate' }],
  cybersecurity:      [{ title: 'CompTIA Security+ Prep',   level: 'Intermediate' }, { title: 'Ethical Hacking 101',   level: 'Beginner' }],
  'ai':               [{ title: 'AI Fundamentals',          level: 'Beginner' }, { title: 'Machine Learning Basics',  level: 'Intermediate' }],
  'machine learning': [{ title: 'Machine Learning Basics',  level: 'Intermediate' }, { title: 'Deep Learning Foundations', level: 'Advanced' }],
};

// ─── Utility: Toast Notifications ─────────────────────────────────
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast';

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `<span style="color:${type === 'success' ? '#36D1C4' : type === 'error' ? '#FC8181' : '#CBD5E1'}">${icon}</span> ${message}`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 300ms ease reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ─── Utility: Open / Close Modals ─────────────────────────────────
function openModal(dialog) {
  if (dialog && typeof dialog.showModal === 'function') {
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(dialog) {
  if (dialog) {
    dialog.close();
    document.body.style.overflow = '';
  }
}

// Close modal when clicking the backdrop
function attachBackdropClose(dialog) {
  dialog?.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom
    ) {
      closeModal(dialog);
    }
  });
}

// ─── Header: Mobile Hamburger Menu ────────────────────────────────
menuToggle?.addEventListener('click', () => {
  const willOpen = mobileNav ? mobileNav.classList.contains('hidden') : !siteNav.classList.contains('is-open');
  mobileNav?.classList.toggle('hidden', !willOpen);
  siteNav.classList.toggle('is-open', willOpen);
  menuToggle.setAttribute('aria-expanded', String(willOpen));

  // Animate hamburger → X
  const spans = menuToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav on link click
document.querySelectorAll('.site-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    const spans = menuToggle?.querySelectorAll('span');
    spans?.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// Sticky header shadow on scroll
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 8
    ? '0 2px 20px rgba(7,23,53,0.12)'
    : '0 2px 8px rgba(18,32,50,0.04)';
}, { passive: true });

// ─── Search Modal ──────────────────────────────────────────────────
openSearchBtn?.addEventListener('click', () => {
  openModal(searchDialog);
  setTimeout(() => searchInput?.focus(), 100);
});

closeSearchBtn?.addEventListener('click',   () => closeModal(searchDialog));
attachBackdropClose(searchDialog);

// Search suggestion tag buttons
document.querySelectorAll('.tag-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (searchInput) searchInput.value = btn.dataset.searchTerm || btn.textContent;
    searchInput?.dispatchEvent(new Event('input'));
    searchInput?.focus();
  });
});

// Live search on input
searchInput?.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) { searchResults.innerHTML = ''; return; }

  const key = Object.keys(mockCourses).find(k => k.includes(query) || query.includes(k));
  const courses = key ? mockCourses[key] : [
    { title: `Courses matching "${searchInput.value}"`, level: 'Multiple levels' },
  ];

  searchResults.innerHTML = courses.map(c => `
    <div class="search-item">
      <strong>${c.title}</strong>
      <span style="font-size:0.8rem;color:var(--color-muted);background:var(--color-soft-bg);padding:2px 8px;border-radius:4px;">${c.level}</span>
    </div>
  `).join('');
});

searchForm?.addEventListener('submit', e => {
  e.preventDefault();
  const q = searchInput?.value.trim();
  if (!q) return;
  showToast(`Searching for "${q}" in the course catalog.`, 'info');
  closeModal(searchDialog);
});

// ─── Login Modal ───────────────────────────────────────────────────
openLoginBtn?.addEventListener('click',    () => openModal(loginDialog));
closeLoginBtn?.addEventListener('click',   () => closeModal(loginDialog));
attachBackdropClose(loginDialog);

loginForm?.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('login-email')?.value.trim();
  if (!email) { showToast('Please enter your Roll No. or email.', 'error'); return; }
  showToast('Login request submitted. Redirecting to student dashboard…', 'success');
  closeModal(loginDialog);
  loginForm.reset();
});

// ─── Register Modal ────────────────────────────────────────────────
openRegisterBtn?.addEventListener('click',    () => openModal(registerDialog));
closeRegisterBtn?.addEventListener('click',   () => closeModal(registerDialog));
attachBackdropClose(registerDialog);

registerForm?.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('reg-name')?.value.trim();
  const email = document.getElementById('reg-email')?.value.trim();
  if (!name || !email) { showToast('Please fill in all required fields.', 'error'); return; }
  showToast(`Welcome, ${name}! Your registration has been received.`, 'success');
  closeModal(registerDialog);
  registerForm.reset();
});

// ─── Newsletter Subscription ───────────────────────────────────────
newsletterForm?.addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('newsletter-email');
  const email = input?.value.trim();

  if (!email || !input.validity.valid) {
    if (newsletterFeedback) {
      newsletterFeedback.style.color = '#FC8181';
      newsletterFeedback.textContent = 'Please enter a valid email address.';
    }
    return;
  }

  if (newsletterFeedback) {
    newsletterFeedback.style.color = '#36D1C4';
    newsletterFeedback.textContent = '✓ You are subscribed for Skillsoft updates!';
  }
  showToast('You\'re subscribed! Watch your inbox for updates.', 'success');
  newsletterForm.reset();

  setTimeout(() => {
    if (newsletterFeedback) newsletterFeedback.textContent = '';
  }, 5000);
});

// ─── Testimonial Carousel ──────────────────────────────────────────
let currentTestimonial = 0;
let testimonialTimer   = null;

function setTestimonial(index) {
  if (!testimonialText || !testimonialAuthor) return;

  testimonialText.style.opacity = '0';
  testimonialAuthor.style.opacity = '0';

  setTimeout(() => {
    currentTestimonial = index;
    const t = testimonials[index];
    testimonialText.textContent   = t.text;
    testimonialAuthor.textContent = t.author;

    testimonialText.style.opacity   = '1';
    testimonialAuthor.style.opacity = '1';

    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
  }, 220);
}

function nextTestimonial() {
  setTestimonial((currentTestimonial + 1) % testimonials.length);
}

function startAutoplay() {
  testimonialTimer = setInterval(nextTestimonial, 5000);
}

function stopAutoplay() {
  clearInterval(testimonialTimer);
}

testimonialDots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopAutoplay();
    setTestimonial(Number(dot.dataset.testimonial));
    startAutoplay();
  });
});

// Start autoplay
if (testimonialText) {
  testimonialText.style.transition   = 'opacity 220ms ease';
  testimonialAuthor.style.transition = 'opacity 220ms ease';
  startAutoplay();
}

// ─── Scroll Reveal Animations ──────────────────────────────────────
if ('IntersectionObserver' in window) {
  const revealItems = document.querySelectorAll(
    '[data-reveal], .trust-card, .area-card, .audience-item, .stat-item'
  );

  revealItems.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 450ms ease ${(i % 8) * 60}ms, transform 450ms ease ${(i % 8) * 60}ms`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => observer.observe(el));
}

// ─── Stat Counter Animation ────────────────────────────────────────
function animateCounter(el) {
  const raw   = el.getAttribute('data-count');
  if (!raw) return;
  const target = parseFloat(raw);
  const isK    = String(target) !== String(Math.floor(target)) || target >= 1000;
  const suffix = el.dataset.suffix || '';
  let start    = 0;
  const step   = target / 60;
  const timer  = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = (start >= 1000
      ? (start / 1000).toFixed(start % 1000 === 0 ? 0 : 0) + 'K+'
      : Math.floor(start).toLocaleString() + (start >= target ? suffix : ''));
    if (start >= target) clearInterval(timer);
  }, 18);
}

// Assign data-count attributes from existing stat numbers
document.querySelectorAll('.stat-number').forEach(el => {
  const text = el.textContent.trim();
  const num  = parseFloat(text.replace(/[^0-9.]/g, ''));
  const suffix = text.includes('+') ? '+' : '';
  el.setAttribute('data-count', num);
  el.dataset.suffix = suffix;
  el.dataset.originalText = text;
});

if ('IntersectionObserver' in window) {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));
}

// ─── Area Card: Ripple Effect on Click ────────────────────────────
document.querySelectorAll('.area-card, #learning-areas a[data-category]').forEach(card => {
  card.addEventListener('click', e => {
    const ripple = document.createElement('span');
    const rect   = card.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(0,125,121,0.12);
      border-radius:50%;transform:scale(0);
      animation:ripple 500ms ease forwards;pointer-events:none;
    `;
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe once
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(2); opacity: 0; } }`;
document.head.appendChild(rippleStyle);
