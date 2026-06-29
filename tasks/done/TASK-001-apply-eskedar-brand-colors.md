---
id: TASK-001
title: Apply the Eskedar brand colors
type: style
status: done
priority: high
depends_on: []
---

## Goal

Recolor the site from the leftover template colors to Eskedar's palette — the
dark green + gold look from the mockup (`input/IMG_6235.PNG`). This is the first
visible step that makes the empty shell actually feel like Eskedar.

## Design source

- `input/IMG_6235.PNG` — the mockup. Match its colors.
- `spec/ux-principles.md` — keep text readable (contrast ≥ 4.5:1).

## Acceptance Criteria

- The **color custom properties (design tokens)** at the top of
  `content/assets/css/style.css` are changed to the Eskedar palette. Change the
  tokens in one place — don't hardcode colors all over the file.
- Starting palette from the mockup (sample the real values and refine):
  - Deep green background: `#13231A`
  - Panel / card green: `#1F3024`
  - Gold accent (headings, buttons, icons): `#C2A24E`
  - Cream text: `#ECE5D4`
- The homepage hero, nav, footer, and buttons all use the new colors.
- Body text still passes contrast (≥ 4.5:1) against its background.
- `npm run build` succeeds and `npm test` stays green.

## Notes

- Run it with `/implement-task TASK-001`. This is your first full run of the loop:
  **Say it → Build it → Look at it → Fix it → Ship it.**
- The site has a light/dark toggle. Eskedar is dark-first — make dark mode match
  the mockup; light mode just needs to stay readable.
- Follow-up idea: once the colors feel right, write a short `spec/style-guide.md`
  recording the palette and fonts. That's how the pros keep a site consistent —
  and it's a good example of turning a "spec gap" into the next task.
