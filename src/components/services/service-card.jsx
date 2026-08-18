import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";

/** Grid tile linking to a single service. */
export function ServiceCard({ service }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover sm:p-7">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon name={service.icon} className="h-7 w-7" />
      </div>

      <h3 className="text-lg leading-snug">
        <Link
          href={`/services/${service.slug}`}
          className="transition-colors hover:text-brand"
        >
          {service.shortTitle}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {service.overview.heading}
      </p>

      <Link
        href={`/services/${service.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
      >
        Read More
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
