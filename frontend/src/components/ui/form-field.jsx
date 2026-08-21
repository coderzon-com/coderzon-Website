import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A real field, not a rule under some text.
 *
 * These were hairline underlines on a transparent ground, which left nothing
 * to aim at: no edge, no surface, and a hit area you had to guess. A form is
 * the one place on a site where the controls should be the most obvious
 * things present — this is where the visitor is being asked to do work.
 *
 * A white ground inside a bordered box separates the field from whatever
 * panel it sits on, and the focus ring is deliberately unmissable rather than
 * a one-pixel colour change.
 */
const CONTROL =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base text-black " +
  "placeholder:text-black/45 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] " +
  "transition-[border-color,box-shadow] duration-200 " +
  "hover:border-black/30 focus:border-black focus:outline-none " +
  "focus:ring-4 focus:ring-black/10";

/** Labelled text input. Pass `as="textarea"` for a multi-line field. */
export function FormField({
  label,
  id,
  as = "input",
  className,
  error,
  ...props
}) {
  const Control = as;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase tracking-label text-black/65"
      >
        {label}
        {props.required && <span className="ml-1 text-brand">*</span>}
      </label>
      <Control
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          CONTROL,
          as === "textarea" && "min-h-32 resize-y leading-relaxed",
          error && "border-red-600 focus:border-red-600 focus:ring-red-600/15",
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Labelled select. Rendered as a native <select> so it uses each platform's
 * own picker — which is far easier to use for a 250-item list, especially on
 * mobile, than any custom dropdown.
 */
export function SelectField({
  label,
  id,
  options,
  placeholder = "Select…",
  className,
  error,
  ...props
}) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase tracking-label text-black/65"
      >
        {label}
        {props.required && <span className="ml-1 text-brand">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            CONTROL,
            "cursor-pointer appearance-none pr-11",
            // The placeholder option is greyed until a real choice is made.
            !props.value && "text-black/45",
            error &&
              "border-red-600 focus:border-red-600 focus:ring-red-600/15",
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/50"
        />
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Success / error banner shown after a form is submitted. */
export function FormStatus({ status, message }) {
  if (status !== "success" && status !== "error") return null;

  return (
    <p
      role="status"
      className={cn(
        "rounded-xl border px-5 py-3.5 text-sm",
        status === "success"
          ? "border-green-700/20 bg-green-50 text-green-900"
          : "border-red-700/20 bg-red-50 text-red-900",
      )}
    >
      {message}
    </p>
  );
}
