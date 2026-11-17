import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2, Cpu, Headphones, MonitorSmartphone, ShoppingBag, Sparkles, BriefcaseBusiness, Network, ShieldCheck } from "lucide-react";

const technologyServices = [
  { icon: Headphones, title: "IT support", text: "Reliable technical assistance for everyday business and personal technology." },
  { icon: MonitorSmartphone, title: "Repairs & installations", text: "Computer, laptop and phone repairs, setup, upgrades and software installation." },
  { icon: Code2, title: "Websites & software", text: "Professional websites, ecommerce stores and software built around your needs." },
  { icon: Network, title: "Networking & cloud", text: "Connectivity, Microsoft 365, Google Workspace, hosting and business email." },
];

const businessServices = [
  "Business registration assistance",
  "Business plans and company profiles",
  "Business documentation and administration",
  "Business support and consultations",
];

const benefits = [
  "Solutions shaped around your requirements",
  "Clear communication from enquiry to delivery",
  "Practical support for individuals and businesses",
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section section-container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> TECHNOLOGY. BUSINESS. POSSIBILITIES.</div>
          <h1 id="hero-title">Move your ideas <span>forward.</span></h1>
          <p className="hero-description">Technology and business solutions designed to help you work smarter, grow confidently and make more possible.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contact">Let&apos;s get started <ArrowUpRight size={17} /></Link>
            <Link className="button button-quiet" href="/about">Discover Arkyl <ArrowRight size={16} /></Link>
          </div>
          <div className="hero-proof"><span className="proof-dot" /> Practical solutions. Thoughtful service. Room to grow.</div>
        </div>

        <div className="hero-visual" aria-label="Arkyl Ventures human-inspired technology illustration">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-image-wrap">
            <Image src="/images/arkyl.png" alt="A futuristic human-shaped robot representing technology and innovation" fill priority sizes="(max-width: 900px) 80vw, 560px" className="hero-robot" />
          </div>
          <div className="hero-glass-card glass-card glass-card-top">
            <span className="glass-icon"><Cpu size={17} /></span>
            <span><strong>Technology that works</strong><small>Built around real needs</small></span>
          </div>
          <div className="hero-glass-card glass-card glass-card-bottom">
            <span className="glass-icon"><Sparkles size={17} /></span>
            <span><strong>Possibilities, unlocked</strong><small>From ideas to outcomes</small></span>
          </div>
          <div className="hero-side-note">WHERE POSSIBILITIES BEGIN</div>
        </div>

        <div className="hero-bottom-note"><span>01 / 04</span><span>Technology & business solutions</span><span className="hero-bottom-rule" /></div>
      </section>

      <section className="intro-strip section-container" aria-label="Company introduction">
        <p>One partner for <strong>technology, business support</strong> and the tools that help you move forward.</p>
        <Link href="/about" className="text-link">Get to know us <ArrowUpRight size={16} /></Link>
      </section>

      <section className="content-section section-container" id="technology" aria-labelledby="technology-title">
        <div className="section-heading-row">
          <div><span className="section-kicker">01 / TECHNOLOGY & IT</span><h2 id="technology-title">Make technology <span>work for you.</span></h2></div>
          <p>From everyday technical support to custom digital products, we help you get more from the technology you rely on.</p>
        </div>
        <div className="service-grid">
          {technologyServices.map((service) => {
            const Icon = service.icon;
            return <article className="service-card" key={service.title}><span className="service-icon"><Icon size={21} /></span><h3>{service.title}</h3><p>{service.text}</p><Link href="/technology-it" aria-label={`Explore ${service.title}`}><ArrowUpRight size={17} /></Link></article>;
          })}
        </div>
        <div className="section-link-row"><span>Technology solutions for home and business</span><Link className="text-link" href="/technology-it">Explore Technology & IT <ArrowUpRight size={16} /></Link></div>
      </section>

      <section className="business-section" id="business-services" aria-labelledby="business-title">
        <div className="business-inner section-container">
          <div className="business-copy"><span className="section-kicker">02 / BUSINESS SERVICES</span><h2 id="business-title">Build a stronger <span>business foundation.</span></h2><p>Getting a business off the ground or keeping it moving takes time, structure and the right support. We help make those next steps clearer.</p><Link className="button button-outline" href="/business-services">Explore business services <ArrowUpRight size={17} /></Link></div>
          <div className="business-list-card glass-card"><div className="business-list-heading"><BriefcaseBusiness size={19} /><span>Ways we can support you</span></div>{businessServices.map((service) => <div className="business-list-item" key={service}><CheckCircle2 size={17} /><span>{service}</span><ArrowUpRight size={15} /></div>)}<p className="business-disclaimer">Service availability and scope are confirmed during your enquiry. Official registrations and approvals remain subject to the relevant authorities.</p></div>
        </div>
      </section>

      <section className="content-section section-container" id="shop" aria-labelledby="shop-title">
        <div className="section-heading-row"><div><span className="section-kicker">03 / THE ARKYL SHOP</span><h2 id="shop-title">Useful products. <span>Considered choices.</span></h2></div><p>Explore technology and everyday products selected to support how you work and live. Our catalogue will grow as new categories become available.</p></div>
        <div className="shop-feature-card"><div className="shop-feature-icon"><ShoppingBag size={28} /></div><div><span className="shop-label">COMING INTO FOCUS</span><h3>A smarter way to shop for the things you need.</h3><p>Browse product categories, compare options and find the right fit as our online store expands.</p></div><Link className="button button-primary" href="/shop">Explore the shop <ArrowUpRight size={17} /></Link></div>
      </section>

      <section className="why-section section-container" aria-labelledby="why-title">
        <div className="why-heading"><span className="section-kicker">04 / THE ARKYL APPROACH</span><h2 id="why-title">Good work starts with <span>understanding.</span></h2><p>We believe useful solutions begin by listening, understanding the challenge and choosing a practical way forward.</p></div>
        <div className="why-points">{benefits.map((benefit, index) => <div className="why-point" key={benefit}><span>0{index + 1}</span><p>{benefit}</p><ShieldCheck size={18} /></div>)}</div>
      </section>

      <section className="about-preview section-container" id="about" aria-labelledby="about-title">
        <div className="about-preview-mark"><span>AV</span><i>ARKYL VENTURES</i></div>
        <div className="about-preview-copy"><span className="section-kicker">ABOUT ARKYL VENTURES</span><h2 id="about-title">A practical partner for <span>what comes next.</span></h2><p>Arkyl Ventures brings technology and business support together under one roof. Our focus is to understand what you need, make the options clear and help you take the next step with confidence.</p><Link className="text-link" href="/contact">Talk to our team <ArrowUpRight size={16} /></Link></div>
      </section>

      <section className="portfolio-preview section-container" id="portfolio" aria-labelledby="portfolio-title">
        <div><span className="section-kicker">OUR WORK</span><h2 id="portfolio-title">Built around real <span>business needs.</span></h2><p>As projects are completed, this space will showcase selected websites, digital products and business solutions delivered by Arkyl Ventures.</p></div>
        <div className="portfolio-preview-note"><span className="portfolio-preview-number">01</span><div><strong>Project portfolio</strong><small>Selected work and case studies will be published here.</small></div><Sparkles size={20} /></div>
      </section>

      <section className="contact-band section-container" id="contact"><div><span className="section-kicker">HAVE SOMETHING IN MIND?</span><h2>Let&apos;s make the next step <span>possible.</span></h2><p>Tell us what you are working on. We&apos;ll help you explore the right way forward.</p></div><Link className="button button-primary" href="/contact">Start a conversation <ArrowUpRight size={17} /></Link></section>
    </>
  );
}
