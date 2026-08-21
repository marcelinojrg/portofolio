import { gsap } from 'gsap';
import { prefersReducedMotion } from './reduced-motion';
import { onTeardown } from './teardown';

/**
 * Seamless marquee bands (ANIMATION.md §21 ambient + §25 transform-only).
 * Each `[data-marquee]` holds a track with two identical groups; the track
 * loops at xPercent -50. Pauses on hover and when the tab is hidden.
 */
export function initMarquees() {
  if (prefersReducedMotion()) return;

  const tweens: gsap.core.Tween[] = [];

  gsap.utils.toArray<HTMLElement>('[data-marquee]').forEach((band) => {
    const track = band.querySelector<HTMLElement>('[data-marquee-track]');
    if (!track) return;

    const speed = Number(band.dataset.marquee) || 36;
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });
    tweens.push(tween);

    band.addEventListener('mouseenter', () => tween.pause());
    band.addEventListener('mouseleave', () => tween.play());
  });

  const onVisibility = () => {
    const playing = document.visibilityState === 'visible';
    tweens.forEach((t) => (playing ? t.play() : t.pause()));
  };
  document.addEventListener('visibilitychange', onVisibility);
  onTeardown(() =>
    document.removeEventListener('visibilitychange', onVisibility),
  );
}
