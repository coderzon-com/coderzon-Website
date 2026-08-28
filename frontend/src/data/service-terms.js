import { services } from "@/data/services";

/**
 * The short vocabulary of each capability.
 *
 * Used as the object on a service page: the terms are suspended in depth
 * behind the title on a wide screen, and listed as a strip on a phone.
 *
 * Every term is derived from the service's own `highlight.points` or its
 * declared `platforms` — nothing here is invented. That constraint is the
 * point: a floating field of tool names is a claim about what this firm
 * actually works in, and a made-up one is worse than no figure at all. Where
 * a capability is not platform-shaped — planning, MVP work, support — the
 * terms are its own deliverables rather than borrowed vendor names.
 *
 * Kept to one or two words each. These are read at an angle, at a distance,
 * behind a headline; a phrase that needs a second look is a phrase that is
 * competing with the thing the reader came for.
 */
const TERMS = {
  "data-engineering": [
    "Batch ingestion",
    "Streaming",
    "Replay",
    "Backfill",
    "Modelling",
    "Tested transforms",
    "Microsoft Fabric",
    "Snowflake",
    "BigQuery",
    "Redshift",
  ],
  "data-science": [
    "Framing",
    "Feature engineering",
    "Baselines",
    "Held-out evaluation",
    "Explainability",
    "Microsoft Fabric",
    "Snowflake",
    "BigQuery",
  ],
  "data-analytics-consulting-services": [
    "BI dashboards",
    "Predictive modelling",
    "Real-time processing",
    "Warehousing",
    "Cohort analysis",
    "Data governance",
    "Snowflake",
    "Redshift",
  ],
  "business-intelligence": [
    "ETL",
    "Dashboards",
    "Forecasting",
    "Warehousing",
    "Self-service BI",
    "Governance",
    "Power BI",
    "Microsoft Fabric",
  ],
  "network-analysis": [
    "Performance monitoring",
    "Load balancing",
    "Security audits",
    "Wi-Fi coverage",
    "Bandwidth",
    "Disaster recovery",
  ],
  "agentic-ai": [
    "Retrieval",
    "Tool use",
    "Approval gates",
    "Evaluation sets",
    "Scoped permissions",
    "Microsoft Azure",
    "AWS",
    "Google Cloud",
  ],
  "machine-learning-app-development-services": [
    "ML models",
    "Automation",
    "Forecasting",
    "NLP",
    "Assistants",
    "Fine-tuning",
  ],
  "Digital-Product-Engineering": [
    "Product design",
    "Full-stack",
    "Cloud architecture",
    "UX/UI",
    "Prototyping",
    "QA",
  ],
  "iot-software-development": [
    "Device integration",
    "Telemetry",
    "Edge computing",
    "Cloud IoT",
    "Real-time alerts",
    "Data privacy",
  ],
  "web-development-services": [
    "Web applications",
    "Responsive design",
    "E-commerce",
    "CMS",
    "APIs",
    "Web security",
  ],
  "Mobile-App-Developments": [
    "iOS",
    "Android",
    "Cross-platform",
    "Mobile UX",
    "ASO",
    "In-app analytics",
  ],
  "mvp-development-services": [
    "Core features",
    "Rapid prototyping",
    "User testing",
    "Agile",
    "Validation",
    "Launch",
  ],
  "saas-application-development-company": [
    "Multi-tenancy",
    "Cloud hosting",
    "Authentication",
    "Billing",
    "API ecosystem",
    "Monitoring",
  ],
  "cloud-computing": [
    "Migration",
    "Hybrid cloud",
    "Serverless",
    "Security",
    "Disaster recovery",
    "Automation",
  ],
  "software-modernization": [
    "Replatforming",
    "Refactoring",
    "Cloud adoption",
    "Database migration",
    "Compliance",
    "Ongoing support",
  ],
  "software-planning": [
    "Requirements",
    "Architecture",
    "Integrations",
    "API design",
    "Quality assurance",
    "Deployment",
  ],
  "application-support-and-maintenance": [
    "24/7 monitoring",
    "Bug fixes",
    "Performance",
    "Security patching",
    "Backups",
    "Recovery",
  ],
};

/**
 * A capability's terms, or an empty list.
 *
 * Returning empty rather than a placeholder is deliberate: the page renders
 * no object at all rather than a generic one, which is the state this was
 * built to get away from.
 */
export function getServiceTerms(slug) {
  return TERMS[slug] ?? [];
}

/**
 * Slugs in the catalogue with no vocabulary yet.
 *
 * A new service is added to `services.js` by someone who has no reason to
 * know this file exists, so the gap is surfaced in development rather than
 * discovered as a blank hero months later.
 */
export function servicesMissingTerms() {
  return services
    .map((service) => service.slug)
    .filter((slug) => !TERMS[slug] || TERMS[slug].length === 0);
}
