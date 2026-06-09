/**
 * Glossary data for the Wealth Equity Initiative.
 *
 * A plain-language financial-literacy glossary aimed at a student with no
 * background. Every definition is written to be understood on first read:
 * short sentences, concrete examples, no jargon stacked on jargon.
 *
 * Copy rules (see lib/site.ts):
 *   - Education framing only. Terms are defined neutrally; nothing here is
 *     framed as personal money guidance.
 *   - No em dashes.
 *
 * Each term carries a category so the page can filter, and an optional list of
 * related term names. Related links are resolved defensively at render time:
 * only names that match a real term become links, so there are never dead
 * links even if a name is mistyped or a term is removed later.
 */

export type GlossaryCategoryId =
  | "banking"
  | "saving"
  | "credit"
  | "debt"
  | "budgeting"
  | "investing"
  | "income"
  | "taxes"
  | "insurance"
  | "college";

export type GlossaryCategory = {
  id: GlossaryCategoryId;
  label: string;
  /** One-line description of what the category covers. */
  blurb: string;
};

/** Display order for category filters. */
export const glossaryCategories: GlossaryCategory[] = [
  { id: "banking", label: "Banking", blurb: "Accounts, cards, and moving money" },
  { id: "saving", label: "Saving", blurb: "Setting money aside and growing it safely" },
  { id: "credit", label: "Credit", blurb: "Borrowing, credit scores, and reports" },
  { id: "debt", label: "Debt", blurb: "What you owe and how to manage it" },
  { id: "budgeting", label: "Budgeting", blurb: "Planning where your money goes" },
  { id: "investing", label: "Investing", blurb: "Putting money to work for the long term" },
  { id: "income", label: "Income", blurb: "Money you earn and how you get paid" },
  { id: "taxes", label: "Taxes", blurb: "What you owe the government and why" },
  { id: "insurance", label: "Insurance", blurb: "Protecting yourself from costly surprises" },
  { id: "college", label: "College & Aid", blurb: "Paying for school and student loans" },
];

export type GlossaryTerm = {
  term: string;
  category: GlossaryCategoryId;
  /** Plain-English definition for a student with no background. */
  definition: string;
  /** Names of related terms. Resolved to links only if they exist. */
  related?: string[];
};

/**
 * The terms. Authored flat and sorted at load time, so adding a term never
 * means finding the right alphabetical slot by hand.
 */
const rawTerms: GlossaryTerm[] = [
  // --- Banking ---
  {
    term: "Account Number",
    category: "banking",
    definition:
      "The unique number that identifies your specific bank account. Paired with a routing number, it lets money be sent to or taken from your account, such as a paycheck deposit.",
    related: ["Routing Number", "Direct Deposit"],
  },
  {
    term: "ATM",
    category: "banking",
    definition:
      "An Automated Teller Machine. A cash machine where you can withdraw money, deposit money, or check your balance using your debit card and a PIN. Using one outside your bank's network can cost a fee.",
    related: ["Debit Card", "PIN", "Overdraft"],
  },
  {
    term: "Bank",
    category: "banking",
    definition:
      "A business that keeps your money safe, lets you spend and move it, and lends money to others. In return for holding your deposits, a bank may pay you a small amount of interest.",
    related: ["Credit Union", "Checking Account", "Savings Account"],
  },
  {
    term: "Checking Account",
    category: "banking",
    definition:
      "A bank account built for everyday spending. You can pay with a debit card, write checks, and set up bills, and you can take money out at any time without penalty.",
    related: ["Savings Account", "Debit Card", "Overdraft"],
  },
  {
    term: "Credit Union",
    category: "banking",
    definition:
      "A not-for-profit version of a bank, owned by its members. Credit unions often charge lower fees and pay slightly better interest than big banks, but you usually have to qualify to join.",
    related: ["Bank", "Checking Account"],
  },
  {
    term: "Debit Card",
    category: "banking",
    definition:
      "A card tied to your checking account. When you pay with it, the money comes straight out of your account. Unlike a credit card, you are spending money you already have, not borrowing.",
    related: ["Credit Card", "Checking Account", "Overdraft"],
  },
  {
    term: "Direct Deposit",
    category: "banking",
    definition:
      "When your paycheck or other payment is sent electronically straight into your bank account, instead of as a paper check. It is faster, safer, and usually free.",
    related: ["Account Number", "Routing Number", "Paycheck"],
  },
  {
    term: "FDIC Insurance",
    category: "banking",
    definition:
      "A government guarantee that protects the money in your bank account up to 250,000 dollars per depositor if the bank fails. It means your everyday savings are safe even if the bank goes under.",
    related: ["Bank", "Savings Account"],
  },
  {
    term: "Minimum Balance",
    category: "banking",
    definition:
      "The smallest amount of money some accounts require you to keep in them. Drop below it and the bank may charge a monthly fee. Many no-minimum accounts exist if this is a concern.",
    related: ["Checking Account", "Fee"],
  },
  {
    term: "Mobile Banking",
    category: "banking",
    definition:
      "Managing your money through a bank's app on your phone. You can check your balance, move money, deposit a check by taking a photo, and pay bills from anywhere.",
    related: ["Bank", "Direct Deposit"],
  },
  {
    term: "Overdraft",
    category: "banking",
    definition:
      "When you spend more money than you have in your account. The bank may cover it but usually charges a steep overdraft fee. You can often turn off overdrafts so a payment is simply declined instead.",
    related: ["Checking Account", "Debit Card", "Fee"],
  },
  {
    term: "PIN",
    category: "banking",
    definition:
      "A Personal Identification Number. The short secret code you enter to use a debit card at an ATM or store. Keep it private and never share it.",
    related: ["ATM", "Debit Card"],
  },
  {
    term: "Routing Number",
    category: "banking",
    definition:
      "A nine-digit number that identifies your bank. Together with your account number, it tells the system where to send or pull money, such as for direct deposit or paying a bill.",
    related: ["Account Number", "Direct Deposit"],
  },
  {
    term: "Savings Account",
    category: "banking",
    definition:
      "A bank account made for storing money you do not need right away. It pays a little interest and is meant to be dipped into less often than checking, which helps you leave the money alone to grow.",
    related: ["Checking Account", "Interest", "High-Yield Savings Account"],
  },
  {
    term: "Statement",
    category: "banking",
    definition:
      "A summary, usually monthly, of everything that happened in your account: money in, money out, fees, and your ending balance. Reviewing it helps you catch mistakes or fraud early.",
    related: ["Checking Account", "Fee"],
  },
  {
    term: "Wire Transfer",
    category: "banking",
    definition:
      "A way to send money directly from one bank account to another, often used for large or urgent amounts. It is fast but usually costs a fee, and once sent it is very hard to reverse.",
    related: ["Direct Deposit", "Fee"],
  },

  // --- Saving ---
  {
    term: "Compound Interest",
    category: "saving",
    definition:
      "Interest earned on both your original money and on the interest it has already earned. Over time this snowballs, which is why saving early matters so much.",
    related: ["Interest", "Principal", "APY"],
  },
  {
    term: "Emergency Fund",
    category: "saving",
    definition:
      "Money set aside only for unexpected costs, like a car repair or a surprise bill. A common goal is enough to cover three to six months of basic expenses, kept somewhere easy to reach.",
    related: ["Savings Account", "Budget"],
  },
  {
    term: "APY",
    category: "saving",
    definition:
      "Annual Percentage Yield. The real rate your savings grow in a year once compounding is counted. A higher APY means your money earns more, so it is the number to compare between savings accounts.",
    related: ["Interest", "Compound Interest", "High-Yield Savings Account"],
  },
  {
    term: "High-Yield Savings Account",
    category: "saving",
    definition:
      "A savings account that pays much more interest than a regular one, often offered by online banks. The money is still safe and easy to withdraw, making it a popular home for an emergency fund.",
    related: ["Savings Account", "APY", "Emergency Fund"],
  },
  {
    term: "Certificate of Deposit",
    category: "saving",
    definition:
      "Often called a CD. A savings product where you lock money away for a set time, like six months or a year, in exchange for a higher fixed interest rate. Taking it out early usually costs a penalty.",
    related: ["Interest", "Savings Account", "Liquidity"],
  },
  {
    term: "Interest",
    category: "saving",
    definition:
      "The cost of borrowing money or the reward for saving it. When you save, the bank pays you interest. When you borrow, you pay interest. It is usually shown as a yearly percentage.",
    related: ["Interest Rate", "Compound Interest", "APR"],
  },
  {
    term: "Liquidity",
    category: "saving",
    definition:
      "How quickly you can turn something into spendable cash without losing value. Cash in checking is very liquid. A car or a locked CD is less liquid because it takes time or a penalty to access.",
    related: ["Emergency Fund", "Certificate of Deposit"],
  },
  {
    term: "Principal",
    category: "saving",
    definition:
      "The original amount of money you save or borrow, before any interest is added. If you deposit 100 dollars, that 100 is the principal that starts earning interest.",
    related: ["Interest", "Compound Interest"],
  },
  {
    term: "Pay Yourself First",
    category: "saving",
    definition:
      "A habit of moving money into savings as soon as you get paid, before spending on anything else. By saving first, you treat it as a must-do rather than whatever happens to be left over.",
    related: ["Budget", "Emergency Fund", "Direct Deposit"],
  },
  {
    term: "Rule of 72",
    category: "saving",
    definition:
      "A quick trick to estimate how long money takes to double. Divide 72 by the yearly interest rate. At 6 percent, money roughly doubles in 12 years. It shows the power of a higher rate over time.",
    related: ["Compound Interest", "APY"],
  },

  // --- Credit ---
  {
    term: "Credit",
    category: "credit",
    definition:
      "The ability to borrow money or pay later with a promise to pay it back, usually with interest. Using credit responsibly builds trust with lenders for bigger future purchases like a car or home.",
    related: ["Credit Score", "Credit Card", "Loan"],
  },
  {
    term: "Credit Card",
    category: "credit",
    definition:
      "A card that lets you borrow money up to a limit to make purchases. You get a bill each month. Pay it in full and you owe no interest. Pay only part and interest piles up fast on the rest.",
    related: ["Credit Limit", "APR", "Minimum Payment", "Debit Card"],
  },
  {
    term: "Credit Score",
    category: "credit",
    definition:
      "A three-digit number, often from 300 to 850, that sums up how reliably you repay what you borrow. A higher score makes it easier and cheaper to borrow. It is built over time by paying bills on time.",
    related: ["Credit Report", "Credit History", "FICO Score"],
  },
  {
    term: "FICO Score",
    category: "credit",
    definition:
      "The most widely used type of credit score, created by a company called FICO. When a lender checks your credit, this is often the exact number they look at.",
    related: ["Credit Score", "Credit Report"],
  },
  {
    term: "Credit Report",
    category: "credit",
    definition:
      "A detailed record of how you have used credit: your accounts, balances, and whether you pay on time. Lenders read it to decide whether to lend to you. You can check yours for free each year.",
    related: ["Credit Score", "Credit History", "Credit Bureau"],
  },
  {
    term: "Credit Bureau",
    category: "credit",
    definition:
      "A company that collects information about how people use credit and compiles it into credit reports. The three main ones in the United States are Equifax, Experian, and TransUnion.",
    related: ["Credit Report", "Credit Score"],
  },
  {
    term: "Credit History",
    category: "credit",
    definition:
      "The track record of how long you have used credit and how well you have handled it. A longer, cleaner history generally helps your credit score, which is why starting early can pay off.",
    related: ["Credit Score", "Credit Report"],
  },
  {
    term: "Credit Limit",
    category: "credit",
    definition:
      "The maximum amount a credit card or line of credit lets you borrow. Going over it can mean declined purchases or fees. Using only a small slice of your limit is good for your credit score.",
    related: ["Credit Card", "Credit Utilization"],
  },
  {
    term: "Credit Utilization",
    category: "credit",
    definition:
      "The share of your available credit you are currently using. If your limit is 1,000 dollars and you owe 300, your utilization is 30 percent. Keeping this number low helps your credit score.",
    related: ["Credit Limit", "Credit Score"],
  },
  {
    term: "APR",
    category: "credit",
    definition:
      "Annual Percentage Rate. The yearly cost of borrowing, shown as a percentage, including interest and certain fees. A lower APR means a loan or credit card costs you less to carry.",
    related: ["Interest Rate", "Credit Card", "Loan"],
  },
  {
    term: "Minimum Payment",
    category: "credit",
    definition:
      "The smallest amount you must pay on a credit card bill to keep the account in good standing. Paying only this is costly, because interest keeps building on the large balance you leave behind.",
    related: ["Credit Card", "APR", "Revolving Credit"],
  },
  {
    term: "Annual Fee",
    category: "credit",
    definition:
      "A yearly charge some credit cards require just for having the card. Many good cards have no annual fee, so it is worth knowing whether the perks are worth the cost.",
    related: ["Credit Card", "Fee"],
  },
  {
    term: "Secured Credit Card",
    category: "credit",
    definition:
      "A starter credit card backed by a cash deposit you put down, which becomes your credit limit. It is a common way to build credit from scratch when no one will give you a regular card yet.",
    related: ["Credit Card", "Credit Score", "Credit History"],
  },
  {
    term: "Hard Inquiry",
    category: "credit",
    definition:
      "A check of your credit report that happens when you apply to borrow, like for a card or loan. It can lower your score slightly for a short time. Checking your own credit does not hurt your score.",
    related: ["Credit Report", "Credit Score"],
  },
  {
    term: "Revolving Credit",
    category: "credit",
    definition:
      "Borrowing you can use again as you pay it back, like a credit card. Your balance goes up when you spend and down when you pay, and the credit refills up to your limit.",
    related: ["Credit Card", "Credit Limit", "Installment Loan"],
  },
  {
    term: "Cosigner",
    category: "credit",
    definition:
      "A person who agrees to pay back a loan or card if you cannot. Lenders may require one when you have little credit history. If you miss payments, it hurts the cosigner's credit too.",
    related: ["Loan", "Credit History"],
  },

  // --- Debt ---
  {
    term: "Debt",
    category: "debt",
    definition:
      "Money you owe to someone else and have promised to pay back, usually with interest. Some debt, like a student or home loan, can be useful. High-interest debt, like an unpaid card, is the costly kind.",
    related: ["Loan", "Interest", "Principal"],
  },
  {
    term: "Loan",
    category: "debt",
    definition:
      "Money you borrow and agree to pay back over time, usually with interest. Loans can be for school, a car, or a home. The agreement sets how much you pay each month and for how long.",
    related: ["Principal", "Interest Rate", "Installment Loan"],
  },
  {
    term: "Installment Loan",
    category: "debt",
    definition:
      "A loan you repay in equal scheduled payments, called installments, until it is gone. Car loans and student loans work this way. Unlike a credit card, the balance only goes down.",
    related: ["Loan", "Revolving Credit", "Amortization"],
  },
  {
    term: "Amortization",
    category: "debt",
    definition:
      "The schedule of paying off a loan in steady payments over time. Early on, more of each payment goes to interest. Later, more goes to the principal, until the balance reaches zero.",
    related: ["Installment Loan", "Principal", "Interest"],
  },
  {
    term: "Interest Rate",
    category: "debt",
    definition:
      "The percentage a lender charges you to borrow, or a bank pays you to save. On a loan, a higher rate means you pay back more. Even a few percentage points add up to real money over years.",
    related: ["APR", "Interest", "Fixed Interest Rate", "Variable Interest Rate"],
  },
  {
    term: "Fixed Interest Rate",
    category: "debt",
    definition:
      "An interest rate that stays the same for the life of a loan. Your payment will not change, which makes budgeting easier because you know exactly what you owe each month.",
    related: ["Variable Interest Rate", "Interest Rate"],
  },
  {
    term: "Variable Interest Rate",
    category: "debt",
    definition:
      "An interest rate that can rise or fall over time based on market conditions. Your payment can go up or down, which adds uncertainty compared with a fixed rate.",
    related: ["Fixed Interest Rate", "Interest Rate"],
  },
  {
    term: "Default",
    category: "debt",
    definition:
      "Failing to repay a loan as agreed, usually after missing payments for a long stretch. Default badly damages your credit and can lead to extra fees, collections, or legal action.",
    related: ["Delinquency", "Collections", "Credit Score"],
  },
  {
    term: "Delinquency",
    category: "debt",
    definition:
      "Being late on a payment you owe. A short delay may just bring a late fee, but the longer a bill stays unpaid, the more it hurts your credit and the closer it moves toward default.",
    related: ["Default", "Late Fee", "Credit Score"],
  },
  {
    term: "Collections",
    category: "debt",
    definition:
      "What happens when a very overdue debt is handed to a company that tries to recover it. A debt in collections seriously harms your credit and can lead to repeated calls and letters.",
    related: ["Default", "Delinquency", "Credit Report"],
  },
  {
    term: "Debt Snowball",
    category: "debt",
    definition:
      "A payoff strategy where you clear your smallest debt first for a quick win, then roll that payment into the next smallest. The early progress helps many people stay motivated.",
    related: ["Debt Avalanche", "Debt"],
  },
  {
    term: "Debt Avalanche",
    category: "debt",
    definition:
      "A payoff strategy where you attack the debt with the highest interest rate first. It saves the most money over time, though progress can feel slower at the start than the snowball method.",
    related: ["Debt Snowball", "Interest Rate"],
  },
  {
    term: "Predatory Lending",
    category: "debt",
    definition:
      "Unfair loan practices that trap borrowers with sky-high rates, hidden fees, or terms designed to keep you in debt. Payday loans are a common example. Knowing the warning signs helps you avoid them.",
    related: ["Payday Loan", "APR", "Loan"],
  },
  {
    term: "Payday Loan",
    category: "debt",
    definition:
      "A small, short-term loan with extremely high fees, meant to be repaid by your next paycheck. The cost is so steep that many borrowers get stuck re-borrowing, so it is best avoided.",
    related: ["Predatory Lending", "APR"],
  },
  {
    term: "Late Fee",
    category: "debt",
    definition:
      "A charge added when you pay a bill after its due date. Late fees add up and a late payment can also hurt your credit, so setting reminders or autopay is worth it.",
    related: ["Delinquency", "Fee", "Minimum Payment"],
  },

  // --- Budgeting ---
  {
    term: "Budget",
    category: "budgeting",
    definition:
      "A plan for your money that lays out what you expect to earn and how you will spend and save it. A budget puts you in control by showing where your money goes before it disappears.",
    related: ["Income", "Expense", "Fixed Expense", "Variable Expense"],
  },
  {
    term: "Expense",
    category: "budgeting",
    definition:
      "Any money you spend, from rent to a snack. Tracking expenses is the heart of budgeting, because you cannot manage where your money goes until you can see it.",
    related: ["Budget", "Fixed Expense", "Variable Expense"],
  },
  {
    term: "Fixed Expense",
    category: "budgeting",
    definition:
      "A cost that stays about the same each month, like rent, a phone plan, or a loan payment. Because they are predictable, fixed expenses are the easiest part of a budget to plan around.",
    related: ["Variable Expense", "Budget", "Expense"],
  },
  {
    term: "Variable Expense",
    category: "budgeting",
    definition:
      "A cost that changes from month to month, like groceries, gas, or going out. These are usually the easiest to cut when you need to free up money, because you control them more directly.",
    related: ["Fixed Expense", "Budget", "Discretionary Spending"],
  },
  {
    term: "Discretionary Spending",
    category: "budgeting",
    definition:
      "Money spent on wants rather than needs, like entertainment, eating out, or new clothes. It is the flexible part of a budget, the first place to trim when money is tight.",
    related: ["Variable Expense", "Needs Versus Wants"],
  },
  {
    term: "Needs Versus Wants",
    category: "budgeting",
    definition:
      "The basic sorting of spending into things you must have to live, like food and housing, and things you would like but can live without. Knowing the difference is the first step in any budget.",
    related: ["Budget", "Discretionary Spending"],
  },
  {
    term: "50/30/20 Rule",
    category: "budgeting",
    definition:
      "A simple budgeting guide: aim for 50 percent of your take-home pay on needs, 30 percent on wants, and 20 percent on saving and paying off debt. It is a starting point you can adjust.",
    related: ["Budget", "Needs Versus Wants", "Net Income"],
  },
  {
    term: "Cash Flow",
    category: "budgeting",
    definition:
      "The movement of money in and out over a period of time. Positive cash flow means more is coming in than going out. Negative cash flow means you are spending more than you earn.",
    related: ["Income", "Expense", "Budget"],
  },
  {
    term: "Sinking Fund",
    category: "budgeting",
    definition:
      "Money you save a little at a time for a known future cost, like holiday gifts or new tires. By spreading the cost out, you avoid a painful one-time hit or reaching for a credit card.",
    related: ["Emergency Fund", "Budget", "Saving"],
  },
  {
    term: "Net Worth",
    category: "budgeting",
    definition:
      "What you own minus what you owe. Add up your cash, savings, and other assets, then subtract your debts. It is a single snapshot of your overall financial health that you can track over time.",
    related: ["Asset", "Liability", "Debt"],
  },
  {
    term: "Asset",
    category: "budgeting",
    definition:
      "Anything you own that has value, such as cash, a savings account, a car, or investments. Building assets over time is how wealth grows.",
    related: ["Liability", "Net Worth"],
  },
  {
    term: "Liability",
    category: "budgeting",
    definition:
      "Anything you owe, such as a loan, a credit card balance, or unpaid bills. Liabilities are the opposite of assets and are subtracted when figuring out your net worth.",
    related: ["Asset", "Net Worth", "Debt"],
  },

  // --- Investing ---
  {
    term: "Investing",
    category: "investing",
    definition:
      "Putting money into something, like stocks or funds, hoping it grows in value over time. Investing carries risk, but over many years it has historically grown money faster than a savings account.",
    related: ["Stock", "Diversification", "Risk", "Compound Interest"],
  },
  {
    term: "Stock",
    category: "investing",
    definition:
      "A small piece of ownership in a company. If the company does well, your share can rise in value and may pay you part of the profit. If it does poorly, your share can lose value.",
    related: ["Dividend", "Stock Market", "Bond"],
  },
  {
    term: "Bond",
    category: "investing",
    definition:
      "A loan you make to a company or government that pays you interest and returns your money on a set date. Bonds are generally steadier and lower-risk than stocks, but tend to grow more slowly.",
    related: ["Stock", "Interest", "Risk"],
  },
  {
    term: "Dividend",
    category: "investing",
    definition:
      "A share of a company's profit paid out to people who own its stock, usually a few times a year. Not every company pays one, but dividends are a way investments can put cash in your pocket.",
    related: ["Stock", "Investing"],
  },
  {
    term: "Mutual Fund",
    category: "investing",
    definition:
      "A basket that pools money from many people to buy a mix of stocks or bonds, run by a professional. Buying one share spreads your money across many investments at once.",
    related: ["Index Fund", "ETF", "Diversification"],
  },
  {
    term: "Index Fund",
    category: "investing",
    definition:
      "A fund that simply tracks a whole market, like the 500 largest United States companies, instead of trying to beat it. Low fees and built-in variety make index funds popular with new investors.",
    related: ["Mutual Fund", "ETF", "Diversification"],
  },
  {
    term: "ETF",
    category: "investing",
    definition:
      "An Exchange-Traded Fund. Like a mutual fund, it holds a bundle of investments, but it trades on the stock market like a single stock. Many ETFs are low-cost index funds.",
    related: ["Index Fund", "Mutual Fund", "Stock Market"],
  },
  {
    term: "Diversification",
    category: "investing",
    definition:
      "Spreading your money across many different investments so that no single loss can sink you. The idea is captured by the phrase do not put all your eggs in one basket.",
    related: ["Index Fund", "Mutual Fund", "Risk"],
  },
  {
    term: "Risk",
    category: "investing",
    definition:
      "The chance that an investment loses value or does not earn what you hoped. Generally, investments with a chance of bigger gains also carry a bigger chance of loss.",
    related: ["Return", "Diversification", "Investing"],
  },
  {
    term: "Return",
    category: "investing",
    definition:
      "The money you gain or lose on an investment, often shown as a percentage. A 7 percent return on 100 dollars means you earned 7 dollars. Returns are never guaranteed.",
    related: ["Risk", "Investing", "Dividend"],
  },
  {
    term: "Stock Market",
    category: "investing",
    definition:
      "The network of exchanges where people buy and sell shares of companies. Prices rise and fall as buyers and sellers trade. It is how ownership in public companies changes hands.",
    related: ["Stock", "ETF", "Bull Market", "Bear Market"],
  },
  {
    term: "Bull Market",
    category: "investing",
    definition:
      "A stretch of time when investment prices are generally rising and people feel optimistic. The opposite of a bear market.",
    related: ["Bear Market", "Stock Market"],
  },
  {
    term: "Bear Market",
    category: "investing",
    definition:
      "A stretch of time when investment prices are generally falling and people feel cautious. Downturns are a normal part of investing, and markets have historically recovered over time.",
    related: ["Bull Market", "Stock Market"],
  },
  {
    term: "Portfolio",
    category: "investing",
    definition:
      "The full collection of investments a person owns, such as their stocks, bonds, and funds together. Building a balanced portfolio is a way to manage risk.",
    related: ["Diversification", "Asset", "Risk"],
  },
  {
    term: "Compound Growth",
    category: "investing",
    definition:
      "When investment earnings start earning their own returns, the way compound interest works for savings. Reinvesting over many years is what turns small, steady investing into real wealth.",
    related: ["Compound Interest", "Investing", "Return"],
  },
  {
    term: "Inflation",
    category: "investing",
    definition:
      "The slow rise in prices over time, which means each dollar buys a little less than it used to. It is a key reason people invest, to help their money grow faster than prices climb.",
    related: ["Return", "Investing"],
  },

  // --- Income ---
  {
    term: "Income",
    category: "income",
    definition:
      "Money you bring in, most often from a job, but also from things like tips, side work, or gifts. Income is the starting point of any budget.",
    related: ["Gross Income", "Net Income", "Budget"],
  },
  {
    term: "Gross Income",
    category: "income",
    definition:
      "Your total pay before anything is taken out for taxes, health coverage, or retirement. It is the bigger headline number on a job offer, not the amount that lands in your account.",
    related: ["Net Income", "Deduction", "Paycheck"],
  },
  {
    term: "Net Income",
    category: "income",
    definition:
      "Your take-home pay, the money left after taxes and other deductions come out of your gross income. This is the real number to build a budget around, since it is what you actually receive.",
    related: ["Gross Income", "Deduction", "Budget"],
  },
  {
    term: "Paycheck",
    category: "income",
    definition:
      "The payment you get from an employer for your work, usually every week or two. Reading the breakdown on your pay stub shows exactly where your money goes before you ever see it.",
    related: ["Pay Stub", "Direct Deposit", "Gross Income"],
  },
  {
    term: "Pay Stub",
    category: "income",
    definition:
      "The detailed record that comes with your paycheck. It lists your gross pay, each deduction, and your net pay. Checking it makes sure you are paid correctly and taxed as expected.",
    related: ["Paycheck", "Deduction", "Withholding"],
  },
  {
    term: "Minimum Wage",
    category: "income",
    definition:
      "The lowest hourly pay an employer is legally allowed to give most workers. The exact amount depends on your state and city, some of which set theirs higher than the national floor.",
    related: ["Gross Income", "Income"],
  },
  {
    term: "Salary",
    category: "income",
    definition:
      "A fixed yearly pay amount, split into regular paychecks, no matter the exact hours worked. It is common for full-time office jobs, in contrast to being paid by the hour.",
    related: ["Hourly Wage", "Gross Income"],
  },
  {
    term: "Hourly Wage",
    category: "income",
    definition:
      "Pay based on the number of hours you work, such as 15 dollars an hour. Work more hours and you earn more. Many hourly jobs also pay extra for overtime.",
    related: ["Salary", "Overtime", "Minimum Wage"],
  },
  {
    term: "Overtime",
    category: "income",
    definition:
      "Extra pay for hours worked beyond the normal full-time week, often 40 hours. Overtime is commonly paid at one and a half times your usual hourly rate.",
    related: ["Hourly Wage", "Gross Income"],
  },
  {
    term: "Gig Work",
    category: "income",
    definition:
      "Earning money through short, flexible jobs or tasks, like driving, delivery, or freelancing, instead of one steady employer. Gig workers usually handle their own taxes and have no benefits.",
    related: ["Self-Employment", "1099", "Income"],
  },
  {
    term: "Self-Employment",
    category: "income",
    definition:
      "Working for yourself rather than an employer, such as running a small business or freelancing. You keep more control but must set aside money for your own taxes and benefits.",
    related: ["Gig Work", "1099", "Estimated Taxes"],
  },
  {
    term: "Passive Income",
    category: "income",
    definition:
      "Money that comes in with little ongoing effort once it is set up, such as interest from savings or dividends from investments. It contrasts with active income earned by trading time for pay.",
    related: ["Dividend", "Interest", "Income"],
  },

  // --- Taxes ---
  {
    term: "Tax",
    category: "taxes",
    definition:
      "Money the government collects from people and businesses to pay for shared things like roads, schools, and emergency services. Most workers pay taxes automatically out of each paycheck.",
    related: ["Income Tax", "Sales Tax", "Withholding"],
  },
  {
    term: "Income Tax",
    category: "taxes",
    definition:
      "A tax on the money you earn. The federal government and many states charge it. Generally, the more you earn, the higher the percentage you pay on the top part of your income.",
    related: ["Tax Bracket", "Withholding", "Tax Return"],
  },
  {
    term: "Sales Tax",
    category: "taxes",
    definition:
      "A tax added to the price of many things you buy, collected at the register. The rate depends on your state and city, which is why a 10 dollar item can ring up a little higher.",
    related: ["Tax"],
  },
  {
    term: "Withholding",
    category: "taxes",
    definition:
      "The portion of each paycheck your employer sends straight to the government to cover your taxes. It spreads your tax bill across the year so you do not owe it all at once.",
    related: ["Pay Stub", "Income Tax", "W-4"],
  },
  {
    term: "Tax Return",
    category: "taxes",
    definition:
      "The yearly form you file that reports your income and figures out your exact tax. If too much was withheld, you get a refund. If too little, you owe the difference.",
    related: ["Tax Refund", "Withholding", "Deduction"],
  },
  {
    term: "Tax Refund",
    category: "taxes",
    definition:
      "Money the government returns to you after filing, when more was withheld from your paychecks than you actually owed. A big refund means you lent the government money interest-free all year.",
    related: ["Tax Return", "Withholding"],
  },
  {
    term: "Tax Bracket",
    category: "taxes",
    definition:
      "A range of income taxed at a certain rate. Brackets are tiered, so only the dollars inside each range are taxed at that range's rate. Earning more never lowers your take-home pay overall.",
    related: ["Income Tax", "Marginal Tax Rate"],
  },
  {
    term: "Marginal Tax Rate",
    category: "taxes",
    definition:
      "The rate you pay on your next dollar of income, set by your top tax bracket. It is usually higher than the average rate you pay across all your income.",
    related: ["Tax Bracket", "Income Tax"],
  },
  {
    term: "Deduction",
    category: "taxes",
    definition:
      "An amount that lowers the income you are taxed on, which can shrink your tax bill. Deductions can also mean money taken out of your paycheck, like for health coverage.",
    related: ["Tax Credit", "Tax Return", "Net Income"],
  },
  {
    term: "Tax Credit",
    category: "taxes",
    definition:
      "A dollar-for-dollar reduction of the tax you owe. A 500 dollar credit cuts your bill by a full 500 dollars, which makes credits even more valuable than deductions of the same size.",
    related: ["Deduction", "Tax Return"],
  },
  {
    term: "W-2",
    category: "taxes",
    definition:
      "A form your employer sends each year showing how much you earned and how much tax was withheld. You use it to file your tax return. Expect one from every job you held that year.",
    related: ["W-4", "1099", "Tax Return"],
  },
  {
    term: "W-4",
    category: "taxes",
    definition:
      "A form you fill out when starting a job that tells your employer how much tax to withhold from your pay. Getting it right helps you avoid a surprise bill or an oversized refund.",
    related: ["Withholding", "W-2"],
  },
  {
    term: "1099",
    category: "taxes",
    definition:
      "A form reporting income that did not come from a regular employer, such as gig or freelance work. With a 1099, no tax was withheld, so you are responsible for paying it yourself.",
    related: ["W-2", "Gig Work", "Estimated Taxes"],
  },
  {
    term: "Estimated Taxes",
    category: "taxes",
    definition:
      "Tax payments you send to the government a few times a year when an employer is not withholding for you, common for self-employed and gig workers, to avoid a large bill and penalties later.",
    related: ["Self-Employment", "1099", "Withholding"],
  },

  // --- Insurance ---
  {
    term: "Insurance",
    category: "insurance",
    definition:
      "A way to protect yourself from big, costly surprises. You pay a regular amount, and in return the insurer helps cover a major expense like a crash, an illness, or a fire if it happens.",
    related: ["Premium", "Deductible", "Claim"],
  },
  {
    term: "Premium",
    category: "insurance",
    definition:
      "The amount you pay for insurance, usually every month. You pay it whether or not you ever make a claim, in exchange for being covered if something goes wrong.",
    related: ["Insurance", "Deductible"],
  },
  {
    term: "Deductible",
    category: "insurance",
    definition:
      "The amount you pay out of your own pocket before insurance starts to chip in. A higher deductible usually means a lower monthly premium, and the other way around.",
    related: ["Premium", "Insurance", "Out-of-Pocket Maximum"],
  },
  {
    term: "Claim",
    category: "insurance",
    definition:
      "A request you file asking your insurance company to pay for a covered loss, like a car repair after an accident. Once approved, the insurer pays its share after your deductible.",
    related: ["Insurance", "Deductible", "Premium"],
  },
  {
    term: "Copay",
    category: "insurance",
    definition:
      "A small fixed fee you pay for a specific service, like 25 dollars to see a doctor, with insurance covering the rest. It is common in health plans.",
    related: ["Deductible", "Health Insurance", "Out-of-Pocket Maximum"],
  },
  {
    term: "Out-of-Pocket Maximum",
    category: "insurance",
    definition:
      "The most you will have to pay yourself in a year for covered care. Once you hit it, insurance pays 100 percent of covered costs. It is a cap that protects you from a worst-case bill.",
    related: ["Deductible", "Copay", "Health Insurance"],
  },
  {
    term: "Health Insurance",
    category: "insurance",
    definition:
      "Coverage that helps pay for doctor visits, medicine, and hospital care. Without it, a single medical event can cost a fortune, which is why having a plan matters so much.",
    related: ["Premium", "Copay", "Deductible"],
  },
  {
    term: "Liability Coverage",
    category: "insurance",
    definition:
      "The part of insurance that pays for harm you cause to other people or their property, such as in a car accident you are at fault for. It protects your finances from a large claim against you.",
    related: ["Insurance", "Auto Insurance", "Claim"],
  },
  {
    term: "Auto Insurance",
    category: "insurance",
    definition:
      "Coverage for your car, required in most states. It can pay for damage, injuries, and harm you cause to others. Driving without it can mean fines and serious financial risk.",
    related: ["Liability Coverage", "Deductible", "Premium"],
  },
  {
    term: "Renters Insurance",
    category: "insurance",
    definition:
      "Low-cost coverage for your belongings if you rent a place to live. It can replace your things after theft or fire and help if someone is hurt in your home. It does not cover the building itself.",
    related: ["Insurance", "Premium"],
  },
  {
    term: "Beneficiary",
    category: "insurance",
    definition:
      "The person you name to receive money from something like a life insurance policy or a retirement account if you die. Keeping your beneficiary up to date makes sure the money goes where you intend.",
    related: ["Insurance"],
  },

  // --- College & Aid ---
  {
    term: "FAFSA",
    category: "college",
    definition:
      "The Free Application for Federal Student Aid. A free form you fill out to qualify for grants, work-study, and federal student loans for college. Filing it early each year is important.",
    related: ["Financial Aid", "Grant", "Federal Student Loan"],
  },
  {
    term: "Financial Aid",
    category: "college",
    definition:
      "Money to help pay for college that can come from the government, the school, or other groups. It includes grants and scholarships you keep, plus loans you repay and work-study you earn.",
    related: ["FAFSA", "Grant", "Scholarship", "Work-Study"],
  },
  {
    term: "Grant",
    category: "college",
    definition:
      "Money for college that you usually do not have to pay back, often based on financial need. The well-known federal Pell Grant is awarded to students from lower-income families.",
    related: ["Scholarship", "Financial Aid", "FAFSA"],
  },
  {
    term: "Scholarship",
    category: "college",
    definition:
      "Free money for school that you do not repay, awarded for things like grades, talent, background, or need. Scholarships come from schools, companies, and community groups, and you often must apply.",
    related: ["Grant", "Financial Aid"],
  },
  {
    term: "Work-Study",
    category: "college",
    definition:
      "A program that gives eligible students part-time jobs, often on campus, to help pay for college. You earn the money through work rather than borrowing it, and the hours fit around classes.",
    related: ["Financial Aid", "FAFSA"],
  },
  {
    term: "Federal Student Loan",
    category: "college",
    definition:
      "A loan for school from the government, usually with lower fixed rates and friendlier repayment options than private loans. Most students should use these before turning to private loans.",
    related: ["Private Student Loan", "Subsidized Loan", "FAFSA"],
  },
  {
    term: "Private Student Loan",
    category: "college",
    definition:
      "A college loan from a bank or other company rather than the government. Rates can be higher and the protections fewer, so it is generally a last resort after federal aid and loans.",
    related: ["Federal Student Loan", "Cosigner"],
  },
  {
    term: "Subsidized Loan",
    category: "college",
    definition:
      "A federal student loan for students with financial need where the government pays the interest while you are in school. That means the balance does not grow until after you leave.",
    related: ["Unsubsidized Loan", "Federal Student Loan"],
  },
  {
    term: "Unsubsidized Loan",
    category: "college",
    definition:
      "A federal student loan where interest builds the entire time, including while you are in school. Paying even a little toward the interest early can keep the balance from growing as fast.",
    related: ["Subsidized Loan", "Federal Student Loan"],
  },
  {
    term: "Cost of Attendance",
    category: "college",
    definition:
      "The full estimated price of one year at a college: tuition, fees, housing, food, books, and more. Aid is measured against this number, not just tuition, to show the true cost.",
    related: ["Tuition", "Financial Aid", "Net Price"],
  },
  {
    term: "Tuition",
    category: "college",
    definition:
      "The price a school charges for classes, separate from costs like housing or books. It is often the biggest single piece of college costs, but rarely the only one.",
    related: ["Cost of Attendance", "Net Price"],
  },
  {
    term: "Net Price",
    category: "college",
    definition:
      "What a college actually costs you after subtracting grants and scholarships from the sticker price. It is the real number to compare between schools, since the headline price is rarely what you pay.",
    related: ["Cost of Attendance", "Financial Aid", "Grant"],
  },
  {
    term: "Grace Period",
    category: "college",
    definition:
      "A set time after you leave school, often six months, before you must start repaying student loans. It gives you a window to find your footing, though interest may still build during it.",
    related: ["Federal Student Loan", "Unsubsidized Loan"],
  },
  {
    term: "Loan Forgiveness",
    category: "college",
    definition:
      "When some or all of a student loan is canceled so you no longer have to repay it, usually after meeting specific conditions like years of public service. Rules are strict and program-specific.",
    related: ["Federal Student Loan", "Loan"],
  },
  {
    term: "Fee",
    category: "banking",
    definition:
      "A charge for a service or for breaking a rule, such as an overdraft, a late payment, or using an out-of-network ATM. Small fees add up, so it pays to know which ones an account charges.",
    related: ["Overdraft", "Late Fee", "Annual Fee"],
  },
];

/** Turn a term name into a URL-safe, anchor-safe slug. */
export function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type ResolvedTerm = GlossaryTerm & {
  slug: string;
  /** The single uppercase letter this term files under (A-Z, or # for digits). */
  letter: string;
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function firstLetter(term: string): string {
  const ch = term.trim().charAt(0).toUpperCase();
  return ch >= "A" && ch <= "Z" ? ch : "#";
}

/** All terms, resolved with slug and letter, sorted alphabetically by term. */
export const glossaryTerms: ResolvedTerm[] = [...rawTerms]
  .sort((a, b) => a.term.localeCompare(b.term, "en", { sensitivity: "base" }))
  .map((t) => ({ ...t, slug: slugifyTerm(t.term), letter: firstLetter(t.term) }));

/** Map from category id to its definition, for quick lookups. */
export const glossaryCategoryById: Record<GlossaryCategoryId, GlossaryCategory> =
  Object.fromEntries(glossaryCategories.map((c) => [c.id, c])) as Record<
    GlossaryCategoryId,
    GlossaryCategory
  >;

/** The full A-Z list of letters. */
export const alphabet: string[] = LETTERS;

/**
 * Ordered letters used by the jump bar and section grouping. A leading "#"
 * collects terms that begin with a digit (for example "1099"), so number-led
 * terms are never silently dropped.
 */
export const indexLetters: string[] = ["#", ...LETTERS];

export const glossaryCount = glossaryTerms.length;
