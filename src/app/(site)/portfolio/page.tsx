import { ArrowUpRight, Layers3 } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";

export const metadata = {
  title: "Portfolio | Arkyl Ventures",
  description: "Selected projects and work from Arkyl Ventures.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR PORTFOLIO"
        title="Ideas shaped into"
        accent="useful work."
        description="This is where Arkyl Ventures will present selected websites, software, digital experiences and business solutions as projects are completed and approved for publication."
        primaryLabel="Discuss a project"
        primaryHref="/contact"
        secondaryLabel="Explore technology"
        secondaryHref="/technology-it"
      />
      <section className="page-section section-container">
        <div className="page-section-heading">
          <span className="section-kicker">SELECTED WORK</span>
          <h2>
            Work that reflects <span>real needs.</span>
          </h2>
          <p>
            Project case studies will be added here as publishable work becomes
            available. We will not display invented client projects or
            placeholder testimonials.
          </p>
        </div>
        <div className="portfolio-empty glass-card">
          <span className="portfolio-empty-icon">
            <Layers3 size={27} />
          </span>
          <div>
            <span className="shop-label">PORTFOLIO IN PROGRESS</span>
            <h3>Our project stories will appear here.</h3>
            <p>
              Each published case study can explain the challenge, the approach,
              the solution and the outcome, with relevant visuals where
              permission has been obtained.
            </p>
          </div>
        </div>
      </section>
      <section className="page-callout section-container">
        <div>
          <span className="section-kicker">HAVE A PROJECT IN MIND?</span>
          <h2>
            Let&apos;s explore <span>what&apos;s possible.</span>
          </h2>
          <p>
            Tell us what you are trying to achieve and we can discuss a
            practical starting point.
          </p>
        </div>
        <Link className="button button-primary" href="/contact">
          Talk about your project <ArrowUpRight size={17} />
        </Link>
      </section>
    </>
  );
}
