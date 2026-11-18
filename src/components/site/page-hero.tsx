import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: PageHeroProps) {
  return (
    <section className="page-hero section-container">
      <ScrollReveal className="page-hero-copy">
        <span className="section-kicker">
          <span className="eyebrow-line" />
          {eyebrow}
        </span>
        <h1>
          {title} <span>{accent}</span>
        </h1>
        <p>{description}</p>
        {(primaryLabel && primaryHref) || (secondaryLabel && secondaryHref) ? (
          <div className="page-hero-actions">
            {primaryLabel && primaryHref ? (
              <Link className="button button-primary" href={primaryHref}>
                {primaryLabel}
                <ArrowUpRight size={17} />
              </Link>
            ) : null}
            {secondaryLabel && secondaryHref ? (
              <Link className="button button-outline" href={secondaryHref}>
                {secondaryLabel}
                <ArrowUpRight size={17} />
              </Link>
            ) : null}
          </div>
        ) : null}
      </ScrollReveal>
      <ScrollReveal className="page-hero-aside glass-card" delay={0.12}>
        <span className="page-hero-aside-mark">AV</span>
        <span className="page-hero-aside-label">ARKYL VENTURES</span>
        <strong>Where Possibilities Begin.</strong>
        <span className="page-hero-aside-line" />
        <small>Technology · Business · Possibility</small>
      </ScrollReveal>
    </section>
  );
}
