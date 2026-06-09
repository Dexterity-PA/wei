import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ModuleSections } from "@/components/learn/ModuleSections";
import { Quiz } from "@/components/learn/Quiz";
import { getModule, getModuleSlugs } from "@/lib/learn";

type ModulePageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render a static page for every known module.
export function generateStaticParams() {
  return getModuleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ModulePageProps): Promise<Metadata> {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) {
    return { title: "Module not found" };
  }
  return {
    title: mod.title,
    description: mod.summary,
  };
}

export default async function LearnModulePage({ params }: ModulePageProps) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-wei-gutter py-wei-section-lg">
      <Reveal>
        <Link
          href="/learn"
          className="inline-flex items-center gap-1 text-wei-sm font-medium text-wei-emerald-deep"
        >
          <span aria-hidden="true">&larr;</span>
          All modules
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-wei-xs">
            <span className="rounded-wei-pill bg-wei-emerald/10 px-2.5 py-1 font-semibold uppercase tracking-[0.1em] text-wei-emerald-deep">
              {mod.topic}
            </span>
            <span className="text-wei-ink/50">
              {mod.level} · {mod.minutes} min
            </span>
          </div>
          <h1 className="mt-4 font-wei-display text-wei-3xl font-semibold text-wei-ink">
            {mod.title}
          </h1>
          <p className="mt-4 text-wei-lg text-wei-ink/80">{mod.summary}</p>
        </header>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12">
          <ModuleSections sections={mod.sections} />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-14">
          <Quiz questions={mod.quiz} />
        </div>
      </Reveal>
    </article>
  );
}
