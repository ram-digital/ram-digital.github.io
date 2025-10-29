// Lightweight interactions: nav toggle, smooth scroll, reveal on scroll, contact form handling

document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // nav toggle for small screens
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('open');
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior: 'smooth', block: 'start'});
        // close nav on mobile
        if (navLinks.classList.contains('open')) navLinks.classList.remove('open');
      }
    });
  });

  // reveal on scroll
  const revealElems = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // optional: unobserve to improve perf
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealElems.forEach(el => io.observe(el));
});

// Contact form handler: simple mailto fallback
function handleContact(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if(!name || !email || !message){
    alert('Mohon lengkapi semua field.');
    return false;
  }

  // Build mailto (works as fallback, for production use server/email service)
  const subject = encodeURIComponent('Permintaan dari website — ' + name);
  const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
  const mailto = `mailto:youremail@codetech.com?subject=${subject}&body=${body}`;

  // Open mail client
  window.location.href = mailto;
  // Optionally show a success message
  setTimeout(()=>{ alert('Klien diarahkan ke aplikasi email default Anda. Jika tidak terbuka, silakan hubungi kami via WhatsApp.'); }, 400);
  return false;
}
