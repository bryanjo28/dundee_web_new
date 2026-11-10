// Verify every icon referenced by the built HTML actually exists and decodes.
import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const OUT = "out";
const html = readFileSync(join(OUT, "index.html"), "utf8");
const head = html.slice(0, html.indexOf("</head>"));

const hrefs = [...head.matchAll(/rel="(?:icon|apple-touch-icon)"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
// also the classic implicit request browsers make
hrefs.push("/favicon.ico");

const seen = new Set();
let bad = 0;

for (const href of hrefs) {
  const clean = href.split("?")[0];
  if (seen.has(clean)) continue;
  seen.add(clean);

  const p = join(OUT, clean);
  if (!existsSync(p)) {
    console.log(`MISSING  ${clean}`);
    bad++;
    continue;
  }
  const bytes = statSync(p).size;
  if (clean.endsWith(".ico")) {
    const buf = readFileSync(p);
    const type = buf.readUInt16LE(2);
    const count = buf.readUInt16LE(4);
    const sizes = [];
    for (let i = 0; i < count; i++) {
      const o = 6 + i * 16;
      const w = buf.readUInt8(o) === 0 ? 256 : buf.readUInt8(o);
      sizes.push(w);
    }
    const ok = type === 1 && count > 0;
    console.log(`${ok ? "OK      " : "BAD     "} ${clean.padEnd(22)} ico entries=${count} sizes=${sizes.join(",")}  ${bytes}b`);
    if (!ok) bad++;
    continue;
  }
  const m = await sharp(p).metadata();
  const ok = m.width === m.height && m.format === "png" && m.channels === 4;
  console.log(
    `${ok ? "OK      " : "BAD     "} ${clean.padEnd(22)} ${m.width}x${m.height} ${m.format} ch=${m.channels}  ${bytes}b`
  );
  if (!ok) bad++;
}

console.log(bad === 0 ? "\nAll referenced icons are present and valid." : `\n${bad} problem(s).`);
process.exit(bad === 0 ? 0 : 1);
