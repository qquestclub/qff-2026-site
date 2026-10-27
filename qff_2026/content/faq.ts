export interface FaqItem {
    question: string;
    answer: string;
}

export const faqs: FaqItem[] = [
    {
        question: "Is it free?",
        answer: "Yes. Qiskit Fall Fest 2026 at MIT-ADT is completely free to attend."
    },
    {
        question: "Can I attend online?",
        answer: "Yes. Qiskit Fall Fest 2026 is a hybrid event. Registered virtual attendees will receive the Microsoft Teams meeting link directly via email prior to the event. The link is sent to registrants and is not published publicly."
    },
    {
        question: "Do I need a background in quantum mechanics?",
        answer: "No. The Day 1 keynote and interactive sessions introduce quantum computing concepts from scratch. You only need basic familiarity with Python for the Day 2 hands-on workshops."
    },
    {
        question: "Will I get a certificate?",
        answer: "Yes. Official certificates of participation are issued to attendees after completing the post-event feedback form."
    },
    {
        question: "What is the closing hands-on challenge?",
        answer: "The closing hands-on challenge on Day 2 is a structured practical coding activity where participants build and test quantum circuits in Qiskit to reinforce what they have learned across both days."
    },
    {
        question: "Do I need my own quantum hardware?",
        answer: "No. Hands-on exercises run primarily on simulators, which reflect standard quantum development workflows. We also run demonstrations using IBM quantum hardware via cloud access."
    },
    {
        question: "Can I attend if I'm not from MIT-ADT?",
        answer: "Yes. The event is open to students, researchers, and faculty from any college or university."
    },
    {
        question: "What do I need to install beforehand?",
        answer: "You will need a laptop with Python and Qiskit installed if you participate in the hands-on sessions. Refer to the checklist section for step-by-step setup instructions."
    }
];
