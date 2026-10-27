import Image from "next/image";
import { Speaker } from "@/content/speakers";

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
    const imageSrc = speaker.image?.src || speaker.image?.path;

    return (
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center relative">
            {speaker.isPlaceholder && (
                <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                    Placeholder
                </span>
            )}
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt={speaker.image?.alt || `${speaker.name} — ${speaker.role}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover"
                />
            ) : (
                <div className="h-20 w-20 rounded-full bg-gray-100" />
            )}
            <h3 className="mt-4 font-semibold text-gray-900">{speaker.name}</h3>
            <p className="text-sm text-gray-600">{speaker.role}, {speaker.affiliation}</p>
            <p className="text-sm text-gray-700 mt-3">{speaker.bio}</p>
        </div>
    );
}