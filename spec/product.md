# product.md — QFF26 Site (QQuEST × MIT-ADT)

## 1. One-line definition

A public event site that lets a student anywhere in Pune find out what Qiskit Fall Fest 2026 at MIT-ADT actually is, decide whether it's for them, and register — and that leaves behind a permanent, honest reference on what quantum computing can and cannot do.

## 2. The problem

Two problems, and the second one is the interesting one.

**The logistical problem:** the event needs registrations, and IBM needs a URL to list. Without a site there is no front door, and the fest reaches only the people QQuEST can message directly.

**The real problem:** every quantum outreach event in the country runs into the same wall — the audience arrives with expectations set by headlines. They think quantum computers try every answer at once, that encryption breaks next year, that this is a general-purpose speedup. The 2026 cohort's sites do not address this; they announce dates and list schedules. Part 1 of this fest exists specifically to correct the record, and the site should do the same work rather than being a poster for it.

**What exists already:** roughly fifteen other Fall Fest 2026 community sites. The median is a single scrolling page — hero, about, schedule, register, contact. Two are notably better. QTC × USTHB Algiers has a genuine creative concept and a section built from the 2026 theme. DBATU Lonere, in the same state and a week earlier, has a countdown, a QR code, an attendee PDF, and a five-question FAQ. Neither has any content that survives the event date, and none of the fifteen tells a visitor anything true about quantum that they did not already believe.

## 3. Target user

**Primary:** an undergraduate in Pune — MIT-ADT or any other college — who is curious about quantum computing, has written some Python, and has no idea whether this event is for beginners or for physics postgraduates. They are deciding in about ninety seconds on a phone.

**Secondary:** faculty and the IBM speaker, who will look at the site to judge whether this is a serious event. Also QQuEST's own future members, who will find this page long after November.

**Explicitly not the target:** quantum researchers looking for a technical programme, recruiters, and the general public with no computing background. Copy assumes basic programming literacy and assumes nothing about physics.

## 4. Core promise

> After visiting this site, someone can state what quantum computing actually does, name one thing it is falsely claimed to do, and know exactly whether the fest is for them and what to install before they arrive.

Everything gets measured against that sentence. A section that does not serve it is a candidate for deletion.

## 5. Non-goals

Point here when scope creep is proposed.

- **No admin dashboard.** The Google Sheet mirror is the admin interface. It has filtering, sharing, comments and export, and non-technical organisers already know how to use it. Building a UI for ~300 rows over nine weeks is the clearest scope-creep risk in this project.
- **No user accounts, login, or auth.** Nobody signs in. There is nothing to sign in to.
- **No CMS.** Content lives in typed TS modules in the repo. Five contributors and a nine-week runway do not justify a content backend.
- **No hackathon surfaces until sponsorship is confirmed.** Team registration, submissions, judging and a leaderboard are specced (M3) and gated. Building them speculatively is the single most likely cause of the site shipping late.
- **No under-18 registration path in software.** Deliberate, permanent design decision. See `CONTRACT.md` INV-4.
- **No analytics or tracking.** See INV-5. This is a commitment, not an oversight.
- **No mobile app, no PWA, no offline mode.** It is an event page.
- **No multi-language.** English only. Revisit never for this event.

## 6. Success metrics

Ranked. Only the top one drives decisions.

1. **Attendees who show up on 3 November** — target 120 in the room, of which at least 30 from outside MIT-ADT. This is the number that matters; everything else is a proxy.
2. **Registrations completed** — target 250. Secondary because registration is cheap and attendance is not.
3. **Part 2 starts on time** — the workshop begins with people running circuits, not creating accounts. Binary, judged on the day.

Note: the form deliberately does **not** ask whether someone already has an IBM Quantum account, so #3 is not measurable in advance. The pre-event checklist section carries that job instead. If you want it measurable, adding the field is a schema change — decide before M2, not after.

**Anti-metric — do not optimise:** page views, or registration count on its own. Both rise when you spam WhatsApp groups, and both rise while the room stays empty. A site optimised for registrations rather than attendance will over-promise, and the gap shows up as an empty hall and a disappointed IBM speaker. If registrations are climbing and the outside-college share is falling, the site is getting worse, not better.

## 7. Kill criteria

Not applicable to the site — the fest happens on 3 November regardless, so the site ships in some form.

The scope-level kill criteria:

- **M3 (hackathon) dies** if sponsorship is not confirmed by **10 October 2026**. That is three weeks out, which is the last point at which the surfaces can be built and tested honestly. After that date, M3 is closed regardless of what sponsors say, and the fest runs as two sessions.
- **The in-house registration form dies** if the Worker is not passing its evals by **28 September 2026**. Fallback is the standing Google Form; the button's `href` changes and nothing else does.

## 8. Glossary

- **Fest** — the 3 November 2026 event as a whole.
- **Part 1** — Quantum 101, 1–2 h. Introduces quantum technologies and quantum computing; explains real-world applications; explicitly covers what quantum is *not* and corrects hype and misinformation.
- **Session choice** — a registrant may attend Part 1 only, Part 2 only, or both (D-010). Stored as `session_choice`.
- **Part 2** — Hands-on with Qiskit, 2–3 h. Building circuits in Jupyter, simulators for simple tasks, real IBM hardware via free-tier API keys, universal gates, noise, gate optimisation, transpilation, NISQ-era hardware limits, closing with a short practical coding challenge.
- **QQuEST** — the quantum computing club at MIT-ADT, the host community.
- **Registrant** — a person who submitted the form. Not a "user"; there are no accounts.
- **The mirror** — the Google Sheet copy of D1. Derived, never authoritative.
- **Offline route** — the coordinator-mediated paper process for under-18 attendees. Not a code path.
- **The concept** — the site's editorial direction: quantum stated precisely, hype corrected with numbers. Enforced as INV-8.
