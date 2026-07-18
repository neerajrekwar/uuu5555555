import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";

export default function ContactPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Contact />
      </main>
    </div>
  );
}
