// Edit photo paths and captions here.
const GALLERY = [
  {
    src: '/assets/images/gallery/1741323783582618267.JPG',
    alt: "Bachelor's graduation pics",
    caption: "Bachelor's graduation pics.",
  },
  {
    src: '/assets/images/gallery/IMG_0989.jpg',
    alt: 'Winning 1st at Emory Hacks',
    caption: 'Winning 1st at Emory Hacks.',
  },
  {
    src: '/assets/images/gallery/IMG_3788.JPG',
    alt: 'Formal photo with Kathy',
    caption: 'Formal photo with Kathy.',
  },
  {
    src: '/assets/images/gallery/IMG_1896.jpg',
    alt: '1st place at Georgia state championships',
    caption: '1st place at Georgia state championships.',
  },
  {
    src: '/assets/images/gallery/IMG_2854.jpg',
    alt: 'Another formal with Kathy :)',
    caption: 'Another formal with Kathy :)',
  },
  {
    src: '/assets/images/gallery/karaoke.jpg',
    alt: 'Karaoke',
    caption: 'Karaoke',
  },
  {
    src: '/assets/images/gallery/fanduel.jpg',
    alt: 'FanDuel',
    caption: 'FanDuel',
  },
  {
    src: '/assets/images/gallery/hacklanta.jpg',
    alt: 'Hacklanta II',
    caption: 'Hacklanta II',
  },
  {
    src: '/assets/images/gallery/hackathon-room.jpg',
    alt: 'Hacklanta I judges',
    caption: 'Hacklanta I judges',
  },
  {
    src: '/assets/images/gallery/braves.jpg',
    alt: 'Intern Braves Game',
    caption: 'Intern Braves Game',
  },
  {
    src: '/assets/images/gallery/make-your-mark.jpg',
    alt: 'Hacklanta I',
    caption: 'Hacklanta I',
  },
  {
    src: '/assets/images/gallery/panel.jpg',
    alt: 'FanDuel panel',
    caption: 'FanDuel panel',
  },
  {
    src: '/assets/images/gallery/graduation-gsu.jpg',
    alt: 'Graduation at GSU',
    caption: 'Graduation at GSU',
  },
  {
    src: '/assets/images/gallery/group-stairs.jpg',
    alt: 'Merc Benz R&D Group',
    caption: 'Merc Benz R&D Group',
  },
  {
    poster: '/assets/images/gallery/deadlift-pov.jpg',
    video: '/assets/videos/deadlift-pov.mov',
    muted: true,
    alt: 'Deadlift',
    caption: 'Deadlift',
  },
  {
    poster: '/assets/images/gallery/deadlift.jpg',
    video: '/assets/videos/deadlift.mp4',
    alt: 'Deadlift',
    caption: 'Deadlift',
  },
  {
    poster: '/assets/images/gallery/opencv-form.jpg',
    video: '/assets/videos/opencv-form.mov',
    muted: true,
    alt: 'OpenCV form analysis',
    caption: 'OpenCV form analysis',
  },
];

const VIEWS = ['home', 'content', 'about', 'gallery', 'contact'];

const stage = document.getElementById('name-stage');
const canvas = document.getElementById('binary');
const ctx = canvas.getContext('2d', { alpha: true });

let cells = [];
let cols = 0;
let rows = 0;
let pitchX = 12;
let pitchY = 14;
let fontPx = 20;
let originX = 0;
let scan = 0;
let running = false;
let rafId = 0;
let lastTick = 0;
let current = 'home';
let animating = false;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderGallery() {
  const root = document.querySelector('[data-gallery]');
  GALLERY.forEach((item) => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const caption = document.createElement('figcaption');
    img.src = item.video ? item.poster : item.src;
    img.alt = item.alt;
    if (item.video) {
      figure.dataset.video = item.video;
      if (item.muted) figure.dataset.muted = 'true';
    }
    caption.textContent = item.caption;
    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', item.caption);
    figure.append(img, caption);
    root.append(figure);
  });
}

function closeFigure(figure) {
  figure.classList.remove('is-open');
  const video = figure.querySelector('video');
  if (video) {
    video.pause();
    video.remove();
  }
  const img = figure.querySelector('img');
  if (img) img.hidden = false;
}

function closeGallery() {
  const root = document.querySelector('[data-gallery]');
  if (!root) return;
  root.querySelectorAll('figure.is-open').forEach(closeFigure);
}

function openFigure(figure) {
  if (figure.classList.contains('is-open')) {
    closeFigure(figure);
    return;
  }
  figure.classList.add('is-open');
  if (!figure.dataset.video) return;
  const img = figure.querySelector('img');
  const video = document.createElement('video');
  video.controls = true;
  video.playsInline = true;
  video.muted = figure.dataset.muted === 'true';
  video.src = figure.dataset.video;
  img.hidden = true;
  img.after(video);
  video.play().catch(() => {});
}

function bindGallery() {
  const root = document.querySelector('[data-gallery]');
  root.addEventListener('click', (event) => {
    if (event.target.closest('video')) return;
    const figure = event.target.closest('figure');
    if (!figure || !root.contains(figure)) return;
    openFigure(figure);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const figure = event.target.closest('figure');
    if (!figure || event.target.closest('video')) return;
    event.preventDefault();
    openFigure(figure);
  });
}

function readHash() {
  const id = location.hash.replace('#', '');
  return VIEWS.includes(id) ? id : 'home';
}

function setNav(id) {
  const navId = id === 'about' || id === 'gallery' ? 'content' : id;
  document.querySelectorAll('.topbar [data-nav]').forEach((button) => {
    if (button.dataset.nav === navId) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
}

function show(next, options) {
  const instant = options && options.instant;
  const push = options && options.push;
  if (!VIEWS.includes(next) || next === current || animating) return;

  const finish = () => {
    if (next !== 'gallery') closeGallery();
    const outgoing = document.querySelector(`[data-view="${current}"]`);
    const incoming = document.querySelector(`[data-view="${next}"]`);
    outgoing.classList.remove('is-on', 'is-out');
    outgoing.hidden = true;
    incoming.hidden = false;
    incoming.classList.add('is-on');
    current = next;
    setNav(next);
    if (push) history.pushState({ view: next }, '', `#${next}`);
    if (next === 'home') {
      layout();
      startLoop();
    } else stopLoop();
    window.scrollTo(0, 0);
    animating = false;
  };

  if (instant || reduceMotion) {
    finish();
    return;
  }

  animating = true;
  document.querySelector(`[data-view="${current}"]`).classList.add('is-out');
  window.setTimeout(finish, 200);
}

const GLYPHS = {
  ' ': ['000', '000', '000', '000', '000', '000', '000', '000', '000'],
  C: ['00000', '00000', '01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  T: ['00000', '00000', '11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  a: ['00000', '00000', '00000', '00000', '01110', '00001', '01111', '10001', '01111'],
  e: ['00000', '00000', '00000', '00000', '01110', '10001', '11111', '10000', '01110'],
  i: ['0', '0', '1', '0', '1', '1', '1', '1', '1'],
  n: ['00000', '00000', '00000', '00000', '10110', '11001', '10001', '10001', '10001'],
  r: ['000', '000', '000', '000', '111', '100', '100', '100', '100'],
  t: ['000', '000', '010', '010', '111', '010', '010', '010', '010'],
  y: ['00000', '00000', '00000', '00000', '10001', '10001', '01111', '00001', '01110'],
};

function textCells(text) {
  const found = [];
  let x = 0;
  const chars = Array.from(text);
  chars.forEach((ch, index) => {
    const glyph = GLYPHS[ch];
    if (!glyph) return;
    const width = glyph[0].length;
    glyph.forEach((line, row) => {
      Array.from(line).forEach((mark, col) => {
        if (mark !== '1') return;
        found.push({
          col: x + col,
          row,
          bit: Math.random() < 0.5 ? '0' : '1',
        });
      });
    });
    const next = chars[index + 1];
    const gap = ch === 'r' && next === 't' ? 2 : 1;
    x += width + (next ? gap : 0);
  });
  return { cells: found, cols: Math.max(1, x), rows: GLYPHS.T.length };
}

function layout() {
  if (!ctx || !stage) return;
  const target = Math.max(1, stage.clientWidth || window.innerWidth);
  const lines = ['Carter Tierney'];
  const parts = lines.map((line) => textCells(line));
  const maxCols = Math.max(1, ...parts.map((part) => part.cols));
  const next = [];
  let rowCursor = 0;

  parts.forEach((part, index) => {
    const shift = Math.floor((maxCols - part.cols) / 2);
    part.cells.forEach((item) => {
      next.push({
        col: item.col + shift,
        row: item.row + rowCursor,
        bit: item.bit,
      });
    });
    rowCursor += part.rows + (index < parts.length - 1 ? 1 : 0);
  });

  cells = next;
  cols = maxCols;
  rows = Math.max(1, rowCursor);
  const probe = document.createElement('canvas').getContext('2d');
  fontPx = 14;
  probe.font = `${fontPx}px Mojangles, VT323, monospace`;
  const glyphW = probe.measureText('0').width || fontPx * 0.6;
  pitchX = glyphW * 1.02;
  pitchY = fontPx * 0.78;
  const rawWidth = cols * pitchX;
  if (rawWidth > target) {
    const scale = target / rawWidth;
    pitchX *= scale;
    pitchY *= scale;
    fontPx *= scale;
  }
  const cssWidth = Math.ceil(cols * pitchX);
  const cssHeight = Math.ceil(rows * pitchY);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  originX = 0;
  canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
  canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paint();
}

function paint() {
  if (!ctx) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);
  ctx.font = `${fontPx}px Mojangles, VT323, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  cells.forEach((item) => {
    const dist = Math.abs(item.col - scan);
    ctx.fillStyle = dist < 1.6 ? '#f2f2f2' : '#d2d2d2';
    ctx.fillText(item.bit, originX + item.col * pitchX + pitchX / 2, item.row * pitchY + pitchY / 2);
  });
}

function tick() {
  if (!cells.length) return;
  for (let i = 0; i < 3; i += 1) {
    const item = cells[(Math.random() * cells.length) | 0];
    item.bit = item.bit === '0' ? '1' : '0';
  }
  scan += 0.55;
  if (scan > cols + 2) scan = -2;
  paint();
}

function frame(time) {
  if (!running) return;
  const gap = 90;
  if (time - lastTick > gap) {
    lastTick = time;
    tick();
  }
  rafId = window.requestAnimationFrame(frame);
}

function startLoop() {
  if (running || reduceMotion || current !== 'home') return;
  running = true;
  lastTick = 0;
  rafId = window.requestAnimationFrame(frame);
}

function stopLoop() {
  running = false;
  if (rafId) window.cancelAnimationFrame(rafId);
  rafId = 0;
}

function bind() {
  document.querySelectorAll('[data-nav]').forEach((button) => {
    button.addEventListener('click', () => {
      show(button.dataset.nav, { push: true });
    });
  });

  window.addEventListener('popstate', () => {
    show(readHash(), { instant: true });
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopLoop();
    else startLoop();
  });

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      layout();
      if (!reduceMotion) startLoop();
    }, 120);
  });
}

async function boot() {
  renderGallery();
  bindGallery();
  bind();

  const start = readHash();
  if (start !== 'home') {
    document.querySelector('[data-view="home"]').classList.remove('is-on');
    document.querySelector('[data-view="home"]').hidden = true;
    const incoming = document.querySelector(`[data-view="${start}"]`);
    incoming.hidden = false;
    incoming.classList.add('is-on');
    current = start;
  }
  setNav(current);
  history.replaceState({ view: current }, '', `#${current}`);

  try {
    await document.fonts.load('148px Mojangles');
    await document.fonts.ready;
  } catch (err) {
    /* Fall back to VT323 or monospace if Mojangles is blocked. */
  }

  layout();
  if (current === 'home') startLoop();
}

boot();
