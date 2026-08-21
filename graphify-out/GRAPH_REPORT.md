# Graph Report - portofolio (2026-08-18)

## Corpus Check

- Corpus is ~10,355 words - fits in a single context window. You may not need a graph.

## Summary

- 220 nodes · 212 edges · 79 communities (13 shown, 66 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- Astro UI Components
- Project Rules & Stack
- Animation Library (GSAP)
- Runtime Dependencies
- Dev Dependencies
- TypeScript Configuration
- Package Scripts
- Project Content Model
- Layouts & Animation Ownership
- Mobile Experience Rules
- Content Collection Config
- Accessibility & Reduced Motion
- Content Philosophy
- Design Philosophy
- Performance Targets
- Custom Cursor
- Hero Animation Pattern
- Image Reveal Pattern
- Magnetic Interactions
- Page Transitions
- Parallax Rules
- Project Showcase Motion
- Text Reveal Patterns
- Homepage Storytelling Structure
- Personal Positioning
- Favicon & Brand Mark
- Definition of Done
- Documentation Hierarchy
- Portfolio Identity
- Ambient Motion
- Duration System
- Easing Strategy
- Horizontal Scroll
- Six Motion Categories
- Motion QA Checklist
- Page Load Choreography
- Pinned Sections
- Stagger System
- Astro Client Directives
- Component Islands Strategy
- Data and UI Separation
- Deployment Targets
- SEO Architecture
- Testing Strategy
- AboutIntro Component
- AnimatedLink Component
- Capabilities Component
- ContactCTA Component
- ExperienceTimeline Component
- HeroTitle Component
- HeroVisual Component
- ProjectCard Component
- ProjectContent Component
- ProjectGallery Component
- ProjectHero Component
- ProjectIndex Component
- ProjectMedia Component
- ProjectMeta Component
- ProjectNavigation Component
- SectionHeading Component
- SectionIntro Component
- SiteFooter Component
- SiteHeader Component
- SocialLinks Component
- Design Anti-Patterns
- Color System
- Grid System
- Interactive States
- Section Rhythm
- Spacing Scale
- Typography System
- Target Audience
- Experience Goal
- Hero Philosophy
- Project Philosophy
- Success Criteria

## God Nodes (most connected - your core abstractions)

1. `prefersReducedMotion()` - 12 edges
2. `AGENTS.md (Agent Rules)` - 9 edges
3. `runScenes()` - 8 edges
4. `CLAUDE.md (Project Overview)` - 8 edges
5. `ARCHITECTURE.md (Technical Architecture)` - 8 edges
6. `docs/README.md (Documentation Guide)` - 7 edges
7. `Primary Stack` - 6 edges
8. `ANIMATION.md (Motion System)` - 6 edges
9. `scripts` - 5 edges
10. `initParallax()` - 5 edges

## Surprising Connections (you probably didn't know these)

- `Design Principles` --semantically_similar_to--> `Design Philosophy (Premium, Restrained, Editorial)` [INFERRED] [semantically similar]
  AGENTS.md → docs/DESIGN.md
- `Content Principles` --semantically_similar_to--> `Content Philosophy (Evidence over Claims)` [INFERRED] [semantically similar]
  AGENTS.md → docs/CONTENT.md
- `Animation Principles` --semantically_similar_to--> `Motion Philosophy` [INFERRED] [semantically similar]
  AGENTS.md → docs/ANIMATION.md
- `Performance Rules` --semantically_similar_to--> `Performance Targets` [INFERRED] [semantically similar]
  AGENTS.md → docs/ARCHITECTURE.md
- `Responsive Rules` --semantically_similar_to--> `Mobile Design (First-Class Experience)` [INFERRED] [semantically similar]
  AGENTS.md → docs/DESIGN.md

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- **Documentation Hierarchy (Decision Priority Order)** — agents_document, docs_vision_document, docs_design_document, docs_animation_document, docs_architecture_document, docs_components_document, docs_content_document [EXTRACTED 1.00]
- **Primary Technology Stack** — agents_astro, agents_typescript, agents_react, agents_tailwind_css, agents_gsap, agents_gsap_scrolltrigger [EXTRACTED 1.00]
- **Project Case Study Pipeline (Content Model to Page)** — docs_content_project_content_model, docs_content_content_data_structure, docs_architecture_content_collections, docs_architecture_projectlayout, src_content_projects_project_one_document, src_content_projects_project_two_document [INFERRED 0.85]

## Communities (79 total, 66 thin omitted)

### Community 0 - "Astro UI Components"

Cohesion: 0.09
Nodes (9): lines, num, TINTS, projects, num, NavItem, Props, site (+1 more)

### Community 1 - "Project Rules & Stack"

Cohesion: 0.20
Nodes (20): Animation Principles, Astro, AGENTS.md (Agent Rules), GSAP, GSAP ScrollTrigger, mimo.xiaomi.com Primary Inspiration, Primary Stack, React (Interaction Islands Only) (+12 more)

### Community 2 - "Animation Library (GSAP)"

Cohesion: 0.35
Nodes (11): initHeroMotion(), initMotion(), runScenes(), initParallax(), isFinePointer(), killAllMotion(), prefersReducedMotion(), initCoverReveal() (+3 more)

### Community 3 - "Runtime Dependencies"

Cohesion: 0.13
Nodes (15): astro, @fontsource/inter, @fontsource/space-grotesk, gsap, dependencies, astro, @fontsource/inter, @fontsource/space-grotesk (+7 more)

### Community 4 - "Dev Dependencies"

Cohesion: 0.13
Nodes (15): @astrojs/check, @astrojs/react, devDependencies, @astrojs/check, @astrojs/react, tailwindcss, @tailwindcss/vite, @types/react (+7 more)

### Community 5 - "TypeScript Configuration"

Cohesion: 0.17
Nodes (11): astro/tsconfigs/strict, .astro/types.d.ts, dist, node_modules, src/**/*, compilerOptions, baseUrl, paths (+3 more)

### Community 6 - "Package Scripts"

Cohesion: 0.20
Nodes (9): name, private, scripts, build, check, dev, preview, type (+1 more)

### Community 7 - "Project Content Model"

Cohesion: 0.39
Nodes (8): TypeScript, Project Content Collections, RichText Component, Content Collection Frontmatter Schema, Placeholder Policy ([REPLACE:] Markers), Project Content Model (Case Study Fields), Project One (Placeholder Content Entry), Project Two (Placeholder Content Entry)

### Community 8 - "Layouts & Animation Ownership"

Cohesion: 0.40
Nodes (5): Animation Architecture (src/lib/animations), BaseLayout, Suggested Directory Structure, ProjectLayout, Animation Ownership Rule

### Community 9 - "Mobile Experience Rules"

Cohesion: 0.67
Nodes (3): Responsive Rules, Mobile Motion Rules, Mobile Design (First-Class Experience)

## Knowledge Gaps

- **118 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+113 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _118 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Astro UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.09359605911330049 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
