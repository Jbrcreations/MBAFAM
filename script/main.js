(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = document.getElementById('dots');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const loader = document.getElementById('loader');
  const progress = document.getElementById('progressBar');
  let current = 0;
  let locked = false;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = i === 0 ? 'dot active' : 'dot';
    b.setAttribute('aria-label', `Go to page ${i + 1}`);
    b.addEventListener('click', () => go(i));
    dots.appendChild(b);
  });

  function update() {
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    [...dots.children].forEach((d, i) => d.classList.toggle('active', i === current));
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  }

  function go(index) {
    if (locked) return;
    const target = Math.max(0, Math.min(slides.length - 1, index));
    if (target === current) return;
    locked = true;
    slides[current].classList.add('leaving');
    current = target;
    update();
    setTimeout(() => {
      slides.forEach(s => s.classList.remove('leaving'));
      locked = false;
    }, 650);
  }

  prev.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  document.querySelectorAll('.next').forEach(b => b.addEventListener('click', () => go(current + 1)));
  document.querySelector('.replay').addEventListener('click', () => { current = 0; update(); burst(); });
  document.getElementById('topBtn').addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(current + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
  });

  let startX = 0;
  document.addEventListener('touchstart', e => startX = e.changedTouches[0].clientX, {passive: true});
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 55) go(current + (dx < 0 ? 1 : -1));
  }, {passive: true});

  function burst() {
    const field = document.querySelector('.confetti-field');
    for (let i = 0; i < 34; i++) {
      const s = document.createElement('i');
      s.style.left = `${50 + (Math.random() * 36 - 18)}%`;
      s.style.setProperty('--x', `${Math.random() * 220 - 110}px`);
      s.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
      s.style.animationDelay = `${Math.random() * .25}s`;
      field.appendChild(s);
      setTimeout(() => s.remove(), 2300);
    }
  }

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 550);
    update();
  });
})();
