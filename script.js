/* =============================================================
   Dr. Sunita Khichar — Portfolio Interactions
   ============================================================= */

(() => {
  'use strict';

  /* -------------------- THEME TOGGLE -------------------- */
  const themeBtn = document.getElementById('themeToggle');
  const STORAGE_KEY = 'sk-theme';

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeBtn?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  themeBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /* -------------------- ANIMATED COUNTERS -------------------- */
  const counters = document.querySelectorAll('.stat-num');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };

  /* -------------------- INTERSECTION REVEAL + COUNTERS -------------------- */
  // Mark cards as reveal candidates (everything that's a card)
  const revealSelectors = [
    '.stat-card', '.about-text', '.about-side .side-card',
    '.interest-card', '.tl-item', '.edu-card', '.proj-card',
    '.pub-item', '.ht-block', '.skill-group', '.ref-card', '.contact-card'
  ];
  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate counter if this is a stat card
        const numEl = entry.target.querySelector?.('.stat-num');
        if (numEl && !numEl.dataset.animated) {
          numEl.dataset.animated = '1';
          animateCounter(numEl);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* -------------------- PUBLICATION FILTER -------------------- */
  const filterBtns = document.querySelectorAll('.pub-filter');
  const pubItems   = document.querySelectorAll('.pub-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      pubItems.forEach(item => {
        const matches = (filter === 'all') || (item.dataset.type === filter);
        if (matches) {
          item.classList.remove('hidden');
          // re-trigger entrance animation briefly
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px)';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.4s var(--ease), transform 0.4s var(--ease)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* -------------------- COPY TO CLIPBOARD -------------------- */
  const toast = document.getElementById('toast');
  let toastTimer;

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  };

  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', async (e) => {
      const text = el.dataset.copy;
      if (!text) return;
      // For mailto/tel links, allow default behaviour AND copy
      try {
        await navigator.clipboard.writeText(text);
        showToast(`Copied: ${text}`);
        if (el.tagName === 'A') {
          // tiny delay so user sees the toast before mailto opens
          // but don't prevent default
        } else {
          e.preventDefault();
        }
      } catch (err) {
        // Fallback for old browsers
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); showToast(`Copied: ${text}`); }
        catch { showToast('Could not copy'); }
        document.body.removeChild(ta);
        if (el.tagName !== 'A') e.preventDefault();
      }
    });
  });

  /* -------------------- SCROLL SPY (active nav link) -------------------- */
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = ['about', 'research', 'experience', 'publications', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(s => spyObserver.observe(s));

  /* -------------------- FOOTER YEAR -------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------- SMOOTH SCROLL (with offset, for older browsers) -------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
