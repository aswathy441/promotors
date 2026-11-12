const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}
// On touch devices, tapping a menu item with a submenu opens/closes that submenu.
document.querySelectorAll('.has-dropdown > a').forEach(link => {
  link.addEventListener('click', event => {
    if (window.matchMedia('(max-width: 650px)').matches) {
      event.preventDefault();
      const dropdown = link.nextElementSibling;
      const isOpen = dropdown.style.display === 'block';
      document.querySelectorAll('.dropdown').forEach(item => item.style.display = 'none');
      dropdown.style.display = isOpen ? 'none' : 'block';
    }
  });
});
const appointmentForm = document.getElementById('appointment-form');
if (appointmentForm) {
  appointmentForm.addEventListener('submit', event => {
    event.preventDefault();
    const note = appointmentForm.querySelector('.form-note');
    note.textContent = 'Thank you! Your request has been prepared. Connect this form to your email or backend to receive submissions.';
    appointmentForm.reset();
  });
}
const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', event => {
    event.preventDefault();
    alert('Thank you for subscribing! Connect this form to your mailing service to save subscribers.');
    subscribeForm.reset();
  });
}
document.querySelector('.play')?.addEventListener('click', () => {
  alert('Add your maintenance video URL in the HTML to enable video playback.');
});


// Hide the loading screen after the page and local assets have loaded.
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.classList.add('hide');
}
window.addEventListener('load', hidePreloader);
// Fallback in case the load event has already fired.
if (document.readyState === 'complete') hidePreloader();
window.addEventListener('load', function () {
  const loader = document.getElementById('preloader');

  if (loader) {
    loader.style.display = 'none';
  }
});

setTimeout(function () {
  const loader = document.getElementById('preloader');

  if (loader) {
    loader.style.display = 'none';
  }
}, 3000);
// Automatic hero carousel with arrows, dots, and swipe-friendly touch support.
(() => {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.hero-slide')];
  const dots = [...slider.querySelectorAll('.slider-dots button')];
  const prev = slider.querySelector('.slider-arrow.prev');
  const next = slider.querySelector('.slider-arrow.next');
  let current = 0;
  let timer;
  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  };
  const start = () => { clearInterval(timer); timer = setInterval(() => show(current + 1), 5000); };
  prev?.addEventListener('click', () => { show(current - 1); start(); });
  next?.addEventListener('click', () => { show(current + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', start);
  show(0); start();
})();

// Right-side quick navigation grid button.
(() => {
  const toggle = document.querySelector('.side-tool-menu');
  const links = document.querySelector('.side-quick-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.side-toolbar')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();
