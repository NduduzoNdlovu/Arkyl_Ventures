import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ContentCard } from "@/components/site/content-card";
import { getServiceIcon } from "@/components/site/service-icon";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Our Services | Arkyl Ventures",
  description: "Browse the services currently offered by Arkyl Ventures.",
};

export default async function ServicesDirectoryPage() {
  const categories = await prisma.serviceCategory.findMany({
    where: {
      active: true,
      services: {
        some: { status: "PUBLISHED", isVisible: true, deletedAt: null },
      },
    },
    include: {
      services: {
        where: { status: "PUBLISHED", isVisible: true, deletedAt: null },
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { name: "asc" }],
      },
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <>
      <PageHero
        eyebrow="ARKYL SERVICE DIRECTORY"
        title="Practical support for"
        accent="what comes next."
        description="Explore the service areas currently offered by Arkyl Ventures. New categories and services can be introduced as the business grows."
        primaryLabel="Discuss your needs"
        primaryHref="/contact"
        secondaryLabel="About Arkyl"
        secondaryHref="/about"
      />
      <section className="page-section section-container">
        {categories.length ? (
          categories.map((category) => (
            <div className="service-directory-section" key={category.id}>
              <div className="page-section-heading">
                <span className="section-kicker">SERVICE CATEGORY</span>
                <h2>{category.name}</h2>
                {category.description ? <p>{category.description}</p> : null}
                <Link
                  className="text-link"
                  href={`/services/category/${category.slug}`}
                >
                  View this category <ArrowUpRight size={15} />
                </Link>
              </div>
              <div className="content-card-grid">
                {category.services.slice(0, 6).map((service, index) => (
                  <ContentCard
                    key={service.id}
                    number={String(index + 1).padStart(2, "0")}
                    icon={getServiceIcon(service.icon)}
                    title={service.name}
                    description={service.shortDescription}
                    href={`/services/${service.slug}`}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="service-empty-state">
            <h3>Our service catalogue is being updated.</h3>
            <p>Contact us and tell us what you need help with.</p>
            <Link className="button button-primary" href="/contact">
              Contact Arkyl Ventures <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
