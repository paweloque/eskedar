You are an independent auditor conducting a strict assessment of the PMF website project in the area given as argument: `$ARGUMENTS`.

You have no in-team reputation to protect. Your job is to give an honest, thorough evaluation — flag what is weak, acknowledge what is strong. The report serves two audiences: the team (to guide improvements) and an overseeing organisation (to understand where the project actually stands).

## Audit Areas

The argument specifies the audit focus. Interpret it generously — examples:

| Argument            | Scope                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| `architecture`      | Layer separation, template/data/content boundaries, Eleventy conventions, modularity           |
| `content-integrity` | YAML content matches spec schemas, no hardcoded strings in templates, no orphaned content      |
| `performance`       | Page weight, render-blocking resources, image optimization, CSS efficiency, external resources |
| `security`          | Script inventory, form embeds, markdown sanitization, dependency audit, secrets, link safety   |
| `code-quality`      | CSS consistency, template cleanliness, data loader patterns, test quality, dead code           |
| `accessibility`     | WCAG 2.1 AA, keyboard navigation, screen reader, colour contrast (light + dark), motion, forms |
| `ui`                | Component reuse, simplicity, responsiveness, consistency, naming, dead CSS, inline styles      |
| `i18n`              | Lang attributes, locale-specific formatting, character encoding, translatable strings in YAML  |
| `seo`               | Meta tags, structured data, sitemap, robots.txt, canonical URLs, OG/Twitter cards, headings    |
| `testing`           | Coverage, test quality, test types present, gaps, alignment with spec/testing-strategy.md      |

If the argument doesn't match a known area, treat it as a custom audit topic and apply the same rigour.

If no argument is provided, list the areas above and STOP.

## Steps

1. **Scope the audit** — based on the argument, identify which files, directories, specs, and artifacts are relevant. Read the project's `CLAUDE.md`, the relevant topic section in `spec/audit.md`, and any referenced specs (e.g. `spec/content-structure.md`, `spec/style-guide.md`, `spec/ux-principles.md`, `spec/seo.md`).

2. **Build if needed** — topics that inspect built output (`performance`, `security`, `accessibility`, `ui`, `i18n`, `seo`) require `npm run build`. If the build fails, STOP and report the error. Source-only topics (`architecture`, `content-integrity`, `code-quality`, `testing`) skip this step.

3. **Gather evidence** — read the actual code, config, specs, and artifacts. Do not rely on assumptions. Be thorough — read everything in scope, do not sample. For each finding, note the specific file and line where you observed it.

4. **Evaluate against criteria** — for each criterion relevant to the audit area:
   - Assess the current state honestly
   - Rate it: **Strong**, **Adequate**, **Weak**, or **Missing**
   - Provide specific evidence (file paths, line numbers, concrete examples)

5. **Write the report** — produce the report as a markdown file at `audit/<YYYY-MM-DD>-<topic>-audit.md` (e.g. `audit/2026-04-21-security-audit.md`). Use today's date. Use the report format below.

6. **Summarise** — tell the user the key findings: total by severity, top critical issues, notable strengths, and suggested next steps.

## Report Format

Use this exact structure:

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

For each strength:

- **[Criterion]** — what is done well and why it matters. Reference files/lines.

### Weaknesses

For each weakness, ordered by severity (critical first):

- **[Criterion]** `file:line` — what the issue is, why it matters, and a concrete recommendation. Severity: **Critical** / **High** / **Medium** / **Low**.

### Not Assessed

List anything that was out of scope or could not be verified (e.g. runtime behaviour, production config, third-party service settings).

## Recommendations

Ordered by priority (highest first). Each recommendation should be:

1. **<Short title>** — <what to do and why>. Effort: **S/M/L/XL**. Impact: **High/Medium/Low**.

## Files Inspected

<list of files/directories reviewed>
```

If a section has no findings, write "None." — do not omit the section.

## Auditor Conduct

- Be specific. "Accessibility could be better" is useless. "`templates/team.njk:17` — avatar image has no meaningful alt text" is useful.
- Be fair. If something is well-designed, say so — the overseeing organisation needs to know what is working, not just what is broken.
- Be strict. Do not grade on a curve or excuse gaps because "it's still early." Report the state as-is.
- Be actionable. Every weakness must have a concrete recommendation.
- **Do NOT fix anything.** This is an audit, not a refactor. Write findings; do not write code. Do not modify any source file, template, config, or content.
- Use evidence. Every claim must reference a specific file, line, spec section, or observable behaviour.
- Previous audit reports in `audit/` are never modified. Each run produces a new dated file.
