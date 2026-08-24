import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/config/site";
import { projects, ACCENTS } from "@/data/projects";
import { PageHero } from "@/components/ui/page-hero";
import { PipelineFlow } from "@/components/ui/figures/pipeline-flow";
import { RevealGrid } from "@/components/ui/reveal-grid";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = buildMetadata({
  title: "Our work",
  description:
    "Systems we have built and run in production — written up by the engineers who built them, in plain English and in full technical detail.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow={`${projects.length} ${projects.length === 1 ? "case study" : "case studies"}`}
        title="Our work"
        breadcrumb="Our work"
        description="Systems running in production, written up by the engineers who built them. Every one can be read two ways: plain English if you want to know what it does, full technical detail if you want to know how."
        trail={[]}
        visual={<PipelineFlow />}
      />

      <section className="bg-ink px-x-default pb-y-default pt-y-default text-white">
        <RevealGrid className="space-y-4">
          {projects.map((project) => (
            <article key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="focus-visible:ring-offset-ink group ease-power block overflow-hidden rounded-3xl border border-white/15 bg-white/[0.035] p-6 transition-colors duration-500 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:p-8 lg:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-7">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-signal font-mono text-[10px] uppercase tracking-label">
                        Project {project.number} &middot; {project.discipline}
                      </p>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ease-power h-5 w-5 shrink-0 text-white/45 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white motion-reduce:transition-none lg:hidden"
                      />
                    </div>

                    <h2 className="mt-4 break-words text-display-sm font-bold [font-stretch:96%]">
                      {project.name}
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">
                      {project.cardSummary}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {project.chips.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-white/60"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* The five stages of the pipeline, at a glance. A reader
                      who never opens the case study still learns its shape,
                      and the labels come from the same data the page uses. */}
                  <div className="lg:col-span-5">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-[10px] uppercase tracking-label text-white/45">
                        How it flows
                      </p>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ease-power hidden h-5 w-5 shrink-0 text-white/45 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white motion-reduce:transition-none lg:block"
                      />
                    </div>
                    <ol className="mt-4 space-y-2.5">
                      {project.columns.map((column, index) => (
                        <li
                          key={column.key ?? index}
                          className="flex items-center gap-3"
                        >
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: ACCENTS[column.accent] }}
                          />
                          <span className="min-w-0 break-words text-[13px] leading-snug text-white/70">
                            {column.head.tech}
                          </span>
                          <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-white/35">
                            {String(column.nodes.length).padStart(2, "0")}
                          </span>
                        </li>
                      ))}
                    </ol>

                    <p className="mt-6 font-mono text-[10px] uppercase tracking-label text-white/45">
                      Plain English or full technical detail
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </RevealGrid>
      </section>

      <ContactCta />
    </>
  );
}
