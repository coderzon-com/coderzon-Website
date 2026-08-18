import { cn } from "@/lib/utils";

const CONTROL =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-body " +
  "placeholder:text-gray-400 transition-colors focus:border-brand focus:outline-none " +
  "focus:ring-1 focus:ring-brand";

/** Labelled text input. Pass `as="textarea"` for a multi-line field. */
export function FormField({ label, id, as = "input", className, ...props }) {
  const Control = as;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-navy">
        {label}
        {props.required && <span className="ml-0.5 text-brand">*</span>}
      </label>
      <Control
        id={id}
        name={id}
        className={cn(CONTROL, as === "textarea" && "min-h-32 resize-y")}
        {...props}
      />
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
