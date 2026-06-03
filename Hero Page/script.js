const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const revealElements = document.querySelectorAll(
  ".service-card, .portfolio-item, .section-header, .cta-content"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

const filterBtns = document.querySelectorAll('.filter-btn');
const sections   = document.querySelectorAll('.menu-section');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    sections.forEach(sec => {
      const match = filter === 'all' || sec.dataset.category === filter;
      sec.style.display = match ? '' : 'none';
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── PHOTO LIGHTBOX ──
const lightbox      = document.getElementById('lightbox');
const lbImg         = document.getElementById('lightboxImg');
const lbCaption     = document.getElementById('lightboxCaption');
const lbCounter     = document.getElementById('lightboxCounter');
const lbClose       = document.getElementById('lightboxClose');
const lbPrev        = document.getElementById('lightboxPrev');
const lbNext        = document.getElementById('lightboxNext');

if (lightbox) {
  const photoItems = Array.from(document.querySelectorAll('.photo-item[data-src]'));
  let current = 0;

  function showPhoto(index) {
    const item = photoItems[index];
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = item.dataset.src;
      lbImg.alt = item.dataset.caption || '';
      lbCaption.textContent = item.dataset.caption || '';
      lbCounter.textContent = `${index + 1} / ${photoItems.length}`;
      lbImg.style.opacity = '1';
    }, 150);
    current = index;
  }

  function openLightbox(index) {
    showPhoto(index);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  photoItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lbClose.addEventListener('click', closeLightbox);

  lbPrev.addEventListener('click', () => {
    showPhoto((current - 1 + photoItems.length) % photoItems.length);
  });

  lbNext.addEventListener('click', () => {
    showPhoto((current + 1) % photoItems.length);
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target === lbImg.parentElement) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showPhoto((current - 1 + photoItems.length) % photoItems.length);
    if (e.key === 'ArrowRight')  showPhoto((current + 1) % photoItems.length);
  });
}