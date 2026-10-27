import SectionContainer from "@/components/common/SectionContainer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScheduleRow } from "@/components/ui/ScheduleRow";
import { schedule } from "@/content/schedule";

export default function SectionSchedule() {
    const day1Schedule = schedule.filter((item) => item.day === 1);
    const day2Schedule = schedule.filter((item) => item.day === 2);

    return (
        <section id="schedule" className="py-20 lg:py-32 bg-gray-50">
            <SectionContainer>
                <div className="max-w-4xl">
                    <SectionLabel number="07" label="Schedule" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-12">Event Schedule</h2>

                    <div className="space-y-12 sm:space-y-16">
                        {/* Day 1 Group */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-xs">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 sm:pb-6 mb-2 sm:mb-4 border-b border-gray-200 gap-1 sm:gap-2">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    Day 1
                                </h3>
                                <span className="font-mono text-sm sm:text-base text-primary font-semibold">
                                    3 November 2026
                                </span>
                            </div>

                            <div className="flex flex-col">
                                {day1Schedule.map((item) => (
                                    <ScheduleRow
                                        key={item.id}
                                        timeIso={item.timeIso}
                                        title={item.title}
                                        description={item.description}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Day 2 Group */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-xs">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 sm:pb-6 mb-2 sm:mb-4 border-b border-gray-200 gap-1 sm:gap-2">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    Day 2
                                </h3>
                                <span className="font-mono text-sm sm:text-base text-primary font-semibold">
                                    4 November 2026
                                </span>
                            </div>

                            <div className="flex flex-col">
                                {day2Schedule.map((item) => (
                                    <ScheduleRow
                                        key={item.id}
                                        timeIso={item.timeIso}
                                        title={item.title}
                                        description={item.description}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}