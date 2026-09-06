"use client";
import SectionContainer from "@/components/common/SectionContainer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {ArrowRight, MenuIcon} from "lucide-react";
import React from "react";

// sample links for the navbar, you can replace them with your own links
const nav_links: { name: string; href: string }[] = [
    {name: "Home", href: "/"},
    {name: "About", href: "#"},
    {name: "Schedule", href: "#"},
    {name: "Speakers", href: "#"},
    {name: "FAQ", href: "#"},
];

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <nav className={"fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 "}>
            <SectionContainer>
                <div className={"flex items-center justify-between h-16 w-full"}>
                    <div className={"flex items-center gap-2"}>
                        {/*Logo*/}
                        {/*Title*/}
                        <h3 className={"text-xl font-bold"}>Qiskit Fall Fest 2026</h3>
                    </div>
                    <div className={"hidden md:flex items-center gap-5"}>
                        {/* links */}
                        <ul className={"flex items-center gap-2"}>
                            {
                                nav_links.map(({ name, href }) => (
                                    <Link key={name} href={href}>
                                        <li className={"text-sm font-medium text-gray-700 hover:text-primary"}>{name}</li>
                                    </Link>
                                ))
                            }
                        </ul>
                        {/*CTA Btn*/}
                        <Button>
                            Register <ArrowRight />
                        </Button>
                    </div>
                    <div className={"md:hidden"}>
                        <Button onClick={() => setIsOpen(!isOpen)} variant={'outline'}>
                            <MenuIcon/>
                        </Button>

                    </div>

                        {isOpen && (
                            <div className={"md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 py-4 px-3"}>
                                <ul className={"flex flex-col items-center gap-2"}>
                                    {
                                        nav_links.map(({ name, href }) => (
                                            <Link key={name} href={href}>
                                                <li className={"text-sm font-medium text-gray-700 hover:text-primary"}>{name}</li>
                                            </Link>
                                        ))
                                    }
                                </ul>
                                {/*CTA Btn*/}
                                <Button className={"mt-4 w-full"}>
                                    Register <ArrowRight />
                                </Button>
                            </div>
                        )}

                </div>
            </SectionContainer>
        </nav>
    );
}