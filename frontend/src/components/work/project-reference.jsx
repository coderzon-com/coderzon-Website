import { ACCENTS, allNodeIds } from "@/data/projects";
import { PrintButton } from "./print-button";

/**
 * The full component reference.
 *
 * The engineer's original built this on demand and handed it to the browser's
 * print dialog, so the deepest writing on the page — a plain-language summary
 * and the technical implementation for all seventeen components — existed only
 * inside a PDF nobody would generate. Here it is a real section of the page.
 *
 * That is a better deal for the same content: it is in the DOM, so it is
 * indexed, searchable with the browser's own find, readable with JavaScript
 * off, and still prints. Each component is a native `<details>`, collapsed by
 * default because this is a reference to look things up in rather than a
 * chapter to read; print styles force every one of them open.
 *
 * The headings use the technical vocabulary throughout, as the original's
 * appendix did — someone who has scrolled this far is reading the detail.
 */
export function ProjectReference({ project }) {
  const ids = allNodeIds(project);

  return (
    <section
      id="component-reference"
      className="bg-ink px-x-default pb-y-default border-t border-white/10 pt-14 text-white sm:pt-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="break-words text-display-sm font-bold [font-stretch:96%]">
            Component reference
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Every component in the architecture above, in detail — each with a
            plain-language summary and the technical implementation.
          </p>
        </div>
        <PrintButton />
      </div>

      <div className="mt-10 border-t border-white/12">
        {ids.map((id, index) => {
          const component = project.components[id];
          const heading = component.drawer.tech;
          const accent = ACCENTS[component.accent];

          return (
            <details
              key={id}
              id={`component-${id}`}
              style={{ "--accent": accent }}
              className="project-ref group border-b border-white/12"
            >
              <summary className="focus-visible:ring-offset-ink ease-power flex cursor-pointer list-none items-start gap-4 py-6 transition-colors duration-300 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 font-mono text-[10px] tabular-nums text-white/35"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    data-accent-text=""
                    className="block font-mono text-[10px] uppercase tracking-label"
                    style={{ color: accent }}
                  >
                    {heading.k}
                  </span>
                  <span
                    className="mt-2 block break-words text-lg font-bold leading-tight [font-stretch:96%]"
                    dangerouslySetInnerHTML={{ __html: heading.t }}
                  />
                  <span
                    className="mt-1.5 block text-[13px] leading-snug text-white/60"
                    dangerouslySetInnerHTML={{ __html: heading.d }}
                  />
                </span>

                <span
                  aria-hidden="true"
                  className="ease-power mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-base leading-none text-white/50 transition-all duration-300 group-open:rotate-45 group-hover:border-white/35 group-hover:text-white"
                >
                  +
                </span>
              </summary>

              <div className="grid gap-6 pb-9 pl-0 sm:pl-9 lg:grid-cols-2 lg:gap-10">
                <div className="min-w-0 rounded-2xl border border-white/12 bg-white/[0.04] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                    In plain terms
                  </p>
                  <div
                    className="project-prose mt-3"
                    dangerouslySetInnerHTML={{ __html: component.plain }}
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                    Technical detail
                  </p>
                  <div
                    className="project-prose mt-3"
                    dangerouslySetInnerHTML={{ __html: component.body }}
                  />
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
