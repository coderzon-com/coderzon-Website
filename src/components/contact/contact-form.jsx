"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField, FormStatus } from "@/components/ui/form-field";
import { useContactForm } from "@/lib/use-contact-form";

const EMPTY = { name: "", email: "", subject: "", company: "", message: "" };

/** General "get in touch" form used on the homepage and the contact page. */
export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const { status, message, submit, isSubmitting } = useContactForm({
    subject: "New enquiry from coderzon.com",
    successMessage:
      "Thanks — your message has been sent. We'll be in touch shortly.",
  });

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
          label="Full Name"
          id="name"
          value={values.name}
          onChange={update("name")}
          placeholder="Jane Doe"
          required
        />
        <FormField
          label="Email Address"
          id="email"
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
        value={values.subject}
        onChange={update("subject")}
        placeholder="How can we help?"
      />

      <FormField
        label="Company / Organization"
        id="company"
        value={values.company}
        onChange={update("company")}
        placeholder="Company name"
      />

      <FormField
        label="Message"
        id="message"
        as="textarea"
        value={values.message}
        onChange={update("message")}
        placeholder="Tell us about your project…"
        required
      />

      <FormStatus status={status} message={message} />

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Submit Now"}
      </Button>
    </form>
  );
}
