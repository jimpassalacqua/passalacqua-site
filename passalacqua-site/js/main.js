// =============================================
//  JIM PASSALACQUA — passalacqua.net
//  main.js
// =============================================

// --- SCROLL REVEAL ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly for grouped reveals
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach((el, index) => {
  // Add stagger delay to quote items and project cards
  if (el.classList.contains('quote-item')) {
    el.dataset.delay = (index % 2) * 120;
  }
  revealObserver.observe(el);
});

// --- MOBILE NAV TOGGLE ---
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// --- SMOOTH SCROLL FOR NAV LINKS ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// --- HERO STRIP PARALLAX ---
const heroStrip = document.querySelector('.hero-strip');
const hero = document.querySelector('.hero');

if (heroStrip && hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (scrolled < heroBottom) {
      heroStrip.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
  }, { passive: true });
}

// --- NAV BACKGROUND ON SCROLL ---
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });
