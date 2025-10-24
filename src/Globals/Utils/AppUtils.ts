import path from "path";
import url from "url";
import crypto from "crypto";

export function get__dirname(fileURL: string) {
  const __filename = url.fileURLToPath(fileURL);
  return path.dirname(__filename);
}

export function random8AlnumSecure() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const len = chars.length;
  const out = [];
  // rejection sampling per byte
  while (out.length < 8) {
    const buf = crypto.randomBytes(8);
    for (let i = 0; i < buf.length && out.length < 8; i++) {
      const val = buf[i];
      if (val < 256 - (256 % len)) out.push(chars[val % len]);
    }
  }
  return out.join("");
}

/**
 * Returns the file extension (without the leading dot) or null if none exists.
 * Handles hidden files, paths, and empty strings safely.
 */
export function extractExtensionFromFileName(fileName: string): string | null {
  if (!fileName) return null;

  // Strip directory components (POSIX & Windows)
  const baseName = fileName.split(/[\\/]/).pop()!; // guaranteed non‑empty after split

  // Find the last dot that is **not** the first character
  const lastDot = baseName.lastIndexOf(".");

  // No dot or dot is the first character → no extension
  if (lastDot <= 0) return null;

  const ext = baseName.slice(lastDot + 1);
  return ext || null;
}
