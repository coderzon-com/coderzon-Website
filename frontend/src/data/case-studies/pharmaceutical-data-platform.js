/**
 * Pharmaceutical data platform — a narrative case study.
 *
 * Ported from the layout document written by the engineer who delivered it.
 * Unlike the three ported HTML pages, that document is a narrative: a
 * challenge, an architecture, the analytics it enables, and the outcomes. It
 * has no per-component write-ups, so it is not rendered as the interactive
 * board those three use — a board whose every node opens an empty drawer
 * would be worse than the story told plainly.
 *
 * What is deliberately NOT carried over: the document illustrates each
 * section with a mock dashboard — ₹243.6 Cr revenue, 98.7% pass rate,
 * 1,231,650 units, batch numbers. Those are demo figures invented for the
 * layout, not measured client results, and a public case study that quotes
 * them is claiming outcomes nobody achieved. Only the capability language the
 * document itself uses in prose survives here.
 *
 * Hand-written. It must not be moved into `interactive.js`, which is
 * regenerated wholesale from the source HTML pages.
 */
export const pharmaceuticalDataPlatform = {
  slug: "pharmaceutical-data-platform",
  /* A case study, not a delivered project. It carries no project number
     because it does not belong in the sequence of systems we have shipped —
     labelling it "Project 04 · Data Engineering" claimed work that was not
     done. `serviceSlug` still files it under the discipline it illustrates,
     so it surfaces on that service page, but it is never counted or
     numbered alongside the projects. */
  kind: "case-study",
  sector: "Pharmaceutical",
  discipline: "Data Engineering",
  serviceSlug: "data-engineering",
  format: "narrative",

  name: "Building a Unified Data Platform for a Pharmaceutical Company",
  cardName: "Pharmaceutical data platform",
  cardSummary:
    "ERP, CRM, manufacturing, inventory, distributor, pharmacy, hospital, e-commerce and finance data sat in disconnected systems. This is the platform that brought them into one governed foundation for reporting and analytics.",

  chips: [
    "Cloud Data Lake",
    "ETL / ELT",
    "Spark / PySpark",
    "Data Warehouse",
    "Lakehouse",
    "Master Data Management",
    "Data Governance",
    "BI & Reporting",
  ],
  platformSlugs: ["Microsoft-Azure"],

  /* The index card shows the shape of a project's pipeline. This one has no
     addressable components, so it declares the same summary directly. */
  flow: [
    { accent: "source", label: "Data sources", count: 9 },
    { accent: "control", label: "Ingestion", count: 10 },
    { accent: "ingest", label: "Cloud data lake", count: 5 },
    { accent: "bronze", label: "Processing", count: 6 },
    { accent: "gold", label: "Warehouse / lakehouse", count: 7 },
    { accent: "serve", label: "Analytics & consumption", count: 8 },
  ],

  narrative: {
    hero: {
      eyebrow: "Pharmaceutical data engineering",
      intro:
        "Connecting manufacturing, inventory, distribution, sales, pharmacies, hospitals and commercial operations through a modern enterprise data platform.",
      /* The header image. Dark-grounded, which is why it needs no frame: the
         architecture diagram further down is white-on-blue and has to sit on
         its own light panel, but this one is already the page's colour and can
         run edge to edge as part of it.

         `priority` at the render site — it is the largest thing above the fold
         and would otherwise be the page's slowest paint. */
      image: {
        src: "/images/pharmaceutical-data-platform-header.jpg",
        width: 1496,
        height: 1051,
        alt: "A pharmaceutical data platform, illustrated as a spilled bottle of capsules each labelled with a capability — supply chain analytics, inventory management, distributor analytics, financial data integration, product analytics, CRM integration, cloud data engineering, data quality and business intelligence. Above them a pipeline runs from data sources through ingestion, ETL/ELT, a data lake and warehouse to analytics and BI, over a foundation of data integration, transformation, governance, observability and orchestration.",
      },

      meta: [
        { label: "Industry", value: "Pharmaceutical / medical products" },
        { label: "Project", value: "Enterprise data engineering & analytics" },
        { label: "Delivered by", value: "Gouthaman · Data Engineer, Coderzon" },
      ],
    },

    challenge: {
      eyebrow: "The business challenge",
      heading: "From fragmented systems to one trusted view",
      intro:
        "A pharmaceutical business can have ERP, CRM, manufacturing, inventory, distributor, pharmacy, hospital, e-commerce and finance data spread across disconnected systems.",
      points: [
        {
          title: "Fragmented data",
          body: "Operational data is distributed across multiple applications and teams.",
        },
        {
          title: "Inconsistent reporting",
          body: "Manual reconciliation slows down decision-making and creates conflicting numbers.",
        },
        {
          title: "Limited visibility",
          body: "Inventory, sales and supply-chain performance are difficult to monitor end-to-end.",
        },
        {
          title: "Scalable analytics",
          body: "The business needs governed, reusable data for BI and future AI/ML.",
        },
      ],
    },

    valueChain: {
      eyebrow: "End-to-end business value chain",
      heading: "Six stages, one platform underneath",
      intro:
        "The platform sits under every stage of the chain, from the production line to the person collecting a prescription.",
      stages: [
        {
          name: "Manufacturing",
          sub: "Quality production",
          items: [
            "Production planning",
            "Batch manufacturing",
            "Quality control",
            "Regulatory compliance",
          ],
        },
        {
          name: "Inventory",
          sub: "Smart inventory management",
          items: [
            "Batch tracking",
            "Barcode / RFID",
            "Expiry management",
            "Stock optimization",
          ],
        },
        {
          name: "Distribution",
          sub: "Efficient distribution network",
          items: [
            "Order fulfillment",
            "Real-time tracking",
            "Temperature control",
            "On-time delivery",
          ],
        },
        {
          name: "Sales",
          sub: "Data-driven sales operations",
          items: [
            "CRM & SFA",
            "Order management",
            "Sales analytics",
            "Performance tracking",
          ],
        },
        {
          name: "Pharmacies / hospitals",
          sub: "Reliable supply to care points",
          items: [
            "Order management",
            "Stock availability",
            "Fast fulfillment",
            "Returns management",
          ],
        },
        {
          name: "Customers",
          sub: "Better health outcomes",
          items: [
            "Product availability",
            "Trust & satisfaction",
            "Better compliance",
            "Improved outcomes",
          ],
        },
      ],
      platform: {
        label: "Integrated data platform",
        items: [
          "Data integration",
          "Data quality",
          "Master data management",
          "Data governance",
          "Secure & compliant",
          "Real-time visibility",
        ],
      },
    },

    architecture: {
      eyebrow: "Solution architecture",
      heading: "A modern cloud data engineering foundation",
      intro:
        "The architecture ingests data from business systems, applies quality and transformation rules, and publishes curated data products for analytics and AI/ML.",

      /* The diagram as the engineer drew it. The layer breakdown below carries
         the same information as HTML — which is what reflows on a phone, what
         a screen reader can read and what a search engine indexes. The image
         is here for the single glance a wall of text cannot give; because it
         is not the only copy of this information, it can afford to be
         illegible at 390px and simply open full size instead. */
      diagram: {
        src: "/images/pharmaceutical-data-architecture.jpg",
        width: 1600,
        height: 900,
        alt: "Pharmaceutical data engineering architecture. Nine source systems — ERP, CRM, manufacturing, inventory, distributor, pharmacy and hospital, e-commerce, finance and external data — feed an ingestion layer of batch pipelines, APIs and streaming. That lands in a cloud data lake zoned into landing, raw, curated and reference. Processing applies validation, business rules, master data management and lineage, publishing to an enterprise warehouse of sales, inventory, finance and supply chain marts, and out to BI reporting, AI/ML analytics and data APIs. Governance, security and monitoring run across every layer.",
        caption: "The architecture as drawn, from data sources to insights.",
      },

      columns: [
        {
          accent: "source",
          head: "Data sources",
          sub: "The systems the business already runs",
          groups: [
            { items: ["ERP — finance, procurement, HR, master data"] },
            { items: ["CRM — leads, sales reps, activities, targets"] },
            {
              items: ["Manufacturing — production, batch, quality, equipment"],
            },
            { items: ["Inventory — stock, warehouse, batch, expiry"] },
            { items: ["Distributor — orders, shipments, returns"] },
            { items: ["Pharmacy & hospital — orders, sales, inventory"] },
            { items: ["E-commerce — online orders, customers, payments"] },
            { items: ["Finance & billing — invoices, payments, receivables"] },
            {
              items: ["External — market, regulatory, weather, demographics"],
            },
          ],
        },
        {
          accent: "control",
          head: "Ingestion layer",
          sub: "Batch, API and streaming paths into the lake",
          groups: [
            {
              title: "Batch ingestion",
              items: [
                "ETL / ELT pipelines",
                "Scheduled jobs",
                "File ingestion (CSV, Excel, JSON)",
              ],
            },
            {
              title: "APIs & connectors",
              items: [
                "REST / SOAP APIs",
                "Database connectors",
                "Third-party connectors",
              ],
            },
            {
              title: "Streaming ingestion",
              items: ["Event streams", "Message queues", "IoT / devices"],
            },
            { items: ["Ingestion monitoring & error handling"] },
          ],
        },
        {
          accent: "ingest",
          head: "Cloud data lake",
          sub: "Zoned storage, raw through curated",
          groups: [
            { items: ["Landing zone — raw data as-is"] },
            { items: ["Raw zone — immutable raw data"] },
            { items: ["Curated zone — cleaned & enriched data"] },
            { items: ["Reference zone — reference & master data"] },
            {
              items: ["Scalable storage — secure, redundant, cost effective"],
            },
          ],
        },
        {
          accent: "bronze",
          head: "Processing & transformation",
          sub: "Where the rules are applied",
          groups: [
            {
              items: ["Data processing frameworks (Spark, Databricks, Flink)"],
            },
            { items: ["ETL / ELT pipelines"] },
            {
              items: [
                "Data validation & standardization, cleansing & deduplication",
              ],
            },
            { items: ["Business rules & enrichment"] },
            { items: ["Master data management"] },
            { items: ["Metadata management & data lineage"] },
          ],
        },
        {
          accent: "gold",
          head: "Warehouse / lakehouse",
          sub: "Curated and modelled, optimised for analytics",
          groups: [
            { items: ["Sales data mart"] },
            { items: ["Inventory data mart"] },
            { items: ["Finance data mart"] },
            { items: ["Supply chain data mart"] },
            { items: ["Reference data"] },
            { items: ["High-performance analytics layer"] },
            { items: ["Curated & modelled data"] },
          ],
        },
        {
          accent: "serve",
          head: "Analytics & consumption",
          sub: "What the business actually opens",
          groups: [
            {
              title: "BI & reporting",
              items: [
                "Executive dashboards",
                "Operational reports",
                "Ad-hoc analysis",
              ],
            },
            {
              title: "AI / ML analytics",
              items: [
                "Demand forecasting",
                "Sales prediction",
                "Customer segmentation",
                "Anomaly detection",
              ],
            },
            {
              title: "Data API services",
              items: ["APIs for applications & business systems"],
            },
          ],
        },
      ],
      crossCutting: [
        {
          title: "Data governance & security",
          sub: "Across all layers",
          items: [
            "Data governance policies",
            "Data quality monitoring",
            "Data lineage & catalog",
            "Access control (RBAC)",
            "Data privacy & compliance",
            "Audit & logging",
          ],
        },
        {
          title: "Monitoring & operations",
          sub: "Keeping it running",
          items: [
            "Pipeline monitoring",
            "Performance monitoring",
            "Alerts & notifications",
            "Cost monitoring",
            "Backup & recovery",
            "Disaster recovery",
          ],
        },
      ],
    },

    capabilities: [
      {
        eyebrow: "Operations & supply chain",
        heading: "Connecting production to delivery",
        blocks: [
          {
            accent: "bronze",
            title: "Manufacturing analytics",
            sub: "Production intelligence",
            items: [
              "Production & batch visibility",
              "Quality and efficiency metrics",
              "Raw-material consumption",
              "Equipment and process monitoring",
            ],
          },
          {
            accent: "ingest",
            title: "Supply chain intelligence",
            sub: "Warehouse to pharmacy / hospital",
            items: [
              "Shipment and route tracking",
              "Inventory visibility",
              "Order fulfillment",
              "Regional demand and delivery performance",
            ],
          },
        ],
      },
      {
        eyebrow: "Commercial analytics",
        heading: "From CRM and sales activity to executive insight",
        blocks: [
          {
            accent: "control",
            title: "Sales & distributor analytics",
            sub: "Where the revenue is made",
            items: [
              "Territory and representative performance",
              "Distributor and customer accounts",
              "Product and regional sales",
              "Orders, targets and achievement",
            ],
          },
          {
            accent: "serve",
            title: "Executive business intelligence",
            sub: "The view from the top",
            items: [
              "Revenue and growth KPIs",
              "Inventory health and expiry",
              "Order fulfillment and supply chain",
              "Regional and product performance",
            ],
          },
        ],
      },
    ],

    implementation: {
      eyebrow: "Technical implementation",
      heading: "Engineered for scale, governance and reuse",
      layers: [
        {
          accent: "source",
          title: "Data sources",
          items: [
            "ERP",
            "CRM",
            "Manufacturing",
            "Inventory",
            "Distributor",
            "Pharmacy / hospital",
            "E-commerce",
            "Finance",
          ],
        },
        {
          accent: "control",
          title: "Ingestion",
          items: [
            "Batch pipelines",
            "APIs",
            "Database connectors",
            "Files",
            "Event streams",
            "IoT",
          ],
        },
        {
          accent: "ingest",
          title: "Storage",
          items: [
            "Cloud data lake",
            "Landing",
            "Raw",
            "Curated",
            "Reference zones",
          ],
        },
        {
          accent: "bronze",
          title: "Processing",
          items: [
            "ETL / ELT",
            "SQL",
            "Spark / PySpark",
            "Data validation",
            "Standardization",
            "Deduplication",
          ],
        },
        {
          accent: "gold",
          title: "Data products",
          items: [
            "Enterprise warehouse / lakehouse",
            "Sales mart",
            "Inventory mart",
            "Finance mart",
            "Supply chain mart",
          ],
        },
        {
          accent: "serve",
          title: "Consumption",
          items: [
            "BI dashboards",
            "Operational reports",
            "Forecasting",
            "Optimization",
            "AI/ML-ready datasets",
          ],
        },
      ],
    },

    outcomes: {
      eyebrow: "Key business outcomes",
      heading: "What the business got",
      items: [
        "Unified operational view",
        "Faster & more accurate reporting",
        "Improved inventory and supply-chain visibility",
        "Data-driven sales decisions",
        "Governed foundation for advanced analytics",
      ],
    },

    close: {
      heading: "Turning pharmaceutical data into business intelligence.",
      body: "A centralized data platform creates the foundation for reliable reporting, stronger operational visibility and scalable analytics across the pharmaceutical value chain.",
      credit: {
        label: "Delivered by",
        name: "Gouthaman",
        role: "Data Engineer · Coderzon Technologies Pvt. Ltd.",
      },
    },
  },
};
