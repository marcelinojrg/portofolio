# Marcelino Jorgi — Portfolio

> Creative Technologist & Digital Product Builder. A premium, motion-forward portfolio where systems thinking meets visual craft.

This is the personal portfolio of **Marcelino Jorgi** — built as a cinematic, editorial web experience rather than a conventional resume. Every section is choreographed: typography-led, image-aware, and calm by design.

---

## ✨ Highlights

- **Cinematic intro** — a kinetic 1–100 loader that reveals the name top-down before the experience begins.
- **Living hero** — "Hello" greets with a cycling emoji, while "I'm Marcelino Jorgi" decodes character-by-character into _Developer → Designer → Student_.
- **Scroll storytelling** — GSAP + ScrollTrigger drive reveals, parallax, marquees, and a word-scrub that "inks in" statements as you read.
- **Custom cursor** — a dot + trailing ring that responds to interactive elements (desktop, full-motion only).
- **Accessible by default** — respects `prefers-reduced-motion`, keyboard navigation, semantic HTML, and visible focus states.

## 🛠 Tech Stack

| Layer        | Choice                                   |
| ------------ | ---------------------------------------- |
| Framework    | [Astro 5](https://astro.build)           |
| Language     | TypeScript                               |
| Styling      | Tailwind CSS v4 (Vite plugin)            |
| Motion       | GSAP + ScrollTrigger                     |
| Smooth scroll| Lenis                                    |
| Interactivity| React islands _(only where needed)_      |
| Fonts        | Self-hosted Space Grotesk + Inter        |

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start the dev server (open the printed local URL)
npm run dev

# production build + preview
npm run build
npm run preview
```

### Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the local dev server           |
| `npm run build`     | Build the static site to `dist/`     |
| `npm run preview`   | Preview the production build locally |
| `npm run check`     | Run Astro's type/lint checks         |
| `npm run format`    | Format with Prettier                 |

## 📁 Project Structure

```
src/
├── components/        # UI by section (hero, projects, contact, ...)
│   ├── common/        # header, footer, cursor, intro
│   ├── hero/          # hero scene
│   ├── projects/      # project index + covers
│   └── ...
├── layouts/           # BaseLayout, ProjectLayout
├── content/
│   └── projects/      # project case studies (content collection)
├── lib/
│   ├── animations/    # modular GSAP scenes (one per motion moment)
│   └── constants/     # site config (name, email, nav, socials)
└── styles/
    └── globals.css    # design tokens + component styles
```

Motion is split into **small, single-purpose modules** under `src/lib/animations/` — each scene is independent, reduced-motion aware, and torn down cleanly on navigation.

## ✍️ Content

Projects live in the Astro content collection at `src/content/projects/`. Each entry uses the `projects` schema (`title`, `year`, `category`, `role`, `status`, `summary`, `technologies`, `tint`, `featured`, `order`).

Edit `src/lib/constants/site.ts` for global identity — name, role, **email**, navigation, and social links.

## ♿ Performance & Accessibility

- Static output, minimal client JavaScript.
- GSAP/Lenis isolated in cacheable vendor chunks; app code stays tiny.
- Smooth scrolling and all ambient motion disable under `prefers-reduced-motion`.
- Semantic landmarks, alt text, and focus-visible styles throughout.

---

© Marcelino Jorgi — built with Astro & GSAP.
