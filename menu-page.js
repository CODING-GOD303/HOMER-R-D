//Tombol Filter
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

//Animasi Scrollreveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── DETAIL MODAL ──
const overlay   = document.getElementById('menuModal');
const modalClose = document.getElementById('modalClose');

const badgeClassMap = {
  'staff pick': 'badge-staff',
  'new': 'badge-new',
  'hot': 'badge-hot',
  'cold': 'badge-cold',
  'iced': 'badge-cold',
  'vegan': 'badge-vegan',
  'bestseller': 'badge-hot',
  'spicy': 'badge-hot',
  'fresh daily': 'badge-new',
};

function openModal(card) {
  const img = document.getElementById('modalImg');
  img.style.opacity = '0';
  img.src = card.dataset.img || '';
  img.alt = card.dataset.name || '';
  img.onload = () => { img.style.opacity = '1'; };

  document.getElementById('modalEmoji').textContent    = card.dataset.emoji    || '';
  document.getElementById('modalCategory').textContent = card.dataset.category || '';
  document.getElementById('modalName').textContent     = card.dataset.name     || '';
  document.getElementById('modalPrice').textContent    = card.dataset.price    || '';
  document.getElementById('modalDesc').textContent     = card.dataset.desc     || '';
  document.getElementById('modalDetails').textContent  = card.dataset.details  || '—';
  document.getElementById('modalTemp').textContent     = card.dataset.temp     || '—';

  const badgesEl = document.getElementById('modalBadges');
  badgesEl.innerHTML = '';
  const rawBadges = (card.dataset.badges || '').split(',').map(b => b.trim()).filter(Boolean);
  rawBadges.forEach(label => {
    const cls = badgeClassMap[label.toLowerCase()] || 'badge-new';
    const span = document.createElement('span');
    span.className = `badge ${cls}`;
    span.textContent = label;
    badgesEl.appendChild(span);
  });

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.menu-card').forEach(card => {
  if (!card.dataset.name) return;
  card.addEventListener('click', () => openModal(card));
});

modalClose.addEventListener('click', closeModal);

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});