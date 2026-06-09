import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Quiz } from "@/components/learn/Quiz";
import { getLearnModule, learnModules } from "@/lib/learn";

type Params = { slug: string };

/** Pre-render every module at build time. */
export function generateStaticParams(): Params[] {
  return learnModules.map((module) => ({ slug: module.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = getLearnModule(slug);
  if (!mod) return { title: "Module not found" };
  return {
    title: mod.title,
    description: mod.summary,
  };
}

export default async function LearnModulePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const mod = getLearnModule(slug);
  if (!mod) notFound();

  return (
    <article className="mx-auto max-w-3xl px-wei-gutter py-wei-section-lg">
      <Reveal>
        <Link
          href="/learn"
          className="inline-flex items-center gap-1 text-wei-sm font-medium text-wei-emerald-deep hover:underline"
        >
          <span aria-hidden="true">&larr;</span> All modules
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-wei-xs font-semibold uppercase tracking-[0.12em]">
          <span className="rounded-wei-pill bg-wei-emerald/10 px-2.5 py-1 text-wei-emerald-deep">
            {mod.topic}
          </span>
          <span className="text-wei-ink/45">{mod.level}</span>
          <span aria-hidden="true" className="text-wei-ink/30">
            •
          </span>
          <span className="text-wei-ink/45">{mod.minutes} min</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-4 font-wei-display text-wei-3xl font-semibold text-wei-ink">
          {mod.title}
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-4 text-wei-lg text-wei-ink/80">{mod.summary}</p>
      </Reveal>

      <div className="mt-12 space-y-12">
        {mod.sections.map((section, index) => (
          <Reveal key={section.heading} delay={index === 0 ? 0 : 0.05}>
            <section>
              <h2 className="font-wei-display text-wei-2xl font-semibold text-wei-ink">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-wei-base text-wei-ink/80">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.takeaway ? (
                <p className="mt-5 border-l-2 border-wei-emerald pl-4 text-wei-base font-medium text-wei-ink">
                  {section.takeaway}
                </p>
              ) : null}
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-wei-section">
        <div className="border-t border-wei-line pt-10">
          <h2 className="font-wei-display text-wei-2xl font-semibold text-wei-ink">
            Test yourself
          </h2>
          <p className="mt-3 text-wei-base text-wei-ink/70">
            Answer each question, then check your work. You can try again as
            many times as you like.
          </p>
          <div className="mt-8">
            <Quiz questions={mod.quiz} />
          </div>
        </div>
      </Reveal>
    </article>
  );
}
