# Eskedar Ethiopian Coffee — Website

Static website for **Eskedar Ethiopian Coffee** (D&E Spring AG, Bern) — premium B2B Ethiopian green coffee. Built with [Eleventy (11ty)](https://www.11ty.dev/). Scaffolded from the PMF website template.

> **New here? Read `PLAN.md` first** — it explains how this project is run and built, step by step.

## Quick start

```bash
npm install
npm run serve    # Dev server with live reload at http://localhost:8080
npm run build    # Production build → dist/
```

## Project structure

```
content/            # All site content (YAML)
  site.yaml         # Global config: brand, nav, footer, social
  pages/            # Per-page content (index.yaml; more in Phase 2)
  assets/           # CSS, fonts, favicons, images
templates/          # Nunjucks templates
  _layouts/         # Base HTML layout
  _partials/        # Reusable components (nav, footer)
  *.njk             # Page templates
_data/              # 11ty data loaders (read content/ YAML)
spec/               # Design specs & documentation
tasks/              # Work tracking: todo/ → done/ → writeups/
input/              # Source material (design mockup)
dist/               # Generated output (git-ignored)
```

## Tech stack

- **Static site generator:** Eleventy 2.x
- **Templating:** Nunjucks
- **Styling:** Plain CSS with custom properties, mobile-first
- **Images:** build-time optimization via `@11ty/eleventy-img`
- **Deployment:** Vercel (`vercel.json`)

## Working with Claude Code

All AI-assisted work follows the **spec → task → implement** workflow in `CLAUDE.md`.

| Command | What it does |
| --- | --- |
| `/implement-task TASK-NNN` | Implements a task from `tasks/todo/` end to end. |
| `/test` | Runs vitest and fixes failures. |
| `/ux-review` | Audits pages for accessibility, responsive design, contrast. Reports only. |
| `/seo-review` | Audits pages for SEO. Reports only. |

## Design reference

The target design is in `input/IMG_6235.PNG`.

## Status

**Phase 0 complete** — empty homepage builds and serves. See `PLAN.md` for the roadmap.