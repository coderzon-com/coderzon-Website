import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/config/site";
import { deliveredProjects, getProjectBySlug } from "@/data/projects";
import { getServiceBySlug } from "@/data/services";
import { getPlatformBySlug } from "@/data/platforms";
import { ProjectCaseStudy } from "@/components/work/project-case-study";
import { ProjectReference } from "@/components/work/project-reference";
import { ContactCta } from "@/components/contact/contact-cta";

export function generateStaticParams() {
  return deliveredProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project || project.kind === "case-study") {
    return buildMetadata({ title: "Project not found" });
  }

  return buildMetadata({
    title: project.name,
    description: project.cardSummary,
    path: `/work/${project.slug}`,
  });
}

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);
  // A case study reached through this path is a 404: it lives under
  // /case-studies, and the two collections are not interchangeable.
  if (!project || project.kind === "case-study") notFound();

  const service = getServiceBySlug(project.serviceSlug);
  const platforms = project.platformSlugs
    .map((slug) => getPlatformBySlug(slug))
    .filter(Boolean);

  return (
    <>
      {/* The breadcrumb is separated from the hero because the hero's own
          heading and copy change with the reading level, and a trail that
          re-rendered along with them would flicker on every toggle. */}
      <nav
        aria-label="Breadcrumb"
        className="bg-ink px-x-default pt-[calc(72px+2.5rem)] text-white lg:pt-[calc(80px+3rem)]"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-label text-white/55">
          {[
            { label: "Home", href: "/" },
            { label: "Our work", href: "/work" },
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
            {project.cardName}
          </li>
        </ol>
      </nav>

      <ProjectCaseStudy project={project} />

      <ProjectReference project={project} />

      <section className="bg-ink px-x-default pb-y-default border-t border-white/10 pt-12 text-white sm:pt-16">
        <h2 className="font-mono text-[10px] uppercase tracking-label text-white/55">
          The capability behind it
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            service && {
              href: `/services/${service.slug}`,
              label: service.shortTitle,
              body: service.overview.heading,
            },
            ...platforms.map((platform) => ({
              href: `/platforms/${platform.slug}`,
              label: platform.navLabel,
              body: `How we build on ${platform.navLabel}`,
            })),
          ]
            .filter(Boolean)
            .map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className="focus-visible:ring-offset-ink group ease-power flex items-start justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.035] p-5 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                <span className="min-w-0">
                  <span className="block break-words text-base font-bold leading-tight">
                    {entry.label}
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-snug text-white/60">
                    {entry.body}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="ease-power mt-0.5 h-4 w-4 shrink-0 text-white/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white motion-reduce:transition-none"
                />
              </Link>
            ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
