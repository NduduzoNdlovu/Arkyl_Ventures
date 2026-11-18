import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ServiceParams = { params: Promise<{ slug: string }> };

async function findPublicService(slug: string) {
  return prisma.service.findFirst({
    where: { slug, status: "PUBLISHED", isVisible: true, deletedAt: null, category: { active: true } },
    include: { category: true },
  });
}

export async function generateMetadata({ params }: ServiceParams): Promise<Metadata> {
  const { slug } = await params;
  const service = await findPublicService(slug);
  if (!service) return { title: "Service not found | Arkyl Ventures" };
  return {
    title: service.seoTitle || `${service.name} | Arkyl Ventures`,
    description: service.seoDescription || service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServiceParams) {
  const { slug } = await params;
  const service = await findPublicService(slug);
  if (!service) notFound();
  const parentHref = service.category.slug === "technology-it"
    ? "/technology-it"
    : service.category.slug === "business-services"
      ? "/business-services"
      : `/services/category/${service.category.slug}`;
  const parentLabel = service.category.name;
  return <>
    <PageHero eyebrow={parentLabel.toUpperCase()} title={service.name} accent="made practical." description={service.shortDescription} primaryLabel="Enquire about this service" primaryHref="/contact" secondaryLabel={`Back to ${parentLabel}`} secondaryHref={parentHref} />
    <section className="page-section section-container service-detail-layout"><div>{service.heroImageUrl ? <div className="service-detail-image"><Image src={service.heroImageUrl} alt={`${service.name} service`} width={900} height={520} unoptimized /></div> : null}<span className="section-kicker">HOW WE APPROACH IT</span><h2>Start with your <span>requirements.</span></h2><p className="service-detail-intro">{service.description}</p><div className="service-detail-points"><div><CheckCircle2 size={18} /><span>Understand the requirement and current situation.</span></div><div><CheckCircle2 size={18} /><span>Discuss practical options and expected scope.</span></div><div><CheckCircle2 size={18} /><span>Confirm availability and any quotation before work begins.</span></div></div></div>
      <aside className="service-detail-aside glass-card"><span className="section-kicker">NEXT STEP</span><h3>Let&apos;s understand what you need.</h3><p>Send an enquiry with a little context. We can then confirm whether the service is suitable and discuss the way forward.</p>{service.priceLabel || service.startingPrice ? <p className="service-price-note">{service.priceLabel || `Starting from R${service.startingPrice?.toString()}`}</p> : null}<Link className="button button-primary" href="/contact">Make an enquiry <ArrowUpRight size={17} /></Link><Link className="service-back-link" href={parentHref}><ArrowLeft size={15} /> Browse {parentLabel}</Link></aside></section>
    <section className="service-disclaimer section-container"><p>Service availability, scope, pricing and delivery timeframes are confirmed individually. No outcome is guaranteed until requirements have been reviewed and agreed.</p></section>
  </>;
}
