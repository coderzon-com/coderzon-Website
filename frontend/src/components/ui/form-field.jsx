import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// A rule under the field rather than a box around it. With this much white
// space, boxes read as clutter and the baseline is enough to signal input.
const CONTROL =
  "w-full border-0 border-b border-black/15 bg-transparent px-0 py-3 text-base text-black " +
  "placeholder:text-black/30 transition-colors focus:border-black focus:outline-none " +
  "focus:ring-0";

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
        className="mb-1 block font-mono text-[10px] uppercase tracking-label text-black/40"
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
          as === "textarea" && "min-h-28 resize-y",
          error && "border-red-500 focus:border-red-500",
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
        className="mb-1 block font-mono text-[10px] uppercase tracking-label text-black/40"
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
            "appearance-none pr-8",
            // The placeholder option is greyed until a real choice is made.
            !props.value && "text-black/30",
            error && "border-red-500 focus:border-red-500",
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
          className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
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
        "rounded-full px-5 py-3 text-sm",
        status === "success"
          ? "bg-green-50 text-green-800"
          : "bg-red-50 text-red-800",
      )}
    >
      {message}
    </p>
  );
}
