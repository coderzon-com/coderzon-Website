"use client";

import {
  DetailPanel,
  EmailCell,
  SubmissionsView,
  type Column,
  type ListParams,
} from "@/components/submissions-view";
import { formatDateTime, formatRelative } from "@/lib/utils";
import type { MessageRow } from "@/lib/types";

const COLUMNS: Column<MessageRow>[] = [
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
    render: (item) => <span className="text-navy font-medium">{item.name}</span>,
  },
  {
    key: "email",
    label: "Email",
    className: "max-w-[16rem]",
    render: (item) => <EmailCell email={item.email} subject="Re: your enquiry" />,
  },
  {
    key: "company",
    label: "Company",
    render: (item) => <span className="text-muted">{item.company || "—"}</span>,
  },
  {
    key: "country",
    label: "Country",
    className: "whitespace-nowrap",
    render: (item) => <span className="text-muted">{item.country}</span>,
  },
  {
    key: "subject",
    label: "Subject",
    className: "max-w-[14rem]",
    render: (item) => (
      <span className="text-muted block truncate">{item.subject || "—"}</span>
    ),
  },
];

export function MessagesView({ initialParams }: { initialParams: ListParams }) {
  return (
    <SubmissionsView<MessageRow>
      endpoint="/api/messages"
      title="Messages"
      noun="messages"
      searchPlaceholder="Search name, email, company…"
      columns={COLUMNS}
      initialParams={initialParams}
      renderCard={(item) => (
        <>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-navy truncate font-medium">{item.name}</span>
            <span className="text-muted shrink-0 font-mono text-[10px] tracking-label uppercase">
              {formatRelative(item.createdAt)}
            </span>
          </div>
          <p className="text-muted mt-1 truncate text-sm">{item.email}</p>
          <p className="text-muted mt-1.5 truncate text-xs">
            {[item.company, item.country].filter(Boolean).join(" \u00b7 ")}
          </p>
          {item.subject && (
            <p className="text-navy mt-2 truncate text-sm">{item.subject}</p>
          )}
        </>
      )}
      renderDetail={(item) => (
        <DetailPanel
          replyTo={item.email}
          replySubject={item.subject ? `Re: ${item.subject}` : "Re: your enquiry"}
          replyBody={`Hi ${item.name.split(" ")[0]},\n\n`}
          message={item.message}
          receivedAt={formatDateTime(item.createdAt)}
          // The table truncates the subject; show it in full.
          extra={item.subject ? [{ label: "Subject", value: item.subject }] : []}
        />
      )}
    />
  );
}
