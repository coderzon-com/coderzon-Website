import { Check } from "lucide-react";

/**
 * Shared building blocks for the /services/[slug] and /platforms/[slug] pages.
 * Both data shapes describe the same kinds of content, so the rendering is
 * defined once here.
 */

/** Heading + paragraph pair. */
export function ProseBlock({ heading, children }) {
  if (!children) return null;
  return (
    <div className="mt-10">
      {heading && (
        <h2 className="mb-4 break-words text-xl sm:text-2xl">{heading}</h2>
      )}
      <p className="leading-relaxed text-body">{children}</p>
    </div>
  );
}

/** Highlighted card with a bulleted checklist. */
export function ChecklistBlock({ heading, body, points }) {
  if (!heading && !body && !points?.length) return null;

  return (
    <div className="mt-10 rounded-2xl bg-muted-surface p-5 sm:p-7">
      {heading && <h2 className="mb-4 text-xl">{heading}</h2>}
      {body && <p className="leading-relaxed text-body">{body}</p>}

      {points?.length > 0 && (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-sm text-body"
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
    </div>
  );
}

/** Numbered workflow steps, each with its own bulleted list. */
export function WorkflowBlock({ workflow }) {
  if (!workflow?.steps?.length) return null;

  return (
    <div className="mt-12">
      {workflow.heading && (
        <h2 className="mb-6 text-2xl">{workflow.heading}</h2>
      )}

      <ol className="space-y-6">
        {workflow.steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-gray-100 p-5 shadow-card sm:p-6"
          >
            <h3 className="flex items-start gap-3 text-lg">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm text-white">
                {index + 1}
              </span>
              <span className="min-w-0">{step.title}</span>
            </h3>
            <ul className="mt-4 space-y-2 sm:pl-11">
              {step.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-body"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Generic "heading + list of strings" section. */
export function ListBlock({ heading, items }) {
  if (!items?.length) return null;

  return (
    <div className="mt-8">
      {heading && <h3 className="mb-3 text-lg capitalize">{heading}</h3>}
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
