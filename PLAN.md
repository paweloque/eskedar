# Eskedar Coffee — Project Plan & Learning Guide

Two goals at the same time:

1. **Ship a real website** for a real client — *Eskedar Ethiopian Coffee* (D&E Spring AG, Bern). The design idea is in `input/IMG_6235.PNG`.
2. **Teach her a durable skill** she can sell to other people: not "coding," but *directing* an AI to build and ship a website.

This file is the founding document for both. It explains her role, how she should write prompts, and a step-by-step plan from an empty folder to a live site.

---

## 1. What she's really learning

The job is **directing**, not typing code. A director does three things, over and over:

1. **Says what she wants** — clearly enough that a builder can act on it.
2. **Judges the result** — is it good? does it match what the client wanted?
3. **Delivers and hands off** — ships it, and leaves the client able to use it.

Claude Code writes the code. Her value is intent, judgment, and delivery. Those transfer to *any* website, any client — which is the whole point.

---

## 2. The three roles

| Who | Role | Owns |
| --- | --- | --- |
| **She** (the director) | Product owner + junior developer | What the site says and does, whether it's good enough, the client relationship, the deadline |
| **Claude Code** (the builder) | Implementer | Writing templates/CSS/content, running tests, proposing options, explaining trade-offs |
| **You** (the coach) | Mentor + safety net | Unblocking her, anything involving money/legal/domain/hosting, the final quality bar, knowing when to step in |

She's 13–15 and drives Claude Code herself. Suggested arc: **pair** with her for the first 2–3 sessions (you watch, she types), then **fade** to reviewing her work and handling the grown-up steps (paying for a domain, talking money with the client).

---

## 3. The core loop

Everything is one loop, repeated. Teach her this as five words:

> **Say it → Build it → Look at it → Fix it → Ship it**

| Step | What happens | How |
| --- | --- | --- |
| **Say it** | She describes what she wants | A clear prompt to Claude (see §4) |
| **Build it** | Claude makes the change | Claude edits files; for bigger changes, `/implement-task` |
| **Look at it** | She sees the real result | `npm run serve` → open `localhost:8080`, **look on her phone too** |
| **Fix it** | She judges and refines | "The headline is too small," "use the real photo," "make it work on mobile" |
| **Ship it** | The change goes live | Deploy to Vercel (§7, Phase 5) |

The loop is small on purpose. **One change at a time.** That way, when something looks wrong, it's obvious what caused it.

---

## 4. How to write a prompt (the recipe)

Before pressing enter, answer four questions in the prompt:

1. **Who is it for?** (the visitor — a coffee roaster looking for beans)
2. **What do I want?** (the actual change)
3. **What does "done" look like?** (how she'll know it worked)
4. **Show me.** (always end by asking to see or run it)

**Weak prompt:**
> "make the coffee page nicer"

**Strong prompt:**
> "On the Our Coffees page, show the three origins (Yirgaccheffe, Sidamo, Guji) as cards in a row, like the mockup in input/IMG_6235.PNG. Each card has a photo, the name, and the tasting notes. It should stack into one column on a phone. Then run the dev server so I can look."

Five rules of thumb to drill in:

- **One thing at a time.** Don't ask for five changes in one prompt.
- **Describe the goal, not the code.** Say *what it should do/look like*; let Claude pick how.
- **Point at the mockup.** "Like `input/IMG_6235.PNG`" is worth a paragraph of description.
- **Paste the whole error.** If something breaks, copy the red text back to Claude — don't retype it.
- **Always end with "show me."** A change she hasn't looked at isn't done.

> A standalone one-page cheat-sheet of this section (for next to her keyboard) can be generated on request.

---

## 5. The method, borrowed from the template (kept light)

The template was built by professionals using a strict process: **spec → task → implement** (write down what you want → make a to-do card → build exactly that). It's powerful but too heavy for a teenager as-is. Her lightweight version:

- **Wish** = a sentence or two about what she wants (a tiny "spec").
- **Card** = a to-do item, one per change (a tiny "task").
- **Build** = let Claude implement it, then she checks it.

She can use the template's real commands whenever they help:

| Command | What it does |
| --- | --- |
| `/implement-task` | Builds a written-down task end to end, with its own checks |
| `/test` | Runs the safety-net tests and fixes failures |
| `/ux-review` | Checks every page for mobile, contrast, accessibility — **reports only** |
| `/seo-review` | Checks pages so Google can find the site — reports only |
| `/audit <topic>` | Bigger project-wide check on a topic |

**Why the discipline matters (the real lesson):** one change at a time means she can always see what changed; the tests and version history mean she **can't break it badly** — there's always an undo. That safety is what lets her experiment fearlessly.

---

## 6. What's reusable vs what she builds new

This is the most important idea, and the easiest to get wrong.

**Reusable — do NOT rebuild (the template gives it for free):**

- The engine: Eleventy + Nunjucks templates + plain CSS + content-in-YAML
- The safety net: the test suite, `npm run serve`, `npm run build`
- The deploy: Vercel
- The method and commands: `/implement-task`, `/test`, `/ux-review`, `/seo-review`
- Solved hard parts: an image pipeline for photo-heavy sites, and backend-free contact forms

**New for Eskedar — she *directs* Claude to build these:** the template is shaped like a *conference* (speakers, schedule, sponsors). Eskedar is a *coffee importer*. So the structure has to be reshaped:

| Template has… | Eskedar needs instead… |
| --- | --- |
| Speakers | **Coffee origins** (Yirgaccheffe, Sidamo, Guji) |
| Schedule | **"From tree to roaster" process** (growing → harvesting → processing → export) |
| Sponsors / board | **Gallery**, **For Roasters** page |
| Ticket CTAs | **"Request a sample" / "Send an inquiry"** forms |
| One language | **EN + German** (Switzerland) — can start EN-only |

**Honest note for her:** for a brand-new site, there's no content YAML to edit until the templates exist. "Just edit the text in YAML, no code" is how she'll **maintain** the site later, and how the **client** updates it after handoff — not how she builds it from scratch.

---

## 7. The Eskedar roadmap (empty folder → live site)

Each phase: what she does, what to ask Claude, and "done when."

### Phase 0 — Set up the workshop *(pair with dad)*
Copy the template into this folder, strip out the conference-specific parts, and get a blank Eskedar shell running.
- **Ask Claude:** "Scaffold this folder from the PMF template, remove the speakers/schedule/sponsors/board parts, rename it to Eskedar, and get `npm run serve` working with an empty homepage." (Also fix the stale `python generate.py` references in the template's instructions — it's actually `npm run build`.)
- **Done when:** `npm run serve` opens a plain Eskedar page with no errors.

### Phase 1 — Client brief *(her real-client skill)*
She interviews the coffee lady and writes **one page**: who the visitors are, which coffees, what photos already exist, what should happen when someone clicks "Request a sample," which languages, and what web address she wants.
- **Done when:** a `brief.md` exists that someone else could read and understand the job.

### Phase 2 — Reshape the skeleton
Build the page structure and navigation from the mockup: Home, About, Our Coffees, Quality, For Roasters, Contact. Set up the *content model* for coffee (an origin = name + photo + tasting notes; a process step = number + title + photo).
- **Ask Claude:** one task per page/section, pointing at `input/IMG_6235.PNG`.
- **Done when:** every page exists and the nav works, even with placeholder text.

### Phase 3 — Fill real content
Replace placeholders with the client's real words, real photos (through the image pipeline), and the real Swiss contact details.
- **Done when:** the site shows true information, no "lorem ipsum," images load fast.

### Phase 4 — Make it good
Run `/ux-review` and `/seo-review`; fix what they find. Check it on a phone. Polish the dark green/gold look to match the mockup. Wire the forms (start with the simplest that works — email or a free form service; Claude will lay out the options). Add German if time allows.
- **Done when:** reviews come back clean, it looks right on her phone, forms actually send.

### Phase 5 — Ship *(dad on domain/billing)*
Deploy to Vercel and connect the real address (e.g. `eskedarcoffee.ch`).
- **Done when:** a stranger can visit the live URL on their phone and request a sample.

### Phase 6 — Handoff
Write the client a one-page "how to update your site" guide (the template has one to copy from), and show her how to ask for changes later.
- **Done when:** the client could change a price or a photo without calling.

---

## 8. Quality bar — how she knows it's good

Four green lights, in plain language:

- **Phone test:** it looks right on her own phone, not just the laptop.
- **Robot reviewers:** `/ux-review` and `/seo-review` come back clean. (These quietly teach her the vocabulary of "good": contrast, alt text, heading order, mobile.)
- **Tests green:** `npm test` passes — the safety net is intact.
- **Client says yes:** the coffee lady is happy. This one outranks the others.

---

## 9. Running the sessions (for you)

- **Length:** 60–90 minutes. Stop while it's still fun.
- **Cadence:** one phase can be several sessions. Don't rush; shipping beats speed.
- **Pair, then fade:** sit with her for Phase 0–2, then move to reviewing.
- **Your coaching questions** (instead of giving answers): "Who's going to read this page?" · "How will you know it worked?" · "Did you look at it on your phone?" · "What's the one next change?"
- **When you take the keyboard:** money, the domain, anything legal (privacy page, company details), and anything that can't be undone. Everything else, let her drive — the tests and version history make mistakes cheap.

---

## 10. After Eskedar — the path to "projects for other people"

1. **Repeat the loop** for client #2 — it's the same five steps on different content.
2. **Build her own site** as a portfolio: "websites I've made."
3. **Templatize her process** — her own brief.md template and prompt cheat-sheet, reused each time.
4. **Start charging** — once she's shipped two or three and can hand them off cleanly.

The skill compounds: every project makes the next one faster.

---

## Next step

When you're ready, I can do **Phase 0** for you: scaffold this folder from the PMF template, strip the conference parts, get the dev server running on an empty Eskedar shell, and drop in a `brief.md` template plus her keyboard cheat-sheet. Just say the word.