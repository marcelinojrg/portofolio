import { gsap } from 'gsap';
import { prefersReducedMotion, isFinePointer } from './reduced-motion';
import { onTeardown } from './teardown';

/**
 * Kinetic project list (wide fine-pointer): a fixed preview panel follows the
 * pointer while the visitor hovers a project row; the matching cover cross-fades
 * in. Touch, narrow, and reduced-motion visitors get inline covers instead.
 */
export function initShowcase() {
  const panel = document.querySelector<HTMLElement>('[data-showcase-preview]');
  if (!panel) return;

  const items = gsap.utils.toArray<HTMLElement>('[data-preview-item]');
  const bySlug = new Map(items.map((el) => [el.dataset.previewItem, el]));
  if (!bySlug.size) return;

  const previewQuery = window.matchMedia(
    '(min-width: 48rem) and (hover: hover) and (pointer: fine)',
  );
  let active: HTMLElement | null = null;
  let disconnectPreview: (() => void) | null = null;

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

  const connect = () => {
    if (
      disconnectPreview ||
      prefersReducedMotion() ||
      !isFinePointer() ||
      !previewQuery.matches
    ) {
      return;
    }

    const panelX = gsap.quickTo(panel, 'x', {
      duration: 0.55,
      ease: 'power3.out',
    });
    const panelY = gsap.quickTo(panel, 'y', {
      duration: 0.55,
      ease: 'power3.out',
    });
    const onMove = (e: MouseEvent) => {
      panelX(e.clientX + 48);
      panelY(e.clientY - 140);
    };
    const cleanups: Array<() => void> = [];

    document
      .querySelectorAll<HTMLElement>('[data-showcase-row]')
      .forEach((row) => {
        const target = bySlug.get(row.dataset.showcaseRow ?? '');
        if (!target) return;
        const onEnter = () => show(target);
        row.addEventListener('mouseenter', onEnter);
        row.addEventListener('mouseleave', hide);
        cleanups.push(() => {
          row.removeEventListener('mouseenter', onEnter);
          row.removeEventListener('mouseleave', hide);
        });
      });

    window.addEventListener('mousemove', onMove);
    disconnectPreview = () => {
      window.removeEventListener('mousemove', onMove);
      cleanups.forEach((cleanup) => cleanup());
      hide();
      disconnectPreview = null;
    };
  };

  const disconnect = () => disconnectPreview?.();
  const onQueryChange = () => {
    if (previewQuery.matches) connect();
    else disconnect();
  };

  previewQuery.addEventListener('change', onQueryChange);
  onTeardown(() => {
    previewQuery.removeEventListener('change', onQueryChange);
    disconnect();
  });
  connect();
}
