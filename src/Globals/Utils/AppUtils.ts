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
