"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Globe, 
  Clock, 
  Activity, 
  ArrowUpRight 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeString, setTimeString] = useState<string>("");
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/#projects" },
    { label: "Packages", href: "/packages" },
    { label: "Telemetry", href: "/#github-telemetry" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ];

  // Dynamic live clock to avoid SSR hydration mismatch
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Top Utility Information Bar - Desktop Only */}
      <div className="hidden lg:flex w-full bg-black text-[#FAFAFA] border-b-2 border-black text-[11px] font-mono py-2.5 px-6 justify-between items-center select-none">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold uppercase tracking-wider text-[#FAFAFA]">
              STATUS: ACTIVE // STABLE
            </span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-white/70">ENVIRONMENT: NEXTJS_V15_PROD</span>
          <span className="text-white/20">|</span>
          {timeString && (
            <span className="flex items-center gap-1.5 text-[#FAFAFA]">
              <Clock className="w-3.5 h-3.5 text-primary text-[#FF3B30] animate-pulse" />
              <span>LOCAL TIME: {timeString}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-6">
          <a 
            href="mailto:dev.neerajrekwar@gmail.com" 
            className="text-white/80 hover:text-primary hover:underline transition-colors flex items-center gap-1 font-bold"
          >
            <Mail className="w-3 h-3" />
            <span>dev.neerajrekwar@gmail.com</span>
          </a>
          <span className="text-white/20">|</span>
          <div className="flex gap-4 items-center">
            <a 
              href="https://github.com/neerajrekwar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-white hover:scale-110 transition-all"
              title="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://linkedin.com/in/neerajrekwar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-white hover:scale-110 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://x.com/neerajrekwar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-white hover:scale-110 transition-all"
              title="Twitter / X"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="w-full bg-[#FAFAFA] border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            href="/" 
            onClick={handleClose}
            className="h-12 border-2 border-black px-4 flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] group"
            id="nav-logo"
          >
            <span className="font-headline font-black text-xl tracking-tighter uppercase">
              NJR<span className="text-primary group-hover:text-white">.SYS</span>
            </span>
          </Link>

          {/* Desktop Links (lg breakpoint to avoid crowding 7 links) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isHome = link.href === "/";
              const isActive = isHome 
                ? pathname === "/" 
                : pathname === link.href || (link.href.startsWith("/#") && pathname === "/");

              return (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className={`relative font-headline font-bold uppercase text-[11px] tracking-wider py-2 px-3 border-2 border-transparent transition-all rounded-none hover:border-black hover:bg-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none ${
                    isActive ? "text-primary border-b-2 border-b-primary font-extrabold" : "text-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action / Mobile Hamburguer Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden lg:block">
              <Button 
                variant="default" 
                className="rounded-none border-2 border-black bg-[#FF3B30] hover:bg-black hover:text-white text-white font-headline font-black uppercase h-12 px-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all text-xs"
              >
                Hire Me <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={handleToggle}
              aria-label="Toggle Menu"
              className="lg:hidden flex items-center justify-center h-12 w-12 border-2 border-black bg-white hover:bg-neutral-100 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none select-none shrink-0"
            >
              {isOpen ? (
                <X className="w-6 h-6 stroke-[2.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-x-0 top-20 bottom-0 bg-[#FAFAFA] border-t-2 border-black z-40 lg:hidden flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-6 md:p-8 space-y-8 flex-grow">
                {/* Section Header */}
                <div className="border-l-4 border-black pl-4 py-1">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest font-bold">
                    SYSTEM INDEX // NAVIGATION
                  </span>
                </div>

                {/* Vertical Navigation Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {navLinks.map((link, idx) => {
                    const isHome = link.href === "/";
                    const isActive = isHome 
                      ? pathname === "/" 
                      : pathname === link.href || (link.href.startsWith("/#") && pathname === "/");

                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          onClick={handleClose}
                          className={`group flex items-center justify-between p-4 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all ${
                            isActive ? "bg-primary/5 border-primary shadow-primary/30" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-muted-foreground/60 font-bold">
                              0{idx + 1} //
                            </span>
                            <span className={`font-headline font-black uppercase text-lg tracking-wide ${
                              isActive ? "text-primary font-black" : "text-black"
                            }`}>
                              {link.label}
                            </span>
                          </div>
                          <ArrowUpRight className={`w-5 h-5 text-black/40 group-hover:text-primary transition-colors ${
                            isActive ? "text-primary" : ""
                          }`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Metadata & Info Panel (Mobile Drawer Footer) */}
              <div className="bg-black text-[#FAFAFA] border-t-4 border-black p-6 space-y-6">
                
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/60">
                  <div className="space-y-1 border-r border-white/10 pr-2">
                    <p className="uppercase font-bold tracking-wider text-white">STATUS</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse inline-block"></span>
                      <span>ACTIVE // STABLE</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="uppercase font-bold tracking-wider text-white">CHRONO</p>
                    <p className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FF3B30]" />
                      <span>{timeString || "LIVE LEDGER"}</span>
                    </p>
                  </div>
                </div>

                {/* Email Anchor */}
                <div className="border-t border-dashed border-white/20 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-white/50">DIRECT SECURE INBOX</p>
                    <a 
                      href="mailto:dev.neerajrekwar@gmail.com" 
                      className="font-headline font-bold text-sm tracking-wide text-white hover:text-primary hover:underline transition-colors"
                    >
                      dev.neerajrekwar@gmail.com
                    </a>
                  </div>

                  {/* Social Buttons block */}
                  <div className="flex gap-3">
                    {[
                      { icon: <Github className="w-4 h-4" />, href: "https://github.com/neerajrekwar" },
                      { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/in/neerajrekwar" },
                      { icon: <Twitter className="w-4 h-4" />, href: "https://x.com/neerajrekwar" }
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border-2 border-white bg-transparent text-white flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-[2px] active:translate-y-[2px]"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/contact" onClick={handleClose} className="block">
                    <Button 
                      className="w-full rounded-none border-2 border-black bg-primary hover:bg-[#FF3B30] text-white font-headline font-black uppercase py-6 text-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                    >
                      HIRE FOR PROJECT
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

