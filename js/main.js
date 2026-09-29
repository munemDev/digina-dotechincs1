// Header shadow + back-to-top button
const header = document.getElementById('header');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
  toTop.classList.toggle('show', window.scrollY > 600);
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

// Rotating word in hero headline
const rotator = document.getElementById('rotator');
const words = ['brands', 'websites', 'mobile apps', 'software', 'businesses'];
let wordIndex = 0;
setInterval(() => {
  rotator.classList.add('out');
  setTimeout(() => {
    wordIndex = (wordIndex + 1) % words.length;
    rotator.textContent = words[wordIndex];
    rotator.classList.remove('out');
  }, 350);
}, 2600);

// Reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Counters
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / 1800, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// Portfolio filter
const filters = document.querySelectorAll('.filter');
const works = document.querySelectorAll('.work');
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    works.forEach(w => w.classList.toggle('hide', cat !== 'all' && w.dataset.cat !== cat));
  });
});

// Portfolio lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
works.forEach(work => {
  work.addEventListener('click', e => {
    e.preventDefault();
    lightboxImg.src = work.getAttribute('href');
    lightboxImg.alt = work.querySelector('h3').textContent;
    lightbox.classList.add('open');
  });
});
lightbox.addEventListener('click', e => {
  if (e.target !== lightboxImg) lightbox.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});

// Contact form (opens the visitor's email client; swap for a backend/Formspree later)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  const subject = encodeURIComponent(`New inquiry: ${d.get('service')}`);
  const body = encodeURIComponent(
    `Name: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nCompany: ${d.get('company')}\nService: ${d.get('service')}\nBudget: ${d.get('budget')}\n\n${d.get('message')}`
  );
  window.location.href = `mailto:info@diginadotechinc.com?subject=${subject}&body=${body}`;
  note.textContent = 'Thank you! Your email app is opening to send the message.';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
