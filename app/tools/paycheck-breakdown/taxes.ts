/*
  Simplified paycheck estimate. EDUCATION ONLY, not tax filing.

  Tax year used: 2024 (US federal). Figures are the 2024 IRS federal income tax
  brackets and standard deduction, simplified to the federal income tax,
  Social Security, and Medicare only. State tax is a deliberately simplified
  flat-rate stand-in for a short, clearly labeled list of states, NOT the real
  state code (most states have brackets, deductions, and local taxes this does
  not model).

  What is intentionally left out: pre-tax retirement and health deductions,
  tax credits, the additional Medicare tax on high earners, local/city taxes,
  and state standard deductions. Real take-home pay will differ.
*/

export const TAX_YEAR = 2024;

export type FilingStatus = "single" | "mfj";

export type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";

export const PAY_PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

export const PAY_FREQUENCY_LABELS: Record<PayFrequency, string> = {
  weekly: "Weekly (52 / year)",
  biweekly: "Every two weeks (26 / year)",
  semimonthly: "Twice a month (24 / year)",
  monthly: "Monthly (12 / year)",
};

// A tax bracket: [income floor for this rate, marginal rate].
type Bracket = [number, number];

// 2024 federal income tax brackets (IRS).
const BRACKETS_2024: Record<FilingStatus, Bracket[]> = {
  single: [
    [0, 0.1],
    [11600, 0.12],
    [47150, 0.22],
    [100525, 0.24],
    [191950, 0.32],
    [243725, 0.35],
    [609350, 0.37],
  ],
  mfj: [
    [0, 0.1],
    [23200, 0.12],
    [94300, 0.22],
    [201050, 0.24],
    [383900, 0.32],
    [487450, 0.35],
    [731200, 0.37],
  ],
};

// 2024 federal standard deduction (IRS).
const STANDARD_DEDUCTION_2024: Record<FilingStatus, number> = {
  single: 14600,
  mfj: 29200,
};

// 2024 Social Security wage base (SSA). Earnings above this are not taxed for
// Social Security.
export const SOCIAL_SECURITY_WAGE_BASE = 168600;
export const SOCIAL_SECURITY_RATE = 0.062;
export const MEDICARE_RATE = 0.0145;

/*
  Simplified state income tax. A short, clearly labeled list. Each entry is a
  single flat rate applied to gross pay (NO state deductions or brackets). The
  three "no income tax" states are real (those states levy no state income tax);
  the flat rates for the others are rounded stand-ins for illustration, not the
  actual state tax code.
*/
export type StateOption = {
  code: string;
  label: string;
  flatRate: number; // applied to annual gross, simplified
  note?: string;
};

export const STATE_OPTIONS: StateOption[] = [
  { code: "none", label: "No state income tax (e.g. TX, FL, WA)", flatRate: 0, note: "These states levy no state income tax." },
  { code: "flat-low", label: "Low flat rate (about 3%)", flatRate: 0.03 },
  { code: "flat-mid", label: "Medium flat rate (about 5%)", flatRate: 0.05 },
  { code: "flat-high", label: "Higher flat rate (about 7%)", flatRate: 0.07 },
];

export function federalIncomeTax(
  annualGross: number,
  status: FilingStatus,
): number {
  const taxable = Math.max(0, annualGross - STANDARD_DEDUCTION_2024[status]);
  const brackets = BRACKETS_2024[status];
  let tax = 0;
  for (let i = 0; i < brackets.length; i++) {
    const [floor, rate] = brackets[i];
    const ceil = i + 1 < brackets.length ? brackets[i + 1][0] : Infinity;
    if (taxable > floor) {
      tax += (Math.min(taxable, ceil) - floor) * rate;
    }
  }
  return tax;
}

export function standardDeduction(status: FilingStatus): number {
  return STANDARD_DEDUCTION_2024[status];
}

export type PaycheckBreakdown = {
  annualGross: number;
  periodsPerYear: number;
  perPeriodGross: number;
  // Annual amounts
  federalTax: number;
  socialSecurity: number;
  medicare: number;
  stateTax: number;
  totalWithholding: number;
  annualTakeHome: number;
  // Per-period amounts
  perPeriodFederal: number;
  perPeriodSocialSecurity: number;
  perPeriodMedicare: number;
  perPeriodState: number;
  perPeriodTakeHome: number;
  effectiveRate: number; // total withholding / gross
};

export function computePaycheck(input: {
  perPeriodGross: number;
  frequency: PayFrequency;
  status: FilingStatus;
  stateRate: number;
}): PaycheckBreakdown {
  const periodsPerYear = PAY_PERIODS_PER_YEAR[input.frequency];
  const annualGross = input.perPeriodGross * periodsPerYear;

  const federalTax = federalIncomeTax(annualGross, input.status);
  const socialSecurity =
    Math.min(annualGross, SOCIAL_SECURITY_WAGE_BASE) * SOCIAL_SECURITY_RATE;
  const medicare = annualGross * MEDICARE_RATE;
  const stateTax = annualGross * input.stateRate;

  const totalWithholding = federalTax + socialSecurity + medicare + stateTax;
  const annualTakeHome = annualGross - totalWithholding;

  return {
    annualGross,
    periodsPerYear,
    perPeriodGross: input.perPeriodGross,
    federalTax,
    socialSecurity,
    medicare,
    stateTax,
    totalWithholding,
    annualTakeHome,
    perPeriodFederal: federalTax / periodsPerYear,
    perPeriodSocialSecurity: socialSecurity / periodsPerYear,
    perPeriodMedicare: medicare / periodsPerYear,
    perPeriodState: stateTax / periodsPerYear,
    perPeriodTakeHome: annualTakeHome / periodsPerYear,
    effectiveRate: annualGross > 0 ? totalWithholding / annualGross : 0,
  };
}
