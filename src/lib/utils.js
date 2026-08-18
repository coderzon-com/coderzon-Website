import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely: later classes win over earlier ones,
 * so a component's default `px-4` can be overridden by a `px-8` prop.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
