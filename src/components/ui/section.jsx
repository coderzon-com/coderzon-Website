import { cn } from "@/lib/utils";

/**
 * Standard vertical rhythm + centered container for every page section.
 * `muted` gives the section the light grey background.
 */
export function Section({
  as: Tag = "section",
  muted = false,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        "py-12 sm:py-16 lg:py-24",
        muted && "bg-muted-surface",
        className,
      )}
      {...props}
    >
      <div className="container">{children}</div>
    </Tag>
  );
}

/**
 * The small coloured eyebrow + heading pair used above most sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className,
}) {
  return (
    <div
      className={cn("max-w-2xl", centered && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-brand">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="break-words text-2xl leading-tight sm:text-3xl lg:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-4 leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
