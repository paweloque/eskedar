# General Audit Framework

## Purpose

On-demand review of the project against a specific quality dimension. The `/audit` command accepts a topic and produces a strict, written report. It never fixes anything.

Complements the existing topic-specific audits (`/ux-review`, `/seo-review`) with broader coverage.

## Process

1. Run `/audit <topic>`. It inspects source files and/or built output depending on the topic.
2. Report lands in `audit/<YYYY-MM-DD>-<topic>-audit.md`.
3. Human reviews the report. No fixes are made automatically.
4. For each confirmed issue: create a task in `tasks/todo/` following the standard workflow.

## Topics

### `architecture`

Is the project structured correctly? Does it follow Eleventy conventions and the separation of concerns defined in `spec/`?

Checks:

- Templates contain only presentation logic — no content strings, no data transformation.
- Data loaders in `_data/` are thin readers — they load YAML and expose it, nothing more.
- Partials are reusable and scoped (no god-partials doing too many things).
- Layouts compose correctly (base → page-specific).
- No circular or redundant dependencies between templates/partials.
- File structure matches what `spec/content-structure.md` describes.
- Eleventy config (`.eleventy.js`) is minimal and well-organized.
- No logic that belongs in a data loader living inside a template, or vice versa.

Inspects: `templates/`, `_data/`, `.eleventy.js`, `spec/content-structure.md`.

### `content-integrity`

Is all user-facing content stored in `content/` YAML files, or is some hardcoded in templates? Does the YAML structure match the spec?

Checks:

- Scan every template and partial for hardcoded user-facing strings (headings, paragraphs, labels, button text, alt text, aria-labels, URLs, email addresses). Strings that are structural HTML or Nunjucks logic are fine — content is not.
- Verify that every YAML file in `content/` matches the schema described in `spec/content-structure.md`.
- Check for content that exists in YAML but is never rendered by any template.
- Check for content that a template expects but no YAML file provides (would render empty).
- Verify `_list.yaml` indexes match the actual files present in their directories.
- Flag any TODO/placeholder values in YAML that haven't been filled in.

Inspects: `templates/`, `content/`, `_data/`, `spec/content-structure.md`.

### `performance`

Does the built site load efficiently?

Checks:

- Total page weight (HTML + CSS + images referenced).
- Render-blocking resources in `<head>` (stylesheets, scripts without `defer`/`async`).
- Image files: format (prefer modern formats), explicit dimensions, reasonable file sizes.
- CSS: unused selectors, redundant rules, excessive specificity.
- No inline styles that could be in the stylesheet.
- External resource count (fonts, scripts, iframes).
- Cacheability: static assets use fingerprinted filenames or appropriate cache headers.

Inspects: `dist/` (requires build), `templates/`, CSS source files.

### `security`

Is the site safe from common web vulnerabilities?

Checks:

- Forms: are third-party form embeds (Tally) loaded securely (HTTPS)?
- External scripts: inventory all `<script>` tags — are sources trusted? Any inline scripts?
- User-generated content: is any Markdown content rendered without sanitization?
- Dependency audit: `npm audit` results.
- Sensitive data: no API keys, credentials, or internal URLs in source or built output.
- No `target="_blank"` links missing `rel="noopener noreferrer"`.
- Email addresses: are they exposed in a way that invites scraping?

Inspects: `templates/`, `dist/` (requires build), `package.json`, `package-lock.json`.

### `code-quality`

Is the codebase clean, consistent, and maintainable?

Checks:

- CSS: consistent naming, no `!important` abuse, custom properties used for all theme values, mobile-first media queries, no dead selectors.
- Templates: consistent indentation, no deeply nested conditionals, partials used where repetition occurs.
- Data loaders: error handling for missing files, consistent patterns across loaders.
- Tests: do tests exist for critical paths? Are they meaningful or just smoke tests?
- No commented-out code left in production files.
- No duplicated logic across templates or loaders.
- Config files (`.eleventy.js`, `package.json`): clean, no unused dependencies.

Inspects: `templates/`, `_data/`, `tests/`, CSS source, `.eleventy.js`, `package.json`.

### `accessibility`

Deep accessibility audit beyond what `/ux-review` covers.

Checks:

- Full WCAG 2.1 AA compliance scan of every page.
- Keyboard navigation: tab order is logical, no keyboard traps, skip-to-content link present.
- Screen reader experience: ARIA landmarks complete, live regions for dynamic content, announcement of state changes.
- Color: contrast ratios for all text/background pairs in both light and dark mode, not relying on color alone to convey information.
- Motion: `prefers-reduced-motion` respected where animations exist.
- Forms: error messages associated with inputs, required fields indicated, fieldset/legend for groups.
- Tables (if any): proper `<th>`, `scope`, `<caption>`.
- PDF/media accessibility (if any downloadable content exists).

Inspects: `dist/` (requires build), CSS source, `spec/style-guide.md`, `spec/ux-principles.md`.

### `ui`

Is the frontend well-engineered? Are components reused, layouts consistent, and the code appropriately simple?

Checks:

- Component reuse: are similar UI patterns (cards, grids, badges, section headers) implemented as shared partials or duplicated across templates? Flag copy-pasted markup.
- Simplicity: is any template or CSS over-engineered? Unnecessary abstractions, premature generalisation, or complexity that doesn't serve the current site.
- Responsiveness: does layout work at mobile (≤480px), tablet (768px), and desktop (1024px+)? Check for overflow, content truncation, broken grids, or unreachable content at breakpoints.
- Consistency: are spacing values, border radii, font sizes, and color usage consistent across pages? Do similar elements follow the same patterns?
- Naming: are CSS class names consistent and predictable? Flag mixed conventions (e.g. BEM in one place, flat in another).
- Dead code: unused CSS selectors, unreferenced classes in templates, orphaned partials.
- Inline styles: flag `style=` attributes that should be CSS classes.

Inspects: `templates/`, `content/assets/css/style.css`, `dist/` (requires build).

### `i18n`

Is the site ready for internationalization, even if currently single-language?

Checks:

- `lang` attribute correct on `<html>` and on any mixed-language content.
- No locale-specific date/number formatting hardcoded (should use content YAML).
- Text directionality assumptions (LTR-only CSS that would break with RTL).
- Character encoding declared (`<meta charset>`).
- Strings that would need translation are all in `content/` YAML, not in templates.

Inspects: `templates/`, `content/`, `dist/` (requires build).

### `seo`

Does the site follow SEO best practices?

Checks:

- Every page has a unique `<title>` and `<meta name="description">` (120-155 chars).
- Canonical URLs present on all pages.
- Open Graph and Twitter card meta tags complete and correct.
- Structured data (JSON-LD) for Event, Organization, BreadcrumbList.
- Sitemap at `/sitemap.xml` lists all public pages.
- `robots.txt` references the sitemap.
- Heading hierarchy: one `<h1>` per page, logical nesting.
- Image alt text present and descriptive.
- Internal linking structure: key pages reachable from nav/footer.
- Clean URL structure (lowercase, hyphens, no trailing parameters).

Inspects: `dist/` (requires build), `templates/`, `content/pages/`, `spec/seo.md`.

### `testing`

Is the test suite comprehensive and well-structured?

Checks:

- Test coverage across the layers defined in `spec/testing-strategy.md`.
- Are critical paths tested (content validation, data loaders, build output, HTML structure)?
- Test quality: are assertions meaningful or superficial?
- Are there gaps where failures could go undetected?
- Test naming: clear, consistent, describes the expectation.
- Flakiness risk: tests that depend on build output timing, external services, or file system state.
- Test file organization matches the spec's recommended structure.

Inspects: `tests/`, `spec/testing-strategy.md`, `vitest.config.*`, `package.json`.

## Ratings

Each criterion is rated:

- **Strong** — meets or exceeds best practices. Well-implemented, no issues found.
- **Adequate** — functional and reasonable, minor improvements possible.
- **Weak** — notable gaps or issues that should be addressed.
- **Missing** — not implemented or fundamentally broken.

Overall project rating for the audited area:

- **Strong** — no critical issues, few weaknesses, mostly strengths.
- **Adequate** — some weaknesses but nothing critical, project is functional.
- **Weak** — multiple significant weaknesses or one critical issue.
- **Critical** — critical issues that need immediate attention.

## Severity Levels

Findings within the Weaknesses section use:

- **Critical** — violates a spec, standard, or best practice in a way that causes real harm (broken functionality, inaccessible content, security risk, incorrect data).
- **High** — significant quality issue that should be fixed soon.
- **Medium** — degrades quality but doesn't break things. Should be addressed.
- **Low** — minor improvement opportunity.

## Report Format

```markdown
# <Area> Audit — <YYYY-MM-DD>

**Auditor:** Claude (automated)
**Scope:** <one-line description of what was reviewed>

## Executive Summary

<2-4 sentences: overall assessment, biggest risk, biggest strength>

## Rating Overview

| Criterion | Rating | Notes |
| --------- | ------ | ----- |
| ...       | ...    | ...   |

**Overall: <Strong / Adequate / Weak / Critical>**

## Detailed Findings

### Strengths

- **[Criterion]** — what is done well and why it matters. Reference files/lines.

### Weaknesses

- **[Criterion]** `file:line` — what the issue is, why it matters, and a concrete recommendation. Severity: **Critical** / **High** / **Medium** / **Low**.

### Not Assessed

List anything out of scope or unverifiable.

## Recommendations

1. **<Short title>** — <what to do and why>. Effort: **S/M/L/XL**. Impact: **High/Medium/Low**.

## Files Inspected

<list of files/directories reviewed>
```

## Rules

- The audit **never fixes** code, templates, content, or config. Report only.
- Findings become tasks via the standard spec -> task -> implement flow.
- Previous audit reports in `audit/` are never modified. Each run produces a new file.
- Be strict. The value of an audit is in catching things humans miss, not in reassurance.
- Be specific. Every finding must include the exact file and line, what's wrong, and why.
- Positive findings matter. If something is done well, say so — it prevents future regressions.
