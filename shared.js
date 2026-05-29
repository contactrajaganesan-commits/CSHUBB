// Nav scroll effect
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Mobile menu
function toggleMenu() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  const open = menu.classList.toggle('open');
  btn.classList.toggle('open', open);
  menu.style.display = open ? 'flex' : 'none';
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  if (menu && btn && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      menu.style.display = 'none';
    }
  }
});

// Accordion
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.accordion-item');
    const body = item.querySelector('.accordion-body');
    const isOpen = item.classList.contains('open');

    // Close all in same group
    const group = item.closest('.accordion-group') || item.closest('.accordion-wrap');
    if (group) {
      group.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.accordion-body').style.maxHeight = '0';
        }
      });
    }

    if (isOpen) {
      item.classList.remove('open');
      body.style.maxHeight = '0';
    } else {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 48 + 'px';
    }
  });
});

// Highlight active nav link for current page
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === '#features')) return;
    if (href === path) a.classList.add('active');
    if (path === 'security.html' && href === 'security.html') a.classList.add('active');
    if (path === 'faq.html' && href === 'faq.html') a.classList.add('active');
  });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu if open
      const menu = document.getElementById('mobileMenu');
      if (menu) { menu.classList.remove('open'); menu.style.display = 'none'; }
    }
  });
});
