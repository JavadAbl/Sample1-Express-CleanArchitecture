// jwt-util.ts
import { SignJWT, jwtVerify, decodeJwt, type JWTPayload } from "jose";
import { randomBytes } from "crypto";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Static helper for creating, verifying and decoding JWTs.
 * Uses HS256 symmetric signing – replace with RS256/ECDSA if you need asymmetric keys.
 */
export class JwtUtil {
  // 256‑bit secret – keep it safe (e.g. env var)
  private static readonly SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "fallback-secret-please‑override");

  // token lifetimes (seconds)
  private static readonly ACCESS_TTL = 60 * 15; // 15 min
  private static readonly REFRESH_TTL = 60 * 60 * 24 * 30; // 30 days

  /** Create an access token for a given payload */
  static async createAccessToken(payload: JWTPayload): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    return await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt(now)
      .setExpirationTime(now + this.ACCESS_TTL)
      .setJti(randomBytes(16).toString("hex"))
      .sign(this.SECRET);
  }

  /** Create a refresh token for a given payload */
  static async createRefreshToken(payload: JWTPayload): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    return await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt(now)
      .setExpirationTime(now + this.REFRESH_TTL)
      .setJti(randomBytes(16).toString("hex"))
      .sign(this.SECRET);
  }

  /** Create both access and refresh tokens for a given payload */
  static async createTokens(payload: JWTPayload): Promise<TokenPair> {
    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  /** Verify a token (access or refresh). Throws on failure. */
  static async verifyAccessToken(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, this.SECRET, {
      algorithms: ["HS256"],
    });
    return payload;
  }
  static async verifyRefreshToken(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, this.SECRET, {
      algorithms: ["HS256"],
    });
    return payload;
  }

  /** Decode without verification – useful for extracting claims like `exp` */
  static decodeToken(token: string): JWTPayload {
    return decodeJwt(token);
  }
}
