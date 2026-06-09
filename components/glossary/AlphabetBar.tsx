import { indexLetters } from "@/lib/glossary";

type AlphabetBarProps = {
  /** Letters that currently have at least one matching term. */
  available: Set<string>;
  /** Jump to the section for a letter. Only called for available letters. */
  onJump: (letter: string) => void;
};

/**
 * A-Z jump bar. Every letter renders, but letters with no matching terms are
 * dimmed and non-interactive, so there are never dead links. Which letters are
 * live updates as the search and category filters change.
 */
export function AlphabetBar({ available, onJump }: AlphabetBarProps) {
  return (
    <nav aria-label="Jump to letter" className="flex flex-wrap gap-1">
      {indexLetters.map((letter) => {
        const live = available.has(letter);
        return live ? (
          <button
            key={letter}
            type="button"
            onClick={() => onJump(letter)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-wei-sm text-wei-sm font-semibold text-wei-emerald-deep transition-colors hover:bg-wei-emerald hover:text-wei-paper focus-visible:bg-wei-emerald focus-visible:text-wei-paper"
          >
            {letter}
            <span className="sr-only"> terms</span>
          </button>
        ) : (
          <span
            key={letter}
            aria-hidden="true"
            className="inline-flex h-7 w-7 cursor-default select-none items-center justify-center rounded-wei-sm text-wei-sm font-semibold text-wei-ink/25"
          >
            {letter}
          </span>
        );
      })}
    </nav>
  );
}
