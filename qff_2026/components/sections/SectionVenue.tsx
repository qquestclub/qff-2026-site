import SectionContainer from "@/components/common/SectionContainer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Image from "next/image";

export default function SectionVenue() {
    return (
        <section id="venue" className="py-20 lg:py-32">
            <SectionContainer>

                <SectionLabel number="10" label="Venue" />
                <h2 className="text-3xl md:text-5xl font-bold mb-12">Getting Here</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            MIT Art, Design and Technology University
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Rajbaug, Loni Kalbhor, Pune, Maharashtra 412201.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-8">
                            Online attendees will receive the Microsoft Teams meeting link after registering.
                        </p>

                        <h4 className="text-lg font-bold text-gray-900 mb-2">Contacts</h4>
                        <p className="text-gray-700 mb-1">QQuEST Team</p>
                        {/* Added mb-8 here to give spacing before the map */}
                        <a href="mailto:qquest@mitadt.edu.in" className="text-primary hover:underline mb-8">
                            qquest@mitadt.edu.in
                        </a>

                        {/* Google Maps Embed */}
                        <div className="w-full h-64 sm:h-80 relative overflow-hidden border border-gray-200">
                            <iframe
                                src="https://maps.google.com/maps?q=MIT%20Art,%20Design%20and%20Technology%20University,%20Pune&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="MIT-ADT University Map"
                            />
                        </div>
                    </div>

                    <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-gray-100 border border-gray-200 overflow-hidden">
                        <Image
                            src="/mit_adt_venue.jpg"
                            alt="Map of MIT-ADT University Campus"
                            fill
                            sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                            className="object-cover"
                        />
                    </div>
                </div>

            </SectionContainer>
        </section>
    );
}