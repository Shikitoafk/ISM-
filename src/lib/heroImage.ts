import fs from "node:fs";
import path from "node:path";

/**
 * Resolves the hero background photo from /public.
 *
 * The file is dropped in by hand, so the extension is whatever the source
 * image happened to be — hardcoding one means a .png lands as a broken
 * image. Checked at build time on the server; returns null when absent, and
 * the hero falls back to its gradient.
 */
const CANDIDATES = [
  "hero.jpg",
  "hero.jpeg",
  "hero.png",
  "hero.webp",
  "hero.avif",
];

export function resolveHeroImage(): string | null {
  const publicDir = path.join(process.cwd(), "public");

  for (const name of CANDIDATES) {
    try {
      if (fs.existsSync(path.join(publicDir, name))) return `/${name}`;
    } catch {
      // Unreadable public dir — treat as "no photo" rather than failing the build.
    }
  }

  return null;
}
