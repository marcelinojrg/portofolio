import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, isFinePointer } from './reduced-motion';

import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling (mimo-grade inertia), wired into GSAP's ticker so
 * ScrollTrigger stays in sync. Disabled under reduced motion — native scroll
 * then, with `scroll-behavior: auto`, keeps everything instant.
 * Lenis is dynamically imported so touch / reduced-motion visitors never
 * download it, and it never blocks the initial bundle (LCP).
 * Desktop fine-pointer only: native touch scrolling is already smooth and
 * cheaper than a JS scroller on low-powered devices.
 */
let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;
let initGeneration = 0;
let pointerQueryBound = false;

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function initSmoothScroll(): void {
  if (typeof window === 'undefined') return;

  if (!pointerQueryBound) {
    const pointerQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    );
    pointerQuery.addEventListener('change', (event) => {
      if (event.matches) initSmoothScroll();
      else destroySmoothScroll();
    });
    pointerQueryBound = true;
  }

  if (prefersReducedMotion() || !isFinePointer() || lenis) return;
  const generation = ++initGeneration;

  // Fire-and-forget: callers already tolerate a missing scroller
  // (intro/UI use `window.__lenis?.stop()` and native fallbacks).
  void (async () => {
    try {
      const { default: Lenis } = await import('lenis');
      if (
        generation !== initGeneration ||
        lenis ||
        prefersReducedMotion() ||
        !isFinePointer()
      )
        return;
      lenis = new Lenis({ lerp: 0.11 });
      window.__lenis = lenis;
      if (document.documentElement.style.overflow === 'hidden') lenis.stop();

      lenis.on('scroll', ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    } catch {
      // Smooth scroll is an enhancement; native scrolling remains.
      lenis = null;
    }
  })();
}

export function destroySmoothScroll() {
  initGeneration += 1;
  if (tick) gsap.ticker.remove(tick);
  tick = null;
  lenis?.destroy();
  lenis = null;
  delete window.__lenis;
}

/** Smooth-scroll to an anchor target, falling back to native jumping. */
export function scrollToTarget(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis) {
    const headerHeight =
      document
        .querySelector<HTMLElement>('[data-header]')
        ?.getBoundingClientRect().height ?? 80;
    lenis.scrollTo(target as HTMLElement, { offset: -(headerHeight + 16) });
  } else {
    (target as HTMLElement).scrollIntoView();
  }
}
