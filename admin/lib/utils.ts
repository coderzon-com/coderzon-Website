import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes so later ones win. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** "17 Aug 2026, 14:32" — precise, for the detail panel and tooltips. */
export function formatDateTime(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/** "3 hours ago" — the column people actually scan. */
export function formatRelative(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, secondsPer] of units) {
    if (Math.abs(seconds) >= secondsPer) {
      return rtf.format(-Math.round(seconds / secondsPer), unit);
    }
  }
  return "just now";
}

type Compose = { to: string; subject?: string; body?: string };

/**
 * Gmail's compose URL, with the recipient filled in.
 *
 * `mailto:` only works when the operating system has a desktop mail client
 * registered — on a machine where mail lives in a browser tab, clicking it
 * does nothing at all. This opens the compose window directly instead.
 */
export function gmailComposeUrl({ to, subject, body }: Compose): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
