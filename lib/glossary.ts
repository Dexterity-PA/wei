/**
 * Glossary data: plain-language definitions of money and banking terms aimed at
 * a student with no background. One file is the single source of truth for the
 * glossary page; the UI derives the A-Z jump bar and category filters from it.
 *
 * Authoring rules (match the project copy rules in lib/site.ts):
 *   - Definitions are neutral, plain English. Explain the word, do not give
 *     personalized money guidance.
 *   - No em dashes. Use commas, periods, parentheses, or "to" for ranges.
 *   - Terms whose names are themselves sometimes used as service claims
 *     (Fiduciary, Robo-advisor) are defined here purely as vocabulary.
 *
 * To add a term: add an entry below. Slugs must be unique and stable (they are
 * used as anchor ids and React keys). Keep each term in exactly one category.
 */

export const GLOSSARY_CATEGORIES = [
  "Banking",
  "Saving",
  "Budgeting",
  "Credit",
  "Debt",
  "Investing",
  "Income",
  "Taxes",
  "Insurance",
  "College & Aid",
] as const;

export type GlossaryCategory = (typeof GLOSSARY_CATEGORIES)[number];

export type GlossaryTerm = {
  /** Display name of the term. */
  term: string;
  /** Unique, stable slug used as an anchor id and React key. */
  slug: string;
  category: GlossaryCategory;
  /** Plain-English definition, one to three sentences. */
  definition: string;
  /** Optional slugs of related terms to cross-link. */
  related?: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  // ------------------------------------------------------------------ Banking
  {
    term: "Account Number",
    slug: "account-number",
    category: "Banking",
    definition:
      "The unique number that identifies your specific bank account. You share it (along with your routing number) to receive a direct deposit or set up a payment.",
    related: ["routing-number", "direct-deposit"],
  },
  {
    term: "ACH Transfer",
    slug: "ach-transfer",
    category: "Banking",
    definition:
      "An electronic transfer of money between banks over the Automated Clearing House network. Direct deposit of a paycheck and most online bill payments move this way. It is usually free but can take a day or two.",
    related: ["direct-deposit", "wire-transfer"],
  },
  {
    term: "APY (Annual Percentage Yield)",
    slug: "apy",
    category: "Banking",
    definition:
      "The real yearly rate you earn on savings once compounding is included. A higher APY means your money grows faster. Use it to compare savings accounts fairly.",
    related: ["compound-interest", "high-yield-savings-account", "interest"],
  },
  {
    term: "ATM",
    slug: "atm",
    category: "Banking",
    definition:
      "An Automated Teller Machine, the cash machine where you withdraw or deposit money using your debit card. Using an ATM outside your bank's network can add a fee.",
    related: ["debit-card"],
  },
  {
    term: "Checking Account",
    slug: "checking-account",
    category: "Banking",
    definition:
      "A bank account built for everyday spending. You pay for things and get paid through it using a debit card, transfers, or checks. It usually earns little or no interest.",
    related: ["savings-account", "debit-card", "direct-deposit"],
  },
  {
    term: "Credit Union",
    slug: "credit-union",
    category: "Banking",
    definition:
      "A not-for-profit alternative to a bank that is owned by its members. Credit unions often offer lower fees and better rates, and your money is insured much like at a bank.",
    related: ["bank", "fdic"],
  },
  {
    term: "Bank",
    slug: "bank",
    category: "Banking",
    definition:
      "A company that holds your money, lets you spend and save it, and lends money to others. Money in a U.S. bank is protected up to a federal limit if the bank fails.",
    related: ["credit-union", "fdic"],
  },
  {
    term: "Debit Card",
    slug: "debit-card",
    category: "Banking",
    definition:
      "A card linked to your checking account that spends money you already have. When you pay, the amount comes straight out of your balance, so you cannot borrow with it.",
    related: ["checking-account", "credit-card"],
  },
  {
    term: "Direct Deposit",
    slug: "direct-deposit",
    category: "Banking",
    definition:
      "When a payer, like an employer, sends money straight into your bank account electronically instead of handing you a paper check. It is faster and there is nothing to cash.",
    related: ["paycheck", "ach-transfer", "account-number"],
  },
  {
    term: "FDIC",
    slug: "fdic",
    category: "Banking",
    definition:
      "The Federal Deposit Insurance Corporation, a government agency that protects the money you keep in a bank, generally up to 250,000 dollars per depositor, if the bank fails.",
    related: ["bank", "credit-union"],
  },
  {
    term: "Joint Account",
    slug: "joint-account",
    category: "Banking",
    definition:
      "A bank account shared by two or more people, where everyone can deposit and withdraw. Common between partners or a student and a parent.",
    related: ["checking-account"],
  },
  {
    term: "Minimum Balance",
    slug: "minimum-balance",
    category: "Banking",
    definition:
      "The lowest amount some accounts require you to keep on hand. Drop below it and the bank may charge a monthly fee.",
    related: ["statement", "overdraft-fee"],
  },
  {
    term: "Mobile Banking",
    slug: "mobile-banking",
    category: "Banking",
    definition:
      "Managing your money from your bank's phone app: checking balances, moving money, depositing a check by photo, and paying bills.",
    related: ["online-banking"],
  },
  {
    term: "NSF (Non-Sufficient Funds)",
    slug: "nsf",
    category: "Banking",
    definition:
      "What happens when you try to pay and your account does not have enough money. The payment usually bounces and the bank may charge an NSF fee.",
    related: ["overdraft", "overdraft-fee"],
  },
  {
    term: "Online Banking",
    slug: "online-banking",
    category: "Banking",
    definition:
      "Using your bank's website to view accounts, transfer money, and pay bills without visiting a branch.",
    related: ["mobile-banking"],
  },
  {
    term: "Overdraft",
    slug: "overdraft",
    category: "Banking",
    definition:
      "Spending more than you have in your account, so the balance goes below zero. The bank may cover it for a fee or decline the payment.",
    related: ["overdraft-fee", "nsf"],
  },
  {
    term: "Overdraft Fee",
    slug: "overdraft-fee",
    category: "Banking",
    definition:
      "A charge, often around 35 dollars, that a bank adds when it covers a payment you did not have the money for. Many banks now let you turn overdraft coverage off.",
    related: ["overdraft", "nsf"],
  },
  {
    term: "Routing Number",
    slug: "routing-number",
    category: "Banking",
    definition:
      "A nine-digit number that identifies your bank. Paired with your account number, it lets money move into or out of your account.",
    related: ["account-number", "direct-deposit"],
  },
  {
    term: "Savings Account",
    slug: "savings-account",
    category: "Banking",
    definition:
      "A bank account meant for money you want to set aside and grow a little. It pays interest and is not built for daily spending.",
    related: ["checking-account", "high-yield-savings-account", "interest"],
  },
  {
    term: "Statement",
    slug: "statement",
    category: "Banking",
    definition:
      "A summary your bank or card issuer sends each month listing every transaction, your balance, and any fees. Reviewing it helps you catch mistakes and fraud.",
    related: ["minimum-balance"],
  },
  {
    term: "Wire Transfer",
    slug: "wire-transfer",
    category: "Banking",
    definition:
      "A fast, direct electronic transfer of money from one bank to another, often used for large or urgent amounts. It usually costs a fee and cannot be reversed.",
    related: ["ach-transfer"],
  },

  // ------------------------------------------------------------------- Saving
  {
    term: "Automatic Savings",
    slug: "automatic-savings",
    category: "Saving",
    definition:
      "Setting up a recurring transfer that moves money into savings on its own, often right after payday. Saving without having to remember makes it stick.",
    related: ["emergency-fund", "direct-deposit"],
  },
  {
    term: "Certificate of Deposit (CD)",
    slug: "certificate-of-deposit",
    category: "Saving",
    definition:
      "A savings product where you lock money away for a set time, like six months or a year, in exchange for a fixed interest rate. Taking it out early usually means a penalty.",
    related: ["interest", "liquidity"],
  },
  {
    term: "Compound Interest",
    slug: "compound-interest",
    category: "Saving",
    definition:
      "Interest that earns interest. You earn on your original money and on the interest already added, so savings grow faster over time. It is the engine behind long-term saving and investing.",
    related: ["simple-interest", "principal", "apy"],
  },
  {
    term: "Emergency Fund",
    slug: "emergency-fund",
    category: "Saving",
    definition:
      "Money set aside for surprise costs like a car repair or a missed paycheck. A common goal is enough to cover three to six months of basic expenses, kept somewhere easy to reach.",
    related: ["automatic-savings", "liquidity", "high-yield-savings-account"],
  },
  {
    term: "High-Yield Savings Account",
    slug: "high-yield-savings-account",
    category: "Saving",
    definition:
      "A savings account that pays a much higher interest rate than a regular one, often offered by online banks. A good home for an emergency fund.",
    related: ["savings-account", "apy", "emergency-fund"],
  },
  {
    term: "Interest",
    slug: "interest",
    category: "Saving",
    definition:
      "The cost of borrowing money or the reward for saving it. When you save, the bank pays you interest. When you borrow, you pay interest.",
    related: ["interest-rate", "compound-interest", "principal"],
  },
  {
    term: "Interest Rate",
    slug: "interest-rate",
    category: "Saving",
    definition:
      "The price of borrowing or the reward for saving, shown as a yearly percentage. On a loan it sets how much extra you pay; on savings it sets how much you earn.",
    related: ["interest", "apr", "principal"],
  },
  {
    term: "Liquidity",
    slug: "liquidity",
    category: "Saving",
    definition:
      "How quickly you can turn something into cash without losing value. Money in a checking account is highly liquid; a house is not.",
    related: ["emergency-fund", "certificate-of-deposit"],
  },
  {
    term: "Money Market Account",
    slug: "money-market-account",
    category: "Saving",
    definition:
      "A savings account that often pays a bit more interest and may come with limited check-writing. It is insured like other bank accounts.",
    related: ["savings-account", "high-yield-savings-account"],
  },
  {
    term: "Principal",
    slug: "principal",
    category: "Saving",
    definition:
      "The original amount of money, before any interest. When you save, it is what you put in; when you borrow, it is what you owe before interest is added.",
    related: ["interest", "compound-interest"],
  },
  {
    term: "Simple Interest",
    slug: "simple-interest",
    category: "Saving",
    definition:
      "Interest calculated only on the original amount, not on interest already earned. It grows in a straight line, unlike compound interest.",
    related: ["compound-interest", "principal"],
  },
  {
    term: "Yield",
    slug: "yield",
    category: "Saving",
    definition:
      "The income you earn from savings or an investment, shown as a percentage of what you put in. A 4 percent yield means you earn 4 dollars a year for every 100 saved.",
    related: ["apy", "interest"],
  },

  // ---------------------------------------------------------------- Budgeting
  {
    term: "50/30/20 Rule",
    slug: "50-30-20-rule",
    category: "Budgeting",
    definition:
      "A simple budget guide: aim to spend about 50 percent of take-home pay on needs, 30 percent on wants, and 20 percent on saving and paying off debt. Adjust it to your life.",
    related: ["budget", "needs-vs-wants", "net-pay"],
  },
  {
    term: "Budget",
    slug: "budget",
    category: "Budgeting",
    definition:
      "A plan for your money that compares what comes in against what goes out, so you can decide where each dollar goes before you spend it.",
    related: ["cash-flow", "fixed-expense", "variable-expense"],
  },
  {
    term: "Cash Flow",
    slug: "cash-flow",
    category: "Budgeting",
    definition:
      "The movement of money in and out over a period of time. Positive cash flow means more comes in than goes out; negative means you are spending more than you earn.",
    related: ["budget", "net-pay"],
  },
  {
    term: "Discretionary Spending",
    slug: "discretionary-spending",
    category: "Budgeting",
    definition:
      "Money spent on wants rather than needs, like eating out, games, or concerts. It is the easiest part of a budget to cut when money is tight.",
    related: ["needs-vs-wants", "variable-expense"],
  },
  {
    term: "Fixed Expense",
    slug: "fixed-expense",
    category: "Budgeting",
    definition:
      "A cost that stays about the same every month, such as rent or a phone plan. Fixed expenses are predictable, which makes them easy to plan for.",
    related: ["variable-expense", "budget", "recurring-expense"],
  },
  {
    term: "Needs vs Wants",
    slug: "needs-vs-wants",
    category: "Budgeting",
    definition:
      "Needs are things you must have to live, like food, housing, and basic transport. Wants are nice extras. Sorting spending this way is the first step in most budgets.",
    related: ["discretionary-spending", "50-30-20-rule"],
  },
  {
    term: "Net Pay",
    slug: "net-pay",
    category: "Budgeting",
    definition:
      "Your take-home pay, the amount that actually lands in your account after taxes and other deductions come out of your gross pay. Budget from this number, not your salary.",
    related: ["gross-income", "withholding", "pay-stub"],
  },
  {
    term: "Recurring Expense",
    slug: "recurring-expense",
    category: "Budgeting",
    definition:
      "A cost that repeats on a schedule, like a monthly subscription or yearly membership. They are easy to forget, so they are worth reviewing now and then.",
    related: ["subscription", "fixed-expense"],
  },
  {
    term: "Sinking Fund",
    slug: "sinking-fund",
    category: "Budgeting",
    definition:
      "Money you set aside a little at a time for a known future cost, like holiday gifts or new tires. By saving ahead, the bill does not blow up your budget.",
    related: ["budget", "emergency-fund"],
  },
  {
    term: "Subscription",
    slug: "subscription",
    category: "Budgeting",
    definition:
      "A service you pay for on a repeating basis, like a streaming app or gym. Small subscriptions add up, so it helps to track them.",
    related: ["recurring-expense"],
  },
  {
    term: "Variable Expense",
    slug: "variable-expense",
    category: "Budgeting",
    definition:
      "A cost that changes from month to month, like groceries, gas, or going out. These are where you usually have the most control over spending.",
    related: ["fixed-expense", "discretionary-spending"],
  },
  {
    term: "Zero-Based Budget",
    slug: "zero-based-budget",
    category: "Budgeting",
    definition:
      "A method where you assign every dollar of income a job until nothing is left unplanned. Income minus everything you assign equals zero, so no money goes missing.",
    related: ["budget"],
  },

  // ------------------------------------------------------------------- Credit
  {
    term: "Annual Fee",
    slug: "annual-fee",
    category: "Credit",
    definition:
      "A yearly charge some credit cards add just for having the card. Many cards have no annual fee, so it is worth checking before you apply.",
    related: ["credit-card"],
  },
  {
    term: "APR (Annual Percentage Rate)",
    slug: "apr",
    category: "Credit",
    definition:
      "The yearly cost of borrowing, shown as a percentage. On a credit card, a higher APR means a balance you carry costs more. Pay in full and you usually owe no interest.",
    related: ["interest-rate", "grace-period", "minimum-payment"],
  },
  {
    term: "Cash Advance",
    slug: "cash-advance",
    category: "Credit",
    definition:
      "Borrowing cash against your credit card, often at an ATM. It usually starts charging interest right away at a high rate with an extra fee, so it is an expensive option.",
    related: ["credit-card", "apr"],
  },
  {
    term: "Cosigner",
    slug: "cosigner",
    category: "Credit",
    definition:
      "Someone who signs a loan or credit application with you and promises to pay if you cannot. Lenders may require one when you have little credit history.",
    related: ["credit-score", "loan"],
  },
  {
    term: "Credit",
    slug: "credit",
    category: "Credit",
    definition:
      "The ability to borrow money or use goods now and pay for them later. Using credit well builds trust with lenders; using it poorly makes borrowing harder and costlier.",
    related: ["credit-score", "credit-card", "debt"],
  },
  {
    term: "Credit Bureau",
    slug: "credit-bureau",
    category: "Credit",
    definition:
      "A company that collects information about how you borrow and repay, then sells it as a credit report. The three main ones are Equifax, Experian, and TransUnion.",
    related: ["credit-report", "credit-score"],
  },
  {
    term: "Credit Card",
    slug: "credit-card",
    category: "Credit",
    definition:
      "A card that lets you borrow money up to a limit to pay for things, then repay later. Pay the full balance each month and you avoid interest; carry it and interest piles up.",
    related: ["debit-card", "credit-limit", "apr", "minimum-payment"],
  },
  {
    term: "Credit Limit",
    slug: "credit-limit",
    category: "Credit",
    definition:
      "The most a lender will let you borrow on a credit card or line of credit. Staying well below it helps your credit score.",
    related: ["credit-utilization", "credit-card"],
  },
  {
    term: "Credit Report",
    slug: "credit-report",
    category: "Credit",
    definition:
      "A detailed record of your borrowing history: accounts, balances, and whether you pay on time. You can check yours for free, and you should, to catch errors.",
    related: ["credit-bureau", "credit-score", "hard-inquiry"],
  },
  {
    term: "Credit Score",
    slug: "credit-score",
    category: "Credit",
    definition:
      "A number, often from 300 to 850, that sums up how reliably you repay what you borrow. A higher score makes it easier and cheaper to get loans, housing, and cards.",
    related: ["fico-score", "credit-report", "credit-utilization"],
  },
  {
    term: "Credit Utilization",
    slug: "credit-utilization",
    category: "Credit",
    definition:
      "How much of your available credit you are using, as a percentage. Using a small share, often under 30 percent, helps your credit score.",
    related: ["credit-limit", "credit-score"],
  },
  {
    term: "FICO Score",
    slug: "fico-score",
    category: "Credit",
    definition:
      "The most widely used type of credit score, created by a company called FICO. Lenders often check it when you apply to borrow.",
    related: ["credit-score"],
  },
  {
    term: "Grace Period",
    slug: "grace-period",
    category: "Credit",
    definition:
      "A window of time when you can pay without owing interest or a penalty. On a credit card, paying the full balance within the grace period means no interest charge.",
    related: ["apr", "minimum-payment", "statement-balance"],
  },
  {
    term: "Hard Inquiry",
    slug: "hard-inquiry",
    category: "Credit",
    definition:
      "A check of your credit report that happens when you apply to borrow. It can lower your score a little for a short time. Several in a row can add up.",
    related: ["soft-inquiry", "credit-report"],
  },
  {
    term: "Late Fee",
    slug: "late-fee",
    category: "Credit",
    definition:
      "A charge added when you miss a payment due date. Beyond the fee, late payments can hurt your credit score, so setting reminders or autopay helps.",
    related: ["minimum-payment", "delinquency"],
  },
  {
    term: "Minimum Payment",
    slug: "minimum-payment",
    category: "Credit",
    definition:
      "The smallest amount you must pay on a credit card each month to stay in good standing. Paying only the minimum keeps you in debt longer and costs far more in interest.",
    related: ["credit-card", "apr", "statement-balance"],
  },
  {
    term: "Secured Credit Card",
    slug: "secured-credit-card",
    category: "Credit",
    definition:
      "A starter credit card backed by a cash deposit you put down, which becomes your credit limit. It helps people build or rebuild credit with less risk to the lender.",
    related: ["credit-card", "credit-score"],
  },
  {
    term: "Soft Inquiry",
    slug: "soft-inquiry",
    category: "Credit",
    definition:
      "A check of your credit that does not affect your score, such as viewing your own report or a pre-approval offer. Only hard inquiries can lower your score.",
    related: ["hard-inquiry", "credit-report"],
  },
  {
    term: "Statement Balance",
    slug: "statement-balance",
    category: "Credit",
    definition:
      "The total you owed on your credit card at the end of the billing cycle. Paying this full amount by the due date is what keeps you out of interest charges.",
    related: ["minimum-payment", "grace-period", "credit-card"],
  },

  // --------------------------------------------------------------------- Debt
  {
    term: "Amortization",
    slug: "amortization",
    category: "Debt",
    definition:
      "The schedule that spreads a loan into equal payments over time. Early payments go mostly toward interest, and later ones go mostly toward the principal.",
    related: ["principal", "interest-rate", "installment-loan"],
  },
  {
    term: "Bankruptcy",
    slug: "bankruptcy",
    category: "Debt",
    definition:
      "A legal process for people who cannot repay their debts. It can erase or restructure what you owe, but it seriously damages your credit for years.",
    related: ["default", "collections"],
  },
  {
    term: "Collateral",
    slug: "collateral",
    category: "Debt",
    definition:
      "Something of value you pledge to back a loan, like a car or house. If you do not repay, the lender can take it. Loans with collateral are called secured loans.",
    related: ["secured-loan", "default"],
  },
  {
    term: "Collections",
    slug: "collections",
    category: "Debt",
    definition:
      "When a debt goes unpaid for a long time, the lender may sell it to a collection agency that tries to recover the money. Accounts in collections badly hurt your credit.",
    related: ["delinquency", "default"],
  },
  {
    term: "Debt",
    slug: "debt",
    category: "Debt",
    definition:
      "Money you owe to someone else, usually with interest. Not all debt is bad: it can help you afford big goals, but too much can be hard to escape.",
    related: ["loan", "credit", "debt-to-income-ratio"],
  },
  {
    term: "Debt Consolidation",
    slug: "debt-consolidation",
    category: "Debt",
    definition:
      "Combining several debts into one new loan, ideally with a lower interest rate, so you have a single payment to track. It simplifies, but only helps if the new rate is better.",
    related: ["refinance", "debt"],
  },
  {
    term: "Debt-to-Income Ratio",
    slug: "debt-to-income-ratio",
    category: "Debt",
    definition:
      "How much of your monthly income goes to debt payments, as a percentage. Lenders use it to judge whether you can take on more. Lower is better.",
    related: ["debt", "gross-income"],
  },
  {
    term: "Default",
    slug: "default",
    category: "Debt",
    definition:
      "Failing to repay a debt as agreed for an extended time. Default leads to serious harm to your credit and can mean losing collateral or facing collections.",
    related: ["delinquency", "collateral", "collections"],
  },
  {
    term: "Delinquency",
    slug: "delinquency",
    category: "Debt",
    definition:
      "Being behind on a payment. An account becomes delinquent the day after a missed due date and grows more serious the longer it stays unpaid.",
    related: ["late-fee", "default"],
  },
  {
    term: "Garnishment",
    slug: "garnishment",
    category: "Debt",
    definition:
      "A legal order that takes part of your paycheck or bank account to pay a debt you did not repay. It usually requires a court judgment first.",
    related: ["default", "collections"],
  },
  {
    term: "Installment Loan",
    slug: "installment-loan",
    category: "Debt",
    definition:
      "A loan you repay in fixed, regular payments over a set time, like a car loan or student loan. You know the payment and the payoff date up front.",
    related: ["amortization", "revolving-debt", "loan"],
  },
  {
    term: "Loan",
    slug: "loan",
    category: "Debt",
    definition:
      "Money you borrow and agree to pay back over time, usually with interest. The agreement sets the amount, the rate, and the schedule.",
    related: ["principal", "interest-rate", "installment-loan"],
  },
  {
    term: "Payday Loan",
    slug: "payday-loan",
    category: "Debt",
    definition:
      "A small, short-term loan due by your next payday, with very high fees. The cost is so steep that many borrowers get stuck re-borrowing, so it is widely cautioned against.",
    related: ["apr", "debt"],
  },
  {
    term: "Refinance",
    slug: "refinance",
    category: "Debt",
    definition:
      "Replacing an existing loan with a new one, usually to get a lower interest rate or a different payment. It can save money if the new terms are better.",
    related: ["debt-consolidation", "interest-rate"],
  },
  {
    term: "Revolving Debt",
    slug: "revolving-debt",
    category: "Debt",
    definition:
      "Debt with no fixed payoff date that you can borrow, repay, and borrow again, like a credit card. As long as you owe a balance, interest keeps building.",
    related: ["installment-loan", "credit-card"],
  },
  {
    term: "Secured Loan",
    slug: "secured-loan",
    category: "Debt",
    definition:
      "A loan backed by collateral the lender can take if you do not pay, such as a mortgage or car loan. Because there is less risk to the lender, rates are often lower.",
    related: ["collateral", "unsecured-loan"],
  },
  {
    term: "Unsecured Loan",
    slug: "unsecured-loan",
    category: "Debt",
    definition:
      "A loan with no collateral behind it, like most credit cards and personal loans. Because the lender takes on more risk, the interest rate is usually higher.",
    related: ["secured-loan"],
  },

  // ---------------------------------------------------------------- Investing
  {
    term: "Asset",
    slug: "asset",
    category: "Investing",
    definition:
      "Anything you own that has value, like cash, a savings account, a car, or investments. Assets are the building blocks of your net worth.",
    related: ["net-worth", "liability"],
  },
  {
    term: "Bear Market",
    slug: "bear-market",
    category: "Investing",
    definition:
      "A stretch when investment prices fall a lot, often 20 percent or more, and mood is gloomy. The opposite of a bull market.",
    related: ["bull-market", "volatility"],
  },
  {
    term: "Bond",
    slug: "bond",
    category: "Investing",
    definition:
      "A loan you make to a government or company. In return they pay you interest and give your money back on a set date. Bonds are usually steadier than stocks.",
    related: ["stock", "interest"],
  },
  {
    term: "Brokerage Account",
    slug: "brokerage-account",
    category: "Investing",
    definition:
      "An account you use to buy and sell investments like stocks and funds. You can open one online, often with no minimum.",
    related: ["stock", "etf", "portfolio"],
  },
  {
    term: "401(k)",
    slug: "401k",
    category: "Investing",
    definition:
      "A retirement savings account offered through a job. Money goes in straight from your paycheck before taxes, and many employers add a matching contribution, which is free money.",
    related: ["ira", "roth-ira", "retirement", "benefits"],
  },
  {
    term: "IRA",
    slug: "ira",
    category: "Investing",
    definition:
      "An Individual Retirement Account you open on your own to invest for the future with tax benefits. Anyone with earned income can have one, separate from a job.",
    related: ["roth-ira", "401k", "retirement"],
  },
  {
    term: "Roth IRA",
    slug: "roth-ira",
    category: "Investing",
    definition:
      "A retirement account where you invest money you have already paid tax on, so qualified withdrawals later are tax-free. Often a strong fit for students and young earners in low brackets.",
    related: ["ira", "401k", "retirement"],
  },
  {
    term: "Retirement",
    slug: "retirement",
    category: "Investing",
    definition:
      "The stage of life when you stop working and live on money saved earlier. Investing a little for it while young gives compounding decades to work.",
    related: ["401k", "ira", "roth-ira", "compound-growth"],
  },
  {
    term: "Bull Market",
    slug: "bull-market",
    category: "Investing",
    definition:
      "A stretch when investment prices are rising and confidence is high. The opposite of a bear market.",
    related: ["bear-market"],
  },
  {
    term: "Capital Gain",
    slug: "capital-gain",
    category: "Investing",
    definition:
      "The profit you make when you sell an investment for more than you paid. If you sell for less, that is a capital loss. Gains can be taxed.",
    related: ["stock", "taxable-income"],
  },
  {
    term: "Compound Growth",
    slug: "compound-growth",
    category: "Investing",
    definition:
      "When investment earnings are reinvested and then earn returns of their own, so the total can snowball over many years. Starting early gives it more time to work.",
    related: ["compound-interest", "return"],
  },
  {
    term: "Diversification",
    slug: "diversification",
    category: "Investing",
    definition:
      "Spreading money across many different investments so that one bad result does not sink everything. A simple way to lower risk without giving up much.",
    related: ["portfolio", "index-fund", "risk-tolerance"],
  },
  {
    term: "Dividend",
    slug: "dividend",
    category: "Investing",
    definition:
      "A share of a company's profit paid out to people who own its stock, usually as cash. Not every company pays one.",
    related: ["stock", "share"],
  },
  {
    term: "ETF (Exchange-Traded Fund)",
    slug: "etf",
    category: "Investing",
    definition:
      "A basket of many investments bundled into one, which you can buy and sell like a single stock. ETFs make it easy to own a wide mix at low cost.",
    related: ["index-fund", "mutual-fund", "expense-ratio"],
  },
  {
    term: "Expense Ratio",
    slug: "expense-ratio",
    category: "Investing",
    definition:
      "The yearly fee a fund charges, shown as a percentage of the money you have in it. Lower is better because fees quietly eat into returns over time.",
    related: ["index-fund", "etf", "mutual-fund"],
  },
  {
    term: "Index Fund",
    slug: "index-fund",
    category: "Investing",
    definition:
      "A fund that simply tracks a market index, like the S&P 500, instead of trying to beat it. Index funds are popular for low fees and built-in diversification.",
    related: ["etf", "mutual-fund", "diversification", "expense-ratio"],
  },
  {
    term: "Inflation",
    slug: "inflation",
    category: "Investing",
    definition:
      "The gradual rise in prices over time, which means each dollar buys a little less than before. Saving and investing aim to help your money keep up.",
    related: ["return", "yield"],
  },
  {
    term: "Mutual Fund",
    slug: "mutual-fund",
    category: "Investing",
    definition:
      "A pool of money from many investors used to buy a mix of stocks, bonds, or both, managed as one fund. Buying a share gives you a slice of the whole mix.",
    related: ["index-fund", "etf", "diversification"],
  },
  {
    term: "Net Worth",
    slug: "net-worth",
    category: "Investing",
    definition:
      "What you own minus what you owe. Add up your assets, subtract your debts, and the result is your net worth. Tracking it shows your overall financial progress.",
    related: ["asset", "liability"],
  },
  {
    term: "Portfolio",
    slug: "portfolio",
    category: "Investing",
    definition:
      "The full collection of investments you own, taken together. A balanced portfolio spreads money across different types of assets.",
    related: ["diversification", "asset", "risk-tolerance"],
  },
  {
    term: "Return",
    slug: "return",
    category: "Investing",
    definition:
      "The gain or loss on an investment over time, often shown as a percentage. A 7 percent return means your money grew by 7 percent for that period.",
    related: ["yield", "compound-growth", "volatility"],
  },
  {
    term: "Risk Tolerance",
    slug: "risk-tolerance",
    category: "Investing",
    definition:
      "How much ups and downs you can handle in your investments without panicking. People with more time before they need the money can usually take more risk.",
    related: ["diversification", "volatility", "portfolio"],
  },
  {
    term: "Robo-advisor",
    slug: "robo-advisor",
    category: "Investing",
    definition:
      "An online service that builds and manages a simple investment mix for you using software, usually for a small fee. Defined here as a type of product, not a recommendation.",
    related: ["brokerage-account", "portfolio"],
  },
  {
    term: "Share",
    slug: "share",
    category: "Investing",
    definition:
      "A single unit of ownership in a company or fund. Owning one share makes you a part-owner entitled to a tiny slice of its value.",
    related: ["stock", "dividend"],
  },
  {
    term: "Stock",
    slug: "stock",
    category: "Investing",
    definition:
      "A piece of ownership in a company. If the company does well its stock can rise in value; if it struggles the stock can fall. Stocks can grow a lot but swing more than bonds.",
    related: ["share", "bond", "dividend", "ticker-symbol"],
  },
  {
    term: "Ticker Symbol",
    slug: "ticker-symbol",
    category: "Investing",
    definition:
      "The short code that identifies a stock or fund, like AAPL for Apple. You use it to look up or trade an investment.",
    related: ["stock"],
  },
  {
    term: "Volatility",
    slug: "volatility",
    category: "Investing",
    definition:
      "How much an investment's price jumps up and down. High volatility means bigger swings, which can mean more risk in the short term.",
    related: ["risk-tolerance", "bear-market", "return"],
  },
  {
    term: "Fiduciary",
    slug: "fiduciary",
    category: "Investing",
    definition:
      "A person or company legally required to act in your best interest, ahead of their own. The word is defined here as a neutral legal term.",
    related: ["robo-advisor"],
  },
  {
    term: "Liability",
    slug: "liability",
    category: "Investing",
    definition:
      "Money you owe, like a loan or credit card balance. Liabilities are the opposite of assets and are subtracted when figuring net worth.",
    related: ["asset", "net-worth", "debt"],
  },

  // ------------------------------------------------------------------- Income
  {
    term: "1099",
    slug: "1099",
    category: "Income",
    definition:
      "A tax form reporting money you earned as an independent worker rather than an employee. If you do gig or freelance work, you may get one, and no taxes were withheld for you.",
    related: ["w-2", "gig-work", "self-employment"],
  },
  {
    term: "Bonus",
    slug: "bonus",
    category: "Income",
    definition:
      "Extra pay on top of your regular wages, often as a reward or at year end. It is still taxed as income.",
    related: ["salary", "commission"],
  },
  {
    term: "Benefits",
    slug: "benefits",
    category: "Income",
    definition:
      "Extras an employer offers beyond pay, such as health insurance, paid time off, or a retirement match. Benefits can be worth a lot, so weigh them with the salary.",
    related: ["salary", "401k", "health-insurance"],
  },
  {
    term: "Commission",
    slug: "commission",
    category: "Income",
    definition:
      "Pay based on how much you sell, often a percentage of each sale. Some jobs pay only commission; others mix it with a base wage.",
    related: ["bonus", "wage"],
  },
  {
    term: "Gig Work",
    slug: "gig-work",
    category: "Income",
    definition:
      "Earning money through short, flexible jobs or tasks, like delivery or rideshare, instead of a steady job. You are usually treated as self-employed and handle your own taxes.",
    related: ["self-employment", "1099", "side-hustle"],
  },
  {
    term: "Gross Income",
    slug: "gross-income",
    category: "Income",
    definition:
      "Your total earnings before any taxes or deductions are taken out. It is the bigger number on your pay stub, larger than what you take home.",
    related: ["net-pay", "withholding"],
  },
  {
    term: "Hourly Wage",
    slug: "hourly-wage",
    category: "Income",
    definition:
      "Pay set by the hour, so your earnings depend on how many hours you work. Work more hours and you earn more; work fewer and you earn less.",
    related: ["wage", "overtime", "minimum-wage"],
  },
  {
    term: "Income",
    slug: "income",
    category: "Income",
    definition:
      "Money you receive, most often from work, but also from things like interest, gifts, or benefits. It is the money coming in that a budget plans around.",
    related: ["gross-income", "net-pay"],
  },
  {
    term: "Minimum Wage",
    slug: "minimum-wage",
    category: "Income",
    definition:
      "The lowest hourly pay an employer is legally allowed to give. The amount depends on federal, state, and sometimes city law, and the highest one that applies wins.",
    related: ["hourly-wage", "wage"],
  },
  {
    term: "Overtime",
    slug: "overtime",
    category: "Income",
    definition:
      "Extra pay for hours worked beyond a standard week, often 40 hours. Many hourly jobs pay overtime at one and a half times the normal rate.",
    related: ["hourly-wage", "wage"],
  },
  {
    term: "Paycheck",
    slug: "paycheck",
    category: "Income",
    definition:
      "The payment you get from an employer for your work, usually every week or two. Today it most often arrives by direct deposit rather than a paper check.",
    related: ["pay-stub", "direct-deposit", "net-pay"],
  },
  {
    term: "Pay Stub",
    slug: "pay-stub",
    category: "Income",
    definition:
      "The breakdown that comes with your pay, showing your gross pay, the taxes and deductions taken out, and your take-home amount. It is worth reading to see where money goes.",
    related: ["paycheck", "gross-income", "withholding"],
  },
  {
    term: "Salary",
    slug: "salary",
    category: "Income",
    definition:
      "A fixed yearly pay split into regular paychecks, no matter the exact hours. A 52,000 dollar salary paid twice a month is 2,000 dollars before deductions each time.",
    related: ["wage", "gross-income"],
  },
  {
    term: "Self-Employment",
    slug: "self-employment",
    category: "Income",
    definition:
      "Working for yourself rather than an employer. You keep more control but must handle your own taxes, including the part an employer would normally cover.",
    related: ["gig-work", "1099", "side-hustle"],
  },
  {
    term: "Side Hustle",
    slug: "side-hustle",
    category: "Income",
    definition:
      "Work you do to earn extra money alongside a main job or school, like tutoring or selling crafts. Earnings can still be taxable.",
    related: ["gig-work", "self-employment"],
  },
  {
    term: "Wage",
    slug: "wage",
    category: "Income",
    definition:
      "Pay you earn for work, usually by the hour. Unlike a salary, wages rise and fall with the hours you put in.",
    related: ["salary", "hourly-wage", "minimum-wage"],
  },
  {
    term: "W-2",
    slug: "w-2",
    category: "Income",
    definition:
      "A form your employer sends each year showing what you earned and how much tax was withheld. You use it to file your tax return.",
    related: ["w-4", "1099", "tax-return"],
  },

  // -------------------------------------------------------------------- Taxes
  {
    term: "Dependent",
    slug: "dependent",
    category: "Taxes",
    definition:
      "A person, often a child or student, who relies on someone else for support and can be claimed on that person's tax return for certain benefits.",
    related: ["filing-status", "tax-credit"],
  },
  {
    term: "Deduction",
    slug: "deduction",
    category: "Taxes",
    definition:
      "An amount you subtract from your income before tax is figured, which lowers the income you are taxed on. The more deductions, the smaller the taxable amount.",
    related: ["standard-deduction", "taxable-income", "tax-credit"],
  },
  {
    term: "FICA",
    slug: "fica",
    category: "Taxes",
    definition:
      "The payroll taxes taken from your paycheck for Social Security and Medicare. You see them as a line on your pay stub.",
    related: ["withholding", "pay-stub"],
  },
  {
    term: "Filing Status",
    slug: "filing-status",
    category: "Taxes",
    definition:
      "The category you choose on a tax return, like single or married filing jointly. It affects your tax rates and deductions.",
    related: ["tax-return", "dependent"],
  },
  {
    term: "Income Tax",
    slug: "income-tax",
    category: "Taxes",
    definition:
      "A tax on the money you earn, paid to the federal government and often to your state. It is usually taken out of each paycheck before you get it.",
    related: ["tax-bracket", "withholding", "taxable-income"],
  },
  {
    term: "IRS",
    slug: "irs",
    category: "Taxes",
    definition:
      "The Internal Revenue Service, the federal agency that collects taxes and processes tax returns and refunds.",
    related: ["tax-return", "tax-refund"],
  },
  {
    term: "Property Tax",
    slug: "property-tax",
    category: "Taxes",
    definition:
      "A tax on the value of property you own, mainly land and buildings, paid to local government. Renters pay it indirectly through their rent.",
    related: ["tax"],
  },
  {
    term: "Sales Tax",
    slug: "sales-tax",
    category: "Taxes",
    definition:
      "An added charge on many purchases, set by state or local government. It is why the total at checkout is often a bit more than the price on the tag.",
    related: ["tax"],
  },
  {
    term: "Standard Deduction",
    slug: "standard-deduction",
    category: "Taxes",
    definition:
      "A flat amount almost anyone can subtract from income to lower their taxes, no receipts needed. Most people take it instead of listing individual deductions.",
    related: ["deduction", "taxable-income"],
  },
  {
    term: "Tax",
    slug: "tax",
    category: "Taxes",
    definition:
      "Money the government collects from people and businesses to pay for public services like schools, roads, and safety. Taxes come in many forms.",
    related: ["income-tax", "sales-tax", "property-tax"],
  },
  {
    term: "Tax Bracket",
    slug: "tax-bracket",
    category: "Taxes",
    definition:
      "A range of income taxed at a certain rate. Higher income falls into higher brackets, but only the income inside each range is taxed at that range's rate.",
    related: ["income-tax", "taxable-income"],
  },
  {
    term: "Tax Credit",
    slug: "tax-credit",
    category: "Taxes",
    definition:
      "An amount that comes straight off the tax you owe, dollar for dollar. A credit is usually worth more than a deduction of the same size.",
    related: ["deduction", "tax-refund"],
  },
  {
    term: "Tax Refund",
    slug: "tax-refund",
    category: "Taxes",
    definition:
      "Money the government returns to you when you paid more tax during the year than you actually owed. It is your own money coming back, not a bonus.",
    related: ["tax-return", "withholding"],
  },
  {
    term: "Tax Return",
    slug: "tax-return",
    category: "Taxes",
    definition:
      "The yearly form you file to report your income and figure out the tax you owe or the refund you are due. Most people file by mid-April.",
    related: ["w-2", "filing-status", "tax-refund"],
  },
  {
    term: "Taxable Income",
    slug: "taxable-income",
    category: "Taxes",
    definition:
      "The part of your income that is actually taxed, after deductions are subtracted. Lowering it through deductions lowers the tax you owe.",
    related: ["deduction", "tax-bracket"],
  },
  {
    term: "Withholding",
    slug: "withholding",
    category: "Taxes",
    definition:
      "The tax your employer takes out of each paycheck and sends to the government for you. Get it about right and you avoid a big bill or a big refund at tax time.",
    related: ["w-4", "pay-stub", "tax-refund"],
  },
  {
    term: "W-4",
    slug: "w-4",
    category: "Taxes",
    definition:
      "A form you fill out for a new job that tells your employer how much tax to withhold from your pay. Updating it adjusts your take-home pay.",
    related: ["withholding", "w-2"],
  },

  // ---------------------------------------------------------------- Insurance
  {
    term: "Auto Insurance",
    slug: "auto-insurance",
    category: "Insurance",
    definition:
      "Coverage that helps pay for car-related costs like crashes, theft, or damage you cause to others. Most states require at least a basic amount to drive legally.",
    related: ["premium", "deductible-insurance", "liability-insurance"],
  },
  {
    term: "Beneficiary",
    slug: "beneficiary",
    category: "Insurance",
    definition:
      "The person you name to receive the payout from something like a life insurance policy or retirement account after you die.",
    related: ["life-insurance"],
  },
  {
    term: "Claim",
    slug: "claim",
    category: "Insurance",
    definition:
      "A request you file asking your insurance to pay for a covered loss, like a car repair after an accident. The insurer reviews it and pays what the policy allows.",
    related: ["policy", "deductible-insurance"],
  },
  {
    term: "Copay",
    slug: "copay",
    category: "Insurance",
    definition:
      "A fixed amount you pay for a covered service, like 25 dollars for a doctor visit, while insurance covers the rest. Common in health plans.",
    related: ["deductible-insurance", "health-insurance", "out-of-pocket-maximum"],
  },
  {
    term: "Coverage",
    slug: "coverage",
    category: "Insurance",
    definition:
      "What your insurance policy will actually pay for and up to how much. Reading your coverage tells you what is protected and what is not.",
    related: ["policy", "claim"],
  },
  {
    term: "Deductible",
    slug: "deductible-insurance",
    category: "Insurance",
    definition:
      "The amount you pay out of your own pocket before insurance starts to pay. A higher deductible usually means a lower monthly premium, and the reverse.",
    related: ["premium", "copay", "out-of-pocket-maximum"],
  },
  {
    term: "Health Insurance",
    slug: "health-insurance",
    category: "Insurance",
    definition:
      "Coverage that helps pay for medical care, from checkups to emergencies. You usually pay a monthly premium plus some costs when you get care.",
    related: ["premium", "copay", "deductible-insurance", "out-of-pocket-maximum"],
  },
  {
    term: "Liability Coverage",
    slug: "liability-insurance",
    category: "Insurance",
    definition:
      "The part of insurance that covers harm or damage you cause to other people or their property. Auto policies must include a minimum amount of it.",
    related: ["auto-insurance", "coverage"],
  },
  {
    term: "Life Insurance",
    slug: "life-insurance",
    category: "Insurance",
    definition:
      "Coverage that pays money to people you choose if you die, helping them with costs or lost income. Younger, healthier people usually pay lower premiums.",
    related: ["beneficiary", "premium"],
  },
  {
    term: "Out-of-Pocket Maximum",
    slug: "out-of-pocket-maximum",
    category: "Insurance",
    definition:
      "The most you will have to pay yourself for covered health care in a year. Once you hit it, insurance covers 100 percent of further covered costs.",
    related: ["deductible-insurance", "copay", "health-insurance"],
  },
  {
    term: "Policy",
    slug: "policy",
    category: "Insurance",
    definition:
      "The contract between you and an insurance company that spells out what is covered, what you pay, and the rules. Your policy is the source of truth for any claim.",
    related: ["coverage", "premium", "claim"],
  },
  {
    term: "Premium",
    slug: "premium",
    category: "Insurance",
    definition:
      "The amount you pay for insurance, usually each month, to keep your coverage active. You pay it whether or not you ever file a claim.",
    related: ["deductible-insurance", "policy"],
  },
  {
    term: "Renters Insurance",
    slug: "renters-insurance",
    category: "Insurance",
    definition:
      "Low-cost coverage that protects your belongings in a rented home from things like theft or fire, and can help if someone is hurt there. It does not cover the building itself.",
    related: ["premium", "coverage"],
  },

  // ------------------------------------------------------------ College & Aid
  {
    term: "529 Plan",
    slug: "529-plan",
    category: "College & Aid",
    definition:
      "A savings account built for education costs, where the money can grow without being taxed if you spend it on school. Often opened by a parent for a child.",
    related: ["cost-of-attendance", "tuition"],
  },
  {
    term: "Cost of Attendance",
    slug: "cost-of-attendance",
    category: "College & Aid",
    definition:
      "A school's full yearly price estimate: tuition, fees, housing, food, books, and other basics. Financial aid is measured against this number.",
    related: ["tuition", "room-and-board", "financial-aid"],
  },
  {
    term: "Deferment",
    slug: "deferment",
    category: "College & Aid",
    definition:
      "An approved pause on student loan payments, for example while you are still in school. On some loans, interest does not build during the pause.",
    related: ["student-loan", "subsidized-loan"],
  },
  {
    term: "FAFSA",
    slug: "fafsa",
    category: "College & Aid",
    definition:
      "The Free Application for Federal Student Aid, the form that opens the door to federal grants, work-study, and loans. Filing it is the first step to most college aid.",
    related: ["financial-aid", "student-aid-index", "pell-grant"],
  },
  {
    term: "Financial Aid",
    slug: "financial-aid",
    category: "College & Aid",
    definition:
      "Money to help pay for college from the government, the school, or others. It can be aid you keep, like grants and scholarships, or aid you repay, like loans.",
    related: ["fafsa", "grant", "scholarship", "student-loan"],
  },
  {
    term: "Grant",
    slug: "grant",
    category: "College & Aid",
    definition:
      "Money for school, usually based on financial need, that you do not pay back. Grants come from the government or the school.",
    related: ["scholarship", "pell-grant", "financial-aid"],
  },
  {
    term: "Loan Forgiveness",
    slug: "loan-forgiveness",
    category: "College & Aid",
    definition:
      "A program that cancels part or all of a student loan after you meet certain conditions, such as years of qualifying public-service work.",
    related: ["student-loan"],
  },
  {
    term: "Pell Grant",
    slug: "pell-grant",
    category: "College & Aid",
    definition:
      "A federal grant for undergraduate students with the greatest financial need. Like other grants, it does not have to be paid back. You apply through the FAFSA.",
    related: ["grant", "fafsa"],
  },
  {
    term: "Room and Board",
    slug: "room-and-board",
    category: "College & Aid",
    definition:
      "The cost of housing and meals at college, separate from tuition. It is a big part of the total cost of attendance.",
    related: ["cost-of-attendance", "tuition"],
  },
  {
    term: "Scholarship",
    slug: "scholarship",
    category: "College & Aid",
    definition:
      "Money for school you do not repay, often awarded for need, grades, talent, or background. You can win scholarships from schools, companies, and community groups.",
    related: ["grant", "financial-aid"],
  },
  {
    term: "Student Aid Index",
    slug: "student-aid-index",
    category: "College & Aid",
    definition:
      "A number from the FAFSA that schools use to size up your need for aid. It replaced the older Expected Family Contribution. A lower number generally means more aid.",
    related: ["fafsa", "financial-aid"],
  },
  {
    term: "Student Loan",
    slug: "student-loan",
    category: "College & Aid",
    definition:
      "Money borrowed to pay for college that you repay later, with interest. Federal student loans usually have lower rates and more flexible terms than private ones.",
    related: ["subsidized-loan", "unsubsidized-loan", "deferment", "loan-forgiveness"],
  },
  {
    term: "Subsidized Loan",
    slug: "subsidized-loan",
    category: "College & Aid",
    definition:
      "A federal student loan for students with financial need where the government pays the interest while you are in school. That makes it cheaper than an unsubsidized loan.",
    related: ["unsubsidized-loan", "student-loan", "deferment"],
  },
  {
    term: "Tuition",
    slug: "tuition",
    category: "College & Aid",
    definition:
      "The price a school charges for classes, not counting housing, food, or books. It is often the largest single part of college costs.",
    related: ["cost-of-attendance", "room-and-board"],
  },
  {
    term: "Unsubsidized Loan",
    slug: "unsubsidized-loan",
    category: "College & Aid",
    definition:
      "A federal student loan where interest starts building right away, even while you are in school. Available to more students because it is not based on need.",
    related: ["subsidized-loan", "student-loan"],
  },
  {
    term: "Work-Study",
    slug: "work-study",
    category: "College & Aid",
    definition:
      "A program that gives eligible students part-time jobs, often on campus, to help pay for school. You earn the money by working, and it does not need to be repaid.",
    related: ["financial-aid", "fafsa"],
  },

  // ============================================================ Expansion pass
  // Added in a later pass. Same shape and rules. Each term still carries its own
  // category, so the A-Z bar, filters, and search treat these like any other.

  // ------------------------------------------------------------------ Banking
  {
    term: "Money Order",
    slug: "money-order",
    category: "Banking",
    definition:
      "A prepaid paper payment you buy for a set dollar amount, then give to someone like a check. Because you pay for it up front, it cannot bounce. You can buy one at a post office, bank, or many stores for a small fee.",
    related: ["cashiers-check", "wire-transfer"],
  },
  {
    term: "Cashier's Check",
    slug: "cashiers-check",
    category: "Banking",
    definition:
      "A check drawn on the bank's own funds after it takes the money from your account. Because the bank guarantees it, sellers often require one for large purchases like a car. There is usually a fee.",
    related: ["money-order", "wire-transfer", "checking-account"],
  },
  {
    term: "Available Balance",
    slug: "available-balance",
    category: "Banking",
    definition:
      "The amount in your account you can actually spend right now. It can be lower than your total balance when recent deposits have not cleared or pending charges are being held.",
    related: ["pending-transaction", "checking-account", "overdraft"],
  },
  {
    term: "Pending Transaction",
    slug: "pending-transaction",
    category: "Banking",
    definition:
      "A charge or deposit your bank has seen but not finished processing. The money is set aside but not fully moved yet, so your available balance already reflects it even though the transaction is not final.",
    related: ["available-balance", "statement", "debit-card"],
  },
  {
    term: "Overdraft Protection",
    slug: "overdraft-protection",
    category: "Banking",
    definition:
      "An optional bank service that covers a payment when your balance is too low, usually by pulling from a linked savings account or a small line of credit. It can prevent a declined charge, but the bank may still charge a fee.",
    related: ["overdraft", "overdraft-fee", "nsf"],
  },
  {
    term: "Mobile Deposit",
    slug: "mobile-deposit",
    category: "Banking",
    definition:
      "Adding a paper check to your account by photographing the front and back with your bank's app instead of visiting a branch or ATM. The funds may take a day or more to become available.",
    related: ["mobile-banking", "endorsement", "available-balance"],
  },
  {
    term: "NCUA",
    slug: "ncua",
    category: "Banking",
    definition:
      "The National Credit Union Administration, a U.S. agency that insures money in credit union accounts up to a set limit if the credit union fails. It does for credit unions what the FDIC does for banks.",
    related: ["fdic", "credit-union", "bank"],
  },
  {
    term: "Peer-to-Peer Payment",
    slug: "peer-to-peer-payment",
    category: "Banking",
    definition:
      "Sending money straight from your account to another person through an app like Zelle, Venmo, or Cash App. Transfers are usually fast, but money sent to the wrong person can be hard to get back.",
    related: ["ach-transfer", "mobile-banking", "checking-account"],
  },
  {
    term: "Autopay",
    slug: "autopay",
    category: "Banking",
    definition:
      "A setup that lets a company automatically pull a bill from your account on its due date so you do not have to pay it by hand each month. It helps avoid late fees, but you still need enough money in the account.",
    related: ["recurring-expense", "late-fee", "ach-transfer"],
  },
  {
    term: "Endorsement",
    slug: "endorsement",
    category: "Banking",
    definition:
      "Signing the back of a check before you deposit or cash it. Your signature, sometimes with a note like 'for deposit only', tells the bank you approve moving the money.",
    related: ["mobile-deposit", "checking-account"],
  },
  {
    term: "PIN",
    slug: "pin",
    category: "Banking",
    definition:
      "A Personal Identification Number, the short secret code you enter to use a debit or ATM card. Keeping it private protects your account, so you should never share it or write it on the card.",
    related: ["debit-card", "atm"],
  },

  // ------------------------------------------------------------------- Saving
  {
    term: "Pay Yourself First",
    slug: "pay-yourself-first",
    category: "Saving",
    definition:
      "A saving habit where you move money into savings as soon as you are paid, before spending on anything else. Treating savings like a required bill makes it more likely to actually happen.",
    related: ["automatic-savings", "emergency-fund", "budget"],
  },
  {
    term: "Maturity",
    slug: "maturity",
    category: "Saving",
    definition:
      "The date a savings product or bond reaches the end of its set term and pays you back. A one-year certificate of deposit reaches maturity after one year, when you can withdraw it without a penalty.",
    related: ["certificate-of-deposit", "bond", "yield"],
  },
  {
    term: "Rule of 72",
    slug: "rule-of-72",
    category: "Saving",
    definition:
      "A quick mental shortcut for how long an investment takes to double: divide 72 by the yearly interest rate. At 6 percent, money roughly doubles in 12 years. It is an estimate, not an exact figure.",
    related: ["compound-interest", "compound-growth", "interest-rate"],
  },
  {
    term: "Time Value of Money",
    slug: "time-value-of-money",
    category: "Saving",
    definition:
      "The idea that a dollar today is worth more than the same dollar later, because money you have now can earn interest or returns over time. It is a big reason saving early matters.",
    related: ["compound-interest", "interest", "return"],
  },

  // ---------------------------------------------------------------- Budgeting
  {
    term: "Envelope System",
    slug: "envelope-system",
    category: "Budgeting",
    definition:
      "A budgeting method where you split your spending money into categories, traditionally paper envelopes of cash, and stop spending in a category once its envelope is empty. Many people now do this with separate accounts or app categories.",
    related: ["budget", "zero-based-budget", "discretionary-spending"],
  },
  {
    term: "Disposable Income",
    slug: "disposable-income",
    category: "Budgeting",
    definition:
      "The money you have left from your pay after taxes are taken out. It is what is actually available to spend, save, or pay bills with.",
    related: ["net-pay", "gross-income", "discretionary-spending"],
  },
  {
    term: "Cost of Living",
    slug: "cost-of-living",
    category: "Budgeting",
    definition:
      "How much money it takes to cover basic needs like housing, food, and transportation in a given place. Costs vary widely by city, so the same salary can stretch much further in one area than another.",
    related: ["budget", "fixed-expense", "inflation"],
  },

  // ------------------------------------------------------------------- Credit
  {
    term: "Charge-Off",
    slug: "charge-off",
    category: "Credit",
    definition:
      "When a lender decides a debt you stopped paying, usually after about six months, is unlikely to be collected and writes it off as a loss. You still owe the money, and a charge-off badly damages your credit.",
    related: ["collections", "delinquency", "default", "credit-report"],
  },
  {
    term: "Credit Freeze",
    slug: "credit-freeze",
    category: "Credit",
    definition:
      "A free tool that locks your credit reports so no one can open new accounts in your name until you unlock them. It is a common defense against identity theft and does not hurt your credit score.",
    related: ["credit-report", "credit-bureau", "hard-inquiry"],
  },
  {
    term: "Authorized User",
    slug: "authorized-user",
    category: "Credit",
    definition:
      "Someone added to another person's credit card account who can use the card but is not legally responsible for the bill. A young person added to a parent's account can sometimes build credit history this way.",
    related: ["credit-card", "credit-score", "cosigner"],
  },
  {
    term: "Billing Cycle",
    slug: "billing-cycle",
    category: "Credit",
    definition:
      "The roughly one-month period between credit card statements during which your purchases are added up. At the end of the cycle the card sends a statement showing what you owe and when it is due.",
    related: ["statement-balance", "grace-period", "credit-card"],
  },
  {
    term: "Cash Back",
    slug: "cash-back",
    category: "Credit",
    definition:
      "A type of credit card reward that returns a small percentage of what you spend, often 1 to 2 percent, as a credit or deposit. It only helps if you avoid interest by paying the balance in full.",
    related: ["credit-card", "statement-balance", "annual-fee"],
  },
  {
    term: "Balance Transfer",
    slug: "balance-transfer",
    category: "Credit",
    definition:
      "Moving debt from one credit card to another, usually to get a lower interest rate for a while. There is often a fee of a few percent, and the low rate ends after a set period.",
    related: ["apr", "credit-card", "introductory-apr", "debt-consolidation"],
  },
  {
    term: "Introductory APR",
    slug: "introductory-apr",
    category: "Credit",
    definition:
      "A temporary, often very low or zero, interest rate a card or loan offers for a set opening period. When the intro period ends, the rate rises to the standard APR, so it helps to know that date.",
    related: ["apr", "balance-transfer", "credit-card"],
  },
  {
    term: "Prequalification",
    slug: "prequalification",
    category: "Credit",
    definition:
      "An early, informal check of whether you are likely to be approved for a card or loan and on what terms. It usually uses a soft inquiry, so it does not hurt your credit, but it is not a final guarantee.",
    related: ["soft-inquiry", "hard-inquiry", "credit-score"],
  },

  // --------------------------------------------------------------------- Debt
  {
    term: "Forbearance",
    slug: "forbearance",
    category: "Debt",
    definition:
      "A lender's temporary agreement to pause or shrink your loan payments during hardship. Interest often keeps building, so the balance can grow, but it can keep missed payments from being reported as late.",
    related: ["deferment", "grace-period", "student-loan"],
  },
  {
    term: "Promissory Note",
    slug: "promissory-note",
    category: "Debt",
    definition:
      "The legal document you sign when you take a loan, spelling out the amount, interest rate, payment schedule, and your promise to repay. Signing it makes the debt official and enforceable.",
    related: ["loan", "principal", "student-loan"],
  },
  {
    term: "Origination Fee",
    slug: "origination-fee",
    category: "Debt",
    definition:
      "An upfront charge a lender adds for processing a new loan, often a small percentage of the amount borrowed. It is sometimes taken out of the money you receive, so you get slightly less than the loan amount.",
    related: ["loan", "principal", "apr"],
  },
  {
    term: "Debt Snowball",
    slug: "debt-snowball",
    category: "Debt",
    definition:
      "A payoff strategy where you put extra money toward your smallest debt first while paying the minimum on the rest, then roll that payment to the next smallest. The early wins are meant to keep you motivated.",
    related: ["debt-avalanche", "minimum-payment", "debt"],
  },
  {
    term: "Debt Avalanche",
    slug: "debt-avalanche",
    category: "Debt",
    definition:
      "A payoff strategy where you put extra money toward the debt with the highest interest rate first, then move to the next highest. It usually saves the most money in interest over time.",
    related: ["debt-snowball", "interest-rate", "debt"],
  },
  {
    term: "Lien",
    slug: "lien",
    category: "Debt",
    definition:
      "A lender's legal claim on something you own, like a car or house, as security for a debt. If you do not pay, the lien lets the lender take or force the sale of that property.",
    related: ["collateral", "secured-loan", "repossession"],
  },
  {
    term: "Repossession",
    slug: "repossession",
    category: "Debt",
    definition:
      "When a lender legally takes back property, often a car, because you fell behind on payments for a loan that used it as collateral. You can still owe money if the resale does not cover the balance.",
    related: ["collateral", "secured-loan", "lien", "default"],
  },
  {
    term: "Prepayment Penalty",
    slug: "prepayment-penalty",
    category: "Debt",
    definition:
      "A fee some loans charge if you pay the balance off early, because the lender loses out on future interest. Not all loans have one, so it is worth checking before paying ahead.",
    related: ["principal", "refinance", "loan"],
  },

  // ---------------------------------------------------------------- Investing
  {
    term: "Capital Loss",
    slug: "capital-loss",
    category: "Investing",
    definition:
      "The loss you take when you sell an investment for less than you paid for it. It is the opposite of a capital gain, and at tax time it can sometimes offset gains.",
    related: ["capital-gain", "stock", "taxable-income"],
  },
  {
    term: "Dollar-Cost Averaging",
    slug: "dollar-cost-averaging",
    category: "Investing",
    definition:
      "Investing a fixed amount on a regular schedule, like every paycheck, no matter the price. You buy more shares when prices are low and fewer when high, which smooths out the ups and downs over time.",
    related: ["share", "volatility", "index-fund", "automatic-savings"],
  },
  {
    term: "Market Index",
    slug: "market-index",
    category: "Investing",
    definition:
      "A standard list of investments, like the S&P 500, used to measure how a slice of the market is doing. You cannot buy an index directly, but index funds aim to copy one.",
    related: ["index-fund", "stock", "stock-exchange"],
  },
  {
    term: "Prospectus",
    slug: "prospectus",
    category: "Investing",
    definition:
      "An official document a fund or company must provide that lays out how an investment works, its costs, and its risks. Reading it helps you understand what you are buying before you invest.",
    related: ["mutual-fund", "etf", "expense-ratio"],
  },
  {
    term: "Rebalancing",
    slug: "rebalancing",
    category: "Investing",
    definition:
      "Adjusting your investments back to your target mix after market moves have shifted it. For example, selling some of what grew and buying what lagged to return to your planned balance of stocks and bonds.",
    related: ["asset-allocation", "diversification", "portfolio"],
  },
  {
    term: "Stock Exchange",
    slug: "stock-exchange",
    category: "Investing",
    definition:
      "A marketplace, such as the New York Stock Exchange or Nasdaq, where shares of companies are bought and sold. Prices move throughout the trading day based on supply and demand.",
    related: ["stock", "share", "market-index", "ticker-symbol"],
  },
  {
    term: "Asset Allocation",
    slug: "asset-allocation",
    category: "Investing",
    definition:
      "How you divide your investments among types like stocks, bonds, and cash. The mix shapes both your possible return and your risk, and people often shift it as their goals change.",
    related: ["diversification", "portfolio", "risk-tolerance", "rebalancing"],
  },
  {
    term: "Time Horizon",
    slug: "time-horizon",
    category: "Investing",
    definition:
      "How long you plan to keep money invested before you need it. A longer horizon can allow for more risk because there is more time to recover from market drops.",
    related: ["risk-tolerance", "retirement", "volatility"],
  },
  {
    term: "Employer Match",
    slug: "employer-match",
    category: "Investing",
    definition:
      "Money your employer adds to your retirement account based on what you contribute, up to a limit, like 50 cents for every dollar you put in. It is added pay for saving, so many people try to contribute enough to get the full match.",
    related: ["401k", "retirement", "vesting"],
  },
  {
    term: "Vesting",
    slug: "vesting",
    category: "Investing",
    definition:
      "The process of earning full ownership of employer-given benefits, like a 401(k) match, over time. If you leave before you are fully vested, you may forfeit part of what the employer contributed.",
    related: ["401k", "employer-match", "benefits"],
  },

  // ------------------------------------------------------------------- Income
  {
    term: "Stipend",
    slug: "stipend",
    category: "Income",
    definition:
      "A fixed, often modest, sum paid to cover living costs or support work like an internship, fellowship, or training. It may be paid in regular installments and is not always tied to hours worked.",
    related: ["income", "gig-work", "taxable-income"],
  },
  {
    term: "Pay Period",
    slug: "pay-period",
    category: "Income",
    definition:
      "The recurring length of time your pay covers, such as weekly, every two weeks, or monthly. It sets how often you get a paycheck and how each one is calculated.",
    related: ["paycheck", "pay-stub", "salary"],
  },
  {
    term: "Take-Home Pay",
    slug: "take-home-pay",
    category: "Income",
    definition:
      "The money you actually receive after taxes and other deductions are subtracted from your gross pay. It is another name for net pay and is what lands in your account.",
    related: ["net-pay", "gross-income", "withholding"],
  },
  {
    term: "Pay Raise",
    slug: "pay-raise",
    category: "Income",
    definition:
      "An increase in your hourly wage or salary that raises your earnings going forward. It may reward performance, a promotion, or rising costs of living.",
    related: ["salary", "wage", "cost-of-living"],
  },
  {
    term: "Severance",
    slug: "severance",
    category: "Income",
    definition:
      "Pay or benefits an employer may give when it lets a worker go, often based on how long they worked there. It is meant to provide a cushion while the person looks for new work.",
    related: ["benefits", "income"],
  },
  {
    term: "Tips",
    slug: "tips",
    category: "Income",
    definition:
      "Extra money customers give workers in jobs like serving food, on top of wages, as a thank-you for service. Tips count as income and are supposed to be reported for taxes.",
    related: ["income", "wage", "taxable-income"],
  },
  {
    term: "Paid Time Off",
    slug: "paid-time-off",
    category: "Income",
    definition:
      "Hours an employer lets you take off while still being paid, covering things like vacation, sick days, or personal days. The amount you get is part of your overall benefits.",
    related: ["benefits", "salary"],
  },

  // -------------------------------------------------------------------- Taxes
  {
    term: "Adjusted Gross Income",
    slug: "adjusted-gross-income",
    category: "Taxes",
    definition:
      "Your total income for the year minus certain allowed subtractions, such as some retirement contributions. Often shortened to AGI, it is the starting figure many tax breaks and limits are based on.",
    related: ["gross-income", "taxable-income", "deduction"],
  },
  {
    term: "Itemized Deduction",
    slug: "itemized-deduction",
    category: "Taxes",
    definition:
      "Listing out specific deductible expenses, like certain medical costs or donations, instead of taking the flat standard deduction. People choose whichever lowers their taxable income more.",
    related: ["standard-deduction", "deduction", "taxable-income"],
  },
  {
    term: "Effective Tax Rate",
    slug: "effective-tax-rate",
    category: "Taxes",
    definition:
      "The average share of your income that actually goes to tax, found by dividing total tax by total income. It is usually lower than your top bracket because brackets only tax the income inside each range.",
    related: ["tax-bracket", "marginal-tax-rate", "income-tax"],
  },
  {
    term: "Marginal Tax Rate",
    slug: "marginal-tax-rate",
    category: "Taxes",
    definition:
      "The tax rate applied to your next dollar of income, set by the top bracket your income reaches. Because of how brackets work, it is higher than your effective tax rate.",
    related: ["tax-bracket", "effective-tax-rate", "income-tax"],
  },
  {
    term: "Tax Audit",
    slug: "tax-audit",
    category: "Taxes",
    definition:
      "A review by the IRS or a state agency to check that the income and deductions on a tax return are accurate. Keeping good records makes it easier to answer questions if you are audited.",
    related: ["irs", "tax-return", "deduction"],
  },
  {
    term: "Estimated Taxes",
    slug: "estimated-taxes",
    category: "Taxes",
    definition:
      "Tax payments made during the year by people whose income has no tax withheld, such as the self-employed. They are usually paid in four installments to avoid a big bill and penalties at filing time.",
    related: ["withholding", "self-employment", "irs"],
  },
  {
    term: "Payroll Tax",
    slug: "payroll-tax",
    category: "Taxes",
    definition:
      "Taxes taken out of wages to fund Social Security and Medicare, split between you and your employer. On your pay stub these usually appear under FICA.",
    related: ["fica", "withholding", "pay-stub"],
  },
  {
    term: "Tax Deadline",
    slug: "tax-deadline",
    category: "Taxes",
    definition:
      "The yearly due date for filing a federal tax return and paying any tax owed, usually April 15. Missing it can lead to penalties and interest unless you request an extension.",
    related: ["tax-return", "irs", "tax-refund"],
  },

  // ---------------------------------------------------------------- Insurance
  {
    term: "Coinsurance",
    slug: "coinsurance",
    category: "Insurance",
    definition:
      "The share of a covered medical cost you pay after meeting your deductible, given as a percentage. With 20 percent coinsurance the insurer pays 80 percent and you pay the rest, up to your out-of-pocket maximum.",
    related: ["deductible-insurance", "copay", "out-of-pocket-maximum"],
  },
  {
    term: "Network Provider",
    slug: "network-provider",
    category: "Insurance",
    definition:
      "A doctor, hospital, or pharmacy that has agreed to your insurer's rates. Staying in network usually costs you much less than going out of network, where you may pay a larger share or the full bill.",
    related: ["health-insurance", "copay", "coverage"],
  },
  {
    term: "Health Savings Account",
    slug: "health-savings-account",
    category: "Insurance",
    definition:
      "A special savings account, paired with certain high-deductible health plans, for setting aside pre-tax money to pay medical costs. The money is yours to keep and rolls over year to year.",
    related: ["deductible-insurance", "flexible-spending-account", "health-insurance"],
  },
  {
    term: "Flexible Spending Account",
    slug: "flexible-spending-account",
    category: "Insurance",
    definition:
      "An employer account that lets you set aside pre-tax money for health or dependent-care costs. Unlike a health savings account, you usually must spend the money within the plan year or lose part of it.",
    related: ["health-savings-account", "health-insurance", "benefits"],
  },
  {
    term: "Underwriting",
    slug: "underwriting",
    category: "Insurance",
    definition:
      "The process an insurer or lender uses to weigh your risk and decide whether to cover or lend to you, and at what price. For insurance it helps set your premium.",
    related: ["premium", "policy", "coverage"],
  },
  {
    term: "Open Enrollment",
    slug: "open-enrollment",
    category: "Insurance",
    definition:
      "The set period each year when you can sign up for or change health insurance and similar benefits. Outside this window you usually need a major life event, like a new job, to make changes.",
    related: ["health-insurance", "benefits", "premium"],
  },

  // ------------------------------------------------------------ College & Aid
  {
    term: "Award Letter",
    slug: "award-letter",
    category: "College & Aid",
    definition:
      "The document a college sends after you apply for aid, listing the grants, scholarships, loans, and work-study it offers. Comparing award letters shows what each school will really cost you.",
    related: ["financial-aid", "cost-of-attendance", "net-price"],
  },
  {
    term: "Expected Family Contribution (EFC)",
    slug: "efc",
    category: "College & Aid",
    definition:
      "An older figure from the FAFSA that estimated how much a family could pay for college. For aid starting in the 2024 to 2025 year it was renamed the Student Aid Index.",
    related: ["student-aid-index", "fafsa", "financial-aid"],
  },
  {
    term: "Net Price",
    slug: "net-price",
    category: "College & Aid",
    definition:
      "What a college actually costs after grants and scholarships are subtracted from the full price. It is a clearer number than the sticker price for comparing schools.",
    related: ["cost-of-attendance", "award-letter", "financial-aid"],
  },
  {
    term: "Private Student Loan",
    slug: "private-student-loan",
    category: "College & Aid",
    definition:
      "An education loan from a bank or other lender rather than the federal government. It often has fewer protections and may need a cosigner, so students usually use federal loans first.",
    related: ["student-loan", "subsidized-loan", "cosigner", "loan-servicer"],
  },
  {
    term: "CSS Profile",
    slug: "css-profile",
    category: "College & Aid",
    definition:
      "An extra financial aid application some colleges require, in addition to the FAFSA, to award their own grants and scholarships. It asks for more detailed family financial information.",
    related: ["fafsa", "financial-aid", "grant"],
  },
  {
    term: "Merit Aid",
    slug: "merit-aid",
    category: "College & Aid",
    definition:
      "Money for college awarded for achievements like grades, test scores, talent, or leadership, rather than for financial need. It does not have to be repaid.",
    related: ["scholarship", "need-based-aid", "grant"],
  },
  {
    term: "Need-Based Aid",
    slug: "need-based-aid",
    category: "College & Aid",
    definition:
      "College money awarded because of a family's financial situation rather than achievements. Eligibility is usually figured from the FAFSA and the Student Aid Index.",
    related: ["financial-aid", "merit-aid", "student-aid-index", "fafsa"],
  },
  {
    term: "Disbursement",
    slug: "disbursement",
    category: "College & Aid",
    definition:
      "When financial aid money is actually released, usually sent to the school to cover tuition and fees, with any leftover paid to the student. It often happens at the start of each term.",
    related: ["financial-aid", "award-letter", "tuition"],
  },
  {
    term: "Loan Servicer",
    slug: "loan-servicer",
    category: "College & Aid",
    definition:
      "The company that handles your loan after you get it, taking your payments and answering questions. You may never deal with the original lender, only the servicer.",
    related: ["student-loan", "loan", "private-student-loan"],
  },
  // ============================================================
  // Glossary expansion: ~150 net-new terms (deeper layer per category)
  // ============================================================

  //                                                         Banking
  {
    term: "Clearinghouse",
    slug: "clearinghouse",
    category: "Banking",
    definition:
      "An institution that sits between banks to confirm and settle payments, making sure money actually moves from one account to another. The Automated Clearing House network is one example.",
    related: ["ach-transfer", "wire-transfer"],
  },
  {
    term: "Float",
    slug: "float",
    category: "Banking",
    definition:
      "The short window when a payment has left one account but has not yet arrived in another, so the same money can briefly appear in two places. Float shrinks as electronic payments settle faster.",
    related: ["pending-transaction", "available-balance", "ach-transfer"],
  },
  {
    term: "Ledger Balance",
    slug: "ledger-balance",
    category: "Banking",
    definition:
      "The total in your account at the start of the day, before any holds or new deposits are applied. It can be higher than your available balance when some funds are still on hold.",
    related: ["available-balance", "pending-transaction", "statement"],
  },
  {
    term: "Payable on Death (POD)",
    slug: "payable-on-death",
    category: "Banking",
    definition:
      "A simple instruction on a bank account naming who receives the money if the owner dies, without going through court. It is sometimes called a POD designation.",
    related: ["beneficiary", "joint-account"],
  },
  {
    term: "Dormant Account",
    slug: "dormant-account",
    category: "Banking",
    definition:
      "A bank account with no customer activity for a long stretch, often a year or more. Banks may charge fees on it or eventually turn the balance over to the state.",
    related: ["savings-account", "statement"],
  },
  {
    term: "Stop Payment",
    slug: "stop-payment",
    category: "Banking",
    definition:
      "A request asking your bank not to pay a specific check or transfer you already sent. Banks usually charge a fee, and it must be placed before the item clears.",
    related: ["cashiers-check", "money-order"],
  },
  {
    term: "Sweep Account",
    slug: "sweep-account",
    category: "Banking",
    definition:
      "An account setup that automatically moves extra cash into a savings or investment option at the end of each day, then back when needed. It keeps idle money earning a return.",
    related: ["savings-account", "money-market-account"],
  },
  {
    term: "Deposit Hold",
    slug: "deposit-hold",
    category: "Banking",
    definition:
      "A short delay before all of a deposited check is available to spend, while the bank confirms the money is good. Part of the deposit may be released right away.",
    related: ["available-balance", "pending-transaction", "mobile-deposit"],
  },
  {
    term: "Certified Check",
    slug: "certified-check",
    category: "Banking",
    definition:
      "A personal check the bank marks as guaranteed, setting aside the funds so it will not bounce. It differs from a cashier's check, which is drawn on the bank's own account.",
    related: ["cashiers-check", "money-order"],
  },
  {
    term: "Electronic Funds Transfer (EFT)",
    slug: "electronic-funds-transfer",
    category: "Banking",
    definition:
      "Any movement of money between accounts done by computer rather than paper, including ACH payments, wires, and card transactions. It is often shortened to EFT.",
    related: ["ach-transfer", "wire-transfer", "direct-deposit"],
  },
  {
    term: "Demand Deposit",
    slug: "demand-deposit",
    category: "Banking",
    definition:
      "Money in an account you can withdraw at any time without notice, like a checking account. The bank must give it to you on demand.",
    related: ["checking-account", "savings-account"],
  },
  {
    term: "Direct Debit",
    slug: "direct-debit",
    category: "Banking",
    definition:
      "A standing arrangement that lets a company pull a payment from your account on a schedule, such as for a gym or utility. You authorize it in advance.",
    related: ["autopay", "ach-transfer", "recurring-expense"],
  },
  {
    term: "Check Register",
    slug: "check-register",
    category: "Banking",
    definition:
      "A running personal record of the checks, deposits, and withdrawals in your account, used to track your balance. It helps you spot fees or fraud.",
    related: ["statement", "available-balance", "ledger-balance"],
  },
  {
    term: "Linked Account",
    slug: "linked-account",
    category: "Banking",
    definition:
      "Two accounts connected so money can move between them easily, or so one can cover the other. People often link checking to savings for overdraft protection.",
    related: ["overdraft-protection", "savings-account", "checking-account"],
  },
  {
    term: "Micro-Deposit",
    slug: "micro-deposit",
    category: "Banking",
    definition:
      "Tiny test deposits, often a few cents, that a service sends to confirm you own a bank account before linking it. You report the amounts back to verify.",
    related: ["ach-transfer", "peer-to-peer-payment", "account-number"],
  },
  {
    term: "Account Alert",
    slug: "account-alert",
    category: "Banking",
    definition:
      "An automatic text or email a bank sends about account activity, such as a low balance or a large charge. Alerts help you catch fraud and avoid fees.",
    related: ["mobile-banking", "overdraft-fee", "available-balance"],
  },
  {
    term: "Neobank",
    slug: "neobank",
    category: "Banking",
    definition:
      "An online-only bank with no branches, usually run through an app. It often has lower fees but partners with a traditional bank to provide deposit insurance.",
    related: ["online-banking", "mobile-banking", "fdic"],
  },

  //                                                          Saving
  {
    term: "CD Ladder",
    slug: "cd-ladder",
    category: "Saving",
    definition:
      "A savings approach that splits money across several certificates of deposit with different end dates, so one matures regularly. It balances higher rates with steady access to cash.",
    related: ["certificate-of-deposit", "maturity", "liquidity"],
  },
  {
    term: "Compounding Frequency",
    slug: "compounding-frequency",
    category: "Saving",
    definition:
      "How often earned interest is added to your balance, such as daily, monthly, or yearly. More frequent compounding slightly increases what you earn over time.",
    related: ["compound-interest", "apy", "interest"],
  },
  {
    term: "Real Return",
    slug: "real-return",
    category: "Saving",
    definition:
      "The return on savings or investments after subtracting inflation, showing the change in real buying power. A 4 percent return with 3 percent inflation is about a 1 percent real return.",
    related: ["nominal-return", "inflation", "return"],
  },
  {
    term: "Nominal Return",
    slug: "nominal-return",
    category: "Saving",
    definition:
      "The stated return on savings or an investment before accounting for inflation. It looks larger than the real return when prices are rising.",
    related: ["real-return", "inflation", "return"],
  },
  {
    term: "Round-Up Savings",
    slug: "round-up-savings",
    category: "Saving",
    definition:
      "A feature that rounds each purchase up to the next dollar and moves the spare change into savings. Small amounts add up over many transactions.",
    related: ["automatic-savings", "savings-account"],
  },
  {
    term: "Savings Rate",
    slug: "savings-rate",
    category: "Saving",
    definition:
      "The share of your income you set aside instead of spending, usually written as a percentage. A higher savings rate builds funds faster.",
    related: ["pay-yourself-first", "emergency-fund", "automatic-savings"],
  },
  {
    term: "Inflation-Adjusted",
    slug: "inflation-adjusted",
    category: "Saving",
    definition:
      "A number that has been changed to remove the effect of rising prices, so amounts from different years can be compared fairly. It is also called a figure in real terms.",
    related: ["inflation", "real-return", "cost-of-living"],
  },
  {
    term: "Goal-Based Saving",
    slug: "goal-based-saving",
    category: "Saving",
    definition:
      "Saving toward a specific target, like a trip or a deposit, often in a separate account so the money is not mixed with everyday spending.",
    related: ["sinking-fund", "savings-account", "automatic-savings"],
  },
  {
    term: "Windfall",
    slug: "windfall",
    category: "Saving",
    definition:
      "A sudden, unexpected sum of money, such as a gift, bonus, or tax refund. How you handle a windfall can have a lasting effect on your finances.",
    related: ["tax-refund", "bonus", "emergency-fund"],
  },
  {
    term: "Nest Egg",
    slug: "nest-egg",
    category: "Saving",
    definition:
      "A common name for the pool of money saved for a big future goal, especially retirement. It usually grows over many years.",
    related: ["retirement", "emergency-fund", "compound-growth"],
  },

  //                                                       Budgeting
  {
    term: "Burn Rate",
    slug: "burn-rate",
    category: "Budgeting",
    definition:
      "How quickly you are spending down savings or cash on hand, often measured per month. Knowing your burn rate shows how long your money will last.",
    related: ["cash-flow", "emergency-fund", "budget"],
  },
  {
    term: "One-Time Expense",
    slug: "one-time-expense",
    category: "Budgeting",
    definition:
      "A cost that happens once rather than repeating, like a car repair or a deposit. Setting money aside for these keeps them from breaking a budget.",
    related: ["recurring-expense", "sinking-fund", "variable-expense"],
  },
  {
    term: "Budget Surplus",
    slug: "budget-surplus",
    category: "Budgeting",
    definition:
      "When your income for a period is more than what you spend, leaving money left over. The extra can go toward savings or paying down debt.",
    related: ["budget", "cash-flow", "budget-deficit"],
  },
  {
    term: "Budget Deficit",
    slug: "budget-deficit",
    category: "Budgeting",
    definition:
      "When you spend more than you take in over a period, so you dip into savings or take on debt to cover the gap.",
    related: ["budget", "cash-flow", "budget-surplus"],
  },
  {
    term: "Baseline Budget",
    slug: "baseline-budget",
    category: "Budgeting",
    definition:
      "A budget built from your most basic, must-pay costs, showing the minimum income you need to get by. It helps you see how much room is left for everything else.",
    related: ["fixed-expense", "needs-vs-wants", "budget"],
  },
  {
    term: "Discretionary Income",
    slug: "discretionary-income",
    category: "Budgeting",
    definition:
      "The money left after taxes and necessities are paid, available for non-essential spending or saving. Some student loan plans use it to set payments.",
    related: ["disposable-income", "discretionary-spending", "income-driven-repayment"],
  },
  {
    term: "Annual Expense",
    slug: "annual-expense",
    category: "Budgeting",
    definition:
      "A cost that comes once a year, like an insurance premium or a membership. Spreading it across monthly savings keeps it from being a shock.",
    related: ["sinking-fund", "recurring-expense", "one-time-expense"],
  },
  {
    term: "Impulse Purchase",
    slug: "impulse-purchase",
    category: "Budgeting",
    definition:
      "An unplanned buy made on the spur of the moment, not part of your budget. Tracking these helps you see where money leaks out.",
    related: ["discretionary-spending", "needs-vs-wants", "budget"],
  },
  {
    term: "Line Item",
    slug: "line-item",
    category: "Budgeting",
    definition:
      "A single named entry in a budget, such as groceries or rent. Breaking spending into line items shows where the money goes.",
    related: ["budget", "fixed-expense", "variable-expense"],
  },

  //                                                          Credit
  {
    term: "Credit Mix",
    slug: "credit-mix",
    category: "Credit",
    definition:
      "The variety of credit types you have, such as cards, a car loan, and a student loan. A healthy mix can modestly help a credit score.",
    related: ["credit-score", "fico-score", "revolving-debt", "installment-loan"],
  },
  {
    term: "Fraud Alert",
    slug: "fraud-alert",
    category: "Credit",
    definition:
      "A free notice you place on your credit file telling lenders to take extra steps to confirm your identity before opening new credit. It helps if your information may be stolen.",
    related: ["credit-freeze", "credit-report", "credit-monitoring"],
  },
  {
    term: "Credit Monitoring",
    slug: "credit-monitoring",
    category: "Credit",
    definition:
      "A service that watches your credit reports and alerts you to new accounts, inquiries, or score changes. It helps you catch errors or fraud early.",
    related: ["credit-report", "fraud-alert", "credit-freeze"],
  },
  {
    term: "VantageScore",
    slug: "vantagescore",
    category: "Credit",
    definition:
      "A credit score model created jointly by the three major credit bureaus, used alongside the better-known FICO score. The two can give slightly different numbers.",
    related: ["fico-score", "credit-score", "credit-bureau"],
  },
  {
    term: "Current Balance",
    slug: "current-balance",
    category: "Credit",
    definition:
      "The total you owe on a credit card right now, including recent charges since your last statement. It can be higher than the statement balance you must pay.",
    related: ["statement-balance", "credit-card", "billing-cycle"],
  },
  {
    term: "Credit-Builder Loan",
    slug: "credit-builder-loan",
    category: "Credit",
    definition:
      "A small loan made to help build credit, where the amount borrowed is held in savings and released to you after you finish the payments. Your on-time payments are reported to the bureaus.",
    related: ["credit-score", "secured-credit-card", "installment-loan"],
  },
  {
    term: "Charge Card",
    slug: "charge-card",
    category: "Credit",
    definition:
      "A card that must be paid in full every month and usually has no preset spending limit. Unlike a credit card, it does not let you carry a balance.",
    related: ["credit-card", "statement-balance", "annual-fee"],
  },
  {
    term: "Available Credit",
    slug: "available-credit",
    category: "Credit",
    definition:
      "The part of your credit limit you have not used yet, equal to the limit minus your current balance. Keeping it high helps your credit utilization.",
    related: ["credit-limit", "credit-utilization", "current-balance"],
  },
  {
    term: "Credit Counseling",
    slug: "credit-counseling",
    category: "Credit",
    definition:
      "A service, often from a nonprofit, that helps you review debts and build a repayment plan, sometimes through a debt management plan. Reputable counseling is educational, not a loan.",
    related: ["debt-consolidation", "debt", "collections"],
  },
  {
    term: "Store Credit Card",
    slug: "store-credit-card",
    category: "Credit",
    definition:
      "A credit card tied to one store or brand, often easier to get but carrying a high interest rate. Its rewards usually work only at that retailer.",
    related: ["credit-card", "annual-fee", "apr"],
  },
  {
    term: "Penalty APR",
    slug: "penalty-apr",
    category: "Credit",
    definition:
      "A much higher interest rate a card issuer can charge after you miss payments. It can apply to your existing balance, not just new charges.",
    related: ["apr", "late-fee", "introductory-apr"],
  },
  {
    term: "Credit Line Increase",
    slug: "credit-line-increase",
    category: "Credit",
    definition:
      "A raise in the spending limit on a credit card, which you can request or the issuer may grant. A higher limit can lower your credit utilization.",
    related: ["credit-limit", "credit-utilization", "available-credit"],
  },
  {
    term: "Chargeback",
    slug: "chargeback",
    category: "Credit",
    definition:
      "A reversal of a card payment that your bank forces when you dispute a charge, such as for fraud or an item that never arrived.",
    related: ["credit-card", "fraud-alert", "billing-cycle"],
  },
  {
    term: "Deferred Interest",
    slug: "deferred-interest",
    category: "Credit",
    definition:
      "A store financing offer where interest is waived only if you pay the full balance by a deadline. Miss it, and interest is charged back to the original purchase date.",
    related: ["introductory-apr", "apr", "store-credit-card"],
  },

  //                                                            Debt
  {
    term: "Balloon Payment",
    slug: "balloon-payment",
    category: "Debt",
    definition:
      "A large final payment due at the end of some loans after smaller earlier payments. It can be a surprise if you did not plan for it.",
    related: ["amortization", "loan-term", "loan"],
  },
  {
    term: "Chapter 7 Bankruptcy",
    slug: "chapter-7-bankruptcy",
    category: "Debt",
    definition:
      "A form of bankruptcy that erases many unsecured debts by selling off certain assets, giving a faster fresh start. Some property is protected, and some debts cannot be erased.",
    related: ["bankruptcy", "chapter-13-bankruptcy", "unsecured-loan"],
  },
  {
    term: "Chapter 13 Bankruptcy",
    slug: "chapter-13-bankruptcy",
    category: "Debt",
    definition:
      "A form of bankruptcy that sets up a court-approved plan to repay debts over three to five years, letting you keep more property. It suits people with steady income.",
    related: ["bankruptcy", "chapter-7-bankruptcy", "default"],
  },
  {
    term: "Debt Settlement",
    slug: "debt-settlement",
    category: "Debt",
    definition:
      "Negotiating with a lender to accept less than the full amount owed to close out a debt. It can hurt your credit, and any forgiven amount may be taxed.",
    related: ["debt", "collections", "charge-off"],
  },
  {
    term: "Loan Term",
    slug: "loan-term",
    category: "Debt",
    definition:
      "The length of time you have to repay a loan, such as 36 months or 30 years. A longer term lowers the monthly payment but usually raises total interest.",
    related: ["loan", "amortization", "interest-rate"],
  },
  {
    term: "Fixed-Rate Loan",
    slug: "fixed-rate-loan",
    category: "Debt",
    definition:
      "A loan whose interest rate stays the same for the whole term, so the payment is predictable. It does not change when market rates move.",
    related: ["variable-rate-loan", "interest-rate", "loan"],
  },
  {
    term: "Variable-Rate Loan",
    slug: "variable-rate-loan",
    category: "Debt",
    definition:
      "A loan whose interest rate can rise or fall over time based on a benchmark rate, so the payment can change. It may start lower than a fixed rate.",
    related: ["fixed-rate-loan", "interest-rate", "loan"],
  },
  {
    term: "Cosigner Release",
    slug: "cosigner-release",
    category: "Debt",
    definition:
      "A feature on some loans that lets the cosigner be removed after the main borrower makes a set number of on-time payments and qualifies on their own.",
    related: ["cosigner", "loan", "promissory-note"],
  },
  {
    term: "Principal Balance",
    slug: "principal-balance",
    category: "Debt",
    definition:
      "The amount of a loan you still owe, not counting future interest. Extra payments that go toward principal lower the total interest you pay.",
    related: ["principal", "amortization", "loan"],
  },
  {
    term: "Interest-Only Loan",
    slug: "interest-only-loan",
    category: "Debt",
    definition:
      "A loan that for a time lets you pay only the interest, so the balance does not shrink. Payments jump later when principal is added.",
    related: ["principal-balance", "amortization", "loan"],
  },
  {
    term: "Mortgage",
    slug: "mortgage",
    category: "Debt",
    definition:
      "A loan used to buy a home, with the home itself as collateral. If payments stop, the lender can take the home through foreclosure.",
    related: ["collateral", "secured-loan", "foreclosure", "principal-balance"],
  },
  {
    term: "Foreclosure",
    slug: "foreclosure",
    category: "Debt",
    definition:
      "The legal process a lender uses to take and sell a home when the mortgage is not paid. It seriously damages credit.",
    related: ["mortgage", "repossession", "default"],
  },
  {
    term: "Auto Loan",
    slug: "auto-loan",
    category: "Debt",
    definition:
      "A loan used to buy a vehicle, with the vehicle as collateral. Missing payments can lead to repossession.",
    related: ["secured-loan", "collateral", "repossession"],
  },
  {
    term: "Personal Loan",
    slug: "personal-loan",
    category: "Debt",
    definition:
      "A loan you can use for almost any purpose, often unsecured and repaid in fixed monthly installments. The rate depends on your credit.",
    related: ["unsecured-loan", "installment-loan", "loan"],
  },
  {
    term: "Line of Credit",
    slug: "line-of-credit",
    category: "Debt",
    definition:
      "A set amount you can borrow from as needed, repay, and borrow again, paying interest only on what you use. A credit card is one common form.",
    related: ["revolving-debt", "credit-limit", "loan"],
  },
  {
    term: "Judgment",
    slug: "judgment",
    category: "Debt",
    definition:
      "A court's official ruling that you owe a debt, which a creditor can use to pursue collection through steps like wage garnishment.",
    related: ["garnishment", "collections", "lien"],
  },
  {
    term: "Statute of Limitations",
    slug: "statute-of-limitations",
    category: "Debt",
    definition:
      "The legal time limit a creditor has to sue over an unpaid debt. After it passes, the debt still exists but is much harder to enforce.",
    related: ["collections", "delinquency", "debt"],
  },
  {
    term: "Escrow",
    slug: "escrow",
    category: "Debt",
    definition:
      "Money or a document held by a neutral third party until the terms of a deal are met, common with home purchases and property taxes. The holder releases it when conditions are satisfied.",
    related: ["property-tax", "lien", "mortgage"],
  },

  //                                                       Investing
  {
    term: "Compound Annual Growth Rate (CAGR)",
    slug: "compound-annual-growth-rate",
    category: "Investing",
    definition:
      "The steady yearly rate that would take an investment from its starting value to its ending value over several years. It smooths out the ups and downs along the way.",
    related: ["compound-growth", "return", "dollar-cost-averaging"],
  },
  {
    term: "Market Capitalization",
    slug: "market-capitalization",
    category: "Investing",
    definition:
      "The total value of a company's shares, found by multiplying the share price by the number of shares. It shows a company's size, from small-cap to large-cap.",
    related: ["stock", "share", "stock-exchange"],
  },
  {
    term: "Target-Date Fund",
    slug: "target-date-fund",
    category: "Investing",
    definition:
      "A fund that automatically shifts from more stocks to more bonds as a chosen year approaches, such as a retirement date. It is built to need little hands-on management.",
    related: ["mutual-fund", "asset-allocation", "retirement", "rebalancing"],
  },
  {
    term: "Traditional IRA",
    slug: "traditional-ira",
    category: "Investing",
    definition:
      "A retirement account where contributions may be deducted from taxes now and withdrawals are taxed later. It contrasts with a Roth IRA, which is taxed the other way around.",
    related: ["ira", "roth-ira", "retirement", "tax-deferred"],
  },
  {
    term: "Restricted Stock Unit (RSU)",
    slug: "restricted-stock-unit",
    category: "Investing",
    definition:
      "Company shares an employer promises to give an employee, which become theirs only after meeting time or performance conditions. It is often shortened to RSU.",
    related: ["vesting", "stock", "share", "employer-match"],
  },
  {
    term: "Treasury Security",
    slug: "treasury-security",
    category: "Investing",
    definition:
      "A loan you make to the U.S. government that pays interest and is considered very low risk. Treasury bills, notes, and bonds differ mainly by how long until they are repaid.",
    related: ["bond", "return", "liquidity"],
  },
  {
    term: "Municipal Bond",
    slug: "municipal-bond",
    category: "Investing",
    definition:
      "A bond issued by a state or local government, often to fund public projects. Its interest is frequently free from federal income tax.",
    related: ["bond", "corporate-bond", "interest"],
  },
  {
    term: "Corporate Bond",
    slug: "corporate-bond",
    category: "Investing",
    definition:
      "A bond issued by a company to raise money, which pays interest to lenders. It usually offers higher interest than a government bond because the risk is greater.",
    related: ["bond", "municipal-bond", "treasury-security"],
  },
  {
    term: "Money Market Fund",
    slug: "money-market-fund",
    category: "Investing",
    definition:
      "A mutual fund that holds very short-term, low-risk investments and aims to keep a stable value. It is different from a bank money market account.",
    related: ["mutual-fund", "money-market-account", "liquidity"],
  },
  {
    term: "Cost Basis",
    slug: "cost-basis",
    category: "Investing",
    definition:
      "The original amount you paid for an investment, used to figure your gain or loss when you sell. A higher basis means a smaller taxable gain.",
    related: ["capital-gain", "capital-loss", "stock"],
  },
  {
    term: "Unrealized Gain",
    slug: "unrealized-gain",
    category: "Investing",
    definition:
      "An increase in the value of an investment you still own, which becomes real only when you sell. It is sometimes called a paper gain.",
    related: ["capital-gain", "capital-loss", "portfolio"],
  },
  {
    term: "Realized Gain",
    slug: "realized-gain",
    category: "Investing",
    definition:
      "The profit locked in when you actually sell an investment for more than you paid. Unlike an unrealized gain, it can be taxed.",
    related: ["unrealized-gain", "capital-gain", "capital-gains-tax"],
  },
  {
    term: "Dividend Reinvestment",
    slug: "dividend-reinvestment",
    category: "Investing",
    definition:
      "Using the dividends an investment pays to automatically buy more shares instead of taking the cash. It can speed up compound growth.",
    related: ["dividend", "compound-growth", "share"],
  },
  {
    term: "Stock Split",
    slug: "stock-split",
    category: "Investing",
    definition:
      "When a company divides its existing shares into more shares, lowering the price of each while keeping the total value the same. Owners simply hold more shares at a lower price.",
    related: ["stock", "share", "market-capitalization"],
  },
  {
    term: "Price-to-Earnings Ratio",
    slug: "price-to-earnings-ratio",
    category: "Investing",
    definition:
      "A measure comparing a stock's price to the company's yearly profit per share. A high ratio can mean investors expect strong growth, or that the stock is pricey.",
    related: ["stock", "share", "dividend"],
  },
  {
    term: "Blue-Chip Stock",
    slug: "blue-chip-stock",
    category: "Investing",
    definition:
      "Shares of a large, well-known company with a long record of stable performance. They are seen as steadier but slower-growing than smaller companies.",
    related: ["stock", "market-capitalization", "volatility"],
  },
  {
    term: "Securities",
    slug: "securities",
    category: "Investing",
    definition:
      "A general term for tradable financial assets such as stocks and bonds. Buying a security means buying a small ownership stake or a loan.",
    related: ["stock", "bond", "brokerage-account"],
  },
  {
    term: "Asset Class",
    slug: "asset-class",
    category: "Investing",
    definition:
      "A group of investments that behave alike and follow similar rules, such as stocks, bonds, or cash. Spreading money across classes is a core part of diversification.",
    related: ["asset-allocation", "diversification", "asset"],
  },
  {
    term: "Annuity",
    slug: "annuity",
    category: "Investing",
    definition:
      "A contract, often with an insurer, that pays you a stream of income for a set time or for life in exchange for money paid up front or over time.",
    related: ["retirement", "life-insurance", "return"],
  },
  {
    term: "Mutual Fund Load",
    slug: "mutual-fund-load",
    category: "Investing",
    definition:
      "A sales fee charged when you buy or sell shares of some mutual funds. Funds without this fee are called no-load funds.",
    related: ["mutual-fund", "expense-ratio", "brokerage-account"],
  },
  {
    term: "Market Order",
    slug: "market-order",
    category: "Investing",
    definition:
      "An instruction to buy or sell an investment right away at the best current price. It fills fast, but the exact price is not guaranteed.",
    related: ["limit-order", "brokerage-account", "stock"],
  },
  {
    term: "Limit Order",
    slug: "limit-order",
    category: "Investing",
    definition:
      "An instruction to buy or sell only at a set price or better. It controls the price but may not fill if the market never reaches it.",
    related: ["market-order", "brokerage-account", "stock"],
  },
  {
    term: "Shareholder",
    slug: "shareholder",
    category: "Investing",
    definition:
      "Someone who owns shares of a company and therefore owns a small piece of it. Shareholders may receive dividends and votes.",
    related: ["share", "stock", "dividend"],
  },
  {
    term: "IPO (Initial Public Offering)",
    slug: "ipo",
    category: "Investing",
    definition:
      "A company's first sale of shares to the public, letting anyone buy in. The letters stand for initial public offering.",
    related: ["stock", "stock-exchange", "share"],
  },

  //                                                          Income
  {
    term: "Freelance",
    slug: "freelance",
    category: "Income",
    definition:
      "Working for yourself by taking on individual jobs or projects for different clients, rather than holding one steady job. Freelancers handle their own taxes and benefits.",
    related: ["self-employment", "gig-work", "1099", "self-employment-tax"],
  },
  {
    term: "Self-Employment Tax",
    slug: "self-employment-tax",
    category: "Income",
    definition:
      "The Social Security and Medicare tax that people who work for themselves pay, covering both the employee and employer shares. Regular employees split this with their employer.",
    related: ["self-employment", "fica", "payroll-tax", "estimated-taxes"],
  },
  {
    term: "Unemployment Benefits",
    slug: "unemployment-benefits",
    category: "Income",
    definition:
      "Temporary payments from a state program to people who lost a job through no fault of their own. The money partly replaces lost wages while they look for work.",
    related: ["severance", "benefits", "income"],
  },
  {
    term: "Promotion",
    slug: "promotion",
    category: "Income",
    definition:
      "A move to a higher position at work, usually with more responsibility and often more pay. It differs from a raise, which is more money in the same role.",
    related: ["pay-raise", "salary", "wage"],
  },
  {
    term: "Passive Income",
    slug: "passive-income",
    category: "Income",
    definition:
      "Money earned with little ongoing effort, such as interest, dividends, or rent. It contrasts with the active income you earn by working.",
    related: ["dividend", "interest", "income"],
  },
  {
    term: "Earned Income",
    slug: "earned-income",
    category: "Income",
    definition:
      "Money you get from working, including wages, salary, tips, and self-employment pay. Some tax credits depend on having earned income.",
    related: ["gross-income", "wage", "salary", "tips"],
  },
  {
    term: "Independent Contractor",
    slug: "independent-contractor",
    category: "Income",
    definition:
      "A worker hired to do specific jobs who is not an employee, so taxes are not withheld from their pay. They usually receive a 1099 form.",
    related: ["1099", "self-employment", "freelance", "gig-work"],
  },
  {
    term: "W-9",
    slug: "w-9",
    category: "Income",
    definition:
      "A form you give a client or company so they have your taxpayer information to report what they paid you. It is common for contractors and freelancers.",
    related: ["1099", "independent-contractor", "self-employment"],
  },
  {
    term: "Net Income",
    slug: "net-income",
    category: "Income",
    definition:
      "What is left from earnings after taxes and deductions are taken out. For a person it is take-home pay; for a business it is profit after costs.",
    related: ["gross-income", "take-home-pay", "net-pay"],
  },
  {
    term: "Back Pay",
    slug: "back-pay",
    category: "Income",
    definition:
      "Wages owed for past work that were not paid on time, paid later in a lump sum. It can come from a raise applied late or a legal ruling.",
    related: ["wage", "pay-raise", "paycheck"],
  },
  {
    term: "Living Wage",
    slug: "living-wage",
    category: "Income",
    definition:
      "An estimate of the income a worker needs to cover basic costs in a specific area. It is usually higher than the legal minimum wage.",
    related: ["minimum-wage", "cost-of-living", "wage"],
  },
  {
    term: "Royalty",
    slug: "royalty",
    category: "Income",
    definition:
      "A payment to a creator or owner each time their work or property is used, such as a song or a patent. It is a form of ongoing income.",
    related: ["passive-income", "income"],
  },
  {
    term: "1099-NEC",
    slug: "1099-nec",
    category: "Income",
    definition:
      "A 1099 form that reports nonemployee pay, like money earned as a contractor or freelancer. The payer also sends a copy to the IRS.",
    related: ["1099", "independent-contractor", "self-employment"],
  },

  //                                                           Taxes
  {
    term: "Tax Liability",
    slug: "tax-liability",
    category: "Taxes",
    definition:
      "The total amount of tax you owe for the year before counting what you already paid through withholding or estimated payments. If payments fall short, you owe the difference.",
    related: ["taxable-income", "withholding", "tax-refund", "tax-bracket"],
  },
  {
    term: "1098-T",
    slug: "1098-t",
    category: "Taxes",
    definition:
      "A form colleges send showing the tuition you paid, used to claim education tax credits or deductions. The school sends a copy to the IRS too.",
    related: ["1040", "tax-credit", "tuition"],
  },
  {
    term: "1040",
    slug: "1040",
    category: "Taxes",
    definition:
      "The main federal form individuals use to file an income tax return each year. Other forms and schedules attach to it.",
    related: ["tax-return", "irs", "taxable-income", "adjusted-gross-income"],
  },
  {
    term: "Refundable Tax Credit",
    slug: "refundable-tax-credit",
    category: "Taxes",
    definition:
      "A tax credit that can lower your tax below zero, so you get the leftover amount back as a refund. It helps even if you owe little tax.",
    related: ["tax-credit", "nonrefundable-tax-credit", "tax-refund"],
  },
  {
    term: "Nonrefundable Tax Credit",
    slug: "nonrefundable-tax-credit",
    category: "Taxes",
    definition:
      "A tax credit that can reduce what you owe down to zero but no further, so it cannot create a refund on its own.",
    related: ["tax-credit", "refundable-tax-credit", "tax-liability"],
  },
  {
    term: "Tax Extension",
    slug: "tax-extension",
    category: "Taxes",
    definition:
      "Permission to file your tax return later than the usual deadline, typically six more months. It delays the paperwork, not the payment, which is still due on time.",
    related: ["tax-deadline", "tax-return", "irs"],
  },
  {
    term: "Tax-Deferred",
    slug: "tax-deferred",
    category: "Taxes",
    definition:
      "Money in certain accounts that is not taxed until you take it out later, often in retirement. Growth builds without yearly taxes along the way.",
    related: ["traditional-ira", "401k", "ira", "retirement"],
  },
  {
    term: "Pre-Tax",
    slug: "pre-tax",
    category: "Taxes",
    definition:
      "Money taken from your pay before income taxes are figured, such as some retirement or health contributions. It lowers your taxable income now.",
    related: ["taxable-income", "401k", "health-savings-account", "withholding"],
  },
  {
    term: "After-Tax",
    slug: "after-tax",
    category: "Taxes",
    definition:
      "Money that has already had taxes taken out, or a contribution made from such money. Roth retirement contributions are made with after-tax dollars.",
    related: ["roth-ira", "take-home-pay", "net-pay"],
  },
  {
    term: "Capital Gains Tax",
    slug: "capital-gains-tax",
    category: "Taxes",
    definition:
      "The tax you owe on the profit when you sell an investment for more than you paid. Holding longer than a year usually means a lower rate.",
    related: ["capital-gain", "cost-basis", "taxable-income"],
  },
  {
    term: "Exemption",
    slug: "exemption",
    category: "Taxes",
    definition:
      "An amount that reduces taxable income, historically claimed for yourself and dependents. Personal exemptions were paused by recent law, but the term still appears.",
    related: ["dependent", "taxable-income", "deduction"],
  },
  {
    term: "Progressive Tax",
    slug: "progressive-tax",
    category: "Taxes",
    definition:
      "A tax system where higher income is taxed at higher rates. U.S. federal income tax works this way through brackets.",
    related: ["tax-bracket", "marginal-tax-rate", "income-tax"],
  },
  {
    term: "Regressive Tax",
    slug: "regressive-tax",
    category: "Taxes",
    definition:
      "A tax that takes a larger share of income from people who earn less. Sales taxes are often described as regressive.",
    related: ["sales-tax", "progressive-tax", "tax"],
  },
  {
    term: "Earned Income Tax Credit",
    slug: "earned-income-tax-credit",
    category: "Taxes",
    definition:
      "A refundable tax credit for workers with low to moderate income, larger for those with children. It can mean a refund even if no tax is owed.",
    related: ["refundable-tax-credit", "earned-income", "tax-credit"],
  },

  //                                                       Insurance
  {
    term: "Term Life Insurance",
    slug: "term-life-insurance",
    category: "Insurance",
    definition:
      "Life insurance that covers you for a set number of years and pays out only if you die during that time. It usually costs less than whole life.",
    related: ["life-insurance", "whole-life-insurance", "premium", "beneficiary"],
  },
  {
    term: "Whole Life Insurance",
    slug: "whole-life-insurance",
    category: "Insurance",
    definition:
      "Life insurance that lasts your whole life and builds a cash value you can borrow against. It costs more than term life.",
    related: ["life-insurance", "term-life-insurance", "premium"],
  },
  {
    term: "Claim Denial",
    slug: "claim-denial",
    category: "Insurance",
    definition:
      "When an insurer refuses to pay a claim, saying it is not covered or that rules were not met. You can usually appeal the decision.",
    related: ["claim", "coverage", "policy"],
  },
  {
    term: "Comprehensive Coverage",
    slug: "comprehensive-coverage",
    category: "Insurance",
    definition:
      "Car insurance that pays for damage not caused by a crash, such as theft, fire, or a fallen tree. It is optional unless a lender requires it.",
    related: ["auto-insurance", "collision-coverage", "deductible-insurance"],
  },
  {
    term: "Collision Coverage",
    slug: "collision-coverage",
    category: "Insurance",
    definition:
      "Car insurance that pays to repair your own vehicle after a crash, no matter who was at fault. It is separate from coverage for the other driver.",
    related: ["auto-insurance", "comprehensive-coverage", "liability-insurance"],
  },
  {
    term: "Umbrella Policy",
    slug: "umbrella-policy",
    category: "Insurance",
    definition:
      "Extra liability insurance that kicks in after your home or auto coverage runs out. It guards your savings against a large claim or lawsuit.",
    related: ["liability-insurance", "auto-insurance", "renters-insurance"],
  },
  {
    term: "Rider",
    slug: "rider",
    category: "Insurance",
    definition:
      "An add-on to an insurance policy that changes or expands what it covers, usually for an extra cost. It is also called an endorsement.",
    related: ["policy", "coverage", "premium"],
  },
  {
    term: "Explanation of Benefits (EOB)",
    slug: "explanation-of-benefits",
    category: "Insurance",
    definition:
      "A statement from a health insurer, not a bill, showing what a visit cost, what the plan paid, and what you may owe. Reviewing it helps catch errors.",
    related: ["health-insurance", "claim", "copay", "coinsurance"],
  },
  {
    term: "High-Deductible Health Plan",
    slug: "high-deductible-health-plan",
    category: "Insurance",
    definition:
      "A health plan with lower monthly premiums but a higher deductible you pay before coverage kicks in. It can be paired with a health savings account.",
    related: ["health-insurance", "deductible-insurance", "health-savings-account", "premium"],
  },
  {
    term: "Disability Insurance",
    slug: "disability-insurance",
    category: "Insurance",
    definition:
      "Insurance that replaces part of your income if an illness or injury keeps you from working. It can be short-term or long-term.",
    related: ["coverage", "premium", "benefits"],
  },
  {
    term: "Actual Cash Value",
    slug: "actual-cash-value",
    category: "Insurance",
    definition:
      "A way of paying a claim based on what an item is worth now, after wear and age, rather than the cost to buy new. It usually pays less than replacement cost.",
    related: ["replacement-cost", "claim", "coverage"],
  },
  {
    term: "Replacement Cost",
    slug: "replacement-cost",
    category: "Insurance",
    definition:
      "A way of paying a claim based on what it costs to replace an item with a new one, without subtracting for age or wear. It usually pays more than actual cash value.",
    related: ["actual-cash-value", "claim", "renters-insurance"],
  },
  {
    term: "Pre-Existing Condition",
    slug: "pre-existing-condition",
    category: "Insurance",
    definition:
      "A health issue you had before a new insurance plan started. Most health plans can no longer deny coverage or charge more because of one.",
    related: ["health-insurance", "coverage", "open-enrollment"],
  },
  {
    term: "Waiting Period",
    slug: "waiting-period",
    category: "Insurance",
    definition:
      "A set time after a policy starts before certain coverage begins. It is common with disability and some dental plans.",
    related: ["coverage", "policy", "disability-insurance"],
  },
  {
    term: "Policyholder",
    slug: "policyholder",
    category: "Insurance",
    definition:
      "The person who owns an insurance policy, pays the premium, and can make changes to it. The policyholder may differ from the person covered.",
    related: ["policy", "premium", "beneficiary"],
  },
  {
    term: "Group Health Insurance",
    slug: "group-health-insurance",
    category: "Insurance",
    definition:
      "Health coverage offered through an employer or organization to its members, usually cheaper than buying on your own. You often share the premium with the employer.",
    related: ["health-insurance", "open-enrollment", "premium"],
  },

  //                                                   College & Aid
  {
    term: "Net Price Calculator",
    slug: "net-price-calculator",
    category: "College & Aid",
    definition:
      "An online tool on a college's website that estimates what a student will actually pay after grants and scholarships, not the sticker price. Results are estimates, not offers.",
    related: ["net-price", "cost-of-attendance", "financial-aid"],
  },
  {
    term: "Federal Student Loan",
    slug: "federal-student-loan",
    category: "College & Aid",
    definition:
      "A student loan made through the U.S. government, which sets the rates and offers protections like income-driven repayment. It differs from a private loan from a bank.",
    related: ["student-loan", "private-student-loan", "subsidized-loan", "unsubsidized-loan"],
  },
  {
    term: "Income-Driven Repayment",
    slug: "income-driven-repayment",
    category: "College & Aid",
    definition:
      "A federal student loan plan that sets the monthly payment based on your income and family size, often lowering it. Any balance left after many years may be forgiven.",
    related: ["student-loan", "loan-forgiveness", "federal-student-loan", "discretionary-income"],
  },
  {
    term: "Verification",
    slug: "verification",
    category: "College & Aid",
    definition:
      "A step where a school asks for documents to confirm the information on a FAFSA before releasing aid. Being selected is routine and not a sign of a problem.",
    related: ["fafsa", "financial-aid", "student-aid-index"],
  },
  {
    term: "Student Aid Report (SAR)",
    slug: "student-aid-report",
    category: "College & Aid",
    definition:
      "A summary the government sends after you file the FAFSA, listing your answers and aid eligibility figures. Newer versions are called the FAFSA Submission Summary.",
    related: ["fafsa", "student-aid-index", "financial-aid"],
  },
  {
    term: "PLUS Loan",
    slug: "plus-loan",
    category: "College & Aid",
    definition:
      "A federal loan that parents of undergraduates or graduate students can take out to cover college costs other aid does not. It requires a credit check.",
    related: ["federal-student-loan", "student-loan", "cost-of-attendance"],
  },
  {
    term: "Standard Repayment Plan",
    slug: "standard-repayment-plan",
    category: "College & Aid",
    definition:
      "The default federal student loan plan, with fixed monthly payments that pay off the loan in about ten years. It costs less in total interest than longer plans.",
    related: ["student-loan", "loan-servicer", "federal-student-loan"],
  },
  {
    term: "Student Loan Consolidation",
    slug: "student-loan-consolidation",
    category: "College & Aid",
    definition:
      "Combining several federal student loans into one new loan with a single monthly payment. It can simplify paying but may not lower the total interest.",
    related: ["student-loan", "debt-consolidation", "loan-servicer", "federal-student-loan"],
  },
  {
    term: "Satisfactory Academic Progress",
    slug: "satisfactory-academic-progress",
    category: "College & Aid",
    definition:
      "The grades and pace of completing courses a student must keep to stay eligible for financial aid. Falling below it can pause aid until it is fixed.",
    related: ["financial-aid", "fafsa", "work-study"],
  },
  {
    term: "Loan Grace Period",
    slug: "loan-grace-period",
    category: "College & Aid",
    definition:
      "The months after you leave school before student loan payments begin, often six months. Interest may still build during it on some loans.",
    related: ["student-loan", "deferment", "federal-student-loan"],
  },
  {
    term: "Entrance Counseling",
    slug: "entrance-counseling",
    category: "College & Aid",
    definition:
      "A required session that explains your rights and duties before you take a first federal student loan. It covers repayment and interest.",
    related: ["federal-student-loan", "student-loan", "promissory-note"],
  },
  {
    term: "Master Promissory Note",
    slug: "master-promissory-note",
    category: "College & Aid",
    definition:
      "A single signed agreement to repay all the federal student loans you take over time at a school. It saves signing a new note each year.",
    related: ["promissory-note", "federal-student-loan", "student-loan"],
  },
  {
    term: "Enrollment Status",
    slug: "enrollment-status",
    category: "College & Aid",
    definition:
      "Whether a student counts as full-time or part-time, based on course load. It affects aid amounts and when loan repayment starts.",
    related: ["financial-aid", "work-study", "loan-grace-period"],
  },
  {
    term: "Gift Aid",
    slug: "gift-aid",
    category: "College & Aid",
    definition:
      "Financial aid you do not repay, such as grants and scholarships, as opposed to loans. It is the most valuable kind of aid.",
    related: ["grant", "scholarship", "financial-aid", "need-based-aid"],
  },
  {
    term: "Self-Help Aid",
    slug: "self-help-aid",
    category: "College & Aid",
    definition:
      "Aid you earn or repay, such as work-study jobs and loans, as opposed to gift aid. It still lowers what you pay up front.",
    related: ["work-study", "student-loan", "gift-aid"],
  },

];

/** The A-Z keys for the jump bar. */
export const GLOSSARY_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** Leading "#" bucket holds terms whose names start with a digit (401k, 529...). */
export const GLOSSARY_NUMERIC_KEY = "#";

/** Ordered jump keys: the numeric bucket first, then A through Z. */
export const GLOSSARY_JUMP_KEYS = [GLOSSARY_NUMERIC_KEY, ...GLOSSARY_LETTERS];

/**
 * The bucket key a term sorts under: its uppercased first letter, or "#" when
 * the name starts with a digit. Keeps numeric-led terms out of dead A-Z links.
 */
export function glossaryKeyFor(term: string): string {
  const first = term.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : GLOSSARY_NUMERIC_KEY;
}

/** Case-insensitive, key-aware sort used everywhere the list is rendered. */
export function sortGlossaryTerms(terms: GlossaryTerm[]): GlossaryTerm[] {
  return [...terms].sort((a, b) =>
    a.term.localeCompare(b.term, "en", { sensitivity: "base" }),
  );
}

/** Quick lookup from slug to term, for resolving related cross-links. */
export const glossaryBySlug: Record<string, GlossaryTerm> = Object.fromEntries(
  glossaryTerms.map((t) => [t.slug, t]),
);
