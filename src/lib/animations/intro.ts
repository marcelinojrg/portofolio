import { gsap } from 'gsap';
import { prefersReducedMotion } from './reduced-motion';

/**
 * Kinetic intro curtain (ANIMATION.md §8 "Cinematic").
 * Plays once per session on the very first load: the name masks up, a
 * counter runs, then the whole overlay wipes away. Clicking anywhere skips it.
 *
 * The overlay is gated by CSS under `html.js` + full motion, so this module
 * only needs to choreograph the reveal. Under reduced motion the overlay never
 * renders and nothing here runs.
 */

let played = false;

declare global {
  interface Window {
    __introSkipped?: boolean;
  }
}

const hasIntroSkipped = () => Boolean(window.__introSkipped);

/** Exposed for hero.ts: how long to wait before starting the hero choreography. */
export function introDelay() {
  return hasIntroSkipped() ? 0.2 : 1.15;
}

export function initIntro() {
  if (prefersReducedMotion()) {
    window.__introSkipped = true;
    return;
  }
  if (played) {
    window.__introSkipped = true;
    // Fresh pages arrive with their own intro element; remove it so the
    // overlay never sits on top of a navigated page.
    document.querySelector('[data-intro]')?.remove();
    return;
  }
  played = true;

  const overlay = document.querySelector<HTMLElement>('[data-intro]');
  if (!overlay) {
    window.__introSkipped = true;
    return;
  }

  const words = gsap.utils.toArray<HTMLElement>('[data-intro-word]', overlay);
  const countEl = overlay.querySelector<HTMLElement>('[data-intro-count]');
  const bar = overlay.querySelector<HTMLElement>('[data-intro-bar]');
  if (!countEl || !bar) return;

  // Lock scroll while the curtain is up. The BaseLayout inline script resets
  // overflow if the motion bundle ever fails to load.
  document.documentElement.style.overflow = 'hidden';
  window.__lenis?.stop();

  const counter = { value: 0 };
  const done = () => {
    document.documentElement.style.overflow = '';
    window.__lenis?.start();
    overlay.remove();
    window.__introSkipped = true;
  };

  const skip = () => {
    tl.kill();
    gsap.set(overlay, { yPercent: -100 });
    done();
  };
  overlay.addEventListener('click', skip);

  const tl = gsap.timeline({
    onComplete: () => {
      overlay.removeEventListener('click', skip);
      done();
    },
  });

  tl.fromTo(
    words,
    { y: 0, yPercent: -115 },
    { y: 0, yPercent: 0, duration: 0.8, ease: 'power4.out', stagger: 0.1 },
    0.1,
  )
    .to(
      counter,
      {
        value: 100,
        duration: 1.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          countEl.textContent = String(Math.round(counter.value)).padStart(
            2,
            '0',
          );
        },
      },
      0.1,
    )
    .to(bar, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0.1)
    .to(
      overlay,
      { yPercent: -100, duration: 0.6, ease: 'power4.inOut' },
      '+=0.05',
    );
}
