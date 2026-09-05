# Contributing

For people on the QQuEST tech team. If you're an AI agent, read `AGENTS.md` instead.

Read this once before your first commit. It takes five minutes and will save you a rejected pull request.

---

## 1. What this project is

The public website for Qiskit Fall Fest 2026, on 3 November at MIT-ADT Pune. It will be linked from IBM's official Fall Fest listing page alongside ~15 other community sites worldwide.

That last part matters more than it sounds. Anyone who clicks through from IBM sees your work. One community in this year's cohort submitted a `localhost` URL to that listing and it is permanently broken for everyone. We are not doing that.

---

## 2. Set up

```bash
git clone https://github.com/qquestclub/qff-2026-site.git
cd qff-2026-site
npm install
npm run dev
```

You do **not** need Cloudflare access, database credentials, or any secret to work on sections 01–07 and 09–12. Only the registration path (section 08) touches the backend, and that has one owner.

If something in setup doesn't work, say so in the team channel rather than working around it — if it broke for you it will break for the next person.

---

## 3. Who owns what

Sections are owned, not shared. This is the main thing that stops five people producing five different-looking pages.

| Area | Owner |
|---|---|
| `lib/tokens.ts`, `components/ui/`, `app/layout.tsx` | **Pushkar only** |
| Sections 01, 02, 05, 06 — hero, what this is, sessions, speakers | Frontend 1 |
| Sections 03, 04 — decade timeline, myths | Frontend 2 |
| Sections 07, 09, 10, 11, 12 — schedule, checklist, FAQ, venue, footer | Frontend 3 |
| Section 08 + Worker + D1 + Sheets sync | Backend owner |
| All content in `content/` | Written by section owner, **approved by Pushkar** |

**If you need a new shared component** — a new button variant, a new card shape — don't add it to `components/ui/` yourself. Ask Pushkar. It takes him two minutes and it prevents the thing where we end up with four Button implementations.

---

## 4. The rules that get a PR rejected

These aren't style preferences. Each one exists because of something specific.

**No raw hex colours.** Every colour comes from `lib/tokens.ts`. If you write `#8B3FFC` inline, that's a rejection even though it's the right purple — because the next person will write a slightly wrong one and nobody will notice.

**No fonts from a CDN.** IBM Plex is self-hosted in `public/fonts/`. Do not add `next/font/google` or a `fonts.googleapis.com` link tag. We ship zero third-party requests, deliberately.

**No analytics. At all.** Not Google Analytics, not Plausible, not Vercel Insights, not "privacy-friendly" anything. Yes, this means we won't know our visitor count. That's a decision, not an oversight — see `spec/decisions.md` D-007.

**Don't touch the brand assets.** Files in `public/brand/` come from IBM's official Fall Fest repo. Don't recolour them, don't run them through an SVG optimiser that rewrites paths, don't crop them. Compose *around* them.

**No marketing adjectives in copy.** `revolutionary`, `powerful`, `cutting-edge`, `seamless`, `exponentially faster` — all banned, and the linter will fail your build. The site's whole argument is that quantum is *specific*. A page that says "revolutionary" undercuts itself in front of an audience that includes an IBM speaker.

**Every factual claim needs a number or a source.** If you're writing copy about quantum computing and you can't attach a figure or a link, don't write the sentence.

**Never commit a secret.** Not in a test file, not commented out, not "temporarily". If you commit an API key it is compromised permanently — deleting the commit does not fix it, the key has to be rotated. If you need a credential, ask.

---

## 5. How to make a change

One section, one branch, one pull request.

```bash
git checkout -b m1-ui-04-schedule       # branch name = the task ID
# do the work
npm run lint && npm run build           # both must pass
git commit -m "feat(schedule): M1-UI-04 build schedule section"
git push -u origin m1-ui-04-schedule
```

Then open a PR and request Pushkar as reviewer.

**Before you request review, check:**

- [ ] `npm run lint` passes
- [ ] `npm run build` is clean — no new warnings
- [ ] Looks right at **360px wide**, not just on your laptop
- [ ] You can reach every interactive element with Tab, and see where the focus is
- [ ] No raw hex, no banned adjectives, no placeholder text left in
- [ ] You ticked your task's checkbox in `spec/tasks.md`

**Don't refactor files you weren't assigned.** If you spot something wrong in someone else's section, say so in the PR comments or the team channel. Fixing it yourself creates merge conflicts and hides the problem from its owner.

---

## 6. Working with AI agents

Most of us will use Claude, Cursor, Copilot or similar. That's expected and fine. Two rules:

**Point the agent at the spec first.** Paste this before asking for code:

```
Read AGENTS.md, then CONTRACT.md, then spec/architecture.md and spec/tasks.md.
Tell me which task you propose working on. Do not write code yet.
```

**You are responsible for what the agent writes.** "The AI did it" is not a defence in code review. Agents in this project have already tried to invent a colour that isn't in the palette, and to state a fact about Fall Fest that wasn't true. Both were caught in review. Read the diff before you push.

---

## 7. Where things are

| You want to know | Read |
|---|---|
| What we're building and for whom | `spec/product.md` |
| What must never break | `CONTRACT.md` |
| Colours, fonts, exact values | `CONTRACT.md`, "Exact values" |
| Stack, folder structure, what's supported | `spec/architecture.md` |
| What milestone we're in | `spec/plan.md` |
| Your specific task | `spec/tasks.md` |
| Why something is the way it is | `spec/decisions.md` |
| What happened last session | `AGENT_LOG.md` |
| Agreed layout and copy | `docs/mockups/` |

**The mockup in `docs/mockups/` is a reference, not code.** It opens in a browser and shows the agreed design. It is not React, it won't compile, and it loads fonts from a CDN. Look at it, build from `lib/tokens.ts`. Don't copy-paste out of it.

---

## 8. Asking questions

Ask early. The most expensive thing on a nine-week timeline is someone quietly building the wrong thing for four days.

If the spec doesn't answer your question, that's a gap in the spec — say so and it gets added, so the next person doesn't hit the same wall.
