---
id: TASK-002
title: Write the style-guide spec
type: spec
status: ready
priority: medium
depends_on: [TASK-001]
---

## Goal

Record Eskedar's visual language in `spec/style-guide.md` so colors, fonts, and
spacing stay consistent as the site grows. TASK-001 set the palette in CSS; this
captures it as the documented source of truth.

## Relevant Specs

- `content/assets/css/style.css` — the design tokens just set (read the values).
- `input/IMG_6235.PNG` — the design reference.
- `spec/ux-principles.md` — the accessibility/contrast rules to record.

## Acceptance Criteria

- `spec/style-guide.md` exists and documents:
  - The colour tokens (light + dark) with their HSL values and what each is for.
  - The fonts: DM Serif Display (headings) + DM Sans (body).
  - The documented contrast pairs (e.g. foreground on background) and that they pass AA.
- No code changes — this is a spec-only task.

## Notes

- This makes the `spec/style-guide.md` references in `/ux-review` and
  `spec/audit.md` valid again.
- Rename candidate to record: the CSS token `--coral-light` is now a gold tint —
  consider renaming to `--accent-light` when convenient.
