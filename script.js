(() => {
  const $ = (s, root=document) => root.querySelector(s);
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