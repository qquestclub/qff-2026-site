# AGENT_LOG

Append-only. **Newest entry at the top.** Every entry names the milestone, the tasks touched, what did not get finished, what was noticed but not fixed, and a specific next action.

---

## 2026-09-05 — Mockup agreed, specs reconciled (session 3)

**Milestone:** pre-M0
**Tasks:** none — still no code
**Model/tool:** Claude (chat) + Claude Design

**Done:**
- Full 12-section visual mockup built and iterated in Claude Design; mobile 360px and desktop 1440px
- Myths section (04) built with a real two-stage interaction: "MEASURE →" scrambles bit-strings, then snaps to the correction. Better than the accordion originally specced
- Registration form settled: name, email, phone, college, year of study, session choice, laptop confirmation, required 18+ checkbox, optional mailing opt-in. Grouped YOUR DETAILS / ATTENDING / CONSENT with visible labels
- IBM Quantum Open Plan limits verified — 10 min per 28-day window, +180 min promo for active accounts, ibm_kingston (156q) available. `architecture.md` §8 no longer provisional
- Decade and myths content sourced against real figures; `#D02670` palette drift caught and fixed; "IBM's series of student-run events" copy error caught and fixed
- D-010 (partial attendance allowed) and D-011 (mockup is reference, not code) recorded
- `README.md` and `CONTRIBUTING.md` written for human contributors
- D1 schema updated to the final field set; `product.md` metric #3 rewritten since the IBM-account field was dropped from the form

**Not finished:**
- Repo not created, nothing deployed, no code written
- Speaker, venue, and coordinator email still placeholders

**Noticed but did not fix:**
- Speaker subtitle and bio in the mockup still read "Title — placeholder" and "One-line bio placeholder". Cosmetic; fix when the real speaker is confirmed
- Design tools drifted from the pinned palette once and invented a factual claim once, both caught only by review. Treat AI-generated content as unreviewed by default
- `PROD_URL` assumes `qff-2026-mitadt.pages.dev` is free — pages.dev subdomains are globally unique, confirm at project creation and update `CONTRACT.md` if taken

**Next action:** `M0-SETUP-01` — create the repo under github.com/qquestclub, add `.gitignore`, commit the spec system.

---

## 2026-09-04 — Spec system written (session 2)

**Milestone:** pre-M0
**Tasks:** none — no code written yet
**Model/tool:** Claude, chat

**Done:**
- Intake completed across product, constraints, correctness core, stack, data/privacy, delivery and risk
- Benchmarked the 2026 cohort: ~15 community sites from IBM's submission table. Median is a single scrolling page. Two are strong — QTC × USTHB Algiers (creative concept, a section built from the 2026 theme, own `/register` route currently stubbed) and DBATU Lonere (same state, 26–28 Oct, countdown, QR, attendee PDF, five-question FAQ, Airtable registration, DBATU-students-only)
- Design tokens extracted directly from the official deliverables rather than guessed: palette is IBM Carbon (`#31135E`, `#FF7EB6`, `#8B3FFC`, `#0F62FE`, …), typography is IBM Plex Sans + Plex Mono, confirmed in the official PPT template
- Wrote `CONTRACT.md` (10 invariants), `AGENTS.md`, `BRIEF.md`, and all seven `spec/` documents
- Nine decisions recorded, D-001 to D-009

**Not finished:**
- Repo not created; nothing deployed
- `content/` modules not written — this is M1 and it is the differentiator
- Brand asset checksums not yet recorded (blocked on `M0-SETUP-06`)

**Noticed but not fixed:**
- Team available hours per week never established — every estimate in `plan.md` assumes ~10 combined person-hours and should be re-checked after M0
- Venue room, speaker names beyond the IBM speaker, and whether virtual attendance is offered are all unknown. Marked provisional in `architecture.md` §9. Do not invent placeholders — this site is linked from IBM
- IBM Quantum Open Plan QPU limits not verified against current documentation. This is the binding constraint on Part 2 and on what the site may claim about hardware access
- One community in the cohort has submitted `http://127.0.0.1:4444/...` to IBM and another a Vercel branch-preview URL. Both permanently broken. This is why INV-7 exists

**Next action:** `M0-SETUP-01` — init the repo, add `.gitignore` covering `.env*`, commit the spec system as `chore: spec system and project skeleton`.

---

## Entry template

```
## YYYY-MM-DD — <one-line summary>

**Milestone:** M<n>
**Tasks:** <IDs touched>
**Model/tool:** <what did the work>

**Done:**
- <what actually landed, with evidence>

**Not finished:**
- <what was started and left>

**Noticed but not fixed:**
- <anything spotted in passing — this field is the one that pays off>

**Next action:** <specific task ID>
```
