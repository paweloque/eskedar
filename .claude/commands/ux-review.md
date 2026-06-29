# ux-review

Run a UX and accessibility audit of the built site. Produces a report — does not fix anything.

---

## Procedure

### 1. Build

Run `npm run build`. If it fails, STOP and report the build error.

### 2. Inventory

List all HTML files in `dist/`. This is the audit scope.

### 3. Inspect each page

For every HTML file, read its contents and check against the items below. Reference `spec/ux-principles.md` and `spec/style-guide.md` as the source of truth.

**Accessibility**

- One `<h1>` per page, heading levels sequential (no skipped levels).
- Semantic landmarks present: `<nav>`, `<main>`, `<header>`, `<footer>`.
- All `<img>` tags have `alt` attributes (meaningful for content images, empty for decorative).
- Form inputs have associated `<label>` elements.
- Interactive elements (`<a>`, `<button>`) have discernible text.
- No bare "click here" / "read more" link text without surrounding context.
- `lang` attribute set on `<html>`.
- ARIA attributes used only where native semantics are insufficient.
- `aria-hidden="true"` on decorative SVGs and emojis.

**Responsive**

- `<meta name="viewport">` present with `width=device-width, initial-scale=1`.
- No inline styles that override responsive behavior.
- Images have explicit `width`/`height` attributes or CSS aspect-ratio.

**Dark mode**

- Read the CSS for hardcoded color values (hex/rgb not wrapped in `var()`).
- Check that dark-mode token overrides exist for all UI-facing color tokens per `spec/style-guide.md`.

**Contrast**

- Verify documented contrast pairs from `spec/style-guide.md` are still accurate.
- Flag any text/background combination not covered by the documented pairs.

### 4. Read the CSS

Read the main stylesheet from `dist/assets/css/style.css` (or wherever it lives). Check:

- Touch targets: interactive elements have min 44×44px hit area.
- Focus indicators: `:focus` or `:focus-visible` styles exist for interactive elements.
- Mobile-first: base styles are mobile, desktop enhancements behind `@media (min-width: 900px)`.

### 5. Write the report

Create the file `audit/<YYYY-MM-DD>-ux-review.md` using today's date. Use the format defined in `spec/ux-audit.md`.

Classify each finding:

- **Critical**: WCAG AA violation or broken usability at any viewport.
- **Warning**: degrades experience but not an outright failure.
- **Observation**: minor improvement or positive pattern worth noting.

### 6. Present findings

Show the user a summary of:

- Total issues by severity.
- Top critical issues.
- Suggested next steps (which findings warrant a task).

**Do NOT fix, edit, or modify any source file. Report only.**
