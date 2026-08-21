"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FormField, FormStatus, SelectField } from "@/components/ui/form-field";
import { countries } from "@/data/countries";
import { useContactForm } from "@/lib/use-contact-form";

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  message: "",
};

const COUNTRY_OPTIONS = countries.map((c) => ({
  value: c.name,
  label: c.name,
}));

/** Longer form on /request-quote. */
export function QuoteForm() {
  const [values, setValues] = useState(EMPTY);
  const { status, message, fieldErrors, submit, isSubmitting } = useContactForm(
    {
      subject: "New quote request from coderzon.com",
      successMessage:
        "Thanks — your quote request has been sent. We'll reply within one business day.",
      saveTo: "/api/register/quote",
    },
  );

  const update = (field) => (event) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    const ok = await submit(values);
    if (ok) setValues(EMPTY);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <FormField
          label="First Name"
          id="firstName"
          error={fieldErrors.firstName}
          value={values.firstName}
          onChange={update("firstName")}
          placeholder="First"
          required
        />
        <FormField
          label="Last Name"
          id="lastName"
          error={fieldErrors.lastName}
          value={values.lastName}
          onChange={update("lastName")}
          placeholder="Last"
          required
        />
        <FormField
          label="Email Address"
          id="email"
          error={fieldErrors.email}
          type="email"
          value={values.email}
          onChange={update("email")}
          placeholder="you@company.com"
          required
        />
        <FormField
          label="Phone Number"
          id="phone"
          error={fieldErrors.phone}
          type="tel"
          value={values.phone}
          onChange={update("phone")}
          placeholder="Contact number"
          required
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <FormField
          label="Company / Organization"
          id="company"
          error={fieldErrors.company}
          value={values.company}
          onChange={update("company")}
          placeholder="e.g. Coderzon"
          required
        />
        <SelectField
          label="Country"
          id="country"
          error={fieldErrors.country}
          value={values.country}
          onChange={update("country")}
          options={COUNTRY_OPTIONS}
          placeholder="Select your country"
          required
        />
      </div>

      <FormField
        label="Message"
        id="message"
        error={fieldErrors.message}
        as="textarea"
        value={values.message}
        onChange={update("message")}
        placeholder="Tell us what you need built…"
        required
      />

      <FormStatus status={status} message={message} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="group ease-power inline-flex min-h-[52px] items-center gap-2 rounded-full bg-black px-8 text-sm font-medium text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {/* Names the action, and keeps naming it after the click — the
            button, the pending state and the confirmation should all use the
            same word so the flow reads as one thing. */}
        {isSubmitting ? "Sending…" : "Request a quote"}
        {!isSubmitting && (
          <ArrowUpRight
            aria-hidden="true"
            className="ease-power h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        )}
      </button>
    </form>
  );
}
