/**
 * Tool registry: the single source of truth for the /tools toolkit.
 *
 * The hub page renders from this list, and the sitemap pulls tool routes from
 * getToolSlugs() so a new tool appears in both places by adding one entry here.
 * Each tool route lives at /tools/<slug> and is built and owned in its own
 * folder under app/tools; this file only catalogs them.
 *
 * Authoring rules (match lib/site.ts and lib/learn.ts):
 *   - Plain English aimed at a student with no background. Define jargon.
 *   - Teaching, not personalized money guidance. No "advice/advisor".
 *   - No em dashes. Only the two approved figures may ever be cited.
 */

/** How the toolkit is grouped on the hub. Order here is the display order. */
export const toolCategories = [
  "Everyday money",
  "Debt & credit",
  "Big decisions",
] as const;

export type ToolCategory = (typeof toolCategories)[number];

export type Tool = {
  /** Stable slug for the /tools/<slug> route and as a React key. */
  slug: string;
  /** Short display name used in the hub index. */
  name: string;
  /** One-line, plain-language description of what the tool does. */
  blurb: string;
  /** Which hub group the tool sits in. */
  category: ToolCategory;
};

/**
 * The nine Phase 2 tools. Listed in hub-display order within each category.
 */
export const tools: Tool[] = [
  // Everyday money: handling day-to-day income and spending.
  {
    slug: "budget-builder",
    name: "Budget builder",
    blurb: "Split what comes in across what matters, and see what is left over.",
    category: "Everyday money",
  },
  {
    slug: "savings-goal",
    name: "Savings goal planner",
    blurb:
      "Set a target and find how long it takes, or what to set aside each month.",
    category: "Everyday money",
  },
  {
    slug: "paycheck-breakdown",
    name: "Paycheck breakdown",
    blurb:
      "Estimate your take-home pay and see where each part of a paycheck goes.",
    category: "Everyday money",
  },
  {
    slug: "first-paycheck",
    name: "First paycheck guide",
    blurb:
      "A step-by-step walk through your first paycheck, pay stub, and W-4 form.",
    category: "Everyday money",
  },

  // Debt & credit: borrowing, credit habits, and the cost of being shut out.
  {
    slug: "debt-payoff",
    name: "Debt payoff",
    blurb:
      "Compare the avalanche and snowball methods and the real cost of each.",
    category: "Debt & credit",
  },
  {
    slug: "credit-simulator",
    name: "Credit score simulator",
    blurb: "See which habits move a credit score in each direction, and why.",
    category: "Debt & credit",
  },
  {
    slug: "cost-of-unbanked",
    name: "Cost of being unbanked",
    blurb:
      "Add up what check-cashing and prepaid fees cost over years without a bank.",
    category: "Debt & credit",
  },

  // Big decisions: long-horizon money and major life math.
  {
    slug: "compound-interest",
    name: "Compound interest visualizer",
    blurb: "Watch money grow when interest starts earning its own interest.",
    category: "Big decisions",
  },
  {
    slug: "college-net-price",
    name: "College net-price reality",
    blurb: "Look past the sticker price to what a year of college may really cost.",
    category: "Big decisions",
  },
];

/** Tools in a given category, in registry order. */
export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

/** Bare slugs for every tool, used to build /tools/<slug> routes in the sitemap. */
export function getToolSlugs(): string[] {
  return tools.map((tool) => tool.slug);
}
