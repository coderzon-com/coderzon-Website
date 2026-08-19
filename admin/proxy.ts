import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

/**
 * Gate every protected surface in one place.
 *
 * Next 16 renamed the `middleware` convention to `proxy`, and it runs on the
 * Node.js runtime rather than the edge.
 *
 * Pages redirect to the login screen; API routes get a 401 instead, because
 * redirecting a fetch() to an HTML page produces a confusing JSON parse error
 * rather than an honest "you are signed out".
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  const isApi = pathname.startsWith("/api/");
  const isLogin = pathname === "/login";

  if (session) {
    // Already signed in; no reason to show the login screen again.
    if (isLogin) {
      return NextResponse.redirect(new URL("/dashboard/messages", request.url));
    }
    return NextResponse.next();
  }

  // Signed out. The login page must stay reachable, otherwise redirecting to
  // it simply bounces back through here forever.
  if (isLogin) return NextResponse.next();

  if (isApi) {
    return NextResponse.json(
      { ok: false, error: "Not signed in." },
      { status: 401 },
    );
  }

  const loginUrl = new URL("/login", request.url);
  // Remember where they were headed so login can return them there.
  if (pathname !== "/") loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    // Everything under /api except auth, which must stay open to sign in.
    "/api/((?!auth/).*)",
  ],
};
