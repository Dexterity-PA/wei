import {
  glossaryCategoryById,
  type ResolvedTerm,
} from "@/lib/glossary";

type RelatedLink = { name: string; slug: string };

type TermCardProps = {
  entry: ResolvedTerm;
  /** Related terms that actually exist, already resolved to slugs. */
  related: RelatedLink[];
  /** Jump to another term by its anchor id. */
  onRelatedJump: (slug: string) => void;
};

/**
 * A single glossary entry: the term, its category, a plain-language
 * definition, and any related terms that resolve to real entries. The card
 * carries a stable anchor id so related links and deep links can land on it.
 */
export function TermCard({ entry, related, onRelatedJump }: TermCardProps) {
  const category = glossaryCategoryById[entry.category];

  return (
    <article
      id={`term-${entry.slug}`}
      className="scroll-mt-40 rounded-wei-lg border border-wei-line bg-wei-paper p-5 shadow-wei-soft sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-wei-display text-wei-xl font-semibold text-wei-ink">
          {entry.term}
        </h3>
        <span className="text-wei-xs font-semibold uppercase tracking-[0.12em] text-wei-emerald-deep">
          {category.label}
        </span>
      </div>

      <p className="mt-3 text-wei-base text-wei-ink/80">{entry.definition}</p>

      {related.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-wei-sm">
          <span className="text-wei-ink/55">See also:</span>
          {related.map((link, index) => (
            <span key={link.slug}>
              <button
                type="button"
                onClick={() => onRelatedJump(link.slug)}
                className="font-medium text-wei-emerald-deep underline decoration-wei-line underline-offset-2 transition-colors hover:decoration-wei-emerald-deep"
              >
                {link.name}
              </button>
              {index < related.length - 1 ? (
                <span className="text-wei-ink/40">,</span>
              ) : null}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
