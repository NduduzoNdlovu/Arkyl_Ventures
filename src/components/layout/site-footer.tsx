import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArkylMark } from "@/components/site/arkyl-mark";

const footerGroups = [
  { title: "Explore", links: [{ label: "About us", href: "/about" }, { label: "Our work", href: "/portfolio" }, { label: "Contact", href: "/contact" }] },
  { title: "Solutions", links: [{ label: "Technology & IT", href: "/technology-it" }, { label: "Business services", href: "/business-services" }, { label: "Shop", href: "/shop" }] },
  { title: "Information", links: [{ label: "Privacy policy", href: "/privacy" }, { label: "Terms & conditions", href: "/terms" }] },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="brand-lockup" href="/" aria-label="Arkyl Ventures home">
            <ArkylMark />
            <span className="brand-name">ARKYL <strong>VENTURES</strong></span>
          </Link>
          <p>Practical technology and business solutions that move ideas forward.</p>
          <Link className="footer-contact-link" href="/contact">Start a conversation <ArrowUpRight size={16} /></Link>
        </div>
        {footerGroups.map((group) => (
          <div className="footer-link-group" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Arkyl Ventures. All rights reserved.</span>
        <span>Where Possibilities Begin.</span>
      </div>
    </footer>
  );
}
