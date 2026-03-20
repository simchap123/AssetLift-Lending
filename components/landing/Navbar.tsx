'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

const PROGRAMS = [
  { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
  { label: 'Ground-Up Construction', href: '/loans/ground-up-construction' },
  { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
  { label: 'Bridge Loans', href: '/loans/bridge' },
];

const RESOURCES = [
  { label: 'Blog', href: '/blog' },
  { label: 'Markets', href: '/markets' },
  { label: 'Fix & Flip Calculator', href: '/tools/fix-and-flip-calculator' },
  { label: 'DSCR Calculator', href: '/tools/dscr-calculator' },
  { label: 'FAQ', href: '/faq' },
];

function DropdownMenu({
  label,
  items,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  items: { label: string; href: string }[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-xl py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size={36} className="md:hidden" />
            <Logo size={42} className="hidden md:block" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu
              label="Programs"
              items={PROGRAMS}
              open={openDropdown === 'programs'}
              onToggle={() => setOpenDropdown(openDropdown === 'programs' ? null : 'programs')}
              onClose={() => setOpenDropdown(null)}
            />
            <DropdownMenu
              label="Resources"
              items={RESOURCES}
              open={openDropdown === 'resources'}
              onToggle={() => setOpenDropdown(openDropdown === 'resources' ? null : 'resources')}
              onClose={() => setOpenDropdown(null)}
            />
            <Link
              href="/markets"
              className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
            >
              Markets
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/team"
              className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
            >
              Team
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <a
              href="tel:+19296392284"
              className="text-foreground/90 hover:text-primary transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4" />
            </a>
            <ThemeToggle />
            <Button asChild size="sm" className="px-6 font-bold shadow-[0_0_20px_hsl(45,93%,47%,0.3)] hover:shadow-[0_0_30px_hsl(45,93%,47%,0.5)] hover:scale-105 transition-all duration-200">
              <Link href="/apply">Get Funded</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-border bg-background"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col gap-1">
              <p className="px-2 py-1 text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Programs
              </p>
              {PROGRAMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-border my-2" />

              <p className="px-2 py-1 text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Resources
              </p>
              {RESOURCES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-border my-2" />

              <Link
                href="/markets"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Markets
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/team"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                href="/how-it-works"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="tel:+19296392284"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>

              <div className="mt-2 px-2">
                <Button asChild className="w-full">
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Funded
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
