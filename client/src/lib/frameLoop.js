// One shared scroll/resize loop for scroll-driven effects. Each subscriber gives a `read`
// (measure layout: getBoundingClientRect, offsetHeight, scrollY …) and a `write` (apply
// styles). Once per animation frame every read runs first, then every write, so the page is
// laid out once per frame. Running read-then-write per element instead forces a fresh layout
// for every element (layout thrashing / "forced reflow").
//
// When Lenis smooth scrolling is running it drives the loop instead (driveFromScroller): Lenis
// sets the scroll position in its own animation frame, and if our writes had already happened
// earlier in that frame, its scrollTo would force a layout. Running right after Lenis avoids it.
const subscribers = new Set();
let frame = 0;
let external = false;

const run = () => {
  frame = 0;
  const list = [...subscribers];
  const measured = list.map((s) => s.read());
  list.forEach((s, i) => s.write(measured[i]));
};

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(run);
};

// Native scroll events are ignored while an external scroller drives the loop.
const onScroll = () => {
  if (!external) schedule();
};

// Called by lib/smoothScroll.js: pass true when Lenis starts, false when it stops. Returns the
// function Lenis should call on each of its scroll updates.
export function driveFromScroller(on) {
  external = on;
  return () => {
    if (!subscribers.size) return;
    cancelAnimationFrame(frame);
    run();
  };
}

// Returns an unsubscribe function. The first update runs on the next frame (batched with any
// other effects mounting at the same time) rather than synchronously during mount.
export default function onFrame(read, write) {
  const sub = { read, write };
  if (subscribers.size === 0) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
  }
  subscribers.add(sub);
  schedule();
  return () => {
    subscribers.delete(sub);
    if (subscribers.size === 0) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}
