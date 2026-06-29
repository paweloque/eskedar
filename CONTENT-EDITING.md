# Content Editing Guide

This site is built from YAML files in `content/`. You edit text in YAML, the generator turns it into HTML — no coding needed.

> **This guide is a placeholder.** A version tailored to Eskedar's real pages is written during **handoff (Phase 6)**, once those pages exist (see `PLAN.md`). The YAML basics below already apply.

## How it works

```
You edit YAML files in content/  -->  npm run build  -->  dist/ (the live site)
```

## Previewing your changes

```bash
npm run serve    # Local server at http://localhost:8080 with live reload
npm run build    # One-off build to dist/
```

If you get a YAML error, the terminal shows the file and line number.

## YAML syntax basics

YAML is whitespace-sensitive. The essentials:

**Simple values**
```yaml
headline: "Premium Arabica green coffee"
```

**Multi-line text** — the `|` block preserves line breaks and supports basic Markdown:
```yaml
story: |
  Eskedar connects the rich coffee heritage of Ethiopia
  with roasters across **Switzerland and Europe**.
```

**Lists**
```yaml
promises:
  - "100% Ethiopian"
  - "Direct trade"
  - "Full traceability"
```

**Lists of objects**
```yaml
coffees:
  - name: "Yirgacheffe"
    notes: "Floral, jasmine, citrus, tea-like body"
  - name: "Sidamo"
    notes: "Sweet fruit, chocolate, medium body"
```

## Watch out for

- **Colons inside text need quotes:** `title: "Coffee: from farm to roaster"`.
- **Indent with spaces, not tabs.**
- **Image paths are relative to the project root:** `assets/images/coffees/yirgacheffe.jpg` (no leading slash).