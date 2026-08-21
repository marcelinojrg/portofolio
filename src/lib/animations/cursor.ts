import { gsap } from 'gsap';
import { prefersReducedMotion, isFinePointer } from './reduced-motion';

/**
 * Custom cursor (ANIMATION.md §18) — dot + trailing ring.
 * Desktop fine-pointer + full motion only; native cursor is hidden only while
 * this is active (`html.cursor-on`), so touch / reduced-motion visitors keep
 * the browser cursor untouched.
 */
export function initCursor() {
  if (prefersReducedMotion() || !isFinePointer()) return;

  const root = document.querySelector<HTMLElement>('[data-cursor]');
  if (!root) return;

  const dot = root.querySelector<HTMLElement>('.cursor__dot');
  const ring = root.querySelector<HTMLElement>('.cursor__ring');
  if (!dot || !ring) return;

  document.documentElement.classList.add('cursor-on');
  gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

  let visible = false;
  const show = () => {
    if (visible) return;
    visible = true;
    gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
  };
  const hide = () => {
    visible = false;
    gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
  };

  const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    show();
    dotX(e.clientX);
    dotY(e.clientY);
    ringX(e.clientX);
    ringY(e.clientY);
  });

  document.documentElement.addEventListener('mouseleave', hide);
  window.addEventListener('blur', hide);

  // Ring grows uniformly on interactive targets; no text label.
  document.addEventListener('mouseover', (e) => {
    const target = (e.target as HTMLElement).closest(
      '[data-cursor], a, button, [role="button"]',
    );
    gsap.to(ring, {
      scale: target ? 1.5 : 1,
      duration: 0.35,
      ease: 'power3.out',
    });
  });
}
