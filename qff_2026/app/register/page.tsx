import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/common/SectionContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Mail, ShieldAlert } from "lucide-react";

export const metadata = {
    title: "Register | Qiskit Fall Fest 2026",
    description:
        "Register for Qiskit Fall Fest 2026 at MIT Art, Design and Technology University, Pune (3 and 4 November 2026).",
};

const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSe7TCtOGT9_xKIXn0eGkDWh1JM-f67NZ2BZOFaYsLSHYcz6iQ/viewform";
const COORDINATOR_EMAIL = "qquest.mitadtuniversity@gmail.com";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20 lg:pt-36 lg:pb-32">
            <SectionContainer>
                <div className="max-w-4xl mx-auto flex flex-col gap-8">
                    {/* Back Link */}
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-sm font-mono text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="size-4" />
                            Back to event overview
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col gap-3">
                        <div className="text-primary font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase">
                            01 / Registration
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                            Register for Qiskit Fall Fest 2026
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
                            Join us on <span className="font-semibold text-gray-900">3 and 4 November 2026</span> at MIT
                            Art, Design and Technology University, Pune, or online via Microsoft Teams. Registration is free and open to students,
                            researchers, and faculty from all colleges and universities.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Primary Action Card */}
                        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Official Registration Form
                                </h2>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Submissions are collected directly through our official Google Form. Please complete
                                    the form to confirm your seat and session preferences.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                <a
                                    href={GOOGLE_FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full sm:w-auto"
                                >
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto h-12 px-6 sm:px-8 text-base font-semibold gap-2"
                                    >
                                        Open Registration Form
                                        <ArrowUpRight className="size-5 shrink-0" />
                                    </Button>
                                </a>
                            </div>

                            {/* Key Highlights */}
                            <div className="grid grid-cols-1 gap-2.5 pt-4 border-t border-gray-100 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                                    <span>Free admission, no registration fee</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                                    <span>Open to attendees across all institutions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                                    <span>Laptop required for hands-on sessions</span>
                                </div>
                            </div>

                            {/* QR Code Section */}
                            <div className="flex flex-col items-center sm:items-start gap-3 pt-6 border-t border-gray-100">
                                <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                                    Or scan to register on mobile
                                </span>
                                <div className="bg-white p-2.5 border border-gray-200 rounded-lg shadow-xs">
                                    <Image
                                        src="/register-qr.png"
                                        alt="QR code to open the Qiskit Fall Fest 2026 registration form"
                                        width={200}
                                        height={200}
                                        className="rounded object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Policies & Eligibility Sidebar */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* 18+ Web Registration Policy */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-3 shadow-xs">
                                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                    <ShieldAlert className="size-5 text-primary shrink-0" />
                                    <span>18+ Web Registration Policy</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Web registration is strictly for individuals who are 18 years of age or older on
                                    the event dates (3 and 4 November 2026). Minors cannot register through this form.
                                </p>
                            </div>

                            {/* Under-18 Attendees Route */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-3 shadow-xs">
                                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                    <Mail className="size-5 text-primary shrink-0" />
                                    <span>Under 18 Years of Age?</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Attendees under 18 years must register through our offline coordinator route with
                                    verifiable parental or guardian consent.
                                </p>
                                <div className="pt-2">
                                    <a
                                        href={`mailto:${COORDINATOR_EMAIL}?subject=QFF26%20Under-18%20Registration`}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline break-all"
                                    >
                                        <Mail className="size-4 shrink-0" />
                                        <span>{COORDINATOR_EMAIL}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
}