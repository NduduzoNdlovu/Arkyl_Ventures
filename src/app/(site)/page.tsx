import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ServiceIcon } from "@/components/site/service-icon";
import { HeroShowcase } from "@/components/site/hero-showcase";
import { InfiniteMarquee } from "@/components/site/infinite-marquee";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const benefits = [
  "Solutions shaped around your requirements",
  "Clear communication from enquiry to delivery",
  "Practical support for individuals and businesses",
];

const technologyStack = [
  { label: "TypeScript", mark: "TS" },
  { label: "JavaScript", mark: "JS" },
  { label: "C#", mark: "C#" },
  { label: "PHP", mark: "PHP" },
  { label: "SQL", mark: "SQL" },
  { label: "HTML5", mark: "5" },
  { label: "CSS3", mark: "CSS" },
  { label: "Python", mark: "PY" },
  { label: "Java", mark: "JV" },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [technologyServices, businessServices, showcaseServices] = await Promise.all([
    prisma.service.findMany({
      where: { status: "PUBLISHED", isVisible: true, deletedAt: null, category: { slug: "technology-it", active: true } },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { name: "asc" }],
      take: 4,
    }),
    prisma.service.findMany({
      where: { status: "PUBLISHED", isVisible: true, deletedAt: null, category: { slug: "business-services", active: true } },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { name: "asc" }],
      take: 4,
    }),
    prisma.service.findMany({
      where: { status: "PUBLISHED", isVisible: true, deletedAt: null, category: { active: true } },
      select: {
        id: true,
        name: true,
        slug: true,
        shortDescription: true,
        icon: true,
        category: { select: { name: true } },
      },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { name: "asc" }],
    }),
  ]);

  const serviceMarqueeItems = showcaseServices.map((service) => ({
    label: service.name,
    mark: service.name.slice(0, 2).toUpperCase(),
  }));

  return (
    <>
      <section className="hero-section section-container" aria-labelledby="hero-title">
        <ScrollReveal className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> TECHNOLOGY. BUSINESS. POSSIBILITIES.</div>
          <h1 id="hero-title">Move your ideas <span>forward.</span></h1>
          <p className="hero-description">Technology and business solutions designed to help you work smarter, grow confidently and make more possible.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contact">Let&apos;s get started <ArrowUpRight size={17} /></Link>
            <Link className="button button-quiet" href="/about">Discover Arkyl <ArrowRight size={16} /></Link>
          </div>
          <div className="hero-proof"><span className="proof-dot" /> Practical solutions. Thoughtful service. Room to grow.</div>
        </ScrollReveal>

        <div className="hero-visual" aria-label="Arkyl Ventures featured capabilities">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-image-wrap">
            <Image src="/images/arkyl.png" alt="" fill priority sizes="(max-width: 900px) 80vw, 560px" className="hero-robot" aria-hidden="true" />
          </div>
          <HeroShowcase items={showcaseServices} />
          <div className="hero-side-note">WHERE POSSIBILITIES BEGIN</div>
        </div>

        <div className="hero-bottom-note"><span>01 / 04</span><span>Technology & business solutions</span><span className="hero-bottom-rule" /></div>
      </section>

      <section className="arkyl-experience-strip section-container" aria-label="Arkyl technologies and services">
        <InfiniteMarquee label="TECHNOLOGIES" items={technologyStack} />
        {serviceMarqueeItems.length > 0 ? (
          <InfiniteMarquee label="SERVICES" items={serviceMarqueeItems} reverse />
        ) : null}
      </section>

      <section className="intro-strip section-container" aria-label="Company introduction">
        <p>One partner for <strong>technology, business support</strong> and the tools that help you move forward.</p>
        <Link href="/about" className="text-link">Get to know us <ArrowUpRight size={16} /></Link>
      </section>

      <section className="content-section section-container" id="technology" aria-labelledby="technology-title">
        <ScrollReveal className="section-heading-row">
          <div><span className="section-kicker">01 / TECHNOLOGY & IT</span><h2 id="technology-title">Make technology <span>work for you.</span></h2></div>
          <p>From everyday technical support to custom digital products, we help you get more from the technology you rely on.</p>
        </ScrollReveal>
        <ScrollReveal className="service-grid" delay={0.08}>
          {technologyServices.map((service) => <article className="service-card" key={service.id}><span className="service-icon"><ServiceIcon name={service.icon} size={21} /></span><h3>{service.name}</h3><p>{service.shortDescription}</p><Link href={`/services/${service.slug}`} aria-label={`Explore ${service.name}`}><ArrowUpRight size={17} /></Link></article>)}
          {technologyServices.length === 0 ? <p className="service-empty-state">Technology services will be listed here as they become available.</p> : null}
        </ScrollReveal>
        <div className="section-link-row"><span>Technology solutions for home and business</span><Link className="text-link" href="/technology-it">Explore Technology & IT <ArrowUpRight size={16} /></Link></div>
      </section>

      <section className="business-section" id="business-services" aria-labelledby="business-title">
        <div className="business-inner section-container">
          <ScrollReveal className="business-copy">
            <span className="section-kicker">02 / BUSINESS SERVICES</span>
            <h2 id="business-title">Build a stronger <span>business foundation.</span></h2>
            <p>Getting a business off the ground or keeping it moving takes time, structure and the right support. We help make those next steps clearer.</p>
            <Link className="button button-outline" href="/business-services">Explore business services <ArrowUpRight size={17} /></Link>
          </ScrollReveal>
          <ScrollReveal className="business-list-card glass-card" delay={0.12}>
            <div className="business-list-heading"><BriefcaseBusiness size={19} /><span>Ways we can support you</span></div>
            {businessServices.map((service) => <Link className="business-list-item" key={service.id} href={`/services/${service.slug}`}><CheckCircle2 size={17} /><span>{service.name}</span><ArrowUpRight size={15} /></Link>)}
            {businessServices.length === 0 ? <p className="business-disclaimer">Business services will be listed here as they become available.</p> : null}
            <p className="business-disclaimer">Service availability and scope are confirmed during your enquiry. Official registrations and approvals remain subject to the relevant authorities.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="content-section section-container" id="shop" aria-labelledby="shop-title">
        <ScrollReveal className="section-heading-row">
          <div><span className="section-kicker">03 / THE ARKYL SHOP</span><h2 id="shop-title">Useful products. <span>Considered choices.</span></h2></div>
          <p>Explore technology and everyday products selected to support how you work and live. Our catalogue will grow as new categories become available.</p>
        </ScrollReveal>
        <ScrollReveal className="shop-feature-card" delay={0.08}>
          <div className="shop-feature-icon"><ShoppingBag size={28} /></div>
          <div><span className="shop-label">COMING INTO FOCUS</span><h3>A smarter way to shop for the things you need.</h3><p>Browse product categories, compare options and find the right fit as our online store expands.</p></div>
          <Link className="button button-primary" href="/shop">Explore the shop <ArrowUpRight size={17} /></Link>
        </ScrollReveal>
      </section>

      <section className="why-section section-container" aria-labelledby="why-title">
        <div className="why-heading"><span className="section-kicker">04 / THE ARKYL APPROACH</span><h2 id="why-title">Good work starts with <span>understanding.</span></h2><p>We believe useful solutions begin by listening, understanding the challenge and choosing a practical way forward.</p></div>
        <ScrollReveal className="why-points" delay={0.1}>
          {benefits.map((benefit, index) => <div className="why-point" key={benefit}><span>0{index + 1}</span><p>{benefit}</p><ShieldCheck size={18} /></div>)}
        </ScrollReveal>
      </section>

      <section className="about-preview section-container" id="about" aria-labelledby="about-title">
        <div className="about-preview-mark"><span>AV</span><i>ARKYL VENTURES</i></div>
        <ScrollReveal className="about-preview-copy">
          <span className="section-kicker">ABOUT ARKYL VENTURES</span>
          <h2 id="about-title">A practical partner for <span>what comes next.</span></h2>
          <p>Arkyl Ventures brings technology and business support together under one roof. Our focus is to understand what you need, make the options clear and help you take the next step with confidence.</p>
          <Link className="text-link" href="/contact">Talk to our team <ArrowUpRight size={16} /></Link>
        </ScrollReveal>
      </section>

      <section className="portfolio-preview section-container" id="portfolio" aria-labelledby="portfolio-title">
        <ScrollReveal>
          <div><span className="section-kicker">OUR WORK</span><h2 id="portfolio-title">Built around real <span>business needs.</span></h2><p>As projects are completed, this space will showcase selected websites, digital products and business solutions delivered by Arkyl Ventures.</p></div>
        </ScrollReveal>
        <ScrollReveal className="portfolio-preview-note" delay={0.12}>
          <span className="portfolio-preview-number">01</span>
          <div><strong>Project portfolio</strong><small>Selected work and case studies will be published here.</small></div>
          <Sparkles size={20} />
        </ScrollReveal>
      </section>

      <section className="contact-band section-container" id="contact">
        <ScrollReveal>
          <div><span className="section-kicker">HAVE SOMETHING IN MIND?</span><h2>Let&apos;s make the next step <span>possible.</span></h2><p>Tell us what you are working on. We&apos;ll help you explore the right way forward.</p></div>
        </ScrollReveal>
        <Link className="button button-primary" href="/contact">Start a conversation <ArrowUpRight size={17} /></Link>
      </section>
    </>
  );
}
