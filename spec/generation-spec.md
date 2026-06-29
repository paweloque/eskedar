# Generation Spec

How `content/` + `templates/` → `dist/`.

## Overview

Eleventy reads data from `_data/` JS loaders (which in turn read `content/` YAML files), renders Nunjucks templates from `templates/`, and writes HTML to `dist/`. Static assets are passed through unchanged.

## Build Tooling

| File           | Purpose                                                              |
| -------------- | -------------------------------------------------------------------- |
| `package.json` | Node project manifest; declares `@11ty/eleventy` as dev dependency   |
| `.eleventy.js` | Eleventy config: input/output dirs, pass-through copies, collections |

Build command: `npx @11ty/eleventy`
Dev server: `npx @11ty/eleventy --serve` (live reload on file change)
Output directory: `dist/`
Input directory: `templates/` — Eleventy scans only this directory for `.njk` templates, keeping specs, tasks, and content directories out of the build graph.

## Data Flow

```
content/site.yaml          ──▶  _data/site.js        ──▶  {{ site }}
content/pages/index.yaml   ──▶  _data/pages.js        ──▶  {{ pages.index }}
content/pages/schedule.yaml                            ──▶  {{ pages.schedule }}
content/pages/sponsors.yaml                            ──▶  {{ pages.sponsors }}
content/pages/venue.yaml                               ──▶  {{ pages.venue }}
content/speakers/_list.yaml
content/speakers/*.yaml    ──▶  _data/speakers.js     ──▶  {{ speakers }}
content/board/_list.yaml
content/board/*.yaml       ──▶  _data/board.js        ──▶  {{ board }}
```

All data is available globally on every template via Eleventy's global data cascade.

## Data Loaders (`_data/`)

### `_data/site.js`

Reads `content/site.yaml` → returns the object as-is.

### `_data/pages.js`

Reads all YAML files in `content/pages/` → returns an object keyed by filename stem.

Example: `content/pages/index.yaml` is available as `pages.index`.

### `_data/speakers.js`

1. Read `content/speakers/_list.yaml` → get ordered list of `{ slug, featured }`.
2. For each slug, read `content/speakers/<slug>.yaml`.
3. Merge `featured` flag from the list into each speaker object.
4. Return array in list order.

Result: `speakers` is an array of speaker objects with a `slug` and `featured` field added.

### `_data/board.js`

1. Read `content/board/_list.yaml` → get ordered list of slugs.
2. For each slug, read `content/board/<slug>.yaml`.
3. Return array in list order.

Result: `board` is an array of board member objects with `slug` added.

## Template → URL Mapping

| Template file            | Output URL             | Notes                                                     |
| ------------------------ | ---------------------- | --------------------------------------------------------- |
| `templates/index.njk`    | `/index.html` (`/`)    | Homepage                                                  |
| `templates/speakers.njk` | `/speakers/index.html` | Speaker list                                              |
| `templates/board.njk`    | `/board/index.html`    | Advisory board                                            |
| `templates/schedule.njk` | `/schedule/index.html` | Agenda; only rendered if `pages.schedule.enabled` is true |
| `templates/sponsors.njk` | `/sponsors/index.html` | Partners/sponsors                                         |
| `templates/venue.njk`    | `/venue/index.html`    | Venue details                                             |

All templates extend `templates/_layouts/base.njk`.

## Template Structure

```
templates/
  _layouts/
    base.njk          # <html>, <head>, nav, footer — wraps all pages
  _partials/
    nav.njk           # top navigation bar
    footer.njk        # site footer
    speaker-card.njk  # reusable speaker card (used on homepage + speakers page)
  index.njk
  speakers.njk
  board.njk
  schedule.njk
  sponsors.njk
  venue.njk
  variants/           # named design variant overrides (future use)
```

### `base.njk` responsibilities

- `<html lang="{{ site.lang or 'en' }}">`
- `<head>`: charset, viewport, Google Fonts preconnect + stylesheet `<link>`, CSS link, title (from `title` front matter or `site.site_name`), meta description, Open Graph tags (`og:title`, `og:description`, `og:image` if `site.meta.og_image` is set)
- `<body>`: renders nav partial, then `<main>{{ content | safe }}</main>` (the child template), then footer partial
- CSS is linked as `/assets/css/style.css` (served from pass-through copy)
- Partials are included with `{% include "nav.njk" %}` — Eleventy resolves includes relative to `dir.includes` (`templates/_partials/`), so no path prefix is needed

### Front matter in page templates

Each page template declares its own front matter:

```yaml
---
title: "Speakers — Product Management Festival"
description: "Meet the PMF 2026 speakers."
---
```

These override the defaults set in `base.njk`.

## Asset Pass-Through

Eleventy copies `content/assets/` → `dist/assets/` unchanged.

In `.eleventy.js`:

```js
eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });
```

Referenced in templates as `/assets/css/style.css`, `/assets/images/speakers/...`, etc.

## Conditional Page Rendering

The schedule page checks `pages.schedule.enabled`. If `false`, the template renders a "coming soon" placeholder rather than a full schedule table.

There is no mechanism to suppress a page entirely at build time — all page templates always produce an HTML file. Use the `enabled` flag to control what content is shown.

## Markdown Rendering

Speaker bios and session descriptions are stored as Markdown in YAML. Eleventy's built-in Markdown filter is used to render them in templates:

```njk
{{ speaker.bio | markdownify | safe }}
```

Add a custom `markdownify` filter in `.eleventy.js` using the `markdown-it` package (already a dependency of Eleventy).

## Build Output Structure

```
dist/
  index.html
  speakers/
    index.html
  board/
    index.html
  schedule/
    index.html
  sponsors/
    index.html
  venue/
    index.html
  assets/
    css/
      style.css
    images/
      speakers/
      board/
      sponsors/
      general/
```

## Third-Party Scripts

### Vercel Analytics

The site uses [Vercel Web Analytics](https://vercel.com/docs/analytics) to collect page-view data. The analytics script is loaded via a `<script>` tag in `base.njk`, just before the closing `</body>` tag:

```html
<script defer src="/_vercel/insights/script.js"></script>
```

This endpoint is served automatically by Vercel's edge network when the project has Analytics enabled in the Vercel dashboard — no npm package or JS bundler is required. The script is deferred so it does not block rendering.

**Why not the npm package?** The `@vercel/analytics` npm package (and its `/next` entry point) is designed for framework apps with a JS bundler (Next.js, SvelteKit, etc.). This project is a plain Eleventy static site with no client-side build step, so the script-tag approach is the correct integration method per Vercel's docs.

## Acceptance Criteria for a Working Build

- `npm install` completes without errors.
- `npx @11ty/eleventy` completes without errors.
- `dist/index.html` exists and contains rendered speaker names and track names from YAML data.
- `dist/assets/css/style.css` exists (pass-through confirmed).
- `dist/speakers/index.html` contains all 48 speaker names.
- `dist/board/index.html` contains all 15 board member names.
- All internal links (`/speakers/`, `/schedule/`, etc.) resolve to existing files in `dist/`.
