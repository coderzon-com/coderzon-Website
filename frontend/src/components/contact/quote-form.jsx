"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
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

      <div className="grid gap-5 sm:grid-cols-2">
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

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Submit Now"}
      </Button>
    </form>
  );
}
