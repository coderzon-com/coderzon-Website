import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/config/site";
import {
  caseStudies,
  ACCENTS,
  flowSummary,
  projectHref,
} from "@/data/projects";
import { PageHero } from "@/components/ui/page-hero";
import { LayerFan } from "@/components/ui/figures/layer-fan";
import { RevealGrid } from "@/components/ui/reveal-grid";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = buildMetadata({
  title: "Case studies",
  description:
    "How we would build for a sector — the challenge, the architecture that answers it, and the outcomes it makes possible.",
  path: "/case-studies",
});

/**
 * Case studies, kept separate from delivered work.
 *
 * `/work` is systems we built and run. This is the other thing: an
 * architecture worked through for a sector, written to show how the problem
 * is approached. Mixing the two in one list made the second look like the
 * first, which is a claim about work that was not done.
 */
export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow={`${caseStudies.length} ${caseStudies.length === 1 ? "case study" : "case studies"}`}
        title="Case studies"
        breadcrumb="Case studies"
        description="How we approach a sector's data problem: what makes it hard, the architecture that answers it, and what the business gets. Worked through in full, so you can judge the thinking rather than the summary."
        visual={<LayerFan />}
      />

      <section className="bg-ink px-x-default pb-y-default pt-y-default text-white">
        <RevealGrid className="space-y-4">
          {caseStudies.map((study) => (
            <article key={study.slug}>
              <Link
                href={projectHref(study)}
                className="focus-visible:ring-offset-ink group ease-power block overflow-hidden rounded-3xl border border-white/15 bg-white/[0.035] p-6 transition-colors duration-500 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:p-8 lg:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-7">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-signal font-mono text-[10px] uppercase tracking-label">
                        {study.sector} &middot; {study.discipline}
                      </p>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ease-power h-5 w-5 shrink-0 text-white/45 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white motion-reduce:transition-none lg:hidden"
                      />
                    </div>

                    <h2 className="mt-4 break-words text-display-sm font-bold [font-stretch:96%]">
                      {study.name}
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">
                      {study.cardSummary}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {study.chips.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-white/60"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  </div>

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
                      {flowSummary(study).map((stage) => (
                        <li
                          key={stage.label}
                          className="flex items-center gap-3"
                        >
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: ACCENTS[stage.accent] }}
                          />
                          <span className="min-w-0 break-words text-[13px] leading-snug text-white/70">
                            {stage.label}
                          </span>
                          <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-white/35">
                            {String(stage.count).padStart(2, "0")}
                          </span>
                        </li>
                      ))}
                    </ol>

                    <p className="mt-6 font-mono text-[10px] uppercase tracking-label text-white/45">
                      Challenge, architecture and outcomes
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
