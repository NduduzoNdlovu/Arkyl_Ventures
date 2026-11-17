import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkylventures.co.za"),
  title: {
    default: "Arkyl Ventures | Where Possibilities Begin",
    template: "%s | Arkyl Ventures",
  },
  description: "Technology, IT support, digital products and practical business solutions from Arkyl Ventures.",
  applicationName: "Arkyl Ventures",
  openGraph: {
    title: "Arkyl Ventures | Where Possibilities Begin",
    description: "Technology and business solutions designed to help you move forward.",
    siteName: "Arkyl Ventures",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body>{children}</body>
    </html>
  );
}
