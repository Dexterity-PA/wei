"use client";

import { useId, useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";

/*
  A light, step-based walkthrough for a first paycheck. The core is the guided
  steps (read a stub, gross vs net, the W-4, splitting money, opening an
  account). One small interactive piece lives inside the split step: a
  spend/save/give allocator with mono dollar readouts. No heavy math, no
  motion that breaks reduced-motion, fully legible at 390px.
*/

const STEPS = [
  { id: "stub", label: "Read your pay stub" },
  { id: "grossnet", label: "Gross vs. net" },
  { id: "w4", label: "The W-4 form" },
  { id: "split", label: "Split your money" },
  { id: "account", label: "Open an account" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

export function PaycheckGuide() {
  const [active, setActive] = useState<StepId>("stub");
  const index = STEPS.findIndex((s) => s.id === active);

  const go = (dir: -1 | 1) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, index + dir));
    setActive(STEPS[next].id);
  };

  return (
    <div className="border border-wei-line bg-wei-paper">
      {/* Step rail */}
      <nav
        aria-label="Walkthrough steps"
        className="wei-hairgrid grid grid-cols-2 border-b border-wei-line sm:grid-cols-5"
      >
        {STEPS.map((s, i) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              aria-current={isActive ? "step" : undefined}
              className={`flex flex-col gap-1.5 px-4 py-3 text-left transition-colors ${
                isActive ? "bg-wei-ink text-wei-paper" : "bg-wei-paper hover:bg-wei-paper-dim"
              }`}
            >
              <span
                className={`wei-eyebrow ${
                  isActive ? "text-wei-paper/55" : "text-wei-ink/40"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-wei-sm font-medium ${
                  isActive ? "text-wei-paper" : "text-wei-ink/80"
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Step body */}
      <div className="p-6 md:p-8">
        {active === "stub" && <StubStep />}
        {active === "grossnet" && <GrossNetStep />}
        {active === "w4" && <W4Step />}
        {active === "split" && <SplitStep />}
        {active === "account" && <AccountStep />}
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t border-wei-line px-4 py-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          className="wei-eyebrow px-2 py-1 text-wei-ink/70 disabled:opacity-30"
        >
          ← Back
        </button>
        <span className="wei-eyebrow text-wei-ink/40">
          Step {index + 1} of {STEPS.length}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === STEPS.length - 1}
          className="wei-eyebrow px-2 py-1 text-wei-emerald-deep disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function StepHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="wei-eyebrow text-wei-emerald-deep">{eyebrow}</span>
      <h3 className="mt-3 text-wei-xl font-semibold text-wei-ink">{title}</h3>
      <div className="mt-4 space-y-4 text-wei-base text-wei-ink/80">
        {children}
      </div>
    </div>
  );
}

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const usd0 = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

function StubStep() {
  // A made-up, round example stub for one two-week pay period.
  const lines = [
    { label: "Gross pay", value: 1000, kind: "in" as const, note: "What you earned before anything is taken out" },
    { label: "Federal income tax", value: -90, kind: "out" as const, note: "Sent to the federal government toward your taxes" },
    { label: "State income tax", value: -35, kind: "out" as const, note: "Sent to your state (some states have none)" },
    { label: "Social Security", value: -62, kind: "out" as const, note: "6.2% that funds retirement and disability benefits" },
    { label: "Medicare", value: -15, kind: "out" as const, note: "1.45% that funds health coverage for older adults" },
  ];
  const net = 1000 - 90 - 35 - 62 - 15;

  return (
    <StepHeading
      eyebrow="Step 1"
      title="Every line on a pay stub, in plain words"
    >
      <p>
        A pay stub comes with each paycheck. It is a receipt: it shows what you
        earned and every amount taken out before the money reaches you. Here is
        a simple example for one paycheck. The numbers are made up and round so
        the pieces are easy to see.
      </p>
      <div className="not-prose overflow-hidden border border-wei-line">
        <div className="border-b border-wei-line bg-wei-paper-dim px-4 py-2">
          <span className="wei-eyebrow text-wei-ink/50">
            Example pay stub / one pay period
          </span>
        </div>
        <ul className="divide-y divide-wei-line">
          {lines.map((ln) => (
            <li key={ln.label} className="px-4 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-wei-sm font-medium text-wei-ink">
                  {ln.label}
                </span>
                <span
                  className={`wei-num shrink-0 text-wei-base font-medium ${
                    ln.kind === "in" ? "text-wei-ink" : "text-wei-ink/70"
                  }`}
                >
                  {ln.value < 0 ? `- ${usd(Math.abs(ln.value))}` : usd(ln.value)}
                </span>
              </div>
              <p className="mt-1 text-wei-xs text-wei-ink/55">{ln.note}</p>
            </li>
          ))}
          <li className="flex items-baseline justify-between gap-3 bg-wei-ink px-4 py-3">
            <span className="text-wei-sm font-semibold text-wei-paper">
              Net pay (take-home)
            </span>
            <span className="wei-num shrink-0 text-wei-lg font-semibold text-wei-amber">
              {usd(net)}
            </span>
          </li>
        </ul>
      </div>
      <p>
        The lines taken out are called deductions. Most first paychecks include
        federal and state income tax and two payroll taxes, Social Security and
        Medicare. The bottom line, your net pay, is what actually lands in your
        account.
      </p>
    </StepHeading>
  );
}

function GrossNetStep() {
  return (
    <StepHeading
      eyebrow="Step 2"
      title="Why your take-home pay is smaller than the number you were told"
    >
      <p>
        When a job says it pays a certain amount, that is usually your{" "}
        <span className="font-semibold text-wei-ink">gross pay</span>: the full
        amount before anything is removed. The money you can actually spend is
        your <span className="font-semibold text-wei-ink">net pay</span>, also
        called take-home pay, after deductions.
      </p>
      <div className="not-prose grid gap-px overflow-hidden border border-wei-line bg-wei-line sm:grid-cols-3">
        <div className="bg-wei-paper px-4 py-5">
          <span className="wei-eyebrow text-wei-ink/45">Gross pay</span>
          <p className="wei-num mt-2 text-wei-xl font-semibold text-wei-ink">
            {usd0(1000)}
          </p>
          <p className="mt-1 text-wei-xs text-wei-ink/55">
            What you earned
          </p>
        </div>
        <div className="flex items-center justify-center bg-wei-paper-dim px-4 py-5">
          <span className="wei-num text-wei-base text-wei-ink/60">
            − {usd0(202)} taken out
          </span>
        </div>
        <div className="bg-wei-ink px-4 py-5">
          <span className="wei-eyebrow text-wei-paper/55">Net pay</span>
          <p className="wei-num mt-2 text-wei-xl font-semibold text-wei-amber">
            {usd0(798)}
          </p>
          <p className="mt-1 text-wei-xs text-wei-paper/60">
            What you take home
          </p>
        </div>
      </div>
      <p>
        This is normal and it is not money lost for nothing. Some of it (Social
        Security and Medicare) funds programs you can use later. Some of it
        (income tax) goes toward your tax bill for the year, and you may get part
        of it back when you file taxes. The key habit: plan your spending around
        your net pay, not the bigger gross number.
      </p>
    </StepHeading>
  );
}

function W4Step() {
  return (
    <StepHeading eyebrow="Step 3" title="The W-4, without the jargon">
      <p>
        On your first day, an employer usually asks you to fill out a{" "}
        <span className="font-semibold text-wei-ink">Form W-4</span>. It has one
        job: it tells your employer how much federal income tax to hold back from
        each paycheck. You are not paying anything extra by filling it out; you
        are setting the dial on how much is set aside in advance.
      </p>
      <ul className="not-prose space-y-3">
        <W4Point title="Your basic info">
          Name, address, Social Security number, and your filing situation (for
          example, single). This is most of the form for a first job.
        </W4Point>
        <W4Point title="Multiple jobs or a working spouse">
          A box to check if you have more than one job or file jointly with
          someone who works. It helps the math come out closer to right.
        </W4Point>
        <W4Point title="Dependents and adjustments">
          Spots to account for children or other dependents. For most students
          and first-time workers, these are left blank.
        </W4Point>
        <W4Point title="Extra withholding">
          A line to hold back a little more on purpose. Leaving it blank is fine
          when you are starting out.
        </W4Point>
      </ul>
      <p>
        Two ideas that help: if too little is held back, you may owe money at tax
        time. If too much is held back, you get a refund later but had less in
        each paycheck along the way. You can update your W-4 anytime your life
        changes. The form itself comes with short official instructions, and
        those are the source to follow.
      </p>
    </StepHeading>
  );
}

function W4Point({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="border border-wei-line px-4 py-3">
      <span className="text-wei-sm font-semibold text-wei-ink">{title}</span>
      <p className="mt-1 text-wei-sm text-wei-ink/70">{children}</p>
    </li>
  );
}

function SplitStep() {
  return (
    <StepHeading
      eyebrow="Step 4"
      title="A simple way to split your take-home pay"
    >
      <p>
        Once you know your net pay, the next decision is where it goes. A common
        starting point is to split it three ways: money to{" "}
        <span className="font-semibold text-wei-ink">spend</span> on the things
        you need and want, money to{" "}
        <span className="font-semibold text-wei-ink">save</span> for later, and
        an optional slice to <span className="font-semibold text-wei-ink">give</span>{" "}
        if that matters to you. Move the sliders to see the dollars. This is a
        starting idea, not a rule.
      </p>
      <SplitAllocator />
    </StepHeading>
  );
}

function SplitAllocator() {
  const [takeHome, setTakeHome] = useState(800);
  // Save and give are the two adjustable shares; spend is the remainder, so
  // the three always sum to 100 percent.
  const [savePct, setSavePct] = useState(20);
  const [givePct, setGivePct] = useState(5);
  const spendPct = Math.max(0, 100 - savePct - givePct);

  const amounts = useMemo(
    () => ({
      spend: (takeHome * spendPct) / 100,
      save: (takeHome * savePct) / 100,
      give: (takeHome * givePct) / 100,
    }),
    [takeHome, spendPct, savePct, givePct],
  );

  // Clamp helpers so save + give never exceed 100.
  const onSave = (v: number) => setSavePct(Math.min(v, 100 - givePct));
  const onGive = (v: number) => setGivePct(Math.min(v, 100 - savePct));

  const takeId = useId();

  return (
    <div className="not-prose border border-wei-line bg-wei-paper">
      {/* take-home input */}
      <div className="border-b border-wei-line px-4 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={takeId} className="text-wei-sm font-medium text-wei-ink">
            Your take-home pay this period
          </label>
          <span className="wei-num shrink-0 text-wei-base font-medium text-wei-emerald-deep">
            {usd0(takeHome)}
          </span>
        </div>
        <input
          id={takeId}
          type="range"
          min={100}
          max={3000}
          step={25}
          value={takeHome}
          onChange={(e) => setTakeHome(Number(e.target.value))}
          className="mt-3 w-full accent-wei-emerald"
        />
      </div>

      {/* stacked bar */}
      <div className="px-4 py-4">
        <div
          className="flex h-6 w-full overflow-hidden rounded-wei-sm border border-wei-line"
          role="img"
          aria-label={`Spend ${spendPct} percent, save ${savePct} percent, give ${givePct} percent`}
        >
          <span
            className="h-full bg-wei-ink"
            style={{ width: `${spendPct}%` }}
          />
          <span
            className="h-full bg-wei-emerald"
            style={{ width: `${savePct}%` }}
          />
          <span
            className="h-full bg-wei-amber"
            style={{ width: `${givePct}%` }}
          />
        </div>

        <div className="wei-hairgrid mt-4 grid grid-cols-3">
          <SplitCell
            swatch="bg-wei-ink"
            label="Spend"
            pct={spendPct}
            amount={amounts.spend}
          />
          <SplitCell
            swatch="bg-wei-emerald"
            label="Save"
            pct={savePct}
            amount={amounts.save}
          />
          <SplitCell
            swatch="bg-wei-amber"
            label="Give"
            pct={givePct}
            amount={amounts.give}
          />
        </div>

        <div className="mt-5 space-y-4">
          <SplitSlider
            label="Save"
            value={savePct}
            onChange={onSave}
          />
          <SplitSlider
            label="Give"
            value={givePct}
            onChange={onGive}
          />
          <p className="text-wei-xs text-wei-ink/55">
            Spend is whatever is left over, so the three always add up to 100
            percent of your take-home pay.
          </p>
        </div>
      </div>
    </div>
  );
}

function SplitCell({
  swatch,
  label,
  pct,
  amount,
}: {
  swatch: string;
  label: string;
  pct: number;
  amount: number;
}) {
  return (
    <div className="px-4 py-3">
      <span className="inline-flex items-center gap-2">
        <span aria-hidden className={`h-2.5 w-2.5 rounded-wei-sm ${swatch}`} />
        <span className="wei-eyebrow text-wei-ink/50">{label}</span>
      </span>
      <AnimatedNumber
        value={amount}
        format={usd}
        as="p"
        className="wei-num mt-2 text-wei-lg font-medium text-wei-ink"
      />
      <span className="wei-eyebrow mt-1 block text-wei-ink/40">{pct}%</span>
    </div>
  );
}

function SplitSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-wei-sm font-medium text-wei-ink">
          {label}
        </label>
        <span className="wei-num shrink-0 text-wei-sm font-medium text-wei-emerald-deep">
          {value}%
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-wei-emerald"
      />
    </div>
  );
}

function AccountStep() {
  return (
    <StepHeading
      eyebrow="Step 5"
      title="Open an account so your money has a home"
    >
      <p>
        To get paid by direct deposit and to keep your money safe, you will want
        a bank or credit union account. Many offer accounts with no monthly fee,
        which matters: avoiding fees is one of the simplest ways to keep more of
        what you earn.
      </p>
      <ul className="not-prose space-y-3">
        <AccountPoint title="Look for no monthly fee">
          Free or low-fee checking accounts are common. Read the fee schedule
          before you open one so there are no surprises.
        </AccountPoint>
        <AccountPoint title="Checking for spending, savings for later">
          A checking account handles day-to-day money. A separate savings
          account is a good home for the save slice from the last step.
        </AccountPoint>
        <AccountPoint title="Set up direct deposit">
          Give your employer your account details so each paycheck lands
          automatically. It is faster and avoids check-cashing fees.
        </AccountPoint>
        <AccountPoint title="Know what you need to open one">
          Usually a government ID, your Social Security number, and sometimes a
          small opening deposit. Credit unions and many banks have student or
          beginner options.
        </AccountPoint>
      </ul>
      <p>
        That is the whole loop: you earn gross pay, deductions come out, your net
        pay lands in your account, and you decide how to split it. You have got
        this.
      </p>
    </StepHeading>
  );
}

function AccountPoint({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="border border-wei-line px-4 py-3">
      <span className="text-wei-sm font-semibold text-wei-ink">{title}</span>
      <p className="mt-1 text-wei-sm text-wei-ink/70">{children}</p>
    </li>
  );
}
