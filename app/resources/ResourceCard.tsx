import { Eyebrow } from "@/components/layout/Eyebrow";
import type { Resource } from "./resources";

export type EnrichedFormat = Resource["formats"][number] & {
  /** Human size, e.g. "9 KB". */
  size: string;
  /** Public href under /resources/files/. */
  href: string;
};

/**
 * One resource in the hairline grid: a mono use-label, the title, a plain
 * description, then a download chip per format with its file type and size.
 * Pure presentation, server-rendered. Download links carry a descriptive
 * aria-label so the format and size are clear to assistive tech.
 */
export function ResourceCard({
  resource,
  index,
  formats,
}: {
  resource: Resource;
  index: string;
  formats: EnrichedFormat[];
}) {
  return (
    <article className="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow index={index}>{resource.use}</Eyebrow>
      </div>

      <h3 className="mt-4 text-wei-xl font-semibold text-wei-ink">
        {resource.title}
      </h3>
      <p className="mt-3 flex-1 text-wei-sm text-wei-ink/70">
        {resource.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {formats.map((f) => (
          <a
            key={f.type}
            href={f.href}
            download
            aria-label={`Download ${resource.title} as ${f.type}, ${f.size}`}
            className="group inline-flex items-center gap-2 rounded-wei-sm border border-wei-line-strong bg-wei-paper px-3 py-2 transition-colors duration-[var(--duration-wei-fast)] ease-wei-out hover:border-wei-emerald hover:bg-wei-emerald/[0.06] focus-visible:border-wei-emerald"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3.5 text-wei-emerald-deep"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13h10" />
            </svg>
            <span className="wei-num text-[0.8125rem] font-medium text-wei-ink">
              {f.type}
            </span>
            <span aria-hidden="true" className="text-wei-ink/25">
              /
            </span>
            <span className="wei-num text-[0.8125rem] text-wei-ink/55">
              {f.size}
            </span>
          </a>
        ))}
      </div>
    </article>
  );
}
