"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type Lenis from "lenis";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import {
  glossaryCategories,
  glossaryTerms,
  indexLetters,
  type GlossaryCategoryId,
  type ResolvedTerm,
} from "@/lib/glossary";
import { AlphabetBar } from "@/components/glossary/AlphabetBar";
import { TermCard } from "@/components/glossary/TermCard";

type CategoryChoice = "all" | GlossaryCategoryId;

/** Map a term name to its slug, for resolving "see also" links to real terms. */
const slugByName = new Map(
  glossaryTerms.map((t) => [t.term.toLowerCase(), t.slug]),
);

/** Turn an index letter into a DOM-safe id token ("#" is not selector-safe). */
function sectionId(letter: string): string {
  return `letter-${letter === "#" ? "num" : letter}`;
}

/** Scroll an element into view, cooperating with Lenis when it is active. */
function jumpToElement(lenis: Lenis | null, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    // Recompute scroll limits first: a jump may follow a filter change that
    // grew the page, and a stale limit would clamp the target near the top.
    lenis.resize();
    // Offset clears the sticky nav and toolbar above the landing point.
    lenis.scrollTo(el, { offset: -150 });
  } else {
    // Reduced motion or smooth scroll inactive: native jump, scroll-mt handles
    // the sticky offset.
    el.scrollIntoView({ block: "start" });
  }
}

export function GlossaryExplorer() {
  const lenisRef = useLenis();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryChoice>("all");
  // Holds a term anchor to scroll to after filters are cleared and the target
  // re-renders. A ref, not state, so resolving it does not trigger a render.
  const pendingScrollRef = useRef<string | null>(null);

  const jump = useCallback(
    (id: string) => jumpToElement(lenisRef, id),
    [lenisRef],
  );

  const filtered = useMemo<ResolvedTerm[]>(() => {
    const q = query.trim().toLowerCase();
    return glossaryTerms.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (!q) return true;
      return (
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const sections = useMemo(() => {
    const byLetter = new Map<string, ResolvedTerm[]>();
    for (const t of filtered) {
      const list = byLetter.get(t.letter);
      if (list) list.push(t);
      else byLetter.set(t.letter, [t]);
    }
    return indexLetters
      .filter((letter) => byLetter.has(letter))
      .map((letter) => ({ letter, terms: byLetter.get(letter)! }));
  }, [filtered]);

  const availableLetters = useMemo(
    () => new Set(sections.map((s) => s.letter)),
    [sections],
  );

  // After a "see also" jump to a term hidden by the current filters, the
  // filters are cleared above. This effect runs once the filtered set changes
  // and the target has re-rendered, then scrolls to it. Clearing the ref is a
  // plain mutation, so no extra render is triggered.
  useEffect(() => {
    const id = pendingScrollRef.current;
    if (!id) return;
    pendingScrollRef.current = null;
    jump(id);
  }, [filtered, jump]);

  const handleRelatedJump = useCallback(
    (slug: string) => {
      const id = `term-${slug}`;
      // Visible right now: jump immediately.
      if (typeof document !== "undefined" && document.getElementById(id)) {
        jump(id);
        return;
      }
      // Hidden by a filter: queue the scroll, then clear filters so it renders.
      pendingScrollRef.current = id;
      setQuery("");
      setCategory("all");
    },
    [jump],
  );

  const hasResults = sections.length > 0;

  return (
    <div>
      {/* Category filter. Scrolls away with the page; the A-Z bar stays pinned. */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <FilterChip
          active={category === "all"}
          onClick={() => setCategory("all")}
        >
          All
        </FilterChip>
        {glossaryCategories.map((c) => (
          <FilterChip
            key={c.id}
            active={category === c.id}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </FilterChip>
        ))}
      </div>

      {/* Sticky toolbar: search and the A-Z jump bar stay reachable while scrolling. */}
      <div
        className="sticky top-16 mt-5 border-y border-wei-line bg-wei-paper/95 py-3 backdrop-blur-sm"
        style={{ zIndex: "var(--z-wei-sticky)" }}
      >
        <div className="flex flex-col gap-3">
          <label className="relative block">
            <span className="sr-only">Search the glossary</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search terms and definitions"
              autoComplete="off"
              className="w-full rounded-wei-md border border-wei-line bg-wei-paper px-4 py-2.5 text-wei-base text-wei-ink placeholder:text-wei-ink/45"
            />
          </label>
          <AlphabetBar available={availableLetters} onJump={(letter) => jump(sectionId(letter))} />
        </div>
      </div>

      {/* Live result count for assistive tech and for the reader. */}
      <p aria-live="polite" className="mt-5 text-wei-sm text-wei-ink/60">
        {filtered.length === 1
          ? "1 term"
          : `${filtered.length} terms`}
        {category === "all" && !query.trim() ? " in the glossary" : " match your filter"}
      </p>

      {hasResults ? (
        <div className="mt-4 space-y-12">
          {sections.map((section) => (
            <section key={section.letter} aria-labelledby={sectionId(section.letter)}>
              <h2
                id={sectionId(section.letter)}
                className="scroll-mt-40 border-b border-wei-line pb-2 font-wei-display text-wei-2xl font-semibold text-wei-emerald-deep"
              >
                {section.letter === "#" ? "0-9" : section.letter}
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {section.terms.map((entry) => {
                  const related = (entry.related ?? [])
                    .map((name) => {
                      const slug = slugByName.get(name.toLowerCase());
                      return slug ? { name, slug } : null;
                    })
                    .filter((r): r is { name: string; slug: string } => r !== null);
                  return (
                    <TermCard
                      key={entry.slug}
                      entry={entry}
                      related={related}
                      onRelatedJump={handleRelatedJump}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-wei-lg border border-wei-line bg-wei-paper-dim p-8 text-center">
          <p className="text-wei-lg text-wei-ink/80">No terms match your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-4 inline-flex items-center rounded-wei-pill bg-wei-emerald px-5 py-2 text-wei-sm font-semibold text-wei-paper transition-colors hover:bg-wei-emerald-deep"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

type FilterChipProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-wei-pill border px-3.5 py-1.5 text-wei-sm font-medium transition-colors ${
        active
          ? "border-wei-emerald bg-wei-emerald text-wei-paper"
          : "border-wei-line bg-wei-paper text-wei-ink/75 hover:border-wei-emerald-deep hover:text-wei-emerald-deep"
      }`}
    >
      {children}
    </button>
  );
}
