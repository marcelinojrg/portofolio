import { gsap } from 'gsap';
import { prefersReducedMotion, isFinePointer } from './reduced-motion';

/**
 * Magnetic pull for primary CTAs (ANIMATION.md §19 — use sparingly).
 * Fine pointer + full motion only. Pull is capped by the 0.25 factor,
 * so a 200px-wide link moves at most ~25px — subtle, never slingshot.
 */
export function initMagnetic() {
  if (prefersReducedMotion() || !isFinePointer()) return;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.25);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
  });
}
