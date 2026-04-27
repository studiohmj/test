/* ==========================================================================
   Jang Hoon Min — Portfolio / script.js
   Principle: subtle interaction only. No flashy effects.
   ========================================================================== */

/* --------------------------------------------------------------------------
   0. CURSOR GLOW — blue radial follows mouse
   -------------------------------------------------------------------------- */
(function () {
  const glow = document.querySelector('.glow');
  if (!glow) return;
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}());

/* --------------------------------------------------------------------------
   1. NAV — scroll-activated border & hamburger
   -------------------------------------------------------------------------- */
(function () {
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('mobileMenu');
  const links     = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 48);
  }, { passive: true });

  function openMenu(open) {
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    const bars = hamburger.querySelectorAll('span');
    if (open) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  }

  hamburger.addEventListener('click', () => openMenu(!menu.classList.contains('open')));
  links.forEach(l => l.addEventListener('click', () => openMenu(false)));
}());

/* --------------------------------------------------------------------------
   2. THEME TOGGLE — light (default) ↔ dark, persisted in localStorage
   -------------------------------------------------------------------------- */
(function () {
  const btn  = document.getElementById('themeToggle');
  const icon = btn.querySelector('.theme-toggle__icon');

  /* Apply saved preference on load */
  if (localStorage.getItem('portfolio-theme') === 'dark') {
    document.body.classList.add('dark-mode');
    icon.textContent = '☀';
  } else {
    icon.textContent = '☽';
  }

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
      document.body.classList.remove('dark-mode');
      icon.textContent = '☽';
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      icon.textContent = '☀';
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });
}());

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL — opacity + subtle translate, fired once per element
   -------------------------------------------------------------------------- */
(function () {
  const els = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  els.forEach(el => obs.observe(el));
}());

/* --------------------------------------------------------------------------
   4. STAT COUNTER — number counts up when scrolled into view
   -------------------------------------------------------------------------- */
(function () {
  const counters = document.querySelectorAll('.stat__number[data-target]');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target) || target === 0) { el.textContent = '—'; obs.unobserve(el); return; }

      const dur  = 1600;
      const step = 16;
      const inc  = target / (dur / step);
      let cur    = 0;

      const timer = setInterval(() => {
        cur += inc;
        if (cur >= target) { el.textContent = target + '+'; clearInterval(timer); }
        else               { el.textContent = Math.floor(cur); }
      }, step);

      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
}());

/* --------------------------------------------------------------------------
   5. ACTIVE NAV LINK — highlights current section in navbar
   -------------------------------------------------------------------------- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active-link', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
}());

/* --------------------------------------------------------------------------
   6. SMOOTH SCROLL for all internal anchor links
   -------------------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* --------------------------------------------------------------------------
   7. PROJECT CARD — click anywhere on image to navigate
   -------------------------------------------------------------------------- */
(function () {
  document.querySelectorAll('.proj__image').forEach(function (img) {
    const link = img.querySelector('.proj__view-pill');
    if (!link) return;
    img.style.cursor = 'pointer';
    img.addEventListener('click', function (e) {
      if (!e.target.closest('.proj__view-pill')) {
        window.location.href = link.href;
      }
    });
  });
}());

/* --------------------------------------------------------------------------
   8. INLINE EXPAND (pexp) — show/hide toggles for profile and drawer
   -------------------------------------------------------------------------- */
(function () {
  document.querySelectorAll('.pexp-btn').forEach(function (btn) {
    var targetId = btn.dataset.target;
    var body = document.getElementById(targetId);
    if (!body) return;
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      body.classList.toggle('open', !isOpen);
    });
  });
}());
