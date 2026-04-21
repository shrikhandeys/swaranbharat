"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import AccessibilityBar from "./AccessibilityBar";
import { company } from "@/data/company";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Utility bar — accessibility + translate + quick contact */}
      <div className="bg-brand-navy-950 text-white">
        <div className="container-x flex items-center justify-between py-1.5 text-xs">
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${company.contact.phone}`}
              className="flex items-center gap-1 hover:text-brand-gold-400"
            >
              <Phone size={12} aria-hidden="true" />
              {company.contact.phone}
            </a>
            <a
              href={`mailto:${company.contact.email}`}
              className="flex items-center gap-1 hover:text-brand-gold-400"
            >
              <Mail size={12} aria-hidden="true" />
              {company.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2 md:ml-auto">
            <AccessibilityBar />
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="bg-[var(--background)] border-b border-[var(--border)] shadow-sm">
        <div className="container-x flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3" aria-label={company.name}>
            <Image
              src="/logo.png"
              alt={`${company.name} logo`}
              width={64}
              height={64}
              className="h-14 w-14 object-contain"
              priority
            />
            <div className="leading-tight">
              <div className="font-serif text-lg md:text-xl font-bold text-brand-navy-900 dark:text-brand-gold-400">
                SWARANBHARAT
              </div>
              <div className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-brand-navy-700 dark:text-brand-gold-300">
                EXPORTSARATHI
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:text-brand-gold-600 hover:bg-[var(--muted)] rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact#inquiry"
              className="ml-2 inline-flex items-center gap-2 rounded-md bg-brand-gold-500 px-4 py-2 text-sm font-semibold text-brand-navy-950 hover:bg-brand-gold-600 transition-colors"
            >
              Get Quote
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-[var(--muted)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav
            aria-label="Mobile navigation"
            className="lg:hidden border-t border-[var(--border)] bg-[var(--background)]"
          >
            <div className="container-x py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-[var(--muted)]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact#inquiry"
                onClick={() => setMobileOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-md bg-brand-gold-500 px-4 py-2.5 text-sm font-semibold text-brand-navy-950"
              >
                Get Quote
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
