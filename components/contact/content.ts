/**
 * Shared content and types for the contact / get-involved experience. Keeping
 * the two-path copy here lets the path cards and the form stay in sync on the
 * selected role without prop drilling strings around.
 */

export type Role = "student" | "educator" | "other";

export type Path = {
  /** The role this path maps to in the form. */
  role: Exclude<Role, "other">;
  eyebrow: string;
  title: string;
  blurb: string;
  /** Short bullets describing what this path leads to. No service claims. */
  points: string[];
  /** Helper line shown above the form once this path is chosen. */
  formIntro: string;
};

export const paths: Path[] = [
  {
    role: "student",
    eyebrow: "For students",
    title: "Use the tools or bring WEI to your school",
    blurb:
      "WEI is student-led. Pick up the guides and money tools, start a chapter, or join the team building them.",
    points: [
      "Work through plain-language guides and everyday money tools",
      "Bring WEI to your campus and start a chapter",
      "Join the students building lessons and tools",
    ],
    formIntro:
      "Tell us a bit about you and how you would like to get involved. We read every message.",
  },
  {
    role: "educator",
    eyebrow: "For schools and educators",
    title: "Partner to bring WEI to your students",
    blurb:
      "Already reaching 5,000+ students across 40+ schools. Partner with us to bring financial literacy education to yours.",
    points: [
      "Bring WEI's financial literacy program to your students",
      "Connect your school with the student-led network",
      "Shape lessons around what your students need",
    ],
    formIntro:
      "Tell us about your school and what you are hoping to set up. We read every message.",
  },
];

export const roleOptions: { value: Role; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "educator", label: "School or educator" },
  { value: "other", label: "Something else" },
];
