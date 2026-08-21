import Link from "next/link";
import { serviceGroups } from "@/config/navigation";
import { getServiceBySlug } from "@/data/services";
import { ChecklistBlock, ProseBlock, WorkflowBlock } from "./detail-blocks";
import { PlatformChips } from "@/components/ui/platform-chips";

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
    <section className="px-x-default py-y-default bg-ink text-white">
      <div>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Aside */}
          <aside className="lg:col-span-4 lg:order-last">
            <div className="space-y-10 lg:sticky lg:top-28">
              {contents.length > 0 && (
                <nav aria-label="On this page">
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-label text-white/55">
                    On this page
                  </p>
                  <ul className="space-y-px">
                    {contents.map((entry) => (
                      <li key={entry.id}>
                        <a
                          href={`#${entry.id}`}
                          className="block py-2 text-sm opacity-50 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          {entry.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="border-t border-white/12 pt-8">
                <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                  Next step
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Tell us what you are trying to build and we will map it to the
                  right team.
                </p>
                <Link
                  href="/contact"
                  className="ease-power mt-6 inline-flex min-h-[48px] items-center rounded-full bg-black px-7 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  Talk to an expert
                </Link>
              </div>
            </div>
          </aside>

          {/* Article */}
          <article className="lg:col-span-8">
            <p className="max-w-2xl text-lg leading-relaxed text-white/85">
              {service.intro}
            </p>

            <div className="mt-14 space-y-14">
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

              {service.platforms?.length > 0 && (
                <section className="border-t border-white/12 pt-12">
                  <PlatformChips
                    slugs={service.platforms}
                    label="Delivered in"
                  />
                </section>
              )}

              <ProseBlock kicker="How we engage">{service.approach}</ProseBlock>

              <WorkflowBlock id="workflow" workflow={service.workflow} />
            </div>

            {related.length > 0 && (
              <div className="mt-20 border-t border-white/12 pt-10">
                <p className="mb-6 font-mono text-[10px] uppercase tracking-label text-white/55">
                  Related in {group.label}
                </p>
                <ul className="border-t border-white/12">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/services/${item.slug}`}
                        className="ease-power flex items-baseline gap-4 border-b border-white/12 py-5 opacity-50 transition-all duration-300 hover:translate-x-2 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <span className="text-lg font-bold tracking-[-0.02em]">
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
