# Design System

## 1. Design Philosophy

The design system should feel premium, restrained, editorial, and technology-oriented.

Use visual contrast through scale, spacing, typography, cropping, and movement before adding decorative effects.

The design should be recognizable through composition rather than dependence on trendy visual effects.

## 2. Design Principles

### Hierarchy First

Every section needs a clear visual focal point.

### Whitespace Is a Feature

Do not fill empty space merely because it is available.

### Scale Creates Drama

Use large typography, large images, and carefully controlled negative space to establish visual rhythm.

### Consistency Creates Premium Quality

Spacing, typography, buttons, transitions, and interactive states should share a coherent system.

### Motion Should Support Structure

Do not use animation to compensate for weak layout or unclear content.

## 3. Color System

Start with a restrained palette and only introduce accent colors when they strengthen hierarchy.

Suggested semantic tokens:

- `--color-bg`: primary page background
- `--color-surface`: elevated or alternate section surface
- `--color-text`: primary text
- `--color-text-muted`: secondary text
- `--color-border`: subtle divider
- `--color-accent`: interaction or highlight color
- `--color-inverse-bg`: alternate high-contrast section background
- `--color-inverse-text`: text used on inverse backgrounds

Do not hardcode repeated color values throughout components.

The final palette should be defined after visual exploration rather than guessed across many files.

## 4. Typography

Recommended primary font direction:

- Geist
- Inter
- Manrope

Choose one primary family and keep the system disciplined.

Suggested hierarchy:

- Display: hero and major campaign statements
- H1: page titles
- H2: major section titles
- H3: subsections
- Body: descriptions and paragraphs
- Label: metadata and category text
- Caption: supporting information

Avoid using many font families.

## 5. Display Typography

Display text should be used sparingly and confidently.

Characteristics:

- Large scale
- Tight or carefully tuned tracking
- Strong line-height control
- Short lines where possible
- Responsive sizing

The hero headline should not overflow awkwardly or depend on a fixed desktop width.

## 6. Spacing System

Use a consistent spacing scale rather than random values.

Suggested conceptual scale:

- 4
- 8
- 12
- 16
- 24
- 32
- 48
- 64
- 96
- 128
- 160
- 192

Actual values can be mapped through Tailwind tokens or CSS variables.

Large section spacing should be intentionally responsive.

## 7. Grid

Recommended conceptual layout:

Desktop:

- 12 columns
- consistent outer margins
- controlled maximum content width

Tablet:

- 8 columns

Mobile:

- 4 columns

The grid is a compositional tool. Do not force every section to use the same column distribution.

## 8. Container

Use a central maximum-width container for most content, while allowing selected visual sections to extend to the viewport edge.

Recommended conceptual container behavior:

- Mobile: small, consistent side padding
- Tablet: medium side padding
- Desktop: wider side margins with a maximum content width
- Ultra-wide screens: prevent content from stretching indefinitely

## 9. Section Rhythm

Sections should alternate between:

- Dense information
- Visual breathing room
- Strong focal image
- Typography-led statement
- Project presentation

Avoid repeating identical section patterns in sequence.

## 10. Cards

Cards should not become the default component for everything.

Use cards when they communicate grouping or containment.

Avoid:

- Every item inside a rounded rectangle
- Excessive drop shadows
- Large empty card padding without purpose
- Identical cards for every section

Project presentation can instead use:

- Full-width visual blocks
- Editorial rows
- Split layouts
- Overlapping compositions
- Large image and typography pairing

## 11. Border Radius

Use restrained radii.

Not every element needs to be rounded.

The final radius system should include a small number of semantic values instead of arbitrary one-off values.

## 12. Borders

Borders should be subtle and purposeful.

Use them to:

- Separate content
- Define interactive areas
- Structure editorial layouts

Do not use borders as decoration everywhere.

## 13. Shadows

Prefer depth through composition and contrast.

Use shadows only when the element genuinely needs elevation or separation.

Avoid heavy generic UI shadows.

## 14. Buttons

Buttons must have:

- Clear label
- Strong hierarchy
- Hover state
- Focus state
- Disabled state when applicable
- Keyboard accessibility

Avoid overusing pill buttons.

Primary buttons should feel substantial but not oversized.

## 15. Links

Text links should communicate interaction through:

- Underline
- Movement
- Opacity shift
- Icon movement
- Color change

Use one or two interaction patterns consistently.

## 16. Navigation

The navigation should be:

- Simple
- Lightweight
- Persistent only when it improves usability
- Responsive
- Accessible

A refined navigation may include:

- Logo or name
- Selected page state
- Minimal navigation links
- Contact CTA

Do not make navigation dominate the hero.

## 17. Images

Images should feel intentionally art-directed.

Use:

- Strong cropping
- High-quality source material
- Consistent aspect-ratio logic
- Responsive loading
- Meaningful alt text

Avoid generic stock imagery unless intentionally chosen and properly licensed.

## 18. Iconography

Use one icon family for consistency.

Icons should support meaning rather than decorate every row.

Do not mix multiple visual styles of icons.

## 19. Interactive States

Every interactive element should define:

- Default
- Hover, for pointer devices
- Focus-visible
- Active
- Disabled, when applicable

Animation must not be required to understand whether an element is interactive.

## 20. Responsive Behavior

Responsive design must preserve hierarchy, not only dimensions.

Desktop-only effects such as large cursor effects or complex parallax may be simplified on mobile.

Long hero statements may reflow into fewer, shorter lines.

Project layouts may become single-column editorial stacks.

## 21. Mobile Design

Mobile should be treated as a first-class experience.

Priorities:

1. Readability
2. Touch target quality
3. Navigation clarity
4. Performance
5. Motion restraint

Do not force desktop choreography onto mobile.

## 22. Accessibility

Minimum expectations:

- Semantic HTML
- Proper label associations
- Keyboard navigation
- Focus-visible styles
- Contrast compliance
- Reduced motion support
- Meaningful image alt text
- Logical heading structure

## 23. Design Anti-Patterns

Do not use:

- Default Tailwind component styling without customization
- Excessive gradients
- Excessive glassmorphism
- Random decorative circles
- Floating blobs everywhere
- Generic 3D illustrations
- Excessive pill UI
- Too many badge chips
- Excessive card grids
- Overly compressed typography
- Tiny body text for aesthetics
- Decorative animation that distracts from content
