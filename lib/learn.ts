/**
 * Learn module data shape and example content.
 *
 * This file defines the framework for short, mobile-first financial-literacy
 * modules and their quizzes. Phase 0 shipped placeholder routes; this is the
 * shell. The two modules below are working examples so the rendering and quiz
 * interaction can be seen end to end. Phase 2 fills in the rest of the catalog.
 *
 * Authoring rules (match lib/site.ts):
 *   - Plain English aimed at a student with no background.
 *   - No em dashes. Teaching, not personalized money guidance.
 *   - Only the two approved figures (5,000+ students, 40+ schools) may be cited.
 */

/** Where a module sits in a learner's path. */
export type LearnLevel = "Beginner" | "Core" | "Next steps";

/** A renderable block inside a section. Keeps content structured, not raw HTML. */
export type LearnBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type LearnSection = {
  heading: string;
  blocks: LearnBlock[];
};

export type QuizQuestion = {
  /** Stable id, unique within the module. Used as a React key and answer key. */
  id: string;
  prompt: string;
  /** Answer choices shown in order. */
  options: string[];
  /** Index into `options` of the correct choice. */
  answerIndex: number;
  /** Shown once the learner answers, explaining the correct choice. */
  explanation: string;
};

export type LearnModule = {
  /** Unique, stable slug used for the /learn/[slug] route and as a key. */
  slug: string;
  title: string;
  /** One-line description shown in the module list. */
  summary: string;
  /** Short topic label used as a badge and for future grouping. */
  topic: string;
  level: LearnLevel;
  /** Rough time to read and complete, in minutes. */
  minutes: number;
  sections: LearnSection[];
  quiz: QuizQuestion[];
};

export const learnModules: LearnModule[] = [
  {
    slug: "build-your-first-budget",
    title: "Build Your First Budget",
    summary:
      "Turn the money coming in into a simple plan you can actually stick to.",
    topic: "Budgeting",
    level: "Beginner",
    minutes: 6,
    sections: [
      {
        heading: "What a budget really is",
        blocks: [
          {
            type: "paragraph",
            text: "A budget is just a plan that decides where your money goes before you spend it. It is not about saying no to everything. It is about telling each dollar what job it has so you are not surprised at the end of the month.",
          },
          {
            type: "paragraph",
            text: "Start with the money that actually lands in your account, your take-home pay, not the bigger number before taxes. That is the amount you really have to work with.",
          },
        ],
      },
      {
        heading: "A simple starting split",
        blocks: [
          {
            type: "paragraph",
            text: "If you are not sure where to begin, the 50/30/20 guide is an easy first draft. You aim to send your take-home pay in roughly these directions:",
          },
          {
            type: "list",
            items: [
              "About 50 percent to needs: things you must pay for, like housing, food, phone, and transport.",
              "About 30 percent to wants: the fun extras, like eating out, games, and going places.",
              "About 20 percent to the future: saving and paying down any debt.",
            ],
          },
          {
            type: "callout",
            title: "These are starting points, not rules",
            text: "If your rent eats more than half your pay, your split will look different, and that is fine. The goal is a plan that fits your real life, then small steps to improve it.",
          },
        ],
      },
      {
        heading: "Sort needs from wants",
        blocks: [
          {
            type: "paragraph",
            text: "The fastest way to find room in a budget is to separate needs from wants. A need keeps your life running. A want is nice to have. Most people find a few wants they can trim without really missing them.",
          },
          {
            type: "paragraph",
            text: "Recurring wants are worth a closer look. A handful of small subscriptions can quietly add up to a real monthly cost, so it pays to review them now and then.",
          },
        ],
      },
      {
        heading: "Make it automatic",
        blocks: [
          {
            type: "paragraph",
            text: "A budget works best when you do not have to think about it. Setting up an automatic transfer to savings right after payday means you save first, before the money has a chance to disappear.",
          },
          {
            type: "callout",
            title: "Pay yourself first",
            text: "Even a small automatic transfer builds the habit. The amount can grow later. What matters now is that saving happens on its own.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "take-home",
        prompt: "When you build a budget, which number should you plan around?",
        options: [
          "Your salary before taxes",
          "Your take-home pay after taxes and deductions",
          "The total of everything you would like to buy",
          "Last year's tax refund",
        ],
        answerIndex: 1,
        explanation:
          "Plan around take-home pay, the money that actually reaches your account. Your pre-tax salary is larger than what you can really spend.",
      },
      {
        id: "fifty-thirty-twenty",
        prompt: "In the 50/30/20 guide, what is the 20 percent for?",
        options: [
          "Wants like eating out",
          "Rent and groceries",
          "Saving and paying down debt",
          "Taxes",
        ],
        answerIndex: 2,
        explanation:
          "The 20 percent is aimed at your future: building savings and paying off debt. Needs are the 50 and wants are the 30.",
      },
      {
        id: "find-room",
        prompt: "What is usually the easiest place to find extra room in a budget?",
        options: [
          "Cutting needs like housing",
          "Trimming some wants, such as unused subscriptions",
          "Skipping taxes",
          "Earning a guaranteed raise",
        ],
        answerIndex: 1,
        explanation:
          "Wants are the most flexible part of a budget. Reviewing recurring wants like subscriptions often frees up money without much pain.",
      },
      {
        id: "automate",
        prompt: "Why set up an automatic transfer to savings on payday?",
        options: [
          "It removes all taxes from your pay",
          "It saves money first, before you can spend it",
          "It raises your credit score directly",
          "It cancels your subscriptions for you",
        ],
        answerIndex: 1,
        explanation:
          "Automating savings means you pay yourself first. The money moves before it has a chance to be spent, which makes the habit stick.",
      },
    ],
  },
  {
    slug: "how-credit-scores-work",
    title: "How Credit Scores Work",
    summary:
      "What the number means, what moves it, and how to build credit from zero.",
    topic: "Credit",
    level: "Core",
    minutes: 7,
    sections: [
      {
        heading: "What a credit score is",
        blocks: [
          {
            type: "paragraph",
            text: "A credit score is a number, usually between 300 and 850, that sums up how reliably you repay money you borrow. Lenders, landlords, and sometimes employers use it as a quick read on how risky it is to trust you with credit.",
          },
          {
            type: "paragraph",
            text: "A higher score makes life cheaper. It can mean lower interest rates, easier approval for an apartment, and smaller deposits. A lower score makes borrowing harder and more expensive.",
          },
        ],
      },
      {
        heading: "What moves your score",
        blocks: [
          {
            type: "paragraph",
            text: "Your score is built mostly from a few habits. The two that matter most are paying on time and not using too much of your available credit.",
          },
          {
            type: "list",
            items: [
              "Payment history: paying bills on time is the single biggest factor.",
              "Credit utilization: using a small share of your limit, often under 30 percent, helps.",
              "Length of history: a longer track record generally helps your score.",
              "New applications: several hard inquiries in a short time can ding it.",
            ],
          },
        ],
      },
      {
        heading: "Building credit from zero",
        blocks: [
          {
            type: "paragraph",
            text: "If you have never borrowed, you do not have a score yet, and that is normal. You build one by using a small amount of credit and repaying it on time.",
          },
          {
            type: "list",
            items: [
              "A secured credit card, backed by a deposit you put down, is a common first step.",
              "Becoming an authorized user on a trusted family member's card can help.",
              "Whatever you use, pay the full balance every month and never miss a due date.",
            ],
          },
          {
            type: "callout",
            title: "Check your report for free",
            text: "You can review your own credit report at no cost, and it counts as a soft inquiry that does not affect your score. Checking helps you catch errors and fraud early.",
          },
        ],
      },
      {
        heading: "Common myths",
        blocks: [
          {
            type: "paragraph",
            text: "A few beliefs about credit are simply wrong and can cost you. Two come up again and again.",
          },
          {
            type: "list",
            items: [
              "Myth: carrying a balance and paying interest helps your score. It does not. Paying in full is best.",
              "Myth: checking your own score lowers it. Checking your own is a soft inquiry and has no effect.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "biggest-factor",
        prompt: "Which habit has the biggest effect on a credit score?",
        options: [
          "Paying bills on time",
          "Opening many new cards at once",
          "Carrying a large balance",
          "Checking your score often",
        ],
        answerIndex: 0,
        explanation:
          "Payment history is the single biggest factor. Paying on time, every time, does more for your score than anything else.",
      },
      {
        id: "utilization",
        prompt: "Credit utilization is best kept around what level?",
        options: [
          "As high as your limit allows",
          "A small share, often under 30 percent of your limit",
          "Exactly at your limit",
          "It does not matter",
        ],
        answerIndex: 1,
        explanation:
          "Using a small share of your available credit, commonly under 30 percent, helps your score. Maxing out a card hurts it.",
      },
      {
        id: "carry-balance",
        prompt: "Does carrying a credit card balance and paying interest help your score?",
        options: [
          "Yes, it proves you can handle debt",
          "No, paying in full is better and avoids interest",
          "Only if the balance is very large",
          "Only during the first year",
        ],
        answerIndex: 1,
        explanation:
          "This is a costly myth. Carrying a balance does not help your score. Paying in full each month is better and saves you interest.",
      },
      {
        id: "first-card",
        prompt: "What is a common first step to build credit from zero?",
        options: [
          "A payday loan",
          "A secured credit card backed by a deposit",
          "Taking out a mortgage",
          "Skipping credit entirely forever",
        ],
        answerIndex: 1,
        explanation:
          "A secured credit card, backed by a refundable deposit, is a widely used starter tool for building credit with low risk to the lender.",
      },
    ],
  },
];

/** Look up a single module by slug. */
export function getModule(slug: string): LearnModule | undefined {
  return learnModules.find((module) => module.slug === slug);
}

/** All module slugs, for generateStaticParams on the detail route. */
export function getModuleSlugs(): string[] {
  return learnModules.map((module) => module.slug);
}
