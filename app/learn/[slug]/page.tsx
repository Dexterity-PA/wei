import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
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
    <Container as="article" className="max-w-3xl py-wei-section-lg">
      <Reveal>
        <Link
          href="/learn"
          className="wei-eyebrow inline-flex items-center gap-2 text-wei-emerald-deep"
        >
          <span aria-hidden="true">&larr;</span>
          All modules
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <header className="mt-7 border-b border-wei-line pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="wei-eyebrow text-wei-emerald-deep">{mod.topic}</span>
            <span aria-hidden="true" className="text-wei-ink/25">
              /
            </span>
            <span className="wei-num text-wei-xs text-wei-ink/50">
              {mod.level} · {mod.minutes} min
            </span>
          </div>
          <h1 className="mt-5 font-wei-display text-wei-3xl font-semibold text-wei-ink">
            {mod.title}
          </h1>
          <p className="mt-4 text-wei-lg text-wei-ink/70">{mod.summary}</p>
        </header>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10">
          <ModuleSections sections={mod.sections} />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-14">
          <Quiz questions={mod.quiz} />
        </div>
      </Reveal>
    </Container>
  );
}
