"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { ContactPaths } from "@/components/contact/ContactPaths";
import { ContactForm } from "@/components/contact/ContactForm";
import { paths, type Role } from "@/components/contact/content";

/**
 * Client orchestrator for the get-involved flow. It owns the selected role so
 * the two path cards and the form's role select stay in sync, and it swaps the
 * helper copy above the form to match the chosen path. Default role is
 * "student" since WEI is student-led and most visitors arrive as students.
 */
export function ContactExperience() {
  const [role, setRole] = useState<Role>("student");

  const activePath = paths.find((p) => p.role === role);
  const intro =
    activePath?.formIntro ??
    "Tell us a bit about you and how you would like to get involved. We read every message.";

  function selectPath(next: Exclude<Role, "other">) {
    setRole(next);
  }

  return (
    <div className="mt-14 space-y-12">
      <div>
        <Reveal>
          <Eyebrow index="01">Two ways in</Eyebrow>
        </Reveal>
        <Reveal delay={0.05} className="mt-6">
          <ContactPaths active={role} onSelect={selectPath} />
        </Reveal>
      </div>

      <div>
        <Reveal>
          <Eyebrow index="02">Send us a message</Eyebrow>
        </Reveal>
        <Reveal delay={0.05} className="mt-6">
          <div className="border border-wei-line bg-wei-paper p-6 sm:p-9">
            <div className="max-w-xl">
              <ContactForm role={role} onRoleChange={setRole} intro={intro} />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
