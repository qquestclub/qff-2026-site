export interface SpeakerImage {
    src: string;
    alt: string;
    path?: string;
}

export interface Speaker {
    id: string;
    name: string;
    role: string;
    affiliation: string;
    bio: string;
    session: string;   // references a Session id
    isPlaceholder: boolean; // true = not yet confirmed, must be swapped before launch
    image?: {
        src: string;
        alt: string;
        path?: string;
    };
}

export const speakers: Speaker[] = [
    {
        id: "surya-vamsi-miriyala",
        name: "Surya Vamsi Miriyala",
        role: "IBM Quantum Ambassador | Worldwide Product Manager - Asset Lifecycle Management",
        affiliation: "IBM India Software Labs, Bengaluru",
        bio: "Surya Vamsi Miriyala is a Worldwide Product Manager at IBM India Software Labs, where he leads global go-to-market strategy for Asset Lifecycle Management solutions, helping enterprises leverage technology to drive innovation and business transformation. As an IBM Quantum Associate Ambassador, Surya is passionate about advancing quantum education and bridging the gap between quantum research and enterprise adoption. Surya holds an Executive MBA from the Indian Institute of Management Ahmedabad (IIMA) and a bachelor's degree in Mechanical Engineering from SASTRA University.",
        session: "ibm-keynotes",
        image: {
            src: "/speakers/Surya_Vamsi_Miriyala.jpg",
            path: "/speakers/Surya_Vamsi_Miriyala.jpg",
            alt: "Surya Vamsi Miriyala — IBM Quantum Ambassador | Worldwide Product Manager - Asset Lifecycle Management"
        },
        isPlaceholder: false
    }
];