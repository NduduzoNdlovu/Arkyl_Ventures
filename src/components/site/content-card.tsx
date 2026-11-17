import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type ContentCardProps = {
  number?: string;
  icon?: LucideIcon;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

export function ContentCard({ number, icon: Icon, title, description, href, linkLabel = "Explore service" }: ContentCardProps) {
  return (
    <article className="content-card">
      <div className="content-card-top">
        {Icon ? <span className="content-card-icon"><Icon size={20} /></span> : <span className="content-card-number">{number ?? "AV"}</span>}
        <ArrowUpRight size={17} className="content-card-arrow" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {href ? <Link className="content-card-link" href={href}>{linkLabel}<ArrowUpRight size={15} /></Link> : null}
    </article>
  );
}
