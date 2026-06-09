import Link from "next/link";
import type { LearnModule } from "@/lib/learn";

/**
 * Summary card for one learning module, shown in the Learn index grid. The
 * whole card is a link into the module so it is an easy mobile tap target.
 */
export function ModuleCard({ module }: { module: LearnModule }) {
  return (
    <Link
      href={`/learn/${module.slug}`}
      className="group flex h-full flex-col rounded-wei-lg border border-wei-line bg-wei-paper p-6 shadow-wei-soft transition-shadow hover:shadow-wei-lift focus-visible:shadow-wei-lift"
    >
      <div className="flex flex-wrap items-center gap-2 text-wei-xs font-semibold uppercase tracking-[0.12em]">
        <span className="rounded-wei-pill bg-wei-emerald/10 px-2.5 py-1 text-wei-emerald-deep">
          {module.topic}
        </span>
        <span className="text-wei-ink/45">{module.level}</span>
        <span aria-hidden="true" className="text-wei-ink/30">
          •
        </span>
        <span className="text-wei-ink/45">{module.minutes} min</span>
      </div>

      <h2 className="mt-4 font-wei-display text-wei-xl font-semibold text-wei-ink">
        {module.title}
      </h2>

      <p className="mt-2 flex-1 text-wei-base text-wei-ink/75">
        {module.summary}
      </p>

      <span className="mt-5 inline-flex items-center gap-1 text-wei-sm font-semibold text-wei-emerald-deep">
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
