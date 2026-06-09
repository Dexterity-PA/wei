import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { resources, categoryOrder, type ResourceFormat } from "./resources";
import { ResourceCard, type EnrichedFormat } from "./ResourceCard";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free, downloadable financial literacy templates for students: budgets, savings and debt planners, a first-paycheck checklist, and more. Made by students, for learning.",
};

const FILES_DIR = path.join(process.cwd(), "public", "resources", "files");

function fileSize(file: string): string {
  const bytes = fs.statSync(path.join(FILES_DIR, file)).size;
  if (bytes < 1024) return `${bytes} B`;
  return `${Math.round(bytes / 1024)} KB`;
}

function enrich(format: ResourceFormat): EnrichedFormat {
  return {
    ...format,
    size: fileSize(format.file),
    href: `/resources/files/${format.file}`,
  };
}

export default function ResourcesPage() {
  // Number every resource once, in display order, for the mono index labels.
  let counter = 0;
  const indexOf = new Map<string, string>();
  for (const category of categoryOrder) {
    for (const r of resources.filter((x) => x.category === category)) {
      counter += 1;
      indexOf.set(r.id, String(counter).padStart(2, "0"));
    }
  }

  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Resources"
        title="Free tools you can actually use."
        intro="Practical, downloadable templates for the money decisions students meet first. Take the PDF to print and write on, or the spreadsheet to fill in and let the math run."
      />

      <Reveal delay={0.12}>
        <div className="mt-10 grid gap-x-wei-gutter gap-y-6 border-t border-wei-line-strong pt-8 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Eyebrow index="00">How to use these</Eyebrow>
          </div>
          <p className="text-wei-base text-wei-ink/75 md:col-span-8 md:max-w-3xl">
            Every file here is real, free, and made by students. The spreadsheets
            have working formulas, so your totals add up as you type. The PDFs are
            built to print or fill in on screen. They are learning tools to help
            you build the habit, not financial advice.
          </p>
        </div>
      </Reveal>

      {categoryOrder.map((category, gi) => {
        const group = resources.filter((r) => r.category === category);
        if (group.length === 0) return null;
        return (
          <section key={category} className="mt-wei-section">
            <Reveal>
              <div className="flex items-end justify-between gap-4 border-b border-wei-line-strong pb-3">
                <Eyebrow index={String(gi + 1).padStart(2, "0")}>
                  {category}
                </Eyebrow>
                <span className="wei-num text-wei-xs text-wei-ink/45">
                  {group.length} {group.length === 1 ? "file" : "files"}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="wei-hairgrid mt-px grid grid-cols-1 sm:grid-cols-2">
                {group.map((r) => (
                  <ResourceCard
                    key={r.id}
                    resource={r}
                    index={indexOf.get(r.id) ?? "00"}
                    formats={r.formats.map(enrich)}
                  />
                ))}
              </div>
            </Reveal>
          </section>
        );
      })}

      <Reveal delay={0.1}>
        <p className="mt-wei-section border-t border-wei-line pt-6 text-wei-sm text-wei-ink/55">
          Spot a number that looks off, or want a template we do not have yet?
          Tell us on the contact page. Everything here stays free to use and
          share.
        </p>
      </Reveal>
    </Container>
  );
}
