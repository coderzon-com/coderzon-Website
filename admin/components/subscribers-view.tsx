"use client";

import { Mail } from "lucide-react";
import {
  EmailCell,
  SubmissionsView,
  type Column,
  type ListParams,
} from "@/components/submissions-view";
import { formatDateTime, formatRelative, gmailComposeUrl } from "@/lib/utils";
import type { SubscriberRow } from "@/lib/types";

const COLUMNS: Column<SubscriberRow>[] = [
  {
    key: "subscribed",
    label: "Subscribed",
    className: "whitespace-nowrap",
    render: (item) => (
      <span title={formatDateTime(item.createdAt)} className="text-muted">
        {formatRelative(item.createdAt)}
      </span>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (item) => <EmailCell email={item.email} subject="Coderzon" />,
  },
];

/**
 * The mailing list.
 *
 * Two columns, and that is the whole record — the footer form asks for an
 * address and nothing else, so inventing a name or a company column would
 * leave a table of dashes.
 *
 * The expanded row therefore does not use the shared `DetailPanel`, which is
 * built around a message body there is none of here. What it shows instead is
 * the one thing the row leaves out: the exact moment behind the relative date.
 */
export function SubscribersView({
  initialParams,
}: {
  initialParams: ListParams;
}) {
  return (
    <SubmissionsView<SubscriberRow>
      endpoint="/api/subscribers"
      title="Subscribers"
      noun="subscribers"
      searchPlaceholder="Search email…"
      columns={COLUMNS}
      initialParams={initialParams}
      renderCard={(item) => (
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-navy truncate font-medium">{item.email}</span>
          <span className="text-muted shrink-0 font-mono text-[10px] tracking-label uppercase">
            {formatRelative(item.createdAt)}
          </span>
        </div>
      )}
      renderDetail={(item) => (
        <div className="max-w-4xl">
          <dl className="space-y-1.5">
            <div className="flex gap-3">
              <dt className="text-muted w-24 shrink-0 font-mono text-[10px] tracking-label uppercase">
                Subscribed
              </dt>
              <dd className="text-navy text-sm">
                {formatDateTime(item.createdAt)}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-muted w-24 shrink-0 font-mono text-[10px] tracking-label uppercase">
                Email
              </dt>
              <dd className="text-navy text-sm break-words">{item.email}</dd>
            </div>
          </dl>

          <a
            href={gmailComposeUrl({ to: item.email, subject: "Coderzon" })}
            target="_blank"
            rel="noopener noreferrer"
            title={`Email ${item.email}`}
            className="bg-navy hover:bg-brand mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
      )}
    />
  );
}
