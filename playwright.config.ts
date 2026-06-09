import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright e2e config for the WEI site.
 *
 * Tests run against a real production build (next build + next start), since the
 * animation behavior under test only matches production in the optimized build.
 * The webServer block builds and starts the app on a dedicated port; locally it
 * reuses an already-running server on that port so reruns are fast.
 */
const PORT = Number(process.env.WEI_E2E_PORT ?? 3210);
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
