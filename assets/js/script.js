// =======================
// CODE TECH INTERACTIONS
// =======================

// 🔹 Smooth Scroll Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 🔹 Fade-in Animation saat Scroll
const animatedElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

animatedElements.forEach(el => observer.observe(el));

// 🔹 Responsive Navbar (untuk mobile)
const navbar = document.querySelector('.navbar');
let menuOpen = false;

// Tambahkan tombol hamburger otomatis (jika belum ada)
const mobileBtn = document.createElement('div');
mobileBtn.className = 'menu-toggle';
mobileBtn.innerHTML = '<span></span><span></span><span></span>';
navbar.querySelector('.container').appendChild(mobileBtn);

mobileBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navbar.classList.toggle('active');
  mobileBtn.classList.toggle('open');
});

// Tambahkan style untuk tombol hamburger
const style = document.createElement('style');
style.textContent = `
.menu-toggle {
  display: none;
  width: 28px;
  height: 20px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.menu-toggle span {
  display: block;
  height: 3px;
  background: #fff;
  border-radius: 2px;
  transition: 0.3s;
}
.menu-toggle.open span:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}
.menu-toggle.open span:nth-child(2) {
  opacity: 0;
}
.menu-toggle.open span:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
}
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }
}
`;
document.head.appendChild(style);

