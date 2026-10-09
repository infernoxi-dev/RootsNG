(() => {
  const $ = (s, root=document) => root.querySelector(s);

  // Reveal selected content gently as it enters the viewport. Content remains
  // visible by default if IntersectionObserver is not supported.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
    const revealTargets = document.querySelectorAll(
      '.hero-content, .page-banner, .page-content > *, .category-card, .blog-card, .location-card, .content-card, .contact-item, .footer-main > *'
    );
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealTargets.forEach((element, index) => {
      element.classList.add('motion-reveal');
      if (element.matches('.category-card, .blog-card, .location-card, .content-card')) {
        element.style.transitionDelay = `${(index % 4) * 70}ms`;
      }
      revealObserver.observe(element);
    });
  }
  const toast = message => {
    const el = $('.toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(window.__rootsToast);
    window.__rootsToast = setTimeout(() => el.classList.remove('show'), 3200);
  };
  const toggle = $('.menu-toggle'), nav = $('.nav');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
  });
  const newsletter = $('#newsletter-form');
  if (newsletter) newsletter.addEventListener('submit', e => {
    e.preventDefault();
    toast('Thanks for your interest! Newsletter signup is demo-only.');
    newsletter.reset();
  });
  ['contact-form','careers-form'].forEach(id => {
    const form = document.getElementById(id);
    if (form) form.addEventListener('submit', e => {
      e.preventDefault();
      toast(id === 'contact-form' ? 'Thanks! This demo form is not connected to Roots yet.' : 'Thanks for your interest! This demo form is not connected to Roots yet.');
      form.reset();
    });
  });
  const reservation = $('#reservation-form');
  if (reservation) {
    const date = reservation.elements.date;
    if (date) date.min = new Date().toISOString().slice(0,10);
    reservation.addEventListener('submit', e => {
      e.preventDefault();
      toast('Demo only: this request was not sent. Please contact Roots directly to confirm a table.');
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }));
})();