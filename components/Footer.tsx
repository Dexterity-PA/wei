import Link from "next/link";
import { contactLink, footerGroups, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-wei-line bg-wei-ink text-wei-paper">
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section">
        <div className="grid gap-x-wei-gutter gap-y-10 md:grid-cols-12">
          <div className="md:col-span-4 md:max-w-sm">
            <p className="font-wei-display text-wei-xl font-semibold">
              {site.name}
            </p>
            <p className="mt-3 text-wei-sm text-wei-paper/70">{site.mission}</p>
            <p className="mt-6">
              <Link
                href={contactLink.href}
                className="text-wei-sm text-wei-paper/80 transition-colors hover:text-wei-amber"
              >
                {contactLink.label}
              </Link>
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-wei-gutter gap-y-10 sm:grid-cols-3 md:col-span-8"
          >
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="wei-eyebrow text-wei-paper/45">{group.title}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-wei-sm text-wei-paper/80 transition-colors hover:text-wei-amber"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-wei-line-ink pt-6 text-wei-xs text-wei-paper/60 md:flex-row md:items-center md:justify-between">
          <p>
            <span className="wei-num">{year}</span> {site.name}. Financial
            literacy education for students.
          </p>
          <p>A student-founded nonprofit.</p>
        </div>
      </div>
    </footer>
  );
}
