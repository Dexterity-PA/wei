import { test, expect, type Page } from "@playwright/test";

/**
 * Reduced-motion correctness guard for the merged animation pass.
 *
 * Every JS-driven (GSAP) animation on the site routes its reduced-motion check
 * through lib/animation/reduced-motion.ts (prefersReducedMotion), consumed by
 * Reveal, CountUp, AnimatedNumber, OpportunityGapChart, and SchoolsMap. Under
 * prefers-reduced-motion: reduce every one of them must render its final state
 * immediately: nothing left at opacity 0, the chart fully drawn, map pins
 * placed, and tool numbers at their final value with no count-up.
 *
 * The final state is identical whether or not the guard exists, so these tests
 * never assert "is the final state correct" alone. They assert that the page
 * never passes through a transient hidden or animating state:
 *
 *   - Mount-triggered work (Reveal, the OpportunityGapChart draw) animates for a
 *     fraction of a second right after hydration. A requestAnimationFrame
 *     sampler records the worst (minimum) opacity and clip width seen across a
 *     window that starts after hydration, so a removed guard is caught while it
 *     animates, not after it settles back to the final state.
 *   - Scroll-triggered work (CountUp on the home stat band, SchoolsMap pins)
 *     with a removed guard is reset to its hidden start state on mount and stays
 *     there until scrolled into view. Asserting the final state BEFORE scrolling
 *     anything into view catches that deterministically.
 *   - The AnimatedNumber count-up is caught by changing an input and sampling
 *     the headline twice ~50ms apart: with the guard it snaps and both samples
 *     match; without it the value is mid count-up and the samples differ.
 *
 * No component is refactored and no production test-ids were added: the chart
 * clip, map pin groups, tool headline, and form input are all reachable through
 * existing selectors and roles.
 */

// The OpportunityGapChart clip rect ends at PLOT_W = W - PAD.left - PAD.right.
const SELECTOR = {
  chartClip: 'svg[aria-label^="Interactive chart"] clipPath rect',
  toolHeadline: ".text-wei-3xl.wei-num",
  // Elements that can carry animated opacity under reduced motion: the task's
  // base set plus the inline-styled wrappers that Reveal / SplitReveal mount.
  opacityTargets:
    'h1, h2, h3, p, section, [class*="reveal"], [style*="opacity"], [style*="will-change"]',
};

const SAMPLE_GRACE_MS = 150; // let hydration commit and good-path guards snap
const SAMPLE_WINDOW_MS = 1800; // overlap the longest mount animation comfortably

type SampleResult = {
  minOpacity: number;
  offenders: string[];
};

/**
 * Runs an in-page rAF loop that records, across the window, the worst opacity of
 * every rendered target element. Started after a short post-load grace so the
 * good-path layout effects have snapped to the final state before sampling, then
 * run long enough to overlap any mount animation a removed guard would start.
 */
async function sampleOpacity(
  page: Page,
  selector: string,
  windowMs: number,
): Promise<SampleResult> {
  return page.evaluate(
    async ([sel, ms]) => {
      const describe = (el: Element) => {
        const t = el.tagName.toLowerCase();
        const cls =
          typeof el.className === "string" && el.className
            ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
            : "";
        return `${t}${cls}`;
      };

      let minOpacity = 1;
      const offenders = new Set<string>();

      const deadline = performance.now() + (ms as number);
      await new Promise<void>((resolve) => {
        const frame = () => {
          document.querySelectorAll(sel as string).forEach((el) => {
            const cs = getComputedStyle(el);
            if (cs.display === "none") return;
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) return; // not rendered
            const op = parseFloat(cs.opacity);
            if (op < minOpacity) minOpacity = op;
            if (cs.visibility === "hidden" || op < 0.05) {
              offenders.add(`${describe(el)}@op=${op}/vis=${cs.visibility}`);
            }
          });
          if (performance.now() < deadline) requestAnimationFrame(frame);
          else resolve();
        };
        requestAnimationFrame(frame);
      });

      return { minOpacity, offenders: Array.from(offenders).slice(0, 25) };
    },
    [selector, windowMs] as const,
  );
}

type ClipSample = { found: boolean; min: number; max: number };

/**
 * Installs (before navigation) a continuous rAF loop that records the min/max
 * width of the OpportunityGapChart clip rect from the very first frame. The
 * chart's server-rendered and reduced-motion state is the full width, so frame-0
 * sampling never yields a false positive; a removed guard sweeps the rect from 0
 * on mount, which this captures with a wide margin regardless of machine speed.
 */
async function installClipSampler(page: Page, clipSelector: string) {
  await page.addInitScript((sel) => {
    const w = window as unknown as { __clip?: ClipSample };
    w.__clip = { found: false, min: Infinity, max: 0 };
    const tick = () => {
      const el = document.querySelector(sel);
      if (el) {
        w.__clip!.found = true;
        const width = parseFloat(el.getAttribute("width") ?? "0");
        if (width < w.__clip!.min) w.__clip!.min = width;
        if (width > w.__clip!.max) w.__clip!.max = width;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, clipSelector);
}

async function readClipSample(page: Page): Promise<ClipSample> {
  const raw = await page.evaluate(
    () => (window as unknown as { __clip?: ClipSample }).__clip,
  );
  return raw ?? { found: false, min: 0, max: 0 };
}

/** Current-frame opacity offenders, used for the after-scroll re-check. */
async function currentOffenders(page: Page, selector: string): Promise<string[]> {
  return page.evaluate((sel) => {
    const out: string[] = [];
    document.querySelectorAll(sel).forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none") return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      const op = parseFloat(cs.opacity);
      if (cs.visibility === "hidden" || op < 0.05) {
        out.push(`${el.tagName.toLowerCase()}@op=${op}/vis=${cs.visibility}`);
      }
    });
    return out;
  }, selector);
}

async function scrollWholePage(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const max = document.body.scrollHeight;
    for (let y = 0; y <= max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => requestAnimationFrame(() => r(null)));
  });
}

async function gotoReduced(page: Page, path: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
}

// The compound-interest math, mirrored from CompoundInterestVisualizer so the
// test can assert the headline equals the true formula output, not just itself.
function balanceAt(
  principal: number,
  monthly: number,
  annualRate: number,
  months: number,
): number {
  const i = annualRate / 100 / 12;
  if (i === 0) return principal + monthly * months;
  const g = Math.pow(1 + i, months);
  return principal * g + monthly * ((g - 1) / i);
}

const moneyToNumber = (text: string) => Number(text.replace(/[^0-9.]/g, ""));

test.describe("reduced motion renders the merged animation pass in final state", () => {
  test("home: headline visible, nothing hidden, chart fully drawn (Reveal + OpportunityGapChart)", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    // Sample the chart clip from the first frame: its final (and SSR) state is
    // full width, so any sweep from 0 a removed guard introduces is captured.
    await installClipSampler(page, SELECTOR.chartClip);
    await page.goto("/", { waitUntil: "load" });

    // Sample every animatable element for any transient hidden/faded state.
    await page.waitForTimeout(SAMPLE_GRACE_MS);
    const sample = await sampleOpacity(
      page,
      SELECTOR.opacityTargets,
      SAMPLE_WINDOW_MS,
    );

    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState("networkidle");

    // h1 is rendered through SplitReveal; under reduced motion it must be solid.
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    const h1Opacity = await h1.evaluate((el) => getComputedStyle(el).opacity);
    expect(parseFloat(h1Opacity)).toBe(1);

    // Final state must hold BEFORE any scroll (scroll-triggered reveals must
    // already be resolved under reduced motion, without needing to scroll).
    expect(
      sample.offenders,
      `content stayed hidden / faded under reduced motion: ${sample.offenders.join(", ")}`,
    ).toEqual([]);
    expect(sample.minOpacity).toBeGreaterThanOrEqual(0.05);

    // The chart clip must be at full width the whole time, never swept from 0.
    const clip = await readClipSample(page);
    expect(clip.found, "OpportunityGapChart clip rect not found").toBe(true);
    expect(clip.max).toBeGreaterThan(0);
    expect(
      clip.min,
      `chart clip width dipped below final (${clip.min} of ${clip.max})`,
    ).toBeGreaterThanOrEqual(clip.max - 1);

    // Scrolling must not be required for the final state, and must not undo it.
    await scrollWholePage(page);
    const afterScroll = await currentOffenders(page, SELECTOR.opacityTargets);
    expect(
      afterScroll,
      `content hidden after full-page scroll: ${afterScroll.join(", ")}`,
    ).toEqual([]);
  });

  test("home: stat counters show final values without scroll (CountUp)", async ({
    page,
  }) => {
    await gotoReduced(page, "/");

    // The CountUp band sits below the fold and is scroll-triggered. Without
    // scrolling it into view, a removed guard leaves every counter reset to 0.
    const counters = page.locator("section.bg-wei-ink .wei-num.text-wei-display");
    const count = await counters.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = (await counters.nth(i).innerText()).trim();
      const leadingNumber = moneyToNumber(text);
      expect(
        leadingNumber,
        `stat counter ${i} reads "${text}" (reset to 0 instead of its final value)`,
      ).toBeGreaterThan(0);
    }
  });

  test("impact: SchoolsMap pins are placed and visible without scroll (SchoolsMap)", async ({
    page,
  }) => {
    await gotoReduced(page, "/impact");
    await page.waitForTimeout(300); // let the map layout effect run

    const pins = await page.evaluate(() => {
      const groups = Array.from(document.querySelectorAll("g[data-pin]"));
      const hidden = groups.filter(
        (g) => parseFloat(getComputedStyle(g).opacity) < 0.05,
      );
      return { total: groups.length, hidden: hidden.length };
    });

    expect(pins.total, "no SchoolsMap pin groups found").toBeGreaterThan(0);
    expect(
      pins.hidden,
      `${pins.hidden} of ${pins.total} map pins stayed hidden under reduced motion`,
    ).toBe(0);
  });

  test("compound-interest: balance settles instantly with no count-up (AnimatedNumber)", async ({
    page,
  }) => {
    await gotoReduced(page, "/tools/compound-interest");

    const startingAmount = page.getByRole("spinbutton", {
      name: "Starting amount",
    });
    await expect(startingAmount).toBeVisible();

    // Change an input so the headline AnimatedNumber re-settles. With the guard
    // it snaps; without it, it counts up over ~0.32s.
    const newPrincipal = 1000;
    const monthly = 150;
    const rate = 7;
    const months = 120; // default years 10 * 12
    await startingAmount.fill(String(newPrincipal));

    const headline = page.locator(SELECTOR.toolHeadline).first();
    const first = (await headline.innerText()).trim();
    await page.waitForTimeout(50);
    const second = (await headline.innerText()).trim();

    // No transient: two samples ~50ms apart are identical.
    expect(
      second,
      `headline changed between samples (${first} -> ${second}); count-up was not skipped`,
    ).toBe(first);

    // The settled value equals the true formula output.
    const expected = balanceAt(newPrincipal, monthly, rate, months);
    const shown = moneyToNumber(second);
    expect(Math.abs(shown - expected)).toBeLessThan(0.01);

    // The headline equals contributions + growth, within display rounding.
    const putIn = moneyToNumber(
      await page
        .getByText("You put in", { exact: true })
        .locator('xpath=following-sibling::span[contains(@class,"wei-num")]')
        .first()
        .innerText(),
    );
    const growth = moneyToNumber(
      await page
        .getByText("Growth earned", { exact: true })
        .locator('xpath=following-sibling::span[contains(@class,"wei-num")]')
        .first()
        .innerText(),
    );
    expect(Math.abs(shown - (putIn + growth))).toBeLessThanOrEqual(1);
  });
});
