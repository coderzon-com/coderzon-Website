import { NextResponse } from "next/server";

const MAIL_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * POST /api/notify — send the enquiry email.
 *
 * This exists so the Web3Forms access key never reaches the browser. It used
 * to be read client-side as NEXT_PUBLIC_FORM_ACCESS_KEY and posted straight to
 * Web3Forms, which put it in the JavaScript bundle for anyone to lift.
 *
 * The key cannot be used to read anything — it only submits to this account's
 * own form — so the exposure was not credential theft. It was an open relay
 * into the company inbox: scrape the key, POST to Web3Forms, and the only way
 * to stop it is to rotate the key and redeploy. Keeping it on the server means
 * abuse has to come through this route, where it can be rate-limited, checked
 * or turned off without touching the client.
 *
 * Deliberately thin. It forwards to Web3Forms and reports the outcome; the
 * database write stays where it was, in /api/register/*, because the two
 * failures need to be distinguished by the caller.
 */
export const dynamic = "force-dynamic";

/** Fields we are willing to forward. Anything else in the body is dropped. */
const ALLOWED = new Set([
  "name",
  "firstName",
  "lastName",
  "email",
  "phone",
  "subject",
  "company",
  "country",
  "message",
]);

export async function POST(request) {
  const accessKey = process.env.FORM_ACCESS_KEY;
  if (!accessKey) {
    console.error("FORM_ACCESS_KEY is not set; cannot send enquiry mail.");
    return NextResponse.json(
      {
        ok: false,
        error: "The form is not configured. Please email us directly.",
      },
      { status: 500 },
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Expected a JSON body." },
      { status: 400 },
    );
  }

  const { subject, fields } = payload ?? {};
  if (!subject || typeof fields !== "object" || fields === null) {
    return NextResponse.json(
      { ok: false, error: "Missing subject or fields." },
      { status: 400 },
    );
  }

  /* Allow-listed rather than spread wholesale: the body arrives from the
     browser, and forwarding arbitrary keys would let a caller set Web3Forms'
     own options — the reply-to address, the redirect — through our server. */
  const safe = Object.fromEntries(
    Object.entries(fields).filter(
      ([key, value]) => ALLOWED.has(key) && typeof value === "string",
    ),
  );

  try {
    const response = await fetch(MAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key: accessKey, subject, ...safe }),
    });
    const result = await response.json().catch(() => ({}));

    if (result.success) return NextResponse.json({ ok: true });

    console.error("Web3Forms rejected the submission:", result?.message);
    return NextResponse.json(
      {
        ok: false,
        error: result?.message ?? "Something went wrong. Please try again.",
      },
      { status: 502 },
    );
  } catch (error) {
    console.error("Could not reach the mail service:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Could not reach the mail service. Please try again.",
      },
      { status: 502 },
    );
  }
}
