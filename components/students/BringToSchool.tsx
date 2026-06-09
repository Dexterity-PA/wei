import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { CtaLink } from "@/components/home/CtaLink";

type Path = {
  index: string;
  title: string;
  body: string;
  cta: string;
};

const paths: Path[] = [
  {
    index: "01",
    title: "Start a chapter",
    body: "Want WEI where you are? You can help bring the tools and lessons to your own school and reach the students around you.",
    cta: "Get in touch",
  },
  {
    index: "02",
    title: "Join the team",
    body: "WEI is built by students. Help write lessons, shape the tools, or just spread the word. There is a place for you here.",
    cta: "Join in",
  },
];

/**
 * Closing get-involved band for students. Dark ink surface to end the page on
 * the brand anchor. Two student paths route to /contact, where the student path
 * is the default. A quiet footnote points anyone with a teacher in mind to the
 * partner program.
 */
export function BringToSchool() {
  return (
    <section className="bg-wei-ink text-wei-paper">
      <Container className="py-wei-section-lg">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <Eyebrow index="03" tone="ink">
                Get involved
              </Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-9 md:max-w-2xl">
            <Reveal>
              <h2 className="text-wei-3xl font-semibold text-balance text-wei-paper">
                WEI is student-led. That includes you.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-wei-lg text-wei-paper/85">
                Already reaching 5,000+ students across 40+ schools, and growing
                because students keep stepping up. Whether you want to start
                something on your campus or help build what comes next, we would
                like to hear from you.
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
                {path.index}
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

        <Reveal delay={0.26} className="mt-8">
          <p className="text-wei-sm text-wei-paper/60">
            Know a teacher or counselor who should see this? Point them to the{" "}
            <Link
              href="/partners"
              className="font-medium text-wei-paper underline decoration-wei-paper/40 underline-offset-4 transition-colors hover:decoration-wei-paper"
            >
              partner program
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
