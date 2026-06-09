import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";

type Pillar = {
  index: string;
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
    index: "01",
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
    index: "02",
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
    index: "03",
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
      <Container className="py-wei-section">
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="What WEI does"
            title="Three ways we put financial knowledge back within reach."
          />
        </Reveal>

        <div className="wei-hairgrid mt-12 grid grid-cols-1 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delay={0.1 + index * 0.08}
              className="flex flex-col p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center border border-wei-line text-wei-emerald-deep">
                  {pillar.icon}
                </span>
                <span className="wei-num text-wei-sm text-wei-ink/35">
                  {pillar.index}
                </span>
              </div>
              <h3 className="mt-6 font-wei-display text-wei-xl font-semibold text-wei-ink">
                {pillar.title}
              </h3>
              <p className="mt-3 text-wei-sm text-wei-ink/75">{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
