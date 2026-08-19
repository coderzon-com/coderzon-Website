import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { platformGroups } from "@/config/navigation";
import { getPlatformBySlug } from "@/data/platforms";
import {
  ChecklistBlock,
  ListBlock,
  ProseBlock,
  WorkflowBlock,
} from "@/components/services/detail-blocks";

/**
 * A single platform.
 *
 * Same shape as the service page — contents and a standing call to action in
 * the aside, related entries from the same vendor group at the end. Platforms
 * carry several optional sections; each renders only when present.
 */
export function PlatformDetail({ platform }) {
  const {
    slug,
    intro,
    overview,
    highlight,
    value,
    workflow,
    useCases,
    mobileAndEmbedded,
    predictiveAnalytics,
    realTimeAnalytics,
    dataArchitecture,
  } = platform;

  const group = platformGroups.find((candidate) =>
    candidate.items.some((entry) => entry.slug === slug),
  );

  const related = (group?.items ?? [])
    .filter((entry) => entry.slug !== slug)
    .map((entry) => getPlatformBySlug(entry.slug))
    .filter(Boolean)
    .slice(0, 3);

  const contents = [
    overview.heading && { id: "overview", label: overview.heading },
    highlight.heading && { id: "capability", label: highlight.heading },
    value.heading && { id: "value", label: value.heading },
    workflow?.steps?.length && { id: "workflow", label: "Workflow" },
    useCases && { id: "use-cases", label: "Use cases" },
    dataArchitecture && { id: "architecture", label: "Data architecture" },
  ].filter(Boolean);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:order-last lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-28">
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
                  Already using it?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  We take over systems someone else built — upgrading, migrating
                  and supporting them without starting over.
                </p>
                <Link
                  href="/request-quote"
                  className="group mt-5 inline-flex items-center gap-2 border-b border-brand pb-1 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                >
                  Request a quote
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </aside>

          <article className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-body">{intro}</p>

            <div className="mt-10 space-y-10">
              <ProseBlock
                id="overview"
                kicker="Overview"
                heading={overview.heading}
              >
                {overview.body}
              </ProseBlock>

              <ChecklistBlock
                id="capability"
                kicker="What we deliver"
                heading={highlight.heading}
                body={highlight.body}
                points={highlight.points}
              />

              <ProseBlock
                id="value"
                kicker="Why it matters"
                heading={value.heading}
              >
                {value.body}
              </ProseBlock>

              {value.extra && <ProseBlock>{value.extra}</ProseBlock>}

              <WorkflowBlock id="workflow" workflow={workflow} />

              {useCases && (
                <section
                  id="use-cases"
                  className="scroll-mt-28 border-t border-navy/10 pt-10"
                >
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-brand">
                    In practice
                  </p>
                  <h2 className="mb-2 text-xl font-bold text-navy sm:text-2xl">
                    Use cases
                  </h2>
                  {Object.entries(useCases).map(([category, items]) => (
                    <ListBlock
                      key={category}
                      heading={category}
                      items={items}
                    />
                  ))}
                </section>
              )}

              {mobileAndEmbedded && (
                <section className="scroll-mt-28 border-t border-navy/10 pt-10">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-brand">
                    Reach
                  </p>
                  <h2 className="mb-4 text-xl font-bold text-navy sm:text-2xl">
                    Mobile and embedded
                  </h2>
                  <div className="grid gap-px overflow-hidden rounded-lg bg-navy/10 sm:grid-cols-2">
                    <div className="bg-muted-surface p-5">
                      <h3 className="font-mono text-[10px] uppercase tracking-label text-muted">
                        Mobile
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-body">
                        {mobileAndEmbedded.mobile}
                      </p>
                    </div>
                    <div className="bg-muted-surface p-5">
                      <h3 className="font-mono text-[10px] uppercase tracking-label text-muted">
                        Embedded
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-body">
                        {mobileAndEmbedded.embedded}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {predictiveAnalytics && (
                <section className="scroll-mt-28 border-t border-navy/10 pt-10">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-brand">
                    Advanced
                  </p>
                  <h2 className="mb-2 text-xl font-bold text-navy sm:text-2xl">
                    Predictive analytics
                  </h2>
                  <ListBlock
                    heading="Capabilities"
                    items={predictiveAnalytics.capabilities}
                  />
                  <ListBlock
                    heading="Platforms"
                    items={predictiveAnalytics.platforms}
                  />
                </section>
              )}

              {realTimeAnalytics && (
                <section className="scroll-mt-28 border-t border-navy/10 pt-10">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-brand">
                    Latency
                  </p>
                  <h2 className="mb-4 text-xl font-bold text-navy sm:text-2xl">
                    Real-time analytics
                  </h2>
                  <p className="max-w-3xl leading-relaxed text-body">
                    {realTimeAnalytics.description}
                  </p>
                  <ListBlock items={realTimeAnalytics.components} />
                </section>
              )}

              {dataArchitecture && (
                <section
                  id="architecture"
                  className="scroll-mt-28 border-t border-navy/10 pt-10"
                >
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-brand">
                    Foundations
                  </p>
                  <h2 className="mb-2 text-xl font-bold text-navy sm:text-2xl">
                    Data architecture
                  </h2>
                  <ListBlock
                    heading="Data types"
                    items={dataArchitecture.dataTypes}
                  />
                  <ListBlock
                    heading="Data flow"
                    items={dataArchitecture.flow}
                  />
                </section>
              )}
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
                        href={`/platforms/${item.slug}`}
                        className="group flex h-full flex-col bg-white p-5 transition-colors hover:bg-muted-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        <span className="text-sm font-semibold leading-snug text-navy transition-colors group-hover:text-brand">
                          {item.navLabel}
                        </span>
                        <span className="mt-1 font-mono text-[10px] text-muted/70">
                          /{item.slug}
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
