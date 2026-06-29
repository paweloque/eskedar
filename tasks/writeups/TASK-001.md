# TASK-001: Apply the Eskedar brand colors

## What was done

Recolored the site from the leftover PMF coral/cream palette to Eskedar's
dark-green + gold palette (from the mockup `input/IMG_6235.PNG`), at the
design-token level in `content/assets/css/style.css`:

- Rewrote the light palette (`:root`) and both dark-mode blocks
  (`[data-theme="dark"]` and the `prefers-color-scheme: dark` fallback) to a gold
  accent (`hsl(42, 50%, 54%)`), deep-green ground, panel green, and cream text.
- Set `--primary-foreground` to deep green so gold buttons get dark text (matches
  the mockup's buttons).
- Updated the frosted-glass nav + mobile-menu backgrounds (hardcoded with alpha,
  so not tokens) to the new hues in both light and dark.

`npm run build` passes; `npm test` stays green (2/2).

## Key decisions

- Kept the existing token *names* (including `--coral-light`, now a gold tint) to
  avoid touching every usage — a minimal, low-risk swap. Misnomer noted as a
  rename candidate.
- Used HSL to match the file's existing convention (no format churn).
- Same gold `--primary` in light and dark for brand consistency; light mode is
  "just readable" (brand is dark-first per the mockup).
- Body-text contrast verified by calculation (Chrome extension wasn't connected
  for a screenshot): dark cream-on-green ≈13:1, muted ≈8.9:1; light
  green-on-cream ≈13:1, muted ≈5.8:1 — all clear WCAG AA.

## Spec gaps found

- No `spec/style-guide.md` exists (removed in the Phase 0 strip), so the palette
  now lives only in CSS. → TASK-002 created to document it.
- Kept files still reference removed PMF specs (`content-structure.md`,
  `style-guide.md`) in `spec/audit.md`, `spec/workflow.md`, `.claude/commands/*`.
  These resolve as those specs are (re)written for Eskedar — `style-guide.md` via
  TASK-002, `content-structure.md` in Phase 2 — so no separate cleanup task yet.

## Follow-up tasks suggested

- **TASK-002** — Write the style-guide spec (created in `tasks/todo/`).
- Revisit when those sections are rebuilt: the "double-inversion" override blocks
  in `style.css` (lines ~530–557) still carry old coral/cream values for removed
  sections (`.stats-stripe`, `.cfs-cta`, …); inactive now (no matching elements).
- Human visual check at mobile/tablet/desktop still pending (`npm run serve`).
