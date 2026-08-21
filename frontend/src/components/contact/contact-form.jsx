"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FormField, FormStatus, SelectField } from "@/components/ui/form-field";
import { countries } from "@/data/countries";
import { useContactForm } from "@/lib/use-contact-form";

const EMPTY = {
  name: "",
  email: "",
  subject: "",
  company: "",
  country: "",
  message: "",
};

const COUNTRY_OPTIONS = countries.map((c) => ({
  value: c.name,
  label: c.name,
}));

/** General "get in touch" form used on the homepage and the contact page. */
export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const { status, message, fieldErrors, submit, isSubmitting } = useContactForm(
    {
      subject: "New enquiry from coderzon.com",
      successMessage:
        "Thanks — your message has been sent. We'll be in touch shortly.",
      saveTo: "/api/register/message",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Full Name"
          id="name"
          error={fieldErrors.name}
          value={values.name}
          onChange={update("name")}
          placeholder="Jane Doe"
          required
        />
        <FormField
          label="Email Address"
          id="email"
          error={fieldErrors.email}
          type="email"
          value={values.email}
          onChange={update("email")}
          placeholder="jane@company.com"
          required
        />
      </div>

      <FormField
        label="Subject"
        id="subject"
        error={fieldErrors.subject}
        value={values.subject}
        onChange={update("subject")}
        placeholder="How can we help?"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Company / Organization"
          id="company"
          error={fieldErrors.company}
          value={values.company}
          onChange={update("company")}
          placeholder="Company name"
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
        placeholder="Tell us about your project…"
        required
      />

      <FormStatus status={status} message={message} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="group ease-power inline-flex min-h-[52px] items-center gap-2 rounded-full bg-black px-8 text-sm font-medium text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send message"}
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
