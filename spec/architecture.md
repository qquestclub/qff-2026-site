# architecture.md — QFF26 Site

## 1. Stack

| Layer | Choice | Version | Why |
|---|---|---|---|
| Language | TypeScript | 5.x, `strict: true` | Team is Node-based; strict mode catches the class of bug nobody reviews for |
| Framework | Next.js, App Router, `output: 'export'` | 15.x | Thickest agent training data of any React framework; static export removes all runtime server concerns |
| Styling | Tailwind CSS | 4.x | Tokens live in one config; stops five contributors inventing five spacing scales |
| Fonts | IBM Plex Sans + Mono, self-hosted `.woff2` | — | Official QFF 2026 typeface; self-hosted because of INV-5 |
| Site hosting | Cloudflare Pages | — | Permanent free production URL, no commercial-use grey area, same account as the Worker |
| API | Cloudflare Workers | — | ~120 lines of TS; no server to keep alive during exam season |
| Database | Cloudflare D1 (SQLite) | — | Free, durable, `UNIQUE` constraint gives INV-2 for free |
| Mirror | Google Sheets API v4 via service account | — | The organisers' actual working surface |
| Bot defence | Cloudflare Turnstile | — | Free, no cookies, no tracking — compatible with INV-5 |
| Email fallback | Resend free tier (or MailChannels) | — | Last-resort path for INV-1 |
| Auth | **None** | — | No accounts exist |
| Analytics | **None** | — | Deliberate. INV-5 |

**Static export is load-bearing.** There is no Node runtime in production. Server components with runtime fetching, route handlers, middleware, ISR, `revalidate`, and dynamic `params` without `generateStaticParams` will build successfully and then fail in production. All dynamic behaviour is in the Worker, deployed separately.

## 2. Structure

```
qff26-site/
├── app/
│   ├── page.tsx              ← the single landing page; composes sections, holds no content
│   ├── register/page.tsx     ← registration route. Stub until M2, live after
│   ├── layout.tsx            ← fonts, metadata, footer attribution (INV-9)
│   └── globals.css
├── components/
│   ├── sections/             ← one file per landing-page section, PascalCase.tsx
│   ├── ui/                   ← Button, SectionLabel, ScheduleRow, FaqItem, SpeakerCard, Countdown
│   └── registration/         ← form, field components, success and error states
├── content/                  ← one .ts module per section. ALL copy lives here, typed.
│   ├── myths.ts              ← claim + correction + source. The differentiator.
│   ├── decade.ts             ← 2016–2026: claimed vs achieved
│   ├── sessions.ts           ← Part 1 and Part 2 detail
│   ├── schedule.ts           ← times as UTC ISO, rendered IST
│   ├── faq.ts
│   ├── checklist.ts          ← pre-event prep
│   └── speakers.ts
├── lib/
│   ├── tokens.ts             ← THE ONLY place a hex colour appears
│   ├── format.ts             ← IST time formatting, date display
│   └── api.ts                ← the single fetch wrapper to the Worker
├── public/
│   ├── brand/                ← official IBM assets, byte-identical to upstream (INV-9)
│   └── fonts/                ← self-hosted Plex woff2
├── worker/                   ← separate deployment; own wrangler.toml
│   ├── src/index.ts
│   ├── src/normalise.ts      ← email and phone normalisation. Pure, heavily tested.
│   ├── src/sheets.ts
│   └── schema.sql
└── spec/
```

Rules for each location:

- **`content/`** — one module per section, because merge conflicts in a single large content file are miserable with five contributors and copy changes constantly. Every module exports a typed const. No copy string appears in a component file.
- **`lib/tokens.ts`** — the only file containing a hex literal. A raw hex anywhere else fails review. This is the mechanism that prevents the visual chaos of parallel contributors, and it is worth more than any architecture document.
- **`components/ui/`** — the shared inventory. Before creating a component, check this directory. Five near-identical Button implementations is the predictable failure here.
- **`public/brand/`** — byte-identical copies from the official deliverables repo. Never edited, never optimised, never re-exported (INV-9).
- **`worker/`** — separate deployment lifecycle from the site. Changes here do not require a site rebuild and vice versa. Keep normalisation logic pure and separate from I/O so it can be tested without network.

## 3. Data model

Single table. That is the whole model, and it should stay that way until M3.

```sql
CREATE TABLE registrations (
  id               TEXT PRIMARY KEY,          -- ULID, lowercase
  created_at       TEXT NOT NULL,             -- ISO 8601 UTC with Z
  full_name        TEXT NOT NULL,
  email            TEXT NOT NULL UNIQUE,      -- normalised. INV-2 lives here.
  phone            TEXT NOT NULL,             -- E.164
  college          TEXT NOT NULL,
  year_of_study    TEXT NOT NULL,
  session_choice   TEXT NOT NULL,             -- 'q101' | 'handson' | 'both'
  laptop_confirmed INTEGER NOT NULL DEFAULT 0,
  age_confirmed    INTEGER NOT NULL,          -- always 1; a 0 row is a bug (INV-4)
  mailing_opt_in   INTEGER NOT NULL DEFAULT 0,
  mirrored_at      TEXT                       -- NULL until synced to the Sheet
);

CREATE INDEX idx_registrations_mirrored ON registrations(mirrored_at);
```

Notes:

- **No `dob`, `age`, `guardian_name`, or `guardian_email` columns, ever.** INV-4. A schema change adding one requires lead approval and would be wrong. `age_confirmed` is a boolean attestation, not an age.
- **`session_choice` is real.** Partial attendance is allowed (D-010), so this drives catering, seating and certificate wording. Not decorative.
- `email UNIQUE` is what implements INV-2. Do not add application-level dedupe on top; catch the constraint violation and return the existing row.
- `mirrored_at NULL` is the resync queue. If the Sheets write fails, the row is still safe and `idx_registrations_mirrored` finds it.
- **Expensive to reverse:** the email-as-identity choice. Everything else here is cheap to change.
- **Cheap to reverse:** every field except `email`. Adding a column is trivial; changing what identifies a person is not.

## 4. Capability register

**Consult before building anything. Never build on an unsupported capability.**

| Capability | Status | Needed for |
|---|---|---|
| Static page rendering, all sections | supported | M1 |
| Registration write to D1 | in progress (M2) | M2 |
| Turnstile verification | in progress (M2) | M2 |
| Sheets mirror sync | in progress (M2) | M2 |
| Email-on-failure fallback | in progress (M2) | M2 |
| Countdown to event | supported (client-only) | M1 |
| Server-side rendering | **not supported** | Nothing. Static export. Will not be added. |
| API routes in Next.js | **not supported** | Nothing. Use the Worker. |
| Sessions, cookies, login | **not supported** | Nothing. No accounts exist (`product.md` §5) |
| Reading registrations back into the site | **not supported** | A live registration counter. Deliberately absent — it leaks headcount and invites gaming |
| File upload | **not supported** | M3 hackathon submissions. Requires R2, not built |
| Team registration | **not supported** | M3. Requires a second table and a join |
| Judging / leaderboard | **not supported** | M3 |
| Certificate generation | **not supported** | M4. Currently a manual mail-merge from the mirror |
| Email sending to registrants | **not supported** | M4 follow-up. Currently manual from the mirror |
| Any analytics | **not supported** | Nothing. Prohibited by INV-5, permanently |
| Admin UI | **not supported** | Nothing. The Sheet is the admin UI (`product.md` §5) |

## 5. Scale assumptions

- **Building for:** 300 registrations, ~500 unique visitors on the busiest day, one traffic spike when the fest is announced in WhatsApp groups.
- **Revisit at:** 800 registrations, or if the site is reused for a multi-day event.
- **First thing to break as it grows:** nothing technical. Cloudflare's free tiers are three orders of magnitude above this. The first real failure is human — the Sheet becoming unwieldy for manual follow-up past a few hundred rows.
- **Deliberately not building for:** concurrent write bursts beyond a few per second, internationalisation, multi-event reuse, or the hackathon (until M3 opens).

Over-engineering warning: at 300 registrations, anything resembling a queue, a cache, a background job runner, or a microservice is a mistake. If a proposal includes one, it is out of scope by definition.

## 6. Performance budget

Concrete, because the primary user is on a phone on campus wifi, deciding in ninety seconds.

| Metric | Budget | Measured how |
|---|---|---|
| Largest Contentful Paint, 4G, mid-range Android | < 2.5 s | Lighthouse mobile, throttled |
| Total JS transferred | < 120 KB gzipped | `next build` output + Lighthouse |
| Total page weight, first view | < 900 KB | Lighthouse |
| Lighthouse Performance | ≥ 90 | CI or manual before deploy |
| Lighthouse Accessibility | ≥ 95 | Same |
| Third-party requests | **0** | INV-5; grep the built output |

The hero SVGs from the deliverables repo are large. Compress losslessly at build time without altering path geometry or colour (INV-9 — `svgo` with path rewriting disabled), or serve a pre-rendered raster for the hero and keep the SVG for crisp elements.

## 7. Security and privacy

- **Stored about registrants:** name, email, phone, institution, branch, year, affiliation, quantum experience, whether they have an IBM Quantum account, attendance mode, age confirmation, mailing opt-in.
- **Deliberately not stored:** date of birth, age, gender, roll number, address, government ID, guardian details, photograph.
- **Never logged:** any field above. Worker logs record `registrationId`, `code`, and timing only.
- **Deletion:** `DELETE FROM registrations` plus clearing the mirror, on 2 January 2027 (INV-10). Individual deletion on request: single row by normalised email, plus the corresponding mirror row, same day.
- **Secrets:** Google service-account JSON, Sheet ID, Turnstile secret key, and the email-fallback API key live as Cloudflare Worker secrets via `wrangler secret put`. They never appear in `.env` committed to git, in `NEXT_PUBLIC_*` variables, or in the client bundle. `.env.example` carries empty keys only.
- **CORS:** the Worker accepts POST from `PROD_URL` and `http://localhost:3000` only. Not `*`.
- **Rate limiting:** Turnstile is the primary defence. Add a Worker-level cap of 5 submissions per IP per hour as a second layer.

## 8. External dependency: IBM Quantum Open Plan

Not consumed by this codebase, but it is the binding constraint on the event the site advertises, and the site's content exists partly to mitigate it.

Verified September 2026: the Open Plan gives **10 minutes of QPU runtime per rolling 28-day window per account**, free, no card. Accounts that log 20+ minutes in a 12-month period can opt into a one-time **+180 minutes over 12 months**. `ibm_kingston` (Heron r2, 156 qubits) is available to Open Plan users.

**The per-account allowance is not the risk.** Tutorial circuits consume milliseconds. The risk is **queue depth**: forty people submitting to a shared backend inside one three-hour session means waiting, not learning.

Re-verify before publishing any hardware claim — IBM changes these.

Site-side mitigations, all content:

- Pre-event checklist section: create the IBM Quantum account *before* Day 1 (metric #3 in `product.md`).
- FAQ entry setting the expectation that most labs run on simulators, with hardware used for specific demonstrations.
- Never claim on the page that every participant will run their own job on a QPU unless that has been verified against real limits.

## 9. Provisional items

Marked honestly rather than guessed.

| Item | Status | Revisit trigger |
|---|---|---|
| Team available hours per week | **provisional** — not yet established | Before M1 sizing is trusted. Milestone estimates in `plan.md` assume ~10 combined person-hours/week |
| Email fallback provider (Resend vs MailChannels) | **provisional** | At M2-API-06, whichever authenticates from a Worker with least friction |
| Coordinator email for the under-18 offline route | **unknown** | Blocks M2-UI-03; currently a placeholder in the mockup |
| Venue and room | **unknown** | Blocks a content story in M1 |
| Speaker names beyond the IBM speaker | **unknown** | Blocks the speakers section; do not invent placeholders |
