# Component Inventory

## 1. Component Philosophy

Components should represent meaningful UI behavior, semantic sections, or reusable visual patterns.

Do not create components merely to shorten a file.

## 2. Global Components

### `SiteHeader`

Purpose:

- Primary navigation
- Brand/name
- Contact CTA when appropriate

States:

- Default
- Scrolled
- Mobile open
- Mobile closed

### `SiteFooter`

Purpose:

- Contact access
- Social links
- Copyright
- Secondary navigation where useful

### `PageTransition`

Purpose:

- Optional route transition choreography

Requirements:

- Fast
- Accessible
- Reduced-motion aware

### `Intro`

Purpose:

- One-shot kinetic entry curtain (name mask reveal + counter + wipe)

Behavior:

- Plays once per session on the very first load
- Skippable on click; removed from the DOM when done
- Never renders without JS or under reduced motion (CSS-gated via `html.js`)
- Scroll is locked while it plays; the BaseLayout inline script resets overflow if the motion bundle fails

## 3. Hero Components

### `Hero`

Responsible for the complete first-view composition.

Contains:

- Identity
- Headline
- Supporting copy
- Primary CTA
- Visual element

### `HeroTitle`

Responsible for typography and reveal animation.

### `HeroVisual`

Responsible for the primary visual scene.

Keep visual and text animation separable so the hero can adapt across devices.

## 4. Section Components

### `SectionHeading`

Reusable heading pattern for major sections.

Props may include:

- eyebrow
- title
- description
- alignment

### `SectionIntro`

Optional supporting text for narrative sections.

## 5. Project Components

### `ProjectIndex`

Primary homepage project presentation: kinetic text rows with a pointer-following cover preview panel (desktop, fine-pointer). Rows carry `data-showcase-row`; the shared fixed panel `data-showcase-preview` holds one `ProjectCover` per project (`data-preview-item`).

Mobile and reduced-motion fall back to inline covers per row (`project-row__cover`).

### `ProjectCover`

Responsive local artwork when provided, with a procedural SVG fallback (tint + serial number). Accepts a `uid` prop so the same SVG fallback can be rendered more than once on a page without duplicate gradient ids.

### `ProjectHero`

Hero area for project detail pages.

### `ProjectMeta`

Displays:

- Year
- Role
- Category
- Status

### `ProjectContent`

Renders the structured case study content.

### `ProjectGallery`

Displays supporting project images.

Must be responsive and optimized.

### `ProjectNavigation`

Links to previous and next projects.

## 6. About Components

### `AboutIntro`

Primary narrative statement.

### `ExperienceTimeline`

Displays verified experience entries.

### `Capabilities`

Groups relevant capabilities without turning the page into a keyword list.

## 7. Contact Components

### `ContactCTA`

Final invitation to contact.

Should be visually strong but simple.

### `SocialLinks`

Accessible external profile links.

## 8. Interaction Primitives

### `TextReveal`

Reusable text reveal pattern.

### `ImageReveal`

Reusable image clipping/scaling reveal.

### `ParallaxImage`

Subtle scroll-based image movement.

### `MagneticButton`

Optional enhanced pointer interaction.

### `AnimatedLink`

Reusable link interaction.

## 9. Content Components

### `RichText`

Renders structured content from the content system.

### `ProjectMedia`

Normalizes images, videos, and captions.

## 10. Component Rules

Each component should have:

- Clear responsibility
- Clear inputs
- Responsive behavior
- Accessibility behavior
- Motion behavior documented when non-trivial

## 11. Duplication Rules

Before creating a new component:

1. Search this inventory.
2. Search existing source code.
3. Check whether a variant would be sufficient.
4. Create a new component only if it improves clarity or reuse.

## 12. Component State Documentation

Interactive components should explicitly consider:

- Default
- Hover
- Focus-visible
- Active
- Disabled when applicable
- Loading where applicable
- Mobile
- Reduced motion

## 13. Animation Ownership

A component should own animation only when the animation belongs to that component's behavior.

Global or cross-page animation should live in shared motion utilities.

Do not duplicate the same GSAP setup in multiple project cards.

## 14. Responsive Component Rules

Components may change structure across breakpoints when needed.

Do not force one DOM arrangement to serve incompatible desktop and mobile compositions if a simpler semantic structure is possible.

## 15. Naming Convention

Use descriptive PascalCase component names.

Good:

- `ProjectShowcase`
- `SectionHeading`
- `ContactCTA`

Avoid:

- `Box1`
- `FancyCard`
- `Thing`
- `Section2`
