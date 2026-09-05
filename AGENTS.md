# AGENTS.md — QFF26 Site (QQuEST × MIT-ADT)

**Read this completely before touching any code.**

This is the public event site for Qiskit Fall Fest 2026, hosted by QQuEST at MIT Art, Design and Technology University, Pune, on 3 November 2026. It will be linked from IBM's official Fall Fest listing page.

---

## 1. Read order

1. `AGENTS.md` — this file
2. `CONTRACT.md` — what must never break
3. `spec/architecture.md` — stack, structure, capability register
4. `spec/plan.md` — which milestone is active
5. `spec/tasks.md` — the specific task
6. `AGENT_LOG.md` — top 3 entries, for current state

`docs/mockups/` holds the agreed visual reference — layout, copy, interaction. It is **reference only**: it uses another tool's template syntax, does not compile, and loads fonts from a CDN. Never import, compile or copy code out of it (D-011).

Human contributors read `CONTRIBUTING.md`, not this file.

Read `spec/evals.md` before claiming anything works. Read `spec/smoke.md` before any deploy. Read `spec/decisions.md` before proposing a stack or architecture change — it has probably already been rejected, with reasons.

**If a task conflicts with `CONTRACT.md`, the contract wins.** Stop and flag it. Do not silently resolve.

---

## 2. Hard invariants

Never break these without explicit approval from Pushkar Kumar. Full statements with detection methods are in `CONTRACT.md`; these are the summaries you must hold in working memory.

### INV-1 — No registration is ever silently lost
A submission lands in D1 or the user sees an explicit failure with a fallback email address. Never an optimistic success state.

### INV-2 — One human, one row
Dedupe on normalised email, enforced by a `UNIQUE` constraint in D1, not by application code.

### INV-3 — Personal data never leaves the trusted path
Browser → Worker → D1 → Sheets mirror. Nowhere else. Not in logs, not in git, not in error strings, not in the client bundle.

### INV-4 — Web registration is 18+ only
No DOB field, no age field, no guardian field, no minor code path. Under-18s are handled offline by a coordinator.

### INV-5 — Zero third-party tracking
No analytics of any kind. Self-hosted fonts. The browser talks to our Worker and Cloudflare Turnstile, and nothing else.

### INV-6 — Zero recurring cost
Every dependency inside a permanent free tier. No credit card on the critical path.

### INV-7 — The public URL is permanent and production
`https://qff26-mitadt.pages.dev`. Never a preview or branch URL in anything external.

### INV-8 — No claim without a number or a source
Banned-adjective list is in `CONTRACT.md`. This one exists because the site's entire concept is honesty about quantum.

### INV-9 — Brand marks ship unmodified
Official assets at delivered geometry and colour. Compose around them, never alter them.

### INV-10 — Data has an expiry date
Everything deleted 2 January 2027 except explicit mailing-list opt-ins.

---

## 3. Stack — pinned

| Layer | Choice | Version |
|---|---|---|
| Language | TypeScript | 5.x, `strict: true` |
| Framework | Next.js, App Router, `output: 'export'` | 15.x |
| Styling | Tailwind CSS | 4.x |
| Hosting (site) | Cloudflare Pages | — |
| API | Cloudflare Workers | — |
| Database | Cloudflare D1 (SQLite) | — |
| Mirror | Google Sheets via service account | Sheets API v4 |
| Bot defence | Cloudflare Turnstile | — |
| Auth | **None.** No user accounts exist in this project | — |
| Analytics | **None.** Deliberately. See INV-5 | — |

Static export is load-bearing: there is no Node server at runtime. Do not write server components with runtime data fetching, route handlers, middleware, ISR, or `revalidate`. They will build and then fail silently in production. All dynamic behaviour lives in the Worker, which is a separate deployment.

Do not add a dependency without checking: is it needed, is it maintained, does it work under static export, does it cost anything on the critical path, does it phone home (INV-5)? Record every addition in `spec/decisions.md`.

---

## 4. Working rules

**One task per change.** Do not batch. Do not refactor files you were not asked to touch. Five people are working in this repo.

**Report what you changed.** Files created, files modified, exported symbols changed, spec files needing updates, and anything noticed but not fixed.

**Update the spec when reality diverges** — in the same change, not later. A spec that has drifted is worse than no spec, because the next agent trusts it.

**Do not invent.** If you need a value, a convention, a date, a speaker name, or a capability and it is not in `CONTRACT.md`, `spec/architecture.md`, or `content/`, ask. Do not choose one and proceed. Placeholder content that reaches production on a site linked from IBM is a real embarrassment, not a cosmetic one.

**Never write a real secret into a tracked file.** Not in a test fixture, not in a README example, not commented out, not "temporarily". Secrets live in Cloudflare Worker secrets (`wrangler secret put`) and reach the Worker via `env`. The Google service-account JSON in particular is never committed in any form. A key committed once is compromised permanently, and rotating it is the only fix.

**Content is a story, not a task.** Any change to user-facing copy needs its own acceptance criteria and lead review. Do not treat writing the FAQ as a task-sized afterthought — the copy *is* the product here, more than the code is.

**Prefer improving over adding.** When choosing between a new section and making an existing one actually good, improve the existing one. The cohort benchmark is twelve near-identical pages; the differentiator is depth, not feature count.

---

## 5. Definition of done

- [ ] `npm run build` passes clean, zero errors, zero new warnings
- [ ] Acceptance criteria observably met by someone who did not do the work
- [ ] Relevant test in `spec/evals.md` passes
- [ ] `spec/smoke.md` passes for the affected area
- [ ] No raw hex colour outside `lib/tokens.ts`
- [ ] No banned adjective in any content touched
- [ ] Spec updated if behaviour diverged
- [ ] `spec/tasks.md` checkbox ticked
- [ ] `AGENT_LOG.md` entry written
- [ ] Committed as `<type>(<scope>): <task-id> <summary>`

"It builds" is not done.

---

## 6. Vocabulary

Use these words with these meanings, consistently.

- **Fest** — the whole 3 November 2026 event. Not "conference", not "fest 2026".
- **Part 1** — the Quantum 101 session (1–2 h). Not "the talk", not "the intro".
- **Part 2** — the Hands-on with Qiskit session (2–3 h). Not "the workshop" in code or content, though "workshop" is acceptable in prose copy.
- **Hackathon** — the M3, sponsorship-gated component. It does not currently exist. Never write copy implying it is confirmed.
- **Registration** — signing up to attend. There is no "signup", "enrolment", or "booking" in this project.
- **Registrant** — a person who has submitted the form. Not "user" — there are no user accounts.
- **The mirror** — the Google Sheet. It is a derived copy, never the source of truth.
- **The Worker** — the Cloudflare Worker at `api.` handling registration. Singular; there is only one.
- **Brand assets** — files from the official IBM deliverables repo, under `public/brand/`. Distinct from **site assets**, which are ours.

Words to avoid: "user" → registrant. "signup" → registration. "the database" → D1 (be specific; the Sheet is not a database). "the API" → the Worker.

---

## 7. Budget for metered dependencies

None of our infrastructure quotas bind at 300 registrations — see `CONTRACT.md` Exact values.

The one real quota is **IBM Quantum Open Plan QPU time** during Part 2. It is not consumed by this codebase, but it is the constraint most likely to embarrass the event, and the site's pre-event checklist content exists to mitigate it. Verify the current Open Plan limits before publishing any claim about hardware access — do not state a figure from memory.

The Google Sheets API and Turnstile are called live by the Worker. When debugging the Worker, use a local mock (`wrangler dev --local`) and spend real API calls only to confirm a fix. Do not iterate against the live Sheet — it is the mirror your organisers are reading.
