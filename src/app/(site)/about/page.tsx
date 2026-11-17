import { ArrowUpRight, Compass, Handshake, Lightbulb, Target } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { ContentCard } from "@/components/site/content-card";

export const metadata = { title: "About Us | Arkyl Ventures", description: "Get to know Arkyl Ventures and our approach to technology and business solutions." };

export default function AboutPage() {
  return <>
    <PageHero eyebrow="ABOUT ARKYL VENTURES" title="A practical partner for" accent="what comes next." description="Arkyl Ventures brings technology and business support together. We focus on understanding the challenge, explaining the options and helping people and businesses take practical next steps." primaryLabel="Explore our solutions" primaryHref="/technology-it" secondaryLabel="Contact us" secondaryHref="/contact" />
    <section className="page-section section-container"><div className="page-section-heading"><span className="section-kicker">OUR PURPOSE</span><h2>Make useful solutions <span>more accessible.</span></h2><p>We are building a business that can respond to changing needs across technology, digital services, retail and business support.</p></div><div className="principle-grid">
      <ContentCard icon={Target} title="Understand first" description="We start by understanding what you need, what is getting in the way and what a useful outcome looks like." />
      <ContentCard icon={Lightbulb} title="Keep it practical" description="We aim for clear recommendations and solutions that make sense for the situation and available resources." />
      <ContentCard icon={Handshake} title="Work with care" description="Good communication and a considered approach matter from the first conversation through delivery." />
      <ContentCard icon={Compass} title="Keep moving forward" description="Our goal is to help customers make informed decisions and take the next step with greater confidence." />
    </div></section>
    <section className="page-callout section-container"><div><span className="section-kicker">OUR TAGLINE</span><h2>Where Possibilities <span>Begin.</span></h2><p>Whether you are solving a technology problem, starting a business or looking for a useful product, we want to make the next step clearer.</p></div><Link className="button button-primary" href="/contact">Start a conversation <ArrowUpRight size={17} /></Link></section>
  </>;
}
