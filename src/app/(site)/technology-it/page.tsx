import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ContentCard } from "@/components/site/content-card";
import { getServiceIcon } from "@/components/site/service-icon";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Technology & IT Services | Arkyl Ventures",
  description:
    "Explore IT support, repairs, networking, website development and custom digital solutions from Arkyl Ventures.",
};

export default async function TechnologyPage() {
  const category = await prisma.serviceCategory.findFirst({
    where: { slug: "technology-it", active: true },
    include: {
      services: {
        where: { status: "PUBLISHED", isVisible: true, deletedAt: null },
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { name: "asc" }],
      },
    },
  });
  const services = category?.services ?? [];
  return (
    <>
      <PageHero
        eyebrow="TECHNOLOGY & IT"
        title="Technology that"
        accent="works for you."
        description="From everyday technical support to websites, software and connected business tools, explore practical technology services shaped around your requirements."
        primaryLabel="Discuss your requirements"
        primaryHref="/contact"
        secondaryLabel="View the shop"
        secondaryHref="/shop/technology"
      />
      <section className="page-section section-container">
        <div className="page-section-heading">
          <span className="section-kicker">OUR TECHNOLOGY SERVICES</span>
          <h2>
            Support for the tools <span>you depend on.</span>
          </h2>
          <p>
            Explore the areas where we can assist. The exact scope, availability
            and quotation are confirmed after we understand your requirements.
          </p>
        </div>
        {services.length ? (
          <div className="content-card-grid">
            {services.map((service, index) => (
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
        ) : (
          <div className="service-empty-state">
            <h3>Technology services are being updated.</h3>
            <p>Please contact us to discuss your requirements.</p>
            <Link className="button button-primary" href="/contact">
              Contact Arkyl Ventures <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </section>
      <section className="page-callout section-container">
        <div>
          <span className="section-kicker">NOT SURE WHERE TO START?</span>
          <h2>
            Tell us what is <span>not working.</span>
          </h2>
          <p>
            Share the challenge or outcome you have in mind. We can help
            identify a sensible next step.
          </p>
        </div>
        <Link className="button button-primary" href="/contact">
          Make an enquiry <ArrowUpRight size={17} />
        </Link>
      </section>
    </>
  );
}
