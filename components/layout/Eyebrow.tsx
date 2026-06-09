import type { ReactNode } from "react";

type Tone = "default" | "ink";

/**
 * Mono uppercase tracked label, optionally prefixed with a margin index number
 * (e.g. "01 / WHY WEI EXISTS"). Reads like a designed reference document. The
 * index is decorative and hidden from assistive tech; the label text carries
 * the meaning.
 */
export function Eyebrow({
  index,
  children,
  tone = "default",
  className = "",
}: {
  index?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const label = tone === "ink" ? "text-wei-paper/80" : "text-wei-emerald-deep";
  const idx = tone === "ink" ? "text-wei-paper/45" : "text-wei-ink/40";
  const slash = tone === "ink" ? "text-wei-paper/25" : "text-wei-ink/25";

  return (
    <span className={`wei-eyebrow inline-flex items-center gap-2 ${label} ${className}`}>
      {index ? (
        <>
          <span aria-hidden="true" className={idx}>
            {index}
          </span>
          <span aria-hidden="true" className={slash}>
            /
          </span>
        </>
      ) : null}
      <span>{children}</span>
    </span>
  );
}
