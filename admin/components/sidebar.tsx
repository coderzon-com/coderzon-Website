"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, LogOut, Mail, Menu, X } from "lucide-react";

const NAV = [
  { label: "Messages", href: "/dashboard/messages", icon: Mail },
  { label: "Quotes", href: "/dashboard/quotes", icon: FileText },
] as const;

/**
 * Dashboard navigation: a console rail on desktop, a slide-over on mobile.
 *
 * Two lists and a sign-out. An admin over two tables does not need a
 * navigation hierarchy stacked on top of them.
 */
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [isSigningOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <>
      {/* Mobile bar */}
      <div className="bg-console border-console-line flex h-16 items-center gap-3 border-b px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-mono text-[11px] tracking-label text-white uppercase">
          Coderzon <span className="text-white/40">admin</span>
        </span>
      </div>

      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="bg-console/70 fixed inset-0 z-40 lg:hidden"
        />
      )}

      <aside
        className={`bg-console fixed inset-y-0 left-0 z-50 flex w-60 flex-col transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-console-line flex h-16 items-center justify-between border-b px-5">
          <span className="font-mono text-[11px] tracking-label text-white uppercase">
            Coderzon<span className="ml-2 text-white/40">admin</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="-mr-2 flex h-9 w-9 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <p className="mb-3 px-2 font-mono text-[10px] tracking-label text-white/45 uppercase">
            Submissions
          </p>
          <ul className="space-y-1">
            {NAV.map((item) => {
              const isCurrent = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`focus-visible:ring-brand-light flex min-h-[44px] items-center gap-3 rounded-md px-3 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                      isCurrent
                        ? "bg-white/10 font-medium text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${isCurrent ? "text-brand-light" : ""}`}
                    />
                    {item.label}
                    {isCurrent && (
                      <span
                        aria-hidden="true"
                        className="border-accent ml-auto h-[7px] w-[7px] rounded-full border-[1.5px]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-console-line border-t p-4">
          <button
            type="button"
            onClick={signOut}
            disabled={isSigningOut}
            className="focus-visible:ring-brand-light flex min-h-[44px] w-full items-center gap-3 rounded-md px-3 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {isSigningOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>
    </>
  );
}
