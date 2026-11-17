import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackgroundEffects } from "@/components/site/background-effects";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <BackgroundEffects />
      <SiteHeader />
      <main className="site-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
