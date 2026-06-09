import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared Open Graph card renderer. Every route's `opengraph-image.tsx` is a
 * thin wrapper that calls `renderOgCard` with its title, so the social cards
 * stay visually identical to the site: paper ground, ink display heading,
 * emerald mono labels, and the WEI ascending-bars mark (the same mark used for
 * the favicon and app icons, see scripts/generate-icons.mjs).
 *
 * Satori (the engine behind next/og) only supports flexbox and a subset of
 * CSS, and only ttf/otf/woff fonts (not woff2), which is why the display and
 * mono faces are vendored under assets/og-fonts as woff/ttf.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Brand palette (mirrors the @theme tokens in app/globals.css).
const INK = "#0b1f1c";
const PAPER = "#f6f3ec";
const EMERALD = "#1f7a5c";
const EMERALD_DEEP = "#1a6b50";
const LINE = "#dcd6c8";

const FONT_DIR = join(process.cwd(), "assets", "og-fonts");
const MARK_PATH = join(process.cwd(), "assets", "brand-mark.png");

type Assets = {
  display: Buffer;
  displayBold: Buffer;
  mono: Buffer;
  markSrc: string;
};

let assetsPromise: Promise<Assets> | null = null;

// Load and cache fonts + mark once per server process.
function loadAssets(): Promise<Assets> {
  if (!assetsPromise) {
    assetsPromise = (async () => {
      const [display, displayBold, mono, mark] = await Promise.all([
        readFile(join(FONT_DIR, "BricolageGrotesque-ExtraBold.woff")),
        readFile(join(FONT_DIR, "BricolageGrotesque-Bold.woff")),
        readFile(join(FONT_DIR, "IBMPlexMono-SemiBold.ttf")),
        readFile(MARK_PATH),
      ]);
      return {
        display,
        displayBold,
        mono,
        markSrc: `data:image/png;base64,${mark.toString("base64")}`,
      };
    })();
  }
  return assetsPromise;
}

// Larger type for short titles, smaller for long ones, so a one-word route and
// a full sentence both sit comfortably within the card.
function titleSize(title: string): number {
  if (title.length > 30) return 74;
  if (title.length > 20) return 88;
  return 104;
}

export type OgCardOptions = {
  /** The big display heading. Usually the page's <title>. */
  title: string;
  /** Optional mono kicker above the heading (uppercased on render). */
  eyebrow?: string;
};

export async function renderOgCard({ title, eyebrow }: OgCardOptions) {
  const { display, displayBold, mono, markSrc } = await loadAssets();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "72px 80px",
          fontFamily: "Bricolage",
        }}
      >
        {/* Top emerald accent stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: EMERALD,
          }}
        />

        {/* Brand lockup: mark + mono wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={76} height={76} alt="" />
          <div
            style={{
              fontFamily: "PlexMono",
              fontSize: 24,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: EMERALD_DEEP,
            }}
          >
            Wealth Equity Initiative
          </div>
        </div>

        {/* Heading block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {eyebrow ? (
            <div
              style={{
                fontFamily: "PlexMono",
                fontSize: 26,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: EMERALD,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: titleSize(title),
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: INK,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${LINE}`,
            paddingTop: 24,
            fontFamily: "PlexMono",
            fontSize: 22,
          }}
        >
          <div style={{ color: INK, opacity: 0.55 }}>
            wealthequityinitiative.com
          </div>
          <div
            style={{
              color: EMERALD_DEEP,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Financial literacy education
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Bricolage", data: displayBold, style: "normal", weight: 700 },
        { name: "Bricolage", data: display, style: "normal", weight: 800 },
        { name: "PlexMono", data: mono, style: "normal", weight: 600 },
      ],
    },
  );
}
