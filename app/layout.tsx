import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Monospace face for eyebrows, labels, stats, and tool readouts. Loaded at the
// weights used for mono labels (medium) and the few mono headings (semibold).
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.name,
    template: "%s | Wealth Equity Initiative",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "financial literacy",
    "financial education",
    "students",
    "nonprofit",
    "wealth equity",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Note: no h-full on <html>. The body owns min-height via min-h-svh so the
  // Lenis ResizeObserver stays in sync with font-swap reflow.
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-svh flex-col bg-wei-paper text-wei-ink antialiased">
        <SmoothScrollProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
