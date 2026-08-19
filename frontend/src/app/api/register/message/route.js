import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValid, validateSubmission } from "@/lib/validate-submission";

/** Mirrors the required flags on the contact form. */
const SPEC = {
  name: { required: true },
  email: { required: true },
  country: { required: true },
  message: { required: true },
  subject: { required: false },
  company: { required: false },
};

// Touches the database, so it must never be statically evaluated.
export const dynamic = "force-dynamic";

/** POST /api/register/message — store a contact-form enquiry. */
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
    const message = await prisma.message.create({
      data,
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, id: message.id }, { status: 201 });
  } catch (error) {
    // Logged rather than returned: the client gets nothing about the database.
    console.error("Failed to save message:", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your message. Please try again." },
      { status: 500 },
    );
  }
}
