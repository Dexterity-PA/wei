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
  "https://wealthequityinitiative.com";

/** Active contact address. Also the delivery target for the contact form. */
export const contactEmail = "praneeth.a2027@gmail.com";

export const nav: NavLink[] = [
  { label: "Home", href: "/", description: "Wealth Equity Initiative" },
  {
    label: "About",
    href: "/about",
    description: "Who we are and why financial equity matters",
  },
  {
    label: "Tools",
    href: "/tools",
    description: "Practical calculators and planners for everyday money decisions",
  },
  {
    label: "Learn",
    href: "/learn",
    description: "Guides and lessons that build financial literacy step by step",
  },
  {
    label: "Glossary",
    href: "/glossary",
    description: "Plain-language definitions of money and banking terms",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Reach the WEI team",
  },
];

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

/** Flat list of canonical routes, derived from the nav. */
export const routes: string[] = nav.map((link) => link.href);

export type Site = typeof site;
