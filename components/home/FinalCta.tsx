import { Reveal } from "@/components/Reveal";
import { CtaLink } from "./CtaLink";

const paths = [
  {
    title: "Bring WEI to your school",
    body: "Teachers, counselors, and program leads: invite us in to run financial literacy with your students.",
    cta: "Partner with us",
  },
  {
    title: "Get involved as a student",
    body: "Want to help build the tools and lessons, or bring them to your own community? There is a place for you here.",
    cta: "Join the team",
  },
] as const;

export function FinalCta() {
  return (
    <section className="bg-wei-ink text-wei-paper">
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section-lg">
        <div className="max-w-3xl">
          <Reveal as="h2" className="font-wei-display text-wei-3xl font-semibold text-wei-paper">
            Financial equity is built by people who show up.
          </Reveal>
          <Reveal delay={0.06} className="mt-5 max-w-2xl">
            <p className="text-wei-lg text-wei-paper/75">
              Whether you teach, lead a program, or are a student who wants in,
              there is a way to help close the gap.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {paths.map((path, index) => (
            <Reveal
              key={path.title}
              delay={0.1 + index * 0.08}
              className="flex flex-col rounded-wei-lg border border-wei-paper/15 bg-wei-paper/5 p-7"
            >
              <h3 className="font-wei-display text-wei-xl font-semibold text-wei-paper">
                {path.title}
              </h3>
              <p className="mt-3 text-wei-base text-wei-paper/70">{path.body}</p>
              <div className="mt-7">
                <CtaLink href="/contact" tone="dark">
                  {path.cta}
                </CtaLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
