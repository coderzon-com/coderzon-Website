/**
 * Case studies.
 *
 * Faithful ports of the standalone HTML pages written by the engineers who
 * built these systems. Their defining idea is two parallel vocabularies over
 * one architecture — PLAIN for a client reading it cold, TECHNICAL for an
 * engineer evaluating the design — and every node, drawer and prose block from
 * both survives here unedited. The only change is the affordance verb: the
 * originals said "click", which is wrong on a phone.
 *
 * The prose is trusted, hand-authored markup from this repository and is
 * rendered as HTML. It must never be sourced from user input or a CMS without
 * being sanitised first.
 *
 * Accent keys map to the palette in ACCENTS below; they carry meaning (which
 * layer a component belongs to), so they are data, not styling.
 *
 * Generated from the source pages rather than retyped, so nothing is lost in
 * transcription. Nothing here may assume a fixed shape: column node lists
 * differ between projects, and only one of the three carries a second
 * `workflow` board — the others have no view switch at all.
 */

/** Layer accents, taken from the original pages' dark palette. */
export const ACCENTS = {
  source: "#a78bfa",
  control: "#38bdf8",
  ingest: "#22d3ee",
  bronze: "#d98a3c",
  silver: "#9fb0c8",
  gold: "#eab308",
  serve: "#34d399",
  plat: "#f472b6",
};

export const projects = [
  {
    slug: "salesforce-azure-sql-pipeline",
    number: "01",
    discipline: "Data Engineering",
    serviceSlug: "data-engineering",
    name: "Automated Daily Sync: Salesforce → Azure SQL",
    cardName: "Salesforce → Azure SQL",
    cardSummary:
      "A metadata-driven Azure Data Factory framework moving 100,000+ Salesforce records into Azure SQL every day. Onboarding a new object is a config change, not a new pipeline.",
    chips: [
      "Azure Data Factory",
      "ADLS Gen2",
      "Azure SQL Database",
      "Azure Key Vault",
      "Azure DevOps CI/CD",
      "Medallion Architecture",
      "Salesforce API",
    ],
    platformSlugs: ["Microsoft-Azure"],
    header: {
      plain: {
        title: "Automated Daily Sync:",
        titleAccent: "Salesforce → Reporting Database",
        story:
          "Every day this system automatically checks Salesforce for anything <b>new or changed</b>, tidies it up, and files it into a database the business can run reports on. It only copies what actually changed — so it stays fast, cheap, and current. And when someone asks for a new type of record, <b>nobody has to build anything new</b>: it's a settings change, not a project.",
        hint: "Select any box to see what it does.",
        foot: "How it works · Project 01 · Select any block for detail",
      },
      tech: {
        title: "Metadata-Driven Ingestion:",
        titleAccent: "Salesforce → Azure SQL",
        story:
          "A configuration-driven <b>Azure Data Factory</b> framework moving hundreds of thousands of Salesforce records into Azure SQL daily. Object names, schemas, load type and column mappings live in metadata, driven by a <b>master/child pipeline</b> pattern over <b>medallion layers</b> in ADLS Gen2. Onboarding a new object is a config file drop — no new pipeline, no redeploy.",
        hint: "Select any component to see how it works.",
        foot: "Architecture overview · Project 01 · Select any block for detail",
      },
    },
    metrics: {
      plain: [
        ["100,000+", "Records handled daily"],
        ["Every day", "Runs automatically"],
        ["Zero", "Code changes to add data"],
        ["Only changes", "Copied each run"],
      ],
      tech: [
        ["~100K+/day", "Records synced"],
        ["Daily", "Refresh cadence"],
        ["0", "New pipelines per object"],
        ["Incremental", "Default load pattern"],
      ],
    },
    columns: [
      {
        accent: "source",
        nodes: ["sf", "link"],
        head: {
          plain: "Where the data starts",
          tech: "Source",
        },
        sub: {
          plain: "The CRM the sales team uses every day",
          tech: "System of record",
        },
        mini: {
          plain:
            "<b>Security:</b> the login is never stored inside the system — it's fetched from a secure vault each time.",
          tech: "<b>Auth:</b> credentials resolved at runtime from Key Vault — never stored in the pipeline.",
        },
      },
      {
        accent: "control",
        nodes: ["meta", "master", "foreach"],
        head: {
          plain: "The instruction sheet",
          tech: "Control Plane",
        },
        sub: {
          plain: "A settings file decides what gets copied — not code",
          tech: "Metadata decides everything",
        },
      },
      {
        accent: "ingest",
        nodes: ["child", "incr", "map"],
        head: {
          plain: "The daily copy job",
          tech: "Ingestion",
        },
        sub: {
          plain: "One reusable job that handles every record type",
          tech: "Salesforce child pipeline",
        },
      },
      {
        accent: "silver",
        nodes: ["bronze", "silver", "gold"],
        head: {
          plain: "Three clean-up stages",
          tech: "Medallion Layers",
        },
        sub: {
          plain: "Raw copy → cleaned up → ready for reporting",
          tech: "ADLS Gen2",
        },
      },
      {
        accent: "serve",
        nodes: ["sql", "consume"],
        head: {
          plain: "Where the business reads it",
          tech: "Serving",
        },
        sub: {
          plain: "One place to ask questions of the data",
          tech: "Consumption layer",
        },
        mini: {
          plain:
            "<b>Result:</b> answers come from a database in seconds — no more manual exports from Salesforce.",
          tech: "<b>Outcome:</b> CRM data is queryable in SQL — no API limits, no manual exports.",
        },
      },
    ],
    platform: {
      label: {
        plain: "Behind the scenes — and why it was built this way",
        tech: "Cross-cutting platform concerns",
      },
      nodes: ["kv", "devops", "obs", "why"],
    },
    components: {
      sf: {
        accent: "source",
        node: {
          plain: {
            t: "Salesforce",
            d: "Where the sales team records every customer, contact and deal",
            tag: "The source",
          },
          tech: {
            t: "Salesforce",
            d: "CRM objects — Account, Contact, Opportunity, custom objects",
            tag: "Source system",
          },
        },
        drawer: {
          plain: {
            k: "Where the data starts",
            t: "Salesforce",
            d: "The system the sales team works in every day — and the reason this project exists.",
          },
          tech: {
            k: "Source",
            t: "Salesforce",
            d: "The CRM system of record. Objects are pulled through the ADF Salesforce connector.",
          },
        },
        plain:
          "\n      <p class=\"lead\">Salesforce is excellent at <b>running</b> a sales process. It's far less good at <b>answering questions across</b> one — especially when the question spans years of history or needs to sit next to data from elsewhere.</p>\n      <h4>The problem</h4>\n      <ul>\n        <li>Getting real answers out means exporting spreadsheets by hand, every time</li>\n        <li>Salesforce <b>limits how much data you can pull per day</b>, so you can't just grab everything</li>\n        <li>Records get edited in place — yesterday's export is already out of date</li>\n      </ul>",
        body: "\n      <h4>What gets pulled</h4>\n      <ul>\n        <li>Standard objects — <b>Account, Contact, Lead, Opportunity</b> and related entities</li>\n        <li>Custom objects specific to the business process</li>\n        <li>Each object is one entry in the metadata config, not one new pipeline</li>\n      </ul>\n      <h4>Why it's a demanding source</h4>\n      <ul>\n        <li><b>API limits</b> — daily call caps make full reloads unviable at scale</li>\n        <li><b>Wide objects</b> — standard objects carry far more fields than are needed downstream</li>\n        <li><b>In-place updates</b> — records change rather than append, so the target must be merged, not stacked</li>\n      </ul>",
      },
      link: {
        accent: "source",
        node: {
          plain: {
            t: "The connection",
            d: "A secure link to Salesforce, set up once and reused",
            tag: "Set up once",
          },
          tech: {
            t: "Salesforce Linked Service",
            d: "ADF connector — SOQL generated at runtime from the metadata",
            tag: "Connection",
          },
        },
        drawer: {
          plain: {
            k: "Where the data starts",
            t: "The Connection",
            d: "One secure, reusable doorway into Salesforce.",
          },
          tech: {
            k: "Source",
            t: "Salesforce Linked Service",
            d: "The ADF connection to Salesforce — configured once, reused by every object.",
          },
        },
        plain:
          "\n      <p class=\"lead\">The connection to Salesforce is built <b>once</b>. Every record type that gets added later reuses the exact same doorway.</p>\n      <h4>Why that matters</h4>\n      <ul>\n        <li>The login details are pulled from a <b>secure vault</b> at the moment they're needed — never written into the system</li>\n        <li>When a password changes, it's updated in <b>one place</b> and everything keeps working</li>\n        <li>Adding a new record type needs <b>no new connection</b> and no new setup</li>\n      </ul>",
        body: "\n      <h4>How the connection is defined</h4>\n      <ul>\n        <li>A single ADF <b>linked service</b> using the Salesforce connector</li>\n        <li>Username, password and security token are <b>Key Vault references</b>, not stored values</li>\n        <li>One dataset, fully parameterised — object name passed in at runtime</li>\n      </ul>\n      <h4>Query generation</h4>\n      <ul>\n        <li><b>SOQL is built dynamically</b> from metadata: object name, selected columns, watermark filter</li>\n        <li>Nothing object-specific is baked into the connection or the dataset</li>\n      </ul>",
      },
      meta: {
        accent: "control",
        node: {
          plain: {
            t: "The instruction sheet",
            d: "A simple settings file listing what to copy and how",
            tag: "The key idea",
          },
          tech: {
            t: "Metadata Config",
            d: "Blob / ADLS Gen2 — object, schema, load type, mapping file, watermark",
            tag: "Single source of truth",
          },
        },
        drawer: {
          plain: {
            k: "The instruction sheet",
            t: "The Instruction Sheet",
            d: "The single most important idea in this project.",
          },
          tech: {
            k: "Control Plane",
            t: "Metadata Configuration",
            d: "Stored in Blob / ADLS Gen2. Every pipeline decision is read from here at runtime.",
          },
        },
        plain:
          '\n      <p class="lead">Instead of writing a separate program for every type of record, the system reads a <b>simple settings file</b> that tells it what to do.</p>\n      <h4>What the settings file says</h4>\n      <ul>\n        <li><b>Which record type</b> to copy — customers, deals, contacts</li>\n        <li><b>Where to put it</b> in the destination database</li>\n        <li><b>Everything, or just the changes?</b></li>\n        <li><b>Which field goes where</b> between the two systems</li>\n        <li><b>When it last ran</b>, so it knows where to pick up from</li>\n      </ul>\n      <div class="note"><b>Why this is the whole point:</b> when the business asks for a new type of data, nobody writes new software. Someone adds a few lines to a settings file. What would normally be a multi-week project becomes an afternoon.</div>',
        body: '\n      <h4>What the config carries</h4>\n      <ul>\n        <li><b>object_name</b> — the Salesforce object to pull</li>\n        <li><b>schema_name / table_name</b> — target schema and table in SQL</li>\n        <li><b>load_type</b> — <code>full</code> or <code>incremental</code></li>\n        <li><b>mapping_file</b> — pointer to the column mapping JSON</li>\n        <li><b>watermark column &amp; last-run value</b> — the incremental boundary</li>\n      </ul>\n      <h4>Shape</h4>\n      <pre class="code">{\n  <span class="k">"object_name"</span>: <span class="s">"Opportunity"</span>,\n  <span class="k">"schema_name"</span>: <span class="s">"sfdc"</span>,\n  <span class="k">"table_name"</span>: <span class="s">"Opportunity"</span>,\n  <span class="k">"load_type"</span>: <span class="s">"incremental"</span>,\n  <span class="k">"watermark_column"</span>: <span class="s">"LastModifiedDate"</span>,\n  <span class="k">"mapping_file"</span>: <span class="s">"maps/opportunity.json"</span>\n}</pre>\n      <div class="note"><b>The payoff:</b> onboarding a new object is a config drop and a pull request — no pipeline development, no regression testing of existing feeds.</div>',
      },
      master: {
        accent: "control",
        node: {
          plain: {
            t: "The controller",
            d: "Reads the instruction sheet and starts the day's work",
            tag: "Starts the run",
          },
          tech: {
            t: "Master Pipeline",
            d: "Reads the metadata and drives every object due to load",
            tag: "Orchestrator",
          },
        },
        drawer: {
          plain: {
            k: "The instruction sheet",
            t: "The Controller",
            d: "The part that wakes up each day and decides what needs doing.",
          },
          tech: {
            k: "Control Plane",
            t: "Master Pipeline",
            d: "The single entry point — reads metadata, decides what runs, drives the worker.",
          },
        },
        plain:
          '\n      <p class="lead">Think of it as a <b>shift supervisor</b>. It reads the instruction sheet, works out what\'s due today, and hands each item to the worker one at a time.</p>\n      <h4>What it does each run</h4>\n      <ul>\n        <li>Reads the settings file</li>\n        <li>Works out which record types are due</li>\n        <li>Hands each one to the worker, with its instructions attached</li>\n        <li>Keeps going if one item fails — <b>the rest of the day\'s work still completes</b></li>\n      </ul>\n      <div class="note">Because the supervisor\'s logic lives in one place, a change to how everything runs is made <b>once</b>, not repeated dozens of times.</div>',
        body: "\n      <h4>Execution flow</h4>\n      <ul>\n        <li><b>Lookup</b> — read the metadata config from Blob storage</li>\n        <li><b>Filter</b> — keep only objects marked active and due to run</li>\n        <li><b>ForEach</b> — iterate that list</li>\n        <li><b>Execute Pipeline</b> — invoke the child, passing every value as a parameter</li>\n      </ul>\n      <h4>Why a master/child split</h4>\n      <ul>\n        <li>Orchestration logic lives in <b>one place</b> and changes once</li>\n        <li>The child pipeline stays small, testable and independently deployable</li>\n        <li>A failure on one object doesn't stop the rest of the run</li>\n        <li>Parallelism and batch size are controlled centrally at the ForEach</li>\n      </ul>",
      },
      foreach: {
        accent: "control",
        node: {
          plain: {
            t: "One at a time",
            d: "Works through the list, handling each record type in turn",
            tag: "The hand-off",
          },
          tech: {
            t: "ForEach → Execute",
            d: "Iterates the object list, passes each config down as parameters",
            tag: "Dispatch",
          },
        },
        drawer: {
          plain: {
            k: "The instruction sheet",
            t: "One At A Time",
            d: "How the day's work list gets handed over, item by item.",
          },
          tech: {
            k: "Control Plane",
            t: "ForEach → Execute Pipeline",
            d: "The hand-off — one iteration per Salesforce object, each fully parameterised.",
          },
        },
        plain:
          '\n      <p class="lead">The list from the instruction sheet gets worked through <b>one item at a time</b> — customers, then contacts, then deals — each handed to the same worker with different instructions.</p>\n      <h4>Why this is deliberate</h4>\n      <ul>\n        <li>Several items can be handled <b>at once</b> to save time, but not so many that Salesforce starts refusing requests</li>\n        <li>If one record type has a problem, it\'s recorded and the rest <b>carry on</b></li>\n        <li>Adding an item to the list needs no change here at all</li>\n      </ul>',
        body: '\n      <h4>How it works</h4>\n      <ul>\n        <li>ForEach iterates the object list returned by the metadata lookup</li>\n        <li>Each iteration calls the <b>same child pipeline</b> with a different parameter set</li>\n        <li>Batch count controls parallelism without overloading the source API</li>\n        <li>Failures are captured per iteration, so one bad object doesn\'t fail the run</li>\n      </ul>\n      <h4>Parameters passed down</h4>\n      <div class="kv">\n        <span>object_name</span><span>schema_name</span><span>table_name</span>\n        <span>load_type</span><span>mapping_file</span><span>watermark_column</span>\n      </div>\n      <div class="note">Nothing is hard-coded in the child. The same pipeline handles Account on one iteration and Opportunity on the next.</div>',
      },
      child: {
        accent: "ingest",
        node: {
          plain: {
            t: "The worker",
            d: "One reusable job that can handle any record type",
            tag: "Built once",
          },
          tech: {
            t: "Child Pipeline",
            d: "Fully parameterised — one pipeline serves every Salesforce object",
            tag: "Reusable",
          },
        },
        drawer: {
          plain: {
            k: "The daily copy job",
            t: "The Worker",
            d: "One job, built once, that handles every kind of record.",
          },
          tech: {
            k: "Ingestion",
            t: "Salesforce Child Pipeline",
            d: "One parameterised pipeline serving every Salesforce object in the config.",
          },
        },
        plain:
          '\n      <p class="lead">This is the part that does the actual copying. Crucially, there is <b>only one of it</b> — the same worker handles customers, deals and contacts, just with different instructions each time.</p>\n      <h4>What it does, in order</h4>\n      <ul>\n        <li>Checks <b>when it last ran</b> for this record type</li>\n        <li>Asks Salesforce only for what\'s <b>changed since then</b></li>\n        <li>Saves an exact copy, then cleans it up</li>\n        <li>Updates the database — <b>changing existing records</b> rather than duplicating them</li>\n        <li>Records the new timestamp, but <b>only if everything worked</b></li>\n      </ul>\n      <div class="note"><b>Why that last point matters:</b> if something fails halfway, the system doesn\'t pretend it succeeded. The next run picks up exactly where it left off, and nothing is silently lost.</div>',
        body: "\n      <h4>Inside the pipeline</h4>\n      <ul>\n        <li><b>Get watermark</b> — read the last successful load boundary</li>\n        <li><b>Build query</b> — construct SOQL with the incremental filter applied</li>\n        <li><b>Copy activity</b> — Salesforce → ADLS Gen2 Bronze, using the dynamic mapping</li>\n        <li><b>Load to SQL</b> — staged, then merged into the target table</li>\n        <li><b>Update watermark</b> — committed only after a successful load</li>\n      </ul>\n      <h4>Design principles</h4>\n      <ul>\n        <li><b>Idempotent</b> — a re-run produces the same result, no duplicate rows</li>\n        <li><b>Fail-safe watermark</b> — updated last, so failure means the next run retries the same window</li>\n        <li><b>Zero-code onboarding</b> — new object, new config entry, done</li>\n      </ul>",
      },
      incr: {
        accent: "ingest",
        node: {
          plain: {
            t: "Only what changed",
            d: "Copies new and updated records — not everything, every day",
            tag: "The efficiency win",
          },
          tech: {
            t: "Incremental Load",
            d: "Watermark on last-modified — pulls only new & changed rows each run",
            tag: "Delta",
          },
        },
        drawer: {
          plain: {
            k: "The daily copy job",
            t: "Only What Changed",
            d: "The decision that keeps this fast and affordable.",
          },
          tech: {
            k: "Ingestion",
            t: "Incremental Load Strategy",
            d: "The core efficiency win — reload only what actually changed.",
          },
        },
        plain:
          "\n      <p class=\"lead\">Imagine backing up your photos by re-copying <b>every photo you've ever taken</b>, every single night. That's what most systems do. This one copies only the pictures you took today.</p>\n      <h4>How it knows</h4>\n      <ul>\n        <li>Salesforce stamps every record with <b>when it was last edited</b></li>\n        <li>The system remembers when it last ran</li>\n        <li>It asks only for records touched <b>since that moment</b></li>\n        <li>Changed records get <b>updated in place</b>, not duplicated</li>\n      </ul>\n      <h4>What this saves</h4>\n      <ul>\n        <li>The daily run finishes in a fraction of the time</li>\n        <li>Salesforce isn't hammered with requests it doesn't need to answer</li>\n        <li>Cloud costs stay low, because you pay for what you move</li>\n      </ul>\n      <div class=\"note\">A full copy is still available on demand — useful for a first load, or for rebuilding after a problem. It's a single setting, not a different system.</div>",
        body: '\n      <h4>The problem it solves</h4>\n      <ul><li>A full daily reload of every object is slow, expensive, and burns API quota on unchanged data.</li></ul>\n      <h4>How it works</h4>\n      <ul>\n        <li>Each object declares a <b>watermark column</b> (typically <code>LastModifiedDate</code>)</li>\n        <li>The pipeline reads the <b>last successful watermark</b> before the pull</li>\n        <li>Source query filters to <code>WHERE LastModifiedDate &gt; @lastWatermark</code></li>\n        <li>New and changed rows are <b>merged</b> into the target on the business key</li>\n        <li>The watermark advances only after the load commits</li>\n      </ul>\n      <h4>Full load still available</h4>\n      <ul>\n        <li><code>load_type: "full"</code> switches the same pipeline to truncate-and-reload</li>\n        <li>Used for small reference objects, backfills and recovery</li>\n      </ul>',
      },
      map: {
        accent: "ingest",
        node: {
          plain: {
            t: "Field matching",
            d: "Decides which Salesforce field lands in which database column",
            tag: "Also configurable",
          },
          tech: {
            t: "Dynamic Mapping",
            d: "Column mapping JSON applied at copy time — schema changes stay in config",
            tag: "Config-driven",
          },
        },
        drawer: {
          plain: {
            k: "The daily copy job",
            t: "Field Matching",
            d: "Making sure the right information lands in the right place.",
          },
          tech: {
            k: "Ingestion",
            t: "Dynamic Column Mapping",
            d: "Source-to-target mapping lives in a config file, not inside the pipeline.",
          },
        },
        plain:
          '\n      <p class="lead">Salesforce and the database don\'t name things the same way. This is the translation list that connects the two.</p>\n      <h4>What it handles</h4>\n      <ul>\n        <li>Matching each Salesforce field to the right database column</li>\n        <li>Bringing across <b>only the fields the business needs</b>, not all several hundred</li>\n        <li>Making sure a date arrives as a date, and a number as a number</li>\n      </ul>\n      <div class="note"><b>Why it lives outside the code:</b> when someone adds a field in Salesforce, capturing it is a small edit to a list — not a software change that needs testing and a release.</div>',
        body: "\n      <h4>What it handles</h4>\n      <ul>\n        <li>Source column → target column translation</li>\n        <li>Data type alignment between Salesforce and SQL</li>\n        <li>Column selection — only what's needed downstream</li>\n      </ul>\n      <h4>Why externalise it</h4>\n      <ul>\n        <li>A source schema change is a <b>config edit</b>, not a pipeline redeploy</li>\n        <li>Mapping is reviewable in Git alongside the rest of the metadata</li>\n        <li>The same copy activity serves every object because mapping is injected at runtime</li>\n      </ul>",
      },
      bronze: {
        accent: "bronze",
        node: {
          plain: {
            t: "Stage 1 — Exact copy",
            d: "Saved precisely as it arrived, kept as a safety net",
            tag: "Untouched",
          },
          tech: {
            t: "Bronze — Raw",
            d: "Untouched landing zone, partitioned by load date. Full replay history.",
            tag: "Raw",
          },
        },
        drawer: {
          plain: {
            k: "Three clean-up stages",
            t: "Stage 1 — Exact Copy",
            d: "Nothing is changed here. That's deliberate.",
          },
          tech: {
            k: "Medallion · Layer 1",
            t: "Bronze — Raw Landing",
            d: "Data lands exactly as the source gave it, in ADLS Gen2.",
          },
        },
        plain:
          '\n      <p class="lead">The first thing the system does is take a photograph of the data <b>exactly as Salesforce handed it over</b> — before anyone touches it.</p>\n      <h4>Why keep an untouched copy</h4>\n      <ul>\n        <li>If a mistake is found later in the clean-up rules, everything can be <b>rebuilt from here</b> — without asking Salesforce for the data again</li>\n        <li>It\'s a record of exactly what the source said on any given day, which matters if numbers are ever questioned</li>\n        <li>Each day is filed separately, so any single day can be found and re-run</li>\n      </ul>\n      <div class="note">This is the cheap insurance policy that stops a small logic error from becoming a week of lost work.</div>',
        body: "\n      <h4>Rules of the layer</h4>\n      <ul>\n        <li><b>No transformation.</b> Raw fidelity is the entire point</li>\n        <li>Partitioned by load date so any run can be located and replayed</li>\n        <li>Append-only — history preserved even when the source overwrites it</li>\n      </ul>\n      <h4>Why it earns its place</h4>\n      <ul>\n        <li>Downstream bugs are fixed by rebuilding Silver and Gold <b>without re-hitting the Salesforce API</b></li>\n        <li>Provides an audit trail of exactly what the source returned on any given day</li>\n      </ul>",
      },
      silver: {
        accent: "silver",
        node: {
          plain: {
            t: "Stage 2 — Cleaned up",
            d: "Duplicates removed, formats fixed, bad records flagged",
            tag: "Made reliable",
          },
          tech: {
            t: "Silver — Cleansed",
            d: "Typed, de-duplicated, standardised. Business keys resolved.",
            tag: "Conformed",
          },
        },
        drawer: {
          plain: {
            k: "Three clean-up stages",
            t: "Stage 2 — Cleaned Up",
            d: "Turning raw data into data you can actually trust.",
          },
          tech: {
            k: "Medallion · Layer 2",
            t: "Silver — Cleansed & Conformed",
            d: "Raw data becomes trustworthy, queryable data.",
          },
        },
        plain:
          '\n      <p class="lead">Real data is messy. The same customer entered three different ways, dates in two formats, empty fields where there shouldn\'t be. This stage sorts that out.</p>\n      <h4>What gets fixed</h4>\n      <ul>\n        <li><b>Duplicates removed</b> — one record per customer, keeping the most recent version</li>\n        <li><b>Formats standardised</b> — dates look like dates, numbers behave like numbers</li>\n        <li><b>Inconsistencies tidied</b> — stray spaces, mixed capitalisation, blank-versus-missing</li>\n        <li><b>Problem records flagged</b>, not quietly deleted — so someone can look at them</li>\n      </ul>\n      <div class="note">That last point matters more than it sounds. Systems that silently drop bad records produce reports that look perfectly fine and are quietly wrong.</div>',
        body: '\n      <h4>What happens here</h4>\n      <ul>\n        <li><b>Type casting</b> — strings become dates, decimals, booleans</li>\n        <li><b>De-duplication</b> — one row per business key, latest version wins</li>\n        <li><b>Standardisation</b> — consistent naming, null handling, trimmed values</li>\n        <li><b>Validation</b> — bad records flagged rather than silently dropped</li>\n      </ul>\n      <div class="note">This is the layer that makes data comparable and safe to build on.</div>',
      },
      gold: {
        accent: "gold",
        node: {
          plain: {
            t: "Stage 3 — Ready to use",
            d: "Organised the way the business actually thinks about it",
            tag: "Report-ready",
          },
          tech: {
            t: "Gold — Curated",
            d: "Conformed, business-ready tables shaped for reporting.",
            tag: "Curated",
          },
        },
        drawer: {
          plain: {
            k: "Three clean-up stages",
            t: "Stage 3 — Ready To Use",
            d: "Data shaped around business questions, not system quirks.",
          },
          tech: {
            k: "Medallion · Layer 3",
            t: "Gold — Business Ready",
            d: "Curated tables shaped around business questions rather than source structures.",
          },
        },
        plain:
          '\n      <p class="lead">Clean data still isn\'t <b>useful</b> data. This stage reshapes it around the questions people actually ask.</p>\n      <h4>What happens here</h4>\n      <ul>\n        <li>Data is arranged by how the business thinks — customers, deals, time periods</li>\n        <li>Calculations everyone relies on are worked out <b>once, in one place</b></li>\n        <li>Structured so reports open quickly instead of grinding</li>\n      </ul>\n      <div class="note"><b>The quiet benefit:</b> because definitions live in one place, two reports can\'t disagree about what "active customer" means. Anyone who has sat in a meeting where two teams present different numbers for the same thing knows why that\'s worth having.</div>',
        body: "\n      <h4>What lives here</h4>\n      <ul>\n        <li>Conformed dimensions and fact tables</li>\n        <li>Business logic and derived measures applied consistently, once</li>\n        <li>Models shaped for reporting performance, not source convenience</li>\n      </ul>\n      <h4>The contract</h4>\n      <ul>\n        <li>Business users and reports consume Gold — never Bronze or Silver</li>\n        <li>Definitions live in one place, so two reports can't disagree on a metric</li>\n      </ul>",
      },
      sql: {
        accent: "serve",
        node: {
          plain: {
            t: "The database",
            d: "Where the finished data lands, refreshed every day",
            tag: "Destination",
          },
          tech: {
            t: "Azure SQL Database",
            d: "Merged target tables — upsert on business key, no full reload",
            tag: "Destination",
          },
        },
        drawer: {
          plain: {
            k: "Where the business reads it",
            t: "The Database",
            d: "The finished product — always available, always current.",
          },
          tech: {
            k: "Serving",
            t: "Azure SQL Database",
            d: "The consumption target — the warehouse the business queries.",
          },
        },
        plain:
          '\n      <p class="lead">The destination. Reporting tools and analysts read from here, not from Salesforce.</p>\n      <h4>How updates are handled safely</h4>\n      <ul>\n        <li>New data is prepared <b>off to the side</b> first, then swapped in</li>\n        <li>Existing records are <b>updated</b>, new ones added — nothing is wiped and rebuilt</li>\n        <li>The database <b>stays available the whole time</b> — nobody sees it go down mid-refresh</li>\n        <li>If an update fails, the existing data is <b>left untouched</b> rather than left half-finished</li>\n      </ul>\n      <div class="note">That last one is the difference between "the report is a day old" and "the report is wrong and nobody noticed."</div>',
        body: "\n      <h4>Load pattern</h4>\n      <ul>\n        <li>Data written to a <b>staging table</b> first</li>\n        <li>A <b>MERGE</b> upserts on the business key — updates existing rows, inserts new ones</li>\n        <li>No truncate-and-reload on incremental feeds, so the table stays available</li>\n        <li>Wrapped in a transaction — a failed load leaves the target untouched</li>\n      </ul>\n      <h4>Access</h4>\n      <ul><li>Connection strings resolved from <b>Key Vault</b> at runtime</li></ul>",
      },
      consume: {
        accent: "serve",
        node: {
          plain: {
            t: "Reports & dashboards",
            d: "What the business opens on a Monday morning",
            tag: "The payoff",
          },
          tech: {
            t: "Downstream Consumers",
            d: "Reporting, dashboards and business applications read from SQL",
            tag: "Consumers",
          },
        },
        drawer: {
          plain: {
            k: "Where the business reads it",
            t: "Reports & Dashboards",
            d: "What all of this was actually for.",
          },
          tech: {
            k: "Serving",
            t: "Downstream Consumers",
            d: "What the pipeline ultimately exists to serve.",
          },
        },
        plain:
          '\n      <p class="lead">None of the engineering matters if nobody can use the result. This is the part the business actually touches.</p>\n      <h4>What changes day to day</h4>\n      <ul>\n        <li>Dashboards are <b>current every morning</b>, with nobody preparing them</li>\n        <li>Questions get answered in seconds instead of "I\'ll export it and get back to you"</li>\n        <li>Years of history are available — Salesforce reports struggle with that</li>\n        <li>No Salesforce licence needed just to <b>look at</b> the numbers</li>\n      </ul>\n      <div class="note">The measure of success here is boring: the data is simply correct and current every morning, and nobody has to think about it.</div>',
        body: "\n      <h4>Who reads this data</h4>\n      <ul>\n        <li>Reporting and BI dashboards</li>\n        <li>Business applications needing a consolidated view</li>\n        <li>Analysts running ad-hoc SQL</li>\n      </ul>\n      <h4>The business outcome</h4>\n      <ul>\n        <li>CRM data is queryable in <b>SQL</b> instead of via Salesforce reports and manual exports</li>\n        <li>No API limits or licence seats between an analyst and the data</li>\n        <li>Refreshed daily without anyone touching a pipeline</li>\n      </ul>",
      },
      kv: {
        accent: "plat",
        node: {
          plain: {
            t: "🔐 Password vault",
            d: "Logins kept in a secure vault, never written into the system",
            tag: "Security",
          },
          tech: {
            t: "🔐 Azure Key Vault",
            d: "Every credential, connection string and API secret — fetched at runtime",
            tag: "Security",
          },
        },
        drawer: {
          plain: {
            k: "Behind the scenes",
            t: "Password Vault",
            d: "How the system logs in without anyone storing a password.",
          },
          tech: {
            k: "Platform",
            t: "Azure Key Vault",
            d: "Every secret lives here and is fetched at runtime.",
          },
        },
        plain:
          '\n      <p class="lead">The system needs logins for Salesforce and the database. Those are never written into the system itself — they\'re kept in a <b>locked vault</b> and requested at the moment they\'re needed.</p>\n      <h4>Why this is non-negotiable</h4>\n      <ul>\n        <li>No password ever appears in the project files, so a copy of the code is <b>worthless to an attacker</b></li>\n        <li>Changing a password is done in the vault — <b>nothing needs rebuilding</b></li>\n        <li>Access is granted to the system itself, not to a person, so there\'s no shared password floating around</li>\n        <li>Every access is logged</li>\n      </ul>\n      <div class="note">Hard-coded passwords are one of the most common causes of real-world breaches. This design removes the possibility rather than relying on people to be careful.</div>',
        body: "\n      <h4>What's stored</h4>\n      <ul>\n        <li>Salesforce credentials and security tokens</li>\n        <li>SQL Database connection strings</li>\n        <li>Storage account keys for the ADLS Gen2 landing zone</li>\n      </ul>\n      <h4>How it's used</h4>\n      <ul>\n        <li>Linked services reference Key Vault secrets rather than storing values</li>\n        <li>Access via <b>managed identity</b> — no credentials in code or config</li>\n        <li>Secret rotation happens in the vault with <b>no pipeline change</b></li>\n        <li>Nothing sensitive lands in Git or an ARM template</li>\n      </ul>",
      },
      devops: {
        accent: "plat",
        node: {
          plain: {
            t: "⚙️ Safe release process",
            d: "Every change reviewed and tested before it reaches live",
            tag: "Reliability",
          },
          tech: {
            t: "⚙️ Azure DevOps CI/CD",
            d: "Git-backed ADF, ARM template release across Dev → Test → Prod",
            tag: "Reliability",
          },
        },
        drawer: {
          plain: {
            k: "Behind the scenes",
            t: "Safe Release Process",
            d: "How changes get made without breaking what already works.",
          },
          tech: {
            k: "Platform",
            t: "Azure DevOps CI/CD",
            d: "Pipelines are versioned, reviewed and promoted like application code.",
          },
        },
        plain:
          '\n      <p class="lead">Nobody edits the live system directly. Changes are made in a practice copy first, tested, reviewed, and only then promoted.</p>\n      <h4>The route every change takes</h4>\n      <ul>\n        <li>Built and tried in a <b>development</b> copy</li>\n        <li>Checked in a <b>test</b> copy using realistic data</li>\n        <li><b>Reviewed by someone else</b> before it can go further</li>\n        <li>Released to <b>live</b> only after passing all of that</li>\n      </ul>\n      <h4>What this buys you</h4>\n      <ul>\n        <li>A full history of every change and who made it</li>\n        <li>If something does go wrong, it can be <b>reversed in one step</b></li>\n        <li>The live system can\'t be broken by an accidental edit</li>\n      </ul>',
        body: "\n      <h4>The flow</h4>\n      <ul>\n        <li>ADF is <b>Git-integrated</b> — every change is a branch and a pull request</li>\n        <li>Publishing generates <b>ARM templates</b> from the collaboration branch</li>\n        <li>Release pipeline deploys through <b>Dev → Test → Prod</b></li>\n        <li>Environment-specific values injected via parameter overrides per stage</li>\n      </ul>\n      <h4>What it prevents</h4>\n      <ul>\n        <li>No manual changes in the production Data Factory</li>\n        <li>Full change history and a one-step rollback path</li>\n        <li>Peer review before anything reaches production</li>\n      </ul>",
      },
      obs: {
        accent: "plat",
        node: {
          plain: {
            t: "📊 Health checks",
            d: "Every run logged — if something fails, someone knows",
            tag: "Monitoring",
          },
          tech: {
            t: "📊 Monitoring & Audit",
            d: "Run logging, row counts, failure alerts and retry handling",
            tag: "Monitoring",
          },
        },
        drawer: {
          plain: {
            k: "Behind the scenes",
            t: "Health Checks",
            d: "Knowing it worked matters as much as running it.",
          },
          tech: {
            k: "Platform",
            t: "Monitoring, Logging & Audit",
            d: "Knowing a load succeeded matters as much as running it.",
          },
        },
        plain:
          "\n      <p class=\"lead\">An automated system that fails <b>silently</b> is worse than no system at all — people keep trusting numbers that stopped updating weeks ago.</p>\n      <h4>What gets recorded every run</h4>\n      <ul>\n        <li>When it started, when it finished, how long it took</li>\n        <li><b>How many records</b> came across</li>\n        <li>Whether it succeeded — and if not, exactly what went wrong</li>\n      </ul>\n      <h4>When something breaks</h4>\n      <ul>\n        <li>Temporary glitches are <b>retried automatically</b> — most resolve themselves</li>\n        <li>Real failures raise an alert, so it's caught <b>before the business notices</b></li>\n        <li>One failing record type doesn't stop the others from updating</li>\n      </ul>",
        body: "\n      <h4>Captured per run</h4>\n      <ul>\n        <li>Pipeline run ID, object, start and end time</li>\n        <li>Rows read and rows written</li>\n        <li>Load status and full error detail on failure</li>\n        <li>Watermark value before and after</li>\n      </ul>\n      <h4>Operational handling</h4>\n      <ul>\n        <li>Retry policy on transient source and network failures</li>\n        <li>Failure alerts so problems surface before the business notices stale data</li>\n        <li>Per-object isolation — one failing feed doesn't block the run</li>\n      </ul>",
      },
      why: {
        accent: "plat",
        node: {
          plain: {
            t: "💡 Why it was built this way",
            d: "The business case, in plain terms",
            tag: "Read this",
          },
          tech: {
            t: "💡 Why This Design",
            d: "The engineering case for metadata-driven over hand-built pipelines",
            tag: "Rationale",
          },
        },
        drawer: {
          plain: {
            k: "The thinking",
            t: "Why It Was Built This Way",
            d: "The decision that separates this from a script that copies data.",
          },
          tech: {
            k: "Design Rationale",
            t: "Why Metadata-Driven?",
            d: "The engineering decision that defines this project.",
          },
        },
        plain:
          '\n      <p class="lead">Most data projects are built one piece at a time. Need customer data? Build something. Need order data too? Build another. Each one is separate, and each one has to be maintained forever.</p>\n      <h4>What that costs you</h4>\n      <ul>\n        <li>Every new request is a <b>fresh project</b> with a fresh timeline and a fresh bill</li>\n        <li>A change to how things work has to be repeated <b>across every piece</b></li>\n        <li>The more you build, the slower and more fragile it gets</li>\n      </ul>\n      <h4>What was built instead</h4>\n      <ul>\n        <li>One system, driven by a <b>settings file</b></li>\n        <li>New data request → <b>update the settings</b>. No new software</li>\n        <li>An improvement made once applies <b>everywhere immediately</b></li>\n        <li>The system gets <b>cheaper per addition</b> over time, not more expensive</li>\n      </ul>\n      <h4>The honest trade-off</h4>\n      <ul>\n        <li>It takes <b>longer to build the first one</b> this way</li>\n        <li>The investment pays back within the first handful of additions — and keeps paying after that</li>\n      </ul>\n      <div class="note"><b>In one line:</b> this was built as a reusable system rather than a one-off job, so the second, fifth and twentieth request cost a fraction of the first.</div>',
        body: '\n      <h4>The conventional approach</h4>\n      <ul>\n        <li>One pipeline per object. Dozens of objects means dozens of near-identical pipelines</li>\n        <li>Every new object is a development ticket, a test cycle and a release</li>\n        <li>Changing shared logic — retry behaviour, logging, load pattern — means editing every pipeline by hand</li>\n      </ul>\n      <h4>This approach</h4>\n      <ul>\n        <li>One master pipeline, one child pipeline. Everything else is configuration</li>\n        <li>New object → <b>add a metadata entry</b>. No development, no new pipeline</li>\n        <li>Shared logic changes once and applies to every object</li>\n        <li>A source schema change is a mapping file edit, not a redeploy</li>\n      </ul>\n      <h4>Trade-offs, honestly</h4>\n      <ul>\n        <li>Higher upfront design effort — the framework has to be right before it pays off</li>\n        <li>Debugging is more abstract; strong logging is not optional</li>\n        <li>An object with genuinely unusual behaviour may still need special handling</li>\n      </ul>\n      <div class="note"><b>Verdict:</b> the upfront cost is repaid within the first handful of objects — and keeps paying with every one added after.</div>',
      },
    },
  },
  {
    slug: "sap-azure-sql-pipeline",
    number: "02",
    discipline: "Data Engineering",
    serviceSlug: "data-engineering",
    name: "Paginated OData Ingestion: SAP → Azure SQL",
    cardName: "SAP → Azure SQL",
    cardSummary:
      "SAP's OData service will not hand over a full result set, so this pipeline pages through the daily delta a batch at a time and stops when the source runs dry — no fixed iteration count, no silent truncation.",
    chips: [
      "Azure Data Factory",
      "ADLS Gen2",
      "Azure SQL Database",
      "Azure Key Vault",
      "Azure DevOps CI/CD",
      "Medallion Architecture",
      "SAP OData",
      "OData Pagination",
    ],
    platformSlugs: ["Microsoft-Azure"],
    header: {
      plain: {
        title: "Automated Daily Sync:",
        titleAccent: "SAP → Reporting Database",
        story:
          "Every day this system pulls new and changed records out of <b>SAP</b> and files them into a database the business can report on. SAP will only hand over a <b>limited number of records per request</b> — so instead of failing, the system asks again and again, a batch at a time, until it has everything, then stops on its own. Adding a new type of record is a settings change, not a project.",
        hint: "Select any box to see what it does.",
        foot: "How it works · Project 02 · Select any block for detail",
      },
      tech: {
        title: "Paginated OData Ingestion:",
        titleAccent: "SAP → Azure SQL",
        story:
          "A metadata-driven <b>Azure Data Factory</b> framework ingesting SAP through the <b>OData connector</b>. Because the OData service caps rows per response, the child pipeline wraps the copy in an <b>Until loop</b> that pages through the delta set — committing each page as it lands — while a watermark keeps the whole run incremental. Medallion layers in ADLS Gen2, secrets in Key Vault, released via Azure DevOps.",
        hint: "Select any component to see how it works.",
        foot: "Architecture overview · Project 02 · Select any block for detail",
      },
    },
    metrics: {
      plain: [
        ["Batch by batch", "How SAP data is fetched"],
        ["Every day", "Runs automatically"],
        ["Zero", "Code changes to add data"],
        ["Only changes", "Copied each run"],
      ],
      tech: [
        ["Until loop", "Pagination strategy"],
        ["Daily", "Refresh cadence"],
        ["0", "New pipelines per entity"],
        ["Incremental", "Default load pattern"],
      ],
    },
    columns: [
      {
        accent: "source",
        nodes: ["sap", "odata"],
        head: {
          plain: "Where the data starts",
          tech: "Source",
        },
        sub: {
          plain: "The ERP system that runs the business",
          tech: "SAP via OData service",
        },
        mini: {
          plain:
            "<b>Security:</b> the login is never stored inside the system — it's fetched from a secure vault each time.",
          tech: "<b>Auth:</b> OData service credentials resolved at runtime from Key Vault — never stored in the pipeline.",
        },
      },
      {
        accent: "control",
        nodes: ["meta", "master", "foreach"],
        head: {
          plain: "The instruction sheet",
          tech: "Control Plane",
        },
        sub: {
          plain: "A settings file decides what gets copied — not code",
          tech: "Metadata decides everything",
        },
      },
      {
        accent: "ingest",
        nodes: ["child", "incr", "page", "map"],
        head: {
          plain: "The daily copy job",
          tech: "Ingestion",
        },
        sub: {
          plain: "Fetches in batches until nothing is left",
          tech: "SAP OData child pipeline",
        },
      },
      {
        accent: "silver",
        nodes: ["bronze", "silver", "gold"],
        head: {
          plain: "Three clean-up stages",
          tech: "Medallion Layers",
        },
        sub: {
          plain: "Raw copy → cleaned up → ready for reporting",
          tech: "ADLS Gen2",
        },
      },
      {
        accent: "serve",
        nodes: ["sql", "consume"],
        head: {
          plain: "Where the business reads it",
          tech: "Serving",
        },
        sub: {
          plain: "One place to ask questions of the data",
          tech: "Consumption layer",
        },
        mini: {
          plain:
            "<b>Result:</b> SAP data is available for reporting without anyone running an extract.",
          tech: "<b>Outcome:</b> ERP data queryable in SQL — no OData round-trips, no manual extracts.",
        },
      },
    ],
    platform: {
      label: {
        plain: "Behind the scenes — and why it was built this way",
        tech: "Cross-cutting platform concerns",
      },
      nodes: ["kv", "devops", "obs", "why"],
    },
    components: {
      sap: {
        accent: "source",
        node: {
          plain: {
            t: "SAP",
            d: "The ERP where orders, materials, finance and logistics live",
            tag: "The source",
          },
          tech: {
            t: "SAP",
            d: "ERP entities exposed as OData services — orders, materials, finance",
            tag: "Source system",
          },
        },
        drawer: {
          plain: {
            k: "Where the data starts",
            t: "SAP",
            d: "The system that runs day-to-day operations — and the hardest one to get data out of.",
          },
          tech: {
            k: "Source",
            t: "SAP",
            d: "ERP system of record, surfaced through OData services rather than direct database access.",
          },
        },
        plain:
          '\n      <p class="lead">SAP holds the operational heart of the business — orders, stock, suppliers, financials. It is also notoriously <b>difficult to get data out of</b>.</p>\n      <h4>Why it\'s hard</h4>\n      <ul>\n        <li>You generally <b>can\'t query the database directly</b> — access goes through a controlled interface</li>\n        <li>That interface <b>limits how many records it will return</b> in one go</li>\n        <li>The tables are enormous, so "just export it" is not an option</li>\n        <li>Records are updated constantly, so a snapshot goes stale immediately</li>\n      </ul>\n      <div class="note">These constraints are the reason this project looks the way it does. Nearly every design decision here exists to work <b>within</b> SAP\'s limits rather than fight them.</div>',
        body: "\n      <h4>What gets pulled</h4>\n      <ul>\n        <li>Business entities exposed as <b>OData services</b> — sales orders, materials, deliveries, finance documents</li>\n        <li>Each entity is one entry in the metadata config, not one new pipeline</li>\n      </ul>\n      <h4>Why SAP is a demanding source</h4>\n      <ul>\n        <li><b>No direct DB access</b> — extraction goes through the OData service layer</li>\n        <li><b>Response size caps</b> — the service will not return an unbounded result set</li>\n        <li><b>Large entities</b> — full extracts are impractical at volume</li>\n        <li><b>Constant change</b> — records are updated in place, so the target must be merged</li>\n      </ul>",
      },
      odata: {
        accent: "source",
        node: {
          plain: {
            t: "The connection",
            d: "A secure, standard link to SAP's data service",
            tag: "Set up once",
          },
          tech: {
            t: "OData Linked Service",
            d: "ADF OData connector — parameterised entity and query at runtime",
            tag: "Connection",
          },
        },
        drawer: {
          plain: {
            k: "Where the data starts",
            t: "The Connection",
            d: "How the system talks to SAP — through the front door, not around it.",
          },
          tech: {
            k: "Source",
            t: "OData Linked Service",
            d: "The ADF OData connection — configured once, reused by every entity in the metadata.",
          },
        },
        plain:
          "\n      <p class=\"lead\">Rather than reaching into SAP's database, the system talks to SAP through its <b>official data service</b> — the supported, sanctioned route.</p>\n      <h4>Why that choice matters</h4>\n      <ul>\n        <li>It's the route SAP <b>supports</b>, so upgrades don't quietly break it</li>\n        <li>Security and permissions are enforced by SAP itself, not worked around</li>\n        <li>The same connection serves <b>every</b> type of record — set up once, reused forever</li>\n        <li>Login details come from a <b>secure vault</b> at the moment they're needed</li>\n      </ul>\n      <div class=\"note\">Going around a system's official interface is faster to build and a liability forever. This took the supported route.</div>",
        body: '\n      <h4>How the connection is defined</h4>\n      <ul>\n        <li>A single ADF <b>OData linked service</b> pointed at the SAP gateway</li>\n        <li>Credentials are <b>Key Vault references</b>, not stored values</li>\n        <li>One dataset, fully parameterised — entity path passed in at runtime</li>\n      </ul>\n      <h4>Query construction</h4>\n      <ul>\n        <li>The request is assembled from metadata: entity path, <code>$select</code> for required fields, <code>$filter</code> for the watermark, and the paging parameters</li>\n        <li>Nothing entity-specific is baked into the connection or dataset</li>\n      </ul>\n      <div class="note">Using the OData service layer rather than direct table reads keeps the integration on a supported path and inside SAP\'s own authorisation model.</div>',
      },
      meta: {
        accent: "control",
        node: {
          plain: {
            t: "The instruction sheet",
            d: "A simple settings file listing what to copy and how",
            tag: "The key idea",
          },
          tech: {
            t: "Metadata Config",
            d: "Blob / ADLS Gen2 — entity, schema, load type, mapping, page size, watermark",
            tag: "Single source of truth",
          },
        },
        drawer: {
          plain: {
            k: "The instruction sheet",
            t: "The Instruction Sheet",
            d: "The single most important idea in this project.",
          },
          tech: {
            k: "Control Plane",
            t: "Metadata Configuration",
            d: "Stored in Blob / ADLS Gen2. Every pipeline decision is read from here at runtime.",
          },
        },
        plain:
          '\n      <p class="lead">Instead of writing a separate program for every type of record, the system reads a <b>simple settings file</b> that tells it what to do.</p>\n      <h4>What the settings file says</h4>\n      <ul>\n        <li><b>Which record type</b> to copy from SAP</li>\n        <li><b>Where to put it</b> in the destination database</li>\n        <li><b>Everything, or just the changes?</b></li>\n        <li><b>How many records to request at a time</b> — the batch size</li>\n        <li><b>Which field goes where</b> between the two systems</li>\n        <li><b>When it last ran</b>, so it knows where to pick up from</li>\n      </ul>\n      <div class="note"><b>Why this is the whole point:</b> when the business asks for a new type of SAP data, nobody writes new software. Someone adds a few lines to a settings file. What would normally be a multi-week project becomes an afternoon.</div>',
        body: '\n      <h4>What the config carries</h4>\n      <ul>\n        <li><b>entity_path</b> — the OData entity set to pull</li>\n        <li><b>schema_name / table_name</b> — target schema and table in SQL</li>\n        <li><b>load_type</b> — <code>full</code> or <code>incremental</code></li>\n        <li><b>page_size</b> — rows per OData request, tuned per entity</li>\n        <li><b>mapping_file</b> — pointer to the column mapping JSON</li>\n        <li><b>watermark column &amp; last-run value</b> — the incremental boundary</li>\n      </ul>\n      <h4>Shape</h4>\n      <pre class="code">{\n  <span class="k">"entity_path"</span>: <span class="s">"A_SalesOrder"</span>,\n  <span class="k">"schema_name"</span>: <span class="s">"sap"</span>,\n  <span class="k">"table_name"</span>: <span class="s">"SalesOrder"</span>,\n  <span class="k">"load_type"</span>: <span class="s">"incremental"</span>,\n  <span class="k">"watermark_column"</span>: <span class="s">"LastChangeDateTime"</span>,\n  <span class="k">"page_size"</span>: <span class="s">5000</span>,\n  <span class="k">"mapping_file"</span>: <span class="s">"maps/salesorder.json"</span>\n}</pre>\n      <div class="note"><b>The payoff:</b> onboarding a new entity is a config drop and a pull request — no pipeline development, no regression testing of existing feeds.</div>',
      },
      master: {
        accent: "control",
        node: {
          plain: {
            t: "The controller",
            d: "Reads the instruction sheet and starts the day's work",
            tag: "Starts the run",
          },
          tech: {
            t: "Master Pipeline",
            d: "Reads the metadata and drives every entity due to load",
            tag: "Orchestrator",
          },
        },
        drawer: {
          plain: {
            k: "The instruction sheet",
            t: "The Controller",
            d: "The part that wakes up each day and decides what needs doing.",
          },
          tech: {
            k: "Control Plane",
            t: "Master Pipeline",
            d: "The single entry point — reads metadata, decides what runs, drives the worker.",
          },
        },
        plain:
          '\n      <p class="lead">Think of it as a <b>shift supervisor</b>. It reads the instruction sheet, works out what\'s due today, and hands each item to the worker one at a time.</p>\n      <h4>What it does each run</h4>\n      <ul>\n        <li>Reads the settings file</li>\n        <li>Works out which record types are due</li>\n        <li>Hands each one to the worker, with its instructions attached</li>\n        <li>Keeps going if one item fails — <b>the rest of the day\'s work still completes</b></li>\n      </ul>\n      <div class="note">Because the supervisor\'s logic lives in one place, a change to how everything runs is made <b>once</b>, not repeated dozens of times.</div>',
        body: "\n      <h4>Execution flow</h4>\n      <ul>\n        <li><b>Lookup</b> — read the metadata config from Blob storage</li>\n        <li><b>Filter</b> — keep only entities marked active and due to run</li>\n        <li><b>ForEach</b> — iterate that list</li>\n        <li><b>Execute Pipeline</b> — invoke the child, passing every value as a parameter</li>\n      </ul>\n      <h4>Why a master/child split</h4>\n      <ul>\n        <li>Orchestration logic lives in <b>one place</b> and changes once</li>\n        <li>The child pipeline stays small, testable and independently deployable</li>\n        <li>A failure on one entity doesn't stop the rest of the run</li>\n        <li>Parallelism and batch size are controlled centrally at the ForEach</li>\n      </ul>",
      },
      foreach: {
        accent: "control",
        node: {
          plain: {
            t: "One at a time",
            d: "Works through the list, handling each record type in turn",
            tag: "The hand-off",
          },
          tech: {
            t: "ForEach → Execute",
            d: "Iterates the entity list, passes each config down as parameters",
            tag: "Dispatch",
          },
        },
        drawer: {
          plain: {
            k: "The instruction sheet",
            t: "One At A Time",
            d: "How the day's work list gets handed over, item by item.",
          },
          tech: {
            k: "Control Plane",
            t: "ForEach → Execute Pipeline",
            d: "The hand-off — one iteration per SAP entity, each fully parameterised.",
          },
        },
        plain:
          '\n      <p class="lead">The list from the instruction sheet gets worked through <b>one item at a time</b> — orders, then materials, then deliveries — each handed to the same worker with different instructions.</p>\n      <h4>Why this is deliberate</h4>\n      <ul>\n        <li>Several items can be handled <b>at once</b> to save time, but not so many that SAP starts refusing requests</li>\n        <li>If one record type has a problem, it\'s recorded and the rest <b>carry on</b></li>\n        <li>Adding an item to the list needs no change here at all</li>\n      </ul>\n      <div class="note">Restraint matters more than usual here — SAP is a live operational system. Pulling too aggressively can slow down the people actually using it.</div>',
        body: '\n      <h4>How it works</h4>\n      <ul>\n        <li>ForEach iterates the entity list returned by the metadata lookup</li>\n        <li>Each iteration calls the <b>same child pipeline</b> with a different parameter set</li>\n        <li>Batch count is kept deliberately conservative — the OData gateway is a shared, live resource</li>\n        <li>Failures are captured per iteration, so one bad entity doesn\'t fail the run</li>\n      </ul>\n      <h4>Parameters passed down</h4>\n      <div class="kv">\n        <span>entity_path</span><span>schema_name</span><span>table_name</span>\n        <span>load_type</span><span>page_size</span><span>mapping_file</span><span>watermark_column</span>\n      </div>',
      },
      child: {
        accent: "ingest",
        node: {
          plain: {
            t: "The worker",
            d: "One reusable job that can handle any record type",
            tag: "Built once",
          },
          tech: {
            t: "Child Pipeline",
            d: "Fully parameterised — one pipeline serves every SAP entity",
            tag: "Reusable",
          },
        },
        drawer: {
          plain: {
            k: "The daily copy job",
            t: "The Worker",
            d: "One job, built once, that handles every kind of record.",
          },
          tech: {
            k: "Ingestion",
            t: "SAP OData Child Pipeline",
            d: "One parameterised pipeline serving every SAP entity in the config.",
          },
        },
        plain:
          '\n      <p class="lead">This is the part that does the actual copying. Crucially, there is <b>only one of it</b> — the same worker handles orders, materials and deliveries, just with different instructions each time.</p>\n      <h4>What it does, in order</h4>\n      <ul>\n        <li>Checks <b>when it last ran</b> for this record type</li>\n        <li>Asks SAP for what\'s <b>changed since then</b> — but only a batch at a time</li>\n        <li><b>Repeats</b> that request until SAP has nothing left to give</li>\n        <li>Updates the database — <b>changing existing records</b> rather than duplicating them</li>\n        <li>Records the new timestamp, but <b>only if every batch succeeded</b></li>\n      </ul>\n      <div class="note"><b>Why that last point matters:</b> if the run fails on batch seven of twelve, the system doesn\'t pretend it finished. The next run repeats the whole window, and nothing is silently lost.</div>',
        body: "\n      <h4>Inside the pipeline</h4>\n      <ul>\n        <li><b>Get watermark</b> — read the last successful load boundary</li>\n        <li><b>Initialise paging state</b> — offset / skip token set to zero</li>\n        <li><b>Until loop</b> — request one page, land it, advance the offset, repeat</li>\n        <li><b>Load to SQL</b> — staged, then merged into the target table</li>\n        <li><b>Update watermark</b> — committed only after the final page completes</li>\n      </ul>\n      <h4>Design principles</h4>\n      <ul>\n        <li><b>Idempotent</b> — a re-run produces the same result, no duplicate rows</li>\n        <li><b>Fail-safe watermark</b> — a mid-loop failure means the next run retries the full window rather than resuming into a gap</li>\n        <li><b>Zero-code onboarding</b> — new entity, new config entry, done</li>\n      </ul>",
      },
      incr: {
        accent: "ingest",
        node: {
          plain: {
            t: "Only what changed",
            d: "Asks SAP for new and updated records — not everything",
            tag: "Efficiency",
          },
          tech: {
            t: "Incremental Load",
            d: "Watermark filter applied to every page of the delta set",
            tag: "Delta",
          },
        },
        drawer: {
          plain: {
            k: "The daily copy job",
            t: "Only What Changed",
            d: "The first of two things keeping this workable at SAP's scale.",
          },
          tech: {
            k: "Ingestion",
            t: "Incremental Load Strategy",
            d: "Watermark-bounded delta — the filter travels with every page request.",
          },
        },
        plain:
          '\n      <p class="lead">SAP tables are huge — often millions of rows. Copying all of them every night would be slow, expensive, and would put real strain on a system people are actively working in.</p>\n      <h4>How it knows what\'s new</h4>\n      <ul>\n        <li>SAP stamps records with <b>when they were last changed</b></li>\n        <li>The system remembers when it last ran</li>\n        <li>It asks only for records touched <b>since that moment</b></li>\n        <li>Changed records are <b>updated in place</b>, not duplicated</li>\n      </ul>\n      <div class="note">This works <b>together</b> with batching: the day\'s changes are identified first, then fetched a batch at a time. One decision narrows the data, the other makes it retrievable.</div>',
        body: '\n      <h4>How it works</h4>\n      <ul>\n        <li>Each entity declares a <b>watermark column</b> (e.g. <code>LastChangeDateTime</code>)</li>\n        <li>The pipeline reads the <b>last successful watermark</b> before the pull</li>\n        <li>An OData <code>$filter</code> bounds the request to rows changed after it</li>\n        <li>That filter is <b>re-applied on every page</b>, so the loop pages through the delta only, not the full entity</li>\n        <li>Rows are <b>merged</b> into the target on the business key</li>\n        <li>The watermark advances only after the last page commits</li>\n      </ul>\n      <h4>Full load still available</h4>\n      <ul>\n        <li><code>load_type: "full"</code> drops the filter and pages through the entire entity</li>\n        <li>Used for initial loads, small reference entities, and recovery</li>\n      </ul>\n      <div class="note">Filter and pagination compose: the watermark decides <b>what</b> is in scope, pagination decides <b>how it\'s carried across</b>.</div>',
      },
      page: {
        accent: "ingest",
        node: {
          plain: {
            t: "Batch by batch",
            d: "Keeps asking for the next batch until SAP has nothing left",
            tag: "The SAP problem",
          },
          tech: {
            t: "Pagination Loop",
            d: "Until loop over $top / $skip — each page landed before the next request",
            tag: "Key mechanism",
          },
        },
        drawer: {
          plain: {
            k: "The daily copy job",
            t: "Batch By Batch",
            d: "The problem this project exists to solve.",
          },
          tech: {
            k: "Ingestion",
            t: "OData Pagination Loop",
            d: "The defining mechanism — a bounded loop that pages through the delta set.",
          },
        },
        plain:
          "\n      <p class=\"lead\">SAP's data service <b>refuses to hand over everything at once</b>. Ask for 200,000 records and you won't get them — you'll get a capped response, or an error, or a timeout.</p>\n      <h4>What most people do wrong</h4>\n      <ul>\n        <li>Ask for everything, and the request fails outright — obvious, at least</li>\n        <li>Or worse: the request <b>quietly returns only the first batch</b>, the pipeline reports success, and the rest of the data silently never arrives</li>\n      </ul>\n      <h4>What this system does instead</h4>\n      <ul>\n        <li>Asks for a <b>manageable batch</b> — say the first 5,000 changed records</li>\n        <li><b>Saves that batch</b> before asking for anything else</li>\n        <li>Asks for the next batch, and the next, keeping its place each time</li>\n        <li><b>Stops automatically</b> when a batch comes back short — that's how it knows it's reached the end</li>\n      </ul>\n      <div class=\"note\"><b>Think of it like</b> moving house with a small car. You can't take everything in one trip, so you make repeated trips, keep track of what's already moved, and stop when the house is empty. The system does exactly that, unsupervised, every night.</div>\n      <h4>Why it's built to stop on its own</h4>\n      <ul>\n        <li>Nobody knows in advance how many records changed today — it might be 50, it might be 500,000</li>\n        <li>So the system doesn't guess a number of trips. It keeps going <b>until the source says there's nothing left</b></li>\n        <li>A hard ceiling on trips is still enforced, so a fault can never leave it looping forever</li>\n      </ul>",
        body: '\n      <h4>The constraint</h4>\n      <ul>\n        <li>SAP OData services cap rows per response — via service-side page size or an explicit <code>$top</code></li>\n        <li>An unbounded request either errors, times out, or <b>silently truncates</b> — the last being the dangerous case, since the pipeline reports success on partial data</li>\n      </ul>\n      <h4>The loop</h4>\n      <ul>\n        <li><b>Set variable</b> — initialise <code>skip = 0</code>, <code>hasMore = true</code></li>\n        <li><b>Until</b> <code>hasMore == false</code>:\n          <ul>\n            <li>Copy activity requests <code>$top={page_size}&amp;$skip={skip}</code> with the watermark <code>$filter</code> applied</li>\n            <li>Page is landed to Bronze and merged onward before the next request</li>\n            <li><code>skip += page_size</code></li>\n            <li><code>hasMore = (rowsReturned == page_size)</code> — a short page means the end</li>\n          </ul>\n        </li>\n        <li><b>Safety ceiling</b> — a max-iteration guard so a misbehaving source can\'t loop indefinitely</li>\n      </ul>\n      <h4>Why the termination condition is a short page</h4>\n      <ul>\n        <li>The delta size is unknown at design time — a fixed iteration count would either truncate or waste calls</li>\n        <li>A page returning fewer rows than requested is the reliable end-of-set signal</li>\n        <li>Where the service returns <code>@odata.nextLink</code>, following it until absent is equivalent and preferable — it removes offset arithmetic entirely</li>\n      </ul>\n      <h4>The trap worth knowing about</h4>\n      <ul>\n        <li><code>$skip</code>-based paging assumes a <b>stable ordering</b>. If the underlying set shifts between calls, rows can be skipped or repeated</li>\n        <li>Mitigated by ordering on a stable key and by <b>merging on the business key</b> — a repeated row updates rather than duplicates</li>\n        <li>The bounded watermark window also limits exposure, since the delta set is small and short-lived compared to the full entity</li>\n      </ul>\n      <div class="note"><b>Page size is per-entity metadata</b>, not a global constant — wide entities need smaller pages than narrow ones, and the right value is found by testing rather than assumed.</div>',
      },
      map: {
        accent: "ingest",
        node: {
          plain: {
            t: "Field matching",
            d: "Decides which SAP field lands in which database column",
            tag: "Also configurable",
          },
          tech: {
            t: "Dynamic Mapping",
            d: "Column mapping JSON applied at copy time — schema changes stay in config",
            tag: "Config-driven",
          },
        },
        drawer: {
          plain: {
            k: "The daily copy job",
            t: "Field Matching",
            d: "Making sure the right information lands in the right place.",
          },
          tech: {
            k: "Ingestion",
            t: "Dynamic Column Mapping",
            d: "Source-to-target mapping lives in a config file, not inside the pipeline.",
          },
        },
        plain:
          '\n      <p class="lead">SAP field names are famously cryptic — a column called <code>MATNR</code> is a material number, and nothing about the name says so. This is the translation list that makes the data readable.</p>\n      <h4>What it handles</h4>\n      <ul>\n        <li>Turning SAP\'s technical field names into <b>names people recognise</b></li>\n        <li>Bringing across <b>only the fields the business needs</b>, not all several hundred</li>\n        <li>Making sure a date arrives as a date, and a number as a number</li>\n      </ul>\n      <div class="note">Selecting only the needed fields does double duty here: it makes the data readable <b>and</b> it shrinks every request, so each batch carries more rows.</div>',
        body: '\n      <h4>What it handles</h4>\n      <ul>\n        <li>SAP technical field → business-readable target column</li>\n        <li>Data type alignment between OData and SQL</li>\n        <li><code>$select</code> projection — only required fields cross the wire</li>\n      </ul>\n      <h4>Why externalise it</h4>\n      <ul>\n        <li>A source schema change is a <b>config edit</b>, not a pipeline redeploy</li>\n        <li>Mapping is reviewable in Git alongside the rest of the metadata</li>\n        <li>The same copy activity serves every entity because mapping is injected at runtime</li>\n      </ul>\n      <div class="note">Field selection is also a <b>performance lever</b>: narrowing the projection reduces payload per page, which raises the usable page size.</div>',
      },
      bronze: {
        accent: "bronze",
        node: {
          plain: {
            t: "Stage 1 — Exact copy",
            d: "Saved precisely as it arrived, kept as a safety net",
            tag: "Untouched",
          },
          tech: {
            t: "Bronze — Raw",
            d: "Untouched landing zone, partitioned by load date and page",
            tag: "Raw",
          },
        },
        drawer: {
          plain: {
            k: "Three clean-up stages",
            t: "Stage 1 — Exact Copy",
            d: "Nothing is changed here. That's deliberate.",
          },
          tech: {
            k: "Medallion · Layer 1",
            t: "Bronze — Raw Landing",
            d: "Data lands exactly as the OData service returned it, in ADLS Gen2.",
          },
        },
        plain:
          '\n      <p class="lead">The first thing the system does is take a photograph of the data <b>exactly as SAP handed it over</b> — before anyone touches it.</p>\n      <h4>Why keep an untouched copy</h4>\n      <ul>\n        <li>If a mistake is found later in the clean-up rules, everything can be <b>rebuilt from here</b> — without going back to SAP again</li>\n        <li>That last point matters more here than usual: re-pulling from SAP is slow and puts load on a live business system</li>\n        <li>It\'s a record of exactly what SAP said on any given day, which matters if numbers are ever questioned</li>\n      </ul>\n      <div class="note">Each batch is saved as it arrives, so even a run that fails halfway leaves behind everything it had already collected.</div>',
        body: "\n      <h4>Rules of the layer</h4>\n      <ul>\n        <li><b>No transformation.</b> Raw fidelity is the entire point</li>\n        <li>Partitioned by load date, with each page landed as it arrives</li>\n        <li>Append-only — history preserved even when the source overwrites it</li>\n      </ul>\n      <h4>Why it earns its place</h4>\n      <ul>\n        <li>Downstream fixes are made by rebuilding Silver and Gold <b>without re-paging the OData service</b> — a meaningful saving when a full delta is dozens of round-trips</li>\n        <li>Provides an audit trail of exactly what SAP returned, page by page</li>\n      </ul>",
      },
      silver: {
        accent: "silver",
        node: {
          plain: {
            t: "Stage 2 — Cleaned up",
            d: "Duplicates removed, formats fixed, bad records flagged",
            tag: "Made reliable",
          },
          tech: {
            t: "Silver — Cleansed",
            d: "Typed, de-duplicated, standardised. Business keys resolved.",
            tag: "Conformed",
          },
        },
        drawer: {
          plain: {
            k: "Three clean-up stages",
            t: "Stage 2 — Cleaned Up",
            d: "Turning raw data into data you can actually trust.",
          },
          tech: {
            k: "Medallion · Layer 2",
            t: "Silver — Cleansed & Conformed",
            d: "Raw pages become a single trustworthy, queryable set.",
          },
        },
        plain:
          '\n      <p class="lead">Real data is messy, and SAP\'s is messier than most — codes instead of names, padded values, dates in formats nothing else understands.</p>\n      <h4>What gets fixed</h4>\n      <ul>\n        <li><b>Duplicates removed</b> — including any record that appeared in two batches</li>\n        <li><b>Formats standardised</b> — dates look like dates, numbers behave like numbers</li>\n        <li><b>SAP quirks tidied</b> — leading zeros, padded codes, blank-versus-missing</li>\n        <li><b>Problem records flagged</b>, not quietly deleted — so someone can look at them</li>\n      </ul>\n      <div class="note">De-duplication does real work here. Because the data arrives in batches, a record that shifted position between requests could turn up twice. This stage guarantees one row per record regardless.</div>',
        body: '\n      <h4>What happens here</h4>\n      <ul>\n        <li><b>Type casting</b> — OData strings become dates, decimals, booleans</li>\n        <li><b>De-duplication</b> — one row per business key, latest version wins; also the backstop against page-boundary repeats</li>\n        <li><b>Standardisation</b> — leading-zero handling, code normalisation, null semantics</li>\n        <li><b>Validation</b> — bad records flagged rather than silently dropped</li>\n      </ul>\n      <div class="note">Deduplication on the business key is what makes <code>$skip</code>-based paging safe in practice — a row returned twice updates rather than duplicates.</div>',
      },
      gold: {
        accent: "gold",
        node: {
          plain: {
            t: "Stage 3 — Ready to use",
            d: "Organised the way the business actually thinks about it",
            tag: "Report-ready",
          },
          tech: {
            t: "Gold — Curated",
            d: "Conformed, business-ready tables shaped for reporting.",
            tag: "Curated",
          },
        },
        drawer: {
          plain: {
            k: "Three clean-up stages",
            t: "Stage 3 — Ready To Use",
            d: "Data shaped around business questions, not SAP's internal structures.",
          },
          tech: {
            k: "Medallion · Layer 3",
            t: "Gold — Business Ready",
            d: "Curated tables shaped around business questions rather than source structures.",
          },
        },
        plain:
          '\n      <p class="lead">Clean data still isn\'t <b>useful</b> data. This stage reshapes it around the questions people actually ask.</p>\n      <h4>What happens here</h4>\n      <ul>\n        <li>Data is arranged by how the business thinks — orders, customers, products, time periods</li>\n        <li>Calculations everyone relies on are worked out <b>once, in one place</b></li>\n        <li>Structured so reports open quickly instead of grinding</li>\n      </ul>\n      <div class="note"><b>The quiet benefit:</b> because definitions live in one place, two reports can\'t disagree about what "open order" means. Anyone who has sat in a meeting where two teams present different numbers for the same thing knows why that\'s worth having.</div>',
        body: "\n      <h4>What lives here</h4>\n      <ul>\n        <li>Conformed dimensions and fact tables</li>\n        <li>Business logic and derived measures applied consistently, once</li>\n        <li>Models shaped for reporting performance, not for SAP's internal structures</li>\n      </ul>\n      <h4>The contract</h4>\n      <ul>\n        <li>Business users and reports consume Gold — never Bronze or Silver</li>\n        <li>Definitions live in one place, so two reports can't disagree on a metric</li>\n      </ul>",
      },
      sql: {
        accent: "serve",
        node: {
          plain: {
            t: "The database",
            d: "Where the finished data lands, refreshed every day",
            tag: "Destination",
          },
          tech: {
            t: "Azure SQL Database",
            d: "Merged target tables — upsert on business key, no full reload",
            tag: "Destination",
          },
        },
        drawer: {
          plain: {
            k: "Where the business reads it",
            t: "The Database",
            d: "The finished product — always available, always current.",
          },
          tech: {
            k: "Serving",
            t: "Azure SQL Database",
            d: "The consumption target — the warehouse the business queries.",
          },
        },
        plain:
          '\n      <p class="lead">The destination. Reporting tools and analysts read from here — not from SAP, which keeps the load off a live operational system.</p>\n      <h4>How updates are handled safely</h4>\n      <ul>\n        <li>New data is prepared <b>off to the side</b> first, then swapped in</li>\n        <li>Existing records are <b>updated</b>, new ones added — nothing is wiped and rebuilt</li>\n        <li>The database <b>stays available the whole time</b> — nobody sees it go down mid-refresh</li>\n        <li>If an update fails, the existing data is <b>left untouched</b> rather than left half-finished</li>\n      </ul>\n      <div class="note">That last one is the difference between "the report is a day old" and "the report is wrong and nobody noticed."</div>',
        body: "\n      <h4>Load pattern</h4>\n      <ul>\n        <li>Pages are written to a <b>staging table</b> first</li>\n        <li>A <b>MERGE</b> upserts on the business key — updates existing rows, inserts new ones</li>\n        <li>This is also what makes repeated rows across page boundaries harmless</li>\n        <li>Wrapped in a transaction — a failed load leaves the target untouched</li>\n      </ul>\n      <h4>Access</h4>\n      <ul><li>Connection strings resolved from <b>Key Vault</b> at runtime</li></ul>",
      },
      consume: {
        accent: "serve",
        node: {
          plain: {
            t: "Reports & dashboards",
            d: "What the business opens on a Monday morning",
            tag: "The payoff",
          },
          tech: {
            t: "Downstream Consumers",
            d: "Reporting, dashboards and business applications read from SQL",
            tag: "Consumers",
          },
        },
        drawer: {
          plain: {
            k: "Where the business reads it",
            t: "Reports & Dashboards",
            d: "What all of this was actually for.",
          },
          tech: {
            k: "Serving",
            t: "Downstream Consumers",
            d: "What the pipeline ultimately exists to serve.",
          },
        },
        plain:
          '\n      <p class="lead">None of the engineering matters if nobody can use the result. This is the part the business actually touches.</p>\n      <h4>What changes day to day</h4>\n      <ul>\n        <li>Dashboards are <b>current every morning</b>, with nobody preparing them</li>\n        <li>Questions get answered in seconds instead of raising a request with the SAP team</li>\n        <li>Reporting queries run against the warehouse, so they <b>never slow SAP down</b></li>\n        <li>No SAP licence needed just to <b>look at</b> the numbers</li>\n      </ul>\n      <div class="note">The measure of success here is boring: the data is simply correct and current every morning, and nobody has to think about it.</div>',
        body: "\n      <h4>Who reads this data</h4>\n      <ul>\n        <li>Reporting and BI dashboards</li>\n        <li>Business applications needing a consolidated operational view</li>\n        <li>Analysts running ad-hoc SQL</li>\n      </ul>\n      <h4>The business outcome</h4>\n      <ul>\n        <li>ERP data is queryable in <b>SQL</b> instead of via SAP extracts and change requests</li>\n        <li>Analytical load is moved <b>off the live ERP</b> entirely</li>\n        <li>Refreshed daily without anyone touching a pipeline</li>\n      </ul>",
      },
      kv: {
        accent: "plat",
        node: {
          plain: {
            t: "🔐 Password vault",
            d: "Logins kept in a secure vault, never written into the system",
            tag: "Security",
          },
          tech: {
            t: "🔐 Azure Key Vault",
            d: "Every credential, connection string and API secret — fetched at runtime",
            tag: "Security",
          },
        },
        drawer: {
          plain: {
            k: "Behind the scenes",
            t: "Password Vault",
            d: "How the system logs in without anyone storing a password.",
          },
          tech: {
            k: "Platform",
            t: "Azure Key Vault",
            d: "Every secret lives here and is fetched at runtime.",
          },
        },
        plain:
          '\n      <p class="lead">The system needs logins for SAP and the database. Those are never written into the system itself — they\'re kept in a <b>locked vault</b> and requested at the moment they\'re needed.</p>\n      <h4>Why this is non-negotiable</h4>\n      <ul>\n        <li>No password ever appears in the project files, so a copy of the code is <b>worthless to an attacker</b></li>\n        <li>This matters especially with SAP — those credentials often carry access to genuinely sensitive operational data</li>\n        <li>Changing a password is done in the vault — <b>nothing needs rebuilding</b></li>\n        <li>Access is granted to the system itself, not to a person, and every access is logged</li>\n      </ul>\n      <div class="note">Hard-coded passwords are one of the most common causes of real-world breaches. This design removes the possibility rather than relying on people to be careful.</div>',
        body: "\n      <h4>What's stored</h4>\n      <ul>\n        <li>SAP OData service credentials</li>\n        <li>SQL Database connection strings</li>\n        <li>Storage account keys for the ADLS Gen2 landing zone</li>\n      </ul>\n      <h4>How it's used</h4>\n      <ul>\n        <li>Linked services reference Key Vault secrets rather than storing values</li>\n        <li>Access via <b>managed identity</b> — no credentials in code or config</li>\n        <li>Secret rotation happens in the vault with <b>no pipeline change</b></li>\n        <li>Nothing sensitive lands in Git or an ARM template</li>\n      </ul>",
      },
      devops: {
        accent: "plat",
        node: {
          plain: {
            t: "⚙️ Safe release process",
            d: "Every change reviewed and tested before it reaches live",
            tag: "Reliability",
          },
          tech: {
            t: "⚙️ Azure DevOps CI/CD",
            d: "Git-backed ADF, ARM template release across Dev → Test → Prod",
            tag: "Reliability",
          },
        },
        drawer: {
          plain: {
            k: "Behind the scenes",
            t: "Safe Release Process",
            d: "How changes get made without breaking what already works.",
          },
          tech: {
            k: "Platform",
            t: "Azure DevOps CI/CD",
            d: "Pipelines are versioned, reviewed and promoted like application code.",
          },
        },
        plain:
          '\n      <p class="lead">Nobody edits the live system directly. Changes are made in a practice copy first, tested, reviewed, and only then promoted.</p>\n      <h4>The route every change takes</h4>\n      <ul>\n        <li>Built and tried in a <b>development</b> copy</li>\n        <li>Checked in a <b>test</b> copy using realistic data</li>\n        <li><b>Reviewed by someone else</b> before it can go further</li>\n        <li>Released to <b>live</b> only after passing all of that</li>\n      </ul>\n      <h4>What this buys you</h4>\n      <ul>\n        <li>A full history of every change and who made it</li>\n        <li>If something goes wrong, it can be <b>reversed in one step</b></li>\n        <li>The live system can\'t be broken by an accidental edit</li>\n      </ul>',
        body: "\n      <h4>The flow</h4>\n      <ul>\n        <li>ADF is <b>Git-integrated</b> — every change is a branch and a pull request</li>\n        <li>Publishing generates <b>ARM templates</b> from the collaboration branch</li>\n        <li>Release pipeline deploys through <b>Dev → Test → Prod</b></li>\n        <li>Environment-specific values — including SAP gateway endpoints — injected via parameter overrides per stage</li>\n      </ul>\n      <h4>What it prevents</h4>\n      <ul>\n        <li>No manual changes in the production Data Factory</li>\n        <li>Full change history and a one-step rollback path</li>\n        <li>Peer review before anything reaches production</li>\n      </ul>",
      },
      obs: {
        accent: "plat",
        node: {
          plain: {
            t: "📊 Health checks",
            d: "Every batch logged — if something fails, someone knows",
            tag: "Monitoring",
          },
          tech: {
            t: "📊 Monitoring & Audit",
            d: "Per-page row counts, iteration logging, failure alerts and retries",
            tag: "Monitoring",
          },
        },
        drawer: {
          plain: {
            k: "Behind the scenes",
            t: "Health Checks",
            d: "With batching, knowing exactly how far it got is essential.",
          },
          tech: {
            k: "Platform",
            t: "Monitoring, Logging & Audit",
            d: "Per-page observability — the only way to debug a loop you can't watch.",
          },
        },
        plain:
          '\n      <p class="lead">An automated system that fails <b>silently</b> is worse than no system at all — people keep trusting numbers that stopped updating weeks ago.</p>\n      <h4>What gets recorded every run</h4>\n      <ul>\n        <li>When it started, when it finished, how long it took</li>\n        <li><b>How many batches</b> were fetched, and how many records in each</li>\n        <li>Whether it reached the end properly — or stopped early</li>\n        <li>If it failed, <b>exactly which batch</b> it failed on</li>\n      </ul>\n      <h4>Why the batch detail matters</h4>\n      <ul>\n        <li>"The load failed" is not useful. "It failed on batch 7 of an expected 12" tells you immediately what happened and what to do</li>\n        <li>Batch counts also reveal <b>silent truncation</b> — if a run that normally takes 12 batches suddenly takes 1, something is wrong even though nothing errored</li>\n      </ul>',
        body: '\n      <h4>Captured per run</h4>\n      <ul>\n        <li>Pipeline run ID, entity, start and end time</li>\n        <li><b>Iteration count and rows per page</b> — not just a run-level total</li>\n        <li>Termination reason — short page, nextLink absent, or safety ceiling hit</li>\n        <li>Watermark value before and after</li>\n      </ul>\n      <h4>Why per-page logging is essential here</h4>\n      <ul>\n        <li>A run-level row count can\'t distinguish "a quiet day" from "the loop exited after one page"</li>\n        <li>Iteration counts make <b>silent truncation</b> visible — the failure mode that produces confidently wrong data</li>\n        <li>A mid-loop failure is diagnosable to the exact page and offset</li>\n      </ul>\n      <h4>Operational handling</h4>\n      <ul>\n        <li>Retry policy on transient gateway and network failures — common with OData under load</li>\n        <li>Alerting on the safety ceiling being reached, which indicates a source or logic problem</li>\n        <li>Per-entity isolation — one failing feed doesn\'t block the run</li>\n      </ul>',
      },
      why: {
        accent: "plat",
        node: {
          plain: {
            t: "💡 Why it was built this way",
            d: "The business case, in plain terms",
            tag: "Read this",
          },
          tech: {
            t: "💡 Why This Design",
            d: "Working within SAP's constraints instead of around them",
            tag: "Rationale",
          },
        },
        drawer: {
          plain: {
            k: "The thinking",
            t: "Why It Was Built This Way",
            d: "Two decisions carry this project.",
          },
          tech: {
            k: "Design Rationale",
            t: "Why This Design",
            d: "Working within the OData constraint rather than against it.",
          },
        },
        plain:
          "\n      <p class=\"lead\">Two decisions carry this project, and they solve different problems.</p>\n      <h4>1 — Only fetch what changed</h4>\n      <ul>\n        <li>SAP tables run to millions of rows. Copying everything nightly is slow, expensive, and strains a live system</li>\n        <li>Fetching only the day's changes shrinks the job to a fraction of the size</li>\n      </ul>\n      <h4>2 — Fetch it a batch at a time</h4>\n      <ul>\n        <li>Even the day's changes can exceed what SAP will hand over in one request</li>\n        <li>So the system asks repeatedly until it has everything — and <b>knows how to tell when it's finished</b></li>\n      </ul>\n      <h4>And underneath both: a settings file, not code</h4>\n      <ul>\n        <li>New record type → <b>update the settings</b>. No new software</li>\n        <li>An improvement made once applies <b>everywhere immediately</b></li>\n        <li>Each addition costs a fraction of the first</li>\n      </ul>\n      <h4>The honest trade-off</h4>\n      <ul>\n        <li>It takes <b>longer to build the first one</b> this way</li>\n        <li>The batching loop is harder to reason about than a single copy step — which is exactly why the logging is as detailed as it is</li>\n      </ul>\n      <div class=\"note\"><b>In one line:</b> SAP's limits weren't worked around, they were designed for — so the system stays reliable whether today brought fifty changes or half a million.</div>",
        body: '\n      <h4>The constraint that shapes everything</h4>\n      <ul>\n        <li>SAP OData caps rows per response. Any design ignoring this either fails loudly or — far worse — <b>truncates silently</b> and reports success</li>\n        <li>Silent truncation is the dangerous failure mode: the pipeline goes green, the data is incomplete, and nobody finds out until someone questions a number</li>\n      </ul>\n      <h4>The two composed mechanisms</h4>\n      <ul>\n        <li><b>Watermark filter</b> bounds <i>what</i> is in scope — the delta, not the entity</li>\n        <li><b>Pagination loop</b> governs <i>how</i> that scope is carried across — bounded requests, landed incrementally</li>\n        <li>Neither alone is sufficient: a filter without paging still overruns the cap on a heavy day; paging without a filter walks the entire entity nightly</li>\n      </ul>\n      <h4>Why dynamic termination rather than a fixed count</h4>\n      <ul>\n        <li>Delta volume is unknowable at design time — it varies by orders of magnitude day to day</li>\n        <li>A fixed iteration count either truncates on heavy days or wastes calls on quiet ones</li>\n        <li>Looping until a short page (or an absent <code>nextLink</code>) is self-tuning; the safety ceiling only guards against a misbehaving source</li>\n      </ul>\n      <h4>Trade-offs, honestly</h4>\n      <ul>\n        <li>A loop is harder to reason about than a single copy activity — hence per-iteration logging as a first-class concern</li>\n        <li><code>$skip</code> paging assumes stable ordering; business-key merge and a bounded delta window contain the risk rather than eliminate it</li>\n        <li>Page size is an empirical tuning parameter per entity, not a constant that can be reasoned to</li>\n        <li>Higher upfront design effort — repaid from the second entity onward</li>\n      </ul>\n      <div class="note"><b>Verdict:</b> the constraint was designed for rather than worked around, so behaviour is identical whether the delta is fifty rows or half a million.</div>',
      },
    },
  },
  {
    slug: "databricks-churn-prediction",
    number: "03",
    discipline: "Data Engineering",
    serviceSlug: "data-engineering",
    name: "Churn Prediction on Databricks: Governed ML with Unity Catalog",
    cardName: "Churn Prediction on Databricks",
    cardSummary:
      "A governed end-to-end ML architecture on Databricks: point-in-time features in Unity Catalog, Champion/Challenger deployment by alias, and drift monitoring that triggers its own retraining while promotion stays a human decision.",
    chips: [
      "Databricks",
      "Unity Catalog",
      "Delta Lake",
      "MLflow 3",
      "Feature Store",
      "Model Serving",
      "Lakehouse Monitoring",
      "Asset Bundles",
      "Azure DevOps",
    ],
    platformSlugs: ["Microsoft-Azure"],
    header: {
      plain: {
        title: "Predicting Which Customers Might Leave:",
        titleAccent: "And Acting Before They Do",
        story:
          "This design takes the customer data already flowing into the warehouse and uses it to answer a question the business genuinely cares about: <b>which customers are about to leave?</b> Every morning the sales team gets a ranked list of who is at risk and why, in time to actually do something. The system <b>watches its own accuracy</b> and raises a flag when it starts slipping — and every person, every record and every prediction is <b>governed and traceable</b>.",
        hint: "Select any box to see what it does.",
        foot: "Reference architecture · Databricks · Select any block for detail",
      },
      tech: {
        title: "Churn Prediction on Databricks:",
        titleAccent: "Governed ML with Unity Catalog",
        story:
          "An end-to-end ML architecture on <b>Databricks</b>, governed by <b>Unity Catalog</b> throughout. Features are declared as <b>Feature Views</b> with point-in-time correctness; experiments and models are tracked in <b>MLflow 3</b> and registered to the UC three-level namespace; deployment is <b>Champion/Challenger via aliases</b>. <b>Lakehouse Monitoring</b> profiles inference tables for drift and triggers retraining, and everything ships through <b>Databricks Asset Bundles</b> in Azure DevOps.",
        hint: "Select any component to see how it works.",
        foot: "Reference architecture · Databricks · Select any block for detail",
      },
    },
    metrics: {
      plain: [
        ["Who might leave", "What it predicts"],
        ["Every morning", "A ranked at-risk list"],
        ["Watches itself", "Flags its own accuracy drop"],
        ["Fully traceable", "Every prediction explainable"],
      ],
      tech: [
        ["Champion / Challenger", "Deployment pattern"],
        ["Point-in-time", "Feature join correctness"],
        ["Drift → retrain", "Monitoring loop"],
        ["catalog.schema.model", "UC namespace"],
      ],
    },
    columns: [
      {
        accent: "source",
        nodes: ["delta", "label"],
        head: {
          plain: "The data it learns from",
          tech: "Data Foundation",
        },
        sub: {
          plain: "Customer history already in the warehouse",
          tech: "Delta Lake on Unity Catalog",
        },
        mini: {
          plain:
            "<b>Nothing new to collect:</b> this runs on data the business already has.",
          tech: "<b>Upstream:</b> Gold-layer Delta tables produced by the existing ADF ingestion pipelines.",
        },
      },
      {
        accent: "control",
        nodes: ["fview", "pit", "online"],
        head: {
          plain: "Turning history into signals",
          tech: "Feature Engineering",
        },
        sub: {
          plain: "The patterns that hint someone is drifting away",
          tech: "Feature Views in Unity Catalog",
        },
      },
      {
        accent: "ingest",
        nodes: ["mlflow", "automl", "eval"],
        head: {
          plain: "Teaching the model",
          tech: "Model Development",
        },
        sub: {
          plain: "Learning from customers who already left",
          tech: "MLflow 3 tracking & evaluation",
        },
      },
      {
        accent: "gold",
        nodes: ["registry", "alias", "promote"],
        head: {
          plain: "Approving what goes live",
          tech: "Governance & Registry",
        },
        sub: {
          plain: "No model reaches customers unreviewed",
          tech: "UC model registry & aliases",
        },
      },
      {
        accent: "serve",
        nodes: ["batch", "realtime", "writeback"],
        head: {
          plain: "Getting it to the team",
          tech: "Serving & Action",
        },
        sub: {
          plain: "Predictions where people already work",
          tech: "Batch, real-time, write-back",
        },
        mini: {
          plain:
            "<b>The point:</b> a score nobody acts on is worthless. This lands where the team already is.",
          tech: "<b>Closing the loop:</b> outcomes flow back as labels for the next training cycle.",
        },
      },
    ],
    platform: {
      label: {
        plain: "Behind the scenes — and why it was built this way",
        tech: "Cross-cutting platform concerns",
      },
      nodes: ["uc", "monitor", "cicd", "cost", "why"],
    },
    components: {
      delta: {
        accent: "source",
        node: {
          plain: {
            t: "The customer history",
            d: "Orders, contacts, support tickets, activity — already collected",
            tag: "Starting point",
          },
          tech: {
            t: "Delta Lake — Gold",
            d: "Governed Gold tables in Unity Catalog, fed by existing ingestion",
            tag: "Foundation",
          },
        },
        drawer: {
          plain: {
            k: "The data it learns from",
            t: "The Customer History",
            d: "Everything the business already knows about how customers behave.",
          },
          tech: {
            k: "Data Foundation",
            t: "Delta Lake — Gold Layer",
            d: "Curated, governed Delta tables under Unity Catalog — the input to everything downstream.",
          },
        },
        plain:
          "\n      <p class=\"lead\">This doesn't need any new data collection. It runs on what the business <b>already has</b>: purchase history, support contacts, how often someone logs in, how long they've been a customer.</p>\n      <h4>Why that matters</h4>\n      <ul>\n        <li>No new systems, no new data capture, no privacy conversation about collecting something extra</li>\n        <li>The value comes from <b>connecting</b> data that already exists, not gathering more</li>\n        <li>Because it's all in one governed place, the model sees a complete picture rather than one department's slice</li>\n      </ul>",
        body: '\n      <h4>What sits here</h4>\n      <ul>\n        <li><b>Gold-layer Delta tables</b> — conformed customer, transaction and interaction facts</li>\n        <li>Registered in Unity Catalog under a three-level namespace: <code>catalog.schema.table</code></li>\n        <li>Produced by the upstream ingestion pipelines — this architecture consumes them, it doesn\'t rebuild them</li>\n      </ul>\n      <h4>Why Delta specifically</h4>\n      <ul>\n        <li><b>Time travel</b> — training data can be reproduced exactly as it stood on the training date</li>\n        <li><b>ACID transactions</b> — no partially-written table feeding a training run</li>\n        <li><b>Schema enforcement</b> — an upstream change surfaces as an error, not as silently corrupted features</li>\n      </ul>\n      <div class="note">Reproducibility starts here. A model you cannot retrain on the exact data it originally saw is a model you cannot debug.</div>',
      },
      label: {
        accent: "source",
        node: {
          plain: {
            t: 'Defining "left"',
            d: "Agreeing what churn actually means before predicting it",
            tag: "Do this first",
          },
          tech: {
            t: "Label Definition",
            d: "Churn event, observation window and prediction horizon, pinned in code",
            tag: "Often skipped",
          },
        },
        drawer: {
          plain: {
            k: "The data it learns from",
            t: 'Defining "Left"',
            d: "The least technical step, and the one that sinks most projects.",
          },
          tech: {
            k: "Data Foundation",
            t: "Label Definition & Windowing",
            d: "The single highest-leverage decision in the whole pipeline.",
          },
        },
        plain:
          '\n      <p class="lead">Before predicting churn, the business has to agree on what churn <b>is</b>. This sounds obvious. It is where most projects quietly go wrong.</p>\n      <h4>The questions that must be answered</h4>\n      <ul>\n        <li>Is a customer "gone" when they cancel — or after 90 days of silence?</li>\n        <li>Does a downgrade count, or only a full exit?</li>\n        <li>How far ahead are we predicting — next month, next quarter?</li>\n        <li>Is there enough <b>time to act</b> on the warning? A prediction that arrives the day someone leaves is useless</li>\n      </ul>\n      <div class="note"><b>Why this comes first:</b> a model can be technically flawless and commercially worthless if it predicts the wrong thing, or predicts it too late to matter. This is a business conversation, not a modelling one.</div>',
        body: '\n      <h4>What gets pinned down</h4>\n      <ul>\n        <li><b>Churn event</b> — the precise, queryable definition (contract end, N days inactive, downgrade below threshold)</li>\n        <li><b>Observation window</b> — how much history feeds each example</li>\n        <li><b>Prediction horizon</b> — how far forward the label looks</li>\n        <li><b>Intervention lead time</b> — the horizon must exceed the time the business needs to act</li>\n      </ul>\n      <h4>Traps this avoids</h4>\n      <ul>\n        <li><b>Label leakage</b> — features computed after the churn event (a cancellation ticket, a final invoice) make training scores look excellent and production performance collapse</li>\n        <li><b>Class imbalance</b> — churn is usually rare; accuracy is a misleading metric and PR-AUC is reported instead</li>\n        <li><b>Silent redefinition</b> — the definition lives in version-controlled code, not in someone\'s head</li>\n      </ul>\n      <div class="note">The single most common cause of a churn model that "worked in testing" is a leaked label. Defining the window explicitly, up front, is what prevents it.</div>',
      },
      fview: {
        accent: "control",
        node: {
          plain: {
            t: "The warning signs",
            d: "Behaviour patterns that tend to precede leaving",
            tag: "The signals",
          },
          tech: {
            t: "Feature Views",
            d: "Declarative UC features — Databricks manages the pipelines",
            tag: "UC-governed",
          },
        },
        drawer: {
          plain: {
            k: "Turning history into signals",
            t: "The Warning Signs",
            d: "Converting raw history into the patterns that actually predict leaving.",
          },
          tech: {
            k: "Feature Engineering",
            t: "Feature Views in Unity Catalog",
            d: "Features declared as UC objects, with pipelines managed by Databricks.",
          },
        },
        plain:
          '\n      <p class="lead">Raw history doesn\'t predict anything on its own. "This customer placed an order in March" is a fact. "<b>Their order frequency has halved over three months</b>" is a warning sign.</p>\n      <h4>The kind of signals used</h4>\n      <ul>\n        <li><b>Slowing down</b> — orders, logins or usage declining versus their own past</li>\n        <li><b>Friction</b> — more support tickets, slower resolution, repeat complaints</li>\n        <li><b>Disengagement</b> — emails unopened, product features abandoned</li>\n        <li><b>Relationship shifts</b> — their main contact leaves, or stops responding</li>\n      </ul>\n      <div class="note"><b>Why they\'re defined centrally:</b> "active customer" is calculated once, in one place, and reused by every model and report. Without that, two teams build two definitions and the numbers stop agreeing.</div>',
        body: '\n      <h4>Why Feature Views</h4>\n      <ul>\n        <li>Features are declared <b>as Unity Catalog objects</b> — Databricks creates and manages the underlying pipelines</li>\n        <li>Supports <b>time-windowed aggregations</b> natively, which is most of what churn features are</li>\n        <li>Governed, discoverable and shareable across workspaces like any other UC asset</li>\n        <li>Models trained on them <b>automatically capture lineage back to the features used</b></li>\n      </ul>\n      <h4>Feature Views vs Feature Tables</h4>\n      <ul>\n        <li><b>Feature Views</b> — declarative, Databricks-managed pipelines; the recommended default</li>\n        <li><b>Feature Tables</b> — a UC Delta table with a primary key that you write to and own; used where the computation is too bespoke to declare</li>\n      </ul>\n      <div class="note">The legacy workspace-scoped Feature Store is deprecated. Feature governance now lives in Unity Catalog alongside everything else.</div>',
      },
      pit: {
        accent: "control",
        node: {
          plain: {
            t: "No peeking ahead",
            d: "The model only sees what was knowable at the time",
            tag: "Critical",
          },
          tech: {
            t: "Point-in-Time Joins",
            d: "Feature values as of each label observation — prevents leakage",
            tag: "Correctness",
          },
        },
        drawer: {
          plain: {
            k: "Turning history into signals",
            t: "No Peeking Ahead",
            d: "The subtlest way an ML project fails — and how this prevents it.",
          },
          tech: {
            k: "Feature Engineering",
            t: "Point-in-Time Correctness",
            d: "The mechanism that stops future information leaking into training.",
          },
        },
        plain:
          "\n      <p class=\"lead\">Here's a trap that has quietly ruined a great many ML projects.</p>\n      <p class=\"lead\">Say you're training on a customer who left in <b>June</b>. If the model is shown their support-ticket count as it stands <b>today</b>, it's seeing tickets they raised <i>while cancelling</i> — information that didn't exist back in June.</p>\n      <h4>What happens next</h4>\n      <ul>\n        <li>The model looks <b>brilliant</b> in testing — it's effectively been shown the answer</li>\n        <li>In production it performs poorly, because that information isn't available yet for a customer who hasn't churned</li>\n        <li>Trust in the whole project collapses, usually before anyone works out why</li>\n      </ul>\n      <h4>How this design prevents it</h4>\n      <ul>\n        <li>Every feature is retrieved <b>as it stood on the date being predicted</b> — never as it stands now</li>\n        <li>The platform enforces this rather than relying on someone remembering</li>\n      </ul>\n      <div class=\"note\"><b>In one line:</b> the model is only ever shown what would genuinely have been known at the moment of the prediction. It's the difference between a model that works in a demo and one that works in production.</div>",
        body: '\n      <h4>The mechanism</h4>\n      <ul>\n        <li>Training sets are assembled with a <b>point-in-time join</b>: feature values as of the timestamp each label observation was recorded</li>\n        <li>This is native to the Feature Store rather than hand-rolled with window functions</li>\n        <li>It eliminates <b>train/serve skew</b> — the same lookup logic applies at training and at inference</li>\n      </ul>\n      <h4>Why hand-rolling this goes wrong</h4>\n      <ul>\n        <li>Correct temporal joins across many feature tables at differing grains are genuinely difficult to get right</li>\n        <li>Errors are <b>silent</b> — they produce optimistic offline metrics rather than exceptions</li>\n        <li>The gap only surfaces in production, by which point the model is already distrusted</li>\n      </ul>\n      <div class="note">Leakage doesn\'t announce itself. A suspiciously high offline AUC on a churn problem is a signal to audit the temporal join before celebrating.</div>',
      },
      online: {
        accent: "control",
        node: {
          plain: {
            t: "Ready for instant answers",
            d: "The same signals available in milliseconds when needed live",
            tag: "For real-time",
          },
          tech: {
            t: "Online Feature Store",
            d: "Features published for low-latency lookup at inference",
            tag: "Serving path",
          },
        },
        drawer: {
          plain: {
            k: "Turning history into signals",
            t: "Ready For Instant Answers",
            d: "Supporting the case where a score is needed on the spot.",
          },
          tech: {
            k: "Feature Engineering",
            t: "Online Feature Store",
            d: "Low-latency feature lookup for real-time inference, from the same definitions.",
          },
        },
        plain:
          '\n      <p class="lead">Most of the time a nightly ranked list is exactly right. Occasionally someone needs an answer <b>immediately</b> — a rep has the customer on the phone right now.</p>\n      <h4>How that\'s handled</h4>\n      <ul>\n        <li>The same signals are kept somewhere they can be looked up in <b>milliseconds</b></li>\n        <li>The score is calculated on the spot, using the identical logic as the nightly run</li>\n        <li>Because both paths share one definition, the live answer and the overnight answer <b>can\'t disagree</b></li>\n      </ul>\n      <div class="note">This is optional, and worth being honest about: it adds real cost and complexity. If nobody needs a score inside a business day, the batch path alone is the better engineering decision.</div>',
        body: '\n      <h4>What it provides</h4>\n      <ul>\n        <li>Feature values published to the Online Feature Store for low-latency retrieval</li>\n        <li><b>Automatic feature lookup</b> at inference — the serving endpoint fetches features by entity key</li>\n        <li><b>On-demand computation</b> for features that must be derived from request-time input</li>\n      </ul>\n      <h4>Why it\'s the same definition</h4>\n      <ul>\n        <li>Offline training and online serving resolve from one feature definition, which is what keeps skew out</li>\n        <li>A separately reimplemented "real-time version" of a feature is a well-known source of silent divergence</li>\n      </ul>\n      <div class="note"><b>Honest scoping:</b> real-time serving is justified by a real latency requirement, not by novelty. Batch scoring covers most churn use cases at a fraction of the operational cost.</div>',
      },
      mlflow: {
        accent: "ingest",
        node: {
          plain: {
            t: "Keeping score",
            d: "Every experiment recorded — what was tried and how it did",
            tag: "Reproducible",
          },
          tech: {
            t: "MLflow Tracking",
            d: "Params, metrics, artifacts and data version captured per run",
            tag: "MLflow 3",
          },
        },
        drawer: {
          plain: {
            k: "Teaching the model",
            t: "Keeping Score",
            d: "Every attempt recorded, so nothing rests on memory.",
          },
          tech: {
            k: "Model Development",
            t: "MLflow Experiment Tracking",
            d: "Every run captured — parameters, metrics, artifacts and the data version behind them.",
          },
        },
        plain:
          '\n      <p class="lead">Building a model means trying many approaches. Without discipline, six weeks in, nobody can remember which version was best or how it was produced.</p>\n      <h4>What\'s recorded automatically</h4>\n      <ul>\n        <li>Every attempt, with its settings and its scores</li>\n        <li><b>Which data</b> it was trained on, and as of when</li>\n        <li>Who ran it and when</li>\n      </ul>\n      <h4>Why a client should care</h4>\n      <ul>\n        <li>Six months on, you can still answer <b>"why does this model behave this way?"</b></li>\n        <li>If a regulator or auditor asks how a decision was reached, there\'s a trail</li>\n        <li>The work doesn\'t leave with whoever built it</li>\n      </ul>\n      <div class="note">This is the difference between a model the business owns and a model that lives in one person\'s notebook.</div>',
        body: '\n      <h4>Captured per run</h4>\n      <ul>\n        <li>Hyperparameters, metrics and artifacts</li>\n        <li>Source notebook or bundle revision</li>\n        <li><b>Data version</b> — the Delta table version used, making the run reproducible via time travel</li>\n        <li>Feature lineage, inherited automatically from Feature Store usage</li>\n      </ul>\n      <h4>MLflow 3 on Databricks</h4>\n      <ul>\n        <li>Models capture parameters and metrics directly, surfaced on the model version page</li>\n        <li>Runs and models are visible <b>across workspaces</b>, not siloed per workspace</li>\n        <li>The registry URI defaults to <code>databricks-uc</code>, so UC is the registry by default</li>\n      </ul>\n      <div class="note">Reproducibility here is concrete, not aspirational: run ID → code revision → Delta version → feature lineage.</div>',
      },
      automl: {
        accent: "ingest",
        node: {
          plain: {
            t: "A fast first answer",
            d: "An automated baseline before investing in a custom model",
            tag: "Start here",
          },
          tech: {
            t: "AutoML Baseline",
            d: "Glass-box baseline with generated notebooks — the bar to beat",
            tag: "Baseline",
          },
        },
        drawer: {
          plain: {
            k: "Teaching the model",
            t: "A Fast First Answer",
            d: "Proving the idea has legs before spending weeks on it.",
          },
          tech: {
            k: "Model Development",
            t: "AutoML Baseline",
            d: "A transparent, fast baseline that every later model must beat.",
          },
        },
        plain:
          "\n      <p class=\"lead\">Before spending weeks hand-building a model, it's worth spending a day finding out whether the data can predict churn <b>at all</b>.</p>\n      <h4>What this does</h4>\n      <ul>\n        <li>Automatically tries a range of standard approaches</li>\n        <li>Reports how well the best one performs</li>\n        <li>Produces the actual code it used — nothing is hidden in a black box</li>\n      </ul>\n      <h4>Why it's a genuinely good idea</h4>\n      <ul>\n        <li>If the automated attempt performs poorly, that's an <b>early, cheap signal</b> — usually meaning the data or the label definition needs work, not the algorithm</li>\n        <li>If it performs well, you have a working baseline in days rather than weeks</li>\n        <li>Every custom model afterwards has a clear bar to beat, so effort is justified by measured improvement</li>\n      </ul>\n      <div class=\"note\">Finding out in week one that the approach won't work is a success, not a failure. It's far better than finding out in month three.</div>",
        body: "\n      <h4>Role in the workflow</h4>\n      <ul>\n        <li>Establishes a defensible baseline metric before bespoke development begins</li>\n        <li><b>Glass-box</b> — generates the underlying notebooks, so the baseline is inspectable and forkable rather than opaque</li>\n        <li>Handles the standard preprocessing and model search, surfacing the leaderboard in MLflow</li>\n      </ul>\n      <h4>Why the baseline discipline matters</h4>\n      <ul>\n        <li>Custom modelling effort has to be justified by measured lift over the baseline, not by assumption</li>\n        <li>A weak baseline is diagnostic — it usually indicates a feature or label problem, and points effort at the right layer</li>\n        <li>Generated notebooks are a legitimate starting point for the bespoke model rather than throwaway output</li>\n      </ul>",
      },
      eval: {
        accent: "ingest",
        node: {
          plain: {
            t: "Checking it properly",
            d: "Judged on the right measure, and checked for unfair bias",
            tag: "Not just accuracy",
          },
          tech: {
            t: "Evaluation & Signature",
            d: "PR-AUC on imbalance, calibration, slice analysis, required signature",
            tag: "Quality gate",
          },
        },
        drawer: {
          plain: {
            k: "Teaching the model",
            t: "Checking It Properly",
            d: 'Why "95% accurate" can mean a completely useless model.',
          },
          tech: {
            k: "Model Development",
            t: "Evaluation & Model Signature",
            d: "The quality gate — metrics chosen for the problem, not for the headline.",
          },
        },
        plain:
          '\n      <p class="lead">Suppose 5% of customers churn each year. A model that simply predicts <b>"nobody will ever leave"</b> is 95% accurate — and completely worthless.</p>\n      <p class="lead">This is why accuracy is the wrong measure for this problem, and why quoting it would be misleading.</p>\n      <h4>What\'s actually measured</h4>\n      <ul>\n        <li><b>Of the customers it flags, how many really do leave?</b> — flag everyone and you waste the team\'s time</li>\n        <li><b>Of the customers who leave, how many did it catch?</b> — miss most of them and there\'s no point</li>\n        <li><b>Are the risk scores meaningful?</b> — "80% likely" should mean roughly 80% of those customers actually leave</li>\n        <li><b>Does it work fairly across the board?</b> — a model strong on large accounts and weak on small ones is only half a model</li>\n      </ul>\n      <div class="note"><b>Worth asking any vendor:</b> when someone quotes a single accuracy number for a churn model, that number is almost certainly hiding the imbalance described above.</div>',
        body: '\n      <h4>Metrics that fit the problem</h4>\n      <ul>\n        <li><b>PR-AUC</b> as the headline — appropriate under class imbalance where ROC-AUC flatters</li>\n        <li><b>Precision@k</b> — the operationally meaningful measure, since the team can only work a fixed-size list</li>\n        <li><b>Calibration</b> — predicted probabilities must be trustworthy if they drive prioritisation or spend</li>\n        <li><b>Slice analysis</b> — performance by segment, tenure and value band, to catch aggregate metrics hiding segment failure</li>\n      </ul>\n      <h4>Model signature</h4>\n      <ul>\n        <li>Unity Catalog <b>requires a model signature</b> on every registered version — input and output schema are explicit</li>\n        <li>This turns a schema mismatch into a clear error at deployment rather than corrupted scores in production</li>\n      </ul>\n      <div class="note">Threshold selection is a business decision, not a default: it trades investigation capacity against customers missed, and belongs in a conversation with whoever works the list.</div>',
      },
      registry: {
        accent: "gold",
        node: {
          plain: {
            t: "The approved model list",
            d: "One official place recording which models exist",
            tag: "Single source",
          },
          tech: {
            t: "UC Model Registry",
            d: "Models as governed UC objects — catalog.schema.model",
            tag: "Three-level",
          },
        },
        drawer: {
          plain: {
            k: "Approving what goes live",
            t: "The Approved Model List",
            d: "One official record of which models exist and who may use them.",
          },
          tech: {
            k: "Governance & Registry",
            t: "Unity Catalog Model Registry",
            d: "Models governed as first-class UC objects, in the same namespace as data.",
          },
        },
        plain:
          '\n      <p class="lead">Models are registered in one official place — the same governed system that controls the data itself. Not a file on a laptop, not a notebook someone bookmarked.</p>\n      <h4>What that gives you</h4>\n      <ul>\n        <li>A definitive answer to <b>"which model is actually running right now?"</b></li>\n        <li>Controlled permissions — who can create, who can approve, who can use</li>\n        <li>Full history, so you can always see what came before and go back to it</li>\n        <li>Traceability from a live prediction all the way back to the data it learned from</li>\n      </ul>\n      <div class="note">If a customer ever asks why they were flagged as at-risk, that question is answerable. Models governed as loose files can\'t answer it.</div>',
        body: '\n      <h4>Three-level namespace</h4>\n      <ul>\n        <li>Models are addressed as <code>catalog.schema.model</code> — e.g. <code>prod.ml_churn.churn_model</code></li>\n        <li>The <b>catalog expresses the environment</b>, which is how dev/staging/prod separation is represented</li>\n        <li>Models sit in the same governance plane as tables and features — one permission model, not two</li>\n      </ul>\n      <h4>Privileges</h4>\n      <div class="kv">\n        <span>USE CATALOG</span><span>USE SCHEMA</span><span>CREATE MODEL</span>\n        <span>CREATE MODEL VERSION</span><span>EXECUTE</span>\n      </div>\n      <h4>What this replaces</h4>\n      <ul>\n        <li>The workspace-scoped model registry, which was siloed per workspace and separate from data governance</li>\n        <li>Lineage now spans data → features → model → predictions in a single graph</li>\n      </ul>',
      },
      alias: {
        accent: "gold",
        node: {
          plain: {
            t: "Champion & Challenger",
            d: "A new model proves itself before replacing the current one",
            tag: "Safe rollout",
          },
          tech: {
            t: "Aliases — Champion / Challenger",
            d: "Mutable pointers to versions; UC has no stages",
            tag: "Deployment",
          },
        },
        drawer: {
          plain: {
            k: "Approving what goes live",
            t: "Champion & Challenger",
            d: "How a new model earns its place without risking the current one.",
          },
          tech: {
            k: "Governance & Registry",
            t: "Model Aliases",
            d: "Deployment by mutable alias rather than by stage — the UC pattern.",
          },
        },
        plain:
          '\n      <p class="lead">There\'s always one model officially in charge — the <b>Champion</b>. When a new one is built, it doesn\'t simply take over.</p>\n      <h4>How a new model earns the job</h4>\n      <ul>\n        <li>The new model becomes the <b>Challenger</b> and runs quietly alongside</li>\n        <li>Both make predictions on the same real customers</li>\n        <li>After enough time, the two are compared on <b>what actually happened</b></li>\n        <li>Only if the Challenger genuinely does better does it become the new Champion</li>\n        <li>If the change goes badly, reverting is <b>instant</b> — the previous version is untouched</li>\n      </ul>\n      <div class="note"><b>The business reason:</b> a model that looked better in testing can still be worse in reality. This makes that discovery cheap and reversible instead of expensive and public.</div>',
        body: '\n      <h4>Aliases, not stages</h4>\n      <ul>\n        <li>Unity Catalog <b>does not support MLflow stages</b>. Deployment is expressed through <b>aliases</b> — mutable named pointers to a specific version</li>\n        <li>Loading by alias: <code>models:/prod.ml_churn.churn_model@Champion</code></li>\n        <li>Promotion is a pointer reassignment — no code change, no redeploy, instantly reversible</li>\n      </ul>\n      <h4>The pattern in practice</h4>\n      <ul>\n        <li><code>@Champion</code> serves production traffic</li>\n        <li><code>@Challenger</code> scores in parallel, writing to the same inference table with a model-version tag</li>\n        <li>Comparison happens on <b>realised outcomes</b>, not offline metrics — the only comparison that settles the question</li>\n        <li>Rollback is reassigning <code>@Champion</code> to the prior version</li>\n      </ul>\n      <div class="note">Anyone still describing Staging/Production <i>stages</i> on Unity Catalog is working from the old workspace registry model.</div>',
      },
      promote: {
        accent: "gold",
        node: {
          plain: {
            t: "Dev → Test → Live",
            d: "Nothing reaches customers without passing through checks",
            tag: "Controlled",
          },
          tech: {
            t: "Environment Promotion",
            d: "Deploy-code-as-default; copy_model_version where required",
            tag: "Dev/Stg/Prod",
          },
        },
        drawer: {
          plain: {
            k: "Approving what goes live",
            t: "Dev → Test → Live",
            d: "The route every model takes before it touches a real customer.",
          },
          tech: {
            k: "Governance & Registry",
            t: "Environment Promotion",
            d: "Deploy code by default; promote artifacts only where genuinely required.",
          },
        },
        plain:
          "\n      <p class=\"lead\">A model built this morning cannot reach customers this afternoon. It moves through separate environments, each with its own checks.</p>\n      <h4>The route</h4>\n      <ul>\n        <li><b>Development</b> — where it's built and experimented on</li>\n        <li><b>Test</b> — validated against realistic data, reviewed by someone else</li>\n        <li><b>Live</b> — only after passing everything before it</li>\n      </ul>\n      <h4>Why the separation is real</h4>\n      <ul>\n        <li>Each environment has <b>its own permissions</b> — the people who build are not automatically the people who can release</li>\n        <li>An experiment can't accidentally affect real customers</li>\n        <li>There's an auditable record of who approved what</li>\n      </ul>",
        body: "\n      <h4>Deploy code, not artifacts</h4>\n      <ul>\n        <li>Databricks recommends <b>deploying ML pipelines as code</b> — the training pipeline runs in the target environment and produces the model there</li>\n        <li>This removes a whole class of environment-mismatch bugs, since the model is built where it will run</li>\n        <li>Environments are separate <b>catalogs</b>, so promotion is expressed in the namespace</li>\n      </ul>\n      <h4>Where artifact promotion is still needed</h4>\n      <ul>\n        <li><code>copy_model_version()</code> copies a version across catalogs where retraining in prod isn't viable</li>\n        <li>Requires read on source and write on destination — the permission boundary is the control</li>\n        <li>The alias is then set on the destination model to activate it</li>\n      </ul>",
      },
      batch: {
        accent: "serve",
        node: {
          plain: {
            t: "The morning list",
            d: "Every customer scored overnight, ranked by risk",
            tag: "Main path",
          },
          tech: {
            t: "Batch Scoring Job",
            d: "Scheduled Workflow scoring to a Delta table",
            tag: "Primary",
          },
        },
        drawer: {
          plain: {
            k: "Getting it to the team",
            t: "The Morning List",
            d: "The main output — and the one that actually gets used.",
          },
          tech: {
            k: "Serving & Action",
            t: "Batch Scoring",
            d: "A scheduled Workflow producing scored output to Delta.",
          },
        },
        plain:
          '\n      <p class="lead">Every night the system scores the entire customer base. Each morning the team has a <b>ranked list</b>: who is most at risk, and which signals drove it.</p>\n      <h4>Why the "why" matters as much as the score</h4>\n      <ul>\n        <li>"This customer is 80% likely to leave" prompts the question <b>"so what do I do?"</b></li>\n        <li>"...mainly because their order frequency halved and they\'ve raised three tickets this month" is <b>actionable</b></li>\n        <li>Without the reasons, the list gets ignored within a fortnight — and this is the most common way a churn project quietly dies</li>\n      </ul>\n      <div class="note">Nightly is deliberately chosen. Churn risk doesn\'t meaningfully change minute to minute, and a nightly job is dramatically simpler and cheaper to run than a live service.</div>',
        body: '\n      <h4>The job</h4>\n      <ul>\n        <li>Scheduled Databricks Workflow, loading the model by alias: <code>models:/prod.ml_churn.churn_model@Champion</code></li>\n        <li>Features resolved through the Feature Store, so scoring uses the same definitions as training</li>\n        <li>Output written to a governed Delta table with <b>model version and scoring timestamp stamped on every row</b></li>\n      </ul>\n      <h4>Explanations alongside scores</h4>\n      <ul>\n        <li>Per-prediction feature attributions computed and stored with the score</li>\n        <li>Adoption depends on this — a ranked list without reasons gets abandoned</li>\n      </ul>\n      <div class="note">Stamping the model version on every scored row is what makes retrospective Champion/Challenger comparison possible at all.</div>',
      },
      realtime: {
        accent: "serve",
        node: {
          plain: {
            t: "On-demand scoring",
            d: "A live answer when someone needs it mid-conversation",
            tag: "Optional",
          },
          tech: {
            t: "Model Serving Endpoint",
            d: "Serverless endpoint with inference tables enabled",
            tag: "When justified",
          },
        },
        drawer: {
          plain: {
            k: "Getting it to the team",
            t: "On-Demand Scoring",
            d: "For the moments when overnight isn't soon enough.",
          },
          tech: {
            k: "Serving & Action",
            t: "Real-Time Model Serving",
            d: "A serverless endpoint, with inference tables feeding the monitoring loop.",
          },
        },
        plain:
          '\n      <p class="lead">Sometimes the answer is needed <b>right now</b> — a rep is on a call, or a customer is mid-way through cancelling online.</p>\n      <h4>How it works</h4>\n      <ul>\n        <li>The same model is made available as a live service</li>\n        <li>Applications ask it for a score and get an answer in <b>well under a second</b></li>\n        <li>Every request and response is <b>logged automatically</b> — which is what makes the self-monitoring possible</li>\n      </ul>\n      <div class="note"><b>Deliberately marked optional.</b> This adds meaningful cost and operational burden. It\'s the right choice only when a real workflow genuinely can\'t wait until tomorrow — and for many churn programmes, it can.</div>',
        body: '\n      <h4>The endpoint</h4>\n      <ul>\n        <li>Serverless model serving, backed by the alias rather than a pinned version</li>\n        <li><b>Inference tables enabled</b> — requests and responses land automatically in a governed Delta table</li>\n        <li>Online feature lookup by entity key, plus on-demand computation for request-time features</li>\n      </ul>\n      <h4>Why inference tables matter more than the latency</h4>\n      <ul>\n        <li>They are the substrate the entire monitoring loop is built on — inputs, predictions and later ground truth in one governed place</li>\n        <li>Without them, production behaviour has to be reconstructed from logs after the fact, if at all</li>\n      </ul>\n      <div class="note"><b>Scoping honestly:</b> justify real-time by a latency requirement in an actual workflow. Batch covers most churn programmes at a fraction of the cost.</div>',
      },
      writeback: {
        accent: "serve",
        node: {
          plain: {
            t: "Into the tools they use",
            d: "Scores pushed into the CRM and dashboards, not a separate portal",
            tag: "Adoption",
          },
          tech: {
            t: "Write-Back & Dashboards",
            d: "Scores to CRM and AI/BI; outcomes return as labels",
            tag: "Closes the loop",
          },
        },
        drawer: {
          plain: {
            k: "Getting it to the team",
            t: "Into The Tools They Use",
            d: "The step that decides whether any of this gets used at all.",
          },
          tech: {
            k: "Serving & Action",
            t: "Write-Back & Feedback Loop",
            d: "Delivery into existing tools, and outcome capture for the next training cycle.",
          },
        },
        plain:
          '\n      <p class="lead">This is where most ML projects fail, and it has nothing to do with the modelling.</p>\n      <p class="lead">A model can be excellent and still deliver nothing, because the predictions live in a system nobody opens. If a rep has to log into a separate tool to see risk scores, <b>they won\'t</b>.</p>\n      <h4>So the scores go to them</h4>\n      <ul>\n        <li>Written <b>back into the CRM</b>, on the customer record the team already looks at daily</li>\n        <li>Surfaced on the dashboards management already reviews</li>\n        <li>High-risk, high-value accounts can trigger an alert rather than waiting to be noticed</li>\n      </ul>\n      <h4>And the results come back</h4>\n      <ul>\n        <li>What the team <b>did</b> about each flagged customer, and what happened afterwards, is recorded</li>\n        <li>That becomes training data, so the model learns from its own track record</li>\n        <li>It also answers the question that actually matters: <b>is this making a commercial difference?</b></li>\n      </ul>\n      <div class="note">A model that changes no behaviour has no value, however accurate it is. Delivery is part of the architecture, not an afterthought.</div>',
        body: '\n      <h4>Delivery paths</h4>\n      <ul>\n        <li>Scores written back to the CRM so they appear in the existing workflow, not a parallel one</li>\n        <li>AI/BI dashboards over the scored Delta table for management view</li>\n        <li>Threshold-based alerting for high-value at-risk accounts</li>\n      </ul>\n      <h4>The feedback loop</h4>\n      <ul>\n        <li><b>Intervention outcomes captured</b> — what action was taken, and what followed</li>\n        <li>Those outcomes become future labels, so the model improves against reality rather than a frozen snapshot</li>\n        <li>Enables measurement of <b>incremental retention lift</b>, which is the number that justifies the programme</li>\n      </ul>\n      <div class="note"><b>The honest measurement problem:</b> once the business acts on predictions, a correctly-flagged customer who is then saved looks like a false positive. Holdout groups are the only clean way to measure real lift — and they have to be designed in from the start, not bolted on later.</div>',
      },
      uc: {
        accent: "plat",
        node: {
          plain: {
            t: "🛡️ Who can see what",
            d: "One rulebook covering data, features, models and predictions",
            tag: "Governance",
          },
          tech: {
            t: "🛡️ Unity Catalog",
            d: "One governance plane — permissions, lineage, masking, audit",
            tag: "Governance",
          },
        },
        drawer: {
          plain: {
            k: "Behind the scenes",
            t: "Who Can See What",
            d: "One set of rules across everything, rather than four separate systems.",
          },
          tech: {
            k: "Platform",
            t: "Unity Catalog",
            d: "A single governance plane spanning data, features, models and predictions.",
          },
        },
        plain:
          '\n      <p class="lead">Customer data is sensitive, and predictions about customers are arguably <b>more</b> sensitive. One rulebook governs all of it.</p>\n      <h4>What it controls</h4>\n      <ul>\n        <li><b>Who can see which data</b> — down to individual columns, so an analyst can work with purchase patterns without seeing personal contact details</li>\n        <li><b>Automatic masking</b> — the same table shows full detail to one team and hidden values to another, with no duplicate copies to keep in sync</li>\n        <li><b>Where everything came from</b> — trace any prediction back through the model, the features and the source data</li>\n        <li><b>A complete audit trail</b> — who accessed what, and when</li>\n      </ul>\n      <h4>Why the lineage genuinely matters</h4>\n      <ul>\n        <li>If a data quality problem is found, you can see <b>exactly which models and reports were affected</b></li>\n        <li>Under GDPR-style rules, "explain how this decision was made" has a real answer</li>\n        <li>Changing an upstream table shows you what will break <b>before</b> you change it</li>\n      </ul>\n      <div class="note">Governance retrofitted onto a working ML system is painful and usually incomplete. Designed in from the start, it costs almost nothing.</div>',
        body: '\n      <h4>What sits under UC governance</h4>\n      <ul>\n        <li>Delta tables across every medallion layer</li>\n        <li><b>Feature Views and feature tables</b></li>\n        <li><b>Registered models and versions</b></li>\n        <li>Inference tables and scored output</li>\n      </ul>\n      <h4>Capabilities used</h4>\n      <ul>\n        <li><b>Three-level namespace</b> — <code>catalog.schema.object</code>, with catalog expressing environment</li>\n        <li><b>Fine-grained access control</b> — row filters and column masks applied at query time</li>\n        <li><b>End-to-end lineage</b> — table → feature → model → prediction as one graph</li>\n        <li><b>Audit logs</b> across data and model access alike</li>\n      </ul>\n      <div class="note">The structural win: models and features are governed <b>by the same system as the data</b>, so there is one permission model to reason about rather than several that drift apart.</div>',
      },
      monitor: {
        accent: "plat",
        node: {
          plain: {
            t: "📉 Noticing when it goes stale",
            d: "Models decay as the world changes — this catches it",
            tag: "Self-checking",
          },
          tech: {
            t: "📉 Lakehouse Monitoring",
            d: "Inference profile over serving tables; drift metrics drive retraining",
            tag: "Drift",
          },
        },
        drawer: {
          plain: {
            k: "Behind the scenes",
            t: "Noticing When It Goes Stale",
            d: "Every model decays. The question is whether anyone notices.",
          },
          tech: {
            k: "Platform",
            t: "Lakehouse Monitoring & Retraining",
            d: "Inference profiling over serving tables, with drift driving the retraining trigger.",
          },
        },
        plain:
          '\n      <p class="lead">Here\'s something rarely mentioned in ML sales pitches: <b>every model gets worse over time.</b> Not because it breaks, but because the world moves on.</p>\n      <h4>Why it happens</h4>\n      <ul>\n        <li>Customer behaviour shifts — what predicted churn in 2024 may not in 2026</li>\n        <li>The business changes — new products, new pricing, new segments</li>\n        <li>An upstream system changes how it records something, and a signal quietly changes meaning</li>\n      </ul>\n      <h4>What this system does about it</h4>\n      <ul>\n        <li>Continuously compares <b>today\'s customers to the ones the model learned from</b></li>\n        <li>Tracks whether predictions still match what actually happens</li>\n        <li>Raises an alert when either drifts beyond an agreed threshold</li>\n        <li>Can automatically start retraining — but a human still approves what goes live</li>\n      </ul>\n      <div class="note"><b>Worth asking any ML vendor:</b> "how will I know when this stops working?" A system that can\'t answer that will quietly degrade for months, and the business will keep acting on it the whole time.</div>',
        body: '\n      <h4>Monitor configuration</h4>\n      <ul>\n        <li><b>Inference profile</b> over the inference / scored table — the profile type built for model monitoring</li>\n        <li>Tracks model inputs, predictions and, once available, <b>ground-truth labels</b></li>\n        <li>A <b>baseline table</b> pins the training distribution as the reference point</li>\n      </ul>\n      <h4>What it produces</h4>\n      <ul>\n        <li>A <b>profile metrics table</b> — summary statistics per window</li>\n        <li>A <b>drift metrics table</b> — statistical change versus baseline or the prior window</li>\n        <li>An auto-generated dashboard, plus alerts driven off the metrics tables</li>\n      </ul>\n      <h4>The retraining loop</h4>\n      <ul>\n        <li>Feature drift or a performance drop past threshold raises an alert and can trigger the training Workflow</li>\n        <li>The candidate registers as a new version and takes the <code>@Challenger</code> alias</li>\n        <li><b>Promotion stays a human decision</b> — automated retraining, deliberately not automated deployment</li>\n      </ul>\n      <div class="note">Ground truth arrives late in churn — you only learn who left months afterwards. So input drift is the early warning, and outcome-based performance is the confirming signal that follows.</div>',
      },
      cicd: {
        accent: "plat",
        node: {
          plain: {
            t: "⚙️ Safe release process",
            d: "Everything defined as code, reviewed and versioned",
            tag: "Reliability",
          },
          tech: {
            t: "⚙️ Databricks Asset Bundles",
            d: "Jobs, notebooks and config as code; Azure DevOps promotion",
            tag: "CI/CD",
          },
        },
        drawer: {
          plain: {
            k: "Behind the scenes",
            t: "Safe Release Process",
            d: "The whole system defined as code, not assembled by hand.",
          },
          tech: {
            k: "Platform",
            t: "Databricks Asset Bundles & CI/CD",
            d: "The entire ML system declared as code and promoted through environments.",
          },
        },
        plain:
          '\n      <p class="lead">Everything here — the data jobs, the training, the schedules, the permissions — is <b>written down as code</b> rather than clicked together by hand.</p>\n      <h4>Why that\'s worth insisting on</h4>\n      <ul>\n        <li>The whole system can be <b>rebuilt from scratch</b> if it ever needs to be</li>\n        <li>Every change is reviewed by another person before it goes live</li>\n        <li>Complete history of what changed, when and why</li>\n        <li>Test and live environments are <b>genuinely identical</b>, because both are built from the same definition</li>\n      </ul>\n      <div class="note">The practical test: if the person who built it left tomorrow, could someone else rebuild it? Here the answer is yes, because the system <i>is</i> the code.</div>',
        body: '\n      <h4>What the bundle declares</h4>\n      <ul>\n        <li>Workflow definitions — training, batch scoring, monitoring refresh</li>\n        <li>Notebook and source paths, cluster and serverless configuration</li>\n        <li>Per-environment target variables — catalog names, schedules, endpoint sizing</li>\n      </ul>\n      <h4>The pipeline</h4>\n      <ul>\n        <li>Git-backed repo; every change is a branch and a pull request</li>\n        <li>CI validates the bundle and runs unit tests on feature and training logic</li>\n        <li><code>bundle deploy</code> per environment target, driven from <b>Azure DevOps</b> — consistent with the existing release process</li>\n        <li>Environment differences live in bundle variables, never in edited copies of a notebook</li>\n      </ul>\n      <div class="note">This pairs with deploy-code-not-artifacts: the bundle deploys the training pipeline into the target environment, where it produces the model in place.</div>',
      },
      cost: {
        accent: "plat",
        node: {
          plain: {
            t: "💰 Keeping the bill sensible",
            d: "Compute sized to the job, and switched off when idle",
            tag: "Cost control",
          },
          tech: {
            t: "💰 Compute & Cost Design",
            d: "Serverless jobs, right-sized clusters, batch-first defaults",
            tag: "FinOps",
          },
        },
        drawer: {
          plain: {
            k: "Behind the scenes",
            t: "Keeping The Bill Sensible",
            d: 'The question every client asks second, right after "does it work?"',
          },
          tech: {
            k: "Platform",
            t: "Compute & Cost Design",
            d: "Deliberate compute choices — the difference between a viable programme and a cancelled one.",
          },
        },
        plain:
          '\n      <p class="lead">Cloud ML platforms are easy to overspend on. Most of the waste comes from machines left running that nobody is using.</p>\n      <h4>Choices that keep this affordable</h4>\n      <ul>\n        <li>Compute <b>starts when a job runs and stops when it finishes</b> — nothing idles overnight</li>\n        <li>Nightly batch scoring instead of a live service, unless a live service is genuinely needed</li>\n        <li>Training runs on a schedule appropriate to how fast the data actually changes, not continuously</li>\n        <li>Machines sized to the actual work rather than to a worst case that never arrives</li>\n      </ul>\n      <div class="note"><b>The largest single saving is architectural:</b> choosing batch over real-time where the business doesn\'t need real-time. That one decision typically costs more than every tuning optimisation combined.</div>',
        body: '\n      <h4>Compute strategy</h4>\n      <ul>\n        <li><b>Job compute, not all-purpose</b>, for scheduled work — cheaper per unit and terminates on completion</li>\n        <li><b>Serverless</b> where startup latency dominates runtime, avoiding idle spend entirely</li>\n        <li>SQL warehouses with auto-stop for the BI layer</li>\n        <li>Scoring frequency matched to how quickly churn risk actually moves — daily, not hourly</li>\n      </ul>\n      <h4>Where cost is really decided</h4>\n      <ul>\n        <li><b>Batch versus real-time is the dominant lever</b> — an always-on endpoint costs continuously, a nightly job costs for minutes</li>\n        <li>Feature computation reused across training and scoring rather than recomputed per path</li>\n        <li>Retraining triggered by drift rather than by a fixed aggressive schedule</li>\n      </ul>\n      <div class="note">Cost per prediction is a legitimate architectural metric. Quoting it up front tends to be what separates a proposal that gets approved from one that stalls in procurement.</div>',
      },
      why: {
        accent: "plat",
        node: {
          plain: {
            t: "💡 Why it's designed this way",
            d: "What separates ML that ships from ML that stalls",
            tag: "Read this",
          },
          tech: {
            t: "💡 Why This Design",
            d: "Governance, correctness and delivery as first-class concerns",
            tag: "Rationale",
          },
        },
        drawer: {
          plain: {
            k: "The thinking",
            t: "Why It's Designed This Way",
            d: "Most ML projects don't fail on the modelling.",
          },
          tech: {
            k: "Design Rationale",
            t: "Why This Design",
            d: "Optimised for the failure modes that actually kill ML programmes.",
          },
        },
        plain:
          "\n      <p class=\"lead\">Industry surveys consistently find that most machine learning projects never make it into production. Almost none of them fail because the maths was wrong.</p>\n      <h4>What actually kills them</h4>\n      <ul>\n        <li><b>Nobody uses the output</b> — it lives in a tool the team doesn't open</li>\n        <li><b>It quietly goes stale</b> — accuracy decays for months and nobody notices</li>\n        <li><b>It can't be explained</b> — someone asks why a customer was flagged and there's no answer</li>\n        <li><b>It can't be rebuilt</b> — the person who made it left, and it existed only in their notebook</li>\n        <li><b>It was solving the wrong problem</b> — churn was never properly defined at the start</li>\n      </ul>\n      <h4>Each of those has a deliberate answer here</h4>\n      <ul>\n        <li>Predictions go <b>into the CRM the team already uses</b>, with reasons attached</li>\n        <li>The system <b>monitors its own accuracy</b> and raises a flag when it slips</li>\n        <li>Every prediction is <b>traceable</b> back to the model, features and data behind it</li>\n        <li>The whole system is <b>code</b>, so it can be rebuilt by anyone</li>\n        <li><b>Defining churn</b> is the first step, not an afterthought</li>\n      </ul>\n      <div class=\"note\"><b>In one line:</b> the modelling is the easy part. This design puts its effort into the parts that actually decide whether an ML programme survives contact with a real business.</div>",
        body: '\n      <h4>Optimised against real failure modes</h4>\n      <ul>\n        <li><b>Adoption</b> — write-back into existing workflows, with per-prediction explanations; a standalone dashboard is an adoption risk, not a deliverable</li>\n        <li><b>Silent decay</b> — inference profiling and drift metrics make degradation visible rather than assumed</li>\n        <li><b>Explainability</b> — UC lineage spans data → feature → model → prediction as one graph</li>\n        <li><b>Bus factor</b> — Asset Bundles make the system reproducible from source</li>\n        <li><b>Problem definition</b> — label and horizon pinned in code before modelling starts</li>\n      </ul>\n      <h4>Deliberate choices worth defending</h4>\n      <ul>\n        <li><b>Batch-first</b> — real-time serving is opt-in, justified by a latency requirement rather than assumed</li>\n        <li><b>Automated retraining, manual promotion</b> — automating the expensive, repeatable half while keeping a human on the risky half</li>\n        <li><b>Champion/Challenger on realised outcomes</b> — offline metrics inform, live outcomes decide</li>\n        <li><b>PR-AUC and precision@k</b> — metrics matched to imbalance and to a fixed-capacity worklist</li>\n      </ul>\n      <h4>Trade-offs, honestly</h4>\n      <ul>\n        <li>Heavier upfront investment than a notebook that produces a scored CSV — and for a genuine one-off analysis, the notebook is the right answer</li>\n        <li>Feature Views constrain how features are expressed in exchange for managed pipelines and lineage</li>\n        <li>Holdout groups for measuring true lift cost some retention in the short term to prove the programme works at all</li>\n        <li>The monitoring loop only fully closes when ground truth arrives, which for churn is months later</li>\n      </ul>\n      <div class="note"><b>Verdict:</b> this is deliberately sized for a system meant to run for years and be defended to auditors — not for a proof of concept. The right architecture depends on which of those is being built.</div>',
      },
      w1: {
        accent: "ingest",
        node: {
          plain: {
            t: "Kick off",
            d: "Starts on a schedule — or when monitoring raises a flag",
          },
          tech: {
            t: "Trigger",
            d: "Cron schedule or drift-alert trigger",
          },
        },
        drawer: {
          plain: {
            k: "Training · Step 1",
            t: "Kick Off",
            d: "Where a training run begins — and why it began.",
          },
          tech: {
            k: "Training · Step 1",
            t: "Trigger",
            d: "Two entry points into the training pipeline.",
          },
        },
        plain:
          '<p class="lead">Training doesn\'t run every night — that would be wasteful. It runs when there\'s a reason to.</p>\n      <h4>Two reasons to retrain</h4>\n      <ul>\n        <li><b>Scheduled</b> — a regular refresh, so the model keeps learning from recent customers</li>\n        <li><b>Triggered</b> — monitoring noticed the model slipping and asked for a new one</li>\n      </ul>\n      <div class="note">The second is what makes this self-correcting. Most systems only ever retrain on a calendar, which means they stay stale in exactly the situations where staleness matters most.</div>',
        body: "<h4>Entry points</h4>\n      <ul>\n        <li><b>Scheduled</b> — periodic refresh aligned to how fast the underlying behaviour moves</li>\n        <li><b>Drift-triggered</b> — fired from the monitoring alert at step 13</li>\n      </ul>\n      <h4>Run context captured</h4>\n      <ul><li>Trigger reason is logged on the run, so a model version can always be traced to <i>why</i> it was built</li></ul>",
      },
      w2: {
        accent: "ingest",
        node: {
          plain: {
            t: "Rebuild the answer key",
            d: "Who actually churned, in the window being learned from",
          },
          tech: {
            t: "Label Build",
            d: "Churn event + horizon recomputed as of run date",
          },
        },
        drawer: {
          plain: {
            k: "Training · Step 2",
            t: "Rebuild The Answer Key",
            d: "Establishing the truth the model learns from.",
          },
          tech: {
            k: "Training · Step 2",
            t: "Label Construction",
            d: "Labels recomputed for the current window using the pinned definition.",
          },
        },
        plain:
          "<p class=\"lead\">Before a model can learn, it needs examples with known outcomes — customers who did leave, and comparable ones who didn't.</p>\n      <h4>What happens here</h4>\n      <ul>\n        <li>The agreed churn definition is applied to the current window</li>\n        <li>Each example is stamped with <b>the date it's being predicted from</b></li>\n        <li>The same definition is used every single time — it's in code, not in someone's head</li>\n      </ul>",
        body: "<h4>Recomputed per run</h4>\n      <ul>\n        <li>Churn events resolved over the observation window using the version-controlled definition</li>\n        <li>Each row carries its <b>observation timestamp</b>, which step 3 depends on</li>\n        <li>Class balance logged — a sudden shift is itself a signal worth alerting on</li>\n      </ul>",
      },
      w3: {
        accent: "ingest",
        node: {
          plain: {
            t: "Assemble training data",
            d: "Features exactly as they stood at each point in time",
          },
          tech: {
            t: "Point-in-Time Join",
            d: "Feature Store training set built per observation timestamp",
          },
        },
        drawer: {
          plain: {
            k: "Training · Step 3",
            t: "Assemble Training Data",
            d: "The step where leakage gets designed out.",
          },
          tech: {
            k: "Training · Step 3",
            t: "Training Set Assembly",
            d: "Point-in-time correct join between labels and features.",
          },
        },
        plain:
          '<p class="lead">Each labelled example is matched with the signals <b>as they looked on that date</b> — never as they look now.</p>\n      <div class="note">This is the step that decides whether the model works in production or only in testing. Get it wrong and the scores look wonderful and mean nothing.</div>',
        body: "<h4>Mechanism</h4>\n      <ul>\n        <li>Feature Store training set built with a <b>point-in-time join</b> on the observation timestamp</li>\n        <li>Feature lineage is captured automatically and travels with the model</li>\n        <li>The identical lookup logic is reused at scoring time, eliminating train/serve skew</li>\n      </ul>",
      },
      w4: {
        accent: "ingest",
        node: {
          plain: {
            t: "Train the model",
            d: "Every setting and result recorded automatically",
          },
          tech: {
            t: "Train + MLflow Log",
            d: "Params, metrics, data version, signature",
          },
        },
        drawer: {
          plain: {
            k: "Training · Step 4",
            t: "Train The Model",
            d: "The part everyone pictures — and the least risky part.",
          },
          tech: {
            k: "Training · Step 4",
            t: "Train & Track",
            d: "Fit the candidate, log everything needed to reproduce it.",
          },
        },
        plain:
          '<p class="lead">The model learns the patterns that separated customers who left from those who stayed.</p>\n      <h4>Recorded automatically</h4>\n      <ul>\n        <li>Every setting used, and every score achieved</li>\n        <li><b>Exactly which data</b> it learned from, and as of when</li>\n      </ul>\n      <div class="note">Worth saying plainly: this is the easy step. The steps either side of it are where projects succeed or fail.</div>',
        body: "<h4>Logged to MLflow</h4>\n      <ul>\n        <li>Hyperparameters, metrics, artifacts</li>\n        <li><b>Delta table version</b> — reproducible via time travel</li>\n        <li><b>Model signature</b> — required for Unity Catalog registration</li>\n        <li>Source revision from the deployed bundle</li>\n      </ul>",
      },
      w5: {
        accent: "ingest",
        node: {
          plain: {
            t: "Compare to the current model",
            d: "Judged on the same data, on the right measures",
          },
          tech: {
            t: "Evaluate vs Champion",
            d: "PR-AUC, precision@k, calibration, slice analysis",
          },
        },
        drawer: {
          plain: {
            k: "Training · Step 5",
            t: "Compare To The Current Model",
            d: "A new model has to prove it is actually an improvement.",
          },
          tech: {
            k: "Training · Step 5",
            t: "Evaluation Against Champion",
            d: "Head-to-head on a common holdout, using metrics fit for the problem.",
          },
        },
        plain:
          '<p class="lead">"Newer" doesn\'t mean "better". The candidate is measured head-to-head against the model currently in charge, on identical data.</p>\n      <h4>What\'s checked</h4>\n      <ul>\n        <li>Of the customers flagged, how many really do leave</li>\n        <li>Of those who leave, how many were caught</li>\n        <li>Whether it performs across <b>all</b> customer segments, not just the easy ones</li>\n      </ul>',
        body: "<h4>Comparison</h4>\n      <ul>\n        <li>Both models scored on a common holdout — <b>PR-AUC</b> and <b>precision@k</b> as primaries</li>\n        <li>Calibration checked, since scores drive prioritisation</li>\n        <li><b>Slice analysis</b> by tenure and value band — an aggregate gain hiding a segment regression is a fail</li>\n      </ul>",
      },
      w6: {
        accent: "ingest",
        node: {
          plain: {
            t: "Better? If not, stop",
            d: "A worse model gets rejected here — nothing changes",
          },
          tech: {
            t: "Quality Gate",
            d: "Pass → register + @Challenger. Fail → halt and alert",
          },
        },
        drawer: {
          plain: {
            k: "Training · Step 6",
            t: "The Gate",
            d: "The point where a bad model gets stopped.",
          },
          tech: {
            k: "Training · Step 6",
            t: "Quality Gate",
            d: "A hard branch — register as Challenger, or halt with an alert.",
          },
        },
        plain:
          '<p class="lead">If the new model isn\'t better, the run <b>stops here</b>. The existing model carries on untouched and someone is told why.</p>\n      <h4>Why an explicit stop matters</h4>\n      <ul>\n        <li>Automated retraining without a gate will eventually promote something worse</li>\n        <li>A failed gate is <b>useful information</b> — it usually means the data changed, not that the code broke</li>\n      </ul>\n      <div class="note">A pipeline that always produces a new live model is not an achievement. Knowing when <i>not</i> to is.</div>',
        body: "<h4>Branch logic</h4>\n      <ul>\n        <li><b>Pass</b> — register a new version in UC, assign the <code>@Challenger</code> alias</li>\n        <li><b>Fail</b> — halt, leave <code>@Champion</code> untouched, raise an alert with the comparison attached</li>\n        <li>Thresholds are explicit and version-controlled, not implicit in a notebook</li>\n      </ul>",
        gate: true,
      },
      w7: {
        accent: "ingest",
        node: {
          plain: {
            t: "A person approves",
            d: "Automation proposes — a human decides what goes live",
          },
          tech: {
            t: "Manual Promotion",
            d: "Reassign @Champion after review",
          },
        },
        drawer: {
          plain: {
            k: "Training · Step 7",
            t: "A Person Approves",
            d: "The one step deliberately left manual.",
          },
          tech: {
            k: "Training · Step 7",
            t: "Promotion",
            d: "Alias reassignment as a reviewed, human action.",
          },
        },
        plain:
          '<p class="lead">Everything up to here is automatic. This step is not, and that\'s on purpose.</p>\n      <h4>Why keep a human here</h4>\n      <ul>\n        <li>The model affects how real customers are treated — someone should own that decision</li>\n        <li>Metrics can improve for reasons that are <b>wrong</b> — a person notices what a threshold can\'t</li>\n        <li>It creates an accountable, auditable record of who approved what</li>\n      </ul>\n      <div class="note"><b>The principle:</b> automate the expensive, repeatable work. Keep a human on the irreversible, risky decision. Reverting is one click either way.</div>',
        body: '<h4>The action</h4>\n      <ul>\n        <li>Reviewer inspects the comparison, then reassigns <code>@Champion</code> to the new version</li>\n        <li><b>No redeploy</b> — serving and scoring resolve by alias, so the switch is instant</li>\n        <li>Rollback is reassigning the alias back; the prior version is untouched</li>\n      </ul>\n      <div class="note">Optionally the Challenger scores in parallel first, and promotion waits on <b>realised outcomes</b> rather than offline metrics alone.</div>',
      },
      w8: {
        accent: "serve",
        node: {
          plain: {
            t: "Pick up the live model",
            d: "Whichever model is currently approved",
          },
          tech: {
            t: "Load @Champion",
            d: "models:/prod.ml_churn.churn_model@Champion",
          },
        },
        drawer: {
          plain: {
            k: "Scoring · Step 8",
            t: "Pick Up The Live Model",
            d: "The nightly run starts by fetching whatever is currently approved.",
          },
          tech: {
            k: "Scoring · Step 8",
            t: "Load By Alias",
            d: "Resolution by alias, never by pinned version.",
          },
        },
        plain:
          '<p class="lead">The nightly job doesn\'t have a model built into it. It asks for <b>whichever model is currently approved</b> and uses that.</p>\n      <div class="note">That indirection is why promoting a new model needs no change to the scoring job at all — and why rolling back is instant.</div>',
        body: "<h4>Why alias, not version</h4>\n      <ul>\n        <li>The job references <code>@Champion</code>, so promotion and rollback require no code change or redeploy</li>\n        <li>The resolved <b>version number is logged</b> on the run and stamped onto every scored row</li>\n      </ul>",
      },
      w9: {
        accent: "serve",
        node: {
          plain: {
            t: "Score everyone, with reasons",
            d: "A risk score plus what drove it, per customer",
          },
          tech: {
            t: "Batch Score + SHAP",
            d: "Scores and per-prediction attributions to Delta",
          },
        },
        drawer: {
          plain: {
            k: "Scoring · Step 9",
            t: "Score Everyone, With Reasons",
            d: "A score without a reason gets ignored.",
          },
          tech: {
            k: "Scoring · Step 9",
            t: "Batch Scoring & Attribution",
            d: "Predictions plus explanations, written together.",
          },
        },
        plain:
          '<p class="lead">Every customer gets a risk score — and, just as importantly, <b>the reasons behind it</b>.</p>\n      <h4>Why the reasons ship with the score</h4>\n      <ul>\n        <li>"80% at risk" prompts "so what do I do?"</li>\n        <li>"...because ordering halved and three tickets are open" is something a person can act on</li>\n      </ul>\n      <div class="note">Lists without reasons get ignored within a fortnight. This is the most common way a technically sound churn project quietly dies.</div>',
        body: "<h4>Output</h4>\n      <ul>\n        <li>Features resolved through the Feature Store — same definitions as training</li>\n        <li>Scores plus <b>SHAP attributions</b> written to a governed Delta table</li>\n        <li>Every row stamped with <b>model version + scoring timestamp</b> — the basis for later comparison</li>\n      </ul>",
      },
      w10: {
        accent: "serve",
        node: {
          plain: {
            t: "Deliver to the team",
            d: "Into the CRM and dashboards they already use",
          },
          tech: {
            t: "Write-Back & Publish",
            d: "CRM sync + AI/BI dashboards + threshold alerts",
          },
        },
        drawer: {
          plain: {
            k: "Scoring · Step 10",
            t: "Deliver To The Team",
            d: "The step that decides whether any of this gets used.",
          },
          tech: {
            k: "Scoring · Step 10",
            t: "Write-Back & Publication",
            d: "Delivery into existing workflows, not a parallel one.",
          },
        },
        plain:
          '<p class="lead">Scores are pushed <b>into the CRM</b> — onto the customer record the team already opens every day.</p>\n      <h4>Where it lands</h4>\n      <ul>\n        <li>The CRM, on the record reps already work from</li>\n        <li>Management dashboards that already get reviewed</li>\n        <li>An alert for high-value accounts that cross the risk threshold</li>\n      </ul>\n      <div class="note">If someone has to log into a separate tool to see this, they won\'t. Delivery is part of the architecture, not an afterthought.</div>',
        body: "<h4>Publication paths</h4>\n      <ul>\n        <li>CRM write-back so scores appear inside the existing workflow</li>\n        <li>AI/BI dashboards over the scored Delta table</li>\n        <li>Threshold alerting for high-value at-risk accounts</li>\n        <li>Intervention outcomes captured back, becoming labels for a future step 2</li>\n      </ul>",
      },
      w11: {
        accent: "plat",
        node: {
          plain: {
            t: "Watch what it sees",
            d: "Profiles the customers being scored, run after run",
          },
          tech: {
            t: "Inference Profile",
            d: "Monitor refresh over the scored / inference table",
          },
        },
        drawer: {
          plain: {
            k: "Monitoring · Step 11",
            t: "Watch What It Sees",
            d: "Continuous profiling of live inputs and predictions.",
          },
          tech: {
            k: "Monitoring · Step 11",
            t: "Inference Profiling",
            d: "Monitor refresh producing profile metrics per window.",
          },
        },
        plain:
          '<p class="lead">After every scoring run, the system profiles what it just saw — the customers, their signals, and the predictions made.</p>\n      <div class="note">This runs whether or not anyone is looking. That\'s the point: the failure mode being guarded against is nobody noticing.</div>',
        body: "<h4>What runs</h4>\n      <ul>\n        <li>Monitor with an <b>inference profile</b> over the scored table</li>\n        <li>Tracks model inputs, predictions, and ground-truth labels once they arrive</li>\n        <li>Emits a <b>profile metrics table</b> per window, plus an auto-generated dashboard</li>\n      </ul>",
      },
      w12: {
        accent: "plat",
        node: {
          plain: {
            t: "Compare to what it learned",
            d: "Are today’s customers still like the training ones?",
          },
          tech: {
            t: "Drift Metrics",
            d: "Current window vs baseline training distribution",
          },
        },
        drawer: {
          plain: {
            k: "Monitoring · Step 12",
            t: "Compare To What It Learned",
            d: "Measuring how far the world has moved.",
          },
          tech: {
            k: "Monitoring · Step 12",
            t: "Drift Computation",
            d: "Statistical comparison against the pinned training baseline.",
          },
        },
        plain:
          "<p class=\"lead\">Today's customers are compared against the customers the model originally learned from. If they've diverged, the model's assumptions are getting stale.</p>\n      <h4>Two things tracked</h4>\n      <ul>\n        <li><b>Have the inputs changed?</b> — the early warning, available immediately</li>\n        <li><b>Are the predictions still right?</b> — the definitive answer, but it arrives months later</li>\n      </ul>",
        body: '<h4>Computation</h4>\n      <ul>\n        <li><b>Drift metrics table</b> — current window vs the pinned training baseline and vs the prior window</li>\n        <li>Input drift is the leading indicator; outcome-based performance confirms it later</li>\n      </ul>\n      <div class="note">Churn ground truth is inherently delayed — you only learn who left months afterwards. Acting on input drift first is what buys back that lag.</div>',
      },
      w13: {
        accent: "plat",
        node: {
          plain: {
            t: "Flag it — and loop back",
            d: "Past the threshold, retraining starts again at step 1",
          },
          tech: {
            t: "Alert → Retrain Trigger",
            d: "Threshold breach fires the training pipeline",
          },
        },
        drawer: {
          plain: {
            k: "Monitoring · Step 13",
            t: "Flag It — And Loop Back",
            d: "Where the cycle closes.",
          },
          tech: {
            k: "Monitoring · Step 13",
            t: "Alert & Retrain Trigger",
            d: "The edge that turns a pipeline into a closed loop.",
          },
        },
        plain:
          '<p class="lead">When drift or accuracy crosses the agreed line, an alert is raised — and training kicks off again from step 1.</p>\n      <h4>What this gives the business</h4>\n      <ul>\n        <li>You find out the model is degrading <b>from the system</b>, not from a customer complaint</li>\n        <li>A replacement is already being prepared while you\'re reading the alert</li>\n        <li>But nothing reaches customers until a person approves it at step 7</li>\n      </ul>\n      <div class="note"><b>Worth asking any ML vendor:</b> "how will I know when this stops working?" This is that question, answered in the architecture rather than in a promise.</div>',
        body: '<h4>The closing edge</h4>\n      <ul>\n        <li>Alerts defined over the drift and profile metrics tables</li>\n        <li>Breach raises a notification <b>and</b> can fire the training Workflow at step 1</li>\n        <li>Thresholds are explicit and reviewed — too tight retrains constantly, too loose defeats the purpose</li>\n      </ul>\n      <div class="note"><b>Automated retraining, manual promotion.</b> The expensive repeatable half is automated; the risky half keeps a human on it.</div>',
      },
    },
    workflow: {
      intro: {
        plain: {
          title: "How it runs, day to day",
          sub: "Three things happen on their own schedules. Scoring runs every night. Training runs occasionally. Monitoring runs constantly — and it is monitoring that decides when training needs to happen again.",
        },
        tech: {
          title: "Runtime execution flow",
          sub: "Three independently scheduled Databricks Workflows. Batch scoring runs nightly; the training pipeline runs on schedule or on a drift trigger; the monitoring loop refreshes continuously and closes the cycle back to training.",
        },
      },
      loop: {
        plain:
          "<b>The loop:</b> monitoring is what makes this a system rather than a one-off. When it detects the model slipping, it starts training again at step 1 — automatically. A person still approves what goes live.",
        tech: "<b>Closed loop:</b> a drift or performance threshold breach at step 13 triggers the training pipeline at step 1. Retraining is automated; <b>promotion stays manual</b> — deliberately.",
      },
      lanes: [
        {
          accent: "ingest",
          steps: ["w1", "w2", "w3", "w4", "w5", "w6", "w7"],
          label: {
            plain: "Training",
            tech: "Training Pipeline",
          },
          sub: {
            plain: "Occasionally — on a schedule, or when accuracy slips",
            tech: "Scheduled Workflow, or drift-triggered",
          },
        },
        {
          accent: "serve",
          steps: ["w8", "w9", "w10"],
          label: {
            plain: "Nightly Scoring",
            tech: "Batch Scoring",
          },
          sub: {
            plain: "Every night, without fail",
            tech: "Nightly Workflow — the production path",
          },
        },
        {
          accent: "plat",
          steps: ["w11", "w12", "w13"],
          label: {
            plain: "Monitoring",
            tech: "Monitoring Loop",
          },
          sub: {
            plain: "Always watching",
            tech: "Inference profile refresh + alerting",
          },
        },
      ],
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsForService(serviceSlug) {
  return projects.filter((project) => project.serviceSlug === serviceSlug);
}

/**
 * Every node id in reading order — the board left to right, then the platform
 * row, then the runtime steps where a project has them.
 *
 * The component reference walks this, so a project's workflow steps are
 * documented in the page body too rather than living only inside the board.
 */
export function allNodeIds(project) {
  return [
    ...project.columns.flatMap((column) => column.nodes),
    ...project.platform.nodes,
    ...(project.workflow?.lanes ?? []).flatMap((lane) => lane.steps),
  ];
}
