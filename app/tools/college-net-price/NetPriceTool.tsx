"use client";

import { useId, useMemo, useState } from "react";
import { computeNetPrice, repaymentShape } from "./netprice";
import { StickerGapChart } from "./StickerGapChart";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function num(s: string): number {
  const n = parseFloat(s);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

// Rough repayment assumptions, clearly labeled in the UI and assumptions note.
const REPAY_YEARS = 10;
const REPAY_RATE_PERCENT = 6.53; // stated illustrative fixed rate

const labelClass = "block text-wei-sm font-semibold text-wei-ink";
const inputClass =
  "mt-2 block w-full rounded-wei-sm border border-wei-line bg-wei-paper px-4 py-3 text-wei-base text-wei-ink outline-none transition-colors placeholder:text-wei-ink/30 focus-visible:border-wei-emerald-deep wei-num";

export function NetPriceTool() {
  const baseId = useId();
  const [sticker, setSticker] = useState("38000");
  const [giftAid, setGiftAid] = useState("18000");
  const [family, setFamily] = useState("8000");
  const [loans, setLoans] = useState("9000");

  const result = useMemo(
    () =>
      computeNetPrice({
        sticker: num(sticker),
        giftAid: num(giftAid),
        familyContribution: num(family),
        loans: num(loans),
      }),
    [sticker, giftAid, family, loans],
  );

  const repay = useMemo(
    () => repaymentShape(result.loans, REPAY_RATE_PERCENT, REPAY_YEARS),
    [result.loans],
  );

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Inputs */}
        <div className="lg:col-span-5">
          <div className="border border-wei-line bg-wei-paper p-5 sm:p-6">
            <span className="wei-eyebrow text-wei-ink/50">One year of college</span>
            <div className="mt-5 space-y-5">
              <Field
                id={`${baseId}-sticker`}
                label="Sticker price ($)"
                hint="Tuition and fees plus room and board, before any aid."
                value={sticker}
                onChange={setSticker}
                inputClass={inputClass}
                labelClass={labelClass}
              />
              <Field
                id={`${baseId}-gift`}
                label="Grants and scholarships ($)"
                hint="Gift aid you do not repay. This is what makes the price lower."
                value={giftAid}
                onChange={setGiftAid}
                inputClass={inputClass}
                labelClass={labelClass}
              />
              <Field
                id={`${baseId}-family`}
                label="Family contribution / savings ($)"
                hint="What you and your family expect to pay from income or savings."
                value={family}
                onChange={setFamily}
                inputClass={inputClass}
                labelClass={labelClass}
              />
              <Field
                id={`${baseId}-loans`}
                label="Loans ($)"
                hint="Money you borrow and repay later, with interest."
                value={loans}
                onChange={setLoans}
                inputClass={inputClass}
                labelClass={labelClass}
              />
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="lg:col-span-7">
          <div className="border border-wei-line bg-wei-ink p-6 text-wei-paper sm:p-8">
            <span className="wei-eyebrow text-wei-paper/60">
              Net price (what you actually pay this year)
            </span>
            <p className="wei-num mt-3 text-wei-3xl font-semibold text-wei-paper">
              {usd0.format(result.netPrice)}
            </p>
            <p className="mt-2 text-wei-sm text-wei-paper/70">
              The sticker price is{" "}
              <span className="wei-num">{usd0.format(result.sticker)}</span>.
              Grants and scholarships of{" "}
              <span className="wei-num">{usd0.format(result.giftAid)}</span> come
              off the top, about{" "}
              <span className="wei-num">{Math.round(result.discountPercent)}%</span>{" "}
              of the sticker. The sticker price is not the real price.
            </p>

            <div className="wei-hairgrid wei-hairgrid-ink mt-6 grid grid-cols-2">
              <DarkStat label="Sticker price" value={usd0.format(result.sticker)} />
              <DarkStat
                label="Net price"
                value={usd0.format(result.netPrice)}
                accent
              />
            </div>
          </div>

          <div className="mt-6">
            <StickerGapChart
              sticker={result.sticker}
              giftAid={result.giftAid}
              familyContribution={result.familyContribution}
              loans={result.loans}
              formatMoney={(n) => usd0.format(n)}
            />
          </div>
        </div>
      </div>

      {/* Gap note when coverage does not match net price */}
      {Math.abs(result.remainingGap) >= 1 ? (
        <div
          role="status"
          className="mt-6 rounded-wei-md border border-wei-amber/60 bg-wei-amber/10 px-5 py-4 text-wei-sm text-wei-ink"
        >
          {result.remainingGap > 0 ? (
            <p>
              After gift aid, family contribution, and loans, about{" "}
              <span className="wei-num font-semibold">
                {usd0.format(result.remainingGap)}
              </span>{" "}
              of this year is still unpaid. That gap usually has to be closed with
              more aid, more savings, or more borrowing.
            </p>
          ) : (
            <p>
              Your family contribution and loans add up to about{" "}
              <span className="wei-num font-semibold">
                {usd0.format(-result.remainingGap)}
              </span>{" "}
              more than the net price for this year. You may not need to borrow or
              pay that much.
            </p>
          )}
        </div>
      ) : null}

      {/* Loan repayment shape */}
      <div className="mt-8 border border-wei-line bg-wei-paper">
        <div className="flex items-center justify-between border-b border-wei-line px-4 py-3">
          <span className="wei-eyebrow text-wei-ink/50">
            Rough loan repayment shape
          </span>
          <span className="wei-eyebrow text-wei-ink/40">
            {REPAY_YEARS}-yr / {REPAY_RATE_PERCENT}% (rough)
          </span>
        </div>

        {result.loans > 0 ? (
          <>
            <div className="wei-hairgrid grid grid-cols-2 sm:grid-cols-4">
              <Stat label="Amount borrowed" value={usd0.format(repay.principal)} />
              <Stat
                label="Monthly payment"
                value={usd.format(repay.monthlyPayment)}
                accentClass="text-wei-emerald-deep"
              />
              <Stat label="Total repaid" value={usd0.format(repay.totalPaid)} />
              <Stat
                label="Interest paid"
                value={usd0.format(repay.totalInterest)}
                accentClass="text-wei-amber"
              />
            </div>
            <p className="px-4 py-4 text-wei-sm text-wei-ink/70">
              This is the shape for borrowing{" "}
              <span className="wei-num">{usd0.format(repay.principal)}</span> for
              one year of school and repaying it over {REPAY_YEARS} years at a
              fixed {REPAY_RATE_PERCENT}% rate. Borrowing the same each year for a
              full degree would multiply these numbers. Real student loan rates and
              terms vary; this is a rough illustration.
            </p>
          </>
        ) : (
          <p className="px-4 py-5 text-wei-sm text-wei-ink/60">
            No loans entered, so there is nothing to repay. Add a loan amount above
            to see a rough repayment shape.
          </p>
        )}
      </div>

      <p className="mt-6 text-wei-xs text-wei-ink/55">
        All figures are illustrative estimates for learning. See the assumptions
        below.
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  inputClass,
  labelClass,
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  inputClass: string;
  labelClass: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        step="any"
        value={value}
        placeholder="0"
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
      <p className="mt-2 text-wei-xs text-wei-ink/55">{hint}</p>
    </div>
  );
}

function DarkStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="px-5 py-4">
      <span className="wei-eyebrow block text-wei-paper/55">{label}</span>
      <span
        className={`wei-num mt-1.5 block text-wei-lg font-medium ${
          accent ? "text-wei-emerald" : "text-wei-paper"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Stat({
  label,
  value,
  accentClass = "text-wei-ink",
}: {
  label: string;
  value: string;
  accentClass?: string;
}) {
  return (
    <div className="px-5 py-4">
      <span className="wei-eyebrow block text-wei-ink/45">{label}</span>
      <span className={`wei-num mt-1.5 block text-wei-lg font-medium ${accentClass}`}>
        {value}
      </span>
    </div>
  );
}
