document.documentElement.classList.add('js');

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

function closeNav() {
  if (!toggle || !nav) return;

  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', '打开导航');
  nav.classList.remove('open');
}

function openNav() {
  if (!toggle || !nav) return;

  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', '关闭导航');
  nav.classList.add('open');
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        closeNav();
        toggle.focus();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeNav();
    }
  });
}

const reveals = document.querySelectorAll('.reveal');

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function showAllReveals() {
  reveals.forEach((element) => {
    element.classList.add('visible');
  });
}

if (prefersReducedMotion) {
  showAllReveals();
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  reveals.forEach((element) => {
    observer.observe(element);
  });
} else {
  showAllReveals();
}
