# Qiskit Fall Fest 2026 — QQuEST × MIT-ADT

The event website for **Qiskit Fall Fest 2026**, hosted by [QQuEST](https://github.com/qquestclub), the quantum computing club at MIT Art, Design and Technology University, Pune.

**3 November 2026 · MIT-ADT Pune · Free · Open to students from any college**

🔗 **Live site:** _(deploying — link here at M0)_

---

## The event

A one-day fest in two parts:

**Quantum 101** (1–2 h) — what quantum computing actually is, what it's genuinely useful for, and what it is *not*. Built specifically to correct the claims people arrive with.

**Hands-on with Qiskit** (2–3 h) — building circuits in Jupyter, running on simulators and on real IBM quantum hardware. Covers universal gates, noise, gate optimisation, transpilation, and the limits of NISQ-era hardware. Ends with a short coding challenge.

No background in physics required. Part 2 assumes basic Python.

---

## About this repo

A static site built with Next.js and deployed on Cloudflare Pages. Registration is handled by a small Cloudflare Worker writing to D1, mirrored to a Google Sheet for the organising team.

**Stack:** Next.js 15 (static export) · TypeScript · Tailwind 4 · Cloudflare Pages, Workers, D1

**Design:** IBM Carbon palette and IBM Plex, taken from the official Qiskit Fall Fest 2026 brand assets.

**No analytics, no trackers, no third-party scripts.** Deliberately — see `spec/decisions.md` D-007.

---

## Repo layout

```
AGENTS.md          rules for AI coding agents — read first if you are one
CONTRACT.md        the invariants that must never break
CONTRIBUTING.md    start here if you're joining the team
BRIEF.md           one page: where the project stands right now
AGENT_LOG.md       session-by-session history
spec/              product, architecture, plan, tasks, evals, smoke, decisions
docs/mockups/      the agreed visual reference (not code)
```

This project uses spec-driven development — the spec is written before the code, and it's what keeps five contributors and several AI agents building the same thing. If you're contributing, **read `CONTRIBUTING.md` first**.

---

## Running locally

```bash
npm install
npm run dev
```

No credentials needed for anything except the registration path.

---

## Contributing

QQuEST members: see [`CONTRIBUTING.md`](./CONTRIBUTING.md). Sections are owned individually — check the ownership table before starting.

Outside contributions aren't being accepted on this repo; it's a time-boxed project for a specific event.

---

## Credits

Organised by QQuEST at MIT Art, Design and Technology University, Pune.

Qiskit and Qiskit Fall Fest are IBM marks. Fall Fest is a series of student-run quantum computing events supported by IBM, held each autumn at universities worldwide.

Brand assets from the official [Qiskit Fall Fest 2026 materials repo](https://github.com/Qiskit-Fall-Fest-2026/materials-resources).
