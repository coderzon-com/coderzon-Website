"use client";

import {
  DetailPanel,
  EmailCell,
  SubmissionsView,
  type Column,
  type ListParams,
} from "@/components/submissions-view";
import { formatDateTime, formatRelative } from "@/lib/utils";
import type { QuoteRow } from "@/lib/types";

const COLUMNS: Column<QuoteRow>[] = [
  {
    key: "received",
    label: "Received",
    className: "whitespace-nowrap",
    render: (item) => (
      <span title={formatDateTime(item.createdAt)} className="text-muted">
        {formatRelative(item.createdAt)}
      </span>
    ),
  },
  {
    key: "name",
    label: "From",
    render: (item) => (
      <span className="text-navy font-medium">
        {item.firstName} {item.lastName}
      </span>
    ),
  },
  {
    key: "email",
    label: "Email",
    className: "max-w-[16rem]",
    render: (item) => (
      <EmailCell email={item.email} subject="Re: your quote request" />
    ),
  },
  {
    key: "phone",
    label: "Phone",
    className: "whitespace-nowrap",
    render: (item) => (
      <a
        href={`tel:${item.phone.replace(/\s+/g, "")}`}
        onClick={(event) => event.stopPropagation()}
        className="text-navy hover:text-brand hover:underline"
      >
        {item.phone}
      </a>
    ),
  },
  {
    key: "company",
    label: "Company",
    render: (item) => <span className="text-muted">{item.company}</span>,
  },
  {
    key: "country",
    label: "Country",
    className: "whitespace-nowrap",
    render: (item) => <span className="text-muted">{item.country}</span>,
  },
];

export function QuotesView({ initialParams }: { initialParams: ListParams }) {
  return (
    <SubmissionsView<QuoteRow>
      endpoint="/api/quotes"
      title="Quote requests"
      noun="quote requests"
      searchPlaceholder="Search name, email, company…"
      columns={COLUMNS}
      initialParams={initialParams}
      renderCard={(item) => (
        <>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-navy truncate font-medium">
              {item.firstName} {item.lastName}
            </span>
            <span className="text-muted shrink-0 font-mono text-[10px] tracking-label uppercase">
              {formatRelative(item.createdAt)}
            </span>
          </div>
          <p className="text-muted mt-1 truncate text-sm">{item.email}</p>
          <p className="text-muted mt-1 truncate text-sm">{item.phone}</p>
          <p className="text-muted mt-1.5 truncate text-xs">
            {[item.company, item.country].filter(Boolean).join(" \u00b7 ")}
          </p>
        </>
      )}
      renderDetail={(item) => (
        <DetailPanel
          replyTo={item.email}
          replySubject="Re: your quote request"
          replyBody={`Hi ${item.firstName},\n\n`}
          message={item.message}
          receivedAt={formatDateTime(item.createdAt)}
        />
      )}
    />
  );
}
