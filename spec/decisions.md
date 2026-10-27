# decisions.md — Decision Log

Every non-obvious decision, why, and what was rejected. **This file exists to stop the next agent from re-opening a settled question or reverting a deliberate choice.**

The rejected list is the part that does the work. Without it, the same option gets proposed again, confidently.

---

## D-001 — Static site on Cloudflare Pages, not a server-rendered app

**Status:** decided
**Decision:** Next.js 15 with `output: 'export'`, deployed to Cloudflare Pages. No Node runtime in production.
**Rationale:** ₹0 budget is a hard constraint (INV-6), which rules out anything that needs a process running. Free-tier servers spin down and cold-start; a registration form that takes fifty seconds on the first submit of the day violates INV-1 through the hosting choice alone. A static site has no uptime to manage during exam season.
**Rejected:**
- *Render / Railway / Fly free tiers* — cold starts, and both Railway and Fly have materially reduced their free offerings. Unacceptable on the registration path.
- *PythonAnywhere free* — restricted outbound network breaks the Sheets call.
- *Vercel Hobby* — works, but its terms are non-commercial-only, and keeping the Worker in the same account as the site is simpler on Cloudflare.
- *GitHub Pages* — fine for the site, but no serverless function, so the form needs a separate host anyway.

**Revisit if:** the project ever needs authenticated pages. It does not, and M3 would not change that.

---

## D-002 — Cloudflare D1 is the system of record; Google Sheets is a derived mirror

**Status:** decided
**Decision:** Registrations write to D1 first. The Sheet is synced from D1 and is never authoritative. A mirror failure never fails a registration.
**Rationale:** The original design had Sheets as the sole store. That was weaker for two reasons: the Sheets API fails often enough to matter on a path that cannot fail, and deduplication in a spreadsheet has to be hand-rolled and is racy under concurrent submits. D1 gives `email UNIQUE`, which implements INV-2 in the database rather than in code someone has to trust. The Sheet still exists because it is the surface non-technical organisers actually work in — and because it doubles as the admin interface (see D-005).
**Rejected:**
- *Sheets as sole store* — superseded. Racy dedupe, and a single point of failure on the critical path.
- *Airtable as primary* — credible; DBATU Lonere uses it and the free tier holds 1,000 records. Rejected because it adds a third vendor for no gain once D1 is already in the Worker's account. Retained as a fallback option.
- *Postgres via Supabase* — more capability than needed, and another account to manage. Reconsider only at M3.

**Revisit if:** M3 opens and team/submission modelling makes a relational store with a real client worthwhile.

---

## D-003 — No custom domain; the `.pages.dev` production URL is what gets submitted

**Status:** decided
**Decision:** Submit `https://qff26-mitadt.pages.dev` to IBM. Do not buy or claim a domain for this event.
**Rationale:** The URL sits on IBM's listing page permanently and outlives the current organising team. The GitHub Student Pack offers a free-for-one-year domain, which becomes a dead link in 2027 — worse than no custom domain at all. A `.pages.dev` subdomain never expires and costs nothing. Cloudflare also allows attaching a custom domain later without breaking the original URL, so nothing is foreclosed.
**Rejected:**
- *Free Name.com / Namecheap student-pack domain* — expires; leaves a dead link on a permanent listing.
- *A paid domain* — violates INV-6, and nobody has committed to renewing it in 2028.
- *A university subdomain* — would be ideal, but depends on IT turnaround that cannot be guaranteed within the M0 window. Not blocking on it.

**Revisit if:** the university grants a permanent subdomain before M0 closes, or QQuEST commits to renewing a domain long-term. Attach it as an alias; do not change the submitted URL.

---

## D-004 — No backend framework; one Cloudflare Worker

**Status:** decided
**Decision:** Registration is handled by a single Cloudflare Worker, roughly 120 lines of TypeScript. No Django, no NestJS, no Express.
**Rationale:** The system has one POST endpoint, no authentication, and no user-facing queries. Django's value is its ORM, migrations, admin and auth — none of which are used here, and its admin is redundant against the Sheet (D-005). NestJS is heavier than Django for this shape of problem. Both require a running process, which D-001 already ruled out. A Worker suits a Node-based team and has no server to keep alive.
**Rejected:**
- *Django* — needs a process; brings an ORM and admin the project does not use; the ops burden falls on students in October.
- *NestJS* — all of the above plus more boilerplate for a single endpoint.
- *Express on a free host* — same cold-start problem as D-001.
- *Next.js API routes* — incompatible with `output: 'export'`. Would build and then fail in production.

**Note on team motivation:** a real reason framework choices get made is that backend contributors want substantial work. The substantial backend work here is the Worker plus the Sheets integration plus the M3 specification — not adopting a framework to have something to configure.

**Revisit if:** M3 opens *and* team submissions, file uploads and judging turn out to need more than a second Worker route. Evaluate Supabase before any framework.

---

## D-005 — No admin dashboard, ever

**Status:** decided
**Decision:** The Google Sheet mirror is the admin interface. No admin UI is built, neither alongside the public site nor as a separate application.
**Rationale:** The Sheet already provides filtering, sorting, sharing, comments, export and per-person access control, and the non-technical organisers already know how to use it. Building a UI for roughly 300 rows, on a nine-week runway, competes directly with the content work that actually differentiates the site. This was raised as an open architectural question and is closed.
**Rejected:**
- *Admin app alongside the public frontend* — couples two release cycles and inflates the bundle.
- *Separate admin frontend* — a second app to build, deploy, secure and add auth to, which reintroduces the authentication this project deliberately does not have.

**Revisit if:** M3 opens and judging genuinely cannot be run from a Sheet tab. Even then, prefer a second tab over a second application.

---

## D-006 — Web registration is 18+ only; under-18s handled offline

**Status:** decided
**Decision:** The form collects no age or date of birth and carries a single 18+ confirmation checkbox. Under-18 attendees register through a faculty/coordinator route with guardian consent on paper, and receive event-logistics email only — never the mailing list.
**Rationale:** India's DPDP Act classifies everyone under 18 as a child and requires verifiable parental consent, with Aadhaar-linked DigiLocker tokens designated as the authoritative credential. A parent's email typed into a web form does not meet that bar. The Act separately prohibits tracking and profiling of children, which no consent flow cures. Full compliance is required by 13 May 2027, so this event predates enforcement — but a naive minor path built now would need rebuilding, and a compliant one is absurd for a campus event. The offline route costs nothing at the expected volume of a handful of people.
**Rejected:**
- *Collect DOB and a parent's email* — not verifiable consent; creates a minor data path with no legal footing; and the stated intent to email these attendees ongoing is close to the monitoring the Act prohibits.
- *Ignore the question entirely* — the club holds the data either way; ignoring it is a decision made by default rather than deliberately.
- *Block under-18s from attending* — unnecessary. They can attend; they just do not register through the website.

**Revisit if:** the government notifies an educational-institution exemption or lowers the age threshold. Neither has happened.

---

## D-007 — Zero analytics and zero third-party scripts

**Status:** decided
**Decision:** No analytics of any kind, no tag manager, no pixels, no session recording, no CDN fonts, no cookie-setting embeds. Fonts self-hosted.
**Rationale:** Two reasons, both load-bearing. Minors will visit the page even though they cannot register on it, and profiling of children is prohibited outright — the simplest compliant position is to track nobody. Separately, it is the concept: a site whose argument is that it will be honest with you about quantum, which quietly ships six trackers, undermines itself. The accepted cost is that visitor numbers will be unknown, which is why `product.md` ranks attendance above page views.
**Rejected:**
- *Google Analytics* — the obvious violation.
- *Plausible / Fathom / Cloudflare Web Analytics* — "privacy-friendly" is still tracking, and the reasoning above does not distinguish between vendors.
- *Self-hosted analytics* — solves the vendor concern, not the profiling concern, and adds infrastructure.

**Revisit if:** never, for this event.

---

## D-008 — Editorial concept: precision, not debunking

**Status:** decided
**Decision:** The site's concept is quantum stated precisely, with hype corrected using numbers and sources. Expressed structurally as a myth-correction section and a 2016–2026 claimed-versus-achieved timeline; expressed as a rule in INV-8; expressed visually as noise resolving into signal.
**Rationale:** Part 1 of the fest already does this work, so the site performing it is coherent rather than decorative. It also differentiates: the other fourteen cohort sites announce an event, and none tells a visitor anything true they did not already believe. The framing must be *precision*, not *debunking* — the site is linked from IBM, uses IBM marks and hosts an IBM speaker, and a page reading as "quantum is overhyped" is an unnecessary problem. The claim is that quantum is specific, and the specifics are more interesting than the headlines.
**Rejected:**
- *A generic "demystifying quantum" tagline with no supporting content* — the most common claim in quantum outreach; differentiates nothing on its own.
- *A hype-debunking or contrarian framing* — awkward given the IBM relationship, and it invites an argument rather than teaching anything.
- *Copying the Algiers birds-and-flight approach* — good work, already taken, and not ours.

**Revisit if:** never for this event. This is the reason the site exists in the form it does.

---

## D-009 — Content lives in typed TS modules, not a CMS

**Status:** decided
**Decision:** All user-facing copy lives in one `.ts` module per section under `content/`, typed, committed to git.
**Rationale:** Copy changes constantly and five people are editing it. One module per section keeps merge conflicts small. Typing catches a missing field at build time rather than as an empty section in production. A CMS would add a service, a schema, an auth story and a failure mode, for a site whose content freezes on 3 November.
**Rejected:**
- *A headless CMS (Sanity, Contentful)* — another vendor, another free-tier limit, another thing that can be down.
- *Markdown files* — workable, but loses type safety on structured content like the myths pairs and the schedule.
- *Copy inline in components* — makes every copy edit a code review of JSX, and guarantees merge conflicts.

**Revisit if:** non-technical organisers need to edit copy directly without a pull request. At that point, prefer giving them the pull request workflow over adding a CMS.

---

## D-010 — Partial session attendance is allowed

**Status:** decided
**Decision:** Registrants choose Quantum 101 only, Hands-on only, or both. Stored as `session_choice` in D1 and surfaced as a required select on the form.
**Rationale:** Part 1 needs no background and Part 2 assumes basic Python — they genuinely serve different people, and forcing a 5.5-hour commitment on someone who only wants the intro talk costs attendance. The cost is real but small: one extra column, one extra validation branch, and catering/seating numbers now come from a breakdown rather than a single count.
**Rejected:**
- *One registration, both sessions mandatory* — simpler schema and a single headcount, but turns away people who can only make half a day.
- *No session field, let people just show up* — leaves you unable to plan room size for either half.

**Revisit if:** the split turns out to be lopsided enough that running two intakes isn't worth the complexity.

---

## D-011 — The Claude Design mockup is the visual reference, not the codebase

**Status:** decided
**Decision:** The exported mockup lives in `docs/mockups/` and is the agreed reference for layout, copy and interaction. It is never imported, compiled, or copy-pasted into the app.
**Rationale:** The export uses Claude Design's own template syntax (`sc-for`, `sc-if`, `{{ }}` bindings, opaque asset IDs resolved by a bundler). It renders in a browser but is not React, has no build step, and loads fonts from a CDN — which would break INV-5 on sight. Keeping it clearly labelled as a reference stops a contributor "saving time" by lifting it wholesale.
**Rejected:**
- *Hand off directly to Claude Code from the design tool* — plausible, but produces code shaped by the tool rather than by `architecture.md`, and bypasses the token file that prevents contributor drift.
- *Discard the mockup once the build starts* — it is the only artifact where the whole team agreed on layout and copy. Keep it.

**Revisit if:** never for this project.

---

## Template
## D-012 — shadcn/ui + Base UI as the component layer

**Status:** decided
**Decision:** Use shadcn (CLI-generated components) on top of `@base-ui/react` primitives for `components/ui/`, alongside `class-variance-authority` for variants and `lucide-react` for icons, instead of hand-rolling each shared component from scratch.
**Rationale:** Gives the team accessible, pre-tested component primitives (focus states, ARIA, keyboard behaviour) out of the box, which matters for the accessibility bar in `architecture.md §6` (Lighthouse A11y ≥ 95). Faster than hand-building `Button`, form primitives, and disclosure components from zero with a nine-week runway. Components are copied into the repo (not a runtime dependency on a component library), so they're fully editable and themeable via `lib/tokens.ts` — no lock-in.
**Rejected:**
- *Hand-rolled components from scratch* — more control, but slower, and reinventing accessible primitives is exactly what shadcn already solves.
- *A full component library dependency (Radix directly, Chakra, MUI)* — shadcn's copy-in model keeps `components/ui/` fully owned and editable in-repo, matching the existing "Pushkar owns `components/ui/`" convention.

**Revisit if:** shadcn's generated output causes bundle-size or accessibility regressions that break the budget in `architecture.md §6`.

---

## D-013 — Hosting moved to Vercel; a practical migration, not a reasoned decision

**Status:** decided (as a record of what actually happened — not a considered architectural trade-off)
**Decision:** The site is deployed and live at `https://qff-2026-site.vercel.app`, on Vercel. This supersedes Cloudflare Pages as the hosting platform recorded in D-001 and `spec/architecture.md` §1.
**Rationale:** This was not evaluated the way D-001 was. It happened as a practical migration partway through build — the team moved to whatever got a URL live and iterating — and the spec was never updated to match, which is the drift this entry exists to close. One consequence worth naming plainly: Vercel's Node runtime is what has made it possible to add `app/api/register/route.ts` as a Next.js API route, a shape `architecture.md` §4 lists as **not supported** and D-004 rejected outright ("incompatible with `output: 'export'`. Would build and then fail in production."). That route currently exists, is unfinished, and is out of scope for this entry — see the note below. The registration backend question this entry leaves open is not just "D1 vs. something else on the same architecture" — it's whether the architecture itself is still Cloudflare-shaped at all.
**Rejected:** Nothing was actually evaluated or rejected at the time of the move — that absence is the point of this entry. D-001 explicitly rejected Vercel Hobby ("its terms are non-commercial-only, and keeping the Worker in the same account as the site is simpler on Cloudflare"); that rejection was never revisited before the move happened.
**Revisit if:** The registration backend decision (D1 vs. a Vercel-native store — see D-002, still unresolved) is made. That decision should either (a) confirm Vercel as the permanent host, formally supersede D-001's hosting choice, and update `architecture.md`'s stack table and INV-7's Cloudflare-specific wording in `CONTRACT.md`, or (b) move hosting back to Cloudflare Pages + Workers + D1 per the original design. Until then the project is straddling both — Vercel hosting, a stub API route standing in for the Worker, D1 never provisioned — which is not a stable place to leave it.

---

## D-014 — Registration moved to Google Form; Supabase path retired; Hackathon (M3) cancelled

**Status:** decided
**Decision:**
1. Registration intake moves to a standing, dedicated Google Form (`https://docs.google.com/forms/d/e/1FAIpQLSe7TCtOGT9_xKIXn0eGkDWh1JM-f67NZ2BZOFaYsLSHYcz6iQ/viewform`). `/register` serves as the public landing page with event details, 18+ policy, under-18 offline route instructions (coordinator email `qquest.mitadtuniversity@gmail.com`), QR code (`/register-qr.png`), and direct link opening the form in a new tab (`target="_blank"`, `rel="noopener noreferrer"`).
2. The interim custom Supabase API route (`/api/register`), database client (`lib/supabase.ts`), validation schema (`lib/registration-schema.ts`), and scheduled ping (`.github/workflows/keepalive.yml`) are retired and deleted from the codebase. All Supabase, React Hook Form, and Zod dependencies are removed.
3. Hackathon (M3) is officially cancelled as the sponsorship confirmation deadline (10 October 2026) passed without confirmed sponsorship. M3 is closed permanently; the fest runs as two sessions across 3 and 4 November 2026.
**Rationale:**
- Operating custom database endpoints on free-tier services required keepalive cron jobs to avoid auto-pausing and added operational complexity during the final event runway. Google Forms provides a battle-tested, zero-maintenance intake with automatic spreadsheet mirroring (D-005), zero recurring cost (INV-6), and zero cold-start failures.
- Under-18 participants continue to be routed offline to faculty/coordinator via `qquest.mitadtuniversity@gmail.com` with guardian consent on paper, upholding INV-4. No iframes or third-party scripts are embedded on the site, upholding INV-5.
- Per `spec/plan.md`, M3 was strictly gated on sponsorship confirmation by 10 October 2026. Because sponsorship was not secured by that date, M3 is closed per the plan. All team capacity is focused on delivering high-quality Part 1 and Part 2 sessions.
**Rejected:**
- *Continuing custom Supabase registration backend* — adds ongoing maintenance overhead, free-tier auto-pausing risks, and failure modes on the critical registration path.
- *Embedding Google Form via iframe* — violates INV-5 (Google scripts and third-party tracking injected into our page origin) and provides a poor mobile user experience compared to a native new-tab flow.
- *Keeping M3 open past the 10 October deadline* — creates uncertainty for participants and scope creep for the organizing team without secured prize/sponsorship backing.
**Revisit if:** Never for this event cycle.

---

## D-015 — Site moves to a two-day hybrid format (3 and 4 November 2026) with closing challenge

**Status:** decided
**Decision:**
1. Event expanded from one day to two days: Day 1 (3 November 2026) and Day 2 (4 November 2026).
2. Format is hybrid: in-person attendance at MIT-ADT University, Pune, and online attendance via Microsoft Teams. The Teams meeting link is emailed directly to registered attendees and is not published on the public website.
3. Schedule updated to group items by `day: 1 | 2` in `content/schedule.ts` and `SectionSchedule.tsx`.
4. Day 1 features two 1-hour keynote sessions by confirmed IBM speaker Surya Vamsi Miriyala with 10–15 min Q&A each, followed by an interactive exploration session.
5. Day 2 features hands-on quantum circuits, hardware basics, and algorithms in Qiskit, a 30–60 min technical session on quantum technologies, and a closing hands-on challenge.
6. The cancelled hackathon is replaced by a closing hands-on challenge on Day 2. Certificates of participation are issued to attendees after submitting the post-event feedback form.
**Rationale:**
- Accommodates depth of engagement with the confirmed IBM speaker, gives participants proper time for hands-on learning with Qiskit, and broadens reach to online attendees across institutions.
- Replaces speculative hackathon logistics with an educational hands-on coding challenge directly aligned with learning outcomes.
**Rejected:**
- *Publishing Teams link openly on the web* — exposes meetings to spam/trolling and breaks registration attendance tracking.
- *Keeping a single compressed day* — would rush the IBM speaker sessions and leave inadequate time for hands-on Qiskit circuits and the coding challenge.
**Revisit if:** Never for this event cycle.

---

## D-0XX — <short title>

**Status:** proposed | decided | superseded by D-0YY
**Decision:** <what>
**Rationale:** <why, including what breaks without it>
**Rejected:** <alternatives, each with why not>
**Revisit if:** <condition>
```

Rules: add the entry the day the decision is made — backfilled logs are fiction. Supersede rather than delete.

