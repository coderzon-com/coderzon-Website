"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormStatus } from "@/components/ui/form-field";
import { useContactForm } from "@/lib/use-contact-form";

/**
 * Newsletter signup. A brand-blue rounded card that sits above the footer and
 * overlaps it, matching the original design.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const { status, message, submit, isSubmitting } = useContactForm({
    subject: "Newsletter subscription",
    successMessage: "Thanks for subscribing!",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const ok = await submit({ email });
    if (ok) setEmail("");
  }

  return (
    <div className="container">
      <div className="rounded-t-[30px] bg-brand px-5 py-10 text-center sm:px-6 sm:py-12 lg:px-12">
        <h2 className="break-words text-xl text-white sm:text-2xl lg:text-3xl">
          Subscribe to our newsletter
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-muted focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="secondary"
            className="shrink-0"
          >
            {isSubmitting ? "Subscribing…" : "Subscribe Now"}
          </Button>
        </form>

        <div className="mx-auto mt-4 max-w-xl">
          <FormStatus status={status} message={message} />
        </div>
      </div>
    </div>
  );
}
