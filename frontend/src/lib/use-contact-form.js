"use client";

import { useState } from "react";

/* Our own route, not Web3Forms directly. The access key stays on the server;
   see src/app/api/notify/route.js for why. */
const MAIL_ENDPOINT = "/api/notify";

/**
 * Shared submit logic for the contact, quote and newsletter forms.
 *
 * Two things happen on submit: the notification email goes out through our
 * own /api/notify route, and
 * — when `saveTo` is given — the submission is stored through our own API.
 *
 * The save runs first. If the database rejects the payload we want to tell the
 * user before an email has gone out, so they can correct it. If the database
 * is merely unreachable we still send the mail rather than lose the enquiry,
 * and log the failure for follow-up.
 *
 * @param {object}  options
 * @param {string}  options.subject         subject line for the email
 * @param {string}  options.successMessage  shown once the mail is accepted
 * @param {string} [options.saveTo]         our API route, e.g. "/api/register/message"
 *
 * Returns `status` ("idle" | "submitting" | "success" | "error"), a
 * human-readable `message`, `fieldErrors` keyed by field name, and `submit`.
 */
export function useContactForm({ subject, successMessage, saveTo }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  async function submit(fields) {
    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    if (saveTo) {
      const saved = await saveSubmission(saveTo, fields);

      if (saved.rejected) {
        setStatus("error");
        setMessage(saved.error);
        setFieldErrors(saved.fields ?? {});
        return false;
      }

      if (!saved.ok) {
        // Unreachable or failing database. Carry on to the email so the
        // enquiry still reaches a human.
        console.error("Submission was not stored:", saved.error);
      }
    }

    try {
      const response = await fetch(MAIL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ subject, fields }),
      });
      const result = await response.json().catch(() => ({}));

      if (result.ok) {
        setStatus("success");
        setMessage(successMessage);
        return true;
      }

      setStatus("error");
      setMessage(result.error ?? "Something went wrong. Please try again.");
      return false;
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
      return false;
    }
  }

  return {
    status,
    message,
    fieldErrors,
    submit,
    isSubmitting: status === "submitting",
  };
}

/**
 * POST the submission to our own API.
 *
 * `rejected` distinguishes "your input is wrong" (a 400, worth showing the
 * user) from "our database is unhappy" (anything else, not their problem).
 */
async function saveSubmission(url, fields) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok) return { ok: true };

    if (response.status === 400) {
      return {
        ok: false,
        rejected: true,
        error: result.error ?? "Please check the highlighted fields.",
        fields: result.fields,
      };
    }

    return {
      ok: false,
      error: result.error ?? `Save failed (${response.status})`,
    };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
