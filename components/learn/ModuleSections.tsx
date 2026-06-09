import type { LearnSection } from "@/lib/learn";

/**
 * Renders a module's sections from structured content blocks. Keeping content
 * as data (paragraph / list / callout) rather than raw HTML keeps authoring
 * safe and the styling consistent. Server component.
 */
export function ModuleSections({ sections }: { sections: LearnSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-wei-display text-wei-xl font-semibold text-wei-ink">
            {section.heading}
          </h2>

          <div className="mt-4 space-y-4">
            {section.blocks.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="text-wei-base text-wei-ink/80">
                    {block.text}
                  </p>
                );
              }

              if (block.type === "list") {
                return (
                  <ul
                    key={index}
                    className="space-y-2 pl-5 text-wei-base text-wei-ink/80 marker:text-wei-emerald"
                    style={{ listStyleType: "disc" }}
                  >
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="pl-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }

              // callout
              return (
                <aside
                  key={index}
                  className="rounded-wei-lg border border-wei-line border-l-4 border-l-wei-emerald bg-wei-paper-dim p-5"
                >
                  <p className="font-semibold text-wei-ink">{block.title}</p>
                  <p className="mt-1.5 text-wei-sm text-wei-ink/75">
                    {block.text}
                  </p>
                </aside>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
