import Link from "next/link";
import type { LearnModule } from "@/lib/learn";

/**
 * Summary card for one learn module, shown in the module list. Links through to
 * the module detail route. Server component: no interactivity of its own.
 */
export function ModuleCard({ module: mod }: { module: LearnModule }) {
  return (
    <Link
      href={`/learn/${mod.slug}`}
      className="group flex h-full flex-col rounded-wei-lg border border-wei-line bg-wei-paper p-6 shadow-wei-soft transition-colors hover:border-wei-emerald/40"
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-wei-xs">
        <span className="rounded-wei-pill bg-wei-emerald/10 px-2.5 py-1 font-semibold uppercase tracking-[0.1em] text-wei-emerald-deep">
          {mod.topic}
        </span>
        <span className="text-wei-ink/50">
          {mod.level} · {mod.minutes} min
        </span>
      </div>

      <h2 className="mt-4 font-wei-display text-wei-lg font-semibold text-wei-ink transition-colors group-hover:text-wei-emerald-deep">
        {mod.title}
      </h2>

      <p className="mt-2 text-wei-sm text-wei-ink/70">{mod.summary}</p>

      <span className="mt-5 inline-flex items-center gap-1 text-wei-sm font-medium text-wei-emerald-deep">
        Start module
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
