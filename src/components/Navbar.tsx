"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall, Settings2 } from "lucide-react";
import { Button } from "./ui/button";
import { AccessibilityPanel } from "./AccessibilityPanel";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About Us", href: "#about" },
    { name: "Hearing Aids", href: "#services" },
    { name: "Treatments", href: "#services" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm text-center md:flex md:justify-between md:px-8">
        <p className="hidden md:block">
          Now located at 8936 Northpointe Executive Park Drive, Suite 195, Huntersville, NC 28078
        </p>
        <div className="flex items-center justify-center space-x-2">
          <PhoneCall size={14} />
          <span className="font-semibold">(704) 237-4099</span>
        </div>
      </div>

      {/* STICKY HEADER / NAVBAR */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
          isScrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-semibold tracking-tight text-primary">
              Birkdale Audiology - (Prototype)
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => setIsPanelOpen(true)}
              className="flex items-center space-x-2 bg-slate-100/80 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold transition-colors border border-slate-200 shadow-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              aria-label="Open Accessibility Options"
            >
              <Settings2 size={16} />
              <span>Accessibility</span>
            </button>
            <Button asChild>
              <Link href="#contact">Book Appointment</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white px-4 py-4 space-y-4 shadow-lg absolute w-full left-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-foreground/80 font-medium py-2 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-4">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsPanelOpen(true);
                }}
                className="flex items-center justify-center space-x-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold transition-colors border shadow-sm"
              >
                <Settings2 size={18} />
                <span>Accessibility Options</span>
              </button>
              <Button asChild className="w-full">
                <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Book Appointment
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Accessibility Menu */}
      <AccessibilityPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
}
