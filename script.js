const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const themeButton = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');

// Mobile navigation
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
  menuButton.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) {
      menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      menuButton.setAttribute('aria-label', 'Mở menu');
    }
  });
});

// Light / dark theme; remember preference in this browser
const savedTheme = localStorage.getItem('dang-khoi-theme');
if (savedTheme === 'dark') document.body.classList.add('dark-mode');

function updateThemeButton() {
  if (!themeButton) return;
  const dark = document.body.classList.contains('dark-mode');
  themeButton.innerHTML = dark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  themeButton.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
}
updateThemeButton();

themeButton?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dang-khoi-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateThemeButton();
});

// Reveal elements as they enter the viewport
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Back-to-top visibility
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form opens the visitor's email app. Replace this address with your real email.
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || !email || !message) {
    if (formNote) formNote.textContent = 'Bạn vui lòng điền đầy đủ họ tên, email và lời nhắn nhé.';
    return;
  }

  const recipient = 'YOUR_EMAIL@example.com'; // Thay bằng email thật của bạn.
  if (recipient === 'YOUR_EMAIL@example.com') {
    if (formNote) formNote.textContent = 'Biểu mẫu đã kiểm tra thông tin, nhưng chưa thể gửi vì bạn cần thay YOUR_EMAIL@example.com bằng email thật trong file script.js.';
    return;
  }

  const subject = encodeURIComponent('Lời nhắn từ portfolio — ' + name);
  const body = encodeURIComponent('Người gửi: ' + name + '\nEmail: ' + email + '\n\nLời nhắn:\n' + message);
  window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;
  if (formNote) formNote.textContent = 'Đang mở ứng dụng email để bạn gửi lời nhắn.';
});

// Current year in footer
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();