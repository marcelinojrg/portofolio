import { gsap } from 'gsap';
import { prefersReducedMotion, isFinePointer } from './reduced-motion';

/**
 * Kinetic project list (desktop): a fixed preview panel follows the cursor
 * while the visitor hovers a project row; the matching cover cross-fades in.
 * Pure transform/opacity, one lerped panel, tiny node count (ANIMATION.md §25).
 * Mobile and reduced-motion visitors get the inline covers instead.
 */
export function initShowcase() {
  if (prefersReducedMotion() || !isFinePointer()) return;

  const panel = document.querySelector<HTMLElement>('[data-showcase-preview]');
  if (!panel) return;

  const items = gsap.utils.toArray<HTMLElement>('[data-preview-item]');
  const bySlug = new Map(items.map((el) => [el.dataset.previewItem, el]));
  if (!bySlug.size) return;

  const panelX = gsap.quickTo(panel, 'x', {
    duration: 0.55,
    ease: 'power3.out',
  });
  const panelY = gsap.quickTo(panel, 'y', {
    duration: 0.55,
    ease: 'power3.out',
  });

  let active: HTMLElement | null = null;
  const show = (el: HTMLElement) => {
    active?.classList.remove('is-active');
    active = el;
    el.classList.add('is-active');
    panel.classList.add('is-active');
  };
  const hide = () => {
    active?.classList.remove('is-active');
    active = null;
    panel.classList.remove('is-active');
  };

  window.addEventListener('mousemove', (e) => {
    // Offset so the preview never sits under the cursor.
    panelX(e.clientX + 48);
    panelY(e.clientY - 140);
  });

  document
    .querySelectorAll<HTMLElement>('[data-showcase-row]')
    .forEach((row) => {
      const target = bySlug.get(row.dataset.showcaseRow ?? '');
      if (!target) return;
      row.addEventListener('mouseenter', () => show(target));
      row.addEventListener('mouseleave', hide);
    });
}
