"use client";

import { paths, type Role } from "@/components/contact/content";

type ContactPathsProps = {
  /** The currently active path, or null when none is chosen yet. */
  active: Role;
  onSelect: (role: Exclude<Role, "other">) => void;
};

/**
 * Two get-involved paths shown as a pair of selectable cards. Choosing one
 * sets the form's role and tailors the copy above the fields. Implemented as
 * radio-style buttons so the keyboard and screen-reader experience matches the
 * visual one.
 */
export function ContactPaths({ active, onSelect }: ContactPathsProps) {
  return (
    <div
      role="radiogroup"
      aria-label="How would you like to get involved?"
      className="wei-hairgrid grid sm:grid-cols-2"
    >
      {paths.map((path) => {
        const selected = active === path.role;
        return (
          <button
            key={path.role}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(path.role)}
            className={`group flex h-full flex-col p-6 text-left outline-none transition-colors sm:p-7 ${
              selected
                ? "bg-wei-paper-dim ring-1 ring-inset ring-wei-emerald-deep"
                : "bg-wei-paper hover:bg-wei-paper-dim/60"
            }`}
          >
            <span className="wei-eyebrow text-wei-emerald-deep">
              {path.eyebrow}
            </span>
            <span className="mt-3 font-wei-display text-wei-xl font-semibold text-wei-ink">
              {path.title}
            </span>
            <span className="mt-3 text-wei-base text-wei-ink/75">{path.blurb}</span>
            <ul className="mt-5 space-y-2">
              {path.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2 text-wei-sm text-wei-ink/80"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-wei-pill bg-wei-emerald"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <span
              aria-hidden="true"
              className={`wei-eyebrow mt-6 inline-flex items-center gap-1 ${
                selected ? "text-wei-emerald-deep" : "text-wei-ink/50"
              }`}
            >
              {selected ? "Selected" : "Choose this"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
