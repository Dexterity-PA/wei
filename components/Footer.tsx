import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-wei-line bg-wei-ink text-wei-paper">
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-wei-display text-wei-xl font-semibold">
              {site.name}
            </p>
            <p className="mt-3 text-wei-sm text-wei-paper/75">{site.mission}</p>
          </div>

          <nav aria-label="Footer" className="md:text-right">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {nav.map((link) => (
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
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-wei-paper/15 pt-6 text-wei-xs text-wei-paper/60 md:flex-row md:items-center md:justify-between">
          <p>
            {year} {site.name}. Financial literacy education for students.
          </p>
          <p>A student-founded nonprofit.</p>
        </div>
      </div>
    </footer>
  );
}
