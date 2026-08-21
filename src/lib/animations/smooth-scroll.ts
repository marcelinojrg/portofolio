import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling (mimo-grade inertia), wired into GSAP's ticker so
 * ScrollTrigger stays in sync. Disabled under reduced motion — native scroll
 * then, with `scroll-behavior: auto`, keeps everything instant.
 */
let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function initSmoothScroll(): Lenis | null {
  if (prefersReducedMotion() || lenis) return lenis;

  lenis = new Lenis({ lerp: 0.11 });
  window.__lenis = lenis;

  lenis.on('scroll', ScrollTrigger.update);
  tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroySmoothScroll() {
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
    lenis.scrollTo(target as HTMLElement, { offset: -80 });
  } else {
    (target as HTMLElement).scrollIntoView();
  }
}
