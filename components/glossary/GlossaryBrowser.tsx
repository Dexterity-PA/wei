"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  glossaryTerms,
  glossaryBySlug,
  glossaryKeyFor,
  sortGlossaryTerms,
  GLOSSARY_CATEGORIES,
  GLOSSARY_JUMP_KEYS,
  type GlossaryCategory,
  type GlossaryTerm,
} from "@/lib/glossary";

type CategoryFilter = GlossaryCategory | "All";

const sectionId = (key: string) => `glossary-${key === "#" ? "num" : key}`;
const termId = (slug: string) => `glossary-term-${slug}`;

export function GlossaryBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");

  // When a related-term link is followed, we clear the filters first so the
  // target is guaranteed to be in the DOM, then scroll to it once it renders.
  const pendingScrollRef = useRef<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    const matches = glossaryTerms.filter((term) => {
      if (category !== "All" && term.category !== category) return false;
      if (!normalizedQuery) return true;
      return (
        term.term.toLowerCase().includes(normalizedQuery) ||
        term.definition.toLowerCase().includes(normalizedQuery)
      );
    });
    return sortGlossaryTerms(matches);
  }, [normalizedQuery, category]);

  // Bucket the visible terms by their jump key (# then A-Z), preserving order.
  const groups = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const term of filtered) {
      const key = glossaryKeyFor(term.term);
      const bucket = map.get(key);
      if (bucket) bucket.push(term);
      else map.set(key, [term]);
    }
    return map;
  }, [filtered]);

  // Keys that actually have visible terms. The jump bar dims every other key so
  // a letter never points at an empty section (no dead links).
  const availableKeys = useMemo(() => new Set(groups.keys()), [groups]);

  // Runs after each render. If a related-term jump is pending, the filters have
  // now been cleared and the target card exists, so we can scroll to it.
  useEffect(() => {
    const id = pendingScrollRef.current;
    if (!id) return;
    pendingScrollRef.current = null;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block: "start" });
    el.focus({ preventScroll: true });
  });

  function goToTerm(slug: string) {
    if (!glossaryBySlug[slug]) return;
    setQuery("");
    setCategory("All");
    pendingScrollRef.current = termId(slug);
  }

  const orderedKeys = GLOSSARY_JUMP_KEYS.filter((key) => groups.has(key));
  const hasResults = filtered.length > 0;

  return (
    <div className="mt-10">
      {/* Search */}
      <label className="block">
        <span className="sr-only">Search the glossary</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search terms or definitions"
          autoComplete="off"
          className="w-full rounded-wei-sm border border-wei-line bg-wei-paper px-4 py-3 text-wei-base text-wei-ink outline-none transition-colors placeholder:text-wei-ink/40 focus-visible:border-wei-emerald-deep"
        />
      </label>

      {/* Category filter */}
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        {(["All", ...GLOSSARY_CATEGORIES] as CategoryFilter[]).map((option) => {
          const active = category === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(option)}
              className={`wei-eyebrow rounded-wei-sm border px-3 py-2 transition-colors ${
                active
                  ? "border-wei-emerald-deep bg-wei-emerald-deep text-wei-paper"
                  : "border-wei-line text-wei-ink/65 hover:border-wei-emerald-deep hover:text-wei-emerald-deep"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* A-Z jump bar */}
      <nav
        aria-label="Jump to letter"
        className="mt-6 flex flex-wrap gap-1 border-y border-wei-line py-3"
      >
        {GLOSSARY_JUMP_KEYS.map((key) => {
          const enabled = availableKeys.has(key);
          const label = key === "#" ? "numbers" : key;
          if (!enabled) {
            return (
              <span
                key={key}
                aria-disabled="true"
                className="wei-num grid h-8 w-8 place-items-center rounded-wei-sm text-wei-sm text-wei-ink/25"
              >
                {key}
              </span>
            );
          }
          return (
            <a
              key={key}
              href={`#${sectionId(key)}`}
              aria-label={`Jump to ${label}`}
              className="wei-num grid h-8 w-8 place-items-center rounded-wei-sm text-wei-sm font-semibold text-wei-emerald-deep transition-colors hover:bg-wei-emerald hover:text-wei-paper"
            >
              {key}
            </a>
          );
        })}
      </nav>

      {/* Result count */}
      <p className="mt-5 text-wei-sm text-wei-ink/60" aria-live="polite">
        <span className="wei-num text-wei-ink/75">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "term" : "terms"}
        {category !== "All" ? ` in ${category}` : ""}
        {normalizedQuery ? ` matching “${query.trim()}”` : ""}
      </p>

      {/* Terms grouped by letter */}
      {hasResults ? (
        <div className="mt-2">
          {orderedKeys.map((key) => (
            <section
              key={key}
              id={sectionId(key)}
              aria-label={key === "#" ? "Numbers" : `Letter ${key}`}
              className="scroll-mt-24 pt-8"
            >
              <h2 className="wei-num text-wei-2xl font-semibold text-wei-emerald-deep">
                {key}
              </h2>
              <dl className="mt-2">
                {groups.get(key)!.map((term) => (
                  <div
                    key={term.slug}
                    id={termId(term.slug)}
                    tabIndex={-1}
                    className="grid gap-x-8 gap-y-1 border-t border-wei-line py-5 sm:grid-cols-[12rem_1fr]"
                  >
                    <dt className="flex flex-col gap-1.5">
                      <span className="text-wei-base font-semibold text-wei-ink">
                        {term.term}
                      </span>
                      <span className="wei-eyebrow text-wei-ink/45">
                        {term.category}
                      </span>
                    </dt>
                    <dd className="mt-1 sm:mt-0">
                      <p className="text-wei-base text-wei-ink/80">
                        {term.definition}
                      </p>
                      {term.related && term.related.length > 0 ? (
                        <p className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-wei-sm">
                          <span className="text-wei-ink/45">Related</span>
                          {term.related
                            .filter((slug) => glossaryBySlug[slug])
                            .map((slug) => (
                              <button
                                key={slug}
                                type="button"
                                onClick={() => goToTerm(slug)}
                                className="text-wei-emerald-deep underline decoration-wei-emerald/40 underline-offset-2 transition-colors hover:decoration-wei-emerald"
                              >
                                {glossaryBySlug[slug].term}
                              </button>
                            ))}
                        </p>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-2 border-t border-wei-line py-16 text-center">
          <p className="text-wei-lg text-wei-ink/70">
            No terms match your search.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-3 text-wei-sm font-medium text-wei-emerald-deep underline underline-offset-2"
          >
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  );
}
