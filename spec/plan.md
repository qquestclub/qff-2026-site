# plan.md — Milestones

Sequential. Do not start M(n+1) before M(n)'s exit criteria are met.

**Currently active: M0.**

Today is 4 September 2026. The fest is 3 November 2026 — **60 days**. Estimates assume roughly 10 combined person-hours per week across the tech team; this figure is provisional (see `architecture.md` §9) and every estimate below should be re-checked once real throughput is known after M0.

---

## M0 — Live and submittable ⏱ 3–5 days · cost ₹0

First because IBM needs a URL and because a project that cannot ship on day one will not ship on day sixty. Everything else is content poured into a pipeline that already works.

**Deliverables**
- Repo created, spec system committed, pointer files in place
- Next.js 15 static export building clean
- Design tokens file with the Carbon palette and Plex fonts self-hosted
- Cloudflare Pages project deploying from `main` to `qff26-mitadt.pages.dev`
- Holding page: hero with official brand asset, date, venue line, one-sentence concept, countdown, "registrations open soon", footer attribution
- `/register` route existing as a "Coming soon" stub
- URL submitted to the IBM Airtable

**Exit criteria**
- [ ] `https://qff26-mitadt.pages.dev` returns 200 and renders the hero on a phone
- [ ] Zero third-party network requests in the browser network tab (INV-5)
- [ ] Footer attribution line present, verbatim
- [ ] Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95
- [ ] `grep` of `.next/` output finds no string from `BLOCKED_HOSTS`
- [ ] `public/brand/` files byte-identical to upstream (INV-9)
- [ ] The production URL — not a preview URL — is what was submitted to IBM (INV-7)

**Risk:** submitting a preview URL by copying it from the browser during a test deploy. One community in this cohort submitted a localhost address and another a branch-preview URL; both are permanently broken on IBM's page. Read INV-7 before submitting anything.

---

## M1 — The site says something true ⏱ 2.5 weeks · target 25 September

The content milestone. This is where the project either differentiates or becomes the thirteenth identical Fall Fest page. Most of the work here is writing, not code.

**Deliverables**
- All twelve landing sections built and populated (structure in `product.md` §4 and `tasks.md`)
- `content/myths.ts` — 4 myth/correction pairs, each with a number or a source
- `content/decade.ts` — 2016–2026, claimed versus achieved each year
- Part 1 and Part 2 detail sections
- Schedule with clock times in IST
- FAQ — free, no background needed, no hardware needed, certificate, who can attend
- Pre-event checklist — IBM Quantum account, laptop, Qiskit install
- Venue, map, named contacts with real email addresses
- Speakers section with the IBM speaker

**Exit criteria**
- [ ] Every section renders correctly at 360 px with no horizontal scroll
- [ ] Every claim in `myths.ts` and `decade.ts` carries a number or a linked source (INV-8)
- [ ] Zero banned adjectives across all `content/` modules — lint passes
- [ ] Zero placeholder or lorem text reachable in production
- [ ] Every displayed time carries the ` IST` suffix
- [ ] Full keyboard traversal of the page; visible focus rings
- [ ] `prefers-reduced-motion` honoured by every animation
- [ ] Lead has reviewed and approved every content module as a story, not a task

**Risk:** the myths and decade sections get deferred because they are writing rather than coding, and the site ships as a schedule with a hero. If those two sections are cut, the project has no differentiator and M1 has not actually closed.

---

## M2 — Registration works, provably ⏱ 1 week · target 30 September

**Deliverables**
- D1 database with the schema in `architecture.md` §3
- Worker: validate → Turnstile → normalise → D1 insert → Sheets mirror → response
- Email-on-failure fallback path
- Registration form with real error states, not just a success path
- Turnstile widget integrated
- Resync job for rows where `mirrored_at IS NULL`
- Standing Google Form kept ready as the cold fallback

**Exit criteria**
- [ ] All invariant tests INV-1-T through INV-5-T pass (`evals.md` §3)
- [ ] All negative tests N-01 through N-08 pass (`evals.md` §4)
- [ ] Ten real submissions from three different devices land in both D1 and the mirror
- [ ] Worker forced to 500 → UI shows the error state with the fallback email, never success
- [ ] Same email submitted twice concurrently → exactly one row, two 200 responses, matching `registrationId`
- [ ] Schema contains no age, DOB, or guardian column (INV-4)
- [ ] Grep of Worker source and logs finds no email address in any log statement (INV-3)
- [ ] D1 row count equals mirror row count

**Risk:** the Google service-account credential ends up committed while someone is making the Sheets call work. Read the secrets rule in `AGENTS.md` §4 first. If it happens, the key is compromised permanently — rotate it, do not just delete the commit.

**Kill switch:** if these criteria are not met by 28 September, swap the register button to the Google Form and move on. Recorded in `product.md` §7.

---

## M3 — Hackathon surfaces ⏱ 1.5 weeks · **GATED**

**This milestone does not open unless sponsorship is confirmed by 10 October 2026.** Until then it does not exist, is not built, and is not implied anywhere in site copy. If the date passes without confirmation, M3 is closed permanently and the fest runs as two sessions — which is a fine outcome, not a failure.

**Deliverables (if the gate opens)**
- Team registration: second table, 2–4 members, one team lead
- Problem statement page, published at the opening ceremony not before
- Submission capture — repo URL and a short description. No file upload; R2 is not set up and adding it is out of scope
- Judging: a private Sheet tab. Not a UI.

**Exit criteria**
- [ ] A team of 4 registers, appears once in D1 and once in the mirror
- [ ] A submission is captured and visible to judges
- [ ] All M2 invariants still hold — the registration path was not regressed

**Risk:** the strong temptation is to build this in September "so we're ready". Doing so is what makes M1 and M2 slip. The gate exists precisely to resist that.

---

## M4 — Post-event, the part nobody else does ⏱ 1 week · target 10 November

Every other site in the cohort is dead on 4 November. This milestone is what makes the URL worth the permanent link on IBM's page.

**Deliverables**
- Workshop notebooks published in a public repo, linked from the site
- Session recording embedded (`youtube-nocookie.com` only — INV-5)
- Photos, attendance number stated honestly
- Certificates issued by mail-merge from the mirror
- Site header changed to past tense; registration closed

**Exit criteria**
- [ ] Notebooks run clean from a fresh environment
- [ ] Recording reachable and embedded without third-party cookies
- [ ] Certificates sent, count matches the attendance number stated on the page
- [ ] Deletion task scheduled for 2 January 2027 (INV-10)

---

## Sequencing rules

- **M0 blocks everything.** Nothing is real until it deploys.
- **M1 blocks M2.** Do not open registration for an event the page cannot yet describe. People who register from a thin page do not turn up.
- **M2 blocks M3.** Do not build team registration on a personal registration path that has not passed its evals.
- **M3 is gated on an external condition, not on M2 finishing early.**
- **Do not skip M1's myths and decade sections.** They are the only reason this site differs from the other fourteen, and they are the first thing that gets cut when a deadline looms because they are writing rather than code.

## Anti-goals for the current stage

Things that will feel productive and are not, until M1 is complete:

- **Choosing a backend framework.** Django, Nest, Express — all rejected in `decisions.md` D-004. There is one POST endpoint.
- **Building an admin dashboard.** Rejected in D-005. The Sheet is the dashboard.
- **Designing a scalable frontend architecture.** There are twelve sections on a one-page site. Tokens plus a component inventory plus lead review is the whole answer; anything more is ceremony.
- **Setting up CI/CD pipelines, Docker, or a monorepo.** Cloudflare Pages builds from a git push.
- **Building hackathon surfaces before the sponsorship gate.**
- **Adding a live registration counter, a Discord widget, or an Instagram embed.** Each is a third-party request, each breaks INV-5.
- **Polishing animations before the copy is written.** The copy is the product here.
- **Buying a domain.** A free-for-one-year student-pack domain becomes a dead link on IBM's permanent listing in 2027. See D-003.

If you find yourself doing one of these, check which milestone is active.
