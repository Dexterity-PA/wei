import Link from "next/link";
import type { LearnModule } from "@/lib/learn";

/**
 * Summary card for one learn module, shown in the module list. Sits flush as a
 * cell in the hairline grid (the grid paints its own borders), so the card
 * carries no border or shadow of its own. Links through to the module detail
 * route. Server component: no interactivity of its own.
 */
export function ModuleCard({ module: mod }: { module: LearnModule }) {
  return (
    <Link
      href={`/learn/${mod.slug}`}
      className="group flex h-full flex-col p-6 transition-colors hover:bg-wei-paper-dim sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="wei-eyebrow text-wei-emerald-deep">{mod.topic}</span>
        <span className="wei-num text-wei-xs text-wei-ink/50">
          {mod.level} · {mod.minutes} min
        </span>
      </div>

      <h2 className="mt-5 font-wei-display text-wei-lg font-semibold text-wei-ink transition-colors group-hover:text-wei-emerald-deep">
        {mod.title}
      </h2>

      <p className="mt-2 text-wei-sm text-wei-ink/70">{mod.summary}</p>

      <span className="wei-eyebrow mt-auto inline-flex items-center gap-2 pt-6 text-wei-emerald-deep">
        Start module
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}
