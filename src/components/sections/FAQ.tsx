"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Settings, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: "item-1",
    question: "What is your standard engineering stack?",
    answer: "My core system is built on TypeScript, React, Next.js (App Router), and Node.js for absolute structural integrity. I employ Tailwind CSS for pixel-perfect geometric layout fidelity, combined with PostgreSQL or Firebase Firestore for persistent, low-latency, and high-throughput data layers. No unvetted or redundant dependencies are permitted in production.",
    systemId: "SYS-STACK-01"
  },
  {
    id: "item-2",
    question: "How do you guarantee system reliability under load?",
    answer: "Every build is subject to rigorous static analysis, strict Type Safety, and automated regression test suites. I design architectures to fail gracefully, utilizing modular sandboxing, automated scaling policies, and low-latency client-side caching to ensure 99.9% uptime and prevent performance degradation.",
    systemId: "SYS-PERF-02"
  },
  {
    id: "item-3",
    question: "What does an \"Architectural Audit\" entail?",
    answer: "A comprehensive, non-destructive review of your existing code and databases. I profile query execution speeds, map complete dependency trees, audit security perimeters, and isolate legacy memory leaks. You receive a structured, prioritized road map for immediate performance and security hardening.",
    systemId: "SYS-AUDIT-03"
  },
  {
    id: "item-4",
    question: "Do you sign Non-Disclosure Agreements (NDAs)?",
    answer: "Yes. Under standard operational protocol, all intellectual property, proprietary system blueprints, and client-side data streams remain strictly confidential. Secure communication channels are initialized and maintained for all enterprise agreements.",
    systemId: "SYS-CONF-04"
  },
  {
    id: "item-5",
    question: "How are project milestones and deliveries structured?",
    answer: "We operate in high-velocity, two-week engineering sprints. Every cycle delivers a fully compiling, deployable artifact with updated API documentation, automated test logs, and version control logs. You maintain complete visibility over the development ledger.",
    systemId: "SYS-MILE-05"
  },
  {
    id: "item-6",
    question: "Can you integrate with existing legacy systems?",
    answer: "Yes. I specialize in system migrations and legacy integrations with zero operational downtime. I design custom API adapters and robust middleware layers to gracefully decouple legacy databases and transition your core logic to typed, modern frameworks.",
    systemId: "SYS-LEGA-06"
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#FAFAFA] border-b-2 border-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 border-l-8 border-black pl-8 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tighter">
                System <span className="text-primary">Queries</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl font-body">
              Frequently asked questions regarding architectural standards, operational protocols, 
              and development sprints.
            </p>
          </div>
          <div className="hidden xl:flex items-center gap-2 px-4 py-2 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-headline font-bold uppercase select-none">
            <Settings className="w-4 h-4 text-primary animate-spin" />
            <span>Status: Operational / Ready</span>
          </div>
        </div>

        {/* Content Box */}
        <div className="border-2 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="border-2 border-black bg-white transition-all px-6 py-2 rounded-none [&[data-state=open]]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] [&[data-state=open]]:border-primary"
              >
                <AccordionTrigger className="hover:no-underline hover:text-primary font-headline font-bold uppercase text-left text-sm md:text-base md:py-6 tracking-wide flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-bold text-muted-foreground shrink-0 select-none bg-muted px-2 py-1 border border-black/10">
                      {item.systemId}
                    </span>
                    <span>{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-black/80 leading-relaxed pt-2 pb-6 border-t border-dashed border-black/20 mt-2">
                  <p className="max-w-4xl">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
