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

// --- HERO BACKGROUND SLIDESHOW ---
const heroBgSlides = document.querySelectorAll('.hero-bg-slide');
const heroDots = document.querySelectorAll('.hero-dot');

let currentHeroSlide = 0;
let heroInterval;

function showHeroSlide(index) {
  heroBgSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  heroDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  currentHeroSlide = index;
}

function startHeroAutoAdvance() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  heroInterval = setInterval(() => {
    showHeroSlide((currentHeroSlide + 1) % heroBgSlides.length);
  }, 6000);
}

if (heroBgSlides.length) {
  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(heroInterval);
      showHeroSlide(i);
      startHeroAutoAdvance();
    });
  });
  startHeroAutoAdvance();
}

// --- LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxTitle = lightbox.querySelector('.lightbox-title');
const lightboxCounter = lightbox.querySelector('.lightbox-counter');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');

let currentGallery = [];
let currentGalleryIndex = 0;

function buildGalleryData(galleryName) {
  const container = document.querySelector(`[data-gallery="${galleryName}"]`);
  if (!container) return [];
  const items = container.querySelectorAll('[data-index]');
  return Array.from(items).map(item => ({
    src: item.querySelector('img').getAttribute('src'),
    title: item.querySelector('.project-title').textContent
  }));
}

function openLightbox(galleryName, index) {
  currentGallery = buildGalleryData(galleryName);
  currentGalleryIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const item = currentGallery[currentGalleryIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${currentGallery.length}`;
}

function lightboxNextImg() {
  currentGalleryIndex = (currentGalleryIndex + 1) % currentGallery.length;
  updateLightbox();
}

function lightboxPrevImg() {
  currentGalleryIndex = (currentGalleryIndex - 1 + currentGallery.length) % currentGallery.length;
  updateLightbox();
}

// Attach click handlers to all project/campaign cards
document.querySelectorAll('[data-gallery]').forEach(container => {
  const galleryName = container.dataset.gallery;
  container.querySelectorAll('[data-index]').forEach(item => {
    item.addEventListener('click', () => {
      openLightbox(galleryName, parseInt(item.dataset.index, 10));
    });
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', lightboxNextImg);
lightboxPrev.addEventListener('click', lightboxPrevImg);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lightboxNextImg();
  if (e.key === 'ArrowLeft') lightboxPrevImg();
});

// --- NAV BACKGROUND ON SCROLL ---
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 2px 20px rgba(15,42,74,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });
