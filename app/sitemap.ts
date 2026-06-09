import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/lib/site";
import { getModuleSlugs } from "@/lib/learn";

/**
 * Every public route, absolute against siteUrl. The flat routes come from the
 * nav (the single source of truth), and learn module pages are pulled from
 * lib/learn.ts so new modules appear here automatically. API routes are not
 * listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const learnModules: MetadataRoute.Sitemap = getModuleSlugs().map((slug) => ({
    url: new URL(`/learn/${slug}`, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  return [...staticRoutes, ...learnModules];
}
