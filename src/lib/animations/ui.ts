import { scrollToTarget } from './smooth-scroll';

/**
 * Site-wide UI behavior: header scroll state, mobile menu (Escape, focus,
 * scroll lock), and smooth anchor navigation. Event delegation is bound once
 * per session so it survives Astro view-transition swaps; per-page elements
 * are queried inside the handlers.
 */

let bound = false;

function closeMenu(focusButton = true) {
  const overlay = document.querySelector('[data-menu-overlay]');
  const button = document.querySelector('[data-menu-toggle]');
  if (!overlay || !button) return;
  overlay.setAttribute('hidden', '');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'Open menu');
  document.documentElement.style.overflow = '';
  window.__lenis?.start();
  if (focusButton) (button as HTMLElement).focus();
}

function openMenu() {
  const overlay = document.querySelector('[data-menu-overlay]');
  const button = document.querySelector('[data-menu-toggle]');
  if (!overlay || !button) return;
  overlay.removeAttribute('hidden');
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-label', 'Close menu');
  document.documentElement.style.overflow = 'hidden';
  window.__lenis?.stop();
  overlay.querySelector<HTMLAnchorElement>('a')?.focus();
}

export function initUI() {
  if (bound) return;
  bound = true;

  const desktopQuery = window.matchMedia('(min-width: 48rem)');
  desktopQuery.addEventListener('change', () => {
    const overlay = document.querySelector<HTMLElement>('[data-menu-overlay]');
    if (desktopQuery.matches && overlay && !overlay.hidden) {
      closeMenu(false);
      document.querySelector<HTMLElement>('.site-header__cta')?.focus();
    }
  });

  // Header hairline appears once the page scrolls.
  const onScroll = () => {
    document
      .querySelectorAll('[data-header]')
      .forEach((h) => h.toggleAttribute('data-scrolled', window.scrollY > 8));
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    // Menu toggle
    const toggle = target.closest('[data-menu-toggle]');
    if (toggle) {
      const open =
        toggle.getAttribute('aria-expanded') === 'true' ? false : true;
      open ? openMenu() : closeMenu(false);
      return;
    }

    // Any link inside the overlay closes it (navigation follows normally).
    if (target.closest('[data-menu-overlay] a')) closeMenu(false);

    // Same-page anchors route through Lenis for smooth scrolling.
    const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (anchor) {
      const hash = anchor.getAttribute('href');
      if (hash && hash.length > 1 && document.querySelector(hash)) {
        e.preventDefault();
        scrollToTarget(hash);
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      return;
    }
    if (e.key !== 'Tab') return;

    // Focus trap: while the fullscreen menu is open, keyboard focus must
    // cycle within the overlay instead of reaching locked background content.
    const overlay = document.querySelector<HTMLElement>('[data-menu-overlay]');
    if (!overlay || overlay.hidden) return;

    const focusables = Array.from(
      overlay.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    );
    if (!focusables.length) return;

    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey && (active === first || !overlay.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

export function teardownUI() {
  // Swaps can happen mid-menu; never carry a scroll lock across pages.
  document.documentElement.style.overflow = '';
}
