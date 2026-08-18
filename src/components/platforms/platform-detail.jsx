import { Section } from "@/components/ui/section";
import {
  ChecklistBlock,
  ListBlock,
  ProseBlock,
  WorkflowBlock,
} from "@/components/services/detail-blocks";

/**
 * Full article body for a platform. Platforms carry several optional
 * sections, each rendered only when the data provides it.
 */
export function PlatformDetail({ platform }) {
  const {
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

  return (
    <Section>
      <article className="mx-auto max-w-4xl">
        <p className="leading-relaxed text-body sm:text-lg">{intro}</p>

        <ProseBlock heading={overview.heading}>{overview.body}</ProseBlock>

        <ChecklistBlock
          heading={highlight.heading}
          body={highlight.body}
          points={highlight.points}
        />

        <ProseBlock heading={value.heading}>{value.body}</ProseBlock>
        <ProseBlock>{value.extra}</ProseBlock>

        <WorkflowBlock workflow={workflow} />

        {useCases && (
          <section className="mt-12">
            <h2 className="mb-4 break-words text-xl sm:text-2xl">Use Cases</h2>
            {Object.entries(useCases).map(([category, items]) => (
              <ListBlock key={category} heading={category} items={items} />
            ))}
          </section>
        )}

        {mobileAndEmbedded && (
          <section className="mt-12">
            <h2 className="mb-4 break-words text-xl sm:text-2xl">
              Mobile and Embedded Benefits
            </h2>
            <ProseBlock heading="Mobile">{mobileAndEmbedded.mobile}</ProseBlock>
            <ProseBlock heading="Embedded">
              {mobileAndEmbedded.embedded}
            </ProseBlock>
          </section>
        )}

        {predictiveAnalytics && (
          <section className="mt-12">
            <h2 className="mb-4 break-words text-xl sm:text-2xl">
              Predictive and Advanced Analytics
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
          <section className="mt-12">
            <h2 className="mb-4 break-words text-xl sm:text-2xl">
              Real-Time Analytics
            </h2>
            <p className="leading-relaxed text-body">
              {realTimeAnalytics.description}
            </p>
            <ListBlock items={realTimeAnalytics.components} />
          </section>
        )}

        {dataArchitecture && (
          <section className="mt-12">
            <h2 className="mb-4 break-words text-xl sm:text-2xl">
              Data Architecture
            </h2>
            <ListBlock
              heading="Data Types"
              items={dataArchitecture.dataTypes}
            />
            <ListBlock heading="Data Flow" items={dataArchitecture.flow} />
          </section>
        )}
      </article>
    </Section>
  );
}
