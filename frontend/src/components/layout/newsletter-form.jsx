"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FormStatus } from "@/components/ui/form-field";
import { useContactForm } from "@/lib/use-contact-form";

/**
 * Newsletter signup, as a console row inside the footer.
 *
 * The copy no longer promises weekly articles — there is no blog to send.
 * It asks for an address and says plainly what arrives.
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
    <div className="grid gap-6 border-y border-console-line py-8 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="lg:col-span-5">
        <p className="font-mono text-[10px] uppercase tracking-label text-brand-light">
          Occasional updates
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          New capabilities and the occasional note on what we are building. No
          schedule, no filler.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="lg:col-span-7">
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
            className="min-h-[48px] w-full rounded-md border border-console-line bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/40 transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-console disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Subscribing…" : "Subscribe"}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="mt-3">
          <FormStatus status={status} message={message} />
        </div>
      </form>
    </div>
  );
}
