import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/session";

export const dynamic = "force-dynamic";

/**
 * Compare two strings in time independent of how much of them matches.
 *
 * A plain `===` returns as soon as it finds a difference, which leaks the
 * secret one character at a time to anyone measuring response times.
 */
function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);

  const length = Math.max(left.length, right.length);
  let diff = left.length ^ right.length;
  for (let i = 0; i < length; i++) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return diff === 0;
}

/** POST /api/auth/login */
export async function POST(request: Request) {
  let payload: { email?: unknown; password?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Expected a JSON body." },
      { status: 400 },
    );
  }

  const email = String(payload?.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(payload?.password ?? "");

  const expectedEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!expectedEmail || !expectedPassword || !process.env.SESSION_SECRET) {
    console.error("ADMIN_EMAIL, ADMIN_PASSWORD or SESSION_SECRET is missing.");
    return NextResponse.json(
      { ok: false, error: "Sign-in is not configured." },
      { status: 500 },
    );
  }

  // Both comparisons always run, so a wrong email costs the same as a wrong
  // password and the response cannot be used to discover a valid address.
  const emailOk = timingSafeEqual(email, expectedEmail);
  const passwordOk = timingSafeEqual(password, expectedPassword);

  if (!emailOk || !passwordOk) {
    return NextResponse.json(
      { ok: false, error: "Those details do not match an account." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    SESSION_COOKIE,
    await createSessionToken(expectedEmail),
    sessionCookieOptions(SESSION_MAX_AGE),
  );
  return response;
}
