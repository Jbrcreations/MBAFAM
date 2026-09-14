(() => {
  "use strict";

  const defaults = {
    title: "MBA Farewell — 69 Friends • One Journey",
    eyebrow: "MBA FAREWELL • 69 FRIENDS • ONE JOURNEY",
    heroTitle: "Our MBA Story",
    heroSubtitle: "The classes may end. The friendship never will.",
    openingMessage: "To all my wonderful friends — thank you for every laugh, every class moment, every IV, every discussion, every challenge, and every unforgettable memory. I will truly miss you all.",
    journeyTitle: "69 people. One unforgettable family.",
    teamMessage: "We were different teams, different personalities and different dreams.",
    unityMessage: "But whenever one person faced a problem, we stood together as ONE and found a way forward.",
    unityTitle: "THAT WAS OUR MBA UNITY",
    memoryMessage: "From ordinary classroom days to IV adventures, last-minute plans, presentations, jokes and those little moments we never thought we would miss… every memory became a part of our story.",
    futureMessage: "Wherever life takes us, may every one of us achieve the dreams we started this journey with.",
    futureSub: "Wishing you success, happiness, growth and a future brighter than we can imagine.",
    finalThought: "Different teams. Different paths. Different dreams. Yet when it mattered, 69 people became ONE. That unity is the most beautiful memory our MBA gave us.",
    finalGoodbye: "Thank you, guys, for making our MBA life extraordinary. I will miss you all. This is not the end of our story — it is the beginning of everything that comes next.",
    imagePath: "img/IMG-20260914-WA0016.jpg",
    replayText: "↻ Relive Our MBA Journey",
    footer: "Made with memories, friendship & a little MBA madness ❤️"
  };

  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  async function getConfig() {
    try {
      const r = await fetch("customize.json?cache=" + Date.now());
      if (!r.ok) throw new Error("customize.json returned " + r.status);
      return { ...defaults, ...(await r.json()) };
    } catch (e) {
      console.warn("Using built-in content:", e);
      return defaults;
    }
  }

  function applyConfig(data) {
    $$('[data-text]').forEach(el => {
      const key = el.dataset.text;
      if (data[key] != null) el.textContent = String(data[key]);
    });
    document.title = data.title || defaults.title;
    const img = $('#memoryPhoto');
    if (img && data.imagePath) img.src = data.imagePath;
  }

  function revealOnScroll() {
    const elements = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach(e => e.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach(e => observer.observe(e));
  }

  function progress() {
    const bar = $('#progressBar');
    const top = $('#topBtn');
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
      top.classList.toggle('show', scrollY > 450);
    };
    addEventListener('scroll', update, { passive: true });
    update();
  }

  function confetti() {
    const box = $('.confetti');
    const symbols = ['✦', '✧', '•', '❤', '✺', '◆'];
    const count = innerWidth < 600 ? 26 : 45;
    for (let i = 0; i < count; i++) {
      const x = document.createElement('i');
      x.textContent = symbols[i % symbols.length];
      x.style.left = Math.random() * 100 + '%';
      x.style.animationDelay = Math.random() * 8 + 's';
      x.style.animationDuration = 5 + Math.random() * 7 + 's';
      x.style.setProperty('--drift', (-90 + Math.random() * 180) + 'px');
      box.appendChild(x);
    }
  }

  function buttons() {
    $('.begin')?.addEventListener('click', () => $('.message-section')?.scrollIntoView({ behavior: 'smooth' }));
    $('#topBtn')?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
    $('#replay')?.addEventListener('click', () => {
      scrollTo({ top: 0, behavior: 'smooth' });
      document.body.classList.add('replay-flash');
      setTimeout(() => document.body.classList.remove('replay-flash'), 800);
    });
  }

  function imageFallback() {
    const img = $('#memoryPhoto');
    img?.addEventListener('error', () => {
      if (!img.dataset.fallback) {
        img.dataset.fallback = '1';
        img.src = 'img/lydia2.png';
      }
    });
  }

  async function init() {
    const data = await getConfig();
    applyConfig(data);
    revealOnScroll();
    progress();
    confetti();
    buttons();
    imageFallback();
    document.body.classList.add('ready');
    $('#loading')?.remove();
  }

  addEventListener('DOMContentLoaded', init);
})();
