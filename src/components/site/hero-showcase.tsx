"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ServiceIcon } from "@/components/site/service-icon";

export type HeroShowcaseItem = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
  category: { name: string };
};

export function HeroShowcase({ items }: { items: HeroShowcaseItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (items.length < 2 || reduceMotion || paused) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = Math.floor(Math.random() * (items.length - 1));
        return next >= current ? next + 1 : next;
      });
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [items.length, paused, reduceMotion]);

  const visibleItems = useMemo(() => {
    if (!items.length) return [];
    return [0, 1, 2]
      .map((offset) => items[(activeIndex + offset) % items.length])
      .filter((item, index, all) => all.findIndex((candidate) => candidate.id === item.id) === index);
  }, [activeIndex, items]);

  if (!items.length) {
    return (
      <div className="hero-showcase-empty">
        <Sparkles size={18} />
        <span>New possibilities are taking shape.</span>
      </div>
    );
  }

  return (
    <div
      className="hero-showcase"
      role="group"
      aria-label="Featured Arkyl services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="hero-showcase-heading">
        <span className="showcase-live-dot" />
        <span>CAPABILITIES IN MOTION</span>
        <small>SELECTED SERVICES</small>
      </div>

      <div className="hero-showcase-stack" aria-live="off">
        <AnimatePresence initial={false}>
          {visibleItems.map((item, position) => (
            <motion.article
              key={item.id}
              className="hero-showcase-card"
              data-position={position}
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
              animate={{
                opacity: position === 0 ? 1 : position === 1 ? 0.46 : 0.25,
                y: 0,
                scale: position === 0 ? 1 : position === 1 ? 0.94 : 0.88,
              }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.94 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={position > 0}
            >
              {position === 0 ? (
                <Link className="hero-showcase-card-link" href={`/services/${item.slug}`} tabIndex={0}>
                  <ShowcaseCardContent item={item} />
                </Link>
              ) : (
                <div className="hero-showcase-card-link" aria-hidden="true">
                  <ShowcaseCardContent item={item} />
                </div>
              )}
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <div className="hero-showcase-footer">
        <span>Technology · Business · Digital</span>
        <span className="showcase-auto-label"><i /> AUTOMATIC SHOWCASE</span>
      </div>
    </div>
  );
}

function ShowcaseCardContent({ item }: { item: HeroShowcaseItem }) {
  return (
    <>
      <div className="showcase-card-topline">
        <span>{item.category.name}</span>
        <span className="showcase-card-index">AV / SELECTED</span>
      </div>
      <div className="showcase-card-main">
        <span className="showcase-card-icon">
          <ServiceIcon name={item.icon} size={23} />
        </span>
        <span className="showcase-card-arrow"><ArrowUpRight size={17} /></span>
      </div>
      <h3>{item.name}</h3>
      <p>{item.shortDescription}</p>
      <span className="showcase-card-bottomline">
        <span>EXPLORE CAPABILITY</span>
        <span className="showcase-card-progress"><i /></span>
      </span>
    </>
  );
}
