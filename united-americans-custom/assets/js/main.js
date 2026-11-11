(() => {
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = open ? '&times;' : '&#9776;';
      document.body.classList.toggle('menu-open', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded','false'); toggle.innerHTML='&#9776;';
    }));
    nav.querySelectorAll('.nav-drop > button').forEach(btn => btn.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 860px)').matches) btn.parentElement.classList.toggle('expanded');
    }));
  }
  const page = document.body.dataset.page;
  document.querySelectorAll(`[data-nav="${page}"]`).forEach(a => a.classList.add('active'));
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), {threshold:.12});
    revealItems.forEach(el => observer.observe(el));
  } else revealItems.forEach(el => el.classList.add('visible'));
  document.querySelectorAll('.accordion button').forEach(btn => btn.addEventListener('click', () => {
    const box = btn.closest('.accordion'); const isOpen = box.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen)); btn.querySelector('span:last-child').textContent = isOpen ? '−' : '+';
  }));
  const backTop = document.querySelector('.back-top');
  if (backTop) { window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 500)); backTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'})); }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('[data-mail-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form); const name = data.get('name') || '';
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${data.get('email') || ''}\nOrganization: ${data.get('organization') || 'Not provided'}\nInterest: ${data.get('interest') || 'General enquiry'}\n\nMessage:\n${data.get('message') || ''}`);
    window.location.href = `mailto:info@unitedamericans.org?subject=${subject}&body=${body}`;
    const note = form.querySelector('.form-status'); if (note) note.textContent = 'Your email application should open with the enquiry prepared. Please send it from your email application.';
  }));
})();
