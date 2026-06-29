# CLAUDE.md — Eskedar Ethiopian Coffee Website

## What this is

Static website for **Eskedar Ethiopian Coffee** (D&E Spring AG, Bern) — a premium B2B importer of Ethiopian green coffee. Built with Eleventy 2.x + Nunjucks, deployed on Vercel. Scaffolded from the PMF website template; the conference-specific parts have been removed.

This is also a learning project. **`PLAN.md` explains how the work is run** — the roles, the build loop, and the roadmap. Read it first.

## Commands

```bash
npm run serve     # Dev server with live reload at localhost:8080
npm run build     # Production build → dist/
npm test          # Run tests (vitest)
```

## Workflow — spec → task → implement

**Never change anything directly.** All changes follow this path:

1. **Spec** — Update or create the relevant file in `spec/` describing the change.
2. **Task** — Create a task file in `tasks/todo/` (format: `TASK-NNN-kebab-title.md`).
3. **Implement** — Use the `/implement-task` skill. Move task to `tasks/done/` when complete.

See `spec/workflow.md` for full details including task frontmatter format. (For this teaching project, a lighter "wish → card → build" version of the same idea is described in `PLAN.md`.)

## Project structure

```
content/            YAML content files (site config + pages)
  site.yaml         Global config: brand, nav, footer, social
  pages/            Per-page content (index.yaml; more added in Phase 2)
  assets/           Static files (CSS, fonts, favicons, images)
templates/          Nunjucks templates (pages, _layouts/base.njk, _partials/)
_data/              JS data loaders (site.js, pages.js)
spec/               Design specs & documentation
tasks/              todo/ → done/ → writeups/
tests/              Vitest tests
audit/              Audit reports (<YYYY-MM-DD>-<topic>-audit.md)
dist/               Build output (git-ignored)
input/              Source material (the design mockup IMG_6235.PNG)
```

## Key architecture decisions

- **Content/template separation**: All content lives in `content/` as YAML. No content in templates.
- **Data loaders** in `_data/` read YAML and expose data to templates.
- **CSS**: Plain CSS with custom properties, mobile-first (breakpoint at 900px). Single stylesheet, no framework.
- **No JS required** for core content. JS enhancements are progressive.
- **Dark mode**: OS preference detection + manual toggle. (Eskedar's design is dark-first — see `input/IMG_6235.PNG`.)
- **Images**: optimized at build time via the `{% image src, alt, width, class %}` shortcode (`@11ty/eleventy-img`).

## Writing style

Be short and precise. No LLM bloat in specs, tasks, or any written output. Direct, clear language. No filler.

## UX priorities

This is a client-facing brand site — UX matters:

- **Responsive/mobile-first**: Design for the smallest screen first, enhance upward. Touch targets ≥ 44×44px.
- **Accessibility (WCAG 2.1 AA)**: Semantic HTML, contrast ≥ 4.5:1, keyboard navigable, logical heading hierarchy, labeled forms.
- **Performance**: No render-blocking JS, minimal dependencies, explicit image sizes.

Run `/audit <topic>`, `/ux-review`, or `/seo-review` for audits. Reports go to `audit/`. Audits never auto-fix — a human reviews findings and creates tasks. See `spec/audit.md`.

See `spec/ux-principles.md` for full details.

## Current state

**Phase 0 (scaffold) is complete**: an empty homepage that builds and serves. The real pages (Home sections, About, Our Coffees, Quality, For Roasters, Contact) and Eskedar's own content/style specs are built from Phase 2 onward — see `PLAN.md`.