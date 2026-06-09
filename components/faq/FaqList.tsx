"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { faqGroups } from "./faqData";

/**
 * Editorial FAQ. Each group sits on the 12-column grid with its mono index in
 * the margin; questions are a hairline-separated accordion with continuous mono
 * indices, so the whole page reads as a numbered reference document.
 *
 * The accordion is controlled but degrades cleanly: answers expand and collapse
 * by toggling visibility, with no motion required, so prefers-reduced-motion
 * users get the same behavior without animation.
 */
export function FaqList() {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();

  // Continuous question numbering across every group.
  let counter = 0;

  return (
    <Container as="section" className="py-wei-section-lg">
      <div className="space-y-wei-section">
        {faqGroups.map((group) => (
          <div
            key={group.id}
            className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12"
          >
            <div className="md:col-span-4 lg:col-span-3">
              <Reveal>
                <Eyebrow index={group.index}>{group.label}</Eyebrow>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <Reveal>
                <ul className="border-t border-wei-line">
                  {group.items.map((item) => {
                    counter += 1;
                    const num = String(counter).padStart(2, "0");
                    const id = `${baseId}-${group.id}-${counter}`;
                    const isOpen = open === id;

                    return (
                      <li key={id} className="border-b border-wei-line">
                        <h3>
                          <button
                            type="button"
                            id={`${id}-btn`}
                            aria-expanded={isOpen}
                            aria-controls={`${id}-panel`}
                            onClick={() => setOpen(isOpen ? null : id)}
                            className="group flex w-full items-start gap-4 py-5 text-left"
                          >
                            <span
                              aria-hidden="true"
                              className={`wei-num shrink-0 pt-1 text-wei-sm ${
                                isOpen ? "text-wei-emerald-deep" : "text-wei-ink/40"
                              }`}
                            >
                              {num}
                            </span>
                            <span className="flex-1 text-wei-xl font-wei-display font-semibold text-wei-ink">
                              {item.q}
                            </span>
                            <span
                              aria-hidden="true"
                              className={`shrink-0 pt-1 text-wei-lg leading-none text-wei-emerald-deep transition-transform duration-[var(--duration-wei-fast)] ease-wei-out ${
                                isOpen ? "rotate-45" : ""
                              }`}
                            >
                              +
                            </span>
                          </button>
                        </h3>
                        <div
                          id={`${id}-panel`}
                          role="region"
                          aria-labelledby={`${id}-btn`}
                          hidden={!isOpen}
                          className="pb-6 pl-[2.25rem] md:pr-0"
                        >
                          <div className="max-w-2xl space-y-4 text-wei-base text-wei-ink/75">
                            {item.a.map((p, i) => (
                              <p key={i}>{p}</p>
                            ))}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
