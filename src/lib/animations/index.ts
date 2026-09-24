import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { killAllMotion, prefersReducedMotion } from './reduced-motion';
import { initIntro } from './intro';
import { initHeroMotion } from './hero';
import { initReveal, initCoverReveal } from './reveal';
import { initLineReveal } from './text-reveal';
import { initParallax } from './parallax';
import { initMagnetic } from './magnetic';
import { initMarquees } from './marquee';
import { initWordScrub } from './word-scrub';
import { initShowcase } from './showcase';
import { initSmoothScroll, destroySmoothScroll } from './smooth-scroll';
import { initUI, teardownUI } from './ui';
import { runTeardown } from './teardown';

let ready = false;

function runScenes() {
  initHeroMotion();
  initLineReveal();
  initReveal();
  initCoverReveal();
  initParallax();
  initMagnetic();
  initMarquees();
  initWordScrub();
  initShowcase();
}

/**
 * Single entrypoint for all page motion. Runs on astro:page-load (initial
 * load + every ClientRouter swap) and tears down on astro:before-swap so
 * triggers and the smooth-scroller never leak across navigations.
 * The kinetic intro plays only on the very first load (module guard).
 */
export function initMotion() {
  if (typeof window === 'undefined' || ready) return;
  ready = true;
  (window as unknown as { __motionReady?: boolean }).__motionReady = true;

  initSmoothScroll();
  initIntro();
  runScenes();
  initUI();
  ScrollTrigger.refresh();
}

export function teardownMotion() {
  destroySmoothScroll();
  killAllMotion();
  runTeardown();
  teardownUI();
  ready = false;
}

if (typeof window !== 'undefined') {
  // Module execution itself proves the motion bundle loaded — set this
  // before `window.load` so the inline head script keeps `html.js`
  // (astro:page-load can fire after load; flagging there was a race).
  (window as unknown as { __motionReady?: boolean }).__motionReady = true;

  document.addEventListener('astro:page-load', () => {
    // ClientRouter's swap rewrites <html> attributes from the incoming
    // document, which never carries the runtime `js` class — re-assert it
    // before paint so anti-flash states and the intro gating stay intact
    // across navigations.
    if (!prefersReducedMotion()) {
      document.documentElement.classList.add('js');
    }
    initMotion();
  });
  document.addEventListener('astro:before-swap', () => teardownMotion());

  // Re-check reduced motion live: rebuild scenes without transforms/lenis
  // when it turns on, restore the full experience when it turns off.
  window
    .matchMedia('(prefers-reduced-motion: reduce)')
    .addEventListener('change', () => {
      teardownMotion();
      initMotion();
    });
}
