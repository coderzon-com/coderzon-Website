import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";

export const dynamic = "force-dynamic";

/** POST /api/auth/logout — clear the session cookie. */
export async function POST() {
  const response = NextResponse.json({ ok: true });
  // maxAge 0 tells the browser to drop it immediately.
  response.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  return response;
}
