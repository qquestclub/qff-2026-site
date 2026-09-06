import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div>
      {/*Navbar*/}
      <Navbar/>
      {/*Main Content*/}
      <main className={"min-h-screen"}>
          {/* add sections here, every section component should have a SectionContainer wrapper for consistent spacing and alignment */}
        <h1>Main Content</h1>
        <p>This is the main content of the home page.</p>
      </main>
      {/*Footer*/}
      <Footer/>
    </div>
  );
}
