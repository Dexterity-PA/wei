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
  {
    slug: "checking-vs-savings-accounts",
    title: "Checking vs Savings Accounts",
    summary:
      "Two accounts, two jobs: one for spending day to day, one for money you want to grow and leave alone.",
    topic: "Banking",
    level: "Beginner",
    minutes: 6,
    sections: [
      {
        heading: "Two accounts, two jobs",
        blocks: [
          {
            type: "paragraph",
            text: "A checking account is built for everyday spending. It is where your paycheck lands, where your debit card pulls from, and where you pay bills. Money moves in and out of it often.",
          },
          {
            type: "paragraph",
            text: "A savings account is built for money you want to set aside and not touch. It usually pays you a little extra, called interest, for keeping your money there. The idea is to leave it alone so it can grow.",
          },
        ],
      },
      {
        heading: "What APY means",
        blocks: [
          {
            type: "paragraph",
            text: "APY stands for annual percentage yield. It is the rate that tells you how much a savings account pays you over one year, including the effect of interest building on itself.",
          },
          {
            type: "paragraph",
            text: "Here is a simple example. If you keep 1,000 dollars in an account with a 4 percent APY and do not add or remove anything, you would have about 1,040 dollars after a year. Checking accounts usually pay very little or no APY, because they are made for spending, not growing.",
          },
          {
            type: "callout",
            title: "Higher APY, same dollars",
            text: "Two savings accounts can hold the same money but pay different amounts, because their APYs differ. Comparing the APY is how you see which one pays more for the exact same balance.",
          },
        ],
      },
      {
        heading: "Why keep a savings account at all",
        blocks: [
          {
            type: "paragraph",
            text: "Keeping savings separate from checking does two helpful things. It pays you interest on money you are not spending, and it puts a small wall between you and the cash so you are less likely to spend it by accident.",
          },
          {
            type: "list",
            items: [
              "Money for an emergency fund fits well in savings, ready but out of the way.",
              "Money for a goal months away, like a trip or a deposit, can grow there instead of sitting idle.",
              "Day to day money stays in checking, where you can reach it with a card any time.",
            ],
          },
        ],
      },
      {
        heading: "Moving money between them",
        blocks: [
          {
            type: "paragraph",
            text: "Most banks let you transfer money between your own checking and savings instantly through an app or website. So you do not lose access to your savings. You simply move it back to checking when you actually need to spend it.",
          },
          {
            type: "paragraph",
            text: "A common pattern is to keep enough in checking to cover the bills and spending you expect, and to keep the rest in savings where it earns interest. The split that fits one person will not match another, and that is normal.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "account-purpose",
        prompt: "What is a checking account mainly built for?",
        options: [
          "Growing money you never touch",
          "Everyday spending and paying bills",
          "Storing money the bank will not let you access",
          "Earning the highest possible interest",
        ],
        answerIndex: 1,
        explanation:
          "Checking is the everyday account: your pay lands there and your debit card and bills pull from it. Savings is the account built to hold money and earn interest.",
      },
      {
        id: "apy-meaning",
        prompt: "What does APY tell you?",
        options: [
          "How many times you can use your card",
          "How much an account pays you over a year",
          "The fee for opening an account",
          "How long the bank has existed",
        ],
        answerIndex: 1,
        explanation:
          "APY, annual percentage yield, is the yearly rate an account pays, including interest building on itself. Comparing APYs shows which account pays more for the same balance.",
      },
      {
        id: "savings-access",
        prompt: "If your money is in savings and you suddenly need it, what happens?",
        options: [
          "It is locked away until the end of the year",
          "You usually transfer it to checking, often instantly",
          "You lose it",
          "You must close the account to reach it",
        ],
        answerIndex: 1,
        explanation:
          "A savings account is not locked. Most banks let you move money to checking right away, so your savings stays available while still earning interest until you need it.",
      },
      {
        id: "where-emergency",
        prompt: "Which account is a common home for an emergency fund?",
        options: [
          "Checking, so it is spent quickly",
          "Savings, where it earns interest and stays a bit out of reach",
          "Neither; emergency money cannot be in a bank",
          "Whichever has the lowest APY",
        ],
        answerIndex: 1,
        explanation:
          "An emergency fund fits well in savings. It earns interest and sits one small step away from daily spending, so it is ready but less tempting to dip into.",
      },
    ],
  },
  {
    slug: "how-interest-works",
    title: "How Interest Works",
    summary:
      "Interest is the price of using money. The same idea works for you when you save and against you when you borrow.",
    topic: "Saving",
    level: "Beginner",
    minutes: 6,
    sections: [
      {
        heading: "Interest is the price of using money",
        blocks: [
          {
            type: "paragraph",
            text: "Interest is what it costs to use money that belongs to someone else for a while. It is usually shown as a percent of the amount, charged or paid over a set period such as a year.",
          },
          {
            type: "paragraph",
            text: "The starting amount of money is called the principal. Interest is figured as a percent of that principal. So a 5 percent rate on 100 dollars of principal is 5 dollars over a year.",
          },
        ],
      },
      {
        heading: "When interest works for you",
        blocks: [
          {
            type: "paragraph",
            text: "When you put money in a savings account, you are lending it to the bank. In return, the bank pays you interest. Here you are the one earning, and a higher rate means more money paid to you.",
          },
          {
            type: "paragraph",
            text: "Say you keep 500 dollars in an account paying 4 percent a year. After a year you would have about 520 dollars without lifting a finger. The 20 dollars is interest the bank paid you for keeping your money there.",
          },
          {
            type: "callout",
            title: "Earning side: higher is better",
            text: "When you are the one earning interest, such as in a savings account, a higher rate works in your favor. You compare rates to find where your money earns the most.",
          },
        ],
      },
      {
        heading: "When interest works against you",
        blocks: [
          {
            type: "paragraph",
            text: "When you borrow money, with a loan or a credit card, the lender charges you interest. Now you are the one paying. A higher rate means the borrowed money costs you more.",
          },
          {
            type: "paragraph",
            text: "For borrowing, the cost is often shown as an APR, the annual percentage rate. It is the yearly rate you pay to borrow. If you borrow 500 dollars at a 20 percent APR and do not pay it back for a year, the interest alone would be about 100 dollars on top of the 500 you owe.",
          },
        ],
      },
      {
        heading: "Same idea, two directions",
        blocks: [
          {
            type: "paragraph",
            text: "Saving and borrowing are two sides of the same coin. In both, someone pays for the use of money over time. The only question is which side you are on.",
          },
          {
            type: "list",
            items: [
              "Earning interest: you save or lend, and money is paid to you. Higher rates help you.",
              "Paying interest: you borrow, and you pay the lender. Higher rates cost you more.",
              "The longer money is borrowed or saved, the more interest adds up, in either direction.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "principal-meaning",
        prompt: "What is the principal?",
        options: [
          "The interest added on top",
          "The starting amount of money before interest",
          "A type of bank fee",
          "The person who runs the bank",
        ],
        answerIndex: 1,
        explanation:
          "The principal is the original amount, the money you start with or borrow. Interest is figured as a percent of that principal.",
      },
      {
        id: "saving-side",
        prompt: "When you keep money in a savings account, who pays interest to whom?",
        options: [
          "You pay the bank",
          "The bank pays you",
          "No interest is involved",
          "You pay another customer",
        ],
        answerIndex: 1,
        explanation:
          "In a savings account you are lending your money to the bank, so the bank pays you interest. On the earning side, a higher rate works in your favor.",
      },
      {
        id: "apr-meaning",
        prompt: "On a loan or credit card, what does the APR describe?",
        options: [
          "The yearly rate you pay to borrow",
          "The yearly rate the bank pays you",
          "A one-time signup gift",
          "The number of payments allowed",
        ],
        answerIndex: 0,
        explanation:
          "APR, the annual percentage rate, is the yearly cost of borrowing. When you are paying interest, a higher APR means the borrowed money costs you more.",
      },
      {
        id: "two-directions",
        prompt: "Why are saving and borrowing called two sides of the same idea?",
        options: [
          "They both involve paying for the use of money over time",
          "They both lower your taxes",
          "They are both free",
          "They both require a credit card",
        ],
        answerIndex: 0,
        explanation:
          "In both cases, someone pays for using money across time. The difference is direction: interest is paid to you when you save, and paid by you when you borrow.",
      },
    ],
  },
  {
    slug: "needs-wants-and-spending-plans",
    title: "Needs vs Wants and Spending Plans",
    summary:
      "A clear way to sort spending into needs and wants, then turn that into a plan that fits your real life.",
    topic: "Budgeting",
    level: "Beginner",
    minutes: 6,
    sections: [
      {
        heading: "What makes something a need",
        blocks: [
          {
            type: "paragraph",
            text: "A need is something that keeps your life running. Housing, basic food, transportation to work or school, and a phone you rely on are common needs. Without them, daily life gets hard fast.",
          },
          {
            type: "paragraph",
            text: "This is not about judging spending as good or bad. It is just a way to see which costs are doing essential work, so you know what has to be covered first.",
          },
        ],
      },
      {
        heading: "Wants are not the enemy",
        blocks: [
          {
            type: "paragraph",
            text: "A want is something that makes life more enjoyable but is not required to keep things running. Eating out, games, streaming, and new clothes beyond what you need are wants.",
          },
          {
            type: "paragraph",
            text: "Wants matter. A life that is all needs and no wants is hard to keep up. The point of sorting them is not to delete every want, but to spend on the ones you care about and skip the ones you do not.",
          },
        ],
      },
      {
        heading: "The gray area",
        blocks: [
          {
            type: "paragraph",
            text: "Many costs sit between a clear need and a clear want, and the line depends on your situation. A car is a need if it is the only way to get to work, and more of a want if good transit is right outside your door.",
          },
          {
            type: "list",
            items: [
              "Ask what the cost is really for. Food is a need, but a fancy dinner out is partly a want.",
              "Ask if a cheaper version covers the need. A phone plan can be a need while the most expensive plan is a want.",
              "Be honest, not harsh. The goal is a clear picture, not guilt.",
            ],
          },
        ],
      },
      {
        heading: "Turning it into a spending plan",
        blocks: [
          {
            type: "paragraph",
            text: "A spending plan is simply a list of where your money will go before it arrives. Once you have sorted needs from wants, the plan almost writes itself: cover the needs first, then decide how much of what is left goes to wants and to saving.",
          },
          {
            type: "callout",
            title: "A plan is a draft, not a cage",
            text: "Your first plan will not be perfect, and it does not have to be. Adjust it as you learn what your real costs are. A plan you can actually follow beats a strict one you abandon.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "need-definition",
        prompt: "Which best describes a need?",
        options: [
          "Anything you enjoy buying",
          "Something that keeps your daily life running",
          "Only the most expensive option",
          "Whatever your friends buy",
        ],
        answerIndex: 1,
        explanation:
          "A need keeps life running, such as housing, basic food, and a way to get to work or school. Sorting needs first shows what must be covered.",
      },
      {
        id: "wants-role",
        prompt: "Why not cut every want from a spending plan?",
        options: [
          "Wants are required by law",
          "A plan with no wants is hard to stick to",
          "Wants always cost more than needs",
          "Cutting wants raises your taxes",
        ],
        answerIndex: 1,
        explanation:
          "Wants make life enjoyable, and a plan that removes all of them is tough to follow. The aim is to spend on the wants you value and skip the ones you do not.",
      },
      {
        id: "gray-area",
        prompt: "Why can the same item be a need for one person and a want for another?",
        options: [
          "Prices change by the hour",
          "It depends on the person's situation and what the cost is really for",
          "Needs and wants mean the same thing",
          "Only banks decide the difference",
        ],
        answerIndex: 1,
        explanation:
          "The line depends on context. A car is a need if it is the only way to get to work, and more of a want where good transit is available. Asking what the cost is for helps you decide.",
      },
      {
        id: "spending-plan",
        prompt: "What is a spending plan?",
        options: [
          "A list of where your money will go before it arrives",
          "A record of past purchases only",
          "A loan from the bank",
          "A list of things you can never buy",
        ],
        answerIndex: 0,
        explanation:
          "A spending plan decides where money goes ahead of time: needs first, then wants and saving. It is a flexible draft you adjust, not a strict cage.",
      },
    ],
  },
  {
    slug: "reading-a-bank-statement",
    title: "Reading a Bank Statement",
    summary:
      "How to read the monthly summary of your account, spot fees, and catch errors before they cost you.",
    topic: "Banking",
    level: "Beginner",
    minutes: 6,
    sections: [
      {
        heading: "What a bank statement is",
        blocks: [
          {
            type: "paragraph",
            text: "A bank statement is a summary your bank sends, usually once a month, that lists everything that happened in your account. It shows money that came in, money that went out, and what is left.",
          },
          {
            type: "paragraph",
            text: "You can get it on paper or, more often now, in your bank app or website. Reading it regularly is one of the simplest ways to stay on top of your money.",
          },
        ],
      },
      {
        heading: "The main line items",
        blocks: [
          {
            type: "paragraph",
            text: "Most statements share the same basic parts. Once you know what to look for, any statement becomes easy to read.",
          },
          {
            type: "list",
            items: [
              "Opening balance: how much was in the account at the start of the period.",
              "Deposits or credits: money that came in, like a paycheck or a transfer.",
              "Withdrawals or debits: money that went out, like card purchases and bills.",
              "Closing balance: how much was left at the end of the period.",
            ],
          },
        ],
      },
      {
        heading: "Spotting fees",
        blocks: [
          {
            type: "paragraph",
            text: "Fees are charges the bank takes for certain services or events. They show up as withdrawals, often with a short label, and they are easy to miss if you do not look for them.",
          },
          {
            type: "callout",
            title: "Scan for small mystery charges",
            text: "A monthly maintenance fee, an overdraft fee, or an out-of-network ATM fee can each be small on its own. Spotting them on the statement is the first step to asking the bank whether they can be avoided.",
          },
        ],
      },
      {
        heading: "Catching errors and fraud",
        blocks: [
          {
            type: "paragraph",
            text: "Reading each line lets you catch two kinds of problems. An error is an honest mistake, like being charged twice for one purchase. Fraud is when someone uses your account without permission.",
          },
          {
            type: "paragraph",
            text: "If you see a charge you do not recognize, contact your bank promptly. Reporting a problem quickly usually gives you the strongest protection, so a fast look each month is worth the few minutes it takes.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "statement-what",
        prompt: "What does a bank statement show?",
        options: [
          "Only your future spending",
          "A summary of money in, money out, and what is left for a period",
          "Your credit score",
          "Other people's accounts",
        ],
        answerIndex: 1,
        explanation:
          "A statement summarizes a period of activity: deposits in, withdrawals out, and the balances at the start and end. It is the simplest way to see what happened in your account.",
      },
      {
        id: "debit-meaning",
        prompt: "On a statement, what is a withdrawal or debit?",
        options: [
          "Money that came into the account",
          "Money that went out of the account",
          "The bank's profit",
          "A type of interest",
        ],
        answerIndex: 1,
        explanation:
          "Withdrawals, also called debits, are money leaving the account, such as card purchases and bills. Deposits, or credits, are money coming in.",
      },
      {
        id: "find-fees",
        prompt: "Why scan a statement for fees?",
        options: [
          "Fees are illegal and should be reported to police",
          "Small fees are easy to miss but add up, and spotting them is the first step to avoiding them",
          "Fees raise your credit score",
          "Fees only appear once a year",
        ],
        answerIndex: 1,
        explanation:
          "Fees show up as small withdrawals that are easy to overlook. Finding them lets you ask the bank whether they can be avoided, which can save real money over time.",
      },
      {
        id: "unknown-charge",
        prompt: "You see a charge you do not recognize. What is a sensible first step?",
        options: [
          "Ignore it and hope it goes away",
          "Contact your bank promptly to ask about it",
          "Close every account you own",
          "Wait a full year before doing anything",
        ],
        answerIndex: 1,
        explanation:
          "An unfamiliar charge could be an error or fraud. Contacting the bank quickly usually gives you the strongest protection, which is why a fast monthly check matters.",
      },
    ],
  },
  {
    slug: "avoiding-common-bank-fees",
    title: "Avoiding Common Bank Fees",
    summary:
      "Overdraft, ATM, and minimum-balance fees are small on their own but add up. Here is how each works and how to dodge it.",
    topic: "Banking",
    level: "Beginner",
    minutes: 6,
    sections: [
      {
        heading: "Why fees matter",
        blocks: [
          {
            type: "paragraph",
            text: "A bank fee is a charge the bank takes for a service or for something that happens in your account. Any single fee can look small, but a few each month, repeated all year, can quietly become a real cost.",
          },
          {
            type: "paragraph",
            text: "The good news is that most common fees can be avoided once you know how they are triggered. Knowing the rules of your own account is most of the battle.",
          },
        ],
      },
      {
        heading: "Overdraft fees",
        blocks: [
          {
            type: "paragraph",
            text: "An overdraft happens when you spend more than you have in your account. The bank may cover the difference and then charge an overdraft fee for doing so. These fees are among the largest everyday charges.",
          },
          {
            type: "list",
            items: [
              "Keep a small cushion in checking so a forgotten charge does not push you below zero.",
              "Turn on low-balance alerts in your bank app so you get a warning before trouble.",
              "Ask your bank about overdraft settings; some let you decline coverage so a card is simply declined instead of overdrawn.",
            ],
          },
        ],
      },
      {
        heading: "ATM fees",
        blocks: [
          {
            type: "paragraph",
            text: "An ATM is a machine that dispenses cash. Using one that does not belong to your bank can trigger two charges at once: one from the machine's owner and one from your own bank for going out of network.",
          },
          {
            type: "callout",
            title: "Plan where you pull cash",
            text: "Using your own bank's ATMs, or getting cash back at a store checkout when offered, usually avoids ATM fees entirely. A little planning beats paying to reach your own money.",
          },
        ],
      },
      {
        heading: "Minimum-balance and monthly fees",
        blocks: [
          {
            type: "paragraph",
            text: "Some accounts charge a monthly maintenance fee just for being open. Many of these waive the fee if you meet a condition, such as keeping a minimum balance or setting up a direct deposit, which is your pay sent straight to the account.",
          },
          {
            type: "paragraph",
            text: "If an account charges a fee you keep paying, it is worth checking whether the bank offers an account with no monthly fee. Many do, especially for students and young people.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "fees-add-up",
        prompt: "Why pay attention to small bank fees?",
        options: [
          "They are the largest cost most people have",
          "Small fees, repeated each month, can add up to a real cost over a year",
          "They improve your credit score",
          "They are required for every account",
        ],
        answerIndex: 1,
        explanation:
          "Any one fee looks small, but several a month across a year add up. Most can be avoided once you know what triggers them.",
      },
      {
        id: "overdraft-trigger",
        prompt: "What causes an overdraft fee?",
        options: [
          "Checking your balance too often",
          "Spending more than you have in the account",
          "Keeping too much money in savings",
          "Using your own bank's ATM",
        ],
        answerIndex: 1,
        explanation:
          "An overdraft happens when you spend past your balance and the bank covers the gap. A small cushion and low-balance alerts help you avoid the fee.",
      },
      {
        id: "atm-double",
        prompt: "Why can an out-of-network ATM cost you twice?",
        options: [
          "The machine breaks your card",
          "Both the machine's owner and your own bank may charge a fee",
          "It counts as borrowing money",
          "It lowers your APY",
        ],
        answerIndex: 1,
        explanation:
          "Using an ATM that is not your bank's can bring two charges: one from the machine's owner and one from your bank for going out of network. Your own bank's ATMs usually avoid both.",
      },
      {
        id: "waive-monthly",
        prompt: "How do many accounts let you avoid a monthly maintenance fee?",
        options: [
          "By never using the account",
          "By meeting a condition like a minimum balance or a direct deposit",
          "By paying a larger one-time fee",
          "There is no way to avoid it",
        ],
        answerIndex: 1,
        explanation:
          "Many accounts waive the monthly fee if you meet a condition, such as a minimum balance or direct deposit. If you keep paying one, it is worth looking for an account with no monthly fee.",
      },
    ],
  },
  {
    slug: "what-insurance-is",
    title: "What Insurance Is and Why It Exists",
    summary:
      "Insurance is a way for many people to share the cost of rare, expensive events so no one person has to face them alone.",
    topic: "Insurance",
    level: "Core",
    minutes: 7,
    sections: [
      {
        heading: "Insurance is shared risk",
        blocks: [
          {
            type: "paragraph",
            text: "Insurance is an agreement where you pay a company a regular amount, and in return the company agrees to help pay for certain large, unexpected costs if they happen to you.",
          },
          {
            type: "paragraph",
            text: "It exists because some events, like a car crash or a serious illness, can cost far more than most people could pay at once. Insurance turns a rare, huge cost into a small, steady one you can plan for.",
          },
        ],
      },
      {
        heading: "Premium and deductible",
        blocks: [
          {
            type: "paragraph",
            text: "Two words come up in almost every insurance plan. Knowing them makes any policy easier to understand.",
          },
          {
            type: "list",
            items: [
              "Premium: the regular amount you pay to keep the insurance active, often monthly.",
              "Deductible: the amount you pay yourself first, before the insurance starts covering a cost.",
            ],
          },
          {
            type: "paragraph",
            text: "For example, if a plan has a 500 dollar deductible and you have a 2,000 dollar covered repair, you pay the first 500 and the insurance helps with the rest, based on the plan's terms.",
          },
        ],
      },
      {
        heading: "How risk pooling works",
        blocks: [
          {
            type: "paragraph",
            text: "Risk pooling is the idea at the heart of insurance. Many people each pay a premium into a shared pool. In any given year, only a few of them will have a major event and draw money out of the pool.",
          },
          {
            type: "callout",
            title: "Many pay a little so a few can be covered a lot",
            text: "Because most people stay healthy and crash-free in a given year, the pool can cover the few who do not. That is how a small premium can protect you against a cost you could never cover alone.",
          },
        ],
      },
      {
        heading: "Common types in plain terms",
        blocks: [
          {
            type: "paragraph",
            text: "You will run into several kinds of insurance as you go through life. They all follow the same shared-risk idea, just for different events.",
          },
          {
            type: "list",
            items: [
              "Health insurance: helps pay for doctor visits, medicine, and hospital care.",
              "Auto insurance: helps pay for damage or injury from a car crash, and is required to drive in most places.",
              "Renters insurance: helps replace your belongings if they are stolen or damaged in a place you rent.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "insurance-purpose",
        prompt: "What problem does insurance solve?",
        options: [
          "It makes everyday purchases cheaper",
          "It turns a rare, huge cost into a small, steady one you can plan for",
          "It guarantees you will never get sick",
          "It replaces the need for a budget",
        ],
        answerIndex: 1,
        explanation:
          "Insurance exists because some events cost more than most people could pay at once. Paying a steady amount protects you from a rare cost you could not handle alone.",
      },
      {
        id: "premium-meaning",
        prompt: "What is a premium?",
        options: [
          "The amount you pay yourself before coverage starts",
          "The regular amount you pay to keep the insurance active",
          "A bonus the company pays you",
          "A type of bank account",
        ],
        answerIndex: 1,
        explanation:
          "The premium is the regular payment, often monthly, that keeps your insurance active. The deductible is the separate amount you pay first before coverage kicks in.",
      },
      {
        id: "deductible-meaning",
        prompt: "A plan has a 500 dollar deductible and a 2,000 dollar covered cost. What do you pay first?",
        options: [
          "The full 2,000 dollars",
          "Nothing",
          "The first 500 dollars, then the plan helps with the rest",
          "Only the premium",
        ],
        answerIndex: 2,
        explanation:
          "The deductible is what you pay before coverage helps. Here you pay the first 500 dollars, and the insurance helps with the remaining cost based on the plan's terms.",
      },
      {
        id: "risk-pooling",
        prompt: "How does risk pooling let a small premium cover a large event?",
        options: [
          "The company prints extra money",
          "Many people pay in, but only a few have a major event in a given year",
          "The government pays for everything",
          "Premiums are returned in full each year",
        ],
        answerIndex: 1,
        explanation:
          "Many people pay premiums into a shared pool, and only a few draw from it in any year. That is how the pool can cover the few who face a big cost.",
      },
    ],
  },
  {
    slug: "renting-your-first-place",
    title: "Renting Your First Place",
    summary:
      "What it costs to move in, what a lease really is, and what to read closely before you sign.",
    topic: "Housing",
    level: "Next steps",
    minutes: 7,
    sections: [
      {
        heading: "What it costs to move in",
        blocks: [
          {
            type: "paragraph",
            text: "Renting means paying to live in a place that someone else owns. The owner is called the landlord. The biggest surprise for first-time renters is how much cash is due up front, before you even move in.",
          },
          {
            type: "list",
            items: [
              "First month's rent: the rent for your first month, usually due at signing.",
              "Security deposit: money the landlord holds in case of damage or unpaid rent, often equal to about one month's rent, and meant to be returned when you leave.",
              "Sometimes the last month's rent too, which means three rent-sized payments at once.",
            ],
          },
        ],
      },
      {
        heading: "What a lease is",
        blocks: [
          {
            type: "paragraph",
            text: "A lease is the written contract between you and the landlord. It sets the rent, how long you are agreeing to stay, and the rules for living there. Once you sign, both sides are bound by it.",
          },
          {
            type: "paragraph",
            text: "Most leases run for a set term, often one year. Leaving before the term ends can cost you, so the length of the lease is a real commitment, not just a formality.",
          },
        ],
      },
      {
        heading: "What to read before signing",
        blocks: [
          {
            type: "paragraph",
            text: "A lease is a binding document, so it is worth reading every part before you sign. A few sections deserve extra attention.",
          },
          {
            type: "list",
            items: [
              "The rent and when it is due, plus any late fee for paying after the due date.",
              "What is included, like water, heat, or internet, and what you pay separately. These extra costs are called utilities.",
              "The rules on pets, guests, and breaking the lease early.",
              "How and when you can get your security deposit back.",
            ],
          },
          {
            type: "callout",
            title: "Get promises in writing",
            text: "If the landlord agrees to fix something or include a utility, make sure it appears in the lease. A spoken promise is hard to enforce later. What is written is what counts.",
          },
        ],
      },
      {
        heading: "Getting your deposit back",
        blocks: [
          {
            type: "paragraph",
            text: "The security deposit is your money, held by the landlord, and you can usually get it back when you move out if the place is in good shape. Normal wear from everyday living is expected; real damage is not.",
          },
          {
            type: "paragraph",
            text: "A simple habit protects you: take dated photos when you move in and again when you move out. They show the condition of the place and make it easier to get your deposit returned.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "move-in-cost",
        prompt: "Why do first-time renters often need a lot of cash up front?",
        options: [
          "Rent must be paid two years ahead",
          "Move-in can require first month's rent plus a security deposit, sometimes more",
          "Landlords charge a tax",
          "You must buy the building",
        ],
        answerIndex: 1,
        explanation:
          "Moving in often means paying first month's rent and a security deposit at once, and sometimes last month's rent too. That can be several rent-sized payments together.",
      },
      {
        id: "lease-meaning",
        prompt: "What is a lease?",
        options: [
          "A receipt for one month of rent",
          "The written contract setting rent, length of stay, and the rules",
          "A type of deposit",
          "A list of nearby apartments",
        ],
        answerIndex: 1,
        explanation:
          "A lease is the binding contract between you and the landlord. It sets the rent, the term, and the rules, and both sides are held to it once signed.",
      },
      {
        id: "utilities-meaning",
        prompt: "In a lease, what are utilities?",
        options: [
          "The landlord's profit",
          "Services like water, heat, or internet that may be included or paid separately",
          "A penalty for late rent",
          "The furniture in the unit",
        ],
        answerIndex: 1,
        explanation:
          "Utilities are services such as water, heat, and internet. The lease should say which are included and which you pay on your own, since that changes your true monthly cost.",
      },
      {
        id: "deposit-photos",
        prompt: "How can dated move-in and move-out photos help you?",
        options: [
          "They lower your rent",
          "They show the condition of the place and help you get your deposit back",
          "They are required to sign a lease",
          "They replace the need to pay rent",
        ],
        answerIndex: 1,
        explanation:
          "Photos document the condition of the place over time. They make it easier to show the home was left in good shape and to get your security deposit returned.",
      },
    ],
  },
  {
    slug: "buying-vs-leasing-a-car",
    title: "Buying vs Leasing a Car",
    summary:
      "Two ways to drive a car you did not pay for all at once, and how to compare them by total cost, not the monthly payment.",
    topic: "Life skills",
    level: "Next steps",
    minutes: 7,
    sections: [
      {
        heading: "Two ways to get a car",
        blocks: [
          {
            type: "paragraph",
            text: "Few people pay the full price of a car in cash. The two common alternatives are buying with a loan and leasing. They feel similar month to month but lead to very different places.",
          },
          {
            type: "paragraph",
            text: "With a loan you are working toward owning the car. With a lease you are paying to use the car for a set time, then giving it back. Knowing which you want changes the math.",
          },
        ],
      },
      {
        heading: "Buying with a loan",
        blocks: [
          {
            type: "paragraph",
            text: "An auto loan lets you borrow the price of the car and pay it back over time, with interest. The interest rate is shown as an APR, the yearly cost of borrowing. When the loan is paid off, the car is yours.",
          },
          {
            type: "callout",
            title: "After the loan ends, the payments stop",
            text: "Once a loan is fully paid, you own the car and can drive it with no monthly payment. A car often lasts well beyond the loan, so the years after payoff are where buying can save money.",
          },
        ],
      },
      {
        heading: "Leasing a car",
        blocks: [
          {
            type: "paragraph",
            text: "A lease is like a long-term rental. You make monthly payments to use the car for a set period, often two or three years, and then return it. You usually never own it.",
          },
          {
            type: "list",
            items: [
              "Monthly payments are often lower than a loan for the same car, which can be tempting.",
              "Leases set a mileage limit, and going over it adds charges at the end.",
              "When the lease ends you have no car and no value to show for the payments, so the cycle starts again.",
            ],
          },
        ],
      },
      {
        heading: "Depreciation and total cost",
        blocks: [
          {
            type: "paragraph",
            text: "Depreciation is the drop in a car's value over time as it ages and gets used. A new car loses value fastest in its early years. This matters because it shapes the true cost of each path.",
          },
          {
            type: "paragraph",
            text: "The clearest way to compare is total cost over the whole time you will have the car, not the monthly payment alone. A lower monthly payment can still cost more in the long run if it never leads to ownership. Add up every payment, plus fees, to see the real picture.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "loan-vs-lease",
        prompt: "What is the main difference between buying with a loan and leasing?",
        options: [
          "Leasing is always cheaper in total",
          "A loan works toward owning the car; a lease pays to use it for a time, then return it",
          "Only a lease charges interest",
          "There is no real difference",
        ],
        answerIndex: 1,
        explanation:
          "With a loan you are paying to own the car. With a lease you pay to use it for a set period and give it back, usually never owning it.",
      },
      {
        id: "after-payoff",
        prompt: "What happens after an auto loan is fully paid off?",
        options: [
          "You must return the car",
          "You own the car and can drive it with no monthly payment",
          "The interest starts over",
          "You owe a final lease fee",
        ],
        answerIndex: 1,
        explanation:
          "When a loan is paid off, the car is yours and the payments stop. Since cars often last well past the loan, those payment-free years are where buying can save money.",
      },
      {
        id: "depreciation-meaning",
        prompt: "What is depreciation?",
        options: [
          "A tax on new cars",
          "The drop in a car's value over time as it ages and is used",
          "The interest on a loan",
          "A fee for leasing",
        ],
        answerIndex: 1,
        explanation:
          "Depreciation is the loss of value as a car ages, fastest in its early years. It shapes the true cost of buying or leasing.",
      },
      {
        id: "compare-total",
        prompt: "What is the clearest way to compare buying and leasing?",
        options: [
          "Pick the lowest monthly payment",
          "Compare total cost over the whole time you will have the car, including fees",
          "Choose whichever is newer",
          "Compare only the down payment",
        ],
        answerIndex: 1,
        explanation:
          "A low monthly payment can still cost more overall if it never leads to ownership. Adding up every payment plus fees over the full period shows the real cost.",
      },
    ],
  },
  {
    slug: "scams-and-protecting-your-money",
    title: "Scams and Protecting Your Money",
    summary:
      "Most scams use the same few tricks. Learn the patterns and the red flags so you can spot them before they cost you.",
    topic: "Safety",
    level: "Core",
    minutes: 7,
    sections: [
      {
        heading: "How scams work",
        blocks: [
          {
            type: "paragraph",
            text: "A scam is a trick designed to get your money or your personal information. Most scams, no matter the story, lean on the same few pressures. Spotting the pressure is often easier than spotting the lie.",
          },
          {
            type: "list",
            items: [
              "Urgency: act now or something bad happens. Rushing keeps you from thinking it through.",
              "Secrecy: do not tell anyone. This stops you from getting a second opinion.",
              "Unusual payment: pay with gift cards, wire transfers, or apps that are hard to reverse.",
            ],
          },
        ],
      },
      {
        heading: "Phishing",
        blocks: [
          {
            type: "paragraph",
            text: "Phishing is a message, by email, text, or call, that pretends to be from a company or person you trust in order to get your passwords, card numbers, or other private details.",
          },
          {
            type: "callout",
            title: "Go to the source, not the link",
            text: "If a message says there is a problem with your account, do not click its link. Open the company's app or type its real website address yourself. A real company will still be there; a fake link will not match.",
          },
        ],
      },
      {
        heading: "Fake checks and overpayment",
        blocks: [
          {
            type: "paragraph",
            text: "In a fake check scam, someone sends you a check for more than you are owed and asks you to send the extra back, often quickly. The check looks real at first, so your bank may show the money as available.",
          },
          {
            type: "paragraph",
            text: "Days later the check bounces, meaning it was never good, and the bank takes that money back out. By then you have already sent your own real money to the scammer. If someone overpays and asks for the difference back, treat it as a warning sign.",
          },
        ],
      },
      {
        heading: "Payday traps and red flags",
        blocks: [
          {
            type: "paragraph",
            text: "Not every trap is outright fraud. A payday loan is a small, short-term loan meant to be repaid on your next payday, but it often carries an extremely high APR, the yearly cost of borrowing. Many borrowers cannot repay on time and take another loan to cover the first, sliding into a cycle of debt.",
          },
          {
            type: "list",
            items: [
              "A guaranteed prize that asks you to pay a fee first is a red flag.",
              "A request to pay only in gift cards or wire transfers is a red flag.",
              "Pressure to act this minute and tell no one is a red flag.",
              "When unsure, slow down, hang up, and check with someone you trust.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "scam-pressures",
        prompt: "Which pressures do most scams rely on?",
        options: [
          "Patience and transparency",
          "Urgency, secrecy, and hard-to-reverse payments",
          "Low prices and free shipping",
          "Long contracts and fine print",
        ],
        answerIndex: 1,
        explanation:
          "Most scams push urgency, secrecy, and unusual payments like gift cards or wires. Noticing the pressure is often easier than spotting the lie itself.",
      },
      {
        id: "phishing-response",
        prompt: "A text says your bank account has a problem and gives a link. What is safest?",
        options: [
          "Click the link and log in quickly",
          "Open the bank's own app or type its real website yourself instead of using the link",
          "Reply with your password",
          "Forward it to your contacts",
        ],
        answerIndex: 1,
        explanation:
          "This is classic phishing. Do not use the message's link. Reach the company through its real app or website so you are not handing details to a fake page.",
      },
      {
        id: "fake-check",
        prompt: "Someone overpays you with a check and asks for the extra back fast. Why is this a warning sign?",
        options: [
          "Overpaying is always a generous gift",
          "The check may later bounce, and by then your real money is gone",
          "Checks cannot be used for payment",
          "It raises your credit score",
        ],
        answerIndex: 1,
        explanation:
          "In a fake check scam the check looks good at first but bounces days later. The bank reclaims that money, while the real money you sent back is already gone.",
      },
      {
        id: "payday-trap",
        prompt: "Why are payday loans considered a trap for many borrowers?",
        options: [
          "They are free to repay",
          "They often carry a very high APR and can lead to borrowing again to repay the first loan",
          "They always build credit",
          "They are illegal everywhere",
        ],
        answerIndex: 1,
        explanation:
          "Payday loans often carry an extremely high yearly cost. Many borrowers cannot repay on time and take a new loan to cover the old one, sliding into a cycle of debt.",
      },
    ],
  },
  {
    slug: "setting-financial-goals",
    title: "Setting Financial Goals",
    summary:
      "How to turn a vague wish about money into a clear goal, then break it into steps small enough to actually take.",
    topic: "Saving",
    level: "Beginner",
    minutes: 6,
    sections: [
      {
        heading: "Why goals help",
        blocks: [
          {
            type: "paragraph",
            text: "A financial goal is a specific result you want your money to reach, like saving a certain amount or paying off a debt. A goal gives your saving a reason, which makes it far easier to keep going.",
          },
          {
            type: "paragraph",
            text: "Saving with no goal feels like effort for nothing. Saving toward something real, even a small thing, turns the same effort into visible progress.",
          },
        ],
      },
      {
        heading: "Short term versus long term",
        blocks: [
          {
            type: "paragraph",
            text: "Goals come in different time frames, and sorting them by time helps you plan. The two main buckets are short term and long term.",
          },
          {
            type: "list",
            items: [
              "Short term: something within roughly a year, like building a small emergency fund or saving for a laptop.",
              "Long term: something years away, like a car, a move, or money set aside for the future.",
            ],
          },
          {
            type: "paragraph",
            text: "You can work toward both at once. A common approach is a small steady amount toward a long-term goal while a short-term goal gets the rest.",
          },
        ],
      },
      {
        heading: "Make a goal specific",
        blocks: [
          {
            type: "paragraph",
            text: "A vague goal like save more is hard to act on because you cannot tell when you have done it. A specific goal names an amount and a date, so you always know where you stand.",
          },
          {
            type: "callout",
            title: "Amount plus date beats a wish",
            text: "Save 600 dollars for a laptop by the end of the year is a goal you can plan around. Save more is just a hope. The amount and the date are what turn it into something you can measure.",
          },
        ],
      },
      {
        heading: "Break it into steps",
        blocks: [
          {
            type: "paragraph",
            text: "Once a goal has an amount and a date, the math gives you the step. Divide the amount by the number of weeks or months you have, and you get the small, regular amount to set aside.",
          },
          {
            type: "paragraph",
            text: "For example, 600 dollars over 12 months is 50 dollars a month. A big number becomes a small, repeatable action. Automating that amount, so it moves to savings on its own, makes the steps even easier to keep.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "goal-purpose",
        prompt: "Why does having a goal make saving easier?",
        options: [
          "It removes the need to save",
          "It gives the saving a reason and turns effort into visible progress",
          "It raises your pay",
          "It lowers prices",
        ],
        answerIndex: 1,
        explanation:
          "A goal gives saving a purpose. Working toward something real, even small, turns effort that felt pointless into progress you can see.",
      },
      {
        id: "short-vs-long",
        prompt: "Which is an example of a short-term goal?",
        options: [
          "Saving for a small emergency fund within a year",
          "Money set aside for decades from now",
          "A house bought ten years out",
          "Any goal with no date at all",
        ],
        answerIndex: 0,
        explanation:
          "Short-term goals sit within roughly a year, like a small emergency fund or saving for a laptop. Long-term goals are years away.",
      },
      {
        id: "specific-goal",
        prompt: "What makes a goal specific enough to act on?",
        options: [
          "It sounds ambitious",
          "It names an amount and a date",
          "It is shared with friends",
          "It involves a credit card",
        ],
        answerIndex: 1,
        explanation:
          "An amount and a date let you measure progress and know when you are done. Save more is a wish; save 600 dollars by year end is a goal you can plan.",
      },
      {
        id: "break-into-steps",
        prompt: "You want to save 600 dollars over 12 months. What is the monthly step?",
        options: [
          "600 dollars",
          "50 dollars",
          "12 dollars",
          "It cannot be calculated",
        ],
        answerIndex: 1,
        explanation:
          "Divide the amount by the time: 600 dollars over 12 months is 50 dollars a month. Splitting a goal this way turns a big number into a small, repeatable action.",
      },
    ],
  },
  {
    slug: "giving-and-money",
    title: "Giving and Money",
    summary:
      "What it means to give, how to give in a way you can trust, and how giving connects money to community.",
    topic: "Giving",
    level: "Next steps",
    minutes: 6,
    sections: [
      {
        heading: "What giving means",
        blocks: [
          {
            type: "paragraph",
            text: "Giving is choosing to use some of what you have to help others or support a cause you care about. It can be money, but it does not have to be. Many people give time and skills too.",
          },
          {
            type: "paragraph",
            text: "Giving is a personal choice, not a duty, and there is no required amount. The point of learning about it is so that when you do choose to give, you can do it in a way that is safe and effective.",
          },
        ],
      },
      {
        heading: "Ways people give",
        blocks: [
          {
            type: "paragraph",
            text: "Giving takes many forms, and money is only one of them. Each form helps in a different way.",
          },
          {
            type: "list",
            items: [
              "Money: a donation to a charity, which is an organization set up to help a cause.",
              "Time: volunteering, where you give hours of help instead of cash.",
              "Skills: using something you are good at, like tutoring or fixing things, to help others.",
            ],
          },
        ],
      },
      {
        heading: "Giving wisely",
        blocks: [
          {
            type: "paragraph",
            text: "Sadly, some scams pretend to be charities, especially after disasters when people most want to help. A few simple checks let you give with confidence.",
          },
          {
            type: "callout",
            title: "Look it up before you give",
            text: "Before donating, search the organization's name and look it up on a charity-checking website. Give through the charity's own official site rather than a link in a message, and be wary of any group that pressures you to give right now.",
          },
        ],
      },
      {
        heading: "Giving and community",
        blocks: [
          {
            type: "paragraph",
            text: "Giving is one of the ways money connects to the people around you. A small gift, joined with many others, can fund things no single person could pay for alone, much like the risk pooling that makes insurance work.",
          },
          {
            type: "paragraph",
            text: "This idea sits at the center of the Wealth Equity Initiative, the nonprofit behind this site. Its mission is to widen access to financial education, and its programs have reached more than 5,000 students across more than 40 schools. Learning how money works, and choosing to share what you can, are two parts of the same goal: a community where more people get a fair start.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "giving-forms",
        prompt: "Besides money, how else can a person give?",
        options: [
          "Only by donating cash",
          "By giving time and skills, such as volunteering or tutoring",
          "Giving must always be money",
          "By spending more on themselves",
        ],
        answerIndex: 1,
        explanation:
          "Giving takes many forms. Volunteering time and sharing skills like tutoring help in ways that money alone cannot, and they cost no cash.",
      },
      {
        id: "charity-meaning",
        prompt: "What is a charity?",
        options: [
          "A type of bank account",
          "An organization set up to help a cause",
          "A loan you repay with interest",
          "A government tax",
        ],
        answerIndex: 1,
        explanation:
          "A charity is an organization created to support a cause. Donations to it are one common way people give money to help others.",
      },
      {
        id: "give-safely",
        prompt: "What is a smart step before donating money to an organization?",
        options: [
          "Send it immediately when pressured",
          "Look the organization up and give through its official site",
          "Only give through links in text messages",
          "Pay in gift cards to be safe",
        ],
        answerIndex: 1,
        explanation:
          "Some scams pose as charities. Looking up the group and giving through its official site, rather than a message link, helps make sure your gift reaches a real cause.",
      },
      {
        id: "giving-community",
        prompt: "How is giving similar to the risk pooling behind insurance?",
        options: [
          "Both are required by law",
          "Many small contributions joined together can fund what no one person could alone",
          "Both pay you interest",
          "Neither involves other people",
        ],
        answerIndex: 1,
        explanation:
          "Like an insurance pool, giving gathers many small contributions into something larger. Together they can support things a single person could not fund on their own.",
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
