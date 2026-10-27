# Qiskit Fall Fest 2026 — QQuEST × MIT-ADT

The event website for **Qiskit Fall Fest 2026**, hosted by [QQuEST](https://github.com/qquestclub), the quantum computing club at MIT Art, Design and Technology University, Pune.

**3 and 4 November 2026 · MIT-ADT Pune & Online (Hybrid) · Free · Open to students from any college**

🔗 **Live site:** https://qff-2026-site.vercel.app

---

## The event

A two-day hybrid fest:

**Day 1 (3 November 2026)** — Keynote sessions by confirmed IBM speaker Surya Vamsi Miriyala covering quantum computing foundations, hardware roadmaps, and enterprise adoption with dedicated Q&A, followed by an interactive quantum exploration session.

**Day 2 (4 November 2026)** — Hands-on circuits, hardware basics, and quantum algorithms in Qiskit, a technical session on quantum technologies and architectures, and a closing hands-on challenge.

No background in physics required. Hands-on sessions assume basic Python.

---

## About this repo

A static site built with Next.js, deployed on Vercel. The registration backend is undecided — see `spec/decisions.md` D-002, D-013.

**Stack:** Next.js · TypeScript · Tailwind 4 · Vercel. Registration backend: undecided — see `spec/decisions.md` D-002, D-013

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
