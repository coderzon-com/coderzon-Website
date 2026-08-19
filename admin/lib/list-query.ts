import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

/**
 * Shared plumbing for the two listing endpoints.
 *
 * proxy.ts already blocks signed-out requests, but each route verifies again.
 * Deliberate duplication: an endpoint returning customer data should not be
 * safe only because a matcher pattern happens to be correct.
 */

export const PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;
export const DEFAULT_PER_PAGE = 10;

export type ListParams = { page: number; perPage: number; q: string };

export async function requireSession(request: NextRequest) {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

/** Read and clamp `page`, `perPage` and `q` from the query string. */
export function readListParams(request: NextRequest): ListParams {
  const params = request.nextUrl.searchParams;

  const requestedPerPage = Number.parseInt(params.get("perPage") ?? "", 10);
  const perPage = (PER_PAGE_OPTIONS as readonly number[]).includes(
    requestedPerPage,
  )
    ? requestedPerPage
    : DEFAULT_PER_PAGE;

  const requestedPage = Number.parseInt(params.get("page") ?? "1", 10);
  const page = Number.isNaN(requestedPage) ? 1 : Math.max(1, requestedPage);

  // Capped so a huge term cannot be pushed into a LIKE scan.
  const q = (params.get("q") ?? "").trim().slice(0, 100);

  return { page, perPage, q };
}

/** Case-insensitive OR across the given columns; undefined when not searching. */
export function buildSearch(q: string, fields: readonly string[]) {
  if (!q) return undefined;
  return {
    OR: fields.map((field) => ({
      [field]: { contains: q, mode: "insensitive" as const },
    })),
  };
}

/** The envelope both endpoints return. */
export function paginated<T>({
  items,
  total,
  page,
  perPage,
}: {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return {
    ok: true as const,
    items,
    page: Math.min(page, totalPages),
    perPage,
    total,
    totalPages,
  };
}
