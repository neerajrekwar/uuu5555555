import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Packages } from "@/components/sections/Packages";
import { GitHubStats } from "@/components/sections/GitHubStats";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { TechMarquee } from "@/components/sections/TechMarquee";

export default function Home() {
  return (
    <div className="bg-[#FAFAFA]">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Projects />
        <Packages />
        <GitHubStats />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    
    </div>
  );
}