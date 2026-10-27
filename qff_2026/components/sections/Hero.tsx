"use client";
import SectionContainer from "@/components/common/SectionContainer";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the countdown with SSR disabled.
// This prevents Next.js hydration errors since the server and client times will differ.
const Countdown = dynamic(() => import("@/components/ui/Countdown"), {
    ssr: false,
    loading: () => <div className="min-h-15 mt-8 sm:mt-10" />
});


export default function Hero() {
    return (
        <section
            className="bg-foreground min-h-screen flex items-center justify-center py-20 lg:py-0"
            id="hero"
        >
            {/* Plain, non-flex wrapper: keeps SectionContainer's own mx-auto from
                fighting the flex parent's stretch/grow, so its width behaves
                identically here and inside Navbar. */}
            <div className="w-full">
                <SectionContainer>
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 text-white">

                        {/* Hero Content */}
                        <div className="flex flex-col items-center md:items-start justify-center w-full lg:max-w-3xl">

                            <div className="text-purple-300 font-mono text-xs sm:text-sm">
                                01 / Overview
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-4 sm:mt-5">
                                Qiskit Fall Fest 2026
                            </h1>

                            <p className="text-base sm:text-lg lg:text-xl mt-4 sm:mt-5 text-purple-300 leading-relaxed">
                                <span className="text-destructive font-bold">
                                    3 and 4 November 2026
                                </span>{" "}
                                MIT Art, Design and Technology University, Pune & Online (Hybrid)
                            </p>

                            <p className="text-base sm:text-lg lg:text-xl mt-4 sm:mt-5 leading-relaxed max-w-2xl">
                                A two-day hybrid quantum computing event: IBM keynote sessions,
                                hands-on circuits, quantum technologies, and a closing challenge.
                            </p>

                            {/* Render Isolated Countdown Component */}
                            <Countdown
                                targetDate="2026-11-03T09:00:00+05:30"
                                className="mt-8 sm:mt-10"
                            />

                            <Link href="/register">
                                <Button className="rounded-none py-5 sm:py-6 px-8 sm:px-10 mt-8 sm:mt-10">
                                    Register
                                    <ArrowRight />
                                </Button>
                            </Link>
                        </div>

                        {/* Hero Image */}
                        <div className="shrink-0">
                            <Image
                                loading={"eager"}
                                height={300}
                                width={300}
                                alt="Qiskit Brand Logo"
                                src="/brand/qiskit_white.svg"
                                className="w-48 sm:w-60 md:w-72 lg:w-75 h-auto"
                            />
                        </div>
                    </div>
                </SectionContainer>
            </div>
        </section>
    );
}