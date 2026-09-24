import { gsap } from 'gsap';
import { prefersReducedMotion } from './reduced-motion';
import { introDelay } from './intro';

/**
 * Hero choreography (ANIMATION.md §8-9).
 * Sequence: eyebrow → monumental name (masked word reveal) → meta → CTA.
 * The CSS anti-flash states under `html.js` mirror the from-values exactly,
 * so there is no flash between paint and hydration.
 */
export function initHeroMotion() {
  const pieces = gsap.utils.toArray<HTMLElement>('[data-hero]');

  if (prefersReducedMotion()) {
    gsap.set(pieces, { opacity: 1, y: 0, clearProps: 'transform' });
    gsap.set('[data-hero-word]', {
      yPercent: 0,
      rotate: 0,
      clearProps: 'transform',
    });
    return;
  }

  const delay = introDelay();

  if (pieces.length) {
    // Initial states are set here at runtime — not in CSS — so the hero
    // (and the LCP element inside it) paints immediately on first paint.
    // LCP is recorded before this runs; the reveal then plays over it.
    gsap.set(pieces, { opacity: 0, y: 48 });
    gsap.to(pieces, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      delay: delay + 0.15,
    });
  }

  // y:0 is explicit on both sides: GSAP parses the CSS `translateY(115%)`
  // into an absolute pixel offset that would otherwise linger and freeze the
  // word off-position once the percent component finishes.
  gsap.fromTo(
    '[data-hero-word]',
    { y: 0, yPercent: 115, rotate: 1.5 },
    {
      y: 0,
      yPercent: 0,
      rotate: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.08,
      delay,
    },
  );

  // Scroll hint line: draws downward once the hero settles, then fades with
  // the scene exit — a quiet invitation to scroll.
  gsap.fromTo(
    '[data-hero-scroll-line]',
    { scaleY: 0 },
    {
      scaleY: 1,
      transformOrigin: 'top',
      duration: 0.9,
      ease: 'power2.inOut',
      delay: delay + 0.9,
    },
  );

  // Scroll-linked exit: the hero content drifts up and dissolves as the
  // visitor scrolls into the page — continuity between acts, not a cut.
  const scene = document.querySelector<HTMLElement>('[data-hero-scene]');
  if (scene) {
    gsap.to(scene, {
      y: -72,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: scene.closest('section') ?? scene,
        start: 'top top',
        end: 'bottom 35%',
        scrub: true,
      },
    });
  }
}
