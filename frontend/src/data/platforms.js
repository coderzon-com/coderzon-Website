/**
 * Products and platforms Coderzon implements.
 *
 * `slug` drives the /platforms/[slug] route. Optional sections
 * (useCases, realTimeAnalytics, ...) are null when a platform does not use them.
 */
export const platforms = [
  {
    slug: "Microsoft-BI",
    title: "Microsoft Power BI Consulting Services : From data to actions",
    shortTitle: "Microsoft Power BI Consulting Services",
    navLabel: "Microsoft BI",
    intro:
      "Today, few businesses can complain about the shortage of data. But just having it is not enough to drive decisions. There’s a sustainable way to empower your business with critical insights – make data truly awesome with Microsoft Business Intelligence Consulting. Our BI experts address the challenges of the Power BI deployment, customization, and post-implementation support to transform raw data into rich visuals.",
    overview: {
      heading: "From Data to Actions: Unleashing Power BI’s Full Potential",
      body: "Whether you’re evaluating business needs, planning to get started with Power BI, or looking to revamp an existing solution, our consulting services guide you every step of the way. We enable seamless integration, design optimal architectures, and deliver tailored visualizations to make data analysis actionable and business-driven.",
    },
    highlight: {
      heading: "Why Power BI Consulting Matters",
      body: "Power BI transforms how you interact with data — moving beyond basic dashboards to a comprehensive BI ecosystem. From predictive analytics and real-time insights to cross-platform integrations, we turn your BI investment into a strategic asset. Whether it's connecting ERP, CRM, or HRMS systems, we help unify your enterprise data.",
      points: [
        "Power BI Implementation and Deployment",
        "Custom Dashboards and Visualization",
        "ETL/ELT Design and Data Modeling",
        "Cloud & On-Premises Integration",
        "Real-Time Reporting and Analytics",
        "Power BI Embedded and Mobile BI Setup",
      ],
    },
    value: {
      heading: "Secure, Scalable, and Strategic Analytics",
      body: "Security and scalability are at the heart of our solutions. With row-level security, data encryption, and permission controls, we protect your data while enhancing usability. From mobile accessibility to embedded analytics, we ensure you can access insights wherever and whenever you need them.",
      extra:
        "To elevate your analytics capabilities further, we integrate Power BI with Azure Synapse, Data Factory, Databricks, and Azure ML. This allows for streaming data, advanced machine learning, and robust data pipelines that unlock end-to-end BI value. Our solutions support agile scaling, predictive insights, and operational efficiency.",
    },
    workflow: {
      heading: "Our Power BI Consulting Workflow",
      steps: [
        {
          title: "Discovery & Planning",
          items: [
            "Business requirements gathering and stakeholder interviews",
            "Existing infrastructure and data ecosystem audit",
            "Use case identification and prioritization",
            "Strategic roadmap definition",
          ],
        },
        {
          title: "Architecture Design & Integration",
          items: [
            "Data source connection and extraction",
            "ETL/ELT pipeline development with Data Factory",
            "Data lake and warehouse configuration",
            "Integration with Azure services and enterprise apps",
          ],
        },
        {
          title: "Development & Customization",
          items: [
            "Dashboard and report creation",
            "Custom visual development",
            "Data modeling and DAX optimization",
            "Role-based access configuration",
          ],
        },
        {
          title: "Deployment & Training",
          items: [
            "Power BI Service and Gateway setup",
            "Mobile access configuration (iOS & Android)",
            "User training and documentation handover",
            "Power BI Embedded setup (if required)",
          ],
        },
        {
          title: "Monitoring & Continuous Improvement",
          items: [
            "Regular system health checks and upgrades",
            "Model optimization and report performance tuning",
            "User feedback loop integration",
            "Ongoing support, compliance & scalability reviews",
          ],
        },
      ],
    },
    useCases: {
      ERP: [
        "Finance and supply chain visibility",
        "Inventory and production tracking",
        "Operational analytics and forecasting",
      ],
      CRM: [
        "Sales and marketing KPIs",
        "Customer engagement insights",
        "Opportunity trend and revenue reports",
      ],
      HRMS: [
        "Employee productivity and engagement tracking",
        "Hiring performance and turnover insights",
        "Training and retention program analytics",
      ],
    },
    mobileAndEmbedded: {
      mobile:
        "Power BI mobile setup for iOS and Android enables real-time, on-the-go data access and collaboration with 360-degree visibility from any device.",
      embedded:
        "Power BI Embedded delivers secure, interactive dashboards within your existing business applications—eliminating per-user licensing while simplifying analytics delivery.",
    },
    predictiveAnalytics: {
      capabilities: [
        "Forecasting and what-if analysis",
        "Natural language query support",
        "Custom machine learning model integration via Azure ML",
      ],
      platforms: ["Azure ML", "Databricks", "Power BI Q&A"],
    },
    realTimeAnalytics: {
      description:
        "With Azure Stream Analytics, we enable true real-time dashboards that visualize data from IoT sensors and streaming sources without page refreshes or scheduled jobs.",
      components: [
        "Azure Stream Analytics",
        "IoT Hub and Devices",
        "Power BI Live Dashboards",
      ],
    },
    dataArchitecture: {
      dataTypes: [
        "Structured: SQL Databases, Excel, CSV",
        "Semi-Structured: JSON, XML, logs",
        "Unstructured: Video, audio, text",
        "Streaming: IoT, real-time sensor data",
      ],
      flow: [
        "Ingest: Event Hub, Data Factory",
        "Store: Data Lake Gen 2, Blob Storage, Synapse SQL",
        "Process: Databricks, Azure ML, Power Query",
        "Serve: Power BI",
      ],
    },
  },
  {
    slug: "Open-Source-BI",
    title: "Open-Source BI Platform Development",
    shortTitle: "Open-Source BI Platform Development",
    navLabel: "Open Source BI",
    intro:
      "Enjoy the freedom and flexibility of open-source BI software. We help get your startup or midsize business off the ground with no significant investment or vendor lock-in. Start small and build up your BI fast and at affordable costs.",
    overview: {
      heading:
        "Bringing the Best of Two Worlds: Custom BI Development Based on Open-Source Technology",
      body: "Own your end-to-end business intelligence journey with our bespoke BI solutions built for the unique challenges of your company at a reasonable cost. Our team of BI engineers will help you organize data, generate visualizations, and promote data literacy within a transparent code base.",
    },
    highlight: {
      heading: "Benefits of Open-Source BI at CoderZon",
      points: [
        "Affordable – license-free with minimal overhead costs",
        "Easy-to-modify – accessible code for seamless enhancements",
        "Highly compatible – integrates with any business system",
        "Trouble-free customization – fast scaling with no vendor delays",
        "Large talent pool – in-house developers can contribute",
        "Personalized – fine-tuned to your specific data and analytics needs",
      ],
    },
    value: {
      heading: "Choose a Trusted Partner for BI Success",
      body: "Our open-source BI approach offers flexibility, cost-effectiveness, and scalability to meet diverse data needs across your organization.",
      extra:
        "We offer software-agnostic BI development tailored to your enterprise. From API integrations and custom data sources to role-based dashboards and airtight security, we provide a complete BI transformation with full control and transparency.",
    },
    workflow: {
      heading: "Our Custom BI Development Process",
      steps: [
        {
          title: "Data Extraction",
          items: [
            "Gather data from existing sources and databases",
            "Unify disparate data for meaningful context",
          ],
        },
        {
          title: "Data Preparation",
          items: [
            "Set up ETL pipeline using Pentaho, Apache NiFi, Airbyte, Airflow",
            "Transform unstructured data into clean, analyzable format",
          ],
        },
        {
          title: "Data Repository Setup",
          items: [
            "Establish enterprise-grade data warehouses",
            "Set up data lakes for raw, granular data storage",
            "Ensure 24/7 availability and scalability",
          ],
        },
        {
          title: "Data Analysis and Visualization",
          items: [
            "Inject data into Qlik, Tableau, or custom platforms",
            "Use Redash, Metabase, Apache Superset, D3.js, echarts",
            "Tailor visualizations for actionable insights",
          ],
        },
      ],
    },
    useCases: {
      ERP: [
        "Enterprise data consolidation",
        "Finance, operations, and supply chain visibility",
      ],
      CRM: [
        "Sales pipeline analysis and campaign tracking",
        "Customer segmentation and engagement monitoring",
      ],
      HRMS: [
        "Employee performance analytics",
        "Workforce retention and hiring metrics",
      ],
    },
    mobileAndEmbedded: {
      mobile:
        "Cross-platform mobile access to analytics dashboards ensures real-time decision-making on the go with full BI visibility.",
      embedded:
        "Embed open-source dashboards into existing business systems to provide internal stakeholders with real-time, actionable insights without extra licensing costs.",
    },
    predictiveAnalytics: {
      capabilities: [
        "Data forecasting and what-if scenario modeling",
        "Natural language queries through customizable interfaces",
        "Integration with machine learning models and data science workflows",
      ],
      platforms: [
        "Redash with Python integration",
        "Apache Superset with ML plugins",
        "Metabase with embedded SQL/NoSQL engines",
      ],
    },
    realTimeAnalytics: {
      description:
        "Our open-source stack supports streaming analytics with zero-latency dashboards that reflect real-time data from sensors, APIs, and user interactions.",
      components: [
        "Apache Kafka or MQTT for ingestion",
        "NiFi for real-time data flow management",
        "Custom dashboards with WebSockets and Superset",
      ],
    },
    dataArchitecture: {
      dataTypes: [
        "Structured: PostgreSQL, MySQL, CSV",
        "Semi-Structured: JSON, XML",
        "Unstructured: PDFs, text logs, audio",
        "Streaming: IoT telemetry, app events",
      ],
      flow: [
        "Ingest: Apache NiFi, Airbyte",
        "Store: PostgreSQL, MongoDB, MinIO",
        "Process: Python, dbt, Apache Airflow",
        "Serve: Metabase, Superset, Redash",
      ],
    },
  },
  {
    slug: "Amazon-Web-Services",
    title: "AWS Cloud Consulting Services: Strategy, Migration, Optimization",
    shortTitle: "AWS Cloud Consulting Services",
    navLabel: "Amazon Web Services",
    intro:
      "Whatever AWS cloud initiatives you are considering, we will guide you from ideation to a fully shaped vision. As an experienced AWS cloud consulting provider, we cover a full spectrum of AWS cloud services for migration, development, and optimization. With our clients at the heart of all processes, our AWS consultants dive deep into your needs to devise a cloud computing strategy tailored to a tee.",
    overview: {
      heading: "Expert-Led AWS Strategy, Migration, and Modernization",
      body: "Moving to the cloud mandates solid cloud expertise paired with business analysis and security proficiency. Leveraging deep knowledge of AWS best practices, CoderZon helps you maximize your cloud strategy. Our advanced AWS cloud consulting provides a full suite of professional services that help you plan, audit, and optimize your AWS resources.",
    },
    highlight: {
      heading: "Comprehensive AWS Cloud Services",
      body: "From creating resilient AWS cloud strategies to cost optimization and full-scale migration, our AWS consultants are equipped to streamline your cloud transformation journey. We handle everything from infrastructure assessment to compliance auditing and security best practices.",
      points: [
        "Designing AWS Cloud Strategy and Architecture",
        "AWS Configuration and Security Compliance",
        "AWS Cost Optimization and Performance Tuning",
        "Cloud Migration and Modernization",
        "Serverless and Microservices-based Development",
        "AWS DevOps Automation and CI/CD Setup",
      ],
    },
    value: {
      heading: "Secure, Scalable, and Efficient Cloud Transformation",
      body: "With a decade of experience and a team of seasoned AWS architects, CoderZon crafts cloud environments that meet your unique business requirements. From risk-mitigated migrations to serverless architectures and scalable microservices, we ensure seamless adoption with high ROI and minimal downtime.",
      extra: "Our AWS Cloud Consulting Workflow",
    },
    workflow: {
      steps: [
        {
          title: "Evaluate",
          items: [
            "Collecting server inventory and dependencies",
            "Setting up AWS Migration Hub",
            "Stakeholder knowledge transfer",
            "TCO/ROI and resource assessment",
          ],
        },
        {
          title: "Plan",
          items: [
            "Workload prioritization",
            "Cloud KPI and performance baseline analysis",
            "Risk and compliance assessment",
            "Custom migration roadmap with release planning",
          ],
        },
        {
          title: "Move and Modernize",
          items: [
            "Application and database migration to AWS",
            "Downtime mitigation and Q&A testing",
            "Refactoring monolithic apps into microservices",
            "Managed cloud services for post-migration optimization",
          ],
        },
        {
          title: "AWS Development",
          items: [
            "Microservices and containerization",
            "Serverless architecture with AWS Lambda",
            "Security and performance monitoring",
            "Cloud-native CI/CD implementation",
          ],
        },
        {
          title: "Security and Compliance",
          items: [
            "Multi-layered security architecture",
            "Regulatory compliance (HIPAA, PCI DSS, FISMA)",
            "Automated monitoring and governance setup",
            "AWS-native and third-party security integrations",
          ],
        },
      ],
    },
    useCases: {
      CloudMigration: [
        "Reduce infrastructure costs via AWS regional migration",
        "Seamless transition between cloud providers",
        "Compliance-aligned hosting region selection",
      ],
      CloudOptimization: [
        "Right-size AWS instances and auto-scaling",
        "Cost visibility with real-time usage monitoring",
        "Eliminate underutilized or misconfigured resources",
      ],
      CloudDevelopment: [
        "Build and deploy microservices with Docker and ECS/EKS",
        "Implement Lambda-based serverless applications",
        "Develop cloud-native APIs with integrated security",
      ],
    },
    mobileAndEmbedded: {
      mobile:
        "Mobile-accessible cloud dashboards allow you to monitor AWS resources and metrics on-the-go via the AWS Console Mobile App or custom cloud-native interfaces.",
      embedded:
        "Embed secure AWS cloud monitoring dashboards directly into enterprise applications for unified operational visibility and reduced overhead.",
    },
    predictiveAnalytics: {
      capabilities: [
        "Real-time cloud health insights",
        "Predictive autoscaling recommendations",
        "ML model integrations for cost and load forecasting",
      ],
      platforms: ["Amazon SageMaker", "AWS CloudWatch", "AWS Cost Explorer"],
    },
    realTimeAnalytics: {
      description:
        "Through tools like AWS CloudWatch and Amazon Kinesis, CoderZon enables real-time monitoring and analytics for your AWS environment, ensuring proactive management and insights.",
      components: [
        "Amazon CloudWatch",
        "Amazon Kinesis Data Streams",
        "AWS Lambda for Real-time Processing",
      ],
    },
    dataArchitecture: {
      dataTypes: [
        "Structured: RDS, Aurora",
        "Semi-Structured: JSON, YAML",
        "Unstructured: S3 Object Storage",
        "Streaming: IoT Data, Real-time Logs",
      ],
      flow: [
        "Ingest: AWS DataSync, Kinesis",
        "Store: Amazon S3, Amazon Redshift",
        "Process: Lambda, Glue, EMR",
        "Serve: QuickSight, Custom APIs",
      ],
    },
  },
  {
    slug: "Microsoft-Azure",
    title: "Microsoft Azure Consulting Services",
    shortTitle: "Microsoft Azure Consulting Services",
    navLabel: "Microsoft Azure",
    intro:
      "Transform Azure capabilities into the business results you want. We are a team of seasoned Microsoft technology professionals delivering a wide scope of Azure consulting services to help you get the best of your cloud investment and drive cloud agility. CoderZon guides global companies through Azure platform adoption, deployment, and customization.",
    overview: {
      heading: "Three steps to Microsoft Azure cloud excellence",
      body: "Strategize: Our team enables you to create a holistic cloud strategy based on business needs, current capabilities, expected TCO, and ROI. Create a solution architecture tailored to your business requirements with optimal cloud tools and plans. Launch: We guide your first steps in the cloud by activating Azure accounts, configuring instances, setting security, and unifying infrastructure.",
    },
    highlight: {
      heading: "Azure-based development and migration",
      points: [
        "Over 15 years of experience with the Microsoft technology stack",
        "End-to-end cloud solutions from consulting to managed services",
        "Comprehensive Azure migration and development assistance",
        "Post-migration support and continuous improvement",
        "Azure-rich PaaS and integrable SaaS functionalities",
        "Tailored cloud architecture planning for scalability and performance",
      ],
    },
    value: {
      heading: "Microsoft Azure cloud managed services",
      body: "CoderZon helps modernize legacy apps or build cloud-native solutions using the full Azure ecosystem including Management, Governance, Storage, Security, DevOps, Analytics, and PaaS/SaaS products. For migration, we define a clear strategy, migrate iteratively from on-premises, and provide post-migration support with continuous improvement plans.",
      extra:
        "Our managed services save time and reduce operational costs by automating infrastructure management, deploying augmented teams, enhancing security, and ensuring compliance without full-time hiring commitments.",
    },
    workflow: {
      heading:
        "Azure Managed Services ensure stable, compliant, and efficient cloud operations.",
      steps: [
        {
          title: "Infrastructure Management",
          items: [
            "Setup, configuration, and monitoring of cloud environments",
            "Provisioning resources to maintain service levels and application stability",
          ],
        },
        {
          title: "Service Management",
          items: [
            "Managing deployments and hosted services",
            "Handling access control, troubleshooting, and monitoring",
          ],
        },
        {
          title: "Risk and Compliance",
          items: [
            "Maintaining regulatory standards like HIPAA, GDPR, ISO 27001, PCI DSS",
            "Daily security monitoring, access control, vulnerability detection",
          ],
        },
        {
          title: "Optimization and Cost Management",
          items: [
            "Auditing cloud resource consumption",
            "Creating actionable plans to reduce costs and optimize resource usage",
          ],
        },
        {
          title: "Protection and Disaster Recovery",
          items: [
            "Deploying and maintaining enterprise backup solutions",
            "Ensuring 24/7 monitoring and business continuity",
          ],
        },
        {
          title: "Automation",
          items: [
            "Setting up automated environments for deployments and patch management",
            "Reducing manual errors and operational costs through full-throttle automation",
          ],
        },
      ],
    },
    useCases: {
      ERP: [
        "Consolidation of enterprise cloud data and applications",
        "Improved finance, operations, and supply chain cloud visibility",
      ],
      CRM: [
        "Cloud-based sales pipeline and campaign analytics",
        "Customer segmentation and engagement through Azure services",
      ],
      HRMS: [
        "Cloud analytics for employee performance and retention",
        "Workforce metrics and hiring analysis leveraging Azure tools",
      ],
    },
    mobileAndEmbedded: {
      mobile:
        "Enable cross-platform mobile access to Azure dashboards and cloud management tools for real-time decision-making on the go.",
      embedded:
        "Integrate Azure cloud services and dashboards into existing business systems for seamless internal access without additional licensing.",
    },
    predictiveAnalytics: {
      capabilities: [
        "Advanced analytics leveraging Azure Analytics and AI services",
        "Integration with Azure Machine Learning and cognitive services",
        "Customizable analytics workflows with Azure Synapse and Power BI",
      ],
      platforms: [
        "Azure Synapse Analytics",
        "Azure Machine Learning Studio",
        "Power BI with embedded analytics",
      ],
    },
    realTimeAnalytics: {
      description:
        "Azure supports streaming and real-time analytics through services like Azure Event Hubs, Stream Analytics, and Event Grid, enabling instant insights from data streams and user interactions.",
      components: [
        "Azure Event Hubs for ingestion",
        "Azure Stream Analytics for real-time processing",
        "Power BI and custom dashboards for visualization",
      ],
    },
    dataArchitecture: {
      dataTypes: [
        "Structured: Azure SQL Database, Azure Data Warehouse",
        "Semi-Structured: Azure Cosmos DB, JSON, XML",
        "Unstructured: Blob Storage, Data Lakes",
        "Streaming: IoT Hub telemetry, Event Grid messages",
      ],
      flow: [
        "Ingest: Azure Data Factory, Event Hubs",
        "Store: Azure Blob Storage, Azure SQL, Cosmos DB",
        "Process: Azure Databricks, Synapse Analytics, Azure Functions",
        "Serve: Power BI, Azure Analysis Services, custom APIs",
      ],
    },
  },
  {
    slug: "Google-Cloud",
    title: "Google Cloud Consulting Services",
    shortTitle: "Google Cloud Consulting Services",
    navLabel: "Google Cloud",
    intro:
      "Unlock the full potential of Google Cloud with CoderZon. With over two decades of software development experience, we deliver robust Google Cloud solutions that ensure your applications are modern, secure, cost-effective, and always available. From strategy to execution, we support your cloud transformation end-to-end.",
    overview: {
      heading: "Your journey to Google Cloud success, simplified",
      body: "Strategize: We help you shape an adaptive, cost-efficient cloud plan aligned with your business priorities. Execute: Launch confidently with expert guidance on infrastructure setup, cloud-native development, and secure integration. Operate: Optimize performance, reduce risks, and scale seamlessly with 24/7 support and proactive management.",
    },
    highlight: {
      heading: "Google Cloud consulting and development",
      points: [
        "25+ years of engineering experience across major cloud technologies",
        "End-to-end Google Cloud consulting, migration, and development",
        "Ongoing performance, security, and cost optimization",
        "Custom-fit cloud strategies based on business goals",
        "Comprehensive post-deployment support",
      ],
    },
    value: {
      heading: "Managed Google Cloud services",
      body: "We design and build scalable, agile, and secure cloud architectures leveraging the latest Google Cloud services. Whether you're modernizing legacy systems or launching new cloud-native products, we ensure smooth transitions and optimized operations.",
      extra:
        "Our managed services reduce operational overhead while enhancing cloud performance, compliance, and security. We monitor, troubleshoot, and continuously improve your environment, freeing your team to focus on core business goals.",
    },
    workflow: {
      heading:
        "Maintain stable, scalable, and secure cloud operations with expert-managed Google Cloud services.",
      steps: [
        {
          title: "Cloud Strategy and Migration",
          items: [
            "Custom cloud strategies aligned with your business model",
            "Minimal-downtime data migration and syncing",
            "Access to scalable, enterprise-grade Google Cloud infrastructure",
          ],
        },
        {
          title: "Operational Agility",
          items: [
            "On-demand resource scaling",
            "Secure, fast data access",
            "Business continuity with rapid disaster recovery",
          ],
        },
        {
          title: "Cloud Optimization",
          items: [
            "Comprehensive performance and usage monitoring",
            "Cost and resource optimization",
            "Bottleneck identification and resolution",
          ],
        },
        {
          title: "Cloud-Native Development",
          items: [
            "Accelerated go-to-market with serverless and containers",
            "Microservices architecture with open-source flexibility",
            "Real-time deployment governance and policy checks",
          ],
        },
        {
          title: "Data Storage and Analytics",
          items: [
            "Modernized data lakes and warehouses",
            "Cloud-native, scalable storage architecture",
            "Accelerated data insights and analytics",
          ],
        },
        {
          title: "AI and Machine Learning",
          items: [
            "Pre-built and custom AI/ML solutions",
            "Smarter business decisions with data intelligence",
            "Optimized ML performance with scalable infrastructure",
          ],
        },
      ],
    },
    useCases: {
      DigitalProductEngineering: [
        "Agile, full-cycle development for modern product needs",
        "Complex architecture handled with reliability and speed",
      ],
      SaaSDevelopment: [
        "Scalable and secure cloud-native SaaS solutions",
        "Elastic infrastructure for rapid growth",
      ],
      MVPDevelopment: [
        "Quick MVP builds to validate ideas",
        "Cost-effective prototypes ready for market testing",
      ],
    },
    mobileAndEmbedded: {
      mobile:
        "Cross-platform mobile access to manage and monitor Google Cloud environments on the go.",
      embedded:
        "Native integration of cloud services into enterprise systems for enhanced business workflows.",
    },
    predictiveAnalytics: {
      capabilities: [
        "AI-powered forecasting and predictive modeling",
        "Custom machine learning integrations",
        "Advanced insights using Google Cloud’s data tools",
      ],
      platforms: ["Google Cloud AI Platform", "BigQuery ML", "Vertex AI"],
    },
    realTimeAnalytics: {
      description:
        "Get instant insights from live data using Google Cloud’s real-time analytics tools. Streamline decisions and responses with real-time dashboards and data processing.",
      components: [
        "Pub/Sub for live data ingestion",
        "Dataflow for stream processing",
        "BigQuery for analytics and dashboards",
      ],
    },
    dataArchitecture: {
      dataTypes: [
        "Structured: BigQuery, Cloud SQL",
        "Semi-Structured: Firestore, JSON",
        "Unstructured: Cloud Storage, Data Lakes",
        "Streaming: Pub/Sub, IoT Core",
      ],
      flow: [
        "Ingest: Pub/Sub, Dataflow",
        "Store: Cloud Storage, BigQuery",
        "Process: Dataproc, Dataflow, AI Platform",
        "Serve: Looker, Data Studio, custom dashboards",
      ],
    },
  },
  {
    slug: "Microsoft-Fabric",
    navLabel: "Microsoft Fabric",
    shortTitle: "Microsoft Fabric Consulting Services",
    title:
      "Microsoft Fabric Consulting: One Platform for the Whole Data Estate",
    intro:
      "Fabric puts ingestion, the lakehouse, the warehouse, orchestration and Power BI behind a single billing model and a single security boundary. For a business already committed to Microsoft, that removes most of the integration work a data platform usually demands \u2014 and introduces a set of choices about capacity and workspace design that are expensive to get wrong.",
    overview: {
      heading: "OneLake, and what it changes",
      body: "Fabric's shortcut model means data can be queried where it lives instead of being copied into each engine that needs it. That is the single biggest saving available in a Microsoft data estate, and it is also the part most implementations miss \u2014 they lift and shift their existing copy-everywhere pipelines into Fabric and pay for the same duplication on a newer bill.",
    },
    highlight: {
      heading: "Where the money is actually spent",
      body: "Fabric bills by capacity, not by query, which changes how you design. Workloads that were fine on a per-query platform can saturate a capacity unit and throttle everything sharing it. We size capacity against real workload profiles and separate workspaces so that a heavy refresh cannot take reporting down with it.",
      points: [
        "Lakehouse and warehouse design, with a clear rule for which to use when",
        "OneLake shortcuts instead of duplicate copies",
        "Direct Lake semantic models for Power BI, avoiding import refresh windows",
        "Capacity sizing, monitoring and workspace separation",
        "Migration from existing Synapse, Data Factory or Power BI estates",
      ],
    },
    value: {
      heading: "Why Fabric, and when not",
      body: "Fabric is the right answer when the organisation is already on Microsoft 365 and Power BI, and wants one security model across the estate. It is the wrong answer when the workload is a single large warehouse with heavy concurrent SQL, where a dedicated warehouse still wins. We will tell you which case you are in.",
    },
    workflow: {
      heading: "How we work in it.",
      steps: [
        {
          title: "Assessment",
          items: [
            "Current estate: Synapse, Data Factory, Power BI, on-premises sources",
            "Workload profile and concurrency requirements",
            "Capacity sizing model and cost forecast",
            "Security and tenancy boundaries",
          ],
        },
        {
          title: "Platform Design",
          items: [
            "Workspace and domain structure",
            "Lakehouse and warehouse split",
            "OneLake shortcut strategy",
            "Semantic model approach: Direct Lake or import",
          ],
        },
        {
          title: "Build & Migration",
          items: [
            "Pipelines and dataflows",
            "Medallion layering with tested transformations",
            "Report migration and rewiring",
            "Parallel running against the existing estate",
          ],
        },
        {
          title: "Operate",
          items: [
            "Capacity monitoring and throttling alerts",
            "Refresh scheduling that respects the capacity",
            "Governance, lineage and endorsement",
            "Handover and training",
          ],
        },
      ],
    },
  },
  {
    slug: "snowflake",
    navLabel: "Snowflake",
    shortTitle: "Snowflake Data Platform Services",
    title:
      "Snowflake Consulting: Separate Storage, Separate Compute, Separate Bills",
    intro:
      "Snowflake's advantage is that storage and compute scale independently, so a heavy transformation does not slow down the analysts querying the same tables. Its risk is the same thing: it is trivially easy to leave warehouses running, clone datasets casually, and receive a bill nobody can attribute.",
    overview: {
      heading: "Warehouses sized to the work",
      body: "Most Snowflake overspend comes from a small number of habits: oversized warehouses left on, no auto-suspend, queries scanning far more than they need, and clones nobody deletes. We design warehouse tiers against real query patterns, set suspension aggressively, and put resource monitors in place before the first month's bill rather than after it.",
    },
    highlight: {
      heading: "What we build in it",
      body: "The platform is only half the job. The other half is the modelling and the governance around it \u2014 which roles can see what, how personal data is masked, and how a table's definition is agreed and versioned.",
      points: [
        "Warehouse tiering and auto-suspend policy, with resource monitors",
        "Layered modelling: raw, staged, modelled, serving",
        "Role hierarchy and row-level or column-level masking",
        "Streams and tasks for incremental processing",
        "Zero-copy cloning used deliberately, with a lifecycle",
      ],
    },
    value: {
      heading: "Why teams pick it",
      body: "Snowflake suits organisations with mixed workloads and several teams querying the same data at once, because those teams can be given their own compute without copying the data. It is less compelling where the workload is small and steady, or where the estate is already committed to a single cloud's native stack.",
    },
    workflow: {
      heading: "How we work in it.",
      steps: [
        {
          title: "Assessment",
          items: [
            "Query and concurrency profile",
            "Current spend and where it is going",
            "Data sources, volumes and update patterns",
            "Governance and compliance obligations",
          ],
        },
        {
          title: "Account & Warehouse Design",
          items: [
            "Database, schema and role hierarchy",
            "Warehouse tiers matched to workload",
            "Auto-suspend, auto-resume and resource monitors",
            "Environment separation",
          ],
        },
        {
          title: "Modelling & Loading",
          items: [
            "Ingestion via Snowpipe or batch, with replay",
            "Layered models under version control",
            "Streams and tasks for incremental work",
            "Tests on the tables that matter",
          ],
        },
        {
          title: "Operate",
          items: [
            "Cost attribution by team and workload",
            "Query performance review and pruning",
            "Access review cadence",
            "Documentation and handover",
          ],
        },
      ],
    },
  },
  {
    slug: "google-bigquery",
    navLabel: "BigQuery",
    shortTitle: "Google BigQuery Warehouse Services",
    title: "BigQuery Consulting: Serverless Analytics, Priced by the Byte",
    intro:
      "BigQuery removes the warehouse-sizing question entirely \u2014 there is no cluster to provision. What it introduces instead is a pricing model where a careless query can scan a terabyte and a well-partitioned one can scan a gigabyte for the same answer. Design decisions show up directly on the bill.",
    overview: {
      heading: "Partitioning is the whole game",
      body: "The difference between an expensive BigQuery estate and a cheap one is almost entirely partitioning, clustering, and whether queries filter on the partition column. We design tables around how they will actually be queried, and put the controls in place \u2014 custom quotas, required partition filters \u2014 that stop an ad-hoc query becoming an incident.",
    },
    highlight: {
      heading: "Beyond the warehouse",
      body: "BigQuery sits inside a wider Google Cloud estate, and the integrations are usually where the value is: streaming in through Pub/Sub and Dataflow, serving out to Looker, and running models without moving the data.",
      points: [
        "Partitioning and clustering designed against real query patterns",
        "Required partition filters and per-user quotas",
        "Streaming ingestion through Pub/Sub and Dataflow",
        "Scheduled queries and materialised views where they pay",
        "BigQuery ML where a model belongs next to the data",
      ],
    },
    value: {
      heading: "Why teams pick it",
      body: "BigQuery suits bursty, unpredictable analytical workloads and teams who do not want to run infrastructure. It suits steady heavy workloads less well, where flat-rate or a provisioned warehouse can be cheaper \u2014 and we will model both before recommending either.",
    },
    workflow: {
      heading: "How we work in it.",
      steps: [
        {
          title: "Assessment",
          items: [
            "Query patterns, volumes and burst profile",
            "Current spend, broken down by table and user",
            "Source systems and ingestion latency needs",
            "Residency and access requirements",
          ],
        },
        {
          title: "Dataset & Table Design",
          items: [
            "Partitioning and clustering strategy",
            "Dataset layout and access boundaries",
            "Required partition filters and quotas",
            "Cost model and forecast",
          ],
        },
        {
          title: "Pipelines",
          items: [
            "Batch and streaming ingestion",
            "Transformations under version control, with tests",
            "Scheduled queries and materialised views",
            "Orchestration and dependency management",
          ],
        },
        {
          title: "Operate",
          items: [
            "Per-query cost attribution",
            "Slot and quota monitoring",
            "Access review and audit logging",
            "Handover and training",
          ],
        },
      ],
    },
  },
  {
    slug: "amazon-redshift",
    navLabel: "Redshift",
    shortTitle: "Amazon Redshift Warehouse Services",
    title: "Amazon Redshift Consulting: The Warehouse Inside Your AWS Estate",
    intro:
      "Where the rest of the estate already runs on AWS, Redshift removes a lot of movement: it reads directly from S3, shares data across clusters without copying, and sits inside the same IAM model as everything else. The trade is that distribution and sort keys are decisions you make early and feel for years.",
    overview: {
      heading: "Distribution keys are not a detail",
      body: "Redshift performance is decided mostly by how data is distributed across nodes and how it is sorted within them. Get it right and joins happen locally; get it wrong and every query redistributes data across the network. We model this against the joins you actually run rather than the ones the schema implies.",
    },
    highlight: {
      heading: "Serverless or provisioned",
      body: "Redshift Serverless removes cluster management and suits variable workloads; provisioned still wins on sustained heavy use and reserved pricing. The right answer depends on your load profile, and it is worth measuring rather than assuming.",
      points: [
        "Distribution and sort key design against real join patterns",
        "Spectrum for querying S3 without loading it",
        "Data sharing across clusters instead of copies",
        "Workload management queues so reporting survives a heavy load",
        "Serverless or provisioned, chosen on measured load",
      ],
    },
    value: {
      heading: "Why teams pick it",
      body: "Redshift is the pragmatic choice when the data already lives in S3 and the organisation is committed to AWS, because it removes egress, duplication and a second identity model. It is less compelling as a standalone warehouse bought on its merits alone.",
    },
    workflow: {
      heading: "How we work in it.",
      steps: [
        {
          title: "Assessment",
          items: [
            "Existing AWS estate and where the data sits",
            "Join and query patterns",
            "Load profile: steady, bursty or seasonal",
            "Compliance and access boundaries",
          ],
        },
        {
          title: "Cluster & Schema Design",
          items: [
            "Serverless or provisioned, with the reasoning",
            "Distribution and sort key strategy",
            "Spectrum external tables where loading is unnecessary",
            "Workload management queues",
          ],
        },
        {
          title: "Build & Load",
          items: [
            "Ingestion from S3, streams and operational databases",
            "Layered modelling with tested transformations",
            "Data sharing rather than duplication",
            "Vacuum, analyse and maintenance scheduling",
          ],
        },
        {
          title: "Operate",
          items: [
            "Query monitoring and queue tuning",
            "Cost review and reserved capacity planning",
            "Access review and audit",
            "Handover and training",
          ],
        },
      ],
    },
  },
  {
    slug: "databricks",
    navLabel: "Databricks",
    shortTitle: "Databricks Lakehouse Consulting Services",
    title: "Databricks Consulting: Governed Data and ML on One Lakehouse",
    intro:
      "Databricks is where a data platform and a machine-learning platform stop being two systems. Delta tables, the features built on them, the models trained on those features and the predictions those models produce all sit under Unity Catalog — one permission model, one lineage graph. That is the reason to choose it, and the part most implementations leave switched off.",
    overview: {
      heading: "Unity Catalog is the point",
      body: "Plenty of teams run Databricks as a Spark cluster with notebooks on top, which is a fair way to spend a lot of money on something a warehouse already did. The value arrives when features, models and inference tables are governed alongside the data — because that is what makes a prediction explainable months later, and what makes a data quality problem traceable to the reports and models it touched.",
    },
    highlight: {
      heading: "Where ML projects on it actually fail",
      body: "Almost never on the modelling. They fail on features computed after the event they are meant to predict, on models nobody notices going stale, and on scores that land somewhere the business never opens. Each of those has a specific answer on this platform, and each is a decision made early or not at all.",
      points: [
        "Feature Views with point-in-time joins, so training cannot see the future",
        "MLflow tracking tied to the Delta version behind each run",
        "Champion/Challenger by alias, promoted on realised outcomes rather than offline metrics",
        "Lakehouse Monitoring over inference tables, with drift triggering retraining",
        "Asset Bundles in CI, so the platform is rebuildable from source",
        "Job compute over all-purpose, and batch over real-time unless latency is genuinely required",
      ],
    },
    value: {
      heading: "When Databricks, and when not",
      body: "It earns its cost when the same data has to serve analytics and machine learning under one governance model, or when the workload is genuinely large and Spark-shaped. It is the wrong answer for a reporting estate that a warehouse and a BI tool would serve at a fraction of the price. We will say so rather than sell you a lakehouse you do not need.",
    },
    workflow: {
      heading: "How we work in it.",
      steps: [
        {
          title: "Assessment",
          items: [
            "Existing estate, workloads and where governance currently stops",
            "Whether the problem is genuinely Spark-shaped",
            "Unity Catalog and workspace topology",
            "Cost model: job versus all-purpose, batch versus serving",
          ],
        },
        {
          title: "Platform Design",
          items: [
            "Catalog per environment, with dev, staging and production separated",
            "Medallion layering and table design",
            "Feature Views where features are shared across models",
            "Access control, lineage and audit expectations",
          ],
        },
        {
          title: "Build",
          items: [
            "Pipelines and tested transformations, versioned with the code",
            "Training pipelines logged to MLflow with data versions captured",
            "Deployment by alias, with a quality gate before promotion",
            "Asset Bundles promoted through environments in CI",
          ],
        },
        {
          title: "Operate",
          items: [
            "Inference profiling and drift metrics with alerting",
            "Automated retraining, manual promotion",
            "Cost monitoring against the original forecast",
            "Handover, documentation and training",
          ],
        },
      ],
    },
  },
  {
    slug: "azure-data-factory",
    navLabel: "Azure Data Factory",
    shortTitle: "Azure Data Factory Pipeline Services",
    title: "Azure Data Factory: Metadata-Driven Pipelines That Scale",
    intro:
      "Data Factory is the orchestrator underneath most Azure data estates. Built the usual way, it becomes one pipeline per source and a maintenance burden that grows with every request. Built as a metadata-driven framework, adding a new source is a config change — no new pipeline, no redeploy, no regression testing of the feeds that already work.",
    overview: {
      heading: "One pipeline, every source",
      body: "The pattern is a master pipeline that reads a metadata config and a single parameterised child pipeline that serves every object in it. Object names, schemas, load type, column mappings and watermarks live in configuration, not in code. It costs more to design and repays from the second source onward — and keeps repaying with every one after that.",
    },
    highlight: {
      heading: "What separates a framework from a pile of pipelines",
      body: "Most of the difficulty in ingestion is not moving rows. It is knowing what changed, coping with a source that will not hand over everything at once, and being certain a run that failed halfway did not quietly report success.",
      points: [
        "Metadata-driven master/child pattern, so onboarding a source is a config drop",
        "Incremental loads bounded by a watermark, with full loads still available",
        "Pagination for sources that cap rows per response, terminating on a short page",
        "Watermarks committed only after the final page, so a partial run is retried not skipped",
        "Credentials resolved from Key Vault at runtime, never stored in the pipeline",
        "Medallion layering in ADLS Gen2 and promotion through Azure DevOps",
      ],
    },
    value: {
      heading: "When Data Factory, and when not",
      body: "It is the right tool for orchestrating movement across an Azure estate, especially where sources are varied and governance matters. If the whole estate is already Fabric, Fabric pipelines remove a moving part; if the work is heavy transformation rather than movement, that belongs in Databricks or the warehouse rather than in ADF activities.",
    },
    workflow: {
      heading: "How we work in it.",
      steps: [
        {
          title: "Assessment",
          items: [
            "Source inventory: systems, owners, update cadence and access route",
            "Which sources support incremental extraction, and on what column",
            "Response limits, pagination behaviour and rate constraints",
            "Existing pipelines and what can be retired",
          ],
        },
        {
          title: "Framework Design",
          items: [
            "Metadata schema: object, target, load type, mapping, watermark",
            "Master and child pipeline split",
            "Linked services and datasets, fully parameterised",
            "Secrets, managed identity and network access",
          ],
        },
        {
          title: "Build",
          items: [
            "Landing to bronze, then merged onward on the business key",
            "Per-source page sizes tuned against real payloads",
            "Per-iteration logging, so a failure is diagnosable to the page",
            "Bundled and promoted through Dev, Test and Production",
          ],
        },
        {
          title: "Operate",
          items: [
            "Run monitoring with row counts per source and per page",
            "Retries on transient failures, alerts on the rest",
            "Onboarding new sources by configuration",
            "Cost review and schedule tuning",
          ],
        },
      ],
    },
  },
  {
    slug: "salesforce",
    navLabel: "Salesforce",
    shortTitle: "Salesforce Data Integration Services",
    title: "Salesforce Data Integration: CRM Data in the Warehouse",
    intro:
      "Salesforce is excellent at running a sales process and awkward to report across. The API limits what you can pull and how often, the object model is not shaped for analytics, and exports by hand stop being viable the moment anyone asks for the numbers weekly. This is the work of getting that data out reliably and into a warehouse the business can query.",
    overview: {
      heading: "Integration, not implementation",
      body: "We are not a Salesforce implementation partner and will not pretend otherwise — we do not configure your sales process or build Apex. What we do is move Salesforce data into a governed warehouse on a schedule, incrementally and traceably, so reporting stops depending on someone running an export.",
    },
    highlight: {
      heading: "What the work actually involves",
      body: "The connector is the easy part. The difficulty is doing it incrementally, staying inside API limits, and surviving schema changes without silently dropping fields.",
      points: [
        "Standard and custom objects, driven from configuration rather than one pipeline each",
        "Incremental extraction on LastModifiedDate, so only changes cross the wire",
        "Field selection and mapping held in config, so a schema change is an edit not a redeploy",
        "Merge on the business key, so a re-run updates rather than duplicates",
        "Credentials in Key Vault, resolved at runtime",
        "Landing preserved, so downstream fixes never require re-pulling from the API",
      ],
    },
    value: {
      heading: "What you get",
      body: "CRM data queryable in SQL alongside finance, product and support data — with the analytical load off the system your sales team is working in. Reporting stops competing with the CRM for capacity, and nobody has to raise a request to see last month's numbers.",
    },
    workflow: {
      heading: "How we work in it.",
      steps: [
        {
          title: "Scoping",
          items: [
            "Which objects and fields reporting genuinely needs",
            "Volumes, change rates and API limit headroom",
            "Refresh cadence the business actually requires",
            "Security and PII handling",
          ],
        },
        {
          title: "Design",
          items: [
            "Connection and authentication through the supported API",
            "Watermark column per object",
            "Target schema and business keys",
            "Mapping from technical field names to reportable columns",
          ],
        },
        {
          title: "Build",
          items: [
            "Configuration-driven extraction",
            "Landing, cleansing and merge into the warehouse",
            "Reconciliation against Salesforce record counts",
            "Release through the existing CI process",
          ],
        },
        {
          title: "Operate",
          items: [
            "Daily runs with row counts and failure alerting",
            "New objects onboarded by configuration",
            "Schema drift surfaced rather than swallowed",
            "Handover and documentation",
          ],
        },
      ],
    },
  },
  {
    slug: "sap",
    navLabel: "SAP",
    shortTitle: "SAP Data Integration Services",
    title: "SAP Data Integration: Getting Data Out of the ERP",
    intro:
      "SAP holds the operational heart of a business and is famously hard to get data out of. There is usually no direct database access, the OData services cap how much they will return in one response, and the tables are large enough that a nightly full extract is not an option. Every design decision here exists to work within those limits rather than against them.",
    overview: {
      heading: "The cap is the whole problem",
      body: "Ask an SAP OData service for a large result set and you will not get it. You will get a capped response, an error, or — worst of all — a truncated response that the pipeline reports as a success. A design that ignores this does not fail loudly; it produces confidently incomplete data that nobody questions until a number looks wrong.",
    },
    highlight: {
      heading: "How this is built",
      body: "Two mechanisms compose. A watermark decides what is in scope; a bounded loop decides how that scope is carried across. Neither alone is sufficient — a filter without paging still overruns the cap on a heavy day, and paging without a filter walks the entire entity every night.",
      points: [
        "Extraction through the supported OData service layer, not around it",
        "Incremental loads bounded by a change-date watermark",
        "A pagination loop that requests a page at a time and stops when the source runs dry",
        "Termination on a short page or an absent next link, never on a fixed iteration count",
        "Per-page row counts logged, so silent truncation is visible rather than assumed",
        "Merge on the business key, which makes a repeated row harmless",
      ],
    },
    value: {
      heading: "Integration, not implementation",
      body: "We are not an SAP implementation partner and do not configure your ERP. We move its data into a warehouse the business can report on, without adding analytical load to a live operational system, and without anyone needing an SAP licence to look at a number.",
    },
    workflow: {
      heading: "How we work in it.",
      steps: [
        {
          title: "Scoping",
          items: [
            "Which entities reporting needs, and which fields within them",
            "Available OData services and authorisation model",
            "Response caps, page sizes and gateway load tolerance",
            "Change-date columns available per entity",
          ],
        },
        {
          title: "Design",
          items: [
            "Metadata configuration per entity, including page size",
            "Watermark strategy and full-load fallback",
            "Field projection, so only required fields cross the wire",
            "Target schema and business keys",
          ],
        },
        {
          title: "Build",
          items: [
            "Bounded pagination with a safety ceiling",
            "Each page landed before the next is requested",
            "Watermark advanced only after the final page commits",
            "Deduplication on the business key at the cleansing layer",
          ],
        },
        {
          title: "Operate",
          items: [
            "Iteration counts monitored, not just run-level totals",
            "Retries on transient gateway failures",
            "Page sizes tuned per entity against real payloads",
            "New entities onboarded by configuration",
          ],
        },
      ],
    },
  },
];

/** Look up a single platform by its URL slug. */
export function getPlatformBySlug(slug) {
  return platforms.find((platform) => platform.slug === slug) ?? null;
}
