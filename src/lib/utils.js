import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely: later classes win over earlier ones,
 * so a component's default `px-4` can be overridden by a `px-8` prop.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Format a date as "17 August 2026", falling back to an empty string. */
export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Portable Text is an array of blocks; pull the first bit of plain prose out
 * of it for meta descriptions and card excerpts.
 */
export function excerptFromPortableText(blocks, maxLength = 155) {
  if (!Array.isArray(blocks)) return "";
  const text = blocks
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child.text ?? "").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
