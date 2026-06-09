import type { Metadata } from "next";
import { StudentsHero } from "@/components/students/StudentsHero";
import { WhatsHereForYou } from "@/components/students/WhatsHereForYou";
import { HowToGetStarted } from "@/components/students/HowToGetStarted";
import { BringToSchool } from "@/components/students/BringToSchool";

export const metadata: Metadata = {
  title: "For students",
  description:
    "Your starting point at WEI. Free tools, short lessons, a plain-language glossary, and downloadable resources, all built for students. Start where you are.",
  alternates: {
    canonical: "/students",
  },
};

export default function StudentsPage() {
  return (
    <>
      <StudentsHero />
      <WhatsHereForYou />
      <HowToGetStarted />
      <BringToSchool />
    </>
  );
}
