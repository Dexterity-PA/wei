/*
  Month-by-month debt amortization for the avalanche vs snowball comparison.

  Each month, in order:
    1. Interest accrues on every open balance at APR / 12.
    2. Every open debt pays its minimum (capped at what is owed).
    3. The leftover pool (extra + any minimums freed from cleared debts) is
       thrown at the single "focus" debt chosen by the strategy. If that debt
       clears mid-month, the remaining pool rolls to the next focus debt.

  Avalanche focuses the highest APR first. Snowball focuses the smallest
  balance first. The freed-up minimum from a cleared debt is automatically
  available again the next month because the pool is rebuilt from the full set
  of original minimums every month.

  If a debt's minimum payment cannot cover its own monthly interest, the
  balance can never fall on its own; we detect that and report it rather than
  loop forever.
*/

export type DebtInput = {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
};

export type Strategy = "avalanche" | "snowball";

export type PayoffStep = {
  name: string;
  monthCleared: number;
  interestPaid: number;
};

export type StrategyResult = {
  months: number;
  totalInterest: number;
  totalPaid: number;
  order: PayoffStep[];
  /** True if the run hit the safety cap without clearing everything. */
  cappedOut: boolean;
  /** Balance over time, sampled monthly, for the chart. Index 0 is month 0. */
  balanceSeries: number[];
};

const MAX_MONTHS = 1200; // 100 years safety cap

function pickFocus(
  debts: DebtInput[],
  balances: number[],
  strategy: Strategy,
): number {
  let idx = -1;
  for (let i = 0; i < debts.length; i++) {
    if (balances[i] <= 0.005) continue;
    if (idx === -1) {
      idx = i;
      continue;
    }
    if (strategy === "avalanche") {
      if (debts[i].apr > debts[idx].apr) idx = i;
    } else if (balances[i] < balances[idx]) {
      idx = i;
    }
  }
  return idx;
}

export function simulatePayoff(
  debts: DebtInput[],
  extraMonthly: number,
  strategy: Strategy,
): StrategyResult {
  const balances = debts.map((d) => d.balance);
  const interestByDebt = debts.map(() => 0);
  const rates = debts.map((d) => d.apr / 100 / 12);
  const totalMin = debts.reduce((sum, d) => sum + d.minPayment, 0);

  let totalInterest = 0;
  let month = 0;
  const order: PayoffStep[] = [];
  const cleared = debts.map(() => false);
  const startTotal = balances.reduce((a, b) => a + b, 0);
  const balanceSeries: number[] = [startTotal];

  let cappedOut = false;

  while (balances.some((b) => b > 0.005)) {
    if (month >= MAX_MONTHS) {
      cappedOut = true;
      break;
    }
    month++;

    // 1. Accrue interest.
    for (let i = 0; i < balances.length; i++) {
      if (balances[i] > 0) {
        const interest = balances[i] * rates[i];
        balances[i] += interest;
        interestByDebt[i] += interest;
        totalInterest += interest;
      }
    }

    // 2. Pay minimums; rebuild the pool from the full original minimum set so
    //    freed-up minimums are available again, plus the extra.
    let pool = totalMin + extraMonthly;
    for (let i = 0; i < balances.length; i++) {
      if (balances[i] <= 0) continue;
      const pay = Math.min(debts[i].minPayment, balances[i]);
      balances[i] -= pay;
      pool -= pay;
    }
    if (pool < 0) pool = 0; // minimums alone exceeded the pool; nothing extra

    // 3. Throw the remaining pool at the focus debt, rolling on if it clears.
    let guard = 0;
    while (pool > 0.005 && balances.some((b) => b > 0.005)) {
      guard++;
      if (guard > debts.length + 2) break;
      const f = pickFocus(debts, balances, strategy);
      if (f === -1) break;
      const pay = Math.min(pool, balances[f]);
      balances[f] -= pay;
      pool -= pay;
    }

    // Record any debts that cleared this month.
    for (let i = 0; i < balances.length; i++) {
      if (!cleared[i] && balances[i] <= 0.005) {
        cleared[i] = true;
        balances[i] = 0;
        order.push({
          name: debts[i].name,
          monthCleared: month,
          interestPaid: interestByDebt[i],
        });
      }
    }

    balanceSeries.push(balances.reduce((a, b) => a + b, 0));
  }

  // Order is naturally in the sequence debts were cleared.
  return {
    months: month,
    totalInterest,
    totalPaid: startTotal + totalInterest,
    order,
    cappedOut,
    balanceSeries,
  };
}

/**
 * Detects debts whose minimum payment cannot cover one month of interest at the
 * starting balance. These would never fall on their own. Returns the names.
 */
export function debtsThatNeverShrink(debts: DebtInput[]): string[] {
  const names: string[] = [];
  for (const d of debts) {
    const monthlyInterest = d.balance * (d.apr / 100 / 12);
    if (d.balance > 0 && d.minPayment <= monthlyInterest + 0.005) {
      names.push(d.name);
    }
  }
  return names;
}
