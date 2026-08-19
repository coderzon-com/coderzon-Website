import { countries } from "@/data/countries";

/**
 * Validation shared by the message and quote endpoints.
 *
 * The browser already enforces `required` and `type="email"`, but anyone can
 * POST straight to the route, so the server checks the same rules again and
 * is the one that actually decides.
 */

const COUNTRY_NAMES = new Set(countries.map((country) => country.name));

// Deliberately loose. Real addresses are validated by mail being delivered,
// not by a regex; this only rejects obvious nonsense.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: 120,
  firstName: 80,
  lastName: 80,
  email: 254,
  phone: 40,
  subject: 200,
  company: 160,
  country: 80,
  message: 5000,
};

/** Trim a value to a string, treating anything non-string as empty. */
function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Check a payload against a field spec.
 *
 * @param {object} payload raw parsed JSON body
 * @param {object} spec    { fieldName: { required: boolean } }
 * @returns {{ data: object, errors: object }}
 */
export function validateSubmission(payload, spec) {
  const data = {};
  const errors = {};

  for (const [field, rules] of Object.entries(spec)) {
    const value = clean(payload?.[field]);

    if (!value) {
      if (rules.required) errors[field] = "This field is required.";
      // Optional and empty: store null rather than an empty string.
      else data[field] = null;
      continue;
    }

    const limit = LIMITS[field];
    if (limit && value.length > limit) {
      errors[field] = `Must be ${limit} characters or fewer.`;
      continue;
    }

    if (field === "email" && !EMAIL.test(value)) {
      errors[field] = "Enter a valid email address.";
      continue;
    }

    // The form is a fixed dropdown, so anything else was hand-crafted.
    if (field === "country" && !COUNTRY_NAMES.has(value)) {
      errors[field] = "Select a country from the list.";
      continue;
    }

    data[field] = value;
  }

  return { data, errors };
}

/** True when validateSubmission found nothing wrong. */
export function isValid(errors) {
  return Object.keys(errors).length === 0;
}
