import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ContentCard } from "@/components/site/content-card";
import { shopCategories } from "@/data/public-content";

export const metadata = { title: "Shop | Arkyl Ventures", description: "Explore technology, smartphones, home appliances and furniture categories at Arkyl Ventures." };

export default function ShopPage() {
  return <>
    <PageHero eyebrow="THE ARKYL SHOP" title="Useful products." accent="Considered choices." description="Explore the product areas Arkyl Ventures is building. Product availability and listings will appear as items are added and published to the catalogue." primaryLabel="Explore technology" primaryHref="/shop/technology" secondaryLabel="Ask about a product" secondaryHref="/contact" />
    <section className="page-section section-container"><div className="page-section-heading"><span className="section-kicker">SHOP BY CATEGORY</span><h2>Find the right <span>place to start.</span></h2><p>Our category structure is designed to grow beyond technology as new product ranges become available.</p></div><div className="content-card-grid shop-category-grid">{shopCategories.map((category, index) => <ContentCard key={category.slug} number={String(index + 1).padStart(2, "0")} icon={category.icon} title={category.title} description={category.description} href={`/shop/${category.slug}`} linkLabel="Explore category" />)}</div>
      <div className="shop-catalogue-note"><ShoppingBag size={21} /><div><strong>Catalogue availability</strong><p>Only products that have been added and published will be presented as available for purchase. No sample listings or placeholder prices are shown.</p></div></div>
    </section>
    <section className="page-callout section-container"><div><span className="section-kicker">LOOKING FOR SOMETHING SPECIFIC?</span><h2>Ask us about a <span>product.</span></h2><p>Tell us what you are looking for and we can discuss availability or future sourcing options.</p></div><Link className="button button-primary" href="/contact">Send an enquiry <ArrowUpRight size={17} /></Link></section>
  </>;
}
