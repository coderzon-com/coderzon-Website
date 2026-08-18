"use client";

import { useState } from "react";

const ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Shared submit logic for the contact, quote and newsletter forms.
 * All three post to Web3Forms, so the fetch/status handling lives here once.
 *
 * Returns the form `status` ("idle" | "submitting" | "success" | "error"),
 * a human-readable `message`, and a `submit(fields)` function.
 */
export function useContactForm({ subject, successMessage }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function submit(fields) {
    setStatus("submitting");
    setMessage("");

    const accessKey = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setMessage("The form is not configured. Please email us directly.");
      return false;
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ access_key: accessKey, subject, ...fields }),
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage(successMessage);
        return true;
      }

      setStatus("error");
      setMessage(result.message ?? "Something went wrong. Please try again.");
      return false;
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
      return false;
    }
  }

  return { status, message, submit, isSubmitting: status === "submitting" };
}
