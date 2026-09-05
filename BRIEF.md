# BRIEF — QFF26 Site (QQuEST × MIT-ADT)

*One page. Read in 3 minutes. Rewritten whenever state changes.*

**What this is:** the public site for Qiskit Fall Fest 2026 at MIT-ADT Pune on 3 November 2026 — lets a student anywhere in Pune decide whether the fest is for them and register, and leaves behind an honest reference on what quantum computing can and cannot do.

**Live at:** `https://qff-2026-mitadt.pages.dev` (not yet deployed) · **Repo:** https://github.com/qquestclub/qff-2026-site
**Lead:** Pushkar Kumar — final say on everything, including every content story.

---

## Where things stand

**Milestone:** M0 — Live and submittable
**Exit criteria:** the production URL renders on a phone, makes zero third-party requests, and is what gets submitted to IBM
**Progress:** 0 of 16 tasks

**Last done:** visual mockup agreed and exported (5 September 2026); specs updated to match
**Next:** `M0-SETUP-01` — init the repo, add `.gitignore`, commit the spec system

**Deadline reality:** 60 days to the event. M0 in 3–5 days, M1 by 25 September, M2 by 30 September, M3 gated on sponsorship confirmed by 10 October.

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
