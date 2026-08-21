import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Line-by-line reveal (ANIMATION.md §10).
 * Each direct `<span>` child is authored in the markup at build time and
 * masked by the CSS `[data-lines]` rules — no runtime text splitting, so
 * the DOM (and screen-reader output) never flashes or gets rewritten.
 * `data-lines="immediate"` plays on load (hero); otherwise on scroll.
 */
export function initLineReveal() {
  gsap.utils.toArray<HTMLElement>('[data-lines]').forEach((el) => {
    const lines = Array.from(el.querySelectorAll<HTMLElement>(':scope > span'));
    if (!lines.length) return;

    if (prefersReducedMotion()) {
      gsap.set(lines, { yPercent: 0, clearProps: 'transform' });
      return;
    }

    const immediate = el.dataset.lines === 'immediate';

    // y:0 explicit on both sides — GSAP parses the CSS `translateY(115%)`
    // into an absolute px offset that otherwise freezes the line off-position
    // once the percent component finishes (same fix as hero/intro words).
    gsap.fromTo(
      lines,
      { y: 0, yPercent: 115 },
      {
        y: 0,
        yPercent: 0,
        duration: 0.75,
        ease: 'power4.out',
        stagger: 0.08,
        delay: immediate ? 0.1 : 0,
        scrollTrigger: immediate
          ? undefined
          : { trigger: el, start: 'top 85%', once: true },
      },
    );
  });
}
