export interface ScheduleItem {
    id: string;
    day: 1 | 2;
    timeIso: string;
    title: string;
    description?: string;
}

// 3 and 4 November 2026
// UTC times: 09:30 IST is 04:00 UTC
export const schedule: ScheduleItem[] = [
    // Day 1 — 3 November 2026
    {
        id: "checkin-d1",
        day: 1,
        timeIso: "2026-11-03T04:00:00Z",
        title: "Check-in & Welcome",
        description: "Arrive at the venue or connect to Microsoft Teams, and get ready for the day."
    },
    {
        id: "keynote-1",
        day: 1,
        timeIso: "2026-11-03T04:30:00Z",
        title: "Session 1: Quantum Computing Foundations",
        description: "First 1-hour session by Surya Vamsi Miriyala (IBM Quantum Ambassador) covering quantum fundamentals and principles."
    },
    {
        id: "qa-1",
        day: 1,
        timeIso: "2026-11-03T05:30:00Z",
        title: "Q&A & Discussion 1",
        description: "15-minute audience Q&A on quantum concepts with the IBM speaker."
    },
    {
        id: "keynote-2",
        day: 1,
        timeIso: "2026-11-03T05:45:00Z",
        title: "Session 2: Enterprise Adoption & Industry Impact",
        description: "Second 1-hour session by Surya Vamsi Miriyala on enterprise use cases, workforce readiness, and real-world adoption."
    },
    {
        id: "qa-2",
        day: 1,
        timeIso: "2026-11-03T06:45:00Z",
        title: "Q&A & Discussion 2",
        description: "15-minute audience Q&A on industry applications and quantum careers."
    },
    {
        id: "lunch-d1",
        day: 1,
        timeIso: "2026-11-03T07:00:00Z",
        title: "Lunch Break",
    },
    {
        id: "interactive-d1",
        day: 1,
        timeIso: "2026-11-03T08:00:00Z",
        title: "Interactive Quantum Exploration",
        description: "Guided interactive session exploring quantum principles, addressing common misconceptions, and open discussion."
    },

    // Day 2 — 4 November 2026
    {
        id: "welcome-d2",
        day: 2,
        timeIso: "2026-11-04T04:00:00Z",
        title: "Day 2 Check-in & Environment Check",
        description: "Recap of Day 1 and laptop setup verification for the hands-on tracks."
    },
    {
        id: "circuits-algorithms",
        day: 2,
        timeIso: "2026-11-04T04:30:00Z",
        title: "Circuits, Hardware Basics & Algorithms",
        description: "Hands-on workshop in Qiskit: constructing quantum circuits, gates, simulation, and core algorithms."
    },
    {
        id: "lunch-d2",
        day: 2,
        timeIso: "2026-11-04T06:30:00Z",
        title: "Lunch Break",
    },
    {
        id: "quantum-technologies",
        day: 2,
        timeIso: "2026-11-04T07:30:00Z",
        title: "Quantum Technologies & Architectures",
        description: "A 60-minute technical session on physical qubit modalities, hardware architectures, and current systems."
    },
    {
        id: "closing-challenge",
        day: 2,
        timeIso: "2026-11-04T08:30:00Z",
        title: "Closing Hands-on Challenge & Wrap-up",
        description: "Consolidate learning with a hands-on Qiskit coding challenge, followed by closing remarks and certificate feedback instructions."
    }
];
