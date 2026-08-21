import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, isFinePointer } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle parallax on `[data-parallax]` elements (ANIMATION.md §14).
 * Desktop + fine pointer only. Amplitude kept small (<= 24px).
 */
export function initParallax() {
  if (prefersReducedMotion() || !isFinePointer()) return;

  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax) || 12;
    gsap.to(el, {
      y: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}
