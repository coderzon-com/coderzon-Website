import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups } from "@/config/navigation";
import { getServiceBySlug } from "@/data/services";
import { Icon } from "@/components/ui/icon";
import { ChecklistBlock, ProseBlock, WorkflowBlock } from "./detail-blocks";

/**
 * A single service.
 *
 * These are long pages, so an aside holds the contents and a standing call to
 * action while the article scrolls. Related services come from the same
 * capability group the navigation uses, which keeps the catalogue navigable
 * without a dead end at the bottom.
 */
export function ServiceDetail({ service }) {
  const group = serviceGroups.find((candidate) =>
    candidate.items.some((entry) => entry.slug === service.slug),
  );

  const related = (group?.items ?? [])
    .filter((entry) => entry.slug !== service.slug)
    .map((entry) => getServiceBySlug(entry.slug))
    .filter(Boolean)
    .slice(0, 3);

  const contents = [
    service.overview.heading && {
      id: "overview",
      label: service.overview.heading,
    },
    service.highlight.heading && {
      id: "approach",
      label: service.highlight.heading,
    },
    service.value.heading && { id: "value", label: service.value.heading },
    service.workflow?.steps?.length && { id: "workflow", label: "Workflow" },
  ].filter(Boolean);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Aside */}
          <aside className="lg:col-span-4 lg:order-last">
            <div className="lg:sticky lg:top-28 space-y-8">
              {contents.length > 0 && (
                <nav aria-label="On this page">
                  <p className="mb-3 border-l-2 border-brand pl-2.5 font-mono text-[10px] uppercase tracking-label text-navy">
                    On this page
                  </p>
                  <ul className="space-y-px">
                    {contents.map((entry) => (
                      <li key={entry.id}>
                        <a
                          href={`#${entry.id}`}
                          className="block rounded px-2.5 py-2 text-sm text-muted transition-colors hover:bg-muted-surface hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                        >
                          {entry.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="rounded-lg bg-console p-6 text-white">
                <p className="font-mono text-[10px] uppercase tracking-label text-brand-light">
                  Next step
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Tell us what you are trying to build and we will map it to the
                  right team.
                </p>
                <Link
                  href="/contact"
                  className="group mt-5 inline-flex items-center gap-2 border-b border-brand pb-1 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                >
                  Talk to an expert
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Article */}
          <article className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-body">{service.intro}</p>

            <div className="mt-10 space-y-10">
              <ProseBlock
                id="overview"
                kicker="Overview"
                heading={service.overview.heading}
              >
                {service.overview.body}
              </ProseBlock>

              <ChecklistBlock
                id="approach"
                kicker="What we deliver"
                heading={service.highlight.heading}
                body={service.highlight.body}
                points={service.highlight.points}
              />

              <ProseBlock
                id="value"
                kicker="Why it matters"
                heading={service.value.heading}
              >
                {service.value.body}
              </ProseBlock>

              <ProseBlock kicker="How we engage">{service.approach}</ProseBlock>

              <WorkflowBlock id="workflow" workflow={service.workflow} />
            </div>

            {related.length > 0 && (
              <div className="mt-14 border-t border-navy/10 pt-8">
                <p className="mb-5 border-l-2 border-brand pl-2.5 font-mono text-[10px] uppercase tracking-label text-navy">
                  Related in {group.label}
                </p>
                <ul className="grid gap-px overflow-hidden rounded-lg bg-navy/10 sm:grid-cols-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/services/${item.slug}`}
                        className="group flex h-full flex-col bg-white p-5 transition-colors hover:bg-muted-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-muted-surface text-brand ring-1 ring-navy/10 transition-colors group-hover:bg-brand group-hover:text-white">
                          <Icon name={item.icon} className="h-4 w-4" />
                        </span>
                        <span className="mt-4 text-sm font-semibold leading-snug text-navy transition-colors group-hover:text-brand">
                          {item.shortTitle}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
