import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/config/site";
import { caseStudies, getProjectBySlug } from "@/data/projects";
import { getServiceBySlug } from "@/data/services";
import { ProjectNarrative } from "@/components/work/project-narrative";
import { ContactCta } from "@/components/contact/contact-cta";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }) {
  const study = getProjectBySlug(params.slug);
  if (!study || study.kind !== "case-study") {
    return buildMetadata({ title: "Case study not found" });
  }

  return buildMetadata({
    title: study.name,
    description: study.cardSummary,
    path: `/case-studies/${study.slug}`,
  });
}

export default function CaseStudyPage({ params }) {
  const study = getProjectBySlug(params.slug);
  // A delivered project reached through this path is a 404, not a redirect:
  // the two collections are deliberately not interchangeable.
  if (!study || study.kind !== "case-study") notFound();

  const service = getServiceBySlug(study.serviceSlug);

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="bg-ink px-x-default pt-[calc(72px+2.5rem)] text-white lg:pt-[calc(80px+3rem)]"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-label text-white/55">
          {[
            { label: "Home", href: "/" },
            { label: "Case studies", href: "/case-studies" },
          ].map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-2">
              <Link
                href={crumb.href}
                className="focus-visible:ring-offset-ink rounded-sm transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                {crumb.label}
              </Link>
              <span aria-hidden="true">/</span>
            </li>
          ))}
          <li className="text-white" aria-current="page">
            {study.cardName}
          </li>
        </ol>
      </nav>

      <ProjectNarrative project={study} />

      {service && (
        <section className="bg-ink px-x-default pb-y-default border-t border-white/10 pt-12 text-white sm:pt-16">
          <h2 className="font-mono text-[10px] uppercase tracking-label text-white/55">
            The capability behind it
          </h2>

          <Link
            href={`/services/${service.slug}`}
            className="focus-visible:ring-offset-ink group ease-power mt-6 flex max-w-xl items-start justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.035] p-5 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            <span className="min-w-0">
              <span className="block break-words text-base font-bold leading-tight">
                {service.shortTitle}
              </span>
              <span className="mt-1.5 block text-[13px] leading-snug text-white/60">
                {service.overview.heading}
              </span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="ease-power mt-0.5 h-4 w-4 shrink-0 text-white/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white motion-reduce:transition-none"
            />
          </Link>
        </section>
      )}

      <ContactCta />
    </>
  );
}
