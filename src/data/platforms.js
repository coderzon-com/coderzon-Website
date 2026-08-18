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
    slug: "shopify",
    title: "Shopify Development Company",
    shortTitle: "Shopify Development Company",
    navLabel: "Shopify",
    intro:
      "On a mission to grow your ecommerce business? Our Shopify development company delivers revenue-generating, growth-focused shopping experiences — from first click to checkout — to elevate your entire customer journey.",
    overview: {
      heading: "Let CoderZon grow your ecommerce business with Shopify",
      body: "Our Shopify experts build high-performance, brand-aligned online stores, empowering merchants to scale with end-to-end ecommerce solutions. We streamline store setup, customization, integrations, and optimizations to enhance user experience, boost conversions, and drive sustained growth.",
    },
    highlight: {
      heading: "Shopify Development Services",
      points: [
        "45% increase in online sales through UX improvements",
        "60% faster site loading via technical optimization",
        "70% organic traffic boost using SEO best practices",
        "35% higher conversion with checkout streamlining",
        "3x more sales using AR virtual try-ons",
        "30% inventory cost reduction with stock optimization",
      ],
    },
    value: {
      heading: "How CoderZon delivers Shopify success",
      body: "We provide comprehensive Shopify ecommerce development services including store setup, theme customization, custom app development, third-party integrations, migration, marketing automation, analytics, and ongoing support.",
      extra:
        "From design to data and performance to personalization, we ensure every element of your Shopify ecosystem works in harmony to meet your goals.",
    },
    workflow: {
      heading:
        "Explore our Shopify ecommerce capabilities tailored to your business",
      steps: [
        {
          title: "Store Setup & Custom Development",
          items: [
            "Custom Shopify store creation and configuration",
            "Theme selection, branding, and UX optimization",
            "Payment, checkout, shipping setup and SEO basics",
            "Custom Shopify app and feature development",
          ],
        },
        {
          title: "Performance & Optimization",
          items: [
            "Lazy loading, image compression, and cart optimization",
            "Code audit and device compatibility improvements",
            "Faster page speeds and improved mobile UX",
          ],
        },
        {
          title: "Migration to Shopify",
          items: [
            "Seamless transition from platforms like Magento, WooCommerce, Wix, and others",
            "Zero data loss and minimal downtime",
            "Full product, customer, and order migration",
          ],
        },
        {
          title: "Data Analytics & Reporting",
          items: [
            "Customer behavior analysis and segmentation",
            "Custom dashboard creation and conversion tracking",
            "Integration with analytics platforms like Google Analytics and Geckoboard",
          ],
        },
        {
          title: "Third-Party Integrations",
          items: [
            "Connect Shopify with payment gateways like PayPal, Stripe, Square",
            "ERP/CRM systems, inventory tools, and warehouse software",
            "Marketing and SEO tools such as Hubspot, Semrush, Tidio",
          ],
        },
        {
          title: "Marketing Automation",
          items: [
            "Email automation with Mailchimp, SendGrid, Hubspot",
            "Personalized campaigns via segmentation tools",
            "Loyalty and SEO automation with minimal manual effort",
          ],
        },
      ],
    },
    useCases: {
      DigitalProductEngineering: [
        "Build and scale robust Shopify-powered storefronts",
        "End-to-end ecommerce product lifecycle support",
      ],
      SaaSDevelopment: [
        "Custom SaaS apps and modules on Shopify",
        "Secure, cloud-native Shopify integrations",
      ],
      MVPDevelopment: [
        "Rapid Shopify store prototyping and go-to-market",
        "Cost-effective development of proof of concept features",
      ],
    },
    mobileAndEmbedded: {
      mobile:
        "Mobile-optimized and responsive Shopify themes and storefronts for seamless user experience on all devices.",
      embedded:
        "Custom APIs and integrations embed Shopify features into your business systems and workflows.",
    },
    predictiveAnalytics: {
      capabilities: [
        "Customer behavior prediction and journey insights",
        "Sales forecasting and inventory optimization",
        "Advanced ecommerce performance tracking",
      ],
      platforms: [
        "Google Analytics",
        "Geckoboard",
        "Custom Shopify dashboards",
      ],
    },
    realTimeAnalytics: {
      description:
        "Enable real-time sales tracking, order status, and customer engagement insights by integrating Shopify with live reporting and alerting systems.",
      components: [
        "Shopify Analytics and Admin APIs",
        "Google Analytics for real-time behavior data",
        "Integrated dashboards and custom alerts",
      ],
    },
    dataArchitecture: {
      dataTypes: [
        "Structured: Customer profiles, orders, transactions",
        "Semi-Structured: Product data, reviews, tags",
        "Unstructured: Images, social media content",
        "Streaming: Live inventory updates, sales feeds",
      ],
      flow: [
        "Ingest: Shopify APIs, third-party connectors",
        "Store: Shopify data store, custom databases",
        "Process: Data analytics tools, automation scripts",
        "Serve: Reports, dashboards, marketing tools",
      ],
    },
  },
  {
    slug: "WordPress",
    title: "WordPress Outsourcing Services",
    shortTitle: "WordPress Outsourcing Services",
    navLabel: "WordPress",
    intro:
      "Looking to build a robust and scalable online presence? Our WordPress outsourcing services help your website grow in sync with your evolving business goals.",
    overview: {
      heading: "Let CoderZon elevate your website with WordPress",
      body: "CoderZon WordPress experts deliver high-performance websites with scalable architectures, fast delivery, and optimized costs. From online marketplaces to corporate websites and educational platforms — we empower you with tailored WordPress solutions.",
    },
    highlight: {
      heading: "WordPress Development Services",
      points: [
        "Faster time-to-market with agile delivery",
        "Reduced development cost via optimized outsourcing",
        "Information security ensured across all project phases",
        "High-quality, scalable architecture implementation",
        "Flexible team scaling based on business needs",
        "Full website functionality powered by WooCommerce and plugins",
      ],
    },
    value: {
      heading: "How CoderZon delivers WordPress excellence",
      body: "We offer full-cycle WordPress development services including custom theme and plugin development, third-party integrations, performance optimization, website migration, and ongoing support.",
      extra:
        "From migration to customization and maintenance, we ensure your WordPress solution is tailored to your exact requirements and optimized for performance.",
    },
    workflow: {
      heading:
        "Explore our WordPress capabilities crafted to support your long-term digital growth",
      steps: [
        {
          title: "Theme & Plugin Development",
          items: [
            "Custom WordPress theme design and development",
            "Optimization of existing themes for speed and performance",
            "Plugin customization and new plugin development",
            "Integration of necessary features without redundant code",
          ],
        },
        {
          title: "Performance & Optimization",
          items: [
            "Speed optimization by removing unnecessary components",
            "SEO best practices implementation",
            "Custom code for fast-loading pages and responsiveness",
          ],
        },
        {
          title: "Migration to WordPress",
          items: [
            "Seamless migration from builders like Wix or Tilda",
            "Design retention or redesign as per user preference",
            "Custom CMS implementation based on business needs",
          ],
        },
        {
          title: "Data Analytics & Reporting",
          items: [
            "Integration with analytics tools like Google Analytics",
            "Custom dashboard development for performance monitoring",
            "Behavior tracking and data reporting",
          ],
        },
        {
          title: "Third-Party Integrations",
          items: [
            "WooCommerce setup and enhancement",
            "Payment gateway and marketing tool integration",
            "CRM/ERP connections through plugins or custom solutions",
          ],
        },
        {
          title: "Maintenance & Support",
          items: [
            "Manual updates for custom themes/plugins",
            "Automatic backups and system stability",
            "24/7 helpdesk and admin training for internal teams",
          ],
        },
      ],
    },
    useCases: {
      DigitalProductEngineering: [
        "Develop scalable WordPress CMS and ecommerce sites",
        "Implement full product lifecycle support for websites",
      ],
      SaaSDevelopment: [
        "Build SaaS platforms integrated with WordPress",
        "Secure and customized WordPress functionality",
      ],
      MVPDevelopment: [
        "Launch MVPs using rapid WordPress prototyping",
        "Validate features with flexible theme/plugin development",
      ],
    },
    mobileAndEmbedded: {
      mobile:
        "Mobile-optimized and responsive WordPress themes for seamless experience across all devices.",
      embedded:
        "Custom APIs and plugin-based integrations to embed WordPress capabilities into your existing business systems.",
    },
    predictiveAnalytics: {
      capabilities: [
        "User behavior analysis and traffic segmentation",
        "Performance monitoring and conversion tracking",
        "Custom reporting on ecommerce and site usage",
      ],
      platforms: [
        "Google Analytics",
        "Custom WordPress dashboards",
        "Third-party plugin analytics tools",
      ],
    },
    realTimeAnalytics: {
      description:
        "Enable real-time tracking and insights with integrated analytics tools and custom dashboards tailored for WordPress.",
      components: [
        "Google Analytics real-time tracking",
        "WordPress admin and plugin APIs",
        "Custom notification and alerting dashboards",
      ],
    },
    dataArchitecture: {
      dataTypes: [
        "Structured: User accounts, orders, comments",
        "Semi-Structured: Post metadata, plugin settings",
        "Unstructured: Blog content, media files",
        "Streaming: Live user interactions, form submissions",
      ],
      flow: [
        "Ingest: WordPress APIs, plugin data collectors",
        "Store: MySQL databases, plugin data tables",
        "Process: PHP scripts, plugin logic, cron jobs",
        "Serve: WP Admin panels, frontend display, reports",
      ],
    },
  },
];

/** Look up a single platform by its URL slug. */
export function getPlatformBySlug(slug) {
  return platforms.find((platform) => platform.slug === slug) ?? null;
}
