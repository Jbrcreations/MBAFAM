(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = document.getElementById('dots');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const loader = document.getElementById('loader');
  const progress = document.getElementById('progressBar');
  const swarmField = document.getElementById('swarm');
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

  // ---- the butterfly-swarm page transition ----
  function butterflySwarm() {
    const count = 9;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('span');
      b.className = 'swarm-b';
      b.textContent = '🦋';
      const sy = 10 + Math.random() * 80; // vh
      const size = 16 + Math.random() * 16;
      const delay = (i * 0.045) + Math.random() * 0.05;
      b.style.setProperty('--sy', `${sy}vh`);
      b.style.fontSize = `${size}px`;
      b.style.animationDelay = `${delay}s`;
      swarmField.appendChild(b);
      setTimeout(() => b.remove(), 1500);
    }
  }

  function go(index) {
    if (locked) return;
    const target = Math.max(0, Math.min(slides.length - 1, index));
    if (target === current) return;
    locked = true;
    butterflySwarm();
    slides[current].classList.add('leaving');
    setTimeout(() => {
      current = target;
      update();
    }, 360);
    setTimeout(() => {
      slides.forEach(s => s.classList.remove('leaving'));
      locked = false;
    }, 780);
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

  // ---- ambient magical dressing: twinkling stars + drifting fireflies ----
  function seedTwinkles() {
    const field = document.getElementById('twinkles');
    if (!field) return;
    const n = 26;
    for (let i = 0; i < n; i++) {
      const t = document.createElement('span');
      t.className = 'twinkle';
      const size = 1 + Math.random() * 2;
      t.style.width = `${size}px`;
      t.style.height = `${size}px`;
      t.style.left = `${Math.random() * 100}%`;
      t.style.top = `${Math.random() * 100}%`;
      t.style.animationDelay = `${Math.random() * 4}s`;
      t.style.animationDuration = `${2.6 + Math.random() * 3}s`;
      field.appendChild(t);
    }
  }

  function seedFireflies() {
    const field = document.getElementById('fireflies');
    if (!field) return;
    const n = 14;
    for (let i = 0; i < n; i++) {
      const f = document.createElement('span');
      f.className = 'firefly';
      f.style.left = `${Math.random() * 100}%`;
      f.style.top = `${40 + Math.random() * 55}%`;
      f.style.setProperty('--fx', `${(Math.random() * 16 - 8)}vw`);
      f.style.setProperty('--fy', `${(10 + Math.random() * 18)}vh`);
      f.style.animationDuration = `${7 + Math.random() * 9}s`;
      f.style.animationDelay = `${Math.random() * 8}s`;
      field.appendChild(f);
    }
  }

  seedTwinkles();
  seedFireflies();

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 550);
    update();
  });
})();
