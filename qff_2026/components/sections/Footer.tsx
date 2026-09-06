import SectionContainer from "@/components/common/SectionContainer";
/*
*
* TODO: Add more content to the footer, such as social media links, contact information, or additional navigation links. You can also add styling to make the footer more visually appealing.
*
* */
export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            <SectionContainer>
                <div className={"flex flex-col items-center justify-center py-6"}>
                    <h3 className={"text-lg font-semibold"}>Qiskit Fall Fest 2026</h3>
                    <p className={"text-center text-sm text-gray-500"}>
                        &copy; {new Date().getFullYear()} Qiskit Fall Fest 2026. All rights reserved.
                    </p>
                </div>
            </SectionContainer>
        </footer>
    );
}