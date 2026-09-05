# CONTRACT — QFF26 Site (QQuEST × MIT-ADT)

**The correctness core. An agent that reads only this file must not be able to break the domain.**

Precedence: this file outranks every other document. If something here conflicts with a task, the task is wrong — stop and flag it. Changing this file requires explicit approval from Pushkar Kumar (project lead).

---

## Invariants

### INV-1 — No registration is ever silently lost

**Rule:** A form submission either results in a durable row in D1, or the user sees an explicit failure message containing a fallback route. There is no third outcome. The success state is rendered only after the Worker returns HTTP 200 with `{"ok": true, "registrationId": "<ulid>"}`.

**Why:** A dropped registration is a person who either shows up to an event with no seat, or doesn't show up at all. There is no way to detect this after the fact — the person simply never appears, and you never learn why. This is the single most expensive failure mode in the project.

**Violated by:** Optimistic UI — firing the success toast on submit rather than on response. Also by `fetch(...).catch(() => {})`, by `mode: 'no-cors'` (which makes every response opaque and indistinguishable from failure), and by treating a network timeout as success.

**Detected by:** `INV-1-T` in `spec/evals.md` — a test that stubs the Worker to return 500 and asserts the UI renders the error state, not the success state. Plus `N-04`, which asserts an opaque/no-cors response is treated as failure.

---

### INV-2 — One human, one row

**Rule:** Registration identity is the normalised email (see Pinned conventions). D1 enforces this with `email TEXT NOT NULL UNIQUE`. A repeat submission of an already-registered email returns HTTP 200 with `{"ok": true, "duplicate": true}` and the original `registrationId` — it does not error, and it does not insert.

**Why:** Double-clicked submit buttons and impatient users on slow campus wifi are guaranteed. Duplicate rows corrupt your headcount, which drives catering, seating, and the certificate list. Returning an error on duplicate is also wrong — it makes a user who legitimately forgot they registered think they failed.

**Violated by:** Hand-rolled `SELECT` then `INSERT` (racy under concurrent submits). Also by dedupe on raw email, which treats `Pushkar@Example.com` and `pushkar@example.com` as different people.

**Detected by:** `INV-2-T` — insert the same normalised email twice concurrently, assert exactly one row and two 200 responses with matching `registrationId`.

---

### INV-3 — Personal data never leaves the trusted path

**Rule:** The trusted path is: browser form → Worker → D1 → Sheets mirror. Personal data appears nowhere else. Specifically it never appears in: a git-tracked file (including fixtures, seed data, and README examples), a `console.log` or `console.error`, a Worker log line, an error message returned to the client, a URL query string, or any third-party script.

**Why:** DPDP Act penalties for security failures reach ₹250 crore, and separately: this is a student society holding a list of a few hundred people's names, emails and phone numbers on trust. Leaking it is the kind of thing that ends a club's relationship with its university.

**Violated by:** Debug logging left in during development (`console.log(payload)` is the classic). Committing a `.csv` export "just to test the parser". Putting the email in an error string like `"Registration failed for pushkar@example.com"`.

**Detected by:** `INV-3-T` — grep the built output and the Worker source for `@` in string literals and for the Sheet ID. Plus a manual step in `spec/smoke.md` §1.

---

### INV-4 — Web registration is 18+ only

**Rule:** The web form collects no date of birth and no age. It carries one required checkbox: *"I am 18 years of age or older."* Submission without it is rejected client-side and server-side. There is no code path in this project that handles a minor's registration. Under-18 attendees are handled entirely offline (see `spec/product.md` §5).

**Why:** India's DPDP Act classifies everyone under 18 as a child and requires *verifiable* parental consent — the Rules designate Aadhaar-linked DigiLocker tokens as the authoritative credential. A parent's email typed into a form is not verifiable consent. The Act separately prohibits tracking, monitoring and profiling of children outright, which no consent flow cures. Full compliance is required by 13 May 2027; this event predates enforcement, but building a naive minor path now means rebuilding it later, and building a real one is absurd for a campus event.

**Violated by:** Adding a "date of birth" field because it seems useful for demographics. Adding a "parent's email" field as a well-meaning accommodation. Both create a minor data path where none should exist.

**Detected by:** `INV-4-T` — assert the D1 schema contains no `dob`, `age`, `birth_date`, or `guardian_*` column, and that a payload missing `ageConfirmed: true` is rejected with `AGE_NOT_CONFIRMED`.

---

### INV-5 — Zero third-party tracking

**Rule:** The production site loads no analytics, no tag manager, no advertising pixel, no session-recording script, no social embed that sets cookies, and no font from a third-party CDN. Fonts are self-hosted. The only external network call the browser makes is to the Worker origin and to Cloudflare Turnstile.

**Why:** Two reasons, both load-bearing. First, minors will visit the site even though they can't register on it, and profiling of children is prohibited outright. Second, it's the concept: a site whose argument is *we are honest with you about quantum* that quietly ships six trackers is not honest.

**Violated by:** `next/font/google` in a configuration that fetches at runtime rather than self-hosting. Adding Vercel Analytics or Cloudflare Web Analytics "because it's privacy-friendly" — it is still tracking and it is still out. Embedding a YouTube iframe without `youtube-nocookie.com`.

**Detected by:** `INV-5-T` — assert the built HTML/JS contains none of the blocked hostnames listed under Exact values.

---

### INV-6 — Zero recurring cost

**Rule:** No service on the critical path may require a paid tier, a credit card, or per-request billing. Every dependency must sit inside a permanent free tier. Adding any dependency with a metered cost requires approval and a `spec/decisions.md` entry.

**Why:** This is a student society with no budget. A service that starts billing in October takes the registration form offline in the week it matters most.

**Violated by:** Reaching for a managed Postgres, a Redis cache, a queue, a transactional-email service above its free tier, or a paid domain, because each is individually reasonable.

**Detected by:** Manual review at each milestone close, recorded in `spec/evals.md` §7.

---

### INV-7 — The public URL is permanent and production

**Rule:** The URL submitted to IBM is the Cloudflare Pages **production** URL. Never a branch preview (`*-git-<branch>-*`), never a deploy preview, never `localhost`, never a domain that requires renewal to keep working.

**Why:** IBM lists community URLs on a page that outlives your tenure as lead. In the 2026 cohort, one community has already submitted `http://127.0.0.1:4444/initiatives/fall-fest/` and another submitted a Vercel branch-preview URL that dies with the branch. A free-for-one-year student-pack domain becomes a dead link on IBM's page in 2027.

**Violated by:** Copying the URL out of the browser during a preview deploy and pasting it into the submission form.

**Detected by:** `spec/smoke.md` §6 — confirm the submitted URL matches `PROD_URL` exactly before any external submission.

---

### INV-8 — No claim without a number or a source

**Rule:** Every factual statement about quantum computing on the site carries either a specific number or a linked source. Marketing adjectives — *revolutionary*, *powerful*, *game-changing*, *exponentially faster* — are prohibited in body copy.

**Why:** This is the project's concept expressed as a rule. The site's argument is that quantum is specific and the specifics beat the headlines. A page making that argument in vague superlatives defeats itself, and a knowledgeable visitor — which includes the IBM speaker — will notice immediately.

**Violated by:** A contributor softening precise copy into something that "reads better" for a landing page. This is the most likely invariant to be broken by a well-meaning person.

**Detected by:** `INV-8-T` — a lint pass over content files for the banned-adjective list under Exact values, plus lead review of every content story.

---

### INV-9 — Brand marks ship unmodified

**Rule:** Assets from the official `Qiskit-Fall-Fest-2026/materials-resources` repo are used at their delivered geometry and colour. No recolouring, redrawing, re-tracing, cropping through the mark, or regenerating a "cleaner" version. The footer carries the attribution line verbatim (see Reference examples). Composition *around* the assets is encouraged; alteration *of* them is not.

**Why:** Qiskit and Qiskit Fall Fest are IBM marks, used under a programme licence. You are a listed community host. Altering the marks is the one design decision that could cause an actual problem with IBM.

**Violated by:** An agent "optimising" an SVG with a tool that rewrites paths or flattens colours. Tinting the badge to match a section background.

**Detected by:** `INV-9-T` — checksum the asset files in `public/brand/` against the upstream repo copies; any diff fails.

---

### INV-10 — Data has an expiry date

**Rule:** Registration data is deleted from D1 and from the Sheets mirror on **2 January 2027** (60 days after the event). The only data surviving that date is the subset where `mailingListOptIn = 1`, which moves to a separate store retaining name and email only.

**Why:** The DPDP Rules require deleting personal data once the purpose it was collected for is complete. "We might need it someday" is not a purpose. A dormant spreadsheet of 300 people's phone numbers sitting in a shared Drive for three years is exactly the liability this rule removes.

**Violated by:** Nothing — this is violated by inaction. It requires someone to actually do it.

**Detected by:** A dated item in `spec/smoke.md` §7 and an entry in `AGENT_LOG.md` on the day it is done.

---

## Pinned conventions

Every choice below could reasonably go two ways. Each is pinned. Divergence is a bug, not a style preference.

| Concern | Decision |
|---|---|
| Timezone (storage) | UTC, ISO 8601 with `Z`. Example: `2026-11-03T04:30:00Z` |
| Timezone (display) | Asia/Kolkata (IST). Every displayed time carries the literal suffix ` IST`. Example: `10:00 IST` |
| Event date display | `3 November 2026` — day, full month, year. Never `03/11/2026` (ambiguous to international visitors reading an IBM-linked page) |
| Schedule time display | 24-hour, zero-padded, with suffix. Example: `14:30 IST` |
| Email normalisation | `trim()` → `toLowerCase()` → `normalize('NFC')`. Stored normalised. The raw form input is discarded, not stored alongside |
| Phone | E.164. Indian numbers stored as `+91XXXXXXXXXX`. Input accepts 10 digits and is normalised by prefixing `+91` |
| Registration ID | ULID, lowercase, generated in the Worker. Example: `01k4h8xq9m2n7p3r5t6v8w0y1z` |
| Error shape | `{ "ok": false, "code": "SCREAMING_SNAKE", "message": "human readable" }`. `message` is safe to render to the user and never contains personal data |
| Success shape | `{ "ok": true, "registrationId": "<ulid>", "duplicate": <bool> }` |
| TS naming | `camelCase` for variables and JSON fields |
| D1 naming | `snake_case` for tables and columns |
| Component files | `PascalCase.tsx`, one exported component per file. Colocated in `components/` |
| Content files | One `.ts` module per page section under `content/`. Merge conflicts in a single large content file are miserable with five contributors |
| Colour usage | Only via tokens from `lib/tokens.ts`. A raw hex literal anywhere else is a bug |
| Type safety | `strict: true`. `any` is prohibited; use `unknown` and narrow |
| Motion | Every animation is wrapped in a `prefers-reduced-motion: no-preference` guard |

---

## Exact values

Constants agents would otherwise recompute slightly differently.

### Design tokens — extracted from the official 2026 deliverables

These are IBM Carbon values, taken from `Hero 1 without title.svg`, `Hero 2 with tile.svg`, `badge-pink.svg`, and `Qiskit_Fall-Fest_2026_Template.pptx`. They are not a guess and are not open to taste.

```
PURPLE_90   = #31135E   /* anchor — dominant surface, 65+ uses in the hero */
MAGENTA_40  = #FF7EB6   /* primary accent — the official badge colour */
PURPLE_60   = #8B3FFC
PURPLE_50   = #A56EFF
PURPLE_40   = #BE95FF
PURPLE_30   = #D4BBFF
MAGENTA_30  = #FFAFD2
BLUE_60     = #0F62FE   /* IBM interactive blue — links and CTAs ONLY, never decorative */
COOL_GRAY_10 = #F2F4F8
GRAY_10     = #F4F4F4
GRAY_100    = #161616   /* body text on light surfaces */
GRAY_70     = #525252
GRAY_80     = #393939
```

Semantic assignment (pinned, so five contributors don't each decide):

```
surface.primary    = PURPLE_90
surface.secondary  = GRAY_10
text.onDark        = GRAY_10
text.onLight       = GRAY_100
text.muted         = GRAY_70
accent.correction  = MAGENTA_40   /* the "actually, here's the truth" highlight */
accent.soft        = MAGENTA_30
interactive        = BLUE_60
```

### Typography

```
FONT_SANS = "IBM Plex Sans", system-ui, sans-serif
FONT_MONO = "IBM Plex Mono", ui-monospace, monospace
```

Weights in use: 200 (ExtraLight), 300 (Light), 400, 500 (Medium), 600 (SemiBold). Confirmed present in the official PPT template. Self-hosted as `.woff2` under `public/fonts/` — see INV-5.

`FONT_MONO` is used for: section labels, all clock times, the countdown, circuit snippets, and qubit-count figures. Nowhere else.

### Content rules

```
BANNED_ADJECTIVES = [
  "revolutionary", "game-changing", "cutting-edge", "powerful",
  "seamless", "exponentially faster", "unlimited", "infinite",
  "solve any problem", "tries every answer at once"
]
```

The last two are specifically banned because they are the myths the site exists to correct.

### Blocked hostnames (INV-5)

```
BLOCKED_HOSTS = [
  "google-analytics.com", "googletagmanager.com", "analytics.google.com",
  "fonts.googleapis.com", "fonts.gstatic.com",
  "connect.facebook.net", "static.hotjar.com", "cdn.segment.com",
  "vercel-insights.com", "plausible.io", "static.cloudflareinsights.com"
]
```

`fonts.googleapis.com` is on this list deliberately. Self-host.

### Operational limits

```
PROD_URL            = https://qff-2026-mitadt.pages.dev   /* confirm exact subdomain at M0-OPS-01; pages.dev names are globally unique */
EVENT_DATE_UTC      = 2026-11-03
DATA_DELETION_DATE  = 2027-01-02
EXPECTED_REGISTRATIONS = 300        /* design point; revisit at 800 */
D1_FREE_ROW_LIMIT   = 5,000,000 rows read/day — not a binding constraint here
WORKER_FREE_LIMIT   = 100,000 requests/day — not binding
TURNSTILE_LIMIT     = 1,000,000 verifications/month — not binding
SHEETS_API_LIMIT    = 300 write requests/minute/project — not binding at our volume
```

**The binding constraint is none of the above.** It is IBM Quantum Open Plan queue depth during Part 2 — see `spec/architecture.md` §8.

```
IBMQ_OPEN_PLAN_FREE   = 10 minutes QPU runtime per rolling 28-day window, per account
IBMQ_OPEN_PLAN_PROMO  = +180 minutes over 12 months, for accounts with 20+ minutes logged
IBMQ_OPEN_BACKEND     = ibm_kingston (Heron r2, 156 qubits) available on Open Plan
```

Re-verify before publishing any hardware claim on the page — these are current as of September 2026 and IBM changes them.

---

## Reference examples

| Input | Expected output |
|---|---|
| `"  Pushkar@Example.COM "` | `"pushkar@example.com"` |
| `"9876543210"` | `"+919876543210"` |
| `"+91 98765 43210"` | `"+919876543210"` |
| Second submit of `pushkar@example.com` | `{"ok":true,"registrationId":"<original ulid>","duplicate":true}` — HTTP 200, no new row |
| Payload without `ageConfirmed` | `{"ok":false,"code":"AGE_NOT_CONFIRMED","message":"Please confirm you are 18 or older."}` — HTTP 400 |
| `sessionChoice` not one of the three allowed values | `{"ok":false,"code":"INVALID_SESSION_CHOICE","message":"Choose which sessions you'll attend."}` — HTTP 400 |
| Failed Turnstile token | `{"ok":false,"code":"CHALLENGE_FAILED","message":"Verification failed. Please try again."}` — HTTP 403 |
| D1 write throws | `{"ok":false,"code":"STORE_UNAVAILABLE","message":"We couldn't save your registration. Please email qquest@mitadt.edu.in and we'll add you manually."}` — HTTP 503, payload emailed to organiser inbox |

Footer attribution line, verbatim:

```
Qiskit and Qiskit Fall Fest are IBM marks. This event is organized by QQuEST at MIT Art, Design and Technology University, Pune.
```

---

## Never do this

- **Never render the success state before the Worker responds 200** — because INV-1 is the whole point of the registration path. Await the response.
- **Never use `mode: 'no-cors'`** — because the response becomes opaque and you cannot distinguish success from failure. Configure CORS on the Worker properly.
- **Never add a date-of-birth, age, or guardian field** — because it creates a minor data path that this project has deliberately designed out (INV-4). Route under-18s offline.
- **Never log, fixture, or commit a real email address** — because a key or a PII row committed once is in git history permanently, and rewriting history on a shared repo breaks everyone's clone.
- **Never put a secret in `next.config.js`, a `NEXT_PUBLIC_*` variable, or any client file** — because everything in the client bundle is public. Worker secrets go in `wrangler secret put`.
- **Never add an analytics script, even a privacy-friendly one** — because INV-5 is a stated commitment on a site about honesty, and minors visit the page.
- **Never re-export, re-trace, or recolour a Qiskit brand asset** — because they are IBM marks used under a programme licence (INV-9). Compose around them.
- **Never soften content into marketing copy** — because INV-8 is the concept. If a sentence needs a superlative to work, the sentence is weak; find the number instead.
- **Never submit a preview URL anywhere external** — because it dies and leaves a dead link on IBM's page permanently (INV-7).
- **Never build an admin dashboard** — because the Sheets mirror already is one, your non-technical organisers already know how to use it, and it is the clearest scope-creep risk in this project. See `spec/product.md` §5.

---

## Changing this file

Requires explicit approval from Pushkar Kumar. An agent proposing a change here stops and asks; it does not edit and report.
