import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** True when the visitor prefers reduced motion. */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True on fine pointer devices that support hover (i.e. not touch). */
export const isFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Kill every timeline + ScrollTrigger. Call before re-running scenes. */
export function killAllMotion() {
  ScrollTrigger.killAll();
  gsap.killTweensOf('*');
}
