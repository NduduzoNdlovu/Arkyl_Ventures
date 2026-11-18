import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Monitor,
  ShoppingBag,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ContentCard } from "@/components/site/content-card";

export const metadata = {
  title: "Contact | Arkyl Ventures",
  description:
    "Get in touch with Arkyl Ventures about technology, business services and products.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT ARKYL VENTURES"
        title="Tell us what you"
        accent="have in mind."
        description="Whether you need technology support, business assistance or information about a product, start by choosing the area that best describes your enquiry."
      />
      <section className="page-section section-container">
        <div className="page-section-heading">
          <span className="section-kicker">WHAT CAN WE HELP WITH?</span>
          <h2>
            Choose a starting <span>point.</span>
          </h2>
          <p>
            These links will take you to the relevant service or product
            information so you can identify what you need before making contact.
          </p>
        </div>
        <div className="principle-grid contact-options">
          <ContentCard
            icon={Monitor}
            title="Technology & IT"
            description="Support, repairs, websites, software, networking and other technology requirements."
            href="/technology-it"
            linkLabel="Explore technology services"
          />
          <ContentCard
            icon={BriefcaseBusiness}
            title="Business services"
            description="Business startup assistance, documentation, profiles, administration and consulting."
            href="/business-services"
            linkLabel="Explore business services"
          />
          <ContentCard
            icon={ShoppingBag}
            title="Products & shopping"
            description="Explore the shop categories and product areas being introduced to the Arkyl catalogue."
            href="/shop"
            linkLabel="Explore the shop"
          />
        </div>
      </section>
      <section className="page-callout section-container">
        <div>
          <span className="section-kicker">WHERE POSSIBILITIES BEGIN</span>
          <h2>
            We&apos;re ready to understand <span>your next step.</span>
          </h2>
          <p>
            Direct contact details and enquiry submission will be connected
            through the platform settings and request workflow in a later
            development phase.
          </p>
        </div>
        <Link className="button button-primary" href="/about">
          Learn about Arkyl <ArrowUpRight size={17} />
        </Link>
      </section>
    </>
  );
}
