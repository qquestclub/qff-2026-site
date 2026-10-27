import SectionContainer from "@/components/common/SectionContainer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { sessions } from "@/content/sessions";

export default function SectionSessions() {
    return (
        <section id="sessions" className="py-20 lg:py-32 bg-foreground">
            <SectionContainer>

                    <SectionLabel number="05" label="Sessions" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white">Event Sessions</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {sessions
                            .sort((a, b) => a.order - b.order)
                            .map((session) => (
                                <div key={session.id} className="border border-gray-200 rounded-lg p-6 bg-white">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-gray-900">{session.title}</h3>
                                        <span className="text-xs font-mono text-primary">{session.format}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{session.duration}</p>
                                    <p className="text-gray-700 mt-4">{session.description}</p>
                                    <p className="text-sm text-gray-500 mt-4">{session.audience}</p>
                                </div>
                            ))}
                    </div>

            </SectionContainer>
        </section>
    );
}