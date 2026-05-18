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
