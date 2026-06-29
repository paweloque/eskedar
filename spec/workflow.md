# Change Workflow

## The Rule

**We never change anything directly. Specification first, then tasks, then changes last.**

This applies to every change: new content, visual updates, new pages, generator logic, and this spec itself.

## Three Steps

### 1. Spec

Update or create the relevant spec file to describe the intended change. The spec should answer:

- What is changing and why?
- What does the result look like?
- What are the constraints or acceptance criteria?

The spec is the source of truth. If it is ambiguous, clarify it before moving on.

### 2. Tasks

Break the spec change into discrete implementation tasks. Each task should be:

- Small enough to review in one go.
- Independently verifiable (has a clear done state).
- Ordered if dependencies exist.

See **Task File Format** below for the required structure.

### 3. Changes

Implement one task at a time using the `implement-task` skill. Do not implement anything not covered by an agreed spec and task.

## Task File Format

### Folder Structure

```
tasks/
  todo/        # pending tasks (backlog or ready to start)
  done/        # completed tasks, moved here after implementation
  writeups/    # post-implementation notes, one file per completed task
```

### Frontmatter

```yaml
---
id: TASK-001 # sequential, project-wide unique, zero-padded to 3 digits
title: Short title # imperative verb phrase, ≤60 chars
type: content | template | config | spec | style | infra
status: backlog | ready | in-progress | done | blocked
priority: low | medium | high | critical
depends_on: [] # list of TASK-IDs that must be in done/ before this starts
---
```

**Types:**

- `content` — YAML content files (speakers, schedule, sponsors, etc.)
- `template` — HTML templates in `/templates/`
- `style` — CSS, design tokens, visual changes
- `config` — Eleventy config files, build tooling, project setup
- `spec` — spec file updates only
- `infra` — deployment, CI, tooling outside the generator

**Statuses:**

- `backlog` — not yet ready to start (prerequisites incomplete or scope unclear)
- `ready` — prerequisites met, can be picked up
- `in-progress` — actively being worked on
- `blocked` — waiting on something external; add a note explaining what
- `done` — complete; file has been moved to `tasks/done/`

### Body Sections

```markdown
## Goal

What this task achieves and why.

## Relevant Specs

- `spec/content-structure.md`
- `spec/style-guide.md`

## Acceptance Criteria

- Criterion one (testable, specific)
- Criterion two

## Notes ← optional

Constraints, open questions, implementation hints.
```

### Naming Convention

`<ID>-<kebab-title>.md` — e.g. `TASK-017-speaker-page-template.md`

### Rules

- Never edit a file in `tasks/done/` — create a follow-up task instead.
- Status `ready` means all `depends_on` tasks are confirmed in `tasks/done/`.
- IDs are sequential and never reused.

## Applying the Workflow to the Spec Itself

If a spec file needs to change:

1. Create a `spec`-type task describing the change.
2. Update the spec file as the implementation of that task.
3. Create follow-up tasks for any downstream changes (templates, CSS, content).

The spec and implementation stay in sync.

## Periodic UX & Accessibility Audit

Separate from the per-task workflow, the project runs periodic UX/accessibility audits. Run `/ux-review` to build the site and produce a report in `audit/<YYYY-MM-DD>-ux-review.md`. The audit reports only — it never fixes code. Confirmed issues become tasks via the standard workflow.

See `spec/ux-audit.md` for full details: what is checked, when to run, report format.

## Quick Reference

```
Change needed
    │
    ▼
Update spec/         ← describe the change, get agreement
    │
    ▼
Create task file     ← tasks/todo/<ID>-<title>.md
    │
    ▼
implement-task       ← skill handles the full procedure
```
