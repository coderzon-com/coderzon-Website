"use client";

import { useState } from "react";
import { FormStatus } from "@/components/ui/form-field";
import { useContactForm } from "@/lib/use-contact-form";

/**
 * Newsletter signup, opening the footer.
 *
 * The copy makes no promise about frequency, because there is no blog behind
 * it any more and "articles weekly" would be a lie.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const { status, message, submit, isSubmitting } = useContactForm({
    subject: "Newsletter subscription",
    successMessage: "Thanks — you're on the list.",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const ok = await submit({ email });
    if (ok) setEmail("");
  }

  return (
    <div className="grid gap-8 pb-14 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-6">
        <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
          Occasional updates
        </p>
        <h2 className="mt-4 max-w-[14ch] text-heading font-bold text-white break-words">
          Keep an eye on what we build
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="lg:col-span-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className="min-h-[52px] w-full rounded-full border border-white/20 bg-transparent px-6 text-sm text-white placeholder:text-white/50 transition-colors focus:border-white focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="ease-power inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Subscribing…" : "Subscribe"}
          </button>
        </div>

        <div className="mt-3">
          <FormStatus status={status} message={message} />
        </div>
      </form>
    </div>
  );
}
