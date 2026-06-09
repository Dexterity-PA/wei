/**
 * Single source of truth for site configuration: name, navigation, routes,
 * and contact. Nav links, the sitemap, and robots all read from here so the
 * route list never drifts.
 *
 * Copy rules for this project:
 *   - WEI provides financial literacy education only. Never frame it as a
 *     regulated money-guidance service. It teaches, it does not counsel.
 *   - Only two verified figures may be cited: 5,000+ students and 40+ schools.
 *   - No em dashes in copy.
 */

export type NavLink = {
  label: string;
  href: string;
  /** Short description used for menus and metadata. */
  description: string;
};

export type Stat = {
  value: string;
  label: string;
};

/**
 * Production origin. Override per environment with NEXT_PUBLIC_SITE_URL.
 * Used as metadataBase and for absolute URLs in the sitemap and robots files.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.wealthequityinitiative.com";

/** Active contact address. Also the delivery target for the contact form. */
export const contactEmail = "praneeth.a2027@gmail.com";

/**
 * Canonical link for every public page, defined once. Nav, footer, and the
 * sitemap all read from here so the route list never drifts. Add a page to
 * this map and it is automatically eligible for the sitemap; place it in `nav`
 * or `footerGroups` to make it reachable.
 */
const pages = {
  home: { label: "Home", href: "/", description: "Wealth Equity Initiative" },
  about: {
    label: "About",
    href: "/about",
    description: "Who we are and why financial equity matters",
  },
  tools: {
    label: "Tools",
    href: "/tools",
    description:
      "Practical calculators and planners for everyday money decisions",
  },
  learn: {
    label: "Learn",
    href: "/learn",
    description: "Guides and lessons that build financial literacy step by step",
  },
  glossary: {
    label: "Glossary",
    href: "/glossary",
    description: "Plain-language definitions of money and banking terms",
  },
  resources: {
    label: "Resources",
    href: "/resources",
    description:
      "Downloadable guides, worksheets, and templates for students and teachers",
  },
  contact: {
    label: "Contact",
    href: "/contact",
    description: "Reach the WEI team",
  },
  impact: {
    label: "Impact",
    href: "/impact",
    description: "The students and schools our education programs reach",
  },
  partners: {
    label: "For schools",
    href: "/partners",
    description: "Bring WEI lessons and tools to your classroom at no cost",
  },
  students: {
    label: "For students",
    href: "/students",
    description: "A starting point for students: tools, lessons, and resources",
  },
  faq: {
    label: "FAQ",
    href: "/faq",
    description: "Answers to common questions about WEI",
  },
  privacy: {
    label: "Privacy",
    href: "/privacy",
    description: "How we handle the information you share with us",
  },
  terms: {
    label: "Terms",
    href: "/terms",
    description: "The terms for using this site",
  },
  trust: {
    label: "Trust",
    href: "/trust",
    description: "Our commitments on safety, accuracy, and education-only framing",
  },
} satisfies Record<string, NavLink>;

/**
 * Primary top navigation. Kept deliberately lean so the bar never overflows on
 * desktop or wraps awkwardly on tablet. The fuller site map lives in the
 * footer (see `footerGroups`).
 */
export const nav: NavLink[] = [
  pages.home,
  pages.about,
  pages.impact,
  pages.tools,
  pages.learn,
  pages.glossary,
  pages.resources,
  pages.contact,
];

export type FooterGroup = {
  title: string;
  links: NavLink[];
};

/**
 * Grouped footer map. Together with `nav` this makes every public page
 * reachable. Contact is rendered separately in the footer; Home is reachable
 * from the wordmark.
 */
export const footerGroups: FooterGroup[] = [
  {
    title: "Explore",
    links: [pages.tools, pages.learn, pages.glossary, pages.resources],
  },
  {
    title: "About",
    links: [
      pages.about,
      pages.impact,
      pages.partners,
      pages.students,
      pages.faq,
    ],
  },
  {
    title: "Legal",
    links: [pages.privacy, pages.terms, pages.trust],
  },
];

/** The contact link, surfaced on its own in nav and the footer. */
export const contactLink: NavLink = pages.contact;

/** Headline figures. These are the only statistics permitted in copy. */
export const stats: Stat[] = [
  { value: "5,000+", label: "students reached" },
  { value: "40+", label: "partner schools" },
];

export const site = {
  name: "Wealth Equity Initiative",
  shortName: "WEI",
  /** One-line mission. Education framing, no service claim. */
  mission:
    "We bring practical financial literacy education to students who need it most.",
  description:
    "The Wealth Equity Initiative is a student-founded nonprofit teaching financial literacy to underserved students, with a toolkit of plain-language guides and everyday money tools.",
  url: siteUrl,
  contactEmail,
  nav,
  stats,
} as const;

/**
 * Flat list of every canonical static route, derived from the full page map
 * (not just the nav). The sitemap reads from this, so every real page is
 * listed even when it lives only in the footer. Dynamic routes
 * (/learn/[slug], /tools/[slug]) are added by the sitemap from their own data.
 */
export const routes: string[] = Object.values(pages).map((link) => link.href);

export type Site = typeof site;
