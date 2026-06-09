/**
 * Learn module data for the Wealth Equity Initiative.
 *
 * This file defines the SHAPE of a learning module and ships a couple of fully
 * written example modules so the Learn shell is demonstrably working. The rest
 * of the catalog is authored in a later phase; new modules only need to be
 * added to the `learnModules` array below and the route and pages pick them up.
 *
 * Copy rules (see lib/site.ts): education framing only, no em dashes.
 */

export type LearnLevel = "Beginner" | "Intermediate";

/** One block of a module: a heading and one or more plain-language paragraphs. */
export type LearnSection = {
  heading: string;
  /** Body paragraphs. Each string renders as its own paragraph. */
  body: string[];
  /** Optional highlighted takeaway shown apart from the body. */
  takeaway?: string;
};

/** A single multiple-choice quiz question. */
export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  /** Index into `options` of the correct answer. */
  answerIndex: number;
  /** Shown after answering, explaining why the answer is right. */
  explanation: string;
};

export type LearnModule = {
  slug: string;
  title: string;
  /** One-line summary for the module list and metadata. */
  summary: string;
  level: LearnLevel;
  /** Rough time to read and complete, in minutes. */
  minutes: number;
  /** Short topic label, loosely aligned with glossary categories. */
  topic: string;
  sections: LearnSection[];
  quiz: QuizQuestion[];
};

export const learnModules: LearnModule[] = [
  {
    slug: "build-your-first-budget",
    title: "Build Your First Budget",
    summary:
      "A budget is just a plan for your money. Learn a simple method to see where your money goes and decide where you want it to go instead.",
    level: "Beginner",
    minutes: 6,
    topic: "Budgeting",
    sections: [
      {
        heading: "What a budget actually is",
        body: [
          "A budget has a scary reputation, but it is simply a plan for your money. It answers one question: where do I want my money to go before it disappears?",
          "Without a plan, money tends to leak out on small things you barely notice. A budget does not mean you can never spend on fun. It means you decide on purpose, instead of wondering where it all went at the end of the month.",
        ],
        takeaway:
          "A budget is a plan you make on purpose, not a punishment.",
      },
      {
        heading: "Start with what comes in",
        body: [
          "Begin with your net income, which is your take-home pay after taxes and other deductions. This is the real number to plan around, because it is the money that actually lands in your account.",
          "If your income changes month to month, like with gig work or shifting hours, use a low estimate based on a typical month. Planning around a smaller number means a good month becomes a pleasant surprise, not a budget you cannot keep.",
        ],
      },
      {
        heading: "Sort your spending into needs and wants",
        body: [
          "Needs are things you must have to live and stay stable: housing, food, transportation, and bills like a phone you need for work. Wants are everything else, like eating out, streaming, and new clothes.",
          "This sorting is the heart of budgeting. When money gets tight, wants are where you have the most control, so knowing which is which tells you exactly where you can adjust.",
        ],
      },
      {
        heading: "Try the 50/30/20 starting point",
        body: [
          "A simple guide is the 50/30/20 rule: aim for about half of your take-home pay on needs, about 30 percent on wants, and about 20 percent on saving and paying down debt.",
          "These are starting numbers, not strict rules. If your rent alone eats more than half your pay, your split will look different, and that is fine. The point is to give every dollar a job and to make sure saving is part of the plan from the start.",
        ],
        takeaway:
          "Pay yourself first: treat saving like a bill, not an afterthought.",
      },
      {
        heading: "Check in and adjust",
        body: [
          "A budget is not something you build once and forget. Look at it every couple of weeks and compare your plan to what really happened. The first few months are mostly learning what your real spending looks like.",
          "When something is off, adjust the plan rather than giving up on it. A budget that bends to fit your life is one you will actually keep using.",
        ],
      },
    ],
    quiz: [
      {
        id: "budget-q1",
        prompt: "When building a budget, which income number should you plan around?",
        options: [
          "Gross income, your pay before taxes",
          "Net income, your take-home pay after deductions",
          "The salary listed on the job offer",
          "Whatever is in your account right now",
        ],
        answerIndex: 1,
        explanation:
          "Net income is the money that actually reaches your account after taxes and deductions, so it is the real amount you have to work with.",
      },
      {
        id: "budget-q2",
        prompt: "In the 50/30/20 rule, what is the 20 percent meant for?",
        options: [
          "Wants like eating out and entertainment",
          "Needs like rent and groceries",
          "Saving and paying down debt",
          "Taxes",
        ],
        answerIndex: 2,
        explanation:
          "The 20 percent is set aside for saving and paying off debt, which is how a budget builds toward the future instead of only covering today.",
      },
      {
        id: "budget-q3",
        prompt: "Which of these is usually a want rather than a need?",
        options: [
          "Rent or housing",
          "A streaming subscription",
          "Groceries",
          "Bus fare to get to work",
        ],
        answerIndex: 1,
        explanation:
          "A streaming subscription is a want. Housing, food, and getting to work are needs you must cover to stay stable.",
      },
      {
        id: "budget-q4",
        prompt: "What does pay yourself first mean?",
        options: [
          "Spend on yourself before paying any bills",
          "Move money into savings before spending on other things",
          "Buy the most expensive option you can afford",
          "Only save whatever happens to be left at month end",
        ],
        answerIndex: 1,
        explanation:
          "Paying yourself first means setting savings aside as soon as you are paid, so it happens on purpose rather than relying on leftovers that may never appear.",
      },
    ],
  },
  {
    slug: "how-credit-scores-work",
    title: "How Credit Scores Work",
    summary:
      "Your credit score is a number that says how reliably you repay what you borrow. Learn what shapes it and how to build it from scratch.",
    level: "Beginner",
    minutes: 7,
    topic: "Credit",
    sections: [
      {
        heading: "What a credit score is",
        body: [
          "A credit score is a three-digit number, usually from 300 to 850, that sums up how reliably you pay back money you borrow. The higher the number, the more trustworthy you look to a lender.",
          "It matters because a good score makes borrowing easier and cheaper. The same car loan can cost thousands less over its life for someone with a high score than for someone with a low one.",
        ],
        takeaway:
          "A higher score means borrowing costs you less, sometimes by a lot.",
      },
      {
        heading: "What goes into the score",
        body: [
          "The biggest factor by far is payment history: do you pay your bills on time? Even one payment that is very late can leave a mark for years.",
          "The next biggest is how much of your available credit you are using, called credit utilization. If your card limit is 1,000 dollars, owing 200 looks much healthier than owing 900. Keeping the share low helps your score.",
          "Other pieces include how long you have used credit, the mix of credit types you have, and how often you apply for new credit. None of these outweigh simply paying on time and keeping balances low.",
        ],
      },
      {
        heading: "How to start from nothing",
        body: [
          "If you have never borrowed, you have no history yet, and that is normal. A common first step is a secured credit card, where a small cash deposit becomes your credit limit. It is designed for exactly this situation.",
          "Use it for a small regular purchase, then pay the bill in full and on time every month. Becoming an authorized user on a trusted family member's card can also help you build history.",
        ],
        takeaway:
          "Build credit by using a little and paying it off in full, every month.",
      },
      {
        heading: "Check your credit report",
        body: [
          "Your score is built from your credit report, a record of your accounts and payment history kept by credit bureaus. You are entitled to check your report for free, and doing so does not hurt your score.",
          "Reviewing it lets you catch errors or signs of fraud, like an account you never opened. Fixing mistakes early protects the score you are working to build.",
        ],
      },
    ],
    quiz: [
      {
        id: "credit-q1",
        prompt: "Which factor matters most for your credit score?",
        options: [
          "How much money you earn",
          "Whether you pay your bills on time",
          "How many bank accounts you have",
          "Your age",
        ],
        answerIndex: 1,
        explanation:
          "Payment history is the single biggest factor. Paying on time, every time, does more for your score than anything else.",
      },
      {
        id: "credit-q2",
        prompt:
          "Your credit card limit is 1,000 dollars. Which balance is best for your score?",
        options: ["900 dollars", "650 dollars", "150 dollars", "It makes no difference"],
        answerIndex: 2,
        explanation:
          "Lower credit utilization is better. Using 150 of a 1,000 dollar limit is just 15 percent, which looks far healthier than using most of the limit.",
      },
      {
        id: "credit-q3",
        prompt: "What is a secured credit card useful for?",
        options: [
          "Borrowing large amounts at a low rate",
          "Building credit from scratch using a cash deposit as the limit",
          "Avoiding all fees and interest forever",
          "Replacing a debit card",
        ],
        answerIndex: 1,
        explanation:
          "A secured card is backed by a deposit that becomes your limit. It is a common, beginner-friendly way to start building a credit history.",
      },
      {
        id: "credit-q4",
        prompt: "Does checking your own credit report lower your score?",
        options: [
          "Yes, every time you look",
          "No, checking your own report does not hurt your score",
          "Only if you check more than once a year",
          "Only if your score is already low",
        ],
        answerIndex: 1,
        explanation:
          "Checking your own report is a soft inquiry and never lowers your score. It is a healthy habit for catching errors and fraud early.",
      },
    ],
  },
];

/** Look up a single module by its slug. */
export function getLearnModule(slug: string): LearnModule | undefined {
  return learnModules.find((m) => m.slug === slug);
}

export const learnModuleCount = learnModules.length;
