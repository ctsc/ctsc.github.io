function pic(file, caption, alt) {
  return {
    src: `/assets/images/gallery/${file}`,
    caption: caption || '',
    alt: alt || caption || '',
  };
}

function clip(poster, video, caption, extra) {
  extra = extra || {};
  return {
    poster: `/assets/images/gallery/${poster}`,
    video: `/assets/videos/${video}`,
    caption: caption || '',
    alt: extra.alt || caption || '',
    muted: extra.muted,
  };
}

const SECTIONS = [
  {
    id: 'hackathons',
    title: 'Hackathons',
    photos: [
      pic('xyz-07.jpeg', 'Emory Hacks'),
      pic('xyz-14.jpeg', 'UGA Hacks'),
      pic('xyz-15.jpeg', 'Hacklytics GT'),
      pic('IMG_0989.jpg', 'Winning 1st at Emory Hacks.'),
    ],
  },
  {
    id: 'graduation',
    title: 'BS CS Graduation',
    photos: [
      pic('xyz-01.jpg', '', 'Graduation at GSU'),
      pic('xyz-05.jpeg', '', 'Graduation'),
      pic('xyz-09.png', '', 'Graduation'),
      pic('graduation-gsu.jpg', 'Graduation at GSU'),
      pic('1741323783582618267.JPG', "Bachelor's graduation pics."),
    ],
  },
  {
    id: 'progsu',
    title: 'progsu/Hacklanta',
    photos: [
      pic('hacklanta.jpg', 'Hacklanta II'),
      pic('xyz-12.jpg', 'Tabling Event'),
      pic('xyz-13.png', 'Spring 2026 Kickoff'),
      pic('xyz-18.jpeg', 'Claude/Anthropic Event'),
      pic('claude-atlanta.png', 'Claude Atlanta'),
      pic('ai-ideathon.png', 'AI Ideathon (AI GT x progsu)'),
      pic('make-your-mark.jpg', 'Hacklanta I'),
      pic('hackathon-room.jpg', 'Hacklanta I judges'),
      pic('ibm-skillsbuild.jpg', 'IBM SkillsBuild: AI Accelerator'),
      pic('hacklanta-ii.png', 'Hacklanta II'),
      pic('mbrdna-mario-kart.png', 'MBRDNA panel and Mario Kart'),
      pic('intern-panel.png', 'Intern Panel'),
      pic('resume-workshop.png', 'Resume Workshop'),
      pic('fall-kickoff-carnival.webp', '$1000 Fall Kickoff Carnival'),
      pic('prizepicks-recruiting.png', 'PrizePicks Internship Recruiting'),
      pic('progirls-loop-lounge.png', 'ProGirls Loop and Lounge'),
      pic('eboard-interest.png', 'Eboard Interest Meeting'),
      pic('mercedes-internship.png', 'Mercedes Internship'),
      pic('group-stairs.jpg', 'Merc Benz R&D Group'),
      pic('crack-the-code.png', 'Crack the Code'),
      pic('ai-ideathon-feb.png', '$500 AI Ideathon'),
      pic('tournament-150.png', '$150 Tournament x Kickoff'),
      pic('fanduel-ping-pong.png', 'FanDuel Recruiting x Ping Pong'),
      pic('tournament-100.jpg', '$100 Tournament x Kickoff'),
    ],
  },
  {
    id: 'personal',
    title: 'Personal',
    photos: [
      pic('karaoke.jpg', 'Karaoke'),
      pic('xyz-03.jpg', 'Bert'),
      pic('xyz-06.jpeg', 'Deftones/Shaky Knees 2025'),
      pic('xyz-16.jpeg', 'My Car Pegasus'),
      pic('xyz-20.jpg', 'Xmas Pic'),
      pic('xyz-21.jpeg', 'Sisters Wedding'),
      pic('xyz-23.jpeg', 'Bayern Munich @ BoA'),
      pic('xyz-26.png', 'Sisters Wedding pt 2'),
      pic('fanduel.jpg', 'FanDuel'),
      pic('panel.jpg', 'FanDuel panel'),
      pic('IMG_3788.JPG', 'Formal photo with Kathy.'),
      pic('IMG_2854.jpg', 'Another formal with Kathy :)'),
    ],
  },
];

const VIEWS = ['home', 'blog', 'about', 'gallery'];

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
let galleryReady = false;

function thumbPath(path) {
  const name = path.slice(path.lastIndexOf('/') + 1).replace(/\.[^.]+$/, '');
  return `/assets/images/gallery/thumbs/${name}.jpg`;
}

const DRIFT_MS = 15400;
const DRIFT_GAP = 1980;
const DRIFT_MAX = 8;
const driftLayer = document.querySelector('[data-drift]');
const driftPool = [...new Set(SECTIONS.flatMap((section) => (
  section.photos.map((item) => thumbPath(item.video ? item.poster : item.src))
)))].sort(() => Math.random() - 0.5);
const driftReady = [];
let driftNext = 0;
let driftCursor = 0;
let driftTimer = 0;
let driftOn = false;
let driftSpawned = 0;
const DRIFT_LANES = [-0.55, 0.2, -0.2, 0.55];

function markDriftReady(src) {
  if (driftReady.includes(src)) return;
  driftReady.push(src);
  if (driftOn && driftReady.length <= 4) spawnDrift(true);
}

function loadDrift(count) {
  for (let i = 0; i < count && driftNext < driftPool.length; i += 1) {
    const src = driftPool[driftNext];
    driftNext += 1;
    const img = new Image();
    if (driftNext <= 4) img.fetchPriority = 'high';
    img.onload = () => markDriftReady(src);
    img.onerror = () => markDriftReady(src);
    img.src = src;
    if (img.decode) {
      img.decode().then(() => markDriftReady(src), () => {
        if (img.complete) markDriftReady(src);
      });
    }
  }
}

function spawnDrift(seed) {
  if (!driftReady.length || driftLayer.childElementCount >= DRIFT_MAX) return;
  const src = driftReady[driftCursor % driftReady.length];
  driftCursor += 1;
  loadDrift(1);
  const left = driftSpawned % 2 === 1;
  const lane = DRIFT_LANES[Math.floor(driftSpawned / 2) % DRIFT_LANES.length];
  driftSpawned += 1;
  const tilt = lane + (Math.random() - 0.5) * 0.12;
  const angle = left ? Math.PI - tilt : tilt;
  const reach = 0.8 + Math.random() * 0.2;
  const img = document.createElement('img');
  img.className = 'drift-pic';
  img.src = src;
  img.alt = '';
  img.style.setProperty('--x', `${Math.cos(angle) * reach * 46}vw`);
  img.style.setProperty('--y', `${Math.sin(angle) * reach * 50}vh`);
  if (seed) img.style.animationDelay = `${-Math.random() * DRIFT_MS * 0.5}ms`;
  img.addEventListener('animationend', () => img.remove(), { once: true });
  driftLayer.prepend(img);
}

function startDrift() {
  if (driftOn || reduceMotion || !driftLayer) return;
  driftOn = true;
  if (!driftNext) loadDrift(6);
  for (let i = 0; i < Math.min(4, driftReady.length); i += 1) spawnDrift(true);
  spawnDrift(false);
  driftTimer = window.setInterval(() => spawnDrift(false), DRIFT_GAP);
}

function stopDrift() {
  driftOn = false;
  window.clearInterval(driftTimer);
  if (driftLayer) driftLayer.replaceChildren();
}

function shellView(id) {
  return id.startsWith('gallery') ? 'gallery' : id;
}

function sectionFrom(id) {
  if (!id.startsWith('gallery-')) return null;
  const key = id.slice(8);
  return SECTIONS.some((section) => section.id === key) ? key : null;
}

function ensureGallery(sectionId) {
  if (!galleryReady) {
    renderSectionIndex();
    bindGallery();
    galleryReady = true;
  }
  showGalleryMode(sectionId);
}

function renderSectionIndex() {
  const root = document.querySelector('[data-gallery-index]');
  root.replaceChildren();
  SECTIONS.forEach((section, index) => {
    const cover = section.photos[0];
    const full = cover.video ? cover.poster : cover.src;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-section';
    button.dataset.nav = `gallery-${section.id}`;
    button.style.setProperty('--a', `${index * 60}deg`);
    button.setAttribute('aria-label', section.title);
    const img = document.createElement('img');
    img.src = thumbPath(full);
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    const label = document.createElement('span');
    label.textContent = section.title;
    button.append(img, label);
    root.append(button);
  });
}

function showGalleryMode(sectionId) {
  const indexRoot = document.querySelector('[data-gallery-index]');
  const photoRoot = document.querySelector('[data-gallery]');
  const title = document.querySelector('[data-gallery-title]');
  const back = document.querySelector('[data-gallery-back]');
  const section = SECTIONS.find((item) => item.id === sectionId) || null;

  closeGallery();

  if (!section) {
    title.textContent = 'Photo Gallery';
    back.hidden = true;
    indexRoot.hidden = false;
    photoRoot.hidden = true;
    photoRoot.replaceChildren();
    return;
  }

  title.textContent = section.title;
  back.hidden = false;
  indexRoot.hidden = true;
  photoRoot.hidden = false;
  renderPhotos(section.photos);
}

function renderPhotos(photos) {
  const root = document.querySelector('[data-gallery]');
  root.replaceChildren();
  photos.forEach((item) => {
    const figure = document.createElement('figure');
    const full = item.video ? item.poster : item.src;
    if (item.video) {
      const video = document.createElement('video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.muted = !!item.muted;
      video.poster = full;
      video.src = item.video;
      video.setAttribute('aria-label', item.caption || item.alt);
      figure.append(video);
    } else {
      const img = document.createElement('img');
      img.src = full;
      img.alt = item.alt;
      img.loading = 'lazy';
      img.decoding = 'async';
      figure.append(img);
    }
    if (item.caption) {
      const caption = document.createElement('figcaption');
      caption.textContent = item.caption;
      figure.append(caption);
    }
    root.append(figure);
  });
}

function closeGallery() {
  const root = document.querySelector('[data-gallery]');
  if (!root) return;
  root.querySelectorAll('video').forEach((video) => {
    video.pause();
  });
}

function bindGallery() {}

function normalizeView(id) {
  if (id === 'blog' || id === 'content' || id === 'about') return 'about';
  if (id === 'contact') return 'home';
  if (id.startsWith('gallery-') && !sectionFrom(id)) return 'gallery';
  return id;
}

function readHash() {
  const id = location.hash.replace('#', '');
  if (id === 'gallery') return id;
  if (sectionFrom(id)) return id;
  if (id === 'blog' || id === 'content' || id === 'about') return 'about';
  if (id === 'contact') return 'home';
  return VIEWS.includes(id) ? id : 'home';
}

function setNav(id) {
  const navId = shellView(id) === 'gallery' ? 'gallery' : id === 'about' ? 'blog' : id;
  document.querySelectorAll('.topbar [data-nav]').forEach((button) => {
    if (button.dataset.nav === navId) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
}

function show(next, options) {
  const instant = options && options.instant;
  const push = options && options.push;
  next = normalizeView(next);
  const allowed = VIEWS.includes(next) || next === 'gallery' || sectionFrom(next) || next === 'about';
  if (!allowed || next === current || animating) return;

  const nextShell = shellView(next);
  const currentShell = shellView(current);
  const sameShell = nextShell === currentShell;

  const finish = () => {
    if (nextShell === 'gallery') ensureGallery(sectionFrom(next));
    else closeGallery();

    if (!sameShell) {
      const outgoing = document.querySelector(`[data-view="${currentShell}"]`);
      const incoming = document.querySelector(`[data-view="${nextShell}"]`);
      outgoing.classList.remove('is-on', 'is-out');
      outgoing.hidden = true;
      incoming.hidden = false;
      incoming.classList.add('is-on');
    } else {
      const shell = document.querySelector(`[data-view="${currentShell}"]`);
      if (shell) shell.classList.remove('is-out');
    }

    current = next;
    setNav(next);
    if (push) history.pushState({ view: next }, '', `#${next}`);
    if (nextShell === 'home') {
      layout();
      startLoop();
    } else stopLoop();
    const active = document.querySelector(`[data-view="${nextShell}"]`);
    if (active) active.scrollTop = 0;
    window.scrollTo(0, 0);
    animating = false;
  };

  if (sameShell || instant || reduceMotion) {
    finish();
    return;
  }

  animating = true;
  document.querySelector(`[data-view="${currentShell}"]`).classList.add('is-out');
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
  fontPx = 14;
  ctx.font = `${fontPx}px Mojangles, VT323, monospace`;
  const glyphW = ctx.measureText('0').width || fontPx * 0.6;
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
  if (running || current !== 'home') return;
  running = true;
  lastTick = 0;
  rafId = window.requestAnimationFrame(frame);
  if (!reduceMotion) startDrift();
}

function stopLoop() {
  running = false;
  if (rafId) window.cancelAnimationFrame(rafId);
  rafId = 0;
  stopDrift();
}

function bind() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-nav]');
    if (!button) return;
    show(button.dataset.nav, { push: true });
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
      startLoop();
    }, 120);
  });

  // Re-layout once the stage has a real width (common mobile first-paint miss).
  window.requestAnimationFrame(() => {
    layout();
    startLoop();
  });
}

function boot() {
  bind();

  const start = readHash();
  if (shellView(start) !== 'home') {
    document.querySelector('[data-view="home"]').classList.remove('is-on');
    document.querySelector('[data-view="home"]').hidden = true;
    const incoming = document.querySelector(`[data-view="${shellView(start)}"]`);
    incoming.hidden = false;
    incoming.classList.add('is-on');
    current = start;
  }
  setNav(current);
  history.replaceState({ view: current }, '', `#${current}`);
  if (shellView(current) === 'gallery') ensureGallery(sectionFrom(current));

  layout();
  if (current === 'home') startLoop();

  document.fonts.load('14px Mojangles').then(() => {
    if (current === 'home') {
      layout();
      startLoop();
    }
  }).catch(() => {});
}

boot();
