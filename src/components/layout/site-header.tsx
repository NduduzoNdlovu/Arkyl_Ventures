"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ArkylMark } from "@/components/site/arkyl-mark";

const links = [
  { label: "Home", href: "/" },
  { label: "Technology & IT", href: "/technology-it" },
  { label: "Business Services", href: "/business-services" },
  { label: "All Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-lockup" href="/" aria-label="Arkyl Ventures home" onClick={() => setMenuOpen(false)}>
          <ArkylMark />
          <span className="brand-name">ARKYL <strong>VENTURES</strong></span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.label}>{link.label}</Link>
          ))}
        </nav>

        <Link className="header-cta" href="/contact">
          Get started <ArrowUpRight size={16} strokeWidth={1.8} />
        </Link>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>{link.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Get started <ArrowUpRight size={16} /></Link>
        </nav>
      )}
    </header>
  );
}
