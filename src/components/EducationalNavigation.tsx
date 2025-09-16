"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, ChevronDown, Menu, X, BookOpen, Users, 
  Shield, FileText, Phone, Info, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { 
    name: "How It Works", 
    href: "/how-it-works",
    icon: BookOpen,
    description: "Learn about tokenization"
  },
  {
    name: "For Property Owners",
    href: "/property-owners",
    icon: Building2,
    description: "Unlock your equity"
  },
  {
    name: "For Investors",
    href: "/investors",
    icon: Users,
    description: "Start investing from €500"
  },
  {
    name: "The Technology",
    href: "/technology",
    icon: Shield,
    description: "Security & compliance"
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
    dropdown: [
      { name: "Our Story", href: "/about/story" },
      { name: "Team", href: "/about/team" },
      { name: "Partners", href: "/about/partners" },
      { name: "Careers", href: "/about/careers" },
    ]
  },
  {
    name: "Resources",
    href: "/resources",
    icon: FileText,
    dropdown: [
      { name: "White Paper", href: "/resources/whitepaper" },
      { name: "FAQ", href: "/resources/faq" },
      { name: "Blog", href: "/resources/blog" },
      { name: "Glossary", href: "/resources/glossary" },
    ]
  }
];

export default function EducationalNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Trust Bar */}
      <div className="bg-primary-light border-b border-primary/10 py-2">
        <div className="container-width">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-primary" />
                <span className="text-primary font-medium">MiCA Compliant</span>
              </span>
              <span className="hidden sm:flex items-center gap-2">
                <Globe className="w-3 h-3 text-primary" />
                <span className="text-foreground-secondary">Swedish Financial Authority Registered</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/contact" className="text-primary hover:text-primary-hover font-medium">
                Contact Us
              </Link>
              <span className="text-foreground-secondary">🇸🇪 Stockholm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={cn(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        scrolled && "shadow-md"
      )}>
        <div className="container-width">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-foreground">TerraBlock</span>
                <span className="block text-xs text-foreground-secondary">Nordic Real Estate Innovation</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
                      pathname === item.href
                        ? "bg-primary-light text-primary"
                        : "text-foreground hover:bg-background-secondary"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                    {item.dropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>

                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-border py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-primary-light hover:text-primary transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/consultation" className="btn-secondary text-sm">
                Schedule Consultation
              </Link>
              <Link href="/waitlist" className="btn-primary text-sm">
                Join Waitlist
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="container-width py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md transition-all",
                      pathname === item.href
                        ? "bg-primary-light text-primary"
                        : "text-foreground hover:bg-background-secondary"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-foreground-secondary">{item.description}</div>
                      )}
                    </div>
                  </Link>
                  {item.dropdown && (
                    <div className="ml-12 space-y-1 mt-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 text-sm text-foreground-secondary hover:text-primary"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/consultation" className="block btn-secondary text-center text-sm">
                  Schedule Consultation
                </Link>
                <Link href="/waitlist" className="block btn-primary text-center text-sm">
                  Join Waitlist
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}