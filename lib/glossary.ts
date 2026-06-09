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
