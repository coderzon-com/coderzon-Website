/**
 * VR Robotic Surgery Assistant — a narrative case study.
 *
 * Ported from the layout document written by the engineer who designed it.
 * The document is explicit about what it is: a concept for an agentic AI
 * assistant, described in the language of intent — "this concept organizes",
 * "expected business value", "demonstrates how these can work together". It is
 * filed as a case study rather than delivered work for that reason.
 *
 * What is deliberately NOT carried over: pages five and six illustrate the
 * idea with mock dashboards — 94.2% AI confidence, 98.7% human approvals, 24
 * active sessions, 82/14/4 task outcomes. Those are demo figures invented for
 * the layout. On a public page about a clinical system they would read as
 * measured performance, which would be a serious thing to imply about surgery.
 * The governance and capability language around them survives; the numbers do
 * not.
 *
 * Hand-written. It must not be moved into `interactive.js`, which is
 * regenerated wholesale from the source HTML pages.
 */
export const vrRoboticSurgeryAssistant = {
  slug: "vr-robotic-surgery-assistant",
  kind: "case-study",
  sector: "Surgical technology",
  discipline: "Agentic AI",
  serviceSlug: "agentic-ai",
  format: "narrative",

  name: "VR Robotic Surgery Assistant",
  cardName: "VR robotic surgery assistant",
  cardSummary:
    "An agentic AI concept for the operating theatre: immersive visualisation, retrieval over approved clinical knowledge, and a reasoning loop that recommends but never decides. Every critical action stays behind a clinician's approval.",

  chips: [
    "Agentic AI",
    "Virtual Reality",
    "Human-in-the-loop",
    "Computer Vision",
    "RAG",
    "Policy Guardrails",
    "Audit Logging",
    "RBAC",
  ],
  platformSlugs: [],

  flow: [
    { accent: "source", label: "Approved inputs", count: 4 },
    { accent: "control", label: "Agentic orchestration", count: 5 },
    { accent: "serve", label: "Experience & integration", count: 4 },
  ],

  narrative: {
    hero: {
      eyebrow: "Agentic AI · Surgical technology",
      intro:
        "An agentic AI platform designed to assist surgical teams with immersive visualisation, contextual information, workflow orchestration and real-time decision support — in a controlled, human-supervised environment.",
      meta: [
        { label: "Project", value: "VR Robotic Surgery Assistant" },
        {
          label: "Technology",
          value: "Agentic AI · VR · Computer vision · RAG",
        },
        {
          label: "Delivered by",
          value: "Muhammad Hashim · AI Engineer, Coderzon",
        },
      ],
      image: {
        src: "/images/vr-robotic-surgery-assistant-header.jpg",
        width: 1448,
        height: 1086,
        alt: "A robotic figure wearing a VR headset studies a luminous full-body anatomical model. Around it float panels showing brain, heart, kidney, lung, stomach, skin and joint detail, each linked back to the model, with data streaming between the panels and the headset.",
      },
    },

    challenge: {
      eyebrow: "The opportunity",
      heading: "Reducing cognitive load in complex surgical workflows",
      intro:
        "Modern robotic procedures generate rich streams of visual, procedural and operational information. This concept organises that information into an immersive assistant that can understand context, retrieve relevant knowledge and coordinate approved actions while keeping clinicians in control.",
      points: [
        {
          title: "Information overload",
          body: "Relevant procedural information may be distributed across multiple applications and screens.",
        },
        {
          title: "Fragmented context",
          body: "Imaging, surgical plans, device status and reference information can be difficult to combine.",
        },
        {
          title: "Workflow complexity",
          body: "Teams coordinate multiple tasks, checkpoints, instruments and documentation steps.",
        },
        {
          title: "Need for human control",
          body: "AI assistance must remain explainable, auditable and subject to clinician approval.",
        },
      ],
    },

    principles: {
      eyebrow: "Design principles",
      heading: "The rules the system is held to",
      intro:
        "Four constraints set before the architecture, not derived from it. Everything downstream — the orchestration layer, the approval gates, the audit trail — exists to satisfy one of them.",
      points: [
        {
          title: "Assist, don't replace",
          body: "AI recommendations are presented to qualified clinicians for review.",
        },
        {
          title: "Context first",
          body: "The agent uses approved case context and trusted knowledge sources.",
        },
        {
          title: "Traceable actions",
          body: "Recommendations and system actions can be logged for audit and review.",
        },
        {
          title: "Fail-safe operation",
          body: "Uncertainty or faults trigger escalation rather than autonomous action.",
        },
      ],
    },

    valueChain: {
      eyebrow: "Agentic workflow",
      heading: "A controlled reasoning loop for surgical assistance",
      intro:
        "The assistant interprets approved inputs, identifies workflow context, retrieves relevant information and proposes next actions. Safety policies and human approval gates remain part of the workflow.",
      stages: [
        {
          name: "Sense",
          sub: "Receive approved visual, procedural and device context.",
          items: [],
        },
        {
          name: "Understand",
          sub: "Build a structured representation of the current workflow.",
          items: [],
        },
        {
          name: "Retrieve",
          sub: "Fetch relevant approved knowledge and reference information.",
          items: [],
        },
        {
          name: "Reason",
          sub: "Evaluate context against policies and workflow rules.",
          items: [],
        },
        {
          name: "Recommend",
          sub: "Present an explainable recommendation or overlay.",
          items: [],
        },
        {
          name: "Validate",
          sub: "Check confidence, constraints and approval requirements.",
          items: [],
        },
        {
          name: "Act or escalate",
          sub: "Execute only approved non-critical actions, or escalate uncertainty.",
          items: [],
        },
      ],
      platform: {
        label: "Human-in-the-loop safety gate",
        items: [
          "No autonomous critical surgical decision-making",
          "Recommendations require appropriate clinical review",
          "System authorization required before any action",
          "Uncertainty escalates rather than proceeds",
        ],
      },
    },

    architecture: {
      eyebrow: "Agentic AI architecture",
      heading: "From surgical context to supervised AI assistance",
      intro:
        "Approved inputs enter a single orchestration layer that holds context, retrieves knowledge, routes tools and enforces policy — and everything it produces leaves through an interface a clinician controls.",
      columns: [
        {
          accent: "source",
          head: "Approved inputs",
          sub: "Secure, consented, and nothing beyond them",
          groups: [
            { items: ["Medical imaging — CT, MRI and 3D models"] },
            { items: ["Procedure data — case plan and workflow"] },
            { items: ["Device data — robotic telemetry"] },
            { items: ["Knowledge — approved reference sources"] },
          ],
        },
        {
          accent: "control",
          head: "Agentic orchestration",
          sub: "Context · Plan · Retrieve · Reason · Recommend · Validate · Escalate",
          groups: [
            { items: ["Context engine"] },
            { items: ["RAG over approved knowledge"] },
            { items: ["Tool router"] },
            { items: ["Policy guardrails"] },
            { items: ["Audit log"] },
          ],
        },
        {
          accent: "serve",
          head: "Experience & integration",
          sub: "Where a clinician meets it",
          groups: [
            {
              items: [
                "VR experience — 3D surgical scene with contextual overlays",
              ],
            },
            {
              items: [
                "Clinician console — recommendation approval and rejection",
              ],
            },
            { items: ["Analytics — events, logs and performance"] },
            { items: ["Integration — approved APIs and systems"] },
          ],
        },
      ],
      crossCutting: [
        {
          title: "Governance controls",
          sub: "Across every layer",
          items: [
            "RBAC",
            "Encryption",
            "Model monitoring",
            "Tool audit",
            "Data lineage",
            "Incident logging",
          ],
        },
        {
          title: "Safety posture",
          sub: "What the system does when unsure",
          items: [
            "Confidence thresholds",
            "Human approval gates",
            "Escalation over autonomy",
            "Source traceability on every retrieval",
          ],
        },
      ],
    },

    capabilities: [
      {
        eyebrow: "The assistant in use",
        heading: "A spatial interface, and a governed one",
        blocks: [
          {
            accent: "ingest",
            title: "Immersive VR experience",
            sub: "The assistant control panel",
            items: [
              "Context summary — procedure stage, anatomy model and active workflow",
              "Visual overlays — anatomy labels and selected regions",
              "Knowledge retrieval — approved references and procedural guidance",
              "Task coordination — checklists and documentation prompts",
              "Explainability — why the recommendation was generated",
              "Approval controls — accept, reject, or request more information",
            ],
          },
          {
            accent: "plat",
            title: "AI operations & monitoring",
            sub: "Enterprise visibility for a governed system",
            items: [
              "Session and recommendation event capture",
              "Model monitoring across confidence and drift",
              "Audit and safety event trail, reviewable after the fact",
              "Source traces recorded on every knowledge retrieval",
              "Escalations surfaced rather than absorbed",
              "Incident logging and post-hoc review",
            ],
          },
        ],
      },
    ],

    implementation: {
      eyebrow: "Technical implementation",
      heading: "Built as a modular, governed AI platform",
      layers: [
        {
          accent: "source",
          title: "Input & integration",
          items: [
            "Imaging metadata",
            "Procedure plans",
            "Device telemetry",
            "Approved enterprise systems",
          ],
        },
        {
          accent: "control",
          title: "AI / agent layer",
          items: [
            "LLM / multimodal reasoning",
            "RAG",
            "Orchestration",
            "Tool calling",
            "Workflow state",
          ],
        },
        {
          accent: "gold",
          title: "Safety & governance",
          items: [
            "Policy engine",
            "Confidence thresholds",
            "RBAC",
            "Audit logs",
            "Human approval gates",
          ],
        },
        {
          accent: "ingest",
          title: "Immersive experience",
          items: [
            "VR scene",
            "Spatial overlays",
            "Contextual assistant",
            "Clinician control panel",
          ],
        },
        {
          accent: "serve",
          title: "Data & observability",
          items: [
            "Event store",
            "Session analytics",
            "Model monitoring",
            "Traceability",
            "Performance metrics",
          ],
        },
      ],
    },

    outcomes: {
      eyebrow: "Expected value",
      heading: "What a system like this is for",
      items: [
        "Better situational awareness — immersive, contextual information",
        "Workflow efficiency — assistance with repetitive coordination",
        "Traceable AI — recommendations and approvals are auditable",
        "Scalable foundation — modular architecture for future integrations",
      ],
    },

    close: {
      heading: "Intelligent assistance. Human-led surgery.",
      body: "The VR Robotic Surgery Assistant demonstrates how agentic AI, immersive interfaces and governed architecture can work together to support complex surgical workflows without replacing clinical judgment.",
      credit: {
        label: "Delivered by",
        name: "Muhammad Hashim",
        role: "AI Engineer · Coderzon Technologies Pvt. Ltd.",
      },
    },
  },
};
