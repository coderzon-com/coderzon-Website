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
  "name",
  "email",
  "company",
  "country",
  "subject",
  "message",
] as const;

/** GET /api/messages?page=&perPage=&q= — newest first. */
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
    // One round trip, so the count and the rows cannot disagree.
    const [total, items] = await prisma.$transaction([
      prisma.message.count({ where }),
      prisma.message.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    return NextResponse.json(paginated({ items, total, page, perPage }));
  } catch (error) {
    console.error("Failed to list messages:", error);
    return NextResponse.json(
      { ok: false, error: "Could not load messages." },
      { status: 500 },
    );
  }
}
