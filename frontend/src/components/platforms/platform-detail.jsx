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
    <section className="px-x-default py-y-default bg-ink text-white">
      <div>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <aside className="lg:order-last lg:col-span-4">
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
                  Already using it?
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  {/* A real em dash, not an escape. JSX text is not a string
                      literal, so `\u2014` here rendered as those six characters
                      on every platform page. */}
                  We take over systems someone else built — upgrading, migrating
                  and supporting them without starting over.
                </p>
                <Link
                  href="/request-quote"
                  className="ease-power mt-6 inline-flex min-h-[48px] items-center rounded-full bg-black px-7 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  Request a quote
                </Link>
              </div>
            </div>
          </aside>

          <article className="lg:col-span-8">
            <p className="max-w-2xl text-lg leading-relaxed text-white/85">
              {intro}
            </p>

            <div className="mt-14 space-y-14">
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
                  className="scroll-mt-28 border-t border-white/12 pt-12"
                >
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-signal">
                    In practice
                  </p>
                  <h2 className="mb-3 max-w-[18ch] text-display-sm font-bold break-words">
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
                <section className="scroll-mt-28 border-t border-white/12 pt-12">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-signal">
                    Reach
                  </p>
                  <h2 className="mb-5 max-w-[18ch] text-display-sm font-bold break-words">
                    Mobile and embedded
                  </h2>
                  <div className="grid gap-x-10 sm:grid-cols-2">
                    <div className="border-b border-white/12 py-5">
                      <h3 className="font-mono text-[10px] uppercase tracking-label text-white/55">
                        Mobile
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">
                        {mobileAndEmbedded.mobile}
                      </p>
                    </div>
                    <div className="border-b border-white/12 py-5">
                      <h3 className="font-mono text-[10px] uppercase tracking-label text-white/55">
                        Embedded
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">
                        {mobileAndEmbedded.embedded}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {predictiveAnalytics && (
                <section className="scroll-mt-28 border-t border-white/12 pt-12">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-signal">
                    Advanced
                  </p>
                  <h2 className="mb-3 max-w-[18ch] text-display-sm font-bold break-words">
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
                <section className="scroll-mt-28 border-t border-white/12 pt-12">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-signal">
                    Latency
                  </p>
                  <h2 className="mb-5 max-w-[18ch] text-display-sm font-bold break-words">
                    Real-time analytics
                  </h2>
                  <p className="max-w-2xl leading-relaxed text-white/80">
                    {realTimeAnalytics.description}
                  </p>
                  <ListBlock items={realTimeAnalytics.components} />
                </section>
              )}

              {dataArchitecture && (
                <section
                  id="architecture"
                  className="scroll-mt-28 border-t border-white/12 pt-12"
                >
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-signal">
                    Foundations
                  </p>
                  <h2 className="mb-3 max-w-[18ch] text-display-sm font-bold break-words">
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
              <div className="mt-20 border-t border-white/12 pt-10">
                <p className="mb-6 font-mono text-[10px] uppercase tracking-label text-white/55">
                  Related in {group.label}
                </p>
                <ul className="border-t border-white/12">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/platforms/${item.slug}`}
                        className="ease-power flex items-baseline gap-4 border-b border-white/12 py-5 opacity-50 transition-all duration-300 hover:translate-x-2 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <span className="text-lg font-bold tracking-[-0.02em]">
                          {item.navLabel}
                        </span>
                        <span className="ml-auto font-mono text-[10px] text-white/50">
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
