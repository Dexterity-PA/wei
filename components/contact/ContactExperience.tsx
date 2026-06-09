"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
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
    <div className="mt-16 space-y-12">
      <div className="space-y-6">
        <Reveal>
          <h2 className="font-wei-display text-wei-2xl font-semibold text-wei-ink">
            Two ways in
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <ContactPaths active={role} onSelect={selectPath} />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="rounded-wei-lg border border-wei-line bg-wei-paper p-6 shadow-wei-soft sm:p-9">
          <h2 className="font-wei-display text-wei-2xl font-semibold text-wei-ink">
            Send us a message
          </h2>
          <div className="mt-6 max-w-xl">
            <ContactForm role={role} onRoleChange={setRole} intro={intro} />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
