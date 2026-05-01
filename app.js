// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  mobileToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => { navLinks.classList.remove('open'); mobileToggle.textContent = '☰'; });
});

// ===== PARALLAX SCROLLING =====
const floatingAssets = document.querySelectorAll('.floating-asset');
const parallaxBgs = document.querySelectorAll('.parallax-bg');

function updateParallax() {
  const scrollY = window.scrollY;
  
  floatingAssets.forEach(asset => {
    const speed = parseFloat(asset.dataset.speed) || 0.1;
    const rect = asset.closest('.parallax-section').getBoundingClientRect();
    const offset = (rect.top + scrollY) * speed;
    asset.style.transform = asset.style.transform.replace(/translateY\([^)]*\)/, '') + ` translateY(${(scrollY - offset) * speed * 0.5}px)`;
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { updateParallax(); ticking = false; });
    ticking = true;
  }
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
      const idx = Array.from(siblings).indexOf(entry.target);
      setTimeout(() => { entry.target.classList.add('visible'); }, idx * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));

// ===== SCORE BARS =====
const scoreObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.score-bar-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.width; }, i * 200);
      });
      scoreObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const scoreDemo = document.querySelector('.score-demo');
if (scoreDemo) scoreObserver.observe(scoreDemo);

// ===== ENHANCED BUBBLE SYSTEM =====
function createBubbles() {
  const sections = document.querySelectorAll('.parallax-bg');
  const types = ['glow', 'soft', 'warm'];
  
  // Hero gets the most bubbles
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    for (let i = 0; i < 30; i++) {
      const b = document.createElement('div');
      b.classList.add('bubble', types[Math.floor(Math.random() * types.length)]);
      const size = Math.random() * 80 + 15;
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = Math.random() * 100 + '%';
      b.style.bottom = '-' + (Math.random() * 100) + 'px';
      b.style.animationDuration = (Math.random() * 12 + 8) + 's';
      b.style.animationDelay = (Math.random() * 15) + 's';
      heroBg.appendChild(b);
    }
  }
  
  // Other sections get some bubbles too
  sections.forEach(section => {
    if (section === heroBg) return;
    for (let i = 0; i < 12; i++) {
      const b = document.createElement('div');
      b.classList.add('bubble', types[Math.floor(Math.random() * types.length)]);
      const size = Math.random() * 50 + 10;
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = Math.random() * 100 + '%';
      b.style.bottom = '-' + (Math.random() * 60) + 'px';
      b.style.animationDuration = (Math.random() * 14 + 10) + 's';
      b.style.animationDelay = (Math.random() * 20) + 's';
      section.appendChild(b);
    }
  });
}
createBubbles();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
