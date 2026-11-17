import { PageHero } from "@/components/site/page-hero";

export const metadata = { title: "Privacy Information | Arkyl Ventures", description: "Privacy information for the Arkyl Ventures website." };

export default function PrivacyPage() {
  return <>
    <PageHero eyebrow="INFORMATION" title="Your information" accent="matters." description="Arkyl Ventures recognises the importance of handling personal information carefully. This page is an interim notice while the platform's formal privacy policy and customer data processes are being finalised." />
    <section className="page-section section-container policy-content"><div className="policy-notice"><strong>Interim privacy notice</strong><p>This page is not a final privacy policy and should not be treated as legal advice or a statement of POPIA compliance.</p></div><h2>Before submitting information</h2><p>Do not send identity documents, banking details, payment card information or other sensitive personal information through an unapproved channel. Public enquiry forms, customer accounts and online checkout will be introduced only with the appropriate privacy information and safeguards.</p><h2>Questions about privacy</h2><p>When the formal policy is approved, this page will explain what personal information is collected, why it is used, how it is stored, who may receive it, how long it is retained and how individuals may exercise their rights.</p><p>The final policy must be reviewed against the actual services, systems and data-processing arrangements used by Arkyl Ventures before publication.</p></section>
  </>;
}
