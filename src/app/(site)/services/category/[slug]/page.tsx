import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ContentCard } from "@/components/site/content-card";
import { getServiceIcon } from "@/components/site/service-icon";
import { prisma } from "@/lib/prisma";

type CategoryParams = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

async function findPublicCategory(slug: string) {
  return prisma.serviceCategory.findFirst({
    where: { slug, active: true, services: { some: { status: "PUBLISHED", isVisible: true, deletedAt: null } } },
    include: { services: { where: { status: "PUBLISHED", isVisible: true, deletedAt: null }, orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { name: "asc" }] } },
  });
}

export async function generateMetadata({ params }: CategoryParams): Promise<Metadata> {
  const { slug } = await params;
  const category = await findPublicCategory(slug);
  return category ? { title: `${category.name} | Arkyl Ventures`, description: category.description || `Explore ${category.name} services from Arkyl Ventures.` } : { title: "Service category not found | Arkyl Ventures" };
}

export default async function ServiceCategoryPage({ params }: CategoryParams) {
  const { slug } = await params;
  const category = await findPublicCategory(slug);
  if (!category) notFound();
  return <>
    <PageHero eyebrow="SERVICE CATEGORY" title={category.name} accent="made practical." description={category.description || `Explore the ${category.name} services currently offered by Arkyl Ventures.`} primaryLabel="Discuss your requirements" primaryHref="/contact" secondaryLabel="All services" secondaryHref="/services" />
    <section className="page-section section-container"><div className="page-section-heading"><span className="section-kicker">AVAILABLE SERVICES</span><h2>Explore this <span>service category.</span></h2></div><div className="content-card-grid">{category.services.map((service, index) => <ContentCard key={service.id} number={String(index + 1).padStart(2, "0")} icon={getServiceIcon(service.icon)} title={service.name} description={service.shortDescription} href={`/services/${service.slug}`} />)}</div><p className="service-category-footer"><Link className="text-link" href="/services">Browse all service categories <ArrowUpRight size={15} /></Link></p></section>
  </>;
}
