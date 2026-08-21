# Architecture

## 1. Architecture Goal

Build a portfolio that is visually rich but technically simple.

The architecture should favor:

- Static output where possible
- Minimal client JavaScript
- Reusable components
- Clear content boundaries
- Isolated interactivity
- Easy deployment

## 2. Framework

Primary framework:

**Astro**

Reason:

- Excellent fit for content-driven websites.
- Supports static rendering.
- Allows selective client-side interactivity.
- Works well with component islands.
- Keeps the default page lightweight.

## 3. UI Components

Use:

- Astro components for most markup and static UI.
- React only where stateful or interaction-heavy behavior provides a clear benefit.

Do not build the entire website as a client-side React application.

## 4. Styling

Primary styling system:

**Plain CSS — semantic class names, one stylesheet per section component**

Section styles live beside their components (e.g. `src/components/home/Hero.css` next to `Hero.astro`).

Global design tokens, the minimal reset, and shared conventions (`.eyebrow`, `.prose-case`, motion anti-flash states) live in `src/styles/base.css`.

Global values should be represented through CSS variables defined in `base.css`.

## 5. Animation

Primary animation system:

**GSAP + ScrollTrigger**

Centralize reusable motion patterns.

Animation should remain separate from content data.

## 6. Suggested Directory Structure

```text
portfolio/
├── public/
│   ├── images/
│   │   ├── projects/
│   │   └── og/
│   ├── fonts/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── hero/
│   │   ├── projects/
│   │   ├── about/
│   │   ├── experience/
│   │   └── contact/
│   │
│   ├── content/
│   │   └── projects/
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ProjectLayout.astro
│   │
│   ├── lib/
│   │   ├── animations/
│   │   ├── utils/
│   │   └── constants/
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   └── work/
│   │       └── [slug].astro
│   │
│   └── styles/
│       ├── globals.css
│       └── typography.css
│
├── AGENTS.md
├── README.md
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── docs/
```

This is a starting point, not a rigid requirement. Keep the final structure understandable.

## 7. Pages

Recommended initial routes:

- `/`
- `/about`
- `/work/[slug]`
- `/contact`
- `/404`

A dedicated contact page is optional if the homepage contact section is sufficient.

## 8. Layouts

### BaseLayout

Responsible for:

- HTML document structure
- Global metadata
- Font loading strategy
- Global styles
- Accessibility foundations
- Global navigation and footer composition when appropriate

### ProjectLayout

Responsible for:

- Project-specific metadata
- Project content container
- Project navigation
- Shared case study structure

## 9. Content Collections

Project data should be separated from page layout.

Prefer an Astro content collection or content loader for project entries.

Each project should have:

- Schema validation
- Stable slug
- Required fields
- Optional fields for deeper case studies

## 10. Data and UI Separation

Project content should be data-driven.

A project page should not duplicate its entire markup for every project.

Prefer:

```text
project data
    ↓
case study components
    ↓
project page
```

## 11. Animation Architecture

Suggested structure:

```text
src/lib/animations/
├── index.ts
├── hero.ts
├── reveal.ts
├── parallax.ts
├── project.ts
├── transition.ts
└── reduced-motion.ts
```

Use functions with clear responsibilities.

## 12. Animation Initialization

Animation code must account for:

- Initial render
- Client hydration where relevant
- Route navigation
- Component cleanup
- Resize
- Reduced motion

Do not initialize the same ScrollTrigger multiple times for the same element.

## 13. Client Directives

Use Astro client directives intentionally.

Examples:

- `client:load` for interaction required immediately.
- `client:visible` for below-the-fold interactive components.
- `client:idle` for non-critical enhancements.

Do not hydrate a component by default without a reason.

## 14. Routing and Navigation

Use standard links.

Do not intercept navigation purely for visual effects unless the resulting experience remains robust and accessible.

If custom route transitions are introduced, ensure:

- Browser navigation works.
- Back and forward navigation work.
- Deep links work.
- Refresh works.
- Reduced motion is respected.

## 15. Images

Use Astro's image tooling where practical.

Requirements:

- Responsive sizing
- Appropriate compression
- Width and height metadata when possible
- Lazy loading below the fold
- Priority loading only for above-the-fold critical assets

## 16. Fonts

Keep font loading efficient.

Prefer self-hosted or reliable font delivery when licensing allows.

Avoid loading unnecessary weights.

## 17. SEO Architecture

Provide a reusable SEO component or utility that handles:

- Title
- Description
- Canonical
- Open Graph
- Twitter/X metadata
- Robots directives when needed

## 18. Error Handling

Provide:

- 404 page
- Graceful empty project states if content is missing
- Safe fallback for optional media

Avoid hiding content errors behind silent failure.

## 19. Deployment

Target platforms:

- Vercel
- Cloudflare Pages / Workers
- Netlify

The architecture should remain portable across static-friendly deployments.

## 20. Environment Variables

Do not introduce environment variables unless necessary.

If a future service requires one, document:

- Variable name
- Purpose
- Whether it is public or secret
- Local setup

Never commit secret values.

## 21. Testing Strategy

Minimum verification:

- Production build
- Desktop browser test
- Mobile browser test
- Keyboard navigation
- Reduced motion test
- Broken link review
- Console error review

Where complexity grows, add:

- Unit tests for utilities
- Component tests for important interactive components
- Visual regression checks for critical pages

## 22. Performance Targets

Aim for strong real-world performance rather than chasing synthetic scores at the expense of usability.

Key concerns:

- Initial JavaScript
- Image weight
- Main-thread work
- Layout shifts
- Scroll smoothness
- Font loading

Measure before adding expensive effects.
