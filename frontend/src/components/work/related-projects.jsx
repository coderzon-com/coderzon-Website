import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ACCENTS, getProjectsForService } from "@/data/projects";

/**
 * The case studies belonging to a capability.
 *
 * Sits at the end of a service page, where the reader has just been told what
 * we do and the honest next question is whether we have actually done it.
 * Renders nothing for a capability with no write-up yet, so it can be dropped
 * into every service page without leaving an empty heading on most of them.
 */
export function RelatedProjects({ serviceSlug }) {
  const related = getProjectsForService(serviceSlug);
  if (related.length === 0) return null;

  return (
    <section className="bg-ink px-x-default pb-y-default border-t border-white/10 pt-14 text-white sm:pt-20">
      <h2 className="font-mono text-[10px] uppercase tracking-label text-white/55">
        We have built this
      </h2>

      <div className="mt-7 space-y-3">
        {related.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="focus-visible:ring-offset-ink group ease-power block rounded-3xl border border-white/15 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:p-8"
          >
            <p className="text-signal font-mono text-[10px] uppercase tracking-label">
              Project {project.number}
            </p>

            <div className="mt-4 flex items-start justify-between gap-4">
              <h3 className="min-w-0 break-words text-display-sm font-bold [font-stretch:96%]">
                {project.name}
              </h3>
              <ArrowUpRight
                aria-hidden="true"
                className="ease-power mt-1.5 h-5 w-5 shrink-0 text-white/45 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white motion-reduce:transition-none"
              />
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">
              {project.cardSummary}
            </p>

            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
              {project.columns.map((column, index) => (
                <li
                  key={column.key ?? index}
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-white/55"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: ACCENTS[column.accent] }}
                  />
                  {column.head.tech}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
