# Testing Strategy for PMF Website

## Overview

This document defines a testing strategy for the Product Management Festival static website built with Eleventy (11ty). The site has a clear separation between **content** (YAML), **data loaders** (JS), **templates** (Nunjucks), **configuration** (Eleventy), and **build output** (HTML/CSS) — each of which can be tested independently.

### Test Runner

Use **Vitest** as the test framework. It's fast, requires minimal config, supports ESM and CJS, and works well for both unit tests and integration-style assertions.

---

## Layer 1: Content Validation

**What:** Validate that all YAML content files conform to expected schemas and referential integrity rules.

**Why:** Content is edited frequently (new speakers, schedule changes). Schema violations silently produce broken pages. These tests act as a safety net for content editors.

### Tests

#### 1.1 Speaker YAML schema

- Every file in `content/speakers/` (except `_list.yaml`) must parse as valid YAML
- Required fields: `name`, `title`, `company`, `photo`, `bio`
- `photo` path must point to an existing file in `content/assets/`
- `sessions` (if present) entries must have `title`, `day`, `time`, `track`
- `social.linkedin` (if present) must be a valid URL

#### 1.2 Speaker list integrity

- Every slug in `content/speakers/_list.yaml` must have a matching `.yaml` file
- Every `.yaml` file in `content/speakers/` (except `_list.yaml`) must be referenced in the list
- No duplicate slugs in the list

#### 1.3 Board YAML schema

- Same pattern as speakers: required fields (`name`, `title`, `company`, `photo`, `bio`)
- `_list.yaml` ↔ file cross-reference (same as 1.2)

#### 1.4 Page YAML schema

- Every file in `content/pages/` must parse as valid YAML
- `index.yaml`: must have `hero`, `tracks`, `tickets` sections
- `schedule.yaml`: if schedule days exist, each slot must have `time` and `title`
- `sponsors.yaml`: sponsor tiers must have `name` and `sponsors` array

#### 1.5 Site config schema

- `content/site.yaml` must have `site_name`, `lang`, `url`, `nav`, `footer`
- Every `nav` entry must have `label` and `url`
- Every `footer.columns[].links[]` entry must have `label` and `url`

#### 1.6 Image references

- Collect all `photo` fields across speakers, board members, and page content
- Verify each referenced image file exists on disk

---

## Layer 2: Data Loader Unit Tests

**What:** Test the JavaScript data loaders in `_data/` as standalone modules.

**Why:** These are pure functions that read YAML files and transform them into data structures consumed by templates. They contain ordering logic and field merging that can break silently.

### Tests

#### 2.1 `speakers.js` loader

- Returns an array (not object, not empty)
- Array length matches the number of entries in `_list.yaml`
- Each speaker object has a `slug` property injected from the list
- Each speaker object has a `featured` property injected from the list
- Order matches `_list.yaml` order
- Speaker data fields (name, title, etc.) come from individual YAML files

#### 2.2 `pages.js` loader

- Returns an object keyed by filename stem
- Contains expected keys: `index`, `schedule`, `sponsors`, `venue`, etc.
- Each value is a parsed YAML object (not a string)

#### 2.3 `board.js` loader

- Returns an array
- Array length matches `_list.yaml`
- Each member has `slug` injected
- Order matches `_list.yaml`

#### 2.4 `site.js` loader

- Returns an object with `site_name`, `nav`, `footer`, etc.
- `nav` is an array of objects

---

## Layer 3: Eleventy Configuration Tests

**What:** Test the Eleventy config (`.eleventy.js`) — custom filters and directory settings.

**Why:** The `markdownify` filter is used throughout templates. If it breaks, bios and descriptions render as raw markdown.

### Tests

#### 3.1 `markdownify` filter

- Converts markdown bold/italic/links to HTML
- Returns empty string for `null` / `undefined` / `""` input
- Handles multiline markdown content
- Does not allow raw HTML injection (html option is `false`)

#### 3.2 Directory config

- `input` is `templates`
- `output` is `dist`
- `templateFormats` includes `njk`

---

## Layer 4: Build Smoke Tests

**What:** Run `npx @11ty/eleventy` and validate the build completes and produces expected output files.

**Why:** This is the ultimate integration test — if the build succeeds and produces the right files, the whole pipeline works.

### Tests

#### 4.1 Build succeeds

- `npx @11ty/eleventy` exits with code 0
- `dist/` directory is created

#### 4.2 Expected pages exist

- `dist/index.html`
- `dist/speakers/index.html`
- `dist/board/index.html`
- `dist/schedule/index.html`
- `dist/venue/index.html`
- `dist/about/index.html`
- `dist/faq/index.html`
- `dist/impressum/index.html`
- `dist/privacy/index.html`
- `dist/call-for-speakers/index.html`
- `dist/call-for-sponsors/index.html`
- `dist/sponsors/index.html`

#### 4.3 Static assets copied

- `dist/assets/css/style.css` exists
- `dist/assets/images/` directory contains files

---

## Layer 5: HTML Output Validation

**What:** Parse the generated HTML files and assert on structure, content presence, and correctness.

**Why:** This catches template rendering bugs — missing sections, broken loops, empty content areas — without needing a browser.

### Tests

#### 5.1 Homepage content

- Contains the site name in a heading or title tag
- Contains the hero section with event date and location
- Contains at least 3 track cards
- Contains speaker cards (at least some speakers rendered)
- Contains ticket tier information
- Has a proper `<title>` tag and `<meta name="description">`

#### 5.2 Speakers page

- Renders a card/element for every speaker in `_list.yaml`
- Each speaker card contains the speaker's name
- Each speaker card has an `<img>` with a valid `src` attribute
- Featured speakers (if any flagged) are distinguishable

#### 5.3 Board page

- Renders a card for every board member in `_list.yaml`
- Each card contains name and title

#### 5.4 Schedule page

- If schedule data exists, renders time slots
- Day navigation elements present

#### 5.5 Navigation consistency

- Every page includes the `<nav>` element
- Nav links match `site.yaml` nav entries
- CTA button is present on every page

#### 5.6 Footer consistency

- Every generated HTML page includes the footer
- Footer contains copyright text
- Footer column links match `site.yaml` footer config

#### 5.7 SEO basics

- Every page has a `<title>` tag (non-empty)
- Every page has `<meta name="description">` (non-empty)
- Every page has `<html lang="en">`

---

## Layer 6: Link & Reference Integrity

**What:** Scan generated HTML for broken internal links and missing assets.

**Why:** Broken links and missing images are the most common issues on static sites, especially after content restructuring.

### Tests

#### 6.1 Internal links

- Collect all `<a href="...">` pointing to internal paths (starting with `/`)
- Verify each target path exists as a file in `dist/`

#### 6.2 Image references

- Collect all `<img src="...">` from generated HTML
- Verify each image file exists in `dist/`

#### 6.3 CSS references

- Verify all `<link rel="stylesheet" href="...">` point to existing files

---

## Layer 7: CSS Validation (Optional / Nice-to-Have)

**What:** Lint and validate the CSS.

**Why:** Catches typos in custom properties, unused selectors, or syntax errors.

### Tests

#### 7.1 CSS parses without errors

- `style.css` is valid CSS (use a CSS parser like `css-tree`)

#### 7.2 Custom properties are defined

- Every `var(--name)` usage references a property defined in `:root`

---

## Implementation Plan

### Task 1: Project setup

- [ ] Install `vitest` as a dev dependency
- [ ] Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts to `package.json`
- [ ] Create `tests/` directory with subdirectories matching the layers above

### Task 2: Content validation tests (Layer 1)

- [ ] Create `tests/content/speakers.test.js`
- [ ] Create `tests/content/board.test.js`
- [ ] Create `tests/content/pages.test.js`
- [ ] Create `tests/content/site-config.test.js`
- [ ] Create `tests/content/images.test.js`
- [ ] Create shared helper: `tests/helpers/yaml-loader.js` for reading/parsing YAML

### Task 3: Data loader tests (Layer 2)

- [ ] Create `tests/data-loaders/speakers.test.js`
- [ ] Create `tests/data-loaders/pages.test.js`
- [ ] Create `tests/data-loaders/board.test.js`
- [ ] Create `tests/data-loaders/site.test.js`

### Task 4: Config tests (Layer 3)

- [ ] Create `tests/config/eleventy.test.js`

### Task 5: Build & output tests (Layers 4–6)

- [ ] Create `tests/build/smoke.test.js` — run build, check files exist
- [ ] Create `tests/build/html-validation.test.js` — parse HTML with `cheerio`, assert structure
- [ ] Create `tests/build/links.test.js` — scan for broken internal links/images
- [ ] Install `cheerio` as a dev dependency for HTML parsing

### Task 6: CI integration

- [ ] Add a `test` npm script
- [ ] Optionally add a GitHub Actions workflow to run tests on push/PR

### Recommended priority order

1. **Layer 1** (Content validation) — highest value, catches most common errors
2. **Layer 2** (Data loaders) — quick to write, tests real logic
3. **Layer 4** (Build smoke) — essential safety net
4. **Layer 5** (HTML output) — catches template bugs
5. **Layer 6** (Link integrity) — prevents broken links shipping
6. **Layer 3** (Config) — lower risk, less likely to change
7. **Layer 7** (CSS) — nice-to-have

### Test file structure

```
tests/
├── helpers/
│   └── yaml-loader.js          # Shared YAML reading utilities
├── content/
│   ├── speakers.test.js        # Layer 1.1, 1.2
│   ├── board.test.js           # Layer 1.3
│   ├── pages.test.js           # Layer 1.4
│   ├── site-config.test.js     # Layer 1.5
│   └── images.test.js          # Layer 1.6
├── data-loaders/
│   ├── speakers.test.js        # Layer 2.1
│   ├── pages.test.js           # Layer 2.2
│   ├── board.test.js           # Layer 2.3
│   └── site.test.js            # Layer 2.4
├── config/
│   └── eleventy.test.js        # Layer 3
└── build/
    ├── smoke.test.js           # Layer 4
    ├── html-validation.test.js # Layer 5
    └── links.test.js           # Layer 6
```

### Dependencies to add

```json
{
  "devDependencies": {
    "vitest": "^3.x",
    "cheerio": "^1.x"
  }
}
```
