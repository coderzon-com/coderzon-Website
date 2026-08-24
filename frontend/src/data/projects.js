/**
 * Case studies.
 *
 * Faithful ports of the standalone HTML pages written by the engineers who
 * built these pipelines. Their defining idea is two parallel vocabularies over
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
 * layer of the pipeline a component belongs to), so they are data, not styling.
 *
 * Generated from the source pages rather than retyped, so nothing is lost in
 * transcription. Column node lists differ between projects — SAP carries a
 * fourth ingestion component for the pagination loop — so nothing here may
 * assume a fixed shape.
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
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsForService(serviceSlug) {
  return projects.filter((project) => project.serviceSlug === serviceSlug);
}

/** Every node id in board order — columns left to right, then the platform row. */
export function allNodeIds(project) {
  return [
    ...project.columns.flatMap((column) => column.nodes),
    ...project.platform.nodes,
  ];
}
