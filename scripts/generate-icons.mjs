/**
 * Generates the WEI brand mark and every favicon/app icon from a single SVG
 * source, so the identity stays coherent across the browser tab, mobile home
 * screen, and the small mark embedded in the Open Graph cards (app/lib/og.tsx).
 *
 * The mark is a compound-growth motif: three ascending bars (paper) on a solid
 * emerald tile. Deliberately NOT the three letters "WEI", which are illegible
 * at 16x16. The bars read as rising steps even at favicon size. Palette is the
 * brand emerald and paper from app/globals.css.
 *
 * Run: node scripts/generate-icons.mjs
 * Outputs:
 *   app/favicon.ico       16 + 32 px, PNG-compressed entries
 *   app/icon.png          512 px  (modern browsers / PWA)
 *   app/apple-icon.png    180 px  (iOS home screen)
 *   assets/brand-mark.png 256 px  (embedded in OG cards)
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Brand palette (mirrors the @theme tokens in app/globals.css).
const EMERALD = "#1f7a5c";
const PAPER = "#f6f3ec";

/**
 * The mark on a 100x100 grid. Three bars, equal width, ascending heights,
 * sitting on a common baseline with generous padding so nothing crowds the
 * tile edge. Tops are rounded; bottoms sit square on the baseline.
 */
function bar(x, topY, w, baseline, r) {
  return [
    `M${x},${baseline}`,
    `L${x},${topY + r}`,
    `Q${x},${topY} ${x + r},${topY}`,
    `L${x + w - r},${topY}`,
    `Q${x + w},${topY} ${x + w},${topY + r}`,
    `L${x + w},${baseline}`,
    "Z",
  ].join(" ");
}

/** Build the mark SVG. `tile` false gives a transparent background. */
function markSvg(size, { tile = true } = {}) {
  const baseline = 78;
  const w = 14;
  const r = 6;
  // Bars at x = 18, 43, 68 (left/right padding 18, gap 11).
  const bars = [
    bar(18, baseline - 26, w, baseline, r),
    bar(43, baseline - 40, w, baseline, r),
    bar(68, baseline - 54, w, baseline, r),
  ];
  const tileRect = tile
    ? `<rect width="100" height="100" rx="22" fill="${EMERALD}"/>`
    : "";
  const fill = tile ? PAPER : EMERALD;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
${tileRect}
${bars.map((d) => `<path d="${d}" fill="${fill}"/>`).join("\n")}
</svg>`;
}

function pngBuffer(size, opts) {
  return sharp(Buffer.from(markSvg(size, opts))).png().toBuffer();
}

/** Pack PNG buffers into a single .ico (PNG-compressed entries). */
function buildIco(entries) {
  const count = entries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(count * 16);
  let offset = 6 + count * 16;
  const dirEntries = entries.map((e, i) => {
    const base = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, base + 0); // width
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, base + 1); // height
    dir.writeUInt8(0, base + 2); // palette
    dir.writeUInt8(0, base + 3); // reserved
    dir.writeUInt16LE(1, base + 4); // color planes
    dir.writeUInt16LE(32, base + 6); // bits per pixel
    dir.writeUInt32LE(e.data.length, base + 8); // bytes in resource
    dir.writeUInt32LE(offset, base + 12); // offset
    offset += e.data.length;
    return e.data;
  });

  return Buffer.concat([header, dir, ...dirEntries]);
}

async function main() {
  await mkdir(join(root, "assets"), { recursive: true });

  // App icons (file-convention static assets picked up by Next.js metadata).
  await writeFile(join(root, "app", "icon.png"), await pngBuffer(512));
  await writeFile(join(root, "app", "apple-icon.png"), await pngBuffer(180));

  // OG card mark (embedded as a data URI inside the generated cards).
  await writeFile(join(root, "assets", "brand-mark.png"), await pngBuffer(256));

  // Multi-resolution favicon.
  const ico16 = await pngBuffer(16);
  const ico32 = await pngBuffer(32);
  const ico = buildIco([
    { size: 16, data: ico16 },
    { size: 32, data: ico32 },
  ]);
  await writeFile(join(root, "app", "favicon.ico"), ico);

  console.log("Generated: app/favicon.ico, app/icon.png, app/apple-icon.png, assets/brand-mark.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
