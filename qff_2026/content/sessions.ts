export interface Session {
    id: string;
    order: number;
    title: string;
    duration: string;
    format: string;
    description: string;
    audience: string;
}

// Sessions matching the two-day hybrid agenda (3 and 4 November 2026)
export const sessions: Session[] = [
    {
        id: "ibm-keynotes",
        order: 1,
        title: "Day 1: IBM Keynote Sessions & Q&A",
        duration: "2 hours (two 1h sessions + Q&A)",
        format: "Keynote & Discussion",
        description:
            "Two one-hour sessions led by confirmed IBM speaker Surya Vamsi Miriyala covering quantum computing foundations, hardware roadmaps, and enterprise adoption, with 10–15 min Q&A following each session.",
        audience: "All attendees, no physics background required"
    },
    {
        id: "interactive-exploration",
        order: 2,
        title: "Day 1: Interactive Quantum Exploration",
        duration: "~2 hours",
        format: "Interactive Session",
        description:
            "Guided interactive discussion and live demonstrations exploring quantum principles, addressing common misconceptions, and answering audience questions.",
        audience: "All attendees"
    },
    {
        id: "circuits-algorithms",
        order: 3,
        title: "Day 2: Circuits, Hardware Basics & Algorithms",
        duration: "~2 hours",
        format: "Hands-on Workshop",
        description:
            "Hands-on session constructing quantum circuits with Qiskit, analyzing gate operations, simulating noise, and testing fundamental quantum algorithms.",
        audience: "Attendees comfortable with Python basics; laptop required"
    },
    {
        id: "quantum-technologies",
        order: 4,
        title: "Day 2: Quantum Technologies Overview",
        duration: "30–60 min",
        format: "Technical Session",
        description:
            "An architectural overview of quantum technologies, qubit modalities, physical implementation constraints, and NISQ-era systems.",
        audience: "All attendees"
    },
    {
        id: "closing-challenge",
        order: 5,
        title: "Day 2: Closing Hands-on Challenge",
        duration: "~2 hours",
        format: "Hands-on Challenge",
        description:
            "A structured coding challenge where participants apply Qiskit to solve quantum circuit exercises and verify their solutions, concluding with event wrap-up.",
        audience: "Hands-on workshop attendees; laptop required"
    }
];