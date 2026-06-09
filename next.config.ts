import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack does not infer it from a stray
  // lockfile. Git worktrees under .claude/worktrees each carry their own
  // package-lock.json, which otherwise triggers a multiple-lockfiles warning
  // and an ambiguous root. This keeps the root deterministic across contexts.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
