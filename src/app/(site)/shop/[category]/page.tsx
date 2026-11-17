import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, PackageSearch } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { shopCategories } from "@/data/public-content";

export function generateStaticParams() { return shopCategories.map((category) => ({ category: category.slug })); }

export default async function ShopCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = shopCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  return <>
    <PageHero eyebrow="ARKYL SHOP / CATEGORY" title={category.title} accent="at Arkyl." description={category.description} primaryLabel="Ask about availability" primaryHref="/contact" secondaryLabel="All shop categories" secondaryHref="/shop" />
    <section className="page-section section-container"><div className="page-section-heading"><span className="section-kicker">CATEGORY OVERVIEW</span><h2>Choose with <span>confidence.</span></h2><p>{category.detail}</p></div><div className="category-empty-state glass-card"><span className="category-empty-icon"><PackageSearch size={27} /></span><div><span className="shop-label">PRODUCTS WILL APPEAR HERE</span><h3>This category does not have published product listings yet.</h3><p>When products are added and published, they will be displayed here with their images, prices, specifications and availability information.</p><Link className="text-link" href="/contact">Enquire about this category <ArrowUpRight size={16} /></Link></div></div></section>
  </>;
}
