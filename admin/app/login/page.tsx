import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = { title: "Sign in · Coderzon Admin" };

export default function LoginPage() {
  return (
    <main className="bg-console relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      {/* The blueprint grid used across the Coderzon system. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, #000, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000, transparent 75%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        <p className="text-brand-light font-mono text-[11px] tracking-label uppercase">
          Coderzon
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Submissions from the website. Authorised staff only.
        </p>

        <div className="mt-8">
          {/* LoginForm reads ?next= with useSearchParams, which needs a
              boundary for this page to prerender. */}
          <Suspense fallback={<div className="h-[268px]" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
