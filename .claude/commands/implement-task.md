# implement-task

Implement a task from `tasks/todo/` following the full procedure below. The user provides a task ID (e.g. `TASK-017`) or file path.

---

## Phase 0 — Intake

1. Locate the task file in `tasks/todo/` matching the given ID.
2. If not found: STOP. Report that the task does not exist or is not in `todo/`.
3. Read the task file completely.
4. Check `status`: if not `ready` or `in-progress`, STOP and explain:
   - `backlog`: prerequisites may be incomplete or scope unclear — confirm with the user before continuing.
   - `blocked`: report what is blocking it.
   - `done`: task is already complete.

---

## Phase 1 — Prerequisite Gate

1. Read the `depends_on` list.
2. For each listed TASK-ID: check that a file with that ID exists in `tasks/done/`.
3. If any prerequisite is missing: STOP. List which tasks are not yet done. Do not proceed until they are complete.

---

## Phase 2 — Comprehension

Read before touching anything.

1. Read the task's **Goal** and **Acceptance Criteria** carefully.
2. Read every file listed under **Relevant Specs** in full.
3. Read the existing code, templates, or content in the area being changed — understand the current state before proposing any change.
4. If anything in the spec or task is ambiguous, contradictory, or missing: **ASK the user** before continuing. Do not guess.
5. Assess scope: if the task seems too large for a single focused implementation, flag it and suggest how to split it. Do not start an oversized task.

---

## Phase 3 — Implementation

1. Make only the changes described by the task. Nothing more.
2. No opportunistic refactoring, no extra features, no cleanup of nearby code.
3. If you notice something broken outside the task scope: note it. Do NOT fix it here — it belongs in its own task.
4. Update the task frontmatter `status: in-progress` at the start.

---

## Phase 4 — Acceptance Criteria Check

Go through each acceptance criterion one by one. For each:

- State explicitly whether it is met.
- If not met: fix it before continuing to Phase 5.

Do not proceed until all criteria are confirmed.

---

## Phase 5 — Type-Specific Review

Apply the reviews that match the task's `type`:

| Type       | Schema check | Code review | UX review | Generator run | Full regression |
| ---------- | :----------: | :---------: | :-------: | :-----------: | :-------------: |
| `content`  |      ✓       |      —      |     —     |     spot      |        —        |
| `template` |      —       |      ✓      |     ✓     |     spot      |        —        |
| `style`    |      —       |      ✓      |     ✓     |     spot      |        —        |
| `config`   |      —       |      ✓      |     —     |     full      |        ✓        |
| `spec`     |      —       |      —      |     —     |       —       |        —        |
| `infra`    |      —       |      ✓      |     —     |     full      |        ✓        |

### Schema check (`content`)

- Validate the YAML against the content schema spec (once it exists for Eskedar).
- Confirm every referenced image path exists under `content/assets/`.

### Code review (`template`, `style`, `generator`, `infra`)

- Correctness: does the logic match what the spec describes?
- Security: no XSS, injection, or OWASP top-10 issues introduced.
- No dead code or unused variables/artifacts left behind.

### UX review (`template`, `style`)

- Follows `spec/ux-principles.md`: mobile-first, semantic HTML, keyboard navigable.
- Uses CSS custom properties correctly, no hardcoded magic values (per the project style guide once it exists).
- WCAG AA: contrast ≥ 4.5:1 for body text, meaningful alt text, ARIA only where native semantics are insufficient.
- Visually verified at mobile (≤480px), tablet (768px), and desktop (1024px+) breakpoints.

### Generator run (`content`, `template`, `style`, `generator`, `infra`)

- **Spot**: run `npm run build`; inspect only the pages affected by this task. Must exit 0 with no warnings.
- **Full**: run `npm run build`; confirm all pages in `dist/` are correct. Verify that pages unrelated to this task are unchanged.

### Full regression (`generator`, `infra`)

- Confirm that the complete `dist/` output matches expectations across all page types.
- Check that no previously working pages are broken or produce unexpected output.

---

## Phase 6 — Documentation & Consistency

This phase always runs for every task type. Its purpose: leave the project more coherent than you found it.

**Spec currency**

- Does the relevant spec file still accurately describe what was just implemented?
- If the implementation deviated from the spec in any way, update the spec to match reality.

**Cross-spec consistency**

- Do other spec files reference anything that this task changed (e.g. a field name, a file path, a component)?
- Check for stale references, outdated examples, or contradictions across `spec/` and correct them.

**Content/template alignment**

- Are the YAML content schemas (once specced for Eskedar) still consistent with what the templates expect?
- Flag any field that a template uses but the schema doesn't define, or vice versa.

**Task backlog hygiene**

- Are there open tasks in `tasks/todo/` that are now invalid, superseded, or need their `depends_on` updated because of this work?
- Note any such tasks in the writeup; do not silently leave them stale.

**Spec gap detection**

- Did implementation reveal anything the spec doesn't cover or gets wrong?
- Do NOT silently fix it in code. Create a new `spec`-type task in `tasks/todo/` for each gap found.

---

## Phase 7 — Completion

1. Update the task file frontmatter: `status: done`.
2. Move the task file from `tasks/todo/` to `tasks/done/`.
3. Create `tasks/writeups/<TASK-ID>.md` using this structure:

```markdown
# TASK-XXX: <title>

## What was done

[Concise summary of the changes made]

## Key decisions

[Any non-obvious choices and the reasoning behind them]

## Spec gaps found

[Anything discovered that the spec doesn't cover — each should become a new spec-type task]

## Follow-up tasks suggested

[TASK-IDs created or recommended as a result of this work]
```

---

## Quick Checklist

- [ ] Task found in `tasks/todo/` with status `ready`
- [ ] All `depends_on` tasks confirmed in `tasks/done/`
- [ ] All relevant specs read in full
- [ ] Existing code/content in the affected area read
- [ ] No ambiguities — or ambiguities resolved with user before starting
- [ ] Implementation stays within task scope
- [ ] All acceptance criteria confirmed met
- [ ] Type-specific reviews completed (see table above)
- [ ] Generator run passed (if applicable)
- [ ] Spec files updated to reflect implementation
- [ ] Cross-spec consistency checked
- [ ] Backlog hygiene done
- [ ] Spec gaps turned into new tasks
- [ ] Task moved to `tasks/done/`
- [ ] Writeup created in `tasks/writeups/`
