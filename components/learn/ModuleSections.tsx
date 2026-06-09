import type { LearnSection } from "@/lib/learn";

/**
 * Renders a module's sections from structured content blocks. Keeping content
 * as data (paragraph / list / callout) rather than raw HTML keeps authoring
 * safe and the styling consistent. A mono index in the left margin gives the
 * reading a designed, reference-work rhythm. Server component.
 */
export function ModuleSections({ sections }: { sections: LearnSection[] }) {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <section
          key={section.heading}
          className="grid gap-x-wei-gutter gap-y-3 md:grid-cols-12"
        >
          <div className="md:col-span-2">
            <span className="wei-num text-wei-sm text-wei-ink/35">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="md:col-span-10">
            <h2 className="font-wei-display text-wei-xl font-semibold text-wei-ink">
              {section.heading}
            </h2>

            <div className="mt-4 space-y-4">
              {section.blocks.map((block, blockIndex) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={blockIndex} className="text-wei-base text-wei-ink/80">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul
                      key={blockIndex}
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
                    key={blockIndex}
                    className="border border-wei-line border-l-2 border-l-wei-emerald bg-wei-paper-dim p-5"
                  >
                    <p className="wei-eyebrow text-wei-emerald-deep">Note</p>
                    <p className="mt-2 font-semibold text-wei-ink">
                      {block.title}
                    </p>
                    <p className="mt-1.5 text-wei-sm text-wei-ink/75">
                      {block.text}
                    </p>
                  </aside>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
