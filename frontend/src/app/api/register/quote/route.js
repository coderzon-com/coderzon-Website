import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValid, validateSubmission } from "@/lib/validate-submission";

/** Every field on the quote form is required. */
const SPEC = {
  firstName: { required: true },
  lastName: { required: true },
  email: { required: true },
  phone: { required: true },
  company: { required: true },
  country: { required: true },
  message: { required: true },
};

// Touches the database, so it must never be statically evaluated.
export const dynamic = "force-dynamic";

/** POST /api/register/quote — store a request for a quote. */
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Expected a JSON body." },
      { status: 400 },
    );
  }

  const { data, errors } = validateSubmission(payload, SPEC);
  if (!isValid(errors)) {
    return NextResponse.json(
      { ok: false, error: "Some fields need attention.", fields: errors },
      { status: 400 },
    );
  }

  try {
    const quote = await prisma.quote.create({
      data,
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, id: quote.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save quote request:", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your request. Please try again." },
      { status: 500 },
    );
  }
}
