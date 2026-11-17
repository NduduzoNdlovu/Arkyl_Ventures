import { PageHero } from "@/components/site/page-hero";

export const metadata = { title: "Terms & Conditions | Arkyl Ventures", description: "Terms information for the Arkyl Ventures website." };

export default function TermsPage() {
  return <>
    <PageHero eyebrow="INFORMATION" title="Clear expectations" accent="matter." description="This page is an interim notice. The full terms governing Arkyl Ventures services, product purchases, quotations, delivery, returns and customer accounts are being prepared." />
    <section className="page-section section-container policy-content"><div className="policy-notice"><strong>Interim terms notice</strong><p>This page is not a final set of terms and conditions and does not replace a written agreement or a legally reviewed customer policy.</p></div><h2>Service enquiries and quotations</h2><p>Information on this website is general in nature. A service description does not by itself confirm availability, scope, price, delivery time or acceptance of an engagement. These details must be confirmed with Arkyl Ventures before work begins.</p><h2>Products and availability</h2><p>Product listings, prices, stock, condition, warranty information, delivery arrangements and any applicable return terms must be confirmed at the point of sale. No purchase or payment process is enabled by this release.</p><h2>Future updates</h2><p>Before customer accounts, checkout, online payments or formal service applications are activated, the relevant terms will be completed and reviewed for the applicable business activities and South African requirements.</p></section>
  </>;
}
