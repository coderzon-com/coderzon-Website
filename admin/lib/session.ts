import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/**
 * Session handling for the single admin account.
 *
 * The cookie carries a signed JWT rather than a flag. An unsigned
 * "loggedIn=true" cookie could be typed into devtools by anyone; a signed
 * token cannot be produced without SESSION_SECRET.
 */

export const SESSION_COOKIE = "coderzon_admin_session";

/** One day, applied to both the token and the cookie. */
export const SESSION_MAX_AGE = 60 * 60 * 24;

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

/** Mint a signed token for a verified sign-in. */
export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

/** Verify signature and expiry. Returns null for anything invalid. */
export async function verifySessionToken(
  token: string | undefined,
): Promise<JWTPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

/** Cookie options shared by the login and logout routes. */
export function sessionCookieOptions(maxAge: number = SESSION_MAX_AGE) {
  return {
    httpOnly: true as const, // unreadable from JavaScript
    sameSite: "lax" as const, // survives navigation, blocks cross-site POSTs
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}
