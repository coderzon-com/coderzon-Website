import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTROL =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-body " +
  "placeholder:text-gray-400 transition-colors focus:border-brand focus:outline-none " +
  "focus:ring-1 focus:ring-brand";

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
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-navy">
        {label}
        {props.required && <span className="ml-0.5 text-brand">*</span>}
      </label>
      <Control
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          CONTROL,
          as === "textarea" && "min-h-32 resize-y",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500",
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600">
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
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-navy">
        {label}
        {props.required && <span className="ml-0.5 text-brand">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            CONTROL,
            "appearance-none pr-10",
            // The placeholder option is greyed until a real choice is made.
            !props.value && "text-gray-400",
            error && "border-red-400 focus:border-red-500 focus:ring-red-500",
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-body"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600">
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
        "rounded-lg px-4 py-3 text-sm",
        status === "success"
          ? "bg-green-50 text-green-800"
          : "bg-red-50 text-red-800",
      )}
    >
      {message}
    </p>
  );
}
