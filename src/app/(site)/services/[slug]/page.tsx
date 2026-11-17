import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { technologyServices, businessServices } from "@/data/public-content";

const allServices = [...technologyServices, ...businessServices];

export function generateStaticParams() { return allServices.map((service) => ({ slug: service.slug })); }

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = allServices.find((item) => item.slug === slug);
  if (!service) notFound();
  const isTechnology = technologyServices.some((item) => item.slug === slug);
  const parentHref = isTechnology ? "/technology-it" : "/business-services";
  const parentLabel = isTechnology ? "Technology & IT" : "Business Services";
  return <>
    <PageHero eyebrow={parentLabel.toUpperCase()} title={service.title} accent="made practical." description={service.description} primaryLabel="Enquire about this service" primaryHref="/contact" secondaryLabel={`Back to ${parentLabel}`} secondaryHref={parentHref} />
    <section className="page-section section-container service-detail-layout"><div><span className="section-kicker">HOW WE APPROACH IT</span><h2>Start with your <span>requirements.</span></h2><p className="service-detail-intro">Every situation is different. We begin by understanding what you need, the environment you are working in and the outcome you want to achieve. From there, we can discuss the appropriate scope, timing and next steps.</p><div className="service-detail-points"><div><CheckCircle2 size={18} /><span>Understand the requirement and current situation.</span></div><div><CheckCircle2 size={18} /><span>Discuss practical options and expected scope.</span></div><div><CheckCircle2 size={18} /><span>Confirm availability and any quotation before work begins.</span></div></div></div>
      <aside className="service-detail-aside glass-card"><span className="section-kicker">NEXT STEP</span><h3>Let&apos;s understand what you need.</h3><p>Send an enquiry with a little context. We can then confirm whether the service is suitable and discuss the way forward.</p><Link className="button button-primary" href="/contact">Make an enquiry <ArrowUpRight size={17} /></Link><Link className="service-back-link" href={parentHref}><ArrowLeft size={15} /> Browse {parentLabel}</Link></aside></section>
    <section className="service-disclaimer section-container"><p>Service availability, scope, pricing and delivery timeframes are confirmed individually. No outcome is guaranteed until requirements have been reviewed and agreed.</p></section>
  </>;
}
