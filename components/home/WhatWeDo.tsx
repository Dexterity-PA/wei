import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type Pillar = {
  title: string;
  body: string;
  icon: ReactNode;
};

const iconProps = {
  className: "h-6 w-6",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const pillars: Pillar[] = [
  {
    title: "Free tools",
    body: "Calculators and planners for the decisions students actually face: building a budget, setting a savings goal, seeing the true cost of borrowing. No logins, no fees, no catch.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h2M8 15h2M14 11h2M14 15h2" />
      </svg>
    ),
  },
  {
    title: "Lessons in schools",
    body: "We bring plain-language financial literacy into classrooms and after-school programs, meeting students where they already are instead of waiting for them to come looking.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M3 9l9-5 9 5-9 5-9-5z" />
        <path d="M7 11v5c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-5" />
      </svg>
    ),
  },
  {
    title: "Student-led",
    body: "WEI is built and run by students. The people closest to the gap are the ones designing the fix, which keeps every tool and lesson honest about what young people really need.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
      </svg>
    ),
  },
];

export function WhatWeDo() {
  return (
    <section className="border-b border-wei-line bg-wei-paper">
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section">
        <div className="max-w-3xl">
          <Reveal as="h2" className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
            What WEI does
          </Reveal>
          <Reveal delay={0.06} className="mt-5">
            <p className="font-wei-display text-wei-2xl font-medium text-wei-ink">
              Three ways we put financial knowledge back within reach.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delay={0.1 + index * 0.08}
              className="flex flex-col rounded-wei-lg border border-wei-line bg-wei-paper p-7 shadow-wei-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-wei-md bg-wei-emerald/10 text-wei-emerald-deep">
                {pillar.icon}
              </span>
              <h3 className="mt-6 font-wei-display text-wei-xl font-semibold text-wei-ink">
                {pillar.title}
              </h3>
              <p className="mt-3 text-wei-base text-wei-ink/75">{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
