# Prompting Cheat-Sheet
### Building websites with Claude Code

Keep this next to your keyboard. (Full version: `PLAN.md`.)

---

## The Loop

> ### Say it → Build it → Look at it → Fix it → Ship it

1. **Say it** — tell Claude what you want (one thing at a time).
2. **Build it** — Claude makes the change. Big change? Use `/implement-task`.
3. **Look at it** — run `npm run serve`, open http://localhost:8080 — **and check it on your phone.**
4. **Fix it** — say what's still wrong. Repeat 1–4 until you're happy.
5. **Ship it** — when it's good, deploy it (and commit your work).

---

## Before you press Enter — the 4 questions

1. **Who is it for?** (the visitor — e.g. a coffee roaster looking for beans)
2. **What do I want?** (the actual change)
3. **What does "done" look like?** (how you'll know it worked)
4. **Show me.** (always end by asking to see or run it)

---

## Weak vs strong prompt

❌ *"make the coffee page nicer"*

✅ *"On the Our Coffees page, show the three origins (Yirgacheffe, Sidamo, Guji)
as cards in a row, like the mockup in `input/IMG_6235.PNG`. Each card has a photo,
the name, and the tasting notes. It should stack into one column on a phone.
Then run the dev server so I can look."*

---

## 5 rules of thumb

1. **One thing at a time.** Don't ask for five changes in one prompt.
2. **Describe the goal, not the code.** Say what it should look like; let Claude pick how.
3. **Point at the mockup.** "Like `input/IMG_6235.PNG`" beats a paragraph of words.
4. **Paste the whole error.** If something breaks, copy the red text back to Claude.
5. **Always end with "show me."** A change you haven't looked at isn't done.

---

## Handy commands

| Type this | What it does |
| --- | --- |
| `npm run serve` | See the site live at http://localhost:8080 |
| `npm run build` | Build the final site |
| `/implement-task TASK-001` | Build a written-down task, start to finish |
| `/test` | Run the safety-net tests |
| `/ux-review` | Check it's easy to use on phones + readable |
| `/seo-review` | Check Google can find the site |

---

## When you're stuck

- Don't retype the same thing. Change one detail and try again.
- Ask Claude to **explain what it did** in simple words.
- Stuck after a few tries? Save your work and ask Dad.
- You can't break it badly — the tests and git history are your undo button.
