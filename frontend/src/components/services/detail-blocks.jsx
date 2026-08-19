import { Check } from "lucide-react";

/**
 * Shared content blocks for /services/[slug] and /platforms/[slug].
 *
 * Both data shapes describe the same kinds of content, so the rendering is
 * defined once. Headings carry a monospace label above them, matching the
 * section headers on the homepage.
 */

/** Heading with a monospace kicker, plus body copy. */
export function ProseBlock({ id, kicker, heading, children }) {
  if (!children) return null;
  return (
    <section id={id} className="scroll-mt-28 border-t border-navy/10 pt-10">
      {kicker && (
        <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-brand">
          {kicker}
        </p>
      )}
      {heading && (
        <h2 className="mb-4 break-words text-xl font-bold leading-snug text-navy sm:text-2xl">
          {heading}
        </h2>
      )}
      <p className="max-w-3xl leading-relaxed text-body">{children}</p>
    </section>
  );
}

/** Highlighted panel with a checklist. */
export function ChecklistBlock({ id, kicker, heading, body, points }) {
  if (!heading && !body && !points?.length) return null;

  return (
    <section id={id} className="scroll-mt-28 border-t border-navy/10 pt-10">
      {kicker && (
        <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-brand">
          {kicker}
        </p>
      )}
      {heading && (
        <h2 className="mb-4 break-words text-xl font-bold leading-snug text-navy sm:text-2xl">
          {heading}
        </h2>
      )}
      {body && <p className="max-w-3xl leading-relaxed text-body">{body}</p>}

      {points?.length > 0 && (
        <ul className="mt-6 grid gap-px overflow-hidden rounded-lg bg-navy/10 sm:grid-cols-2">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 bg-muted-surface p-4 text-sm text-navy"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Ordered workflow stages on a rail. */
export function WorkflowBlock({ id, workflow }) {
  if (!workflow?.steps?.length) return null;

  return (
    <section id={id} className="scroll-mt-28 border-t border-navy/10 pt-10">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-brand">
        Workflow
      </p>
      {workflow.heading && (
        <h2 className="mb-7 break-words text-xl font-bold leading-snug text-navy sm:text-2xl">
          {workflow.heading}
        </h2>
      )}

      <ol className="relative space-y-8">
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-3 h-[calc(100%-1.5rem)] w-px bg-navy/12"
        />
        {workflow.steps.map((step, index) => (
          <li key={step.title} className="relative pl-11">
            <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white font-mono text-[10px] tabular-nums text-navy ring-1 ring-navy/15">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base font-semibold leading-snug text-navy">
              {step.title}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {step.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Generic heading plus list of strings. */
export function ListBlock({ heading, items }) {
  if (!items?.length) return null;

  return (
    <div className="mt-7">
      {heading && (
        <h3 className="mb-3 font-mono text-[10px] uppercase capitalize tracking-label text-muted">
          {heading}
        </h3>
      )}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-body">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-brand"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
