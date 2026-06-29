# UX Principles

## Core Philosophy

The site exists to convert visitors into ticket buyers and to inform attendees. Every design decision serves that purpose.

## Mobile-First

- Design and build for the smallest screen first; enhance for larger screens.
- Touch targets minimum 44×44px.
- No hover-only interactions; all interactions must work on touch.
- Prioritise content load order for mobile networks.

## Accessibility (WCAG 2.1 AA)

- Semantic HTML is the baseline: use `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>` correctly.
- Every image has a meaningful `alt` attribute (or `alt=""` for decorative images).
- Colour contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI components.
- All interactive elements are keyboard-reachable and have a visible focus indicator.
- ARIA roles and attributes are used only where native semantics are insufficient.
- Heading hierarchy is logical (`h1` → `h2` → `h3`); no skipped levels.
- Forms have associated `<label>` elements.

## Performance

- No JavaScript required for any core content (speaker list, schedule, venue, etc.).
- JS enhancements (e.g. schedule filtering) are progressive: content is usable without them.
- External dependencies are minimal and justified; prefer system fonts or a single self-hosted variable font.
- Images are provided in modern formats (WebP with JPEG fallback); sizes are explicit to prevent layout shift.
- CSS is inlined in `<head>` or in a single linked stylesheet; no render-blocking scripts.

## Content Hierarchy

Each page leads with what the visitor needs most:

1. **Homepage**: event name, date, location, primary CTA (tickets / register).
2. **Speakers**: featured speakers first, full list second.
3. **Schedule**: current or upcoming day first; full agenda accessible.
4. **Venue**: address, map, transport links.
5. **Sponsors**: tier grouping, prominent logos.
6. **FAQ**: most common questions first.

## Tone

Clear, direct, confident. No jargon. Dates and times include timezone. Calls to action are specific ("Buy tickets", not "Learn more").
