# Animation System

## 1. Motion Philosophy

The website should feel smooth because its motion is coherent, not because every element moves.

Motion must communicate:

- Hierarchy
- Continuity
- Spatial relationships
- Focus
- Transition
- Context

The goal is cinematic clarity, not visual noise.

## 2. Motion Principles

### Principle 1: Intentionality

Every major animation must answer what it helps the visitor understand.

### Principle 2: Continuity

Sections should feel connected rather than appearing as separate animated widgets.

### Principle 3: Restraint

Use fewer high-quality animations instead of many weak ones.

### Principle 4: Responsive Choreography

Animation behavior must adapt to device size and input method.

### Principle 5: Accessibility

Respect `prefers-reduced-motion`.

### Principle 6: Performance

Prefer transform and opacity.

## 3. Technology

Primary motion engine:

- GSAP
- GSAP ScrollTrigger

Use CSS transitions for small interactions such as:

- Hover color changes
- Simple opacity transitions
- Small icon shifts
- Button state transitions

Do not use multiple animation libraries for overlapping responsibilities.

## 4. Motion Categories

The project uses six categories:

1. Entrance motion
2. Reveal motion
3. Scroll motion
4. Interaction motion
5. Transition motion
6. Background / ambient motion

## 5. Easing Strategy

Default motion should avoid robotic linear interpolation.

Preferred qualities:

- Soft ease-out for entrances
- Smooth ease-in-out for state changes
- Controlled overshoot only when it communicates physicality

Use a small set of easing patterns consistently.

Avoid excessive bouncing or elastic motion.

## 6. Duration System

Conceptual duration scale:

### Micro

150-250ms

For:

- Hover state
- Icon movement
- Small opacity change

### Standard

350-700ms

For:

- Text reveal
- Image reveal
- Section entrance
- Small component transition

### Large

800-1400ms

For:

- Hero choreography
- Major image transition
- Project transition

### Cinematic

1400-2200ms

Use rarely and only when a large visual scene requires it.

Do not make every animation cinematic.

## 7. Stagger System

Use small, consistent stagger values.

Conceptual values:

- Micro stagger: 0.04-0.08s
- Standard stagger: 0.08-0.14s
- Large stagger: 0.14-0.22s

Avoid excessively long stagger sequences that delay access to content.

## 8. Page Load Choreography

The initial load should establish hierarchy quickly.

Recommended order:

1. Navigation becomes available.
2. Hero visual establishes presence.
3. Primary headline appears.
4. Supporting text appears.
5. CTA becomes available.

Do not hide essential navigation or content for too long behind a preloader.

## 9. Hero Animation

Recommended initial state:

- opacity: 0
- transform: translateY(40-80px)

Recommended final state:

- opacity: 1
- transform: translateY(0)

Use stagger between text groups.

Hero animation should complete quickly enough that the user can begin reading immediately.

## 10. Text Reveal

Use text reveal patterns carefully.

Preferred techniques:

- Line reveal
- Word reveal for short statements
- Character reveal only for special moments

Avoid character-by-character animation for long body copy.

Text should remain accessible to assistive technology. Do not duplicate visible text unnecessarily for visual tricks.

## 11. Image Reveal

Recommended patterns:

- Clip-path reveal
- Scale from slightly larger to natural size
- Opacity + translation
- Container mask reveal

Do not animate image dimensions when a transform can achieve the effect.

## 12. Project Showcase Motion

Projects should feel like chapters.

Possible choreography:

1. Project index becomes visible.
2. Project title enters.
3. Category or metadata appears.
4. Main visual reveals.
5. Supporting information follows.

Use scroll position to control pacing only when it strengthens the storytelling.

## 13. ScrollTrigger Rules

Use ScrollTrigger when the visitor's scroll position should meaningfully control an animation.

Good use cases:

- Image reveal
- Typography reveal
- Parallax layers
- Sticky project scenes
- Horizontal galleries
- Progressive scale changes

Avoid:

- Animating every paragraph independently
- Pinning too many sections
- Long pinned sections on mobile
- Scroll-jacking that prevents normal browsing

## 14. Parallax

Parallax should be subtle.

Use small relative movement rather than dramatic motion.

Good conceptual range:

- Foreground: minimal movement
- Background: slightly slower movement
- Decorative layer: small offset

Do not make text difficult to read because of parallax.

## 15. Pinned Sections

Pinned sections can create strong storytelling moments when:

- The visual scene benefits from staying stable.
- Multiple visual states need to transition in one area.
- The visitor still understands where they are in the page.

Do not overuse pinning.

Each pinned section should have a clear start and end.

## 16. Horizontal Scroll

Horizontal motion can be used for selected project galleries or visual storytelling.

Requirements:

- Preserve scroll progress clarity.
- Do not trap the visitor.
- Provide a mobile-friendly alternative.
- Ensure keyboard and reduced-motion behavior remains usable.

## 17. Navigation Motion

Navigation motion should be subtle.

Possible patterns:

- Background fade on scroll
- Small height change
- Active indicator movement
- Menu open/close transition

Avoid large nav animations that delay navigation.

## 18. Pointer Interaction

Use the browser's native pointer and preserve its visibility.

Pointer-driven enhancements may add preview or guidance, but they must:

- Have a static or touch-friendly equivalent.
- Maintain normal click behavior.
- Stay disabled under reduced motion.
- Avoid replacing or obscuring the native pointer.

## 19. Magnetic Interactions

Magnetic buttons should be used sparingly.

Use them only for:

- Primary CTA
- Selected navigation controls
- Special project interaction

Avoid magnetic behavior on every button or link.

## 20. Page Transitions

A page transition may be used between project detail pages or other major route changes.

Recommended direction:

- Fast visual continuity
- Short opacity transition
- Optional image continuity

Avoid full-screen loaders that block interaction unnecessarily.

## 21. Ambient Motion

Ambient movement can include:

- Slow gradient shift
- Very subtle image movement
- Floating decorative objects
- Background scale drift

Use extremely low amplitude.

Ambient motion must stop or simplify when it does not add value.

## 22. Mobile Motion

On mobile:

- Reduce parallax distance.
- Reduce number of simultaneous animations.
- Avoid pointer-only interactions.
- Simplify pinned sections.
- Avoid horizontal interactions that confuse touch scrolling.
- Use shorter animation durations where appropriate.

## 23. Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- Disable non-essential transforms.
- Disable parallax.
- Disable non-essential pointer motion.
- Disable unnecessary looping effects.
- Reduce transition duration.
- Keep content visible immediately.

Content and navigation must remain fully usable.

## 24. Visibility and Lifecycle

Animations should respect page lifecycle.

Do not keep expensive timelines or requestAnimationFrame loops running when the page is hidden.

Use proper cleanup in interactive components.

Kill ScrollTrigger instances and GSAP timelines when components are unmounted or route transitions require cleanup.

## 25. Performance Guidance

Prefer:

- `transform`
- `opacity`
- `clip-path` when appropriate and tested

Avoid frequent layout reads and writes in the same animation loop.

Do not animate huge numbers of DOM nodes individually.

Use shared timelines or delegated logic when possible.

## 26. Animation Architecture

Keep animation code out of random component markup whenever the behavior is reusable.

Suggested structure:

```text
src/
└── lib/
    └── animations/
        ├── reveal.ts
        ├── hero.ts
        ├── parallax.ts
        └── index.ts
```

The exact structure can evolve, but reusable motion logic should be centralized.

## 27. Animation Naming

Use names that describe intent rather than implementation details.

Good:

- `revealProjectImage`
- `initHeroMotion`
- `createTextReveal`

Avoid:

- `animateThing`
- `moveDiv`
- `gsapTest2`

## 29. Kinetic Moments

The homepage includes a small set of deliberately rare, high-impact motion moments (ANIMATION.md §2 Principle 3 — restraint). Each is a separate module in `src/lib/animations/`:

### Intro curtain (`intro.ts`)

One-shot entry: name words mask up, a counter runs, the overlay wipes away. Plays only on the first load per session, is skippable on click, and is removed from the DOM when done. Scroll is locked while it plays; the BaseLayout inline script resets overflow if the motion bundle fails.

### Marquee bands (`marquee.ts`)

Seamless `xPercent` loops (two identical groups per track). Pause on hover and when the tab is hidden.

### Word scrub (`word-scrub.ts`)

Scroll-linked word highlight for the About statement: words scrub from muted to full color. Text stays fully readable in every state.

### Showcase preview (`showcase.ts`)

Project rows on the homepage drive a fixed cover preview panel that follows the pointer (lerped, transform-only). Mobile and reduced-motion fall back to inline covers.

### yPercent + CSS transform rule

Never animate `yPercent` on an element whose CSS sets a percentage translate (`translateY(115%)`): GSAP parses the percentage into an absolute pixel offset that lingers and freezes the element off-position once the percent component finishes. Always pair `y: 0` explicitly in both `from` and `to` of such tweens (hero words, intro words, line reveals).

## 28. Motion QA Checklist

For each major animation, verify:

- Does it improve comprehension?
- Does it work at different viewport sizes?
- Does it remain smooth while scrolling?
- Does it behave correctly after browser resize?
- Does it clean up correctly?
- Does it respect reduced motion?
- Does it keep content accessible?
- Does it avoid layout shifts?
- Does it avoid blocking interaction?
