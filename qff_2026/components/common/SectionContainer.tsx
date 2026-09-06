import React from "react";

/**
 * This is a common component that wraps the content of a section in a container with a maximum width and horizontal padding. It is used to ensure that the content is centered and has consistent spacing on different screen sizes.
 */

export default function SectionContainer({children}: {children: React.ReactNode}) {
    return (
        <div className={"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
            {children}
        </div>
    );
}