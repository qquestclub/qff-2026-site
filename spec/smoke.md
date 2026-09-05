# smoke.md — Manual Smoke Checklist

Run before every deploy. ~10 minutes. Catches what automated tests do not.

```
npm run lint && npm run test && npm run build
# site deploys automatically on push to main (Cloudflare Pages)
# worker: cd worker && npx wrangler deploy
```

## 1. Build and config

- [ ] Build completes, zero errors, zero new warnings
- [ ] `next.config.js` still has `output: 'export'` — losing this breaks the deployment model silently
- [ ] No secret in the built output: `grep -rE "(BEGIN PRIVATE KEY|service_account|0x0A|AIza)" out/` returns nothing
- [ ] No email address in the built output outside the intended organiser contacts
- [ ] `git diff --staged` reviewed specifically for credentials
- [ ] Brand checksums unchanged (`sha256sum public/brand/*` against `evals.md` §3)

## 2. Cold start

Private window, no cache, phone on mobile data — not campus wifi.

- [ ] Page loads, no console errors
- [ ] Hero renders; brand asset is not stretched or clipped
- [ ] Countdown shows a plausible number
- [ ] **Network tab: zero requests to any host other than the Pages origin and the Worker.** This is INV-5 and it is the check most likely to catch a regression
- [ ] Fonts load from `/fonts/`, not from a CDN
- [ ] Hard refresh mid-page — nothing breaks

## 3. Core path

- [ ] Every section reachable by scrolling; no section overlaps another
- [ ] Every displayed time carries the ` IST` suffix
- [ ] The event date reads `3 November 2026`, not a numeric format
- [ ] Footer attribution line present, verbatim
- [ ] No placeholder, lorem, TBD, or "coming soon" text anywhere except the deliberate `/register` stub during M0–M1
- [ ] Spot-check three claims in the myths section — each has a number or a source
- [ ] Every external link opens and is not a 404

### From M2 onward

- [ ] Submit a real registration end to end; row appears in D1 **and** in the mirror
- [ ] Submit the same email again — success with `duplicate: true`, no second row
- [ ] Submit without the 18+ checkbox — blocked with a clear message
- [ ] Double-click submit rapidly — exactly one row
- [ ] Turn off wifi mid-submit — error state with the fallback email, **never** a success message
- [ ] The under-18 offline-route text is visible next to the form

## 4. Cross-device

- [ ] Desktop Chrome
- [ ] One non-Chromium browser (Firefox or Safari)
- [ ] Real Android phone, not just devtools emulation
- [ ] 360 px viewport — no horizontal scroll anywhere
- [ ] Landscape phone — hero does not break

The primary user decides in ninety seconds on a mid-range phone. If it is not tested on one, it is not tested.

## 5. Accessibility

- [ ] Full keyboard traversal top to bottom; nothing trapped
- [ ] Visible focus indicators on every interactive element
- [ ] FAQ disclosure operable by keyboard, correct ARIA state
- [ ] `prefers-reduced-motion: reduce` set at OS level — all animation stops, including the hero treatment and the countdown transitions
- [ ] Text contrast on `PURPLE_90` meets AA (check the muted-text token specifically — it is the likely failure)
- [ ] Meaning never carried by colour alone — the myth/correction distinction must survive greyscale
- [ ] Images have alt text; brand illustrations marked decorative where appropriate

## 6. Post-deploy

- [ ] Live URL serves the new build — verify by checking a string you changed, not by trusting the dashboard
- [ ] `PROD_URL` matches exactly what was submitted to IBM; no `-git-`, no preview subdomain (INV-7)
- [ ] From M2: registration works in production, not just locally — the CORS allowlist is the usual failure
- [ ] From M2: D1 row count equals mirror row count

## 7. Scheduled, non-deploy checks

- [ ] **Weekly, until 3 November:** submit one test registration and confirm it reaches both stores. A form that broke three weeks ago and nobody noticed is the realistic disaster here
- [ ] **Weekly:** confirm the IBM listing still points at the correct URL
- [ ] **10 October 2026:** sponsorship gate decision for M3. Either open it or close it permanently — do not leave it ambiguous
- [ ] **2 January 2027:** delete registration data from D1 and the mirror; retain only mailing-list opt-ins as name and email. Log it in `AGENT_LOG.md` (INV-10)

---

## Failure protocol

1. **Roll back first.** Cloudflare Pages → Deployments → the previous deployment → *Rollback*. For the Worker: `npx wrangler rollback`. Do this before diagnosing.
2. **If registration specifically is broken and cannot be fixed within an hour:** swap the register button's `href` to the standing Google Form and redeploy. Do not leave a broken form live while debugging — every minute is lost registrations (INV-1 in spirit as well as letter).
3. Reproduce locally with `wrangler dev --local`. Never debug against the live Sheet.
4. Add a test to `evals.md` that would have caught it.
5. Fix.
6. Re-run this checklist **in full**, not just the failed section.

Every production bug adds an item to this file.
