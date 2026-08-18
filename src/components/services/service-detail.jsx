import { Section } from "@/components/ui/section";
import { ChecklistBlock, ProseBlock, WorkflowBlock } from "./detail-blocks";

/** Full article body for a single service. */
export function ServiceDetail({ service }) {
  return (
    <Section>
      <article className="mx-auto max-w-4xl">
        <p className="leading-relaxed text-body sm:text-lg">{service.intro}</p>

        <ProseBlock heading={service.overview.heading}>
          {service.overview.body}
        </ProseBlock>

        <ChecklistBlock
          heading={service.highlight.heading}
          body={service.highlight.body}
          points={service.highlight.points}
        />

        <ProseBlock heading={service.value.heading}>
          {service.value.body}
        </ProseBlock>

        <ProseBlock>{service.approach}</ProseBlock>

        <WorkflowBlock workflow={service.workflow} />
      </article>
    </Section>
  );
}
