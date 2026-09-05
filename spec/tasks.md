# tasks.md — Backlog

One task = one change = one commit. Tick the box and add a one-line note when done.

Task ID format: `M<milestone>-<AREA>-<number>`. Areas: `SETUP`, `UI`, `CONTENT`, `API`, `DATA`, `OPS`.

Tasks marked **STORY** produce user-facing content. They carry their own acceptance criteria and require lead review before merge. They are not task-sized afterthoughts — the copy is the product.

---

## M0 — Live and submittable

### Setup
- [ ] **M0-SETUP-01** `git init`, add `.gitignore` (`.env`, `.env.*`, `!.env.example`, `node_modules/`, `.next/`, `out/`, `.wrangler/`), commit the spec system
- [ ] **M0-SETUP-02** Create `.env.example` with empty keys only; never a filled value
- [ ] **M0-SETUP-03** Add pointer files: `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, each one line pointing at `AGENTS.md`
- [ ] **M0-SETUP-04** Scaffold Next.js 15 with TypeScript strict + Tailwind 4; set `output: 'export'` in `next.config.js`
- [ ] **M0-SETUP-05** Download IBM Plex Sans (200/300/400/500/600) and Plex Mono woff2 into `public/fonts/`; wire `@font-face` in `globals.css` — self-hosted, no CDN (INV-5)
- [ ] **M0-SETUP-07** Commit the agreed mockup to `docs/mockups/` and link it from `AGENTS.md` §1 (D-011 — reference only, never imported)
- [ ] **M0-SETUP-06** Copy official assets from the deliverables repo into `public/brand/` unmodified; record their checksums in `spec/evals.md` §3 (INV-9)

### UI
- [ ] **M0-UI-01** Create `lib/tokens.ts` with the exact Carbon palette and semantic assignments from `CONTRACT.md`; wire into the Tailwind theme
- [ ] **M0-UI-02** Build `components/ui/SectionLabel.tsx` — Plex Mono, `01 / LABEL` format
- [ ] **M0-UI-03** Build `components/ui/Button.tsx` — primary and secondary variants, `BLUE_60` for interactive
- [ ] **M0-UI-04** Build `app/layout.tsx` — fonts, metadata, OG tags, footer with the verbatim attribution line
- [ ] **M0-UI-05** Build the hero section: brand asset on `PURPLE_90`, event name, date, venue line, concept sentence
- [ ] **M0-UI-06** Build `components/ui/Countdown.tsx` — client-only, target `EVENT_DATE_UTC`, Plex Mono, `prefers-reduced-motion` guarded
- [ ] **M0-UI-07** Build `app/register/page.tsx` as a "Registrations open soon" stub

### Ops
- [ ] **M0-OPS-01** Create the Cloudflare Pages project, connect the repo, deploy from `main`
- [ ] **M0-OPS-02** Run `spec/smoke.md` §1, §2, §4 in full against the live URL
- [ ] **M0-OPS-03** Verify zero third-party requests in the browser network tab; grep `out/` for `BLOCKED_HOSTS`
- [ ] **M0-OPS-04** Submit `PROD_URL` to the IBM Airtable — re-read INV-7 immediately before doing this
- [ ] **M0-OPS-05** Write the first `AGENT_LOG.md` entry and rewrite `BRIEF.md` to point at M1

---

## M1 — The site says something true

### Content (all STORY)
- [ ] **M1-CONTENT-01** **STORY** Write `content/myths.ts` — 4 claim/correction pairs. *Acceptance:* each correction contains a specific number or a linked source; none uses a banned adjective; at minimum covers "tries every answer at once" and "breaks encryption soon"; lead-approved.
- [ ] **M1-CONTENT-02** **STORY** Write `content/decade.ts` — 2016–2026, one entry per year, each stating what was claimed at the time versus what was achieved. *Acceptance:* every entry sourced; final entry is this fest; reads as an argument, not a timeline.
- [ ] **M1-CONTENT-03** **STORY** Write `content/sessions.ts` from the confirmed Part 1 and Part 2 descriptions. *Acceptance:* duration ranges stated; Part 2 lists gates, noise, transpilation, NISQ limits and the closing challenge; no claim that every participant runs a personal job on a QPU unless verified (`architecture.md` §8).
- [ ] **M1-CONTENT-04** **STORY** Write `content/faq.ts` — minimum: is it free, do I need a background, do I need my own hardware, will I get a certificate, can I attend from another college, what do I install. *Acceptance:* answers are direct, no hedging.
- [ ] **M1-CONTENT-05** **STORY** Write `content/checklist.ts` — IBM Quantum account creation, laptop, Python and Qiskit install. *Acceptance:* a first-year could follow it without asking anyone.
- [ ] **M1-CONTENT-06** Write `content/schedule.ts` — times as UTC ISO, rendered IST via `lib/format.ts`
- [ ] **M1-CONTENT-07** **STORY** Write `content/speakers.ts` — IBM speaker featured. *Acceptance:* no invented names, no placeholder bios. Blocked until names are confirmed.

### UI
- [ ] **M1-UI-01** Build `SectionMyths` — claim stated, correction revealed on interaction; `MAGENTA_40` for corrections
- [ ] **M1-UI-02** Build `SectionDecade` — 2016–2026 timeline
- [ ] **M1-UI-03** Build `SectionSessions` — Part 1 and Part 2 cards
- [ ] **M1-UI-04** Build `SectionSchedule` with `components/ui/ScheduleRow.tsx`
- [ ] **M1-UI-05** Build `SectionFaq` with `components/ui/FaqItem.tsx` — accessible disclosure, keyboard operable
- [ ] **M1-UI-06** Build `SectionChecklist`
- [ ] **M1-UI-07** Build `SectionSpeakers` with `components/ui/SpeakerCard.tsx`
- [ ] **M1-UI-08** Build `SectionVenue` — address, static map image (not an embed — INV-5), named contacts
- [ ] **M1-UI-09** Build `SectionAbout` — what Fall Fest is, and that this one is open beyond MIT-ADT. State the openness prominently; it is a genuine differentiator against DBATU
- [ ] **M1-UI-10** Add the noise-resolving-into-signal hero treatment, `prefers-reduced-motion` guarded
- [ ] **M1-UI-11** Add a QR code image linking to `/register` for use on slides and posters

### Ops
- [ ] **M1-OPS-01** Write the banned-adjective lint script; wire into `npm run lint`
- [ ] **M1-OPS-02** Full `spec/smoke.md` pass including §4 and §5
- [ ] **M1-OPS-03** Record the M1 verdict table in `spec/evals.md` §7

---

## M2 — Registration works, provably

### Data
- [ ] **M2-DATA-01** Create the D1 database; apply `worker/schema.sql` from `architecture.md` §3
- [ ] **M2-DATA-02** Verify the schema has no age, DOB, or guardian column (INV-4)

### API
- [ ] **M2-API-01** Scaffold the Worker with `wrangler.toml`, D1 binding, CORS restricted to `PROD_URL` and localhost
- [ ] **M2-API-02** Write `worker/src/normalise.ts` — email and phone normalisation, pure functions, no I/O
- [ ] **M2-API-03** Write payload validation returning the exact error shapes in `CONTRACT.md`, including `sessionChoice` enum check
- [ ] **M2-API-04** Add Turnstile server-side verification
- [ ] **M2-API-05** Implement D1 insert with `UNIQUE` violation caught and mapped to the duplicate response (INV-2)
- [ ] **M2-API-06** Implement the Sheets mirror write; set `mirrored_at` on success
- [ ] **M2-API-07** Implement the email-on-failure fallback (INV-1)
- [ ] **M2-API-08** Add IP rate limiting, 5 submissions/hour
- [ ] **M2-API-09** Write the resync routine for rows where `mirrored_at IS NULL`
- [ ] **M2-API-10** Audit every log statement in the Worker for personal data (INV-3)

### UI
- [ ] **M2-UI-01** Build the registration form: name, email, phone, college, year of study, session choice, laptop confirmation — grouped as YOUR DETAILS / ATTENDING / CONSENT, visible labels above each input (see `docs/mockups/`)
- [ ] **M2-UI-02** Add the 18+ confirmation checkbox — `required`, pink asterisk, client and server validated (INV-4)
- [ ] **M2-UI-09** Add the optional "Keep me updated about future QQuEST events" checkbox, unchecked by default
- [ ] **M2-UI-03** **STORY** Write the under-18 offline-route explainer beside the form. *Acceptance:* states plainly that under-18s register through the coordinator, gives the contact, does not read as exclusionary.
- [ ] **M2-UI-04** Integrate the Turnstile widget
- [ ] **M2-UI-05** Build the success state — renders only after a 200 response (INV-1)
- [ ] **M2-UI-06** Build every error state, each showing the fallback email address
- [ ] **M2-UI-07** Add the submit lock preventing double-submission
- [ ] **M2-UI-08** Write `lib/api.ts` — the single fetch wrapper; explicit CORS mode, never `no-cors`

### Ops
- [ ] **M2-OPS-01** Set all Worker secrets via `wrangler secret put`; confirm none appear in git
- [ ] **M2-OPS-02** Write and run every invariant and negative test in `spec/evals.md`
- [ ] **M2-OPS-03** Ten live submissions from three devices; verify D1 and mirror counts match
- [ ] **M2-OPS-04** Prepare the standing Google Form as the cold fallback; document the href swap in `smoke.md`
- [ ] **M2-OPS-05** Record the M2 verdict table in `spec/evals.md` §7

---

## M3 — Hackathon surfaces · **GATED, DO NOT START**

Blocked until sponsorship is confirmed by 10 October 2026. If that date passes without confirmation, delete this section.

- [ ] **M3-DATA-01** Add the `teams` and `team_members` tables
- [ ] **M3-API-01** Team registration endpoint, 2–4 members
- [ ] **M3-API-02** Submission capture — repo URL and description, no file upload
- [ ] **M3-UI-01** Team registration form
- [ ] **M3-UI-02** **STORY** Problem statement page, published at the opening ceremony
- [ ] **M3-OPS-01** Judging tab in the mirror; confirm M2 invariants still hold

---

## M4 — Post-event

- [ ] **M4-CONTENT-01** **STORY** Publish workshop notebooks in a public repo. *Acceptance:* runs clean from a fresh environment.
- [ ] **M4-UI-01** Embed the session recording via `youtube-nocookie.com` only
- [ ] **M4-CONTENT-02** **STORY** Recap section: photos, honest attendance number
- [ ] **M4-OPS-01** Issue certificates by mail-merge from the mirror
- [ ] **M4-UI-02** Switch the site to past tense; close registration
- [ ] **M4-OPS-02** Calendar the 2 January 2027 deletion (INV-10)

---

## Backlog — unscheduled, do not start

- **Live registration counter** — leaks headcount, invites gaming, and is a capability deliberately marked unsupported.
- **Discord / Instagram embeds** — third-party requests, breaks INV-5. Link out with a plain anchor instead.
- **Multi-language support** — no evidence of need for a Pune event.
- **Certificate generation in-app** — mail-merge is fifteen minutes of work for 300 people; a generator is days.
- **Reusable multi-year event template** — attractive and premature. Revisit after this fest ships, if QQuEST runs another.
- **Custom domain** — see D-003. A one-year free domain becomes a dead link on IBM's permanent listing.
