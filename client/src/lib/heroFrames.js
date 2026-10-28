import frameData from './heroFrameMap.json';

// Scroll-driven "video" for the home hero: each frame is a separate image in
// public/hero-frames/{lg,sm}/NNN.webp, drawn onto the hero canvas according to how far the
// visitor has scrolled through #track. MAP maps a scroll step to a frame index.
//
// Performance notes:
// - Phones / data-saver get the 640px set and only every other frame (~1.8 MB instead of 11 MB).
// - Frame 0 loads first, the rest load a few at a time in coarse-to-fine order (every 16th,
//   then every 8th, ...) once the page is idle, so scrubbing works early with fewer frames.
// - The draw loop only runs while the scroll position is still easing toward its target.
const { count: COUNT, map: MAP } = frameData;
const N = MAP.length;
const CONCURRENCY = 6;

// Shared across hero mounts so frames are fetched and decoded once per visit.
const cache = { variant: null, step: 1, imgs: [], ready: [], queued: false, onReady: null };

const pickVariant = () => {
  const saveData = navigator.connection && navigator.connection.saveData;
  const small = window.innerWidth <= 820;
  return small || saveData ? { variant: 'sm', step: 2 } : { variant: 'lg', step: 1 };
};

const frameUrl = (i) => `/hero-frames/${cache.variant}/${String(i).padStart(3, '0')}.webp`;

function loadFrame(i) {
  return new Promise((resolve) => {
    if (cache.imgs[i]) {
      resolve();
      return;
    }
    const im = new Image();
    im.decoding = 'async';
    // decode() finishes decoding off the main thread, so drawing the frame later is cheap.
    // Without it, the first drawImage of each frame decoded it synchronously mid-scroll.
    const done = () => {
      cache.ready[i] = true;
      if (cache.onReady) cache.onReady(i);
      resolve();
    };
    im.src = frameUrl(i);
    im.decode().then(done, () => (im.complete && im.naturalWidth ? done() : resolve()));
    cache.imgs[i] = im;
  });
}

// Coarse-to-fine order: every 16th frame, every 8th, ... down to every `minStride`-th frame.
function loadOrder(minStride) {
  const order = [];
  for (let stride = 16; stride >= minStride; stride /= 2) {
    for (let i = 0; i < COUNT; i += stride) {
      if (!cache.imgs[i] && !order.includes(i)) order.push(i);
    }
  }
  return order;
}

function runQueue(queue) {
  const worker = () => (queue.length ? loadFrame(queue.shift()).then(worker) : null);
  for (let w = 0; w < CONCURRENCY; w += 1) worker();
}

// Only frame 0 loads with the page. Everything else waits for the visitor's first scroll,
// then arrives coarse-to-fine (every 16th frame first, so scrubbing works almost at once).
// Loading the frames during page load used to download ~1–5 MB and decode dozens of images
// while the page was still starting up, slowing it for everyone, including visitors who never
// scroll the hero.
function startLoading() {
  if (cache.queued) return;
  cache.queued = true;
  loadFrame(0);
  const rest = () => {
    window.removeEventListener('scroll', rest);
    runQueue(loadOrder(cache.step));
  };
  window.addEventListener('scroll', rest, { passive: true });
}

// Nearest frame that has finished loading (searching backwards first, then forwards).
function nearestReady(k) {
  for (let d = 0; d < COUNT; d += 1) {
    if (k - d >= 0 && cache.ready[k - d]) return cache.imgs[k - d];
    if (k + d < COUNT && cache.ready[k + d]) return cache.imgs[k + d];
  }
  return null;
}

// Binds the frames to the hero currently in the DOM. Returns a cleanup function.
export default function initHeroFrames() {
  const cv = document.getElementById('c');
  const track = document.getElementById('track');
  if (!cv || !track) return () => {};

  const picked = pickVariant();
  if (!cache.variant) Object.assign(cache, picked);

  const ctx = cv.getContext('2d');
  const fill = document.getElementById('fill');
  const caps = [...track.querySelectorAll('.cap')];
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0;
  let h = 0;
  let cur = 0;
  let target = 0;
  let lastDrawn = null;
  let frame = 0;

  const draw = (force) => {
    const k = MAP[Math.round(cur)];
    const im = cache.ready[k] ? cache.imgs[k] : nearestReady(k);
    if (!im || (!force && im === lastDrawn)) return;
    lastDrawn = im;
    const s = Math.max(w / im.naturalWidth, h / im.naturalHeight);
    const dw = im.naturalWidth * s;
    const dh = im.naturalHeight * s;
    ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  const progress = () => {
    const r = track.getBoundingClientRect();
    const p = -r.top / (r.height - window.innerHeight);
    return Math.min(1, Math.max(0, p));
  };

  const tick = () => {
    frame = 0;
    const p = progress();
    target = p * (N - 1);
    cur = calm ? target : cur + (target - cur) * 0.18;
    if (Math.abs(target - cur) < 0.01) cur = target;
    draw(false);
    if (fill) fill.style.height = `${p * 100}%`;
    caps.forEach((c) => c.classList.toggle('on', p >= +c.dataset.from && p < +c.dataset.to));
    // Keep easing only while we have not reached the target; scroll events restart the loop.
    if (cur !== target) frame = requestAnimationFrame(tick);
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  const size = () => {
    const d = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.clientWidth;
    h = cv.clientHeight;
    cv.width = Math.round(w * d);
    cv.height = Math.round(h * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    draw(true);
  };

  // A newly loaded frame may be closer to the current position than the one on screen. Batch
  // these into the next animation frame: frames arrive in bursts of several at a time.
  let readyFrame = 0;
  cache.onReady = () => {
    if (!readyFrame) readyFrame = requestAnimationFrame(() => { readyFrame = 0; draw(false); });
  };

  startLoading();
  size();
  schedule();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', size);

  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', size);
    cancelAnimationFrame(frame);
    cancelAnimationFrame(readyFrame);
    cache.onReady = null;
  };
}
