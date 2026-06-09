/**
 * Catalog for the /resources hub. Each entry maps to real, branded, downloadable
 * files in public/resources/files/. File sizes are read from disk at build time
 * (see page.tsx), so this list never drifts from the actual artifacts.
 *
 * Copy rules: education only, never advice. No invented statistics. No em dashes.
 */

export type ResourceFormat = {
  /** Short uppercase label shown in the download chip. */
  type: "PDF" | "XLSX";
  /** File name within public/resources/files/. */
  file: string;
};

export type ResourceCategory =
  | "Budgeting"
  | "Saving"
  | "Debt"
  | "Banking"
  | "College";

export type Resource = {
  id: string;
  title: string;
  category: ResourceCategory;
  /** Plain-language description, one or two sentences. */
  description: string;
  /** What a student does with it, shown as a mono detail line. */
  use: string;
  formats: ResourceFormat[];
};

/** Display order of the category groups on the page. */
export const categoryOrder: ResourceCategory[] = [
  "Budgeting",
  "Saving",
  "Debt",
  "Banking",
  "College",
];

export const resources: Resource[] = [
  {
    id: "monthly-budget",
    title: "Monthly Budget Worksheet",
    category: "Budgeting",
    description:
      "Plan and track a month of income and spending with the 50/30/20 method. Rename any category to fit your life, and the totals update as you go.",
    use: "Plan needs, wants, and savings",
    formats: [
      { type: "XLSX", file: "wei-monthly-budget-worksheet.xlsx" },
      { type: "PDF", file: "wei-monthly-budget-worksheet.pdf" },
    ],
  },
  {
    id: "spending-tracker",
    title: "Spending Tracker",
    category: "Budgeting",
    description:
      "Log what you spend for a few weeks. A built-in summary adds up each category for you, so you can see where the money actually goes.",
    use: "Log purchases, see the totals",
    formats: [
      { type: "XLSX", file: "wei-spending-tracker.xlsx" },
      { type: "PDF", file: "wei-spending-tracker.pdf" },
    ],
  },
  {
    id: "savings-goal",
    title: "Savings Goal Tracker",
    category: "Saving",
    description:
      "Set one clear goal, log each contribution, and watch the balance climb. It shows how close you are and how long the goal will take.",
    use: "Track progress to one goal",
    formats: [
      { type: "XLSX", file: "wei-savings-goal-tracker.xlsx" },
      { type: "PDF", file: "wei-savings-goal-tracker.pdf" },
    ],
  },
  {
    id: "emergency-fund",
    title: "Emergency Fund Planner",
    category: "Saving",
    description:
      "Add up your essential bills, pick how many months to cover, and track your progress toward a cushion that covers a rough patch.",
    use: "Size and build a safety net",
    formats: [
      { type: "XLSX", file: "wei-emergency-fund-planner.xlsx" },
      { type: "PDF", file: "wei-emergency-fund-planner.pdf" },
    ],
  },
  {
    id: "debt-payoff",
    title: "Debt Payoff Planner",
    category: "Debt",
    description:
      "List every debt, then compare the avalanche and snowball methods. The planner ranks your debts and does the interest math for you.",
    use: "Compare avalanche and snowball",
    formats: [
      { type: "XLSX", file: "wei-debt-payoff-planner.xlsx" },
      { type: "PDF", file: "wei-debt-payoff-planner.pdf" },
    ],
  },
  {
    id: "first-paycheck",
    title: "First Paycheck Checklist",
    category: "Banking",
    description:
      "A one-time checklist for your first job. Read your pay stub, set up the right accounts, and start a few habits that pay off for years.",
    use: "Work through it once",
    formats: [{ type: "PDF", file: "wei-first-paycheck-checklist.pdf" }],
  },
  {
    id: "bank-comparison",
    title: "Bank Account Comparison",
    category: "Banking",
    description:
      "Put up to three accounts side by side on fees, minimums, and interest. The sheet estimates a first-year cost or benefit for each one.",
    use: "Compare accounts on real costs",
    formats: [
      { type: "XLSX", file: "wei-bank-account-comparison.xlsx" },
      { type: "PDF", file: "wei-bank-account-comparison.pdf" },
    ],
  },
  {
    id: "college-net-price",
    title: "College Cost and Net-Price Worksheet",
    category: "College",
    description:
      "Work out the net price of a school, the full cost of attendance minus grants and scholarships, and map out how you will cover it.",
    use: "Find the price you actually pay",
    formats: [
      { type: "XLSX", file: "wei-college-cost-net-price-worksheet.xlsx" },
      { type: "PDF", file: "wei-college-cost-net-price-worksheet.pdf" },
    ],
  },
];
