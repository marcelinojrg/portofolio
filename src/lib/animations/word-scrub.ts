import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-linked word highlight (ANIMATION.md §10 — a special moment, used
 * once). Splits `[data-word-scrub]` into word spans and scrubs each word
 * from muted to full text color as the paragraph crosses the viewport.
 * Text stays fully readable in every state — no hidden content, no flash.
 */
export function initWordScrub() {
  if (prefersReducedMotion()) return;

  gsap.utils.toArray<HTMLElement>('[data-word-scrub]').forEach((block) => {
    const parts = (block.textContent ?? '').split(/(\s+)/);
    const words: HTMLElement[] = [];

    block.replaceChildren(
      ...parts.map((part) => {
        if (!part.trim()) return document.createTextNode(part);
        const span = document.createElement('span');
        span.className = 'ws-word';
        span.textContent = part;
        words.push(span);
        return span;
      }),
    );

    if (!words.length) return;

    gsap.set(words, { color: 'var(--color-text-muted)' });
    gsap.to(words, {
      color: 'var(--color-text)',
      stagger: 0.03,
      ease: 'none',
      scrollTrigger: {
        trigger: block,
        start: 'top 78%',
        end: 'bottom 55%',
        scrub: true,
      },
    });
  });
}
