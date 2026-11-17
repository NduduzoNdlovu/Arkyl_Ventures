import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ContentCard } from "@/components/site/content-card";
import { businessServices } from "@/data/public-content";

export const metadata = { title: "Business Services | Arkyl Ventures", description: "Explore business startup assistance, documentation, company profiles and business support." };

export default function BusinessServicesPage() {
  return <>
    <PageHero eyebrow="BUSINESS SERVICES" title="Build a stronger" accent="business foundation." description="Starting and running a business involves many moving parts. Explore practical support with business setup, documentation, administration, consulting and digital workflows." primaryLabel="Discuss your business needs" primaryHref="/contact" secondaryLabel="Explore technology" secondaryHref="/technology-it" />
    <section className="page-section section-container"><div className="page-section-heading"><span className="section-kicker">WAYS WE CAN SUPPORT YOU</span><h2>Make the next business step <span>clearer.</span></h2><p>Choose an area to learn more. Service scope and availability are confirmed during your enquiry.</p></div>
      <div className="content-card-grid">{businessServices.map((service, index) => <ContentCard key={service.slug} number={String(index + 1).padStart(2, "0")} icon={service.icon} title={service.title} description={service.description} href={`/services/${service.slug}`} />)}</div>
      <p className="compliance-note">Business registration assistance is administrative support and does not replace official CIPC processes or guarantee registration or approval. Financing enquiries are not loan approvals; eligibility, affordability and any applicable regulatory requirements must be assessed by the relevant provider.</p>
    </section>
    <section className="page-callout section-container"><div><span className="section-kicker">LET&apos;S TALK BUSINESS</span><h2>Start with a <span>conversation.</span></h2><p>Tell us where you are in your business journey and what kind of support you are looking for.</p></div><Link className="button button-primary" href="/contact">Make an enquiry <ArrowUpRight size={17} /></Link></section>
  </>;
}
