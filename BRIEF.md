# BRIEF — QFF26 Site (QQuEST × MIT-ADT)

*One page. Read in 3 minutes. Rewritten whenever state changes.*

**What this is:** the public site for Qiskit Fall Fest 2026 at MIT-ADT Pune on 3 November 2026 — lets a student anywhere in Pune decide whether the fest is for them and register, and leaves behind an honest reference on what quantum computing can and cannot do.

**Live at:** `https://qff-2026-site.vercel.app` · **Repo:** https://github.com/qquestclub/qff-2026-site
**Lead:** Pushkar Kumar — final say on everything, including every content story.

---

## Where things stand

**Milestone:** M1 complete / M2 superseded by D-014 / M3 closed
**Exit criteria:** every section renders correctly, every claim is sourced, zero placeholder text reachable in production, and the Register CTA points to the official Google Form.

The site is live at `https://qff-2026-site.vercel.app`, on **Vercel** (D-013). All core sections (01–10: Hero, About, Decade, Myths, Sessions, Speakers, Schedule, FAQ, Checklist, and Venue) are built and live. Confirmed IBM speaker Surya Vamsi Miriyala is featured with photo and bio.

Per **D-014**, registration intake has officially moved to a standing Google Form (`https://docs.google.com/forms/d/e/1FAIpQLSe7TCtOGT9_xKIXn0eGkDWh1JM-f67NZ2BZOFaYsLSHYcz6iQ/viewform`). The custom Supabase registration routes, client, keepalive workflow, and dependencies are retired. `/register` now serves as the permanent registration hub with an 18+ policy statement, under-18 offline coordinator route (`qquest.mitadtuniversity@gmail.com`), QR code (`/register-qr.png`), and primary CTA button. Hackathon (M3) is officially closed/cancelled following the 10 October 2026 sponsorship gate.

**Last done:** Confirmed IBM speaker added; D-014 adopted (registration moved to Google Form, Supabase retired, M3 cancelled); `/register` rewritten; M2 marked superseded and M3 marked closed in `spec/tasks.md`.
**Next:** Polish and final rehearsal checks ahead of the event on 3 and 4 November 2026.

**Event dates:** 3 and 4 November 2026 at MIT Art, Design and Technology University, Pune.

---

## Prompt for the next session

Copy this into any coding agent:

```
Read AGENTS.md, then CONTRACT.md, then spec/plan.md and spec/tasks.md.
Then read the top 3 entries of AGENT_LOG.md.

Tell me which milestone is active and which task you propose next.
Do not write code yet.
```

---

## Three things most likely to break

1. **The myths and decade content gets cut.** `content/myths.ts` and `content/decade.ts` are writing tasks, not coding tasks, so they slip first under deadline pressure — and they are the only reason this site differs from the other fourteen in the cohort. If M1 closes without them, M1 has not closed.
2. **A preview URL gets submitted to IBM.** One community in this cohort has already submitted a localhost address; another submitted a branch-preview URL. Both are permanently broken on IBM's page. Read INV-7 before submitting anything anywhere.
3. **The registration form breaks quietly in October and nobody notices.** Mitigated by the weekly test submission in `smoke.md` §7. A form that has been broken for three weeks is the realistic disaster on this project.

Runner-up: the Google service-account credential gets committed while someone is making the Sheets call work. It is compromised permanently at that point — rotate, do not just delete the commit.

---

## Where everything else lives

| Question | File |
|---|---|
| What must never break | `CONTRACT.md` |
| Rules for any agent, pinned stack | `AGENTS.md` |
| What we're building and for whom | `spec/product.md` |
| Structure, capability register, quotas | `spec/architecture.md` |
| Milestones and anti-goals | `spec/plan.md` |
| The task list | `spec/tasks.md` |
| How correctness is proven | `spec/evals.md` |
| Pre-ship manual checks | `spec/smoke.md` |
| Why things are the way they are | `spec/decisions.md` |
| What happened last session | `AGENT_LOG.md` |

**Design tokens** (Carbon palette, IBM Plex) are in `CONTRACT.md` under Exact values — pinned there rather than in architecture because divergence is a bug, not a preference.

**Still unknown, do not invent:** venue name and address, speaker name/title/bio, coordinator email for the under-18 route, team hours per week. See `spec/architecture.md` §9.
