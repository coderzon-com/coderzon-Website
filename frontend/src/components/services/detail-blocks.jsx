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
    <section id={id} className="scroll-mt-28 border-t border-black/10 pt-12">
      {kicker && (
        <p className="mb-4 font-mono text-[10px] uppercase tracking-label text-brand">
          {kicker}
        </p>
      )}
      {heading && (
        <h2 className="mb-5 max-w-[18ch] break-words text-display-sm font-bold">
          {heading}
        </h2>
      )}
      <p className="max-w-2xl text-base leading-relaxed text-black/65">
        {children}
      </p>
    </section>
  );
}

/** Highlighted panel with a checklist. */
export function ChecklistBlock({ id, kicker, heading, body, points }) {
  if (!heading && !body && !points?.length) return null;

  return (
    <section id={id} className="scroll-mt-28 border-t border-black/10 pt-12">
      {kicker && (
        <p className="mb-4 font-mono text-[10px] uppercase tracking-label text-brand">
          {kicker}
        </p>
      )}
      {heading && (
        <h2 className="mb-5 max-w-[18ch] break-words text-display-sm font-bold">
          {heading}
        </h2>
      )}
      {body && (
        <p className="max-w-2xl text-base leading-relaxed text-black/65">
          {body}
        </p>
      )}

      {points?.length > 0 && (
        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 border-b border-black/10 py-4 text-sm"
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
    <section id={id} className="scroll-mt-28 border-t border-black/10 pt-12">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-label text-brand">
        Workflow
      </p>
      {workflow.heading && (
        <h2 className="mb-10 max-w-[18ch] break-words text-display-sm font-bold">
          {workflow.heading}
        </h2>
      )}

      <ol className="relative space-y-12">
        <span
          aria-hidden="true"
          className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-black/10"
        />
        {workflow.steps.map((step, index) => (
          <li key={step.title} className="relative pl-10">
            <span className="absolute left-0 top-1 font-mono text-[10px] tabular-nums text-black/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-bold tracking-[-0.02em]">
              {step.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {step.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-black/55"
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
    <div className="mt-8">
      {heading && (
        <h3 className="mb-4 font-mono text-[10px] uppercase capitalize tracking-label text-black/40">
          {heading}
        </h3>
      )}
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-black/65"
          >
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
