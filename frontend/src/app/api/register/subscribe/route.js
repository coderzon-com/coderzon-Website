import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValid, validateSubmission } from "@/lib/validate-submission";

/** The footer form collects one field, and the server checks that one field. */
const SPEC = {
  email: { required: true },
};

// Touches the database, so it must never be statically evaluated.
export const dynamic = "force-dynamic";

/** POST /api/register/subscribe — add an address to the mailing list. */
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
      { ok: false, error: "Enter a valid email address.", fields: errors },
      { status: 400 },
    );
  }

  // Stored lower-cased. Addresses are case-insensitive in practice, and the
  // unique constraint is not — without this, Sam@x.com and sam@x.com are two
  // subscribers and the same person gets mailed twice.
  const email = data.email.toLowerCase();

  try {
    /* Upsert, not create. Someone re-subscribing is not an error to show them
       and not a second row to mail: it is the same person confirming they are
       still interested. The empty `update` keeps the date they first joined,
       which is the one worth having. It also makes a double-click harmless. */
    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      create: { email },
      update: {},
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, id: subscriber.id }, { status: 201 });
  } catch (error) {
    // Logged rather than returned: the client gets nothing about the database.
    console.error("Failed to save subscriber:", error);
    return NextResponse.json(
      { ok: false, error: "Could not sign you up. Please try again." },
      { status: 500 },
    );
  }
}
