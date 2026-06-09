/*
  College net price + rough loan repayment shape. EDUCATION ONLY.

  Net price idea: the sticker price (tuition + fees + room and board) is not the
  real price most students pay. Gift aid (grants and scholarships you do not
  repay) comes off the top to give the net price. What is left is covered by an
  expected family contribution plus, often, loans you do repay with interest.

  Loan repayment shape uses the standard fixed-payment amortization formula for
  a stated rate over a stated term (default 10 years), clearly labeled rough.
*/

export type NetPriceInput = {
  sticker: number; // tuition + fees + room/board for the year
  giftAid: number; // grants + scholarships (not repaid)
  familyContribution: number; // expected family contribution / savings
  loans: number; // borrowed, repaid with interest
};

export type NetPriceResult = {
  sticker: number;
  giftAid: number;
  netPrice: number; // sticker minus gift aid
  familyContribution: number;
  loans: number;
  // What is left after gift aid, family contribution, and loans are applied.
  remainingGap: number;
  discountPercent: number; // gift aid as a share of sticker
};

export function computeNetPrice(input: NetPriceInput): NetPriceResult {
  const sticker = Math.max(0, input.sticker);
  const giftAid = Math.min(Math.max(0, input.giftAid), sticker);
  const netPrice = Math.max(0, sticker - giftAid);
  const familyContribution = Math.max(0, input.familyContribution);
  const loans = Math.max(0, input.loans);
  const remainingGap = netPrice - familyContribution - loans;
  return {
    sticker,
    giftAid,
    netPrice,
    familyContribution,
    loans,
    remainingGap,
    discountPercent: sticker > 0 ? (giftAid / sticker) * 100 : 0,
  };
}

/*
  Standard fixed-payment (amortizing) monthly payment:
    payment = principal * r / (1 - (1 + r)^-n)
  where r = annualRate / 12 (monthly rate) and n = years * 12 (number of
  payments). If the rate is zero, the payment is simply principal / n.
*/
export function monthlyLoanPayment(
  principal: number,
  annualRatePercent: number,
  years: number,
): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRatePercent / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export type RepaymentShape = {
  principal: number;
  annualRatePercent: number;
  years: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
};

export function repaymentShape(
  principal: number,
  annualRatePercent: number,
  years: number,
): RepaymentShape {
  const monthlyPayment = monthlyLoanPayment(principal, annualRatePercent, years);
  const totalPaid = monthlyPayment * years * 12;
  return {
    principal,
    annualRatePercent,
    years,
    monthlyPayment,
    totalPaid,
    totalInterest: Math.max(0, totalPaid - principal),
  };
}
