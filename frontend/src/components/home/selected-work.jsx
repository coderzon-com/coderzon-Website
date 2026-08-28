import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  deliveredProjects,
  caseStudies,
  ACCENTS,
  flowSummary,
  projectLabel,
} from "@/data/projects";
import { RevealGrid } from "@/components/ui/reveal-grid";

/**
 * The work, on the homepage.
 *
 * Until this existed, the only route to a case study from the homepage was a
 * two-line list inside the capability deck — a card the reader reaches by
 * scrolling through a pinned stack, several sections down. A visitor had no
 * reason to know the case studies were there at all.
 *
 * Placed after the capability deck and the platform band on purpose: those
 * two say what we do and what we run it on, and this is the answer to the
 * question a reader has by then, which is whether any of it is real.
 *
 * Systems only. Case studies are a different claim — how we would approach a
 * sector rather than something we ran — so they live at their own address and
 * are reached from the second link below rather than mixed into this list.
 */
export function SelectedWork() {
  if (deliveredProjects.length === 0) return null;

  return (
    <section className="bg-ink px-x-default border-b border-white/10 pb-y-default pt-y-default text-white">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-signal font-mono text-[10px] uppercase tracking-label">
            Our work
          </p>
          <h2 className="mt-4 max-w-[16ch] break-words text-heading font-bold [font-stretch:96%]">
            Systems we have built
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-relaxed text-white/60">
          Written up by the engineers who built them — the architecture, the
          decisions behind it, and what it changed.
        </p>
      </div>

      <RevealGrid className="mt-12 grid gap-3 lg:grid-cols-2">
        {deliveredProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="focus-visible:ring-offset-ink group ease-power flex h-full flex-col rounded-3xl border border-white/12 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-signal font-mono text-[10px] uppercase tracking-label">
                {projectLabel(project)}
              </p>
              <ArrowUpRight
                aria-hidden="true"
                className="ease-power h-4 w-4 shrink-0 text-white/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white motion-reduce:transition-none"
              />
            </div>

            <h3 className="mt-4 break-words text-display-sm font-bold [font-stretch:96%]">
              {project.cardName}
            </h3>

            <p className="mt-3 text-[13px] leading-relaxed text-white/60">
              {project.cardSummary}
            </p>

            {/* The pipeline, as coloured stages. Same summary the listing page
                uses, so a project describes its shape in one place. */}
            <ul className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-7">
              {flowSummary(project).map((stage) => (
                <li
                  key={stage.label}
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-white/50"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: ACCENTS[stage.accent] }}
                  />
                  {stage.label}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </RevealGrid>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/work"
          className="focus-visible:ring-offset-ink group/all ease-power inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:border-white/45 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
        >
          See all our work
          <ArrowUpRight
            aria-hidden="true"
            className="ease-power h-4 w-4 transition-transform duration-300 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5 motion-reduce:transition-none"
          />
        </Link>

        {/* The other collection, named for what it is. Without this the case
            studies are reachable only from the header, which is where the
            last version of this page hid them. */}
        {caseStudies.length > 0 && (
          <Link
            href="/case-studies"
            className="focus-visible:ring-offset-ink group/cs ease-power inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:border-white/45 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            Read our case studies
            <ArrowUpRight
              aria-hidden="true"
              className="ease-power h-4 w-4 transition-transform duration-300 group-hover/cs:-translate-y-0.5 group-hover/cs:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        )}
      </div>
    </section>
  );
}
