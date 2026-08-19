import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  buildSearch,
  paginated,
  readListParams,
  requireSession,
} from "@/lib/list-query";

export const dynamic = "force-dynamic";

const SEARCHABLE = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "company",
  "country",
  "message",
] as const;

/** GET /api/quotes?page=&perPage=&q= — newest first. */
export async function GET(request: NextRequest) {
  if (!(await requireSession(request))) {
    return NextResponse.json(
      { ok: false, error: "Not signed in." },
      { status: 401 },
    );
  }

  const { page, perPage, q } = readListParams(request);
  const where = buildSearch(q, SEARCHABLE);

  try {
    const [total, items] = await prisma.$transaction([
      prisma.quote.count({ where }),
      prisma.quote.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    return NextResponse.json(paginated({ items, total, page, perPage }));
  } catch (error) {
    console.error("Failed to list quotes:", error);
    return NextResponse.json(
      { ok: false, error: "Could not load quote requests." },
      { status: 500 },
    );
  }
}
