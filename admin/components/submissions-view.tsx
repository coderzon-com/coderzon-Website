"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  Copy,
  Inbox,
  LoaderCircle,
  Plus,
  Reply,
  RotateCw,
  Search,
  X,
} from "lucide-react";
import { cn, gmailComposeUrl } from "@/lib/utils";

export type Column<T> = {
  key: string;
  label: string;
  className?: string;
  render: (item: T) => ReactNode;
};

export type ListParams = { q: string };

/** Rows fetched per request, and per press of Load more. */
const PAGE_SIZE = 10;

type Payload<T> = {
  ok: true;
  items: T[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

/**
 * The list screen shared by Messages and Quotes.
 *
 * Both are the same job — read newest first, find one, read it in full, reply
 * — so this is one component configured twice rather than two near-copies.
 *
 * Below `md` the table becomes a list of cards. A six-column table at 320px
 * is a horizontal scrollbar pretending to be a layout, so the same rows are
 * stacked instead; both share the expand behaviour and the detail panel.
 */
export function SubmissionsView<T extends { id: string }>({
  endpoint,
  title,
  noun,
  columns,
  renderCard,
  renderDetail,
  searchPlaceholder,
  initialParams,
}: {
  endpoint: string;
  title: string;
  noun: string;
  columns: Column<T>[];
  /** Small-screen presentation; the table is unusable below ~640px. */
  renderCard: (item: T) => ReactNode;
  renderDetail: (item: T) => ReactNode;
  searchPlaceholder: string;
  initialParams: ListParams;
}) {
  const router = useRouter();

  const [search, setSearch] = useState(initialParams.q);
  const [query, setQuery] = useState(initialParams.q);

  // Rows accumulate: each Load more appends the next page to what is shown.
  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Wait for a pause in typing, so each keystroke is not a database query.
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  /**
   * Fetch one page. `append` decides whether the rows join the list or
   * replace it — a fresh search replaces, Load more appends.
   */
  const load = useCallback(
    async (pageToLoad: number, append: boolean) => {
      if (append) setLoadingMore(true);
      else setStatus("loading");
      setError("");

      const params = new URLSearchParams({
        page: String(pageToLoad),
        perPage: String(PAGE_SIZE),
      });
      if (query) params.set("q", query);

      try {
        const response = await fetch(`${endpoint}?${params}`, {
          cache: "no-store",
        });

        // The session expired while the tab sat open.
        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) {
          setError(result.error ?? "Could not load this list.");
          setStatus("error");
          return;
        }

        const payload = result as Payload<T>;
        setItems((current) =>
          append ? [...current, ...payload.items] : payload.items,
        );
        // A replaced list may not contain whatever row was open.
        if (!append) setExpandedId(null);
        setTotal(payload.total);
        setPage(payload.page);
        setHasMore(payload.page < payload.totalPages);
        setStatus("ready");
      } catch {
        setError("Network error. Check your connection and try again.");
        setStatus("error");
      } finally {
        setLoadingMore(false);
      }
    },
    [endpoint, query, router],
  );

  // A new search term starts the list again from the first page.
  //
  // This is the "sync with an external system" case the rule allows for: the
  // loading flag has to be raised before the request goes out, otherwise the
  // table sits looking idle while it runs.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(1, false);
  }, [load]);

  // Mirror the search into the address bar so a filtered view is shareable.
  useEffect(() => {
    const qs = query ? `?q=${encodeURIComponent(query)}` : "";
    window.history.replaceState(null, "", qs || window.location.pathname);
  }, [query]);

  const isEmpty = status === "ready" && items.length === 0;
  const columnCount = columns.length + 1;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:min-h-screen">
      <header className="border-navy/10 border-b bg-white px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-brand font-mono text-[10px] tracking-label uppercase">
              Submissions
            </p>
            <h1 className="text-navy mt-1.5 text-lg font-bold tracking-tight sm:mt-2 sm:text-2xl">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1 sm:flex-none">
              <Search
                aria-hidden="true"
                className="text-muted pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
              />
              <label htmlFor="search" className="sr-only">
                Search {noun}
              </label>
              <input
                id="search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={searchPlaceholder}
                className="border-navy/15 text-navy placeholder:text-muted focus:border-brand focus:ring-brand h-10 w-full min-w-0 rounded-md border bg-white pr-8 pl-9 text-sm focus:ring-1 focus:outline-none sm:h-9 sm:w-72"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="text-muted hover:text-navy absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => load(1, false)}
              aria-label="Refresh"
              className="border-navy/15 text-navy hover:border-brand hover:text-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-white transition-colors sm:h-9 sm:w-9"
            >
              <RotateCw
                className={cn("h-4 w-4", status === "loading" && "animate-spin")}
              />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-3 sm:p-6">
        <div className="border-navy/10 overflow-hidden rounded-lg border bg-white">
          {/* States are rendered once and shared by both layouts. */}
          {status === "loading" && items.length === 0 && (
            <div className="px-4 py-16 text-center">
              <LoaderCircle className="text-brand mx-auto h-5 w-5 animate-spin" />
              <p className="text-muted mt-3 font-mono text-[10px] tracking-label uppercase">
                Loading
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="px-4 py-16 text-center">
              <p className="text-navy text-sm">{error}</p>
              <button
                type="button"
                onClick={() => load(1, false)}
                className="bg-navy hover:bg-brand mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors"
              >
                <RotateCw className="h-4 w-4" />
                Try again
              </button>
            </div>
          )}

          {isEmpty && (
            <div className="px-4 py-16 text-center">
              <Inbox className="text-muted mx-auto h-6 w-6" />
              <p className="text-navy mt-3 text-sm">
                {query ? `No ${noun} match \u201c${query}\u201d.` : `No ${noun} yet.`}
              </p>
              {query && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-brand mt-3 font-mono text-[10px] tracking-label uppercase hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {items.length > 0 && (
            <>
              {/* Cards, up to md */}
              <ul className="divide-navy/5 divide-y md:hidden">
                {items.map((item) => {
                  const isExpanded = expandedId === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        aria-expanded={isExpanded}
                        className={cn(
                          "flex w-full items-start gap-3 p-4 text-left transition-colors",
                          isExpanded ? "bg-brand-50" : "hover:bg-surface",
                        )}
                      >
                        <div className="min-w-0 flex-1">{renderCard(item)}</div>
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "text-muted mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </button>

                      {isExpanded && (
                        <div className="bg-brand-50/50 border-navy/10 border-t px-4 py-4">
                          {renderDetail(item)}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Table, md and up */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-navy/10 bg-surface border-b">
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          scope="col"
                          className={cn(
                            "text-muted px-4 py-3 font-mono text-[10px] font-medium tracking-label uppercase",
                            column.className,
                          )}
                        >
                          {column.label}
                        </th>
                      ))}
                      <th scope="col" className="w-10 px-4 py-3">
                        <span className="sr-only">Expand</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item) => {
                      const isExpanded = expandedId === item.id;
                      return (
                        <RowGroup
                          key={item.id}
                          item={item}
                          columns={columns}
                          columnCount={columnCount}
                          isExpanded={isExpanded}
                          onToggle={() =>
                            setExpandedId(isExpanded ? null : item.id)
                          }
                          renderDetail={renderDetail}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="border-navy/10 flex flex-col items-center gap-3 border-t px-4 py-4 sm:flex-row sm:justify-between">
                <p className="text-muted font-mono text-[10px] tracking-label uppercase">
                  Showing {items.length} of {total}
                </p>

                {hasMore ? (
                  <button
                    type="button"
                    onClick={() => load(page + 1, true)}
                    disabled={isLoadingMore}
                    className="border-navy/15 text-navy hover:border-brand hover:text-brand inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border bg-white px-5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {isLoadingMore ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Loading\u2026
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Load {Math.min(PAGE_SIZE, total - items.length)} more
                      </>
                    )}
                  </button>
                ) : (
                  <p className="text-muted font-mono text-[10px] tracking-label uppercase">
                    End of list
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RowGroup<T extends { id: string }>({
  item,
  columns,
  columnCount,
  isExpanded,
  onToggle,
  renderDetail,
}: {
  item: T;
  columns: Column<T>[];
  columnCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  renderDetail: (item: T) => ReactNode;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className={cn(
          "border-navy/5 cursor-pointer border-b transition-colors",
          isExpanded ? "bg-brand-50" : "hover:bg-surface",
        )}
      >
        {columns.map((column) => (
          <td
            key={column.key}
            className={cn("px-4 py-3 align-top text-sm", column.className)}
          >
            {column.render(item)}
          </td>
        ))}
        <td className="px-4 py-3 align-top">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            className="text-muted hover:text-brand flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-white"
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isExpanded && "rotate-180",
              )}
            />
          </button>
        </td>
      </tr>

      {isExpanded && (
        <tr className="border-navy/10 bg-brand-50/50 border-b">
          <td colSpan={columnCount} className="px-4 py-5">
            {renderDetail(item)}
          </td>
        </tr>
      )}
    </>
  );
}

/** Email address with copy-to-clipboard and a reply link. */
export function EmailCell({ email, subject }: { email: string; subject?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy(event: React.MouseEvent) {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked; the address is still selectable by hand.
    }
  }

  return (
    <span className="flex items-center gap-1.5">
      <a
        href={gmailComposeUrl({ to: email, subject })}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
        className="text-navy hover:text-brand truncate hover:underline"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy email address"}
        className="text-muted hover:text-brand flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors hover:bg-white"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-600" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </span>
  );
}

/**
 * The panel shown under an expanded row.
 *
 * It deliberately does not repeat the row's own columns. Name, email, company
 * and country are all a few pixels above, so listing them again pushed the
 * message — the only thing the row cannot show — into a narrow side column.
 *
 * What lands here is what the table has to leave out: the full message, the
 * exact timestamp behind the relative one, and any field the row truncates.
 */
export function DetailPanel({
  message,
  receivedAt,
  replyTo,
  replySubject,
  replyBody,
  extra,
}: {
  message: string;
  receivedAt: string;
  replyTo: string;
  replySubject: string;
  replyBody?: string;
  extra?: { label: string; value: ReactNode }[];
}) {
  const compose = { to: replyTo, subject: replySubject, body: replyBody };

  return (
    <div className="max-w-4xl">
      {extra && extra.length > 0 && (
        <dl className="mb-4 space-y-1.5">
          {extra.map((field) => (
            <div key={field.label} className="flex gap-3">
              <dt className="text-muted w-20 shrink-0 font-mono text-[10px] tracking-label uppercase">
                {field.label}
              </dt>
              <dd className="text-navy text-sm break-words">{field.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mb-2 flex items-baseline justify-between gap-4">
        <p className="text-muted font-mono text-[10px] tracking-label uppercase">
          Message
        </p>
        <p className="text-muted font-mono text-[10px] tracking-label uppercase">
          {receivedAt}
        </p>
      </div>

      <p className="border-navy/10 text-ink rounded-md border bg-white p-4 text-sm leading-relaxed whitespace-pre-wrap">
        {message}
      </p>

      {/* The recipient is already in the row above, so the button stays short. */}
      <a
        href={gmailComposeUrl(compose)}
        target="_blank"
        rel="noopener noreferrer"
        title={`Reply to ${replyTo}`}
        aria-label={`Reply to ${replyTo}`}
        className="bg-navy hover:bg-brand mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors"
      >
        <Reply className="h-4 w-4" />
        Reply
      </a>
    </div>
  );
}
