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
  {
    slug: "how-a-paycheck-works",
    title: "How a Paycheck Works",
    summary:
      "Why the number on your offer letter is bigger than the money that lands in your account.",
    topic: "Income",
    level: "Beginner",
    minutes: 6,
    sections: [
      {
        heading: "Gross pay versus net pay",
        blocks: [
          {
            type: "paragraph",
            text: "Gross pay is the full amount you earn before anything is taken out. Net pay, often called take-home pay, is what is left after deductions, and it is the money that actually reaches your bank account.",
          },
          {
            type: "paragraph",
            text: "Say a job pays 15 dollars an hour and you work 40 hours in a week. Your gross pay is 600 dollars. After taxes and other deductions, your net pay might be closer to 510 dollars. The gap is normal, and knowing it helps you plan around the real number.",
          },
        ],
      },
      {
        heading: "Where the money goes",
        blocks: [
          {
            type: "paragraph",
            text: "The amount removed from your gross pay is split among a few things. Some is tax, and some may be benefits you signed up for.",
          },
          {
            type: "list",
            items: [
              "Federal income tax: money sent to the national government, based on how much you earn.",
              "State income tax: a similar deduction in most states, though a few states have none.",
              "FICA: a required tax that funds Social Security and Medicare, explained below.",
              "Benefits: optional items like health insurance or retirement savings, if your job offers them.",
            ],
          },
        ],
      },
      {
        heading: "What FICA means",
        blocks: [
          {
            type: "paragraph",
            text: "FICA stands for the Federal Insurance Contributions Act. It is the tax that pays for Social Security, which supports people in retirement and those with disabilities, and Medicare, which helps cover health care for older adults.",
          },
          {
            type: "paragraph",
            text: "You pay a set share of your wages toward FICA, and your employer pays a matching share. On your pay stub it often appears as two lines, one labeled Social Security and one labeled Medicare.",
          },
        ],
      },
      {
        heading: "Reading your pay stub",
        blocks: [
          {
            type: "paragraph",
            text: "A pay stub is the summary that comes with each paycheck. It lists your gross pay at the top, each deduction in the middle, and your net pay at the bottom. It also shows year-to-date totals, which add up everything earned and withheld so far this year.",
          },
          {
            type: "callout",
            title: "Withholding is a prepayment",
            text: "The income tax taken from each check is called withholding. It is an estimate sent to the government on your behalf during the year. When you file your taxes, the final bill is settled against what was already withheld.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "gross-vs-net",
        prompt: "What is the difference between gross pay and net pay?",
        options: [
          "They are two words for the same number",
          "Gross is before deductions; net is what you take home after them",
          "Net is always larger than gross",
          "Gross pay only applies to salaried jobs",
        ],
        answerIndex: 1,
        explanation:
          "Gross pay is the full amount earned before anything is removed. Net pay is what remains after taxes and other deductions, and it is the money that reaches your account.",
      },
      {
        id: "what-fica-funds",
        prompt: "What does the FICA tax pay for?",
        options: [
          "Roads and bridges only",
          "Social Security and Medicare",
          "Your employer's profits",
          "Your personal savings account",
        ],
        answerIndex: 1,
        explanation:
          "FICA funds Social Security, which supports retirees and people with disabilities, and Medicare, which helps cover health care for older adults.",
      },
      {
        id: "withholding-meaning",
        prompt: "What is income tax withholding?",
        options: [
          "A fee your bank charges to hold your check",
          "An estimated tax payment sent to the government from each paycheck during the year",
          "Money your employer keeps for itself",
          "A penalty for earning too much",
        ],
        answerIndex: 1,
        explanation:
          "Withholding is an estimated prepayment of income tax taken from each check. When you file, the final amount owed is settled against what was already withheld.",
      },
    ],
  },
  {
    slug: "opening-a-bank-account",
    title: "Opening and Using a Bank Account",
    summary:
      "Checking, savings, the fees to watch for, and why having an account beats not having one.",
    topic: "Banking",
    level: "Beginner",
    minutes: 6,
    sections: [
      {
        heading: "Checking versus savings",
        blocks: [
          {
            type: "paragraph",
            text: "Most banks offer two everyday accounts. A checking account is built for spending: you use it for a debit card, bills, and direct deposit of your pay. A savings account is built for setting money aside, and it usually pays a little interest while you leave the money alone.",
          },
          {
            type: "paragraph",
            text: "Many people use both. Day-to-day money sits in checking, and money for later sits in savings, which keeps the two from getting mixed up.",
          },
        ],
      },
      {
        heading: "Fees to watch for",
        blocks: [
          {
            type: "paragraph",
            text: "Accounts can carry fees, but most can be avoided once you know what they are.",
          },
          {
            type: "list",
            items: [
              "Overdraft fee: charged when you spend more than your balance, often around 35 dollars per slip.",
              "Monthly maintenance fee: a flat charge some accounts add, often waived if you set up direct deposit or keep a minimum balance.",
              "Out-of-network ATM fee: charged when you use a cash machine that is not your bank's, sometimes from both the ATM and your bank.",
            ],
          },
          {
            type: "callout",
            title: "Many accounts are fee-free",
            text: "Plenty of banks and credit unions offer accounts with no monthly fee and no minimum balance. Comparing a few before you open one can save real money over a year.",
          },
        ],
      },
      {
        heading: "What being unbanked costs",
        blocks: [
          {
            type: "paragraph",
            text: "Being unbanked means having no bank account at all. It sounds free, but it often costs more. Without an account, people may rely on check-cashing stores that take a percentage of every check, and on money orders that charge a fee each time a bill needs to be paid.",
          },
          {
            type: "paragraph",
            text: "Those small charges add up. Cashing a 600 dollar paycheck at a 2 percent fee costs 12 dollars, every payday, for a service a checking account usually provides for free.",
          },
        ],
      },
      {
        heading: "Keeping your money safe",
        blocks: [
          {
            type: "paragraph",
            text: "Money in a bank is protected in ways cash is not. If your debit card is lost or stolen, you can report it and the card is shut off. Cash that goes missing is simply gone.",
          },
          {
            type: "callout",
            title: "Insured deposits",
            text: "At a bank, deposits are insured by the FDIC, and at a credit union by the NCUA, up to a set limit per depositor. If the bank itself failed, your insured money would still be returned to you.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "checking-vs-savings",
        prompt: "What is a checking account mainly built for?",
        options: [
          "Locking money away so you cannot touch it",
          "Everyday spending, like a debit card, bills, and direct deposit",
          "Earning the highest possible interest",
          "Replacing a credit score",
        ],
        answerIndex: 1,
        explanation:
          "Checking is the spending account: debit card, bills, and direct deposit of pay. Savings is meant for money you set aside and leave alone.",
      },
      {
        id: "overdraft-fee",
        prompt: "When does an overdraft fee usually happen?",
        options: [
          "When you deposit a check",
          "When you spend more money than your balance holds",
          "When you check your balance online",
          "When you keep too much in savings",
        ],
        answerIndex: 1,
        explanation:
          "An overdraft fee is charged when a purchase pushes your balance below zero. Watching your balance and turning off overdraft coverage can help avoid it.",
      },
      {
        id: "unbanked-cost",
        prompt: "Why can being unbanked end up costing more?",
        options: [
          "Banks pay you to stay unbanked",
          "Check-cashing and money-order fees add up over time",
          "Cash earns interest on its own",
          "It has no effect on cost at all",
        ],
        answerIndex: 1,
        explanation:
          "Without an account, people often pay to cash checks and to buy money orders for bills. Those repeated fees can cost more than a free checking account would.",
      },
      {
        id: "deposit-insurance",
        prompt: "What does FDIC or NCUA insurance do for your account?",
        options: [
          "Guarantees your investments will grow",
          "Protects your deposits up to a set limit if the bank or credit union fails",
          "Removes all account fees",
          "Raises your credit score",
        ],
        answerIndex: 1,
        explanation:
          "Deposit insurance means that if the institution failed, your insured money would still be returned to you, up to the limit per depositor.",
      },
    ],
  },
  {
    slug: "saving-and-emergency-funds",
    title: "Saving and Emergency Funds",
    summary:
      "Why a cushion of savings matters, how much to aim for, and where to keep it.",
    topic: "Saving",
    level: "Beginner",
    minutes: 5,
    sections: [
      {
        heading: "Why an emergency fund matters",
        blocks: [
          {
            type: "paragraph",
            text: "An emergency fund is money set aside for surprises: a car repair, a phone replacement, or a stretch without income. Its job is to keep one bad week from turning into debt.",
          },
          {
            type: "paragraph",
            text: "Without a cushion, an unexpected 400 dollar bill often goes on a credit card and grows with interest. With a cushion, the same bill is just paid, and life moves on.",
          },
        ],
      },
      {
        heading: "How much to aim for",
        blocks: [
          {
            type: "paragraph",
            text: "There is no single right number, but a common way to build one is in stages.",
          },
          {
            type: "list",
            items: [
              "A starter cushion, such as 500 dollars, handles most small emergencies.",
              "A larger goal is a few months of basic expenses, built up slowly over time.",
              "What counts is starting. A fund grows from steady small additions, not one big deposit.",
            ],
          },
          {
            type: "callout",
            title: "Match the goal to your life",
            text: "Someone with steady support needs less than someone fully on their own. The point is having something set aside, then adding to it as you can.",
          },
        ],
      },
      {
        heading: "Where to keep it",
        blocks: [
          {
            type: "paragraph",
            text: "An emergency fund should be easy to reach but not too easy to spend by accident. A separate savings account works well: the money is safe, it earns a little interest, and it is one step removed from your everyday checking.",
          },
          {
            type: "paragraph",
            text: "Because you may need it on short notice, an emergency fund is usually kept as plain cash savings rather than tied up in something that can drop in value or take days to access.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "purpose",
        prompt: "What is the main job of an emergency fund?",
        options: [
          "To earn the highest possible return",
          "To cover surprise costs so they do not become debt",
          "To pay your regular monthly bills",
          "To improve your credit score directly",
        ],
        answerIndex: 1,
        explanation:
          "An emergency fund exists to absorb surprises, like a car repair, so an unexpected cost does not turn into borrowing and interest.",
      },
      {
        id: "starter-goal",
        prompt: "What is a reasonable first milestone for an emergency fund?",
        options: [
          "A full year of pay before you start",
          "A small starter cushion, such as 500 dollars",
          "Nothing until you earn a lot more",
          "Exactly one dollar",
        ],
        answerIndex: 1,
        explanation:
          "A starter cushion around 500 dollars covers many small emergencies. From there, the fund can grow toward a few months of expenses over time.",
      },
      {
        id: "where-to-keep",
        prompt: "Where is an emergency fund usually kept?",
        options: [
          "In a separate savings account that stays easy to reach",
          "Locked away where it takes weeks to access",
          "Spread across many risky bets",
          "As cash hidden where it can be lost",
        ],
        answerIndex: 0,
        explanation:
          "A separate savings account keeps the money safe, slightly growing, and reachable on short notice, which is exactly what an emergency fund needs.",
      },
    ],
  },
  {
    slug: "understanding-debt",
    title: "Understanding Debt",
    summary:
      "What debt really costs, the difference between borrowing that builds and borrowing that drains, and the minimum-payment trap.",
    topic: "Debt",
    level: "Core",
    minutes: 7,
    sections: [
      {
        heading: "What debt is",
        blocks: [
          {
            type: "paragraph",
            text: "Debt is money you borrow now and agree to pay back later, usually with interest. Interest is the fee a lender charges for letting you use their money, shown as a percentage of what you owe.",
          },
          {
            type: "paragraph",
            text: "If you borrow 1,000 dollars at 10 percent interest for a year, you pay back the 1,000 plus about 100 dollars in interest. The higher the rate and the longer you take, the more the borrowing costs.",
          },
        ],
      },
      {
        heading: "An honest look at good and bad debt",
        blocks: [
          {
            type: "paragraph",
            text: "People often sort debt into good and bad, but the honest version is about cost and what the borrowing buys. Debt is more defensible when it is cheap and pays for something with lasting value, and more draining when it is expensive and pays for something that fades fast.",
          },
          {
            type: "list",
            items: [
              "A low-rate student loan or mortgage funds something durable, like an education or a home.",
              "High-rate debt for everyday spending tends to cost the most and leave the least behind.",
              "No debt is automatically good or bad. The rate, the terms, and the use all matter.",
            ],
          },
        ],
      },
      {
        heading: "Interest and APR",
        blocks: [
          {
            type: "paragraph",
            text: "APR stands for annual percentage rate. It is the yearly cost of borrowing, including interest and certain fees, written as one percentage so you can compare loans fairly.",
          },
          {
            type: "callout",
            title: "Compare the APR, not the monthly payment",
            text: "A lower monthly payment can hide a higher total cost if the loan lasts longer. The APR and the total you will repay tell the fuller story.",
          },
        ],
      },
      {
        heading: "The minimum payment trap",
        blocks: [
          {
            type: "paragraph",
            text: "Many debts, like credit cards, let you pay a small minimum each month. Paying only the minimum keeps the account in good standing, but most of your money goes to interest, so the balance barely shrinks.",
          },
          {
            type: "paragraph",
            text: "A 1,000 dollar balance at a high rate, paid only at the minimum, can take years to clear and cost hundreds of dollars in extra interest. Paying more than the minimum, whenever possible, is how the balance actually comes down.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "what-is-interest",
        prompt: "What is interest on a debt?",
        options: [
          "A reward the lender pays you for borrowing",
          "The fee a lender charges for letting you use their money",
          "A one-time tax on loans",
          "The same thing as your monthly payment",
        ],
        answerIndex: 1,
        explanation:
          "Interest is the cost of borrowing, charged as a percentage of what you owe. The higher the rate and the longer you take, the more you pay.",
      },
      {
        id: "good-bad-honest",
        prompt: "What is the most honest way to judge a debt?",
        options: [
          "All debt is good if it is large",
          "Look at the rate, the terms, and what the borrowing buys",
          "All debt is bad and should never be used",
          "Only the monthly payment matters",
        ],
        answerIndex: 1,
        explanation:
          "No debt is automatically good or bad. Cheap borrowing for something lasting is easier to defend than expensive borrowing for things that fade fast.",
      },
      {
        id: "apr-meaning",
        prompt: "Why is the APR useful when comparing loans?",
        options: [
          "It hides the fees so the loan looks cheaper",
          "It states the yearly cost, including interest and certain fees, as one number",
          "It only applies to credit cards",
          "It guarantees a low monthly payment",
        ],
        answerIndex: 1,
        explanation:
          "APR rolls interest and certain fees into a single yearly percentage, which lets you compare loans fairly instead of by monthly payment alone.",
      },
      {
        id: "minimum-trap",
        prompt: "What happens if you pay only the minimum on a credit card balance?",
        options: [
          "The balance disappears quickly",
          "Most of your payment goes to interest, so the balance shrinks slowly",
          "You are charged no interest at all",
          "The card is closed immediately",
        ],
        answerIndex: 1,
        explanation:
          "Minimum payments keep the account current, but most of the money covers interest. The balance can linger for years and cost far more unless you pay extra.",
      },
    ],
  },
  {
    slug: "compound-interest-and-time",
    title: "Compound Interest and Time",
    summary:
      "How money can earn money on its own, and why starting early is the most powerful move you have.",
    topic: "Saving",
    level: "Core",
    minutes: 6,
    sections: [
      {
        heading: "What compound interest is",
        blocks: [
          {
            type: "paragraph",
            text: "Compound interest means you earn interest not only on the money you put in, but also on the interest it has already earned. Over time, the growth feeds on itself and speeds up.",
          },
          {
            type: "paragraph",
            text: "Put 100 dollars where it earns 5 percent a year. After one year you have 105 dollars. The next year, 5 percent is figured on 105, not 100, so you earn a little more. Each year the base is bigger, so each year adds more than the last.",
          },
        ],
      },
      {
        heading: "Why starting early matters",
        blocks: [
          {
            type: "paragraph",
            text: "The longer money compounds, the more the later years do the heavy lifting. Time, not just the amount, is what makes the total grow large.",
          },
          {
            type: "list",
            items: [
              "A person who starts setting money aside at 20 gives it far more years to compound than one who starts at 35.",
              "Because the early dollars compound the longest, they often grow more than dollars added much later.",
              "This is the core idea behind starting early: time does work that bigger deposits later cannot fully catch up to.",
            ],
          },
          {
            type: "callout",
            title: "Small and early can beat large and late",
            text: "A modest amount left to grow for decades can end up larger than a bigger amount that only had a few years to compound. The extra ingredient is time.",
          },
        ],
      },
      {
        heading: "It works both ways",
        blocks: [
          {
            type: "paragraph",
            text: "Compounding is powerful in your favor when you are saving, and powerful against you when you owe. The same math that grows savings also grows an unpaid debt, since interest piles onto interest.",
          },
          {
            type: "paragraph",
            text: "That is why a high-rate balance left alone can balloon, while steady savings left alone can quietly build. The direction depends on which side of the interest you are on.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "definition",
        prompt: "What makes compound interest different from simple growth?",
        options: [
          "You earn interest only on your original deposit",
          "You earn interest on your deposit and on the interest it has already earned",
          "It only works for very large amounts",
          "It removes all risk from saving",
        ],
        answerIndex: 1,
        explanation:
          "With compounding, interest is figured on a growing base that includes past interest, so the growth speeds up over time.",
      },
      {
        id: "early-start",
        prompt: "Why does starting early matter so much with compound interest?",
        options: [
          "Early dollars compound the longest, so time does extra work",
          "Banks only allow young people to earn interest",
          "Interest rates are always higher for beginners",
          "Starting early lowers your taxes",
        ],
        answerIndex: 0,
        explanation:
          "The dollars that compound the longest tend to grow the most. More years of compounding can outweigh adding larger amounts much later.",
      },
      {
        id: "both-ways",
        prompt: "How does compounding affect money you owe?",
        options: [
          "It cannot affect debt, only savings",
          "It can grow an unpaid balance as interest piles onto interest",
          "It cancels the debt over time",
          "It always shrinks what you owe",
        ],
        answerIndex: 1,
        explanation:
          "Compounding works on both sides. On savings it builds your balance, and on an unpaid debt it grows what you owe as interest stacks on interest.",
      },
    ],
  },
  {
    slug: "credit-cards-without-the-trap",
    title: "Credit Cards Without the Trap",
    summary:
      "How a credit card actually works, why paying in full changes everything, and how to build credit without getting burned.",
    topic: "Credit",
    level: "Core",
    minutes: 7,
    sections: [
      {
        heading: "How a credit card works",
        blocks: [
          {
            type: "paragraph",
            text: "A credit card lets you borrow money up to a limit set by the card company. Each purchase is a small loan. Once a month you get a statement, a summary of everything you charged, with a balance due and a due date.",
          },
          {
            type: "paragraph",
            text: "Between the statement and the due date there is usually a grace period. If you pay the full balance within it, you are not charged interest on those purchases. That window is the key to using a card without it costing extra.",
          },
        ],
      },
      {
        heading: "Pay in full to skip the APR",
        blocks: [
          {
            type: "paragraph",
            text: "APR is the annual percentage rate, the yearly cost of carrying a balance. Card APRs are often high, so an unpaid balance grows quickly.",
          },
          {
            type: "list",
            items: [
              "Pay the full statement balance every month, and the grace period means you owe no interest.",
              "Pay only part, and interest starts on the rest, often at a steep rate.",
              "Treating the card like a debit card, spending only what you can cover, keeps it free to use.",
            ],
          },
          {
            type: "callout",
            title: "The trap is the leftover balance",
            text: "A credit card is not expensive on its own. The cost comes from carrying a balance month to month, where the APR turns convenience into a growing bill.",
          },
        ],
      },
      {
        heading: "Building credit safely",
        blocks: [
          {
            type: "paragraph",
            text: "Used carefully, a card builds your credit history, the track record lenders look at later for an apartment or a loan. The habits that build credit are the same ones that keep a card cheap.",
          },
          {
            type: "list",
            items: [
              "Pay on time, every time, since payment history carries the most weight.",
              "Keep your balance low compared with your limit, which lenders read as steady use.",
              "Keep older accounts open, because a longer history generally helps.",
            ],
          },
        ],
      },
      {
        heading: "Watch-outs",
        blocks: [
          {
            type: "paragraph",
            text: "A few features cost more than they appear to. A cash advance, taking cash from a card, often charges interest right away with no grace period. Late payments can trigger fees and hurt your credit. Some cards carry an annual fee, a flat yearly charge just to hold the card.",
          },
          {
            type: "paragraph",
            text: "None of these make a card bad. They are simply the parts worth reading about before you use them.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "grace-period",
        prompt: "What does the grace period on a credit card let you do?",
        options: [
          "Skip paying the balance forever",
          "Avoid interest on purchases if you pay the full balance in time",
          "Borrow with no limit",
          "Raise your credit limit automatically",
        ],
        answerIndex: 1,
        explanation:
          "If you pay the full statement balance within the grace period, those purchases carry no interest. That window is what keeps a card free to use.",
      },
      {
        id: "pay-in-full",
        prompt: "How do you avoid paying APR on a credit card?",
        options: [
          "Pay only the minimum each month",
          "Pay the full statement balance every month",
          "Never use the card at all after opening it",
          "Take a cash advance instead",
        ],
        answerIndex: 1,
        explanation:
          "Paying the full balance each month means the grace period keeps you interest-free. Carrying a balance is what lets the high APR add up.",
      },
      {
        id: "build-credit",
        prompt: "Which habit helps build credit while keeping a card cheap?",
        options: [
          "Paying on time and keeping the balance low",
          "Maxing out the limit each month",
          "Paying late but in full",
          "Opening many cards at once",
        ],
        answerIndex: 0,
        explanation:
          "On-time payments and a low balance compared with your limit both build credit and keep costs down, since payment history matters most.",
      },
      {
        id: "cash-advance",
        prompt: "Why is a cash advance usually an expensive feature?",
        options: [
          "It is free of any charges",
          "It often charges interest right away, with no grace period",
          "It raises your credit score the most",
          "It replaces your monthly payment",
        ],
        answerIndex: 1,
        explanation:
          "A cash advance commonly starts charging interest immediately and skips the grace period, which makes it one of the costlier ways to use a card.",
      },
    ],
  },
  {
    slug: "paying-for-college",
    title: "Paying for College",
    summary:
      "FAFSA, the difference between grants, scholarships, and loans, and why the sticker price is rarely what you pay.",
    topic: "College",
    level: "Core",
    minutes: 7,
    sections: [
      {
        heading: "Start with the FAFSA",
        blocks: [
          {
            type: "paragraph",
            text: "FAFSA stands for the Free Application for Federal Student Aid. It is a form you fill out to apply for help paying for college, and it is free. Filling it out is the doorway to most aid, including grants, work-study, and federal loans.",
          },
          {
            type: "paragraph",
            text: "Many states and colleges also use the FAFSA to decide their own aid, so submitting it can unlock money from several sources at once. It is generally worth completing even if you are unsure whether you qualify.",
          },
        ],
      },
      {
        heading: "Grants, scholarships, and loans",
        blocks: [
          {
            type: "paragraph",
            text: "Aid comes in two broad kinds: money you keep and money you repay. Knowing which is which matters more than the total offered.",
          },
          {
            type: "list",
            items: [
              "Grants: money you usually do not repay, often based on financial need.",
              "Scholarships: money you usually do not repay, often based on merit, a talent, or other criteria.",
              "Loans: money you do repay, with interest, after you leave school.",
            ],
          },
          {
            type: "callout",
            title: "Free money first",
            text: "Grants and scholarships do not have to be paid back, so they lower the cost in a way loans do not. Two offers of the same dollar amount can be very different depending on how much is grant versus loan.",
          },
        ],
      },
      {
        heading: "Sticker price versus net price",
        blocks: [
          {
            type: "paragraph",
            text: "The sticker price is the full published cost of a college before any aid. The net price is what you actually pay after grants and scholarships are subtracted. They can be very far apart.",
          },
          {
            type: "paragraph",
            text: "A college with a 50,000 dollar sticker price might have a net price of 20,000 dollars for a given student after aid, while a cheaper-looking school offers less help. Comparing net prices, not sticker prices, shows the real cost.",
          },
        ],
      },
      {
        heading: "A note on student loans",
        blocks: [
          {
            type: "paragraph",
            text: "Federal student loans come in two common types. A subsidized loan does not build interest while you are in school, because the government covers it for that time. An unsubsidized loan builds interest the whole time, including while you study.",
          },
          {
            type: "paragraph",
            text: "Reading which loans are in an offer, and how much each will cost over time, helps you understand the full price of a college, not just the first-year number.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "fafsa-purpose",
        prompt: "What is the FAFSA used for?",
        options: [
          "Applying to a specific college",
          "Applying for financial aid like grants, work-study, and federal loans",
          "Paying your tuition bill directly",
          "Choosing your major",
        ],
        answerIndex: 1,
        explanation:
          "The FAFSA is the free form that opens the door to most aid. Many states and colleges also use it to decide their own help.",
      },
      {
        id: "grants-vs-loans",
        prompt: "What is the key difference between a grant and a loan?",
        options: [
          "A grant is repaid with interest; a loan is free",
          "A grant usually does not have to be repaid; a loan does, with interest",
          "They are the same thing",
          "A loan is only for housing",
        ],
        answerIndex: 1,
        explanation:
          "Grants and scholarships are generally money you keep. Loans are money you repay with interest, which is why free aid lowers cost more.",
      },
      {
        id: "net-price",
        prompt: "What does the net price of a college tell you?",
        options: [
          "The full published cost before any aid",
          "What you actually pay after grants and scholarships are subtracted",
          "The cost of textbooks only",
          "The price of the most expensive school nearby",
        ],
        answerIndex: 1,
        explanation:
          "Net price is the real cost after free aid is applied. Comparing net prices, not sticker prices, shows what each school would actually cost you.",
      },
      {
        id: "subsidized-loan",
        prompt: "What makes a subsidized federal loan different from an unsubsidized one?",
        options: [
          "It never has to be repaid",
          "It does not build interest while you are in school",
          "It has no due date",
          "It is only for graduate students",
        ],
        answerIndex: 1,
        explanation:
          "On a subsidized loan, the government covers the interest while you are in school. An unsubsidized loan builds interest the whole time, including during school.",
      },
    ],
  },
  {
    slug: "taxes-101",
    title: "Taxes 101",
    summary:
      "Why you file, what a W-2 is, the truth about refunds, and the standard deduction at a student level.",
    topic: "Taxes",
    level: "Core",
    minutes: 6,
    sections: [
      {
        heading: "Why you file taxes",
        blocks: [
          {
            type: "paragraph",
            text: "Filing taxes means sending the government a yearly form that reports how much you earned and settles up what you owe. During the year, tax is usually withheld from your paychecks as an estimate. Filing checks that estimate against the real amount.",
          },
          {
            type: "paragraph",
            text: "If too much was withheld, you get money back. If too little was, you owe the difference. Filing is how that final number is figured out.",
          },
        ],
      },
      {
        heading: "The W-2",
        blocks: [
          {
            type: "paragraph",
            text: "A W-2 is a form your employer sends after the year ends. It reports how much you earned and how much was withheld for taxes. You use it to fill out your tax return.",
          },
          {
            type: "callout",
            title: "Keep your W-2",
            text: "Each employer you worked for sends its own W-2, usually in January or early February. You need every one of them to file an accurate return.",
          },
        ],
      },
      {
        heading: "The refund myth",
        blocks: [
          {
            type: "paragraph",
            text: "A tax refund feels like a gift, but it is really your own money coming back. A refund means more was withheld from your paychecks during the year than you actually owed, so the government returns the extra.",
          },
          {
            type: "paragraph",
            text: "A large refund is not free money. It means a chunk of your pay was held all year and given back later without interest. Understanding that helps explain why a refund is a return of your money, not a bonus.",
          },
        ],
      },
      {
        heading: "The standard deduction",
        blocks: [
          {
            type: "paragraph",
            text: "The standard deduction is an amount of income the government does not tax. It lowers the portion of your earnings that tax is figured on, which lowers the tax itself.",
          },
          {
            type: "paragraph",
            text: "For a student with a part-time job, the standard deduction often covers a good share of their earnings, so the income tax owed can be small or even zero. Tax was likely still withheld during the year, which is why filing can return it.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "why-file",
        prompt: "What does filing a tax return actually do?",
        options: [
          "It sets your hourly wage",
          "It settles what you owe against what was already withheld during the year",
          "It opens a bank account",
          "It raises your credit score",
        ],
        answerIndex: 1,
        explanation:
          "Filing compares the tax withheld from your pay against the real amount owed. If too much was withheld you get money back; if too little, you owe.",
      },
      {
        id: "w2-form",
        prompt: "What is a W-2?",
        options: [
          "A bill from the government",
          "A form from your employer showing what you earned and what was withheld",
          "A type of bank account",
          "A loan application",
        ],
        answerIndex: 1,
        explanation:
          "A W-2 is sent by each employer after the year ends. It reports your earnings and withholding, and you use it to fill out your tax return.",
      },
      {
        id: "refund-truth",
        prompt: "What does a tax refund really represent?",
        options: [
          "Free money the government adds to your pay",
          "Your own money returned because too much was withheld during the year",
          "A loan you have to repay",
          "A penalty for filing",
        ],
        answerIndex: 1,
        explanation:
          "A refund is the extra that was withheld from your paychecks coming back to you. It is a return of your own money, not a bonus.",
      },
      {
        id: "standard-deduction",
        prompt: "What does the standard deduction do?",
        options: [
          "Adds a fee to your taxes",
          "Shields part of your income from being taxed",
          "Doubles your withholding",
          "Replaces the need to file",
        ],
        answerIndex: 1,
        explanation:
          "The standard deduction is income the government does not tax. For a student with a part-time job, it can cover much of their earnings, leaving little or no tax owed.",
      },
    ],
  },
  {
    slug: "first-big-financial-decisions",
    title: "Your First Big Financial Decisions",
    summary:
      "Renting a place, getting a first car, picking a phone plan, and reading a contract before you sign it.",
    topic: "Life skills",
    level: "Next steps",
    minutes: 7,
    sections: [
      {
        heading: "Renting your first place",
        blocks: [
          {
            type: "paragraph",
            text: "Renting means paying to live somewhere you do not own. A lease is the contract that sets the rules: how much rent is, when it is due, and how long you are committed. Signing it is a real promise, often for a full year.",
          },
          {
            type: "list",
            items: [
              "A security deposit is money you pay up front and can get back if you leave the place in good shape.",
              "The total monthly cost can include utilities like electricity and water, which are sometimes separate from rent.",
              "Breaking a lease early often costs extra, so the length of the commitment matters.",
            ],
          },
        ],
      },
      {
        heading: "Your first car",
        blocks: [
          {
            type: "paragraph",
            text: "The price tag on a car is only part of what it costs to own. The full cost includes things you pay for as long as you keep it.",
          },
          {
            type: "list",
            items: [
              "Insurance: a required monthly or yearly cost to drive legally.",
              "Fuel and charging: an ongoing cost that depends on how far you drive.",
              "Maintenance and repairs: oil changes, tires, and surprises that add up over time.",
            ],
          },
          {
            type: "callout",
            title: "Think in total cost, not sticker price",
            text: "A cheaper car with high insurance and frequent repairs can cost more to own than a slightly pricier one that is cheaper to run. The monthly total is the number that hits your budget.",
          },
        ],
      },
      {
        heading: "Phone plans",
        blocks: [
          {
            type: "paragraph",
            text: "Phone plans bundle calling, texting, and data, the internet your phone uses away from wifi, for a monthly price. Plans vary a lot, and the cheapest sticker price is not always the lowest real cost.",
          },
          {
            type: "paragraph",
            text: "Some plans tie you to paying off a phone over two years, so leaving early means paying the rest at once. Others charge more once you pass a data limit. Reading what is included keeps the bill from surprising you.",
          },
        ],
      },
      {
        heading: "Reading a contract",
        blocks: [
          {
            type: "paragraph",
            text: "A contract is a binding agreement. Once you sign, you are responsible for its terms, even the ones in small print you did not read. Taking a few minutes before signing can save a lot later.",
          },
          {
            type: "list",
            items: [
              "Look for the total cost, including fees that are not in the headline price.",
              "Find the length of the commitment and what it costs to end it early.",
              "Check for automatic renewals, where a deal continues and bills you unless you cancel.",
              "If something is unclear, it is fair to ask questions before signing, not after.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "security-deposit",
        prompt: "What is a security deposit when renting?",
        options: [
          "A fee you never get back",
          "Money paid up front that can be returned if you leave the place in good shape",
          "The same as your monthly rent",
          "A tax on renters",
        ],
        answerIndex: 1,
        explanation:
          "A security deposit is paid at the start and is meant to be returned when you move out, as long as the place is left in good condition.",
      },
      {
        id: "car-total-cost",
        prompt: "Why is a car's sticker price only part of what it costs?",
        options: [
          "The sticker price already includes everything",
          "Insurance, fuel, and maintenance are ongoing costs of owning it",
          "Cars never need repairs",
          "Insurance is a one-time charge",
        ],
        answerIndex: 1,
        explanation:
          "Owning a car adds insurance, fuel or charging, and maintenance on top of the purchase price. The monthly total is what affects your budget.",
      },
      {
        id: "phone-data",
        prompt: "On a phone plan, what is data?",
        options: [
          "The number of contacts you can store",
          "The internet your phone uses when it is away from wifi",
          "A fee for sending texts",
          "The age of your phone",
        ],
        answerIndex: 1,
        explanation:
          "Data is the mobile internet your phone uses off wifi. Passing a plan's data limit can raise the bill, so it pays to know what is included.",
      },
      {
        id: "auto-renewal",
        prompt: "What is an automatic renewal in a contract?",
        options: [
          "A discount applied at the end",
          "A clause where the agreement continues and bills you unless you cancel",
          "A refund of all fees",
          "A rule that ends the contract for you",
        ],
        answerIndex: 1,
        explanation:
          "An automatic renewal keeps a deal going and keeps charging you unless you actively cancel. Spotting it before signing avoids surprise bills.",
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
