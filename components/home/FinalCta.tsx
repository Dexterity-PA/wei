import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
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
      <Container className="py-wei-section-lg">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <Eyebrow index="06" tone="ink">
                Get involved
              </Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-9 md:max-w-2xl">
            <Reveal>
              <h2 className="text-wei-3xl font-semibold text-wei-paper">
                Financial equity is built by people who show up.
              </h2>
            </Reveal>
            <Reveal delay={0.06} className="mt-5 max-w-xl">
              <p className="text-wei-base text-wei-paper/70">
                Whether you teach, lead a program, or are a student who wants in,
                there is a way to help close the gap.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="wei-hairgrid wei-hairgrid-ink mt-12 grid grid-cols-1 md:grid-cols-2">
          {paths.map((path, index) => (
            <Reveal
              key={path.title}
              delay={0.1 + index * 0.08}
              className="flex flex-col p-7"
            >
              <span className="wei-num text-wei-sm text-wei-paper/35">
                {`0${index + 1}`}
              </span>
              <h3 className="mt-5 font-wei-display text-wei-xl font-semibold text-wei-paper">
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
      </Container>
    </section>
  );
}
