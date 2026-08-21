# Marcelino Jorgi Portfolio

Personal portfolio website for Marcelino Jorgi.

The site is designed as a premium, motion-forward digital experience rather than a conventional online resume.

## Stack

- Astro
- TypeScript
- React, only for interaction-heavy islands
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- npm

## Project Goals

- Present a distinctive personal brand.
- Showcase selected projects as case studies.
- Use smooth, intentional animation.
- Maintain excellent performance.
- Remain accessible and responsive.
- Keep the codebase simple enough to maintain.

## Documentation

- `AGENTS.md`: rules for AI coding agents and project development.
- `docs/VISION.md`: project identity, audience, goals, and creative direction.
- `docs/DESIGN.md`: visual design system and UI rules.
- `docs/ANIMATION.md`: motion system, GSAP patterns, choreography, and accessibility.
- `docs/CONTENT.md`: content model, writing direction, and page content structure.
- `docs/ARCHITECTURE.md`: technical architecture and rendering strategy.
- `docs/COMPONENTS.md`: component inventory and responsibilities.

## Local Development

```bash
npm install
npm run dev
```

Open the local URL shown by Astro.

## Production Build

```bash
npm run build
npm run preview
```

## Content Workflow

Project content should live in the project's content collection, while `docs/CONTENT.md` defines the content strategy and required fields.

## Design Workflow

Do not begin by building every page at once. Build the visual system and motion primitives first, then compose the pages from them.

## Animation Workflow

Do not add random animations during implementation. Every substantial motion interaction should follow `docs/ANIMATION.md`.
