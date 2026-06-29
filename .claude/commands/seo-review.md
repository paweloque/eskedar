# seo-review

Run an SEO audit of the built site. Produces a report — does not fix anything.

---

## Procedure

### 1. Build

Run `npm run build`. If it fails, STOP and report the build error.

### 2. Inventory

List all HTML files in `dist/`. This is the audit scope.

### 3. Check technical SEO infrastructure

- Does `/sitemap.xml` exist in `dist/`? If so, parse it and verify every `<loc>` points to an existing page.
- Does `/robots.txt` exist in `dist/`? If so, verify it references the sitemap URL.
- Do favicon files exist (`favicon.ico`, `favicon-32x32.png`, or equivalent `<link rel="icon">` tags)?

### 4. Inspect each page

For every HTML file, read its contents and check against the items below. Reference `spec/seo.md` as the source of truth.

**Title & description**

- `<title>` tag exists, is non-empty, and is under 60 characters.
- `<meta name="description">` exists, is non-empty. Flag if under 120 or over 155 characters.
- Title and description are unique across all pages (no duplicates).

**Canonical & lang**

- `<link rel="canonical" href="...">` exists and contains a valid absolute URL.
- `<html lang="...">` is set.

**Open Graph**

- `og:title` — present and non-empty.
- `og:description` — present and non-empty.
- `og:type` — present.
- `og:url` — present and matches the canonical URL.
- `og:image` — present and points to an existing file.

**Twitter cards**

- `twitter:card` — present (value should be `summary_large_image`).
- `twitter:title` — present.
- `twitter:description` — present.
- `twitter:image` — present.

**Structured data**

- Look for `<script type="application/ld+json">` blocks.
- If found, verify they parse as valid JSON.
- On the homepage, check for Event schema with `name`, `startDate`, `location`, `url`.

**Content SEO**

- Exactly one `<h1>` per page.
- `<h1>` text is descriptive (not empty or generic).
- All `<img>` tags have non-empty, meaningful `alt` attributes (flag placeholder text like "TODO").
- No broken internal links (href points to a page that exists in `dist/`).

### 5. Write the report

Create the file `audit/<YYYY-MM-DD>-seo-review.md` using today's date. Use the format defined in `spec/seo-audit.md`.

Classify each finding:

- **Critical**: directly harms indexing, prevents rich results, or causes broken social previews.
- **Warning**: degrades search appearance or misses an optimization opportunity.
- **Observation**: minor improvement or positive pattern worth noting.

Include a per-page checklist table.

### 6. Present findings

Show the user a summary of:

- Total issues by severity.
- Top critical issues.
- Suggested next steps (which findings warrant a task).

**Do NOT fix, edit, or modify any source file. Report only.**
