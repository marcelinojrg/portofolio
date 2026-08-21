import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal elements as they scroll into view.
 * Uses translateY + opacity only (ANIMATION.md §25).
 *
 * Targets any element with `[data-reveal]`. Optional `data-reveal-delay`
 * staggers a group via the parent `[data-reveal-group]`.
 */
export function initReveal() {
  if (prefersReducedMotion()) {
    gsap.set('[data-reveal]', { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }

  const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: el.dataset.revealDelay ? Number(el.dataset.revealDelay) : 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      },
    );
  });
}

export function initCoverReveal() {
  if (prefersReducedMotion()) {
    gsap.set('[data-cover]', { scale: 1, clipPath: 'none', clearProps: 'all' });
    return;
  }

  gsap.utils.toArray<HTMLElement>('[data-cover]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0 0 100% 0)', scale: 1.12 },
      {
        clipPath: 'inset(0 0 0% 0)',
        scale: 1,
        duration: 1,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      },
    );
  });
}
