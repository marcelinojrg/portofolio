# AGENTS.md

## 1. Project Identity

This repository contains the personal portfolio website of Marcelino Jorgi.

The website is not intended to behave like a conventional resume or a generic developer portfolio. It should feel like a premium digital experience with strong visual storytelling, editorial composition, deliberate motion, and high-quality interaction design.

Primary inspiration:

- https://mimo.xiaomi.com/

The reference is a direction for pacing, visual storytelling, premium presentation, and motion quality. Do not copy its visual assets, copywriting, branding, layout, or proprietary implementation.

## 2. Core Objective

Build a portfolio that communicates:

1. Who Marcelino is.
2. What he builds.
3. How he thinks and works.
4. Which projects demonstrate his capabilities.
5. Why a visitor should continue exploring or contact him.

The website must feel intentional from the first viewport to the final contact section.

## 3. Primary Stack

- Astro
- TypeScript
- React for interaction-heavy islands only
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- npm

Do not add a dependency unless the existing stack cannot reasonably solve the problem.

## 4. Documentation Hierarchy

Read documentation in this order when making architectural or design decisions:

1. `AGENTS.md`
2. `docs/VISION.md`
3. `docs/DESIGN.md`
4. `docs/ANIMATION.md`
5. `docs/ARCHITECTURE.md`
6. `docs/COMPONENTS.md`
7. `docs/CONTENT.md`

When documents conflict, the more specific implementation rule must not contradict the project vision. Escalate ambiguity by preserving the more important principle: quality, accessibility, performance, and consistency.

## 5. Design Principles

The visual direction must be:

- Premium
- Modern
- Editorial
- Minimal but expressive
- Typography-led
- Image-led when a project benefits from imagery
- Generous with whitespace
- Motion-aware
- Responsive
- Accessible
- Fast

Avoid visual trends that make the site look like a generated template.

Never default to:

- Excessive rounded cards
- Excessive glassmorphism
- Random gradients
- Huge collections of badges
- SaaS dashboard aesthetics
- Decorative blobs with no purpose
- Excessive borders
- Excessive shadows
- Unnecessary neon effects
- Generic AI-generated copy
- Generic AI portfolio layouts

## 6. Content Principles

Content must be concise, specific, and believable.

Do not invent:

- Employers
- Client names
- Metrics
- Awards
- User counts
- Revenue
- Testimonials
- Project outcomes
- Technologies that were not actually used

When facts are unavailable, use neutral placeholders and mark them clearly for replacement.

Projects should be presented as case studies rather than only as cards with a title and a technology list.

## 7. Animation Principles

Animation is part of the product experience, not decoration.

Every significant animation must have an intentional purpose such as:

- Establishing hierarchy
- Revealing information
- Guiding attention
- Signaling a transition
- Showing spatial relationships
- Enhancing continuity

Use transforms and opacity whenever possible.

Avoid animating layout-heavy properties such as width, height, top, left, margin, or padding during scroll unless the effect truly requires it.

Use GSAP and ScrollTrigger for complex motion. Use CSS transitions for simple state changes.

Always account for:

- Reduced motion preferences
- Touch devices
- Low-powered devices
- Mobile viewport differences
- Layout changes between breakpoints

See `docs/ANIMATION.md` for the complete motion system.

## 8. Performance Rules

The site must remain fast even with rich motion.

Prefer:

- Static Astro rendering
- Minimal client-side JavaScript
- Component islands only where necessary
- Responsive images
- Modern image formats where practical
- Lazy loading below the fold
- Transform and opacity animation
- Efficient GSAP timelines
- Reusable animation utilities

Do not:

- Ship a large animation library when GSAP already provides the required behavior
- Add client-side state without a clear reason
- Animate hundreds of DOM nodes individually
- Load huge images for small UI areas
- Create long-running timers that continue when the page is hidden

## 9. Accessibility Rules

The website must support keyboard navigation and screen readers.

Required:

- Semantic HTML
- Visible focus states
- Logical heading hierarchy
- Alt text for meaningful images
- Decorative images marked appropriately
- Accessible buttons and links
- Sufficient color contrast
- Reduced motion support
- No critical information communicated only through animation

Animation must never prevent a visitor from accessing content.

## 10. Responsive Rules

Design mobile-first, then enhance for larger screens.

The experience should not simply shrink the desktop layout.

Mobile may require:

- Simplified choreography
- Reduced parallax
- Fewer simultaneous moving elements
- Different navigation interaction
- Different image crops
- Different section spacing
- Alternate component composition

## 11. Component Rules

Before creating a component, check `docs/COMPONENTS.md`.

Prefer:

- Small, reusable components
- Composition over duplication
- Clear data-driven project rendering
- Dedicated animation utilities

Do not create a component only because a markup block appears once, unless the block has meaningful behavior, semantics, or reuse potential.

## 12. React Rules

Use Astro components by default.

Use React only when the component genuinely benefits from client-side interactivity.

Do not convert the entire website into a client-rendered React application merely to use React.

## 13. Styling Rules

Keep visual tokens centralized.

Avoid hardcoding the same spacing, color, radius, or typography values in many files.

Use CSS variables or Tailwind theme tokens for global values where appropriate.

Do not mix arbitrary one-off styles with the design system unless the exception is intentional and documented.

## 14. SEO Rules

Every public page must have:

- Unique title
- Unique meta description
- Canonical URL when appropriate
- Open Graph metadata
- Twitter/X metadata when applicable
- Correct heading hierarchy

The project must provide a useful 404 page.

## 15. Code Quality Rules

Before finalizing a feature:

1. Run formatting or linting if configured.
2. Run TypeScript checks when applicable.
3. Run the production build.
4. Check console errors.
5. Test the main interaction on desktop and mobile.
6. Test reduced motion.
7. Review for duplicate components or unnecessary dependencies.

Never mark a task complete based only on visual appearance if the feature has not been tested.

## 16. Git Rules

Use small, intentional commits when commits are requested.

Commit messages should describe the user-facing or technical purpose.

Do not commit secrets, local environment files, build artifacts, or dependency caches.

## 17. Task Discipline

Complete work in small, coherent units and verify each result before moving on.

## 18. Definition of Done

A feature is complete only when:

- It matches the design direction.
- It follows the animation system.
- It works on desktop and mobile.
- It supports reduced motion where relevant.
- It is accessible.
- It does not introduce unnecessary client-side work.
- It does not produce console errors.
- It passes the production build.
- Documentation and task status are updated when necessary.

## 19. Development Commands

Expected commands:

```bash
npm install
npm run dev
npm run build
npm run preview
```

If the project adds linting or typecheck scripts, use those as part of verification.
If you find yourself repeating the same sentence or action more than 3 times without making progress, STOP immediately and report the issue to the user instead of continuing.
When adjusting visual values (padding, height, width, font size), ask for the target value upfront instead of guessing incrementally.
When designing database schemas, start with the minimal required tables and ask before adding extra tables (e.g., categories, tags).
When installing skills, always use the global flag (-g) and never introduce a UTF-8 BOM into edited files.
